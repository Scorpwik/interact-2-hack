import { describe, expect, it } from "vitest";
import { formatearHora, textoDuracion } from "@/lib/tiempo";

describe("textoDuracion", () => {
  it("arma minutos, horas justas y horas con minutos", () => {
    expect(textoDuracion(42)).toBe("42 min");
    expect(textoDuracion(60)).toBe("1 h");
    expect(textoDuracion(162)).toBe("2 h 42 min");
    expect(textoDuracion(0)).toBe("0 min");
  });
});

describe("zona horaria", () => {
  it("no usa la zona de la máquina", () => {
    expect(formatearHora(new Date("2026-12-02T05:00:00.000Z"))).toBe("00:00");
  });
});
