"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Category, Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function CatalogGrid({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [cat, setCat] = useState<string>(initialCategory ?? "all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const inCat = cat === "all" || p.categories.includes(cat);
      const inQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      return inCat && inQ;
    });
  }, [products, cat, q]);

  return (
    <div>
      {/* Controles */}
      <div className="sticky top-16 z-30 -mx-[var(--spacing-gutter)] mb-10 border-y border-line bg-ink/80 px-[var(--spacing-gutter)] py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={cat === "all"} onClick={() => setCat("all")}>
              Todos
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.slug}
                active={cat === c.slug}
                onClick={() => setCat(c.slug)}
              >
                {c.name}
              </FilterChip>
            ))}
          </div>
          <div className="relative lg:w-72">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar equipo…"
              className="w-full rounded-full border border-line bg-ink-2 px-5 py-2.5 text-sm text-bone outline-none transition-colors placeholder:text-mute focus:border-brand"
            />
          </div>
        </div>
      </div>

      <p className="mb-8 font-mono text-xs text-mute">
        {filtered.length} {filtered.length === 1 ? "equipo" : "equipos"}
      </p>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-ink-2 p-16 text-center">
          <p className="font-display text-2xl">Sin resultados</p>
          <p className="mt-2 text-mute">Prueba con otra categoría o término.</p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-brand bg-brand text-ink"
          : "border-line text-mute hover:border-brand/50 hover:text-bone"
      )}
    >
      {children}
    </button>
  );
}
