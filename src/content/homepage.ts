export type Genre = '아동' | '소설' | '자기계발';

export const navLinks = [
  { href: '#about', labelKey: 'nav.links.about' },
  { href: '#story', labelKey: 'nav.links.story' },
  { href: '#network', labelKey: 'nav.links.network' },
  { href: '#showcase', labelKey: 'nav.links.showcase' },
  { href: '#books', labelKey: 'nav.links.books' },
  { href: '#news', labelKey: 'nav.links.news' },
  { href: '#contact', labelKey: 'nav.links.contact' },
];

export const stats: { value: number; suffix?: string; labelKey: string }[] = [
  { value: 17, labelKey: 'about.stats.domesticDistributors' },
  { value: 3, suffix: '+', labelKey: 'about.stats.itStartups' },
  { value: 2, suffix: '+', labelKey: 'about.stats.globalBases' },
];

export const services = [
  { num: '01', titleKey: 'about.services.01.title', bodyKey: 'about.services.01.body' },
  { num: '02', titleKey: 'about.services.02.title', bodyKey: 'about.services.02.body' },
  { num: '03', titleKey: 'about.services.03.title', bodyKey: 'about.services.03.body' },
  { num: '04', titleKey: 'about.services.04.title', bodyKey: 'about.services.04.body' },
];

export const territoryKeys: number[] = [0, 1, 2, 3, 4, 5, 6];

export type NetworkCard = {
  id: string;
  yearMode: 'fixed' | 'tbd' | 'new';
  yearText?: string;
  placeholder?: boolean;
  hasBody?: boolean;
};

export const networkCards: Record<'seoul' | 'regional', NetworkCard[]> = {
  seoul: [
    { id: 'wisdomseller', yearMode: 'fixed', yearText: '2013', hasBody: true },
    { id: 'bookly', yearMode: 'fixed', yearText: '2024', hasBody: true },
    { id: 'subsidiary2', yearMode: 'tbd', placeholder: true },
    { id: 'subsidiary3', yearMode: 'tbd', placeholder: true },
    { id: 'subsidiary4', yearMode: 'tbd', placeholder: true },
  ],
  regional: [
    { id: 'regionalDist', yearMode: 'tbd', placeholder: true },
    { id: 'itStartup1', yearMode: 'tbd', placeholder: true },
    { id: 'itStartup2', yearMode: 'tbd', placeholder: true },
    { id: 'itStartup3', yearMode: 'tbd', placeholder: true },
    { id: 'vietnam', yearMode: 'new', hasBody: true },
  ],
};

export type Book = {
  title: string;
  publisher?: string;
  genre: Genre;
  cover: string;
  descPath?: string;
};

export const books: Book[] = [
  {
    title: '웃음방',
    publisher: '거북이북스',
    genre: '아동',
    cover: '/books/new/웃음방/윳음방.jpg',
    descPath: '/books/new/웃음방/웃음방 도서소개.txt',
  },
  {
    title: '모방소녀',
    genre: '소설',
    cover: '/books/new/모방소녀/모방소녀.jpg',
    descPath: '/books/new/모방소녀/모방소녀 도서소개.txt',
  },
  {
    title: '잠이 달아나는 이야기',
    genre: '아동',
    cover: '/books/new/잠이 달아나는 이야기/잠이 달아나는 이야기.jpg',
    descPath: '/books/new/잠이 달아나는 이야기/잠이 달아나는 이야기.txt',
  },
  {
    title: '익명연재',
    genre: '소설',
    cover: '/books/new/익명연재/익명연재.jpg',
  },
  {
    title: '1분 호흡이 아이의 뇌를 바꾼다',
    genre: '자기계발',
    cover: '/books/new/1분 호흡이 아이의 뇌를 바꾼다/1분 호흡이 아이의 뇌를 바꾼다_입체표지.jpg',
  },
];

export type FilterValue = '전체' | Genre;
export const bookFilters: { value: FilterValue; key: 'all' | 'child' | 'fiction' | 'selfDev' }[] = [
  { value: '전체', key: 'all' },
  { value: '아동', key: 'child' },
  { value: '소설', key: 'fiction' },
  { value: '자기계발', key: 'selfDev' },
];

export const genreKeyByValue: Record<Genre, 'child' | 'fiction' | 'selfDev'> = {
  '아동': 'child',
  '소설': 'fiction',
  '자기계발': 'selfDev',
};

export const newsItems = [
  { id: '1' as const },
  { id: '2' as const },
  { id: '3' as const },
];

export const managers = [
  { id: 'english', email: 'camino@hibookly.com' },
  { id: 'sea', email: 'camino@hibookly.com' },
  { id: 'chinese', email: 'camino@hibookly.com' },
  { id: 'japanese', email: 'camino@hibookly.com' },
] as const;

export const offices = [
  { id: 'korea' },
  { id: 'vietnam' },
] as const;
