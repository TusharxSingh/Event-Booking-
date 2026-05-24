import { prisma } from '@/lib/prisma';
import { EventCard } from '@/components/EventCard';
import { Suspense } from 'react';
import { EventGridSkeleton } from '@/components/LoadingSkeleton';

export const metadata = {
  title: 'Browse Events | EventBooking',
  description: 'Discover and browse upcoming events. Find your next experience.',
};

async function EventsList({ search }: { search?: string }) {
  const events = await prisma.event.findMany({
    where: {
      date: { gte: new Date() },
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { location: { contains: search, mode: 'insensitive' as const } },
              { description: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    },
    include: {
      organizer: { select: { name: true } },
      _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } },
    },
    orderBy: { date: 'asc' },
  });

  if (events.length === 0) {
    return (
      <div className="empty-state glass-card">
        <h3>No events found</h3>
        <p>{search ? `No events matching "${search}"` : 'No upcoming events at the moment.'}</p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          capacity={event.capacity}
          rsvpCount={event._count.rsvps}
          imageUrl={event.imageUrl}
          organizerName={event.organizer.name}
        />
      ))}
    </div>
  );
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="events-page">
      <div className="section-title page-header">
        <h1>Browse Events</h1>
        <div className="section-title-underline" />
        <p>Discover upcoming events and find your next experience</p>
      </div>

      <form className="search-bar glass-card" action="/events" method="GET">
        <input
          type="text"
          name="search"
          className="search-input"
          placeholder="Search events by name, location..."
          defaultValue={params.search}
          id="search-events-input"
        />
        <button type="submit" className="btn btn-primary" id="search-events-btn">
          Search
        </button>
      </form>

      <Suspense fallback={<EventGridSkeleton />}>
        <EventsList search={params.search} />
      </Suspense>
    </div>
  );
}
