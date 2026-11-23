# Proyecto final — Avance #1 · Preguntas y respuestas del cliente (actualizado)

**USFQ · Desarrollo Web 2** · Cliente: Interact2Hack
**Integrante 1:** Joshua Lozada · **Integrante 2:** Raymond Portilla
**Sesión con el cliente:** 11 de noviembre de 2026 · **Actualizado:** 23 de noviembre de 2026

> La columna «Respuesta del cliente» se copió **literalmente**, con las palabras y la ortografía con las que se anotó en la sesión. No se corrigió ni se interpretó. La interpretación del equipo va en la columna «Estado del supuesto» y, en el PRD, como [SUPUESTO].
> Estados: **confirmado** (el cliente dijo lo mismo que el supuesto), **descartado** (el cliente dijo otra cosa) o **pendiente** (no respondió o la respuesta no alcanza para decidir).

## 1. Lo que entendimos

La herramienta sirve para que los organizadores del Interact2Hack repartan y controlen el trabajo del staff durante el hackathon. Los administradores crean tareas con fecha, hora, lugar y un checklist paso a paso, y se las asignan a uno o varios estudiantes. Los estudiantes entran con el usuario que les crea el administrador, ven sus tareas, van marcando cada paso y pueden dejar observaciones. Cuando todos los pasos están marcados, la tarea queda completada. En un día del hackathon, un estudiante abre la app, ve que tiene que preparar un aula antes de las 10:00, sigue el checklist y guarda. Mientras tanto, el administrador revisa en el tablero qué tareas están por vencer.

## 2. Preguntas para el cliente

