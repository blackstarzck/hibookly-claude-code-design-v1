import { useEffect, useRef, useState } from 'react';
import type { Book } from '../content/homepage';

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

export default function BookModal({ book, onClose }: Props) {
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
      .then((t) => {
        if (!canceled) {
          setText(t);
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

  return (
    <div
      className="book-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="book-modal__dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="book-modal__close"
          aria-label="닫기"
          onClick={onClose}
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="book-modal__cover">
          <img src={encodeURI(book.cover)} alt={`${book.title} 표지`} />
        </div>

        <div className="book-modal__content">
          <header className="book-modal__header">
            <h2 id={titleId} className="book-modal__title">
              {book.title}
            </h2>
            <div className="book-modal__meta">
              <span>{book.publisher ?? '출판사 미정'}</span>
              <span className="book-modal__dot" aria-hidden="true">·</span>
              <span>{book.genre}</span>
              <span className="book-modal__dot" aria-hidden="true">·</span>
              <span>{book.status}</span>
            </div>
          </header>

          <div className="book-modal__body">
            {!book.descPath && (
              <p className="book-modal__placeholder">
                도서 소개 본문이 준비 중입니다.
              </p>
            )}
            {book.descPath && loading && (
              <div className="book-modal__skeleton" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
            {book.descPath && error && (
              <p className="book-modal__placeholder">
                도서 소개를 불러올 수 없습니다.
              </p>
            )}
            {blocks.map((b, i) =>
              b.kind === 'heading' ? (
                <h3 key={i} className="book-modal__h3">
                  {b.text}
                </h3>
              ) : (
                <p key={i} className="book-modal__p">
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
