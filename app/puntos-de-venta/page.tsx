// app/puntos-de-venta/page.tsx
import type { Metadata } from "next";
import PuntosDeVentaClient from "./PuntosDeVentaClient";

export const metadata: Metadata = {
  title: "Puntos de Venta Avène Guatemala | Encuentra tu tienda más cercana",
  description:
    "Localiza los puntos de venta oficiales de Avène en Guatemala. Encuentra nuestros productos dermatológicos en farmacias, tiendas y distribuidores autorizados como Siman, Derma Center, Meykos, Galeno y más.",
  keywords: [
    "Avène Guatemala",
    "puntos de venta Avène",
    "farmacias Avène",
    "tiendas Avène Guatemala",
    "dónde comprar Avène",
    "productos dermatológicos Guatemala",
    "Eau Thermale Avène distribuidores",
    "farmacias Meykos",
    "Siman Avène",
    "cuidado de la piel sensible",
  ],
  alternates: { canonical: "https://www.avene.com.gt/puntos-de-venta" },
  openGraph: {
    type: "website",
    url: "https://www.avene.com.gt/puntos-de-venta",
    siteName: "Eau Thermale Avène Guatemala",
    title: "Puntos de Venta Avène Guatemala | Encuentra tu tienda más cercana",
    description:
      "Encuentra nuestros productos dermatológicos en farmacias y distribuidores autorizados en Guatemala.",
    images: [
      {
        url: "https://www.avene.com.gt/images/Portada.webp", // pon aquí tu imagen OG preferida del mapa si la tienes
        width: 1200,
        height: 630,
        alt: "Puntos de venta Avène Guatemala",
      },
    ],
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puntos de Venta Avène Guatemala | Encuentra tu tienda más cercana",
    description:
      "Localiza farmacias y distribuidores oficiales de Avène en Guatemala.",
    images: ["https://www.avene.com.gt/images/Portada.webp"],
    site: "@AveneGuatemala",
  },
  robots: { index: true, follow: true },
};

// Renderiza el componente cliente con la UI
export default function Page() {
  return <PuntosDeVentaClient />;
}
