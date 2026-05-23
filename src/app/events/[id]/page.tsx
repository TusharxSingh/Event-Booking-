import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { RSVPButton } from '@/components/RSVPButton';
import { DeleteEventButton } from '@/components/DeleteEventButton';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title} | EventBooking`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      organizer: { select: { id: true, name: true, email: true } },
      _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } },
    },
  });

  if (!event) notFound();

  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  const isOrganizer = session?.user?.id === event.organizerId;

  let hasRSVP = false;
  if (session) {
    const rsvp = await prisma.rSVP.findUnique({
      where: {
        userId_eventId: { userId: session.user.id, eventId: event.id },
      },
    });
    hasRSVP = rsvp?.status === 'CONFIRMED';
  }

  const rsvpCount = event._count.rsvps;
  const spotsLeft = event.capacity - rsvpCount;
  const isSoldOut = spotsLeft <= 0;
  const capacityPercentage = Math.min((rsvpCount / event.capacity) * 100, 100);

  const eventDate = new Date(event.date);
  const dateStr = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="event-detail-page">
      {/* Hero Banner */}
      <div
        className="event-hero"
        style={{
          backgroundImage: event.imageUrl
            ? `linear-gradient(to bottom, rgba(10,14,26,0.3), rgba(10,14,26,0.95)), url(${event.imageUrl})`
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        }}
      >
        <div className="event-hero-content">
          <div className="event-hero-date">
            <span className="hero-date-month">
              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="hero-date-day">{eventDate.getDate()}</span>
          </div>
          <h1>{event.title}</h1>
          <p className="event-hero-organizer">Hosted by {event.organizer.name}</p>
        </div>
      </div>

      {/* Content */}
      <div className="event-detail-content">
        <div className="event-detail-main">
          {/* Info Cards */}
          <div className="event-info-cards">
            <div className="info-card glass-card">
              <span className="info-icon">📅</span>
              <div>
                <strong>Date</strong>
                <p>{dateStr}</p>
              </div>
            </div>
            <div className="info-card glass-card">
              <span className="info-icon">🕐</span>
              <div>
                <strong>Time</strong>
                <p>{timeStr}</p>
              </div>
            </div>
            <div className="info-card glass-card">
              <span className="info-icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="info-card glass-card">
              <span className="info-icon">👥</span>
              <div>
                <strong>Capacity</strong>
                <p>{rsvpCount} / {event.capacity} spots filled</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="event-description glass-card">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="event-detail-sidebar">
          {/* RSVP Card */}
          <div className="rsvp-card glass-card">
            <h3>Reserve Your Spot</h3>

            {/* Capacity Bar */}
            <div className="capacity-bar-container">
              <div className="capacity-bar">
                <div
                  className="capacity-bar-fill"
                  style={{
                    width: `${capacityPercentage}%`,
                    background: capacityPercentage > 80
                      ? 'var(--danger)'
                      : capacityPercentage > 50
                      ? 'var(--warning)'
                      : 'var(--success)',
                  }}
                />
              </div>
              <span className="capacity-text">
                {isSoldOut
                  ? 'Sold out!'
                  : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} remaining`}
              </span>
            </div>

            {session ? (
              <RSVPButton
                eventId={event.id}
                hasRSVP={hasRSVP}
                isSoldOut={isSoldOut}
                isOrganizer={isOrganizer}
              />
            ) : (
              <Link href="/sign-in" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Sign in to RSVP
              </Link>
            )}
          </div>

          {/* Organizer Actions */}
          {isOrganizer && (
            <div className="organizer-actions glass-card">
              <h3>Manage Event</h3>
              <Link
                href={`/events/${event.id}/edit`}
                className="btn btn-secondary"
                id="edit-event-btn"
                style={{ width: '100%', marginBottom: '8px' }}
              >
                ✏️ Edit Event
              </Link>
              <DeleteEventButton eventId={event.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
