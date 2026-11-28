# PLAN.md — Plan de desarrollo del Avance 3 · Señal de Turno

**Proyecto final · Desarrollo Web 2 · USFQ** · Avance 3: «avance funcional para el cliente, construido con harness y specs a partir de este PRD y este DESIGN.md».
**Equipo:** Joshua Lozada y Raymond Portilla · **Demo:** miércoles 2 de diciembre de 2026 · **Inicio:** viernes 27 de noviembre de 2026, noche (hora de Ecuador).
**Fuentes:** `docs/prd/PRD.md` (qué hace), `DESIGN.md` (cómo se ve), `AGENTS.md` (cómo se programa). Este plan no agrega requisitos: cada paso cita sus R# del PRD y sus D-## de DESIGN.md.

## 1. Cómo usar este plan

1. Los pasos se hacen **en el orden de su número**, respetando la columna «Depende de». El plan funciona de dos maneras (sección 4): **modo solo**, con Joshua haciendo todos los pasos en orden, y **modo en paralelo**, con los dos a la vez en carriles distintos. Se puede pasar de uno a otro en cualquier momento.
2. Cada paso es autocontenido: tiene **una rama**, **sus archivos**, **una spec** que se escribe primero, **un prompt** listo para pegar en Cursor (con las skills que usa), **sus criterios de aceptación** y **sus commits en orden**. Ningún paso necesita que una persona concreta haga algo: solo que sus dependencias estén en `main`.
3. Las listas personales están en `docs/plan/tareas-joshua.md` y `docs/plan/tareas-raymond.md`. Son el mismo contenido que este plan, filtrado por carril. Las skills de Cursor de cada paso están en `docs/plan/skills.md`.
4. Antes de empezar un paso se **toma** (sección 4.3); al terminarlo: PR, revisión y merge (sección 2). El estado de todos los pasos está en `docs/plan/estado.md`.

## 2. Flujo de trabajo con git

### 2.1 Reglas

- **`main` está protegido de hecho:** nadie hace push directo a `main`. Todo entra por PR. Recomendado: activar la protección en GitHub (Settings → Branches → Add rule → `main` → «Require a pull request before merging»).
- **Una rama por paso**, con el nombre exacto del plan: `feat/…` para funciones, `chore/…` para configuración, `docs/…` para revisiones y documentación.
- **Joshua administra el repositorio:** revisa y mergea todos los PR, agrega dependencias (`chore/deps-…`) y es dueño de los archivos compartidos (`package.json`, `package-lock.json`, `app/layout.tsx`, `app/globals.css`, `lib/tipos.ts`, `proxy.ts`, configuración). Así ningún PR choca en esos archivos.
- **Cada persona trabaja solo en las carpetas de su paso** (Anexo B). Si necesitas algo de otra carpeta, lo pides en el PR; no lo editas.
- **Los commits del paso se conservan:** se mergea con *merge commit* (`gh pr merge --merge`), no con *squash*, para que el historial muestre cada commit del plan.

### 2.2 Empezar un paso

```bash
git checkout main
git pull origin main
git checkout -b feat/ui-base          # el nombre de la rama del paso
# tomar el paso (sección 4.3): cambia su línea en docs/plan/estado.md
git add docs/plan/estado.md && git commit -m "docs(plan): tomar P2"
git push -u origin feat/ui-base
gh pr create --draft --base main --title "P2 · Componentes base de DESIGN.md y catálogo" --body "Paso tomado."
```

### 2.3 Mientras trabajas

```bash
git add <archivos del paso>           # nunca "git add ." sin revisar
git commit -m "feat(ui): insignias de estado y marcas"
git fetch origin && git merge origin/main   # traer lo nuevo de main (al menos una vez antes del PR)
```

Se usa `merge` (no `rebase`) para no tener que reescribir ramas ya subidas.

### 2.4 Abrir el PR

```bash
npm run lint && npm run typecheck && npm test && npm run build
git diff --stat origin/main           # solo deben salir archivos del paso
git push
gh pr edit --body-file .github/pull_request_template.md   # o complétalo en GitHub
gh pr ready                           # el borrador pasa a listo para revisión
```

Completa la plantilla del PR (`.github/pull_request_template.md`): paso, spec, criterios marcados y verificación. Vercel publica una vista previa de la rama.

### 2.5 Revisar y mergear (Joshua)

1. Abre la vista previa de Vercel del PR y comprueba los criterios del paso.
2. Revisa que `Files changed` solo tenga archivos del paso.
3. `gh pr merge <número> --merge --delete-branch`.
4. Avisa en el chat del equipo qué se mergeó, para que el otro haga `git fetch origin && git merge origin/main` en su rama.

Los PR de Joshua siguen el mismo camino: PR, vista previa y merge. Raymond puede revisar la parte visual de esos PR cuando le toque una espera.

### 2.6 Si aparece un conflicto

1. `git fetch origin && git merge origin/main` muestra el conflicto.
2. **Si el archivo es de tu paso:** resuélvelo, conserva lo de `main` que no es tuyo, verifica (lint, typecheck, build) y haz commit `chore: resolver conflicto con main`.
3. **Si el archivo es de otra persona o compartido:** no lo resuelvas a mano. Quédate con la versión de `main` (`git checkout --theirs <archivo>` durante el merge) y anota en el PR qué cambio necesitabas. El dueño lo aplica en su rama.
4. Si no sabes de quién es, mira el Anexo B. Si hay dudas, se detiene el merge (`git merge --abort`) y se habla antes de seguir.

## 3. Alcance: qué entra hoy y qué después

El PRD dice que **los 15 Must no se recortan del Avance 3** (PRD §4). Lo que este plan decide es **el orden**: primero lo esencial para mostrar el recorrido completo de una tarea (crear → asignar → ejecutar → completar → verla en el tablero), y después el resto de los Must. Los Should y Could solo entran si sobra tiempo, en el orden contrario al «orden de recorte» del PRD (PRD §4: se recortan primero CO1 y CO2, luego SH3, SH1, SH2, SH4, SH5, SH6).

| Must (PRD §4) | Fase 1 · MVP de hoy | Queda para la Fase 2 |
| --- | --- | --- |
| M1 Login, perfiles, super administrador | Login, rutas por perfil y super administrador fijo (P5) | — |
| M2 Contraseñas | — | Cambiar la propia y la de otros, salvo la del super administrador (P14) |
| M3 Gestión de usuarios | Usuarios de prueba creados con el script o desde Supabase | Crear, editar, eliminar usuarios con disponibilidad (P14) |
| M4 Gestión de tareas | Crear tarea con checklist y responsables (P7) | Editar, eliminar y bloqueo «en edición» (P15) |
| M5 Asignar a personas disponibles | Asignar uno o varios responsables; el selector muestra la disponibilidad (P7) | Validación de disponibilidad en el servidor (P17) |
| M6 Estados, alerta «por vencer», temporizador | Estados, marcas y temporizador (P3, P11) | Aviso «por vencer» dentro de la herramienta en tiempo real (P19) |
| M7 Lista del estudiante y completadas | Lista con tarjeta señal y completadas (P9) | — |
| M8 Ejecución | Marcar y desmarcar, observaciones, deslizar para completar (P9) | Una tarea abierta a la vez y terminar una vencida (P18) |
| M9 Registro de quién y cuándo | Se guarda al marcar, iniciar y completar (P9) | Se muestra al administrador en el detalle (P20) |
| M10 Reasignar vencidas | — | P17 |
| M11 Tablero | Tarjetas agrupadas (R31), totales, filtro «por vencer» y orden por vencimiento (P11) | Orden de la más reciente a la más antigua y por estado (P20) |
| M12 Urgentes | — | P17 |
| M13 Panel de estudiantes | — | P14 y P20 |
| M14 Sin internet | Banda y pasos bloqueados (P4, P9) | — |
| M15 Mensajes de confirmación o error | En cada acción del MVP (P2 y cada paso) | En cada acción nueva |

**Fase 3 (solo si la Fase 2 está en `main` el martes 1 a las 12:00):** SH6 y SH5 (P23), SH4 (P24), SH2 y SH1 (P25), SH3 (P26), CO2 (P27), CO1 (P28). Lo que no alcance queda fuera del Avance 3 y se anota en `docs/plan/estado.md`.

## 4. Modo solo (hoy) y modo en paralelo

El mismo plan sirve para una persona o para dos. Lo que no cambia en ningún modo: **una rama y un PR por paso**, los archivos de cada paso (Anexo B), los commits del paso y el merge por PR. Por eso se puede empezar solo y sumar a la segunda persona en cualquier momento sin rehacer nada.

Los pasos están repartidos en **dos carriles** que nunca tocan los mismos archivos:

| Carril | Qué contiene | Carpetas (Anexo B) | Pasos | Responsable en modo en paralelo |
| --- | --- | --- | --- | --- |
| **A · Datos y reglas** | Proyecto, base de datos, RLS, autenticación, reglas de negocio, rutas con datos reales, tiempo real, despliegue | `lib/`, `supabase/`, `scripts/`, `app/(auth)/`, `app/(estudiante)/`, `app/(admin)/`, `app/perfil/`, `proxy.ts`, archivos compartidos | P0, P1, P3, P5, P7, P9, P11, P14, P15, P17–P20, P23–P27, P29 | Joshua |
| **B · Interfaz** | Componentes de DESIGN.md, catálogo, navegación, pantallas, PWA, datos de demo, README, revisiones de diseño y de la demo | `components/ui-i2h/`, `components/layout/`, `components/pantallas/`, `app/catalogo/`, `public/`, `datos-demo/`, `README.md`, `docs/qa/` | P2, P4, P6, P8, P10, P12, P13, P16, P21, P22, P28, P30 | Raymond |

**Regla de oro:** cada carril lo lleva **una sola persona a la vez**. Dentro de un carril varios pasos tocan el mismo archivo (por ejemplo `app/catalogo/page.tsx`), así que dentro de un carril se va en orden; entre carriles, en paralelo.

### 4.1 Modo solo (hoy)

Joshua hace **todos los pasos, en el orden de su número**, alternando carriles. El orden numérico ya respeta todas las dependencias:

| Bloque | Pasos en orden | Suma aproximada | Al terminar el bloque |
| --- | --- | --- | --- |
| Preparación | P0 | 1 h 15 min | Proyecto, Supabase, Vercel y skills listos |
| MVP de la demo | P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8 → P9 → P10 → P11 → P12 | 14 h 30 min | **Hito MVP:** crear → asignar → ejecutar → completar → ver en el tablero |
| Resto de los Must | P13 → P14 → P15 → P16 → P17 → P18 → P19 → P20 → P21 → P22 | 13 h 30 min | Los 15 Must del PRD |
| Should y Could | P23 → P24 → P25 → P26 → P27 → P28 | 5 h | Solo si la Fase 2 está en `main` el martes 1 a las 12:00 |
| Cierre | P29 → P30 | 2 h | Producción, demo cargada y prueba |

- Cada paso igual se **toma** (4.3), se abre como PR borrador, se verifica y se mergea antes de empezar el siguiente. Joshua mergea sus propios PR después de revisar la vista previa de Vercel.
- En modo solo se pueden posponer, sin romper nada, P12 (revisión de diseño del MVP), P16 (PWA) y P21 (datos de demo) hasta el final de su fase.
- Las estimaciones son por persona. En modo solo, la Fase 1 no cabe en una noche: el objetivo de hoy es llegar lo más lejos posible en orden. El hito MVP se cierra el sábado si hace falta.

### 4.2 Modo en paralelo (cuando Raymond se suma)

Raymond puede sumarse **después de P0** o al terminar cualquier paso. El cambio de modo es así:

1. Joshua termina (o deja en un PR borrador) el paso que tiene abierto y **avisa en el chat del equipo** qué pasos de cada carril están hechos.
2. Raymond hace `git pull` en `main`, sigue la «Instalación» de `docs/plan/skills.md`, revisa `docs/plan/estado.md` y `gh pr list --state open`, y **toma el primer paso libre del carril B** cuyas dependencias ya estén en `main`.
3. Desde ese momento Joshua **solo toma pasos del carril A**. Si Joshua tenía un paso del carril B en curso, lo termina él (o lo deja en borrador y avisa) antes de que Raymond tome el siguiente de ese carril.
4. Joshua sigue revisando y mergeando todos los PR (sección 2.5).

Si Raymond tiene que dejar de trabajar, avisa en el chat y deja su paso en curso como PR borrador con lo que haya. Joshua puede retomar ese carril donde quedó: modo solo otra vez.

### 4.3 Tomar un paso (para no duplicar trabajo)

Antes de pegar el prompt de un paso, **siempre** (también en modo solo):

1. `git checkout main && git pull origin main`.
2. Comprueba que el paso está libre: su línea en `docs/plan/estado.md` dice `— libre` **y** no hay un PR abierto con su número (`gh pr list --state open`).
3. Comprueba que sus dependencias («Depende de») ya están en `main`.
4. Crea la rama del paso, cambia **solo su línea** en `docs/plan/estado.md` (`— libre` → `— Joshua` o `— Raymond`) y haz el commit `docs(plan): tomar Pn`.
5. `git push -u origin <rama>` y abre el **PR borrador**: `gh pr create --draft --base main --title "Pn · <título del paso>" --body "Paso tomado."`
6. Escribe en el chat del equipo: «Tomo Pn». Recién entonces pegas el prompt en Cursor.

Si dos personas tomaron el mismo paso, se queda quien abrió primero el PR borrador; el otro cierra el suyo (`gh pr close --delete-branch`) y toma el siguiente libre de su carril.

### 4.4 Qué se puede hacer a la vez

Cada fila dice qué pasos quedan disponibles en cada carril según lo que ya esté en `main`. Los dos carriles de una misma fila pueden avanzar al mismo tiempo sin tocar los mismos archivos.

| Ya está en `main` | Carril A puede tomar | Carril B puede tomar |
| --- | --- | --- |
| Nada | P0 (solo; nadie más trabaja hasta que entra) | — |
| P0 | P1, luego P3 | P2; también P16 |
| P0, P1 | P3; P5 por la parte de servidor | P2 (o el que siga); P21 ya se puede hacer |
| P2, P3, P1 | P5 (conecta `LoginVista` cuando entra P4) | P4, luego P6, luego P8 |
| P5, P6 | P7 | P8, luego P10 |
| P7, P8 | P9 | P10 |
| P9, P10 | P11; también P18 | P13 (y P12 en cuanto entre P11) |
| P11 | P15, P18 y P19 (no esperan al carril B) | P12 y P13, el que siga libre |
| P13 | P14 → P17 → P20 | P16 y P21 si siguen libres |
| P14 a P20 | Fase 3 en orden (P23 → P27) | P22 |
| P27 (o descartado) | — | P28 |
| Todo lo de la demo | P29 | P30 cuando P29 esté en producción |

Si un paso del carril A necesita un componente del carril B que aún no está en `main`, se empieza por la parte de servidor y la pantalla se conecta cuando entra el componente (sección 8). Nunca se crea una segunda versión del componente en el otro carril.

### 4.5 Calendario de referencia

| Cuándo (hora de Ecuador) | Modo solo (Joshua) | Modo en paralelo · carril A (Joshua) | Modo en paralelo · carril B (Raymond) |
| --- | --- | --- | --- |
| Vie 27, noche | P0, P1, P2, P3… en orden | P0, luego P1, P3, P5, P7 | Tras P0: P2, P4, P6 |
| Sáb 28 | Hasta P12 (hito MVP) | P9, P11, P15, P18, P19 | P8, P10, P12, P13 |
| Sáb 28 – lun 30 | P13 a P22 | P14, P17, P20 | P16, P21, P22 |
| Mar 1, hasta 12:00 | Fase 3 si la Fase 2 está en `main` | Fase 3 en orden | P28 si llega su turno |
| Mar 1, 12:00–20:00 | P29 y P30 | P29: demo, producción, ensayo | P30: prueba en celular y computadora |
| Mar 1, 20:00 | **Congelación:** solo entran `fix` del guion | | |
| Mié 2 | Ensayo final y demo | Ensayo final y demo | Ensayo final y demo |

## 5. Pasos

