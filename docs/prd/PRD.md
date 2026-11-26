# PRD — Herramienta de organización de staff del Interact2Hack

**Proyecto final · Desarrollo Web 2 · USFQ** · Avance 2 · entrega: miércoles 25 de noviembre de 2026, 23:59 (hora de Ecuador)
**Equipo:** Joshua Lozada y Raymond Portilla
**Fuentes:** `docs/fuentes/descripcion-proyecto.md` (descripción del cliente) y `docs/cliente/preguntas.md` (Avance 1, con las respuestas y las notas de la sesión del 11 de noviembre de 2026, y las decisiones del equipo del 23 de noviembre).

> **Cómo leer el origen de cada frase.**
> - «Descripción» = lo dice la descripción del proyecto.
> - «P-xx» = respuesta del cliente a esa pregunta.
> - «N-xx» = nota de la sesión con el cliente.
> - «D-S-xx» = **decisión del equipo, confirmada por el equipo el 23-nov**, sobre el supuesto S-xx. No son palabras del cliente.
> - «[SUPUESTO S-xx]» = lo que nadie definió todavía (sección 8).
>
> Cuando la descripción y el cliente dicen cosas distintas, manda el cliente. Cuando una decisión del equipo choca con una respuesta o una nota del cliente, la regla sigue la decisión del equipo, la diferencia queda anotada (⚠) y se confirma con el cliente (sección 8.3).

## 1. Problema y contexto

Durante el Interact2Hack, los organizadores necesitan repartir y controlar el trabajo del staff de estudiantes: qué hay que hacer, dónde, para cuándo y quién lo hace (Descripción). La herramienta convierte cada encargo en una tarea con nombre, fecha y hora de vencimiento, lugar o aula, un checklist paso a paso y uno o varios responsables (Descripción, N-14, D-S-19). Los responsables marcan los pasos y completan la tarea; los administradores ven en un tablero el estado de todas las tareas, lo que está por vencer y cómo va cada estudiante (Descripción, N-05, N-17).

**Para quién:** los administradores (organizadores, incluido un super administrador) y los estudiantes del staff (Descripción, N-11, N-13).

**En qué momento se usa:** durante los días de trabajo del hackathon. El administrador indica qué días y horas está disponible cada estudiante (P-02, N-18), crea y asigna tareas y sigue su avance. Los estudiantes ejecutan sus tareas en las aulas mientras corre el tiempo de cada una (N-05).

**Contexto de uso:**
- **Dispositivos:** todos los perfiles pueden usar la herramienta tanto en el celular como en la computadora (P-15, D-S-01).
- **Conectividad:** si el usuario se queda sin internet, la herramienta le muestra un aviso (N-23) y **no le deja marcar pasos** hasta que vuelva la conexión (D-S-02). No se trabaja sin conexión.
- **Notificaciones:** cuando una tarea está por vencer, la herramienta avisa **dentro de la herramienta** a los estudiantes responsables y a los administradores (P-12). Avisar aunque la tengan cerrada es Should (S3).
- **Respuesta a cada acción:** cada acción importante (guardar, completar, asignar, eliminar, etc.) muestra un mensaje breve de confirmación o de error (D-S-11).

## 2. Usuarios y perfiles

El acceso es con login y no hay registro propio: las cuentas las crea un administrador (Descripción, N-11). Cada usuario tiene un perfil, administrador o estudiante (N-11), y entra con el correo que le registró el administrador, que no tiene que ser el estudiantil (D-S-17).

### Super administrador
Existe **un único super administrador fijo, que no se crea ni se borra desde la herramienta** (N-13, D-S-03). Puede todo lo que puede un administrador. Nadie más puede cambiar su contraseña (D-S-04).

### Administrador
**Puede:**
- Crear administradores y estudiantes (N-11), y ver, editar y eliminar usuarios (Descripción), según R6.
- Registrar de cada usuario su nombre, correo, teléfono y los días y horas en que está disponible (P-02, N-18, D-S-17).
- Cambiar la contraseña de cualquier usuario, salvo la del super administrador (N-12, D-S-04).
- Crear tareas, asignarlas a una o varias personas y dejarlas sin asignar (Descripción, N-01, P-09).
- Editar y eliminar tareas, solo en los estados que lo permiten (R21, R22).
- Marcar una tarea como urgente (N-15; que la marque el administrador es [SUPUESTO S-05]).
- Reasignar una tarea vencida, poniéndole una nueva hora (P-14, D-S-30).
- Reabrir una tarea completada (D-S-06). Should (S4).
- **Ejecutar tareas**: marcar pasos, escribir observaciones y completarlas, igual que un estudiante (D-S-07).
- Ver el tablero de cumplimiento (N-04, N-05) y el panel de estudiantes (N-17).
- Ver quién inició cada tarea, quién marcó cada paso y a qué hora, y quién la completó (P-01, P-08, D-S-28, D-S-29). El historial de completadas de cada estudiante es Should (S6, N-19).

**No puede:**
- Eliminar al super administrador ni cambiar su contraseña (N-13, D-S-03, D-S-04).
- Editar ni eliminar una tarea en ejecución (P-05, P-01).
- Eliminar una tarea completada (P-06).
- Entrar a una tarea que otro administrador está editando (P-09, D-S-23).
- Asignar una tarea a un estudiante que no está disponible, salvo en las tareas urgentes (D-S-35, R28).

