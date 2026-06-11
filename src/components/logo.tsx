import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-7 w-7", className)}
      fill="none"
      aria-hidden
    >
      {/* anillo partido — eco del circulo "e" de Conequipos */}
      <path
        d="M40 24a16 16 0 1 0-6 12.5"
        stroke="var(--color-brand)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* barra central de la e */}
      <path
        d="M16 24h16"
        stroke="var(--color-brand-glow)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-bold tracking-tight leading-none select-none",
        className
      )}
    >
      <LogoMark />
      <span className="text-bone">
        CON<span className="text-brand">EQUIPOS</span>
      </span>
    </span>
  );
}
