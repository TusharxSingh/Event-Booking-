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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🎉 Your next experience awaits</div>
          <h1 className="hero-title">
            Discover & Book
            <span className="hero-gradient"> Amazing Events</span>
          </h1>
          <p className="hero-subtitle">
            Create, explore, and RSVP to events that matter. From tech meetups to creative
            workshops — find your next unforgettable experience.
          </p>
          <div className="hero-actions">
            <Link href="/events" className="btn btn-primary btn-lg" id="browse-events-btn">
              Browse Events
            </Link>
            <Link href="/sign-up" className="btn btn-secondary btn-lg" id="get-started-btn">
              Get Started Free
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat glass-card">
            <span className="hero-stat-icon">📅</span>
            <span className="hero-stat-number">{events.length}+</span>
            <span className="hero-stat-label">Upcoming Events</span>
          </div>
          <div className="hero-stat glass-card">
            <span className="hero-stat-icon">👥</span>
            <span className="hero-stat-number">100+</span>
            <span className="hero-stat-label">Community Members</span>
          </div>
          <div className="hero-stat glass-card">
            <span className="hero-stat-icon">⚡</span>
            <span className="hero-stat-number">Free</span>
            <span className="hero-stat-label">To Use</span>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {events.length > 0 && (
        <section className="featured-section">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <Link href="/events" className="section-link">
              View all →
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
        <section className="empty-section">
          <div className="empty-state glass-card">
            <span className="empty-icon">🎪</span>
            <h2>No events yet</h2>
            <p>Be the first to create an event and get the community going!</p>
            <Link href="/events/new" className="btn btn-primary btn-lg">
              Create Your First Event
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
