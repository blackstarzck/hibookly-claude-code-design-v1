import Reveal from './Reveal';

const wisdomsellerLogo = '/assets/wisdomceller-symbol-logo-dark.png?v=story-logos-20260507';
const booklyLogo = '/assets/bookly-symbol-logo-white.png?v=story-logos-20260507';

export default function Story() {
  return (
    <section id="story" className="section section--paper-alt story">
      <div className="section__inner">
        <Reveal as="h2" className="section__title" delay={120}>
          서울의 작은 책상에서<br />국내 최대 17개 지역까지.
        </Reveal>

        <div className="story-grid">
          <Reveal className="story-card story-card--light" delay={120}>
            <div>
              <div className="story-card__year">설립 2013</div>
              <img src={wisdomsellerLogo} width="64" height="64" loading="eager" decoding="async" alt="wisdomseller" />
              <h3 className="story-card__title">위즈덤셀러</h3>
              <p className="story-card__body">서울에서 출발한 부티크 저작권 에이전시. 10여 년간 한국 작가, 번역가, 해외 출판사와 조용히 일해 왔습니다.</p>
            </div>
            <div className="story-card__quote">Bookly의 시작은 이곳입니다.</div>
          </Reveal>

          <Reveal className="story-card story-card--dark" delay={240}>
            <div>
              <div className="story-card__year">설립 2024</div>
              <img src={booklyLogo} width="64" height="64" loading="eager" decoding="async" alt="Bookly" />
              <h3 className="story-card__title">Bookly</h3>
              <p className="story-card__body">2024년 4월 설립. 위즈덤 생태계의 해외 사업을 담당하며 문학, 웹툰, 전자책, 오디오북을 하나의 에이전시로 묶습니다.</p>
            </div>
            <div className="story-card__quote">이야기는, <span className="story-card__quote-muted">여기서 계속됩니다.</span></div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
