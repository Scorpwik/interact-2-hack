# 02 · Datos y RLS

**Paso:** P1 · **Rama:** `feat/esquema-datos` · **Dueño:** Joshua · **Estado:** lista

## 1. Objetivo

Modelar perfiles, disponibilidades, tareas, pasos, responsables y observaciones, con el estado calculado en `tareas_vista` y con RLS para que cada perfil solo vea y escriba lo que el PRD permite.

## 2. Requisitos que cubre

| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| Dos perfiles | PRD R2 | `perfiles.rol` en `admin` o `estudiante` |
| Un solo super administrador, no borrable | PRD R3, W4 | Índice único parcial y trigger |
| Nombre, hora, lugar y checklist | PRD R7 | Columnas de `tareas` y `pasos`; la descripción es nula |
| Uno o varios responsables | PRD R8 | Tabla `responsables`; cero filas = sin asignar |
| Horas | PRD R10, S-21 | `timestamptz` |
| Cinco estados, uno solo | PRD R11 | `tareas_vista.estado` |
| Por vencer | PRD R12 | `tareas_vista.por_vencer` |
| En edición | PRD R13, S-48 | `editando_por` y `editando_desde`; el vencimiento de 15 min lo calcula P3 |
| Observaciones con autor | PRD R20 | Tabla `observaciones` |
| Urgente visible para todos | PRD R27, R35 | Política de lectura: responsable o `urgente` |
| Compañeros | PRD R23 | El estudiante lee perfiles de quienes comparten una tarea visible |
| Solo administradores escriben tareas y perfiles | PRD R2 | Políticas de escritura |
| Marcar y completar no van por tabla | PRD R9, R16 | Sin políticas de escritura en `pasos` ni `observaciones` (RPC en P9) |
| Disponibilidad | PRD R28, S-45 | `disponibilidades` por fecha y rango horario |

## 3. Fuera de alcance

Funciones `marcar_paso` y `completar_tarea` (P9). Bloqueo activo de edición (P15). Validar disponibilidad al asignar (P17). Reabrir (P24). Realtime (P19).

## 4. Diseño técnico

Identificadores `uuid`. `perfiles.id` es `auth.users.id`. El resto usa `gen_random_uuid()`.

[SUPUESTO] Se usa uuid v4 y no identity ni uuidv7. `perfiles.id` tiene que ser el uuid de Auth. El volumen es el staff de un evento, así que la fragmentación de índice que advierte la guía de Supabase no aplica aquí. No se asume la extensión `pg_uuidv7`.

Las claves foráneas llevan índice. Las horas son `timestamptz`.

### perfiles

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | = `auth.users.id`, `on delete cascade` |
| nombre | text not null | |
| correo | text not null unique | |
| telefono | text not null | R23 muestra el teléfono. [SUPUESTO] cadena vacía si aún no tiene |
| rol | text not null | `admin` o `estudiante` |
| es_super_admin | boolean not null default false | Solo una fila en true |

Índice único parcial: `perfiles_un_super_admin` sobre `(es_super_admin)` donde `es_super_admin`.

Trigger `perfiles_proteger_super_admin`, antes de borrar o actualizar: si la fila es super administrador, rechaza el borrado y rechaza cambiar `rol` o `es_super_admin`. El correo sí puede cambiar (el script de P5 actualiza el provisional). Mensaje: «No se puede borrar ni cambiar el perfil del super administrador.»

### disponibilidades

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| perfil | uuid not null | FK `perfiles`, `on delete cascade` |
| dia | date not null | [SUPUESTO S-45] la fecha del evento, no un día de la semana suelto |
| desde | time not null | Hora local de Ecuador, sin zona |
| hasta | time not null | `hasta > desde` |

Índice `(perfil, dia)`.

