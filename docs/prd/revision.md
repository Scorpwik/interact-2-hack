# Revisión del PRD

**Equipo:** Joshua Lozada y Raymond Portilla · **Fecha:** 23 de noviembre de 2026
**Fuentes:** docs/fuentes/descripcion-proyecto.md y docs/cliente/preguntas.md

> Las filas E1–E5 son la revisión **del equipo, sin IA** (Paso 2 de la guía): las completan Joshua y Raymond. Las filas 1–24 son del revisor con IA (Paso 3a). Cada cita se comprobó contra `docs/cliente/preguntas.md`. La columna «Frase exacta del PRD» cita el borrador (commit «docs(prd): borrador generado con IA»).
>
> Tipos: 1 Supuesto escrito como hecho · 2 Regla vaga o sin cifra · 3 Alcance inflado · 4 Contradicción resuelta en silencio · 5 Pregunta abierta desaparecida · 6 Perfil o permiso incompleto · 7 Detalle técnico · 8 Regla sin trazabilidad.

## Huecos

| # | Sección | Frase exacta del PRD | Tipo (1–8) | Gravedad | Origen | Qué dicen las fuentes | Decisión | Corrección |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E1 | | | | | Equipo | | | |
| E2 | | | | | Equipo | | | |
| E3 | | | | | Equipo | | | |
| E4 | | | | | Equipo | | | |
| E5 | | | | | Equipo | | | |
| 1 | 6. Estados (R8) | «En ejecución: alguien marcó el primer paso (P-09).» | 4 | alta | IA | P-09: «se esta completando cuando da el primer check»; P-01: «Mientras se abre se pone en ejecución» | Aceptado | R11 elige el primer paso y nombra la contradicción → [SUPUESTO S-22] y pregunta al cliente. |
| 2 | 6. Estados (R8) | «En edición: un administrador la está editando (P-09).» | 4 | alta | IA | P-09 lo lista como estado, pero una tarea en edición sigue teniendo su estado; P-05 prohíbe editar una en ejecución | Aceptado | R12: «En edición» es un bloqueo temporal, no un estado → [SUPUESTO S-23] y pregunta. |
| 3 | 6. Estados (R8) | «Vencida: llegó la hora de vencimiento sin completarse (P-14).» | 5 | alta | IA | P-14 no dice si el estudiante todavía puede terminarla; el supuesto «completada tarde» quedó descartado | Aceptado | R26 y [SUPUESTO S-08]: no se completa hasta que se reasigne; pregunta al cliente. R11 define «desde el minuto exacto». |
| 4 | 6. R16 | «Una tarea vencida puede ser reasignada por el administrador (P-14).» | 2 | alta | IA | P-14: «el admin puede reasignar», sin decir qué cambia | Aceptado | R25 define reasignar (responsables y/o nueva hora, se conservan los pasos) → [SUPUESTO S-30]. |
| 5 | 6. R11 vs R16 | «Una tarea en ejecución no se puede editar ni eliminar» / «puede ser reasignada» | 4 | media | IA | Una vencida con pasos marcados viene de «en ejecución»; P-05 prohíbe editarla | Aceptado | R25: reasignar es la única forma de cambiar una vencida con pasos marcados. |
| 6 | 6. R6 | «Una tarea tiene fecha y hora de vencimiento, lugar o aula, checklist y responsables (N-14).» | 4 | media | IA | P-09 y N-05 incluyen «No asignado / Sin asignar»: una tarea puede existir sin responsables | Aceptado | R7: los responsables pueden agregarse después; sin ellos, «Sin asignar». |
| 7 | 6. R8 | «Una tarea está en uno de estos estados (P-09)» | 2 | alta | IA | Las fuentes no dicen si los estados se superponen ni cuándo cambia cada uno | Aceptado | R11: «uno, y solo uno, de cinco estados», con una condición comprobable para cada uno. |
| 8 | 6. R9 | «cuando falta una hora o menos para su vencimiento (P-12).» | 2 | media | IA | P-12: «Una hora ya es por vencer y una noti»; no dice a qué estados aplica ni a quién le llega el aviso | Aceptado | R13: aplica a Sin asignar, Pendiente y En ejecución; es una alerta, no un estado; el aviso es dentro de la herramienta → [SUPUESTO S-15]. |
| 9 | 8. Puntos abiertos | «P-10 no es clara.» | 5 | alta | IA | P-10: «No debe poderse salir de una tarea hasta salirse» | Aceptado | R18 + [SUPUESTO S-26] (el avance se guarda al marcar), con pregunta. |
| 10 | 6. Reglas | (no hay regla para desmarcar un paso) | 5 | media | IA | P-11 sin respuesta | Aceptado | R19 + [SUPUESTO S-27]. |
| 11 | 8. Puntos abiertos | «P-01 no responde qué pasa con las tareas de un estudiante eliminado.» | 5 | alta | IA | P-01 habla de la tarea, no del estudiante eliminado | Aceptado | R5 + [SUPUESTO S-18], con pregunta. |
| 12 | 4. Alcance | (el borrador no dice nada del porcentaje por tarea ni de P-13) | 4 | media | IA | P-13 «si» no elige; N-05 (por tarea) y N-17 (por estudiante) piden las dos vistas | Aceptado | Las dos vistas (R28, R33); el porcentaje pasa a Could → [SUPUESTO S-13]. |
| 13 | 6. R12 | «Una tarea completada no se puede eliminar (P-06).» | 5 | media | IA | P-06 también dice «y un apartado debajo de todo que no complete», que el borrador omitió | Aceptado | R32 + [SUPUESTO S-34], con pregunta. |
| 14 | 6. R20 | «El tablero se ordena por las más cercanas a vencer (N-07)» | 5 | media | IA | N-07 da dos órdenes; N-21 da un orden de grupos (vencidas, por vencer, en ejecución, sin asignar, terminadas) | Aceptado | R29–R30 + [SUPUESTO S-32, S-33]. |
| 15 | 6. Reglas | (falta N-03 «todas las teareas van a estar abiertas no se deben ir desbloqueando») | 5 | media | IA | N-03 | Aceptado | R9 + [SUPUESTO S-10 y S-20]: interpretación y pregunta. |
| 16 | 6. R5 | «Las credenciales se le envían al estudiante por correo o por WhatsApp (P-03).» | 1 | media | IA | P-03 no dice quién las envía | Aceptado | R6: las envía el administrador por fuera de la herramienta → [SUPUESTO S-14]. |
| 17 | 6. R4 | «cada usuario puede cambiar la suya dentro de la herramienta (N-12, P-04).» | 5 | media | IA | P-04 no cubre el caso de olvidarla sin poder entrar | Aceptado | R4 + [SUPUESTO S-16]: la cambia un administrador. |
| 18 | 2. Perfiles | «Es un administrador que no se puede eliminar (N-13).» | 6 | media | IA | N-12 «Puedo cambiar las contraseñas de todos» choca con proteger al super admin | Aceptado | R3 + [SUPUESTO S-03, S-04]. |
| 19 | 6. R17 | «Una tarea urgente se asigna a todos los estudiantes (N-16).» | 6 | media | IA | En las notas, «Marcar como urgente» está bajo «Panel de estudiantes»; no dice quién marca ni si son todos o solo los disponibles | Aceptado | R27 + [SUPUESTO S-05], con pregunta. |
| 20 | 6. Reglas | (falta P-01 «Saber mientras quien la tiene abierta») | 5 | media | IA | P-01 | Aceptado | R23 + [SUPUESTO S-29]; Should S5. |
| 21 | 8. Supuestos | Tabla con solo 6 supuestos y trazabilidad sin columna de supuestos | 8 | alta | IA | La guía pide que cada regla apunte a P-xx o a un supuesto | Aceptado | 36 supuestos con pregunta; la trazabilidad tiene columna de supuesto. |
| 22 | 4. Alcance | «S1. Marcar una tarea como urgente…» … «S3. Disponibilidad…» como Should | 3 | baja | IA | N-15 a N-20 piden urgencias, panel, disponibilidad e historial | Rechazado | Ya están en Should, no en Must: el 2 de diciembre no depende de ellos. Se aclaró qué significa cada prioridad para el 2 de diciembre. |
| 23 | 4. Alcance | «completar la tarea con un gesto deliberado (N-22)» | 7 | baja | IA | N-22: «slider deslizable de izquierda a derecha» | Rechazado | Es un comportamiento que pidió el cliente, no una tecnología. Su forma visual se define en el DESIGN.md. |
| 24 | 3. Objetivos | «En el tablero ve primero lo vencido» | 1 | baja | IA | N-21 pone «vencidas» primero | Rechazado | Sí tiene fuente (N-21); la señal de éxito sigue como [SUPUESTO S-11]. |

## Para presentar

_(Se completa en el Paso 4.)_

## Preguntas para el cliente

_(Se completa en el Paso 4.)_
