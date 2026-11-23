# PRD — Herramienta de organización de staff del Interact2Hack

**Proyecto final · Desarrollo Web 2 · USFQ** · Avance 2 · entrega: miércoles 25 de noviembre de 2026, 23:59 (hora de Ecuador)
**Equipo:** Joshua Lozada y Raymond Portilla
**Fuentes:** `docs/fuentes/descripcion-proyecto.md` (descripción del cliente) y `docs/cliente/preguntas.md` (Avance 1, con las respuestas y las notas de la sesión del 11 de noviembre de 2026).

> **Cómo leer el origen de cada frase.** «Descripción» = lo dice la descripción del proyecto. «P-xx» = respuesta del cliente a esa pregunta. «N-xx» = nota de la sesión con el cliente. «[SUPUESTO S-xx]» = decisión del equipo que el cliente no definió, o interpretación de una respuesta ambigua (sección 8). Cuando la descripción y las respuestas del cliente dicen cosas distintas, manda la respuesta del cliente, y la diferencia queda anotada.

## 1. Problema y contexto

Durante el Interact2Hack, los organizadores necesitan repartir y controlar el trabajo del staff de estudiantes: qué hay que hacer, dónde, para cuándo y quién lo hace (Descripción). La herramienta convierte cada encargo en una tarea con fecha y hora de vencimiento, lugar o aula, un checklist paso a paso y uno o varios responsables (Descripción, N-14). Los estudiantes marcan los pasos y completan la tarea; los administradores ven en un tablero el estado de todas las tareas, lo que está por vencer y cómo va cada estudiante (Descripción, N-05, N-17).

**Para quién:** los administradores (organizadores, incluido un super administrador) y los estudiantes del staff (Descripción, N-11, N-13).

**En qué momento se usa:** durante los días de trabajo del hackathon. El administrador indica qué estudiantes están disponibles cada día (N-18), crea y asigna tareas, y sigue su avance; los estudiantes ejecutan sus tareas en las aulas mientras corre el tiempo de cada una (N-05).

**Contexto de uso:**
- Se usa desde el **celular** y también desde la **computadora** (P-15). El equipo supone que los estudiantes usan sobre todo el celular y los administradores, sobre todo la computadora; las dos funcionan en ambos. [SUPUESTO S-01]
- **Conectividad:** si el usuario se queda sin internet, la herramienta debe mostrarle un aviso (N-23). No se trabaja sin conexión: lo que se haga sin internet no se guarda, y el aviso lo dice. [SUPUESTO S-02]

## 2. Usuarios y perfiles

El acceso es con login y no hay registro propio: las cuentas las crea un administrador (Descripción, N-11). Cada usuario tiene un perfil: administrador o estudiante (N-11).

### Super administrador
Es un único administrador que **no se puede eliminar** (N-13; que sea uno solo es [SUPUESTO S-03]). Puede todo lo que puede un administrador.

### Administrador
**Puede:**
- Crear administradores y estudiantes (N-11), y ver, editar y eliminar usuarios (Descripción), con las restricciones de R5.
- Registrar de cada usuario: nombre, correo estudiantil, teléfono y los días y horas en que está disponible (P-02, N-18).
- Cambiar la contraseña de cualquier usuario (N-12), salvo la del super administrador, que solo cambia él mismo. [SUPUESTO S-04]
- Crear tareas y asignarlas a una o varias personas (Descripción, N-01).
- Editar y eliminar tareas, solo en los estados que lo permiten (R16, R17; P-05, P-06).
- Marcar una tarea como urgente (N-15). [SUPUESTO S-05: lo marca el administrador]
- Reasignar una tarea vencida (P-14).
- Ver el tablero de cumplimiento (N-04, N-05) y el panel de estudiantes (N-17).
- Ver quién inició y quién completó cada tarea, y el historial de tareas completadas de cada estudiante (P-01, P-08, N-19).

