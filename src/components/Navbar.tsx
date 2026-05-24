import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  return (
    <nav className="navbar" id="site-navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-text">EventBooking</span>
          <span className="logo-dot" aria-hidden />
        </Link>
        <div className="navbar-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/events" className="nav-link hide-mobile">Browse Events</Link>
          {session ? (
            <>
              <Link href="/events/new" className="btn btn-primary btn-sm">
                + Create Event
              </Link>
              <Link href="/dashboard" className="nav-link hide-mobile">Dashboard</Link>
              <NavbarClient userName={session.user.name} />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="nav-auth-text">Login</Link>
              <span className="nav-divider" aria-hidden>|</span>
              <Link href="/sign-up" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
