"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entrance: slide down
      gsap.from(".navbar-inner", {
        y: -80,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      // Show/hide on scroll direction
      const showAnim = gsap
        .from(".navbar-inner", {
          yPercent: -120,
          paused: true,
          duration: 0.3,
          ease: "power2.out",
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play();
          } else if (self.scroll() > 100) {
            showAnim.reverse();
          }
        },
      });
    },
    { scope: navRef }
  );

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar-inner invisible mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-2xl border border-glass-border bg-background/60 px-6 py-3 backdrop-blur-xl">
        {/* Logo */}
        <a href="#" className="font-mono text-sm font-bold tracking-tight text-foreground">
          BracketFC
          <span className="text-accent-green">.io</span>
        </a>

        {/* Nav links */}
        <div className="hidden items-center gap-8 sm:flex">
          <a
            href="#bracket"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Bracket
          </a>
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#vision"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Visión
          </a>
        </div>

        {/* CTA */}
        <a
          href="#bracket"
          className="group inline-flex items-center gap-1.5 rounded-full bg-accent-green px-4 py-1.5 text-xs font-semibold text-black transition-all duration-200 hover:shadow-[0_0_20px_oklch(0.72_0.19_142_/_0.3)] hover:scale-[1.03] active:scale-[0.97]"
        >
          Explorar
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </nav>
  );
}
