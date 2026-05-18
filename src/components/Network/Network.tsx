import { useTranslation } from 'react-i18next';
import ContentSection from '../ui/ContentSection';
import { sectionTitles } from '../../content/homepage';

type LogoSize = 'wide' | 'midWide' | 'mid' | 'square';

const companyLogos: Array<{ name: string; src: string; size: LogoSize }> = [
  { name: 'Bookly', src: '/companies/bookly.png', size: 'wide' },
  { name: 'Compass Education', src: '/companies/compass-edu.png', size: 'square' },
  { name: 'Fiktech', src: '/companies/fiktech.png', size: 'square' },
  { name: 'Glowin Vina', src: '/companies/glowinvina.png', size: 'wide' },
  { name: 'KCompass', src: '/companies/kcompass.png', size: 'midWide' },
  { name: 'Keduall', src: '/companies/keduall.png', size: 'wide' },
  { name: 'Kibble', src: '/companies/kibble.png', size: 'midWide' },
  { name: 'Vinatree', src: '/companies/vinatree.png', size: 'mid' },
  { name: 'Wisdom Cellar', src: '/companies/wisdomcellar.png', size: 'mid' },
  { name: 'Biblia', src: '/companies/biblia.png', size: 'wide' },
  { name: 'Bookchaka', src: '/companies/bookchaka.png', size: 'square' },
];

const logoSizeClass: Record<LogoSize, string> = {
  wide: 'h-10 max-md:h-11',
  midWide: 'h-12 max-md:h-[52px]',
  mid: 'h-14 max-md:h-[60px]',
  square: 'h-16 max-md:h-[68px]',
};

export default function Network() {
  const { t } = useTranslation();

  return (
    <div className="relative isolate overflow-hidden bg-night">
      <img
        src="/network.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 w-[min(58vw,780px)] max-w-none opacity-80 mix-blend-screen [mask-image:radial-gradient(ellipse_at_72%_72%,black_0%,black_48%,transparent_76%)] [-webkit-mask-image:radial-gradient(ellipse_at_72%_72%,black_0%,black_48%,transparent_76%)] max-md:w-[115vw] max-md:opacity-60"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-night via-night/45 to-transparent" />
      <ContentSection
        id="network"
        tone="dark"
        title={sectionTitles.network}
        className="relative z-10 bg-transparent text-night-fg-1 overflow-hidden"
      >
        <ul
          className="relative z-10 grid grid-cols-4 gap-3 max-md:grid-cols-3 max-[520px]:grid-cols-2"
          aria-label={t('network.ariaLabel')}
        >
          {companyLogos.map((logo) => (
            <li
              key={logo.src}
              className="flex h-[104px] items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className={`w-auto max-w-full object-contain opacity-80 brightness-0 invert ${logoSizeClass[logo.size]}`}
              />
            </li>
          ))}
        </ul>
      </ContentSection>
    </div>
  );
}
