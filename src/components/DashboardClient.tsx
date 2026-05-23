'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cancelRSVP } from '@/app/actions/rsvps';

interface MyEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  rsvpCount: number;
}

interface MyRSVP {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  organizerName: string;
}

interface DashboardClientProps {
  myEvents: MyEvent[];
  myRSVPs: MyRSVP[];
}

export function DashboardClient({ myEvents, myRSVPs }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'events' | 'rsvps'>('events');

  return (
    <div className="dashboard-tabs">
      <div className="tab-header">
        <button
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
          id="tab-my-events"
        >
          My Events ({myEvents.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'rsvps' ? 'active' : ''}`}
          onClick={() => setActiveTab('rsvps')}
          id="tab-my-rsvps"
        >
          My RSVPs ({myRSVPs.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'events' && (
          <div className="tab-panel">
            {myEvents.length === 0 ? (
              <div className="empty-state glass-card">
                <span className="empty-icon">📅</span>
                <h3>No events yet</h3>
                <p>Create your first event and start building your community.</p>
                <Link href="/events/new" className="btn btn-primary">
                  Create Event
                </Link>
              </div>
            ) : (
              <div className="dashboard-list">
                {myEvents.map((event) => {
                  const eventDate = new Date(event.date);
                  const isPast = eventDate < new Date();
                  return (
                    <div key={event.id} className={`dashboard-item glass-card ${isPast ? 'past' : ''}`}>
                      <div className="dashboard-item-date">
                        <span className="date-month">
                          {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="date-day">{eventDate.getDate()}</span>
                      </div>
                      <div className="dashboard-item-info">
                        <h4>
                          <Link href={`/events/${event.id}`}>{event.title}</Link>
                        </h4>
                        <p className="dashboard-item-meta">
                          📍 {event.location} · 👥 {event.rsvpCount}/{event.capacity} RSVPs
                          {isPast && <span className="badge badge-warning" style={{ marginLeft: '0.5rem' }}>Past</span>}
                        </p>
                      </div>
                      <div className="dashboard-item-actions">
                        <Link href={`/events/${event.id}/edit`} className="btn btn-ghost btn-sm">
                          ✏️ Edit
                        </Link>
                        <Link href={`/events/${event.id}`} className="btn btn-ghost btn-sm">
                          View →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'rsvps' && (
          <div className="tab-panel">
            {myRSVPs.length === 0 ? (
              <div className="empty-state glass-card">
                <span className="empty-icon">🎟️</span>
                <h3>No RSVPs yet</h3>
                <p>Browse events and RSVP to something exciting!</p>
                <Link href="/events" className="btn btn-primary">
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="dashboard-list">
                {myRSVPs.map((rsvp) => {
                  const eventDate = new Date(rsvp.eventDate);
                  const isPast = eventDate < new Date();
                  return (
                    <div key={rsvp.id} className={`dashboard-item glass-card ${isPast ? 'past' : ''}`}>
                      <div className="dashboard-item-date">
                        <span className="date-month">
                          {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="date-day">{eventDate.getDate()}</span>
                      </div>
                      <div className="dashboard-item-info">
                        <h4>
                          <Link href={`/events/${rsvp.eventId}`}>{rsvp.eventTitle}</Link>
                        </h4>
                        <p className="dashboard-item-meta">
                          📍 {rsvp.eventLocation} · By {rsvp.organizerName}
                          {isPast && <span className="badge badge-warning" style={{ marginLeft: '0.5rem' }}>Past</span>}
                        </p>
                      </div>
                      <div className="dashboard-item-actions">
                        {!isPast && (
                          <CancelRSVPButton eventId={rsvp.eventId} />
                        )}
                        <Link href={`/events/${rsvp.eventId}`} className="btn btn-ghost btn-sm">
                          View →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CancelRSVPButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm('Cancel your RSVP for this event?')) return;
    setLoading(true);
    await cancelRSVP(eventId);
    setLoading(false);
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="btn btn-ghost btn-sm"
    >
      {loading ? 'Cancelling...' : '❌ Cancel'}
    </button>
  );
}
