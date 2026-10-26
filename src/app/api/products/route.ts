import { NextResponse } from 'next/server';
import { getActiveProducts } from '@/server/services/product.service';

export async function GET() {
  try {
    const products = await getActiveProducts();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve products',
      },
      { status: 500 }
    );
  }
}