**No puede:**
- Eliminar al super administrador (N-13).
- Editar ni eliminar una tarea en ejecución (P-05, P-01).
- Eliminar una tarea completada (P-06), ni reabrirla. [SUPUESTO S-06]
- Editar una tarea que otra persona está editando (P-09).
- Marcar pasos ni completar tareas en nombre de un estudiante. [SUPUESTO S-07]

### Estudiante
**Puede:**
- Ver la lista de sus tareas asignadas, su estado y el tiempo que le queda a cada una (Descripción, N-05).
- Entrar al detalle de una tarea, marcar sus pasos en cualquier orden, escribir observaciones y completarla (Descripción, N-03, N-09).
- Ver quiénes son los responsables de la tarea, con su nombre y teléfono (N-10).
- Cambiar su propia contraseña dentro de la herramienta (P-04).

**No puede:**
- Crear, editar, asignar ni eliminar tareas, ni gestionar usuarios (Descripción).
- Completar una tarea sin haber marcado todos sus pasos (P-01, P-05).
- Completar una tarea vencida mientras el administrador no la reasigne. [SUPUESTO S-08]
- Ver el tablero ni el panel de estudiantes (N-04). [SUPUESTO S-09]
- Ver tareas en las que no es responsable. [SUPUESTO S-10]

## 3. Objetivos y éxito

El cliente no definió cómo va a medir el éxito. Estas señales son del equipo y se validarán con el cliente. [SUPUESTO S-11]
- **Cada estudiante sabe qué hacer, dónde y para cuándo.** Al entrar ve sus tareas con el lugar y el tiempo que le queda.
- **Nada se da por hecho sin terminarse.** Ninguna tarea queda completada con pasos sin marcar, y siempre se sabe quién la completó.
- **El administrador reacciona a tiempo.** En el tablero ve primero lo vencido y lo que vence en una hora o menos.
- **El trabajo se reparte bien.** El administrador ve qué estudiantes no tienen tareas y cuántas tiene cada uno.

## 4. Alcance (MoSCoW)

La priorización es del equipo. **Must** es lo que debe funcionar en el avance funcional del 2 de diciembre; **Should** entra el 2 de diciembre si alcanza el tiempo y, si no, antes de la presentación final; **Could** solo si sobra tiempo. [SUPUESTO S-12]

**Must**
- M1. Login con cuentas creadas por un administrador; perfiles de administrador y estudiante; super administrador que no se puede eliminar (Descripción, N-11, N-13).
- M2. Gestión de usuarios: crear, ver, editar y eliminar administradores y estudiantes, con nombre, correo estudiantil, teléfono y perfil (P-02, N-11).
- M3. Gestión de tareas: crear con fecha y hora de vencimiento, lugar o aula, checklist y responsables; editar y eliminar solo en los estados permitidos; reasignar las vencidas (N-14, P-05, P-06, P-14).
- M4. Asignar una tarea a una o varias personas (N-01).
- M5. Estados de la tarea, la alerta «por vencer» y el temporizador (P-09, P-12, N-05).
- M6. Lista de tareas del estudiante, ordenada por vencimiento, con las terminadas al final (Descripción, P-06, N-07).
- M7. Ejecución: marcar pasos, escribir observaciones y completar la tarea con un gesto deliberado de deslizar para confirmar (N-09, N-22).
- M8. Tablero de cumplimiento en tarjetas, agrupado por estado, con temporizador, totales, orden por vencimiento y filtro «por vencer» (N-05 a N-08, N-21).

**Should**
- S1. Aviso de que no hay internet (N-23).
- S2. Aviso dentro de la herramienta cuando una tarea entra en «por vencer» (P-12).
- S3. Cambiar la propia contraseña, y que el administrador cambie la de cualquiera (P-04, N-12).
- S4. Bloqueo «en edición» para que dos personas no editen la misma tarea (P-09).
- S5. Ver quién inició una tarea en ejecución (P-01).
- S6. Marcar una tarea como urgente y asignarla a todos (N-15, N-16).
- S7. Panel de estudiantes: quién no tiene tareas y cuántas tiene cada uno (N-17).
- S8. Disponibilidad de cada estudiante por día y hora (P-02, N-18).
- S9. Historial de tareas completadas por estudiante (N-19).

