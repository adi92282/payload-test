import { defineRouting } from 'next-intl/routing'  
import { createNavigation } from 'next-intl/navigation'  
import localization from './localization'  

export const routing = defineRouting({  
  locales: localization.locales.map((locale) => locale.code),  
  defaultLocale: localization.defaultLocale,  
})  
  
// we can then destructure our createNavigation function with routing passed into it and pull out the navigation APIs we may use
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)  

// lastly, we can export a type called Locale that is equal to the type of our routing.locales as an array
export type Locale = (typeof routing.locales)[number]