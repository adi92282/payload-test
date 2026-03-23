import { NextRequest, NextResponse } from 'next/server';
import createProxy from 'next-intl/middleware';

export default createProxy({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'never', // 🔹 nie dopisujemy domyślnego locale
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export function middleware(req: NextRequest): NextResponse | undefined {
  const { pathname } = req.nextUrl;

  // 🔹 Wszystkie ścieżki /admin ignorujemy
  if (pathname.startsWith('/admin')) {
    return NextResponse.next(); // Payload CMS obsługuje panel
  }

  // 🔹 Root "/" → domyślny locale
  if (pathname === '/' || pathname === '/pl') {
    return undefined; // nic nie robimy, domyślny język bez /pl
  }

  return undefined;
}