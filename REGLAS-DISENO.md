# Reglas de Diseño UI/UX — Pablo Bejas

Este documento reúne las reglas universales de diseño visual, proporción, color y espaciado para aplicar en cualquier proyecto web o de software. Está pensado como un archivo vivo al que se irán sumando nuevas reglas progresivamente.

---

## Regla 1: Escala Tipográfica con Proporción Áurea (`× 1,618`)

Para definir la jerarquía entre textos y títulos sin dudar ni elegir tamaños al azar, multiplicar el tamaño del texto base por el número áureo (**`1,618`**) y redondear al entero más cercano.

- **Fórmula**: $\text{Tamaño Superior} = \text{Tamaño Base} \times 1,618$
- **Escala práctica (partiendo de un cuerpo base de `16px`)**:
  - **Texto auxiliar / Etiquetas (Small)**: `10px` a `12px` ($16 \div 1,618 \approx 10\text{px}$)
  - **Texto de cuerpo (Body)**: **`16px`** (`1rem` / `text-base`)
  - **Subtítulo / Título de tarjeta (H3)**: **`26px`** ($16 \times 1,618 = 25,888 \approx 26\text{px}$ / `text-[26px]`)
  - **Título de sección (H2)**: **`42px`** ($26 \times 1,618 = 42,068 \approx 42\text{px}$ / `text-[42px]`)
  - **Título principal / Hero (H1)**: **`68px`** ($42 \times 1,618 = 67,956 \approx 68\text{px}$ / `text-[68px]` en desktop, `42px` en mobile)

### Aplicación en CSS / Tailwind CSS
Definir tokens semánticos para reutilizar la proporción en todo el proyecto:
```css
:root {
  --texto-auxiliar: 0.75rem;   /* 12px */
  --texto-cuerpo: 1rem;        /* 16px */
  --titulo-h3: 1.625rem;       /* 26px (16 × 1.618) */
  --titulo-h2: 2.625rem;       /* 42px (26 × 1.618) */
  --titulo-h1: 4.25rem;        /* 68px (42 × 1.618) */
}
```

---

## Regla 2: La Paleta de Cuatro (`Neutro, Base, Contraste y Acento`)

Evitar la saturación de colores sin propósito. Toda interfaz sólida se construye sobre una estructura de **cuatro roles cromáticos bien definidos**:

1. **Neutro (`--color-neutro`)**:
   - **Función**: Aportar legibilidad, limpieza, fondos secundarios suaves o textos claros sobre fondos oscuros.
   - **Uso**: Textos principales/secundarios, bordes sutiles, áreas de respiro visual.
2. **Base (`--color-base`)**:
   - **Función**: Ser el color dominante que define la atmósfera y personalidad institucional de la marca.
   - **Uso**: Fondos principales, contenedores estructurales, cabeceras y bloques de identidad.
3. **Contraste (`--color-contraste`)**:
   - **Función**: Romper visualmente con el color base para dirigir la mirada hacia los elementos de conversión o bloques destacados.
   - **Uso**: Botones de acción primaria (CTAs), insignias de alto valor, tarjetas destacadas.
4. **Acento (`--color-acento`)**:
   - **Función**: Dar vida, dinamismo y feedback interactivo sin competir con el botón de contraste.
   - **Uso**: Estados activos, focos de navegación, íconos iluminados, subrayados, indicadores de progreso y micro-interacciones.

> **Nota**: Los colores semánticos de sistema (éxito, advertencia, error) se reservan exclusivamente para estados de validación o alertas y no forman parte de la paleta decorativa.

### Paleta Oficial del Proyecto: Dusty Rose & Burgundy (Myriam Depetris)
Basada en `Documentacion/Diseño/paletaColores.jpg`:

```css
:root {
  /* Mapeo de Roles Cromáticos */
  --color-neutro-fondo: #FBF8F5;    /* Crema claro / Fondos principales limpios */
  --color-neutro-superficie: #F0D9D8;/* Soft Blush / Tarjetas secundarias y descansos */
  --color-base: #F5EFE7;            /* Fondo base cálido institucional */
  --color-texto-principal: #4A202B; /* Tinta profunda / Ink cálido */
  --color-texto-secundario: #705064;/* Deep Plum suave */
  --color-contraste: #632D3E;       /* Burgundy / Botones principales y acciones de compra */
  --color-contraste-hover: #521827; /* Burgundy intenso en hover */
  --color-acento: #D3A3A5;          /* Dusty Rose / Foco, badges, micro-interacciones */
  --color-acento-secundario: #B18C9B; /* Muted Mauve / Detalles refinados y bordes activos */
  --color-borde: #D7C5BA;           /* Borde sutil neutro */
}
```

---

## Regla 3: Dupla Tipográfica Editorial

Para proyectos de estilismo de mesas y diseño de experiencias boutique, la tipografía debe comunicar distinción, calidez y legibilidad editorial:

- **Tipografía de Títulos y Acentos (Editorial / Serif)**: `Playfair Display`
  - Uso: H1 (Hero), H2 (Títulos de sección), frases destacadas (*statement*), nombres de servicios y eventos.
  - Estilos recomendados: `font-normal` (400) o `italic` (para dar ritmo y sofisticación sin recargar).
- **Tipografía de Cuerpo e Interfaz (Sans-Serif Legible)**: `DM Sans`
  - Uso: Párrafos de texto, fichas técnicas de productos, formularios, etiquetas, botones de acción y panel de administración.
  - Estilos recomendados: `font-normal` (400), `font-medium` (500) y `font-semibold` (600).

---

## Regla 4: Espacios en Múltiplos de 4 (`4, 8, 16, 24, 32...`)

Todos los márgenes (`margin`), rellenos internos (`padding`), separaciones entre elementos (`gap`) y alturas/anchos de controles deben avanzar en **múltiplos estrictos de `4px`**. Esto garantiza que toda la interfaz se vea matemáticamente alineada y ordenada.

- **Escala de espaciado base**:
  - **`4px`** (`0.25rem` / `p-1`, `gap-1`): Separación mínima entre ícono y etiqueta pequeña o bordes internos finos.
  - **`8px`** (`0.5rem` / `p-2`, `gap-2`): Separación entre elementos íntimamente relacionados (píldoras, badges, botones compactos).
  - **`16px`** (`1rem` / `p-4`, `gap-4`): Separación estándar entre párrafos, inputs de formulario o elementos internos de una tarjeta.
  - **`24px`** (`1.5rem` / `p-6`, `gap-6`): Relleno interno estándar de tarjetas (`cards`) y separación entre columnas en grillas medianas.
  - **`32px`** (`2rem` / `p-8`, `gap-8`): Relleno de tarjetas principales, separación entre bloques de contenido o encabezados de sección.
  - **`48px` / `64px` / `96px`** (`p-12`, `p-16`, `py-24`): Separación vertical entre secciones completas de la página.

- **Regla de oro**: Prohibido usar valores arbitrarios impares o fuera de escala (como `13px`, `19px`, `27px`).

---

## Próximas Reglas
*(Espacio reservado para añadir nuevas reglas de diseño, composición, micro-interacciones y UX en futuras iteraciones).*
