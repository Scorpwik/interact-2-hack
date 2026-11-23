# PRD — Herramienta de organización de staff del Interact2Hack

**Proyecto final · Desarrollo Web 2 · USFQ** · Avance 2
**Equipo:** Joshua Lozada y Raymond Portilla
**Fuentes:** `docs/fuentes/descripcion-proyecto.md` (descripción del cliente) y `docs/cliente/preguntas.md` (Avance 1, con las respuestas y las notas de la sesión del 11 de noviembre de 2026).

> **Cómo leer el origen de cada frase.** «Descripción» = lo dice la descripción del proyecto. «P-xx» = respuesta del cliente a esa pregunta. «N-xx» = nota de la sesión con el cliente. «[SUPUESTO S-xx]» = decisión del equipo que el cliente no definió (sección 8).

## 1. Problema y contexto

Durante el Interact2Hack, los organizadores necesitan repartir y controlar el trabajo del staff de estudiantes: qué hay que hacer, dónde, para cuándo y quién lo hace (Descripción). La herramienta convierte cada encargo en una tarea con fecha y hora de vencimiento, lugar o aula, un checklist paso a paso y uno o varios responsables (Descripción, N-14). Los estudiantes marcan los pasos y completan la tarea; los administradores ven en un tablero el estado de todas las tareas, lo que está por vencer y cómo va cada estudiante (Descripción, N-05, N-17).

**Para quién:** los administradores (organizadores, incluido un super administrador) y los estudiantes del staff (Descripción, N-11, N-13).

**En qué momento se usa:** durante los días de trabajo del hackathon. El administrador indica qué estudiantes están disponibles cada día (N-18), crea y asigna tareas, y sigue su avance; los estudiantes ejecutan sus tareas en las aulas.

**Contexto de uso:**
- Se usa desde el **celular** y también desde la **computadora** (P-15). El equipo supone que los estudiantes usan sobre todo el celular y los administradores, sobre todo la computadora. [SUPUESTO S-01]
- **Conectividad:** si el usuario se queda sin internet, la herramienta debe mostrarle un aviso (N-23). No se trabaja sin conexión. [SUPUESTO S-02]

## 2. Usuarios y perfiles

El acceso es con login y no hay registro propio: las cuentas las crea un administrador (Descripción, N-11).

### Super administrador
Es un administrador que **no se puede eliminar** (N-13). Puede todo lo que puede un administrador.

### Administrador
**Puede:**
- Crear administradores y estudiantes (N-11), y ver, editar y eliminar usuarios (Descripción).
- Registrar de cada usuario: nombre, correo estudiantil, teléfono y los días y horas en que está disponible (P-02, N-18).
- Cambiar la contraseña de cualquier usuario (N-12).
- Crear tareas y asignarlas a una o varias personas (Descripción, N-01).
- Editar y eliminar tareas, con las restricciones de las reglas R11 y R12 (P-05, P-06).
- Marcar una tarea como urgente (N-15).
- Reasignar una tarea vencida (P-14).
- Ver el tablero de cumplimiento (N-04, N-05) y el panel de estudiantes (N-17).
- Ver quién completó cada tarea y el historial de tareas completadas de cada estudiante (P-08, N-19).

**No puede:**
- Eliminar al super administrador (N-13).
- Editar ni eliminar una tarea en ejecución (P-05, P-01).
- Eliminar una tarea completada (P-06).

### Estudiante
**Puede:**
- Ver la lista de sus tareas asignadas y su estado (Descripción).
- Entrar al detalle de una tarea, marcar sus pasos, escribir observaciones y completarla (Descripción, N-09).
- Ver quiénes son los otros responsables, con su nombre y teléfono (N-10).
- Cambiar su propia contraseña dentro de la herramienta (P-04).

**No puede:**
- Crear, editar, asignar ni eliminar tareas, ni gestionar usuarios (Descripción).
- Completar una tarea sin haber marcado todos sus pasos (P-01, P-05).

## 3. Objetivos y éxito

El cliente no definió cómo va a medir el éxito. Estas señales son del equipo. [SUPUESTO S-03]
- **Cada estudiante sabe qué hacer, dónde y para cuándo.** Al entrar ve sus tareas con el lugar y el tiempo que le queda.
- **Nada se da por hecho sin terminarse.** Ninguna tarea queda completada con pasos sin marcar, y siempre se sabe quién la completó.
- **El administrador reacciona a tiempo.** En el tablero ve primero lo vencido y lo que vence en menos de una hora.
- **El trabajo se reparte bien.** El administrador ve qué estudiantes no tienen tareas y cuántas tiene cada uno.

