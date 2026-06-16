"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Carousel from "@/components/carousel";
import BestSellers from "@/components/bestSellers";
import { storeCards } from "./data/stores";


export default function HomeClient() {
  const [showModal, setShowModal] = useState(false);
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarCorreo = async () => {
    if (!correo) return;
    const res = await fetch("/api/suscribete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: correo }),
    });
    const data = await res.json();
    if (data.success) { 
      setEnviado(true);
      setCorreo("");
    }
  };

  // Al montar la página, mostramos el popup
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      <Header />

      {/* POPUP SUSCRÍBETE */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-[#fbf6f2] rounded-[20px] p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar popup"
            >
              ✕
            </button>

            {/* Contenido Suscríbete */}
            <div className="flex flex-col items-center text-center">
              <p className="text-2xl font-semibold mb-2">Suscríbete</p>
              <p className="text-lg text-[#333] leading-snug mb-6 max-w-[350px]">
                Ingresa tu correo para conocer todas nuestras noticias
              </p>
              <div className="relative w-full max-w-[350px]">
                <input
                  type="email"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full py-3 pl-6 pr-12 rounded-full border border-[#f0f0f0] text-lg bg-white placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#f07457] transition"
                />
                <span
                  className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer"
                  onClick={enviarCorreo}
                >
                  <Image
                    src="/images/correo-electronico.png"
                    alt="Enviar"
                    width={20}
                    height={20}
                  />
                </span>
                {enviado && (
                  <p className="text-green-600 text-sm mt-3">
                    ¡Gracias por suscribirte!
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen">
        {/* seccion banner */}
        <section className="w-full flex justify-center pt-[95px] px-4">
          <div className="relative w-full max-w-[1750px] h-[400px] md:h-[750px] rounded-[30px] overflow-hidden shadow-md">
            <Image
              src="/images/Portada.webp"
              alt="Banner Avène"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </section>

        {/* seccion historia */}
        <section className="w-full flex justify-center px-4 mt-12">
          <div className="w-full max-w-[1750px] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-[#f37b5a] to-[#f8a387] text-white p-8 rounded-[20px] shadow-md flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                MÁS DE
                <br />
                30 AÑOS
              </h2>
              <p className="text-lg md:text-xl mt-3">
                Con la confianza de una piel sana
              </p>
            </div>
            <div className="bg-[#f3f3f3] text-gray-800 p-8 rounded-[20px] shadow-md flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl font-semibold mb-2">
                Innovando para la salud de las pieles más sensibles ...
              </h1>
              <p className="text-base leading-relaxed">
                En Eau Thermale Avène trabajamos a diario para ofrecer cuidados de alta
                eficacia sin comprometer la seguridad...
              </p>
            </div>
          </div>
        </section>

        <Carousel />
        <BestSellers />

        {/* sección puntos de venta */}
        <section className="w-full flex justify-center px-4 mt-20">
          <div className="w-full max-w-[1750px] bg-[#f5f5f5] p-8 md:p-12 rounded-[20px] shadow-md flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="w-full md:w-2/4 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl md:text-5xl font-light text-[#2c2c2c] leading-tight mb-6">
                  Conoce nuestros
                  <br />
                  puntos de Venta
                </h2>
                <p className="text-base md:text-lg text-gray-600">
                  Encuentra nuestras gamas y ofertas exclusivas de nuestros socios.
                </p>
              </div>

              <Link href="/puntos-de-venta" className="self-start">
                <button className="mt-8 md:mt-12 bg-white border border-[#f07457] text-[#f07457] px-6 py-3 rounded-full font-semibold text-base hover:bg-[#f07457] hover:text-white transition">
                  Conoce sus ubicaciones &rarr;
                </button>
              </Link>
            </div>

            {/* GRID DINÁMICO DE LOGOS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {storeCards.map((store, index) => (
                <Link
                  key={index}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-[20px] p-4 flex justify-center items-center shadow-sm w-full h-[180px]"
                >
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={250}
                    height={250}
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* sección comentarios */}
        {/*
          <section className="w-full flex justify-center px-4 mt-20">
          <div className="w-full max-w-[1750px]">
            <h2 className="text-center text-[#f07457] text-2xl md:text-3xl font-semibold mb-12">Comentarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ text: "¡Gran Producto!", img: "/images/avatar1.png", name: "Name", description: "Description" }, { text: "Muy recomendado", img: "/images/avatar2.png", name: "Name", description: "Description" }, { text: "Una gran experiencia", img: "/images/avatar3.png", name: "Name", description: "Description" }].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-[12px] shadow-md">
                  <p className="text-base md:text-lg font-medium mb-6">“{item.text}”</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.img}
                      alt={`Avatar ${index}`}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}
      </main>

      <Footer />
    </>
  );
}
