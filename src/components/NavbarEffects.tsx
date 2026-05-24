'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function NavbarEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.getElementById('site-navbar');
    if (!nav) return;

    const isHome = pathname === '/';

    if (isHome) {
      nav.classList.add('navbar--overlay');
    } else {
      nav.classList.remove('navbar--overlay', 'navbar--scrolled');
    }

    const onScroll = () => {
      if (!isHome) return;
      if (window.scrollY > 60) {
        nav.classList.add('navbar--scrolled');
      } else {
        nav.classList.remove('navbar--scrolled');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
