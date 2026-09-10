import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/app/components/main-header";
import MobileNav from '@/app/components/mobile-nav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proof lab",
  description: "Calculate and proof the dough",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col w-full h-full">
        <MainHeader />
        <main className="flex flex-1 bg-background font-sans pb-16 sm:pb-0">
          {children}
        </main>
        <MobileNav />
      </body>

    </html>
  );
}
