import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/ui/Card';

type CategoryCardProps = {
  name: string;
  description: string;
  image: string;
  href: string;
};

export default function CategoryCard({
  name,
  description,
  image,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <Card className="h-full transition-shadow duration-200 group-hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 17vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-display text-lg leading-tight text-text">
            {name}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-text/65 sm:text-sm">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
