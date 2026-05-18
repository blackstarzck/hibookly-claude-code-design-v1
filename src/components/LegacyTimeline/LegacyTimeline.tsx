import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import ContentSection from '../ui/ContentSection';

const READY_TIMEOUT_MS = 1500;
const timelineItems = ['trust', 'operations', 'expansion'] as const;

const timelineMedia: Record<
  (typeof timelineItems)[number],
  { video: string; poster: string }
> = {
  trust: {
    video: '/opened-book.mp4',
    poster: '/opened-book.png',
  },
  operations: {
    video: '/barcode.mp4',
    poster: '/barcode.png',
  },
  expansion: {
    video: '/globe.mp4',
    poster: '/globe.png',
  },
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

type TimelineMediaProps = {
  media: { video: string; poster: string };
};

function TimelineMedia({ media }: TimelineMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setReady] = useState(false);

  const setRevealOrigin = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty('--legacy-reveal-x', `${x}%`);
    event.currentTarget.style.setProperty('--legacy-reveal-y', `${y}%`);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setReady(true);
      return;
    }

    const onReady = () => setReady(true);
    video?.addEventListener('loadeddata', onReady, { once: true });
    video?.addEventListener('canplay', onReady, { once: true });
    const safety = window.setTimeout(() => setReady(true), READY_TIMEOUT_MS);

    return () => {
      video?.removeEventListener('loadeddata', onReady);
      video?.removeEventListener('canplay', onReady);
      window.clearTimeout(safety);
    };
  }, [media.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
      video.pause();
      return;
    }

    const play = () => {
      void video.play().catch(() => {
        // Muted inline video should autoplay; keep the poster fallback if a browser blocks it.
      });
    };

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          return;
        }

        video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [isReady]);

  return (
    <div
      className="legacy-timeline__image legacy-timeline__media legacy-timeline__stagger relative aspect-[4/3] w-full overflow-hidden bg-paper-2"
      style={{ '--legacy-stagger-delay': '0ms' } as CSSProperties}
      onPointerEnter={setRevealOrigin}
    >
      <img
        src={media.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out-soft motion-reduce:hidden ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        src={media.video}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </div>
  );
}

