export function EventCardSkeleton() {
  return (
    <div className="event-card glass-card skeleton-card">
      <div className="skeleton skeleton-image" />
      <div className="event-card-content">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="events-grid">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function EventDetailSkeleton() {
  return (
    <div className="event-detail">
      <div className="skeleton skeleton-hero" />
      <div className="event-detail-content">
        <div className="skeleton skeleton-title large" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
      </div>
    </div>
  );
}
