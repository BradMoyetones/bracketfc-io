"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * VisionSection — storytelling with mock UI elements assembling on scroll.
 *
 * Left half: big statement text with parallax.
 * Right half: mock interface cards sliding in from the right.
 */

const mockSidebarItems = ["Brasil 2014", "Rusia 2018", "Qatar 2022"];
const mockStats = [
  { label: "Partidos", value: "124" },
  { label: "Goles", value: "380" },
  { label: "Selecciones", value: "32" },
];

export default function VisionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Left text parallax
      gsap.from(".vision-heading", {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".vision-subtext", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Right side mock UI elements — staggered from right
      gsap.from(".mock-ui-card", {
        x: 80,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vision-mockups",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Parallax on the mock cards
      gsap.to(".mock-ui-group", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="vision"
      ref={containerRef}
      className="vision-section relative overflow-hidden px-6 py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — Text */}
        <div>
          <span className="mb-4 inline-block font-mono text-xs tracking-widest uppercase text-accent-green">
            La Visión
          </span>
          <h2 className="vision-heading invisible mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Más que resultados.{" "}
            <span
              style={{
                color: "oklch(0.72 0.19 142)",
                textShadow: "0 0 40px oklch(0.72 0.19 142 / 0.3)",
              }}
            >
              La historia visual
            </span>{" "}
            de los mundiales.
          </h2>
          <p className="vision-subtext invisible max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada eliminatoria cuenta una historia. Cada gol, cada penalti, cada
            sorpresa. BracketFC.io las conecta en un mapa interactivo que puedes
            explorar, arrastrar y descubrir a tu ritmo.
          </p>
        </div>

        {/* Right — Mock UI elements */}
        <div className="vision-mockups relative flex flex-col gap-4">
          <div className="mock-ui-group flex flex-col gap-4">
            {/* Mock sidebar */}
            <div className="mock-ui-card invisible overflow-hidden rounded-2xl border border-glass-border bg-surface-elevated p-5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Mundiales
              </div>
              <div className="flex flex-col gap-2">
                {mockSidebarItems.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      i === 2
                        ? "bg-accent-green/10 text-accent-green font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`inline-block size-2 rounded-full ${
                        i === 2 ? "bg-accent-green" : "bg-muted-foreground/30"
                      }`}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Mock stats card */}
            <div className="mock-ui-card invisible overflow-hidden rounded-2xl border border-glass-border bg-surface-elevated p-5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Estadísticas Globales
              </div>
              <div className="grid grid-cols-3 gap-4">
                {mockStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock match card skeleton */}
            <div className="mock-ui-card invisible overflow-hidden rounded-2xl border border-glass-border bg-surface-elevated p-5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Partido Destacado
              </div>
              <div className="flex items-center justify-between rounded-xl border border-glass-border bg-background p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇦🇷</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Argentina
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Campeón
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-lg font-bold text-foreground">3</span>
                  <span className="text-xs text-accent-green">(4)</span>
                  <span className="text-muted-foreground">—</span>
                  <span className="text-xs text-muted-foreground">(2)</span>
                  <span className="text-lg font-bold text-muted-foreground">
                    3
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Francia
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Subcampeón
                    </div>
                  </div>
                  <span className="text-xl">🇫🇷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
