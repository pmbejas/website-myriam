"use client";

import { useState } from "react";
import { HeroSplit } from "@/components/home/HeroSplit";
import { StatementBar } from "@/components/home/StatementBar";
import { SobreMyriam } from "@/components/home/SobreMyriam";
import { GaleriaEventos } from "@/components/home/GaleriaEventos";
import { ServiciosShowcase } from "@/components/home/ServiciosShowcase";
import { TiendaDestacados } from "@/components/home/TiendaDestacados";
import { BookingCTA } from "@/components/home/BookingCTA";
import { CotizadorModal } from "@/components/ui/CotizadorModal";
import { Lightbox } from "@/components/ui/Lightbox";
import { ServicioResponse, EventoPortfolioResponse } from "@/types";
import { SERVICIOS_MOCK } from "@/mocks/serviciosMock";

export default function HomePage() {
  // Estado para el Cotizador Modal
  const [servicioCotizar, setServicioCotizar] = useState<ServicioResponse | null>(null);
  const [isCotizadorOpen, setIsCotizadorOpen] = useState(false);

  // Estado para el Lightbox de la Galería
  const [eventoLightbox, setEventoLightbox] = useState<EventoPortfolioResponse | null>(null);
  const [fotoIndexLightbox, setFotoIndexLightbox] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleAbrirCotizador = (servicio: ServicioResponse) => {
    setServicioCotizar(servicio);
    setIsCotizadorOpen(true);
  };

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

  const handleCotizarDesdeEstilo = (evento: EventoPortfolioResponse) => {
    const servicioAsociado =
      SERVICIOS_MOCK.find((s) => s.id === evento.servicioRelacionadoId) || SERVICIOS_MOCK[0]!;
    handleAbrirCotizador(servicioAsociado);
  };

  return (
    <div className="w-full">
      {/* 1. Hero Split Screen con Slideshow Real */}
      <HeroSplit />

      {/* Cintillo Statement de Marca */}
      <StatementBar />

      {/* 2. El Arte y Filosofía de Myriam */}
      <SobreMyriam />

      {/* 3. Portfolio / Galería de Mesas Previas (Tercer Lugar) */}
      <GaleriaEventos
        onAbrirLightbox={handleAbrirLightbox}
        onCotizarEvento={handleCotizarDesdeEstilo}
      />

      {/* 4. Showcase de Servicios & Acceso a Cotizador */}
      <ServiciosShowcase onSelectServicio={handleAbrirCotizador} />

      {/* 5. Tienda de Objetos de Mesa Destacados */}
      <TiendaDestacados />

      {/* 6. Llamado a la Acción y Contacto Directo */}
      <BookingCTA />

      {/* Modal Interactivo del Cotizador */}
      <CotizadorModal
        servicio={servicioCotizar}
        isOpen={isCotizadorOpen}
        onClose={() => setIsCotizadorOpen(false)}
      />

      {/* Visor Lightbox a Pantalla Completa */}
      <Lightbox
        evento={eventoLightbox}
        fotoIndex={fotoIndexLightbox}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNextFoto}
        onPrev={handlePrevFoto}
        onCotizarEstilo={handleCotizarDesdeEstilo}
      />
    </div>
  );
}
