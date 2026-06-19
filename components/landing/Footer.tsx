/** Inline GitHub SVG — lucide v1.21+ removed brand icons */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

/** Inline X (Twitter) SVG */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Inline Instagram SVG */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-glass-border bg-background">
      {/* Accent top line */}
      <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-linear-to-r from-transparent via-accent-green/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-lg font-bold tracking-tight text-foreground">
              BracketFC
              <span className="text-accent-green">.io</span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              El mapa interactivo del fútbol mundial. Explora brackets de
              eliminatorias en un lienzo infinito.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Enlaces
            </span>
            <nav className="flex flex-col gap-2">
              <a
                href="#bracket"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Bracket 2022
              </a>
              <a
                href="#features"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#vision"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Visión
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Comunidad
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/BradMoyetones/bracketfc-io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors duration-200 hover:text-accent-green"
              >
                <GitHubIcon className="size-5" />
              </a>
              <a
                href="https://x.com/BradMoyetones"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted-foreground transition-colors duration-200 hover:text-accent-green"
              >
                <XIcon className="size-5" />
              </a>
              <a
                href="https://instagram.com/its.bradn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors duration-200 hover:text-accent-green"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
            <span className="mt-1 text-xs text-muted-foreground">
              Built with React Flow & Next.js
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} BracketFC.io. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Hecho con ☕ y pasión por el fútbol
          </p>
        </div>
      </div>

      {/* Large watermark text */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none font-mono text-[12rem] font-black uppercase leading-none tracking-tighter sm:text-[16rem]"
        style={{
          color: "oklch(1 0 0 / 0.015)",
        }}
      >
        BFC
      </div>
    </footer>
  );
}
