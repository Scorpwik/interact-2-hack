import { describe, expect, it } from "vitest";
import { calcularEstado, calcularMarcas, type DatosEstado } from "@/lib/estados";
import { formatearHora, temporizador } from "@/lib/tiempo";
import type { EstadoTarea, MarcaTarea, TemporizadorVista } from "@/lib/tipos";

const AHORA = new Date("2026-12-02T15:00:00.000Z");

function min(base: Date, minutos: number): Date {
  return new Date(base.getTime() + minutos * 60_000);
}

function caso(parcial: {
  responsables: number;
  pasosMarcados: number;
  venceMin: number;
  urgente?: boolean;
  edicionMin?: number;
  completadaMin?: number;
}): DatosEstado {
  return {
    responsables: parcial.responsables,
    pasosMarcados: parcial.pasosMarcados,
    venceEn: min(AHORA, parcial.venceMin),
    ahora: AHORA,
    urgente: parcial.urgente ?? false,
    editandoDesde:
      parcial.edicionMin === undefined ? null : min(AHORA, parcial.edicionMin),
    completadaEn:
      parcial.completadaMin === undefined ? null : min(AHORA, parcial.completadaMin),
  };
}

const tabla: Array<{
  id: number;
  datos: DatosEstado;
  estado: EstadoTarea;
  marcas: MarcaTarea[];
  temporizador: TemporizadorVista;
}> = [
  {
    id: 1,
    datos: caso({ responsables: 0, pasosMarcados: 0, venceMin: 120 }),
    estado: "sin_asignar",
    marcas: [],
    temporizador: { palabra: "Faltan", valor: "2 h", tono: "normal" },
  },
  {
    id: 2,
    datos: caso({ responsables: 0, pasosMarcados: 2, venceMin: 120 }),
    estado: "sin_asignar",
    marcas: [],
    temporizador: { palabra: "Faltan", valor: "2 h", tono: "normal" },
  },
  {
    id: 3,
    datos: caso({ responsables: 0, pasosMarcados: 0, venceMin: 0 }),
    estado: "vencida",
    marcas: [],
    temporizador: { palabra: "Venció hace", valor: "0 min", tono: "error" },
  },
  {
    id: 4,
    datos: caso({ responsables: 1, pasosMarcados: 0, venceMin: 120 }),
    estado: "pendiente",
    marcas: [],
    temporizador: { palabra: "Faltan", valor: "2 h", tono: "normal" },
  },
  {
    id: 5,
    datos: caso({ responsables: 2, pasosMarcados: 1, venceMin: 120 }),
    estado: "en_ejecucion",
    marcas: [],
    temporizador: { palabra: "Faltan", valor: "2 h", tono: "normal" },
  },
  {
    id: 6,
    datos: caso({ responsables: 1, pasosMarcados: 0, venceMin: 60 }),
    estado: "pendiente",
    marcas: ["por_vencer"],
    temporizador: { palabra: "Faltan", valor: "1 h", tono: "aviso" },
  },
  {
    id: 7,
    datos: caso({ responsables: 1, pasosMarcados: 1, venceMin: 42 }),
    estado: "en_ejecucion",
    marcas: ["por_vencer"],
    temporizador: { palabra: "Faltan", valor: "42 min", tono: "aviso" },
  },
  {
    id: 8,
    datos: caso({ responsables: 1, pasosMarcados: 1, venceMin: 162 }),
    estado: "en_ejecucion",
    marcas: [],
    temporizador: { palabra: "Faltan", valor: "2 h 42 min", tono: "normal" },
  },
  {
    id: 9,
    datos: caso({ responsables: 1, pasosMarcados: 3, venceMin: 0 }),
    estado: "vencida",
    marcas: [],
    temporizador: { palabra: "Venció hace", valor: "0 min", tono: "error" },
  },
  {
    id: 10,
    datos: caso({ responsables: 1, pasosMarcados: 3, venceMin: -18 }),
    estado: "vencida",
    marcas: [],
    temporizador: { palabra: "Venció hace", valor: "18 min", tono: "error" },
  },
  {
    id: 11,
    datos: caso({ responsables: 1, pasosMarcados: 2, venceMin: 30, completadaMin: -48 }),
    estado: "completada",
    marcas: [],
    temporizador: { palabra: "Completada", valor: "09:12", tono: "listo" },
  },
  {
    id: 12,
    datos: caso({ responsables: 1, pasosMarcados: 2, venceMin: -10, completadaMin: 0 }),
    estado: "completada",
    marcas: ["fuera_de_hora"],
    temporizador: { palabra: "Completada", valor: "10:00", tono: "listo" },
  },
  {
    id: 13,
    datos: caso({ responsables: 1, pasosMarcados: 0, venceMin: 180, urgente: true }),
    estado: "pendiente",
    marcas: ["urgente"],
    temporizador: { palabra: "Faltan", valor: "3 h", tono: "normal" },
  },
  {
    id: 14,
    datos: caso({ responsables: 1, pasosMarcados: 0, venceMin: 180, edicionMin: -10 }),
    estado: "pendiente",
    marcas: ["en_edicion"],
    temporizador: { palabra: "Faltan", valor: "3 h", tono: "normal" },
  },
  {
    id: 15,
    datos: caso({ responsables: 1, pasosMarcados: 0, venceMin: 180, edicionMin: -15 }),
    estado: "pendiente",
    marcas: [],
    temporizador: { palabra: "Faltan", valor: "3 h", tono: "normal" },
  },
  {
    id: 16,
    datos: caso({ responsables: 1, pasosMarcados: 0, venceMin: 180, edicionMin: -14 }),
    estado: "pendiente",
    marcas: ["en_edicion"],
    temporizador: { palabra: "Faltan", valor: "3 h", tono: "normal" },
  },
  {
    id: 17,
    datos: caso({ responsables: 0, pasosMarcados: 1, venceMin: 30 }),
    estado: "sin_asignar",
    marcas: ["por_vencer"],
    temporizador: { palabra: "Faltan", valor: "30 min", tono: "aviso" },
  },
  {
    id: 18,
    datos: caso({
      responsables: 1,
      pasosMarcados: 1,
      venceMin: 20,
      urgente: true,
      edicionMin: -5,
    }),
    estado: "en_ejecucion",
    marcas: ["urgente", "por_vencer", "en_edicion"],
    temporizador: { palabra: "Faltan", valor: "20 min", tono: "aviso" },
  },
  {
    id: 19,
    datos: caso({
      responsables: 1,
      pasosMarcados: 2,
      venceMin: -5,
      urgente: true,
      completadaMin: -4,
    }),
    estado: "completada",
    marcas: ["urgente", "fuera_de_hora"],
    temporizador: { palabra: "Completada", valor: "09:56", tono: "listo" },
  },
  {
    id: 20,
    datos: caso({ responsables: 0, pasosMarcados: 0, venceMin: -1, urgente: true }),
    estado: "vencida",
    marcas: ["urgente"],
    temporizador: { palabra: "Venció hace", valor: "1 min", tono: "error" },
  },
];

describe("estados y temporizador", () => {
  it.each(tabla)("caso $id", ({ datos, estado, marcas, temporizador: esperado }) => {
    expect(calcularEstado(datos)).toBe(estado);
    expect(calcularMarcas(datos)).toEqual(marcas);
    expect(temporizador(datos, datos.ahora)).toEqual(esperado);
  });
});

describe("formatearHora", () => {
  it("muestra la hora de Ecuador", () => {
    expect(formatearHora(new Date("2026-12-02T14:12:00.000Z"))).toBe("09:12");
  });
});
