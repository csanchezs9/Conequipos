"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Magnetic } from "@/components/magnetic";
import { cn, waLink } from "@/lib/utils";

const NAV = [
  { href: "/equipos", label: "Equipos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/experiencias", label: "Experiencias" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link href="/" aria-label="Conequipos — inicio">
          <Logo className="h-10 md:h-12" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-bone" : "text-mute hover:text-bone"
                )}
              >
                {n.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-px h-px bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden md:inline-block">
            <a
              href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-glow"
            >
              Cotizar ahora
            </a>
          </Magnetic>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            aria-label="Menú"
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-5 bg-bone transition-transform",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-bone transition-transform",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl transition-all duration-500 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-transparent"
        )}
      >
        <div className="min-h-0">
          <nav className="container-x flex flex-col py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-b border-line py-4 font-display text-2xl"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex justify-center rounded-full bg-brand px-5 py-3 font-semibold text-white"
            >
              Cotizar ahora
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
