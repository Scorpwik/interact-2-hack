import { describe, expect, it } from "vitest";
import type { EstadoTarea } from "../tipos";

describe("humo", () => {
  it("el proyecto reconoce los cinco estados de una tarea", () => {
    const estados: EstadoTarea[] = [
      "sin_asignar",
      "pendiente",
      "en_ejecucion",
      "vencida",
      "completada",
    ];
    expect(estados).toHaveLength(5);
  });
});
