import Link from "next/link";
import { Instagram, Mail, Phone, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4A202B] text-[#FBF8F5] pt-16 pb-12 border-t border-[#632D3E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#705064]/50">
          {/* Columna Marca */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-3xl tracking-tight text-[#FBF8F5]">
              MYRIAM DEPETRIS<span className="italic text-[#D3A3A5]">.</span>
            </h3>
            <p className="text-sm text-[#F0D9D8] max-w-md leading-relaxed font-light">
              Estilismo de mesas y diseño de experiencias que emocionan. Creamos
              escenografías inolvidables donde la vajilla de gala, la mantelería de
              lino y las velas cuentan historias de amor y celebración.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#632D3E] flex items-center justify-center text-[#FBF8F5] hover:bg-[#D3A3A5] hover:text-[#4A202B] transition-colors"
                aria-label="Instagram de Myriam Depetris"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contacto@myriamdepetris.com"
                className="w-10 h-10 rounded-full bg-[#632D3E] flex items-center justify-center text-[#FBF8F5] hover:bg-[#D3A3A5] hover:text-[#4A202B] transition-colors"
                aria-label="Email de contacto"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#632D3E] flex items-center justify-center text-[#FBF8F5] hover:bg-[#D3A3A5] hover:text-[#4A202B] transition-colors"
                aria-label="WhatsApp directo"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna Enlaces */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D3A3A5] mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F0D9D8]/80 font-light">
              <li>
                <Link href="/#inicio" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#concepto" className="hover:text-white transition-colors">
                  El Arte del Estilismo
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portfolio de Eventos
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-white transition-colors">
                  Servicios & Cotizador
                </Link>
              </li>
              <li>
                <Link href="/#tienda" className="hover:text-white transition-colors">
                  Objetos de Colección
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Contacto */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D3A3A5] mb-4">
              Curaduría & Citas
            </h4>
            <p className="text-sm text-[#F0D9D8]/80 font-light leading-relaxed">
              Atención personalizada para diseño y estilismo de eventos presenciales.
            </p>
            <p className="text-sm text-[#D3A3A5] mt-3 font-medium">
              Tucumán, Argentina
            </p>
            <p className="text-xs text-[#F0D9D8]/60 mt-1">
              San Miguel de Tucumán · Yerba Buena · Tafí Viejo
            </p>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F0D9D8]/60 font-light gap-4">
          <p>© {new Date().getFullYear()} Myriam Depetris. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-[#D3A3A5] fill-current" /> para momentos inolvidables.
          </p>
        </div>
      </div>
    </footer>
  );
}