**Could**
- C1. Cuánto tiempo le queda a cada estudiante en su día de trabajo (N-20).
- C2. Porcentaje de pasos marcados de cada tarea en el tablero (supuesto del Avance 1 para P-13). [SUPUESTO S-13]

**Won't (no en esta versión)**
- W1. Enviar las credenciales desde la herramienta por correo o WhatsApp (P-03): el administrador las envía por su cuenta. [SUPUESTO S-14]
- W2. Notificaciones fuera de la herramienta (cuando está cerrada). [SUPUESTO S-15]
- W3. Trabajar sin conexión. [SUPUESTO S-02]
- W4. Registro abierto de usuarios (Descripción).
- W5. Recuperación automática de contraseña olvidada. [SUPUESTO S-16]
- W6. Reabrir una tarea completada. [SUPUESTO S-06]

## 5. No-alcance

Queda fuera de esta versión, por decisión del equipo hasta que el cliente diga lo contrario [SUPUESTO S-12]:
- Que participantes, jurados o auspiciantes usen la herramienta: solo la usa el staff.
- Tareas que se repiten, plantillas o dependencias entre tareas (N-03: las tareas no se desbloquean unas tras otras).
- Fotos o archivos como evidencia de un paso.
- Reportes descargables.
- Todo lo listado en Won't (W1–W6).

## 6. Reglas de negocio

### Cuentas
- **R1.** Solo se entra con una cuenta creada por un administrador; no hay registro propio (Descripción, N-11). El usuario entra con su correo y su contraseña. [SUPUESTO S-17]
- **R2.** Hay dos perfiles, administrador y estudiante, y cada usuario tiene uno. Un administrador puede crear otros administradores y estudiantes (N-11).
- **R3.** Existe un único super administrador, que no se puede eliminar (N-13; S-03). Solo él puede cambiar su propia contraseña. [SUPUESTO S-04]
- **R4.** El administrador puede cambiar la contraseña de cualquier otro usuario, y cada usuario puede cambiar la suya dentro de la herramienta (N-12, P-04). Si alguien la olvida, se la cambia un administrador. [SUPUESTO S-16]
- **R5.** Al eliminar a un estudiante, deja de ser responsable de sus tareas. No se puede eliminar a un estudiante que es responsable de una tarea en ejecución. Si una tarea se queda sin responsables, pasa a «Sin asignar». Las tareas que completó siguen mostrando su nombre. [SUPUESTO S-18; P-01 no respondió esto]
- **R6.** El administrador envía las credenciales por correo o por WhatsApp, por fuera de la herramienta (P-03; S-14).

### Tarea
- **R7.** Una tarea tiene fecha y hora de vencimiento, lugar o aula y un checklist de al menos un paso; estos datos son obligatorios (Descripción, N-14; la obligatoriedad y el mínimo de un paso son [SUPUESTO S-19]). Los responsables se pueden agregar al crearla o después; sin responsables, la tarea queda «Sin asignar» (P-09, N-05).
- **R8.** Una tarea puede tener uno o varios responsables (Descripción, N-01).
- **R9.** Todas las tareas asignadas están disponibles desde el principio: no se desbloquean unas tras otras, y los pasos se pueden marcar en cualquier orden (N-03; lo de los pasos es [SUPUESTO S-20]).
- **R10.** Las horas son las de Ecuador continental. [SUPUESTO S-21]

