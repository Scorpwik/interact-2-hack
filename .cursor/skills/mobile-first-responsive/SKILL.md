---
name: mobile-first-responsive
description: Diseña y revisa layouts mobile-first de Señal de Turno (celular del estudiante, escritorio del administrador) con Tailwind, áreas táctiles y sin scroll horizontal. Usar al adaptar una pantalla a celular y escritorio, al corregir un problema de responsive o al revisar una vista en 360, 390, 768 y 1280 px.
license: MIT
---

Adaptación para Señal de Turno de la skill propia de Joshua Lozada (ver `ATTRIBUTION.md`). **Las medidas las fija `DESIGN.md`; si esta skill y DESIGN.md no coinciden, manda DESIGN.md.**

Lee antes: `AGENTS.md`, `DESIGN.md` §4 (tokens, rejilla), §5 (componentes), §6 (accesibilidad) y §9 (D-06, D-15, D-16, D-17).

## Principios

1. El estilo base es el del celular (360–430 px). Se agregan `md:` y `lg:` solo cuando cambia el layout (rejilla de DESIGN.md: celular 4 columnas, tablet 8, escritorio 12 con contenido máximo de 1200 px).
2. El estudiante usa la herramienta en el celular y en movimiento: la acción principal (abrir la tarea, marcar pasos, deslizar para completar) queda al alcance del pulgar y con el menor scroll posible.
3. El administrador usa el escritorio: el tablero es una cuadrícula de tarjetas agrupadas (DD-07, D-17); en el celular, la misma tarjeta en una columna.

## Touch e interacción

- Todo control mide **48 × 48 px o más**; las filas del checklist y el deslizador, **56 px** (D-06). Si el ícono es más chico, el área táctil se amplía con padding.
- Campos de formulario con texto de 16 px o más en el celular para que iOS no haga zoom; nunca se desactiva el zoom del navegador.
- Nada crítico depende solo de `hover`: todo existe también con el dedo y con el teclado.
- Las barras fijas (superior, inferior y la banda sin conexión) no tapan el foco ni el elemento enfocado.

## Layout y contenido

- Sin scroll horizontal en 360 px, ni con un nombre de tarea de 80 caracteres sin espacios (D-15): `min-w-0`, `break-words` o `overflow-wrap:anywhere` donde haga falta.
- Solo espacios, tamaños y colores de los tokens (D-09); nada de `p-[13px]` ni hexadecimales.
- Con «reducir movimiento» no hay animaciones (D-16).

## Checklist de revisión

Al terminar un cambio de interfaz, revisa en DevTools:

- [ ] 360 px: sin scroll horizontal (D-15).
- [ ] 390 px: áreas táctiles de 48 y 56 px (D-06); la acción principal visible sin scroll excesivo.
- [ ] 768 px: dos tarjetas por fila.
- [ ] 1280 px: tablero de 3 tarjetas por fila, agrupado según R31 (D-17).
- [ ] Con teclado: foco lima visible en todo (D-05).

Para una auditoría línea a línea, combínala con la skill `web-design-guidelines`; para accesibilidad a fondo, con `accessibility`.
