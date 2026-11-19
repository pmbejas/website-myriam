"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    imagen: "/images/real/foto-2.jpg",
    etiqueta: "01 / Portfolio · Baby Shower",
    titulo: "La dulzura de esperar",
    descripcion:
      "Una celebración envuelta en calidez y dulzura, donde cada detalle expresa la ternura de una nueva vida.",
  },
  {
    imagen: "/images/real/foto-10.jpg",
    etiqueta: "02 / Portfolio · Bautismo",
    titulo: "Mesas que cuentan historias",
    descripcion:
      "Cada detalle expresa la ternura y el significado de un encuentro familiar inolvidable.",
  },
  {
    imagen: "/images/real/foto-7.jpg",
    etiqueta: "03 / Portfolio · Servicio de Té",
    titulo: "El arte de sentir y recibir",
    descripcion:
      "Porcelana labrada, iluminación cálida y texturas que invitan a descubrir cada detalle.",
  },
  {
    imagen: "/images/real/foto-13.jpg",
    etiqueta: "04 / Portfolio · Cumpleaños Circense",
    titulo: "La magia del circo",
    descripcion:
      "Una experiencia inmersiva donde la fantasía y la calidez artesanal cobran vida en la mesa.",
  },
];

export function HeroSplit() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slideActual = HERO_SLIDES[currentSlide] || HERO_SLIDES[0]!;

  return (
    <section
      id="inicio"
      className="relative min-h-[94vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden bg-[#F5EFE7]"
    >
      {/* Fondo Sutil de Fotos de Mesas con Blur Suave y Velo Cálido */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.42 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 scale-110 blur-[2px]"
          >
            <Image
              src={slideActual.imagen}
              alt=""
              fill
              className="object-cover object-center animate-slow-zoom"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Velo translúcido cálido que protege la lectura a la izquierda y deja apreciar la mesa a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE7]/80 via-[#F5EFE7]/60 to-[#F5EFE7]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE7]/30 via-transparent to-[#F5EFE7]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Columna Izquierda: Textos originales del modelo V15 + Interactividad */}
        <div className="lg:col-span-7 space-y-6 lg:pr-6">
          {/* Eyebrow animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0D9D8] text-[#4A202B] text-[11px] font-bold tracking-[0.22em] uppercase border border-[#D3A3A5]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#632D3E]" />
            Estilismo de mesas · Tucumán, Argentina
          </motion.div>

          {/* Título Principal del modelo V15 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-[74px] tracking-[-0.05em] text-[#4A202B] leading-[0.95]"
          >
            Mesas con alma.
            <br />
            <em className="italic font-normal text-[#632D3E]">
              Mesas que emocionan.
            </em>
          </motion.h1>

          {/* Párrafo Introductorio original del modelo V15 con alto contraste garantizado */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-[17px] sm:text-[18px] text-[#4A202B] font-normal leading-[1.75] max-w-xl"
          >
            Creamos experiencias sensoriales que despiertan los sentidos y conectan
            emociones. Elementos que dialogan, historias que se cuentan y
            experiencias que llegan al corazón.
          </motion.p>

          {/* Miniaturas Interactivas de Control Rápido del Hero + Acceso al Cotizador */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="pt-6 border-t border-[#D7C5BA] space-y-4 max-w-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      currentSlide === idx
                        ? "border-[#632D3E] scale-110 shadow-md ring-2 ring-[#D3A3A5]"
                        : "border-white/80 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Mostrar ${slide.titulo}`}
                  >
                    <Image
                      src={slide.imagen}
                      alt={slide.titulo}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>

              <a
                href="#concepto"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#632D3E] hover:text-[#4A202B] transition-colors"
              >
                <span className="w-8 h-[1px] bg-[#632D3E]" />
                Deslizá para descubrir
              </a>
            </div>

            {/* Botón que conduce al Cotizador Online */}
            <div className="pt-1">
              <a
                href="#servicios"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all transform hover:-translate-y-0.5 shadow-md group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D3A3A5] group-hover:rotate-12 transition-transform" />
                <span>Visitá nuestras propuestas & cotizador online ↗</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Columna Derecha: Marco Fotográfico con Ken Burns + Controles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#28151B]">
            {/* Insignia Flotante con Movimiento DENTRO del Card */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-5 left-5 z-20 bg-[#FBF8F5]/95 backdrop-blur-md border border-[#D7C5BA] px-3.5 py-2.5 rounded-2xl shadow-lg flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#632D3E] text-[#FFF9EE] flex items-center justify-center font-serif text-sm font-bold shrink-0">
                M
              </div>
              <div>
                <p className="text-xs font-bold text-[#4A202B] leading-tight">
                  Un Universo de Detalles
                </p>
                <p className="text-[11px] font-medium text-[#5E2D3D]">
                  Estilismo & Diseño · Tucumán
                </p>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="relative w-full h-full overflow-hidden"
              >
                <div className="relative w-full h-full animate-slow-zoom">
                  <Image
                    src={slideActual.imagen}
                    alt={slideActual.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D0C12]/90 via-[#1D0C12]/25 to-transparent" />

                {/* Pie de Foto + Controles Inferiores */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F0D9D8] font-bold">
                      {slideActual.etiqueta}
                    </span>
                    <h4 className="font-serif text-2xl text-[#FFF9EE] leading-snug">
                      {slideActual.titulo}
                    </h4>
                    <p className="text-xs text-[#FFF9EE]/90 font-normal leading-relaxed">
                      {slideActual.descripcion}
                    </p>
                  </div>

                  {/* Controles Manuales del Hero */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      {HERO_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2 rounded-full transition-all ${
                            currentSlide === idx
                              ? "w-8 bg-[#F0D9D8]"
                              : "w-2 bg-white/45 hover:bg-white/80"
                          }`}
                          aria-label={`Ir a imagen ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#632D3E] border border-white/30 flex items-center justify-center text-white transition-colors"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#632D3E] border border-white/30 flex items-center justify-center text-white transition-colors"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
