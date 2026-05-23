'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { sendRSVPConfirmation, sendRSVPCancellation } from '@/lib/resend';

export async function createRSVP(eventId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: 'You must be signed in to RSVP' };
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      organizer: { select: { name: true } },
      _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } },
    },
  });

  if (!event) return { error: 'Event not found' };

  if (event.organizerId === session.user.id) {
    return { error: 'You cannot RSVP to your own event' };
  }

  // Check capacity
  if (event._count.rsvps >= event.capacity) {
    return { error: 'This event is sold out' };
  }

  // Check for existing RSVP
  const existingRSVP = await prisma.rSVP.findUnique({
    where: { userId_eventId: { userId: session.user.id, eventId } },
  });

  if (existingRSVP) {
    if (existingRSVP.status === 'CONFIRMED') {
      return { error: 'You have already RSVP\'d to this event' };
    }
    // Re-confirm a cancelled RSVP
    await prisma.rSVP.update({
      where: { id: existingRSVP.id },
      data: { status: 'CONFIRMED' },
    });
  } else {
    await prisma.rSVP.create({
      data: {
        userId: session.user.id,
        eventId,
        status: 'CONFIRMED',
      },
    });
  }

  // Send confirmation email (non-blocking)
  sendRSVPConfirmation(session.user.email, session.user.name, {
    title: event.title,
    date: event.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    location: event.location,
    organizerName: event.organizer.name,
  }).catch(console.error);

  revalidatePath(`/events/${eventId}`);
  revalidatePath('/dashboard');
  return { success: true };
}

export async function cancelRSVP(eventId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: 'You must be signed in' };
  }

  const rsvp = await prisma.rSVP.findUnique({
    where: { userId_eventId: { userId: session.user.id, eventId } },
    include: {
      event: {
        include: { organizer: { select: { name: true } } },
      },
    },
  });

  if (!rsvp || rsvp.status === 'CANCELLED') {
    return { error: 'No active RSVP found' };
  }

  await prisma.rSVP.update({
    where: { id: rsvp.id },
    data: { status: 'CANCELLED' },
  });

  // Send cancellation email (non-blocking)
  sendRSVPCancellation(session.user.email, session.user.name, {
    title: rsvp.event.title,
    date: rsvp.event.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    location: rsvp.event.location,
    organizerName: rsvp.event.organizer.name,
  }).catch(console.error);

  revalidatePath(`/events/${eventId}`);
  revalidatePath('/dashboard');
  return { success: true };
}
