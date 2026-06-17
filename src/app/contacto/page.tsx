import type { Metadata } from "next";
import Image from "next/image";
import { QuoteForm } from "@/components/quote-form";
import { WhatsAppIcon } from "@/components/icons";
import { EMAIL, PHONE, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotiza el alquiler de equipos para construcción. WhatsApp, correo y teléfono. Medellín e Itagüí, Antioquia.",
};

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
    <path d="M5 4h4l1.5 5L8 10.5a12 12 0 0 0 5.5 5.5L15 14l5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export default function ContactoPage() {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Izquierda: foto a sangre con scrim (oculta en mobile) */}
      <div className="relative hidden lg:block">
        <Image
          src="/fotos/pexels-ritesh-arya-1423700-3097103.webp"
          alt="Obra en construcción"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
          <span className="text-sm font-medium text-white/70">Contacto</span>
          <p className="mt-3 max-w-md font-display text-4xl font-bold leading-[1.05] text-white xl:text-5xl">
            Hablemos de tu obra
          </p>
        </div>
      </div>

      {/* Derecha: formulario, verticalmente centrado */}
      <div className="flex items-center justify-center px-6 pb-20 pt-32 md:pb-24 md:pt-40 lg:px-16">
        <div className="w-full max-w-lg">
          <span className="kicker">Hablemos</span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] md:text-4xl">
            Cotiza tu equipo hoy
          </h1>
          <p className="mt-4 text-mute">
            Respondemos rápido. Cuéntanos qué necesitas y coordinamos
            disponibilidad, precio y entrega.
          </p>

          {/* Atajos de contacto */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={waLink("Hola Conequipos, quiero cotizar un equipo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mute transition-colors hover:text-brand hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-mute transition-colors hover:text-brand hover:underline"
            >
              {MailIcon}
              {EMAIL}
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-mute transition-colors hover:text-brand hover:underline"
            >
              {PhoneIcon}
              {PHONE}
            </a>
          </div>

          <div className="mt-10">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
