import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navLinks } from '../../content/homepage';
import LanguageSwitcher, { MobileLanguageSelector } from '../ui/LanguageSwitcher';

const CONTACT_CTA_LABEL = 'Contact';

export default function Nav() {
  const { t } = useTranslation();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        aria-label={t('nav.ariaLabel')}
        className={`nav-root group/nav fixed inset-x-0 top-0 h-header z-[100] grid grid-cols-[1fr_auto_1fr] items-center px-gutter
          max-md:flex max-md:justify-between max-md:px-5
          bg-transparent border-b border-transparent backdrop-blur-0
          transition-[background,backdrop-filter,border-color] duration-600 ease-out-soft
          hover:bg-white/[0.85] hover:backdrop-blur-[16px] hover:border-b-line
          [&.is-solid]:bg-white/[0.85] [&.is-solid]:backdrop-blur-[16px] [&.is-solid]:border-b-line
          ${solid ? 'is-solid' : ''}`}
      >
        <a
          className="flex items-center gap-[10px] justify-self-start"
          href="#top"
          aria-label={t('nav.home')}
        >
          <img
            className="h-[22px] [filter:brightness(0)_invert(1)] transition-[filter] duration-600 ease-out-soft group-hover/nav:filter-none group-[.is-solid]/nav:filter-none"
            src="/assets/logo_dark.png"
            alt="Bookly"
          />
        </a>
        <div className="flex gap-9 max-md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-md font-medium tracking-[0.005em] no-underline text-white/[0.85] transition-colors duration-[400ms] ease-out-soft
                group-hover/nav:text-ink-2 group-[.is-solid]/nav:text-ink-2
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-current after:transition-[width] after:duration-200 after:ease-out-soft hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 justify-self-end">
          <div className="max-md:hidden">
            <LanguageSwitcher />
          </div>
          <a
            href="#contact"
            className="inline-flex h-[42px] items-center gap-2 font-medium px-5 rounded-pill bg-night text-paper no-underline transition-[background,color] duration-[400ms] ease-out-soft
              max-[980px]:hidden hover:bg-ink-1"
          >
            <Mail size={18} strokeWidth={1.9} aria-hidden="true" />
            {CONTACT_CTA_LABEL}
          </a>
          <button
            type="button"
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="hidden max-md:inline-flex items-center justify-center w-10 h-10 rounded-pill bg-transparent text-white/[0.88] cursor-pointer transition-[color,background] duration-600 ease-out-soft
              hover:bg-white/[0.14]
              group-hover/nav:text-ink-1 group-[.is-solid]/nav:text-ink-1
              group-hover/nav:hover:bg-[rgba(31,24,18,0.06)] group-[.is-solid]/nav:hover:bg-[rgba(31,24,18,0.06)]"
          >
            <Menu size={24} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.ariaLabel')}
          className="fixed inset-0 z-[200] bg-white flex flex-col animate-mobile-menu-in"
        >
          <header className="grid grid-cols-[40px_1fr_40px] items-center h-header px-4 border-b border-line">
            <button
              type="button"
              aria-label={t('nav.closeMenu')}
              onClick={() => setMenuOpen(false)}
              className="justify-self-start inline-flex items-center justify-center w-10 h-10 border-0 rounded-pill bg-transparent text-bookly-primary cursor-pointer transition-[background,color] duration-240 ease-out-soft hover:bg-bookly-primary/[0.08] hover:text-bookly-deep"
            >
              <X size={24} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <a
              href="#top"
              aria-label={t('nav.home')}
              onClick={() => setMenuOpen(false)}
              className="justify-self-center inline-flex items-center"
            >
              <img className="h-[22px] w-auto" src="/assets/logo_dark.png" alt="Bookly" />
            </a>
            <a
              href="#contact"
              aria-label={t('nav.contactCta')}
              onClick={() => setMenuOpen(false)}
              className="justify-self-end inline-flex items-center justify-center w-10 h-10 border-0 rounded-pill bg-transparent text-bookly-primary no-underline transition-[background,color] duration-240 ease-out-soft hover:bg-bookly-primary/[0.08] hover:text-bookly-deep"
            >
              <Mail size={22} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </header>

          <ul className="list-none m-0 px-4 pt-8 pb-24 flex flex-col items-center gap-8 flex-1 justify-center">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-normal tracking-[-0.005em] text-ink-1 no-underline px-4 py-[6px] transition-colors duration-240 ease-out-soft hover:text-bookly-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto px-5 py-5">
            <MobileLanguageSelector />
          </div>
        </div>
      )}
    </>
  );
}
