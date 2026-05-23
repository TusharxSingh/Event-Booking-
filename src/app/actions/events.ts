'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  location: z.string().min(3, 'Location is required').max(200),
  date: z.string().refine((val) => new Date(val) > new Date(), 'Event date must be in the future'),
  capacity: z.coerce.number().int().min(1, 'Capacity must be at least 1').max(10000),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export async function createEvent(prevState: any, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: 'You must be signed in to create an event' };
  }

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    date: formData.get('date') as string,
    capacity: formData.get('capacity') as string,
    imageUrl: (formData.get('imageUrl') as string) || '',
  };

  const validated = eventSchema.safeParse(raw);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const event = await prisma.event.create({
    data: {
      title: validated.data.title,
      description: validated.data.description,
      location: validated.data.location,
      date: new Date(validated.data.date),
      capacity: validated.data.capacity,
      imageUrl: validated.data.imageUrl || null,
      organizerId: session.user.id,
    },
  });

  revalidatePath('/events');
  revalidatePath('/dashboard');
  redirect(`/events/${event.id}`);
}

export async function updateEvent(eventId: string, prevState: any, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: 'You must be signed in' };
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return { error: 'Event not found' };
  if (event.organizerId !== session.user.id) {
    return { error: 'You can only edit your own events' };
  }

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    date: formData.get('date') as string,
    capacity: formData.get('capacity') as string,
    imageUrl: (formData.get('imageUrl') as string) || '',
  };

  const validated = eventSchema.safeParse(raw);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  await prisma.event.update({
    where: { id: eventId },
    data: {
      title: validated.data.title,
      description: validated.data.description,
      location: validated.data.location,
      date: new Date(validated.data.date),
      capacity: validated.data.capacity,
      imageUrl: validated.data.imageUrl || null,
    },
  });

  revalidatePath(`/events/${eventId}`);
  revalidatePath('/events');
  revalidatePath('/dashboard');
  redirect(`/events/${eventId}`);
}

export async function deleteEvent(eventId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: 'You must be signed in' };
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return { error: 'Event not found' };
  if (event.organizerId !== session.user.id) {
    return { error: 'You can only delete your own events' };
  }

  await prisma.event.delete({ where: { id: eventId } });

  revalidatePath('/events');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}
