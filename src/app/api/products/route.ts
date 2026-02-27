import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { isActive: true };
    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    if (search) query.$text = { $search: search };

    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('[PRODUCTS GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error('[PRODUCTS POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
