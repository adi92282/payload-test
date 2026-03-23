'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: 'pl' | 'en' }) {
  const router = useRouter()
  const pathname = usePathname()

  // 🔹 nie pokazuj switchera w /admin
  if (pathname.startsWith('/admin')) return null

  const changeLanguage = (locale: 'pl' | 'en') => {
    let newPath = pathname.replace(/^\/(pl|en)/, '') // usuń obecny prefix
    if (locale !== 'pl') {
      newPath = `/${locale}${newPath}` // dodaj prefix tylko dla non-default
    }
    router.push(newPath)
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('pl')} disabled={currentLocale === 'pl'}>🇵🇱</button>
      <button onClick={() => changeLanguage('en')} disabled={currentLocale === 'en'}>🇬🇧</button>
    </div>
  )
}