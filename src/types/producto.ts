export interface ProductoResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenes: string[];
  destacado: boolean;
  material?: string;
  dimensiones?: string;
}

export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenes: string[];
  destacado?: boolean;
  material?: string;
  dimensiones?: string;
}
