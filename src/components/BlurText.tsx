import { Fragment, useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  delay?: number;
  start?: boolean;
  className?: string;
};

export default function BlurText({ text, delay = 0, start = true, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const active = inView && start;
  const lines = text.split('\n').map((line) => line.split(' '));

  let wordIndex = 0;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.1em',
        margin: 0,
        color: 'inherit',
      }}
    >
      {lines.map((words, lineIdx) => (
        <Fragment key={`line-${lineIdx}`}>
          {words.map((word) => {
            const i = wordIndex++;
            return (
              <span
                key={`${i}-${word}`}
                className={`blur-word${active ? ' is-shown' : ''}`}
                style={{
                  marginRight: '0.28em',
                  transitionDelay: active ? `${delay + i * 100}ms` : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
          {lineIdx < lines.length - 1 && (
            <span aria-hidden="true" style={{ flexBasis: '100%', height: 0, margin: 0 }} />
          )}
        </Fragment>
      ))}
    </span>
  );
}
