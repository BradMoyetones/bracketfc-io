import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import SmoothScroll from "@/components/landing/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BracketFC.io | El mapa interactivo del fútbol",
    template: "%s | BracketFC.io",
  },
  description:
    "Explora los árboles de eliminatorias de mundiales históricos en un lienzo infinito, arrastrable y con zoom. Visualiza la historia del fútbol como nunca antes.",
  keywords: [
    "bracket",
    "mundial",
    "fútbol",
    "World Cup",
    "eliminatorias",
    "React Flow",
    "interactive",
    "2022",
    "2018",
    "2014",
  ],
  openGraph: {
    title: "BracketFC.io | El mapa interactivo del fútbol",
    description:
      "Explora brackets de mundiales históricos en un lienzo infinito.",
    url: "https://bracketfc.io",
    siteName: "BracketFC.io",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "BracketFC.io | El mapa interactivo del fútbol",
    description:
      "Explora brackets de mundiales históricos en un lienzo infinito.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
