"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ZoomIn, ArrowRight } from "lucide-react";
import { EVENTOS_MOCK } from "@/mocks/eventosMock";
import { EventoPortfolioResponse } from "@/types";

interface GaleriaEventosProps {
  onAbrirLightbox: (evento: EventoPortfolioResponse, indexFoto: number) => void;
  onCotizarEvento?: (evento: EventoPortfolioResponse) => void;
}

export function GaleriaEventos({
  onAbrirLightbox,
  onCotizarEvento,
}: GaleriaEventosProps) {
  // En la Home se muestran exclusivamente los 3 primeros eventos (favoritos/destacados)
  const eventosDestacados = EVENTOS_MOCK.filter(
    (e) => e.esDestacado
  ).slice(0, 3);

  return (
    <section id="galeria" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE7] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Cabecera Editorial del Modelo HTML V15 con Botón a Portfolio Completo */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D7C5BA]/35 pb-8"
        >
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.24em] font-bold text-[#632D3E]">
              01 / Eventos reales destacados
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[64px] text-[#4A202B] leading-[1.02] tracking-[-0.04em]">
              Mesas que convocan.
              <br />
              <em className="italic font-normal text-[#632D3E]">
                Historias que se celebran.
              </em>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col sm:items-start lg:items-end gap-4 max-w-md">
            <p className="text-[16px] text-[#4A202B] font-normal leading-[1.75]">
              Cada mesa es única. Una selección de encuentros destacados donde los elementos
              dialogan, cuentan historias y conectan emociones.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all shadow-md shrink-0"
            >
              <span>Ver todos los eventos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Historias Editoriales de Eventos Destacados (Grilla Uniforme de 4 Columnas) */}
        <div className="space-y-20">
          {eventosDestacados.map((evento, idx) => {
            const fotos = evento.galeriaFotos;
            const numEvento = String(idx + 1).padStart(2, "0");

            return (
              <motion.article
                key={evento.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="pb-16 border-b border-[#D7C5BA]/35 last:border-b-0 last:pb-0 space-y-8"
              >
                {/* Encabezado de la Historia */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.65 }}
                  className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#632D3E]">
                      {numEvento} / Portfolio · {evento.categoriaLabel}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#4A202B] leading-[1.08] tracking-[-0.03em]">
                      {evento.titulo.split(" · ")[0]}
                    </h3>
                  </div>

                  <div className="lg:max-w-xl">
                    <p className="text-[15px] text-[#4A202B] font-normal leading-[1.7]">
                      {evento.descripcion}
                    </p>
                  </div>
                </motion.div>

                {/* Mosaico Fotográfico Estandarizado (4 columnas fijas en desktop para todos) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {fotos.map((fotoUrl, fIdx) => (
                    <motion.figure
                      key={fIdx}
                      initial={{ opacity: 0, y: 40, scale: 0.93 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{
                        duration: 0.65,
                        delay: fIdx * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -8, scale: 1.015 }}
                      onClick={() => onAbrirLightbox(evento, fIdx)}
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
        </div>

        {/* Banner Inferior: Descubrí el Portfolio Completo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#FBF8F5] border border-[#D7C5BA] text-center space-y-6 shadow-sm"
        >
          <div className="text-xs uppercase tracking-[0.24em] font-bold text-[#632D3E]">
            Colección Completa · Más de 180 celebraciones
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#4A202B] max-w-2xl mx-auto leading-tight">
            Descubrí todas las puestas en escena y ambientaciones que creamos con el corazón.
          </h3>
          <p className="text-[15px] sm:text-[16px] text-[#4A202B]/80 max-w-xl mx-auto leading-relaxed">
            Explorá nuestra galería completa de Baby Showers, Bautismos, Mesas de Té, Bodas de Gala y Cenas Privadas con fotografías reales en alta resolución.
          </p>
          <div className="pt-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Ver todos los eventos (+180 mesas diseñadas)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
