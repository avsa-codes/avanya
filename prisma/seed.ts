import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing from your environment.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const ngoData = [
  {
    id: '00000000-0000-4000-8000-000000000001',
    legalName: 'Sakhi Rural Development Foundation',
    brandName: 'Sakhi Collective',
    contactEmail: 'sakhi@example.com',
    headquartersAddress: 'Jaipur, Rajasthan, India',
    description:
      'Supporting rural women through artisan livelihoods and traditional crafts.',
    establishedYear: 2012,
    accountStatus: 'ACTIVE' as const,
    beneficiaryCountAnnual: 350,
    beneficiaryCountYear: 2026,
    primaryCause: "Women's empowerment",
  },
  {
    id: '00000000-0000-4000-8000-000000000002',
    legalName: 'Gram Kala Welfare Society',
    brandName: 'Gram Kala',
    contactEmail: 'gramkala@example.com',
    headquartersAddress: 'Jaipur, Rajasthan, India',
    description:
      'Preserving regional handicrafts and supporting rural artisan communities.',
    establishedYear: 2015,
    accountStatus: 'ACTIVE' as const,
    beneficiaryCountAnnual: 220,
    beneficiaryCountYear: 2026,
    primaryCause: 'Traditional handicrafts',
  },
  {
    id: '00000000-0000-4000-8000-000000000003',
    legalName: 'Prakriti Community Initiative',
    brandName: 'Prakriti Works',
    contactEmail: 'prakriti@example.com',
    headquartersAddress: 'Bengaluru, Karnataka, India',
    description:
      'Promoting sustainable products and income opportunities for underserved communities.',
    establishedYear: 2018,
    accountStatus: 'ACTIVE' as const,
    beneficiaryCountAnnual: 180,
    beneficiaryCountYear: 2026,
    primaryCause: 'Sustainable livelihoods',
  },
];

const artisanData = [
  {
    id: '00000000-0000-4000-8000-000000000011',
    fullName: 'Meera Sharma',
    experienceYears: 12,
    location: 'Jaipur, Rajasthan',
    skills: ['Block printing', 'Textiles'],
    ngoId: ngoData[0].id,
  },
  {
    id: '00000000-0000-4000-8000-000000000012',
    fullName: 'Kavita Devi',
    experienceYears: 9,
    location: 'Sanganer, Rajasthan',
    skills: ['Hand printing', 'Fabric dyeing'],
    ngoId: ngoData[0].id,
  },
  {
    id: '00000000-0000-4000-8000-000000000013',
    fullName: 'Ramesh Kumawat',
    experienceYears: 16,
    location: 'Jaipur, Rajasthan',
    skills: ['Pottery', 'Ceramics'],
    ngoId: ngoData[1].id,
  },
  {
    id: '00000000-0000-4000-8000-000000000014',
    fullName: 'Pooja Kumari',
    experienceYears: 7,
    location: 'Bagru, Rajasthan',
    skills: ['Embroidery', 'Textile crafts'],
    ngoId: ngoData[1].id,
  },
  {
    id: '00000000-0000-4000-8000-000000000015',
    fullName: 'Lakshmi Nair',
    experienceYears: 11,
    location: 'Bengaluru, Karnataka',
    skills: ['Jute crafts', 'Natural materials'],
    ngoId: ngoData[2].id,
  },
  {
    id: '00000000-0000-4000-8000-000000000016',
    fullName: 'Anita Rao',
    experienceYears: 8,
    location: 'Mysuru, Karnataka',
    skills: ['Handmade decor', 'Sustainable crafts'],
    ngoId: ngoData[2].id,
  },
];

