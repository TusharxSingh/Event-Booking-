'use client';

import { useState, useTransition } from 'react';
import { deleteEvent } from '@/app/actions/events';

export function DeleteEventButton({ eventId }: { eventId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteEvent(eventId);
    });
  };

  if (confirming) {
    return (
      <div className="delete-confirm">
        <p className="delete-confirm-text">Are you sure? This cannot be undone.</p>
        <div className="delete-confirm-actions">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="btn btn-danger btn-sm"
            id="confirm-delete-btn"
          >
            {isPending ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="btn btn-ghost btn-sm"
            id="cancel-delete-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="btn btn-danger"
      id="delete-event-btn"
      style={{ width: '100%' }}
    >
      Delete Event
    </button>
  );
}
