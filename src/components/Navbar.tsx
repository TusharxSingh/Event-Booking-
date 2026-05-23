import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">EventBooking</span>
        </Link>
        <div className="navbar-links">
          <Link href="/events" className="nav-link">Browse Events</Link>
          {session ? (
            <>
              <Link href="/events/new" className="nav-link">Create Event</Link>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <NavbarClient userName={session.user.name} />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="nav-link">Sign In</Link>
              <Link href="/sign-up" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
