# Tareas de Raymond Portilla · Avance 3

Tu parte del Avance 3 es la **interfaz de Señal de Turno**: el sistema de componentes de DESIGN.md con su catálogo, la navegación, las pantallas, la app instalable, los datos de demo, el README y las revisiones de diseño y de la demo. Joshua se encarga de la base de datos, la autenticación, las reglas de negocio y de conectar las pantallas con los datos reales.

Los dos trabajamos en paralelo con Cursor, cada uno en sus carpetas y en una rama por paso, para no chocar. Tus componentes reciben los datos por props con los tipos de `lib/tipos.ts` (contratos en `docs/specs/01-contratos-ui.md`), así que puedes construirlos y probarlos en `/catalogo` con datos de ejemplo sin esperar a la base de datos.

## Antes de empezar
- [ ] Acepta la invitación al repo `Scorpwik/interact-2-hack` y clónalo: `git clone https://github.com/Scorpwik/interact-2-hack.git`.
- [ ] Instala Node.js 22.20 o más (lo pide la herramienta de skills; ver `docs/plan/skills.md`) y GitHub CLI (`gh auth login`).
- [ ] Espera el aviso de Joshua de que el paso P0 está en `main`; luego `git pull`, `npm install` y crea `.env.local` con los valores que Joshua te pasa por un canal privado (no los pegues en Cursor ni en el chat).
- [ ] Lee `AGENTS.md`, `DESIGN.md` (sobre todo §4, §5, §6, §8 y §9) y abre en el navegador `docs/diseno/bocetos.html` y `docs/diseno/brand-board.html`.
- [ ] En Cursor, abre la carpeta del repo: las reglas de `.cursor/rules/` se cargan solas.

## Cómo trabajar cada paso
1. `git checkout main && git pull origin main && git checkout -b <rama del paso>`.
2. Pega el prompt del paso en Cursor. El agente escribe primero la spec y luego el código, en los commits del paso.
3. Revisa lo que hizo: que solo toque tus carpetas (`git diff --stat origin/main`), que se vea como en los bocetos y que pase `npm run lint && npm run typecheck && npm run build`.
4. `git fetch origin && git merge origin/main`, `git push -u origin <rama>` y `gh pr create --base main --fill` con la plantilla.
5. Avisa a Joshua para que revise y mergee. Mientras tanto, puedes empezar la spec del paso siguiente en su rama (solo el archivo de `docs/specs/`).

## Tus carpetas
`components/ui-i2h/`, `components/layout/`, `components/pantallas/`, `app/catalogo/`, `public/manifest.webmanifest`, `public/iconos/`, `datos-demo/`, `README.md`, `docs/qa/` y tus specs en `docs/specs/`. Si te hace falta algo fuera de ellas (una dependencia, un tipo nuevo en `lib/tipos.ts`, un cambio en `app/globals.css`), escríbelo en el PR y Joshua lo agrega.


## Mis pasos, en orden

| # | Paso | Rama | Fase | Estimación | Depende de |
| --- | --- | --- | --- | --- | --- |
| 1 | P2 · Componentes base de DESIGN.md y catálogo | `feat/ui-base` | 1 | 1 h 30 min | P0 mergeado. |
| 2 | P4 · Navegación, login visual y aviso sin conexión | `feat/layout-navegacion` | 1 | 1 h 15 min | P2 mergeado. |
| 3 | P6 · Componentes del formulario de tarea | `feat/ui-formulario-tarea` | 1 | 1 h | P2 mergeado. |
| 4 | P8 · Componentes de tarea, checklist y deslizar para completar | `feat/ui-tarea` | 1 | 2 h | P2 mergeado. |
| 5 | P10 · Componentes del tablero de cumplimiento | `feat/ui-tablero` | 1 | 1 h | P8 mergeado. |
| 6 | P12 · Revisión de diseño del MVP | `docs/revision-diseno-mvp` | 1 | 45 min | P11 mergeado y desplegado en la vista previa. |
| 7 | P13 · Pantallas de usuarios, estudiantes, perfil y completadas | `feat/ui-pantallas` | 2 | 2 h | P2 mergeado (puede empezar en cuanto termine P12). |
| 8 | P16 · PWA: manifest e íconos | `feat/pwa` | 2 | 45 min | P0 mergeado. |
| 9 | P21 · Datos de demo y README | `feat/datos-demo` | 2 | 1 h 15 min | P1 mergeado (formato en `docs/specs/09-datos-demo.md`). |
| 10 | P22 · Revisión de diseño y textos de todas las pantallas | `docs/revision-diseno-final` | 2 | 1 h | P14 a P20 mergeados. |
| 11 | P28 · CO1: porcentaje de pasos en la tarjeta | `feat/porcentaje-pasos` | 3 | 20 min | P27 mergeado o descartado. |
| 12 | P30 · Prueba de aceptación en celular y computadora | `docs/prueba-demo` | 4 | 1 h | P29 desplegado en producción. |

