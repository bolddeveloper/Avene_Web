"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { storeCards } from "../data/stores";

export default function PuntosDeVentaPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStores = storeCards.filter((store) => {
    const valuesToSearch = [
      store.name,
      store.tel,
      store.pbx,
      store.whatsapp,
      store.email,
      store.address,
    ];
    return valuesToSearch.some((value) =>
      value?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <section className="container mx-auto my-8 pt-[80px] px-4">
          <div className="relative h-[700px] rounded-lg overflow-hidden shadow-md">
            {/* Imagen del mapa */}
            <Image
              src="/images/mapa.png"
              alt="Mapa de puntos de venta"
              fill
              className="object-cover"
            />

            {/* Barra lateral de tarjetas */}
            <div className="absolute top-0 left-0 h-full w-full sm:w-[450px] p-4 overflow-y-auto z-10 bg-white/90 sm:bg-transparent">
              {/* Buscador */}
              <div className="mb-4 pr-2">
                <input
                  type="text"
                  placeholder="Buscar (ej: zona 3)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none"
                />
              </div>

              {/* Lista de tarjetas filtradas */}
              <div className="space-y-5 pr-2">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store, index) => (
                    <div
                      key={index}
                      className="
                        bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5
                        flex flex-col sm:flex-row
                        items-start
                        gap-4 min-h-[140px]
                      "
                    >
                      {/* Wrapper del logo */}
                      <div className="w-full flex justify-center sm:w-auto sm:justify-start">
                        <Link
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=""
                        >
                          <Image
                            src={store.logo}
                            alt={store.name}
                            width={90}
                            height={50}
                            className="h-auto"
                          />
                        </Link>
                      </div>

                      {/* Info */}
                      <div className="text-base text-gray-800">
                        {store.pbx && (
                          <div className="mb-1">
                            <span className="font-semibold">PBX:</span> {store.pbx}
                          </div>
                        )}
                        {store.tel && (
                          <div className="mb-1">
                            <span className="font-semibold">Tel:</span> {store.tel}
                          </div>
                        )}
                        {store.whatsapp && (
                          <div className="mb-1">
                            <span className="font-semibold">Whatsapp:</span> {store.whatsapp}
                          </div>
                        )}
                        {store.email && (
                          <div>
                            <span className="font-semibold">Correo:</span> {store.email}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No se encontraron resultados.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sección informativa debajo del mapa */}
        <section className="py-12 text-center bg-white px-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-coral-500 mb-4">
            ¡Nuestros productos están disponibles en muchos puntos de venta!
          </h1>
          <h3 className="text-gray-700 text-base md:text-lg max-w-xl mx-auto">
            Encuentra nuestras gamas y ofertas exclusivas de nuestros socios.
          </h3>
        </section>
      </main>
      <Footer />
    </>
  );
}
