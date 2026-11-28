# Skills y herramientas de Cursor · Avance 3

Qué skills, reglas y herramientas usa el agente de Cursor en este proyecto, de dónde salen, cómo se instalan y en qué pasos se usan. Las fuentes son la página **IA → Páginas Web y Agentes**, la base **Recursos de IA** y el **Kit Inicial Web — Para Agentes** del Notion de Joshua, más herramientas estándar que se verificaron en su fuente oficial el 27 de noviembre de 2026.

**Regla que manda sobre todas:** una skill **recomienda**; el PRD decide qué hace la herramienta y `DESIGN.md` cómo se ve. Si una skill propone otra paleta, otra tipografía, esquinas redondeadas o un requisito nuevo, se ignora. Esto vale también para `frontend-design` e Impeccable.

## 1. Instalación (cada uno, en su máquina)

Las skills del proyecto **ya vienen en el repo** (`.agents/skills/` y `.cursor/skills/`), así que los dos tienen las mismas versiones con un `git pull`. En cada máquina solo hay que hacer esto una vez:

1. **Node.js 22.20 o más** (`node -v`). Lo pide el CLI `skills`; Next.js y el CLI de Supabase piden 20 o más.
2. **Cursor:** abre la carpeta del repo. Cursor carga solo las skills de `.agents/skills/` y `.cursor/skills/` y las reglas de `.cursor/rules/`. Para comprobarlo, escribe `/` en el chat del agente y busca `accessibility` y `ui-design-critique`: si aparecen, Cursor ya las ve. Si no, revisa en la configuración de Cursor que las *Agent Skills* estén activadas ([documentación de Cursor](https://cursor.com/docs/context/skills)).
3. **Impeccable** (no se guarda en el repo porque instala un binario y un hook propio): en una terminal, **fuera** de la carpeta del repo,

   ```bash
   npx impeccable install --providers=cursor --scope=global
   ```

   Se instala en tu usuario (`~/.cursor/`), no en el repo, para que no aparezcan archivos nuevos en las ramas. Si el instalador ofrece el *design hook*, puedes aceptarlo. Reinicia Cursor. **Nunca** corras `/impeccable init` ni `/impeccable document`: el proyecto ya tiene su `DESIGN.md` y no lleva `PRODUCT.md`.
4. **GitHub CLI** (`gh auth login`), que usan el flujo de PR y la toma de pasos.
5. Solo Joshua, en P0: el CLI de Supabase y el proyecto de Vercel (tabla 3).

Para actualizar las skills del repo (solo Joshua, en una rama `chore/skills-…`): `npx skills update` y commit de `.agents/skills/` y `skills-lock.json`. No se editan a mano.

## 2. Skills del proyecto (en el repo)

| Skill | Qué hace | Fuente (enlace real) | Dónde está | Licencia | Viene de |
| --- | --- | --- | --- | --- | --- |
| `web-design-guidelines` | Audita el código de la interfaz contra las Web Interface Guidelines de Vercel y marca cada problema con archivo y línea. | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `.agents/skills/web-design-guidelines/` | MIT (según el README del repo) | Notion |
| `accessibility` | Accesibilidad WCAG 2.2: teclado, contraste, formularios y lectores de pantalla. | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) | `.agents/skills/accessibility/` | MIT | Notion |
| `frontend-design` | Criterio visual (tipografía, composición, movimiento) para no caer en una estética genérica. Aquí se usa **dentro** de DESIGN.md, nunca para cambiarlo. | [anthropics/skills](https://github.com/anthropics/skills) (`skills/frontend-design`) | `.agents/skills/frontend-design/` | Apache-2.0 | Notion |
| `ux-writing` | Textos de la interfaz: botones, errores, estados vacíos. El tono lo fija DESIGN.md §8 (tú, sin signos de exclamación). | [slb2248/ai-ux-skills](https://github.com/slb2248/ai-ux-skills) (`skills/ux-writing`) | `.agents/skills/ux-writing/` | MIT | Notion |
| `mobile-first-responsive` | Celular primero y escritorio después: áreas táctiles, rejilla, sin scroll horizontal. **Adaptada** a las medidas de DESIGN.md. | Skill propia de Joshua en [Scorpwik/tienda-ferreteria-lozada](https://github.com/Scorpwik/tienda-ferreteria-lozada/pull/2) | `.cursor/skills/mobile-first-responsive/` | MIT (propia) | Notion |
| `ui-design-critique` | Revisa una pantalla o componente y entrega un informe en español con problemas y prioridades. **Adaptada** a D-01–D-20 y a las R# del PRD. | Skill propia de Joshua en [Scorpwik/tienda-ferreteria-lozada](https://github.com/Scorpwik/tienda-ferreteria-lozada/pull/2), inspirada en [kursku/skills](https://github.com/kursku/skills) | `.cursor/skills/ui-design-critique/` | MIT (propia) | Notion |
| `supabase-postgres-best-practices` | Buenas prácticas de Postgres en Supabase: esquema, índices, RLS y su rendimiento, bloqueos. | [supabase/agent-skills](https://github.com/supabase/agent-skills) | `.agents/skills/supabase-postgres-best-practices/` | MIT | Agregada (oficial de Supabase; Joshua ya la usa en la tienda) |

Las cinco de `.agents/skills/` se instalaron con el CLI oficial `skills` de Vercel Labs ([vercel-labs/skills](https://github.com/vercel-labs/skills)), por ejemplo:

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a cursor -y
npx skills add addyosmani/web-quality-skills --skill accessibility -a cursor -y
npx skills add anthropics/skills --skill frontend-design -a cursor -y
npx skills add slb2248/ai-ux-skills --skill ux-writing -a cursor -y
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices -a cursor -y
```

El commit exacto de cada una está en `skills-lock.json`, y los textos de licencia en `.agents/licencias/`. Las dos de `.cursor/skills/` son de Joshua y se adaptaron a este proyecto; cada una trae su `ATTRIBUTION.md`.

**Cómo se usan:** el agente las abre solo cuando la tarea encaja con su descripción, o tú las llamas escribiendo `/nombre` en el chat (por ejemplo `/web-design-guidelines components/ui-i2h/Insignia.tsx`). Cada prompt del plan ya dice qué skills usar.

## 3. Herramientas y reglas

| Herramienta | Qué es | Enlace oficial | Instalación | Quién | Viene de |
| --- | --- | --- | --- | --- | --- |
| **Impeccable** | Skill de diseño ligada al curso. Aquí solo: `/impeccable critique` (evaluación de diseño con puntaje), `/impeccable audit` (accesibilidad, rendimiento, theming y responsive) y `npx impeccable detect` (detector de patrones). **Nunca `init` ni `document`.** | [impeccable.style](https://impeccable.style) · [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0) | `npx impeccable install --providers=cursor --scope=global` (sección 1) | Los dos | Curso (ya se usó en `docs/diseno/criticas/`); no está en el Notion |
| **Reglas del proyecto** | `.cursor/rules/00-proyecto.mdc`, `10-interfaz.mdc`, `20-datos.mdc`: resumen de AGENTS.md que Cursor carga solo. | este repo | Ninguna | Los dos | Plan del Avance 3 |
| **Documentación de Next.js incluida** | Next.js 16 trae su documentación en `node_modules/next/dist/docs/` y `next dev` agrega a `AGENTS.md` un bloque que le dice al agente que la lea. Se deja tal cual (P0). | [Guía de Next.js para agentes](https://nextjs.org/docs/app/guides/ai-agents) | Viene con `next`; en P0 se usa `create-next-app --no-agents-md` para no pisar nuestro AGENTS.md | Los dos | Agregada (oficial) |
| **shadcn/ui CLI** | Agrega componentes base (`npx shadcn@latest init`, `npx shadcn@latest add button`). Los de `components/ui/` no se editan a mano. | [ui.shadcn.com](https://ui.shadcn.com/) | `npx`, sin instalar | Joshua (P0 y `chore/deps-…`) | Notion (Kit · Stack y Arquitectura) |
| **Supabase CLI** | Migraciones (`npx supabase migration new`), aplicar (`npx supabase db push`) y tipos (`npx supabase gen types typescript --linked`). | [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) | `npm install supabase --save-dev` (P0) | Joshua | Notion (Kit · Seguridad y Migraciones) |
| **Vercel** | Vistas previas por PR y producción desde `main`, team `scorpwik`. | [vercel.com](https://vercel.com) | Importar el repo en el dashboard (P0); `npx vercel` solo si hace falta | Joshua | Notion (Kit · Stack) |
| **GitHub CLI** | Crear PR, revisar y mergear. | [cli.github.com](https://cli.github.com) | `gh auth login` | Los dos | Plan del Avance 3 |
| **Vitest** | Pruebas de la lógica pura (`lib/**`). | [vitest.dev](https://vitest.dev) | En P0 (`npm install -D vitest`) | Joshua | Notion (Kit · Testing) |

**MCP:** este proyecto **no usa servidores MCP** en Cursor. El Kit pide no cargar MCP «por si acaso», y las claves de Supabase las maneja Joshua a mano en `.env.local`: no se conecta ningún MCP de Supabase ni se reutilizan conexiones de otros proyectos.

## 4. Qué skill se usa en cada paso

| Ronda | Paso | Responsable · carril | Skills y herramientas |
| --- | --- | --- | --- |
| 0 | P0 · Esqueleto mínimo del proyecto | Joshua · A | `shadcn CLI` (inicializar shadcn/ui y agregar componentes); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)); `supabase-postgres-best-practices` (solo para revisar los clientes de Supabase) |
| 1 | P1 · Supabase, Vercel y esquema de datos con RLS | Joshua · A | `supabase-postgres-best-practices` (esquema, índices, RLS y su rendimiento); `Supabase CLI` (supabase migration new, db push y gen types) |
| 1 | P2 · Componentes base de DESIGN.md y catálogo | Raymond · B | `frontend-design` (criterio de tipografía y composición dentro de DESIGN.md, sin cambiar la dirección visual); `accessibility` (foco, contraste y nombres accesibles); `ux-writing` (textos de botones y avisos); `web-design-guidelines` (auditoría de los componentes antes del PR) |
| 2 | P3 · Lógica de estados y de tiempo | Joshua · A | Solo AGENTS.md y `.cursor/rules/` |
| 2 | P6 · Componentes del formulario de tarea | Raymond · B | `accessibility` (etiquetas, errores ligados con aria-describedby y orden de foco del formulario); `ux-writing` (etiquetas, ayudas y errores); `web-design-guidelines` (auditoría antes del PR) |
| 3 | P5 · Autenticación, perfiles y super administrador | Joshua · A | `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)); `supabase-postgres-best-practices` (políticas que leen el perfil y el rol) |
| 3 | P4 · Navegación, login visual y aviso sin conexión | Raymond · B | `mobile-first-responsive` (barras, navegación y banda en 360–1280 px); `accessibility` (navegación con teclado y anuncios de la banda); `ux-writing` (textos del login y de la banda); `web-design-guidelines` (auditoría antes del PR) |
| 4 | P7 · Crear tareas y asignar responsables | Joshua · A | `supabase-postgres-best-practices` (inserciones de tarea, pasos y responsables en una transacción); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)) |
| 4 | P8 · Componentes de tarea, checklist y deslizar para completar | Raymond · B | `accessibility` (checklist y deslizador con teclado y lector de pantalla); `mobile-first-responsive` (áreas de 56 px y uso con el pulgar); `frontend-design` (movimiento con criterio y reducir movimiento); `web-design-guidelines` (auditoría antes del PR) |
| 5 | P9 · Ejecución: lista del estudiante, marcar pasos y completar | Joshua · A | `supabase-postgres-best-practices` (funciones RPC SECURITY DEFINER y bloqueos cortos); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)) |
| 5 | P10 · Componentes del tablero de cumplimiento | Raymond · B | `mobile-first-responsive` (cuadrícula del tablero en 360, 768 y 1280 px); `accessibility` (filtros y totales con teclado); `web-design-guidelines` (auditoría antes del PR) |
| 6 | P11 · Tablero con datos reales | Joshua · A | `supabase-postgres-best-practices` (consultas del tablero con columnas explícitas e índices) |
| 6 | P16 · PWA: manifest e íconos | Raymond · B | `docs de Next.js` (metadata y manifest en node_modules/next/dist/docs/); `web-design-guidelines` (revisión del manifest y de los íconos) |
| 7 | P18 · Reglas de ejecución: una tarea abierta y terminar una vencida | Joshua · A | `supabase-postgres-best-practices` (regla de una tarea abierta a la vez dentro de la función RPC) |
| 7 | P12 · Revisión de diseño del MVP | Raymond · B | `impeccable` (/impeccable critique y /impeccable audit de las pantallas del MVP); `ui-design-critique` (informe en español contra D-01 a D-20); `web-design-guidelines` (hallazgos con archivo y línea) |
| 8 | P15 · Editar, eliminar y bloqueo «en edición» | Joshua · A | `supabase-postgres-best-practices` (bloqueo «en edición» sin carreras (bloqueos cortos)) |
| 8 | P13 · Pantallas de usuarios, estudiantes, perfil y completadas | Raymond · B | `mobile-first-responsive` (listas y formularios en celular y escritorio); `accessibility` (formularios, diálogo de confirmación y estados vacíos); `ux-writing` (textos de vacío, error y confirmación); `web-design-guidelines` (auditoría antes del PR) |
| 9 | P14 · Usuarios, disponibilidad y contraseñas | Joshua · A | `supabase-postgres-best-practices` (perfiles, disponibilidades y políticas); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)) |
| 9 | P31 · Componentes de reasignación e historial de ejecución | Raymond · B | `mobile-first-responsive` (la vista de reasignar en celular y escritorio); `accessibility` (campo de hora y selector con teclado); `ux-writing` (textos de reasignar); `web-design-guidelines` (auditoría antes del PR) |
| 10 | P17 · Disponibilidad, urgentes y reasignación | Joshua · A | `supabase-postgres-best-practices` (validación de disponibilidad y asignación masiva de urgentes) |
| 10 | P21 · Datos de demo y README | Raymond · B | `ux-writing` (textos de los datos de demo y del README) |
| 11 | P19 · Tiempo real y aviso «por vencer» dentro de la herramienta | Joshua · A | `supabase-postgres-best-practices` (Realtime y políticas de las tablas publicadas); `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)) |
| 11 | P33 · Prueba de reglas de negocio en la vista previa | Raymond · B | `mobile-first-responsive` (lista de revisión en 390 y 1280 px) |
| 12 | P20 · Tablero completo y panel de estudiantes conectado | Joshua · A | `supabase-postgres-best-practices` (consultas con filtros y orden) |
| 12 | P22 · Revisión de diseño y textos de todas las pantallas | Raymond · B | `impeccable` (/impeccable critique y /impeccable audit de todas las pantallas); `ui-design-critique` (informe en español contra D-01 a D-20); `ux-writing` (revisión de todos los textos); `accessibility` (repaso a fondo de lo que marque la auditoría) |
| 13 | P23 · SH6 y SH5: historial de completadas y horas que le quedan | Joshua · A | `supabase-postgres-best-practices` (consultas del historial) |
| 13 | P32 · Pantallas de recuperar contraseña y permiso de avisos | Raymond · B | `accessibility` (formulario de recuperar y aviso de permiso); `ux-writing` (textos de recuperar contraseña y avisos); `web-design-guidelines` (auditoría antes del PR) |
| 14 | P24 · SH4: reabrir una tarea completada | Joshua · A | `supabase-postgres-best-practices` (función para reabrir) |
| 14 | P27 · CO2: ordenar el tablero por lugar | Joshua · A | Solo AGENTS.md y `.cursor/rules/` |
| 14 | P28 · CO1: porcentaje de pasos en la tarjeta | Raymond · B | `web-design-guidelines` (auditoría del cambio en la tarjeta) |
| 15 | P25 · SH2 y SH1: recuperar contraseña y enviar credenciales por correo | Joshua · A | `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)) |
| 16 | P26 · SH3: aviso «por vencer» con la herramienta cerrada | Joshua · A | `docs de Next.js` (la documentación de Next.js que viene en node_modules/next/dist/docs/ (rutas, proxy.ts, Server Actions)) |
| 17 | P29 · Carga de demo, producción y congelación | Joshua · A | `impeccable` (npx impeccable detect sobre la URL de producción como última revisión); `Supabase CLI` (migraciones aplicadas y tipos al día) |
| 18 | P30 · Prueba de aceptación en celular y computadora | Raymond · B | `mobile-first-responsive` (lista de revisión en el celular real) |

## 5. Lo que está en el Notion y no se usa aquí

| Del Notion | Por qué no |
| --- | --- |
| `commerce-product-pages` | Es para fichas de producto de la ferretería; esta herramienta no tiene productos ni carrito. |
| ReactDrops | El Kit lo reserva para efectos visuales puntuales; DESIGN.md no pide ninguno y limita el movimiento. |
| ECC (Everything Claude Code) y packs de agentes | El Kit pide expresamente no instalarlos (contexto muerto en cada turno). |
| Playwright y Sentry | El Kit los recomienda para producción; para la demo del Avance 3 la verificación es manual con los criterios de cada paso y Vitest para la lógica. Quedan para después. |
| Chats e investigación (ChatGPT, Claude, Gemini, Copilot, DeepSeek, Perplexity, Consensus, NotebookLM, Explainpaper, Semantic Scholar, Elicit, Research Rabbit) y los prompts de Taller | Son de la página «Investigación y Taller» y «Chats de IA», no de construir la app. |
| Vercel (paginawebmaribel) | Es el panel de otro proyecto. |

## 6. Hábitos del Kit que se aplican siempre

Del **Kit Inicial Web** (Flujo para Agentes y Ahorro de Tokens, Seguridad y Migraciones):

- Un objetivo por prompt: qué cambiar, en qué archivos y cómo se verifica. Diffs mínimos, sin reformatear archivos ajenos.
- El agente abre solo las skills y documentos que la tarea necesita; no se lee el repo entero «por si acaso».
- No se leen ni se imprimen archivos `.env`; no se pegan claves en el chat.
- Supabase: `getUser()` o `getClaims()` para decidir accesos, nunca solo `getSession()`; nada de `select('*')`; `service_role` solo en el servidor; RLS en todas las tablas en la misma migración que las crea.
- Antes del PR: lint, typecheck, pruebas y build. Push a producción y migraciones en producción solo con aprobación de Joshua.
