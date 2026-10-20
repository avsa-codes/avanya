import Link from 'next/link';

import Container from '@/components/layout/Container';
import ProductCard from '@/components/ui/ProductCard';

const products = [
  {
    name: 'Handwoven Cotton Tote Bag',
    price: 699,
    originalPrice: 1000,
    impactLabel: 'Supports Women Empowerment',
    seller: 'Saath NGO',
    location: 'Rajasthan',
    rating: 4.8,
    reviewCount: 42,
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace/products/cotton-tote-bag',
  },
  {
    name: 'Recycled Paper Notebook Set',
    price: 299,
    originalPrice: 450,
    impactLabel: 'Made by Differently Abled',
    seller: 'Aaroh NGO',
    location: 'Delhi',
    rating: 4.7,
    reviewCount: 28,
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace/products/recycled-notebook-set',
  },
  {
    name: 'Himalayan Herbal Tea',
    price: 399,
    originalPrice: 550,
    impactLabel: 'Organic & Chemical Free',
    seller: 'Pahad Roots',
    location: 'Uttarakhand',
    rating: 4.9,
    reviewCount: 56,
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace/products/himalayan-herbal-tea',
  },
  {
    name: 'Recycled Canvas Laptop Sleeve',
    price: 799,
    originalPrice: 1200,
    impactLabel: 'Upcycled Plastic',
    seller: 'Green Steps',
    location: 'Bengaluru',
    rating: 4.8,
    reviewCount: 36,
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace/products/canvas-laptop-sleeve',
  },
  {
    name: 'Terracotta Mug Set (2 pcs)',
    price: 499,
    originalPrice: 750,
    impactLabel: 'Supports Rural Livelihoods',
    seller: 'Mitti Kala',
    location: 'Uttar Pradesh',
    rating: 4.6,
    reviewCount: 19,
    image: '/images/homepage/product-cotton-tote-bag.png',
    href: '/marketplace/products/terracotta-mug-set',
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-1 text-sm text-text/65 sm:text-base">
              Handpicked products creating real impact.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            View all products <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
