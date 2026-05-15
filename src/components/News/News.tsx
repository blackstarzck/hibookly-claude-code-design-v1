import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import ContentSection from '../ui/ContentSection';
import { newsItems } from '../../content/homepage';

export default function News() {
  const { t } = useTranslation();
  return (
    <ContentSection
      id="news"
      title="News & Events"
      className="flex max-md:block items-center"
    >
      <div className="flex flex-col gap-6">
        {newsItems.map((n, i) => (
          <Reveal
            as="article"
            key={n.id}
            delay={i * 100}
            className="grid grid-cols-[minmax(120px,0.45fr)_minmax(0,1fr)_auto] max-[900px]:grid-cols-1 max-[900px]:items-start max-[900px]:gap-4 max-[900px]:py-6 items-center gap-8 min-h-[96px] py-4 transition-[border-color,transform] duration-300 ease-out-soft hover:translate-x-1 hover:border-bookly-primary/[0.42]"
          >
            <div className="flex items-baseline gap-[18px]">
              <span className="font-medium uppercase tracking-[0.18em] text-bookly-primary max-md:text-xs">
                {t(`news.items.${n.id}.kind`)}
              </span>
              <span className="font-serif text-ink-4 max-md:text-xs">
                {t(`news.items.${n.id}.date`)}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-medium leading-[1.3] tracking-[-0.005em] m-0 mb-2 text-ink-1">
                {t(`news.items.${n.id}.title`)}
              </h4>
              <p className="leading-[1.55] text-ink-3 m-0">
                {t(`news.items.${n.id}.body`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </ContentSection>
  );
}