| Id | Tema | Pregunta | Por qué importa | Nuestro supuesto | Prioridad | Respuesta del cliente (literal) | Estado del supuesto |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P-01 | Usuarios | Si se elimina a un estudiante que tenía tareas a medio hacer, ¿qué pasa con esas tareas? | Define si se reasignan, se borran o quedan sin responsable | Quedan sin responsable y el admin las ve marcadas para reasignar | Alta | Mientras se abre se pone en ejecución, no debe haber la opción dee borrar una restricción de cuando esta en ejecución no se puede borrar.<br>Saber mientras quien la tiene abierta.<br>No debe dejar completar sin completar algo | **pendiente**: la respuesta habla de la tarea (no se borra si está en ejecución, se ve quién la tiene abierta, no se completa con pasos sin marcar), no de qué pasa al eliminar a un estudiante. |
| P-02 | Usuarios | Al crear un usuario, ¿qué datos necesita el administrador además del nombre, usuario y perfil (por ejemplo correo, teléfono o carrera)? | Define el formulario de gestión de usuarios y cómo se contacta al staff | Nombre, usuario, correo y perfil | Media | Nombre<br>Correo estud<br>Telefono<br>Que días y y horas | **descartado**: el cliente agrega teléfono y los días y horas de disponibilidad; no menciona «usuario» aparte del correo. |
| P-03 | Acceso | ¿Cómo recibe el estudiante su usuario y contraseña: en persona, por correo u otra forma? | Define cómo se entregan las cuentas antes del evento | El admin crea la cuenta y le pasa los datos en persona | Alta | Por correo todas las credenciales o por whats | **descartado**: por correo o por WhatsApp, no en persona. No dice si los envía la herramienta o el administrador. |
| P-04 | Acceso | Si un estudiante olvida su contraseña en pleno hackathon, ¿la recupera solo o se la pide a un administrador? | Define si hace falta una opción de «olvidé mi contraseña» | El admin se la restablece | Alta | Puede cambiar dentro del portal | **pendiente**: el usuario puede cambiar su contraseña dentro del portal, pero eso no resuelve el olvido si no puede entrar. La nota N-12 («Puedo cambiar las contraseñas de todos») apoya que el admin la restablezca. |
| P-05 | Tareas | Si el admin cambia el checklist de una tarea que el estudiante ya empezó, ¿se mantienen los pasos ya marcados? | Evita que se pierda el avance del estudiante | Se conservan los pasos que no cambiaron y los nuevos aparecen sin marcar | Alta | Una vez que esta en estado de en ejecución no se le puede editar borrar o completar hasta que se complete todo | **descartado**: una tarea en ejecución no se puede editar ni borrar. |
| P-06 | Tareas | ¿Se puede eliminar una tarea que ya fue completada, o debe quedar como registro? | Define si hay un historial de lo hecho | Las completadas no se borran, solo se archivan | Media | No s epuede borrar y un apartado debajo de todo que no complete | **confirmado** en parte: la completada no se puede borrar. **Pendiente**: qué es «un apartado debajo de todo que no complete». |
| P-07 | Asignación | Si una tarea tiene tres responsables, ¿basta con que uno complete el checklist o lo tiene que completar cada uno? | Cambia por completo cómo funciona la ejecución | Hay un checklist compartido y lo que marca uno lo ven todos | Alta | si | **confirmado por la nota N-02** («Con que cualquiera complete ya esta»). El «si» por sí solo no elige entre las dos opciones. |
| P-08 | Asignación | Cuando hay varios responsables, ¿el admin necesita ver quién marcó cada paso? | Define si se guarda quién hizo qué | Sí, cada paso muestra quién lo marcó | Media | Que tarea la completo cada quien, cual de las 3 personas completo la tarea | **descartado**: el cliente pide saber quién completó la tarea, no quién marcó cada paso. |
| P-09 | Estados | ¿Qué estados puede tener una tarea, por ejemplo pendiente, en progreso, completada o vencida? | Es la base del tablero y de la lista del estudiante | Esos cuatro estados | Alta | En ejecución (se abre y se esta completando cuando da el primer check)<br>Completado<br>Vencido<br>Pendiente<br>No asignado<br>En edición (que no puedan editar 2 personas) | **descartado**: el cliente define seis, que agregan «No asignado» y «En edición». |
| P-10 | Estados | Si un estudiante guarda con solo algunos pasos marcados, ¿puede volver después a terminarla? | Define si existe el guardado parcial | Sí, la tarea queda «en progreso» | Alta | No debe poderse salir de una tarea hasta salirse | **pendiente**: la respuesta no es clara. |
| P-11 | Estados | Si un estudiante se equivocó y marcó un paso que no hizo, ¿puede desmarcarlo después de guardar? | Define quién puede corregir una tarea | Puede desmarcar mientras la tarea no esté completada; después, solo el admin la reabre | Media | _(sin respuesta)_ | **pendiente** |
| P-12 | Tablero | ¿Desde cuánto tiempo antes del vencimiento una tarea cuenta como «próxima a vencer»: 1 hora, 3 horas o el mismo día? | Define qué tareas aparecen en el tablero | 2 horas antes | Alta | Una hora ya es por vencer y una noti de ya esta por vencer | **descartado**: 1 hora, con una notificación. |
| P-13 | Tablero | ¿El tablero debe mostrar el avance de cada estudiante o solo el de cada tarea? | Cambia lo que muestra el panel del admin | Por tarea, con el porcentaje de pasos completados | Media | si | **pendiente**: el «si» no elige entre las dos opciones. Las notas N-05 y N-17 piden las dos vistas (tarjetas por tarea y cuántas tareas tiene cada estudiante). El porcentaje de pasos no lo mencionó. |
| P-14 | Vencimientos | Si una tarea vence sin completarse, ¿el estudiante todavía puede terminarla? | Define qué pasa con las tareas atrasadas | Sí, pero queda marcada como «completada tarde» | Alta | Pasa a un estado de vencida y el admin puede reasignar | **descartado**: pasa a vencida y el admin puede reasignarla. No dice si el estudiante todavía puede terminarla. |
| P-15 | Contexto | ¿El staff la va a usar más desde el celular o desde la computadora durante el evento? | Define si el diseño parte del celular | Principalmente desde el celular | Alta | Celular y también portal pc | **confirmado** en parte: celular, y también computadora. |
| P-16 | Marca y alcance | ¿Hay logo o colores oficiales del Interact2Hack que debamos usar? | Es el insumo del brand board del avance 2 | Proponemos nuestra propia identidad visual | Media | _(sin respuesta)_ | **pendiente**: entre los materiales hay un «Brandboard extendido · Señal Neón v1.0» de Interact2Hack. Hay que confirmar con el cliente si es la identidad que se debe usar. |

## 3. Las 3 preguntas clave

Son las que planteamos primero en la sesión.

1. P-09 (estados de la tarea): la descripción menciona el estado en la lista del estudiante y en el tablero, pero no dice cuáles existen.
2. P-14 (tareas vencidas): la descripción no dice qué pasa con una tarea que vence sin terminarse.
3. P-12 («próxima a vencer»): sin ese dato no podemos armar el tablero del administrador.

## 4. Notas de la sesión con el cliente

Anotadas durante la sesión, **literales**. La numeración N-xx es del equipo, para citarlas en el PRD; los títulos de grupo («Tareas», «Tablero»…) son los de la nota original.

