import Image from "next/image";
import Link from "next/link";

const artisans = [
  {
    id: "meera-devi",
    name: "Meera Devi",
    craft: "Handcrafted pottery",
    location: "Varanasi, Uttar Pradesh",
    experience: "25 years of practice",
    description:
      "Keeping India's living craft traditions alive through patient, skilled handwork.",
    image: "/images/avanya_artisan_image.png",
    number: "01",
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    craft: "Traditional pottery",
    location: "Jaipur, Rajasthan",
    experience: "18 years of practice",
    description:
      "Shaping everyday objects into enduring pieces inspired by India's artistic heritage.",
    image: "/images/avanya_artisan_image.png",
    number: "02",
  },
];

export default function ArtisanProfiles({
  search = "",
}: {
  search?: string;
}) {
  const filteredArtisans = artisans.filter((artisan) =>
    [
      artisan.name,
      artisan.craft,
      artisan.location,
      artisan.description,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  if (filteredArtisans.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-stone-500">
        No artisans found. Try another search.
      </p>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredArtisans.map((artisan) => (
        <article
          key={artisan.id}
          className="group min-w-0 overflow-hidden border border-[#E7DED3] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#49291B]/10"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE1D5]">
            <Image
              src={artisan.image}
              alt={`${artisan.name} working with traditional pottery`} 
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <span className="absolute left-4 top-4 bg-[#FAF8F2] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#7E2927]">
              Artisan collection
            </span>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.16em] text-[#9A5144]">
                {artisan.craft}
              </p>
              <span className="font-serif text-xl text-[#D8C7B2]">
                {artisan.number}
              </span>
            </div>

            <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#211C18]">
              {artisan.name}
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              {artisan.location}
            </p>

            <p className="mt-5 min-h-12 text-sm leading-6 text-[#665D54]">
              {artisan.description}
            </p>

            <div className="mt-5 border-t border-[#EAE2D8] pt-4">
              <p className="text-xs tracking-wide text-stone-500">
                EXPERIENCE
              </p>
              <p className="mt-1 text-sm text-[#302821]">
                {artisan.experience}
              </p>
            </div>

            <Link
              href={`/artisans/${artisan.id}`}
              className="mt-6 flex items-center justify-between border-b border-[#8B2625] pb-2 text-sm font-medium text-[#8B2625] transition-colors hover:text-[#5F1B1A]"
            >
              Discover artisan
              <span aria-hidden="true" className="text-lg">↗</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}