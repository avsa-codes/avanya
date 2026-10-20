import type { HTMLAttributes, ReactNode } from 'react';

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  eyebrow?: string;
  action?: ReactNode;
};

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  eyebrow,
  action,
  className = '',
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'text-center sm:flex-col sm:items-center' : ''
      } ${className}`}
      {...props}
    >
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}

        <h2 className="font-display text-3xl text-text sm:text-4xl">{title}</h2>

        {subtitle && (
          <p className="max-w-2xl text-sm leading-6 text-text/70 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
