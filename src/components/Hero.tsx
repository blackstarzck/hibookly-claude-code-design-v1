import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import BlurText from './BlurText';

const READY_TIMEOUT_MS = 1500;

export default function Hero() {
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

  return (
    <section id="top" className={`hero${isReady ? ' is-ready' : ''}`}>
      <video
        ref={videoRef}
        className="hero__bg"
        src="/bg.mp4"
        poster="/assets/bg-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__eyebrow hero__reveal hero__reveal--eyebrow">
          Bookly · 해외 저작권 에이전시
        </div>

        <h1 className="hero__headline">
          <BlurText text={'지식을 연결하고,\n세계를 잇다.'} start={isReady} />
        </h1>

        <p className="hero__lede hero__reveal hero__reveal--lede">
          위즈덤셀러에서 쌓아온 10년의 신뢰 위에 세워진 해외 저작권 에이전시.<br />한국의 이야기를 세계로 전합니다.
        </p>

        <div className="hero__ctas hero__reveal hero__reveal--ctas">
          <a className="btn-pill btn-pill--ghost" href="#contact">
            <span className="btn-pill__label">신간안내</span>
            <ArrowUpRight className="btn-pill__icon" size={18} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
