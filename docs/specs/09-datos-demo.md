# 09 · Datos de demo

**Paso:** P1 (formato) · **Rama:** `feat/esquema-datos` · **Dueño:** Joshua · **Estado:** lista

## 1. Objetivo

Definir el JSON que Raymond llenará en `datos-demo/demo.json` (P21) y que `scripts/cargar-demo.ts` (P29) cargará con horas relativas al momento de la carga.

## 2. Requisitos que cubre

| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| Datos de ejemplo, no del cliente | Anexo C | Correos `@example.com` y nombres de los bocetos |
| Disponibilidad del evento | PRD R28, S-45 | Días relativos 0, 1 y 2, convertidos a fecha al cargar |
| Tareas con hora límite | PRD R7, R10 | `venceEnMinutos` respecto de «ahora» |
| Responsables y pasos | PRD R8, R9, R23 | Correos y, si el paso ya está marcado, quién y hace cuántos minutos |

## 3. Fuera de alcance

El archivo `datos-demo/demo.json` lo escribe Raymond en P21. El script que lo carga es P29. Esta spec solo fija el formato.

## 4. Diseño técnico

Un objeto con `usuarios` y `tareas`. Las horas no son absolutas.

### usuarios[]

| Campo | Tipo | Notas |
| --- | --- | --- |
| nombre | string | |
| correo | string | Siempre `@example.com` |
| telefono | string | |
| rol | `admin` \| `estudiante` | |
| contrasena | string | Contraseña de demo, no un secreto de producción |
| disponibilidades | array | Puede ir vacío en un administrador |

`disponibilidades[]`: `diaRelativo` (0 = día de la carga, 1 = mañana, 2 = pasado), `desde` y `hasta` como `HH:MM` en hora de Ecuador.

### tareas[]

| Campo | Tipo | Notas |
| --- | --- | --- |
| nombre | string | |
| descripcion | string opcional | |
| lugar | string | |
| venceEnMinutos | number | Minutos desde el instante de la carga. Negativo = ya venció |
| urgente | boolean | |
| responsables | string[] | Correos de `usuarios`. Vacío = sin asignar |
| pasos | array | Al menos uno |
| observaciones | array | Puede ir vacío |

`pasos[]`: `texto`, y opcionalmente `marcadoPor` (correo) y `minutosAtras` (entero ≥ 0). Si viene `marcadoPor`, al cargar el paso queda marcado.

`observaciones[]`: `autor` (correo), `texto`, `minutosAtras`.

### Ejemplo de forma

Los nombres y lugares son los de ejemplo de los bocetos, no datos del cliente.

```json
{
  "usuarios": [
    {
      "nombre": "Mateo Cruz",
      "correo": "mateo.cruz@example.com",
      "telefono": "0991111111",
      "rol": "admin",
      "contrasena": "demo-mateo",
      "disponibilidades": []
    },
    {
      "nombre": "Ana Torres",
      "correo": "ana.torres@example.com",
      "telefono": "0992222222",
      "rol": "estudiante",
      "contrasena": "demo-ana",
      "disponibilidades": [
        { "diaRelativo": 0, "desde": "08:00", "hasta": "18:00" },
        { "diaRelativo": 1, "desde": "08:00", "hasta": "14:00" }
      ]
    }
  ],
  "tareas": [
    {
      "nombre": "Preparar Sala 3",
      "descripcion": "Dejar el proyector listo.",
      "lugar": "Sala 3 · Edificio Galileo",
      "venceEnMinutos": 90,
      "urgente": false,
      "responsables": ["ana.torres@example.com"],
      "pasos": [
        { "texto": "Abrir la sala" },
        {
          "texto": "Probar el proyector",
          "marcadoPor": "ana.torres@example.com",
          "minutosAtras": 15
        }
      ],
      "observaciones": [
        {
          "autor": "ana.torres@example.com",
          "texto": "Falta un cable HDMI.",
          "minutosAtras": 10
        }
      ]
    }
  ]
}
```

Al cargar, `diaRelativo` se suma a la fecha de hoy en `America/Guayaquil`. `venceEnMinutos` se suma a `now()`. `minutosAtras` se resta de `now()`. El super administrador no va en este JSON y el script de P29 no lo borra.

## 5. Casos y bordes

- `venceEnMinutos` negativo: la tarea nace vencida si nadie la completó.
- `responsables` vacío: queda sin asignar.
- Un paso sin `marcadoPor` nace sin marcar.
- Un correo de responsable que no está en `usuarios` es un error de carga, no se inventa el usuario.
- `diaRelativo` fuera de 0, 1 o 2 no entra en la demo. [SUPUESTO] el cargador lo rechaza.

## 6. Supuestos y preguntas

- [SUPUESTO] Las contraseñas de demo viven en el JSON porque son de cuentas `@example.com`, no de personas reales (Anexo C).
- [SUPUESTO] El día 0 es la fecha de la carga en `America/Guayaquil`, no una fecha fija del hackathon. Si el equipo conoce las fechas reales, se cambian en el JSON (tareas-joshua, «Queda abierto»).
- Pregunta para el equipo: ninguna.

## 7. Cómo se verifica

- Este archivo describe el formato. P21 comprueba que `datos-demo/demo.json` lo cumple. P29 comprueba que la carga usa `venceEnMinutos` y `minutosAtras` desde el instante en que corre.
