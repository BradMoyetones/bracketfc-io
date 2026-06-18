import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import MockBracketScroll from "@/components/landing/MockBracketScroll";
import BentoGrid from "@/components/landing/BentoGrid";
import VisionSection from "@/components/landing/VisionSection";
import StatsMarquee from "@/components/landing/StatsMarquee";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Explora los brackets de eliminatorias de mundiales históricos (2014, 2018, 2022) en un lienzo infinito e interactivo. Potenciado por React Flow y Next.js.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MockBracketScroll />
      <BentoGrid />
      <VisionSection />
      <StatsMarquee />
      <Footer />
    </>
  );
}