### tareas

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| nombre | text not null | R7 |
| descripcion | text | Opcional |
| vence_en | timestamptz not null | R10 |
| lugar | text not null | R7 |
| urgente | boolean not null default false | R27 |
| creada_por | uuid | FK `perfiles`, `on delete set null` |
| iniciada_por | uuid | FK, `on delete set null` |
| iniciada_en | timestamptz | R23 |
| completada_por | uuid | FK, `on delete set null` |
| completada_en | timestamptz | R23. No nulo = Completada |
| fuera_de_hora | boolean not null default false | R24 |
| editando_por | uuid | FK, `on delete set null` |
| editando_desde | timestamptz | R13 |

[SUPUESTO S-37] `iniciada_por_nombre` y `completada_por_nombre` (text, nulos) guardan el nombre para cuando el perfil ya no existe (R6). P14 los llena antes de borrar. No son un requisito nuevo: sin ellos R6 no se puede cumplir.

### pasos

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| tarea | uuid not null | FK `tareas`, `on delete cascade`. Índice |
| orden | integer not null | `orden >= 1`. Único `(tarea, orden)` |
| texto | text not null | |
| marcado_por | uuid | FK, `on delete set null` |
| marcado_en | timestamptz | R23. No nulo si el paso está marcado |
| marcado_por_nombre | text | [SUPUESTO S-37] el nombre sobrevive al borrado del perfil |

### responsables

Clave primaria `(tarea, perfil)`. Las dos columnas son FK. `perfil` lleva índice propio. Borrar el perfil los quita de la tarea (`on delete cascade`), que es R6: deja de ser responsable. Si no queda ninguno, la vista queda en `sin_asignar`.

### observaciones

| Columna | Tipo | Notas |
| --- | --- | --- |
| id | uuid PK | |
| tarea | uuid not null | FK `tareas`, `on delete cascade`. Índice |
| autor | uuid | FK `perfiles`, `on delete set null` |
| autor_nombre | text not null | R6 y R20 |
| texto | text not null | |
| creada_en | timestamptz not null default now() | |

### Vista tareas_vista

`security_invoker = true`. Una fila por tarea. Columnas de la tarea, más:

| Columna | Cálculo |
| --- | --- |
| pasos_total | cantidad de pasos |
| pasos_marcados | pasos con `marcado_en` no nulo |
| responsables_total | filas en `responsables` |
| estado | el primero que cumpla, en este orden |
| por_vencer | ver abajo |

`estado`, con `now()`:

1. `completada` si `completada_en` no es nulo (sigue completada aunque la hora ya pasó; R24).
2. Si no, `vencida` si `now() >= vence_en` (desde ese instante, con o sin pasos, con o sin responsables; R11).
3. Si no, `sin_asignar` si `responsables_total = 0` (puede tener pasos marcados; R6).
4. Si no, `en_ejecucion` si `pasos_marcados > 0`.
5. Si no, `pendiente`.

`por_vencer` es verdadero solo si el estado es `sin_asignar`, `pendiente` o `en_ejecucion` y `vence_en <= now() + interval '60 minutes'` (R12). A los 60 minutos exactos ya es por vencer. En el instante del vencimiento el estado ya es `vencida`, así que `por_vencer` es falso.

### Funciones de apoyo (esquema `private`)

`security definer`, `search_path` vacío, y leen `auth.uid()` dentro. No se exponen por la API. `authenticated` puede ejecutarlas porque las políticas corren con ese rol.

| Función | Devuelve verdadero si |
| --- | --- |
| `private.es_admin()` | el perfil de `auth.uid()` tiene rol `admin` |
| `private.puede_ver_tarea(uuid)` | la tarea es urgente o el usuario es responsable |
| `private.puede_ver_perfil(uuid)` | es su propio perfil, o ese perfil es responsable de una tarea que puede ver |

Así las políticas no se consultan entre sí.

### Políticas RLS

RLS activada en las seis tablas. `anon` no tiene permisos. `authenticated` tiene permisos de tabla y la política filtra. `service_role` sigue saltándose RLS (scripts y `admin.ts`).

