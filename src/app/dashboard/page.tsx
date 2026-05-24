import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { DashboardClient } from '@/components/DashboardClient';

export const metadata = {
  title: 'Dashboard | EventBooking',
  description: 'Manage your events and RSVPs.',
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session) redirect('/sign-in?callbackUrl=/dashboard');

  const myEvents = await prisma.event.findMany({
    where: { organizerId: session.user.id },
    include: {
      _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } },
    },
    orderBy: { date: 'desc' },
  });

  const myRSVPs = await prisma.rSVP.findMany({
    where: {
      userId: session.user.id,
      status: 'CONFIRMED',
    },
    include: {
      event: {
        include: {
          organizer: { select: { name: true } },
          _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const upcomingRSVPs = myRSVPs.filter((r) => new Date(r.event.date) >= new Date());
  const totalAttendees = myEvents.reduce((sum, e) => sum + e._count.rsvps, 0);

  return (
    <div className="dashboard-page">
      <div className="section-title page-header">
        <h1>Dashboard</h1>
        <div className="section-title-underline" />
        <p>Welcome back, {session.user.name}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-number">{myEvents.length}</span>
            <span className="stat-label">Events Created</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-number">{upcomingRSVPs.length}</span>
            <span className="stat-label">Upcoming RSVPs</span>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-number">{totalAttendees}</span>
            <span className="stat-label">Total Attendees</span>
          </div>
        </div>
      </div>

      <DashboardClient
        myEvents={myEvents.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.date.toISOString(),
          location: e.location,
          capacity: e.capacity,
          rsvpCount: e._count.rsvps,
        }))}
        myRSVPs={myRSVPs.map((r) => ({
          id: r.id,
          eventId: r.event.id,
          eventTitle: r.event.title,
          eventDate: r.event.date.toISOString(),
          eventLocation: r.event.location,
          organizerName: r.event.organizer.name,
        }))}
      />
    </div>
  );
}
