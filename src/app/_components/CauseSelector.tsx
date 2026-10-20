'use client';

import { useState } from 'react';

const causes = [
  {
    id: 'women-empowerment',
    label: 'Women Empowerment',
    icon: 'users',
  },
  {
    id: 'disability-support',
    label: 'Disability Support',
    icon: 'accessibility',
  },
  {
    id: 'environmental-upcycled',
    label: 'Environmental & Upcycled',
    icon: 'leaf',
  },
  {
    id: 'rural-livelihoods',
    label: 'Rural Livelihoods',
    icon: 'sprout',
  },
];

function CauseIcon({ name }: { name: string }) {
  const iconClass = 'size-6 shrink-0';

  switch (name) {
    case 'users':
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19" strokeLinecap="round" />
          <path
            d="M16 5.5a3 3 0 0 1 0 5.8M18 14a4.5 4.5 0 0 1 2.5 4v1"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'accessibility':
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <circle cx="12" cy="4" r="1.8" />
          <path
            d="M6 8h12M12 6v6l4 3M12 12l-3 5a3.5 3.5 0 1 0 6 1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'leaf':
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path
            d="M20.5 3.5C10 3.5 4 7.5 4 14a6 6 0 0 0 6 6c6.5 0 10.5-8 10.5-16.5Z"
            strokeLinejoin="round"
          />
          <path d="M3 21 14 10" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path
            d="M12 21V11M12 14c-5 0-8-3-8-8 5 0 8 3 8 8ZM12 11c0-4 3-7 8-7 0 5-3 8-8 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5 21h14" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function CauseSelector() {
  const [selectedCause, setSelectedCause] = useState('women-empowerment');

  return (
    <div
      aria-label="Explore causes"
      className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-2"
    >
      {causes.map((cause) => {
        const isSelected = selectedCause === cause.id;

        return (
          <button
            key={cause.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelectedCause(cause.id)}
            className={`flex min-h-[58px] items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:justify-center sm:gap-2 sm:px-2 ${
              isSelected
                ? 'border-[#E9BDB5] bg-[#FBE9E5] text-primary'
                : 'border-black/[0.08] bg-white/40 text-text hover:border-primary/25 hover:bg-white'
            }`}
          >
            <CauseIcon name={cause.icon} />
            <span className="text-xs font-medium leading-snug sm:text-sm">
              {cause.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
