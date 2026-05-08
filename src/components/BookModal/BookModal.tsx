import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { genreKeyByValue, type Book } from '../../content/homepage';

type Props = {
  book: Book;
  onClose: () => void;
};

type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; lines: string[] };

function parseDesc(text: string): Block[] {
  const paragraphs = text.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const blocks: Block[] = [];
  for (const p of paragraphs) {
    const lines = p
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lines.length === 0) continue;
    const head = lines[0];
    if (head === '도서 소개' || head === '작가 소개') {
      blocks.push({ kind: 'heading', text: head });
      if (lines.length > 1) {
        blocks.push({ kind: 'paragraph', lines: lines.slice(1) });
      }
      continue;
    }
    blocks.push({ kind: 'paragraph', lines });
  }
  return blocks;
}

const SKELETON_WIDTHS = ['w-[92%]', 'w-[88%]', 'w-[70%]'] as const;

export default function BookModal({ book, onClose }: Props) {
  const { t } = useTranslation();
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (!book.descPath) {
      setText(null);
      setLoading(false);
      setError(false);
      return;
    }
    let canceled = false;
    setLoading(true);
    setError(false);
    fetch(book.descPath)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((tx) => {
        if (!canceled) {
          setText(tx);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!canceled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      canceled = true;
    };
  }, [book.descPath]);

  const blocks = text ? parseDesc(text) : [];
  const titleId = 'book-modal-title';
  const headingMap: Record<string, string> = {
    '도서 소개': t('bookModal.headings.intro'),
    '작가 소개': t('bookModal.headings.author'),
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(16px,4vw,48px)] max-md:p-0 max-md:items-stretch bg-[rgba(20,17,12,0.55)] backdrop-blur-[8px] animate-book-modal-fade"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[960px] max-h-[calc(100vh-64px)] bg-paper rounded-lg shadow-3 overflow-hidden animate-book-modal-rise max-md:flex-col max-md:max-w-full max-md:max-h-screen max-md:rounded-none"
      >
        <button
          ref={closeRef}
          type="button"
          aria-label={t('bookModal.close')}
          onClick={onClose}
          className="absolute top-3 right-3 z-[2] w-9 h-9 inline-flex items-center justify-center border-0 rounded-pill bg-paper/[0.92] text-ink-1 text-sm cursor-pointer transition-[background,transform] duration-200 ease-out-soft hover:bg-paper hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bookly-primary focus-visible:outline-offset-2"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="flex-[0_0_42%] max-md:flex-[0_0_auto] max-md:max-h-[40vh] bg-paper-2 flex items-center justify-center p-8 max-md:p-6 min-w-0 min-h-0">
          <img
            src={encodeURI(book.cover)}
            alt={t('books.coverAlt', { title: book.title })}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-sm shadow-[0_2px_8px_rgba(31,24,18,0.12),0_24px_48px_rgba(31,24,18,0.18)]"
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <header className="px-10 pt-10 pb-5 max-md:px-6 max-md:pt-6 max-md:pb-4 border-b border-line flex-[0_0_auto]">
            <h2
              id={titleId}
              className="m-0 mr-10 mb-3 text-fluid-modal-title max-md:text-lg font-medium leading-[1.25] tracking-snug text-ink-1"
            >
              {book.title}
            </h2>
            <div className="flex flex-wrap gap-2 items-center text-[13px] text-ink-3">
              <span>{book.publisher ?? t('bookModal.publisherUnknown')}</span>
              <span aria-hidden="true" className="text-ink-5">·</span>
              <span>{t(`books.filters.${genreKeyByValue[book.genre]}`)}</span>
              <span aria-hidden="true" className="text-ink-5">·</span>
              <span>{t('books.status.new')}</span>
            </div>
          </header>

          <div className="book-modal-body px-10 pt-6 pb-10 max-md:px-6 max-md:pt-5 max-md:pb-8 overflow-y-auto flex-1 min-h-0">
            {!book.descPath && (
              <p className="mt-6 p-6 border border-dashed border-line-strong rounded-md text-ink-3 text-sm text-center bg-paper-2">
                {t('bookModal.loadingPlaceholder')}
              </p>
            )}
            {book.descPath && loading && (
              <div aria-hidden="true" className="flex flex-col gap-3">
                {SKELETON_WIDTHS.map((w, i) => (
                  <span
                    key={i}
                    className={`block h-[14px] ${w} rounded-xs [background:linear-gradient(90deg,theme(colors.paper.2)_0%,theme(colors.paper.3)_50%,theme(colors.paper.2)_100%)] [background-size:200%_100%] animate-book-modal-shimmer`}
                  />
                ))}
              </div>
            )}
            {book.descPath && error && (
              <p className="mt-6 p-6 border border-dashed border-line-strong rounded-md text-ink-3 text-sm text-center bg-paper-2">
                {t('bookModal.loadError')}
              </p>
            )}
            {blocks.map((b, i) =>
              b.kind === 'heading' ? (
                <h3
                  key={i}
                  className="mt-7 first:mt-0 mb-3 text-sm font-semibold tracking-[0.16em] uppercase text-bookly-primary"
                >
                  {headingMap[b.text] ?? b.text}
                </h3>
              ) : (
                <p key={i} className="m-0 mb-4 leading-[1.75] text-ink-2">
                  {b.lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < b.lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