const productData = [
  {
    name: 'Indigo Block Print Tote',
    slug: 'indigo-block-print-tote',
    sku: 'AV-P001',
    price: 699,
    stock: 25,
    artisan: 0,
    ngo: 0,
    category: 'Bags',
    featured: true,
  },
  {
    name: 'Floral Cotton Table Runner',
    slug: 'floral-cotton-table-runner',
    sku: 'AV-P002',
    price: 899,
    stock: 18,
    artisan: 1,
    ngo: 0,
    category: 'Home Decor',
    featured: true,
  },
  {
    name: 'Handprinted Cushion Cover',
    slug: 'handprinted-cushion-cover',
    sku: 'AV-P003',
    price: 449,
    stock: 30,
    artisan: 0,
    ngo: 0,
    category: 'Home Decor',
    featured: false,
  },
  {
    name: 'Indigo Everyday Scarf',
    slug: 'indigo-everyday-scarf',
    sku: 'AV-P004',
    price: 599,
    stock: 20,
    artisan: 1,
    ngo: 0,
    category: 'Accessories',
    featured: false,
  },
  {
    name: 'Block Print Gift Pouch Set',
    slug: 'block-print-gift-pouch-set',
    sku: 'AV-P005',
    price: 349,
    stock: 40,
    artisan: 0,
    ngo: 0,
    category: 'Gifts',
    featured: false,
  },
  {
    name: 'Terracotta Serving Bowl',
    slug: 'terracotta-serving-bowl',
    sku: 'AV-P006',
    price: 549,
    stock: 15,
    artisan: 2,
    ngo: 1,
    category: 'Tableware',
    featured: true,
  },
  {
    name: 'Handcrafted Clay Planter',
    slug: 'handcrafted-clay-planter',
    sku: 'AV-P007',
    price: 399,
    stock: 22,
    artisan: 2,
    ngo: 1,
    category: 'Home Decor',
    featured: false,
  },
  {
    name: 'Rustic Terracotta Vase',
    slug: 'rustic-terracotta-vase',
    sku: 'AV-P008',
    price: 799,
    stock: 12,
    artisan: 2,
    ngo: 1,
    category: 'Home Decor',
    featured: true,
  },
  {
    name: 'Mini Clay Diya Set',
    slug: 'mini-clay-diya-set',
    sku: 'AV-P009',
    price: 249,
    stock: 50,
    artisan: 2,
    ngo: 1,
    category: 'Festive Decor',
    featured: false,
  },
  {
    name: 'Handmade Ceramic Mug',
    slug: 'handmade-ceramic-mug',
    sku: 'AV-P010',
    price: 499,
    stock: 18,
    artisan: 2,
    ngo: 1,
    category: 'Tableware',
    featured: false,
  },
  {
    name: 'Embroidered Festive Clutch',
    slug: 'embroidered-festive-clutch',
    sku: 'AV-P011',
    price: 1199,
    stock: 10,
    artisan: 3,
    ngo: 1,
    category: 'Bags',
    featured: true,
  },
  {
    name: 'Handstitched Cotton Pouch',
    slug: 'handstitched-cotton-pouch',
    sku: 'AV-P012',
    price: 299,
    stock: 35,
    artisan: 3,
    ngo: 1,
    category: 'Accessories',
    featured: false,
  },
  {
    name: 'Embroidered Wall Hanging',
    slug: 'embroidered-wall-hanging',
    sku: 'AV-P013',
    price: 999,
    stock: 8,
    artisan: 3,
    ngo: 1,
    category: 'Home Decor',
    featured: false,
  },
  {
    name: 'Colourful Thread Bookmark Set',
    slug: 'colourful-thread-bookmark-set',
    sku: 'AV-P014',
    price: 199,
    stock: 45,
    artisan: 3,
    ngo: 1,
    category: 'Stationery',
    featured: false,
  },
  {
    name: 'Jute Storage Basket',
    slug: 'jute-storage-basket',
    sku: 'AV-P015',
    price: 649,
    stock: 20,
    artisan: 4,
    ngo: 2,
    category: 'Storage',
    featured: true,
  },
  {
    name: 'Woven Jute Table Mat Set',
    slug: 'woven-jute-table-mat-set',
    sku: 'AV-P016',
    price: 499,
    stock: 24,
    artisan: 4,
    ngo: 2,
    category: 'Tableware',
    featured: false,
  },
  {
    name: 'Natural Fibre Gift Hamper',
    slug: 'natural-fibre-gift-hamper',
    sku: 'AV-P017',
    price: 899,
    stock: 14,
    artisan: 4,
    ngo: 2,
    category: 'Gifts',
    featured: true,
  },
  {
    name: 'Handcrafted Desk Organiser',
    slug: 'handcrafted-desk-organiser',
    sku: 'AV-P018',
    price: 449,
    stock: 16,
    artisan: 5,
    ngo: 2,
    category: 'Stationery',
    featured: false,
  },
  {
    name: 'Sustainable Home Decor Set',
    slug: 'sustainable-home-decor-set',
    sku: 'AV-P019',
    price: 1299,
    stock: 9,
    artisan: 5,
    ngo: 2,
    category: 'Home Decor',
    featured: true,
  },
  {
    name: 'Artisan Handmade Gift Box',
    slug: 'artisan-handmade-gift-box',
    sku: 'AV-P020',
    price: 749,
    stock: 17,
    artisan: 5,
    ngo: 2,
    category: 'Gifts',
    featured: false,
  },
];

