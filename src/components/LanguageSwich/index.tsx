'use client';

import { usePathname, useRouter } from 'next/navigation';

const locales = ['pl', 'en'];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    const segments = pathname.split('/');

    // jeśli pierwszy segment to locale → usuń go
    if (locales.includes(segments[1])) {
      segments.splice(1, 1);
    }

    const newPath = `/${locale}${segments.join('/')}`;

    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('pl')}>PL</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
}