### Estados de una tarea
- **R11. Una tarea está siempre en uno, y solo uno, de estos cinco estados** (P-09, N-21):
  - **Sin asignar:** no tiene responsables y su hora de vencimiento no ha llegado (P-09 «No asignado», N-05).
  - **Pendiente:** tiene al menos un responsable, ningún paso marcado y su hora no ha llegado (P-09).
  - **En ejecución:** tiene al menos un paso marcado, no está completada y su hora no ha llegado. Entra en este estado cuando alguien marca el primer paso (P-09: «se esta completando cuando da el primer check»). Abrir la tarea sin marcar nada no la pone en ejecución. [SUPUESTO S-22: P-01 dice «Mientras se abre se pone en ejecución»]
  - **Vencida:** llegó su hora de vencimiento, desde el minuto exacto, y no está completada, tenga o no pasos marcados (P-14).
  - **Completada:** un responsable marcó todos los pasos y confirmó «completar tarea» (P-09, N-09). Es un estado final.
- **R12. «En edición» no es un estado más: es un bloqueo temporal.** Mientras un administrador edita una tarea, se ve como «En edición», nadie más puede editarla y los responsables no pueden marcar pasos hasta que termine. Al terminar, la tarea vuelve a su estado. [SUPUESTO S-23; P-09 lo lista como estado: «En edición (que no puedan editar 2 personas)»]
- **R13. Por vencer.** Una tarea Sin asignar, Pendiente o En ejecución está **por vencer** cuando falta **una hora o menos** para su vencimiento (P-12). Es una alerta que se suma al estado, no un estado. Cuando una tarea entra en «por vencer», sus responsables y los administradores ven un aviso dentro de la herramienta (P-12: «una noti»; dentro de la herramienta es [SUPUESTO S-15]).
- **R14. Temporizador.** Toda tarea no completada ni vencida muestra cuánto tiempo le queda para vencer (N-05).
- **R15. Completar.** Una tarea se completa solo cuando un responsable marcó todos los pasos y confirma con un gesto deliberado (deslizar para completar). No se puede completar con pasos sin marcar (P-01, P-05, N-09, N-22). Las observaciones son opcionales. [SUPUESTO S-24]

### Avance, edición y eliminación
- **R16. Qué se puede editar.** Una tarea se puede editar solo en Sin asignar o Pendiente. En ejecución no se puede editar (P-05). Una tarea completada no se edita. [SUPUESTO S-06]
- **R17. Qué se puede eliminar.** Una tarea se puede eliminar solo en Sin asignar o Pendiente, o si está Vencida sin ningún paso marcado. No se puede eliminar una tarea en ejecución (P-01, P-05) ni una completada (P-06). Lo de la vencida es [SUPUESTO S-25]. *Diferencia con la descripción:* la descripción dice que el administrador puede «editar y eliminar tareas», sin excepciones; mandan las respuestas del cliente.
- **R18. Guardar el avance.** Cada paso queda guardado en cuanto se marca. El estudiante puede salir de la tarea y volver después sin perder lo marcado. [SUPUESTO S-26; P-10 respondió «No debe poderse salir de una tarea hasta salirse»]
- **R19. Desmarcar.** Mientras la tarea no esté completada, un responsable puede desmarcar un paso. Si quedan cero pasos marcados, la tarea vuelve a Pendiente (o sigue Vencida). [SUPUESTO S-27; P-11 sin respuesta]
- **R20. Observaciones.** Cualquier responsable puede escribir observaciones mientras ejecuta la tarea (N-09). Quedan guardadas con la tarea, con su autor, y las ven los responsables y los administradores. [SUPUESTO S-24]

### Varios responsables
- **R21.** Con varios responsables hay **un solo checklist compartido**: lo que marca uno lo ven todos, y basta con que **cualquiera** complete la tarea para que quede completada para todos (N-02; P-07 «si»).
- **R22.** Queda registrado **quién completó** la tarea y cuándo (P-08: «cual de las 3 personas completo la tarea»). No se registra quién marcó cada paso. [SUPUESTO S-28]
- **R23.** Mientras una tarea está en ejecución, el administrador ve quién la inició (P-01: «Saber mientras quien la tiene abierta»; «quién la inició» es [SUPUESTO S-29]).
- **R24.** El detalle de una tarea muestra los nombres y teléfonos de sus responsables (N-10).

