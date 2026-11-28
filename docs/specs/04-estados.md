# 04 · Estados, marcas y temporizador

**Paso:** P3 · **Rama:** `feat/estados-tarea` · **Dueño:** Joshua · **Estado:** lista

## 1. Objetivo

Una sola función pura en TypeScript para el estado, las marcas y el temporizador. No lee la hora del sistema: `ahora` entra por parámetro. La vista `tareas_vista` usa las mismas reglas.

## 2. Requisitos que cubre

| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| Un solo estado | PRD R11 | `calcularEstado` devuelve uno de los cinco |
| Marcas | PRD R12, R13, R24 | `calcularMarcas` |
| Horas de Ecuador | PRD R10, S-21 | `formatearHora` con `America/Guayaquil` |
| Temporizador con palabra | PRD R15, DESIGN.md D-20 | `temporizador` |
| Bloqueo de 15 min | S-48 | La marca «en edición» dura menos de 15 min |

## 3. Fuera de alcance

No consulta Supabase. No pinta insignias (P2). El bloqueo se toma y se suelta en P15; aquí solo se interpreta `editandoDesde`.

## 4. Diseño técnico

```ts
interface DatosEstado {
  responsables: number;
  pasosMarcados: number;
  venceEn: Date;
  ahora: Date;
  urgente: boolean;
  editandoDesde: Date | null;
  completadaEn: Date | null;
}
```

`calcularEstado(datos)` y `calcularMarcas(datos)` viven en `lib/estados.ts`. `temporizador(datos, ahora)` y `formatearHora(fecha)` viven en `lib/tiempo.ts`. `temporizador` usa el `ahora` del argumento, no `datos.ahora`, para no llamar a `Date.now()`.

Estado, en este orden (el primero que cumpla):

1. `completada` si `completadaEn` no es nulo.
2. `vencida` si `ahora >= venceEn`.
3. `sin_asignar` si `responsables === 0`.
4. `en_ejecucion` si `pasosMarcados > 0`.
5. `pendiente`.

Marcas, en este orden, solo las que aplican: `urgente`, `por_vencer`, `en_edicion`, `fuera_de_hora`.

- `por_vencer`: el estado es `sin_asignar`, `pendiente` o `en_ejecucion`, y faltan 60 minutos o menos. A los 60 exactos ya cuenta. Al llegar la hora el estado ya es `vencida` y la marca no va.
- `en_edicion`: `editandoDesde` no es nulo y `ahora - editandoDesde < 15 min`. A los 15 exactos el bloqueo ya no vale.
- `fuera_de_hora`: hay `completadaEn` y `completadaEn >= venceEn`. [SUPUESTO S-38] completar en el minuto exacto del vencimiento es fuera de hora.

Temporizador:

| Situación | palabra | valor | tono |
| --- | --- | --- | --- |
| Completada | Completada | hora `HH:MM` de `completadaEn` | listo |
| Vencida | Venció hace | duración | error |
| Por vencer | Faltan | duración | aviso |
| El resto, con hora futura | Faltan | duración | normal |

Duración, en minutos enteros hacia abajo: menos de 60 → `42 min`; horas justas → `2 h`; horas y minutos → `2 h 42 min`. [SUPUESTO] 60 minutos exactos se escriben `1 h`. En el instante del vencimiento: `0 min`.

## 5. Casos y bordes

`ahora` fijo: 2026-12-02 15:00:00 Z (10:00 en Ecuador). `editandoDesde` y `completadaEn` van en minutos respecto de `ahora` cuando se indican. `vence` va en minutos respecto de `ahora` (negativo = ya pasó).

