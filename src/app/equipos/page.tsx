import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CatalogGrid } from "@/components/catalog-grid";
import { categories, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Equipos para construcción",
  description:
    "Catálogo completo de maquinaria para alquiler: elevación, compactación, concreto, generadores, compresores y más.",
};

export default function EquiposPage() {
  return (
    <>
      <PageHeader
        kicker="Catálogo completo"
        title="Equipos para construcción"
        description="Maquinaria certificada y mantenida, lista para tu obra. Filtra por categoría o busca el equipo que necesitas."
      />
      <section className="container-x py-16">
        <CatalogGrid products={products} categories={categories} />
      </section>
    </>
  );
}
