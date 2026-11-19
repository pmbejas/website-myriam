"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function BookingCTA() {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [fecha, setFecha] = useState("");
  const [invitados, setInvitados] = useState("");
  const [tipo, setTipo] = useState("");
  const [idea, setIdea] = useState("");
  const [textoGenerado, setTextoGenerado] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !contacto.trim() || !fecha || !invitados || !tipo) {
      toast.error("Por favor completá los campos obligatorios (*)");
      return;
    }

    const msg = `Hola, quisiera consultar por el servicio de diseño y estilismo de mesas.\nNombre: ${nombre}\nContacto: ${contacto}\nFecha: ${fecha}\nInvitados: ${invitados}\nCelebración: ${tipo}\nIdea: ${
      idea.trim() || "A definir"
    }\nEntiendo que la consulta no confirma una reserva.`;

    setTextoGenerado(msg);
    const url = `https://wa.me/5493816408395?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Abriendo WhatsApp con tu solicitud...");
  };

  const handleCopiar = () => {
    if (!textoGenerado) return;
    navigator.clipboard.writeText(textoGenerado);
    setCopiado(true);
    toast.success("Consulta copiada al portapapeles");
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <section
      id="contacto"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F0D9D8]/35 border-t border-[#D7C5BA] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Columna Izquierda: Textos Originales del Modelo HTML V15 */}
        <motion.div
          initial={{ opacity: 0, x: -35, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="text-xs uppercase tracking-[0.22em] font-bold text-[#632D3E] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            03 / Tu próxima celebración
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[60px] text-[#4A202B] leading-[1.03] tracking-[-0.04em]">
            Creemos una experiencia
            <br />
            <em className="italic font-normal text-[#632D3E]">
              que llegue al corazón.
            </em>
          </h2>

          <p className="text-[16px] text-[#4A202B] font-normal leading-[1.8]">
            Contanos qué estás imaginando. A partir de tu fecha, tipo de evento
            y cantidad de invitados, prepararemos una propuesta personalizada.
          </p>

          <div className="p-5 rounded-2xl bg-[#FBF8F5] border border-[#D7C5BA] text-sm text-[#4A202B] leading-relaxed">
            <strong className="font-bold text-[#632D3E]">Importante:</strong>{" "}
            enviar una solicitud no confirma la reserva. La fecha queda sujeta a
            disponibilidad y aceptación de la propuesta.
          </div>
        </motion.div>

        {/* Columna Derecha: Formulario Completo del Modelo HTML V15 */}
        <motion.div
          initial={{ opacity: 0, x: 35, y: 25 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-[#FBF8F5] p-6 sm:p-10 rounded-3xl shadow-xl border border-[#D7C5BA]"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="block text-[11px] uppercase tracking-[0.16em] font-bold text-[#4A202B] mb-2"
              >
                Tu nombre *
              </label>
              <input
                id="nombre"
                type="text"
                required
                placeholder="Nombre y apellido"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-white border border-[#C6A8AC] rounded-xl px-4 py-3.5 text-sm text-[#4A202B] placeholder:text-[#705064]/70 focus:outline-none focus:ring-2 focus:ring-[#632D3E]"
              />
            </div>

            <div>
              <label
                htmlFor="contacto-input"
                className="block text-[11px] uppercase tracking-[0.16em] font-bold text-[#4A202B] mb-2"
              >
                WhatsApp o correo electrónico *
              </label>
              <input
                id="contacto-input"
                type="text"
                required
                placeholder="¿Cómo podemos contactarte?"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                className="w-full bg-white border border-[#C6A8AC] rounded-xl px-4 py-3.5 text-sm text-[#4A202B] placeholder:text-[#705064]/70 focus:outline-none focus:ring-2 focus:ring-[#632D3E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fecha"
                  className="block text-[11px] uppercase tracking-[0.16em] font-bold text-[#4A202B] mb-2"
                >
                  Fecha del evento *
                </label>
                <input
                  id="fecha"
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full bg-white border border-[#C6A8AC] rounded-xl px-4 py-3.5 text-sm text-[#4A202B] focus:outline-none focus:ring-2 focus:ring-[#632D3E]"
                />
              </div>

              <div>
                <label
                  htmlFor="invitados"
                  className="block text-[11px] uppercase tracking-[0.16em] font-bold text-[#4A202B] mb-2"
                >
                  Cantidad de invitados *
                </label>
                <input
                  id="invitados"
                  type="number"
                  min="1"
                  required
                  placeholder="Ej. 50"
                  value={invitados}
                  onChange={(e) => setInvitados(e.target.value)}
                  className="w-full bg-white border border-[#C6A8AC] rounded-xl px-4 py-3.5 text-sm text-[#4A202B] placeholder:text-[#705064]/70 focus:outline-none focus:ring-2 focus:ring-[#632D3E]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tipo"
                className="block text-[11px] uppercase tracking-[0.16em] font-bold text-[#4A202B] mb-2"
              >
                Tipo de celebración *
              </label>
              <select
                id="tipo"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full bg-white border border-[#C6A8AC] rounded-xl px-4 py-3.5 text-sm text-[#4A202B] focus:outline-none focus:ring-2 focus:ring-[#632D3E]"
              >
                <option value="">Seleccionar</option>
                <option value="Baby shower">Baby shower</option>
                <option value="Bautismo">Bautismo</option>
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Té / Tea party">Té / Tea party</option>
                <option value="Casamiento / Civil">Casamiento / Civil</option>
                <option value="Otro evento">Otro evento</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="idea"
                className="block text-[11px] uppercase tracking-[0.16em] font-bold text-[#4A202B] mb-2"
              >
                Contanos tu idea
              </label>
              <textarea
                id="idea"
                rows={3}
                placeholder="Colores, temática, lugar, estilo que imaginás..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full bg-white border border-[#C6A8AC] rounded-xl px-4 py-3.5 text-sm text-[#4A202B] placeholder:text-[#705064]/70 focus:outline-none focus:ring-2 focus:ring-[#632D3E] resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full text-xs uppercase tracking-[0.14em] font-bold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all transform hover:-translate-y-0.5 shadow-md"
            >
              Enviar consulta por WhatsApp ↗
            </button>

            <p className="text-xs text-[#4A202B] text-center font-normal">
              La consulta se abrirá en WhatsApp para que puedas enviarla. No
              implica una reserva confirmada.
            </p>

            {/* Recuadro de copia rápida (del modelo HTML V15) */}
            {textoGenerado && (
              <div className="p-4 rounded-xl bg-white border border-[#C6A8AC] space-y-3 mt-4">
                <p className="text-xs font-bold text-[#4A202B]">
                  Tu solicitud está lista para copiar:
                </p>
                <textarea
                  readOnly
                  value={textoGenerado}
                  rows={5}
                  className="w-full text-xs p-3 bg-[#FBF8F5] border border-[#D7C5BA] rounded-lg text-[#4A202B]"
                />
                <button
                  type="button"
                  onClick={handleCopiar}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold border border-[#4A202B] text-[#4A202B] hover:bg-[#632D3E] hover:text-white transition-colors"
                >
                  {copiado ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Consulta copiada
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar consulta
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
