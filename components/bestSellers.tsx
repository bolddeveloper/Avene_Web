"use client";
import Image from "next/image";
import Link from "next/link";
import { bestSellers } from "@/app/data/bestSellers";

export default function BestSellers() {
  return (
    <section className="w-full flex justify-center mt-20 px-4">
      <div className="w-full max-w-[1750px]">
        <h2 className="text-center text-[#f07457] text-2xl sm:text-3xl font-semibold mb-12">
          Best Sellers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {bestSellers.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f5f5f5] p-6 sm:p-7 md:p-8 rounded-[20px] shadow-md flex flex-col items-start"
            >
              {/* Imagen */}
              <div className="w-full flex justify-center mb-5 sm:mb-6">
                <div className="relative w-[220px] sm:w-[260px] md:w-[300px] h-[280px] sm:h-[320px] md:h-[350px]">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-scale-down"
                  />
                </div>
              </div>

              {/* Nombre y descripción */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 w-full text-left">
                {item.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 w-full text-left">
                {item.description}
              </p>

              {/* Enlace */}
              <Link
                href={item.link}
                className="flex items-center gap-2 text-[#f07457] text-sm sm:text-base font-semibold text-left"
              >
                Puntos de Venta
                <span className="bg-[#f07457] text-white px-2 py-1 rounded-full text-xs">&gt;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
