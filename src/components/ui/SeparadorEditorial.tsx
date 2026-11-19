"use client";

import { Sparkles } from "lucide-react";

interface CurvaTextilProps {
  colorRelleno: string; // Color hexadecimal o clase Tailwind
  orientacion?: "arriba" | "abajo";
  altura?: number; // en px, default 40
  className?: string;
}

/**
 * Curva suave inspirada en la caída y drapeado natural de un mantel de lino.
 * Elimina las líneas rectas duras y enlaza las secciones con fluidez orgánica.
 */
export function CurvaTextil({
  colorRelleno,
  orientacion = "abajo",
  altura = 40,
  className = "",
}: CurvaTextilProps) {
  const esArriba = orientacion === "arriba";

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ height: `${altura}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full preserve-3d"
        preserveAspectRatio="none"
      >
        {esArriba ? (
          // Arco cóncavo superior suave
          <path
            d="M0,0 C360,42 1080,42 1440,0 L1440,48 L0,48 Z"
            fill={colorRelleno}
          />
        ) : (
          // Arco cóncavo inferior suave
          <path
            d="M0,48 C360,6 1080,6 1440,48 L1440,0 L0,0 Z"
            fill={colorRelleno}
          />
        )}
      </svg>
    </div>
  );
}

interface HairlineDifuminadaProps {
  className?: string;
  conDestello?: boolean;
}

/**
 * Línea etérea con desvanecimiento gradual hacia los extremos.
 * Sustituye los bordes rígidos de 1px a todo lo ancho por un detalle editorial de revista.
 */
export function HairlineDifuminada({
  className = "",
  conDestello = true,
}: HairlineDifuminadaProps) {
  return (
    <div className={`relative w-full flex items-center justify-center my-6 ${className}`}>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D3A3A5]/45 to-transparent" />
      {conDestello && (
        <span className="absolute px-3 bg-inherit flex items-center justify-center text-[#632D3E]/60 text-[10px]">
          ✦
        </span>
      )}
    </div>
  );
}

interface DegradeFusionProps {
  desde: string; // ej. "from-[#FBF8F5]"
  hacia: string; // ej. "to-[#F5EFE7]"
  altura?: string; // ej. "h-16"
  className?: string;
}

/**
 * Franja de gradiente atmosférico que fusiona dos colores de fondo continuos sin corte visible.
 */
export function DegradeFusion({
  desde,
  hacia,
  altura = "h-16",
  className = "",
}: DegradeFusionProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full ${altura} bg-gradient-to-b ${desde} ${hacia} pointer-events-none ${className}`}
    />
  );
}