import { create } from "zustand";
import { ItemCarrito, ItemCarritoProducto, ItemCarritoServicio, ProductoResponse, CotizacionServicioConfig } from "@/types";

interface CarritoStore {
  items: ItemCarrito[];
  isDrawerOpen: boolean;
  abrirDrawer: () => void;
  cerrarDrawer: () => void;
  alternarDrawer: () => void;
  agregarProducto: (producto: ProductoResponse, cantidad?: number) => void;
  agregarServicio: (config: CotizacionServicioConfig, imagen: string) => void;
  actualizarCantidadProducto: (id: string, cantidad: number) => void;
  eliminarItem: (id: string) => void;
  vaciarCarrito: () => void;
  obtenerTotal: () => number;
  obtenerCantidadTotal: () => number;
}

export const useCarritoStore = create<CarritoStore>((set, get) => ({
  items: [],
  isDrawerOpen: false,

  abrirDrawer: () => set({ isDrawerOpen: true }),
  cerrarDrawer: () => set({ isDrawerOpen: false }),
  alternarDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  agregarProducto: (producto, cantidad = 1) => {
    const id = `prod-${producto.id}`;
    const items = get().items;
    const existente = items.find((i) => i.id === id) as ItemCarritoProducto | undefined;

    if (existente) {
      const nuevaCantidad = existente.cantidad + cantidad;
      set({
        items: items.map((i) =>
          i.id === id
            ? {
                ...existente,
                cantidad: nuevaCantidad,
                subtotal: nuevaCantidad * existente.precioUnitario,
              }
            : i
        ),
        isDrawerOpen: true,
      });
    } else {
      const nuevoItem: ItemCarritoProducto = {
        id,
        tipo: "producto",
        productoId: producto.id,
        nombre: producto.nombre,
        precioUnitario: producto.precio,
        cantidad,
        imagen: producto.imagenes[0] || "",
        subtotal: cantidad * producto.precio,
      };
      set({
        items: [...items, nuevoItem],
        isDrawerOpen: true,
      });
    }
  },

  agregarServicio: (config, imagen) => {
    const id = `serv-${config.servicioId}-${Date.now()}`;
    const nuevoItem: ItemCarritoServicio = {
      id,
      tipo: "servicio",
      servicioId: config.servicioId,
      nombre: config.nombreServicio,
      categoriaServicio: config.categoriaServicio,
      tipoEvento: config.tipoEvento,
      rubroComercial: config.rubroComercial,
      tipoIntervencion: config.tipoIntervencion,
      nombreComercio: config.nombreComercio,
      edadCumpleanos: config.edadCumpleanos,
      tematica: config.tematica,
      cantidadComensales: config.cantidadComensales,
      fechaEvento: config.fechaEvento,
      extrasNombres: config.extrasSeleccionados.map((e) => e.nombre),
      precioTotal: config.precioTotalCalculado,
      imagen,
      notasEspeciales: config.notasEspeciales,
    };

    set((state) => ({
      items: [...state.items, nuevoItem],
      isDrawerOpen: true,
    }));
  },

  actualizarCantidadProducto: (id, cantidad) => {
    if (cantidad <= 0) {
      get().eliminarItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => {
        if (i.id === id && i.tipo === "producto") {
          return {
            ...i,
            cantidad,
            subtotal: cantidad * i.precioUnitario,
          };
        }
        return i;
      }),
    }));
  },

  eliminarItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  vaciarCarrito: () => set({ items: [] }),

  obtenerTotal: () => {
    return get().items.reduce((acc, item) => {
      if (item.tipo === "producto") {
        return acc + item.subtotal;
      }
      return acc + item.precioTotal;
    }, 0);
  },

  obtenerCantidadTotal: () => {
    return get().items.reduce((acc, item) => {
      if (item.tipo === "producto") {
        return acc + item.cantidad;
      }
      return acc + 1;
    }, 0);
  },
}));