## 4. Alcance (MoSCoW)

La priorización es del equipo y está pensada para el avance funcional del 2 de diciembre. [SUPUESTO S-04]

**Must**
- M1. Login con cuentas creadas por un administrador; super administrador que no se puede eliminar (Descripción, N-11, N-13).
- M2. Gestión de usuarios: crear administradores y estudiantes, con nombre, correo estudiantil y teléfono; editar y eliminar (P-02, N-11).
- M3. Gestión de tareas: crear con fecha y hora de vencimiento, lugar o aula, checklist y responsables; editar y eliminar con las restricciones de estado (N-14, P-05, P-06).
- M4. Asignar una tarea a una o varias personas (N-01).
- M5. Lista de tareas del estudiante, con su estado y el tiempo que le queda (Descripción, N-05).
- M6. Ejecución: marcar pasos, escribir observaciones y completar la tarea con un gesto deliberado (N-09, N-22).
- M7. Los seis estados de la tarea y sus cambios (P-09).
- M8. Tablero de cumplimiento en tarjetas, con el estado, el temporizador, los totales, el orden y el filtro «por vencer» (N-05 a N-08, N-21).

**Should**
- S1. Marcar una tarea como urgente y asignarla a todos (N-15, N-16).
- S2. Panel de estudiantes: quién no tiene tareas y cuántas tiene cada uno (N-17).
- S3. Disponibilidad de cada estudiante por día y hora (P-02, N-18).
- S4. Historial de tareas completadas por estudiante (N-19).
- S5. Aviso dentro de la herramienta cuando una tarea pasa a «por vencer» (P-12).
- S6. Aviso de que no hay internet (N-23).
- S7. Cambiar la propia contraseña y que el administrador cambie la de cualquiera (P-04, N-12).
- S8. Reasignar una tarea vencida (P-14).

**Could**
- C1. Cuánto tiempo le queda a cada estudiante en su día de trabajo (N-20).
- C2. Ordenar de la más reciente a la más antigua (N-07).

**Won't (no en esta versión)**
- W1. Enviar las credenciales automáticamente por correo o WhatsApp (P-03): el administrador las envía por su cuenta. [SUPUESTO S-05]
- W2. Notificaciones fuera de la herramienta. [SUPUESTO S-06]
- W3. Trabajar sin conexión. [SUPUESTO S-02]
- W4. Registro abierto de usuarios (Descripción).

## 5. No-alcance

- Que participantes, jurados o auspiciantes usen la herramienta: solo la usa el staff. [SUPUESTO S-04]
- Tareas que se repiten, plantillas o dependencias entre tareas. [SUPUESTO S-04]
- Fotos o archivos como evidencia de un paso. [SUPUESTO S-04]
- Reportes descargables. [SUPUESTO S-04]
- Notificaciones fuera de la herramienta y trabajo sin conexión (W2, W3).

## 6. Reglas de negocio

### Cuentas
- **R1.** Solo se entra con una cuenta creada por un administrador; no hay registro propio (Descripción, N-11).
- **R2.** Hay perfiles de administrador y de estudiante. Un administrador puede crear otros administradores y estudiantes (N-11).
- **R3.** Existe un super administrador que no se puede eliminar (N-13).
- **R4.** El administrador puede cambiar la contraseña de cualquier usuario y cada usuario puede cambiar la suya dentro de la herramienta (N-12, P-04).
- **R5.** Las credenciales se le envían al estudiante por correo o por WhatsApp (P-03).

### Tarea
- **R6.** Una tarea tiene fecha y hora de vencimiento, lugar o aula, checklist y responsables (N-14).
- **R7.** Una tarea puede tener uno o varios responsables (Descripción, N-01).

### Estados
- **R8.** Una tarea está en uno de estos estados (P-09):
  - **Sin asignar:** no tiene responsables.
  - **Pendiente:** tiene responsables y nadie ha marcado un paso.
  - **En ejecución:** alguien marcó el primer paso (P-09).
  - **Vencida:** llegó la hora de vencimiento sin completarse (P-14).
  - **Completada:** alguien la completó.
  - **En edición:** un administrador la está editando (P-09).
