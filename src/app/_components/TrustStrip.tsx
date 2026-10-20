import Container from '@/components/layout/Container';

const trustItems = [
  {
    icon: 'shield',
    title: '100% NGO Verified',
    description: 'Trusted organizations only',
    svg: (
      <path
        d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z M8.5 12l2.2 2.2 4.8-4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    icon: 'people',
    title: 'Direct Impact to Makers',
    description: 'Fair opportunities and income',
    svg: (
      <>
        <circle
          cx="9"
          cy="8"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="17"
          cy="9"
          r="2.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3.5 19v-1.5A5.5 5.5 0 0 1 9 12a5.5 5.5 0 0 1 5.5 5.5V19Zm11-6a4.5 4.5 0 0 1 5 4.5V19h-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    icon: 'price',
    title: 'Fair Prices & Easy Returns',
    description: 'Quality products, worry-free shopping',
    svg: (
      <path
        d="M20 13 13 20 4 11V4h7l9 9ZM7.5 7.5h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    icon: 'delivery',
    title: 'Pan-India & Global Delivery',
    description: 'Bringing impact, everywhere',
    svg: (
      <>
        <path
          d="M3 6h11v11H3z M14 10h4l3 4v3h-7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          cx="7"
          cy="19"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="18"
          cy="19"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-black/[0.08] bg-[#FAF8F5]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustItems.map((item, index) => (
            <div
              key={item.icon}
              className={`relative flex min-h-[68px] items-center gap-3 px-3 py-2 sm:gap-4 sm:px-5 lg:justify-center lg:px-4 ${
                index % 2 === 1
                  ? 'border-l border-black/[0.08] md:border-l-0'
                  : ''
              } ${
                index > 1 ? 'border-t border-black/[0.08] md:border-t-0' : ''
              } ${
                index > 0
                  ? 'md:before:absolute md:before:left-0 md:before:top-1/2 md:before:h-9 md:before:-translate-y-1/2 md:before:border-l md:before:border-black/[0.08]'
                  : ''
              }`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7 shrink-0 text-primary"
                fill="none"
              >
                {item.svg}
              </svg>

              <div className="min-w-0">
                <h2 className="text-[11px] font-semibold leading-[1.4] text-text sm:text-xs">
                  {item.title}
                </h2>

                <p className="mt-0.5 text-[10px] leading-[1.4] text-text/65 sm:text-[11px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
