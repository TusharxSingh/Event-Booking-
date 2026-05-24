import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { EventForm } from '@/components/EventForm';
import { createEvent } from '@/app/actions/events';

export const metadata = {
  title: 'Create Event | EventBooking',
  description: 'Create a new event and share it with the community.',
};

export default async function NewEventPage() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session) redirect('/sign-in?callbackUrl=/events/new');

  return (
    <div className="create-event-page">
      <div className="section-title page-header">
        <h1>Create Event</h1>
        <div className="section-title-underline" />
        <p>Fill in the details below to create your event</p>
      </div>
      <div className="form-container glass-card" style={{ padding: '2rem' }}>
        <EventForm action={createEvent} submitLabel="Create Event" />
      </div>
    </div>
  );
}