---

## 1. P2 · Componentes base de DESIGN.md y catálogo

- **Rama:** `feat/ui-base`
- **Responsable:** Raymond
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
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/ui-base` → `gh pr create --base main --title "P2 · Componentes base de DESIGN.md y catálogo"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 2. P4 · Navegación, login visual y aviso sin conexión

- **Rama:** `feat/layout-navegacion`
- **Responsable:** Raymond
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
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/layout-navegacion` → `gh pr create --base main --title "P4 · Navegación, login visual y aviso sin conexión"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 3. P6 · Componentes del formulario de tarea

- **Rama:** `feat/ui-formulario-tarea`
- **Responsable:** Raymond
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
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/ui-formulario-tarea` → `gh pr create --base main --title "P6 · Componentes del formulario de tarea"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 4. P8 · Componentes de tarea, checklist y deslizar para completar

- **Rama:** `feat/ui-tarea`
- **Responsable:** Raymond
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
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/ui-tarea` → `gh pr create --base main --title "P8 · Componentes de tarea, checklist y deslizar para completar"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 5. P10 · Componentes del tablero de cumplimiento

- **Rama:** `feat/ui-tablero`
- **Responsable:** Raymond
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
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/ui-tablero` → `gh pr create --base main --title "P10 · Componentes del tablero de cumplimiento"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 6. P12 · Revisión de diseño del MVP

- **Rama:** `docs/revision-diseno-mvp`
- **Responsable:** Raymond
- **Estimación:** 45 min
- **Depende de:** P11 mergeado y desplegado en la vista previa.
- **Archivos y carpetas del paso:** `docs/qa/revision-diseno-mvp.md` (y correcciones solo en `components/ui-i2h/`, `components/layout/` y `components/pantallas/`).
- **Spec antes de programar:** No aplica: se usa DESIGN.md §9 (D-01 a D-20) como lista.
- **Criterios de aceptación:**
  - [ ] Cada criterio D-01 a D-20 revisado en las pantallas reales (login, mis tareas, detalle, tablero, tareas) en 360, 390 y 1280 px, con «pasa», «no pasa» o «no aplica» y una captura o nota.
  - [ ] Lo que no pasa y es de las carpetas de componentes queda corregido en la misma rama con `fix(ui): …`; lo que es de otras carpetas queda anotado para su dueño.
- **Commits, en este orden:**
  1. `docs(qa): revisión de diseño del MVP contra D-01 a D-20`
  2. `fix(ui): correcciones de la revisión de diseño del MVP`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md secciones 6, 8 y 9 y docs/plan/PLAN.md (paso P12). Estás en la rama docs/revision-diseno-mvp. Solo puedes crear docs/qa/revision-diseno-mvp.md y corregir archivos de components/ui-i2h/, components/layout/ y components/pantallas/.
Objetivo: revisar las pantallas reales del MVP contra los criterios D-01 a D-20.
1. Abre la vista previa de Vercel (o npm run dev) con un usuario administrador y otro estudiante de prueba.
2. Para cada criterio D-01 a D-20, haz la comprobación que indica DESIGN.md sección 9 en login, mis tareas, detalle de tarea, tablero y tareas, en 360, 390 y 1280 px. Anota en docs/qa/revision-diseno-mvp.md una tabla: criterio, pantalla, resultado (pasa / no pasa / no aplica) y nota. Commit: docs(qa): revisión de diseño del MVP contra D-01 a D-20.
3. Corrige lo que no pasa dentro de tus carpetas, sin cambiar las props de docs/specs/01-contratos-ui.md. Commit: fix(ui): correcciones de la revisión de diseño del MVP.
4. Lo que dependa de otras carpetas, déjalo en una sección «Pendiente para otras carpetas» del mismo documento y en el PR.
```

- **PR y merge:** `git push -u origin docs/revision-diseno-mvp` → `gh pr create --base main --title "P12 · Revisión de diseño del MVP"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 7. P13 · Pantallas de usuarios, estudiantes, perfil y completadas

- **Rama:** `feat/ui-pantallas`
- **Responsable:** Raymond
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
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/ui-pantallas` → `gh pr create --base main --title "P13 · Pantallas de usuarios, estudiantes, perfil y completadas"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 8. P16 · PWA: manifest e íconos

