// app/contactanos/page.tsx
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contáctanos | Avène Guatemala",
  description:
    "Comunícate con Avène Guatemala para resolver tus dudas, conocer más sobre nuestros productos dermatológicos o recibir asesoría personalizada sobre el cuidado de la piel sensible.",
  keywords: [
    "Avène Guatemala contacto",
    "servicio al cliente Avène",
    "atención dermatológica",
    "formulario de contacto Avène",
    "consulta productos Avène",
    "cuidado de la piel sensible",
    "Eau Thermale Avène Guatemala",
    "soporte Avène",
  ],
  alternates: { canonical: "https://www.avene.com.gt/contactanos" },
  openGraph: {
    type: "website",
    url: "https://www.avene.com.gt/contactanos",
    siteName: "Eau Thermale Avène Guatemala",
    title: "Contáctanos | Avène Guatemala",
    description:
      "Escríbenos para resolver tus dudas o recibir asesoría sobre el cuidado de la piel sensible.",
    images: [
      {
        url: "https://www.avene.com.gt/images/Portada.webp",
        width: 1200,
        height: 630,
        alt: "Contáctanos - Avène Guatemala",
      },
    ],
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contáctanos | Avène Guatemala",
    description:
      "Comunícate con nuestro equipo para resolver dudas o recibir asesoría dermatológica.",
    images: ["https://www.avene.com.gt/images/Portada.webp"],
    site: "@AveneGuatemala",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ContactClient />;
}
