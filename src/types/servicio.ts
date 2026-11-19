export type TipoEvento =
  | "boda"
  | "cena_intima"
  | "te"
  | "gender_reveal"
  | "baby_shower"
  | "bautismo"
  | "cumpleanos"
  | "corporativo"
  | "otro";

export interface TipoEventoOpcion {
  id: TipoEvento;
  nombre: string;
  descripcion?: string;
}

export type CategoriaServicio = "mesas" | "vidrieras";

export interface ServicioOpcionExtra {
  id: string;
  nombre: string;
  descripcion: string;
  precioExtra: number;
}

export interface ServicioResponse {
  id: number;
  slug: string;
  nombre: string;
  subtitulo?: string;
  categoria: CategoriaServicio;
  descripcionCorta: string;
  descripcionLarga: string;
  precioBase: number;
  comensalesBase: number;
  precioPorComensalAdicional: number;
  tipoEventoDefault?: TipoEvento;
  imagenPortada: string;
  imagenesDetalle: string[];
  incluye: string[];
  opcionesExtras: ServicioOpcionExtra[];
}

export interface CotizacionServicioConfig {
  servicioId: number;
  nombreServicio: string;
  categoriaServicio: CategoriaServicio;
  tipoEvento?: TipoEvento | string;
  nombreEventoPersonalizado?: string;
  rubroComercial?: string;
  tipoIntervencion?: string;
  nombreComercio?: string;
  edadCumpleanos?: number;
  tematica?: string;
  cantidadComensales?: number;
  fechaEvento: string; // YYYY-MM-DD
  extrasSeleccionados: ServicioOpcionExtra[];
  precioTotalCalculado: number;
  notasEspeciales?: string;
}
