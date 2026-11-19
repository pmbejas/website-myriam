"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  Images,
  Wand2,
  Gift,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowRight,
  Phone,
} from "lucide-react";
import { useCarritoStore } from "@/store/useCarritoStore";

const NAV_ITEMS = [
  {
    id: "inicio",
    href: "/#inicio",
    label: "Inicio",
    subtitulo: "Portada & bienvenida",
    icon: Home,
  },
  {
    id: "concepto",
    href: "/#concepto",
    label: "La Experiencia",
    subtitulo: "Los 5 sentidos & dirección estética",
    icon: Sparkles,
  },
  {
    id: "galeria",
    href: "/#galeria",
    label: "Portfolio",
    subtitulo: "Galería de eventos reales",
    icon: Images,
  },
  {
    id: "servicios",
    href: "/#servicios",
    label: "Cotizador & Servicios",
    subtitulo: "Estilismo de mesas y vidrieras",
    icon: Wand2,
  },
  {
    id: "tienda",
    href: "/#tienda",
    label: "Objetos de Mesa",
    subtitulo: "Tienda boutique de piezas de mesa",
    icon: Gift,
  },
];

export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { alternarDrawer, obtenerCantidadTotal } = useCarritoStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const y = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        totalHeight > 0 ? Math.min(100, (y / totalHeight) * 100) : 0
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll de fondo cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const totalItems = mounted ? obtenerCantidadTotal() : 0;

  return (
    <>
      {/* Línea sutil de progreso de lectura superior */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#632D3E] via-[#D3A3A5] to-[#632D3E] z-50 transition-all duration-150 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ========================================================================= */}
      {/* 1. VERSIÓN DESKTOP / TABLET (>= md): Dock flotante fijo con tooltips */}
      {/* ========================================================================= */}
      <div className="fixed top-4 left-0 right-0 z-40 hidden md:flex justify-center px-3 pointer-events-none">
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center gap-2 sm:gap-3.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#705064]/95 backdrop-blur-md border border-[#F0D9D8]/25 shadow-[0_16px_40px_rgba(74,32,43,0.32)]"
        >
          {/* Monograma Fijo con Etiqueta Flotante Centrada */}
          <div className="relative inline-flex items-center justify-center shrink-0">
            <Link
              href="/#inicio"
              onMouseEnter={() => setHoveredItem("brand")}
              onMouseLeave={() => setHoveredItem(null)}
              onFocus={() => setHoveredItem("brand")}
              onBlur={() => setHoveredItem(null)}
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-[#F0D9D8] hover:bg-white/15 transition-colors shrink-0"
              aria-label="Myriam Depetris - Inicio"
            >
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[#F0D9D8]">
                M<span className="italic text-[#D3A3A5]">D.</span>
              </span>
            </Link>

            <AnimatePresence>
              {hoveredItem === "brand" && (
                <div
                  className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 flex flex-col items-center"
                  style={{ width: "max-content" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -2, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-2.5 h-2.5 rotate-45 bg-[#4A202B] border-l border-t border-[#F0D9D8]/30 -mb-1 relative z-10" />
                    <div className="px-3.5 py-1.5 rounded-full bg-[#4A202B] text-[#F0D9D8] border border-[#F0D9D8]/30 shadow-[0_8px_20px_rgba(40,15,22,0.4)] whitespace-nowrap font-serif text-xs tracking-wide text-center">
                      Myriam Depetris
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Separador vertical sutil */}
          <span className="h-6 w-[1px] bg-[#F0D9D8]/25 mx-1 sm:mx-2 shrink-0" />

          {/* Ítems del Menú con Tamaño Fijo y Píldora Flotante al hacer Hover */}
          <nav className="flex items-center gap-1.5 sm:gap-2.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredItem === item.id;
              return (
                <div
                  key={item.id}
                  className="relative inline-flex items-center justify-center shrink-0"
                >
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onFocus={() => setHoveredItem(item.id)}
                    onBlur={() => setHoveredItem(null)}
                    className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 transition-colors duration-200 ${
                      isHovered
                        ? "bg-white/20 text-[#FFF9EE]"
                        : "text-[#F0D9D8] hover:bg-white/10"
                    }`}
                    aria-label={item.label}
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#F0D9D8] shrink-0" />
                  </Link>

                  <AnimatePresence>
                    {isHovered && (
                      <div
                        className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 flex flex-col items-center"
                        style={{ width: "max-content" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -2, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-2.5 h-2.5 rotate-45 bg-[#4A202B] border-l border-t border-[#F0D9D8]/30 -mb-1 relative z-10" />
                          <div className="px-3.5 py-1.5 rounded-full bg-[#4A202B] text-[#F0D9D8] border border-[#F0D9D8]/30 shadow-[0_8px_20px_rgba(40,15,22,0.4)] whitespace-nowrap text-[10px] uppercase tracking-[0.16em] font-semibold text-center">
                            {item.label}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Botón de Carrito de Tamaño Fijo con Píldora Flotante */}
            <div className="relative inline-flex items-center justify-center shrink-0">
              <button
                type="button"
                onClick={alternarDrawer}
                onMouseEnter={() => setHoveredItem("carrito")}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => setHoveredItem("carrito")}
                onBlur={() => setHoveredItem(null)}
                className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 transition-colors duration-200 ${
                  hoveredItem === "carrito"
                    ? "bg-white/20 text-[#FFF9EE]"
                    : "text-[#F0D9D8] hover:bg-white/10"
                }`}
                aria-label="Abrir carrito de compras"
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#F0D9D8] shrink-0" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#632D3E] text-[#FFF9EE] border border-[#F0D9D8]/60 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {hoveredItem === "carrito" && (
                  <div
                    className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 flex flex-col items-center"
                    style={{ width: "max-content" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -2, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-2.5 h-2.5 rotate-45 bg-[#4A202B] border-l border-t border-[#F0D9D8]/30 -mb-1 relative z-10" />
                      <div className="px-3.5 py-1.5 rounded-full bg-[#4A202B] text-[#F0D9D8] border border-[#F0D9D8]/30 shadow-[0_8px_20px_rgba(40,15,22,0.4)] whitespace-nowrap text-[10px] uppercase tracking-[0.16em] font-semibold text-center">
                        Carrito {totalItems > 0 ? `(${totalItems})` : ""}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Separador vertical sutil */}
          <span className="h-6 w-[1px] bg-[#F0D9D8]/25 mx-1 sm:mx-2 shrink-0" />

          {/* Botón CTA Borgoña (#632D3E) "Contame de tu evento" */}
          <a
            href="/#contacto"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold bg-[#632D3E] text-[#FFF9EE] border border-[#F0D9D8]/30 hover:bg-[#521827] hover:border-[#F0D9D8]/60 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md whitespace-nowrap shrink-0"
          >
            <Heart className="w-3.5 h-3.5 text-[#F0D9D8] shrink-0" />
            <span>Contame de tu evento ↗</span>
          </a>
        </motion.header>
      </div>

      {/* ========================================================================= */}
      {/* 2. VERSIÓN MÓVIL (< md): Barra cápsula compacta + Drawer Desplegable */}
      {/* ========================================================================= */}
      <div className="fixed top-3 left-0 right-0 z-40 flex md:hidden justify-center px-3 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center justify-between w-full max-w-md px-4 py-2 rounded-full bg-[#705064]/95 backdrop-blur-md border border-[#F0D9D8]/25 shadow-[0_12px_30px_rgba(74,32,43,0.35)]"
        >
          {/* Logo / Monograma Móvil */}
          <Link
            href="/#inicio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-[#F0D9D8]"
            aria-label="Myriam Depetris - Inicio"
          >
            <span className="font-serif text-lg font-bold tracking-tight text-[#F0D9D8]">
              M<span className="italic text-[#D3A3A5]">D.</span>
            </span>
            <span className="font-serif text-xs text-[#F0D9D8]/95 font-medium">
              Myriam Depetris
            </span>
          </Link>

          {/* Acciones Rápidas Móviles: Carrito + Botón Menú */}
          <div className="flex items-center gap-2">
            {/* Botón Carrito */}
            <button
              type="button"
              onClick={alternarDrawer}
              className="relative flex items-center justify-center w-9 h-9 rounded-full text-[#F0D9D8] hover:bg-white/10 transition-colors"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag className="w-[18px] h-[18px] text-[#F0D9D8]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#632D3E] text-[#FFF9EE] border border-[#F0D9D8]/60 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón Toggle Menú */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-[#F0D9D8] hover:bg-white/25 transition-colors"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#F0D9D8]" />
              ) : (
                <Menu className="w-5 h-5 text-[#F0D9D8]" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal / Drawer Desplegable del Menú Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden overflow-y-auto">
            {/* Backdrop con desenfoque suave */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#170C11]/75 backdrop-blur-md"
            />

            {/* Contenedor del Menú Flotante Móvil */}
            <div className="min-h-full flex items-start justify-center p-3 pt-16">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-sm bg-[#FBF8F5] rounded-3xl shadow-2xl border border-[#D7C5BA] overflow-hidden flex flex-col"
              >
                {/* Cabecera del Panel Móvil */}
                <div className="p-4 px-5 bg-[#F5EFE7] border-b border-[#D7C5BA] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-lg font-bold text-[#4A202B]">
                      M<span className="italic text-[#632D3E]">D.</span>
                    </span>
                    <span className="h-4 w-[1px] bg-[#D7C5BA]" />
                    <span className="font-serif text-xs text-[#705064] uppercase tracking-wider font-semibold">
                      Menú de Navegación
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-[#705064] hover:text-[#4A202B] rounded-full hover:bg-[#F0D9D8]/50 transition-colors"
                    aria-label="Cerrar menú"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Lista de Secciones con Iconos y Subtítulos */}
                <nav className="p-3 sm:p-4 space-y-1 overflow-y-auto max-h-[60vh]">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F0D9D8]/45 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#F5EFE7] border border-[#D7C5BA]/70 flex items-center justify-center text-[#632D3E] group-hover:bg-[#632D3E] group-hover:text-[#FFF9EE] transition-colors shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-serif text-base text-[#4A202B] font-medium leading-tight group-hover:text-[#632D3E] transition-colors">
                              {item.label}
                            </p>
                            <p className="text-[11px] text-[#705064] mt-0.5">
                              {item.subtitulo}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#705064] group-hover:text-[#632D3E] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </nav>

                {/* Acciones de Contacto & Botón Borgoña Principal */}
                <div className="p-4 bg-[#F5EFE7] border-t border-[#D7C5BA] space-y-2.5">
                  <a
                    href="/#contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#D3A3A5]" />
                    <span>Contame de tu evento ↗</span>
                  </a>

                  <a
                    href="https://wa.me/5493816408395"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium text-[#4A202B] border border-[#D7C5BA] hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#632D3E]" />
                    <span>WhatsApp Directo</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
