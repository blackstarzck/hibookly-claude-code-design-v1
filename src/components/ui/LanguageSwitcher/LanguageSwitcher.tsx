import { useEffect, useRef, useState } from 'react';
import { Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, type Lang, buildLangPath } from '../../../i18n';

function changeLanguage(lang: Lang, current: Lang, i18n: ReturnType<typeof useTranslation>['i18n']) {
  if (lang === current) return;

  const next = buildLangPath(lang);
  window.history.replaceState(null, '', next + window.location.hash);
  i18n.changeLanguage(lang);
}

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.language as Lang;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const onChange = (lang: Lang) => {
    setOpen(false);
    changeLanguage(lang, current, i18n);
  };

  return (
    <div ref={rootRef} className="lang-switcher">
      <button
        type="button"
        className="lang-switcher__trigger"
        aria-label={t('languageSwitcher.ariaLabel')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe2 className="lang-switcher__globe" size={18} strokeWidth={1.9} aria-hidden="true" />
        <span>{t(`languageSwitcher.${current}`)}</span>
      </button>

      {open && (
        <div className="lang-switcher__menu" role="listbox" aria-label={t('languageSwitcher.ariaLabel')}>
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang}
              type="button"
              className={`lang-switcher__option${lang === current ? ' is-active' : ''}`}
              role="option"
              aria-selected={lang === current}
              onClick={() => onChange(lang)}
            >
              {t(`languageSwitcher.${lang}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileLanguageSelector() {
  const { t, i18n } = useTranslation();
  const current = i18n.language as Lang;

  return (
    <div className="mobile-lang-selector" role="radiogroup" aria-label={t('languageSwitcher.ariaLabel')}>
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`mobile-lang-selector__option${lang === current ? ' is-active' : ''}`}
          role="radio"
          aria-checked={lang === current}
          onClick={() => changeLanguage(lang, current, i18n)}
        >
          {t(`languageSwitcher.${lang}`)}
        </button>
      ))}
    </div>
  );
}
