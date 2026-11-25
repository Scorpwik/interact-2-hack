# Audit · Dirección B «Tablero de salidas»

**Fecha:** 24 de noviembre de 2026. Contrastes calculados con la fórmula WCAG 2.x (luminancia relativa). Las transparencias se mezclan con su fondo real: negro #050307 o superficie #0B0612. El script está en el DESIGN.md (sección 6).

| # | Hallazgo | Gravedad | Decisión | Razón y qué cambia |
| --- | --- | --- | --- | --- |
| A-01 | El borde de componente del brandboard (blanco 14 %) mide **1,37:1** sobre negro y **1,41:1** sobre superficie. **No pasa 3:1** para bordes de control. | Alta | **Aceptado** | Los controles (campos, casillas del checklist, botón secundario sin relleno) usan un borde de **blanco 45 % (4,43:1 sobre negro; 4,48:1 sobre superficie)**. El 14 % queda solo para separadores y tarjetas, que no son controles. |
| A-02 | Blanco sobre morado neón: **3,43:1**. No pasa para texto normal. | Alta | **Aceptado** | Texto **tinta sobre morado** (5,83:1) en el botón primario y en la tarjeta señal, como dice el brandboard. |
| A-03 | Morado profundo sobre negro: **2,40:1**. | Alta | **Aceptado** | Nunca como texto ni como borde de control; solo como fondo de la etiqueta «Urgente», con texto blanco (8,54:1). |
| A-04 | Blanco 45 % sobre negro: **4,43:1**. Queda corto para texto normal. | Media | **Aceptado** | No se usa para texto. Para el texto secundario, los placeholders y el autor de cada paso se usa blanco 64 % (8,27:1). |
| A-05 | No hay foco visible en el tile. | Alta | **Aceptado** | Anillo de foco lima de 2 px con 2 px de separación: **13,61:1 sobre negro**. Nunca se quita el foco. |
| A-06 | Las filas del checklist miden 44 px; Android pide 48 dp (brandboard sec. 13). | Media | **Aceptado** | Todo control táctil mide **48 × 48 px** como mínimo; las filas del checklist, 56 px de alto. |
| A-07 | Pendiente y Sin asignar se parecen (los dos son blancos). | Media | **Aceptado** | Ícono y texto distintos: Pendiente = círculo vacío «○ Pendiente», blanco. Sin asignar = persona con signo «? Sin asignar», blanco 64 % con borde discontinuo. Ningún estado depende solo del color. |
| A-08 | Rojo y ámbar no existen en Señal Neón. | Media | **Aceptado como [SUPUESTO]** | Se agregan dos colores funcionales, rojo #FF5C5C (6,78:1 sobre negro) y ámbar #FFB020 (11,23:1), solo para Vencida/Fuera de hora y Por vencer. El equipo debe confirmarlo (DESIGN.md, sección 11). |
| A-09 | Cargar las fuentes desde un servicio externo falla con mala señal. | Alta | **Aceptado** | Las 4 fuentes (Big Shoulders 700/900 y Sora 400/600, unos 58 kB) se sirven con la herramienta, sin depender de otro servicio. Mientras cargan se muestra la fuente de respaldo (Arial Narrow / Segoe UI). |
| A-10 | El brillo radial y los degradados de la dirección C pesan en celulares básicos. | Media | **Aceptado** | No hay brillos ni degradados en las listas. El único degradado es la barra de progreso. |
| A-11 | Un temporizador que se actualiza cada segundo y se anuncia a los lectores de pantalla satura. | Media | **Aceptado** | El temporizador cambia por minuto. Solo se anuncia cuando la tarea entra en «Por vencer» o vence. |
| A-12 | Hace falta un modo claro para leer bajo el sol. | Media | **Rechazado** | El brandboard dice «Modo claro: no se ofrece: la app es oscura por diseño». A cambio, el texto principal es blanco (20,54:1). Queda como pregunta para el equipo. |
| A-13 | La barra de progreso como único indicador de avance depende del color. | Media | **Aceptado** | Siempre va con el texto «3 de 5 pasos · 60 %». La barra tiene 6 px y su relleno morado mide 5,83:1 sobre la superficie. |
| A-14 | El aviso sin internet como mensaje que desaparece se pierde. | Alta | **Aceptado** | Es una **banda fija** arriba de la pantalla mientras no haya conexión. Las casillas se ven bloqueadas, con candado y el texto «Sin conexión», y no se pueden tocar (R19). |
| A-15 | Nombres largos o sin espacios desbordan la fila en 360 px. | Baja | **Aceptado** | El texto se corta en varias líneas; nada genera scroll horizontal en 360, 390, 768 y 1280 px. |
| A-16 | Las animaciones de entrada (800 ms + 110 ms por elemento) retrasan la lectura. | Media | **Aceptado** | En listas y en el tablero no hay entradas animadas. Las transiciones de la interfaz duran 200 ms. Con «reducir movimiento» no hay animación. |
| A-17 | Tamaño de los campos en el celular. | Media | **Aceptado** | Los campos usan texto de 16 px como mínimo, para que el celular no haga zoom al escribir. |

