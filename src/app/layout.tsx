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
  title: "Ujjawal Saini | I build things for the web & AI",
  description: "A versatile developer and hacker proficient in Full Stack Web Development, Machine Learning, Deep Learning and Cyber Security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased bg-slate-950`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
