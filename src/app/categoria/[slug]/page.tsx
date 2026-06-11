import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { ArrowRight } from "@/components/icons";
import {
  categories,
  getCategory,
  productsByCategory,
} from "@/data/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: `Alquiler de ${c.name.toLowerCase()} para construcción en Medellín y Antioquia.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsByCategory(slug);

  return (
    <>
      <PageHeader
        kicker={`${items.length} equipos disponibles`}
        title={category.name}
        description={`Maquinaria de ${category.name.toLowerCase()} certificada y lista para entregar en tu obra.`}
      />

      <section className="container-x py-16 md:py-24">
        {/* Otras categorías */}
        <div className="mb-12 flex flex-wrap gap-2">
          <Link
            href="/equipos"
            className="rounded-full border border-line px-4 py-2 text-sm text-mute transition-colors hover:border-brand/50 hover:text-bone"
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className={
                c.slug === slug
                  ? "rounded-full border border-brand bg-brand px-4 py-2 text-sm font-medium text-ink"
                  : "rounded-full border border-line px-4 py-2 text-sm text-mute transition-colors hover:border-brand/50 hover:text-bone"
              }
            >
              {c.name}
            </Link>
          ))}
        </div>

        {items.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-mute">Pronto sumaremos equipos a esta categoría.</p>
        )}

        <div className="mt-16">
          <Link
            href="/equipos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-glow"
          >
            Ver catálogo completo
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
