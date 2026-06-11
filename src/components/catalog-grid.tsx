"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { CatalogIndex } from "@/components/catalog-index";
import { SearchIcon, CloseIcon, GridIcon, IndexIcon } from "@/components/icons";
import type { Category, Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

type View = "grid" | "index";

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
  const [view, setView] = useState<View>("grid");

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

  const items = [
    { slug: "all", name: "Todos los equipos", count: products.length },
    ...categories.map((c) => ({ slug: c.slug, name: c.name, count: c.count })),
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[clamp(220px,22vw,300px)_1fr] lg:gap-16">
      {/* RAIL DE FILTROS */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        {/* Buscador */}
        <div className="group relative mb-8">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition-colors group-focus-within:text-brand" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar equipo…"
            className="w-full rounded-full border border-line bg-ink-2 py-3 pl-11 pr-10 text-sm text-bone outline-none transition-colors placeholder:text-mute focus:border-brand"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-mute transition-colors hover:text-bone"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        <p className="kicker mb-4 hidden lg:block">Categorías</p>

        {/* Lista — vertical en desktop, scroll horizontal en móvil */}
        <nav className="-mx-[var(--spacing-gutter)] flex gap-x-6 overflow-x-auto px-[var(--spacing-gutter)] pb-2 lg:mx-0 lg:flex-col lg:gap-x-0 lg:overflow-visible lg:border-l lg:border-line lg:px-0 lg:pb-0">
          {items.map((it) => {
            const active = cat === it.slug;
            return (
              <button
                key={it.slug}
                onClick={() => setCat(it.slug)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-2.5 whitespace-nowrap py-2.5 text-left text-[0.95rem] transition-colors lg:shrink lg:justify-between lg:gap-4 lg:pl-5",
                  active ? "text-bone" : "text-mute hover:text-bone"
                )}
              >
                {/* Marcador vertical (desktop) */}
                <span
                  className={cn(
                    "absolute left-0 top-1/2 hidden w-0.5 -translate-y-1/2 rounded-full bg-brand transition-all duration-300 lg:block",
                    active ? "h-6" : "h-0 group-hover:h-3"
                  )}
                />
                <span className="flex items-center gap-2.5">
                  {/* Punto (móvil) */}
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors lg:hidden",
                      active ? "bg-brand" : "bg-line"
                    )}
                  />
                  <span className={cn(active && "font-medium")}>{it.name}</span>
                </span>
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums transition-colors",
                    active ? "text-brand" : "text-mute/70"
                  )}
                >
                  {String(it.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* RESULTADOS */}
      <div>
        <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
          <div className="flex items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-mute">
              {filtered.length} {filtered.length === 1 ? "equipo" : "equipos"}
            </p>
            {(cat !== "all" || q) && (
              <button
                onClick={() => {
                  setCat("all");
                  setQ("");
                }}
                className="font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-brand"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Toggle de vista */}
          <div className="flex items-center gap-1 rounded-full border border-line p-1">
            <ViewButton active={view === "grid"} onClick={() => setView("grid")} label="Cuadrícula">
              <GridIcon />
            </ViewButton>
            <ViewButton active={view === "index"} onClick={() => setView("index")} label="Índice">
              <IndexIcon />
            </ViewButton>
          </div>
        </div>

        {filtered.length === 0 ? null : view === "index" ? (
          <CatalogIndex products={filtered} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-line bg-ink-2 p-16 text-center">
            <p className="font-display text-2xl">Sin resultados</p>
            <p className="mt-2 text-mute">Prueba con otra categoría o término.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
        active ? "bg-brand text-white" : "text-mute hover:text-bone"
      )}
    >
      {children}
    </button>
  );
}
