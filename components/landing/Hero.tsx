"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const line1 = ["La", "historia", "del", "fútbol,"];
const line2 = ["en", "un", "lienzo", "infinito."];
const badges = [
  { label: "2014", x: -180, y: -60 },
  { label: "2018", x: 200, y: -40 },
  { label: "2022", x: -120, y: 80 },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Label entrance
      tl.from(".hero-label", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
      });

      // Line 1 stagger
      tl.from(
        ".hero-word-l1",
        {
          autoAlpha: 0,
          y: 50,
          rotationX: -15,
          duration: 0.8,
          stagger: 0.07,
        },
        "-=0.3"
      );

      // Line 2 stagger
      tl.from(
        ".hero-word-l2",
        {
          autoAlpha: 0,
          y: 50,
          rotationX: -15,
          duration: 0.8,
          stagger: 0.07,
        },
        "-=0.5"
      );

      // Subtitle
      tl.from(
        ".hero-subtitle",
        { autoAlpha: 0, y: 20, duration: 0.7 },
        "-=0.4"
      );

      // CTAs
      tl.from(
        ".hero-cta",
        {
          autoAlpha: 0,
          y: 16,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      );

      // Floating badges with parallax
      tl.from(
        ".hero-badge",
        {
          autoAlpha: 0,
          scale: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(2)",
        },
        "-=0.4"
      );

      // Mesh gradient slow float
      gsap.to(".hero-mesh", {
        x: 40,
        y: -30,
        rotation: 15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Second mesh blob offset
      gsap.to(".hero-mesh-2", {
        x: -30,
        y: 40,
        rotation: -10,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax badges on scroll
      badges.forEach((_, i) => {
        gsap.to(`.hero-badge-${i}`, {
          y: (i + 1) * -40,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Scroll indicator pulse
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 noise-overlay"
    >
      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0 dot-grid-bg opacity-60" />

      {/* Mesh gradient blobs */}
      <div
        className="hero-mesh pointer-events-none absolute top-[30%] left-[20%] size-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.19 142 / 0.4), transparent 70%)",
        }}
      />
      <div
        className="hero-mesh-2 pointer-events-none absolute top-[50%] right-[15%] size-[400px] rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.15 260 / 0.3), transparent 70%)",
        }}
      />

      {/* Floating year badges */}
      {badges.map((badge, i) => (
        <div
          key={badge.label}
          className={`hero-badge hero-badge-${i} invisible pointer-events-none absolute top-1/2 left-1/2 z-10`}
          style={{
            transform: `translate(${badge.x}px, ${badge.y}px)`,
          }}
        >
          <span className="inline-block rounded-full border border-glass-border-hover bg-surface-elevated px-3 py-1 font-mono text-xs text-muted-foreground">
            {badge.label}
          </span>
        </div>
      ))}

      {/* Content */}
      <div
        className="relative z-10 flex max-w-5xl flex-col items-center text-center"
        style={{ perspective: "1000px" }}
      >
        {/* Label */}
        <span className="hero-label invisible mb-8 inline-flex items-center gap-2 rounded-full border border-glass-border bg-surface-elevated px-4 py-1.5 font-mono text-xs tracking-widest uppercase text-accent-green">
          <span className="inline-block size-1.5 rounded-full bg-accent-green animate-pulse" />
          Interactive World Cup Explorer
        </span>

        {/* Headline — two lines */}
        <h1 className="mb-8 flex flex-col gap-1 text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="flex flex-wrap items-center justify-center">
            {line1.map((word, i) => (
              <span
                key={i}
                className="hero-word-l1 invisible inline-block"
                style={{ marginRight: "0.3em" }}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="flex flex-wrap items-center justify-center">
            {line2.map((word, i) => (
              <span
                key={i}
                className="hero-word-l2 invisible inline-block"
                style={{
                  marginRight: "0.3em",
                  color:
                    word === "infinito."
                      ? "oklch(0.72 0.19 142)"
                      : undefined,
                  textShadow:
                    word === "infinito."
                      ? "0 0 60px oklch(0.72 0.19 142 / 0.4)"
                      : undefined,
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle invisible mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Explora los brackets de eliminatorias de mundiales históricos en un
          mapa interactivo, arrastrable y con zoom infinito. Una experiencia
          visual potenciada por React Flow.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#bracket"
            className="hero-cta invisible group relative inline-flex items-center gap-2 rounded-full bg-accent-green px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_40px_oklch(0.72_0.19_142_/_0.4)] hover:scale-[1.03] active:scale-[0.97]"
          >
            Explorar Mundial 2022
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="hero-cta invisible inline-flex items-center gap-2 rounded-full border border-glass-border-hover px-8 py-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-accent-green/30 hover:text-foreground hover:bg-accent-green/5"
          >
            Ver features
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          Scroll
        </span>
        <ChevronDown className="size-4 text-muted-foreground/40" />
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
