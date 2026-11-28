# 00 · Arquitectura

**Paso:** P1 · **Rama:** `feat/esquema-datos` · **Dueño:** Joshua · **Estado:** lista

## 1. Objetivo

Dejar fijados el stack, los dueños de carpetas y las variables de entorno del proyecto nuevo de Supabase y de Vercel, sin reutilizar ningún proyecto anterior.

## 2. Requisitos que cubre

| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| Cuentas solo creadas por un administrador | PRD R1, W1 | Auth de Supabase con correo y contraseña, sin registro público |
| Reglas en el servidor | AGENTS.md §2.8 | Postgres con RLS y, desde P9, funciones RPC |
| Super administrador fuera del código | PRD R3 | `SUPER_ADMIN_EMAIL` en variables, nunca escrito en el código |
| Horas de Ecuador | PRD R10, S-21 | `timestamptz` en la base; la zona se aplica al mostrar (P3) |

## 3. Fuera de alcance

No hay pantallas, autenticación de la interfaz (P5) ni funciones de marcar o completar (P9). El proyecto de Supabase y las variables en Vercel los crea Joshua a mano.

## 4. Diseño técnico

### Stack

| Capa | Elección |
| --- | --- |
| Aplicación | Next.js (App Router) + TypeScript estricto |
| Estilos | Tailwind con los tokens de DESIGN.md |
| Datos y auth | Supabase nuevo: Auth, Postgres, RLS, RPC y Realtime; `@supabase/ssr` |
| Validación | `zod` en acciones de servidor (pasos posteriores) |
| Pruebas | Vitest en `lib/**` |
| Despliegue | Vercel, team `scorpwik`, producción desde `main` |

### Carpetas y dueños

Copiado del Anexo B del plan. Cada paso solo toca sus archivos.

| Ruta | Dueño | Pasos |
| --- | --- | --- |
| `package.json`, `package-lock.json`, configuración, `app/layout.tsx`, `app/globals.css`, `app/fuentes/`, `proxy.ts`, `lib/tipos.ts` | Joshua | P0, P1 (y `chore/deps-…`) |
| `components/ui/` | Joshua | P0 |
| `supabase/**`, `lib/supabase/**` | Joshua | P0, P1, P9, P15, P17, P18, P19, P24, P26 |
| `lib/estados.ts`, `lib/tiempo.ts`, `lib/auth/`, `lib/tareas/`, `lib/ejecucion/`, `lib/tablero/`, `lib/usuarios/`, `lib/asignacion/`, `lib/tiempo-real/`, `lib/notificaciones/`, `lib/__tests__/` | Joshua | P3–P26 |
| `app/page.tsx`, `app/(auth)/`, `app/(admin)/`, `app/(estudiante)/`, `app/perfil/`, `app/api/` | Joshua | P5–P26 |
| `scripts/` | Joshua | P5, P29 |
| `components/ui-i2h/` | Raymond | P2, P6, P8, P10, P13, P28, P31, P32 |
| `components/layout/` | Raymond | P4 |
| `components/pantallas/` | Raymond | P4, P6, P8, P10, P13, P31, P32 |
| `app/catalogo/` | Raymond | P2, P4, P6, P8, P10, P13, P31, P32 |
| `public/manifest.webmanifest`, `public/iconos/` | Raymond | P16 |
| `datos-demo/` | Raymond | P21 |
| `README.md` | Raymond | P21 |
| `docs/qa/` | Raymond | P12, P22, P30, P33 |
| `docs/specs/NN-*.md` | Dueño del paso | Todos |
| `docs/plan/estado.md` | El dueño de cada paso, solo la línea de su paso | Todos |

### Clientes de Supabase

| Archivo | Dónde corre | Clave |
| --- | --- | --- |
| `lib/supabase/cliente.ts` | Navegador | anon |
| `lib/supabase/servidor.ts` | Server Components y acciones, con cookies | anon |
| `lib/supabase/admin.ts` | Solo servidor (`server-only`) | service role |

La service role no se importa desde un componente de cliente. El acceso de una persona se decide con `getUser()` o `getClaims()`, no solo con `getSession()`. Las consultas nombran columnas; no usan `select('*')`.

### Variables

| Variable | Dónde | Notas |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local`, Vercel Preview y Production | Sin valor en el repo |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Igual | Sin valor en el repo |
| `SUPABASE_SERVICE_ROLE_KEY` | Igual, solo servidor | Sin valor en el repo |
| `SUPER_ADMIN_EMAIL` | Igual | En `.env.example` vale `superadmin@interact2hack.test` y está marcado **PROVISIONAL** |
| `SUPER_ADMIN_PASSWORD` | Igual | Sin valor en el repo. La usa el script de P5 |

`.env.example` sí se commitea. `.env.local` no. Nadie pega claves en el chat ni en un prompt.

### Supuestos técnicos que esta arquitectura adopta

- [SUPUESTO] Un proyecto de Supabase nuevo, región cercana (por ejemplo `us-east-1`). No se reutiliza otro proyecto (Anexo C, decisión del 27 de noviembre de 2026).
- [SUPUESTO] Vercel en el team `scorpwik`, repo `Scorpwik/interact-2-hack`, rama de producción `main`.
- [SUPUESTO] El catálogo `/catalogo` queda público porque solo tiene datos de ejemplo (Anexo C).

## 5. Casos y bordes

- Si falta una variable pública, el cliente no arranca y el mensaje no incluye el valor.
- La service role solo existe en `lib/supabase/admin.ts` y, desde P5, en `scripts/`.
- Cambiar el correo del super administrador es cambiar `SUPER_ADMIN_EMAIL` y volver a correr el script de P5. No hay un segundo super administrador (R3).

## 6. Supuestos y preguntas

- [SUPUESTO] Región `us-east-1` si Joshua no elige otra al crear el proyecto.
- Pregunta para el equipo: ninguna. El correo real del super administrador sigue provisional (R3).

## 7. Cómo se verifica

- El repo no contiene claves: `.env.example` tiene nombres y el correo provisional, sin secretos.
- `lib/supabase/admin.ts` importa `server-only`.
- Joshua confirma que el proyecto de Supabase es nuevo y que las tres claves están en `.env.local` y en Vercel, sin pegarlas aquí.
