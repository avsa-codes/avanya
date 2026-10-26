import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from '@/components/layout/Footer';
import MobileNavbar from '@/components/layout/MobileNavbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Avanya",
  description: "An NGO Powered Marketplace",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <MobileNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
