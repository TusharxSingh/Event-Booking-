export default function Loading() {
  return (
    <div className="container dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <div className="skeleton" style={{ width: '280px', height: '36px', marginBottom: '0.5rem' }} />
          <div className="skeleton" style={{ width: '200px', height: '18px' }} />
        </div>
      </div>

      <div className="dashboard-stats">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="glass-card stat-card" key={i}>
            <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
            <div className="skeleton" style={{ width: '48px', height: '32px', marginTop: '0.25rem' }} />
            <div className="skeleton" style={{ width: '80px', height: '14px' }} />
          </div>
        ))}
      </div>

      <div className="dashboard-tabs">
        <div className="tab-header">
          <div className="skeleton" style={{ width: '120px', height: '40px' }} />
          <div className="skeleton" style={{ width: '120px', height: '40px' }} />
        </div>
        <div className="dashboard-list">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="glass-card dashboard-item" key={i}>
              <div className="skeleton" style={{ width: '48px', height: '56px', borderRadius: '8px' }} />
              <div className="dashboard-item-info" style={{ flex: 1 }}>
                <div className="skeleton" style={{ width: '60%', height: '18px', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ width: '40%', height: '14px' }} />
              </div>
              <div className="skeleton" style={{ width: '80px', height: '36px', borderRadius: '8px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
