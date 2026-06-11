import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getProduct,
  products,
  productsByCategory,
} from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { Magnetic } from "@/components/magnetic";
import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { waLink, EMAIL } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description || `Alquiler de ${p.name} en Medellín y Antioquia.`,
    openGraph: { images: p.image ? [p.image] : [] },
  };
}

const FEATURES = [
  "Equipo certificado y mantenido",
  "Planes por día, semana o mes",
  "Logística de entrega y recogida",
  "Soporte técnico durante el alquiler",
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = product.categories.length
    ? productsByCategory(product.categories[0])
        .filter((p) => p.slug !== product.slug)
        .slice(0, 3)
    : [];

  const wa = waLink(
    `Hola Conequipos, quiero cotizar el alquiler de: ${product.name}. ¿Disponibilidad y precio?`
  );

  return (
    <>
      <div className="container-x pt-32 md:pt-40">
        {/* Migas */}
        <nav className="mb-10 flex flex-wrap items-center gap-2 font-mono text-xs text-mute">
          <Link href="/equipos" className="hover:text-bone">
            Equipos
          </Link>
          <span>/</span>
          {product.categoryNames[0] && (
            <>
              <Link
                href={`/categoria/${product.categories[0]}`}
                className="hover:text-bone"
              >
                {product.categoryNames[0]}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-bone">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagen */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-ink-2">
            <div
              className="pointer-events-none absolute inset-0 opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 60%, var(--color-brand) 0%, transparent 70%)",
              }}
            />
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-sm text-mute">
                sin imagen
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.categoryNames[0] && (
              <span className="kicker mb-4">{product.categoryNames[0]}</span>
            )}
            <h1 className="display-lg text-balance">{product.name}</h1>

            {product.description && (
              <p className="mt-6 max-w-prose text-lg text-mute">
                {product.description}
              </p>
            )}

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-line bg-ink-2 p-4 text-sm"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-ink transition-colors hover:bg-brand-glow"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Cotizar este equipo
                </a>
              </Magnetic>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Cotización: " + product.name
                )}`}
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-semibold transition-colors hover:border-brand"
              >
                Cotizar por correo
              </a>
            </div>

            <p className="mt-6 font-mono text-xs text-mute">
              Ref · {product.slug}
            </p>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="container-x mt-28 border-t border-line py-20 md:mt-40">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display-lg text-3xl md:text-5xl">
              Equipos relacionados
            </h2>
            <Link
              href={`/categoria/${product.categories[0]}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-glow"
            >
              Ver categoría
              <ArrowRight />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
