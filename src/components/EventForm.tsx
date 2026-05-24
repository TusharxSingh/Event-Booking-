'use client';

import { useActionState } from 'react';

interface EventFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: {
    title: string;
    description: string;
    location: string;
    date: string;
    capacity: number;
    imageUrl: string;
  };
  submitLabel: string;
}

export function EventForm({ action, initialData, submitLabel }: EventFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="event-form">
      {state?.error && (
        <div className="form-error">{state.error}</div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">Event Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-input"
          placeholder="e.g. Tech Meetup 2026"
          defaultValue={initialData?.title}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-input form-textarea"
          placeholder="Tell people what your event is about..."
          rows={5}
          defaultValue={initialData?.description}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date" className="form-label">Date &amp; Time</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            className="form-input"
            defaultValue={initialData?.date}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity" className="form-label">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            className="form-input"
            placeholder="50"
            min="1"
            defaultValue={initialData?.capacity}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          className="form-input"
          placeholder="e.g. San Francisco, CA or Online"
          defaultValue={initialData?.location}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl" className="form-label">
          Image URL <span className="form-label-optional">(optional)</span>
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          className="form-input"
          placeholder="https://example.com/image.jpg"
          defaultValue={initialData?.imageUrl}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={isPending}
        id="submit-event-btn"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
