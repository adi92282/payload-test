"use client"
import { useRouter } from "next/navigation"

export default function LanguageSwitcher() {
  const router = useRouter()

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}/design`)
  }

  return (
    <div className="flex gap-2 p-4">
      <button onClick={() => changeLanguage("pl")}>PL</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
    </div>
  )
}