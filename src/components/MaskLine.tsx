import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  delay: number;
  children: ReactNode;
  start?: boolean;
};

export default function MaskLine({ delay, children, start = true }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!start) return;
    const id = window.setTimeout(() => setShown(true), delay);
    return () => window.clearTimeout(id);
  }, [delay, start]);

  return (
    <span className={`mask-line${shown ? ' is-shown' : ''}`}>
      <span>{children}</span>
    </span>
  );
}
