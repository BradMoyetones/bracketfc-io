/**
 * StatsMarquee — infinite horizontally-scrolling stats ribbon.
 * Pure CSS animation, no GSAP needed. Pauses on hover.
 */
export default function StatsMarquee() {
  const stats = [
    "3 Mundiales",
    "124 Partidos",
    "380 Goles",
    "32 Selecciones",
    "∞ Zoom",
    "Pan & Drag",
    "React Flow",
    "Open Source",
  ];

  // Duplicate for seamless loop
  const items = [...stats, ...stats];

  return (
    <section className="relative overflow-hidden border-y border-glass-border py-6">
      {/* Left fade */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-background to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-background to-transparent" />

      <div className="marquee-track">
        {items.map((stat, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-3 whitespace-nowrap font-mono text-sm tracking-wide text-muted-foreground sm:mx-12"
          >
            <span className="inline-block size-1 rounded-full bg-accent-green/50" />
            {stat}
          </span>
        ))}
      </div>
    </section>
  );
}