### Vencimiento y urgencia
- **R25. Reasignar.** El administrador puede reasignar una tarea vencida: cambiar sus responsables, ponerle una nueva hora de vencimiento, o las dos cosas (P-14; qué significa «reasignar» es [SUPUESTO S-30]). Los pasos marcados se conservan, y la tarea toma el estado que le corresponda según R11. Es la única forma de cambiar una tarea vencida que tiene pasos marcados.
- **R26.** Mientras no se reasigne, una tarea vencida no se puede completar. [SUPUESTO S-08; P-14 no lo dice]
- **R27. Urgente.** El administrador puede marcar una tarea como urgente (N-15). Una tarea urgente se asigna a todos los estudiantes, que se suman a los responsables que ya tenía (N-16; «todos los estudiantes» y que se sumen es [SUPUESTO S-05]). Las urgentes se distinguen con su marca y van primero dentro de su grupo. [SUPUESTO S-05]

### Tablero de cumplimiento (administrador)
- **R28.** El tablero es la página principal del administrador (N-04, N-05). Muestra una tarjeta por tarea, con su estado (con color y con nombre), el temporizador, el lugar y los responsables (N-05, N-10). Que el estado nunca dependa solo del color es [SUPUESTO S-31].
- **R29.** El tablero agrupa las tareas en este orden: **Vencidas, Por vencer, En ejecución, Pendientes, Sin asignar, Terminadas** (N-21). Cada tarea aparece en un solo grupo; una tarea por vencer va en «Por vencer», sea cual sea su estado. El grupo «Pendientes» no está en N-21 y se ubica después de «En ejecución». [SUPUESTO S-32]
- **R30.** Dentro de cada grupo, primero las más cercanas a vencer; en «Terminadas», de la más reciente a la más antigua (N-07; la forma de combinar los dos órdenes es [SUPUESTO S-33]).
- **R31.** El tablero muestra el total de tareas en cada estado, incluido cuántas están ejecutadas y cuántas pendientes (N-06), y tiene un filtro «por vencer» (N-08).

### Lista del estudiante
- **R32.** El estudiante ve sus tareas ordenadas por cercanía al vencimiento, con las completadas en un apartado al final (P-06: «un apartado debajo de todo»; esa interpretación es [SUPUESTO S-34]).

### Panel de estudiantes (administrador)
- **R33.** El panel muestra cuántas tareas tiene cada estudiante y quién no tiene ninguna (N-17), sus días y horas de disponibilidad (P-02, N-18) y su historial de tareas completadas (N-19).
- **R34.** Al asignar, la herramienta muestra si el estudiante está disponible ese día, pero no impide asignarlo. [SUPUESTO S-35]
- **R35.** El «tiempo que le queda» a un estudiante es lo que falta para que termine su horario de disponibilidad de ese día (N-20; la interpretación es [SUPUESTO S-36]).

## 7. Épicas

