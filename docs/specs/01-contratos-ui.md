# 01 · Contratos de interfaz

**Paso:** P0 · **Rama:** `chore/esqueleto` · **Dueño:** Joshua · **Estado:** lista

## 1. Objetivo

Fijar los tipos compartidos y las props de cada componente para que el carril de interfaz reciba datos ya calculados y no importe Supabase ni aplique reglas de negocio.

## 2. Requisitos que cubre

| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| Contrato entre carpetas | AGENTS.md §4 y PLAN.md Anexo A | `lib/tipos.ts` y esta spec publican los mismos tipos y props |
| Estados y marcas | PRD R11, R12 · DESIGN.md D-01 | `EstadoTarea` y `MarcaTarea` usan los nombres del PRD |
| Acciones con aviso | PRD R37 | `ResultadoAccion` devuelve datos o un mensaje listo para el aviso |
| Rutas por perfil | DESIGN.md §5.11 | La tabla de rutas de esta spec; los nombres son decisión técnica |

## 3. Fuera de alcance

Este paso no implementa pantallas ni funciones de usuario. Los componentes los construye Raymond en sus pasos. El cálculo de estado y de tiempo queda en P3 (`lib/estados.ts`, `lib/tiempo.ts`).

## 4. Diseño técnico

Los componentes de `components/**` solo reciben estos tipos ya calculados. Las páginas de `app/` los arman con `lib/estados.ts` y `lib/tiempo.ts`. El código de `lib/tipos.ts` es el del Anexo A, copiado tal cual.

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
export interface EventoEjecucion { tipo: 'inicio' | 'paso' | 'completada'; persona: PersonaResumen; horaTexto: string; detalle?: string }   // detalle: texto del paso

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
| `HistorialEjecucion`, `ReasignarVista` | `eventos: EventoEjecucion[]` · `tarea: TareaTarjeta; opciones: OpcionResponsable[]; seleccionados: string[]; nuevaHora: string; errores?: Record<string,string>; enviando: boolean; onCambiarHora(v); onAlternar(id); onGuardar(); onCancelar()` | P31 |
| `RecuperarVista`, `AvisoActivarAvisos` | `correo: string; estado: 'formulario' \| 'enviado'; error?: string; cargando: boolean; onCambiar(v); onEnviar()` · `estado: 'pedir' \| 'activado' \| 'bloqueado'; onActivar()` | P32 |

**Rutas** [SUPUESTO: nombres de rutas, decisión técnica; los destinos salen de DESIGN.md §5.11]:

| Perfil | Ruta | Paso |
| --- | --- | --- |
| Todos | `/login` | P5 |
| Estudiante | `/mis-tareas`, `/tarea/[id]`, `/completadas` | P9 |
| Ambos | `/perfil` (fuera de los grupos de rutas) | P14 |
| Administrador | `/tablero`, `/tablero/[id]`, `/tareas`, `/tareas/nueva`, `/tareas/[id]/editar`, `/tareas/[id]/reasignar`, `/estudiantes`, `/usuarios` | P7, P11, P14, P15, P17, P20 |
| Público | `/catalogo` (componentes con datos de ejemplo) | P2 |

Un administrador también puede ser responsable y ejecutar tareas (R8, D-S-07): desde el detalle de la tarea en `/tablero/[id]`, si es responsable, ve los controles de ejecución (P20). [SUPUESTO]

## 5. Casos y bordes

- Un componente no recibe datos crudos de la base: recibe `TareaTarjeta`, `TareaDetalle` u otro tipo de esta spec.
- Si falta una prop, se agrega primero aquí y en `lib/tipos.ts`, no en el componente.
- `ResultadoAccion` nunca lanza al cliente: o `ok: true` con datos, o `ok: false` con `error` en español.

## 6. Supuestos y preguntas

- [SUPUESTO] Los nombres de ruta son decisión técnica. Los destinos salen de DESIGN.md §5.11 (PLAN.md Anexo A).
- [SUPUESTO] Un administrador responsable ejecuta la tarea desde `/tablero/[id]` (R8, D-S-07).
- Pregunta para el equipo: ninguna en este paso. Los destinos de navegación siguen abiertos en DESIGN.md SD-06, pero esta spec no los cambia.

## 7. Cómo se verifica

- `lib/tipos.ts` coincide con el bloque de tipos de esta spec.
- `npm run lint`, `npm run typecheck`, `npm test` y `npm run build` pasan.
- La página provisional (`app/page.tsx`) no usa estos tipos todavía: no hay funciones de usuario en P0.
