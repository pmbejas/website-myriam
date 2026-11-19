"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Sparkles } from "lucide-react";

const CINCO_SENTIDOS = [
  {
    numero: "01 · Vista",
    descripcion: "Colores, flores y luz que despiertan el asombro.",
  },
  {
    numero: "02 · Tacto",
    descripcion: "Texturas y materiales que invitan a descubrir cada detalle.",
  },
  {
    numero: "03 · Olfato",
    descripcion: "La presencia sutil de las flores y los aromas del encuentro.",
  },
  {
    numero: "04 · Oído",
    descripcion: "La música y las voces que dan ritmo a los recuerdos.",
  },
  {
    numero: "05 · Gusto",
    descripcion: "Sabores compartidos alrededor de una mesa que convoca.",
  },
];

const PILARES_EXPERIENCIA = [
  {
    id: "direccion",
    titulo: "Dirección estética",
    parrafos: [
      "Cada celebración comienza con una idea. Diseñamos una propuesta estética personalizada, en la que estudiamos la armonía de colores, las texturas, las proporciones y la disposición de cada elemento para crear mesas con identidad propia.",
      "La dirección estética define el concepto que une todos los detalles de la experiencia.",
    ],
  },
  {
    id: "curaduria",
    titulo: "Curaduría de vajilla y textiles",
    parrafos: [
      "Seleccionamos cuidadosamente las piezas de cada puesta en escena: manteles de algodón, caminos de mesa, servilletas, individuales de fibras naturales, porcelana ilustrada o labrada, platos de postre, cristalería de diseño y cubiertos dorados mate.",
      "Para almuerzos y cenas: composición de mesa con platos de sitio, vajilla de porcelana, cristalería y cubiertos.",
      "Para servicios de té: tazas de porcelana estampada o lisa labrada con sus platos, teteras, azucareras, lecheras y cucharitas doradas.",
      "Cada selección se adapta a la modalidad y al estilo de la celebración.",
    ],
  },
  {
    id: "flores",
    titulo: "Flores y objetos",
    parrafos: [
      "La ambientación reúne flores naturales de estación, floreros de vidrio, lámparas LED de luz cálida, muñecos artesanales y objetos decorativos seleccionados según la temática.",
      "Buscamos una composición equilibrada y sensible, donde cada pieza tenga una intención y aporte a la atmósfera del encuentro.",
    ],
  },
  {
    id: "montaje",
    titulo: "Montaje personalizado",
    parrafos: [
      "Materializamos la propuesta a través del armado temático, la composición artística y el estilismo presencial de todas las mesas del evento.",
      "El servicio incluye personal para el retiro y cuidado de la vajilla, además de la logística de envío y retiro sin cargo en San Miguel de Tucumán, Yerba Buena y Tafí Viejo, según las condiciones de la propuesta.",
    ],
  },
];