- **E1 · Acceso y usuarios — Must.** El administrador da de alta al staff y a otros administradores con su nombre, correo estudiantil, teléfono y perfil, y les envía las credenciales por correo o WhatsApp. El super administrador nunca se puede eliminar. Cambiar contraseñas (la propia, o la de cualquiera siendo administrador) es Should. Cubre R1–R6.
- **E2 · Tareas y asignación — Must.** El administrador crea tareas con su hora límite, su lugar y su checklist, y las asigna a una o varias personas, o las deja sin asignar. Puede editarlas o eliminarlas solo mientras nadie las haya empezado, y reasignar las que vencieron. Cubre R7–R10, R16, R17, R25.
- **E3 · Ejecución desde el celular — Must.** El estudiante ve sus tareas con el tiempo que le queda, entra a una, marca los pasos en cualquier orden, escribe observaciones y la completa deslizando para confirmar. Lo que marca queda guardado y lo ven los demás responsables; basta con que uno complete. Cubre R11, R14, R15, R18–R22, R24, R26, R32.
- **E4 · Estados y tablero de cumplimiento — Must.** El administrador ve, desde la computadora, todas las tareas como tarjetas agrupadas por estado (vencidas primero), con su temporizador, los totales, el orden por vencimiento y el filtro «por vencer». Cubre R11, R13, R14, R28–R31.
- **E5 · Avisos y control de edición — Should.** La herramienta avisa cuando no hay internet y cuando una tarea entra en «por vencer», impide que dos personas editen la misma tarea y muestra quién inició cada tarea en ejecución. Cubre R12, R13, R23.
- **E6 · Urgencias y panel de estudiantes — Should.** El administrador marca tareas urgentes para asignarlas a todos y, en el panel de estudiantes, ve quién está sin tareas, cuántas tiene cada uno, su disponibilidad y su historial de tareas completadas. Cubre R27, R33–R35.

## 8. Supuestos y puntos abiertos

### 8.1 Supuestos

