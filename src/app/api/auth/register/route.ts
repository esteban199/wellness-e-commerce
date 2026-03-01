export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const user = await User.create({ name, email, password });
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
    console.error('[REGISTER]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
