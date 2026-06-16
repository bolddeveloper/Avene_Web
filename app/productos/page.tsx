// app/productos/page.tsx
import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Productos Avène | Cuidado dermatológico para cada tipo de piel",
  description:
    "Explora los productos Avène disponibles en Guatemala. Sérums, limpiadores, cremas hidratantes, protectores solares y tratamientos dermatológicos diseñados para pieles sensibles, grasas, secas o con tendencia atópica.",
  keywords: [
    "Avène Guatemala",
    "productos Avène",
    "cuidado dermatológico",
    "agua termal Avène",
    "crema hidratante",
    "limpiador facial",
    "protector solar",
    "piel sensible",
    "dermocosmética",
    "cuidado facial",
    "Cleanance",
    "Hydrance",
    "Vitamin Activ Cg",
    "XeraCalm",
    "TriXera",
    "Avène Eau Thermale",
  ],
  alternates: { canonical: "https://www.avene.com.gt/productos" },
  openGraph: {
    type: "website",
    url: "https://www.avene.com.gt/productos",
    siteName: "Eau Thermale Avène Guatemala",
    title: "Productos Avène Guatemala | Cuidado dermatológico para cada tipo de piel",
    description:
      "Explora los productos Avène disponibles en Guatemala, diseñados para las necesidades de cada tipo de piel.",
    images: [
      {
        url: "https://www.avene.com.gt/images/Portada.webp", // asegúrate que exista; puede ser otra imagen OG
        width: 1200,
        height: 630,
        alt: "Productos Avène Guatemala",
      },
    ],
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Productos Avène Guatemala | Cuidado dermatológico para cada tipo de piel",
    description:
      "Sérums, limpiadores, cremas hidratantes, protectores solares y más para pieles sensibles.",
    images: ["https://www.avene.com.gt/images/Portada.webp"],
    site: "@AveneGuatemala",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ProductsClient />;
}
