import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { EventCard } from '@/components/EventCard';

export default async function HomePage() {
  const events = await prisma.event.findMany({
    where: {
      date: { gte: new Date() },
    },
    include: {
      organizer: { select: { name: true } },
      _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } },
    },
    orderBy: { date: 'asc' },
    take: 6,
  });

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Connecting the world through events</h1>
          <p className="hero-subtitle">
            Easy to search — enter a keyword and discover experiences near you.
          </p>
          <form className="hero-search" action="/events" method="GET">
            <input
              type="text"
              name="search"
              className="hero-search-input"
              placeholder="Enter event name or location..."
              aria-label="Search events"
            />
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {events.length > 0 && (
        <section className="featured-section">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <div className="section-title-underline" />
            <p>Discover what&apos;s happening soon in your community</p>
          </div>
          <div className="section-header">
            <span />
            <Link href="/events" className="section-link">
              View all
            </Link>
          </div>
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
        </section>
      )}

      {events.length === 0 && (
        <section className="featured-section empty-section">
          <div className="section-title" style={{ textAlign: 'center' }}>
            <h2>No upcoming events yet</h2>
            <div className="section-title-underline" style={{ margin: '0.5rem auto 0.75rem' }} />
            <p>Be the first to create an event and grow the community.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/events/new" className="btn btn-primary btn-lg">
              Create Your First Event
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
