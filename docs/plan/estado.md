# Estado de los pasos · Avance 3

Este archivo dice **qué paso ya está hecho** y es la base para **tomar un paso** sin duplicar trabajo (PLAN.md, sección 4.3).

**Cómo leerlo**

- En `main`, `— libre` significa que nadie lo ha terminado. Un paso con nombre (`— Raymond`, `— Joshua`) ya está mergeado, porque esta línea solo llega a `main` con el merge del paso.
- **En curso** = hay un **PR borrador** abierto con el título `Pn · …`. Antes de tomar un paso, revisa los dos: este archivo en `main` y `gh pr list --state open`.
- `— descartado` = el paso no entra en el Avance 3 (solo Fase 3, lo decide Joshua en P29).

**Cómo se edita**

- Cada quien cambia **solo la línea de su paso**, en el primer commit de su rama: `docs(plan): tomar Pn`. Cambia `libre` por tu nombre (`— Joshua` o `— Raymond`).
- Las líneas van separadas por una línea en blanco a propósito: así dos PR que tocan líneas distintas se mergean sin conflicto.
- No reordenes ni reformatees este archivo.


### Fase 0 · Preparación

- **P0** · Preparar el proyecto, Supabase y Vercel · carril A · `chore/setup` — libre

### Fase 1 · MVP de la demo (meta: hoy)

- **P1** · Esquema de datos, RLS y formato de datos de demo · carril A · `feat/esquema-datos` — libre

- **P2** · Componentes base de DESIGN.md y catálogo · carril B · `feat/ui-base` — libre

- **P3** · Lógica de estados y de tiempo · carril A · `feat/estados-tarea` — libre

- **P4** · Navegación, login visual y aviso sin conexión · carril B · `feat/layout-navegacion` — libre

- **P5** · Autenticación, perfiles y super administrador · carril A · `feat/auth-roles` — libre

- **P6** · Componentes del formulario de tarea · carril B · `feat/ui-formulario-tarea` — libre

- **P7** · Crear tareas y asignar responsables · carril A · `feat/tareas-crear` — libre

- **P8** · Componentes de tarea, checklist y deslizar para completar · carril B · `feat/ui-tarea` — libre

- **P9** · Ejecución: lista del estudiante, marcar pasos y completar · carril A · `feat/ejecucion` — libre

- **P10** · Componentes del tablero de cumplimiento · carril B · `feat/ui-tablero` — libre

- **P11** · Tablero con datos reales · carril A · `feat/tablero` — libre

- **P12** · Revisión de diseño del MVP · carril B · `docs/revision-diseno-mvp` — libre

### Fase 2 · Resto de los Must

- **P13** · Pantallas de usuarios, estudiantes, perfil y completadas · carril B · `feat/ui-pantallas` — libre

- **P14** · Usuarios, disponibilidad y contraseñas · carril A · `feat/usuarios` — libre

- **P15** · Editar, eliminar y bloqueo «en edición» · carril A · `feat/edicion-bloqueo` — libre

- **P16** · PWA: manifest e íconos · carril B · `feat/pwa` — libre

- **P17** · Disponibilidad, urgentes y reasignación · carril A · `feat/asignacion-urgentes` — libre

- **P18** · Reglas de ejecución: una tarea abierta y terminar una vencida · carril A · `feat/reglas-ejecucion` — libre

- **P19** · Tiempo real y aviso «por vencer» dentro de la herramienta · carril A · `feat/tiempo-real` — libre

- **P20** · Tablero completo y panel de estudiantes conectado · carril A · `feat/tablero-filtros-panel` — libre

- **P21** · Datos de demo y README · carril B · `feat/datos-demo` — libre

- **P22** · Revisión de diseño y textos de todas las pantallas · carril B · `docs/revision-diseno-final` — libre

### Fase 3 · Should y Could (solo si sobra tiempo)

- **P23** · SH6 y SH5: historial de completadas y horas que le quedan · carril A · `feat/panel-historial` — libre

- **P24** · SH4: reabrir una tarea completada · carril A · `feat/reabrir` — libre

- **P25** · SH2 y SH1: recuperar contraseña y enviar credenciales por correo · carril A · `feat/correo` — libre

- **P26** · SH3: aviso «por vencer» con la herramienta cerrada · carril A · `feat/aviso-cerrada` — libre

- **P27** · CO2: ordenar el tablero por lugar · carril A · `feat/orden-lugar` — libre

- **P28** · CO1: porcentaje de pasos en la tarjeta · carril B · `feat/porcentaje-pasos` — libre

### Fase 4 · Cierre y demo

- **P29** · Carga de demo, producción y congelación · carril A · `chore/cierre` — libre

- **P30** · Prueba de aceptación en celular y computadora · carril B · `docs/prueba-demo` — libre