export default function LegacyTimeline() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getSpineTopPx = () =>
      parseFloat(window.getComputedStyle(node).paddingTop) || 0;

    const setProgress = (spineProgress: number) => {
      node.style.setProperty('--legacy-spine-progress', spineProgress.toFixed(3));

      const spineTopPx = getSpineTopPx();
      const spineHeight = node.offsetHeight - spineTopPx;
      if (spineHeight <= 0) return;

      const rootRect = node.getBoundingClientRect();
      const items = Array.from(node.querySelectorAll<HTMLElement>('[data-legacy-item]'));
      items.forEach((item, index) => {
        const connector = item.querySelector<HTMLElement>('[data-legacy-connector]');
        const targetCenter = connector
          ? connector.getBoundingClientRect().top + connector.offsetHeight / 2 - rootRect.top
          : item.offsetTop + item.offsetHeight / 2;
        const target = (targetCenter - spineTopPx) / spineHeight;
        node.style.setProperty(`--legacy-branch-${index}`, spineProgress >= target ? '1' : '0');
      });
    };

    if (media.matches) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const spineTopPx = getSpineTopPx();
      const spineHeight = rect.height - spineTopPx;
      if (spineHeight <= 0) {
        setProgress(0);
        return;
      }
      const progress = clamp(
        (viewportHeight * 0.55 - rect.top - spineTopPx) / spineHeight,
      );

      setProgress(progress);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ContentSection
      id="legacy"
      title="Our Story"
      description={t('legacyTimeline.description')}
      className="bg-paper relative overflow-hidden !px-0 !py-0"
      containerClassName="!max-w-none !mx-0"
      headerClassName="absolute left-1/2 top-[clamp(64px,10vh,120px)] z-20 w-full max-w-[720px] -translate-x-1/2 bg-paper px-gutter [text-align:center] [&_p]:mx-auto"
    >
        <div
          ref={rootRef}
          className="legacy-timeline relative w-full"
          style={{
            '--legacy-spine-top': 'clamp(220px, 26vh, 340px)',
            paddingTop: 'var(--legacy-spine-top)',
          } as CSSProperties}
      >
        <svg
          className="legacy-timeline__svg pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden w-full overflow-visible md:block"
          style={{ top: 'var(--legacy-spine-top)' }}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="legacy-timeline__path legacy-timeline__spine"
            pathLength="1"
            d="M500 0V1000"
          />
        </svg>

        <svg
          className="legacy-timeline__svg pointer-events-none absolute bottom-0 z-0 overflow-visible md:hidden"
          style={{
            top: 'var(--legacy-spine-top)',
            left: 'calc(clamp(20px, 4vw, 48px) + 28px)',
            width: '1px',
          }}
          viewBox="0 0 1 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="legacy-timeline__path legacy-timeline__spine"
            pathLength="1"
            d="M0 0V1000"
          />
        </svg>

        <ol className="relative z-10 list-none p-0 m-0">
          {timelineItems.map((item, index) => {
            const imageLeft = index % 2 === 0;
            return (
              <Reveal
                as="li"
                key={item}
                data-legacy-item
                delay={220 + index * 110}
                className="grid min-h-[calc(100svh-72px)] items-center gap-x-8 px-gutter pb-0 pt-0 md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] max-md:min-h-0 max-md:grid-cols-[56px_minmax(0,1fr)] max-md:py-20"
                style={
                  {
                    '--legacy-content-progress': `var(--legacy-branch-${index}, 0)`,
                  } as CSSProperties
                }
              >
                <figure
                  className={`legacy-timeline__visual m-0 flex w-full max-w-[640px] flex-col gap-6 overflow-hidden max-md:col-start-2 max-md:row-start-2 ${
                    imageLeft
                      ? 'md:col-start-1 md:justify-self-end'
                      : 'md:col-start-3 md:justify-self-start'
                  }`}
                >
                  <TimelineMedia media={timelineMedia[item]} />
                  <figcaption
                    className="legacy-timeline__stagger m-0 leading-[1.85] text-ink-3 max-md:text-sm max-md:leading-[1.7]"
                    style={{ '--legacy-stagger-delay': '360ms' } as CSSProperties}
                  >
                    {t(`legacyTimeline.items.${item}.body`)}
                  </figcaption>
                </figure>

                <div
                  data-legacy-connector
                  className="legacy-timeline__connector-wrap max-md:col-start-1 max-md:row-start-1 max-md:self-start md:col-start-2 md:row-start-1 md:self-center"
                  style={
                    {
                      '--legacy-node-progress': `var(--legacy-branch-${index}, 0)`,
                    } as CSSProperties
                  }
                >
                  <span
                    className={`legacy-timeline__connector ${imageLeft ? 'legacy-timeline__connector--right' : 'legacy-timeline__connector--left'
                      }`}
                    aria-hidden="true"
                  />
                </div>

                <article
                  className={`legacy-timeline__heading relative max-w-[360px] max-md:col-start-2 max-md:row-start-1 max-md:mb-6 max-md:pl-4 max-md:justify-self-start md:row-start-1 ${
                    imageLeft
                      ? 'md:col-start-3 md:justify-self-start md:text-left'
                      : 'md:col-start-1 md:justify-self-end md:text-right'
                  }`}
                >
                  <div
                    className="legacy-timeline__stagger mb-4 inline-flex items-center rounded-pill border border-night/30 bg-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-ink-1"
                    style={{ '--legacy-stagger-delay': '190ms' } as CSSProperties}
                  >
                    {t(`legacyTimeline.items.${item}.kicker`)}
                  </div>
                  <h3
                    className="legacy-timeline__stagger m-0 text-[34px] font-medium leading-[1.06] tracking-[0.04em] text-ink-1 max-md:text-2xl"
                    style={{ '--legacy-stagger-delay': '280ms' } as CSSProperties}
                  >
                    {t(`legacyTimeline.items.${item}.title`)}
                  </h3>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </ContentSection>
  );
}