### Estudiante
**Puede:**
- Ver las tareas que le asignaron y las tareas urgentes, con su estado y el tiempo que le queda a cada una (Descripción, N-05, D-S-10).
- Entrar al detalle de una tarea, marcar y desmarcar sus pasos en cualquier orden, escribir observaciones y completarla (Descripción, N-03, N-09, D-S-20, D-S-27).
- Ver a los demás responsables de la tarea, con su nombre y su teléfono (N-10, D-S-29).
- Cambiar su contraseña dentro de la herramienta (P-04). Recuperarla por correo si no puede entrar es Should (S2, D-S-16).
- Ver el apartado de sus tareas completadas (P-06, D-S-34).

**No puede:**
- Crear, editar, asignar ni eliminar tareas, ni gestionar usuarios (Descripción).
- Ver tareas que no le asignaron, salvo las urgentes (D-S-10).
- Completar una tarea con pasos sin marcar o sin observaciones (P-01, P-05, D-S-24).
- Empezar otra tarea mientras tenga una abierta sin terminar (D-S-26).
- Marcar pasos sin conexión a internet (D-S-02).
- Ver el tablero ni el panel de estudiantes (N-04). [SUPUESTO S-09]

## 3. Objetivos y éxito

El cliente (organizadores del Interact2Hack) sabrá que la herramienta funcionó si, durante el evento, se cumple lo siguiente:
- **Cada acción tiene respuesta.** Ante cada acción importante, aparece un mensaje de confirmación o de error; el cliente lo comprueba al guardar, completar o asignar: no queda duda de si algo se guardó (D-S-11).
- **Cada estudiante sabe qué hacer, dónde y para cuándo.** Al entrar, cada estudiante ve sus tareas y las urgentes, con el lugar y el tiempo que le queda; el cliente lo comprueba abriendo la lista de cualquier estudiante (N-05, D-S-10).
- **Nada se da por hecho sin terminarse.** Ninguna tarea figura como completada con pasos sin marcar o sin observaciones. Cada tarea completada muestra quién marcó cada paso y a qué hora, y quién la completó (P-01, D-S-24, D-S-28).
- **El administrador reacciona a tiempo.** El administrador ve en el tablero todas las tareas por vencer (una hora o menos) sin preguntar a nadie, y recibe un aviso **dentro de la herramienta** (P-12). El aviso con la herramienta cerrada es Should (S3, D-S-15).
- **El trabajo se reparte bien.** Ningún estudiante con tareas pasa el día sin que el administrador lo vea en el panel. El administrador ve quién no tiene tareas y cuántas tiene cada uno (N-17). Las horas de disponibilidad que le quedan en el día son Should (S5, N-20, D-S-36).

## 4. Alcance (MoSCoW)

El 23 de noviembre el equipo dijo que todo era imprescindible (D-S-12). El 25 de noviembre priorizó de verdad, para que el 2 de diciembre quepa: **15 Must, 6 Should y 2 Could**. La mayoría sigue en Must. Lo que salió de Must es lo que el evento puede hacer de otra forma, o lo que el cliente no pidió con esas palabras.

**Must** — sin esto la herramienta no reparte ni controla el trabajo del staff.
- M1. Login con el correo registrado por el administrador; perfiles de administrador y estudiante; un único super administrador fijo (Descripción, N-11, N-13, D-S-03, D-S-17).
- M2. Contraseñas dentro de la herramienta: cada usuario cambia la suya, y el administrador cambia la de cualquiera, salvo la del super administrador (P-04, N-12, D-S-04).
- M3. Gestión de usuarios: crear, ver, editar y eliminar, con nombre, correo, teléfono, perfil y disponibilidad por día y hora (P-02, N-11, N-18).
- M4. Gestión de tareas: crear con nombre, descripción opcional, fecha y hora de vencimiento, lugar o aula, checklist y responsables; editar y eliminar solo en los estados permitidos; bloqueo «en edición» (N-14, P-05, P-06, D-S-19, D-S-23, D-S-25).
- M5. Asignar una tarea a una o varias personas disponibles (N-01, D-S-35).
- M6. Estados de la tarea, la alerta «por vencer» **dentro de la herramienta** y el temporizador (P-09, P-12, N-05).
- M7. Lista de tareas del estudiante (las suyas y las urgentes), con el apartado de completadas (Descripción, P-06, D-S-10, D-S-34).
- M8. Ejecución: marcar y desmarcar pasos en cualquier orden, observaciones obligatorias para completar, completar deslizando para confirmar, sin poder empezar otra tarea mientras haya una abierta, y poder terminar una vencida si se está dentro (N-09, N-22, D-S-20, D-S-24, D-S-26, D-S-27, D-S-08).
- M9. Registro de quién marcó cada paso y a qué hora, quién inició y quién completó cada tarea (P-08, D-S-28, D-S-29).
- M10. Reasignar las vencidas con una nueva hora (P-14, D-S-30).
- M11. Tablero de cumplimiento en tarjetas, con estado, temporizador, avance en pasos («3 de 5»), totales, el orden por defecto y el filtro «por vencer», más los dos órdenes de la sesión: por cercanía al vencimiento y de la más reciente a la más antigua (N-05 a N-08, D-S-32).
- M12. Marcar una tarea como urgente y asignarla a todos los estudiantes (N-15, N-16, D-S-05).
- M13. Panel de estudiantes: quién no tiene tareas, cuántas tiene cada uno y su disponibilidad (N-17, N-18).
- M14. Aviso sin internet, y que sin internet no se puedan marcar pasos (N-23, D-S-02).
- M15. Mensajes de confirmación o de error en cada acción importante (D-S-11).

