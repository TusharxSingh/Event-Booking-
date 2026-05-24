import Link from 'next/link';
import { IconClock, IconLocation } from './Icons';

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

  const eventDate = new Date(date);
  const dateLabel = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const initials = organizerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/events/${id}`} className="event-card" id={`event-card-${id}`}>
      <div
        className={`event-card-image${imageUrl ? '' : ' event-card-image--placeholder'}`}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      >
        <span className="event-card-avatar" title={organizerName}>
          {initials}
        </span>
        {isSoldOut && <span className="badge badge-danger event-card-badge">Sold Out</span>}
      </div>
      <div className="event-card-content">
        <h3 className="event-card-title">{title}</h3>
        <p className="event-card-description">
          {description.slice(0, 100)}{description.length > 100 ? '...' : ''}
        </p>
        <div className="event-card-meta">
          <span className="event-card-meta-item">
            <IconClock className="event-card-meta-icon" />
            {dateLabel} · {time}
          </span>
          <span className="event-card-meta-item">
            <IconLocation className="event-card-meta-icon" />
            {location}
          </span>
        </div>
        <div className="event-card-footer">
          <span className="event-card-ticket">Get Ticket</span>
          <span className="event-card-spots">
            {isSoldOut ? 'Sold out' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>
      </div>
    </Link>
  );
}
