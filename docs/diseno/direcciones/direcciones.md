# Tres direcciones y la elegida

Los style tiles están en `direcciones.html`. Ábrelo en el navegador: es un archivo autocontenido, con las fuentes incluidas. Los tres usan los mismos datos de ejemplo del producto:
- una tarea **por vencer** en ejecución (3 de 5 pasos);
- una **pendiente**;
- una **completada**;
- un checklist a medio completar.

## Por qué las tres viven dentro de Señal Neón

El equipo decidió seguir el brandboard Interact2Hack Señal Neón v1.0 (D-P16). Por eso ninguna dirección cambia la paleta (negro #050307, morado neón #A46CFB, lima #5CF000, tinta #0B0612, morado profundo #5B2BB5), las fuentes (Big Shoulders Display para títulos y cifras, Sora para texto) ni las esquinas rectas. Lo que cambia, y lo que las hace claramente distintas, son tres variables:

| Variable | A · Cartel | B · Tablero de salidas | C · Neón de estado |
| --- | --- | --- | --- |
| Densidad | Baja: 2 o 3 tareas por pantalla | Alta: filas compactas, 6 a 8 tareas por pantalla | Media: tarjetas con barra |
| Jerarquía | El título de la tarea (Big Shoulders 32 px) | La hora que queda y el estado; el título va en Sora 15 px | El color del estado |
| Uso del neón | Una tarjeta señal morada grande | Morado solo en la acción principal; lima solo como punto de «en ejecución» y en los pasos marcados | Morado, lima y ámbar en todas las tarjetas, con degradados y brillo |
| Origen en el brandboard | Slides y tarjeta señal (sec. 07) | Chips con punto lima (sec. 07) y app móvil (sec. 13) | Gradiente de progreso y brillo radial (sec. 03) |

## Comparación con el brief

| Criterio del brief | A | B | C |
| --- | --- | --- | --- |
| Fácil de usar | Media: muy claro, pero en el tablero obliga a hacer mucho scroll | **Alta**: lectura de un vistazo, como la pantalla de salidas | Media: el color ayuda, pero compite |
| Carga rápida | Alta | **Alta**: plano, sin degradados ni brillos | Baja: brillo radial y degradado en cada tarjeta |
| Útil sin excesos | Media: los títulos grandes ocupan espacio útil | **Alta**: cada píxel muestra un dato | Baja: decoración en cada tarjeta |
| Celular del estudiante | Bien | Bien: la fila se apila; el checklist mide 44 px o más | Bien |
| Escritorio del admin (tablero de 30 o más tareas) | Mal | **Bien** | Regular |
| Reglas de Señal Neón | Cumple | Cumple | **No cumple** «lima escaso» ni «una sola señal morada por vista» |

## Dirección elegida: B · Tablero de salidas

> La comparación de las tres direcciones la preparó la IA a partir del brief del equipo. **El equipo la confirmó el 25 de noviembre de 2026: se queda B.**

**Por qué:**
1. Es la única que cumple las tres palabras del equipo a la vez. Es plana y densa sin ser decorativa, y la información va primero.
2. Responde al contexto del PRD. En el escritorio, el administrador necesita ver muchas tareas agrupadas por estado y ordenadas por cercanía al vencimiento (R30–R33). En el celular, el estudiante necesita la hora que le queda y el siguiente paso (R15, R35).
3. Respeta Señal Neón sin forzarlo. Usa el chip con punto lima tal como lo define el brandboard («El punto lima marca el estado activo») y el morado solo en la acción principal.
4. Al no tener degradados por tarjeta ni brillos, pesa poco y se dibuja rápido en celulares básicos con mala señal, que es el contexto del evento (D-S-02).

**Qué toma de las otras dos:**
- De **A**: **una sola tarjeta señal morada** por vista, para la tarea más urgente del usuario («Vence primero»). Así se recupera el carácter del cartel sin perder densidad.
- De **C**: la **barra de progreso morado → lima**, solo en el indicador de pasos de la tarea y en el tablero de cumplimiento. El brandboard reserva ese degradado «para indicadores de progreso», así que no rompe ninguna regla.

**Qué se descarta:** los fondos teñidos por estado, el brillo radial detrás de las listas y los títulos de tarea en Big Shoulders (A y C).