| # | resp. | pasos | vence | urgente | edición | completada | estado | marcas | temporizador |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | +120 | no | — | — | sin_asignar | — | Faltan · 2 h · normal |
| 2 | 0 | 2 | +120 | no | — | — | sin_asignar | — | Faltan · 2 h · normal |
| 3 | 0 | 0 | 0 | no | — | — | vencida | — | Venció hace · 0 min · error |
| 4 | 1 | 0 | +120 | no | — | — | pendiente | — | Faltan · 2 h · normal |
| 5 | 2 | 1 | +120 | no | — | — | en_ejecucion | — | Faltan · 2 h · normal |
| 6 | 1 | 0 | +60 | no | — | — | pendiente | por_vencer | Faltan · 1 h · aviso |
| 7 | 1 | 1 | +42 | no | — | — | en_ejecucion | por_vencer | Faltan · 42 min · aviso |
| 8 | 1 | 1 | +162 | no | — | — | en_ejecucion | — | Faltan · 2 h 42 min · normal |
| 9 | 1 | 3 | 0 | no | — | — | vencida | — | Venció hace · 0 min · error |
| 10 | 1 | 3 | -18 | no | — | — | vencida | — | Venció hace · 18 min · error |
| 11 | 1 | 2 | +30 | no | — | -48 min, hora 09:12 | completada | — | Completada · 09:12 · listo |
| 12 | 1 | 2 | -10 | no | — | 0 | completada | fuera_de_hora | Completada · 10:00 · listo |
| 13 | 1 | 0 | +180 | sí | — | — | pendiente | urgente | Faltan · 3 h · normal |
| 14 | 1 | 0 | +180 | no | -10 min | — | pendiente | en_edicion | Faltan · 3 h · normal |
| 15 | 1 | 0 | +180 | no | -15 min | — | pendiente | — | Faltan · 3 h · normal |
| 16 | 1 | 0 | +180 | no | -14 min | — | pendiente | en_edicion | Faltan · 3 h · normal |
| 17 | 0 | 1 | +30 | no | — | — | sin_asignar | por_vencer | Faltan · 30 min · aviso |
| 18 | 1 | 1 | +20 | sí | -5 min | — | en_ejecucion | urgente, por_vencer, en_edicion | Faltan · 20 min · aviso |
| 19 | 1 | 2 | -5 | sí | — | +1 min sobre el vencimiento | completada | urgente, fuera_de_hora | Completada · hora de Ecuador · listo |
| 20 | 0 | 0 | -1 | sí | — | — | vencida | urgente | Venció hace · 1 min · error |

El caso 2 es Sin asignar con pasos marcados (R6). El 6 es el borde de 60 min. El 9 es el minuto exacto del vencimiento. El 12 es completada fuera de hora. El 15 es un bloqueo de 15 min, ya vencido.

## 6. Supuestos y preguntas

- [SUPUESTO S-38] Fuera de hora si se completó en el minuto del vencimiento o después (`completadaEn >= venceEn`).
- [SUPUESTO S-48] El bloqueo vale mientras hayan pasado menos de 15 minutos. A los 15 exactos ya no.
- [SUPUESTO] 60 minutos de duración se escriben `1 h`. Cero minutos vencidos se escriben `0 min`.
- Pregunta para el equipo: ninguna.

## 7. Cómo se verifica

`npm test` recorre la tabla. Cinco casos contra la misma decisión que `tareas_vista` (migración de P1, `security_invoker`, `CASE` con `now()`):

| Caso | Estado en TypeScript | Estado que calcula la vista |
| --- | --- | --- |
| 1 | sin_asignar | sin_asignar (`completada_en` nulo, hora futura, responsables 0) |
| 4 | pendiente | pendiente (hay responsable, cero pasos, hora futura) |
| 5 | en_ejecucion | en_ejecucion (hay paso marcado, hora futura) |
| 9 | vencida | vencida (`now() >= vence_en`, no completada) |
| 11 | completada | completada (`completada_en` no nulo, aunque la hora no haya llegado) |

La vista aún no está aplicada en el proyecto de Supabase: esta comparación es de reglas, no una consulta ejecutada. Cuando P1 se enlace, estos cinco casos se vuelven a correr en SQL. `por_vencer` de la vista usa el mismo corte de 60 minutos (casos 6 y 7).
