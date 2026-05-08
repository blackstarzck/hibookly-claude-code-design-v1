import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import { services } from '../../content/homepage';

export default function About() {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className="px-gutter py-section-y min-h-svh max-md:min-h-0 max-md:py-[88px]"
    >
      <div className="max-w-container mx-auto relative">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-px p-px bg-paper">
          {services.map((svc, i) => (
            <Reveal
              key={svc.num}
              className="bg-white p-12 max-md:p-7 min-h-[240px] max-md:min-h-0 flex flex-col justify-between transition-[background,transform] duration-600 ease-out-soft"
              delay={i * 100}
            >
              <div className="font-serif text-[22px] max-md:text-sm text-bookly-primary font-normal">
                {svc.num}
              </div>
              <div>
                <h3 className="font-medium tracking-snug m-0 mb-3 text-ink-1 text-2xl max-md:text-xl">
                  {t(svc.titleKey)}
                </h3>
                <p className="leading-[1.6] text-ink-3 m-0 max-w-[420px]">{t(svc.bodyKey)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
