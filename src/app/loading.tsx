import { EventGridSkeleton } from '@/components/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <div className="skeleton" style={{ width: '180px', height: '28px', borderRadius: '999px', margin: '0 auto 1.5rem' }} />
          <div className="skeleton" style={{ width: '80%', height: '48px', margin: '0 auto 1rem' }} />
          <div className="skeleton" style={{ width: '60%', height: '20px', margin: '0 auto 2rem' }} />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <div className="skeleton" style={{ width: '160px', height: '48px', borderRadius: '12px' }} />
            <div className="skeleton" style={{ width: '160px', height: '48px', borderRadius: '12px' }} />
          </div>
        </div>
      </div>
      <div className="featured-section">
        <div className="skeleton" style={{ width: '200px', height: '28px', marginBottom: '1.5rem' }} />
        <EventGridSkeleton count={3} />
      </div>
    </div>
  );
}
