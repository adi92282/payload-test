import { getRequestConfig } from 'next-intl/server'  
import { routing } from './routing'  
import en from './messages/en.json'  

type Messages = typeof en  

declare global {  
  interface IntlMessages extends Messages {}  
}  

export default getRequestConfig(async ({ requestLocale }) => {  
  let locale = await requestLocale  
  // we'll want to ensure that a valid locale is used by checking if that locale exists
  if (!locale || !routing.locales.includes(locale as any)) {  
  // and if it doesn't, we can set locale to our default locale from our routing config.
    locale = routing.defaultLocale  
    // this means if I put in any other 2 digit country code in place of en or es, it will redirect me automatically to my english locale
  }  

  return {  
    locale,  
    messages: (await import(`./messages/${locale}.json`)).default,  
  }  
})