import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  if (pathname.includes('/admin')) {
    // Allow access to the login page
    if (pathname.endsWith('/admin/login')) {
      return NextResponse.next();
    }

    // Check for the admin session cookie
    const session = request.cookies.get('admin_session');

    if (!session) {
      // Extract locale from pathname if present (e.g., /en/admin -> /en/admin/login)
      const segments = pathname.split('/');
      const locale = segments[1] || 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