| Paso | Fase | Rama | Carril · responsable en paralelo | Estimación | Depende de |
| --- | --- | --- | --- | --- | --- |
| P0 | 0 | `chore/setup` | A · Joshua | 1 h 15 min | Ninguna. Se hace antes de que empiece cualquier otro paso. |
| P1 | 1 | `feat/esquema-datos` | A · Joshua | 1 h 15 min | P0 mergeado. |
| P2 | 1 | `feat/ui-base` | B · Raymond | 1 h 30 min | P0 mergeado. |
| P3 | 1 | `feat/estados-tarea` | A · Joshua | 45 min | P0 mergeado (puede ir en paralelo con P1). |
| P4 | 1 | `feat/layout-navegacion` | B · Raymond | 1 h 15 min | P2 mergeado. |
| P5 | 1 | `feat/auth-roles` | A · Joshua | 1 h 15 min | P1 mergeado. P4 mergeado para conectar `LoginVista` (si aún no está, empieza por la parte de servidor). |
| P6 | 1 | `feat/ui-formulario-tarea` | B · Raymond | 1 h | P2 mergeado. |
| P7 | 1 | `feat/tareas-crear` | A · Joshua | 1 h 15 min | P3, P5 y P6 mergeados. |
| P8 | 1 | `feat/ui-tarea` | B · Raymond | 2 h | P2 mergeado. |
| P9 | 1 | `feat/ejecucion` | A · Joshua | 1 h 30 min | P7 y P8 mergeados (P4 para la banda sin conexión). |
| P10 | 1 | `feat/ui-tablero` | B · Raymond | 1 h | P8 mergeado. |
| P11 | 1 | `feat/tablero` | A · Joshua | 1 h | P9 y P10 mergeados. |
| P12 | 1 | `docs/revision-diseno-mvp` | B · Raymond | 45 min | P11 mergeado y desplegado en la vista previa. |
| P13 | 2 | `feat/ui-pantallas` | B · Raymond | 2 h | P2 mergeado (puede empezar en cuanto termine P12). |
| P14 | 2 | `feat/usuarios` | A · Joshua | 2 h | P5 y P13 mergeados. |
| P15 | 2 | `feat/edicion-bloqueo` | A · Joshua | 1 h 30 min | P7 mergeado (P13 para el diálogo de confirmación). |
| P16 | 2 | `feat/pwa` | B · Raymond | 45 min | P0 mergeado. |
| P17 | 2 | `feat/asignacion-urgentes` | A · Joshua | 1 h 30 min | P14 y P15 mergeados. |
| P18 | 2 | `feat/reglas-ejecucion` | A · Joshua | 1 h 15 min | P9 mergeado. |
| P19 | 2 | `feat/tiempo-real` | A · Joshua | 1 h 15 min | P11 mergeado. |
| P20 | 2 | `feat/tablero-filtros-panel` | A · Joshua | 1 h | P11, P13 y P14 mergeados. |
| P21 | 2 | `feat/datos-demo` | B · Raymond | 1 h 15 min | P1 mergeado (formato en `docs/specs/09-datos-demo.md`). |
| P22 | 2 | `docs/revision-diseno-final` | B · Raymond | 1 h | P14 a P20 mergeados. |
| P23 | 3 | `feat/panel-historial` | A · Joshua | 1 h | Fase 2 completa. |
| P24 | 3 | `feat/reabrir` | A · Joshua | 45 min | P23 mergeado o descartado. |
| P25 | 3 | `feat/correo` | A · Joshua | 1 h | P24 mergeado o descartado. |
| P26 | 3 | `feat/aviso-cerrada` | A · Joshua | 1 h 30 min | P25 mergeado o descartado. |
| P27 | 3 | `feat/orden-lugar` | A · Joshua | 20 min | P26 mergeado o descartado. |
| P28 | 3 | `feat/porcentaje-pasos` | B · Raymond | 20 min | P27 mergeado o descartado. |
| P29 | 4 | `chore/cierre` | A · Joshua | 1 h | Todo lo que entra en la demo mergeado. |
| P30 | 4 | `docs/prueba-demo` | B · Raymond | 1 h | P29 desplegado en producción. |

### 5.1 Fase 0 · Preparación

Joshua hace este paso **solo y antes** de que empiece cualquier otro. Además del código, incluye estas tareas fuera del repo (decisiones confirmadas por Joshua el 27 de noviembre de 2026):

1. **Supabase (proyecto nuevo):** Joshua crea un proyecto **nuevo** en su otra cuenta de Supabase (región más cercana, por ejemplo `us-east-1`). No se reutiliza ningún proyecto ni conexión de Supabase anterior. En Authentication → Providers deja solo Email, sin registro público (*Allow new users to sign up* desactivado, R1, W1) y sin confirmación por correo para los usuarios que crea el administrador.
2. **Credenciales:** Joshua copia `Project URL`, `anon key` y `service_role key` y **él mismo las pega** en `.env.local` (no se sube) y en Vercel. El agente de Cursor no lee ni imprime `.env.local`, y las claves no se pegan en prompts ni en el chat. `SUPABASE_SERVICE_ROLE_KEY`, `SUPER_ADMIN_EMAIL` y `SUPER_ADMIN_PASSWORD` van solo como variables de servidor.
3. **Super administrador (provisional):** `SUPER_ADMIN_EMAIL=superadmin@interact2hack.test` queda en `.env.example`, marcado como **PROVISIONAL**. Para cambiarlo basta con editar esa variable en `.env.local` y en Vercel y volver a correr `npm run crear-super-admin` (P5). La contraseña la elige Joshua y solo vive en `.env.local` y Vercel.
4. **Vercel:** importar `Scorpwik/interact-2-hack` en el team **`scorpwik`**, framework Next.js, rama de producción `main`; cada PR genera su vista previa. En Supabase → Authentication → URL Configuration, agregar la URL de producción y el patrón de las vistas previas.
5. **GitHub:** Raymond (`rmandors`) ya tiene permiso de escritura. Solo falta activar la protección de `main` (sección 2.1).
6. **Skills de Cursor:** cada uno, en su máquina, sigue `docs/plan/skills.md` (sección «Instalación»). Las skills del proyecto ya vienen en el repo; en cada máquina solo se instala Impeccable y se comprueba que Cursor las ve.
7. **Avisar a Raymond** cuando P0 esté en `main` (ver «Modo en paralelo», sección 4.2).

#### P0 · Preparar el proyecto, Supabase y Vercel

