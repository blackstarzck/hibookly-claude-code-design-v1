import Reveal from './Reveal';
import { newsItems } from '../content/homepage';

export default function News() {
  return (
    <section id="news" className="section section--paper">
      <div className="section__inner">
        <Reveal className="news__heading" delay={120}>
          <h2 className="news__title-major">최근 소식.</h2>
        </Reveal>

        <div className="news-grid">
          {newsItems.map((n, i) => (
            <Reveal as="article" key={n.title} className="news" delay={i * 100}>
              <div className="news__meta">
                <span className="news__kind">{n.kind}</span>
                <span className="news__date">{n.date}</span>
              </div>
              <div className="news__content">
                <h4 className="news__title">{n.title}</h4>
                <p className="news__body">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
