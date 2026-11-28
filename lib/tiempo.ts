import type { TemporizadorVista } from "@/lib/tipos";
import { calcularEstado, type DatosEstado } from "@/lib/estados";

const MINUTO_MS = 60_000;

export function formatearHora(fecha: Date): string {
  const partes = new Intl.DateTimeFormat("es-EC", {
    timeZone: "America/Guayaquil",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(fecha);
  const hora = partes.find((parte) => parte.type === "hour")?.value ?? "00";
  const minuto = partes.find((parte) => parte.type === "minute")?.value ?? "00";
  return `${hora}:${minuto}`;
}

export function textoDuracion(minutos: number): string {
  const enteros = Math.max(0, minutos);
  const horas = Math.floor(enteros / 60);
  const resto = enteros % 60;
  if (horas === 0) return `${resto} min`;
  if (resto === 0) return `${horas} h`;
  return `${horas} h ${resto} min`;
}

export function temporizador(datos: DatosEstado, ahora: Date): TemporizadorVista {
  const conAhora = { ...datos, ahora };
  const estado = calcularEstado(conAhora);

  if (estado === "completada" && datos.completadaEn) {
    return {
      palabra: "Completada",
      valor: formatearHora(datos.completadaEn),
      tono: "listo",
    };
  }

  if (estado === "vencida") {
    const minutos = Math.floor((ahora.getTime() - datos.venceEn.getTime()) / MINUTO_MS);
    return {
      palabra: "Venció hace",
      valor: textoDuracion(minutos),
      tono: "error",
    };
  }

  const minutos = Math.floor((datos.venceEn.getTime() - ahora.getTime()) / MINUTO_MS);
  const porVencer = minutos <= 60;
  return {
    palabra: "Faltan",
    valor: textoDuracion(minutos),
    tono: porVencer ? "aviso" : "normal",
  };
}
