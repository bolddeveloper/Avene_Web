"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

export default function LaMarcaClient() {
    return (
      <>
        <Header />
  
        <main className="min-h-screen">
          {/* Hero: mismo tamaño que en Home */}
          <section className="w-full flex justify-center pt-[95px] px-4">
            <div className="relative w-full max-w-[1750px] h-[400px] md:h-[750px] rounded-[30px] overflow-hidden shadow-md">
              <Image
                src="/images/PortadaLM.webp"
                alt="Banner La Marca"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </section>
  
          {/* Tu contenido de “La Marca” */}
          <section className="w-full flex justify-center px-4 py-16 bg-white">
            <div className="w-full max-w-[1750px] flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Misión */}
              <div className="w-[280px] h-[280px] rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/images/Productos.webp"
                  alt="Productos"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 text-center px-4">
                <p className="text-sm sm:text-base tracking-widest text-[#333] uppercase font-medium mb-3">
                  <span className="inline-block w-8 h-[2px] bg-[#f07457] mr-3 align-middle" />
                  Misión de Avène
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-[#2c2c2c] mb-4">
                  Nuestro propósito y valores
                </h1>
                <p className="text-base sm:text-lg md:text-[25px] text-[#555] leading-relaxed max-w-2xl mx-auto">
                  Dedicados al cuidado de la piel sensible y a mejorar la calidad de vida de todos los tipos de piel, aprovechando la herencia y experiencia farmacéutica y dermatológica.
                </p>
              </div>
              <div className="w-[280px] h-[280px] rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/images/Hydroterapia.webp"
                  alt="Hydroterapia"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </section>
  
          {/* Normas de Calidad */}
          <section className="w-full flex justify-center px-4 py-16 bg-white">
            <div className="w-full max-w-[1750px] text-center">
              <p className="text-sm sm:text-base tracking-widest uppercase text-[#333] font-medium mb-3">
                <span className="inline-block w-8 h-[2px] bg-[#f07457] mr-3 align-middle" />
                Valores
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-[#2c2c2c] mb-6">
                Normas de Calidad Estrictas
              </h2>
              <p className="text-base sm:text-lg md:text-[25px] text-[#666] leading-relaxed max-w-5xl mx-auto">
                Laboratoires Dermatologiques Avène somete cada fórmula a rigurosas pruebas con los más altos estándares para garantizar su seguridad y tolerancia. Los dermatólogos participan desde la concepción y desarrollo del producto, pasando por una serie de pruebas preclínicas y clínicas en un número significativo de pacientes. Nuestras fórmulas, así como el perfil toxicológico de cada ingrediente individual, son auditados por científicos. Todos los estudios clínicos se realizan bajo control médico, asegurando el máximo respeto por la piel sensible.
              </p>
            </div>
          </section>
  
          {/* Protegiendo Recursos */}
          <section className="w-full bg-white py-16 px-4">
            <div className="w-full max-w-[1750px] mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-[750px] h-[300px] rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/images/Naturaleza.webp"
                  alt="Naturaleza"
                  width={750}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-[#2c2c2c] mb-6">
                  <span className="inline-block w-8 h-[2px] bg-[#f07457] mr-3 align-middle" />
                  Protegiendo Nuestros Recursos
                </h3>
                <p className="text-base sm:text-lg md:text-[25px] text-[#555] leading-relaxed">
                  El Agua Termal de Avène brota en un sitio protegido dentro del Parque Regional de Haut-Languedoc, en el sur de Francia. La biodiversidad intacta y la baja actividad humana garantizan que el agua permanezca libre de la tecnología moderna, la contaminación y cualquier alteración que pudiera afectar su composición.
                </p>
              </div>
            </div>
          </section>
  
          {/* Agua Termal */}
          <section className="w-full bg-white py-16 px-4">
            <div className="w-full max-w-[1750px] mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 order-2 md:order-1">
                <p className="text-sm sm:text-base tracking-widest uppercase text-[#333] font-medium mb-3">
                  <span className="inline-block w-8 h-[2px] bg-[#f07457] mr-3 align-middle" />
                  Agua Termal de Avène
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-[#2c2c2c] mb-6">
                  Agua Termal de Avène
                </h2>
                <p className="text-base sm:text-lg md:text-[25px] text-[#555] leading-relaxed">
                  El agua de lluvia se filtra y emprende un viaje de 50 años a través de las capas más profundas y antiguas de la tierra, donde se enriquece con oligoelementos, silicatos y entra en contacto con una microflora única: Aqua. Dolomiae. El Agua Termal de Avène brota de la Fuente Sainte-Odile, manteniendo siempre la misma composición y caudal.
                </p>
              </div>
              <div className="w-full md:w-[700px] h-[300px] rounded-[20px] overflow-hidden shadow-md order-1 md:order-2">
                <Image
                  src="/images/Agua.webp"
                  alt="Agua Termal"
                  width={700}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </section>
  
          {/* Confianza en la piel sana */}
          <section className="w-full bg-white py-24 px-4 flex justify-center">
            <div className="w-full max-w-[1750px]">
              <h2 className="text-center text-[#f07457] text-2xl sm:text-3xl md:text-[36px] font-medium mb-16">
                La Confianza de una piel sana
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  "Pieles sensibles",
                  "Tolerancia y seguridad",
                  "Avance dermatología",
                  "Medioambiente y recursos",
                  "Desarrollo y productos",
                  "Océanos",
                ].map((title, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="w-full h-[250px] sm:h-[300px] md:h-[320px] rounded-[18px] overflow-hidden shadow-md mb-4">
                      <Image
                        src={`/images/${title}.webp`}
                        alt={title}
                        width={320}
                        height={220}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-base sm:text-lg md:text-[20px] text-[#333] leading-snug max-w-xs">
                      {(() => {
                        switch (title) {
                          case "Pieles sensibles":
                            return "Para la salud de las pieles sensibles";
                          case "Tolerancia y seguridad":
                            return "Alta eficacia sin comprometer la tolerancia y la seguridad";
                          case "Avance dermatología":
                            return "Comprometidos con el avance de la dermatología y la mejora de la calidad de vida de las personas con piel sensible";
                          case "Medioambiente y recursos":
                            return "Comprometidos con la preservación del medioambiente y los recursos de Avène-les-Bain";
                          case "Desarrollo y productos":
                            return "Desarrollo y producción responsables";
                          case "Océanos":
                            return "Respetar los océanos";
                          default:
                            return "";
                        }
                      })()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
  
        <Footer />
      </>
    );
  }