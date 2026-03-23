import LanguageSwitcher from "@/components/LanguageSwich"
import { getTranslations } from "next-intl/server"

const Design = async () => {
    const t = await getTranslations()
    return (
        <main>
            <div className="text-center text-4xl">
                <p>{t('page-not-found')}</p>
            </div>
        </main>
    )
}

export default Design