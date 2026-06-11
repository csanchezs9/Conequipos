"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { Logo } from "@/components/logo";
import { CloseIcon, ArrowRight, WhatsAppIcon } from "@/components/icons";
import { getLenis } from "@/components/smooth-scroll";
import { EMAIL, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";

const LINKS = [
  { href: "/equipos", label: "Equipos", n: "01" },
  { href: "/nosotros", label: "Nosotros", n: "02" },
  { href: "/experiencias", label: "Experiencias", n: "03" },
  { href: "/contacto", label: "Contacto", n: "04" },
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
  const [hover, setHover] = useState(0);

  // Construye la timeline una vez
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(root.current, { yPercent: -100 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(root.current, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
        .from(
          ".mo-topbar",
          { opacity: 0, y: -10, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        )
        .from(
          ".mo-link-in",
          { yPercent: 120, duration: 0.7, stagger: 0.07, ease: "expo.out" },
          "-=0.25"
        )
        .from(
          ".mo-side",
          { opacity: 0, scale: 1.04, duration: 0.7, ease: "expo.out" },
          "<"
        )
        .from(
          ".mo-meta",
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: "power2.out" },
          "-=0.4"
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
      tl.current?.timeScale(1.6).reverse();
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
      className={`fixed inset-0 z-[60] bg-black/40 text-white backdrop-blur-2xl backdrop-saturate-150 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Tinte verde de marca */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(80% 70% at 100% 0%, color-mix(in srgb, var(--color-brand) 55%, transparent) 0%, transparent 60%)",
        }}
      />
      <div className="container-x relative flex h-svh flex-col">
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
        <div className="grid flex-1 items-center gap-10 py-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Links */}
          <nav className="flex flex-col">
            {LINKS.map((l, i) => (
              <div key={l.href} className="overflow-hidden">
                <Link
                  href={l.href}
                  onClick={onClose}
                  onMouseEnter={() => setHover(i)}
                  className="mo-link-in group flex items-center gap-4 border-b border-white/10 py-4 md:gap-6 md:py-6"
                >
                  <span className="font-mono text-xs text-white/40 md:text-sm">
                    {l.n}
                  </span>
                  <span className="font-display text-5xl font-bold leading-none transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-brand-glow md:text-7xl">
                    {l.label}
                  </span>
                  <ArrowRight className="ml-auto h-6 w-6 text-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand-glow md:h-8 md:w-8" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Panel lateral con imagen */}
          <div className="mo-side relative hidden aspect-4/5 overflow-hidden rounded-2xl border border-white/10 lg:block">
            <Image
              src="/pexels-pok-rie-33563-1188532.jpg"
              alt=""
              fill
              sizes="33vw"
              className="scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="kicker !text-brand-glow">
                {String(hover + 1).padStart(2, "0")} / 04
              </p>
              <p className="mt-2 font-display text-3xl font-bold">
                {LINKS[hover].label}
              </p>
            </div>
          </div>
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
    </div>
  );
}
