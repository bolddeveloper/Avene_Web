"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { categories } from "@/app/data/categories";

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.offsetWidth / 2.5; // Ajustado para responsive

    if (direction === "right") {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (Math.ceil(container.scrollLeft + cardWidth) >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({
          left: container.scrollLeft + cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      const newScroll = Math.max(container.scrollLeft - cardWidth, 0);
      container.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const repeatedCategories = [...categories, ...categories];

  return (
    <section className="w-full flex justify-center px-4 mt-20">
      <div className="w-full max-w-[1750px] relative overflow-hidden">

        {/* Botón izquierdo */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-[#f37b5a] text-white p-3 rounded-full shadow-md hover:bg-[#e65a3f]"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Carrusel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
        >
          {repeatedCategories.map((product, idx) => (
            <div
              key={idx}
              className="
                snap-start flex-shrink-0 flex flex-col items-center px-2
                w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5
              "
            >
              <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] rounded-[20px] overflow-hidden shadow-md bg-[#fbece7]">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={220}
                  height={260}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-3 text-center text-[15px] sm:text-[16px] md:text-[17px] font-light">
                {product.name}
              </p>
            </div>
          ))}
        </div>

        {/* Botón derecho */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-[#f37b5a] text-white p-3 rounded-full shadow-md hover:bg-[#e65a3f]"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
