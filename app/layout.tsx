import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Launchpad OS — Ship your startup in 7 days",
  description:
    "The complete system for going from idea to launched product in a week: a Notion operating system, a Figma UI kit, and launch-day automation scripts. One purchase, no subscription.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Launchpad OS — Ship your startup in 7 days",
    description:
      "A Notion operating system, Figma UI kit, and launch automation scripts — built to take you from idea to live product in a week.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
