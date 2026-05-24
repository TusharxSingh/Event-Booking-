import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { NavbarEffects } from '@/components/NavbarEffects';
import { TopLoader } from '@/components/TopLoader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'EventBooking | Discover & Book Events',
  description: 'Discover, create, and RSVP to events. A modern event booking platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <TopLoader />
        <NavbarEffects />
        <Navbar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
