import { findActiveProducts } from '@/server/repositories/product.repository';

export async function getActiveProducts() {
  return findActiveProducts();
}
