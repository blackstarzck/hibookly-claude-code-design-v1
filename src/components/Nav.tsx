import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { navLinks } from '../content/homepage';

export default function Nav() {
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
      <nav className={`nav${solid ? ' is-solid' : ''}`} aria-label="주요 메뉴">
        <a className="nav__brand" href="#top" aria-label="Bookly 홈">
          <img className="nav__logo" src="/assets/logo_dark.png" alt="Bookly" />
        </a>
        <div className="nav__links">
          {navLinks.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>{l.label}</a>
          ))}
        </div>
        <a className="nav__cta" href="#contact">문의하기</a>
        <button
          type="button"
          className="nav__menu-trigger"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="주요 메뉴">
          <header className="mobile-menu__header">
            <button
              type="button"
              className="mobile-menu__icon-btn mobile-menu__close"
              aria-label="메뉴 닫기"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <a
              className="mobile-menu__brand"
              href="#top"
              aria-label="Bookly 홈"
              onClick={() => setMenuOpen(false)}
            >
              <img className="mobile-menu__logo" src="/assets/logo_dark.png" alt="Bookly" />
            </a>
            <a
              className="mobile-menu__icon-btn mobile-menu__action"
              href="#contact"
              aria-label="문의하기"
              onClick={() => setMenuOpen(false)}
            >
              <Mail size={22} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </header>

          <ul className="mobile-menu__list">
            {navLinks.map((l) => (
              <li key={l.href} className="mobile-menu__item">
                <a
                  className="mobile-menu__link"
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
