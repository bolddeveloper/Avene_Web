import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Avène Guatemala | Cuidado dermatológico para piel sensible",
  description:
    "Descubre Avène Guatemala, expertos en el cuidado dermatológico de pieles sensibles. Más de 30 años de innovación con productos como Cleanance, Hydrance, Vitamin Activ Cg y protectores solares con Agua Termal de Avène.",
  keywords: [
    "Avène Guatemala",
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
    "puntos de venta Avène Guatemala",
  ],
  alternates: { canonical: "https://www.avene.com.gt/" },
  openGraph: {
    type: "website",
    url: "https://www.avene.com.gt/",
    siteName: "Eau Thermale Avène Guatemala",
    title: "Avène Guatemala | Cuidado dermatológico para piel sensible",
    description:
      "Descubre Avène Guatemala, expertos en el cuidado dermatológico de pieles sensibles. Más de 30 años de innovación con productos como Cleanance, Hydrance, Vitamin Activ Cg y protectores solares con Agua Termal de Avène.",
    images: [
      {
        url: "https://www.avene.com.gt/images/Portada.webp", // usa URL absoluta
        width: 1200,
        height: 630,
        alt: "Avène Guatemala - Cuidado de la piel sensible",
      },
    ],
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avène Guatemala | Cuidado dermatológico para piel sensible",
    description:
      "Descubre Avène Guatemala, expertos en el cuidado dermatológico de pieles sensibles. Más de 30 años de innovación con productos como Cleanance, Hydrance, Vitamin Activ Cg y protectores solares con Agua Termal de Avène.",
    images: ["https://www.avene.com.gt/images/Portada.webp"],
    site: "@AveneGuatemala",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <HomeClient />;
}