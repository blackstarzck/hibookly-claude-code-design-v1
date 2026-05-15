import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

const partnerLogos = [
  { name: 'Hankyoreh N', src: '/partners/hankyoreh-n.png' },
  { name: 'Cite Media', src: '/partners/cite-media.png' },
  { name: 'CITIC', src: '/partners/citic.png' },
  { name: 'KW Books', src: '/partners/kw-books.png' },
  { name: 'Toyo Keizai', src: '/partners/toyo-keizai.png' },
  { name: 'Geobugi Books', src: '/partners/geobugi-books.png' },
  { name: 'Naver Webtoon', src: '/partners/naver-webtoon.png' },
  { name: 'Daekyo', src: '/partners/daekyo.png' },
  { name: 'Mirae N', src: '/partners/mirae-n.png' },
  { name: 'Sangju Publishing', src: '/partners/sangju-publishing.png' },
  { name: 'Shinyoung Media', src: '/partners/shinyoung-media.png' },
  { name: "Toyou's Dream", src: '/partners/toyous-dream.png' },
];

export default function Partners() {
  return (
    <section
      aria-label="Partner logos"
      className="partners-marquee py-16 max-md:py-12 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={64}
        loop
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={false}
      >
        {[...partnerLogos, ...partnerLogos].map((logo, i) => (
          <SwiperSlide
            key={`${logo.src}-${i}`}
            className="!w-[160px] !h-[64px] max-md:!w-[120px] max-md:!h-[52px] !flex items-center justify-center"
            aria-hidden={i >= partnerLogos.length ? true : undefined}
          >
            <img
              className="partner-logo-image max-h-[56px] max-w-full object-contain max-md:max-h-[44px]"
              src={logo.src}
              alt={i >= partnerLogos.length ? '' : logo.name}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
