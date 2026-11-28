# 06 · Autenticación, perfiles y super administrador

**Paso:** P5 · **Rama:** `feat/auth-roles` · **Dueño:** Joshua · **Estado:** lista

## 1. Objetivo

Entrar solo con una cuenta ya creada, mandar cada perfil a su ruta y dejar un único super administrador creado desde variables de entorno.

## 2. Requisitos que cubre

| Requisito | Fuente | Cómo se cumple |
| --- | --- | --- |
| Sin registro propio | PRD R1, W1 | Solo `signInWithPassword`. No hay pantalla ni acción de registro |
| Dos perfiles | PRD R2 | `perfiles.rol` decide la ruta. El estudiante no entra a rutas de administrador |
| Tablero del administrador | PRD R30 | Un administrador que entra va a `/tablero` |
| Super administrador único | PRD R3, W4 | El script crea o actualiza el correo. El trigger de P1 impide un segundo `es_super_admin` |
| Aviso de la acción | PRD R37 | La acción devuelve «Sesión iniciada.» o un error en español |

## 3. Fuera de alcance

Cambiar contraseñas (R5) es P14. Crear el resto de usuarios es P14. `LoginVista` y `MarcoApp` son de P4: esta rama no toca `components/`. El botón de cerrar sesión del marco llama a `cerrarSesion` cuando P4 esté en `main`.

## 4. Diseño técnico

| Archivo | Rol |
| --- | --- |
| `lib/auth/sesion.ts` | `obtenerPerfilActual`, `requiereSesion`, `requiereAdmin` |
| `lib/auth/acciones.ts` | `iniciarSesion(formData)` y `cerrarSesion()` |
| `app/(auth)/login/page.tsx` | Formulario con `name="correo"` y `name="contrasena"` |
| `proxy.ts` | Refresca la sesión con `getClaims()`. No usa `getSession()` |
| `app/page.tsx` | Redirige según el perfil |
| `scripts/crear-super-admin.ts` | Service role. El correo solo sale de `SUPER_ADMIN_EMAIL` |

Rutas públicas: `/login` y `/catalogo`. Sin sesión, el resto va a `/login`. Un estudiante en `/tablero`, `/tareas`, `/estudiantes` o `/usuarios` va a `/mis-tareas`.

El proxy lee solo `rol` del perfil, por id. El rol de la aplicación no está en el JWT (`role` del token es `authenticated`).

`iniciarSesion` devuelve `{ ok: true, datos: { destino } }` con destino `/tablero` o `/mis-tareas`. No redirige ella misma, para poder devolver el mensaje del aviso. `cerrarSesion` cierra la sesión y redirige a `/login`.

El script es idempotente:

- Si ya hay un super administrador con ese correo, no hace nada (tampoco cambia la contraseña).
- Si hay uno con otro correo, actualiza el correo en Auth y en `perfiles`. El trigger de P1 deja cambiar el correo.
- Si no hay ninguno, crea el usuario con el correo confirmado y el perfil `rol = admin`, `es_super_admin = true`.

## 5. Casos y bordes

| Entrada | Resultado |
| --- | --- |
| Correo o contraseña vacíos | «Escribe tu correo y tu contraseña.» |
| Credenciales incorrectas | «Correo o contraseña incorrectos.» |
| Sesión válida sin fila en `perfiles` | «Esta cuenta no tiene un perfil.» y se cierra la sesión |
| Administrador | Destino `/tablero` |
| Estudiante | Destino `/mis-tareas` |
| Estudiante abre `/tablero` | El proxy lo manda a `/mis-tareas` |
| Script por segunda vez, mismo correo | Sigue habiendo un solo super administrador |
| Script con otro `SUPER_ADMIN_EMAIL` | El mismo perfil cambia de correo. No se crea otro |

## 6. Supuestos y preguntas

- [SUPUESTO R3] El nombre del perfil creado por el script es «Super administrador» y el teléfono queda vacío. El PRD no define esos datos.
- [SUPUESTO R1] `LoginVista` (P4) no está en `main`. La página de login de este paso usa los mismos campos (`correo`, `contrasena`) y la misma acción. Cuando P4 entre, la página pasa esa acción a `LoginVista`.
- [SUPUESTO R37] El aviso de éxito se muestra en el formulario y después se navega. `avisar()` llega con P2 y P4.
- Pregunta para el equipo: ninguna.

## 7. Cómo se verifica

- Entrar con contraseña incorrecta muestra el error y no crea sesión.
- Entrar con el super administrador lleva a `/tablero`.
- Abrir `/tablero` sin sesión lleva a `/login`.
- Un estudiante que abre `/usuarios` termina en `/mis-tareas`.
- `npm run crear-super-admin` dos veces deja una sola fila con `es_super_admin`.
