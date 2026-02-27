import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'cad', metadata } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('[STRIPE]', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
