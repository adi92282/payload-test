'use client';

import {usePathname, useRouter} from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}${pathname}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('pl')}>PL</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
}