import { useState, type MouseEvent } from 'react';
import Reveal from './Reveal';
import { networkCards, type NetworkCard } from '../content/homepage';

function NetCard({ card, delay }: { card: NetworkCard; delay: number }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <Reveal as="article" className="net-card" delay={delay} onMouseMove={onMove}>
      <div>
        <div className="net-card__year">{card.year}</div>
        <h4 className="net-card__name">{card.name}</h4>
        <div className="net-card__city">{card.city}</div>
      </div>
      {card.placeholder
        ? <span className="placeholder-tag placeholder-tag--dark">준비 중</span>
        : <p className="net-card__body">{card.body}</p>}
    </Reveal>
  );
}

export default function Network() {
  const [tab, setTab] = useState<'seoul' | 'regional'>('seoul');
  const cards = networkCards[tab];

  return (
    <section id="network" className="section section--night">
      <div className="section__inner">
        <Reveal as="h2" className="section__title" delay={120}>
          여덟 개의 회사. <span className="serif-em serif-em--muted">하나의 생태계.</span>
        </Reveal>

        <Reveal className="tabs" delay={200} role="tablist">
          <button
            className={`tab${tab === 'seoul' ? ' is-active' : ''}`}
            onClick={() => setTab('seoul')}
            role="tab"
            aria-selected={tab === 'seoul'}
          >
            서울 · 수도권
          </button>
          <button
            className={`tab${tab === 'regional' ? ' is-active' : ''}`}
            onClick={() => setTab('regional')}
            role="tab"
            aria-selected={tab === 'regional'}
          >
          지역 · 신규 거점
          </button>
        </Reveal>

        <div className="net-grid" key={tab}>
          {cards.map((c, i) => (
            <NetCard key={`${tab}-${c.name}-${c.city}`} card={c} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