**Should** — el producto los incluye; el 2 de diciembre no se cae si faltan, porque hay otro camino.
- S1. Al crear un usuario, la herramienta le envía las credenciales por correo (P-03, D-S-14). Si no está, el administrador se las entrega.
- S2. Recuperar la contraseña por correo cuando la persona no puede entrar (D-S-16). Si no está, se la cambia un administrador (M2).
- S3. Aviso de «por vencer» aunque la herramienta esté cerrada, a los responsables y a los administradores (P-12, D-S-15). Dentro de la herramienta el aviso ya es Must (M6).
- S4. Reabrir una tarea completada (D-S-06). El cliente no lo pidió; el equipo lo quiere por si se completó por error.
- S5. En el panel, cuántas horas de disponibilidad le quedan a cada estudiante en el día (N-20, D-S-36).
- S6. Historial de tareas completadas de cada estudiante (N-19).

**Could** — se hace si sobra tiempo.
- C1. Mostrar el porcentaje de pasos además de «3 de 5» (D-S-13).
- C2. Ordenar el tablero por lugar (D-S-33, S-46).

**Won't (no en esta versión)**
- W1. Registro abierto de usuarios (Descripción).
- W2. Enviar las credenciales por WhatsApp desde la herramienta: P-03 lo mencionaba, pero el equipo decidió que, si se envían solas, sea por correo (D-S-14, S1).
- W3. Trabajar o marcar pasos sin conexión (D-S-02).
- W4. Crear o borrar al super administrador desde la herramienta (D-S-03).

## 5. No-alcance

Queda fuera de esta versión:
- Que participantes, jurados o auspiciantes usen la herramienta: solo la usa el staff. [SUPUESTO S-12; el equipo pidió «todo» lo descrito, no funciones nuevas]
- Tareas que se repiten, plantillas o dependencias entre tareas (N-03: las tareas no se desbloquean unas tras otras).
- Fotos o archivos como evidencia de un paso.
- Reportes descargables.
- Todo lo listado en Won't (W1–W4).

## 6. Reglas de negocio

### Cuentas y acceso
- **R1.** Solo se entra con una cuenta creada por un administrador; no hay registro propio (Descripción, N-11). Se entra con el correo que registró el administrador, estudiantil o no, y una contraseña (D-S-17).
- **R2.** Hay dos perfiles, administrador y estudiante, y cada usuario tiene uno. Un administrador puede crear administradores y estudiantes (N-11).
- **R3.** Existe un único super administrador fijo, que no se crea ni se borra desde la herramienta (N-13, D-S-03). Nadie más puede cambiar su contraseña (D-S-04).
- **R4.** Al crear un usuario, el administrador le entrega la contraseña. Que la herramienta se la envíe por correo es Should (S1, P-03, D-S-14).
- **R5.** Cada usuario puede cambiar su contraseña dentro de la herramienta (P-04). Un administrador puede cambiar la contraseña de cualquier usuario, salvo la del super administrador (N-12, D-S-04). Recuperarla por correo si no puede entrar es Should (S2, D-S-16).
- **R6.** Al eliminar a un estudiante, la tarea no se borra: él deja de ser responsable, y si la tarea se queda sin responsables, pasa a «Sin asignar» (D-S-18). Que la tarea siga como está cuando le quedan otros responsables es [SUPUESTO S-37]. Las tareas que completó y los pasos que marcó siguen mostrando su nombre. [SUPUESTO S-37]

### Tarea
- **R7.** Una tarea tiene **nombre**, **fecha y hora de vencimiento**, **lugar o aula** y un **checklist de al menos un paso**, y todo eso es obligatorio. La **descripción** es opcional (N-14, D-S-19). Los responsables se pueden agregar al crearla o después; sin responsables, la tarea queda «Sin asignar» (P-09, N-05).
- **R8.** Una tarea puede tener uno o varios responsables (Descripción, N-01). Un administrador también puede ser responsable y ejecutar tareas (D-S-07).
- **R9.** Todas las tareas están disponibles desde el principio: no se desbloquean unas tras otras (N-03), y los pasos se marcan en cualquier orden (D-S-20).
- **R10.** Las horas son las de Ecuador continental. [SUPUESTO S-21]

### Estados de una tarea
- **R11. Una tarea está siempre en uno, y solo uno, de estos cinco estados** (P-09, N-21):
  - **Sin asignar:** no tiene responsables y su hora no ha llegado (P-09 «No asignado», N-05). Puede tener pasos marcados si perdió a sus responsables (R6).
  - **Pendiente:** tiene al menos un responsable, ningún paso marcado y su hora no ha llegado (P-09).
  - **En ejecución:** tiene al menos un paso marcado, no está completada y su hora no ha llegado. Entra en este estado cuando alguien marca el primer paso; abrir la tarea sin marcar nada no la pone en ejecución (P-09, D-S-22). ⚠ P-01 decía «Mientras se abre se pone en ejecución».
  - **Vencida:** llegó su hora de vencimiento, desde el minuto exacto, y no está completada, tenga o no pasos marcados (P-14).
  - **Completada:** un responsable marcó todos los pasos, escribió observaciones y confirmó deslizando «completar tarea» (P-09, N-09, N-22, D-S-24). Solo sale de este estado si un administrador la reabre (R26).
