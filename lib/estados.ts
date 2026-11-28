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

const MINUTO_MS = 60_000;
const BLOQUEO_MS = 15 * MINUTO_MS;
const POR_VENCER_MS = 60 * MINUTO_MS;

export function calcularEstado(datos: DatosEstado): EstadoTarea {
  if (datos.completadaEn) return "completada";
  if (datos.ahora.getTime() >= datos.venceEn.getTime()) return "vencida";
  if (datos.responsables === 0) return "sin_asignar";
  if (datos.pasosMarcados > 0) return "en_ejecucion";
  return "pendiente";
}

export function calcularMarcas(datos: DatosEstado): MarcaTarea[] {
  const estado = calcularEstado(datos);
  const marcas: MarcaTarea[] = [];
  const faltaMs = datos.venceEn.getTime() - datos.ahora.getTime();

  if (datos.urgente) marcas.push("urgente");

  if (
    (estado === "sin_asignar" || estado === "pendiente" || estado === "en_ejecucion") &&
    faltaMs <= POR_VENCER_MS
  ) {
    marcas.push("por_vencer");
  }

  if (
    datos.editandoDesde &&
    datos.ahora.getTime() - datos.editandoDesde.getTime() < BLOQUEO_MS
  ) {
    marcas.push("en_edicion");
  }

  if (datos.completadaEn && datos.completadaEn.getTime() >= datos.venceEn.getTime()) {
    marcas.push("fuera_de_hora");
  }

  return marcas;
}
