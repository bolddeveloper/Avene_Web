import type { Metadata } from "next";
import LaMarcaClient from "./LaMarcaClient";

export const metadata: Metadata = {
  title: "La Marca | Comprometidos con la salud de las pieles sensibles",
  description:
    "Conoce la historia y propósito de Eau Thermale Avène. Más de 30 años dedicados al cuidado de la piel sensible con normas de calidad estrictas, compromiso ambiental y el poder calmante del Agua Termal de Avène.",
    keywords: ["Avène Guatemala",
    "cuidado de la piel sensible",
    "Eau Thermale Avène",
    "productos dermatológicos",
    "sérum hidratante",
    "protector solar Avène",
    "Cleanance",
    "Hydrance",
    "Vitamin Activ Cg",
    "Cicalfate",
    "dermocosmética",
    "puntos de venta Avène Guatemala"],
    alternates: { canonical: "https://www.avene.com.gt/la-marca" },
  openGraph: {
    title: "La Marca | Avène Guatemala",
    description:
      "Eau Thermale Avène Guatemala: innovación dermatológica y respeto por la piel sensible.",
    url: "https://www.avene.com.gt/la-marca",
    images: [{ url: "https://www.avene.com.gt/images/PortadaLM.webp", width: 1200, height: 630, alt: "Avène Guatemala - La Marca" }],
    locale: "es_GT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Marca | Avène Guatemala",
    description:
      "Conoce la esencia de Eau Thermale Avène Guatemala: compromiso con la piel sensible.",
    images: ["https://www.avene.com.gt/images/PortadaLM.webp"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LaMarcaClient />;
}
