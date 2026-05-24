'use client';

import { useState, useTransition } from 'react';
import { createRSVP, cancelRSVP } from '@/app/actions/rsvps';

interface RSVPButtonProps {
  eventId: string;
  hasRSVP: boolean;
  isSoldOut: boolean;
  isOrganizer: boolean;
}

export function RSVPButton({ eventId, hasRSVP, isSoldOut, isOrganizer }: RSVPButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [optimisticRSVP, setOptimisticRSVP] = useState(hasRSVP);

  if (isOrganizer) {
    return <div className="rsvp-organizer-badge">You&apos;re the organizer</div>;
  }

  const handleRSVP = () => {
    setError(null);
    setOptimisticRSVP(true);
    startTransition(async () => {
      const result = await createRSVP(eventId);
      if (result?.error) {
        setError(result.error);
        setOptimisticRSVP(false);
      }
    });
  };

  const handleCancel = () => {
    setError(null);
    setOptimisticRSVP(false);
    startTransition(async () => {
      const result = await cancelRSVP(eventId);
      if (result?.error) {
        setError(result.error);
        setOptimisticRSVP(true);
      }
    });
  };

  return (
    <div className="rsvp-container">
      {error && <p className="rsvp-error">{error}</p>}
      {optimisticRSVP ? (
        <div className="rsvp-confirmed">
          <span className="rsvp-check" aria-hidden>✓</span>
          <span>You&apos;re confirmed!</span>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="btn btn-ghost btn-sm"
            id="cancel-rsvp-btn"
          >
            {isPending ? 'Cancelling...' : 'Cancel RSVP'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleRSVP}
          disabled={isPending || isSoldOut}
          className={`btn btn-primary btn-lg rsvp-btn ${isSoldOut ? 'btn-disabled' : ''}`}
          id="rsvp-btn"
        >
          {isPending ? 'Confirming...' : isSoldOut ? 'Sold Out' : 'RSVP Now'}
        </button>
      )}
    </div>
  );
}
