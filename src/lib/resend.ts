import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EventDetails {
  title: string;
  date: string;
  location: string;
  organizerName: string;
}

export async function sendRSVPConfirmation(
  to: string,
  userName: string,
  event: EventDetails
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'EventBooking <onboarding@resend.dev>',
      to: [to],
      subject: `You're confirmed for ${event.title}!`,
      html: `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">You're In! ✅</h1>
            <p style="color: rgba(255,255,255,0.85); margin-top: 8px; font-size: 16px;">Your RSVP has been confirmed</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #94a3b8; margin: 0 0 24px;">Hi ${userName},</p>
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px;">
              <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">${event.title}</h2>
              <p style="color: #94a3b8; margin: 4px 0;">📅 ${event.date}</p>
              <p style="color: #94a3b8; margin: 4px 0;">📍 ${event.location}</p>
              <p style="color: #94a3b8; margin: 4px 0;">👤 Hosted by ${event.organizerName}</p>
            </div>
            <p style="color: #64748b; margin-top: 24px; font-size: 14px;">We look forward to seeing you there!</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send confirmation email:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Email service error:', err);
    return { success: false, error: err };
  }
}

export async function sendRSVPCancellation(
  to: string,
  userName: string,
  event: EventDetails
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'EventBooking <onboarding@resend.dev>',
      to: [to],
      subject: `RSVP Cancelled: ${event.title}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #475569, #64748b); padding: 40px 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">RSVP Cancelled</h1>
            <p style="color: rgba(255,255,255,0.85); margin-top: 8px; font-size: 16px;">We're sorry to see you go</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #94a3b8; margin: 0 0 24px;">Hi ${userName},</p>
            <p style="color: #94a3b8; margin: 0 0 16px;">Your RSVP for the following event has been cancelled:</p>
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px;">
              <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">${event.title}</h2>
              <p style="color: #94a3b8; margin: 4px 0;">📅 ${event.date}</p>
              <p style="color: #94a3b8; margin: 4px 0;">📍 ${event.location}</p>
            </div>
            <p style="color: #64748b; margin-top: 24px; font-size: 14px;">Changed your mind? You can always RSVP again from the event page.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send cancellation email:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Email service error:', err);
    return { success: false, error: err };
  }
}