- **R9.** Una tarea está **por vencer** cuando falta una hora o menos para su vencimiento (P-12).
- **R10.** Una tarea se completa cuando un responsable marca todos los pasos y confirma con «completar tarea». No se puede completar con pasos sin marcar (P-01, N-09).

### Edición y eliminación
- **R11.** Una tarea en ejecución no se puede editar ni eliminar (P-05, P-01).
- **R12.** Una tarea completada no se puede eliminar (P-06).
- **R13.** Dos personas no pueden editar la misma tarea al mismo tiempo (P-09).

### Varios responsables
- **R14.** Con varios responsables, basta con que cualquiera complete la tarea (N-02, P-07).
- **R15.** Queda registrado quién completó la tarea (P-08).

### Vencimiento y urgencia
- **R16.** Una tarea vencida puede ser reasignada por el administrador (P-14).
- **R17.** Una tarea urgente se asigna a todos los estudiantes (N-16).

### Tablero
- **R18.** El tablero muestra una tarjeta por tarea, con su estado (con color) y el tiempo que le queda (N-05).
- **R19.** El tablero muestra el total de tareas ejecutadas y pendientes (N-06).
- **R20.** El tablero se ordena por las más cercanas a vencer (N-07) y tiene un filtro «por vencer» (N-08).

## 7. Épicas

- **E1 · Acceso y usuarios — Must.** El administrador da de alta al staff y a otros administradores con sus datos de contacto, y envía las credenciales por correo o WhatsApp. Cualquiera puede cambiar su contraseña y el administrador puede cambiar la de todos. El super administrador nunca se puede eliminar. Cubre R1–R5.
- **E2 · Tareas y asignación — Must.** El administrador crea tareas con su hora límite, su lugar y su checklist, y las asigna a una o varias personas. Puede editarlas o eliminarlas mientras nadie las haya empezado. Cubre R6, R7, R11–R13.
- **E3 · Ejecución desde el celular — Must.** El estudiante ve sus tareas con el tiempo que le queda, entra a una, marca los pasos, escribe observaciones y la completa deslizando para confirmar. Cubre R8, R10, R14, R15.
- **E4 · Tablero de cumplimiento — Must.** El administrador ve todas las tareas como tarjetas por estado, con su temporizador, los totales, el orden por vencimiento y el filtro de «por vencer». Cubre R9, R18–R20.
- **E5 · Urgencias y vencimientos — Should.** El administrador marca tareas urgentes para asignarlas a todos y reasigna las vencidas; la herramienta avisa cuando una tarea está por vencer. Cubre R9, R16, R17.
- **E6 · Panel de estudiantes — Should.** El administrador ve quién no tiene tareas, cuántas tiene cada uno, su disponibilidad por día y el historial de lo que completó. Cubre R15.

## 8. Supuestos y puntos abiertos

| Id | [SUPUESTO] | Base |
| --- | --- | --- |
| S-01 | [SUPUESTO] Estudiantes sobre todo en el celular; administradores sobre todo en la computadora. | P-15 |
| S-02 | [SUPUESTO] Hace falta conexión; sin internet se muestra un aviso y no se trabaja sin conexión. | N-23 |
| S-03 | [SUPUESTO] Señales de éxito de la sección 3. | — |
| S-04 | [SUPUESTO] Priorización MoSCoW y no-alcance. | — |
| S-05 | [SUPUESTO] El administrador envía las credenciales por su cuenta. | P-03 |
| S-06 | [SUPUESTO] La notificación de «por vencer» es un aviso dentro de la herramienta. | P-12 |

**Puntos abiertos:** P-11 y P-16 sin respuesta. P-01 no responde qué pasa con las tareas de un estudiante eliminado. P-10 no es clara.

## 9. Trazabilidad

| Regla | Origen |
| --- | --- |
| R1 | Descripción · N-11 |
| R2 | N-11 |
| R3 | N-13 |
| R4 | N-12 · P-04 |
| R5 | P-03 |
| R6 | N-14 · Descripción |
| R7 | Descripción · N-01 |
| R8 | P-09 · P-14 |
| R9 | P-12 |
| R10 | P-01 · N-09 |
| R11 | P-05 · P-01 |
| R12 | P-06 |
| R13 | P-09 |
| R14 | N-02 · P-07 |
| R15 | P-08 |
| R16 | P-14 |
| R17 | N-16 |
| R18 | N-05 |
| R19 | N-06 |
| R20 | N-07 · N-08 |
