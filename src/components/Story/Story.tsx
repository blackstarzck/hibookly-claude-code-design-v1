import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import ContentSection from '../ui/ContentSection';

const wisdomsellerLogo = '/assets/wisdomceller-symbol-logo-dark.png?v=story-logos-20260507';
const booklyLogo = '/assets/bookly-symbol-logo-white.png?v=story-logos-20260507';

export default function Story() {
  const { t } = useTranslation();
  return (
    <ContentSection
      id="story"
      title="Our Story"
      className="bg-paper-2 relative overflow-hidden"
    >
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
        <Reveal
          className="rounded-lg p-12 max-md:p-7 min-h-[360px] max-md:min-h-0 max-md:gap-[46px] flex flex-col justify-between bg-[rgba(255,252,244,0.9)] border border-line"
          delay={120}
        >
          <div>
            <div className="font-medium tracking-[0.06em] mb-4 max-md:text-sm text-bookly-primary">
              {t('story.wisdomseller.year')}
            </div>
            <img
              src={wisdomsellerLogo}
              width="64"
              height="64"
              loading="eager"
              decoding="async"
              alt={t('story.wisdomseller.title')}
              className="inline-block w-auto h-[34px] max-md:h-6 mr-3 mb-4 align-middle"
            />
            <h3 className="inline-block align-middle text-[28px] max-md:text-xl font-medium leading-[1.25] tracking-snug m-0 mb-4 text-ink-1">
              {t('story.wisdomseller.title')}
            </h3>
            <p className="leading-[1.65] m-0 text-ink-3">{t('story.wisdomseller.body')}</p>
          </div>
          <div className="font-serif text-lg max-md:text-sm leading-[1.5] text-ink-2">
            {t('story.wisdomseller.quote')}
          </div>
        </Reveal>

        <Reveal
          className="rounded-lg p-12 max-md:p-7 min-h-[360px] max-md:min-h-0 max-md:gap-[46px] flex flex-col justify-between bg-night text-night-fg-1"
          delay={240}
        >
          <div>
            <div className="font-medium tracking-[0.06em] mb-4 max-md:text-sm text-bookly-soft">
              {t('story.bookly.year')}
            </div>
            <img
              src={booklyLogo}
              width="64"
              height="64"
              loading="eager"
              decoding="async"
              alt={t('story.bookly.title')}
              className="inline-block w-auto h-[34px] max-md:h-6 mr-3 mb-4 align-middle"
            />
            <h3 className="inline-block align-middle text-[28px] max-md:text-xl font-medium leading-[1.25] tracking-snug m-0 mb-4">
              {t('story.bookly.title')}
            </h3>
            <p className="leading-[1.65] m-0 text-night-fg-2">{t('story.bookly.body')}</p>
          </div>
          <div className="font-serif text-lg max-md:text-sm leading-[1.5] text-night-fg-1/[0.85]">
            {t('story.bookly.quoteMain')}
            <span className="text-night-fg-1/[0.64]">{t('story.bookly.quoteMuted')}</span>
          </div>
        </Reveal>
      </div>
    </ContentSection>
  );
}
