import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Setting up Playfair Display for Serifs (Headings)
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

// Setting up Inter for Sans-Serif (Body text)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevate with Tanuja | Executive Presence Masterclass",
  description: "Join the online masterclass for working women professionals to build confidence, visibility, and career growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-white text-[#333333]`}
      >
        {children}
      </body>
    </html>
  );
}
