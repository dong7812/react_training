import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JUNGLE LIST",
  description: "React training project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000]`} >
        {/* 네비게이션 - 모든 페이지에 공통 (SSR) */}
        <Navbar />

        {/* 페이지 본문 */}
        <main>{children}</main>

        {/* 하단 */}
        <Footer />
      </body>
    </html>
  );
}
