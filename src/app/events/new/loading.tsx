export default function Loading() {
  return (
    <div className="create-event-page">
      <div className="skeleton" style={{ width: '200px', height: '36px', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ width: '300px', height: '18px', marginBottom: '2rem' }} />
      <div className="glass-card form-container" style={{ padding: '2rem' }}>
        <div className="skeleton" style={{ width: '100px', height: '16px', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '8px', marginBottom: '1.5rem' }} />
        <div className="skeleton" style={{ width: '100px', height: '16px', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: '8px', marginBottom: '1.5rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div className="skeleton" style={{ width: '100px', height: '16px', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '8px' }} />
          </div>
          <div>
            <div className="skeleton" style={{ width: '80px', height: '16px', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '8px' }} />
          </div>
        </div>
        <div className="skeleton" style={{ width: '100px', height: '16px', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '8px', marginBottom: '1.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
      </div>
    </div>
  );
}
