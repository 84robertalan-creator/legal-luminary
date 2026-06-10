import { NextRequest, NextResponse } from 'next/server';

// Use global to persist across hot reloads in development
const globalForOtp = global as unknown as { otpStore: Map<string, any> };
const otpStore = globalForOtp.otpStore || new Map();
globalForOtp.otpStore = otpStore;

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email, { otp, expires, userData: { name, email, phone, password } });

    console.log(`\n=== OTP for ${phone} ===\n${otp}\n========================\n`);

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}