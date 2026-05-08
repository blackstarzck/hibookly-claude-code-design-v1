import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, type Lang, buildLangPath } from '../../../i18n';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.language as Lang;

  const onChange = (lang: Lang) => {
    if (lang === current) return;
    const next = buildLangPath(lang);
    window.history.replaceState(null, '', next + window.location.hash);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="lang-switcher" role="group" aria-label={t('languageSwitcher.ariaLabel')}>
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`lang-switcher__btn${lang === current ? ' is-active' : ''}`}
          onClick={() => onChange(lang)}
          aria-pressed={lang === current}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