| Id | Nota (literal) |
| --- | --- |
| N-01 | Creo tarea y puedoa siganr a varias personas |
| N-02 | Con que cualquiera complete ya esta |
| N-03 | Tareas: • todas las teareas van a estar abiertas no se deben ir desbloqueando |
| N-04 | Tablero: • Ingrso a la parte de admin |
| N-05 | • Debe haber una cuadricula con tarjeta — o El estado de cada tearea — o La agina principal — o Tarea 1 — ▪ Pendiente (temporizador de cuanto tiempo queda para ejecutar) ▪ Progreso ▪ Ejecutada ▪ Por colores ▪ Sin asignar |
| N-06 | • Un total de cuantas ya están ejecutadas y cuandas pendientes |
| N-07 | • Orden — o Las que estén mas cerca de vencer — o La mas reciente a la mas antigua |
| N-08 | • Que haya una sección de filtros — o Por vencer |
| N-09 | • Como se marca completado — o Voy haciendo check, hay cajita de observaciones — o Clic en completar tarea |
| N-10 | • Que te salga quien nomas esta asigando con sus números de teléfono y nombres |
| N-11 | Panel admin: • Se puede crear mas admin desde ahí o estudiante |
| N-12 | • Puedo cambiar las contraseñas de todos |
| N-13 | Hay un super admin a quien no se le puede borrar |
| N-14 | Tarea: • Fecha y hora de vencimiento • Lugar aula • Checklist de la tarea • Responsable |
| N-15 | Panel de estudiantes: • Marcar como urgente |
| N-16 | • Las que están de urgente se les asigna a todos |
| N-17 | • También que puedan ver un panel de que estudiante esta sin tareas o cuantas tareas tiene cada estudiante |
| N-18 | • Como administrador digo que usuarios van a estar disponibles en cada día |
| N-19 | • Ver el historial de cada tarea completada cada uno |
| N-20 | • Un apartado de cuanto tiempo le  queda de vida a un estudiante en ese día de trabajo |
| N-21 | vencidas / por vencer (en orden por vencer) / en ejecución / sin asignar / temrinadas |
| N-22 | para completar pongo un slider deslizable de izquierda a derecha para completar |
| N-23 | ver si no tiene internet que le asome un aviso. |

### Nota original sin tabla (tal cual se anotó)

```text
Creo tarea y puedoa siganr a varias personas
Con que cualquiera complete ya esta
Tareas
•	todas las teareas van a estar abiertas no se deben ir desbloqueando
Tablero
•	Ingrso a la parte de admin
•	Debe haber una cuadricula con tarjeta
o	El estado de cada tearea
o	La agina principal
o	Tarea 1 
	Pendiente (temporizador de cuanto tiempo queda para ejecutar)
	Progreso
	Ejecutada
	Por colores
	Sin asignar
•	Un total de cuantas ya están ejecutadas y cuandas pendientes
•	Orden
o	Las que estén mas cerca de vencer
o	La mas reciente a la mas antigua
•	Que haya una sección de filtros
o	Por vencer
•	Como se marca completado
o	Voy haciendo check, hay cajita de observaciones
o	Clic en completar tarea
•	Que te salga quien nomas esta asigando con sus números de teléfono y nombres

Panel admin
•	Se puede crear mas admin desde ahí o estudiante
•	Puedo cambiar las contraseñas de todos
Hay un super admin a quien no se le puede borrar

Tarea
•	Fecha y hora de vencimiento 
•	Lugar aula
•	Checklist de la tarea
•	Responsable
Panel de estudiantes
•	Marcar como urgente
•	Las que están de urgente se les asigna a todos 
•	También que puedan ver un panel de que estudiante esta sin tareas o cuantas tareas tiene cada estudiante
•	Como administrador digo que usuarios van a estar disponibles en cada día
•	Ver el historial de cada tarea completada cada uno
•	Un apartado de cuanto tiempo le  queda de vida a un estudiante en ese día de trabajo

vencidas
por vencer (en orden por vencer)
en ejecución
sin asignar
temrinadas

para completar pongo un slider deslizable de izquierda a derecha para completar
ver si no tiene internet que le asome un aviso.
```

## 5. Resumen del estado de los supuestos

- **Confirmados (total o parcial):** P-06 (la completada no se borra), P-07 (por N-02), P-15 (celular y también computadora).
- **Descartados:** P-02, P-03, P-05, P-08, P-09, P-12, P-14.
- **Pendientes:** P-01 (la respuesta no contesta la pregunta), P-04 (no cubre el olvido), P-10 (respuesta poco clara), P-11 (sin respuesta), P-13 (el «si» no elige), P-16 (sin respuesta).
