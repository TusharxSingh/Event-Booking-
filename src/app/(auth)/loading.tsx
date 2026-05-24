export default function Loading() {
  return (
    <div className="auth-card glass-card" style={{ maxWidth: '440px', margin: '0 auto', padding: '2.5rem' }}>
      <div className="skeleton" style={{ width: '180px', height: '32px', margin: '0 auto 0.5rem' }} />
      <div className="skeleton" style={{ width: '260px', height: '16px', margin: '0 auto 2rem' }} />
      <div className="skeleton" style={{ width: '60px', height: '14px', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '8px', marginBottom: '1.25rem' }} />
      <div className="skeleton" style={{ width: '60px', height: '14px', marginBottom: '0.5rem' }} />
      <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '8px', marginBottom: '1.25rem' }} />
      <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px', marginTop: '0.5rem' }} />
    </div>
  );
}
