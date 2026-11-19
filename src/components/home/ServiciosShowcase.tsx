"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Sparkles, ArrowRight, Store, PartyPopper } from "lucide-react";
import { SERVICIOS_MOCK } from "@/mocks/serviciosMock";
import { ServicioResponse } from "@/types";

interface ServiciosShowcaseProps {
  onSelectServicio: (servicio: ServicioResponse) => void;
}

export function ServiciosShowcase({ onSelectServicio }: ServiciosShowcaseProps) {
  return (
    <section id="servicios" className="bg-[#FBF8F5] overflow-hidden">
      {/* Catálogo de Servicios de Autor (Cards Compactos) */}
      <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 sm:space-y-7">
        {/* Cabecera de Sección Compacta */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 border-b border-[#D7C5BA]/40 pb-3"
        >
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#632D3E] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Servicios Exclusivos & Cotizador Online
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#4A202B] leading-snug">
              Diseño sensorial para celebraciones y vidrieras.
            </h2>
          </div>
          <p className="text-xs text-[#705064] font-normal max-w-xs leading-relaxed shrink-0">
            Elegí tu propuesta, completá el formulario y sumá tu fecha al carrito.
          </p>
        </motion.div>

        {/* Grilla Equilibrada de 2 Cards (Optimizada en Altura para todo monitor) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {SERVICIOS_MOCK.map((servicio, idx) => {
            const esMesas = servicio.categoria === "mesas";

            return (
              <motion.article
                key={servicio.id}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#D7C5BA] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Imagen Portada con Altura Compacta (~145px) */}
                  <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden bg-[#EAE0D5]">
                    <Image
                      src={servicio.imagenPortada}
                      alt={servicio.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge de Categoría Delicado */}
                    <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#FFF9EE] bg-[#4A202B]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs">
                      {esMesas ? (
                        <>
                          <PartyPopper className="w-3 h-3 text-[#D3A3A5]" />
                          Celebraciones Sociales
                        </>
                      ) : (
                        <>
                          <Store className="w-3 h-3 text-[#D3A3A5]" />
                          Boutiques & Locales
                        </>
                      )}
                    </span>
                  </div>

                  {/* Contenido Editorial Compacto */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#4A202B] group-hover:text-[#632D3E] transition-colors leading-snug">
                        {servicio.nombre}
                      </h3>
                      {servicio.subtitulo && (
                        <p className="text-[10px] uppercase tracking-wider text-[#632D3E] font-semibold mt-0.5">
                          {servicio.subtitulo}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-[#4A202B]/85 font-normal leading-relaxed line-clamp-2">
                      {servicio.descripcionCorta}
                    </p>

                    {/* Síntesis compacta de lo que incluye */}
                    <div className="pt-2 border-t border-[#D7C5BA]/50 flex items-center gap-1.5 text-[11px] text-[#705064]">
                      <Check className="w-3.5 h-3.5 text-[#632D3E] shrink-0" />
                      <span className="truncate">
                        {esMesas
                          ? "Vajilla completa, cristalería, lino, flores y montaje presencial"
                          : "Diseño escenográfico, curaduría de objetos y montaje comercial"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pie de Tarjeta Compacto con Botón Directo */}
                <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-[#D7C5BA]/40 bg-[#FBF8F5] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#632D3E]">
                    Presupuesto a medida
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectServicio(servicio)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all transform hover:-translate-y-0.5 shadow-xs"
                  >
                    <span>{esMesas ? "Configurar Evento" : "Consultar Vidriera"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
