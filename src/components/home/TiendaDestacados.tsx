"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Plus } from "lucide-react";
import { PRODUCTOS_MOCK } from "@/mocks/productosMock";
import { useCarritoStore } from "@/store/useCarritoStore";
import { toast } from "sonner";

const CATEGORIAS_PRODUCTOS = [
  "Todos",
  "Vajilla & Cristalería",
  "Textiles de Mesa",
  "Iluminación & Velas",
  "Accesorios",
];

export function TiendaDestacados() {
  const { agregarProducto } = useCarritoStore();
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? PRODUCTOS_MOCK
      : PRODUCTOS_MOCK.filter((p) => p.categoria === categoriaActiva);

  const formatearPrecio = (monto: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(monto);
  };

  return (
    <section id="tienda" className="py-9 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F5EFE7] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
        {/* Cabecera Compacta */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 border-b border-[#D7C5BA]/50 pb-3"
        >
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#632D3E] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Tienda Boutique · Objetos de Mesa
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#4A202B] leading-snug">
              Piezas seleccionadas para vestir tu propia mesa.
            </h2>
          </div>
          <p className="text-xs text-[#705064] font-normal max-w-xs leading-relaxed shrink-0">
            Curaduría de manteles de lino, porcelana, cubiertos y velas. Envíos a todo el país.
          </p>
        </motion.div>

        {/* Filtros de Categoría Delicados */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORIAS_PRODUCTOS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaActiva(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 ${
                categoriaActiva === cat
                  ? "bg-[#632D3E] text-[#FFF9EE] shadow-xs scale-102"
                  : "bg-[#FBF8F5] text-[#4A202B] border border-[#D7C5BA] hover:bg-[#F0D9D8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grilla de Productos Compacta (4 por fila en desktop, 2 en móvil) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {productosFiltrados.map((producto, idx) => (
              <motion.div
                key={producto.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: (idx % 4) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group bg-[#FBF8F5] rounded-2xl overflow-hidden border border-[#D7C5BA] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Foto Compacta (~145px) */}
                  <div className="relative aspect-[4/3] sm:h-36 lg:h-40 overflow-hidden bg-[#EAE2D8]">
                    <Image
                      src={producto.imagenes[0] || ""}
                      alt={producto.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {producto.stock < 20 && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider bg-[#632D3E] text-[#FFF9EE] px-2 py-0.5 rounded-full shadow-xs">
                        Limitada
                      </span>
                    )}
                  </div>

                  {/* Datos del Producto */}
                  <div className="p-3 sm:p-3.5 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#632D3E] font-bold block truncate">
                      {producto.categoria}
                    </span>
                    <h3 className="font-serif text-sm sm:text-[15px] text-[#4A202B] group-hover:text-[#632D3E] transition-colors leading-snug truncate font-medium">
                      {producto.nombre}
                    </h3>
                    <p className="text-[11px] text-[#705064] truncate leading-tight">
                      {producto.material || producto.descripcion}
                    </p>
                  </div>
                </div>

                {/* Pie con Precio y Botón Agregar */}
                <div className="p-3 pt-2.5 border-t border-[#D7C5BA]/50 bg-white flex items-center justify-between">
                  <span className="font-serif text-sm sm:text-base font-bold text-[#632D3E]">
                    {formatearPrecio(producto.precio)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      agregarProducto(producto, 1);
                      toast.success(`${producto.nombre} añadido al carrito`);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold bg-[#4A202B] text-[#FFF9EE] hover:bg-[#632D3E] transition-colors shadow-xs"
                    aria-label={`Añadir ${producto.nombre} al carrito`}
                  >
                    <Plus className="w-3 h-3" />
                    <span>Agregar</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
