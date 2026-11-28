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
