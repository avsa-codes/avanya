import Image from 'next/image';
import Link from 'next/link';

const ngos = [
  {
    id: 'craft-revival-trust',
    name: 'Craft Revival Trust',
    focus: 'Traditional Crafts Preservation',
    location: 'Pan India',
    causes: [
      'Heritage Preservation',
      'Artisan Empowerment',
      'Cultural Documentation',
    ],
    description:
      'Preserving and promoting traditional Indian crafts and artisans',
    rating: '4.9',
    reviews: '245',
    established: '1982',
    artisansSupported: '2500',
    activeArtisans: '156',
    image: '/images/avanya_ngo_image.png',
  },
  {
    id: 'dastkar',
    name: 'Dastkar',
    focus: 'Rural Artisan Development',
    location: 'Delhi & Rural India',
    causes: ['Rural Development', 'Design Innovation', 'Market Linkage'],
    description:
      'Supporting rural artisans through design development and market linkages',
    rating: '4.8',
    reviews: '189',
    established: '1981',
    artisansSupported: '1800',
    activeArtisans: '234',
    image: '/images/avanya_ngo_image.png',
  },
];

export default function NGOProfiles({ search = '' }: { search?: string }) {
  const filteredNGOs = ngos.filter((ngo) =>
    [ngo.name, ngo.focus, ngo.location, ngo.description, ...ngo.causes]
      .join(' ')
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  if (filteredNGOs.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-stone-500">
        No organizations found. Try another search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {filteredNGOs.map((ngo) => (
        <article
          key={ngo.id}
          className="overflow-hidden rounded-xl border border-[#E1DDD5] bg-[#F8F5EF] shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative h-48 sm:h-56 lg:h-60">
            <Image
              src={ngo.image}
              alt={`Community work associated with ${ngo.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <span className="absolute right-3 top-3 rounded-md bg-[#315A80] px-3 py-1 text-[11px] font-medium text-white">
              ♙ NGO Partner
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {ngo.causes.map((cause) => (
                <span
                  key={cause}
                  className="rounded-md border border-[#DED8CE] bg-[#FAF8F4] px-2 py-1 text-[10px] text-[#51483E]"
                >
                  {cause}
                </span>
              ))}
            </div>

            <h2 className="font-serif text-xl font-semibold text-[#211C18]">
              {ngo.name}
            </h2>

            <p className="mt-1 text-xs text-stone-500">{ngo.focus}</p>

            <p className="mt-2 text-xs text-stone-500">
              <span aria-hidden="true">⌖ </span>
              {ngo.location}
            </p>

            <p className="mt-3 text-xs leading-5 text-[#6F655B]">
              {ngo.description}
            </p>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <p className="text-[#453A30]">
                <span className="text-[#B58A25]">★</span>{' '}
                <span className="font-medium text-[#211C18]">{ngo.rating}</span>{' '}
                <span className="text-stone-500">({ngo.reviews})</span>
              </p>

              <p className="text-stone-500">Est. {ngo.established}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-sm font-semibold text-[#8B2625]">
                  {ngo.artisansSupported}
                </p>
                <p className="text-[10px] text-stone-500">Artisans Supported</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#8B2625]">
                  {ngo.activeArtisans}
                </p>
                <p className="text-[10px] text-stone-500">Active Artisans</p>
              </div>
            </div>

            <div className="mt-4 flex items-stretch gap-2">
              <Link
                href={`/artisans/${ngo.id}`}
                className="flex flex-1 items-center justify-center rounded-md bg-[#B94440] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#8B2625]"
              >
                View Profile
              </Link>

              <button
                type="button"
                aria-label={`View ${ngo.name} community details`}
                title="Community details"
                className="flex w-9 items-center justify-center rounded-md border border-[#E1DDD5] bg-white text-[#51483E] transition-colors hover:bg-[#F0EBE3]"
              >
                ♙
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
