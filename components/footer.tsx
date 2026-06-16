"use client";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

export default function Footer() {
  const [emailFooter, setEmailFooter] = useState("");
  const [footerOk, setFooterOk] = useState(false);

  const enviarCorreoFooter = async () => {
    if (!emailFooter) return;
    const res = await fetch("/api/suscribete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailFooter }),
    });
    const data = await res.json();
    if (data.success) {
      setFooterOk(true);
      setEmailFooter("");
    }
  };

  return (
    <footer className="bg-[#fbf6f2] text-[#333] font-sans mt-20">
      {/* Parte superior */}
      <div className="w-full flex justify-center px-4 py-12">
        <div className="w-full max-w-[1750px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/Avene_Logo.webp"
              alt="Avène Logo"
              width={290}
              height={350}
              className="object-contain w-[150px] sm:w-[200px] md:w-[290px] h-auto"
            />
          </div>

          {/* Enlaces e íconos */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 flex flex-wrap justify-center gap-10 sm:gap-16 md:gap-24 items-center">



            {/* La marca */}
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                href="/la-marca"
                className="text-[16px] sm:text-[17px] font-semibold text-black decoration-[1.5px] hover:text-[#f07457] mb-5"
              >
                La Marca
              </Link>
              <Link
                href="https://www.facebook.com/aveneguatemala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#f26b50] transition"
              >
                <Image
                  src="/images/2-ce1128ec.ico"
                  alt="La Marca"
                  width={34}
                  height={34}
                  className="mt-1"
                />
              </Link>
            </div>

            {/* Productos */}
            <div className="flex flex-col items-center gap-2 text-center mb-16">
              <Link
                href="/productos"
                className="text-[16px] sm:text-[17px] font-semibold text-black decoration-[1.5px] hover:text-[#f07457]"
              >
                Productos
              </Link>
            </div>

            {/* Puntos de venta */}
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                href="/puntos-de-venta"
                className="text-[16px] sm:text-[17px] font-semibold text-black decoration-[1.5px] hover:text-[#f07457] mb-5"
              >
                Puntos de Venta
              </Link>
              <Link
                href="https://www.youtube.com/@Av%C3%A8neGuatemala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#f26b50] transition"
              >
                <Image
                  src="/images/4-ce1128ec.ico"
                  alt="Puntos de Venta"
                  width={34}
                  height={34}
                  className="mt-1"
                />

              </Link>
            </div>

          </div>

          {/* Suscripción */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[18px] font-semibold mb-1">Suscríbete</p>
            <p className="text-[16px] text-[#333] leading-snug mb-4 max-w-[300px]">
              Ingresa tu correo para conocer todas nuestras noticias
            </p>
            <div className="relative w-full max-w-[300px]">
              <input
                type="email"
                placeholder="Correo"
                value={emailFooter}
                onChange={(e) => setEmailFooter(e.target.value)}
                className="w-full py-[8px] pl-4 pr-10 rounded-full border border-[#f0f0f0] text-[16px] bg-white placeholder:text-[#bbb] focus:outline-none focus:ring-1 focus:ring-[#f07457] transition"
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={enviarCorreoFooter}
              >
                <Image
                  src="/images/correo-electronico.png"
                  alt="Enviar"
                  width={18}
                  height={18}
                />
              </span>
              {footerOk && (
                <p className="text-green-600 text-sm mt-2">
                  ¡Gracias por suscribirte!
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Línea inferior */}
      <div className="bg-[#f07457] text-white text-base py-5">
        <div className="w-full px-6">
          <div className="max-w-[1750px] flex flex-col md:flex-row flex-wrap gap-2 md:gap-8 items-center justify-center md:justify-start text-center md:text-left">
            <p className="whitespace-nowrap">© 2025 Eau Thermale Avène</p>
            <Link href="/politica" className="hover:underline whitespace-nowrap">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
