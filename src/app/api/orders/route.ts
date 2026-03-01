export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Order from '@/models/Order';
import Affiliate from '@/models/Affiliate';
import { verifyAccessToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    let userId: string | undefined;
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const payload = verifyAccessToken(authHeader.slice(7));
        userId = payload.userId;
      } catch {
        // guest order, no user
      }
    }

    const order = await Order.create({
      ...body,
      user: userId,
    });

    // Track affiliate commission if code provided
    if (body.affiliateCode) {
      await Affiliate.findOneAndUpdate(
        { code: body.affiliateCode.toUpperCase(), isActive: true },
        {
          $inc: {
            totalSales: order.total,
            totalCommission: order.total * 0.1,
          },
        }
      );
    }

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error('[ORDERS POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAccessToken(authHeader.slice(7));

    const query =
      payload.role === 'admin' ? {} : { user: payload.userId };

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images')
      .lean();

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('[ORDERS GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
