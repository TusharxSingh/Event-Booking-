import { EventGridSkeleton } from '@/components/LoadingSkeleton';

export default function HomeLoading() {
  return (
    <div className="home-page">
      <div className="hero" style={{ minHeight: '480px' }}>
        <div className="hero-content" style={{ width: '100%', maxWidth: '640px' }}>
          <div className="skeleton" style={{ width: '70%', height: '40px', margin: '0 auto 1rem' }} />
          <div className="skeleton" style={{ width: '50%', height: '18px', margin: '0 auto 2rem' }} />
          <div className="skeleton" style={{ width: '100%', height: '52px', borderRadius: '8px' }} />
        </div>
      </div>
      <div className="featured-section">
        <div className="skeleton" style={{ width: '200px', height: '28px', marginBottom: '1.5rem' }} />
        <EventGridSkeleton count={3} />
      </div>
    </div>
  );
}