- **R12. Marcas que se suman al estado.** No son estados:
  - **Por vencer:** la tarea está Sin asignar, Pendiente o En ejecución y le falta **una hora o menos** para vencer (P-12).
  - **Urgente:** la marcó un administrador (N-15).
  - **En edición:** un administrador la está editando (P-09, D-S-23).
  - **Fuera de hora:** se completó después de su hora de vencimiento (R24). [SUPUESTO S-38]
- **R13. En edición.** Mientras un administrador edita una tarea, su tarjeta muestra que está «en edición», y **nadie más puede entrar a ella** hasta que termine (P-09: «que no puedan editar 2 personas»; D-S-23).
- **R14. Por vencer.** Cuando una tarea entra en «por vencer», la herramienta avisa **dentro de la herramienta** a sus estudiantes responsables y a los administradores (P-12). Las que no tienen responsables solo se avisan a los administradores. [SUPUESTO S-39] Avisar aunque tengan la herramienta cerrada es Should (S3, D-S-15).
- **R15. Temporizador.** Toda tarea que no está completada ni vencida muestra cuánto tiempo le queda para vencer (N-05).

### Ejecución
- **R16. Completar.** Una tarea se completa solo cuando todos sus pasos están marcados, tiene observaciones escritas y un responsable confirma deslizando para completar (P-01, P-05, N-09, N-22, D-S-24). Que baste con que la tarea tenga alguna observación, sin importar quién la escribió, es [SUPUESTO S-40].
- **R17. Una tarea abierta a la vez.** Cada paso queda guardado en cuanto se marca, y el responsable puede salir de la tarea y volver sin perder nada. Pero mientras tenga una tarea abierta sin terminar, **no puede empezar otra**: si lo intenta, la herramienta le avisa por qué (P-10, D-S-26).
  - «Tarea abierta» es una tarea en ejecución en la que esa persona marcó al menos un paso. La restricción termina cuando la tarea se completa, se reasigna, se elimina o esa persona deja de ser responsable. [SUPUESTO S-41]
  - Las tareas urgentes no son una excepción. [SUPUESTO S-41; ver 8.3]
- **R18. Desmarcar.** Mientras la tarea no esté completada, cualquier responsable puede desmarcar un paso. Si quedan cero pasos marcados, la tarea vuelve a Pendiente, o sigue Vencida (D-S-27; P-11 sin respuesta del cliente).
- **R19. Sin internet.** Sin conexión, la herramienta muestra un aviso y no deja marcar ni desmarcar pasos, ni completar (N-23, D-S-02).
- **R20. Observaciones.** Cualquier responsable puede escribir observaciones mientras ejecuta la tarea (N-09). Quedan guardadas con la tarea, con su autor, y las ven los responsables y los administradores. [SUPUESTO S-40]

### Edición y eliminación
- **R21. Qué se puede editar.** Una tarea se puede editar solo si está Pendiente, o Sin asignar sin pasos marcados. En ejecución no se puede editar (P-05). Una Sin asignar con pasos marcados solo admite que se le agreguen responsables. [SUPUESTO S-42]
- **R22. Qué se puede eliminar.** Se pueden eliminar las tareas Pendientes, las Sin asignar sin pasos marcados y las Vencidas (D-S-25). No se pueden eliminar las tareas En ejecución (P-01, P-05) ni las Completadas (P-06). *Diferencia con la descripción:* la descripción dice que el administrador puede «editar y eliminar tareas», sin excepciones; mandan las respuestas del cliente.

### Varios responsables
- **R23. Checklist compartido.** Con varios responsables hay un solo checklist: lo que marca uno lo ven todos, y basta con que **cualquiera** complete la tarea para que quede completada para todos (N-02; P-07 «si»). Cada paso guarda el nombre de quien lo marcó y la hora (D-S-28). Queda registrado quién completó la tarea y cuándo (P-08). Mientras está en ejecución, el administrador ve quién la inició (P-01, D-S-29). Los responsables ven a sus compañeros con nombre y teléfono (N-10, D-S-29).

### Vencimiento, reasignación y reapertura
- **R24. Terminar una vencida.** Si un responsable está dentro de la tarea cuando vence, puede terminarla. La tarea queda Completada, con la marca «fuera de hora» (D-S-08; la marca es [SUPUESTO S-38]). «Estar dentro» significa tenerla abierta en pantalla en el momento del vencimiento; si sale, ya no puede completarla hasta que la reasignen. [SUPUESTO S-43] ⚠ P-14 decía «Pasa a un estado de vencida y el admin puede reasignar».
- **R25. Reasignar.** Al reasignar una tarea vencida, el administrador **debe** poner una nueva hora de vencimiento, y puede cambiar los responsables. Los pasos marcados se conservan, y la tarea toma el estado que le corresponda según R11 (P-14, D-S-30).
- **R26. Reabrir.** Un administrador puede reabrir una tarea completada, por ejemplo si se completó por error (D-S-06). Es Should (S4). Los pasos siguen marcados y la tarea pasa a En ejecución, o a Vencida si su hora ya pasó. Queda registrado quién la reabrió y cuándo, y la marca «fuera de hora» se quita. [SUPUESTO S-44]

