import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

type Props = {
  as?: ElementType;
  delay?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  start?: boolean;
  [key: string]: any;
};

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  amount = 0.15,
  start = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: amount },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount]);

  const mergedStyle: CSSProperties = {
    ...style,
    transitionDelay: delay ? `${delay}ms` : undefined,
  };

  return (
    <Tag
      ref={ref}
      data-reveal
      className={`${className}${inView && start ? ' is-shown' : ''}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
