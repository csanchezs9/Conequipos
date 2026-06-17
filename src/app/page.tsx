import Link from "next/link";
import Image from "next/image";
import { VideoScrolly } from "@/components/video-scrolly";
import { Marquee } from "@/components/marquee";
import { DispatchBoard } from "@/components/dispatch-board";
import { ScrollPaintText } from "@/components/scroll-paint-text";
import { ArrowRight, CategoryIcon } from "@/components/icons";
import { categories, products } from "@/data/catalog";

const featured = products.filter((p) => p.image).slice(0, 7);

// Foto temática (de obra, no de producto) por categoría — ambiente, no catálogo.
const CAT_PHOTO: Record<string, string> = {
  "accesorios-y-herramientas":
    "/fotos/pexels-sofoklis-saripanidis-13143901-31499725.webp",
  "andamios-y-formaletas": "/fotos/pexels-betongsmcsg-37121347.webp",
  "compresores-de-aire": "/fotos/pexels-ehma-15794732.webp",
  "equipos-de-compactacion": "/fotos/pexels-construccion-total-2464540-14420873.webp",
  "equipos-de-concreto": "/fotos/pexels-construccion-total-2464540-6106878.webp",
  "equipos-de-elevacion": "/fotos/pexels-mehmet-aksoy-374584031-16764815.webp",
  "equipos-de-iluminacion": "/fotos/pexels-lucaspezeta-2333694.webp",
  "equipos-de-movimiento-de-tierra": "/fotos/pexels-rahibyaqubov-23978113.webp",
  "equipos-electromecanicos": "/fotos/pexels-construccion-total-2464540-14466335.webp",
  "equipos-generadores-de-energia": "/fotos/pexels-pok-rie-33563-1188532.webp",
};

// Las 6 categorías con más equipos — el resto vive en el catálogo completo.
const featuredCats = [...categories]
  .sort((a, b) => b.count - a.count)
  .slice(0, 6);

// Alturas alto/bajo por columna (CSS columns llena col1=[0,1], col2=[2,3]...),
// imitando el escalonado de services15. Mínimos altos: nada queda diminuto.
const HEIGHTS = ["h-80", "h-56", "h-56", "h-80", "h-80", "h-56"];

const PROCESS = [
  {
    n: "01",
    t: "Cotiza en minutos",
    d: "Escríbenos el equipo y las fechas. Te enviamos disponibilidad y precio sin vueltas.",
  },
  {
    n: "02",
    t: "Coordinamos la logística",
    d: "Llevamos y recogemos el equipo en tu obra. Tú no mueves un dedo.",
  },
  {
    n: "03",
    t: "Produces sin parar",
    d: "Maquinaria certificada y soporte técnico activo durante todo el alquiler.",
  },
];