### Urgencia y disponibilidad
- **R27. Urgente.** Una tarea marcada como urgente se asigna a todos los estudiantes, que se suman a los responsables que ya tenía (N-16, D-S-05). Todos la ven en su lista (D-S-10) y va primero dentro de su grupo. [SUPUESTO S-05]
- **R28. Disponibilidad.** Cada estudiante tiene días y horas de disponibilidad (P-02, N-18). No se le puede asignar una tarea si no está disponible (D-S-35). Estar disponible significa que la hora de vencimiento de la tarea cae dentro de su horario de ese día [SUPUESTO S-45]. Las urgentes son la excepción, porque van a todos (D-S-05). ⚠ Ver 8.3.
- **R29. Horas que le quedan.** El panel de estudiantes muestra cuántas horas de disponibilidad le quedan a cada estudiante en el día, es decir, cuánto le falta para irse a casa (N-20, D-S-36). Es Should (S5).

### Tablero de cumplimiento y listas
- **R30. Tarjetas.** El tablero es la página principal del administrador (N-04, N-05). Muestra una tarjeta por tarea, con su estado en color y con nombre, el temporizador, el lugar, los responsables, el avance en pasos («3 de 5») y sus marcas (por vencer, urgente, en edición) (N-05, N-10). El porcentaje además de «3 de 5» es Could (C1, D-S-13). Que el estado nunca dependa solo del color es [SUPUESTO S-31].
- **R31. Orden por defecto.** Por defecto, el tablero agrupa las tareas en este orden: **Pendientes, Vencidas, Por vencer, En ejecución, Sin asignar, Terminadas**. Cada tarea aparece en un solo grupo; una tarea por vencer va en «Por vencer». (D-S-32: las pendientes «van primeras»; el resto, en el orden de N-21.) ⚠ N-21 empezaba por «vencidas»; ver 8.3.
- **R32. Filtros y orden.** Un panel permite al administrador elegir cómo ordenar las tareas (D-S-33): por cercanía al vencimiento o de la más reciente a la más antigua (N-07), o por estado. También permite filtrar «por vencer» (N-08). Ordenar por lugar es Could (C2). [SUPUESTO S-46]
- **R33. Totales.** El tablero muestra cuántas tareas hay en cada estado, incluido cuántas están ejecutadas y cuántas pendientes (N-06).
- **R34. Apartado de completadas.** Las tareas completadas se acumulan y se ven en un apartado propio (P-06, D-S-34), tanto en el tablero («Terminadas») como en la lista del estudiante.
- **R35. Lista del estudiante.** El estudiante ve sus tareas y las urgentes, ordenadas por cercanía al vencimiento, y sus completadas en el apartado del final (D-S-10, D-S-34). El orden es [SUPUESTO S-47].
- **R36. Panel de estudiantes.** Muestra cuántas tareas tiene cada estudiante y quién no tiene ninguna (N-17) y su disponibilidad (N-18). Las horas que le quedan en el día (R29) y el historial de tareas completadas (N-19) son Should (S5, S6).

### Respuesta de la herramienta
- **R37.** Cada acción importante (iniciar sesión, guardar, marcar, completar, asignar, reasignar, reabrir, eliminar) muestra un mensaje breve de confirmación o de error (D-S-11).

## 7. Épicas

El núcleo de cada épica es **Must**. Donde una parte es Should o Could, el párrafo lo dice.

- **E1 · Acceso y usuarios — Must.** El administrador da de alta al staff y a otros administradores con su nombre, correo, teléfono, perfil y disponibilidad, y les entrega la contraseña. Cada uno puede cambiar la suya dentro de la herramienta, y el administrador puede cambiar la de cualquiera, salvo la del super administrador fijo. Enviar las credenciales por correo (S1) y recuperar la contraseña por correo (S2) son Should. Cubre R1–R6.
- **E2 · Tareas y asignación — Must.** El administrador crea tareas con nombre, hora límite, lugar, checklist y, si quiere, una descripción. Las asigna a una o varias personas disponibles, o las deja sin asignar. Puede editarlas mientras nadie las haya empezado, sin que otro entre mientras edita, y eliminarlas si están pendientes, sin asignar o vencidas. Cubre R7–R10, R13, R21, R22, R28.
- **E3 · Ejecución — Must.** Desde el celular o la computadora, el responsable ve sus tareas y las urgentes con el tiempo que le queda. Entra a una, marca los pasos en cualquier orden, escribe observaciones y la completa deslizando para confirmar. No puede empezar otra mientras tenga una abierta, y sin internet no puede marcar. Basta con que uno complete. Cubre R11, R15–R20, R23, R24, R35.
- **E4 · Estados y tablero de cumplimiento — Must.** El administrador ve todas las tareas como tarjetas agrupadas por estado, con su temporizador, el avance en pasos («3 de 5»), los totales, el filtro «por vencer» y el orden (por cercanía al vencimiento, de la más reciente a la más antigua, o por estado). El porcentaje además de «3 de 5» es Could (C1). Ordenar por lugar es Could (C2). Cubre R11, R12, R15, R30–R34.
- **E5 · Vencimientos, urgencias y avisos — Must.** Dentro de la herramienta, avisa a los responsables y a los administradores cuando una tarea está por vencer. El administrador reasigna las vencidas con una nueva hora y marca tareas urgentes, que llegan a todos los estudiantes. Avisar con la herramienta cerrada (S3) y reabrir una completada (S4) son Should. Cubre R12, R14, R24–R27.
- **E6 · Panel de estudiantes — Must.** El administrador ve quién está sin tareas, cuántas tiene cada uno y su disponibilidad. Las horas que le quedan en el día (S5) y el historial de completadas (S6) son Should. Cubre R29, R36.
- **E7 · Respuesta y conexión — Must.** Cada acción muestra un mensaje de confirmación o de error, y la herramienta avisa cuando no hay internet. Cubre R19, R37.

