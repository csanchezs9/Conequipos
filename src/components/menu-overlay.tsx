"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Logo } from "@/components/logo";
import { CloseIcon, WhatsAppIcon } from "@/components/icons";
import { getLenis } from "@/components/smooth-scroll";
import { EMAIL, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";

const LINKS = [
  { href: "/equipos", label: "Equipos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/experiencias", label: "Experiencias" },
  { href: "/contacto", label: "Contacto" },
];

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  // Seccion actual: coincide la ruta exacta o una subruta (/equipos/abc).
  const isActive = (href: string) =>
    pathname === href || (pathname?.startsWith(`${href}/`) ?? false);

  // Construye la timeline una vez
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".mo-backdrop", { autoAlpha: 0 });
      gsap.set(".mo-panel", { xPercent: 100 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".mo-backdrop", { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
        .to(
          ".mo-panel",
          { xPercent: 0, duration: 0.7, ease: "expo.inOut" },
          "<"
        )
        .from(
          ".mo-topbar",
          { opacity: 0, x: 20, duration: 0.4, ease: "power2.out" },
          "-=0.35"
        )
        .from(
          ".mo-link-in",
          { yPercent: 120, opacity: 0, duration: 0.55, stagger: 0.06, ease: "expo.out" },
          "-=0.3"
        )
        .from(
          ".mo-meta",
          { opacity: 0, y: 16, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          "-=0.35"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  // Abre / cierra + bloqueo de scroll
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      tl.current?.timeScale(1).play();
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      tl.current?.timeScale(2.2).reverse();
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // ESC para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={root}
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] text-white ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop: oscurece y desenfoca el resto, click para cerrar */}
      <div
        onClick={onClose}
        className="mo-backdrop absolute inset-0 bg-black/50 backdrop-blur-md"
      />

      {/* Panel lateral (~mitad de pantalla) */}
      <aside className="mo-panel absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-white/10 bg-black/40 backdrop-blur-2xl backdrop-saturate-150 sm:w-[460px] md:w-1/2 md:max-w-2xl">
        {/* Tinte verde de marca */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(90% 60% at 100% 0%, color-mix(in srgb, var(--color-brand) 55%, transparent) 0%, transparent 60%)",
          }}
        />
        <div className="relative flex h-full flex-col px-7 md:px-12">
        {/* Top */}
        <div className="mo-topbar flex h-18 shrink-0 items-center justify-between py-4">
          <Link href="/" onClick={onClose} aria-label="Inicio">
            <Logo className="h-8 brightness-0 invert md:h-9" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="group flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand-glow hover:text-brand-glow"
          >
            Cerrar
            <CloseIcon className="transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="flex flex-1 flex-col justify-center py-6">
          {/* Links */}
          <nav className="flex flex-col">
            {LINKS.map((l, i) => {
              const active = isActive(l.href);

              // Seccion actual: tachada, atenuada y no seleccionable.
              if (active) {
                return (
                  <div key={l.href} className="overflow-hidden">
                    <div
                      aria-current="page"
                      className="mo-link-in flex cursor-default items-center border-b border-white/10 py-4 md:py-6"
                    >
                      <span className="relative inline-block font-display text-4xl font-bold leading-[1.1] text-white/35 md:text-6xl">
                        {l.label}
                        {/* Tachado "on track": linea recta con escalon suave al centro */}
                        <svg
                          aria-hidden
                          viewBox="0 0 300 30"
                          preserveAspectRatio="none"
                          className="pointer-events-none absolute inset-x-[-2%] top-1/2 h-[0.46em] w-[104%] -translate-y-1/2 overflow-visible text-brand-glow"
                        >
                          <path
                            d="M0 20 L70 20 C 92 20, 96 9, 118 9 L188 9 C 210 9, 214 20, 236 20 L300 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={l.href} className="overflow-hidden">
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="mo-link-in group block border-b border-white/10 py-4 md:py-6"
                  >
                    {/* Roll: el label visible sube y entra una copia en verde desde abajo */}
                    <span className="relative block overflow-hidden font-display text-4xl font-bold leading-[1.1] md:text-6xl">
                      <span className="block transition-transform duration-400 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-full">
                        {l.label}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 block translate-y-full text-brand-glow transition-transform duration-400 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0"
                      >
                        {l.label}
                      </span>
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer del menú */}
        <div className="flex shrink-0 flex-col gap-5 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <a
            href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mo-meta inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-glow"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar · {WHATSAPP_DISPLAY}
          </a>
          <div className="mo-meta flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-white/60">
            <a href={`mailto:${EMAIL}`} className="hover:text-white">
              {EMAIL}
            </a>
            <span className="hidden md:inline">·</span>
            <span>Itagüí, Antioquia</span>
            <span className="hidden md:inline">·</span>
            <a href="https://instagram.com/conequipos_" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
        </div>
      </aside>
    </div>
  );
}