| Id | [SUPUESTO] — decisión del equipo | En qué se apoya | Pregunta para el cliente |
| --- | --- | --- | --- |
| S-01 | Estudiantes sobre todo en el celular; administradores sobre todo en la computadora; ambos funcionan en los dos. | P-15 «Celular y también portal pc» | ¿Los administradores usan la computadora y los estudiantes el celular? |
| S-02 | Hace falta conexión. Sin internet se muestra un aviso, y lo que se haga sin conexión no se guarda. | N-23 | Sin internet, ¿basta con el aviso o el estudiante debe poder seguir marcando pasos? |
| S-03 | Hay un solo super administrador. | N-13 «Hay un super admin» | ¿Es uno solo? ¿Quién es? |
| S-04 | Solo el super administrador cambia su propia contraseña. | N-12, N-13 | ¿Un administrador puede cambiar la contraseña del super administrador? |
| S-05 | La marca de urgente la pone el administrador; la tarea se asigna a todos los estudiantes, que se suman a los responsables que ya tenía, y va primero en su grupo. | N-15, N-16 (en las notas, «Marcar como urgente» está bajo «Panel de estudiantes») | ¿Quién marca una tarea como urgente? «Se les asigna a todos»: ¿a todos los estudiantes o solo a los disponibles ese día? |
| S-06 | Una tarea completada no se edita ni se reabre. | P-05, P-06 | Si alguien completa una tarea por error, ¿el administrador puede reabrirla? |
| S-07 | El administrador no marca pasos ni completa tareas. | — | ¿Un administrador puede ejecutar tareas? |
| S-08 | Una tarea vencida no se puede completar hasta que se reasigne. | P-14 «Pasa a un estado de vencida y el admin puede reasignar» | Cuando una tarea vence, ¿el estudiante todavía puede terminarla o espera a que el administrador la reasigne? |
| S-09 | El estudiante no ve el tablero ni el panel de estudiantes. | N-04 «Ingrso a la parte de admin» | — |
| S-10 | El estudiante solo ve las tareas en las que es responsable. | Descripción «ver lista de tareas asignadas»; N-03 es ambigua | «Todas las tareas van a estar abiertas»: ¿significa que cada estudiante ve todas las tareas, o que ninguna se bloquea? |
| S-11 | Señales de éxito de la sección 3. | — | ¿Cómo sabrán que la herramienta funcionó? |
| S-12 | Priorización MoSCoW y no-alcance pensados para el 2 de diciembre. | Calendario del curso | ¿Qué es imprescindible para el 2 de diciembre? |
| S-13 | El porcentaje de pasos por tarea es Could. | P-13 «si» no elige entre las opciones | ¿El tablero necesita el porcentaje de pasos marcados de cada tarea? |
| S-14 | El administrador envía las credenciales por su cuenta, no la herramienta. | P-03 «Por correo todas las credenciales o por whats» | ¿Las credenciales las debe enviar la herramienta o el administrador? |
| S-15 | La «noti» de por vencer es un aviso dentro de la herramienta; nada llega con la herramienta cerrada. | P-12 «una noti de ya esta por vencer» | ¿La notificación debe llegar al celular aunque la herramienta esté cerrada? ¿A quién le llega? |
| S-16 | La contraseña olvidada la cambia un administrador. | N-12; P-04 no cubre el olvido | Si alguien olvida su contraseña y no puede entrar, ¿se la pide al administrador? |
| S-17 | Se entra con el correo y la contraseña. | P-02 no menciona un «usuario» aparte | ¿Se entra con el correo estudiantil o con un usuario aparte? |
| S-18 | Eliminar a un estudiante lo quita de sus tareas; no se puede eliminar si es responsable de una tarea en ejecución; las tareas sin responsables pasan a Sin asignar. | P-01 (la respuesta no contesta la pregunta) | ¿Qué pasa con las tareas de un estudiante que se elimina? |
| S-19 | Fecha y hora, lugar y checklist (al menos un paso) son obligatorios. | N-14 | ¿Hay algún dato opcional? ¿La tarea lleva nombre o descripción? |
| S-20 | Los pasos del checklist se marcan en cualquier orden. | N-03 | ¿Los pasos se deben seguir en orden? |
| S-21 | Las horas son las de Ecuador continental. | — | — |
| S-22 | La tarea pasa a «En ejecución» con el primer paso marcado, no al abrirla. | P-09 «se esta completando cuando da el primer check» frente a P-01 «Mientras se abre se pone en ejecución» | ¿Una tarea entra en ejecución al abrirla o al marcar el primer paso? |
| S-23 | «En edición» es un bloqueo temporal, no un estado; mientras dura, nadie marca pasos. | P-09 «En edición (que no puedan editar 2 personas)» | ¿«En edición» debe verse como un estado más en el tablero? |
| S-24 | Las observaciones son opcionales; se guardan con su autor y las ven los responsables y los administradores. | N-09 «hay cajita de observaciones» | ¿Las observaciones son obligatorias para completar? |
| S-25 | Una tarea vencida sin pasos marcados se puede eliminar. | — | ¿Se puede eliminar una tarea vencida? |
| S-26 | Cada paso se guarda al marcarse; se puede salir y volver. | P-10 «No debe poderse salir de una tarea hasta salirse» | ¿Qué quisieron decir: que el estudiante no puede dejar una tarea empezada para empezar otra, o que el avance se conserva al salir? |
| S-27 | Se puede desmarcar mientras no esté completada; con cero pasos, vuelve a Pendiente. | P-11 sin respuesta | ¿Puede un estudiante desmarcar un paso que marcó por error? |
| S-28 | Se registra quién completó la tarea, no quién marcó cada paso. | P-08 | ¿Necesitan ver también quién marcó cada paso? |
| S-29 | «Quién la tiene abierta» se muestra como quién la inició (el primer paso marcado). | P-01 «Saber mientras quien la tiene abierta» | ¿Quieren ver quién la inició o quién la tiene abierta en ese momento? |
| S-30 | Reasignar = cambiar responsables y/o poner nueva hora; se conservan los pasos marcados. | P-14 «el admin puede reasignar» | Al reasignar una vencida, ¿se le pone una nueva hora? ¿Se conserva lo ya marcado? |
| S-31 | Cada estado se muestra con color y con su nombre. | N-05 «Por colores»; criterio de accesibilidad del curso | — |
| S-32 | Grupos del tablero en el orden de N-21, con «Pendientes» después de «En ejecución». | N-21 no incluye «pendiente» | ¿Dónde van las tareas pendientes en el tablero? |
| S-33 | Por vencimiento dentro de cada grupo; las terminadas, de la más reciente a la más antigua. | N-07 da dos órdenes | ¿Cuándo se usa cada orden? |
| S-34 | «Un apartado debajo de todo» = las completadas van en un apartado al final de la lista. | P-06 «un apartado debajo de todo que no complete» | ¿Qué debe ir en ese apartado del final? |
| S-35 | Se muestra la disponibilidad al asignar, pero no se impide asignar. | N-18 | ¿Se puede asignar una tarea a alguien que no está disponible ese día? |
| S-36 | «Tiempo de vida» = lo que le falta al estudiante para terminar su horario de ese día. | N-20 | ¿Qué es «cuánto tiempo le queda de vida a un estudiante en ese día de trabajo»? |