## 8. Supuestos y puntos abiertos

### 8.1 Supuestos resueltos por decisión del equipo (confirmado por el equipo, 23-nov)

Son decisiones del equipo, no respuestas del cliente. Se citan como D-S-xx.

| Id | Supuesto anterior | Respuesta del equipo (literal) | Decisión del equipo / confirmado por el equipo 23-nov |
| --- | --- | --- | --- |
| D-S-01 | Estudiantes en el celular, administradores en la computadora | «Todos pueden usar los 2 dispositivos» | Todos los perfiles usan celular y computadora. |
| D-S-02 | Sin conexión no se guarda | «No debe poder marcr» | Sin internet, aviso y no se pueden marcar pasos. |
| D-S-03 | Un solo super administrador | «Es solo uno […]» (el resto de la respuesta es un detalle de construcción, en `docs/cliente/preguntas.md`) | Un único super administrador fijo, que no se crea ni se borra desde la herramienta. |
| D-S-04 | ¿Un administrador cambia la contraseña del super administrador? | «no» | Nadie más que él cambia su contraseña. |
| D-S-05 | Urgente: ¿a todos o solo a los disponibles? | «A todos» | La urgente se asigna a todos los estudiantes. (Quién la marca sigue siendo S-05.) |
| D-S-06 | ¿El administrador reabre una completada por error? | «si» | Sí puede reabrirla. ⚠ Cambia la decisión anterior («Completada es final»). El 25-nov pasó a Should (S4). |
| D-S-07 | ¿El administrador ejecuta tareas? | «si» | Sí: marca pasos y completa. |
| D-S-08 | ¿Se puede terminar una vencida? | «Si esta dentro de la tarea poder terminarla» | Si el responsable está dentro de la tarea cuando vence, puede terminarla. ⚠ Ver P-14. |
| D-S-10 | ¿Qué tareas ve el estudiante? | «Ósea a el le sale las asisganaciones que se le asignaron a el y las urgente, las que no le pertenecen no debe poder ver» | Ve las suyas y las urgentes; ninguna otra. |
| D-S-11 | Cómo medir el éxito | «Con mensajes de retroalimentación de confirmación o de error estilo pop up» | Cada acción muestra un mensaje de confirmación o de error. |
| D-S-12 | ¿Qué es imprescindible para el 2 de diciembre? | «todo» | El 23-nov el equipo dijo que todo era Must. El 25-nov priorizó: 15 Must, 6 Should y 2 Could (sección 4). La respuesta literal no se borra. |
| D-S-13 | ¿El tablero muestra el porcentaje de pasos? | «si» | Sí, por tarea. El 25-nov el «3 de 5» quedó en Must y el porcentaje, en Could (C1). |
| D-S-14 | ¿Quién envía las credenciales? | «La herramienta a través de correo una vez que se crea el usuario» | La herramienta las envía por correo. El 25-nov eso quedó en Should (S1): si no está, el administrador las entrega. |
| D-S-15 | ¿Notificación con la herramienta cerrada? ¿A quién? | «Si, a estudiantes y admin» | Sí, a los responsables y a los administradores. El 25-nov el aviso dentro de la herramienta quedó en Must (M6) y el aviso con la herramienta cerrada, en Should (S3). |
| D-S-16 | Contraseña olvidada | «Si pero también puede recuperarla a través de se su correo» | La cambia un administrador (Must, M2). Recuperarla por correo es Should (S2). |
| D-S-17 | ¿Con qué se entra? | «Con el correo que cree el admin no necesariamente estudiantil» | Con el correo que registró el administrador. |
| D-S-18 | Estudiante eliminado | «Pasan a sin asignar no se borra la tarea» | Sus tareas pasan a Sin asignar y no se borran. |
| D-S-19 | Datos obligatorios | «La descripción es opcional el nombre obligatorio. Pero las subtareas obligatorio igualmente» | Nombre y pasos obligatorios; descripción opcional. |
| D-S-20 | ¿Los pasos van en orden? | «No, se puede completar como quiera» | En cualquier orden. |
| D-S-22 | ¿Cuándo empieza la ejecución? | «Al marcar el primer paso» | Con el primer paso marcado. |
| D-S-23 | ¿«En edición» es un estado? | «No, simplemente se debe marcar un apartado sobre la tarjeta de esa tarea, diciendo que esta en edición y no le debe permitir a nadie mas ingresar para evitar bugs, solo al que la esta editando» | Es una marca sobre la tarjeta; nadie más entra a la tarea mientras se edita. |
| D-S-24 | ¿Observaciones obligatorias para completar? | «si» | Sí. |
| D-S-25 | ¿Se puede eliminar una vencida? | «si» | Sí. |
| D-S-26 | ¿Se puede salir de una tarea? | «Se conserva al salir pero no puede iniciar otra tarea hasta que termine la que tiene abierta y ese mensaje debería asomarle a él» | El avance se conserva; no puede empezar otra mientras tenga una abierta, y se le avisa. |
| D-S-27 | ¿Desmarcar un paso por error? | «si» | Sí, mientras no esté completada. |
| D-S-28 | ¿Quién marcó cada paso? | «Si, con nombre de quien marco y hora» | Cada paso guarda nombre y hora. |
| D-S-29 | ¿Quién la inició o quién la tiene abierta? | «Si, y que los estudiantes asignados también vean a sus compañeros porque se les puede asignar a varios a una tarea» | Se ve quién la inició, y los responsables ven a sus compañeros. |
| D-S-30 | Reasignar | «Si al asignar se le solicita la nueva hora al admin» | Al reasignar, la nueva hora es obligatoria y se conservan los pasos. |
| D-S-32 | ¿Dónde van las pendientes en el tablero? | «Van primeras en orden jerárquico para mejor visualización» | Las pendientes van primero. ⚠ Ver N-21. |
| D-S-33 | ¿Cuándo se usa cada orden? | «Depende del uso, mejor que haya un panel de filtro donde el admin pueda ordenar a su gusto como quiere ver el orden de las tareas» | Panel de filtros para que el administrador elija el orden. |
| D-S-34 | ¿Qué es «un apartado debajo de todo»? | «Me refería al apartado donde se acumulan y visualizan todas las tareas completadas» | Es el apartado de tareas completadas. |
| D-S-35 | ¿Asignar a alguien no disponible? | «no» | No se puede. |
| D-S-36 | ¿Qué es «tiempo de vida»? | «Cuánto tiempo le queda para que se vaya a su casa, o sea las horas disponibles que tiene» | Las horas de disponibilidad que le quedan en el día. El 25-nov quedó en Should (S5). |
| D-P16 | Identidad visual (punto abierto de P-16) | «Sí, ese es el panel de colores, tipografía y muestras de animaciones que debemos seguir.» | El sistema de diseño sigue el brandboard «Señal Neón» de Interact2Hack. Afecta al DESIGN.md. El cliente no lo respondió en la sesión. |

