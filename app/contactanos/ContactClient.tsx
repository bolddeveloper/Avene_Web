"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from 'lucide-react'  
import Header from "@/components/header";
import Footer from "@/components/footer";
import { redes } from "@/app/data/redes";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const iconos: Record<string, React.ReactNode> = {
    Facebook: <Facebook size={24} />,
    Youtube:  <Youtube   size={24} />
  }
  
  const [successMessage, setSuccessMessage] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accepted) {
      setSuccessMessage("Por favor acepta los términos antes de enviar.");
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage("¡Mensaje enviado con éxito!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setAccepted(false);
      } else {
        setSuccessMessage("Hubo un error al enviar el mensaje.");
      }
    } catch {
      setSuccessMessage("Ocurrió un error inesperado.");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28">
        <section className="py-16 px-4">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">

            {/* Formulario */}
            <div className="bg-[#fff2ee] rounded-2xl p-6 sm:p-8 shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#f26b50] mb-6">Mantengámonos Conectados</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f26b50]"
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 mb-1">Apellido</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f26b50]"
                      placeholder="Smitherton"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f26b50]"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-1">Tu mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#f26b50]"
                    placeholder="Escribe tu consulta o mensaje aquí"
                    required
                  ></textarea>
                </div>

                <div className="text-sm text-gray-600 max-w-md">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      required
                    />
                    <span>
                      Sí, acepto recibir comunicación de Eau Thermale Avène (newsletters y ofertas) y que mis datos personales y mi
                      consentimiento para recibir información pueden ser utilizados para brindarme ofertas y servicios personalizados.
                      Confirmo que tengo 18 años o más. Tus datos personales se conservarán durante 3 años desde tu último contacto con
                      nosotros. Para obtener más información sobre tus derechos, consulta nuestra{" "}
                      <Link href="#" className="underline text-[#f26b50]">Política de privacidad</Link>.
                    </span>
                  </label>
                  <p className="mt-2 text-xs text-gray-400 mt-5 mb-5">* Campos obligatorios</p>
                </div>

                {successMessage && (
                  <p className="text-green-600 text-sm mb-4">{successMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#f26b50] text-white py-3 rounded-lg hover:bg-[#e5583d] transition"
                >
                  Enviar
                </button>
              </form>
            </div>

            {/* Información de contacto */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-normal mb-6 leading-snug">
                <span className="font-extrabold">¿Necesitas ayuda?</span> Puedes contar con nosotros.
              </h1>
              <p className="text-black text-base leading-relaxed">
              Quiero recibir novedades y ofertas de Eau Thermale Avène, y acepto que mis datos se usen para enviarme información y servicios pensados especialmente para mí.
                <br></br><br></br>
                Más información:{" "}
                <Link href="/politica" className="underline">Política de privacidad.</Link>
              </p>

              
              <div className="flex flex-col md:flex-row gap-y-12 md:gap-x-24 mt-16 mb-12">
                <div>
                  <h2 className="text-xl font-semibold text-black mb-3">Redes Sociales</h2>
                  <div className="flex items-center gap-6">
                    {redes.map(({ red, link }) => (
                      <Link
                        key={red}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#f26b50] transition"
                      >
                        {/* Renderiza el ícono y el texto */}
                        <span className="sr-only">{red}</span>
                        {iconos[red] || red}
                      </Link>
                    ))}
                  </div>
                </div>                
              </div>
  

              <div>
                <h2 className="text-xl font-semibold text-black mb-3">Email</h2>
                <p className="text-gray-700 mb-4">eauthermalavene.guatemala@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
