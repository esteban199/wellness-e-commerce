import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Affiliate from '@/models/Affiliate';
import { verifyAccessToken } from '@/lib/auth/jwt';

function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const payload = verifyAccessToken(authHeader.slice(7));
    return payload.role === 'admin' ? payload : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!requireAdmin(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await connectDB();
    const affiliates = await Affiliate.find()
      .populate('user', 'name email')
      .sort({ totalSales: -1 })
      .lean();
    return NextResponse.json({ success: true, data: affiliates });
  } catch (error) {
    console.error('[AFFILIATES GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!requireAdmin(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await connectDB();
    const { userId, code, commissionRate } = await req.json();
    const affiliate = await Affiliate.create({ user: userId, code: code.toUpperCase(), commissionRate });
    return NextResponse.json({ success: true, data: affiliate }, { status: 201 });
  } catch (error) {
    console.error('[AFFILIATES POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
