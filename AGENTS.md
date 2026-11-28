# AGENTS.md — harness de desarrollo · Señal de Turno

Este archivo es el harness para los agentes de Cursor (y para cualquier persona) que programen la herramienta de organización de staff del Interact2Hack. **Léelo entero antes de cada tarea.** Equipo: Joshua Lozada y Raymond Portilla. Entrega: Avance 3, miércoles 2 de diciembre de 2026.

## 1. Qué leer siempre, en este orden

1. **`docs/plan/PLAN.md`**: el paso que te toca, con su rama, sus carpetas, sus dependencias y sus criterios de aceptación.
2. **`docs/specs/`**: la spec del paso (se escribe **antes** de programar) y las specs de las que depende. Siempre: `00-arquitectura.md` y `01-contratos-ui.md`.
3. **`docs/prd/PRD.md`**: las reglas de negocio (R1–R37), el alcance (M1–M15, SH1–SH6, CO1–CO2, W1–W4) y los supuestos (S-xx).
4. **`DESIGN.md`**: tokens, componentes, accesibilidad, reglas para el agente (sección 8) y criterios D-01 a D-20 (sección 9).
5. Como referencia visual: `docs/diseno/bocetos.html` y `docs/diseno/brand-board.html`. **Si algo no coincide, manda DESIGN.md.**
6. **`docs/plan/skills.md`**: qué skills de Cursor usa cada paso. El prompt de cada paso ya las nombra; ábrelas solo cuando hagan falta.

Orden de autoridad ante una contradicción: **PRD** (qué hace) › **DESIGN.md** (cómo se ve) › **spec del paso** (cómo se construye) › bocetos. Si la contradicción es real, no la resuelvas: anótala en la spec como pregunta abierta y avísale al dueño del paso.

## 2. Reglas que no se rompen

