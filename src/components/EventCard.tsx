import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  capacity: number;
  rsvpCount: number;
  imageUrl?: string | null;
  organizerName: string;
}

export function EventCard({
  id, title, description, location, date, capacity, rsvpCount, imageUrl, organizerName
}: EventCardProps) {
  const spotsLeft = capacity - rsvpCount;
  const isSoldOut = spotsLeft <= 0;
  const isAlmostFull = spotsLeft <= Math.ceil(capacity * 0.2) && !isSoldOut;

  const eventDate = new Date(date);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
  const day = eventDate.getDate();
  const time = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <Link href={`/events/${id}`} className="event-card glass-card" id={`event-card-${id}`}>
      <div
        className="event-card-image"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        }}
      >
        <div className="event-card-date-badge">
          <span className="date-month">{month}</span>
          <span className="date-day">{day}</span>
        </div>
        {isSoldOut && <span className="badge badge-danger event-card-badge">Sold Out</span>}
        {isAlmostFull && <span className="badge badge-warning event-card-badge">Almost Full</span>}
      </div>
      <div className="event-card-content">
        <h3 className="event-card-title">{title}</h3>
        <p className="event-card-description">
          {description.slice(0, 100)}{description.length > 100 ? '...' : ''}
        </p>
        <div className="event-card-meta">
          <span className="event-card-location">📍 {location}</span>
          <span className="event-card-time">🕐 {time}</span>
        </div>
        <div className="event-card-footer">
          <span className="event-card-organizer">By {organizerName}</span>
          <span className="event-card-spots">
            {isSoldOut ? 'No spots left' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>
      </div>
    </Link>
  );
}
