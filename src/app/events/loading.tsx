import { EventGridSkeleton } from '@/components/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="events-page">
      <div style={{ marginBottom: '2rem' }}>
        <div className="skeleton" style={{ width: '240px', height: '36px', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '320px', height: '18px' }} />
      </div>
      <EventGridSkeleton count={6} />
    </div>
  );
}