- **Rama:** `feat/pwa`
- **Responsable:** Raymond
- **Estimación:** 45 min
- **Depende de:** P0 mergeado.
- **Archivos y carpetas del paso:** `public/manifest.webmanifest`, `public/iconos/**`, `docs/specs/17-pwa.md`.
- **Spec antes de programar:** `docs/specs/17-pwa.md`.
- **Criterios de aceptación:**
  - [ ] La app se puede instalar en Android y en iOS con nombre, color de fondo y de tema #050307 e íconos de 192, 512 y maskable (DESIGN.md §4, brandboard: ícono de app).
  - [ ] Lighthouse no marca errores de instalabilidad.
  - [ ] No hay trabajo sin conexión: sin internet se ve la banda, no una copia vieja (W3).
- **Commits, en este orden:**
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
```

- **PR y merge:** `git push -u origin feat/pwa` → `gh pr create --base main --title "P16 · PWA: manifest e íconos"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 9. P21 · Datos de demo y README

- **Rama:** `feat/datos-demo`
- **Responsable:** Raymond
- **Estimación:** 1 h 15 min
- **Depende de:** P1 mergeado (formato en `docs/specs/09-datos-demo.md`).
- **Archivos y carpetas del paso:** `datos-demo/demo.json`, `README.md`.
- **Spec antes de programar:** `docs/specs/09-datos-demo.md` (ya escrita en P1; este paso la sigue).
- **Criterios de aceptación:**
  - [ ] `datos-demo/demo.json` valida contra el formato de la spec 09 y cubre: 1 administrador además del super administrador, 4 estudiantes con disponibilidad, y tareas en los 5 estados, una por vencer, una urgente, una vencida con pasos y una completada fuera de hora (R11, R12, R27).
  - [ ] Todos los datos están marcados como de ejemplo, con correos `@example.com` y teléfonos de relleno; los nombres, lugares y tareas son los de `docs/diseno/bocetos.html`.
  - [ ] `README.md` explica qué es, cómo instalar, las variables de `.env.example`, cómo correr, probar y cargar la demo, cómo se trabaja por ramas (enlace a PLAN.md) y los créditos.
- **Commits, en este orden:**
  1. `feat(demo): datos de demo con los cinco estados y las marcas`
  2. `docs(readme): instalación, uso, datos de demo y flujo de trabajo`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, docs/plan/PLAN.md (paso P21), docs/specs/09-datos-demo.md, PRD R11, R12, R27 y la sección «Datos de ejemplo» de docs/diseno/bocetos.html. Estás en la rama feat/datos-demo. Solo puedes crear o modificar datos-demo/demo.json y README.md.
Objetivo: un juego de datos de demo que muestre todo el MVP, y el README del proyecto.
1. datos-demo/demo.json exactamente con el formato de la spec 09: el administrador Mateo Cruz; los estudiantes Ana Torres, Luis Mena y Sofía Paredes, y uno más; disponibilidades del día 0; tareas de los bocetos (Preparar Sala 3 para mentorías en ejecución con 3 de 5 pasos y venceEnMinutos 42; Armar mesas de check-in pendiente; Llevar extensiones eléctricas a la Sala 3 urgente; Reponer agua en la mesa de mentores vencida; Ordenar la mesa de premiación sin asignar; Revisar el proyector del teatro completada; Pegar la señalética de baños completada fuera de hora). Correos @example.com, teléfonos 099 000 0000, contraseñas de demo. Ningún dato real del cliente. Commit: feat(demo): datos de demo con los cinco estados y las marcas.
2. README.md: qué es Señal de Turno, requisitos, instalación (npm install), variables (.env.example), npm run dev / lint / typecheck / test / build, cómo cargar la demo (el script lo indica docs/specs/09-datos-demo.md), cómo se trabaja (enlace a AGENTS.md y docs/plan/PLAN.md), equipo y créditos de las fuentes (SIL OFL). Commit: docs(readme): instalación, uso, datos de demo y flujo de trabajo.
```

- **PR y merge:** `git push -u origin feat/datos-demo` → `gh pr create --base main --title "P21 · Datos de demo y README"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 10. P22 · Revisión de diseño y textos de todas las pantallas

- **Rama:** `docs/revision-diseno-final`
- **Responsable:** Raymond
- **Estimación:** 1 h
- **Depende de:** P14 a P20 mergeados.
- **Archivos y carpetas del paso:** `docs/qa/revision-diseno-final.md` (y correcciones en `components/ui-i2h/`, `components/layout/`, `components/pantallas/`).
- **Spec antes de programar:** No aplica: DESIGN.md §9 y §8.
- **Criterios de aceptación:**
  - [ ] D-01 a D-20 revisados en todas las pantallas, en 360, 390, 768 y 1280 px, con teclado y con «reducir movimiento».
  - [ ] Todos los textos de la interfaz en español, en «tú», sin signos de exclamación, con los nombres exactos de estados y marcas (DESIGN.md §8).
  - [ ] Correcciones de las carpetas de componentes hechas; lo demás anotado para su dueño.
