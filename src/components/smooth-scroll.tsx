"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Lenis + RAF (una sola vez)
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Reveals globales — re-corre por ruta
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    lenis?.scrollTo(0, { immediate: true });

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || "0");
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
}
