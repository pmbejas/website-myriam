export type CategoriaEvento =
  | "todas"
  | "bodas"
  | "cumpleanos"
  | "te"
  | "cenas"
  | "bautismos"
  | "baby_shower"
  | "corporativo";

export interface EventoPortfolioResponse {
  id: number;
  titulo: string;
  categoria: CategoriaEvento;
  categoriaLabel: string;
  fechaTexto: string;
  descripcion: string;
  imagenPrincipal: string;
  galeriaFotos: string[];
  servicioRelacionadoId?: number;
  esDestacado?: boolean;
}
