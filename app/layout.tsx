import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Legal Luminary | JCJ & CLAT LLM MCQ Platform',
  description: 'Professional MCQ testing suite for Junior Civil Judge Prelims and CLAT LLM aspirants',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Razorpay Checkout Script */}
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}