- **Rama:** `chore/setup`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 15 min
- **Depende de:** Ninguna. Se hace antes de que empiece cualquier otro paso.
- **Archivos y carpetas del paso:** Todo el esqueleto: `package.json`, configuración (`next.config.ts`, `tsconfig.json`, `eslint`, `vitest.config.ts`, `components.json`), `app/layout.tsx`, `app/globals.css`, `app/fuentes/`, `components/ui/` (shadcn), `lib/tipos.ts`, `lib/supabase/` (cliente de navegador, de servidor y admin), `proxy.ts` vacío, `.env.example`, `.gitignore`, carpetas vacías con `.gitkeep` (`components/ui-i2h/`, `components/layout/`, `components/pantallas/`, `app/catalogo/`, `datos-demo/`, `docs/qa/`, `supabase/migrations/`, `scripts/`).
- **Spec antes de programar:** `docs/specs/00-arquitectura.md` (stack, carpetas, dueños, variables) y `docs/specs/01-contratos-ui.md` (tipos de `lib/tipos.ts` y props de cada componente; parte del Anexo A de este plan).
- **Criterios de aceptación:**
  - [ ] `npm run dev` abre una página en negro #050307 con un título en Big Shoulders 900 y un texto en Sora, servidas desde el propio proyecto (D-18).
  - [ ] El bloque de tokens de DESIGN.md §4 está copiado tal cual en `app/globals.css` y mapeado en Tailwind (colores, espacios, tamaños, radio 0) (D-09, D-07).
  - [ ] shadcn/ui instalado con `--radius: 0` y sin modo claro (DD-01).
  - [ ] Dependencias instaladas de una vez: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react`, `sonner`, `vitest`, el CLI `supabase` (desarrollo), y los componentes shadcn que se usen (button, input, textarea, checkbox, dialog, sonner, dropdown-menu).
  - [ ] `lib/tipos.ts` y `docs/specs/01-contratos-ui.md` publicados en `main`: con eso Raymond puede empezar sin esperar datos reales.
  - [ ] `npm run lint`, `npm run typecheck`, `npm test` (una prueba de humo) y `npm run build` pasan.
  - [ ] Proyecto de Supabase **nuevo** creado por Joshua en su otra cuenta; Joshua pegó `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` en `.env.local` (no se sube) y en Vercel (Preview y Production). Ninguna clave aparece en el repo, en un prompt ni en el chat.
  - [ ] `.env.example` trae `SUPER_ADMIN_EMAIL=superadmin@interact2hack.test` marcado como **PROVISIONAL**; cambiarlo es editar solo esa variable (y volver a correr el script de P5).
  - [ ] Proyecto de Vercel en el team `scorpwik`, conectado a `Scorpwik/interact-2-hack`, rama de producción `main`; la URL de producción muestra la página de prueba.
- **Skills de Cursor** ([skills.md](skills.md)): `shadcn CLI` (inicializar shadcn/ui y agregar componentes); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)); `supabase-postgres-best-practices` (solo para revisar los clientes de Supabase)
- **Commits, en este orden:**
  0. `docs(plan): tomar P0` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `chore: crear proyecto Next.js con TypeScript, Tailwind y App Router`
  2. `chore(ui): configurar shadcn/ui con radio 0 y sin modo claro`
  3. `feat(diseno): tokens y fuentes de DESIGN.md en globals.css`
  4. `chore: estructura de carpetas y tipos compartidos en lib/tipos.ts`
  5. `chore(supabase): clientes de Supabase y variables de entorno de ejemplo`
  6. `ci: scripts de lint, typecheck, test y build`
  7. `docs(specs): arquitectura y contratos de interfaz`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md (secciones 4, 8 y 9) y docs/plan/PLAN.md (paso P0 y Anexo A). Estás en la rama chore/setup.
Objetivo: dejar el esqueleto del proyecto listo para que dos personas trabajen en paralelo sin tocar los mismos archivos.
1. Crea un proyecto Next.js (App Router, TypeScript estricto, Tailwind, ESLint, carpeta app/ en la raíz, sin src/, alias @/*) con `npx create-next-app@latest` y la opción `--no-agents-md` (create-next-app genera su propio AGENTS.md y CLAUDE.md; aquí ya existe el nuestro). Como el repo no está vacío, créalo en una carpeta temporal fuera del repo y copia los archivos al repo sin sobrescribir AGENTS.md, DESIGN.md, docs/, .cursor/, .agents/, .github/ ni skills-lock.json.
2. Inicializa shadcn/ui con radio 0 y solo tema oscuro; agrega button, input, textarea, checkbox, dialog, dropdown-menu y sonner.
3. Instala @supabase/supabase-js, @supabase/ssr, zod, lucide-react, y como dependencias de desarrollo vitest y supabase (el CLI, que se usa con npx supabase). Agrega scripts: lint, typecheck (tsc --noEmit), test (vitest run), build.
4. Copia en app/globals.css, tal cual, el bloque CSS entre <!-- tokens:inicio --> y <!-- tokens:fin --> de DESIGN.md. Mapea en Tailwind los colores (--color-*, --estado-*, --marca-*), espacios (--esp-*), tamaños (--fs-*) y radio 0, para que los componentes usen clases y nunca valores a mano.
5. Copia docs/diseno/fuentes/*.woff2 a app/fuentes/ y cárgalas con next/font/local (Big Shoulders Display 700 y 900, Sora 400 y 600) en app/layout.tsx, con lang="es" y fondo --color-fondo.
6. Crea lib/tipos.ts con los tipos del Anexo A del plan (EstadoTarea, MarcaTarea, TemporizadorVista, TareaTarjeta, TareaDetalle, PasoVista, PersonaResumen, OpcionResponsable, TotalesTablero, UsuarioFila, EstudianteFila, ResultadoAccion).
7. Crea lib/supabase/cliente.ts (navegador), lib/supabase/servidor.ts (Server Components y acciones, con cookies) y lib/supabase/admin.ts (service role, con import 'server-only'). Crea .env.example con NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY y SUPER_ADMIN_PASSWORD sin valores, y SUPER_ADMIN_EMAIL=superadmin@interact2hack.test con el comentario «# PROVISIONAL: cambiar por el correo real del super administrador». No leas, no imprimas y no edites .env.local: lo llena Joshua a mano.
8. Crea las carpetas vacías con .gitkeep: components/ui-i2h, components/layout, components/pantallas, app/catalogo, datos-demo, docs/qa, supabase/migrations, scripts.
9. Corre npm run dev una vez desde Cursor: Next.js agrega a AGENTS.md un bloque entre <!-- BEGIN:nextjs-agent-rules --> y <!-- END:nextjs-agent-rules --> que apunta a node_modules/next/dist/docs/. Déjalo tal cual (no toques el resto de AGENTS.md) e inclúyelo en el commit de scripts, para que no aparezca como cambio en las ramas de nadie. Comprueba que .agents/skills/ y .cursor/skills/ siguen en el repo (no los borres ni los muevas).
10. Una página de prueba en app/page.tsx con un título en Big Shoulders y un texto en Sora, y una prueba de humo en lib/__tests__/humo.test.ts.
11. Escribe docs/specs/00-arquitectura.md y docs/specs/01-contratos-ui.md con la plantilla de docs/specs/README.md, usando el Anexo A.
Haz los commits exactamente en este orden y con estos mensajes: chore: crear proyecto Next.js con TypeScript, Tailwind y App Router; chore(ui): configurar shadcn/ui con radio 0 y sin modo claro; feat(diseno): tokens y fuentes de DESIGN.md en globals.css; chore: estructura de carpetas y tipos compartidos en lib/tipos.ts; chore(supabase): clientes de Supabase y variables de entorno de ejemplo; ci: scripts de lint, typecheck, test y build; docs(specs): arquitectura y contratos de interfaz. Antes de cada commit, npm run lint && npm run typecheck. Al final, npm test && npm run build. No inventes requisitos ni pantallas: este paso no tiene funciones de usuario.
Skills de Cursor para este paso (docs/plan/skills.md): shadcn CLI para inicializar shadcn/ui y agregar componentes; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions); /supabase-postgres-best-practices para solo para revisar los clientes de Supabase. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P0» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

### 5.2 Fase 1 · MVP de la demo (meta: hoy)

Objetivo: el recorrido completo de una tarea con datos reales. El administrador crea una tarea con checklist y la asigna; el estudiante la ve en el celular, marca pasos, escribe la observación y la completa deslizando; el tablero muestra estados, temporizador y totales. Al terminar: **hito MVP** (merge de todo, despliegue en Vercel y prueba con un administrador y un estudiante).


#### P1 · Esquema de datos, RLS y formato de datos de demo

- **Rama:** `feat/esquema-datos`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 15 min
- **Depende de:** P0 mergeado.
- **Archivos y carpetas del paso:** `supabase/migrations/**`, la configuración que genere `supabase init` (`supabase/config.*`), `lib/supabase/tipos-bd.ts` (tipos generados), `docs/specs/02-datos-y-rls.md`, `docs/specs/09-datos-demo.md`.
- **Spec antes de programar:** `docs/specs/02-datos-y-rls.md` y `docs/specs/09-datos-demo.md` (formato del JSON de demo que llenará Raymond en P21).
- **Criterios de aceptación:**
  - [ ] Tablas: `perfiles` (id = auth.users.id, nombre, correo, telefono, rol `admin|estudiante`, es_super_admin), `disponibilidades` (perfil, dia, desde, hasta) (R28, M3), `tareas` (nombre, descripcion, vence_en, lugar, urgente, creada_por, iniciada_por/en, completada_por/en, fuera_de_hora, editando_por/desde) (R7, R12, R13, R23), `pasos` (tarea, orden, texto, marcado_por, marcado_en) (R9, R23), `responsables` (tarea, perfil) (R8), `observaciones` (tarea, autor, texto, creada_en) (R20).
  - [ ] Índice único parcial: solo puede existir un `es_super_admin = true`; un trigger impide borrar ese perfil o cambiarle el rol (R3, W4).
  - [ ] Vista `tareas_vista` con `estado` y `por_vencer` calculados con la hora actual según R11 y R12 (se valida contra los casos de P3).
  - [ ] RLS activada en todas las tablas: el estudiante solo lee las tareas donde es responsable o que son urgentes (R27, R35) y los perfiles de sus compañeros (R23); solo los administradores escriben tareas, responsables y perfiles (R2).
  - [ ] Las escrituras de ejecución (marcar paso, observar, completar) no se permiten por tabla: quedan reservadas a funciones RPC que se escriben en P9.
  - [ ] Migración aplicada en el proyecto de Supabase sin errores; `docs/specs/09-datos-demo.md` define el JSON de demo con horas relativas a «ahora».
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (esquema, índices, RLS y su rendimiento); `Supabase CLI` (supabase migration new, db push y gen types)
- **Commits, en este orden:**
  0. `docs(plan): tomar P1` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): esquema de datos, RLS y formato de datos de demo`
  2. `feat(bd): tablas de perfiles, disponibilidades, tareas, pasos, responsables y observaciones`
  3. `feat(bd): super administrador único y protegido`
  4. `feat(bd): vista tareas_vista con estado y por vencer`
  5. `feat(bd): políticas RLS por perfil`
  6. `chore(bd): tipos de la base generados para TypeScript`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P1), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md. Estás en la rama feat/esquema-datos. Solo puedes crear o modificar supabase/**, lib/supabase/tipos-bd.ts, docs/specs/02-datos-y-rls.md y docs/specs/09-datos-demo.md.
Objetivo: el modelo de datos de Señal de Turno en Postgres (Supabase) con RLS, siguiendo el PRD R1–R37 sin agregar requisitos.
1. Primero escribe docs/specs/02-datos-y-rls.md con la plantilla: tablas, columnas, claves, índices, la vista tareas_vista y cada política RLS, con la R# que la justifica. Marca [SUPUESTO] lo que el PRD no define (por ejemplo, disponibilidad por fecha del evento, S-45). Escribe también docs/specs/09-datos-demo.md: un JSON con usuarios (nombre, correo @example.com, teléfono, rol, contraseña de demo, disponibilidades con día relativo 0/1/2 y horas), y tareas (nombre, descripción, lugar, venceEnMinutos relativo a la hora de carga, urgente, responsables por correo, pasos con marcado opcional por correo y minutosAtras, observaciones). Commit: docs(specs): esquema de datos, RLS y formato de datos de demo.
2. Migraciones SQL en supabase/migrations/ con estas tablas: perfiles, disponibilidades, tareas, pasos, responsables, observaciones (columnas del paso P1 en el plan). timestamptz para horas.
3. Índice único parcial para un solo es_super_admin y trigger que impida borrarlo o cambiarle rol o es_super_admin (R3).
4. Vista tareas_vista (security_invoker) que calcula estado (sin_asignar, pendiente, en_ejecucion, vencida, completada) y por_vencer (≤ 60 min y no completada ni vencida) con now(), exactamente como R11 y R12; incluye pasos_total, pasos_marcados y responsables_total.
5. RLS en todas las tablas: administradores leen y escriben todo salvo lo prohibido por R3; estudiantes leen sus tareas y las urgentes, sus pasos y observaciones, y los perfiles (nombre y teléfono) de sus compañeros. Nadie actualiza pasos ni observaciones por tabla: eso lo harán funciones RPC en P9.
6. Aplica la migración al proyecto de Supabase y genera los tipos en lib/supabase/tipos-bd.ts.
Commits en este orden: docs(specs): esquema de datos, RLS y formato de datos de demo; feat(bd): tablas de perfiles, disponibilidades, tareas, pasos, responsables y observaciones; feat(bd): super administrador único y protegido; feat(bd): vista tareas_vista con estado y por vencer; feat(bd): políticas RLS por perfil; chore(bd): tipos de la base generados para TypeScript. Verifica con dos usuarios de prueba (un admin y un estudiante) que las políticas hacen lo que dice la spec, y anota el resultado en la sección 7 de la spec.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para esquema, índices, RLS y su rendimiento; Supabase CLI para supabase migration new, db push y gen types. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P1» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P2 · Componentes base de DESIGN.md y catálogo

- **Rama:** `feat/ui-base`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 30 min
- **Depende de:** P0 mergeado.
- **Archivos y carpetas del paso:** `components/ui-i2h/Insignia.tsx`, `Boton.tsx`, `Avisos.tsx`, `Campo.tsx`, `Casilla.tsx`, `Icono.tsx`, `components/ui-i2h/index.ts`, `app/catalogo/page.tsx`, `docs/specs/03-ui-base.md`.
- **Spec antes de programar:** `docs/specs/03-ui-base.md`.
- **Criterios de aceptación:**
  - [ ] Insignia para los 5 estados y las 4 marcas, con el ícono y el texto exactos de DESIGN.md §4.2 y §4.3 (D-01, D-02).
  - [ ] Botón primario, secundario y peligro con reposo, hover, foco, presionado, deshabilitado con motivo visible y «Guardando…» (DESIGN.md §5.6), alto mínimo 48 px (D-06).
  - [ ] Avisos de confirmación, error (con «Reintentar»), por vencer, tarea abierta y bloqueo, y la función `avisar()` para mostrarlos; los de error se anuncian con prioridad (DESIGN.md §5.8).
  - [ ] Campo con etiqueta visible, «(obligatorio)» escrito, ayuda y error con ícono «!», alto 48 px y texto de 16 px (DESIGN.md §5.5).
  - [ ] `/catalogo` muestra todos estos componentes en todos sus estados con los datos de ejemplo de `docs/diseno/bocetos.html`.
  - [ ] Sin valores escritos a mano (D-09), radio 0 (D-07), foco lima (D-05), sin scroll horizontal en 360 px (D-15).
- **Skills de Cursor** ([skills.md](skills.md)): `frontend-design` (criterio de tipografía y composición dentro de DESIGN.md, sin cambiar la dirección visual); `accessibility` (foco, contraste y nombres accesibles); `ux-writing` (textos de botones y avisos); `web-design-guidelines` (auditoría de los componentes antes del PR)
- **Commits, en este orden:**
  0. `docs(plan): tomar P2` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): componentes base de la interfaz`
  2. `feat(ui): insignias de estado y marcas`
  3. `feat(ui): botones primario, secundario y peligro`
  4. `feat(ui): avisos de confirmación, error y bloqueo`
  5. `feat(ui): campo de formulario y casilla`
  6. `feat(catalogo): catálogo de componentes base con datos de ejemplo`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P2), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y DESIGN.md completo (sobre todo secciones 4, 5.1, 5.5, 5.6, 5.8, 6, 8 y 9). Mira docs/diseno/bocetos.html y docs/diseno/brand-board.html como referencia visual. Estás en la rama feat/ui-base.
Solo puedes crear o modificar archivos en components/ui-i2h/, app/catalogo/ y docs/specs/03-ui-base.md. No modifiques package.json, app/globals.css ni lib/: si te falta algo de ahí, anótalo en el PR.
Objetivo: los componentes base de Señal de Turno, presentacionales, con las props exactas de docs/specs/01-contratos-ui.md.
1. Escribe primero docs/specs/03-ui-base.md con la plantilla (componentes, props, estados visuales, criterios D-##). Commit: docs(specs): componentes base de la interfaz.
2. Insignia({ tipo, detalle? }): los 5 estados y las 4 marcas con su ícono lucide (strokeWidth 2.4, 16 px) y su texto exacto; «Sin asignar» con borde punteado, «Urgente» con fondo --marca-urgente-fondo, «En ejecución» con el punto lima.
3. Boton: variantes primario, secundario y peligro; estados de DESIGN.md §5.6; prop cargando muestra «Guardando…» sin girar; prop motivoDeshabilitado muestra el motivo.
4. Avisos: un <ContenedorAvisos/> basado en sonner (ya instalado en components/ui) con el estilo de DESIGN.md §5.8, y avisar({ variante, mensaje, accion? }). Variantes: confirmacion, error, por_vencer, tarea_abierta, bloqueo. Error y sin conexión con aria-live assertive.
5. Campo (etiqueta, ayuda, error, obligatorio), CampoTexto, AreaTexto y Casilla.
6. app/catalogo/page.tsx: una sección por componente con todos sus estados y datos de ejemplo de docs/diseno/bocetos.html (marcados «Datos de ejemplo»).
Reglas: solo tokens (clases de Tailwind mapeadas o var(--…)), radio 0, foco lima, 48 px de alto en controles, textos en español en «tú» sin signos de exclamación. Los componentes no importan lib/supabase ni hacen fetch.
Haz estos commits, en este orden: docs(specs): componentes base de la interfaz; feat(ui): insignias de estado y marcas; feat(ui): botones primario, secundario y peligro; feat(ui): avisos de confirmación, error y bloqueo; feat(ui): campo de formulario y casilla; feat(catalogo): catálogo de componentes base con datos de ejemplo. Antes de abrir el PR: npm run lint && npm run typecheck && npm run build, y revisa /catalogo en 390 y 1280 px con teclado.
Skills de Cursor para este paso (docs/plan/skills.md): /frontend-design para criterio de tipografía y composición dentro de DESIGN.md, sin cambiar la dirección visual; /accessibility para foco, contraste y nombres accesibles; /ux-writing para textos de botones y avisos; /web-design-guidelines para auditoría de los componentes antes del PR. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P2» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P3 · Lógica de estados y de tiempo

- **Rama:** `feat/estados-tarea`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P3` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): casos de estados, marcas y temporizador`
  2. `test(estados): casos de R11 y R12`
  3. `feat(estados): calcular estado y marcas de una tarea`
  4. `feat(tiempo): temporizador y horas en America/Guayaquil`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P3), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/prd/PRD.md (R10–R15, R24) y DESIGN.md (4.2, 4.3, 5.2 y D-20). Estás en la rama feat/estados-tarea. Solo puedes crear o modificar lib/estados.ts, lib/tiempo.ts, lib/__tests__/ y docs/specs/04-estados.md.
Objetivo: una sola fuente de verdad en TypeScript para el estado, las marcas y el temporizador de una tarea.
1. Escribe docs/specs/04-estados.md con una tabla de al menos 16 casos (entrada: responsables, pasos marcados, completada, vence_en, ahora, urgente, editando_desde, completada_en → salida: estado, marcas, temporizador). Incluye los bordes: el minuto exacto del vencimiento (Vencida desde ese minuto, R11), 60 min exactos (por vencer), Sin asignar con pasos marcados (R6), completada fuera de hora (R24), bloqueo de más de 15 min (S-48). Commit: docs(specs): casos de estados, marcas y temporizador.
2. Escribe primero las pruebas en Vitest con esa tabla (test(estados): …) y luego la implementación pura en lib/estados.ts (sin Supabase, sin Date.now(): ahora entra por parámetro).
3. lib/tiempo.ts: temporizador(tarea, ahora): TemporizadorVista con palabra, valor y tono, y formatearHora() en America/Guayaquil con Intl.DateTimeFormat.
Haz estos commits, en este orden: docs(specs): casos de estados, marcas y temporizador; test(estados): casos de R11 y R12; feat(estados): calcular estado y marcas de una tarea; feat(tiempo): temporizador y horas en America/Guayaquil. Verifica con npm test y deja en la sección 7 de la spec el resultado de comparar 5 casos con la vista tareas_vista.
El commit «docs(plan): tomar P3» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P4 · Navegación, login visual y aviso sin conexión

- **Rama:** `feat/layout-navegacion`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 15 min
- **Depende de:** P2 mergeado.
- **Archivos y carpetas del paso:** `components/layout/MarcoApp.tsx`, `BarraInferior.tsx`, `BarraSuperior.tsx`, `BandaSinConexion.tsx`, `use-en-linea.ts`, `components/pantallas/LoginVista.tsx`, sección nueva en `app/catalogo/page.tsx`, `docs/specs/05-layout-navegacion.md`.
- **Spec antes de programar:** `docs/specs/05-layout-navegacion.md`.
- **Criterios de aceptación:**
  - [ ] Barra inferior en el celular y barra superior en escritorio con los destinos de DESIGN.md §5.11: estudiante «Mis tareas», «Completadas», «Perfil»; administrador «Tablero», «Tareas», «Estudiantes», «Usuarios»; activo en blanco con punto lima.
  - [ ] La barra superior salta de línea si no alcanza el ancho, sin scroll horizontal en 360 px (D-15).
  - [ ] `useEnLinea()` devuelve si hay conexión (eventos online/offline) y `BandaSinConexion` muestra el texto exacto de DESIGN.md §5.8, fija arriba, mientras no haya internet (R19, M14, D-11).
  - [ ] `LoginVista` recibe una acción de formulario y un error, con campos de correo y contraseña, botón primario «Entrar» y el error con ícono (R1, R37).
  - [ ] Todo aparece en `/catalogo`, incluida la banda al simular sin conexión.
- **Skills de Cursor** ([skills.md](skills.md)): `mobile-first-responsive` (barras, navegación y banda en 360–1280 px); `accessibility` (navegación con teclado y anuncios de la banda); `ux-writing` (textos del login y de la banda); `web-design-guidelines` (auditoría antes del PR)
- **Commits, en este orden:**
  0. `docs(plan): tomar P4` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): navegación, login visual y aviso sin conexión`
  2. `feat(layout): marco de la app con barra inferior y superior`
  3. `feat(layout): banda sin conexión y detector de conexión`
  4. `feat(pantallas): vista de inicio de sesión`
  5. `feat(catalogo): navegación, login y banda sin conexión`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P4), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, DESIGN.md (5.8, 5.11, 6.3, 7 y 8) y mira las barras de docs/diseno/bocetos.html. Estás en la rama feat/layout-navegacion. Solo puedes crear o modificar components/layout/, components/pantallas/LoginVista.tsx, app/catalogo/ y docs/specs/05-layout-navegacion.md.
Objetivo: el marco de navegación de la app, la vista de inicio de sesión y el aviso sin conexión, presentacionales y con las props de docs/specs/01-contratos-ui.md.
1. Escribe primero docs/specs/05-layout-navegacion.md con la plantilla. Commit: docs(specs): navegación, login visual y aviso sin conexión.
2. MarcoApp({ rol, destinoActivo, nombreUsuario, accionCerrarSesion, children }): muestra BandaSinConexion cuando useEnLinea() es false, y la barra inferior (celular, ≤ 768 px) o superior (escritorio) con los destinos de DESIGN.md 5.11 como enlaces (next/link), ícono lucide 24 px y texto, activo con punto lima, área táctil de 48 px. Las rutas de cada destino están en el Anexo A del plan.
3. use-en-linea.ts (hook de cliente con navigator.onLine y eventos online/offline) y BandaSinConexion({ visible }) con el texto «Sin conexión. No puedes marcar pasos hasta que vuelva internet.», fija arriba, borde inferior ámbar de 4 px y role="status".
4. LoginVista({ accion, error?, cargando? }): título «Entrar», campos Correo y Contraseña con el Campo de components/ui-i2h, botón primario «Entrar» de 56 px en el celular, y el error con el Aviso de error. Sin enlace de registro (W1).
5. Agrega una sección al catálogo para cada pieza, con un interruptor para simular sin conexión.
Haz estos commits, en este orden: docs(specs): navegación, login visual y aviso sin conexión; feat(layout): marco de la app con barra inferior y superior; feat(layout): banda sin conexión y detector de conexión; feat(pantallas): vista de inicio de sesión; feat(catalogo): navegación, login y banda sin conexión. Antes del PR: lint, typecheck, build y revisión en 360, 390 y 1280 px con teclado.
Skills de Cursor para este paso (docs/plan/skills.md): /mobile-first-responsive para barras, navegación y banda en 360–1280 px; /accessibility para navegación con teclado y anuncios de la banda; /ux-writing para textos del login y de la banda; /web-design-guidelines para auditoría antes del PR. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P4» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P5 · Autenticación, perfiles y super administrador

- **Rama:** `feat/auth-roles`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 15 min
- **Depende de:** P1 mergeado. P4 mergeado para conectar `LoginVista` (si aún no está, empieza por la parte de servidor).
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
  0. `docs(plan): tomar P5` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): autenticación, perfiles y super administrador`
  2. `feat(auth): iniciar y cerrar sesión con correo y contraseña`
  3. `feat(auth): proteger rutas por perfil con proxy.ts`
  4. `feat(auth): script para crear el super administrador único`
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
Haz estos commits, en este orden: docs(specs): autenticación, perfiles y super administrador; feat(auth): iniciar y cerrar sesión con correo y contraseña; feat(auth): proteger rutas por perfil con proxy.ts; feat(auth): script para crear el super administrador único. Verifica: login correcto e incorrecto, redirecciones por perfil, y que el script corrido dos veces no crea un segundo super administrador.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions); /supabase-postgres-best-practices para políticas que leen el perfil y el rol. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P5» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P6 · Componentes del formulario de tarea

- **Rama:** `feat/ui-formulario-tarea`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** P2 mergeado.
- **Archivos y carpetas del paso:** `components/ui-i2h/EditorPasos.tsx`, `SelectorResponsables.tsx`, `CasillaUrgente.tsx`, `components/pantallas/FormularioTareaVista.tsx`, sección en `app/catalogo/page.tsx`, `docs/specs/07-ui-formulario-tarea.md`.
- **Spec antes de programar:** `docs/specs/07-ui-formulario-tarea.md`.
- **Criterios de aceptación:**
  - [ ] `FormularioTareaVista` con los campos de DESIGN.md §5.5 y PRD R7: nombre, descripción (opcional), fecha y hora de vencimiento, lugar o aula, pasos (al menos uno) y responsables; cada obligatorio dice «(obligatorio)».
  - [ ] `EditorPasos` agrega y quita pasos; no deja quitar el último y lo explica (R7).
  - [ ] `SelectorResponsables` muestra nombre y disponibilidad; las personas no disponibles salen deshabilitadas con su motivo, salvo si la tarea es urgente (R28, DESIGN.md §5.5).
  - [ ] Los errores de cada campo llegan por props y se muestran con borde rojo, ícono y mensaje (D-13).
  - [ ] Todo en `/catalogo` con datos de ejemplo de los bocetos.
- **Skills de Cursor** ([skills.md](skills.md)): `accessibility` (etiquetas, errores ligados con aria-describedby y orden de foco del formulario); `ux-writing` (etiquetas, ayudas y errores); `web-design-guidelines` (auditoría antes del PR)
- **Commits, en este orden:**
  0. `docs(plan): tomar P6` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): componentes del formulario de tarea`
  2. `feat(ui): editor de pasos del checklist`
  3. `feat(ui): selector de responsables con disponibilidad`
  4. `feat(pantallas): vista del formulario de tarea`
  5. `feat(catalogo): formulario de tarea con datos de ejemplo`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P6), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, DESIGN.md 5.5 y PRD R7, R8, R27 y R28. Mira la sección «Tareas, edición y asignación» de docs/diseno/bocetos.html. Estás en la rama feat/ui-formulario-tarea. Solo puedes crear o modificar components/ui-i2h/EditorPasos.tsx, SelectorResponsables.tsx, CasillaUrgente.tsx, components/pantallas/FormularioTareaVista.tsx, app/catalogo/ y docs/specs/07-ui-formulario-tarea.md.
Objetivo: el formulario de tarea, presentacional, con las props de docs/specs/01-contratos-ui.md.
1. Escribe primero docs/specs/07-ui-formulario-tarea.md. Commit: docs(specs): componentes del formulario de tarea.
2. EditorPasos({ pasos, onChange, error? }): lista de campos con «+ Agregar paso» y «×» para quitar (botón de 48 px con nombre accesible); no se puede quitar el último paso.
3. SelectorResponsables({ opciones, urgente, onAlternar }): cada OpcionResponsable es un botón con aria-pressed, casilla, nombre y disponibilidadTexto; si disponible es false y urgente es false, va deshabilitado con su motivo.
4. CasillaUrgente({ marcada, onChange }) con la nota «Urgente: se asigna a todos los estudiantes, estén o no disponibles».
5. FormularioTareaVista({ modo: 'crear' | 'editar', valores, opciones, errores, accion, cargando }): usa Campo, EditorPasos, SelectorResponsables, CasillaUrgente y un botón primario «Guardar tarea» y uno secundario «Cancelar». Los campos tienen name para FormData.
6. Agrega al catálogo el formulario vacío, con errores y en modo editar.
Haz estos commits, en este orden: docs(specs): componentes del formulario de tarea; feat(ui): editor de pasos del checklist; feat(ui): selector de responsables con disponibilidad; feat(pantallas): vista del formulario de tarea; feat(catalogo): formulario de tarea con datos de ejemplo. Antes del PR: lint, typecheck, build, revisión en 390 y 1280 px con teclado.
Skills de Cursor para este paso (docs/plan/skills.md): /accessibility para etiquetas, errores ligados con aria-describedby y orden de foco del formulario; /ux-writing para etiquetas, ayudas y errores; /web-design-guidelines para auditoría antes del PR. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P6» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P7 · Crear tareas y asignar responsables

- **Rama:** `feat/tareas-crear`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P7` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): crear tareas y asignar responsables`
  2. `feat(tareas): validación y consulta de tareas`
  3. `feat(tareas): acción para crear una tarea con pasos y responsables`
  4. `feat(tareas): pantallas de lista y nueva tarea`
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
Haz estos commits, en este orden: docs(specs): crear tareas y asignar responsables; feat(tareas): validación y consulta de tareas; feat(tareas): acción para crear una tarea con pasos y responsables; feat(tareas): pantallas de lista y nueva tarea. Verifica: crear con todos los datos, sin pasos, sin hora, sin responsables (queda Sin asignar) y como estudiante (rechazado).
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para inserciones de tarea, pasos y responsables en una transacción; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P7» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P8 · Componentes de tarea, checklist y deslizar para completar

- **Rama:** `feat/ui-tarea`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 2 h
- **Depende de:** P2 mergeado.
- **Archivos y carpetas del paso:** `components/ui-i2h/TarjetaTarea.tsx`, `TarjetaSenal.tsx`, `Temporizador.tsx`, `BarraProgreso.tsx`, `ItemChecklist.tsx`, `DeslizarParaCompletar.tsx`, `components/pantallas/DetalleTareaVista.tsx`, `components/pantallas/MisTareasVista.tsx`, sección en `app/catalogo/page.tsx`, `docs/specs/10-ui-tarea.md`.
- **Spec antes de programar:** `docs/specs/10-ui-tarea.md`.
- **Criterios de aceptación:**
  - [ ] `TarjetaTarea` con la anatomía de DESIGN.md §5.2: insignias, temporizador con su palabra, nombre, lugar, barra «3 de 5 pasos», iniciales; variantes de los 5 estados y bloqueada «En edición» (R30, D-20, D-14 visual).
  - [ ] `TarjetaSenal` (una por vista) con «VENCE PRIMERO» y la cifra en Big Shoulders (DESIGN.md §5.3, D-08).
  - [ ] `ItemChecklist` de 56 px con sin marcar, marcado con autor y hora, foco, sin conexión con candado y solo lectura (DESIGN.md §5.4, R23, D-06).
  - [ ] `DeslizarParaCompletar` bloqueado con el motivo («Faltan 2 pasos y la observación»), listo, arrastrando, completado y sin conexión; con teclado funciona como botón «Completar tarea» con confirmación (DESIGN.md §5.7, R16, D-12).
  - [ ] `DetalleTareaVista` y `MisTareasVista` arman la pantalla del estudiante como en los bocetos, solo con props.
  - [ ] Todo en `/catalogo` con los datos de ejemplo de los bocetos.
- **Skills de Cursor** ([skills.md](skills.md)): `accessibility` (checklist y deslizador con teclado y lector de pantalla); `mobile-first-responsive` (áreas de 56 px y uso con el pulgar); `frontend-design` (movimiento con criterio y reducir movimiento); `web-design-guidelines` (auditoría antes del PR)
- **Commits, en este orden:**
  0. `docs(plan): tomar P8` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): componentes de tarea, checklist y deslizar`
  2. `feat(ui): tarjeta de tarea, temporizador y barra de progreso`
  3. `feat(ui): tarjeta señal`
  4. `feat(ui): ítem de checklist`
  5. `feat(ui): deslizar para completar`
  6. `feat(pantallas): vistas de mis tareas y detalle de tarea`
  7. `feat(catalogo): tarjetas, checklist y deslizar con datos de ejemplo`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P8), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, DESIGN.md 5.2, 5.3, 5.4, 5.7, 6.3 y 9, y la sección «Estudiante en el celular» de docs/diseno/bocetos.html (abre el archivo en el navegador y prueba la interacción). Estás en la rama feat/ui-tarea. Solo puedes crear o modificar los archivos del paso P8 en components/ui-i2h/, components/pantallas/, app/catalogo/ y docs/specs/10-ui-tarea.md.
Objetivo: los componentes de la tarea para el estudiante y el tablero, presentacionales, con las props de docs/specs/01-contratos-ui.md.
1. Escribe primero docs/specs/10-ui-tarea.md. Commit: docs(specs): componentes de tarea, checklist y deslizar.
2. Temporizador({ t: TemporizadorVista }), BarraProgreso({ marcados, total }) (6 px, degradado --progreso, texto «3 de 5 pasos» siempre visible) y TarjetaTarea({ tarea: TareaTarjeta, href? }) como en DESIGN.md 5.2; si tarea.marcas incluye en_edicion, la tarjeta no es enlace y muestra «En edición · Nombre».
3. TarjetaSenal({ tarea }): fondo morado, texto tinta, kicker «VENCE PRIMERO · FALTAN», cifra en Big Shoulders; barrido de 900 ms una vez y nada con prefers-reduced-motion.
4. ItemChecklist({ paso, sinConexion?, soloLectura?, onAlternar }): role="checkbox", 56 px, casilla lima con ✓ en tinta, autor y hora debajo; sin conexión muestra candado y «Sin conexión» y no llama a onAlternar.
5. DeslizarParaCompletar({ bloqueado, motivo?, sinConexion?, completada?, onCompletar }): pista de 56 px, pulgar de 48 px, arrastre con pointer events, completa al pasar el 85 %; con Enter o espacio pide confirmación y llama a onCompletar.
6. MisTareasVista({ senal?, tareas, completadas }) y DetalleTareaVista({ tarea: TareaDetalle, sinConexion, observacion, onAlternarPaso, onCambiarObservacion, onCompletar, motivoBloqueo? }).
7. Agrega todo al catálogo con los datos de los bocetos (Preparar Sala 3, 3 de 5 pasos, faltan 42 min, etc.).
Haz estos commits, en este orden: docs(specs): componentes de tarea, checklist y deslizar; feat(ui): tarjeta de tarea, temporizador y barra de progreso; feat(ui): tarjeta señal; feat(ui): ítem de checklist; feat(ui): deslizar para completar; feat(pantallas): vistas de mis tareas y detalle de tarea; feat(catalogo): tarjetas, checklist y deslizar con datos de ejemplo. Antes del PR: lint, typecheck, build y revisión en 360, 390 y 1280 px, con teclado y con reducir movimiento (D-05, D-06, D-15, D-16).
Skills de Cursor para este paso (docs/plan/skills.md): /accessibility para checklist y deslizador con teclado y lector de pantalla; /mobile-first-responsive para áreas de 56 px y uso con el pulgar; /frontend-design para movimiento con criterio y reducir movimiento; /web-design-guidelines para auditoría antes del PR. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P8» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P9 · Ejecución: lista del estudiante, marcar pasos y completar

- **Rama:** `feat/ejecucion`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 30 min
- **Depende de:** P7 y P8 mergeados (P4 para la banda sin conexión).
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
  0. `docs(plan): tomar P9` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): ejecución de tareas por el estudiante`
  2. `feat(bd): funciones para marcar pasos y completar tareas`
  3. `feat(ejecucion): acciones de marcar, observar y completar`
  4. `feat(ejecucion): lista de mis tareas con tarjeta señal`
  5. `feat(ejecucion): detalle de tarea con checklist y deslizar para completar`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P9), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 04-estados.md, 10-ui-tarea.md y PRD R9, R11, R15–R20, R23, R35. Estás en la rama feat/ejecucion. Solo puedes crear o modificar app/(estudiante)/, lib/ejecucion/, una migración nueva supabase/migrations/<fecha>_ejecucion.sql y docs/specs/11-ejecucion.md.
Objetivo: el estudiante ejecuta sus tareas con datos reales.
1. Escribe docs/specs/11-ejecucion.md (funciones RPC, validaciones y mensajes). Commit: docs(specs): ejecución de tareas por el estudiante.
2. Migración con funciones SECURITY DEFINER y search_path fijo: marcar_paso(p_paso uuid, p_marcado boolean) y completar_tarea(p_tarea uuid, p_observacion text). Comprueban que auth.uid() es responsable (las urgentes ya tienen a todos los estudiantes como responsables, R27), que la tarea no está completada y, para completar, que todos los pasos están marcados y la observación no está vacía; registran marcado_por/en, iniciada_por/en y completada_por/en, y fuera_de_hora si now() ≥ vence_en. Errores con mensajes en español. No implementes todavía la regla de una tarea abierta a la vez ni la de terminar una vencida (paso P18): deja un TODO con la R# en la spec, no en el código.
3. lib/ejecucion/acciones.ts: acciones de servidor que llaman a las RPC y devuelven ResultadoAccion.
4. app/(estudiante)/mis-tareas/page.tsx con MisTareasVista; app/(estudiante)/tarea/[id]/page.tsx con DetalleTareaVista dentro de MarcoApp; el componente de cliente usa useEnLinea() para bloquear y mostrar la banda; actualiza la vista de forma optimista y revierte con aviso de error si falla.
5. app/(estudiante)/completadas/page.tsx mínima con las completadas del estudiante (R34).
Haz estos commits, en este orden: docs(specs): ejecución de tareas por el estudiante; feat(bd): funciones para marcar pasos y completar tareas; feat(ejecucion): acciones de marcar, observar y completar; feat(ejecucion): lista de mis tareas con tarjeta señal; feat(ejecucion): detalle de tarea con checklist y deslizar para completar. Verifica con un estudiante: marcar y desmarcar en cualquier orden, intentar completar sin observación, completar, y probar sin conexión con las herramientas del navegador.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para funciones RPC SECURITY DEFINER y bloqueos cortos; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P9» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P10 · Componentes del tablero de cumplimiento

- **Rama:** `feat/ui-tablero`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** P8 mergeado.
- **Archivos y carpetas del paso:** `components/ui-i2h/TotalesPorEstado.tsx`, `IndicadorCumplimiento.tsx`, `GrupoTareas.tsx`, `PanelFiltros.tsx`, `components/pantallas/TableroVista.tsx`, sección en `app/catalogo/page.tsx`, `docs/specs/12-ui-tablero.md`.
- **Spec antes de programar:** `docs/specs/12-ui-tablero.md`.
- **Criterios de aceptación:**
  - [ ] Totales por estado (los 5 y «Por vencer» aparte) con cifra en Big Shoulders e insignia (R33, DESIGN.md §5.9).
  - [ ] Indicador circular con la cifra en lima («62 %») y barra «18 de 29 tareas completadas» (DESIGN.md §5.9).
  - [ ] Grupos en el orden de R31 con su título y su total, en cuadrícula de tarjetas en escritorio y una columna en el celular (R31, D-17).
  - [ ] Panel de filtros con «Por vencer» y los órdenes de R32 como botones con aria-pressed; el activo con borde morado y «✓».
  - [ ] Estados vacío, cargando (sin brillo animado) y filtro sin resultados (DESIGN.md §5.9).
- **Skills de Cursor** ([skills.md](skills.md)): `mobile-first-responsive` (cuadrícula del tablero en 360, 768 y 1280 px); `accessibility` (filtros y totales con teclado); `web-design-guidelines` (auditoría antes del PR)
- **Commits, en este orden:**
  0. `docs(plan): tomar P10` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): componentes del tablero de cumplimiento`
  2. `feat(ui): totales por estado e indicador de cumplimiento`
  3. `feat(ui): grupos de tareas y panel de filtros`
  4. `feat(pantallas): vista del tablero`
  5. `feat(catalogo): tablero con datos de ejemplo`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P10), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, DESIGN.md 5.9 y 9 (D-17), PRD R30–R34, y la sección «Administrador en el escritorio» de docs/diseno/bocetos.html. Estás en la rama feat/ui-tablero. Solo puedes crear o modificar los archivos del paso P10 en components/ui-i2h/, components/pantallas/TableroVista.tsx, app/catalogo/ y docs/specs/12-ui-tablero.md.
Objetivo: los componentes del tablero de cumplimiento, presentacionales, con las props de docs/specs/01-contratos-ui.md.
1. Escribe primero docs/specs/12-ui-tablero.md. Commit: docs(specs): componentes del tablero de cumplimiento.
2. TotalesPorEstado({ totales: TotalesTablero }) e IndicadorCumplimiento({ completadas, total }) (el círculo es la única forma curva; la cifra lima es la única cifra lima de la vista).
3. GrupoTareas({ titulo, cantidad, tono?, children }) y PanelFiltros({ porVencer, orden, ordenes, onCambiar }): ordenes es una lista { clave, texto } que llega por props (hoy: «Más cerca de vencer», «Más reciente», «Por estado»).
4. TableroVista({ totales, grupos: { clave, titulo, tareas: TareaTarjeta[] }[], porVencer, orden, onCambiar }): cuadrícula de TarjetaTarea (mínimo 320 px) en escritorio, una columna en el celular; estados vacío («Todavía no hay tareas. Crear la primera»), cargando y sin resultados («No hay tareas por vencer.»).
5. Agrega al catálogo el tablero con los datos de los bocetos (4, 2, 3, 4, 1, 18; 62 %).
Haz estos commits, en este orden: docs(specs): componentes del tablero de cumplimiento; feat(ui): totales por estado e indicador de cumplimiento; feat(ui): grupos de tareas y panel de filtros; feat(pantallas): vista del tablero; feat(catalogo): tablero con datos de ejemplo. Antes del PR: lint, typecheck, build y revisión en 390 y 1280 px.
Skills de Cursor para este paso (docs/plan/skills.md): /mobile-first-responsive para cuadrícula del tablero en 360, 768 y 1280 px; /accessibility para filtros y totales con teclado; /web-design-guidelines para auditoría antes del PR. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P10» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P11 · Tablero con datos reales

- **Rama:** `feat/tablero`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P11` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): tablero de cumplimiento con datos reales`
  2. `test(tablero): agrupación y totales según R31 y R33`
  3. `feat(tablero): agrupar, ordenar y contar tareas`
  4. `feat(tablero): página del tablero del administrador`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P11), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/04-estados.md, 12-ui-tablero.md y PRD R30–R34. Estás en la rama feat/tablero. Solo puedes crear o modificar app/(admin)/tablero/, lib/tablero/, lib/__tests__/tablero.test.ts y docs/specs/13-tablero.md.
Objetivo: el tablero de cumplimiento del administrador con datos reales.
1. Escribe docs/specs/13-tablero.md. Commit: docs(specs): tablero de cumplimiento con datos reales.
2. Pruebas primero: lib/tablero/agrupar.ts agrupa en el orden de R31 (una tarea en un solo grupo; por vencer va en «Por vencer»; urgentes primero dentro de su grupo, R27), ordena por cercanía o por reciente, y cuenta totales (R33).
3. app/(admin)/tablero/page.tsx (Server Component) lee tareas_vista y responsables, mapea a TareaTarjeta y pasa todo a TableroVista; un componente de cliente recalcula estado y temporizador cada minuto con lib/estados.ts y maneja el filtro y el orden en la URL (?porVencer=1&orden=vencimiento).
Haz estos commits, en este orden: docs(specs): tablero de cumplimiento con datos reales; test(tablero): agrupación y totales según R31 y R33; feat(tablero): agrupar, ordenar y contar tareas; feat(tablero): página del tablero del administrador. Verifica con datos que tengan los cinco estados y una tarea a menos de 60 min.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para consultas del tablero con columnas explícitas e índices. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P11» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P12 · Revisión de diseño del MVP

- **Rama:** `docs/revision-diseno-mvp`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 45 min
- **Depende de:** P11 mergeado y desplegado en la vista previa.
- **Archivos y carpetas del paso:** `docs/qa/revision-diseno-mvp.md` (y correcciones solo en `components/ui-i2h/`, `components/layout/` y `components/pantallas/`).
- **Spec antes de programar:** No aplica: se usa DESIGN.md §9 (D-01 a D-20) como lista.
- **Criterios de aceptación:**
  - [ ] Cada criterio D-01 a D-20 revisado en las pantallas reales (login, mis tareas, detalle, tablero, tareas) en 360, 390 y 1280 px, con «pasa», «no pasa» o «no aplica» y una captura o nota.
  - [ ] Lo que no pasa y es de las carpetas de componentes queda corregido en la misma rama con `fix(ui): …`; lo que es de otras carpetas queda anotado para su dueño.
- **Skills de Cursor** ([skills.md](skills.md)): `impeccable` (/impeccable critique y /impeccable audit de las pantallas del MVP); `ui-design-critique` (informe en español contra D-01 a D-20); `web-design-guidelines` (hallazgos con archivo y línea)
- **Commits, en este orden:**
  0. `docs(plan): tomar P12` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(qa): revisión de diseño del MVP contra D-01 a D-20`
  2. `fix(ui): correcciones de la revisión de diseño del MVP`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md secciones 6, 8 y 9 y docs/plan/PLAN.md (paso P12). Estás en la rama docs/revision-diseno-mvp. Solo puedes crear docs/qa/revision-diseno-mvp.md y corregir archivos de components/ui-i2h/, components/layout/ y components/pantallas/.
Objetivo: revisar las pantallas reales del MVP contra los criterios D-01 a D-20.
1. Abre la vista previa de Vercel (o npm run dev) con un usuario administrador y otro estudiante de prueba.
2. Corre /impeccable critique y /impeccable audit sobre login, mis tareas, detalle de tarea, tablero y tareas (nunca /impeccable init ni /impeccable document; si Impeccable pide crear PRODUCT.md o DESIGN.md, responde que no: el contexto es docs/prd/PRD.md y DESIGN.md). Impeccable recomienda; DESIGN.md decide. Luego, para cada criterio D-01 a D-20, haz la comprobación que indica DESIGN.md sección 9 en esas pantallas, en 360, 390 y 1280 px. Anota en docs/qa/revision-diseno-mvp.md una tabla: criterio, pantalla, resultado (pasa / no pasa / no aplica) y nota. Commit: docs(qa): revisión de diseño del MVP contra D-01 a D-20.
3. Corrige lo que no pasa dentro de tus carpetas, sin cambiar las props de docs/specs/01-contratos-ui.md. Commit: fix(ui): correcciones de la revisión de diseño del MVP.
4. Lo que dependa de otras carpetas, déjalo en una sección «Pendiente para otras carpetas» del mismo documento y en el PR.
Skills de Cursor para este paso (docs/plan/skills.md): /impeccable critique y /impeccable audit de las pantallas del MVP; /ui-design-critique para informe en español contra D-01 a D-20; /web-design-guidelines para hallazgos con archivo y línea. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P12» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

### 5.3 Fase 2 · Resto de los Must

Objetivo: completar los 15 Must del PRD. No se abre ningún paso de la Fase 3 mientras quede uno de esta fase sin mergear.


#### P13 · Pantallas de usuarios, estudiantes, perfil y completadas

- **Rama:** `feat/ui-pantallas`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 2 h
- **Depende de:** P2 mergeado (puede empezar en cuanto termine P12).
- **Archivos y carpetas del paso:** `components/ui-i2h/FilaUsuario.tsx`, `FilaEstudiante.tsx`, `EditorDisponibilidad.tsx`, `DialogoConfirmar.tsx`, `EstadoVacio.tsx`, `EstadoCargando.tsx`, `components/pantallas/UsuariosVista.tsx`, `FormularioUsuarioVista.tsx`, `EstudiantesVista.tsx`, `PerfilVista.tsx`, `CompletadasVista.tsx`, sección en `app/catalogo/page.tsx`, `docs/specs/14-ui-pantallas.md`.
- **Spec antes de programar:** `docs/specs/14-ui-pantallas.md`.
- **Criterios de aceptación:**
  - [ ] `FilaUsuario` muestra nombre, correo, teléfono e insignia de perfil; la del super administrador no tiene «Eliminar» ni «Cambiar contraseña» (R3, DESIGN.md §5.10).
  - [ ] `FormularioUsuarioVista` con nombre, correo, teléfono, perfil, contraseña inicial y disponibilidad por día y hora (`EditorDisponibilidad`) (M3, R4, R28).
  - [ ] `FilaEstudiante` y `EstudiantesVista`: cuántas tareas tiene y «Sin tareas» en ámbar, y su disponibilidad del día; hueco opcional para las horas que le quedan (R36, M13, SH5).
  - [ ] `PerfilVista` con nombre, correo, teléfono y el formulario para cambiar la contraseña (R5, M2).
  - [ ] `CompletadasVista` con las tarjetas completadas en solo lectura (R34).
  - [ ] `DialogoConfirmar` para eliminar y reabrir (DESIGN.md §5.6); `EstadoVacio` y `EstadoCargando` sin animación de brillo.
- **Skills de Cursor** ([skills.md](skills.md)): `mobile-first-responsive` (listas y formularios en celular y escritorio); `accessibility` (formularios, diálogo de confirmación y estados vacíos); `ux-writing` (textos de vacío, error y confirmación); `web-design-guidelines` (auditoría antes del PR)
- **Commits, en este orden:**
  0. `docs(plan): tomar P13` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): pantallas de usuarios, estudiantes, perfil y completadas`
  2. `feat(ui): filas de usuario y de estudiante`
  3. `feat(ui): editor de disponibilidad`
  4. `feat(ui): diálogo de confirmación y estados vacío y cargando`
  5. `feat(pantallas): vistas de usuarios, estudiantes, perfil y completadas`
  6. `feat(catalogo): pantallas de usuarios, estudiantes, perfil y completadas`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P13), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, DESIGN.md 5.5, 5.6, 5.10 y la sección «Super administrador» de docs/diseno/bocetos.html, y PRD R2–R6, R28, R34, R36. Estás en la rama feat/ui-pantallas. Solo puedes crear o modificar los archivos del paso P13 en components/ui-i2h/, components/pantallas/, app/catalogo/ y docs/specs/14-ui-pantallas.md.
Objetivo: las pantallas de gestión de usuarios, panel de estudiantes, perfil y completadas, presentacionales, con las props de docs/specs/01-contratos-ui.md.
1. Escribe primero docs/specs/14-ui-pantallas.md. Commit: docs(specs): pantallas de usuarios, estudiantes, perfil y completadas.
2. FilaUsuario({ usuario: UsuarioFila, onEditar?, onEliminar?, onCambiarContrasena? }): si usuario.esSuperAdmin, sin acciones y con «Fijo · no se puede eliminar». FilaEstudiante({ estudiante: EstudianteFila, href? }).
3. EditorDisponibilidad({ bloques, dias, onChange }): filas de día + desde + hasta, agregar y quitar.
4. DialogoConfirmar({ abierto, titulo, mensaje, textoConfirmar, variante, onConfirmar, onCancelar }) sobre el dialog de shadcn; EstadoVacio({ mensaje, accion? }); EstadoCargando({ filas }).
5. UsuariosVista, FormularioUsuarioVista({ modo, valores, errores, accion, cargando }), EstudiantesVista, PerfilVista({ perfil, accionCambiarContrasena, error? }) y CompletadasVista({ tareas }).
6. Agrega todo al catálogo con los datos de los bocetos.
Haz estos commits, en este orden: docs(specs): pantallas de usuarios, estudiantes, perfil y completadas; feat(ui): filas de usuario y de estudiante; feat(ui): editor de disponibilidad; feat(ui): diálogo de confirmación y estados vacío y cargando; feat(pantallas): vistas de usuarios, estudiantes, perfil y completadas; feat(catalogo): pantallas de usuarios, estudiantes, perfil y completadas. Antes del PR: lint, typecheck, build y revisión en 390 y 1280 px con teclado.
Skills de Cursor para este paso (docs/plan/skills.md): /mobile-first-responsive para listas y formularios en celular y escritorio; /accessibility para formularios, diálogo de confirmación y estados vacíos; /ux-writing para textos de vacío, error y confirmación; /web-design-guidelines para auditoría antes del PR. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P13» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P14 · Usuarios, disponibilidad y contraseñas

- **Rama:** `feat/usuarios`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P14` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): gestión de usuarios, disponibilidad y contraseñas`
  2. `feat(usuarios): crear, editar y eliminar usuarios con disponibilidad`
  3. `feat(usuarios): cambiar contraseñas con la regla del super administrador`
  4. `feat(usuarios): panel de estudiantes`
  5. `feat(usuarios): perfil del usuario`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P14), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 06-auth-perfiles.md, 14-ui-pantallas.md y PRD R1–R6, R28, R36. Estás en la rama feat/usuarios. Solo puedes crear o modificar app/(admin)/usuarios/, app/(admin)/estudiantes/, app/perfil/, lib/usuarios/ y docs/specs/15-usuarios.md.
Objetivo: gestión de usuarios con datos reales.
1. Escribe docs/specs/15-usuarios.md. Commit: docs(specs): gestión de usuarios, disponibilidad y contraseñas.
2. lib/usuarios/acciones.ts con requiereAdmin(): crearUsuario (supabase.auth.admin.createUser con email confirmado y la contraseña que escribe el administrador, más perfil y disponibilidades), editarUsuario, eliminarUsuario (rechaza al super administrador; aplica R6), cambiarContrasenaDe(usuario) (rechaza al super administrador). cambiarMiContrasena() para cualquier sesión.
3. Páginas: /usuarios con UsuariosVista y FormularioUsuarioVista; /estudiantes con EstudiantesVista (número de tareas y disponibilidad del día); /perfil con PerfilVista para ambos perfiles.
4. Confirmación con DialogoConfirmar antes de eliminar; avisos en cada acción (R37).
Haz estos commits, en este orden: docs(specs): gestión de usuarios, disponibilidad y contraseñas; feat(usuarios): crear, editar y eliminar usuarios con disponibilidad; feat(usuarios): cambiar contraseñas con la regla del super administrador; feat(usuarios): panel de estudiantes; feat(usuarios): perfil del usuario. Verifica: intentar borrar o cambiar la contraseña del super administrador desde otro administrador (rechazado en el servidor), eliminar un estudiante con tareas y ver R6.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para perfiles, disponibilidades y políticas; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P14» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P15 · Editar, eliminar y bloqueo «en edición»

- **Rama:** `feat/edicion-bloqueo`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 30 min
- **Depende de:** P7 mergeado (P13 para el diálogo de confirmación).
- **Archivos y carpetas del paso:** `app/(admin)/tareas/[id]/editar/**`, `lib/tareas/edicion.ts`, `supabase/migrations/*_bloqueo.sql`, `docs/specs/16-edicion-bloqueo.md`.
- **Spec antes de programar:** `docs/specs/16-edicion-bloqueo.md`.
- **Criterios de aceptación:**
  - [ ] Se edita solo una tarea Pendiente, o Sin asignar sin pasos marcados; una Sin asignar con pasos marcados solo admite agregar responsables (R21).
  - [ ] Se eliminan solo Pendientes, Sin asignar sin pasos marcados y Vencidas, con confirmación; En ejecución y Completadas no (R22).
  - [ ] Al abrir la edición se toma el bloqueo; la tarjeta muestra «En edición · Nombre» y nadie más puede entrar hasta que se guarde, se cancele, se cierre sesión o pasen 15 minutos sin actividad (R13, S-48, D-14).
  - [ ] Los intentos no permitidos muestran el aviso de bloqueo de DESIGN.md §5.8 (R37).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (bloqueo «en edición» sin carreras (bloqueos cortos))
- **Commits, en este orden:**
  0. `docs(plan): tomar P15` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): edición, eliminación y bloqueo en edición`
  2. `feat(bd): funciones para tomar y liberar el bloqueo de edición`
  3. `feat(tareas): editar tareas según su estado`
  4. `feat(tareas): eliminar tareas según su estado`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P15), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/02-datos-y-rls.md, 08-crear-tarea.md y PRD R13, R21, R22 (S-42, S-48). Estás en la rama feat/edicion-bloqueo. Solo puedes crear o modificar app/(admin)/tareas/[id]/, lib/tareas/edicion.ts, una migración nueva supabase/migrations/<fecha>_bloqueo.sql y docs/specs/16-edicion-bloqueo.md.
Objetivo: editar y eliminar tareas solo cuando el PRD lo permite, con bloqueo de edición.
1. Escribe docs/specs/16-edicion-bloqueo.md. Commit: docs(specs): edición, eliminación y bloqueo en edición.
2. Migración: tomar_bloqueo(p_tarea) (falla si otro administrador tiene un bloqueo con actividad de menos de 15 min), renovar_bloqueo(p_tarea), liberar_bloqueo(p_tarea) y liberar los bloqueos del usuario al cerrar sesión.
3. lib/tareas/edicion.ts: editarTarea y eliminarTarea con las reglas R21 y R22 comprobadas en el servidor con el estado de tareas_vista.
4. app/(admin)/tareas/[id]/editar/page.tsx: toma el bloqueo al entrar, renueva cada 2 minutos con actividad, libera al guardar o cancelar; usa FormularioTareaVista en modo editar.
Haz estos commits, en este orden: docs(specs): edición, eliminación y bloqueo en edición; feat(bd): funciones para tomar y liberar el bloqueo de edición; feat(tareas): editar tareas según su estado; feat(tareas): eliminar tareas según su estado. Verifica D-14 con dos sesiones de administrador.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para bloqueo «en edición» sin carreras (bloqueos cortos). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P15» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P16 · PWA: manifest e íconos

- **Rama:** `feat/pwa`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 45 min
- **Depende de:** P0 mergeado.
- **Archivos y carpetas del paso:** `public/manifest.webmanifest`, `public/iconos/**`, `docs/specs/17-pwa.md`.
- **Spec antes de programar:** `docs/specs/17-pwa.md`.
- **Criterios de aceptación:**
  - [ ] La app se puede instalar en Android y en iOS con nombre, color de fondo y de tema #050307 e íconos de 192, 512 y maskable (DESIGN.md §4, brandboard: ícono de app).
  - [ ] Lighthouse no marca errores de instalabilidad.
  - [ ] No hay trabajo sin conexión: sin internet se ve la banda, no una copia vieja (W3).
- **Skills de Cursor** ([skills.md](skills.md)): `docs de Next.js` (metadata y manifest en node_modules/next/dist/docs/); `web-design-guidelines` (revisión del manifest y de los íconos)
- **Commits, en este orden:**
  0. `docs(plan): tomar P16` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): app instalable`
  2. `feat(pwa): manifest con nombre, colores y pantalla de inicio`
  3. `feat(pwa): íconos de la app`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md sección 4 y docs/plan/PLAN.md (paso P16). Estás en la rama feat/pwa. Solo puedes crear o modificar public/manifest.webmanifest, public/iconos/ y docs/specs/17-pwa.md.
Objetivo: que la herramienta se pueda instalar en el celular.
1. Escribe docs/specs/17-pwa.md. Commit: docs(specs): app instalable.
2. public/manifest.webmanifest: name «Señal de Turno · Staff Interact2Hack», short_name «Señal de Turno», start_url «/», display «standalone», background_color y theme_color #050307, lang «es». Commit: feat(pwa): manifest con nombre, colores y pantalla de inicio.
3. Íconos PNG de 192 y 512 px y uno maskable, en public/iconos/, con fondo negro #050307 y la marca de Señal Neón (usa el ícono de app del brandboard de docs/diseno/ como referencia; sin esquinas redondeadas propias). Commit: feat(pwa): íconos de la app.
4. En el PR, indica a Joshua las dos líneas que hay que agregar en app/layout.tsx (link al manifest y theme-color); no edites ese archivo.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para metadata y manifest en node_modules/next/dist/docs/; /web-design-guidelines para revisión del manifest y de los íconos. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P16» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P17 · Disponibilidad, urgentes y reasignación

- **Rama:** `feat/asignacion-urgentes`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 30 min
- **Depende de:** P14 y P15 mergeados.
- **Archivos y carpetas del paso:** `lib/asignacion/**`, `lib/tareas/**` (para usar la validación al crear y editar), `app/(admin)/tareas/[id]/reasignar/**`, `supabase/migrations/*_asignacion.sql`, `lib/__tests__/asignacion.test.ts`, `docs/specs/18-asignacion-urgentes.md`.
- **Spec antes de programar:** `docs/specs/18-asignacion-urgentes.md`.
- **Criterios de aceptación:**
  - [ ] No se puede asignar a alguien no disponible: la hora de vencimiento debe caer dentro de su horario de ese día; se valida en el servidor (R28, S-45, M5).
  - [ ] Una tarea urgente se asigna a todos los estudiantes, que se suman a los responsables que ya tenía, aunque no estén disponibles; aparece en la lista de todos y primero en su grupo (R27, M12).
  - [ ] Reasignar una vencida exige una nueva hora y permite cambiar responsables; los pasos marcados se conservan y el estado se recalcula (R25, M10).
  - [ ] Avisos de confirmación o error en asignar, marcar urgente y reasignar (R37).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (validación de disponibilidad y asignación masiva de urgentes)
- **Commits, en este orden:**
  0. `docs(plan): tomar P17` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): disponibilidad, urgentes y reasignación`
  2. `test(asignacion): disponibilidad según R28`
  3. `feat(asignacion): validar disponibilidad al asignar`
  4. `feat(asignacion): tareas urgentes para todos los estudiantes`
  5. `feat(asignacion): reasignar tareas vencidas con nueva hora`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P17), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/08-crear-tarea.md, 16-edicion-bloqueo.md y PRD R25, R27, R28 (S-05, S-45). Estás en la rama feat/asignacion-urgentes. Solo puedes crear o modificar lib/asignacion/, lib/tareas/, app/(admin)/tareas/[id]/reasignar/, una migración nueva supabase/migrations/<fecha>_asignacion.sql, lib/__tests__/asignacion.test.ts y docs/specs/18-asignacion-urgentes.md.
Objetivo: aplicar disponibilidad, urgencias y reasignación en el servidor.
1. Escribe docs/specs/18-asignacion-urgentes.md. Commit: docs(specs): disponibilidad, urgentes y reasignación.
2. Pruebas primero de estaDisponible(disponibilidades, venceEn) en hora de Ecuador; luego la implementación en lib/asignacion/ y su uso en las acciones de crear y editar de lib/tareas (llama a lib/asignacion desde ahí; si eso exige tocar lib/tareas, es tu carpeta).
3. Urgente: al marcarla, inserta como responsables a todos los estudiantes (sin duplicar); la vista del estudiante la muestra; en el tablero va primero dentro de su grupo.
4. Reasignar: página y acción que exige nueva vence_en futura y permite cambiar responsables, con la misma validación de disponibilidad.
Haz estos commits, en este orden: docs(specs): disponibilidad, urgentes y reasignación; test(asignacion): disponibilidad según R28; feat(asignacion): validar disponibilidad al asignar; feat(asignacion): tareas urgentes para todos los estudiantes; feat(asignacion): reasignar tareas vencidas con nueva hora.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para validación de disponibilidad y asignación masiva de urgentes. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P17» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P18 · Reglas de ejecución: una tarea abierta y terminar una vencida

- **Rama:** `feat/reglas-ejecucion`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P18` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): una tarea abierta a la vez y terminar una vencida`
  2. `feat(bd): impedir empezar otra tarea con una abierta`
  3. `feat(bd): presencia en la tarea para terminar una vencida`
  4. `feat(ejecucion): avisos de tarea abierta y de fuera de hora`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P18), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/11-ejecucion.md y PRD R17, R18, R24 (S-38, S-41, S-43). Estás en la rama feat/reglas-ejecucion. Solo puedes crear o modificar una migración nueva supabase/migrations/<fecha>_reglas_ejecucion.sql, lib/ejecucion/, app/(estudiante)/tarea/[id]/ y docs/specs/19-reglas-ejecucion.md.
Objetivo: las reglas de ejecución que faltan, aplicadas en Postgres.
1. Escribe docs/specs/19-reglas-ejecucion.md con la definición exacta de «tarea abierta» y de «estar dentro». Commit: docs(specs): una tarea abierta a la vez y terminar una vencida.
2. En marcar_paso: si el usuario tiene otra tarea En ejecución (no vencida) con un paso marcado por él, rechaza con el mensaje de DESIGN.md 5.8 e incluye el id de esa tarea para el enlace.
3. Tabla presencias (tarea, perfil, desde, ultimo_latido) y RPC registrar_presencia(p_tarea) llamada al abrir el detalle y cada minuto; completar_tarea acepta una vencida solo si hay presencia continua desde antes de vence_en (latido de hace ≤ 2 min) y marca fuera_de_hora.
4. En el detalle, muestra el aviso de tarea abierta y el estado de fuera de hora con los componentes existentes.
Haz estos commits, en este orden: docs(specs): una tarea abierta a la vez y terminar una vencida; feat(bd): impedir empezar otra tarea con una abierta; feat(bd): presencia en la tarea para terminar una vencida; feat(ejecucion): avisos de tarea abierta y de fuera de hora. Verifica con dos tareas del mismo estudiante y con una tarea que vence mientras está abierta.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para regla de una tarea abierta a la vez dentro de la función RPC. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P18» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P19 · Tiempo real y aviso «por vencer» dentro de la herramienta

- **Rama:** `feat/tiempo-real`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P19` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): tiempo real y aviso por vencer`
  2. `feat(bd): publicar cambios de tareas y pasos en tiempo real`
  3. `feat(tiempo-real): actualizar tablero y listas al momento`
  4. `feat(tiempo-real): aviso por vencer dentro de la herramienta`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P19), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/11-ejecucion.md, 13-tablero.md y PRD R14, R23 (S-39). Estás en la rama feat/tiempo-real. Solo puedes crear o modificar lib/tiempo-real/, los componentes de cliente de actualización en app/(admin)/tablero/ y app/(estudiante)/mis-tareas/, una migración nueva supabase/migrations/<fecha>_realtime.sql y docs/specs/20-tiempo-real.md.
Objetivo: cambios al momento y aviso por vencer dentro de la herramienta.
1. Escribe docs/specs/20-tiempo-real.md. Commit: docs(specs): tiempo real y aviso por vencer.
2. Migración: agrega tareas, pasos, responsables y observaciones a la publicación supabase_realtime (RLS sigue aplicando).
3. lib/tiempo-real/use-cambios.ts: suscripción con el cliente de navegador que vuelve a pedir los datos (router.refresh o refetch) con un pequeño retraso para agrupar cambios.
4. lib/tiempo-real/use-aviso-por-vencer.ts: cada minuto y en cada cambio, si una tarea visible cruza los 60 min, muestra avisar({ variante: 'por_vencer', … }) una sola vez por tarea (guardado en sessionStorage).
Haz estos commits, en este orden: docs(specs): tiempo real y aviso por vencer; feat(bd): publicar cambios de tareas y pasos en tiempo real; feat(tiempo-real): actualizar tablero y listas al momento; feat(tiempo-real): aviso por vencer dentro de la herramienta. Verifica con dos navegadores: un estudiante marca y el tablero cambia; una tarea creada a 61 min avisa al minuto.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para Realtime y políticas de las tablas publicadas; docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P19» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P20 · Tablero completo y panel de estudiantes conectado

- **Rama:** `feat/tablero-filtros-panel`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** P11, P13 y P14 mergeados.
- **Archivos y carpetas del paso:** `lib/tablero/**`, `app/(admin)/tablero/**`, `app/(admin)/estudiantes/**`, `docs/specs/21-tablero-panel.md`.
- **Spec antes de programar:** `docs/specs/21-tablero-panel.md`.
- **Criterios de aceptación:**
  - [ ] Los tres órdenes de R32 funcionan: cercanía al vencimiento, más reciente a más antigua y por estado; y el filtro «Por vencer» (R32, M11).
  - [ ] Desde el tablero se ve quién inició cada tarea en ejecución, y en el detalle quién marcó cada paso y quién la completó (R23, M9).
  - [ ] Panel de estudiantes con número de tareas, «Sin tareas» y disponibilidad del día, ordenado con los que no tienen tareas primero [SUPUESTO, R36] (M13).
  - [ ] Un administrador que es responsable de una tarea puede ejecutarla desde su detalle con los mismos controles y reglas que un estudiante (R8, D-S-07).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (consultas con filtros y orden)
- **Commits, en este orden:**
  0. `docs(plan): tomar P20` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): tablero completo y panel de estudiantes`
  2. `feat(tablero): todos los órdenes y el filtro por vencer`
  3. `feat(tablero): detalle de la tarea para el administrador`
  4. `feat(estudiantes): panel con tareas y disponibilidad`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P20), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/13-tablero.md, 15-usuarios.md y PRD R23, R32, R36. Estás en la rama feat/tablero-filtros-panel. Solo puedes crear o modificar lib/tablero/, app/(admin)/tablero/, app/(admin)/estudiantes/ y docs/specs/21-tablero-panel.md.
Objetivo: completar el tablero y el panel de estudiantes.
1. Escribe docs/specs/21-tablero-panel.md (marca [SUPUESTO] el orden del panel). Commit: docs(specs): tablero completo y panel de estudiantes.
2. Órdenes 'reciente' y 'estado' en lib/tablero con pruebas; PanelFiltros conectado por la URL.
3. app/(admin)/tablero/[id]/page.tsx: detalle para el administrador con DetalleTareaVista, en solo lectura salvo que sea responsable (entonces usa las acciones de lib/ejecucion, R8), mostrando quién inició, quién marcó cada paso y quién completó.
4. /estudiantes: datos reales en EstudiantesVista.
Haz estos commits, en este orden: docs(specs): tablero completo y panel de estudiantes; feat(tablero): todos los órdenes y el filtro por vencer; feat(tablero): detalle de la tarea para el administrador; feat(estudiantes): panel con tareas y disponibilidad.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para consultas con filtros y orden. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P20» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P21 · Datos de demo y README

- **Rama:** `feat/datos-demo`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 15 min
- **Depende de:** P1 mergeado (formato en `docs/specs/09-datos-demo.md`).
- **Archivos y carpetas del paso:** `datos-demo/demo.json`, `README.md`.
- **Spec antes de programar:** `docs/specs/09-datos-demo.md` (ya escrita en P1; este paso la sigue).
- **Criterios de aceptación:**
  - [ ] `datos-demo/demo.json` valida contra el formato de la spec 09 y cubre: 1 administrador además del super administrador, 4 estudiantes con disponibilidad, y tareas en los 5 estados, una por vencer, una urgente, una vencida con pasos y una completada fuera de hora (R11, R12, R27).
  - [ ] Todos los datos están marcados como de ejemplo, con correos `@example.com` y teléfonos de relleno; los nombres, lugares y tareas son los de `docs/diseno/bocetos.html`.
  - [ ] `README.md` explica qué es, cómo instalar, las variables de `.env.example`, cómo correr, probar y cargar la demo, cómo se trabaja por ramas (enlace a PLAN.md) y los créditos.
- **Skills de Cursor** ([skills.md](skills.md)): `ux-writing` (textos de los datos de demo y del README)
- **Commits, en este orden:**
  0. `docs(plan): tomar P21` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `feat(demo): datos de demo con los cinco estados y las marcas`
  2. `docs(readme): instalación, uso, datos de demo y flujo de trabajo`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P21), docs/specs/09-datos-demo.md, PRD R11, R12, R27 y la sección «Datos de ejemplo» de docs/diseno/bocetos.html. Estás en la rama feat/datos-demo. Solo puedes crear o modificar datos-demo/demo.json y README.md.
Objetivo: un juego de datos de demo que muestre todo el MVP, y el README del proyecto.
1. datos-demo/demo.json exactamente con el formato de la spec 09: el administrador Mateo Cruz; los estudiantes Ana Torres, Luis Mena y Sofía Paredes, y uno más; disponibilidades del día 0; tareas de los bocetos (Preparar Sala 3 para mentorías en ejecución con 3 de 5 pasos y venceEnMinutos 42; Armar mesas de check-in pendiente; Llevar extensiones eléctricas a la Sala 3 urgente; Reponer agua en la mesa de mentores vencida; Ordenar la mesa de premiación sin asignar; Revisar el proyector del teatro completada; Pegar la señalética de baños completada fuera de hora). Correos @example.com, teléfonos 099 000 0000, contraseñas de demo. Ningún dato real del cliente. Commit: feat(demo): datos de demo con los cinco estados y las marcas.
2. README.md: qué es Señal de Turno, requisitos, instalación (npm install), variables (.env.example), npm run dev / lint / typecheck / test / build, cómo cargar la demo (el script lo indica docs/specs/09-datos-demo.md), cómo se trabaja (enlace a AGENTS.md y docs/plan/PLAN.md), equipo y créditos de las fuentes (SIL OFL). Commit: docs(readme): instalación, uso, datos de demo y flujo de trabajo.
Skills de Cursor para este paso (docs/plan/skills.md): /ux-writing para textos de los datos de demo y del README. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P21» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P22 · Revisión de diseño y textos de todas las pantallas

- **Rama:** `docs/revision-diseno-final`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** P14 a P20 mergeados.
- **Archivos y carpetas del paso:** `docs/qa/revision-diseno-final.md` (y correcciones en `components/ui-i2h/`, `components/layout/`, `components/pantallas/`).
- **Spec antes de programar:** No aplica: DESIGN.md §9 y §8.
- **Criterios de aceptación:**
  - [ ] D-01 a D-20 revisados en todas las pantallas, en 360, 390, 768 y 1280 px, con teclado y con «reducir movimiento».
  - [ ] Todos los textos de la interfaz en español, en «tú», sin signos de exclamación, con los nombres exactos de estados y marcas (DESIGN.md §8).
  - [ ] Correcciones de las carpetas de componentes hechas; lo demás anotado para su dueño.
- **Skills de Cursor** ([skills.md](skills.md)): `impeccable` (/impeccable critique y /impeccable audit de todas las pantallas); `ui-design-critique` (informe en español contra D-01 a D-20); `ux-writing` (revisión de todos los textos); `accessibility` (repaso a fondo de lo que marque la auditoría)
- **Commits, en este orden:**
  0. `docs(plan): tomar P22` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(qa): revisión de diseño y textos de todas las pantallas`
  2. `fix(ui): correcciones de la revisión final de diseño`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md secciones 6, 8 y 9 y docs/plan/PLAN.md (paso P22). Estás en la rama docs/revision-diseno-final. Solo puedes crear docs/qa/revision-diseno-final.md y corregir archivos de components/ui-i2h/, components/layout/ y components/pantallas/.
Objetivo: revisar todas las pantallas (estudiante, administrador y super administrador) contra D-01 a D-20 y las reglas de textos de DESIGN.md sección 8.
1. Con los datos de demo cargados, corre /impeccable critique y /impeccable audit en cada pantalla (nunca /impeccable init ni /impeccable document; DESIGN.md decide) y recorre cada pantalla en 360, 390, 768 y 1280 px, con teclado y con reducir movimiento. Anota una tabla criterio × pantalla con pasa / no pasa / no aplica y una nota. Revisa también cada texto visible. Commit: docs(qa): revisión de diseño y textos de todas las pantallas.
2. Corrige lo que es de tus carpetas sin cambiar props. Commit: fix(ui): correcciones de la revisión final de diseño.
3. Lo demás, en «Pendiente para otras carpetas» y en el PR.
Skills de Cursor para este paso (docs/plan/skills.md): /impeccable critique y /impeccable audit de todas las pantallas; /ui-design-critique para informe en español contra D-01 a D-20; /ux-writing para revisión de todos los textos; /accessibility para repaso a fondo de lo que marque la auditoría. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P22» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

### 5.4 Fase 3 · Should y Could (solo si sobra tiempo)

Se hacen en este orden y solo si hay tiempo. Cada uno es independiente: si uno no alcanza, se salta y se anota en `docs/plan/estado.md`.


#### P23 · SH6 y SH5: historial de completadas y horas que le quedan

- **Rama:** `feat/panel-historial`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** Fase 2 completa.
- **Archivos y carpetas del paso:** `lib/usuarios/**`, `app/(admin)/estudiantes/**`, `docs/specs/22-historial-horas.md`.
- **Spec antes de programar:** `docs/specs/22-historial-horas.md`.
- **Criterios de aceptación:**
  - [ ] Al tocar un estudiante se ve su historial de completadas (SH6, R36).
  - [ ] El panel muestra «Le quedan 2 h 30 min» de disponibilidad en el día (SH5, R29).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (consultas del historial)
- **Commits, en este orden:**
  0. `docs(plan): tomar P23` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): historial de completadas y horas que le quedan`
  2. `feat(estudiantes): historial de completadas`
  3. `feat(estudiantes): horas de disponibilidad que le quedan`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P23), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/15-usuarios.md y PRD R29, R36, SH5, SH6. Estás en la rama feat/panel-historial. Solo puedes crear o modificar lib/usuarios/, app/(admin)/estudiantes/ y docs/specs/22-historial-horas.md.
Escribe la spec (commit docs(specs): …), luego el historial de completadas por estudiante (/estudiantes/[id]) con CompletadasVista y las horas que le quedan con la prop horasRestantesTexto de FilaEstudiante, en hora de Ecuador. Haz estos commits, en este orden: docs(specs): historial de completadas y horas que le quedan; feat(estudiantes): historial de completadas; feat(estudiantes): horas de disponibilidad que le quedan.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para consultas del historial. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P23» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P24 · SH4: reabrir una tarea completada

- **Rama:** `feat/reabrir`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 45 min
- **Depende de:** P23 mergeado o descartado.
- **Archivos y carpetas del paso:** `lib/tareas/reabrir.ts`, `supabase/migrations/*_reabrir.sql`, `app/(admin)/tablero/[id]/**`, `docs/specs/23-reabrir.md`.
- **Spec antes de programar:** `docs/specs/23-reabrir.md`.
- **Criterios de aceptación:**
  - [ ] Un administrador reabre una completada con confirmación; los pasos siguen marcados y pasa a En ejecución o Vencida; queda quién y cuándo, y se quita «Fuera de hora» (R26, SH4, S-44).
- **Skills de Cursor** ([skills.md](skills.md)): `supabase-postgres-best-practices` (función para reabrir)
- **Commits, en este orden:**
  0. `docs(plan): tomar P24` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): reabrir una tarea completada`
  2. `feat(bd): registro de reapertura`
  3. `feat(tareas): reabrir una tarea completada`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P24), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R26 (S-44). Estás en la rama feat/reabrir. Solo puedes crear o modificar lib/tareas/reabrir.ts, una migración nueva, app/(admin)/tablero/[id]/ y docs/specs/23-reabrir.md. Escribe la spec y luego implementa R26 con DialogoConfirmar y aviso. Haz estos commits, en este orden: docs(specs): reabrir una tarea completada; feat(bd): registro de reapertura; feat(tareas): reabrir una tarea completada.
Skills de Cursor para este paso (docs/plan/skills.md): /supabase-postgres-best-practices para función para reabrir. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P24» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P25 · SH2 y SH1: recuperar contraseña y enviar credenciales por correo

- **Rama:** `feat/correo`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** P24 mergeado o descartado.
- **Archivos y carpetas del paso:** `app/(auth)/recuperar/**`, `lib/usuarios/correo.ts`, `docs/specs/24-correo.md`.
- **Spec antes de programar:** `docs/specs/24-correo.md`.
- **Criterios de aceptación:**
  - [ ] Desde el login se pide un enlace para recuperar la contraseña por correo (SH2, R5).
  - [ ] Al crear un usuario, la herramienta le envía sus credenciales por correo (SH1, R4).
- **Skills de Cursor** ([skills.md](skills.md)): `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  0. `docs(plan): tomar P25` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): recuperación de contraseña y credenciales por correo`
  2. `feat(auth): recuperar la contraseña por correo`
  3. `feat(usuarios): enviar credenciales por correo al crear el usuario`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P25), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R4, R5, SH1, SH2. Estás en la rama feat/correo. Solo puedes crear o modificar app/(auth)/recuperar/, lib/usuarios/correo.ts y docs/specs/24-correo.md. Escribe la spec (marca [SUPUESTO] el proveedor de correo y el texto del mensaje) y luego implementa con Supabase Auth (resetPasswordForEmail y la plantilla de correo de Supabase). Haz estos commits, en este orden: docs(specs): recuperación de contraseña y credenciales por correo; feat(auth): recuperar la contraseña por correo; feat(usuarios): enviar credenciales por correo al crear el usuario.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P25» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P26 · SH3: aviso «por vencer» con la herramienta cerrada

- **Rama:** `feat/aviso-cerrada`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 1 h 30 min
- **Depende de:** P25 mergeado o descartado.
- **Archivos y carpetas del paso:** `public/sw.js`, `lib/notificaciones/**`, `app/api/notificaciones/**`, `supabase/migrations/*_suscripciones.sql`, `docs/specs/25-aviso-cerrada.md`.
- **Spec antes de programar:** `docs/specs/25-aviso-cerrada.md`.
- **Criterios de aceptación:**
  - [ ] Con permiso del usuario, llega una notificación del sistema cuando una tarea suya entra en «por vencer», aunque la herramienta esté cerrada (SH3, R14).
- **Skills de Cursor** ([skills.md](skills.md)): `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions))
- **Commits, en este orden:**
  0. `docs(plan): tomar P26` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): aviso por vencer con la herramienta cerrada`
  2. `feat(notificaciones): suscripción a notificaciones push`
  3. `feat(notificaciones): enviar el aviso por vencer`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P26), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R14, SH3. Estás en la rama feat/aviso-cerrada. Solo puedes crear o modificar public/sw.js, lib/notificaciones/, app/api/notificaciones/, una migración nueva y docs/specs/25-aviso-cerrada.md. Escribe la spec (Web Push con VAPID y un cron de Vercel cada minuto; marca [SUPUESTO] lo que no defina el PRD) y luego implementa. Haz estos commits, en este orden: docs(specs): aviso por vencer con la herramienta cerrada; feat(notificaciones): suscripción a notificaciones push; feat(notificaciones): enviar el aviso por vencer.
Skills de Cursor para este paso (docs/plan/skills.md): docs de Next.js para la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions). Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P26» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P27 · CO2: ordenar el tablero por lugar

- **Rama:** `feat/orden-lugar`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
- **Estimación:** 20 min
- **Depende de:** P26 mergeado o descartado.
- **Archivos y carpetas del paso:** `lib/tablero/**`, `docs/specs/26-could.md`.
- **Spec antes de programar:** `docs/specs/26-could.md` (sección CO2).
- **Criterios de aceptación:**
  - [ ] El panel de filtros ofrece «Por lugar» y agrupa u ordena por lugar (CO2, R32).
- **Skills de Cursor** ([skills.md](skills.md)): ninguna en especial; basta con AGENTS.md y las reglas de `.cursor/rules/`.
- **Commits, en este orden:**
  0. `docs(plan): tomar P27` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): orden por lugar`
  2. `feat(tablero): ordenar por lugar`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P27), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md y PRD R32, CO2. Estás en la rama feat/orden-lugar. Solo puedes crear o modificar lib/tablero/ y docs/specs/26-could.md. Escribe la sección CO2 de la spec y agrega el orden 'lugar' con su prueba. Haz estos commits, en este orden: docs(specs): orden por lugar; feat(tablero): ordenar por lugar.
El commit «docs(plan): tomar P27» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P28 · CO1: porcentaje de pasos en la tarjeta

- **Rama:** `feat/porcentaje-pasos`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 20 min
- **Depende de:** P27 mergeado o descartado.
- **Archivos y carpetas del paso:** `components/ui-i2h/TarjetaTarea.tsx`, `components/ui-i2h/BarraProgreso.tsx`, `docs/specs/26-could.md` (sección CO1).
- **Spec antes de programar:** `docs/specs/26-could.md` (sección CO1).
- **Criterios de aceptación:**
  - [ ] La tarjeta muestra «3 de 5 pasos · 60 %» además de «3 de 5» (CO1, R30).
- **Skills de Cursor** ([skills.md](skills.md)): `web-design-guidelines` (auditoría del cambio en la tarjeta)
- **Commits, en este orden:**
  0. `docs(plan): tomar P28` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(specs): porcentaje de pasos`
  2. `feat(ui): porcentaje de pasos en la tarjeta`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md 5.2 y PRD R30, CO1. Estás en la rama feat/porcentaje-pasos. Solo puedes modificar components/ui-i2h/TarjetaTarea.tsx, components/ui-i2h/BarraProgreso.tsx y docs/specs/26-could.md (sección CO1). Agrega el porcentaje calculado de marcados/total al texto de la barra, sin cambiar las props. Haz estos commits, en este orden: docs(specs): porcentaje de pasos; feat(ui): porcentaje de pasos en la tarjeta.
Skills de Cursor para este paso (docs/plan/skills.md): /web-design-guidelines para auditoría del cambio en la tarjeta. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P28» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

### 5.5 Fase 4 · Cierre y demo

Objetivo: la app en producción con datos de demo y el guion probado.


#### P29 · Carga de demo, producción y congelación

- **Rama:** `chore/cierre`
- **Carril y responsable en modo en paralelo:** A (datos y reglas) · Joshua (en modo solo, lo hace Joshua)
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
  0. `docs(plan): tomar P29` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `feat(demo): script para cargar los datos de demo`
  2. `chore(deploy): configuración de producción`
  3. `docs(plan): estado final del Avance 3`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P29), docs/specs/00-arquitectura.md, docs/specs/01-contratos-ui.md, docs/specs/09-datos-demo.md y la sección 6 de docs/plan/PLAN.md. Estás en la rama chore/cierre. Solo puedes crear o modificar scripts/cargar-demo.ts, la configuración de despliegue y docs/plan/estado.md.
1. scripts/cargar-demo.ts (tsx, service role): elimina los usuarios y tareas de demo anteriores sin tocar al super administrador; crea usuarios, disponibilidades, tareas, pasos, responsables y observaciones de datos-demo/demo.json calculando las horas con venceEnMinutos y minutosAtras desde ahora. Agrega npm run demo. Commit: feat(demo): script para cargar los datos de demo.
2. Revisa las variables de Production en Vercel y las URL de Supabase Auth. Commit (si cambia algo en el repo): chore(deploy): configuración de producción.
3. Actualiza docs/plan/estado.md: marca como «descartado» lo que no entró y deja la nota de qué quedó fuera. Commit: docs(plan): estado final del Avance 3. Luego mergea, despliega, crea la etiqueta v1.0-avance3 y ensaya el guion.
Skills de Cursor para este paso (docs/plan/skills.md): npx impeccable detect sobre la URL de producción como última revisión; Supabase CLI para migraciones aplicadas y tipos al día. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P29» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

#### P30 · Prueba de aceptación en celular y computadora

- **Rama:** `docs/prueba-demo`
- **Carril y responsable en modo en paralelo:** B (interfaz) · Raymond (en modo solo, lo hace Joshua)
- **Estimación:** 1 h
- **Depende de:** P29 desplegado en producción.
- **Archivos y carpetas del paso:** `docs/qa/prueba-demo.md`.
- **Spec antes de programar:** No aplica: guion de demo (sección 6 de este plan) y criterios de cada paso.
- **Criterios de aceptación:**
  - [ ] Cada paso del guion de demo probado en producción en un celular real (Android o iOS) y en una computadora, con resultado y captura.
  - [ ] Probado sin conexión (modo avión) en el celular: banda visible y pasos bloqueados (D-11).
  - [ ] Cualquier falla anotada con pasos para reproducirla y avisada a Joshua antes de las 20:00 del martes.
- **Skills de Cursor** ([skills.md](skills.md)): `mobile-first-responsive` (lista de revisión en el celular real)
- **Commits, en este orden:**
  0. `docs(plan): tomar P30` (lo haces tú al tomar el paso, antes de pegar el prompt; sección 4.3)
  1. `docs(qa): prueba de aceptación del Avance 3 en celular y computadora`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md y la sección 6 (guion de demo) de docs/plan/PLAN.md. Estás en la rama docs/prueba-demo. Solo puedes crear docs/qa/prueba-demo.md.
Recorre el guion completo en producción, con los usuarios de datos-demo/demo.json, en un celular real y en una computadora. Para cada paso anota: dispositivo, resultado esperado, resultado obtenido, pasa / no pasa y captura. Prueba también el modo avión en el celular. Commit: docs(qa): prueba de aceptación del Avance 3 en celular y computadora. Abre el PR y avisa a Joshua de cualquier «no pasa».
Skills de Cursor para este paso (docs/plan/skills.md): /mobile-first-responsive para lista de revisión en el celular real. Ábrelas solo cuando hagan falta; si una skill contradice el PRD, DESIGN.md o este prompt, mandan el PRD y DESIGN.md.
El commit «docs(plan): tomar P30» ya está hecho en esta rama; no vuelvas a editar docs/plan/estado.md.
```

- **PR y merge:** Al tomar el paso ya abriste el PR borrador (sección 4.3). Al terminar: `git push`, completa la plantilla y `gh pr ready`. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.


## 6. Guion de la demo (miércoles 2 de diciembre, unos 8 minutos)

Antes: `npm run demo` en producción unos 15 minutos antes, para que las horas relativas cuadren (una tarea a 42 min, una vencida hace 18 min). Un celular con la sesión del estudiante y una computadora con la del administrador, lado a lado.

| # | Quién y dónde | Qué se muestra | Requisitos |
| --- | --- | --- | --- |
| 1 | Admin · computadora | Entrar con correo y contraseña. Cae en el tablero. | R1, R30, M1 |
| 2 | Admin · computadora | Tablero: grupos en el orden de R31, totales, temporizadores, la tarea «Por vencer» y el filtro «Por vencer». | R30–R33, M11 |
| 3 | Admin · computadora | Crear «Llevar extensiones eléctricas a la Sala 3» con 3 pasos; el selector deshabilita a quien no está disponible; asignar a Luis Mena. | R7, R28, M4, M5 |
| 4 | Admin · computadora | Marcar una tarea como urgente: aparece en la lista de todos los estudiantes. | R27, M12 |
| 5 | Estudiante · celular | «Mis tareas»: tarjeta señal «Vence primero» y la tarea nueva. | R35, M7 |
| 6 | Estudiante · celular | Abrir otra tarea mientras tiene una abierta: el aviso «Termina … antes de empezar otra tarea». | R17, M8 |
| 7 | Estudiante · celular | Marcar pasos: el tablero de la computadora cambia al momento y muestra quién la inició. | R23, M9 |
| 8 | Estudiante · celular | Modo avión: aparece la banda «Sin conexión» y los pasos se bloquean. Quitar el modo avión. | R19, M14 |
| 9 | Estudiante · celular | Intentar completar: el deslizador dice qué falta; escribir la observación y deslizar. Aviso de confirmación. | R16, R37 |
| 10 | Admin · computadora | La tarea pasa a «Terminadas»; reasignar la vencida con una nueva hora. | R25, R34, M10 |
| 11 | Admin · computadora | Intentar editar una tarea en ejecución: aviso de bloqueo. Abrir la misma tarea en edición desde otra sesión: «En edición». | R13, R21, M4 |
| 12 | Admin · computadora | Panel de estudiantes (quién no tiene tareas) y usuarios: la fila del super administrador no se puede eliminar. | R3, R36, M13 |

Plan B si falla la red del lugar: el mismo guion con la vista previa abierta desde datos móviles, y las capturas de `docs/qa/prueba-demo.md`.

## 7. Estado

El estado de cada paso está en [`docs/plan/estado.md`](estado.md): qué está libre, qué está mergeado y quién lo hizo. Lo que está en curso se ve en los PR borrador (`gh pr list --state open`). La forma de tomar un paso está en la sección 4.3.

## 8. Riesgos y qué hacer

| Riesgo | Qué hacer |
| --- | --- |
| La Fase 1 no termina hoy | Se cierra el sábado por la mañana; no se abre la Fase 2 hasta tener el hito MVP. |
| Un componente aún no está en `main` cuando se va a conectar | Se empieza por la parte de servidor del paso y se conecta la pantalla cuando se mergea. No se crea una segunda versión del componente. |
| Dos PR tocan el mismo archivo | No debería pasar con el Anexo B; si pasa, sección 2.6. |
| El agente de Cursor inventa una regla | Se rechaza en la revisión: cada comportamiento debe citar una R# en la spec. Lo no definido va como [SUPUESTO]. |
| Fallan las vistas previas por variables | Revisar que las variables estén en Preview en Vercel y que la URL de la vista previa esté en Supabase Auth. |
| Las horas de la demo no cuadran | Volver a correr `npm run demo` justo antes de presentar. |

## Anexo A · Contratos entre carpetas

Base para `lib/tipos.ts` y `docs/specs/01-contratos-ui.md` (P0). Los componentes de `components/**` solo reciben estos tipos ya calculados; las páginas de `app/` los arman con `lib/estados.ts` y `lib/tiempo.ts`.

```ts
// lib/tipos.ts
export type EstadoTarea = 'sin_asignar' | 'pendiente' | 'en_ejecucion' | 'vencida' | 'completada';
export type MarcaTarea = 'por_vencer' | 'urgente' | 'en_edicion' | 'fuera_de_hora';
export type Rol = 'admin' | 'estudiante';

export interface PersonaResumen { id: string; nombre: string; iniciales: string; telefono?: string }

export interface TemporizadorVista {
  palabra: 'Faltan' | 'Venció hace' | 'Completada';
  valor: string;                       // "42 min", "2 h 42 min", "09:12"
  tono: 'normal' | 'aviso' | 'error' | 'listo';
}

export interface TareaTarjeta {
  id: string; nombre: string; lugar: string; venceEnTexto: string;   // "vence 10:00"
  estado: EstadoTarea; marcas: MarcaTarea[]; temporizador: TemporizadorVista;
  pasosMarcados: number; pasosTotal: number;
  responsables: PersonaResumen[]; paraTodos?: boolean;               // urgente: todos los estudiantes
  editandoPor?: string; iniciadaPor?: string; iniciadaEn?: string;
  completadaPor?: string; completadaEn?: string;
}

export interface PasoVista { id: string; texto: string; marcado: boolean; marcadoPor?: string; marcadoEn?: string }
export interface ObservacionVista { id: string; autor: string; texto: string; hora: string }

export interface TareaDetalle extends TareaTarjeta {
  descripcion?: string; pasos: PasoVista[]; companeros: PersonaResumen[]; observaciones: ObservacionVista[];
}

export interface OpcionResponsable { id: string; nombre: string; disponibilidadTexto: string; disponible: boolean; seleccionado: boolean }
export interface TotalesTablero { sin_asignar: number; pendiente: number; en_ejecucion: number; vencida: number; completada: number; por_vencer: number; total: number }
export interface UsuarioFila { id: string; nombre: string; correo: string; telefono: string; rol: Rol; esSuperAdmin: boolean }
export interface EstudianteFila { id: string; nombre: string; numTareas: number; disponibilidadTexto: string; horasRestantesTexto?: string }
export interface BloqueDisponibilidad { dia: string; desde: string; hasta: string }   // "2026-12-02", "08:00", "14:00"

export type ResultadoAccion<T = void> = { ok: true; datos: T } | { ok: false; error: string };
export type AccionFormulario = (formData: FormData) => Promise<ResultadoAccion<unknown>>;
```

| Componente | Props | Paso |
| --- | --- | --- |
| `Insignia` | `tipo: EstadoTarea \| MarcaTarea; detalle?: string` | P2 |
| `Boton` | `variante: 'primario' \| 'secundario' \| 'peligro'; cargando?; motivoDeshabilitado?` + atributos de `<button>` | P2 |
| `ContenedorAvisos`, `avisar()` | `avisar({ variante: 'confirmacion' \| 'error' \| 'por_vencer' \| 'tarea_abierta' \| 'bloqueo'; mensaje; accion?: { texto; href? ; onClick? } })` | P2 |
| `Campo`, `CampoTexto`, `AreaTexto`, `Casilla` | `etiqueta; name; obligatorio?; ayuda?; error?` + atributos del control | P2 |
| `MarcoApp` | `rol: Rol; destinoActivo: string; nombreUsuario: string; accionCerrarSesion: () => Promise<void>; children` (muestra `BandaSinConexion` con `useEnLinea()`) | P4 |
| `BandaSinConexion`, `useEnLinea()` | `visible: boolean`; el hook devuelve `boolean` | P4 |
| `LoginVista` | `accion: AccionFormulario; error?: string; cargando?: boolean` | P4 |
| `EditorPasos` | `pasos: string[]; onChange(pasos); error?` | P6 |
| `SelectorResponsables` | `opciones: OpcionResponsable[]; urgente: boolean; onAlternar(id)` | P6 |
| `CasillaUrgente` | `marcada: boolean; onChange(marcada)` | P6 |
| `FormularioTareaVista` | `modo: 'crear' \| 'editar'; valores; opciones; errores: Record<string,string>; accion: AccionFormulario` | P6 |
| `TarjetaTarea`, `TarjetaSenal`, `Temporizador`, `BarraProgreso` | `tarea: TareaTarjeta; href?` · `t: TemporizadorVista` · `marcados; total` | P8 |
| `ItemChecklist` | `paso: PasoVista; sinConexion?; soloLectura?; onAlternar(id, marcado)` | P8 |
| `DeslizarParaCompletar` | `bloqueado: boolean; motivo?: string; sinConexion?; completada?; onCompletar()` | P8 |
| `MisTareasVista`, `DetalleTareaVista` | `senal?: TareaTarjeta; tareas: TareaTarjeta[]; completadas: TareaTarjeta[]` · `tarea: TareaDetalle; sinConexion; observacion; motivoBloqueo?; soloLectura?; onAlternarPaso; onCambiarObservacion; onCompletar` | P8 |
| `TotalesPorEstado`, `IndicadorCumplimiento`, `GrupoTareas`, `PanelFiltros`, `TableroVista` | `totales: TotalesTablero` · `completadas; total` · `titulo; cantidad; tono?` · `porVencer: boolean; orden: string; ordenes: { clave: string; texto: string }[]; onCambiar` · `totales; grupos; porVencer; orden; onCambiar` | P10 |
| `FilaUsuario`, `FilaEstudiante`, `EditorDisponibilidad`, `DialogoConfirmar`, `EstadoVacio`, `EstadoCargando` | `usuario: UsuarioFila; onEditar?; onEliminar?; onCambiarContrasena?` · `estudiante: EstudianteFila; href?` · `bloques: BloqueDisponibilidad[]; onChange` · `abierto; titulo; mensaje; textoConfirmar; variante; onConfirmar; onCancelar` · `mensaje; accion?` · `filas` | P13 |
| `UsuariosVista`, `FormularioUsuarioVista`, `EstudiantesVista`, `PerfilVista`, `CompletadasVista` | listas de los tipos de arriba + `accion: AccionFormulario` donde hay formulario | P13 |

**Rutas** [SUPUESTO: nombres de rutas, decisión técnica; los destinos salen de DESIGN.md §5.11]:

| Perfil | Ruta | Paso |
| --- | --- | --- |
| Todos | `/login` | P5 |
| Estudiante | `/mis-tareas`, `/tarea/[id]`, `/completadas` | P9 |
| Ambos | `/perfil` (fuera de los grupos de rutas) | P14 |
| Administrador | `/tablero`, `/tablero/[id]`, `/tareas`, `/tareas/nueva`, `/tareas/[id]/editar`, `/tareas/[id]/reasignar`, `/estudiantes`, `/usuarios` | P7, P11, P14, P15, P17, P20 |
| Público | `/catalogo` (componentes con datos de ejemplo) | P2 |

Un administrador también puede ser responsable y ejecutar tareas (R8, D-S-07): desde el detalle de la tarea en `/tablero/[id]`, si es responsable, ve los controles de ejecución (P20). [SUPUESTO]

## Anexo B · Dueños de archivos y carpetas

La columna «Dueño» es el responsable en modo en paralelo; las carpetas de Raymond son el carril B y las de Joshua el carril A (sección 4). En modo solo, Joshua trabaja en todas, pero siempre en la rama del paso y solo en los archivos de ese paso.

| Ruta | Dueño | Pasos |
| --- | --- | --- |
| `package.json`, `package-lock.json`, configuración, `app/layout.tsx`, `app/globals.css`, `app/fuentes/`, `proxy.ts`, `lib/tipos.ts` | Joshua | P0 (y `chore/deps-…`) |
| `components/ui/` (generado por shadcn) | Joshua | P0 |
| `supabase/**`, `lib/supabase/**` | Joshua | P0, P1, P9, P15, P17, P18, P19, P24, P26 |
| `lib/estados.ts`, `lib/tiempo.ts`, `lib/auth/`, `lib/tareas/`, `lib/ejecucion/`, `lib/tablero/`, `lib/usuarios/`, `lib/asignacion/`, `lib/tiempo-real/`, `lib/notificaciones/`, `lib/__tests__/` | Joshua | P3–P26 |
| `app/page.tsx`, `app/(auth)/`, `app/(admin)/`, `app/(estudiante)/`, `app/perfil/`, `app/api/` | Joshua | P5–P26 |
| `scripts/` | Joshua | P5, P29 |
| `components/ui-i2h/` | Raymond | P2, P6, P8, P10, P13, P28 |
| `components/layout/` | Raymond | P4 |
| `components/pantallas/` | Raymond | P4, P6, P8, P10, P13 |
| `app/catalogo/` | Raymond | P2, P4, P6, P8, P10, P13 |
| `public/manifest.webmanifest`, `public/iconos/` | Raymond | P16 |
| `datos-demo/` | Raymond | P21 |
| `README.md` | Raymond | P21 |
| `docs/qa/` | Raymond | P12, P22, P30 |
| `docs/specs/NN-*.md` | Dueño del paso | Todos |
| `docs/plan/estado.md` | Quien toma el paso, **solo la línea de su paso** | Todos (commit `docs(plan): tomar Pn`) y P29 |
| `docs/plan/` (salvo `estado.md`), `AGENTS.md`, `.cursor/rules/`, `.github/` | Joshua | — |
| `.agents/skills/`, `.agents/licencias/`, `skills-lock.json`, `.cursor/skills/` | Joshua (se actualizan con `npx skills update` en una rama `chore/skills-…`) | — |
| `docs/prd/`, `DESIGN.md`, `docs/diseno/` | Equipo (no se tocan en los pasos del Avance 3 sin acordarlo) | — |

## Anexo C · Supuestos técnicos de este plan

Son decisiones técnicas del equipo, no requisitos del cliente. Cada una se confirma o se cambia en la spec de su paso.

- [SUPUESTO] El super administrador se crea una sola vez con un script desde variables de entorno y queda protegido por un índice único y un trigger (R3, W4).
- [SUPUESTO] La disponibilidad se guarda por fecha y rango de horas; «disponible» = la hora de vencimiento cae dentro de un rango de ese día (R28, S-45).
- [SUPUESTO] «Estar dentro» de una tarea al vencer (R24, S-43) se mide con un latido cada minuto desde el detalle abierto.
- [SUPUESTO] El bloqueo «en edición» dura 15 min sin actividad (R13, S-48) y se renueva cada 2 min mientras el formulario está abierto.
- [SUPUESTO] El aviso «por vencer» dentro de la herramienta se muestra una vez por tarea y sesión (R14).
- [SUPUESTO] El catálogo `/catalogo` queda público porque solo tiene datos de ejemplo.
- [SUPUESTO] Los datos de demo usan los nombres, lugares y tareas de ejemplo de `docs/diseno/bocetos.html`, con correos `@example.com`: no son datos del cliente.
