# Critique · Dirección B «Tablero de salidas»

**Fecha:** 24 de noviembre de 2026 · **Revisado:** style tile B de `docs/diseno/direcciones/direcciones.html`, contra el brief (`docs/diseno/brief.md`), el PRD (`docs/prd/PRD.md`) y Señal Neón v1.0.

| # | Hallazgo | Gravedad | Decisión | Razón y qué cambia en el DESIGN.md |
| --- | --- | --- | --- | --- |
| C-01 | Sin un foco claro, la lista parece una hoja de cálculo: todas las filas pesan lo mismo. | Alta | **Aceptado** | Una **tarjeta señal** morada por vista para la tarea más urgente del usuario («Vence primero»), tomada de la dirección A. Es la única superficie morada sólida de la vista (regla 2 de Señal Neón). |
| C-02 | **El cliente pidió «una cuadricula con tarjeta» para el tablero (N-05), y el tile B usa filas.** | Alta | **Aceptado** | En el escritorio, el tablero es una **cuadrícula de tarjetas compactas** (estilo «tarjeta de salida»), agrupadas por estado (R31). En el celular, la misma tarjeta se apila en una sola columna. La densidad de B se conserva dentro de cada tarjeta. |
| C-03 | La columna de la hora mezcla tiempo restante («2:42 h»), hora de reloj («09:12») y minutos («42 min»). Es ambigua. | Alta | **Aceptado** | El temporizador siempre dice qué es: «Faltan 42 min», «Venció hace 12 min», «Completada 09:12». La cifra va en Big Shoulders y la palabra en Sora. |
| C-04 | La vencida no se distingue lo suficiente de la pendiente. | Alta | **Aceptado** | Vencida: insignia roja con ícono «!» y texto, y temporizador rojo «Venció hace…». Sin bordes laterales de color (de C se descartaron). |
| C-05 | «Urgente» y «En edición» (PRD R12) no aparecen en el tile. | Alta | **Aceptado** | Se agregan como **marcas**: «Urgente» con etiqueta de fondo morado profundo y texto blanco (8,54:1). «En edición» con candado, nombre de quien edita y tarjeta bloqueada (R13). |
| C-06 | Los títulos en Sora pierden el carácter de cartel de Interact2Hack. | Media | **Rechazado** | El brandboard prohíbe Big Shoulders por debajo de 24 px y en textos largos, y los nombres de tarea son frases largas. El carácter se lleva en las cifras del temporizador, en los títulos de sección y en la tarjeta señal. |
| C-07 | Deslizar para completar (N-22) no explica por qué no se puede completar todavía. | Alta | **Aceptado** | El control deshabilitado dice lo que falta: «Faltan 2 pasos y la observación» (R16, D-S-24). |
| C-08 | El autor y la hora de cada paso (12 px, gris) se leen mal en el celular. | Media | **Aceptado** | Pasa a 13 px, blanco al 64 % (8,20:1 sobre superficie). |
| C-09 | Demasiados kickers en mayúsculas con +0,2 em de tracking cansan. | Baja | **Aceptado** | Los kickers solo van en encabezados de sección y en la tarjeta señal; las insignias van en Sora 600 en tipo oración. |
| C-10 | Celebrar la tarea completada con el barrido de 900 ms del brandboard. | Media | **Rechazado** | Va contra «carga rápida». El completado usa una transición de 200 ms y un aviso de confirmación (D-S-11). El barrido se reserva para la entrada de la tarjeta señal, una vez por carga. |
| C-11 | Pintar todos los temporizadores en lima («lima = ahora»). | Media | **Rechazado** | Rompe «el lima es escaso». El lima queda para el punto de «En ejecución», el paso marcado y el foco. Los temporizadores van en blanco, en ámbar si está por vencer y en rojo si venció. |
| C-12 | El estudiante no ve en la tarjeta con quién comparte la tarea. | Media | **Aceptado** | La tarjeta muestra las iniciales de los responsables y el detalle muestra nombre y teléfono (R23, N-10). |
| C-13 | Falta mostrar el bloqueo de «una tarea abierta a la vez» (R17). | Media | **Aceptado** | Aviso en línea: «Termina "Preparar Sala 3" antes de empezar otra tarea», con un botón para volver a esa tarea. |
| C-14 | Agregar ilustraciones o fotos con grado morado para dar calidez. | Baja | **Rechazado** | «Útil sin excesos» y «carga rápida»: no hay fotos en la herramienta. El grado de foto queda para piezas de comunicación. |

