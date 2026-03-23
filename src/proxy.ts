// app/proxy.ts
import createProxy from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default createProxy({
  locales: ['pl', 'en'],       // dostępne języki
  defaultLocale: 'pl',          // domyślny język
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
  ],
};

// Przekierowanie root "/" → domyślny locale
export function middleware(req: NextRequest): NextResponse | undefined {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/pl';   // domyślny język
    return NextResponse.redirect(url);
  }

  // Zwracamy undefined, żeby default proxy działało dla reszty
  return undefined;
}