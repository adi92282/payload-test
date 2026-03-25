import LanguageSwitcher from "@/components/LanguageSwich"
import { getTranslations } from "next-intl/server"

const Design = async () => {
  const t = await getTranslations()

  return (
    <main className="container mx-auto py-16 text-center">
      <LanguageSwitcher />
      <h1 className="text-4xl font-bold mb-4">{t('design-title')}</h1>
      <p className="text-lg">{t('design-description')}</p>
      <p className="text-lg">{t('design-description')}</p>
    </main>
  )
}

export default Design