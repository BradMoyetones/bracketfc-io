"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Move, Database, Layers, Zap, Smartphone } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*                            Mouse-Tracking Card                             */
/* -------------------------------------------------------------------------- */

interface GlowPosition {
  x: number;
  y: number;
  active: boolean;
}

function BentoCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [glow, setGlow] = useState<GlowPosition>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setGlow({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setGlow((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bento-card invisible group relative overflow-hidden rounded-2xl border border-glass-border bg-surface-elevated transition-colors duration-300 hover:border-glass-border-hover ${className}`}
    >
      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(600px circle at ${glow.x}px ${glow.y}px, oklch(0.72 0.19 142 / 0.06), transparent 40%)`,
        }}
      />

      {/* Bottom-right decorative corner gradient */}
      <div
        className="pointer-events-none absolute -bottom-12 -right-12 z-0 size-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.19 142 / 0.12), transparent 70%)",
        }}
      />

      <div className="relative z-20 p-6 sm:p-8">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Icon Container                                */
/* -------------------------------------------------------------------------- */

function IconBox({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-glass-border bg-background">
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Visual Accent Elements                           */
/* -------------------------------------------------------------------------- */

/** Card 1 – Animated cursor loop */
function CursorAccent() {
  return (
    <div className="mt-6 flex items-center gap-3 text-muted-foreground">
      <div className="relative size-8 rounded-lg border border-glass-border bg-background/50">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-accent-green"
          style={{
            animation: "cursorLoop 3s ease-in-out infinite",
          }}
        >
          <path
            d="M5 3l14 8-7 2-3 7z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-mono text-[11px] tracking-wider text-muted-foreground/60">
        drag · pinch · scroll
      </span>
    </div>
  );
}

/** Card 2 – Stacked year pills */
function YearPills() {
  const years = ["2014", "2018", "2022"];
  return (
    <div className="mt-6 flex flex-col gap-2">
      {years.map((year, i) => (
        <div
          key={year}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-glass-border bg-background/50 px-3 py-1.5 font-mono text-xs text-foreground/80"
          style={{
            animation: `pillPulse 3s ease-in-out ${i * 0.5}s infinite`,
          }}
        >
          <span className="size-1.5 rounded-full bg-accent-green" />
          {year}
        </div>
      ))}
    </div>
  );
}

/** Card 3 – Dark/light toggle mock */
function ToggleMock() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="relative h-6 w-11 rounded-full border border-glass-border bg-background/50">
        <div className="absolute top-0.5 left-[calc(100%-1.375rem)] size-5 rounded-full bg-accent-green shadow-[0_0_8px_oklch(0.72_0.19_142_/_0.4)] transition-all" />
      </div>
      <span className="font-mono text-[11px] tracking-wider text-muted-foreground/60">
        dark mode
      </span>
    </div>
  );
}

/** Card 4 – Mini bracket skeleton */
function BracketSkeleton() {
  return (
    <div className="mt-6">
      <svg
        viewBox="0 0 120 60"
        fill="none"
        className="h-12 w-auto text-muted-foreground/30"
      >
        {/* Left pair */}
        <rect x="0" y="4" width="30" height="6" rx="2" fill="currentColor" />
        <rect x="0" y="24" width="30" height="6" rx="2" fill="currentColor" />
        {/* Connector */}
        <path
          d="M30 7 H38 V27 H30"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="38"
          y1="17"
          x2="48"
          y2="17"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Right pair */}
        <rect x="0" y="38" width="30" height="6" rx="2" fill="currentColor" />
        <rect x="0" y="50" width="30" height="6" rx="2" fill="currentColor" />
        {/* Connector */}
        <path
          d="M30 41 H38 V53 H30"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="38"
          y1="47"
          x2="48"
          y2="47"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Middle stage */}
        <rect x="48" y="12" width="30" height="6" rx="2" fill="currentColor" />
        <rect x="48" y="42" width="30" height="6" rx="2" fill="currentColor" />
        {/* Final connector */}
        <path
          d="M78 15 H86 V45 H78"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="86"
          y1="30"
          x2="96"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Final */}
        <rect
          x="96"
          y="27"
          width="22"
          height="6"
          rx="2"
          fill="oklch(0.72 0.19 142 / 0.4)"
        />
      </svg>
    </div>
  );
}

/** Card 5 – GitHub star counter mock */
function StarCounter() {
  return (
    <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-glass-border bg-background/50 px-3 py-1.5 font-mono text-xs text-foreground/80">
      <span>⭐</span>
      <span>1.2k</span>
    </div>
  );
}

/** Card 6 – Phone outline */
function PhoneOutline() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="relative flex h-16 w-9 items-center justify-center rounded-xl border-2 border-muted-foreground/20">
        <div className="h-8 w-5 rounded-sm border border-muted-foreground/15 bg-accent-green/10" />
        <div className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-muted-foreground/20" />
      </div>
      <span className="font-mono text-[11px] tracking-wider text-muted-foreground/60">
        adaptive layout
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             GitHub SVG Icon                                */
/* -------------------------------------------------------------------------- */

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Features Data                                 */
/* -------------------------------------------------------------------------- */

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  accent: ReactNode;
  colSpan?: string;
  rowSpan?: string;
}

const features: Feature[] = [
  {
    title: "Navegación Fluida",
    description:
      "Pan, zoom y arrastra por el bracket completo. Una experiencia al estilo mapa.",
    icon: <Move className="size-5 text-accent-green" />,
    accent: <CursorAccent />,
    colSpan: "sm:col-span-2",
  },
  {
    title: "Data Histórica",
    description: "Resultados y contexto de cada partido desde 2014.",
    icon: <Database className="size-5 text-accent-green" />,
    accent: <YearPills />,
    rowSpan: "sm:row-span-2",
  },
  {
    title: "Diseño Minimalista",
    description: "Interfaz limpia y enfocada. Dark mode nativo.",
    icon: <Layers className="size-5 text-accent-green" />,
    accent: <ToggleMock />,
  },
  {
    title: "Explora en Tiempo Real",
    description:
      "Navega entre rondas y descubre cada detalle del torneo.",
    icon: <Zap className="size-5 text-accent-green" />,
    accent: <BracketSkeleton />,
    colSpan: "sm:col-span-2",
  },
  {
    title: "Open Source",
    description: "Código abierto. Contribuye y mejora la experiencia.",
    icon: <GitHubIcon className="size-5 text-accent-green" />,
    accent: <StarCounter />,
  },
  {
    title: "Mobile Ready",
    description: "Responsive y optimizado para cualquier dispositivo.",
    icon: <Smartphone className="size-5 text-accent-green" />,
    accent: <PhoneOutline />,
  },
];

/* -------------------------------------------------------------------------- */
/*                               BentoGrid                                    */
/* -------------------------------------------------------------------------- */

export default function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-card", {
        autoAlpha: 0,
        y: 50,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      {/* Section header */}
      <div className="mb-16 max-w-2xl">
        <span className="mb-4 inline-block font-mono text-sm tracking-widest uppercase text-accent-green">
          Features
        </span>
        <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Todo lo que necesitas para explorar
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Herramientas interactivas diseñadas para que descubras cada detalle de
          los mundiales. Navegación fluida, datos históricos y una interfaz que
          se adapta a ti.
        </p>
      </div>

      {/* Bento grid */}
      <div className="bento-grid grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <BentoCard
            key={feature.title}
            className={`${feature.colSpan ?? ""} ${feature.rowSpan ?? ""}`}
          >
            <IconBox>{feature.icon}</IconBox>

            <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
              {feature.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>

            {feature.accent}
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
