import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = ['/dashboard', '/events/new'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route)) ||
    /^\/events\/[^/]+\/edit$/.test(pathname);
  
  if (isProtected) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
