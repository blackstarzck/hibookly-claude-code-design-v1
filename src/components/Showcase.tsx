import Reveal from './Reveal';

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
  return (
    <div className="showcase-cover">
      <img className="showcase-cover__image" src={`/books/export/${encodeURIComponent(file)}`} alt={`${title} 표지`} loading="lazy" />
    </div>
  );
}

function ShowcaseColumn({ items, direction }: { items: ShowcaseCover[]; direction: 'up' | 'down' }) {
  const doubled = [...items, ...items];

  return (
    <div className="showcase-col">
      <div className={`showcase-col__track showcase-col__track--${direction}`}>
        {doubled.map((cover, index) => (
          <ShowcaseCoverCard key={`${cover.title}-${index}`} {...cover} />
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section id="showcase" className="section showcase" aria-label="선정 도서 쇼케이스">
      <div className="showcase-inner">
        <div className="showcase-grid" aria-hidden="true">
          <ShowcaseColumn items={showcaseCovers.col1} direction="up" />
          <ShowcaseColumn items={showcaseCovers.col2} direction="down" />
          <ShowcaseColumn items={showcaseCovers.col3} direction="up" />
        </div>

        <div className="showcase-copy">
          <Reveal as="h2" className="section__title showcase-title" delay={120}>
            무한한 이야기,<br />
            끝없는 세계,<br />
            그리고 더.
          </Reveal>
          <Reveal as="p" className="showcase-sub" delay={220}>
            국내 작가와 세계 시장을 잇는 저작권 에이전시. 새로운 발견과 깊은 몰입이 시작되는 곳에서 다음 이야기를 소개합니다.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
