import { prisma } from '@/lib/prisma';

export async function findActiveProducts() {
  return prisma.product.findMany({ //prisma client accessor
    where: {
      status: 'ACTIVE',
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      productImages: {
        select: {
          imageUrl: true,
          altText: true,
          isPrimary: true,
        },
        orderBy: {
          displayOrder: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
    take: 20,
  });
}
