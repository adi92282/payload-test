import Link from 'next/link'  
import React from 'react'  
import {useTranslations} from 'next-intl'  

export default function NotFound() {  
// initialize our useTranslations hook using the constant t
  const t = useTranslations()  
  return (  
    <div className={`container py-28 mx-auto text-center`}>  
      <div className={`max-w-none`}>  
        <h1 className={`mb-0`}>404</h1>  
        {/* we'll include a paragraph tag using our useTranslations hook by passing in our page-not-found key that was setup in our messages directory */}
        <p className={`mb-4`}>{t('page-not-found')}</p>  
      </div>  
      <Link href={'/'} className={`bg-emerald-950 text-emerald-50 px-4 py-2`}>
      {/* we'll use our useTranslations() hook again by using t() and the 'go-home' key */}
      {t('go-home')}
      </Link>  
    </div>  
  )  
}
