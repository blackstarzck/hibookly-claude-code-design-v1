import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';

type ShowcaseCover = {
  title: string;
  file: string;
};

const showcaseCovers: Record<'col1' | 'col2' | 'col3', ShowcaseCover[]> = {
  col1: [
    { title: '20180507000006', file: '20180507000006.jpg' },
    { title: '나를 싫어 하나봐', file: '나를 싫어 하나봐.jpg' },
    { title: '너도 잘 할수 있어', file: '너도 잘 할수 있어.jpg' },
    { title: '너무너무 무서워', file: '너무너무 무서워.jpg' },
    { title: '다운로드', file: '다운로드 (1).jpg' },
    { title: '데못죽', file: '데못죽.jpg' },
    { title: '동으보감', file: '동으보감.jpg' },
    { title: '디자이어미', file: '디자이어미.jpg' },
  ],
  col2: [
    { title: '레인보우시티', file: '레인보우시티.jpg' },
    { title: '망종', file: '망종.jpg' },
    { title: '맨날맨날 혼이나', file: '맨날맨날 혼이나.jpg' },
    { title: '시든꽃에 눈물을', file: '시든꽃에 눈물을.jpg' },
    { title: '안녕나의사춘기', file: '안녕나의사춘기.jpg' },
    { title: '암행', file: '암행.jpg' },
    { title: '옆집의 비혼주의자들', file: '옆집의 비혼주의자들.jpg' },
    { title: '울면 좀 어때', file: '울면 좀 어때.jpg' },
  ],
  col3: [
    { title: '울어봐 빌어도 좋고', file: '울어봐 빌어도 좋고.jpg' },
    { title: '원룸조교님', file: '원룸조교님.jpg' },
    { title: '이유없이', file: '이유없이.jpg' },
    { title: '전지적독자시점 5부 2', file: '전지적독자시점_5부_2.jpg' },
    { title: '전지적독자시점 5부 2', file: '전지적독자시점_5부_2 (1).jpg' },
    { title: '카페네버랜드', file: '카페네버랜드.jpg' },
    { title: '한식의탄생', file: '한식의탄생.jpg' },
    { title: '화가 날때도 있지', file: '화가 날때도 있지.jpg' },
  ],
};

function ShowcaseCoverCard({ title, file }: ShowcaseCover) {
  const { t } = useTranslation();
  return (
    <div className="relative aspect-[2/3] rounded-[6px] overflow-hidden shrink-0 shadow-cover-soft bg-white after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:[background:radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.16),transparent_60%),linear-gradient(180deg,transparent_68%,rgba(31,24,18,0.12)_100%)]">
      <img
        className="w-full h-full object-cover"
        src={`/books/export/${encodeURIComponent(file)}`}
        alt={t('showcase.coverAlt', { title })}
        loading="lazy"
      />
    </div>
  );
}

function ShowcaseColumn({
  items,
  direction,
  hideOnMobile,
}: {
  items: ShowcaseCover[];
  direction: 'up' | 'down';
  hideOnMobile?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`relative ${hideOnMobile ? 'max-[640px]:hidden' : ''}`}>
      <div
        className={`flex flex-col gap-[18px] max-[640px]:gap-3 will-change-transform motion-reduce:animate-none ${
          direction === 'up' ? 'animate-showcase-scroll-up' : 'animate-showcase-scroll-down'
        }`}
      >
        {doubled.map((cover, index) => (
          <ShowcaseCoverCard key={`${cover.title}-${index}`} {...cover} />
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  const { t } = useTranslation();
  return (
    <section
      id="showcase"
      aria-label={t('showcase.ariaLabel')}
      className="relative overflow-hidden flex items-center px-gutter pt-showcase-py-top pb-showcase-py-bottom max-[640px]:pt-[72px] max-[640px]:pb-[96px]"
    >
      <div className="relative z-[1] max-w-[1280px] mx-auto w-full grid grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] max-[980px]:grid-cols-1 gap-[clamp(48px,6vw,80px)] items-center">
        <div
          aria-hidden="true"
          className="relative grid grid-cols-3 max-[640px]:grid-cols-2 gap-[18px] max-[640px]:gap-3 h-[620px] max-[980px]:h-[520px] max-[640px]:h-[460px] -mx-9 max-[640px]:-mx-6 px-9 max-[640px]:px-6 overflow-hidden max-[980px]:order-2 [mask-image:linear-gradient(180deg,transparent_0%,#000_14%,#000_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_14%,#000_86%,transparent_100%)]"
        >
          <ShowcaseColumn items={showcaseCovers.col1} direction="up" />
          <ShowcaseColumn items={showcaseCovers.col2} direction="down" />
          <ShowcaseColumn items={showcaseCovers.col3} direction="up" hideOnMobile />
        </div>

        <div className="text-ink-1 max-[980px]:order-1 max-[980px]:max-w-[680px]">
          <Reveal
            as="h2"
            delay={120}
            className="text-fluid-h2 max-md:text-fluid-mobile-h2 font-medium leading-[1.16] tracking-snug m-0 max-w-[480px]"
          >
            {t('showcase.titleLine1')}
            <br />
            {t('showcase.titleLine2')}
            <br />
            {t('showcase.titleLine3')}
          </Reveal>
          <Reveal
            as="p"
            delay={220}
            className="max-w-[480px] mt-7 mb-9 leading-[1.7] text-ink-3"
          >
            {t('showcase.subtitle')}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
