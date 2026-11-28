import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function cargarEnvLocal() {
  let texto = "";
  try {
    texto = readFileSync(".env.local", "utf8");
  } catch {
    return;
  }
  for (const linea of texto.split("\n")) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#")) continue;
    const cuerpo = limpia.startsWith("export ") ? limpia.slice(7) : limpia;
    const corte = cuerpo.indexOf("=");
    if (corte === -1) continue;
    const clave = cuerpo.slice(0, corte).trim();
    let valor = cuerpo.slice(corte + 1).trim();
    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1);
    }
    if (process.env[clave] === undefined) process.env[clave] = valor;
  }
}

function salir(mensaje: string): never {
  console.error(mensaje);
  process.exitCode = 1;
  throw new Error(mensaje);
}

cargarEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const correo = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
const contrasena = process.env.SUPER_ADMIN_PASSWORD;

if (!url || !serviceRole) {
  salir("Faltan las variables de servidor de Supabase.");
}

if (!correo || !contrasena) {
  salir("Faltan SUPER_ADMIN_EMAIL o SUPER_ADMIN_PASSWORD.");
}

const admin = createClient(url, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: actuales, error: errorLista } = await admin
  .from("perfiles")
  .select("id, correo")
  .eq("es_super_admin", true);

if (errorLista) {
  salir(
    errorLista.code === "42501"
      ? "SUPABASE_SERVICE_ROLE_KEY no puede leer perfiles. Tiene que ser la clave secret, no la publishable."
      : "No se pudo leer el super administrador.",
  );
}
if ((actuales?.length ?? 0) > 1) {
  salir("Hay más de un super administrador.");
}

const actual = actuales?.[0];
if (actual?.correo.trim().toLowerCase() === correo) {
  console.log("El super administrador ya existe.");
} else if (actual) {
  const { error: errorAuth } = await admin.auth.admin.updateUserById(actual.id, {
    email: correo,
    email_confirm: true,
  });
  if (errorAuth) salir("No se pudo actualizar el correo del super administrador.");
  const { error: errorPerfil } = await admin
    .from("perfiles")
    .update({ correo })
    .eq("id", actual.id);
  if (errorPerfil) salir("No se pudo actualizar el correo del perfil.");
  console.log("Correo del super administrador actualizado.");
} else {
const { data: creado, error: errorCrear } = await admin.auth.admin.createUser({
  email: correo,
  password: contrasena,
  email_confirm: true,
});

let id = creado.user?.id;
if (!id && errorCrear) {
  const { data: lista, error: errorUsuarios } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (errorUsuarios) salir("No se pudo crear el super administrador.");
  id = lista.users.find((usuario) => usuario.email?.toLowerCase() === correo)?.id;
}
if (!id) salir("No se pudo crear el super administrador.");

const { error: errorPerfil } = await admin.from("perfiles").insert({
  id,
  nombre: "Super administrador",
  correo,
  telefono: "",
  rol: "admin",
  es_super_admin: true,
});
if (errorPerfil) salir("No se pudo crear el perfil del super administrador.");

console.log("Super administrador creado.");
}
