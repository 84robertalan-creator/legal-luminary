import { NextRequest, NextResponse } from 'next/server';

const globalForOtp = global as unknown as { otpStore: Map<string, any> };
const otpStore = globalForOtp.otpStore || new Map();
globalForOtp.otpStore = otpStore;

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    const stored = otpStore.get(email);

    if (!stored) {
      return NextResponse.json({ error: 'OTP expired or not found' }, { status: 400 });
    }

    if (Date.now() > stored.expires) {
      otpStore.delete(email);
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    if (stored.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    console.log('✅ User registered successfully:', stored.userData);
    otpStore.delete(email);

    return NextResponse.json({ message: 'Account created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}