### 8.2 Supuestos que siguen abiertos

| Id | [SUPUESTO] — decisión del equipo | En qué se apoya |
| --- | --- | --- |
| S-05 | La marca de urgente la pone el administrador. | N-15 (está bajo «Panel de estudiantes»); D-S-05 solo respondió «A todos» |
| S-09 | El estudiante no ve el tablero ni el panel de estudiantes. | N-04 «Ingrso a la parte de admin»; sin respuesta del equipo |
| S-12 | No-alcance (sección 5). | D-S-12 «todo» se refiere a lo ya descrito; la prioridad de cada parte está en la sección 4 |
| S-21 | Las horas son las de Ecuador continental. | Sin respuesta del equipo |
| S-31 | Cada estado se muestra con color y con nombre. | N-05 «Por colores»; criterio de accesibilidad del curso |
| S-37 | Si a la tarea le quedan otros responsables, sigue como está; lo que hizo el estudiante eliminado conserva su nombre. | D-S-18 |
| S-38 | Una tarea completada después de vencer lleva la marca «fuera de hora». | D-S-08 y P-14 |
| S-39 | Una tarea por vencer sin responsables solo se avisa a los administradores. | D-S-15 |
| S-40 | Para completar basta con que la tarea tenga una observación, de cualquier responsable; las observaciones guardan su autor. | D-S-24, N-09 |
| S-41 | «Tarea abierta» es una en ejecución en la que la persona marcó un paso. La restricción termina al completarse, reasignarse o eliminarse la tarea, o al dejar de ser responsable. Las urgentes no son excepción. | D-S-26 |
| S-42 | Una Sin asignar con pasos marcados solo admite que se le agreguen responsables. | D-S-18, P-05 |
| S-43 | «Estar dentro» de la tarea es tenerla abierta en pantalla en el momento del vencimiento. | D-S-08 |
| S-44 | Al reabrir, los pasos siguen marcados, la tarea pasa a En ejecución (o a Vencida), queda registrado quién la reabrió y se quita la marca «fuera de hora». | D-S-06 |
| S-45 | «Disponible» significa que la hora de vencimiento cae dentro de su horario de ese día. | D-S-35, N-18 |
| S-46 | Opciones del panel de orden: vencimiento, reciente a antigua, estado y lugar. | D-S-33, N-07 |
| S-47 | La lista del estudiante se ordena por cercanía al vencimiento. | — |

### 8.3 Contradicciones y puntos abiertos (sin resolver)

