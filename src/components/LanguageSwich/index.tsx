'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (locale: 'pl' | 'en') => {
    // W App Router trzeba podać pathname i locale
    router.push(`/${locale}${pathname.replace(/^\/(pl|en)/, '')}`)
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('pl')}>PL</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  )
}