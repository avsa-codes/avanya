import Link from 'next/link';

import Container from '@/components/layout/Container';
import CategoryCard from './CategoryCard';


const categories = [
  {
    name: 'Stationery & Office Essentials',
    description: 'Notebooks, paper bags, desk items and more',
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace?category=stationery',
  },
  {
    name: 'Eco-Friendly & Upcycled',
    description: 'Bags, zero-waste products, planet-conscious items',
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace?category=eco-friendly',
  },
  {
    name: 'Gourmet & Organics',
    description: 'Teas, spices, preserves, healthy snacks',
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace?category=gourmet',
  },
  {
    name: 'Apparel & Accessories',
    description: 'Cotton totes, stoles, everyday wear',
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace?category=apparel',
  },
  {
    name: 'Home & Living',
    description: 'Terracotta, handwoven textiles, decor',
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace?category=home-living',
  },
  {
    name: 'Wellness & Personal Care',
    description: 'Handmade soaps, natural oils, candles and more',
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace?category=wellness',
  },
];

export default function CategorySection() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-text/65 sm:text-base">
              Explore products across causes and communities.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            View all categories <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
