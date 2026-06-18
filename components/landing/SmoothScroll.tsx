"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — Bridges Lenis smooth scroll with GSAP ScrollTrigger.
 *
 * - Lenis handles the buttery interpolation of scroll position.
 * - GSAP's ticker drives the RAF loop (autoRaf: false) so both
 *   systems update on the exact same frame — zero jitter.
 * - ScrollTrigger.update() is called on every Lenis scroll event
 *   so all scroll-tied animations stay perfectly synced.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.4,
      syncTouch: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share the same frame
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
