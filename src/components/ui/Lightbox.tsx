"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { EventoPortfolioResponse } from "@/types";

interface LightboxProps {
  evento: EventoPortfolioResponse | null;
  fotoIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onCotizarEstilo?: (evento: EventoPortfolioResponse) => void;
}

export function Lightbox({
  evento,
  fotoIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onCotizarEstilo,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !evento) return null;

  const fotoActual = evento.galeriaFotos[fotoIndex] || evento.imagenPrincipal;
  const totalFotos = evento.galeriaFotos.length || 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#170C11]/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md"
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between text-[#FBF8F5] z-10">
          <div className="space-y-0.5">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D3A3A5] font-medium">
              {evento.categoriaLabel} · {evento.fechaTexto}
            </span>
            <h4 className="font-serif text-lg sm:text-xl text-[#FFF9EE]">{evento.titulo}</h4>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest text-[#FBF8F5]/60">
              {fotoIndex + 1} / {totalFotos}
            </span>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-white/20 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenedor de Imagen Central */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
            <Image
              src={fotoActual}
              alt={evento.titulo}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Flecha Izquierda */}
          {totalFotos > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/20 text-white hover:bg-black/70 transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Flecha Derecha */}
          {totalFotos > 1 && (
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/20 text-white hover:bg-black/70 transition-colors"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Barra inferior */}
        <div className="max-w-3xl mx-auto w-full text-center space-y-3 z-10">
          <p className="text-xs sm:text-sm text-[#FBF8F5]/80 font-light leading-relaxed">
            {evento.descripcion}
          </p>
          {onCotizarEstilo && (
            <button
              onClick={() => {
                onClose();
                onCotizarEstilo(evento);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D3A3A5]" />
              Cotizar este Estilo de Mesa
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
