"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { StaggeredMenu } from "@/components/staggered-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Si hay hero de video (home), la barra queda transparente mientras el
    // video siga cubriéndola.
    const hero = document.querySelector<HTMLElement>("[data-video-hero]");
    const onScroll = () => {
      if (hero) {
        setScrolled(hero.getBoundingClientRect().bottom < 80);
      } else {
        setScrolled(window.scrollY > 40);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  // El home arranca con hero oscuro (video). Hasta hacer scroll, la barra va clara.
  const isHome = pathname === "/";
  const darkOver = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
          scrolled
            ? "border-line bg-ink/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="container-x flex h-18 items-center justify-between py-4">
          <Link href="/" aria-label="Conequipos — inicio">
            <Logo className={cn("h-8 md:h-9", darkOver && "brightness-0 invert")} />
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className={cn(
              "group flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
              darkOver
                ? "border-white/25 text-white hover:border-brand-glow hover:text-brand-glow"
                : "border-line text-bone hover:border-brand hover:text-brand"
            )}
          >
            Menú
            <span className="flex w-4 flex-col gap-[3px]">
              <span className="block h-px w-full bg-current transition-transform duration-300 group-hover:translate-y-[1px]" />
              <span className="block h-px w-full bg-current transition-transform duration-300 group-hover:-translate-y-[1px]" />
            </span>
          </button>
        </div>
      </header>

      <StaggeredMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
