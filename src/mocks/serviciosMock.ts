import { ServicioResponse, TipoEventoOpcion } from "@/types";

export const TIPOS_EVENTO_MOCK: TipoEventoOpcion[] = [
  { id: "baby_shower", nombre: "Baby Shower & Bienvenidas" },
  { id: "bautismo", nombre: "Bautismos & Comuniones" },
  { id: "cumpleanos", nombre: "Cumpleaños & Festejos de Autor" },
  { id: "te", nombre: "Mesas de Té & Tea Parties" },
  { id: "boda", nombre: "Bodas, Civil & Grandes Galas" },
  { id: "cena_intima", nombre: "Almuerzos & Cenas Íntimas" },
  { id: "corporativo", nombre: "Encuentros Corporativos & Marcas" },
  { id: "otro", nombre: "Otra Celebración Especial" },
];

export const RUBROS_COMERCIALES_MOCK = [
  { id: "moda", nombre: "Moda & Indumentaria" },
  { id: "deco", nombre: "Decoración & Objetos de Hogar" },
  { id: "gastronomia", nombre: "Gastronomía & Café Boutique" },
  { id: "joyeria", nombre: "Joyería, Óptica & Accesorios" },
  { id: "belleza", nombre: "Belleza, Cosmética & Spa" },
  { id: "libreria", nombre: "Librería & Papelería Fina" },
  { id: "otro", nombre: "Otro Rubro Comercial" },
];

export const TIPOS_INTERVENCION_VIDRIERA_MOCK = [
  { id: "vidriera_autor", nombre: "Vidriera de Autor (Puesta Escénica Completa)" },
  { id: "espacio_comercial", nombre: "Ambientación Integral de Espacio / Local" },
  { id: "lanzamiento", nombre: "Lanzamiento de Colección o Temporada" },
  { id: "fecha_especial", nombre: "Campaña Fecha Especial (Madre, Navidad, etc.)" },
];

export const SERVICIOS_MOCK: ServicioResponse[] = [
  {
    id: 1,
    slug: "estilismo-de-mesas",
    nombre: "Estilismo & Diseño Integral de Mesas",
    subtitulo: "Celebraciones Sociales, Familiares e Íntimas",
    categoria: "mesas",
    descripcionCorta:
      "Curaduría estética y ambientación completa para todo tipo de celebraciones: vajilla de porcelana, cristalería de corte, textiles naturales, flores frescas y montaje presencial.",
    descripcionLarga:
      "Concebimos cada mesa como una obra sensorial viva. Diseñamos propuestas integrales para Baby Showers, Bautismos, Cumpleaños, Mesas de Té, Bodas y Cenas Privadas, cuidando cada detalle táctil, visual y aromático para convocar a celebrar.",
    precioBase: 75000,
    comensalesBase: 8,
    precioPorComensalAdicional: 6000,
    tipoEventoDefault: "cumpleanos",
    imagenPortada: "/images/real/foto-9.jpg",
    imagenesDetalle: [
      "/images/real/foto-9.jpg",
      "/images/real/foto-1.jpg",
      "/images/real/foto-7.jpg",
      "/images/real/foto-5.jpg",
      "/images/real/foto-10.jpg",
    ],
    incluye: [
      "Dirección estética personalizada según la temática y el tipo de evento",
      "Vajilla completa de porcelana, cristalería tallada y cubiertos dorados mate",
      "Textiles artesanales (mantelería de lino y servilletas de puro algodón)",
      "Arreglos centrales con flores naturales de estación y velas cálidas",
      "Montaje y retiro presencial en San Miguel de Tucumán, Yerba Buena y Tafí Viejo",
    ],
    opcionesExtras: [
      {
        id: "flores_premium",
        nombre: "Arreglos Florales de Gran Escala",
        descripcion: "Composiciones florales de autor en floreros de porcelana para destaque central.",
        precioExtra: 45000,
      },
      {
        id: "vajilla_vintage",
        nombre: "Vajilla Coleccionada & Cubertería Oro Mate",
        descripcion: "Piezas antiguas seleccionadas y cubiertos con terminación dorada mate.",
        precioExtra: 28000,
      },
      {
        id: "minutas_caligrafiadas",
        nombre: "Minutas & Tarjetas de Sitio Caligrafiadas",
        descripcion: "Papelería artesanal personalizada con el nombre de cada invitado.",
        precioExtra: 16000,
      },
    ],
  },
  {
    id: 2,
    slug: "vidrieras-y-visual-merchandising",
    nombre: "Visual Merchandising & Estilismo de Vidrieras",
    subtitulo: "Boutiques, Retail & Locales Comerciales de Autor",
    categoria: "vidrieras",
    descripcionCorta:
      "Diseño escenográfico, curaduría de objetos y estilismo de vidrieras comerciales para locales, boutiques y marcas en Tucumán. Puestas visuales que detienen miradas y comunican identidad.",
    descripcionLarga:
      "La vidriera es la primera conversación entre una marca y su público. Desarrollamos montajes escenográficos únicos combinando diseño volumétrico, objetos de autor, textiles, iluminación puntual y narrativa visual. Ideal para cambios de temporada, lanzamientos de colección y fechas especiales comerciales.",
    precioBase: 120000,
    comensalesBase: 1,
    precioPorComensalAdicional: 0,
    tipoEventoDefault: "corporativo",
    imagenPortada: "/images/real/foto-13.jpg",
    imagenesDetalle: [
      "/images/real/foto-13.jpg",
      "/images/real/foto-12.jpg",
      "/images/real/foto-6.jpg",
    ],
    incluye: [
      "Concepto escenográfico y dirección de arte según la identidad de tu marca",
      "Curaduría y provisión de utilería, objetos de diseño y elementos textiles",
      "Montaje artístico presencial completo y puesta en escena para vidriera",
      "Asesoría en composición visual, iluminación focal y flujo de atención",
      "Cobertura y logística en locales de San Miguel de Tucumán y Yerba Buena",
    ],
    opcionesExtras: [
      {
        id: "iluminacion_focal",
        nombre: "Kit de Iluminación Escénica Focal",
        descripcion: "Proyectores cálidos y luminarias puntuales para impacto visual nocturno.",
        precioExtra: 35000,
      },
      {
        id: "mantenimiento_estacional",
        nombre: "Plan de Renovación Estacional (Bimestral)",
        descripcion: "Acompañamiento y rotación periódica de elementos según la temporada comercial.",
        precioExtra: 60000,
      },
    ],
  },
];
