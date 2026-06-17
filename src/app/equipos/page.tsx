import type { Metadata } from "next";
import { EquiposHero } from "@/components/equipos-hero";
import { CatalogGrid } from "@/components/catalog-grid";
import { Marquee } from "@/components/marquee";
import { categories, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Equipos para construcción",
  description:
    "Catálogo completo de maquinaria para alquiler: elevación, compactación, concreto, generadores, compresores y más.",
};

export default async function EquiposPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const initialCategory = categories.some((c) => c.slug === categoria)
    ? categoria
    : undefined;

  return (
    <>
      <EquiposHero />
      <Marquee
        items={categories.map((c) => c.name)}
        className="border-b border-line bg-ink-2"
      />
      <section className="container-x py-16">
        <CatalogGrid
          products={products}
          categories={categories}
          initialCategory={initialCategory}
        />
      </section>
    </>
  );
}