### 8.2 Puntos abiertos

1. **P-16 sin respuesta: identidad visual.** Entre los materiales hay un «Brandboard extendido · Señal Neón v1.0» de Interact2Hack (USFQ Medios Interactivos · NESTLab). Es una fuente por confirmar, no algo que el cliente haya pedido: hay que preguntarle si el sistema de diseño debe seguirlo. Afecta al DESIGN.md, no a este PRD.
2. **P-11 sin respuesta:** corregir un paso marcado por error (ver S-27).
3. **P-01 no responde la pregunta** sobre el estudiante eliminado (ver S-18), y su respuesta contradice a P-09 sobre cuándo empieza la ejecución (ver S-22).
4. **P-07 y P-13 se respondieron con «si»** a preguntas de dos opciones. P-07 se resolvió con la nota N-02; P-13 sigue abierta (ver S-13).
5. **P-10 poco clara** (ver S-26).
6. **P-14 no dice si una vencida todavía se puede terminar** (ver S-08), y el supuesto del Avance 1 («completada tarde») quedó descartado.
7. **«En edición» como estado** (ver S-23) y **«urgente»** (ver S-05).
8. **Notificación de por vencer** fuera de la herramienta (ver S-15).
9. **Cuántas tareas, estudiantes y días de evento** hay: afecta cómo se ve el tablero.

## 9. Trazabilidad

| Regla | Respuesta o nota del cliente | Supuesto que la sostiene |
| --- | --- | --- |
| R1 | Descripción · N-11 | S-17 |
| R2 | N-11 | — |
| R3 | N-13 | S-03 · S-04 |
| R4 | N-12 · P-04 | S-16 |
| R5 | P-01 (no responde) | S-18 |
| R6 | P-03 | S-14 |
| R7 | Descripción · N-14 · P-09 · N-05 | S-19 |
| R8 | Descripción · N-01 | — |
| R9 | N-03 | S-20 |
| R10 | — | S-21 |
| R11 | P-09 · P-14 · N-05 · N-09 · N-21 · P-01 | S-22 |
| R12 | P-09 | S-23 |
| R13 | P-12 | S-15 |
| R14 | N-05 | — |
| R15 | P-01 · P-05 · N-09 · N-22 | S-24 |
| R16 | P-05 | S-06 |
| R17 | P-01 · P-05 · P-06 | S-25 |
| R18 | P-10 (poco clara) | S-26 |
| R19 | P-11 (sin respuesta) | S-27 |
| R20 | N-09 | S-24 |
| R21 | N-02 · P-07 | — |
| R22 | P-08 | S-28 |
| R23 | P-01 | S-29 |
| R24 | N-10 | — |
| R25 | P-14 | S-30 |
| R26 | P-14 | S-08 |
| R27 | N-15 · N-16 | S-05 |
| R28 | N-04 · N-05 · N-10 | S-31 |
| R29 | N-21 | S-32 |
| R30 | N-07 | S-33 |
| R31 | N-06 · N-08 | — |
| R32 | P-06 · N-07 | S-34 |
| R33 | N-17 · N-18 · N-19 · P-02 | — |
| R34 | N-18 | S-35 |
| R35 | N-20 | S-36 |
