import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import Reveal from './Reveal';
import BookModal from './BookModal';
import { bookFilters, books, type Book } from '../content/homepage';

import 'swiper/css';
import 'swiper/css/free-mode';

type Filter = (typeof bookFilters)[number];

export default function Books() {
  const [filter, setFilter] = useState<Filter>('전체');
  const [openBook, setOpenBook] = useState<Book | null>(null);

  const visible = books.filter((b) => filter === '전체' || b.genre === filter);

  return (
    <section id="books" className="section books">
      <div className="books__inner">
        <Reveal className="books__heading" delay={120}>
          <h2 className="books__title">
            국내 출판사의 <span className="serif-em">신간 안내</span>.
          </h2>
          <div className="chips" role="tablist">
            {bookFilters.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip${filter === f ? ' is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="book-rail">
        <Swiper
          key={filter}
          modules={[FreeMode, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={24}
          freeMode={{ enabled: true, momentum: true }}
          mousewheel={{ forceToAxis: true }}
          slideToClickedSlide
          watchSlidesProgress
          grabCursor
          observer
          observeParents
        >
          {visible.map((b) => (
            <SwiperSlide key={b.title} className="book" data-genre={b.genre}>
              <button
                type="button"
                className="book__card"
                aria-haspopup="dialog"
                aria-label={`${b.title} 상세 보기`}
                onClick={() => setOpenBook(b)}
              >
                <div className="book__cover">
                  <img
                    className="book__cover-image"
                    src={encodeURI(b.cover)}
                    alt={`${b.title} 표지`}
                    loading="lazy"
                  />
                  <span className="book__status">{b.status}</span>
                  <span className="book__hover" aria-hidden="true">
                    자세히 보기
                  </span>
                </div>
                <div className="book__title">{b.title}</div>
                {b.publisher && <div className="book__author">{b.publisher}</div>}
                <div className="book__genre">{b.genre}</div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {openBook && (
        <BookModal book={openBook} onClose={() => setOpenBook(null)} />
      )}
    </section>
  );
}
