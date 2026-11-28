---
name: ui-design-critique
description: Revisa una página o componente de Señal de Turno y entrega un informe en español con problemas concretos y prioridades, contrastado con DESIGN.md y el PRD. Usar al pedir una crítica de diseño, una revisión de una pantalla o una auditoría UX de un componente.
license: MIT
---

Adaptación para Señal de Turno de la skill propia de Joshua Lozada, basada en marcos públicos de crítica de diseño y en las heurísticas de Nielsen (ver `ATTRIBUTION.md`).

**Primero:** lee `AGENTS.md`, `DESIGN.md` (§5 componentes, §8 reglas para el agente, §9 criterios D-01 a D-20) y, si la pantalla aplica reglas de negocio, las R# del PRD que cita el paso. **DESIGN.md decide; esta crítica recomienda.** No propongas cambiar tokens, fuentes, colores ni la dirección visual: si algo de DESIGN.md parece un problema, anótalo como pregunta.

## Cuándo usarla

Se te indica un archivo, una ruta (`/mis-tareas`, `/tareas/[id]`, `/tablero`, `/catalogo`) o un componente. Lee el código **y** piensa en cómo se ve en el celular (390 px) y en el escritorio (1280 px).

## Qué evaluar

1. **Fidelidad a DESIGN.md:** tokens (D-09), radio 0 (D-07), una sola superficie morada por vista (D-08), nombres de estados y marcas exactos (D-01), estado con texto + ícono (D-02), temporizador con su palabra (D-20).
2. **Jerarquía y tarea principal:** ¿se entiende en 2 segundos qué hacer? Estudiante: qué tarea vence primero y cómo completarla. Administrador: qué está por vencer o vencido en el tablero.
3. **Arquitectura de información:** agrupación del tablero según R31, filtros comprensibles, sin sobrecarga de opciones en una sola vista.
4. **Responsive:** sin scroll horizontal en 360 px (D-15), áreas táctiles de 48/56 px (D-06). Para detalle, skill `mobile-first-responsive`.
5. **Accesibilidad (muestra):** foco lima visible (D-05), contraste (D-03, D-04), nombres accesibles en botones con solo ícono. Si hay hallazgos graves, skill `accessibility`.
6. **Textos:** español en «tú», sin signos de exclamación, mensajes de error que dicen qué pasó y qué hacer (R37). Para reescribirlos, skill `ux-writing`.
7. **Estados:** vacío, cargando, error, deshabilitado, sin conexión (D-11) y confirmación (D-13): ¿guían el siguiente paso?

## Formato del informe (obligatorio)

En español, directo:

### Impresión general
2–4 oraciones.

### Lo que funciona
2–3 puntos con referencia al archivo o componente.

### Problemas prioritarios (máximo 5)
Por cada uno: **qué** (componente o zona) · **por qué importa** (para el estudiante o el administrador, con la D-## o R# que toca) · **arreglo concreto** (Tailwind/React con tokens) · **skill sugerida** (`mobile-first-responsive`, `accessibility`, `ux-writing`, `web-design-guidelines`).

### Observaciones menores

### Preguntas abiertas
1–3 preguntas si falta contexto. No inventes requisitos: lo que el PRD no define se anota como [SUPUESTO] o pregunta.

**Reglas:** nombra archivos y líneas cuando se pueda; prioriza el uso en el celular del estudiante y la lectura rápida del tablero; no suavices la crítica.