## Pasada con `/impeccable audit` · 25 de noviembre de 2026

No se ejecutó `/impeccable init` ni `/impeccable document`. El detector es el binario de Impeccable (clonado fuera del repositorio).

Comandos, desde la raíz del repo, con `IMPECCABLE_HOME=/tmp/impeccable-home`:

```text
impeccable detect --json docs/diseno/brand-board.plantilla.html
impeccable detect --json docs/diseno/bocetos.plantilla.html
impeccable detect --json --viewport 390x844 docs/diseno/brand-board.plantilla.html
```

`direcciones.html` no se escaneó: casi todo el archivo son las fuentes en base64. El viewport 390×844 devolvió el mismo único hallazgo que el escaneo sin viewport.

| # | Dimensión | Nota | Evidencia |
| --- | --- | --- | --- |
| 1 | Accesibilidad | 3 | Contraste calculado en DESIGN.md, sección 6.1. Foco lima. La acción del aviso medía 32 px. |
| 2 | Rendimiento | 3 | Cuatro fuentes incrustadas, sin red. Una sola transición de interfaz. Sin brillos en las listas. |
| 3 | Temas | 3 | Un solo tema oscuro, como pide Señal Neón. Tres tamaños estaban escritos en px sueltos. |
| 4 | Responsive | 3 | Columna en el celular, cuadrícula desde 300 px. Áreas de 48 y 56 px, salvo la acción del aviso. |
| 5 | Integridad | 3 | Los estados del PRD están en la página. El detector no encontró otra deriva. |
| **Total** | | **15/20** | **Bueno** (14–17) |

| # | Hallazgo | Gravedad | Decisión | Razón |
| --- | --- | --- | --- | --- |
| A-18 | `flat-type-hierarchy` en la plantilla, en los bocetos y en el viewport 390. El detector reportó h1 = h2 = h3 = 16 px. Salida con hallazgos (código 2). | Baja | **Rechazado** | No calcula las variables. `--fs-h1` es 40 px, `--fs-h2` es 28 px, `--fs-cuerpo` es 16 px. La página renderizada no es plana. |
| A-19 | `.aviso .acc` con `min-height: 32px`. | Media | **Aceptado** | Quedó en `var(--tactil-min)`, 48 px. |
| A-20 | `font-size: 18px` en `.senal h3` y `40px` fijo en `.total .n` y `.anillo span`. | Baja | **Aceptado** | Quedaron en `--fs-titulo-tarea` y `--fs-h1`. |
| A-21 | La etiqueta de la pestaña del celular está en 12 px, sin token. | Baja | **Rechazado** | DESIGN.md, sección 5.11, pide Sora 600 a 12 px en esa barra. No es un descuido. |
| A-22 | `@media (prefers-reduced-motion: reduce)` pone `animation: none` y `transition: none` en todo. | Baja | **Rechazado** | Coincide con «con reducir movimiento, nada se anima». El estado no depende del movimiento. |
