import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BlurText from '../ui/BlurText';

const READY_TIMEOUT_MS = 1500;

export default function Hero() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setReady(true);
      return;
    }

    const onReady = () => setReady(true);
    video?.addEventListener('loadeddata', onReady, { once: true });
    const safety = window.setTimeout(() => setReady(true), READY_TIMEOUT_MS);

    return () => {
      video?.removeEventListener('loadeddata', onReady);
      window.clearTimeout(safety);
    };
  }, []);

  const revealBase =
    'transition-[opacity,filter,transform] duration-700 ease-out-soft motion-reduce:transition-none';
  const revealState = isReady
    ? 'opacity-100 blur-0 translate-y-0'
    : 'opacity-0 blur-[10px] translate-y-5';
  const ctaInner = `relative z-[1] transition-[opacity,transform] duration-700 ease-out-soft delay-[1100ms] ${
    isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
  }`;

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-start justify-start overflow-hidden text-white px-gutter pt-hero-pt"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full z-0 object-cover object-center pointer-events-none bg-[#0a0604] [transform:translateZ(0)] [will-change:transform]"
        src="/bg.mp4"
        poster="/assets/bg-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] [background-size:3px_3px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none [transform:translateZ(0)] [will-change:transform] [background:linear-gradient(in_srgb_90deg,rgba(7,10,12,0.72)_0%,rgba(7,10,12,0.52)_42%,rgba(7,10,12,0.18)_100%),linear-gradient(in_srgb_180deg,rgba(7,10,12,0.22)_0%,rgba(7,10,12,0.08)_44%,rgba(7,10,12,0.48)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-[3] w-full mx-auto text-center">
        <div
          className={`${revealBase} ${revealState} delay-[400ms] mb-7 font-medium uppercase tracking-widest text-white/[0.74] [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] max-md:text-xs`}
        >
          {t('hero.eyebrow')}
        </div>

        <h1 className="text-fluid-display max-md:text-fluid-hero-mobile font-medium text-white m-0 mb-8">
          <BlurText key={i18n.language} text={t('hero.headline')} start={isReady} />
        </h1>

        <p
          className={`${revealBase} ${revealState} delay-[800ms] font-serif font-light text-fluid-lede max-md:text-sm text-white/[0.82] m-0 mb-10 [word-break:keep-all]`}
          dangerouslySetInnerHTML={{ __html: t('hero.lede') }}
        />

        <div
          className={`flex gap-4 flex-wrap justify-center transition-[visibility] duration-0 ${
            isReady ? 'visible' : 'invisible delay-[1100ms]'
          }`}
        >
          <a
            href="#books"
            className="group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill text-base font-medium px-[50px] py-[18px] max-md:px-9 max-md:py-3 max-md:text-sm text-white bg-white/[0.01] [background-blend-mode:luminosity] backdrop-blur-[4px] shadow-btn-glow transition-[background,color,transform] duration-[400ms] ease-out-soft hover:text-white before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:p-[1.4px] before:[background:linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.15)_20%,rgba(255,255,255,0)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.15)_80%,rgba(255,255,255,0.45)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:pointer-events-none"
          >
            <span className={ctaInner}>{t('hero.ctaBooks')}</span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              className={`${ctaInner} flex-none transition-transform duration-300 ease-out-soft group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]`}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
