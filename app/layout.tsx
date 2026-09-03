import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="flex flex-col w-full ">
        {/* Header */}
        <div className='flex flex-col items-center sm:items-start sm:mb-16 m-8'>
          <h1 className='text-3xl'>Proof lab</h1>
          <p>Calculate, proof, bake</p>
        </div>
        <main className="flex flex-1 bg-background font-sans">
          {children}
        </main>

      </body>
    </html>
  );
}
