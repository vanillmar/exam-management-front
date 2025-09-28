import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    console.error('Middleware running for:', request.url);
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Optionally verify token here
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};