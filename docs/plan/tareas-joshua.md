# Tareas de Joshua Lozada · Avance 3

Lista personal en orden de ronda. El detalle completo (criterios, flujo git, contratos) está en `docs/plan/PLAN.md`; esta lista copia los pasos del **carril A (datos y reglas)** con su prompt listo para Cursor.

Trabajamos los dos a la vez desde el primer minuto (PLAN.md, sección 4): en cada ronda tú haces tu paso y Raymond el suyo, en ramas y carpetas distintas. La columna «En paralelo» dice qué está haciendo Raymond en esa ronda, para saber qué PR suyo vas a revisar y qué pantalla te toca conectar.

## Antes de empezar (ronda 0)
- [ ] Sigue la «Instalación» de `docs/plan/skills.md` en tu máquina (Node 22.20 o más, Impeccable y comprobación de skills en Cursor).
- [ ] `git pull` en `main` y empieza **P0** de inmediato: Raymond arranca su preparación al mismo tiempo y espera P0 para programar.
- [ ] Ten a mano tu otra cuenta de Supabase y el team `scorpwik` de Vercel para P1 (ronda 1).

## Tu papel además de tus pasos
- Eres quien **revisa y mergea todos los PR** (sección 2.5 del plan). Mergea pronto los de Raymond y avisa «Entró Pn» en el chat: es el punto de sincronización de cada ronda.
- **Integras** cada pantalla de Raymond con los datos reales en tus pasos (los marcados «conecta…» en la sección 4.1). No edites archivos de `components/`: si necesitas un cambio, pídelo en su PR.
- Eres dueño de los **archivos compartidos** (`package.json`, lockfile, `app/layout.tsx`, `app/globals.css`, `lib/tipos.ts`, `proxy.ts`). Si Raymond pide una dependencia, un tipo o un token, hazlo en una rama `chore/…` corta y mergéala antes de seguir.
- Tras P16 (ronda 6), agrega en `app/layout.tsx` el enlace al manifest y el `theme-color` que Raymond indique en su PR (`chore(pwa): enlazar manifest en el layout`).

## Mis pasos, en orden de ronda

| # | Ronda | Paso | Rama | Fase | Estimación | En paralelo | Depende de |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | P0 · Esqueleto mínimo del proyecto | `chore/esqueleto` | 0 | 30 min | preparación de Raymond (skills, DESIGN.md y spec de P2) | Ninguna. Es lo primero; mientras tanto Raymond hace su preparación (ronda 0). |
| 2 | 1 | P1 · Supabase, Vercel y esquema de datos con RLS | `feat/esquema-datos` | 1 | 1 h 45 min | P2 de Raymond | P0 mergeado. |
| 3 | 2 | P3 · Lógica de estados y de tiempo | `feat/estados-tarea` | 1 | 45 min | P6 de Raymond | P0 mergeado (puede ir en paralelo con P1). |
| 4 | 3 | P5 · Autenticación, perfiles y super administrador | `feat/auth-roles` | 1 | 1 h 15 min | P4 de Raymond | P1 mergeado. P4 se mergea al final de la misma ronda: empieza por la parte de servidor y conecta `LoginVista` después de `git merge origin/main`. |
| 5 | 4 | P7 · Crear tareas y asignar responsables | `feat/tareas-crear` | 1 | 1 h 15 min | P8 de Raymond | P3, P5 y P6 mergeados. |
| 6 | 5 | P9 · Ejecución: lista del estudiante, marcar pasos y completar | `feat/ejecucion` | 1 | 1 h 30 min | P10 de Raymond | P7 mergeado (para la base de datos). P8 llega al final de la ronda 4: conecta sus componentes después de `git merge origin/main`. |
| 7 | 6 | P11 · Tablero con datos reales | `feat/tablero` | 1 | 1 h | P16 de Raymond | P9 y P10 mergeados. |
| 8 | 7 | P18 · Reglas de ejecución: una tarea abierta y terminar una vencida | `feat/reglas-ejecucion` | 2 | 1 h 15 min | P12 de Raymond | P9 mergeado. |
| 9 | 8 | P15 · Editar, eliminar y bloqueo «en edición» | `feat/edicion-bloqueo` | 2 | 1 h 30 min | P13 de Raymond | P7 mergeado. `DialogoConfirmar` (P13) llega al final de la misma ronda: empieza por la migración y las acciones y conecta el diálogo después de `git merge origin/main`. |
| 10 | 9 | P14 · Usuarios, disponibilidad y contraseñas | `feat/usuarios` | 2 | 2 h | P31 de Raymond | P5 y P13 mergeados. |
| 11 | 10 | P17 · Disponibilidad, urgentes y reasignación | `feat/asignacion-urgentes` | 2 | 1 h 30 min | P21 de Raymond | P14 y P15 mergeados; P31 mergeado para la pantalla de reasignar. |
| 12 | 11 | P19 · Tiempo real y aviso «por vencer» dentro de la herramienta | `feat/tiempo-real` | 2 | 1 h 15 min | P33 de Raymond | P11 mergeado. |
| 13 | 12 | P20 · Tablero completo y panel de estudiantes conectado | `feat/tablero-filtros-panel` | 2 | 1 h | P22 de Raymond | P11, P13, P14 y P31 mergeados. |
| 14 | 13 | P23 · SH6 y SH5: historial de completadas y horas que le quedan | `feat/panel-historial` | 3 | 1 h | P32 de Raymond | P20 mergeado y la Fase 2 en `main` (salvo la revisión P22, que se cierra en la misma ronda). |
| 15 | 14 | P24 · SH4: reabrir una tarea completada | `feat/reabrir` | 3 | 45 min | P28 de Raymond | P23 mergeado o descartado. |
| 16 | 14 | P27 · CO2: ordenar el tablero por lugar | `feat/orden-lugar` | 3 | 20 min | P28 de Raymond | P20 mergeado (no depende de los demás pasos de la Fase 3). |
| 17 | 15 | P25 · SH2 y SH1: recuperar contraseña y enviar credenciales por correo | `feat/correo` | 3 | 1 h | Raymond prepara la plantilla de P30 y revisa en la vista previa los PR de la Fase 3 | P24 mergeado o descartado; P32 mergeado para la pantalla. |
| 18 | 16 | P26 · SH3: aviso «por vencer» con la herramienta cerrada | `feat/aviso-cerrada` | 3 | 1 h 30 min | Raymond ensaya el guion en la vista previa | P25 mergeado o descartado; P32 mergeado para el aviso de permiso. |
| 19 | 17 | P29 · Carga de demo, producción y congelación | `chore/cierre` | 4 | 1 h | Raymond ensaya el guion con los datos de demo | Todo lo que entra en la demo mergeado. |

---

## 1. P0 · Esqueleto mínimo del proyecto

- **Rama:** `chore/esqueleto`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 0 (en paralelo: preparación de Raymond (skills, DESIGN.md y spec de P2))
- **Estimación:** 30 min
- **Depende de:** Ninguna. Es lo primero; mientras tanto Raymond hace su preparación (ronda 0).
- **Archivos y carpetas del paso:** `package.json` y lockfile, configuración (`next.config.ts`, `tsconfig.json`, `eslint`, `vitest.config.ts`, `components.json`), `app/layout.tsx`, `app/globals.css`, `app/fuentes/`, `app/page.tsx` (provisional), `components/ui/` (shadcn), `lib/tipos.ts`, `lib/__tests__/humo.test.ts`, carpetas vacías con `.gitkeep`, el bloque de Next.js en `AGENTS.md`, `docs/specs/01-contratos-ui.md`.
- **Spec antes de programar:** `docs/specs/01-contratos-ui.md` (tipos de `lib/tipos.ts` y props de cada componente; es el Anexo A de este plan, copiado).
- **Criterios de aceptación:**
  - [ ] `npm run dev` abre una página en negro #050307 con un título en Big Shoulders 900 y un texto en Sora, servidas desde el propio proyecto (D-18).
  - [ ] El bloque de tokens de DESIGN.md §4 está copiado tal cual en `app/globals.css` y mapeado en Tailwind (colores, espacios, tamaños, radio 0) (D-09, D-07).
  - [ ] shadcn/ui instalado con `--radius: 0` y sin modo claro (DD-01), con button, input, textarea, checkbox, dialog, dropdown-menu y sonner; `lucide-react`, `zod` y `vitest` instalados.
  - [ ] Carpetas de los dos carriles creadas con `.gitkeep` (Anexo B), para que nadie tenga que crearlas después.
  - [ ] `lib/tipos.ts` y `docs/specs/01-contratos-ui.md` publicados en `main` con todos los tipos y props del Anexo A.
  - [ ] El bloque `nextjs-agent-rules` que agrega `next dev` está commiteado en `AGENTS.md`, sin tocar el resto del archivo.
  - [ ] `npm run lint`, `npm run typecheck`, `npm test` (una prueba de humo) y `npm run build` pasan. Mergeado en `main` en unos 30 minutos.