1. **D-S-12, priorizado el 25-nov.** El equipo ya no deja todo en Must. Quedaron en Should el envío de credenciales por correo, la recuperación por correo, el aviso con la herramienta cerrada, reabrir una completada, las horas que le quedan y el historial. Quedaron en Could el porcentaje además de «3 de 5» y ordenar por lugar. El resto, la mayoría, sigue en Must (sección 4).
2. **⚠ D-S-06 (reabrir) frente a la decisión anterior.** El borrador revisado decía que una completada era final, apoyado en P-05 y P-06. El equipo ahora permite que el administrador la reabra (R26) y el 25-nov lo dejó en Should (S4). El cliente no lo prohibió, pero tampoco lo pidió.
3. **⚠ D-S-08 frente a P-14.** El cliente dijo «Pasa a un estado de vencida y el admin puede reasignar». El equipo permite terminarla si el responsable está dentro de la tarea (R24). Hay que confirmarlo con el cliente.
4. **⚠ D-S-15: notificaciones con la herramienta cerrada.** El cliente pidió «una noti» (P-12), sin decir si con la herramienta cerrada. El equipo decidió que sí, y el 25-nov la dejó en Should (S3). El aviso dentro de la herramienta es Must (M6).
5. **⚠ D-S-32 frente a N-21.** En la sesión, el cliente enumeró «vencidas» primero y no mencionó las pendientes; el equipo pone las pendientes primero. El panel de filtros (D-S-33) permite cambiar el orden, pero el orden por defecto hay que confirmarlo con el cliente.
6. **⚠ D-S-05 frente a D-S-35.** La urgente va «a todos», pero no se puede asignar a quien no está disponible. Se resolvió con las urgentes como excepción (R28). Hay que confirmar si deben ir también a quienes no están disponibles ese día.
7. **⚠ D-S-17 frente a P-02.** El cliente dijo «Correo estud»; el equipo acepta cualquier correo.
8. **⚠ D-S-14 frente a P-03.** El cliente dijo «Por correo todas las credenciales o por whats». El equipo no usa WhatsApp (Won't). El envío por correo quedó en Should (S1): si no está, el administrador entrega las credenciales.
9. **P-11 sigue sin respuesta del cliente.** El equipo decidió que se puede desmarcar (D-S-27).
10. **P-16 sin respuesta del cliente.** El equipo decidió seguir el brandboard «Señal Neón» (D-P16); conviene confirmarlo con el cliente.
11. **D-S-26 y las urgentes.** ¿Puede alguien con una tarea abierta empezar una urgente? (S-41)
12. **Cuántas tareas, estudiantes y días de evento** hay: afecta cómo se ve el tablero y el panel de estudiantes.

## 9. Trazabilidad

| Regla | Respuesta o nota del cliente | Decisión del equipo (D-S-xx) | Supuesto abierto |
| --- | --- | --- | --- |
| R1 | Descripción · N-11 | D-S-17 | — |
| R2 | N-11 | — | — |
| R3 | N-13 | D-S-03 · D-S-04 | — |
| R4 | P-03 | D-S-14 | — |
| R5 | P-04 · N-12 | D-S-04 · D-S-16 | — |
| R6 | P-01 (no responde) | D-S-18 | S-37 |
| R7 | Descripción · N-14 · P-09 · N-05 | D-S-19 | — |
| R8 | Descripción · N-01 | D-S-07 | — |
| R9 | N-03 | D-S-20 | — |
| R10 | — | — | S-21 |
| R11 | P-09 · P-14 · N-05 · N-09 · N-21 · N-22 · P-01 | D-S-22 · D-S-24 | — |
| R12 | P-12 · N-15 · P-09 | D-S-23 | S-38 |
| R13 | P-09 | D-S-23 | — |
| R14 | P-12 | D-S-15 | S-39 |
| R15 | N-05 | — | — |
| R16 | P-01 · P-05 · N-09 · N-22 | D-S-24 | S-40 |
| R17 | P-10 | D-S-26 | S-41 |
| R18 | P-11 (sin respuesta) | D-S-27 | — |
| R19 | N-23 | D-S-02 | — |
| R20 | N-09 | — | S-40 |
| R21 | P-05 | — | S-42 |
| R22 | P-01 · P-05 · P-06 | D-S-25 | — |
| R23 | N-02 · P-07 · P-08 · P-01 · N-10 | D-S-28 · D-S-29 | — |
| R24 | P-14 | D-S-08 | S-38 · S-43 |
| R25 | P-14 | D-S-30 | — |
| R26 | — | D-S-06 | S-44 |
| R27 | N-15 · N-16 | D-S-05 · D-S-10 | S-05 |
| R28 | P-02 · N-18 | D-S-35 · D-S-05 | S-45 |
| R29 | N-20 | D-S-36 | — |
| R30 | N-04 · N-05 · N-10 | D-S-13 | S-31 |
| R31 | N-21 | D-S-32 | — |
| R32 | N-07 · N-08 | D-S-33 | S-46 |
| R33 | N-06 | — | — |
| R34 | P-06 | D-S-34 | — |
| R35 | Descripción | D-S-10 · D-S-34 | S-47 |
| R36 | N-17 · N-18 · N-19 | — | — |
| R37 | — | D-S-11 | — |
