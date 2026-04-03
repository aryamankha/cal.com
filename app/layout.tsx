import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
  display: "swap",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Cal.com Design System",
  description: "Design system based on Cal.com's visual language",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
