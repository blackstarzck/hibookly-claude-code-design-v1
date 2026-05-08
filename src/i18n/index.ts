import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko.json';
import en from './locales/en.json';
import vi from './locales/vi.json';

export const SUPPORTED_LANGS = ['ko', 'en', 'vi'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = 'ko';

const OG_LOCALE: Record<Lang, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  vi: 'vi_VN',
};

export function detectLangFromPath(pathname: string = window.location.pathname): Lang {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (SUPPORTED_LANGS as readonly string[]).includes(seg) ? (seg as Lang) : DEFAULT_LANG;
}

export function buildLangPath(lang: Lang, pathname: string = window.location.pathname): string {
  const segs = pathname.split('/').filter(Boolean);
  if ((SUPPORTED_LANGS as readonly string[]).includes(segs[0])) segs.shift();
  const rest = segs.join('/');
  if (lang === DEFAULT_LANG) return '/' + (rest ? rest + '/' : '');
  return '/' + lang + (rest ? '/' + rest : '') + '/';
}

function syncDocumentLang(lang: Lang) {
  document.documentElement.lang = lang;
  const og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute('content', OG_LOCALE[lang]);
}

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: detectLangFromPath(),
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
  returnNull: false,
});

syncDocumentLang(i18n.language as Lang);
i18n.on('languageChanged', (lng) => syncDocumentLang(lng as Lang));

export default i18n;