1. **No inventes requisitos.** Todo comportamiento sale de una regla del PRD (R#) o de un Must/Should (M#/SH#). Lo que el PRD no define se marca **[SUPUESTO]** en la spec, citando la R# o la S-xx más cercana, y se deja lo más simple posible. Las decisiones técnicas (tablas, rutas, librerías) van en las specs, no en el PRD.
2. **Sigue DESIGN.md al pie de la letra.** Solo tokens (`var(--…)` o las clases de Tailwind mapeadas a tokens), radio 0, nombres exactos de estados y marcas, estado siempre con texto + ícono, áreas táctiles de 48 px (56 px en filas de checklist y en el deslizador), foco lima visible, sin modo claro, español en «tú» y sin signos de exclamación. Repasa la sección 8 de DESIGN.md antes de entregar.
3. **Una rama por paso del plan.** Nunca se trabaja en `main`. El nombre de la rama es el que dice el plan.
4. **Toca solo las carpetas de tu paso.** Cada paso del plan lista sus archivos. Si necesitas cambiar un archivo de otro paso o de otra persona, **no lo edites**: escribe en el PR qué necesitas y avísale a su dueño.
5. **Commits convencionales, en español** y en el orden que dice el plan: `tipo(ámbito): descripción en minúscula, sin punto final`. Tipos: `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `chore`, `ci`. Un commit = un cambio que compila.
6. **Dependencias nuevas:** solo se agregan en una rama `chore/deps-…` de quien administra el repo (ver PLAN.md, sección 2). Si te hace falta una librería, pídela en el PR.
7. **Secretos:** nunca en el código ni en commits. Solo en `.env.local` (ignorado por git) y en las variables de Vercel. Las claves de Supabase las pega Joshua a mano; el agente **no lee, no imprime y no edita** `.env.local`, y nadie pega claves en un prompt. `SUPABASE_SERVICE_ROLE_KEY` solo se usa en código de servidor (`lib/supabase/admin.ts`), nunca en un componente de cliente.
8. **Las reglas de negocio se aplican en el servidor.** Lo que el PRD prohíbe (editar en ejecución, empezar otra tarea, marcar sin ser responsable…) se impide en Postgres (RLS, funciones RPC) o en acciones de servidor; la interfaz solo lo refleja.

## 3. Stack

| Capa | Elección |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript estricto |
| Estilos | Tailwind CSS con los tokens de DESIGN.md (sección 4) en `app/globals.css`; shadcn/ui como base, configurado con radio 0 |
| Íconos | `lucide-react` con `strokeWidth={2.4}` y tamaño 24 (16 en insignias), como pide DESIGN.md |
| Fuentes | Big Shoulders Display (700, 900) y Sora (400, 600) locales con `next/font/local`, desde `docs/diseno/fuentes/` copiadas a `app/fuentes/` (D-18) |
| Datos y auth | Supabase: Auth (correo + contraseña), Postgres con RLS, funciones RPC y Realtime; `@supabase/ssr`. Proyecto **nuevo**, creado por Joshua para este repo; no se usa ningún otro proyecto ni conexión de Supabase |
| Validación | `zod` en las acciones de servidor |
| Pruebas | Vitest para la lógica pura (`lib/**`); revisión manual guiada por los criterios D-## y los de cada paso |
| Despliegue | Vercel, team **`scorpwik`** (una vista previa por rama y producción desde `main`) |
| Super administrador | Un único usuario fijo leído de `SUPER_ADMIN_EMAIL`. Hoy es **provisional**: `superadmin@interact2hack.test`. Nunca se escribe el correo en el código; se cambia solo en la variable (R3) |
| Rutas protegidas | `proxy.ts` en la raíz (en Next.js 16 reemplaza a `middleware.ts`) |
| PWA | `public/manifest.webmanifest` + íconos; sin trabajo sin conexión (W3) |
| Zona horaria | `America/Guayaquil` para mostrar y comparar horas (R10, [SUPUESTO S-21]) |

## 4. Estructura y dueños de carpetas

El reparto exacto por paso está en `docs/plan/PLAN.md`. A grandes rasgos:

| Carpeta | Contenido | Dueño |
| --- | --- | --- |
| `app/(auth)/`, `app/(estudiante)/`, `app/(admin)/`, `app/api/` | Rutas con datos reales, acciones de servidor | Joshua |
| `app/catalogo/` | Catálogo de componentes con datos de ejemplo | Raymond |
| `components/ui-i2h/` | Componentes de DESIGN.md (insignias, botones, avisos, tarjetas, checklist, deslizador, formulario, tablero) | Raymond |
| `components/layout/` | Navegación, barra inferior y superior, banda sin conexión | Raymond |
| `components/pantallas/` | Vistas presentacionales que reciben datos por props | Raymond |
| `components/ui/` | Componentes generados por shadcn/ui (no se editan a mano) | Joshua |
| `lib/` | Tipos, estados, tiempo, clientes de Supabase, acciones | Joshua |
| `supabase/` | Migraciones, políticas RLS, funciones | Joshua |
| `scripts/` | Super administrador, carga de datos de demo | Joshua |
| `datos-demo/` | Datos de demo en el formato de `docs/specs/09-datos-demo.md` | Raymond |
| `public/` | Manifest e íconos de la PWA | Raymond |
| `app/globals.css`, `app/layout.tsx`, `tailwind`, `package.json`, configuración | Base del proyecto | Joshua |
| `docs/specs/NN-*.md` | La spec de cada paso | Dueño del paso |
| `docs/qa/` | Revisiones de diseño y pruebas de demo | Raymond |
| `README.md` | Cómo correr y desplegar | Raymond |

**Contrato entre carpetas:** los componentes de `components/**` **no** importan nada de `lib/supabase`, ni hacen fetch, ni conocen reglas de negocio. Reciben datos ya calculados por props con los tipos de `lib/tipos.ts` y avisan con callbacks (`onMarcar`, `onCompletar`, `onGuardar`…). Las props están fijadas en `docs/specs/01-contratos-ui.md`; si un componente necesita una prop nueva, se agrega primero a esa spec.

## 5. Convenciones de código

- Nombres de dominio en español (`tarea`, `paso`, `responsable`, `venceEn`), igual que el PRD. Componentes en PascalCase (`TarjetaTarea.tsx`), funciones en camelCase.
- Server Components por defecto; `"use client"` solo donde hay interacción.
- Las acciones de servidor devuelven `{ ok: true, datos } | { ok: false, error: string }` con un mensaje listo para el aviso (R37). Nunca lanzan al cliente.
- Las horas se guardan como `timestamptz` y se muestran en `America/Guayaquil` con `lib/tiempo.ts`.
- El estado de una tarea se calcula **solo** con `lib/estados.ts` (cliente) y la vista `tareas_vista` (Postgres), y ambos pasan los mismos casos de `docs/specs/04-estados.md`.
- Sin valores de color, espacio, tamaño o duración escritos a mano en `components/**` (D-09).

## 6. Cómo trabajar un paso (flujo para el agente)

1. `git checkout main && git pull` y crea la rama del paso: `git checkout -b <rama>`.
2. Escribe o completa la spec del paso en `docs/specs/` con la plantilla de `docs/specs/README.md`. Commit `docs(specs): …`.
3. Programa solo dentro de las carpetas del paso, en los commits que dice el plan.
4. Verifica (sección 7). Si algo falla, arréglalo antes de seguir.
5. `git fetch origin && git merge origin/main`, vuelve a verificar y `git push -u origin <rama>`.
6. Abre el PR con `gh pr create --base main` y la plantilla de `.github/pull_request_template.md`.

## 7. Cómo verificar antes de abrir un PR

```bash
npm run lint        # sin errores
npm run typecheck   # tsc --noEmit sin errores
npm test            # vitest: todas las pruebas pasan
npm run build       # el build de Next.js termina
```

Además:
- **Criterios del paso** (PLAN.md): cada uno marcado en el PR con cómo lo comprobaste.
- **Diseño:** los criterios D-## que el paso cita, en 390 px y 1280 px, con teclado y con «reducir movimiento». Sin scroll horizontal en 360 px (D-15).
- **Reglas de negocio:** probadas con dos usuarios (un administrador y un estudiante) en la vista previa de Vercel o en local.
- **Nada de otra carpeta:** `git diff --stat origin/main` solo muestra archivos del paso.

## 8. Skills de Cursor

Las skills del proyecto están en el repo y Cursor las carga solo: `.agents/skills/` (`web-design-guidelines`, `accessibility`, `frontend-design`, `ux-writing`, `supabase-postgres-best-practices`, con versión fijada en `skills-lock.json`) y `.cursor/skills/` (`mobile-first-responsive`, `ui-design-critique`, adaptadas a este proyecto). Impeccable se instala en cada máquina. Lista, fuentes, licencias e instalación: **`docs/plan/skills.md`**.

- Una skill **recomienda**; el PRD y DESIGN.md **deciden**. Si una skill propone otra paleta, otra fuente, esquinas redondeadas o un requisito nuevo, no se aplica.
- Impeccable: solo `/impeccable critique`, `/impeccable audit` y `npx impeccable detect`. **Nunca** `/impeccable init` ni `/impeccable document`.
- No se agregan skills, packs de agentes ni servidores MCP sin acordarlo (presupuesto de contexto del Kit Inicial Web). Las skills del repo no se editan a mano: se actualizan con `npx skills update` en una rama `chore/skills-…`.
- Hábitos del Kit: un objetivo por prompt, diffs mínimos, no leer ni imprimir `.env*`, `getUser()`/`getClaims()` en vez de solo `getSession()`, nunca `select('*')`.
