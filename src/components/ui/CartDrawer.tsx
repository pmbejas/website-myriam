"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Calendar,
  Users,
  Sparkles,
  Store,
  Layers,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useCarritoStore } from "@/store/useCarritoStore";
import { TIPOS_EVENTO_MOCK, RUBROS_COMERCIALES_MOCK } from "@/mocks/serviciosMock";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    cerrarDrawer,
    actualizarCantidadProducto,
    eliminarItem,
    obtenerTotal,
  } = useCarritoStore();

  const total = obtenerTotal();

  const formatearPrecio = (monto: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(monto);
  };

  const obtenerNombreTipoEvento = (id?: string) => {
    if (!id) return "Celebración";
    const encontrado = TIPOS_EVENTO_MOCK.find((t) => t.id === id);
    return encontrado ? encontrado.nombre : id;
  };

  const obtenerNombreRubro = (id?: string) => {
    if (!id) return "Local Comercial";
    const encontrado = RUBROS_COMERCIALES_MOCK.find((r) => r.id === id);
    return encontrado ? encontrado.nombre : id;
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrarDrawer}
            className="fixed inset-0 bg-[#1D0C12]/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FBF8F5] shadow-2xl z-50 flex flex-col border-l border-[#D7C5BA]"
          >
            {/* Cabecera del Carrito */}
            <div className="p-6 border-b border-[#D7C5BA]/60 flex items-center justify-between bg-[#F5EFE7]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#632D3E] flex items-center justify-center text-[#FFF9EE]">
                  <ShoppingBag className="w-4 h-4 text-[#D3A3A5]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#4A202B]">Tu Selección</h3>
                  <p className="text-xs text-[#705064]">
                    {items.length === 1
                      ? "1 ítem seleccionado"
                      : `${items.length} ítems seleccionados`}
                  </p>
                </div>
              </div>
              <button
                onClick={cerrarDrawer}
                className="p-2 text-[#705064] hover:text-[#4A202B] rounded-full hover:bg-[#F0D9D8]/50 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista Scrollable de Items */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F0D9D8] flex items-center justify-center text-[#632D3E]">
                    <ShoppingBag className="w-8 h-8 opacity-70" />
                  </div>
                  <h4 className="font-serif text-xl text-[#4A202B]">Tu carrito está vacío</h4>
                  <p className="text-xs sm:text-sm text-[#705064] max-w-xs leading-relaxed">
                    Añadí piezas de mesa exclusivas de nuestra tienda o configurá el servicio de estilismo para tu próximo evento.
                  </p>
                  <button
                    onClick={cerrarDrawer}
                    className="mt-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-colors"
                  >
                    Explorar Propuestas
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-[#D7C5BA]/80 bg-white shadow-xs space-y-3"
                  >
                    {item.tipo === "producto" ? (
                      /* ITEM PRODUCTO FÍSICO */
                      <div className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#F5EFE7]">
                          {item.imagen ? (
                            <Image
                              src={item.imagen}
                              alt={item.nombre}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#705064] text-xs">
                              Foto
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#632D3E] block">
                            Objeto de Mesa
                          </span>
                          <h5 className="font-serif text-[15px] text-[#4A202B] truncate font-medium">
                            {item.nombre}
                          </h5>
                          <p className="text-xs text-[#705064]">
                            {formatearPrecio(item.precioUnitario)} c/u
                          </p>
                          <p className="text-sm font-bold text-[#632D3E] mt-0.5">
                            {formatearPrecio(item.subtotal)}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={() => eliminarItem(item.id)}
                            className="text-[#705064] hover:text-red-600 transition-colors p-1"
                            aria-label={`Eliminar ${item.nombre}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center border border-[#D7C5BA] rounded-full px-2 py-0.5 bg-[#FBF8F5]">
                            <button
                              onClick={() =>
                                actualizarCantidadProducto(item.id, item.cantidad - 1)
                              }
                              className="p-1 text-[#705064] hover:text-[#4A202B]"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-2 text-[#4A202B]">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() =>
                                actualizarCantidadProducto(item.id, item.cantidad + 1)
                              }
                              className="p-1 text-[#705064] hover:text-[#4A202B]"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ITEM SERVICIO DE AUTOR (MESAS O VIDRIERAS) */
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            {item.categoriaServicio === "vidrieras" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D3A3A5]/40 text-[#4A202B]">
                                <Store className="w-3 h-3 text-[#632D3E]" />
                                Vidriera · {obtenerNombreRubro(item.rubroComercial)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D3A3A5]/40 text-[#4A202B]">
                                <Sparkles className="w-3 h-3 text-[#632D3E]" />
                                Mesas · {obtenerNombreTipoEvento(item.tipoEvento)}
                              </span>
                            )}
                            <h5 className="font-serif text-[16px] text-[#4A202B] mt-1 font-medium leading-snug">
                              {item.nombre}
                            </h5>
                          </div>
                          <button
                            onClick={() => eliminarItem(item.id)}
                            className="text-[#705064] hover:text-red-600 transition-colors p-1"
                            aria-label={`Eliminar servicio ${item.nombre}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Metadatos del Servicio Configurado */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-[#705064] bg-[#F5EFE7] p-3 rounded-xl">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#632D3E] shrink-0" />
                            <span>{item.fechaEvento}</span>
                          </div>

                          {item.cantidadComensales && (
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#632D3E] shrink-0" />
                              <span>{item.cantidadComensales} comensales</span>
                            </div>
                          )}

                          {item.nombreComercio && (
                            <div className="flex items-center gap-1.5 col-span-2">
                              <Store className="w-3.5 h-3.5 text-[#632D3E] shrink-0" />
                              <span className="font-semibold text-[#4A202B]">
                                Local: {item.nombreComercio}
                              </span>
                            </div>
                          )}

                          {item.edadCumpleanos && (
                            <div className="col-span-2 text-[11px] text-[#4A202B]">
                              🎂 Festejo: {item.edadCumpleanos} años
                            </div>
                          )}

                          {item.tematica && (
                            <div className="col-span-2 text-[11px] text-[#4A202B] italic">
                              Concepto: &ldquo;{item.tematica}&rdquo;
                            </div>
                          )}

                          {item.extrasNombres.length > 0 && (
                            <div className="col-span-2 text-[11px] text-[#705064] pt-1 border-t border-[#D7C5BA]/50 flex items-start gap-1">
                              <Layers className="w-3.5 h-3.5 text-[#632D3E] shrink-0 mt-0.5" />
                              <span>Extras: {item.extrasNombres.join(", ")}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-[#705064]">Presupuesto servicio:</span>
                          <span className="text-sm font-bold text-[#632D3E]">
                            {formatearPrecio(item.precioTotal)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer con Total y Botón Checkout Unificado */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#D7C5BA] bg-[#F5EFE7] space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="font-serif text-lg text-[#4A202B]">Total Compra / Reserva:</span>
                  <span className="font-serif text-2xl font-bold text-[#632D3E]">
                    {formatearPrecio(total)}
                  </span>
                </div>
                <p className="text-[11px] text-[#705064] leading-tight">
                  * Pago 100% online por Mercado Pago o Transferencia Bancaria. La fecha queda inmediatamente reservada en agenda y coordinamos la logística.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      "¡Excelente! En la siguiente fase conectaremos el Checkout con Mercado Pago y transferencia bancaria."
                    );
                  }}
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#632D3E] text-[#FFF9EE] hover:bg-[#521827] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Continuar al Pago ({formatearPrecio(total)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
