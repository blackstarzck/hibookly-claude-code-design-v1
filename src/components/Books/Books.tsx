import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import ContentSection from '../ui/ContentSection';
import BookModal from '../BookModal';
import {
  bookFilters,
  books,
  genreKeyByValue,
  type Book,
  type FilterValue,
} from '../../content/homepage';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function Books() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterValue>('전체');
  const [openBook, setOpenBook] = useState<Book | null>(null);

  const visible = books.filter((b) => filter === '전체' || b.genre === filter);

  return (
    <ContentSection
      id="books"
      title="Rights Guide"
      className="bg-paper"
    >
      <Reveal className="flex justify-start gap-2 flex-wrap mb-10" delay={160} role="tablist">
        {bookFilters.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`font-medium px-[14px] py-[7px] rounded-pill cursor-pointer transition-[background,color,border-color] duration-[400ms] ease-out-soft max-md:!text-xs ${
                active
                  ? 'bg-ink-1 text-paper border border-ink-1'
                  : 'bg-transparent text-ink-2 border border-line-strong hover:border-ink-3'
              }`}
            >
              {t(`books.filters.${f.key}`)}
            </button>
          );
        })}
      </Reveal>

      <div className="pt-2 pb-6 overflow-x-clip [&_.swiper]:overflow-visible">
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
            <SwiperSlide
              key={b.title}
              data-genre={b.genre}
              className="!w-[240px] max-md:!w-[168px]"
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={t('books.detailLabel', { title: b.title })}
                onClick={() => setOpenBook(b)}
                className="group/book block w-full p-0 m-0 border-0 bg-transparent text-left font-[inherit] text-[inherit] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-bookly-primary focus-visible:outline-offset-[6px] focus-visible:rounded-md"
              >
                <div className="aspect-[2/3] rounded-md shadow-card-warm mb-[14px] max-md:mb-3 relative overflow-hidden bg-white transition-transform duration-600 ease-out-soft group-hover/book:-translate-y-[6px] group-focus-visible/book:-translate-y-[6px]">
                  <img
                    className="w-full h-full object-cover"
                    src={encodeURI(b.cover)}
                    alt={t('books.coverAlt', { title: b.title })}
                    loading="lazy"
                  />
                  <span className="absolute right-3 top-3 inline-flex items-center min-h-[26px] px-[9px] py-[5px] rounded-xs bg-[rgba(20,17,12,0.72)] text-white text-xs font-semibold backdrop-blur-md">
                    {t('books.status.new')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-end justify-start p-4 text-white text-[13px] font-medium tracking-wider opacity-0 transition-opacity duration-[360ms] ease-out-soft pointer-events-none [background:linear-gradient(to_top,rgba(20,17,12,0.7)_0%,rgba(20,17,12,0.2)_50%,rgba(20,17,12,0)_100%)] group-hover/book:opacity-100 group-focus-visible/book:opacity-100"
                  >
                    {t('books.viewMore')}
                  </span>
                </div>
                <div className="text-base font-medium text-ink-1 mb-1 leading-[1.35]">
                  {b.title}
                </div>
                {b.publisher && <div className="font-serif text-ink-3">{b.publisher}</div>}
                <div className="text-ink-4 mt-[6px] tracking-[0.06em] uppercase">
                  {t(`books.filters.${genreKeyByValue[b.genre]}`)}
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {openBook && <BookModal book={openBook} onClose={() => setOpenBook(null)} />}
    </ContentSection>
  );
}
