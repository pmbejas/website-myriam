"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ZoomIn, ArrowLeft, Heart } from "lucide-react";
import { EVENTOS_MOCK } from "@/mocks/eventosMock";
import { SERVICIOS_MOCK } from "@/mocks/serviciosMock";
import { CategoriaEvento, EventoPortfolioResponse, ServicioResponse } from "@/types";
import { Lightbox } from "@/components/ui/Lightbox";
import { CotizadorModal } from "@/components/ui/CotizadorModal";

const CATEGORIAS_FILTRO: { id: CategoriaEvento; label: string }[] = [
  { id: "todas", label: "Todos los encuentros" },
  { id: "baby_shower", label: "Baby Shower" },
  { id: "bautismos", label: "Bautismos" },
  { id: "cumpleanos", label: "Cumpleaños" },
  { id: "te", label: "Mesas de Té" },
  { id: "bodas", label: "Bodas de Gala" },
  { id: "cenas", label: "Cenas Privadas" },
];

export default function PortfolioPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaEvento>("todas");

  // Estado para el Lightbox
  const [eventoLightbox, setEventoLightbox] = useState<EventoPortfolioResponse | null>(null);
  const [fotoIndexLightbox, setFotoIndexLightbox] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Estado para el Cotizador Modal
  const [servicioCotizar, setServicioCotizar] = useState<ServicioResponse | null>(null);
  const [isCotizadorOpen, setIsCotizadorOpen] = useState(false);

  const eventosFiltrados =
    categoriaActiva === "todas"
      ? EVENTOS_MOCK
      : EVENTOS_MOCK.filter((e) => e.categoria === categoriaActiva);

  const handleAbrirLightbox = (evento: EventoPortfolioResponse, indexFoto: number) => {
    setEventoLightbox(evento);
    setFotoIndexLightbox(indexFoto);
    setIsLightboxOpen(true);
  };

  const handleNextFoto = () => {
    if (!eventoLightbox) return;
    setFotoIndexLightbox((prev) => (prev + 1) % eventoLightbox.galeriaFotos.length);
  };

  const handlePrevFoto = () => {
    if (!eventoLightbox) return;
    setFotoIndexLightbox((prev) =>
      prev === 0 ? eventoLightbox.galeriaFotos.length - 1 : prev - 1
    );
  };

  const handleCotizarEvento = (evento: EventoPortfolioResponse) => {
    const servicioAsociado =
      SERVICIOS_MOCK.find((s) => s.id === evento.servicioRelacionadoId) || SERVICIOS_MOCK[0]!;
    setServicioCotizar(servicioAsociado);
    setIsCotizadorOpen(true);
  };

  return (
    <div className="w-full bg-[#F5EFE7] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navegación de Regreso y Migas de Pan */}
        <div className="flex items-center justify-between border-b border-[#D7C5BA] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#632D3E] hover:text-[#4A202B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#4A202B]/60 font-medium">
            Inicio · Portfolio Completo
          </span>
        </div>

        {/* Cabecera Editorial Principal */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-[#632D3E]">
            <Sparkles className="w-3.5 h-3.5" />
            Catálogo Integral de Estilismo & Puestas en Escena
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] text-[#4A202B] leading-[1.05] tracking-[-0.04em]">
            Mesas que conmueven.
            <br />
            <em className="italic font-normal text-[#632D3E]">
              El archivo visual de nuestros encuentros.
            </em>
          </h1>
          <p className="text-[16px] sm:text-[17px] text-[#4A202B] font-normal leading-[1.8] max-w-2xl">
            Cada evento es una obra única diseñada a medida. Explorá las ambientaciones,
            detalles botánicos, vajilla de autor y armonía textil de más de 180 celebraciones
            reales realizadas en Tucumán y alrededores.
          </p>
        </div>

        {/* Filtros Interactivos por Categoría */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#D7C5BA]">
          {CATEGORIAS_FILTRO.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.13em] font-semibold transition-all duration-300 ${
                categoriaActiva === cat.id
                  ? "bg-[#632D3E] text-[#FFF9EE] shadow-md scale-105"
                  : "bg-[#FBF8F5] text-[#4A202B] border border-[#D7C5BA] hover:bg-[#F0D9D8] hover:border-[#632D3E]/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Listado Completo de Eventos con Grilla Uniforme */}
        <div className="space-y-20 pt-4">
          <AnimatePresence mode="popLayout">
            {eventosFiltrados.map((evento, idx) => {
              const fotos = evento.galeriaFotos;
              const numEvento = String(idx + 1).padStart(2, "0");

              return (
                <motion.article
                  key={evento.id}
                  layout
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-16 border-b border-[#D7C5BA] last:border-b-0 last:pb-0 space-y-8"
                >
                  {/* Encabezado del Evento */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#632D3E]">
                        {numEvento} / Portfolio · {evento.categoriaLabel}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl text-[#4A202B] leading-[1.1] tracking-[-0.03em]">
                        {evento.titulo}
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:max-w-xl">
                      <p className="text-[15px] text-[#4A202B] font-normal leading-[1.7] flex-1">
                        {evento.descripcion}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCotizarEvento(evento)}
                        className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.13em] font-semibold bg-[#FBF8F5] text-[#4A202B] border border-[#4A202B] hover:bg-[#632D3E] hover:text-[#FFF9EE] hover:border-[#632D3E] transition-all duration-300"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#632D3E]" />
                        Cotizar este estilo ↗
                      </button>
                    </div>
                  </div>

                  {/* Grilla Fotográfica Uniforme de 4 Columnas */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {fotos.map((fotoUrl, fIdx) => (
                      <motion.figure
                        key={fIdx}
                        whileHover={{ y: -6, scale: 1.015 }}
                        onClick={() => handleAbrirLightbox(evento, fIdx)}
                        className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E7D9CC] border border-[#D7C5BA] shadow-sm hover:shadow-xl cursor-zoom-in"
                      >
                        <Image
                          src={fotoUrl}
                          alt={`${evento.titulo} — Fotografía ${fIdx + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1D0C12]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Etiqueta VER FOTO ↗ */}
                        <span className="absolute bottom-4 right-4 px-3.5 py-2 rounded-lg bg-[#FBF8F5]/95 text-[#4A202B] text-[10px] font-bold uppercase tracking-[0.15em] shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5 text-[#632D3E]" />
                          Ver Foto ↗
                        </span>
                      </motion.figure>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Llamado a la Acción al Final del Portfolio */}
        <div className="mt-20 p-8 sm:p-14 rounded-3xl bg-[#FBF8F5] border border-[#D7C5BA] text-center space-y-6 shadow-md">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-bold text-[#632D3E]">
            <Heart className="w-3.5 h-3.5" />
            ¿Tenés una fecha en mente?
          </div>
          <h3 className="font-serif text-3xl sm:text-5xl text-[#4A202B] max-w-2xl mx-auto leading-tight">
            Diseñemos juntos la mesa para tu próxima celebración.
          </h3>
          <p className="text-[15px] sm:text-[17px] text-[#4A202B]/85 max-w-xl mx-auto leading-relaxed">
            Escribinos contándonos tu idea, fecha y cantidad de invitados. Prepararemos una propuesta
            estética y sensorial pensada para vos.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Contame de tu evento ↗</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-transparent text-[#4A202B] border border-[#4A202B]/40 hover:bg-[#F0D9D8] transition-all"
            >
              <span>Volver a la portada</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Interactivo */}
      {isLightboxOpen && eventoLightbox && (
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          evento={eventoLightbox}
          fotoIndex={fotoIndexLightbox}
          onNext={handleNextFoto}
          onPrev={handlePrevFoto}
          onCotizarEstilo={handleCotizarEvento}
        />
      )}

      {/* Modal de Cotización */}
      {isCotizadorOpen && (
        <CotizadorModal
          isOpen={isCotizadorOpen}
          onClose={() => setIsCotizadorOpen(false)}
          servicio={servicioCotizar}
        />
      )}
    </div>
  );
}