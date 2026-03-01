export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload = { userId: user._id.toString(), email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    const res = NextResponse.json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email, role: user.role },
      accessToken,
    });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('[LOGIN]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
