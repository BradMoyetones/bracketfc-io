"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ────────────────────────────────────────────────────────────
 * Types
 * ──────────────────────────────────────────────────────────── */

interface Team {
  flag: string;
  code: string;
  score: string;
  penalties?: string;
  isWinner: boolean;
}

interface Match {
  id: string;
  round: "QF" | "SF" | "F";
  team1: Team;
  team2: Team;
  /** Position in the bracket grid (px) */
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

/* ────────────────────────────────────────────────────────────
 * Match data – 2022 FIFA World Cup knockout stage
 * ──────────────────────────────────────────────────────────── */

const MATCHES: Match[] = [
  // Quarter-finals — Column 1
  {
    id: "qf1",
    round: "QF",
    team1: { flag: "🇳🇱", code: "NED", score: "2", penalties: "3", isWinner: false },
    team2: { flag: "🇦🇷", code: "ARG", score: "2", penalties: "4", isWinner: true },
    x: 50,
    y: 80,
  },
  {
    id: "qf2",
    round: "QF",
    team1: { flag: "🇭🇷", code: "CRO", score: "1", penalties: "4", isWinner: true },
    team2: { flag: "🇧🇷", code: "BRA", score: "1", penalties: "2", isWinner: false },
    x: 50,
    y: 230,
  },
  {
    id: "qf3",
    round: "QF",
    team1: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG", score: "1", isWinner: false },
    team2: { flag: "🇫🇷", code: "FRA", score: "2", isWinner: true },
    x: 50,
    y: 380,
  },
  {
    id: "qf4",
    round: "QF",
    team1: { flag: "🇲🇦", code: "MAR", score: "1", isWinner: true },
    team2: { flag: "🇵🇹", code: "POR", score: "0", isWinner: false },
    x: 50,
    y: 530,
  },
  // Semi-finals — Column 2
  {
    id: "sf1",
    round: "SF",
    team1: { flag: "🇦🇷", code: "ARG", score: "3", isWinner: true },
    team2: { flag: "🇭🇷", code: "CRO", score: "0", isWinner: false },
    x: 450,
    y: 155,
  },
  {
    id: "sf2",
    round: "SF",
    team1: { flag: "🇫🇷", code: "FRA", score: "2", isWinner: true },
    team2: { flag: "🇲🇦", code: "MAR", score: "0", isWinner: false },
    x: 450,
    y: 455,
  },
  // Final — Column 3
  {
    id: "final",
    round: "F",
    team1: { flag: "🇦🇷", code: "ARG", score: "3", penalties: "4", isWinner: true },
    team2: { flag: "🇫🇷", code: "FRA", score: "3", penalties: "2", isWinner: false },
    x: 850,
    y: 305,
  },
];

const CONNECTIONS: Connection[] = [
  { from: "qf1", to: "sf1" },
  { from: "qf2", to: "sf1" },
  { from: "qf3", to: "sf2" },
  { from: "qf4", to: "sf2" },
  { from: "sf1", to: "final" },
  { from: "sf2", to: "final" },
];

const CARD_W = 300;
const CARD_H = 100;

/* ────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────── */

function getMatchById(id: string): Match {
  return MATCHES.find((m) => m.id === id)!;
}

/** Compute a cubic bezier path string between two match cards */
function computePath(from: string, to: string): string {
  const src = getMatchById(from);
  const dst = getMatchById(to);

  // Start at right edge center of source card
  const x1 = src.x + CARD_W;
  const y1 = src.y + CARD_H / 2;

  // End at left edge center of destination card
  const x4 = dst.x;
  const y4 = dst.y + CARD_H / 2;

  // Control points for a smooth S-curve
  const dx = (x4 - x1) * 0.55;
  const x2 = x1 + dx;
  const y2 = y1;
  const x3 = x4 - dx;
  const y3 = y4;

  return `M ${x1} ${y1} C ${x2} ${y2}, ${x3} ${y3}, ${x4} ${y4}`;
}

/* ────────────────────────────────────────────────────────────
 * Sub-components
 * ──────────────────────────────────────────────────────────── */

function TeamRow({ team }: { team: Team }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5">
      <span className="text-base leading-none" role="img" aria-label={team.code}>
        {team.flag}
      </span>
      <span
        className={`text-sm tracking-wide ${
          team.isWinner
            ? "font-semibold text-foreground"
            : "text-muted-foreground"
        }`}
      >
        {team.code}
      </span>
      <span className="ml-auto font-mono text-sm text-foreground/80">
        {team.score}
      </span>
      {team.penalties && (
        <span className="font-mono text-xs text-accent-green">
          ({team.penalties})
        </span>
      )}
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const isFinal = match.round === "F";

  return (
    <div
      className={`match-card match-card-${match.round.toLowerCase()} absolute w-[300px] select-none rounded-xl border bg-surface-elevated ${
        isFinal
          ? "border-accent-green/30 shadow-[0_0_30px_oklch(0.72_0.19_142/0.1)]"
          : "border-glass-border"
      }`}
      style={{
        left: match.x,
        top: match.y,
        height: CARD_H,
      }}
    >
      {/* Subtle inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-b from-white/3 to-transparent" />

      {/* Round label */}
      <div className="absolute -top-5 left-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
        {match.round === "QF"
          ? "Cuartos"
          : match.round === "SF"
          ? "Semifinal"
          : "Final"}
      </div>

      <div className="relative flex h-full flex-col justify-center divide-y divide-glass-border">
        <TeamRow team={match.team1} />
        <TeamRow team={match.team2} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Main Component
 * ──────────────────────────────────────────────────────────── */

export default function MockBracketScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  /** Stable callback ref setter for path elements */
  const setPathRef = useCallback(
    (index: number) => (el: SVGPathElement | null) => {
      pathRefs.current[index] = el;
    },
    []
  );

  useGSAP(
    () => {
      // ── Measure path lengths for draw-on effect ──
      const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      // ── Master timeline ──
      // No pin — Lenis conflicts with ScrollTrigger pinning.
      // Animations play progressively as the section scrolls into view.
      // start: section top enters viewport → end: section center hits viewport center
      // = all animations complete by the time the bracket is half visible.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      /* ── Phase 1: Bracket fades in + QF cards ── */

      tl.fromTo(
        ".bracket-wrapper",
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out" },
        0
      );

      tl.from(
        ".match-card-qf",
        {
          y: 25,
          autoAlpha: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: "power2.out",
        },
        0.1
      );

      /* ── Phase 2: QF→SF paths draw + SF cards + pan ── */

      const qfPaths = paths.slice(0, 4);
      if (qfPaths.length > 0) {
        tl.to(
          qfPaths,
          {
            strokeDashoffset: 0,
            duration: 0.25,
            stagger: 0.04,
            ease: "none",
          },
          0.35
        );
      }

      tl.to(
        ".bracket-wrapper",
        { x: -60, duration: 0.5, ease: "power1.inOut" },
        0.4
      );

      tl.from(
        ".match-card-sf",
        {
          x: 40,
          autoAlpha: 0,
          duration: 0.25,
          stagger: 0.06,
          ease: "power2.out",
        },
        0.5
      );

      /* ── Phase 3: SF→Final paths + Final card + champion ── */

      const sfPaths = paths.slice(4, 6);
      if (sfPaths.length > 0) {
        tl.to(
          sfPaths,
          {
            strokeDashoffset: 0,
            duration: 0.2,
            stagger: 0.04,
            ease: "none",
          },
          0.7
        );
      }

      tl.from(
        ".match-card-f",
        {
          autoAlpha: 0,
          scale: 0.85,
          duration: 0.2,
          ease: "power2.out",
        },
        0.8
      );

      tl.to(
        ".match-card-f",
        {
          scale: 1.05,
          duration: 0.15,
          ease: "power2.out",
        },
        1.0
      );

      tl.fromTo(
        ".final-glow",
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1.2, duration: 0.2, ease: "power2.out" },
        1.0
      );

      tl.from(
        ".campeon-label",
        {
          y: 15,
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        1.1
      );

      // Scroll hint fades out as animations progress
      tl.to(
        ".scroll-hint",
        { autoAlpha: 0, duration: 0.15 },
        0.3
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bracket-scroll-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(1 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* Top section header */}
      <div className="relative z-10 mb-8 flex flex-col items-center gap-3 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-green">
          La Experiencia
        </span>
        <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
          Explora el bracket como nunca antes
        </h2>
      </div>

      {/* Bracket viewport */}
      <div
        className="relative z-10 w-full max-w-[1100px]"
        style={{ perspective: "1500px" }}
      >
        <div
          className="bracket-wrapper relative mx-auto"
          style={{
            width: 1150,
            height: 700,
            transformStyle: "preserve-3d",
          }}
        >
          {/* SVG connection layer */}
          <svg
            className="pointer-events-none absolute inset-0"
            width={1150}
            height={700}
            viewBox="0 0 1150 700"
            fill="none"
          >
            {CONNECTIONS.map((conn, i) => (
              <path
                key={`${conn.from}-${conn.to}`}
                ref={setPathRef(i)}
                className="bracket-path"
                d={computePath(conn.from, conn.to)}
                stroke="oklch(0.72 0.19 142 / 0.3)"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </svg>

          {/* Match cards */}
          {MATCHES.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}

          {/* Final card glow */}
          <div
            className="final-glow pointer-events-none absolute rounded-full"
            style={{
              left: 850 + CARD_W / 2 - 180,
              top: 305 + CARD_H / 2 - 120,
              width: 360,
              height: 240,
              background:
                "radial-gradient(ellipse, oklch(0.72 0.19 142 / 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Campeón label */}
          <div
            className="campeon-label absolute flex flex-col items-center gap-1"
            style={{
              left: 850 + CARD_W / 2 - 70,
              top: 305 + CARD_H + 16,
              width: 140,
            }}
          >
            <span className="text-2xl">🏆</span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-green">
              Campeón
            </span>
            <span className="text-sm font-semibold text-foreground">
              Argentina
            </span>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <p className="scroll-hint relative z-10 mt-6 flex items-center gap-2 text-center text-xs text-muted-foreground/60">
        <span className="inline-block animate-bounce">↓</span>
        Desplázate para explorar el bracket del Mundial 2022
      </p>

      {/* Mobile horizontal scroll hint overlay */}
      <div className="pointer-events-none absolute right-0 top-1/2 z-20 hidden h-40 w-16 -translate-y-1/2 bg-linear-to-l from-background to-transparent max-md:block" />
    </section>
  );
}