export function SobreMyriam() {
  const [acordeonAbierto, setAcordeonAbierto] = useState<string | null>("direccion");
  const [sentidoActivo, setSentidoActivo] = useState<number | null>(null);

  const toggleAcordeon = (id: string) => {
    setAcordeonAbierto((prev) => (prev === id ? null : id));
  };

  return (
    <section id="concepto" className="bg-[#FBF8F5] overflow-hidden">
      {/* BLOQUE 1: Panel Sensorial ("Cinco sentidos. Una emoción que permanece.") */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FBF8F5] via-[#F8F3EC] to-[#FBF8F5]">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-[#632D3E]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Nuestra esencia · Experiencias sensoriales
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-[64px] text-[#4A202B] leading-[1.06] tracking-[-0.04em] max-w-4xl mx-auto"
          >
            Cinco sentidos.
            <br />
            <em className="italic font-normal text-[#632D3E]">
              Una emoción que permanece.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-[17px] sm:text-[18px] text-[#4A202B] font-normal leading-[1.8] max-w-2xl mx-auto"
          >
            Creemos en las mesas que enamoran, convocan y emocionan. En las que
            cada elemento dialoga con el siguiente y convierte una celebración en
            una historia compartida.
          </motion.p>

          {/* Grilla Interactiva de los 5 Sentidos con Entrada Escalonada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-8 text-left">
            {CINCO_SENTIDOS.map((sentido, idx) => {
              const isSelected = sentidoActivo === idx;
              return (
                <motion.div
                  key={sentido.numero}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSentidoActivo(isSelected ? null : idx)}
                  className={`cursor-pointer rounded-2xl p-6 transition-colors duration-300 border-t-4 ${
                    isSelected
                      ? "bg-[#632D3E] text-[#FFF9EE] border-t-[#D3A3A5] shadow-xl"
                      : "bg-[#FBF8F5] text-[#4A202B] border-t-[#632D3E] border border-[#D7C5BA] hover:bg-[#F0D9D8]/60 shadow-sm hover:shadow-lg"
                  }`}
                >
                  <span
                    className={`block text-xs uppercase tracking-[0.15em] font-bold ${
                      isSelected ? "text-[#F0D9D8]" : "text-[#632D3E]"
                    }`}
                  >
                    {sentido.numero}
                  </span>
                  <p
                    className={`text-[15px] leading-[1.6] mt-3 font-normal ${
                      isSelected ? "text-[#FFF9EE]" : "text-[#4A202B]"
                    }`}
                  >
                    {sentido.descripcion}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic text-2xl sm:text-3xl text-[#632D3E] pt-8"
          >
            Mesas con alma. Experiencias que llegan al corazón.
          </motion.p>
        </div>
      </div>

      {/* BLOQUE 2: La Experiencia ("El arte de sentir y recibir" + Acordeón del modelo HTML) */}
      <div id="propuesta" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#FBF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Fotografía Real Vertical Optimizada */}
          <motion.div
            initial={{ opacity: 0, x: -45, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3.8] max-h-[440px] sm:max-h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EAE0D5]">
              <Image
                src="/images/real/foto-9.jpg"
                alt="Detalle de mesa y estilismo real de Myriam Depetris"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#5E2D3D] font-semibold px-2">
              <span>Curaduría Presencial</span>
              <span>Tucumán · Yerba Buena · Tafí Viejo</span>
            </div>
          </motion.div>

          {/* Columna Derecha: Texto + Acordeón Interactivo Optimizado */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-4 sm:space-y-5"
          >
            <div className="text-xs uppercase tracking-[0.22em] font-bold text-[#632D3E]">
              02 / La experiencia
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#4A202B] leading-[1.06] tracking-[-0.03em]">
              El arte de
              <br />
              <em className="italic font-normal text-[#632D3E]">
                sentir y recibir.
              </em>
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#4A202B] font-normal leading-[1.7] max-w-2xl">
              No repetimos fórmulas. Concebimos mesas sensoriales: cada elección
              estética invita a mirar, tocar, escuchar, percibir aromas y compartir
              sabores. Diseñamos el estilismo integral de cada celebración.
            </p>

            {/* Acordeón Interactivo con Entrada Escalonada */}
            <div className="pt-3 border-t border-[#D7C5BA]">
              {PILARES_EXPERIENCIA.map((pilar, idx) => {
                const isOpen = acordeonAbierto === pilar.id;
                return (
                  <motion.div
                    key={pilar.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="border-b border-[#D7C5BA] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAcordeon(pilar.id)}
                      className="w-full py-3 sm:py-3.5 flex items-center justify-between gap-4 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-serif text-xl sm:text-2xl transition-colors ${
                          isOpen
                            ? "text-[#632D3E] font-medium"
                            : "text-[#4A202B] group-hover:text-[#632D3E]"
                        }`}
                      >
                        {pilar.titulo}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#632D3E] border-[#632D3E] text-[#FFF9EE] rotate-45"
                            : "border-[#4A202B]/40 text-[#4A202B] group-hover:bg-[#F0D9D8]"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pr-4 space-y-2 text-[14px] leading-[1.7] text-[#4A202B] font-normal">
                            {pilar.parrafos.map((parrafo, i) => {
                              const tieneNegrita =
                                parrafo.startsWith("Para almuerzos y cenas:") ||
                                parrafo.startsWith("Para servicios de té:");
                              if (tieneNegrita) {
                                const partes = parrafo.split(":");
                                return (
                                  <p key={i}>
                                    <strong className="font-semibold text-[#632D3E]">
                                      {partes[0]}:
                                    </strong>
                                    {partes.slice(1).join(":")}
                                  </p>
                                );
                              }
                              return <p key={i}>{parrafo}</p>;
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
