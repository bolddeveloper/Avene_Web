'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // estilos activos
  const baseStyle = "hover:text-[#f07457] transition";
  const activeStyle = "text-[#f07457] font-semibold";

  return (
    <header className="fixed top-8 left-1/2 z-50 -translate-x-1/2 w-full max-w-6xl px-4">
      <div className="w-full bg-white/90 backdrop-blur-md rounded-full shadow-md px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logoavene.png"
              alt="Avène Logo"
              width={120}
              height={90}
              className="h-auto"
            />
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex gap-10 text-sm text-gray-800 font-medium">
          <Link
            href="/la-marca"
            className={`${pathname === "/la-marca" ? activeStyle : baseStyle}`}
          >
            La Marca
          </Link>
          <Link
            href="/productos"
            className={`${pathname === "/productos" ? activeStyle : baseStyle}`}
          >
            Productos
          </Link>
          <Link
            href="/puntos-de-venta"
            className={`${pathname === "/puntos-de-venta" ? activeStyle : baseStyle}`}
          >
            Puntos de Venta
          </Link>
        </nav>

        {/* Botón de contacto y hamburguesa */}
        <div className="flex items-center gap-4">
          <Link
            href="/contactanos"
            className={`hidden md:inline-block px-6 py-2 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-base transition ${
              pathname === "/contactanos"
                ? "bg-[#e96549] text-white"
                : "bg-[#f07457] text-white hover:bg-[#e96549]"
            }`}
          >
            Contáctanos
          </Link>

          {/* Botón hamburguesa móvil */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-xl shadow-md py-4 px-6 text-center space-y-4 text-gray-800 font-medium">
          <Link
            href="/la-marca"
            className={`block ${pathname === "/la-marca" ? activeStyle : "hover:text-[#f07457]"}`}
            onClick={() => setMenuOpen(false)}
          >
            La Marca
          </Link>
          <Link
            href="/productos"
            className={`block ${pathname === "/productos" ? activeStyle : "hover:text-[#f07457]"}`}
            onClick={() => setMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            href="/puntos-de-venta"
            className={`block ${pathname === "/puntos-de-venta" ? activeStyle : "hover:text-[#f07457]"}`}
            onClick={() => setMenuOpen(false)}
          >
            Puntos de Venta
          </Link>
          <Link
            href="/contactanos"
            className={`block px-4 py-2 rounded-xl ${
              pathname === "/contactanos"
                ? "bg-[#e96549] text-white"
                : "bg-[#f07457] text-white hover:bg-[#e96549]"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contáctanos
          </Link>
        </div>
      )}
    </header>
  );
}
