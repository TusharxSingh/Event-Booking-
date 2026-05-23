import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { EventForm } from '@/components/EventForm';
import { updateEvent } from '@/app/actions/events';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return { title: 'Event Not Found' };
  return { title: `Edit: ${event.title} | EventBooking` };
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session) redirect(`/sign-in?callbackUrl=/events/${id}/edit`);

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  if (event.organizerId !== session.user.id) {
    redirect(`/events/${id}`);
  }

  const localDate = new Date(event.date);
  const dateStr = localDate.toISOString().slice(0, 16);

  const boundUpdateEvent = updateEvent.bind(null, id);

  return (
    <div className="create-event-page">
      <div className="page-header">
        <h1>Edit Event</h1>
        <p>Update the details of your event</p>
      </div>
      <div className="form-container glass-card" style={{ padding: '2rem' }}>
        <EventForm
          action={boundUpdateEvent}
          initialData={{
            title: event.title,
            description: event.description,
            location: event.location,
            date: dateStr,
            capacity: event.capacity,
            imageUrl: event.imageUrl || '',
          }}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
