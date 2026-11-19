import { TipoEvento, CategoriaServicio } from "./servicio";

export interface ItemCarritoProducto {
  id: string; // formato: prod-{productoId}
  tipo: "producto";
  productoId: number;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  imagen: string;
  subtotal: number;
}

export interface ItemCarritoServicio {
  id: string; // formato: serv-{servicioId}-{timestamp}
  tipo: "servicio";
  servicioId: number;
  nombre: string;
  categoriaServicio?: CategoriaServicio;
  tipoEvento?: TipoEvento | string;
  rubroComercial?: string;
  tipoIntervencion?: string;
  nombreComercio?: string;
  edadCumpleanos?: number;
  tematica?: string;
  cantidadComensales?: number;
  fechaEvento: string;
  extrasNombres: string[];
  precioTotal: number;
  imagen: string;
  notasEspeciales?: string;
}

export type ItemCarrito = ItemCarritoProducto | ItemCarritoServicio;
