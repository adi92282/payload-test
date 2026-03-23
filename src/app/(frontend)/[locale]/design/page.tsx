import LanguageSwitcher from "@/components/LanguageSwich"
import { useTranslations } from "next-intl"

const Design = async () => {
    const t = useTranslations()
    return (
        <main>
            <LanguageSwitcher />
            <div className="text-center text-4xl">
                <p>{t('page-not-found')}</p>
            </div>
        </main>
    )
}
export default Design