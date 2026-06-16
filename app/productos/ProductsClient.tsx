// app/productos/ProductsClient.tsx
"use client";

import { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ChevronRight } from "lucide-react";
import { productos } from "../data/productos";

const Image = (props: ImageProps) => <NextImage unoptimized {...props} />;

export default function ProductsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLine, setSelectedLine] = useState("");

  const lineasOrden = Array.from(new Set(productos.map((p) => p.linea)));
  const categoriasOrden = Array.from(new Set(productos.map((p) => p.categoria)));

  const [selectedImages, setSelectedImages] = useState<Record<string, string>>(
    productos.reduce((acc, p) => {
      acc[p.nombre] = p.imagenes[0];
      return acc;
    }, {} as Record<string, string>)
  );

  const filtered = productos
    .filter((p) => (selectedLine ? p.linea === selectedLine : true))
    .filter((p) => (selectedCategory ? p.categoria === selectedCategory : true))
    .filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(term) ||
        (p.descripcion ?? "").toLowerCase().includes(term) ||
        (p.principios_activos ?? "").toLowerCase().includes(term) ||
        (p.beneficios ?? "").toLowerCase().includes(term)
      );
    });

  return (
    <>
      <Header />

      <main className="bg-[#f9f9f9] pt-[95px] px-4 pb-16 min-h-screen">
        {/* H1 ÚNICO DE LA PÁGINA */}
        <section className="max-w-screen-xl mx-auto mt-10 px-2 md:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2c2c2c]">
            Productos Avène Guatemala
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Cuidado dermatológico para cada tipo de piel.
          </p>
        </section>

        <section className="max-w-screen-xl mx-auto my-8 px-2 md:px-4">
          {/* Controles */}
          <div className="mt-8 mb-8 p-4 md:p-6 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-4">
            {/* Select Línea */}
            <select
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              className="w-full md:w-1/3 py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f26b50] bg-white text-sm sm:text-base"
              aria-label="Filtrar por línea"
            >
              <option value="">Todas las líneas</option>
              {lineasOrden.map((lin) => (
                <option key={lin} value={lin}>
                  {lin}
                </option>
              ))}
            </select>

            {/* Select Categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/3 py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f26b50] bg-white text-sm sm:text-base"
              aria-label="Filtrar por categoría"
            >
              <option value="">Todas las categorías</option>
              {categoriasOrden.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Búsqueda */}
            <input
              type="text"
              placeholder="Buscar por nombre, descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f26b50] bg-white text-sm sm:text-base"
              aria-label="Buscar productos"
            />
          </div>

          {/* Render por línea */}
          {lineasOrden.map((linea) => {
            const items = filtered.filter((p) => p.linea === linea);
            if (items.length === 0) return null;

            return (
              <div key={linea}>
                {/* Banner línea */}
                <section className="w-full flex justify-center sm:justify-start px-4 mt-12">
                  <div className="w-full sm:w-3/5 max-w-[700px] bg-[#f26b50] rounded-[20px] py-3 sm:py-4 px-4 sm:px-6 shadow-md flex items-center justify-center sm:justify-start">
                    <h2 className="text-white text-lg sm:text-2xl font-semibold">
                      – {linea}
                    </h2>
                  </div>
                </section>

                {/* Lista productos */}
                <div className="space-y-10">
                  {items.map((prod) => (
                    <div
                      key={prod.nombre}
                      className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-2xl p-4 sm:p-6 lg:p-10 shadow-md mt-7"
                    >
                      {/* Imágenes */}
                      <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
                        <Image
                          src={`/${selectedImages[prod.nombre]}`}
                          alt={prod.nombre}
                          width={300}
                          height={300}
                          className="rounded-xl object-contain w-full max-w-[300px] h-auto"
                        />
                        <div className="flex flex-wrap justify-center gap-3">
                          {prod.imagenes.map((img) => (
                            <button
                              key={img}
                              onClick={() =>
                                setSelectedImages((prev) => ({
                                  ...prev,
                                  [prod.nombre]: img,
                                }))
                              }
                              className={`rounded-md border-2 p-[2px] focus:outline-none ${
                                selectedImages[prod.nombre] === img
                                  ? "border-[#f26b50]"
                                  : "border-transparent hover:border-gray-300"
                              }`}
                              aria-label={`Ver imagen de ${prod.nombre}`}
                            >
                              <Image
                                src={`/${img}`}
                                alt={`${prod.nombre} miniatura`}
                                width={60}
                                height={60}
                                className="object-contain rounded-md"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Detalles */}
                      <div className="w-full lg:w-1/2 text-gray-800 flex flex-col">
                        {/* Cambiado a h2 para no duplicar h1 */}
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                          {prod.nombre}
                        </h2>
                        <p className="text-gray-800 text-sm sm:text-base font-medium mb-3">
                          {prod.indicaciones}
                        </p>

                        <div className="flex items-center mb-3">
                          <div className="text-[#f26b50] text-sm" aria-hidden>
                            ★★★★★
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {prod.presentacion}
                          </span>
                        </div>

                        <div className="border-t border-gray-300 pt-4 space-y-3 text-sm">
                          <p>
                            <strong>Modo de uso:</strong> {prod.uso}
                          </p>
                          <p>
                            <strong>Beneficios:</strong> {prod.beneficios}
                          </p>
                          <p>
                            <strong>Principios activos:</strong>{" "}
                            {prod.principios_activos}
                          </p>
                          <p>
                            <strong>Presentación:</strong> {prod.presentacion}
                          </p>
                        </div>

                        <Link
                          href="/puntos-de-venta"
                          className="mt-6 self-start bg-[#f26b50] hover:bg-[#e5583d] text-white px-6 py-2 sm:py-3 rounded-full inline-flex items-center shadow-md text-sm sm:text-base transition"
                        >
                          Puntos de Venta <ChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-center text-gray-600 mt-12 text-sm sm:text-base">
              No se encontraron productos.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
