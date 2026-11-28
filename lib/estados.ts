import type { EstadoTarea, MarcaTarea } from "@/lib/tipos";

export interface DatosEstado {
  responsables: number;
  pasosMarcados: number;
  venceEn: Date;
  ahora: Date;
  urgente: boolean;
  editandoDesde: Date | null;
  completadaEn: Date | null;
}

export function calcularEstado(_datos: DatosEstado): EstadoTarea {
  throw new Error("pendiente");
}

export function calcularMarcas(_datos: DatosEstado): MarcaTarea[] {
  throw new Error("pendiente");
}
