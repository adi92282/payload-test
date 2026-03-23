// app/proxy.ts
import createProxy from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// i18n proxy
export default createProxy({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)' // wszystkie ścieżki poza api/_next/static itd.
  ],
};

// Middleware do przekierowania root "/" → "/pl"
export function middleware(req: NextRequest): NextResponse | undefined {
  const { pathname } = req.nextUrl;

  // 🔹 Ignoruj /admin i wszystko w /admin
  if (pathname.startsWith('/admin')) {
    return undefined; // przekazujemy dalej, nie zmieniamy URL
  }

  // 🔹 Root "/" → domyślny locale
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/pl';
    return NextResponse.redirect(url);
  }

  // Pozostałe ścieżki obsługuje next-intl proxy
  return undefined;
}