export default function Home() {
  return (
    <>
      <VideoScrolly />

      <Marquee
        className="border-y border-line"
        items={[
          "Elevación",
          "Compactación",
          "Concreto",
          "Generadores",
          "Compresores",
          "Andamios",
          "Iluminación",
        ]}
      />

      {/* CATEGORÍAS — masonry de especialidades (cada card lleva a su categoría) */}
      <section className="container-x py-16 md:py-20">
        <div className="mb-10 w-full">
          <ScrollPaintText
            as="h2"
            className="display-lg text-balance"
            segments={[
              { text: "Cada frente de tu obra," },
              { text: "con su equipo listo", to: "#128a3c" },
            ]}
          />
          <p data-reveal="blur" className="mt-5 w-full text-mute">
            Equipos certificados, mantenidos y disponibles para despachar. Elige
            una especialidad y cotiza en minutos.
          </p>
        </div>

        {/* Masonry: cards con foto a sangre y título encima (services15) */}
        <div className="gap-4 sm:columns-2 lg:columns-3">
          {featuredCats.map((c, i) => (
            <Link
              key={c.slug}
              href={`/equipos?categoria=${c.slug}`}
              data-reveal="scale"
              className={`group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl ${
                HEIGHTS[i % HEIGHTS.length]
              }`}
            >
              <Image
                src={CAT_PHOTO[c.slug]}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110"
              />
              {/* Scrim para legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              {/* Tinte de marca al hover */}
              <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-30" />

              {/* Flecha ↗ arriba-derecha (services15) */}
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:bg-white group-hover:text-bone">
                <ArrowRight className="h-4 w-4 -rotate-45" />
              </span>

              {/* Título abajo-izquierda */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold leading-tight text-white">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{c.count} equipos</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/equipos"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Ver todo el catálogo
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* DESTACADOS — tablero de despacho en vivo (slab oscuro) */}
      <section className="border-y border-line bg-[#09090b] text-ink">
        <div className="container-x py-24 md:py-36">
          <div className="mb-16 w-full md:mb-24">
            <span className="text-sm font-semibold text-brand-glow">
              Los que más nos piden
            </span>
            <ScrollPaintText
              as="h2"
              className="mt-4 display-lg"
              from="rgba(255,255,255,0.25)"
              to="#ffffff"
              forceScroll
              segments={[
                { text: "Equipos listos para" },
                { text: "entregar hoy", to: "#1fb255" },
              ]}
            />
          </div>
          <DispatchBoard products={featured} />
        </div>
      </section>

      {/* POR QUÉ CONEQUIPOS — bento */}
      <section className="container-x py-24 md:py-36">
        <div className="mb-14 display-lg">
          <ScrollPaintText as="h2" className="block" text="No solo alquilas un equipo." />
          <ScrollPaintText
            as="h2"
            className="block md:text-right"
            text="Aseguras tu obra."
            to="#128a3c"
          />
        </div>

        <div className="grid grid-cols-6 gap-4">
          {/* Flota certificada — medidor 100% */}
          <div
            data-reveal="scale"
            className="col-span-6 flex flex-col rounded-2xl border border-line bg-ink-2 p-7 lg:col-span-2"
          >
            <div className="relative m-auto flex h-24 w-56 items-center">
              <svg
                className="absolute inset-0 size-full text-line"
                viewBox="0 0 254 104"
                fill="none"
              >
                <path
                  d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                  fill="currentColor"
                />
              </svg>
              <span className="mx-auto block w-fit font-display text-5xl font-bold text-brand">
                100%
              </span>
            </div>
            <h3 className="mt-6 text-center font-display text-2xl">
              Flota certificada
            </h3>
            <p className="mt-2 text-center text-sm text-mute">
              Revisada y mantenida antes de cada entrega. Llega lista para
              producir.
            </p>
          </div>

          {/* Despacho 24h — anillo */}
          <div
            data-reveal="scale"
            className="col-span-3 flex flex-col rounded-2xl border border-line bg-ink-2 p-7 lg:col-span-2"
          >
            <div className="relative mx-auto flex aspect-square size-32 items-center justify-center rounded-full border border-line before:absolute before:-inset-2 before:rounded-full before:border before:border-line/60">
              <span className="font-display text-4xl font-bold text-brand">
                24h
              </span>
            </div>
            <div className="mt-6 text-center">
              <h3 className="font-display text-lg">Despacho el mismo día</h3>
              <p className="mt-2 text-sm text-mute">
                Confirmas y coordinamos entrega en obra sin demoras.
              </p>
            </div>
          </div>

          {/* Cobertura — pin */}
          <div
            data-reveal="scale"
            className="col-span-3 flex flex-col rounded-2xl border border-line bg-ink-2 p-7 lg:col-span-2"
          >
            <div className="relative mx-auto flex size-32 items-center justify-center">
              <span className="absolute h-20 w-20 animate-ping rounded-full bg-brand/10" />
              <span className="absolute h-20 w-20 rounded-full bg-brand/5" />
              <svg
                data-draw
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="relative h-12 w-12 text-brand"
                aria-hidden
              >
                <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <div className="mt-6 text-center">
              <h3 className="font-display text-lg">Itagüí &amp; Antioquia</h3>
              <p className="mt-2 text-sm text-mute">
                Base en Itagüí, cobertura en todo el Valle de Aburrá y la región.
              </p>
            </div>
          </div>

          {/* Logística puerta a puerta — wide */}
          <div
            data-reveal="left"
            data-reveal-start="top 100%"
            className="col-span-6 grid items-center gap-6 rounded-2xl border border-line bg-ink-2 p-7 sm:grid-cols-2 lg:col-span-3"
          >
            <div className="flex flex-col justify-between gap-8">
              <span
                data-draw
                className="flex size-12 items-center justify-center rounded-full border border-line text-brand"
              >
                <CategoryIcon
                  slug="equipos-de-movimiento-de-tierra"
                  className="h-6 w-6"
                />
              </span>
              <div>
                <h3 className="font-display text-xl">Logística puerta a puerta</h3>
                <p className="mt-2 text-sm text-mute">
                  Llevamos y recogemos el equipo en tu obra. Tú no mueves un dedo.
                </p>
              </div>
            </div>
            {/* Mini ruta: origen → obra */}
            <div className="relative flex items-center justify-between rounded-xl border border-line bg-ink p-5">
              <div className="flex flex-col items-center gap-1">
                <span className="size-2.5 rounded-full bg-mute" />
                <span className="text-[0.7rem] font-medium text-mute">Bodega</span>
              </div>
              <svg
                className="mx-2 h-6 flex-1 text-brand"
                viewBox="0 0 100 24"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 12h96"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <path
                  d="M88 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <span className="size-2.5 rounded-full bg-brand" />
                <span className="text-[0.7rem] font-medium text-brand">Obra</span>
              </div>
            </div>
          </div>

          {/* Soporte técnico — wide con chat */}
          <div
            data-reveal="right"
            data-reveal-start="top 100%"
            className="col-span-6 grid items-center gap-6 rounded-2xl border border-line bg-ink-2 p-7 sm:grid-cols-2 lg:col-span-3"
          >
            <div className="flex flex-col justify-between gap-8">
              <span
                data-draw
                className="flex size-12 items-center justify-center rounded-full border border-line text-brand"
              >
                <CategoryIcon slug="equipos-electromecanicos" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl">Soporte técnico activo</h3>
                <p className="mt-2 text-sm text-mute">
                  Asesoría durante todo el alquiler. Si el equipo para, tu obra no.
                </p>
              </div>
            </div>
            {/* Mini chat de soporte */}
            <div className="flex flex-col gap-2 rounded-xl border border-line bg-ink p-4">
              <span className="w-fit max-w-[90%] rounded-2xl rounded-tl-sm bg-ink-3 px-3 py-2 text-[0.78rem] text-bone">
                El vibrador no enciende, ¿qué reviso?
              </span>
              <span className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-[0.78rem] text-white">
                Verifica el combustible y el switch. Si sigue, te mando repuesto
                hoy. 🔧
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO — fondo de obra real */}
      <section className="relative isolate overflow-hidden border-t border-line">
        {/* Imagen de obra a sangre + overlays para legibilidad y tinte de marca */}
        <img
          src="/fotos/pexels-mehmet-aksoy-374584031-16764815.webp"
          alt="Obra en construcción con grúa torre"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/55 to-black/40" />

        <div className="container-x py-24 md:py-36">
          <div className="mb-16 max-w-2xl">
            <ScrollPaintText
              as="h2"
              className="display-lg"
              text="Simple. Rápido. Sin fricción."
              from="rgba(255,255,255,0.28)"
              to="#ffffff"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {PROCESS.map((s) => (
              <div
                key={s.n}
                data-reveal
                className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md transition-colors hover:border-brand-glow/50 hover:bg-white/10 md:p-10"
              >
                <span className="font-display text-6xl font-bold text-brand-glow/60">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-2xl text-white">{s.t}</h3>
                <p className="mt-3 text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