const imageUrls = [
  'https://images.unsplash.com/photo-1544816155-12df9643f363',
  'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9',
];

async function main() {
  console.log('Seeding Avanya development data...');

  for (const ngo of ngoData) {
    await prisma.nGO.upsert({
      where: { id: ngo.id },
      update: ngo,
      create: ngo,
    });
  }

  console.log(`Upserted ${ngoData.length} NGOs.`);

  for (const artisan of artisanData) {
    await prisma.artisan.upsert({
      where: { id: artisan.id },
      update: artisan,
      create: {
        ...artisan,
        beneficiaryStatusTags: ['artisan', 'development-seed'],
      },
    });
  }

  console.log(`Upserted ${artisanData.length} artisans.`);

  for (let i = 0; i < productData.length; i++) {
    const item = productData[i];
    const id = `00000000-0000-4000-8000-${String(101 + i).padStart(12, '0')}`;

    const productFields = {
      name: item.name,
      slug: item.slug,
      sku: item.sku,
      description: `${item.name}, thoughtfully handcrafted by an artisan partner. Category: ${item.category}. This is sample development catalogue content for Avanya.`,
      price: item.price,
      compareAtPrice: Math.round(item.price * 1.2 * 100) / 100,
      stockQuantity: item.stock,
      status: 'ACTIVE' as const,
      isFeatured: item.featured,
      metaTitle: item.name,
      metaDescription: `Discover ${item.name} on Avanya's artisan marketplace.`,
      attributes: { category: item.category, source: 'development-seed' },
      artisanId: artisanData[item.artisan].id,
      ngoId: ngoData[item.ngo].id,
    };

    await prisma.product.upsert({
      where: { sku: item.sku },
      update: productFields,
      create: { id, ...productFields },
    });

    const product = await prisma.product.findUniqueOrThrow({
      where: { sku: item.sku },
      select: { id: true },
    });

    for (let imageIndex = 0; imageIndex < imageUrls.length; imageIndex++) {
      const imageId = `00000000-0000-4000-8000-${String(
        201 + i * 2 + imageIndex
      ).padStart(12, '0')}`;

      await prisma.productImage.upsert({
        where: { id: imageId },
        update: {
          imageUrl: imageUrls[imageIndex],
          altText: `${item.name} - product image ${imageIndex + 1}`,
          displayOrder: imageIndex,
          isPrimary: imageIndex === 0,
          productId: product.id,
        },
        create: {
          id: imageId,
          imageUrl: imageUrls[imageIndex],
          altText: `${item.name} - product image ${imageIndex + 1}`,
          displayOrder: imageIndex,
          isPrimary: imageIndex === 0,
          productId: product.id,
        },
      });
    }
  }

  console.log(
    `Upserted ${productData.length} products and ${
      productData.length * 2
    } images.`
  );
  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Avanya seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