## Pasada con `/impeccable critique` · 25 de noviembre de 2026

⚠️ DEGRADED: single-context (el detector corrió aparte; esta lectura de diseño se cerró en el mismo hilo porque la otra evaluación no había vuelto). No se ejecutó `/impeccable init` ni `/impeccable document`.

**Objetivo:** `docs/diseno/brand-board.plantilla.html`, visto en el navegador en `http://127.0.0.1:8765/docs/diseno/brand-board.html`.
**Comando del detector:** `impeccable detect --json` sobre la plantilla, sobre `bocetos.plantilla.html` y otra vez con `--viewport 390x844`. Las tres salidas tienen un solo hallazgo.

**Especificidad.** El tablero está escrito para este producto: hora que falta, aula, checklist y los cinco estados del PRD. No sirve igual para otra app si se le quitan «Preparar Sala 3» y «Vence primero».

**Carga cognitiva.** Falla 1 de 8: el panel de filtros muestra 5 opciones a la vez (R32). El resto pasa. Carga baja.

**Recorrido.** El pico es deslizar para completar. El valle es la vencida («Venció hace 18 min»), con texto y no solo color. La banda de sin conexión explica por qué no se puede marcar.

| # | Heurística | Nota | Qué se vio |
| --- | --- | --- | --- |
| 1 | Visibilidad del estado | 3 | Insignia, temporizador con palabra y banda de sin conexión. |
| 2 | Correspondencia con el mundo real | 4 | Misma lectura que una pantalla de salidas: hora, estado, lugar. |
| 3 | Control y libertad | 3 | Se puede desmarcar, reasignar y reabrir. El deslizador evita completar de un toque. |
| 4 | Consistencia | 3 | Un sistema. El nombre de la tarjeta señal y las cifras del tablero no usaban el token. |
| 5 | Prevención de errores | 3 | Guardar deshabilitado, completar bloqueado si faltan pasos u observación. |
| 6 | Reconocer antes que recordar | 3 | Estado con ícono y texto. Las iniciales de los responsables están en la tarjeta. |
| 7 | Flexibilidad | 2 | El administrador filtra. No hay atajos. En el celular basta con un camino. |
| 8 | Estética y mínima | 3 | Una sola tarjeta morada. El lima solo marca lo que pasa ahora. |
| 9 | Recuperación | 3 | Aviso de error con «Reintentar». Una completada se reabre. |
| 10 | Ayuda | 2 | No hay pantalla de ayuda. El deslizador dice lo que falta. |
| **Total** | | **29/40** | **Bueno** (28–35) |

| # | Hallazgo | Gravedad | Decisión | Razón |
| --- | --- | --- | --- | --- |
| C-15 | El detector dijo «jerarquía tipográfica plana»: h1, h2 y h3 a 16 px. | Baja | **Rechazado** | Falso positivo. No resuelve `var()`. En DESIGN.md el h1 es 40 px, el h2 es 28 px (40/28 = 1,43) y el cuerpo es 16 px. En el navegador, «Señal de Turno» se lee muy por encima del texto. |
| C-16 | La acción del aviso («Ver tarea») medía 32 px de alto. | Media | **Aceptado** | D-06 pide 48 px. En la plantilla pasó a `var(--tactil-min)`. DESIGN.md, sección 5.8, lo deja escrito. |
| C-17 | El nombre de la tarjeta señal estaba fijo en 18 px, y las cifras del tablero en 40 px, fuera del token. | Baja | **Aceptado** | Pasaron a `--fs-titulo-tarea` (17 px) y `--fs-h1` (40 px). El tamaño que se ve no cambia de forma útil; deja de haber un número suelto. |
| C-18 | Quitar filtros para dejar 4 opciones o menos. | Baja | **Rechazado** | R32 pide esas opciones. Se agrupan en una sola fila que salta de línea. |
| C-19 | Con «reducir movimiento», la página apaga toda transición. | Baja | **Rechazado** | Es la decisión DD-09 y A-16. El cambio de estado sigue en color, ícono y texto. |

Questions skipped: 2 priority issues.
