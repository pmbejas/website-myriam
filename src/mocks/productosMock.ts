import { ProductoResponse } from "@/types";

export const PRODUCTOS_MOCK: ProductoResponse[] = [
  {
    id: 101,
    nombre: "Plato de Sitio Perla en Porcelana",
    descripcion:
      "Plato de sitio con borde festoneado de perlas en relieve. Aporta textura y distinción a la base de cada comensal.",
    precio: 8500,
    stock: 48,
    categoria: "Vajilla & Cristalería",
    imagenes: [
      "https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: true,
    material: "Porcelana artesanal",
    dimensiones: "33 cm diámetro",
  },
  {
    id: 102,
    nombre: "Copa Labrada Borgoña Imperial",
    descripcion:
      "Copa de cristal pesado tallado a mano con motivos geométricos y pie facetado. Ideal para vino tinto y agua.",
    precio: 6200,
    stock: 36,
    categoria: "Vajilla & Cristalería",
    imagenes: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: true,
    material: "Cristal labrado",
    dimensiones: "350 ml · 17 cm alto",
  },
  {
    id: 103,
    nombre: "Set de Cubertería Dorada Mate (4 piezas)",
    descripcion:
      "Juego individual de cuchillo, tenedor, cuchara de mesa y cuchara de postre en acero inoxidable con baño dorado satinado.",
    precio: 14500,
    stock: 24,
    categoria: "Vajilla & Cristalería",
    imagenes: [
      "https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: true,
    material: "Acero inoxidable con acabado oro mate",
  },
  {
    id: 104,
    nombre: "Mantel de Lino Puro Lavado Natural",
    descripcion:
      "Textil 100% lino de caída suave y textura arrugada natural. Aporta calidez orgánica y elegancia relajada.",
    precio: 38000,
    stock: 12,
    categoria: "Textiles de Mesa",
    imagenes: [
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: true,
    material: "100% Lino europeo prelavado",
    dimensiones: "2.80 m × 1.60 m",
  },
  {
    id: 105,
    nombre: "Pack 4 Servilletas con Vainilla Rosa Viejo",
    descripcion:
      "Servilletas de lino suave con detalle de vainilla perimetral en tono Soft Blush & Dusty Rose.",
    precio: 12800,
    stock: 30,
    categoria: "Textiles de Mesa",
    imagenes: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: true,
    material: "Lino y algodón con vainilla artesanal",
    dimensiones: "45 cm × 45 cm",
  },
  {
    id: 106,
    nombre: "Candelabro Escultórico en Bronce Envejecido",
    descripcion:
      "Pieza de fundición sólida con acabado pátina vintage para velas cónicas estándar. Añade altura y drama romántico.",
    precio: 18500,
    stock: 16,
    categoria: "Iluminación & Velas",
    imagenes: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: true,
    material: "Bronce fundido con pátina antique",
    dimensiones: "26 cm alto · Base 10 cm",
  },
  {
    id: 107,
    nombre: "Dúo de Velas Cónicas de Soja Borgoña & Blush",
    descripcion:
      "Velas vertidas artesanalmente con cera de soja vegetal y mecha de algodón puro, sin humo y de combustión lenta.",
    precio: 4900,
    stock: 50,
    categoria: "Iluminación & Velas",
    imagenes: [
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: false,
    material: "Cera de soja natural",
    dimensiones: "25 cm alto · 8 horas duración",
  },
  {
    id: 108,
    nombre: "Florero Botánico de Cerámica Gres Arena",
    descripcion:
      "Florero pequeño torneado a mano con esmalte mate arena y textura rugosa. Perfecto para ramilletes silvestres individuales.",
    precio: 9200,
    stock: 20,
    categoria: "Accesorios",
    imagenes: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    ],
    destacado: false,
    material: "Cerámica gres cocida a alta temperatura",
    dimensiones: "14 cm alto",
  },
];
