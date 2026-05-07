export type Genre = '아동' | '소설' | '자기계발';

export const navLinks = [
  { href: '#about', label: '소개' },
  { href: '#story', label: '연혁' },
  { href: '#network', label: '네트워크' },
  { href: '#books', label: '도서' },
  { href: '#news', label: '소식' },
  { href: '#contact', label: '문의' },
];

export const stats = [
  { label: '국내 유통사', value: 17 },
  { label: 'IT 스타트업', value: 3, suffix: '+' },
  { label: '해외 거점', value: 2, suffix: '+' },
];

export const services = [
  {
    num: '01',
    title: '국제 저작권 대리',
    body: '프리미엄 한국 출판 콘텐츠와 세계 시장을 연결합니다.',
  },
  {
    num: '02',
    title: '시장 개발',
    body: '저작권 중개가 활발하지 않은 베트남과 동남아시아 시장을 발굴합니다.',
  },
  {
    num: '03',
    title: '출판 컨설팅 / 번역 서비스',
    body: '저작권 중개와 연관된 계약, 번역, 현지화 업무를 지원합니다.',
  },
  {
    num: '04',
    title: '전략적 파트너십',
    body: '글로벌 출판사와 장기 협력 구조를 구축합니다.',
  },
];

export const territories = [
  '한국',
  '일본',
  '대만',
  '중국',
  '베트남',
  '태국',
  '인도네시아',
];

export type NetworkCard = {
  year: string;
  name: string;
  city: string;
  body?: string;
  placeholder?: boolean;
};

export const networkCards: Record<'seoul' | 'regional', NetworkCard[]> = {
  seoul: [
    {
      year: '2013',
      name: '위즈덤셀러',
      city: '서울',
      body: '그룹의 모태가 된 도서 공급 및 저작권 파트너입니다.',
    },
    {
      year: '2024',
      name: 'Bookly',
      city: '서울',
      body: '한국 작가와 출판사의 해외 저작권 대리, 계약, 인세 관리를 담당합니다.',
    },
    { year: '확정 예정', name: '계열사 2', city: '수도권', placeholder: true },
    { year: '확정 예정', name: '계열사 3', city: '수도권', placeholder: true },
    { year: '확정 예정', name: '계열사 4', city: '수도권', placeholder: true },
  ],
  regional: [
    { year: '확정 예정', name: '지방 유통 계열사', city: '지역', placeholder: true },
    { year: '확정 예정', name: 'IT 스타트업 1', city: '국내', placeholder: true },
    { year: '확정 예정', name: 'IT 스타트업 2', city: '국내', placeholder: true },
    { year: '확정 예정', name: 'IT 스타트업 3', city: '국내', placeholder: true },
    {
      year: '신규',
      name: '신사업 법인',
      city: '베트남',
      body: '동남아시아 라이선싱과 신규 사업 확장을 위한 해외 거점입니다.',
    },
  ],
};

export type Book = {
  title: string;
  publisher?: string;
  genre: Genre;
  status: string;
  cover: string;
  descPath?: string;
};

export const books: Book[] = [
  {
    title: '웃음방',
    publisher: '거북이북스',
    genre: '아동',
    status: '신간',
    cover: '/books/new/웃음방/윳음방.jpg',
    descPath: '/books/new/웃음방/웃음방 도서소개.txt',
  },
  {
    title: '모방소녀',
    genre: '소설',
    status: '신간',
    cover: '/books/new/모방소녀/모방소녀.jpg',
    descPath: '/books/new/모방소녀/모방소녀 도서소개.txt',
  },
  {
    title: '잠이 달아나는 이야기',
    genre: '아동',
    status: '신간',
    cover: '/books/new/잠이 달아나는 이야기/잠이 달아나는 이야기.jpg',
    descPath: '/books/new/잠이 달아나는 이야기/잠이 달아나는 이야기.txt',
  },
  {
    title: '익명연재',
    genre: '소설',
    status: '신간',
    cover: '/books/new/익명연재/익명연재.jpg',
  },
  {
    title: '1분 호흡이 아이의 뇌를 바꾼다',
    genre: '자기계발',
    status: '신간',
    cover: '/books/new/1분 호흡이 아이의 뇌를 바꾼다/1분 호흡이 아이의 뇌를 바꾼다_입체표지.jpg',
  },
];

export const bookFilters: ('전체' | Genre)[] = [
  '전체',
  '아동',
  '소설',
  '자기계발',
];

export const newsItems = [
  {
    kind: '뉴스',
    date: '2025년 00월 00일',
    title: '최신 업데이트 제목',
    body: '운영 단계에서 실제 뉴스 게시물로 교체될 영역입니다.',
  },
  {
    kind: '이벤트',
    date: '2025년 00월 00일',
    title: '다가오는 이벤트 제목',
    body: '도서전, 미팅, 출판 행사 일정을 노출합니다.',
  },
  {
    kind: '공지',
    date: '2025년 00월 00일',
    title: '공지사항 제목',
    body: '카탈로그 공개와 자료 요청 안내를 게시합니다.',
  },
];

export const managers = [
  { region: '영미권', name: 'Camino', email: 'camino@hibookly.com' },
  { region: '동남아권', name: 'Chloe', email: 'camino@hibookly.com', note: '이메일 확인 필요' },
  { region: '중국어권', name: 'Gada', email: 'camino@hibookly.com', note: '이메일 확인 필요' },
  { region: '일본어권', name: 'Lana', email: 'camino@hibookly.com', note: '이메일 확인 필요' },
];

export const offices = [
  { city: '한국 사무소', addr: '경기도 김포시 태장로 765, 506호, 대한민국' },
  { city: '베트남 사무소', addr: '3F, HQ Tower, 201 Tran Nao, An Khanh Ward, 호치민시, 베트남' },
];
