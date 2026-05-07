import Reveal from './Reveal';
import AboutStats from './AboutStats';
import { services } from '../content/homepage';

export default function About() {
  return (
    <section id="about" className="section section--paper">
      <div className="section__inner">
        <AboutStats />
        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.num} className="svc-card" delay={i * 100}>
              <div className="svc-card__num">{s.num}</div>
              <div>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
