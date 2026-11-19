import { EventoPortfolioResponse } from "@/types";

export const EVENTOS_MOCK: EventoPortfolioResponse[] = [
  {
    id: 1,
    titulo: "La dulzura de esperar · Baby Shower",
    categoria: "baby_shower",
    categoriaLabel: "Baby Shower",
    fechaTexto: "Portfolio Real · Tucumán",
    descripcion:
      "Una celebración envuelta en calidez y dulzura, donde cada detalle expresa la ternura y la emoción de una nueva vida. Lirios blancos naturales, porcelana labrada, copas talladas azules y muñecos tejidos a mano.",
    imagenPrincipal: "/images/real/foto-5.jpg",
    galeriaFotos: [
      "/images/real/foto-5.jpg",
      "/images/real/foto-6.jpg",
      "/images/real/foto-7.jpg",
      "/images/real/foto-8.jpg",
    ],
    servicioRelacionadoId: 1,
    esDestacado: true,
  },
  {
    id: 2,
    titulo: "Mesas que cuentan historias · Bautismo",
    categoria: "bautismos",
    categoriaLabel: "Bautismos",
    fechaTexto: "Portfolio Real · Tucumán",
    descripcion:
      "Cada detalle expresa la ternura y el significado de un encuentro familiar inolvidable. Mantelería a rayas suaves, platos de sitio de yute natural, vajilla ilustrada, margaritas frescas y conejitos artesanales.",
    imagenPrincipal: "/images/real/foto-10.jpg",
    galeriaFotos: [
      "/images/real/foto-10.jpg",
      "/images/real/foto-9.jpg",
      "/images/real/foto-11.jpg",
      "/images/real/foto-12.jpg",
    ],
    servicioRelacionadoId: 1,
    esDestacado: true,
  },
  {
    id: 3,
    titulo: "La magia del circo · Cumpleaños Temático",
    categoria: "cumpleanos",
    categoriaLabel: "Cumpleaños",
    fechaTexto: "Portfolio Real · Tucumán",
    descripcion:
      "Una experiencia inmersiva de colores vibrantes, donde la fantasía y la magia del circo cobran vida en cada puesto de mesa con muñecos de autor, lámparas cálidas y cristalería de diseño.",
    imagenPrincipal: "/images/real/foto-13.jpg",
    galeriaFotos: [
      "/images/real/foto-13.jpg",
      "/images/real/foto-14.jpg",
      "/images/real/foto-15.jpg",
      "/images/real/foto-16.jpg",
    ],
    servicioRelacionadoId: 1,
    esDestacado: true,
  },
  {
    id: 4,
    titulo: "Tarde de Té & Porcelana Ilustrada",
    categoria: "te",
    categoriaLabel: "Mesas de Té",
    fechaTexto: "Portfolio Real · Tucumán",
    descripcion:
      "Encuentro íntimo alrededor del té con teteras clásicas de porcelana blanca, cucharitas doradas, lámparas plisadas de luz tenue y torre de profiteroles artesanales.",
    imagenPrincipal: "/images/real/foto-7.jpg",
    galeriaFotos: [
      "/images/real/foto-7.jpg",
      "/images/real/foto-6.jpg",
      "/images/real/foto-8.jpg",
    ],
    servicioRelacionadoId: 1,
  },
  {
    id: 5,
    titulo: "Boda Romántica & Banquete Imperial",
    categoria: "bodas",
    categoriaLabel: "Bodas de Gala",
    fechaTexto: "Colección Gala",
    descripcion:
      "Mesa imperial al aire libre con mantelería de lino, servilletas borgoña, copas de cristal facetado y candelabros con velas cónicas que encienden la velada.",
    imagenPrincipal:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    galeriaFotos: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    ],
    servicioRelacionadoId: 1,
  },
  {
    id: 6,
    titulo: "Cena Íntima & Aniversario de Autor",
    categoria: "cenas",
    categoriaLabel: "Cenas Privadas",
    fechaTexto: "Colección Íntima",
    descripcion:
      "Celebración privada con paleta Dusty Rose & Burgundy, flores naturales de estación, platos de sitio labrados y cubertería dorada mate.",
    imagenPrincipal: "/images/real/foto-9.jpg",
    galeriaFotos: [
      "/images/real/foto-9.jpg",
      "/images/real/foto-11.jpg",
    ],
    servicioRelacionadoId: 1,
  },
];
