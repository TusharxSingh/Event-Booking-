import { EventDetailSkeleton } from '@/components/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="event-detail-page">
      <EventDetailSkeleton />
    </div>
  );
}
