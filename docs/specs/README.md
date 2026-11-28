# Specs

Cada paso de `docs/plan/PLAN.md` tiene una spec que **se escribe antes de programar** y va en el primer commit de su rama (`docs(specs): …`). La spec dice cómo se construye lo que piden el PRD y DESIGN.md; no agrega requisitos.

## Índice

| Spec | Paso | Dueño |
| --- | --- | --- |
| `00-arquitectura.md` | P0 | Joshua |
| `01-contratos-ui.md` | P0 | Joshua |
| `02-datos-y-rls.md` | P1 | Joshua |
| `03-ui-base.md` | P2 | Raymond |
| `04-estados.md` | P3 | Joshua |
| `05-layout-navegacion.md` | P4 | Raymond |
| `06-auth-perfiles.md` | P5 | Joshua |
| `07-ui-formulario-tarea.md` | P6 | Raymond |
| `08-crear-tarea.md` | P7 | Joshua |
| `09-datos-demo.md` | P1 (formato) | Joshua |
| `10-ui-tarea.md` | P8 | Raymond |
| `11-ejecucion.md` | P9 | Joshua |
| `12-ui-tablero.md` | P10 | Raymond |
| `13-tablero.md` | P11 | Joshua |
| `14-ui-pantallas.md` | P13 | Raymond |
| `15-usuarios.md` | P14 | Joshua |
| `16-edicion-bloqueo.md` | P15 | Joshua |
| `17-pwa.md` | P16 | Raymond |
| `18-asignacion-urgentes.md` | P17 | Joshua |
| `19-reglas-ejecucion.md` | P18 | Joshua |
| `20-tiempo-real.md` | P19 | Joshua |
| `21-tablero-panel.md` | P20 | Joshua |
| `22-historial-horas.md` | P23 | Joshua |
| `23-reabrir.md` | P24 | Joshua |
| `24-correo.md` | P25 | Joshua |
| `25-aviso-cerrada.md` | P26 | Joshua |
| `26-could.md` | P27–P28 | Raymond (CO1) y Joshua (CO2) |

## Plantilla

```markdown
# NN · Título

**Paso:** Pn · **Rama:** `feat/...` · **Dueño:** Nombre · **Estado:** borrador | lista | implementada

## 1. Objetivo
Qué resuelve, en una o dos frases.

## 2. Requisitos que cubre
| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| R16 Completar | PRD §6 | … |
| D-12 | DESIGN.md §9 | … |

## 3. Fuera de alcance
Lo que este paso no hace (y en qué paso se hace).

## 4. Diseño técnico
Archivos, tipos, props, tablas, funciones o rutas. Solo lo necesario.

## 5. Casos y bordes
Lista de casos concretos (entrada → resultado esperado), incluidos los errores y sus mensajes (R37).

## 6. Supuestos y preguntas
- [SUPUESTO] … (cita la R# o S-xx del PRD)
- Pregunta para el equipo: …

## 7. Cómo se verifica
Pasos concretos, con usuario, pantalla y resultado. Incluye los criterios D-## que aplican.
```
