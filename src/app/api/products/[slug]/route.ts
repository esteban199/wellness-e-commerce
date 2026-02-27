import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Product from '@/models/Product';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: params.slug, isActive: true }).lean();
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('[PRODUCT GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true }
    );
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('[PRODUCT PUT]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    await Product.findOneAndUpdate({ slug: params.slug }, { isActive: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PRODUCT DELETE]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
