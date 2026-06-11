import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/catalog";
import { ArrowRight } from "@/components/icons";

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  return (
    <Link
      href={`/equipos/${product.slug}`}
      data-reveal
      data-reveal-delay={((index ?? 0) % 3) * 0.06}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors duration-500 hover:border-brand/60"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-ink-3">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-mute">
            sin imagen
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.categoryNames[0] && (
          <span className="kicker text-[0.62rem]">{product.categoryNames[0]}</span>
        )}
        <h3 className="font-display text-lg leading-tight text-bone">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-mute">{product.description}</p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-brand-glow">
          Ver ficha
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