- **Commits, en este orden:**
  1. `docs(qa): revisión de diseño y textos de todas las pantallas`
  2. `fix(ui): correcciones de la revisión final de diseño`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md secciones 6, 8 y 9 y docs/plan/PLAN.md (paso P22). Estás en la rama docs/revision-diseno-final. Solo puedes crear docs/qa/revision-diseno-final.md y corregir archivos de components/ui-i2h/, components/layout/ y components/pantallas/.
Objetivo: revisar todas las pantallas (estudiante, administrador y super administrador) contra D-01 a D-20 y las reglas de textos de DESIGN.md sección 8.
1. Con los datos de demo cargados, recorre cada pantalla en 360, 390, 768 y 1280 px, con teclado y con reducir movimiento. Anota una tabla criterio × pantalla con pasa / no pasa / no aplica y una nota. Revisa también cada texto visible. Commit: docs(qa): revisión de diseño y textos de todas las pantallas.
2. Corrige lo que es de tus carpetas sin cambiar props. Commit: fix(ui): correcciones de la revisión final de diseño.
3. Lo demás, en «Pendiente para otras carpetas» y en el PR.
```

- **PR y merge:** `git push -u origin docs/revision-diseno-final` → `gh pr create --base main --title "P22 · Revisión de diseño y textos de todas las pantallas"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 11. P28 · CO1: porcentaje de pasos en la tarjeta

- **Rama:** `feat/porcentaje-pasos`
- **Responsable:** Raymond
- **Estimación:** 20 min
- **Depende de:** P27 mergeado o descartado.
- **Archivos y carpetas del paso:** `components/ui-i2h/TarjetaTarea.tsx`, `components/ui-i2h/BarraProgreso.tsx`, `docs/specs/26-could.md` (sección CO1).
- **Spec antes de programar:** `docs/specs/26-could.md` (sección CO1).
- **Criterios de aceptación:**
  - [ ] La tarjeta muestra «3 de 5 pasos · 60 %» además de «3 de 5» (CO1, R30).
- **Commits, en este orden:**
  1. `docs(specs): porcentaje de pasos`
  2. `feat(ui): porcentaje de pasos en la tarjeta`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md, DESIGN.md 5.2 y PRD R30, CO1. Estás en la rama feat/porcentaje-pasos. Solo puedes modificar components/ui-i2h/TarjetaTarea.tsx, components/ui-i2h/BarraProgreso.tsx y docs/specs/26-could.md (sección CO1). Agrega el porcentaje calculado de marcados/total al texto de la barra, sin cambiar las props. Haz estos commits, en este orden: docs(specs): porcentaje de pasos; feat(ui): porcentaje de pasos en la tarjeta.
```

- **PR y merge:** `git push -u origin feat/porcentaje-pasos` → `gh pr create --base main --title "P28 · CO1: porcentaje de pasos en la tarjeta"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.

---

## 12. P30 · Prueba de aceptación en celular y computadora

- **Rama:** `docs/prueba-demo`
- **Responsable:** Raymond
- **Estimación:** 1 h
- **Depende de:** P29 desplegado en producción.
- **Archivos y carpetas del paso:** `docs/qa/prueba-demo.md`.
- **Spec antes de programar:** No aplica: guion de demo (sección 6 de este plan) y criterios de cada paso.
- **Criterios de aceptación:**
  - [ ] Cada paso del guion de demo probado en producción en un celular real (Android o iOS) y en una computadora, con resultado y captura.
  - [ ] Probado sin conexión (modo avión) en el celular: banda visible y pasos bloqueados (D-11).
  - [ ] Cualquier falla anotada con pasos para reproducirla y avisada a Joshua antes de las 20:00 del martes.
- **Commits, en este orden:**
  1. `docs(qa): prueba de aceptación del Avance 3 en celular y computadora`
- **Prompt para Cursor** (pegar tal cual, en la rama del paso):

```text
Lee AGENTS.md y la sección 6 (guion de demo) de docs/plan/PLAN.md. Estás en la rama docs/prueba-demo. Solo puedes crear docs/qa/prueba-demo.md.
Recorre el guion completo en producción, con los usuarios de datos-demo/demo.json, en un celular real y en una computadora. Para cada paso anota: dispositivo, resultado esperado, resultado obtenido, pasa / no pasa y captura. Prueba también el modo avión en el celular. Commit: docs(qa): prueba de aceptación del Avance 3 en celular y computadora. Abre el PR y avisa a Joshua de cualquier «no pasa».
```

- **PR y merge:** `git push -u origin docs/prueba-demo` → `gh pr create --base main --title "P30 · Prueba de aceptación en celular y computadora"` con la plantilla. Joshua revisa la vista previa de Vercel y los criterios, y mergea con `gh pr merge --merge --delete-branch`.
