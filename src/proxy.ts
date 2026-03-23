import createProxy from 'next-intl/middleware';

export default createProxy({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'always', // automatycznie dodaje /pl lub /en
});

export const config = {
  matcher: '/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)',
};