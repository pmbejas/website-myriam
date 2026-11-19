"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Users,
  Sparkles,
  Check,
  Info,
  Store,
  Compass,
  FileText,
  Building,
} from "lucide-react";
import {
  ServicioResponse,
  TipoEvento,
  ServicioOpcionExtra,
  CotizacionServicioConfig,
} from "@/types";
import {
  TIPOS_EVENTO_MOCK,
  RUBROS_COMERCIALES_MOCK,
  TIPOS_INTERVENCION_VIDRIERA_MOCK,
} from "@/mocks/serviciosMock";
import { useCarritoStore } from "@/store/useCarritoStore";
import { toast } from "sonner";

interface CotizadorModalProps {
  servicio: ServicioResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CotizadorModal({ servicio, isOpen, onClose }: CotizadorModalProps) {
  const { agregarServicio } = useCarritoStore();

  // Estados generales
  const [fechaEvento, setFechaEvento] = useState<string>("");
  const [extrasSeleccionados, setExtrasSeleccionados] = useState<ServicioOpcionExtra[]>([]);
  const [notasEspeciales, setNotasEspeciales] = useState<string>("");

  // Estados específicos de Estilismo de Mesas
  const [tipoEvento, setTipoEvento] = useState<TipoEvento>("cumpleanos");
  const [edadCumpleanos, setEdadCumpleanos] = useState<number>(30);
  const [cantidadComensales, setCantidadComensales] = useState<number>(8);
  const [tematica, setTematica] = useState<string>("");

  // Estados específicos de Vidrieras Comerciales
  const [rubroComercial, setRubroComercial] = useState<string>("moda");
  const [tipoIntervencion, setTipoIntervencion] = useState<string>("vidriera_autor");
  const [nombreComercio, setNombreComercio] = useState<string>("");
  const [dimensionesVidriera, setDimensionesVidriera] = useState<string>("estandar");

  // Fecha mínima: 7 días a futuro
  useEffect(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 7);
    const yyyy = minDate.getFullYear();
    const mm = String(minDate.getMonth() + 1).padStart(2, "0");
    const dd = String(minDate.getDate()).padStart(2, "0");
    setFechaEvento(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sincronizar estado cuando cambia el servicio
  useEffect(() => {
    if (servicio) {
      if (servicio.tipoEventoDefault) {
        setTipoEvento(servicio.tipoEventoDefault);
      }
      setCantidadComensales(servicio.comensalesBase || 8);
      setExtrasSeleccionados([]);
      setNotasEspeciales("");
      setTematica("");
      setNombreComercio("");
    }
  }, [servicio]);

  if (!isOpen || !servicio) return null;

  const esMesas = servicio.categoria === "mesas";

  // Cálculo dinámico de precio
  const calcularTotal = () => {
    let total = servicio.precioBase;

    if (esMesas) {
      if (cantidadComensales > servicio.comensalesBase) {
        const extraPersonas = cantidadComensales - servicio.comensalesBase;
        total += extraPersonas * servicio.precioPorComensalAdicional;
      }
    } else {
      // Si es vidriera grande / doble
      if (dimensionesVidriera === "doble") {
        total += 45000;
      } else if (dimensionesVidriera === "integral") {
        total += 85000;
      }
    }

    const totalExtras = extrasSeleccionados.reduce((sum, e) => sum + e.precioExtra, 0);
    return total + totalExtras;
  };

  const precioTotal = calcularTotal();

  const formatearPrecio = (monto: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(monto);
  };

  const toggleExtra = (extra: ServicioOpcionExtra) => {
    if (extrasSeleccionados.some((e) => e.id === extra.id)) {
      setExtrasSeleccionados(extrasSeleccionados.filter((e) => e.id !== extra.id));
    } else {
      setExtrasSeleccionados([...extrasSeleccionados, extra]);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (!fechaEvento) {
      toast.error("Por favor selecciona una fecha estimada");
      return;
    }

    if (!esMesas && !nombreComercio.trim()) {
      toast.error("Por favor indica el nombre de tu local o marca");
      return;
    }

    const config: CotizacionServicioConfig = {
      servicioId: servicio.id,
      nombreServicio: servicio.nombre,
      categoriaServicio: servicio.categoria,
      tipoEvento: esMesas ? tipoEvento : undefined,
      rubroComercial: !esMesas ? rubroComercial : undefined,
      tipoIntervencion: !esMesas ? tipoIntervencion : undefined,
      nombreComercio: !esMesas ? nombreComercio : undefined,
      edadCumpleanos: esMesas && tipoEvento === "cumpleanos" ? edadCumpleanos : undefined,
      tematica: tematica.trim() ? tematica.trim() : undefined,
      cantidadComensales: esMesas ? cantidadComensales : undefined,
      fechaEvento,
      extrasSeleccionados,
      precioTotalCalculado: precioTotal,
      notasEspeciales: notasEspeciales.trim() ? notasEspeciales.trim() : undefined,
    };

    agregarServicio(config, servicio.imagenPortada);
    toast.success("¡Servicio configurado y sumado a tu selección con éxito!");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop con desenfoque suave */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#170C11]/70 backdrop-blur-sm"
        />

        {/* Modal Centrado */}
        <div className="min-h-full flex items-center justify-center p-3 sm:p-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-2xl bg-[#FBF8F5] rounded-3xl shadow-2xl border border-[#D7C5BA] overflow-hidden"
          >
            {/* Cabecera del Formulario */}
            <div className="p-6 sm:p-7 bg-[#F5EFE7] border-b border-[#D7C5BA] flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#632D3E] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {esMesas
                    ? "Estilismo de Mesas · Formulario de Evento"
                    : "Retail & Vidrieras · Configuración de Proyecto"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A202B] mt-1 leading-tight">
                  {servicio.nombre}
                </h3>
                <p className="text-xs sm:text-sm text-[#705064] mt-1 max-w-lg leading-relaxed">
                  {esMesas
                    ? "Personalizá los datos de tu celebración. Podés seleccionar el tipo de evento, cantidad de invitados y adicionales para sumarlo a tu carrito."
                    : "Diseñamos puestas escenográficas para tu marca. Completá los datos del local para presupuestar y sumar la fecha a tu carrito."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#705064] hover:text-[#4A202B] rounded-full hover:bg-[#F0D9D8]/60 transition-colors shrink-0"
                aria-label="Cerrar formulario"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido Scrollable */}
            <div className="p-6 sm:p-7 space-y-6 max-h-[66vh] overflow-y-auto">
              {/* ========================================================= */}
              {/* CASO 1: ESTILISMO DE MESAS */}
              {/* ========================================================= */}
              {esMesas && (
                <>
                  {/* Select: Tipo de Evento (Parametrizable con mock para API) */}
                  <div>
                    <label
                      htmlFor="tipoEventoSelect"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#632D3E]" /> 1. Ocasión o Tipo de Celebración
                    </label>
                    <div className="relative">
                      <select
                        id="tipoEventoSelect"
                        value={tipoEvento}
                        onChange={(e) => setTipoEvento(e.target.value as TipoEvento)}
                        className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-3 text-sm text-[#4A202B] font-medium focus:outline-none focus:ring-2 focus:ring-[#632D3E] cursor-pointer appearance-none shadow-xs"
                      >
                        {TIPOS_EVENTO_MOCK.map((opcion) => (
                          <option key={opcion.id} value={opcion.id}>
                            {opcion.nombre}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#632D3E]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>

                    {/* Campo condicional si es cumpleaños */}
                    {tipoEvento === "cumpleanos" && (
                      <div className="mt-3 p-3 bg-[#F0D9D8]/45 rounded-xl border border-[#D7C5BA] flex items-center gap-3">
                        <span className="text-xs text-[#4A202B] font-semibold">
                          Edad a celebrar:
                        </span>
                        <input
                          type="number"
                          min="1"
                          max="115"
                          value={edadCumpleanos}
                          onChange={(e) => setEdadCumpleanos(Number(e.target.value))}
                          className="w-20 px-2 py-1 text-sm bg-white border border-[#D7C5BA] rounded-lg text-center text-[#4A202B] font-bold shadow-xs"
                        />
                        <span className="text-xs text-[#705064]">
                          años (ej. 1 añito, 15, 30, 40, 50, etc.)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cantidad de Comensales */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#632D3E]" /> 2. Cantidad de Comensales
                      </label>
                      <span className="font-serif text-lg font-bold text-[#632D3E]">
                        {cantidadComensales} invitados
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="120"
                      step="1"
                      value={cantidadComensales}
                      onChange={(e) => setCantidadComensales(Number(e.target.value))}
                      className="w-full accent-[#632D3E] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#705064] mt-1">
                      <span>Mínimo: 4</span>
                      <span>Base incluida: {servicio.comensalesBase} comensales</span>
                      <span>Hasta 120+</span>
                    </div>
                  </div>

                  {/* Fecha del Evento */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#632D3E]" /> 3. Fecha Deseada para la Celebración
                    </label>
                    <input
                      type="date"
                      value={fechaEvento}
                      onChange={(e) => setFechaEvento(e.target.value)}
                      className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-2.5 text-sm text-[#4A202B] font-medium focus:outline-none focus:ring-2 focus:ring-[#632D3E] shadow-xs"
                    />
                    <p className="text-[11px] text-[#705064] mt-1.5 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#632D3E] shrink-0" />
                      Disponibilidad exclusiva de 1 montaje por día. La fecha queda reservada con tu orden.
                    </p>
                  </div>

                  {/* Temática o Idea Deseada */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#632D3E]" /> 4. Temática o Estilo Preferido (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Romántico floral en tonos pasteles, estilo rústico elegante, circo de autor..."
                      value={tematica}
                      onChange={(e) => setTematica(e.target.value)}
                      className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-2.5 text-sm text-[#4A202B] focus:outline-none focus:ring-2 focus:ring-[#632D3E] shadow-xs"
                    />
                  </div>
                </>
              )}

              {/* ========================================================= */}
              {/* CASO 2: VISUAL MERCHANDISING & VIDRIERAS */}
              {/* ========================================================= */}
              {!esMesas && (
                <>
                  {/* Rubro Comercial */}
                  <div>
                    <label
                      htmlFor="rubroComercialSelect"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5"
                    >
                      <Store className="w-4 h-4 text-[#632D3E]" /> 1. Rubro del Local o Marca
                    </label>
                    <div className="relative">
                      <select
                        id="rubroComercialSelect"
                        value={rubroComercial}
                        onChange={(e) => setRubroComercial(e.target.value)}
                        className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-3 text-sm text-[#4A202B] font-medium focus:outline-none focus:ring-2 focus:ring-[#632D3E] cursor-pointer appearance-none shadow-xs"
                      >
                        {RUBROS_COMERCIALES_MOCK.map((rubro) => (
                          <option key={rubro.id} value={rubro.id}>
                            {rubro.nombre}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#632D3E]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Tipo de Intervención */}
                  <div>
                    <label
                      htmlFor="tipoIntervencionSelect"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#632D3E]" /> 2. Tipo de Intervención Escenográfica
                    </label>
                    <div className="relative">
                      <select
                        id="tipoIntervencionSelect"
                        value={tipoIntervencion}
                        onChange={(e) => setTipoIntervencion(e.target.value)}
                        className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-3 text-sm text-[#4A202B] font-medium focus:outline-none focus:ring-2 focus:ring-[#632D3E] cursor-pointer appearance-none shadow-xs"
                      >
                        {TIPOS_INTERVENCION_VIDRIERA_MOCK.map((tipo) => (
                          <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#632D3E]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Nombre del Comercio y Dimensiones */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#632D3E]" /> 3. Nombre del Local / Marca
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Boutique Amélie, Café de París..."
                        value={nombreComercio}
                        onChange={(e) => setNombreComercio(e.target.value)}
                        className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-2.5 text-sm text-[#4A202B] focus:outline-none focus:ring-2 focus:ring-[#632D3E] shadow-xs"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dimensionesVidrieraSelect"
                        className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2"
                      >
                        Escala Estimada
                      </label>
                      <select
                        id="dimensionesVidrieraSelect"
                        value={dimensionesVidriera}
                        onChange={(e) => setDimensionesVidriera(e.target.value)}
                        className="w-full bg-white border border-[#D7C5BA] rounded-xl px-3 py-2.5 text-sm text-[#4A202B] font-medium focus:outline-none focus:ring-2 focus:ring-[#632D3E] shadow-xs"
                      >
                        <option value="estandar">Vidriera estándar (hasta 3m lineales)</option>
                        <option value="doble">Vidriera doble o en esquina (+ $45.000)</option>
                        <option value="integral">Puesta integral en local (+ $85.000)</option>
                      </select>
                    </div>
                  </div>

                  {/* Fecha Estimada de Montaje */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#632D3E]" /> 4. Fecha Estimada de Montaje
                    </label>
                    <input
                      type="date"
                      value={fechaEvento}
                      onChange={(e) => setFechaEvento(e.target.value)}
                      className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-2.5 text-sm text-[#4A202B] font-medium focus:outline-none focus:ring-2 focus:ring-[#632D3E] shadow-xs"
                    />
                    <p className="text-[11px] text-[#705064] mt-1.5 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#632D3E] shrink-0" />
                      El montaje se realiza fuera de horario comercial o coordinado para no interrumpir la atención.
                    </p>
                  </div>
                </>
              )}

              {/* ========================================================= */}
              {/* OPCIONES EXTRAS COMUNES */}
              {/* ========================================================= */}
              {servicio.opcionesExtras.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2">
                    {esMesas ? "5. Adicionales de Estilismo (Opcionales)" : "5. Adicionales de Proyecto"}
                  </label>
                  <div className="space-y-2.5">
                    {servicio.opcionesExtras.map((extra) => {
                      const isSelected = extrasSeleccionados.some((e) => e.id === extra.id);
                      return (
                        <div
                          key={extra.id}
                          onClick={() => toggleExtra(extra)}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#F0D9D8]/50 border-[#632D3E] shadow-xs"
                              : "bg-white border-[#D7C5BA] hover:border-[#632D3E]/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                                isSelected
                                  ? "bg-[#632D3E] border-[#632D3E] text-white"
                                  : "border-[#D7C5BA] bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#4A202B]">{extra.nombre}</p>
                              <p className="text-[11px] text-[#705064]">{extra.descripcion}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#632D3E] shrink-0">
                            +{formatearPrecio(extra.precioExtra)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notas Especiales */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#4A202B] mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#632D3E]" />{" "}
                  {esMesas ? "6. Notas o Consultas para Myriam" : "6. Requerimientos o Paleta Deseada"}
                </label>
                <textarea
                  rows={2}
                  placeholder="Escribí aquí cualquier detalle especial, duda sobre el salón o preferencia..."
                  value={notasEspeciales}
                  onChange={(e) => setNotasEspeciales(e.target.value)}
                  className="w-full bg-white border border-[#D7C5BA] rounded-xl px-4 py-2.5 text-xs text-[#4A202B] focus:outline-none focus:ring-2 focus:ring-[#632D3E] shadow-xs resize-none"
                />
              </div>
            </div>

            {/* Resumen Final & Botón de Añadir al Carrito */}
            <div className="p-6 bg-[#F5EFE7] border-t border-[#D7C5BA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#705064] uppercase tracking-wider block">
                  Presupuesto Total Estimado:
                </span>
                <span className="font-serif text-3xl font-bold text-[#632D3E]">
                  {formatearPrecio(precioTotal)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium text-[#705064] hover:bg-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAgregarAlCarrito}
                  className="flex-1 sm:flex-none px-7 py-3 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D3A3A5]" />
                  Añadir al Carrito ↗
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
