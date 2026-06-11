import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://conequipos.com.co"),
  title: {
    default: "Conequipos · Alquiler de equipos para construcción",
    template: "%s · Conequipos",
  },
  description:
    "Alquiler y venta de maquinaria certificada para construcción en Medellín y Antioquia. Logística ágil, soporte experto y 95% de disponibilidad.",
  keywords: [
    "alquiler de maquinaria",
    "equipos de construcción",
    "Medellín",
    "Antioquia",
    "andamios",
    "compresores",
    "plantas eléctricas",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Conequipos",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${geistMono.variable} ${space.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-bone grain">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
        </SmoothScroll>
      </body>
    </html>
  );
}