- **Skills de Cursor** ([skills.md](skills.md)): `shadcn CLI` (inicializar shadcn/ui y agregar componentes); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)); `supabase-postgres-best-practices` (solo para revisar los clientes de Supabase)
- **Commits, en este orden:**
  1. `chore: crear proyecto Next.js con TypeScript, Tailwind y App Router`
  2. `chore(ui): configurar shadcn/ui con radio 0 y sin modo claro`
  3. `feat(diseno): tokens y fuentes de DESIGN.md en globals.css`
  4. `chore: carpetas de los dos carriles y tipos compartidos en lib/tipos.ts`
  5. `ci: scripts de lint, typecheck, test y build`
  6. `docs(specs): contratos de interfaz`
  7. `docs(plan): avance de P0`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md (secciones 4, 8 y 9) y docs/plan/PLAN.md (paso P0 y Anexos A y B). Estás en la rama chore/esqueleto.
Objetivo: un esqueleto mínimo, en unos 30 minutos, para que Raymond pueda empezar la interfaz de inmediato. Nada de Supabase ni de Vercel en este paso: eso va en P1.
1. Crea un proyecto Next.js (App Router, TypeScript estricto, Tailwind, ESLint, carpeta app/ en la raíz, sin src/, alias @/*) con `npx create-next-app@latest` y la opción `--no-agents-md` (create-next-app genera su propio AGENTS.md y CLAUDE.md; aquí ya existe el nuestro). Como el repo no está vacío, créalo en una carpeta temporal fuera del repo y copia los archivos al repo sin sobrescribir AGENTS.md, DESIGN.md, docs/, .cursor/, .agents/, .github/ ni skills-lock.json.
2. Inicializa shadcn/ui con radio 0 y solo tema oscuro; agrega button, input, textarea, checkbox, dialog, dropdown-menu y sonner. Instala lucide-react y zod, y vitest como dependencia de desarrollo.
3. Copia en app/globals.css, tal cual, el bloque CSS entre <!-- tokens:inicio --> y <!-- tokens:fin --> de DESIGN.md. Mapea en Tailwind los colores (--color-*, --estado-*, --marca-*), espacios (--esp-*), tamaños (--fs-*) y radio 0, para que los componentes usen clases y nunca valores a mano.
4. Copia docs/diseno/fuentes/*.woff2 a app/fuentes/ y cárgalas con next/font/local (Big Shoulders Display 700 y 900, Sora 400 y 600) en app/layout.tsx, con lang="es" y fondo --color-fondo.
5. Crea lib/tipos.ts con todos los tipos del Anexo A del plan, tal cual.
6. Crea las carpetas vacías con .gitkeep del Anexo B: components/ui-i2h, components/layout, components/pantallas, app/catalogo, datos-demo, docs/qa, lib/supabase, supabase/migrations, scripts.
7. Una página provisional en app/page.tsx con un título en Big Shoulders y un texto en Sora, y una prueba de humo en lib/__tests__/humo.test.ts. Scripts en package.json: lint, typecheck (tsc --noEmit), test (vitest run), build.
8. Corre npm run dev una vez desde Cursor: Next.js agrega a AGENTS.md un bloque entre <!-- BEGIN:nextjs-agent-rules --> y <!-- END:nextjs-agent-rules --> que apunta a node_modules/next/dist/docs/. Déjalo tal cual (no toques el resto de AGENTS.md) e inclúyelo en el commit de scripts, para que no aparezca como cambio en la rama de nadie. Si no aparece, sigue sin él.
9. Copia el Anexo A en docs/specs/01-contratos-ui.md con la plantilla de docs/specs/README.md.
Haz los commits exactamente en este orden y con estos mensajes: chore: crear proyecto Next.js con TypeScript, Tailwind y App Router; chore(ui): configurar shadcn/ui con radio 0 y sin modo claro; feat(diseno): tokens y fuentes de DESIGN.md en globals.css; chore: carpetas de los dos carriles y tipos compartidos en lib/tipos.ts; ci: scripts de lint, typecheck, test y build; docs(specs): contratos de interfaz; docs(plan): avance de P0. Antes de cada commit, npm run lint && npm run typecheck. Al final, npm test && npm run build. No inventes requisitos ni pantallas: este paso no tiene funciones de usuario.
Skills de Cursor para este paso (docs/plan/skills.md): shadcn CLI para inicializar shadcn/ui y agregar componentes; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions); /supabase-postgres-best-practices para solo para revisar los clientes de Supabase. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P0», cambia en docs/plan/estado.md solo la línea de P0 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 2. P1 · Supabase, Vercel y esquema de datos con RLS

- **Rama:** `feat/esquema-datos`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 1 (en paralelo: P2 de Raymond)
- **Estimación:** 1 h 45 min
- **Depende de:** P0 mergeado.
- **Archivos y carpetas del paso:** `lib/supabase/**` (clientes y tipos generados), `.env.example`, `supabase/**`, el CLI `supabase` y `@supabase/*` en `package.json`, `docs/specs/00-arquitectura.md`, `docs/specs/02-datos-y-rls.md`, `docs/specs/09-datos-demo.md`.
- **Spec antes de programar:** `docs/specs/00-arquitectura.md` (stack, carpetas, dueños, variables), `docs/specs/02-datos-y-rls.md` y `docs/specs/09-datos-demo.md` (formato del JSON de demo que llenará Raymond en P21).
- **Criterios de aceptación:**
  - [ ] Proyecto de Supabase **nuevo** creado por Joshua en su otra cuenta; Joshua pegó `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` en `.env.local` (no se sube) y en Vercel (Preview y Production). Ninguna clave aparece en el repo, en un prompt ni en el chat.
  - [ ] `.env.example` trae `SUPER_ADMIN_EMAIL=superadmin@interact2hack.test` marcado como **PROVISIONAL**; cambiarlo es editar solo esa variable (y volver a correr el script de P5).
  - [ ] Proyecto de Vercel en el team `scorpwik`, conectado a `Scorpwik/interact-2-hack`, rama de producción `main`; cada PR tiene vista previa.
  - [ ] `lib/supabase/cliente.ts` (navegador), `lib/supabase/servidor.ts` (con cookies) y `lib/supabase/admin.ts` (service role, `server-only`).
  - [ ] Tablas: `perfiles` (id = auth.users.id, nombre, correo, telefono, rol `admin|estudiante`, es_super_admin), `disponibilidades` (perfil, dia, desde, hasta) (R28, M3), `tareas` (nombre, descripcion, vence_en, lugar, urgente, creada_por, iniciada_por/en, completada_por/en, fuera_de_hora, editando_por/desde) (R7, R12, R13, R23), `pasos` (tarea, orden, texto, marcado_por, marcado_en) (R9, R23), `responsables` (tarea, perfil) (R8), `observaciones` (tarea, autor, texto, creada_en) (R20).
  - [ ] Índice único parcial: solo puede existir un `es_super_admin = true`; un trigger impide borrar ese perfil o cambiarle el rol (R3, W4).
  - [ ] Vista `tareas_vista` con `estado` y `por_vencer` calculados con la hora actual según R11 y R12 (se valida contra los casos de P3).
  - [ ] RLS activada en todas las tablas: el estudiante solo lee las tareas donde es responsable o que son urgentes (R27, R35) y los perfiles de sus compañeros (R23); solo los administradores escriben tareas, responsables y perfiles (R2).
  - [ ] Las escrituras de ejecución (marcar paso, observar, completar) no se permiten por tabla: quedan reservadas a funciones RPC que se escriben en P9.
  - [ ] Migración aplicada en el proyecto de Supabase sin errores; `docs/specs/09-datos-demo.md` define el JSON de demo con horas relativas a «ahora».
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (esquema, índices, RLS y su rendimiento); `Supabase CLI` (supabase migration new, db push y gen types)
- **Commits, en este orden:**
  1. `docs(specs): arquitectura, esquema de datos, RLS y formato de datos de demo`
  2. `chore(supabase): clientes de Supabase, CLI y variables de entorno de ejemplo`
  3. `feat(bd): tablas de perfiles, disponibilidades, tareas, pasos, responsables y observaciones`
  4. `feat(bd): super administrador único y protegido`
  5. `feat(bd): vista tareas_vista con estado y por vencer`
  6. `feat(bd): políticas RLS por perfil`
  7. `chore(bd): tipos de la base generados para TypeScript`
  8. `docs(plan): avance de P1`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P1), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md. Estás en la rama feat/esquema-datos. Solo puedes crear o modificar lib/supabase/, .env.example, supabase/**, las dependencias de Supabase en package.json, docs/specs/00-arquitectura.md, docs/specs/02-datos-y-rls.md y docs/specs/09-datos-demo.md.
Objetivo: conectar el proyecto nuevo de Supabase y crear el modelo de datos con RLS, siguiendo el PRD R1–R37 sin agregar requisitos. Joshua ya creó el proyecto de Supabase y pegó las claves en .env.local: no leas, no imprimas y no edites .env.local.
1. Escribe docs/specs/00-arquitectura.md (stack, carpetas y dueños del Anexo B, variables) y docs/specs/02-datos-y-rls.md con la plantilla: tablas, columnas, claves, índices, la vista tareas_vista y cada política RLS, con la R# que la justifica. Marca [SUPUESTO] lo que el PRD no define (por ejemplo, disponibilidad por fecha del evento, S-45). Escribe también docs/specs/09-datos-demo.md: un JSON con usuarios (nombre, correo @example.com, teléfono, rol, contraseña de demo, disponibilidades con día relativo 0/1/2 y horas), y tareas (nombre, descripción, lugar, venceEnMinutos relativo a la hora de carga, urgente, responsables por correo, pasos con marcado opcional por correo y minutosAtras, observaciones). Commit: docs(specs): arquitectura, esquema de datos, RLS y formato de datos de demo.
2. Instala @supabase/supabase-js y @supabase/ssr, y el CLI supabase como dependencia de desarrollo (se usa con npx supabase). Crea lib/supabase/cliente.ts (navegador), lib/supabase/servidor.ts (Server Components y acciones, con cookies) y lib/supabase/admin.ts (service role, con import 'server-only'). Crea .env.example con NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY y SUPER_ADMIN_PASSWORD sin valores, y SUPER_ADMIN_EMAIL=superadmin@interact2hack.test con el comentario «# PROVISIONAL: cambiar por el correo real del super administrador». Commit: chore(supabase): clientes de Supabase, CLI y variables de entorno de ejemplo.
3. Migraciones SQL en supabase/migrations/ (npx supabase migration new) con estas tablas: perfiles, disponibilidades, tareas, pasos, responsables, observaciones (columnas del paso P1 en el plan). timestamptz para horas.
4. Índice único parcial para un solo es_super_admin y trigger que impida borrarlo o cambiarle rol o es_super_admin (R3).
5. Vista tareas_vista (security_invoker) que calcula estado (sin_asignar, pendiente, en_ejecucion, vencida, completada) y por_vencer (≤ 60 min y no completada ni vencida) con now(), exactamente como R11 y R12; incluye pasos_total, pasos_marcados y responsables_total.
6. RLS en todas las tablas: administradores leen y escriben todo salvo lo prohibido por R3; estudiantes leen sus tareas y las urgentes, sus pasos y observaciones, y los perfiles (nombre y teléfono) de sus compañeros. Nadie actualiza pasos ni observaciones por tabla: eso lo harán funciones RPC en P9.
7. Aplica la migración al proyecto de Supabase (npx supabase db push, después de que Joshua haga npx supabase login y link) y genera los tipos en lib/supabase/tipos-bd.ts (npx supabase gen types typescript --linked).
Commits en este orden: docs(specs): arquitectura, esquema de datos, RLS y formato de datos de demo; chore(supabase): clientes de Supabase, CLI y variables de entorno de ejemplo; feat(bd): tablas de perfiles, disponibilidades, tareas, pasos, responsables y observaciones; feat(bd): super administrador único y protegido; feat(bd): vista tareas_vista con estado y por vencer; feat(bd): políticas RLS por perfil; chore(bd): tipos de la base generados para TypeScript; docs(plan): avance de P1. Verifica con dos usuarios de prueba (un admin y un estudiante) que las políticas hacen lo que dice la spec, y anota el resultado en la sección 7 de la spec.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para esquema, índices, RLS y su rendimiento; Supabase CLI para supabase migration new, db push y gen types. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P1», cambia en docs/plan/estado.md solo la línea de P1 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 3. P3 · Lógica de estados y de tiempo

- **Rama:** `feat/estados-tarea`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 2 (en paralelo: P6 de Raymond)
- **Estimación:** 45 min
- **Depende de:** P0 mergeado (puede ir en paralelo con P1).
- **Archivos y carpetas del paso:** `lib/estados.ts`, `lib/tiempo.ts`, `lib/__tests__/estados.test.ts`, `lib/__tests__/tiempo.test.ts`, `docs/specs/04-estados.md`.
- **Spec antes de programar:** `docs/specs/04-estados.md` (tabla de casos: entrada → estado + marcas + temporizador).
- **Criterios de aceptación:**
  - [ ] `calcularEstado()` devuelve uno y solo uno de los 5 estados para cada caso de la tabla de la spec (R11).
  - [ ] `calcularMarcas()` devuelve por vencer (≤ 60 min y Sin asignar, Pendiente o En ejecución), urgente, en edición (con bloqueo vigente de 15 min, S-48) y fuera de hora (R12, R13).
  - [ ] `temporizador()` devuelve «Faltan 42 min», «Faltan 2 h 42 min», «Venció hace 18 min» o «Completada 09:12», con tono normal, aviso, error o listo (R15, D-20), en hora de Ecuador (R10).
  - [ ] Todas las pruebas de Vitest pasan; los mismos casos se comprueban contra `tareas_vista` (P1) y coinciden.
- **Skills de Cursor** ([skills.md](skills.md)): ninguna en especial; basta con AGENTS.md y las reglas de `.cursor/rules/`.
- **Commits, en este orden:**
  1. `docs(specs): casos de estados, marcas y temporizador`
  2. `test(estados): casos de R11 y R12`
  3. `feat(estados): calcular estado y marcas de una tarea`
  4. `feat(tiempo): temporizador y horas en America/Guayaquil`
  5. `docs(plan): avance de P3`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P3), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/prd/PRD.md (R10–R15, R24) y DESIGN.md (4.2, 4.3, 5.2 y D-20). Estás en la rama feat/estados-tarea. Solo puedes crear o modificar lib/estados.ts, lib/tiempo.ts, lib/__tests__/ y docs/specs/04-estados.md.
Objetivo: una sola fuente de verdad en TypeScript para el estado, las marcas y el temporizador de una tarea.
1. Escribe docs/specs/04-estados.md con una tabla de al menos 16 casos (entrada: responsables, pasos marcados, completada, vence_en, ahora, urgente, editando_desde, completada_en → salida: estado, marcas, temporizador). Incluye los bordes: el minuto exacto del vencimiento (Vencida desde ese minuto, R11), 60 min exactos (por vencer), Sin asignar con pasos marcados (R6), completada fuera de hora (R24), bloqueo de más de 15 min (S-48). Commit: docs(specs): casos de estados, marcas y temporizador.
2. Escribe primero las pruebas en Vitest con esa tabla (test(estados): …) y luego la implementación pura en lib/estados.ts (sin Supabase, sin Date.now(): ahora entra por parámetro).
3. lib/tiempo.ts: temporizador(tarea, ahora): TemporizadorVista con palabra, valor y tono, y formatearHora() en America/Guayaquil con Intl.DateTimeFormat.
Haz estos commits, en este orden: docs(specs): casos de estados, marcas y temporizador; test(estados): casos de R11 y R12; feat(estados): calcular estado y marcas de una tarea; feat(tiempo): temporizador y horas en America/Guayaquil; docs(plan): avance de P3. Verifica con npm test y deja en la sección 7 de la spec el resultado de comparar 5 casos con la vista tareas_vista.
El último commit, «docs(plan): avance de P3», cambia en docs/plan/estado.md solo la línea de P3 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 4. P5 · Autenticación, perfiles y super administrador

- **Rama:** `feat/auth-roles`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 3 (en paralelo: P4 de Raymond)
- **Estimación:** 1 h 15 min
- **Depende de:** P1 mergeado. P4 se mergea al final de la misma ronda: empieza por la parte de servidor y conecta `LoginVista` después de `git merge origin/main`.
- **Archivos y carpetas del paso:** `app/(auth)/**`, `app/page.tsx`, `proxy.ts`, `lib/auth/**`, `scripts/crear-super-admin.ts`, el script `crear-super-admin` en `package.json`, `docs/specs/06-auth-perfiles.md`.
- **Spec antes de programar:** `docs/specs/06-auth-perfiles.md`.
- **Criterios de aceptación:**
  - [ ] Solo se entra con correo y contraseña de una cuenta existente; no hay registro (R1, W1). Error y éxito con aviso (R37).
  - [ ] El proxy (`proxy.ts`, el antiguo middleware de Next.js) protege todo salvo `/login` y `/catalogo`; un estudiante que abre una ruta de administrador va a «Mis tareas», y un administrador entra al tablero (R2, R30).
  - [ ] `npm run crear-super-admin` crea una sola vez el super administrador desde `SUPER_ADMIN_EMAIL` (hoy el provisional `superadmin@interact2hack.test`) y `SUPER_ADMIN_PASSWORD`; si ya existe con ese correo no hace nada, y si existe con otro correo le actualiza el correo, así nunca hay dos (R3, W4).
  - [ ] Cerrar sesión funciona desde el marco de la app.
  - [ ] Se puede crear un administrador y un estudiante de prueba con el script de P1/P21 o desde el panel de Supabase para probar.
- **Skills de Cursor** ([skills.md](skills.md)): `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)); `supabase-postgres-best-practices` (políticas que leen el perfil y el rol)
- **Commits, en este orden:**
  1. `docs(specs): autenticación, perfiles y super administrador`
  2. `feat(auth): iniciar y cerrar sesión con correo y contraseña`
  3. `feat(auth): proteger rutas por perfil con proxy.ts`
  4. `feat(auth): script para crear el super administrador único`
  5. `docs(plan): avance de P5`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P5), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md y PRD R1–R5. Estás en la rama feat/auth-roles. Solo puedes crear o modificar app/(auth)/, app/page.tsx, proxy.ts, lib/auth/, scripts/crear-super-admin.ts, el script crear-super-admin de package.json y docs/specs/06-auth-perfiles.md.
Objetivo: iniciar sesión, proteger rutas por perfil y crear el super administrador fijo.
1. Escribe docs/specs/06-auth-perfiles.md con la plantilla. Commit: docs(specs): autenticación, perfiles y super administrador.
2. app/(auth)/login/page.tsx usa LoginVista de components/pantallas con una acción de servidor que llama a supabase.auth.signInWithPassword y devuelve ResultadoAccion con un mensaje en español para el aviso. Sin registro propio.
3. lib/auth/sesion.ts: obtenerPerfilActual() (perfil + rol + es_super_admin) para Server Components y acciones; requiereAdmin() y requiereSesion().
4. proxy.ts con @supabase/ssr: refresca la sesión (para decidir el acceso usa supabase.auth.getUser() o getClaims(), nunca solo getSession(); sin consultas pesadas en proxy.ts); deja pasar /login y /catalogo; sin sesión → /login; estudiante en /tablero, /tareas, /estudiantes o /usuarios → /mis-tareas. app/page.tsx redirige según el perfil.
5. scripts/crear-super-admin.ts (tsx) y el script "crear-super-admin" en package.json: con la service role crea el usuario de SUPER_ADMIN_EMAIL con email confirmado y su perfil es_super_admin = true y rol admin. Es idempotente: si ya existe un super administrador con ese correo no hace nada; si existe con otro correo (el provisional cambió), le actualiza el correo. El correo nunca se escribe en el código: solo se lee de la variable.
6. Cerrar sesión: acción de servidor usada por MarcoApp.
Haz estos commits, en este orden: docs(specs): autenticación, perfiles y super administrador; feat(auth): iniciar y cerrar sesión con correo y contraseña; feat(auth): proteger rutas por perfil con proxy.ts; feat(auth): script para crear el super administrador único; docs(plan): avance de P5. Verifica: login correcto e incorrecto, redirecciones por perfil, y que el script corrido dos veces no crea un segundo super administrador.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions); /supabase-postgres-best-practices para políticas que leen el perfil y el rol. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P5», cambia en docs/plan/estado.md solo la línea de P5 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 5. P7 · Crear tareas y asignar responsables

- **Rama:** `feat/tareas-crear`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 4 (en paralelo: P8 de Raymond)
- **Estimación:** 1 h 15 min
- **Depende de:** P3, P5 y P6 mergeados.
- **Archivos y carpetas del paso:** `app/(admin)/tareas/**` (página, `nueva/`, `actions.ts`), `lib/tareas/**` (consultas y validación zod), `docs/specs/08-crear-tarea.md`.
- **Spec antes de programar:** `docs/specs/08-crear-tarea.md`.
- **Criterios de aceptación:**
  - [ ] Un administrador crea una tarea con nombre, fecha y hora, lugar y al menos un paso; la descripción es opcional (R7, M4). Sin esos datos, el formulario muestra el error de cada campo (R37, D-13).
  - [ ] Puede asignar uno o varios responsables, o ninguno: sin responsables la tarea queda «Sin asignar» (R7, R8, M5).
  - [ ] En esta fase el selector muestra la disponibilidad y no deja asignar a quien no está disponible; la validación final en el servidor se completa en P17 (R28).
  - [ ] La lista `/tareas` muestra las tareas con su insignia de estado calculada por `lib/estados.ts` (R11).
  - [ ] Un estudiante no puede crear tareas: la acción lo rechaza en el servidor y la ruta lo redirige (R2).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (inserciones de tarea, pasos y responsables en una transacción); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  1. `docs(specs): crear tareas y asignar responsables`
  2. `feat(tareas): validación y consulta de tareas`
  3. `feat(tareas): acción para crear una tarea con pasos y responsables`
  4. `feat(tareas): pantallas de lista y nueva tarea`
  5. `docs(plan): avance de P7`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P7), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 04-estados.md, 07-ui-formulario-tarea.md y PRD R7–R10, R28. Estás en la rama feat/tareas-crear. Solo puedes crear o modificar app/(admin)/tareas/, lib/tareas/ y docs/specs/08-crear-tarea.md.
Objetivo: el administrador crea tareas y asigna responsables con datos reales.
1. Escribe docs/specs/08-crear-tarea.md. Commit: docs(specs): crear tareas y asignar responsables.
2. lib/tareas/validacion.ts: esquema zod de R7 (nombre, vence_en en hora de Ecuador, lugar, pasos ≥ 1, descripción opcional, responsables opcionales). lib/tareas/consultas.ts: listar tareas desde tareas_vista y mapear a TareaTarjeta con lib/estados.ts y lib/tiempo.ts.
3. app/(admin)/tareas/nueva/actions.ts: crearTarea(formData) con requiereAdmin(); inserta tarea, pasos y responsables en una sola función RPC o transacción; devuelve ResultadoAccion con «Tarea guardada.» o el error.
4. app/(admin)/tareas/nueva/page.tsx usa FormularioTareaVista con las opciones de responsables (estudiantes con su disponibilidad del día de la tarea); app/(admin)/tareas/page.tsx lista las tareas con TarjetaTarea si ya existe en main, o con una lista simple de nombre + Insignia mientras tanto.
5. Avisos con avisar() después de cada acción (R37).
No implementes todavía editar, eliminar, bloqueo ni urgentes (pasos P15 y P17).
Haz estos commits, en este orden: docs(specs): crear tareas y asignar responsables; feat(tareas): validación y consulta de tareas; feat(tareas): acción para crear una tarea con pasos y responsables; feat(tareas): pantallas de lista y nueva tarea; docs(plan): avance de P7. Verifica: crear con todos los datos, sin pasos, sin hora, sin responsables (queda Sin asignar) y como estudiante (rechazado).
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para inserciones de tarea, pasos y responsables en una transacción; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P7», cambia en docs/plan/estado.md solo la línea de P7 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 6. P9 · Ejecución: lista del estudiante, marcar pasos y completar

- **Rama:** `feat/ejecucion`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 5 (en paralelo: P10 de Raymond)
- **Estimación:** 1 h 30 min
- **Depende de:** P7 mergeado (para la base de datos). P8 llega al final de la ronda 4: conecta sus componentes después de `git merge origin/main`.
- **Archivos y carpetas del paso:** `app/(estudiante)/**` (mis-tareas, tarea/[id], completadas mínima, `actions.ts`), `lib/ejecucion/**`, `supabase/migrations/*_ejecucion.sql` (funciones RPC), `docs/specs/11-ejecucion.md`.
- **Spec antes de programar:** `docs/specs/11-ejecucion.md`.
- **Criterios de aceptación:**
  - [ ] El estudiante ve sus tareas y las urgentes ordenadas por cercanía al vencimiento, con la tarjeta señal de la más cercana Por vencer o En ejecución, y sus completadas al final (R35, M7, D-08).
  - [ ] Función RPC `marcar_paso(paso, marcado)`: solo un responsable, solo con la tarea no completada; guarda quién y a qué hora (R9, R18, R23, M9). Al marcar el primer paso queda registrado quién la inició (R11, R23).
  - [ ] Función RPC `completar_tarea(tarea, observacion)`: solo si todos los pasos están marcados y hay observación; guarda quién y cuándo completó (R16, R20, R23).
  - [ ] El deslizador dice qué falta mientras no se pueda completar (D-12); sin conexión la banda aparece y no se puede marcar ni completar (R19, D-11).
  - [ ] Cada acción muestra su aviso (R37, D-13).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (funciones RPC SECURITY DEFINER y bloqueos cortos); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  1. `docs(specs): ejecución de tareas por el estudiante`
  2. `feat(bd): funciones para marcar pasos y completar tareas`
  3. `feat(ejecucion): acciones de marcar, observar y completar`
  4. `feat(ejecucion): lista de mis tareas con tarjeta señal`
  5. `feat(ejecucion): detalle de tarea con checklist y deslizar para completar`
  6. `docs(plan): avance de P9`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P9), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 04-estados.md, 10-ui-tarea.md y PRD R9, R11, R15–R20, R23, R35. Estás en la rama feat/ejecucion. Solo puedes crear o modificar app/(estudiante)/, lib/ejecucion/, una migración nueva supabase/migrations/<fecha>_ejecucion.sql y docs/specs/11-ejecucion.md.
Objetivo: el estudiante ejecuta sus tareas con datos reales.
1. Escribe docs/specs/11-ejecucion.md (funciones RPC, validaciones y mensajes). Commit: docs(specs): ejecución de tareas por el estudiante.
2. Migración con funciones SECURITY DEFINER y search_path fijo: marcar_paso(p_paso uuid, p_marcado boolean) y completar_tarea(p_tarea uuid, p_observacion text). Comprueban que auth.uid() es responsable (las urgentes ya tienen a todos los estudiantes como responsables, R27), que la tarea no está completada y, para completar, que todos los pasos están marcados y la observación no está vacía; registran marcado_por/en, iniciada_por/en y completada_por/en, y fuera_de_hora si now() ≥ vence_en. Errores con mensajes en español. No implementes todavía la regla de una tarea abierta a la vez ni la de terminar una vencida (paso P18): deja un TODO con la R# en la spec, no en el código.
3. lib/ejecucion/acciones.ts: acciones de servidor que llaman a las RPC y devuelven ResultadoAccion.
4. app/(estudiante)/mis-tareas/page.tsx con MisTareasVista; app/(estudiante)/tarea/[id]/page.tsx con DetalleTareaVista dentro de MarcoApp; el componente de cliente usa useEnLinea() para bloquear y mostrar la banda; actualiza la vista de forma optimista y revierte con aviso de error si falla.
5. app/(estudiante)/completadas/page.tsx mínima con las completadas del estudiante (R34).
Haz estos commits, en este orden: docs(specs): ejecución de tareas por el estudiante; feat(bd): funciones para marcar pasos y completar tareas; feat(ejecucion): acciones de marcar, observar y completar; feat(ejecucion): lista de mis tareas con tarjeta señal; feat(ejecucion): detalle de tarea con checklist y deslizar para completar; docs(plan): avance de P9. Verifica con un estudiante: marcar y desmarcar en cualquier orden, intentar completar sin observación, completar, y probar sin conexión con las herramientas del navegador.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para funciones RPC SECURITY DEFINER y bloqueos cortos; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P9», cambia en docs/plan/estado.md solo la línea de P9 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 7. P11 · Tablero con datos reales

- **Rama:** `feat/tablero`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 6 (en paralelo: P16 de Raymond)
- **Estimación:** 1 h
- **Depende de:** P9 y P10 mergeados.
- **Archivos y carpetas del paso:** `app/(admin)/tablero/**`, `lib/tablero/**`, `lib/__tests__/tablero.test.ts`, `docs/specs/13-tablero.md`.
- **Spec antes de programar:** `docs/specs/13-tablero.md`.
- **Criterios de aceptación:**
  - [ ] El tablero es la página principal del administrador: una tarjeta por tarea con estado, temporizador, lugar, responsables, «3 de 5» y marcas (R30, M11).
  - [ ] Agrupado en el orden Pendientes, Vencidas, Por vencer, En ejecución, Sin asignar, Terminadas; cada tarea en un solo grupo y las por vencer en «Por vencer» (R31). Probado con Vitest.
  - [ ] Totales por estado y cumplimiento completadas/total (R33).
  - [ ] Filtro «Por vencer» y orden por cercanía al vencimiento funcionando (R32, N-07, N-08); los demás órdenes pueden quedar para P20.
  - [ ] El temporizador se actualiza cada minuto en la página sin recargar (R15).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (consultas del tablero con columnas explícitas e índices)
- **Commits, en este orden:**
  1. `docs(specs): tablero de cumplimiento con datos reales`
  2. `test(tablero): agrupación y totales según R31 y R33`
  3. `feat(tablero): agrupar, ordenar y contar tareas`
  4. `feat(tablero): página del tablero del administrador`
  5. `docs(plan): avance de P11`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P11), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/04-estados.md, 12-ui-tablero.md y PRD R30–R34. Estás en la rama feat/tablero. Solo puedes crear o modificar app/(admin)/tablero/, lib/tablero/, lib/__tests__/tablero.test.ts y docs/specs/13-tablero.md.
Objetivo: el tablero de cumplimiento del administrador con datos reales.
1. Escribe docs/specs/13-tablero.md. Commit: docs(specs): tablero de cumplimiento con datos reales.
2. Pruebas primero: lib/tablero/agrupar.ts agrupa en el orden de R31 (una tarea en un solo grupo; por vencer va en «Por vencer»; urgentes primero dentro de su grupo, R27), ordena por cercanía o por reciente, y cuenta totales (R33).
3. app/(admin)/tablero/page.tsx (Server Component) lee tareas_vista y responsables, mapea a TareaTarjeta y pasa todo a TableroVista; un componente de cliente recalcula estado y temporizador cada minuto con lib/estados.ts y maneja el filtro y el orden en la URL (?porVencer=1&orden=vencimiento).
Haz estos commits, en este orden: docs(specs): tablero de cumplimiento con datos reales; test(tablero): agrupación y totales según R31 y R33; feat(tablero): agrupar, ordenar y contar tareas; feat(tablero): página del tablero del administrador; docs(plan): avance de P11. Verifica con datos que tengan los cinco estados y una tarea a menos de 60 min.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para consultas del tablero con columnas explícitas e índices. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P11», cambia en docs/plan/estado.md solo la línea de P11 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 8. P18 · Reglas de ejecución: una tarea abierta y terminar una vencida

- **Rama:** `feat/reglas-ejecucion`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 7 (en paralelo: P12 de Raymond)
- **Estimación:** 1 h 15 min
- **Depende de:** P9 mergeado.
- **Archivos y carpetas del paso:** `supabase/migrations/*_reglas_ejecucion.sql`, `lib/ejecucion/**`, `app/(estudiante)/tarea/[id]/**`, `docs/specs/19-reglas-ejecucion.md`.
- **Spec antes de programar:** `docs/specs/19-reglas-ejecucion.md`.
- **Criterios de aceptación:**
  - [ ] Mientras una persona tenga una tarea En ejecución en la que marcó al menos un paso, no puede marcar pasos de otra; el aviso «Termina … antes de empezar otra tarea» con «Ir a esa tarea» aparece (R17, S-41, M8).
  - [ ] La restricción termina al completar, reasignar, eliminar, dejar de ser responsable o al pasar la tarea a Vencida (R17).
  - [ ] Si el responsable tiene la tarea abierta en pantalla cuando vence, puede terminarla y queda Completada con «Fuera de hora»; si sale, ya no puede (R24, S-38, S-43).
  - [ ] Desmarcar el último paso devuelve la tarea a Pendiente, o la deja Vencida (R18).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (regla de una tarea abierta a la vez dentro de la función RPC)
- **Commits, en este orden:**
  1. `docs(specs): una tarea abierta a la vez y terminar una vencida`
  2. `feat(bd): impedir empezar otra tarea con una abierta`
  3. `feat(bd): presencia en la tarea para terminar una vencida`
  4. `feat(ejecucion): avisos de tarea abierta y de fuera de hora`
  5. `docs(plan): avance de P18`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P18), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/11-ejecucion.md y PRD R17, R18, R24 (S-38, S-41, S-43). Estás en la rama feat/reglas-ejecucion. Solo puedes crear o modificar una migración nueva supabase/migrations/<fecha>_reglas_ejecucion.sql, lib/ejecucion/, app/(estudiante)/tarea/[id]/ y docs/specs/19-reglas-ejecucion.md.
Objetivo: las reglas de ejecución que faltan, aplicadas en Postgres.
1. Escribe docs/specs/19-reglas-ejecucion.md con la definición exacta de «tarea abierta» y de «estar dentro». Commit: docs(specs): una tarea abierta a la vez y terminar una vencida.
2. En marcar_paso: si el usuario tiene otra tarea En ejecución (no vencida) con un paso marcado por él, rechaza con el mensaje de DESIGN.md 5.8 e incluye el id de esa tarea para el enlace.
3. Tabla presencias (tarea, perfil, desde, ultimo_latido) y RPC registrar_presencia(p_tarea) llamada al abrir el detalle y cada minuto; completar_tarea acepta una vencida solo si hay presencia continua desde antes de vence_en (latido de hace ≤ 2 min) y marca fuera_de_hora.
4. En el detalle, muestra el aviso de tarea abierta y el estado de fuera de hora con los componentes existentes.
Haz estos commits, en este orden: docs(specs): una tarea abierta a la vez y terminar una vencida; feat(bd): impedir empezar otra tarea con una abierta; feat(bd): presencia en la tarea para terminar una vencida; feat(ejecucion): avisos de tarea abierta y de fuera de hora; docs(plan): avance de P18. Verifica con dos tareas del mismo estudiante y con una tarea que vence mientras está abierta.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para regla de una tarea abierta a la vez dentro de la función RPC. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P18», cambia en docs/plan/estado.md solo la línea de P18 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 9. P15 · Editar, eliminar y bloqueo «en edición»

- **Rama:** `feat/edicion-bloqueo`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 8 (en paralelo: P13 de Raymond)
- **Estimación:** 1 h 30 min
- **Depende de:** P7 mergeado. `DialogoConfirmar` (P13) llega al final de la misma ronda: empieza por la migración y las acciones y conecta el diálogo después de `git merge origin/main`.
- **Archivos y carpetas del paso:** `app/(admin)/tareas/[id]/editar/**`, `lib/tareas/edicion.ts`, `supabase/migrations/*_bloqueo.sql`, `docs/specs/16-edicion-bloqueo.md`.
- **Spec antes de programar:** `docs/specs/16-edicion-bloqueo.md`.
- **Criterios de aceptación:**
  - [ ] Se edita solo una tarea Pendiente, o Sin asignar sin pasos marcados; una Sin asignar con pasos marcados solo admite agregar responsables (R21).
  - [ ] Se eliminan solo Pendientes, Sin asignar sin pasos marcados y Vencidas, con confirmación; En ejecución y Completadas no (R22).
  - [ ] Al abrir la edición se toma el bloqueo; la tarjeta muestra «En edición · Nombre» y nadie más puede entrar hasta que se guarde, se cancele, se cierre sesión o pasen 15 minutos sin actividad (R13, S-48, D-14).
  - [ ] Los intentos no permitidos muestran el aviso de bloqueo de DESIGN.md §5.8 (R37).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (bloqueo «en edición» sin carreras (bloqueos cortos))
- **Commits, en este orden:**
  1. `docs(specs): edición, eliminación y bloqueo en edición`
  2. `feat(bd): funciones para tomar y liberar el bloqueo de edición`
  3. `feat(tareas): editar tareas según su estado`
  4. `feat(tareas): eliminar tareas según su estado`
  5. `docs(plan): avance de P15`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P15), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 08-crear-tarea.md y PRD R13, R21, R22 (S-42, S-48). Estás en la rama feat/edicion-bloqueo. Solo puedes crear o modificar app/(admin)/tareas/[id]/, lib/tareas/edicion.ts, una migración nueva supabase/migrations/<fecha>_bloqueo.sql y docs/specs/16-edicion-bloqueo.md.
Objetivo: editar y eliminar tareas solo cuando el PRD lo permite, con bloqueo de edición.
1. Escribe docs/specs/16-edicion-bloqueo.md. Commit: docs(specs): edición, eliminación y bloqueo en edición.
2. Migración: tomar_bloqueo(p_tarea) (falla si otro administrador tiene un bloqueo con actividad de menos de 15 min), renovar_bloqueo(p_tarea), liberar_bloqueo(p_tarea) y liberar los bloqueos del usuario al cerrar sesión.
3. lib/tareas/edicion.ts: editarTarea y eliminarTarea con las reglas R21 y R22 comprobadas en el servidor con el estado de tareas_vista.
4. app/(admin)/tareas/[id]/editar/page.tsx: toma el bloqueo al entrar, renueva cada 2 minutos con actividad, libera al guardar o cancelar; usa FormularioTareaVista en modo editar.
Haz estos commits, en este orden: docs(specs): edición, eliminación y bloqueo en edición; feat(bd): funciones para tomar y liberar el bloqueo de edición; feat(tareas): editar tareas según su estado; feat(tareas): eliminar tareas según su estado; docs(plan): avance de P15. Verifica D-14 con dos sesiones de administrador.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para bloqueo «en edición» sin carreras (bloqueos cortos). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P15», cambia en docs/plan/estado.md solo la línea de P15 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 10. P14 · Usuarios, disponibilidad y contraseñas

- **Rama:** `feat/usuarios`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 9 (en paralelo: P31 de Raymond)
- **Estimación:** 2 h
- **Depende de:** P5 y P13 mergeados.
- **Archivos y carpetas del paso:** `app/(admin)/usuarios/**`, `app/(admin)/estudiantes/**`, `app/perfil/**` (una sola ruta para ambos perfiles), `lib/usuarios/**`, `docs/specs/15-usuarios.md`.
- **Spec antes de programar:** `docs/specs/15-usuarios.md`.
- **Criterios de aceptación:**
  - [ ] Un administrador crea, ve, edita y elimina usuarios con nombre, correo, teléfono, perfil y disponibilidad; al crear, define la contraseña que entrega (R1, R2, R4, M3).
  - [ ] El super administrador no se puede eliminar ni cambiar de perfil, y nadie más cambia su contraseña: se impide en el servidor, no solo en la interfaz (R3).
  - [ ] Cada usuario cambia su contraseña desde su perfil; un administrador cambia la de cualquiera salvo la del super administrador (R5, M2).
  - [ ] Al eliminar a un estudiante, deja de ser responsable; si una tarea se queda sin responsables, pasa a «Sin asignar»; lo que completó o marcó conserva su nombre (R6).
  - [ ] Panel de estudiantes con cuántas tareas tiene cada uno, quién no tiene ninguna y su disponibilidad (R36, M13).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (perfiles, disponibilidades y políticas); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  1. `docs(specs): gestión de usuarios, disponibilidad y contraseñas`
  2. `feat(usuarios): crear, editar y eliminar usuarios con disponibilidad`
  3. `feat(usuarios): cambiar contraseñas con la regla del super administrador`
  4. `feat(usuarios): panel de estudiantes`
  5. `feat(usuarios): perfil del usuario`
  6. `docs(plan): avance de P14`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P14), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 06-auth-perfiles.md, 14-ui-pantallas.md y PRD R1–R6, R28, R36. Estás en la rama feat/usuarios. Solo puedes crear o modificar app/(admin)/usuarios/, app/(admin)/estudiantes/, app/perfil/, lib/usuarios/ y docs/specs/15-usuarios.md.
Objetivo: gestión de usuarios con datos reales.
1. Escribe docs/specs/15-usuarios.md. Commit: docs(specs): gestión de usuarios, disponibilidad y contraseñas.
2. lib/usuarios/acciones.ts con requiereAdmin(): crearUsuario (supabase.auth.admin.createUser con email confirmado y la contraseña que escribe el administrador, más perfil y disponibilidades), editarUsuario, eliminarUsuario (rechaza al super administrador; aplica R6), cambiarContrasenaDe(usuario) (rechaza al super administrador). cambiarMiContrasena() para cualquier sesión.
3. Páginas: /usuarios con UsuariosVista y FormularioUsuarioVista; /estudiantes con EstudiantesVista (número de tareas y disponibilidad del día); /perfil con PerfilVista para ambos perfiles.
4. Confirmación con DialogoConfirmar antes de eliminar; avisos en cada acción (R37).
Haz estos commits, en este orden: docs(specs): gestión de usuarios, disponibilidad y contraseñas; feat(usuarios): crear, editar y eliminar usuarios con disponibilidad; feat(usuarios): cambiar contraseñas con la regla del super administrador; feat(usuarios): panel de estudiantes; feat(usuarios): perfil del usuario; docs(plan): avance de P14. Verifica: intentar borrar o cambiar la contraseña del super administrador desde otro administrador (rechazado en el servidor), eliminar un estudiante con tareas y ver R6.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para perfiles, disponibilidades y políticas; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P14», cambia en docs/plan/estado.md solo la línea de P14 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 11. P17 · Disponibilidad, urgentes y reasignación

- **Rama:** `feat/asignacion-urgentes`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 10 (en paralelo: P21 de Raymond)
- **Estimación:** 1 h 30 min
- **Depende de:** P14 y P15 mergeados; P31 mergeado para la pantalla de reasignar.
- **Archivos y carpetas del paso:** `lib/asignacion/**`, `lib/tareas/**` (para usar la validación al crear y editar), `app/(admin)/tareas/[id]/reasignar/**`, `supabase/migrations/*_asignacion.sql`, `lib/__tests__/asignacion.test.ts`, `docs/specs/18-asignacion-urgentes.md`.
- **Spec antes de programar:** `docs/specs/18-asignacion-urgentes.md`.
- **Criterios de aceptación:**
  - [ ] No se puede asignar a alguien no disponible: la hora de vencimiento debe caer dentro de su horario de ese día; se valida en el servidor (R28, S-45, M5).
  - [ ] Una tarea urgente se asigna a todos los estudiantes, que se suman a los responsables que ya tenía, aunque no estén disponibles; aparece en la lista de todos y primero en su grupo (R27, M12).
  - [ ] Reasignar una vencida exige una nueva hora y permite cambiar responsables; los pasos marcados se conservan y el estado se recalcula (R25, M10).
  - [ ] Avisos de confirmación o error en asignar, marcar urgente y reasignar (R37).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (validación de disponibilidad y asignación masiva de urgentes)
- **Commits, en este orden:**
  1. `docs(specs): disponibilidad, urgentes y reasignación`
  2. `test(asignacion): disponibilidad según R28`
  3. `feat(asignacion): validar disponibilidad al asignar`
  4. `feat(asignacion): tareas urgentes para todos los estudiantes`
  5. `feat(asignacion): reasignar tareas vencidas con nueva hora`
  6. `docs(plan): avance de P17`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P17), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/08-crear-tarea.md, 16-edicion-bloqueo.md y PRD R25, R27, R28 (S-05, S-45). Estás en la rama feat/asignacion-urgentes. Solo puedes crear o modificar lib/asignacion/, lib/tareas/, app/(admin)/tareas/[id]/reasignar/, una migración nueva supabase/migrations/<fecha>_asignacion.sql, lib/__tests__/asignacion.test.ts y docs/specs/18-asignacion-urgentes.md.
Objetivo: aplicar disponibilidad, urgencias y reasignación en el servidor.
1. Escribe docs/specs/18-asignacion-urgentes.md. Commit: docs(specs): disponibilidad, urgentes y reasignación.
2. Pruebas primero de estaDisponible(disponibilidades, venceEn) en hora de Ecuador; luego la implementación en lib/asignacion/ y su uso en las acciones de crear y editar de lib/tareas (llama a lib/asignacion desde ahí; si eso exige tocar lib/tareas, es tu carpeta).
3. Urgente: al marcarla, inserta como responsables a todos los estudiantes (sin duplicar); la vista del estudiante la muestra; en el tablero va primero dentro de su grupo.
4. Reasignar: página con ReasignarVista (components/pantallas, P31) y acción que exige nueva vence_en futura y permite cambiar responsables, con la misma validación de disponibilidad.
Haz estos commits, en este orden: docs(specs): disponibilidad, urgentes y reasignación; test(asignacion): disponibilidad según R28; feat(asignacion): validar disponibilidad al asignar; feat(asignacion): tareas urgentes para todos los estudiantes; feat(asignacion): reasignar tareas vencidas con nueva hora; docs(plan): avance de P17.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para validación de disponibilidad y asignación masiva de urgentes. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P17», cambia en docs/plan/estado.md solo la línea de P17 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 12. P19 · Tiempo real y aviso «por vencer» dentro de la herramienta

- **Rama:** `feat/tiempo-real`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 11 (en paralelo: P33 de Raymond)
- **Estimación:** 1 h 15 min
- **Depende de:** P11 mergeado.
- **Archivos y carpetas del paso:** `lib/tiempo-real/**`, `app/(admin)/tablero/` (solo el componente de cliente de actualización), `app/(estudiante)/mis-tareas/` (ídem), `supabase/migrations/*_realtime.sql`, `docs/specs/20-tiempo-real.md`.
- **Spec antes de programar:** `docs/specs/20-tiempo-real.md`.
- **Criterios de aceptación:**
  - [ ] Lo que marca un responsable lo ven al momento sus compañeros y el tablero, sin recargar (R23).
  - [ ] Cuando una tarea entra en «por vencer», sus responsables y los administradores ven el aviso «⧗ "Nombre" vence en 60 min» con «Ver tarea» dentro de la herramienta; las que no tienen responsables solo avisan a administradores (R14, M6, S-39).
  - [ ] El aviso aparece una sola vez por tarea y sesión.
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (Realtime y políticas de las tablas publicadas); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  1. `docs(specs): tiempo real y aviso por vencer`
  2. `feat(bd): publicar cambios de tareas y pasos en tiempo real`
  3. `feat(tiempo-real): actualizar tablero y listas al momento`
  4. `feat(tiempo-real): aviso por vencer dentro de la herramienta`
  5. `docs(plan): avance de P19`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P19), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/11-ejecucion.md, 13-tablero.md y PRD R14, R23 (S-39). Estás en la rama feat/tiempo-real. Solo puedes crear o modificar lib/tiempo-real/, los componentes de cliente de actualización en app/(admin)/tablero/ y app/(estudiante)/mis-tareas/, una migración nueva supabase/migrations/<fecha>_realtime.sql y docs/specs/20-tiempo-real.md.
Objetivo: cambios al momento y aviso por vencer dentro de la herramienta.
1. Escribe docs/specs/20-tiempo-real.md. Commit: docs(specs): tiempo real y aviso por vencer.
2. Migración: agrega tareas, pasos, responsables y observaciones a la publicación supabase_realtime (RLS sigue aplicando).
3. lib/tiempo-real/use-cambios.ts: suscripción con el cliente de navegador que vuelve a pedir los datos (router.refresh o refetch) con un pequeño retraso para agrupar cambios.
4. lib/tiempo-real/use-aviso-por-vencer.ts: cada minuto y en cada cambio, si una tarea visible cruza los 60 min, muestra avisar({ variante: 'por_vencer', … }) una sola vez por tarea (guardado en sessionStorage).
Haz estos commits, en este orden: docs(specs): tiempo real y aviso por vencer; feat(bd): publicar cambios de tareas y pasos en tiempo real; feat(tiempo-real): actualizar tablero y listas al momento; feat(tiempo-real): aviso por vencer dentro de la herramienta; docs(plan): avance de P19. Verifica con dos navegadores: un estudiante marca y el tablero cambia; una tarea creada a 61 min avisa al minuto.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para Realtime y políticas de las tablas publicadas; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P19», cambia en docs/plan/estado.md solo la línea de P19 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 13. P20 · Tablero completo y panel de estudiantes conectado

- **Rama:** `feat/tablero-filtros-panel`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 12 (en paralelo: P22 de Raymond)
- **Estimación:** 1 h
- **Depende de:** P11, P13, P14 y P31 mergeados.
- **Archivos y carpetas del paso:** `lib/tablero/**`, `app/(admin)/tablero/**`, `app/(admin)/estudiantes/**`, `docs/specs/21-tablero-panel.md`.
- **Spec antes de programar:** `docs/specs/21-tablero-panel.md`.
- **Criterios de aceptación:**
  - [ ] Los tres órdenes de R32 funcionan: cercanía al vencimiento, más reciente a más antigua y por estado; y el filtro «Por vencer» (R32, M11).
  - [ ] Desde el tablero se ve quién inició cada tarea en ejecución, y en el detalle quién marcó cada paso y quién la completó (R23, M9).
  - [ ] Panel de estudiantes con número de tareas, «Sin tareas» y disponibilidad del día, ordenado con los que no tienen tareas primero [SUPUESTO, R36] (M13).
  - [ ] Un administrador que es responsable de una tarea puede ejecutarla desde su detalle con los mismos controles y reglas que un estudiante (R8, D-S-07).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (consultas con filtros y orden)
- **Commits, en este orden:**
  1. `docs(specs): tablero completo y panel de estudiantes`
  2. `feat(tablero): todos los órdenes y el filtro por vencer`
  3. `feat(tablero): detalle de la tarea para el administrador`
  4. `feat(estudiantes): panel con tareas y disponibilidad`
  5. `docs(plan): avance de P20`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P20), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/13-tablero.md, 15-usuarios.md y PRD R23, R32, R36. Estás en la rama feat/tablero-filtros-panel. Solo puedes crear o modificar lib/tablero/, app/(admin)/tablero/, app/(admin)/estudiantes/ y docs/specs/21-tablero-panel.md.
Objetivo: completar el tablero y el panel de estudiantes.
1. Escribe docs/specs/21-tablero-panel.md (marca [SUPUESTO] el orden del panel). Commit: docs(specs): tablero completo y panel de estudiantes.
2. Órdenes 'reciente' y 'estado' en lib/tablero con pruebas; PanelFiltros conectado por la URL.
3. app/(admin)/tablero/[id]/page.tsx: detalle para el administrador con DetalleTareaVista, en solo lectura salvo que sea responsable (entonces usa las acciones de lib/ejecucion, R8), mostrando quién inició, quién marcó cada paso y quién completó con HistorialEjecucion (components/ui-i2h, P31).
4. /estudiantes: datos reales en EstudiantesVista.
Haz estos commits, en este orden: docs(specs): tablero completo y panel de estudiantes; feat(tablero): todos los órdenes y el filtro por vencer; feat(tablero): detalle de la tarea para el administrador; feat(estudiantes): panel con tareas y disponibilidad; docs(plan): avance de P20.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para consultas con filtros y orden. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P20», cambia en docs/plan/estado.md solo la línea de P20 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 14. P23 · SH6 y SH5: historial de completadas y horas que le quedan

- **Rama:** `feat/panel-historial`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 13 (en paralelo: P32 de Raymond)
- **Estimación:** 1 h
- **Depende de:** P20 mergeado y la Fase 2 en `main` (salvo la revisión P22, que se cierra en la misma ronda).
- **Archivos y carpetas del paso:** `lib/usuarios/**`, `app/(admin)/estudiantes/**`, `docs/specs/22-historial-horas.md`.
- **Spec antes de programar:** `docs/specs/22-historial-horas.md`.
- **Criterios de aceptación:**
  - [ ] Al tocar un estudiante se ve su historial de completadas (SH6, R36).
  - [ ] El panel muestra «Le quedan 2 h 30 min» de disponibilidad en el día (SH5, R29).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (consultas del historial)
- **Commits, en este orden:**
  1. `docs(specs): historial de completadas y horas que le quedan`
  2. `feat(estudiantes): historial de completadas`
  3. `feat(estudiantes): horas de disponibilidad que le quedan`
  4. `docs(plan): avance de P23`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P23), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/15-usuarios.md y PRD R29, R36, SH5, SH6. Estás en la rama feat/panel-historial. Solo puedes crear o modificar lib/usuarios/, app/(admin)/estudiantes/ y docs/specs/22-historial-horas.md.
Escribe la spec (commit docs(specs): …), luego el historial de completadas por estudiante (/estudiantes/[id]) con CompletadasVista y las horas que le quedan con la prop horasRestantesTexto de FilaEstudiante, en hora de Ecuador. Haz estos commits, en este orden: docs(specs): historial de completadas y horas que le quedan; feat(estudiantes): historial de completadas; feat(estudiantes): horas de disponibilidad que le quedan; docs(plan): avance de P23.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para consultas del historial. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P23», cambia en docs/plan/estado.md solo la línea de P23 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 15. P24 · SH4: reabrir una tarea completada

- **Rama:** `feat/reabrir`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 14 (en paralelo: P28 de Raymond)
- **Estimación:** 45 min
- **Depende de:** P23 mergeado o descartado.
- **Archivos y carpetas del paso:** `lib/tareas/reabrir.ts`, `supabase/migrations/*_reabrir.sql`, `app/(admin)/tablero/[id]/**`, `docs/specs/23-reabrir.md`.
- **Spec antes de programar:** `docs/specs/23-reabrir.md`.
- **Criterios de aceptación:**
  - [ ] Un administrador reabre una completada con confirmación; los pasos siguen marcados y pasa a En ejecución o Vencida; queda quién y cuándo, y se quita «Fuera de hora» (R26, SH4, S-44).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (función para reabrir)
- **Commits, en este orden:**
  1. `docs(specs): reabrir una tarea completada`
  2. `feat(bd): registro de reapertura`
  3. `feat(tareas): reabrir una tarea completada`
  4. `docs(plan): avance de P24`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P24), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R26 (S-44). Estás en la rama feat/reabrir. Solo puedes crear o modificar lib/tareas/reabrir.ts, una migración nueva, app/(admin)/tablero/[id]/ y docs/specs/23-reabrir.md. Escribe la spec y luego implementa R26 con DialogoConfirmar y aviso. Haz estos commits, en este orden: docs(specs): reabrir una tarea completada; feat(bd): registro de reapertura; feat(tareas): reabrir una tarea completada; docs(plan): avance de P24.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para función para reabrir. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P24», cambia en docs/plan/estado.md solo la línea de P24 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 16. P27 · CO2: ordenar el tablero por lugar

- **Rama:** `feat/orden-lugar`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 14 (en paralelo: P28 de Raymond)
- **Estimación:** 20 min
- **Depende de:** P20 mergeado (no depende de los demás pasos de la Fase 3).
- **Archivos y carpetas del paso:** `lib/tablero/**`, `docs/specs/26-could.md`.
- **Spec antes de programar:** `docs/specs/26-could.md` (sección CO2).
- **Criterios de aceptación:**
  - [ ] El panel de filtros ofrece «Por lugar» y agrupa u ordena por lugar (CO2, R32).
- **Skills de Cursor** ([skills.md](skills.md)): ninguna en especial; basta con AGENTS.md y las reglas de `.cursor/rules/`.
- **Commits, en este orden:**
  1. `docs(specs): orden por lugar`
  2. `feat(tablero): ordenar por lugar`
  3. `docs(plan): avance de P27`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P27), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R32, CO2. Estás en la rama feat/orden-lugar. Solo puedes crear o modificar lib/tablero/ y docs/specs/26-could.md. Escribe la sección CO2 de la spec y agrega el orden 'lugar' con su prueba. Haz estos commits, en este orden: docs(specs): orden por lugar; feat(tablero): ordenar por lugar; docs(plan): avance de P27.
El último commit, «docs(plan): avance de P27», cambia en docs/plan/estado.md solo la línea de P27 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 17. P25 · SH2 y SH1: recuperar contraseña y enviar credenciales por correo

- **Rama:** `feat/correo`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 15 (en paralelo: Raymond prepara la plantilla de P30 y revisa en la vista previa los PR de la Fase 3)
- **Estimación:** 1 h
- **Depende de:** P24 mergeado o descartado; P32 mergeado para la pantalla.
- **Archivos y carpetas del paso:** `app/(auth)/recuperar/**`, `lib/usuarios/correo.ts`, `docs/specs/24-correo.md`.
- **Spec antes de programar:** `docs/specs/24-correo.md`.
- **Criterios de aceptación:**
  - [ ] Desde el login se pide un enlace para recuperar la contraseña por correo (SH2, R5).
  - [ ] Al crear un usuario, la herramienta le envía sus credenciales por correo (SH1, R4).
- **Skills de Cursor** ([skills.md](skills.md)): `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  1. `docs(specs): recuperación de contraseña y credenciales por correo`
  2. `feat(auth): recuperar la contraseña por correo`
  3. `feat(usuarios): enviar credenciales por correo al crear el usuario`
  4. `docs(plan): avance de P25`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P25), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R4, R5, SH1, SH2. Estás en la rama feat/correo. Solo puedes crear o modificar app/(auth)/recuperar/, lib/usuarios/correo.ts y docs/specs/24-correo.md. Escribe la spec (marca [SUPUESTO] el proveedor de correo y el texto del mensaje) y luego implementa con Supabase Auth (resetPasswordForEmail y la plantilla de correo de Supabase), usando RecuperarVista (components/pantallas, P32) en la página. Haz estos commits, en este orden: docs(specs): recuperación de contraseña y credenciales por correo; feat(auth): recuperar la contraseña por correo; feat(usuarios): enviar credenciales por correo al crear el usuario; docs(plan): avance de P25.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P25», cambia en docs/plan/estado.md solo la línea de P25 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 18. P26 · SH3: aviso «por vencer» con la herramienta cerrada

- **Rama:** `feat/aviso-cerrada`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 16 (en paralelo: Raymond ensaya el guion en la vista previa)
- **Estimación:** 1 h 30 min
- **Depende de:** P25 mergeado o descartado; P32 mergeado para el aviso de permiso.
- **Archivos y carpetas del paso:** `public/sw.js`, `lib/notificaciones/**`, `app/api/notificaciones/**`, `supabase/migrations/*_suscripciones.sql`, `docs/specs/25-aviso-cerrada.md`.
- **Spec antes de programar:** `docs/specs/25-aviso-cerrada.md`.
- **Criterios de aceptación:**
  - [ ] Con permiso del usuario, llega una notificación del sistema cuando una tarea suya entra en «por vencer», aunque la herramienta esté cerrada (SH3, R14).
- **Skills de Cursor** ([skills.md](skills.md)): `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  1. `docs(specs): aviso por vencer con la herramienta cerrada`
  2. `feat(notificaciones): suscripción a notificaciones push`
  3. `feat(notificaciones): enviar el aviso por vencer`
  4. `docs(plan): avance de P26`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P26), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R14, SH3. Estás en la rama feat/aviso-cerrada. Solo puedes crear o modificar public/sw.js, lib/notificaciones/, app/api/notificaciones/, una migración nueva y docs/specs/25-aviso-cerrada.md. Escribe la spec (Web Push con VAPID y un cron de Vercel cada minuto; marca [SUPUESTO] lo que no defina el PRD) y luego implementa, usando AvisoActivarAvisos (components/ui-i2h, P32) para pedir el permiso. Haz estos commits, en este orden: docs(specs): aviso por vencer con la herramienta cerrada; feat(notificaciones): suscripción a notificaciones push; feat(notificaciones): enviar el aviso por vencer; docs(plan): avance de P26.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P26», cambia en docs/plan/estado.md solo la línea de P26 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).

---

## 19. P29 · Carga de demo, producción y congelación

- **Rama:** `chore/cierre`
- **Responsable:** Joshua · carril A (datos y reglas)
- **Ronda:** 17 (en paralelo: Raymond ensaya el guion con los datos de demo)
- **Estimación:** 1 h
- **Depende de:** Todo lo que entra en la demo mergeado.
- **Archivos y carpetas del paso:** `scripts/cargar-demo.ts`, `docs/plan/PLAN.md` (estado final), etiqueta `v1.0-avance3`.
- **Spec antes de programar:** `docs/specs/09-datos-demo.md`.
- **Criterios de aceptación:**
  - [ ] `scripts/cargar-demo.ts` borra los datos de demo anteriores (nunca el super administrador) y carga `datos-demo/demo.json` con las horas relativas a «ahora».
  - [ ] Producción en Vercel desde `main`, con las variables de Production y las URL de redirección de Supabase.
  - [ ] Prueba completa del guion de demo (sección 6) en producción, en un celular y en una computadora.
  - [ ] Código congelado: desde la etiqueta solo entran `fix` del guion.
- **Skills de Cursor** ([skills.md](skills.md)): `impeccable` (npx impeccable detect sobre la URL de producción como última revisión); `Supabase CLI` (migraciones aplicadas y tipos al día)
- **Commits, en este orden:**
  1. `feat(demo): script para cargar los datos de demo`
  2. `chore(deploy): configuración de producción`
  3. `docs(plan): estado final del Avance 3`
  4. `docs(plan): avance de P29`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P29), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/09-datos-demo.md y la sección 6 de docs/plan/PLAN.md. Estás en la rama chore/cierre. Solo puedes crear o modificar scripts/cargar-demo.ts, la configuración de despliegue y docs/plan/estado.md.
1. scripts/cargar-demo.ts (tsx, service role): elimina los usuarios y tareas de demo anteriores sin tocar al super administrador; crea usuarios, disponibilidades, tareas, pasos, responsables y observaciones de datos-demo/demo.json calculando las horas con venceEnMinutos y minutosAtras desde ahora. Agrega npm run demo. Commit: feat(demo): script para cargar los datos de demo.
2. Revisa las variables de Production en Vercel y las URL de Supabase Auth. Commit (si cambia algo en el repo): chore(deploy): configuración de producción.
3. Actualiza docs/plan/estado.md: marca como «descartado» lo que no entró y deja la nota de qué quedó fuera. Commit: docs(plan): estado final del Avance 3. Luego mergea, despliega, crea la etiqueta v1.0-avance3 y ensaya el guion.
Skills de Cursor para este paso (docs/plan/skills.md): npx impeccable detect sobre la URL de producción como última revisión; Supabase CLI para migraciones aplicadas y tipos al día. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El último commit, «docs(plan): avance de P29», cambia en docs/plan/estado.md solo la línea de P29 («— pendiente» → «— hecho»); no toques otras líneas de ese archivo.
```

- **PR y merge:** `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --title "Pn · <título>" --body-file .github/pull_request_template.md`. Joshua revisa la vista previa de Vercel y los criterios, mergea con `gh pr merge --merge --delete-branch` y avisa «Entró Pn» (punto de sincronización de la ronda).


---

## Queda abierto
- [ ] **Correo del super administrador:** hoy es `superadmin@interact2hack.test` (**provisional**, en `SUPER_ADMIN_EMAIL`). Cuando tengas el real, cambia la variable en `.env.local` y en Vercel y corre `npm run crear-super-admin`.
- [ ] **Fechas del evento:** para la disponibilidad de la demo se usan días relativos a la carga (día 0, 1 y 2); si el equipo conoce las fechas reales del hackathon, se cambian en `datos-demo/demo.json`.