| Tabla | Quién | Comando | Condición | Regla |
| --- | --- | --- | --- | --- |
| perfiles | admin | todo | `private.es_admin()` | R2 |
| perfiles | estudiante | select | `private.puede_ver_perfil(id)` | R23 |
| disponibilidades | admin | todo | `private.es_admin()` | R2, R28 |
| tareas | admin | todo | `private.es_admin()` | R2 |
| tareas | estudiante | select | `private.puede_ver_tarea(id)` | R27, R35 |
| responsables | admin | todo | `private.es_admin()` | R2 |
| responsables | estudiante | select | `private.puede_ver_tarea(tarea)` | R23 |
| pasos | admin o estudiante | select | `private.puede_ver_tarea(tarea)` o admin | R23 |
| observaciones | admin o estudiante | select | igual que pasos | R20, R23 |

No hay política de `insert`, `update` ni `delete` sobre `pasos` ni `observaciones`. Marcar, desmarcar, observar y completar quedan para las RPC de P9.

El trigger de R3 corre también para el administrador y para la service role: la política deja pasar al admin y el trigger frena el cambio prohibido.

## 5. Casos y bordes

| Entrada | Estado | Por vencer |
| --- | --- | --- |
| Sin responsables, hora futura, sin pasos marcados | sin_asignar | solo si faltan ≤ 60 min |
| Sin responsables, con pasos marcados, hora futura | sin_asignar | igual |
| Sin responsables y `now() >= vence_en` | vencida | no |
| Con responsables, cero pasos, hora futura | pendiente | solo si faltan ≤ 60 min |
| Con responsables, al menos un paso, hora futura | en_ejecucion | solo si faltan ≤ 60 min |
| `now() = vence_en`, no completada | vencida | no |
| `completada_en` no nulo, aunque `now() >= vence_en` | completada | no |
| Faltan 60 min exactos, pendiente | pendiente | sí |

- Un estudiante no inserta tareas ni perfiles.
- Un estudiante no actualiza un paso por la tabla.
- Un administrador no borra al super administrador ni le cambia el rol.
- Dos filas con `es_super_admin = true` no pueden existir.

## 6. Supuestos y preguntas

- [SUPUESTO S-45] La disponibilidad se guarda por fecha (`dia date`) y rango `desde`–`hasta`. «Disponible» (que la hora de vencimiento caiga dentro) se valida en P17, no en esta migración.
- [SUPUESTO S-37] Se guardan nombres de quien inició, completó o marcó, además del id, para que R6 siga mostrando el nombre.
- [SUPUESTO S-48] Esta migración guarda `editando_por` y `editando_desde`. Los 15 minutos los interpreta P3 y P15.
- [SUPUESTO] El estudiante ve el correo del compañero si consulta la fila, porque los dos perfiles usan el rol `authenticated` y RLS no esconde columnas. La interfaz solo muestra nombre y teléfono (R23).
- [SUPUESTO] `telefono` es obligatorio en la tabla y puede ir vacío.
- Pregunta para el equipo: ninguna. Lo no dicho en el PRD quedó marcado arriba.

## 7. Cómo se verifica

Con un administrador y un estudiante de prueba, después de `npx supabase db push`:

- El estudiante lee una tarea donde es responsable y una urgente, y no lee una tarea ajena que no es urgente.
- El estudiante lee el perfil de un compañero de esa tarea y no el de alguien con quien no comparte tarea.
- El estudiante no inserta una tarea ni actualiza un paso.
- El administrador lee y crea una tarea.
- Borrar al super administrador o cambiarle el rol falla con el mensaje de la spec.
- Cinco filas de ejemplo cubren los estados de la tabla de arriba y coinciden con la vista.

El resultado de esa prueba se anota aquí cuando el proyecto de Supabase esté enlazado. Hasta entonces esta sección es el guion, no el resultado.
