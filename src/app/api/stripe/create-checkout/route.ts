import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { priceId } = body;

  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY!;
    if (!stripeKey.startsWith('sk_')) throw new Error('Invalid key');
    
    return NextResponse.json({ url: '#', message: 'Stripe checkout placeholder - configure key' });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
