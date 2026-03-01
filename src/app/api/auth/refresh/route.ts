export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const payload = verifyRefreshToken(refreshToken);
    await connectDB();

    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    const newPayload = { userId: user._id.toString(), email: user.email, role: user.role };
    const accessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);

    user.refreshToken = newRefreshToken;
    await user.save();

    const res = NextResponse.json({ success: true, accessToken });
    res.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}
