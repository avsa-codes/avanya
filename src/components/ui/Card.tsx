import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Card({
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/5 bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
