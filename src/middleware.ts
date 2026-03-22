import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // this prevents our backend routes from being lumped into this so our APIs don't get internationalized as well
  matcher: '/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)',
}
