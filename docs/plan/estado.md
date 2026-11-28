# Tablero de avance · Avance 3

Cada paso tiene un responsable fijo y una ronda (PLAN.md, sección 4), así que aquí no se reserva nada: este archivo solo muestra **qué ya entró a `main`**.

**Cómo leerlo**

- `— pendiente`: el paso todavía no está en `main`. `— hecho`: ya se mergeó (esta línea solo llega a `main` con el merge del paso).
- `— descartado`: el paso no entra en el Avance 3 (solo Fase 3; lo decide Joshua en P29).
- Lo que está en revisión se ve en `gh pr list --state open`.

**Cómo se edita**

- El responsable cambia **solo la línea de su paso**, en el último commit de su rama: `docs(plan): avance de Pn` (`— pendiente` → `— hecho`).
- Las líneas van separadas por una línea en blanco a propósito: así dos PR de la misma ronda se mergean sin conflicto.
- No reordenes ni reformatees este archivo.

### Fase 0 · Preparación

- Ronda 0 · **P0** · Esqueleto mínimo del proyecto · Joshua · `chore/esqueleto` — pendiente

### Fase 1 · MVP de la demo (meta: hoy)

- Ronda 1 · **P1** · Supabase, Vercel y esquema de datos con RLS · Joshua · `feat/esquema-datos` — pendiente

- Ronda 1 · **P2** · Componentes base de DESIGN.md y catálogo · Raymond · `feat/ui-base` — pendiente

- Ronda 2 · **P3** · Lógica de estados y de tiempo · Joshua · `feat/estados-tarea` — pendiente

- Ronda 2 · **P6** · Componentes del formulario de tarea · Raymond · `feat/ui-formulario-tarea` — pendiente

- Ronda 3 · **P5** · Autenticación, perfiles y super administrador · Joshua · `feat/auth-roles` — pendiente

- Ronda 3 · **P4** · Navegación, login visual y aviso sin conexión · Raymond · `feat/layout-navegacion` — pendiente

- Ronda 4 · **P7** · Crear tareas y asignar responsables · Joshua · `feat/tareas-crear` — pendiente

- Ronda 4 · **P8** · Componentes de tarea, checklist y deslizar para completar · Raymond · `feat/ui-tarea` — pendiente

- Ronda 5 · **P9** · Ejecución: lista del estudiante, marcar pasos y completar · Joshua · `feat/ejecucion` — pendiente

- Ronda 5 · **P10** · Componentes del tablero de cumplimiento · Raymond · `feat/ui-tablero` — pendiente

- Ronda 6 · **P11** · Tablero con datos reales · Joshua · `feat/tablero` — pendiente

- Ronda 7 · **P12** · Revisión de diseño del MVP · Raymond · `docs/revision-diseno-mvp` — pendiente

### Fase 2 · Resto de los Must

- Ronda 6 · **P16** · PWA: manifest e íconos · Raymond · `feat/pwa` — pendiente

- Ronda 7 · **P18** · Reglas de ejecución: una tarea abierta y terminar una vencida · Joshua · `feat/reglas-ejecucion` — pendiente

- Ronda 8 · **P15** · Editar, eliminar y bloqueo «en edición» · Joshua · `feat/edicion-bloqueo` — pendiente

- Ronda 8 · **P13** · Pantallas de usuarios, estudiantes, perfil y completadas · Raymond · `feat/ui-pantallas` — pendiente

- Ronda 9 · **P14** · Usuarios, disponibilidad y contraseñas · Joshua · `feat/usuarios` — pendiente

- Ronda 9 · **P31** · Componentes de reasignación e historial de ejecución · Raymond · `feat/ui-reasignacion-historial` — pendiente

- Ronda 10 · **P17** · Disponibilidad, urgentes y reasignación · Joshua · `feat/asignacion-urgentes` — pendiente

- Ronda 10 · **P21** · Datos de demo y README · Raymond · `feat/datos-demo` — pendiente

- Ronda 11 · **P19** · Tiempo real y aviso «por vencer» dentro de la herramienta · Joshua · `feat/tiempo-real` — pendiente

- Ronda 11 · **P33** · Prueba de reglas de negocio en la vista previa · Raymond · `docs/prueba-reglas` — pendiente

- Ronda 12 · **P20** · Tablero completo y panel de estudiantes conectado · Joshua · `feat/tablero-filtros-panel` — pendiente

- Ronda 12 · **P22** · Revisión de diseño y textos de todas las pantallas · Raymond · `docs/revision-diseno-final` — pendiente

### Fase 3 · Should y Could (solo si sobra tiempo)

- Ronda 13 · **P23** · SH6 y SH5: historial de completadas y horas que le quedan · Joshua · `feat/panel-historial` — pendiente

- Ronda 13 · **P32** · Pantallas de recuperar contraseña y permiso de avisos · Raymond · `feat/ui-recuperar-avisos` — pendiente

- Ronda 14 · **P24** · SH4: reabrir una tarea completada · Joshua · `feat/reabrir` — pendiente

- Ronda 14 · **P27** · CO2: ordenar el tablero por lugar · Joshua · `feat/orden-lugar` — pendiente

- Ronda 14 · **P28** · CO1: porcentaje de pasos en la tarjeta · Raymond · `feat/porcentaje-pasos` — pendiente

- Ronda 15 · **P25** · SH2 y SH1: recuperar contraseña y enviar credenciales por correo · Joshua · `feat/correo` — pendiente

- Ronda 16 · **P26** · SH3: aviso «por vencer» con la herramienta cerrada · Joshua · `feat/aviso-cerrada` — pendiente

### Fase 4 · Cierre y demo

- Ronda 17 · **P29** · Carga de demo, producción y congelación · Joshua · `chore/cierre` — pendiente

- Ronda 18 · **P30** · Prueba de aceptación en celular y computadora · Raymond · `docs/prueba-demo` — pendiente
