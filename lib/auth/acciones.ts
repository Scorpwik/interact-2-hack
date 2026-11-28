"use server";

import { redirect } from "next/navigation";

import { destinoDe, obtenerPerfilActual } from "@/lib/auth/sesion";
import { crearClienteServidor } from "@/lib/supabase/servidor";
import type { AccionFormulario, ResultadoAccion } from "@/lib/tipos";

export const iniciarSesion: AccionFormulario = async (formData) => {
  const correo = String(formData.get("correo") ?? "").trim();
  const contrasena = String(formData.get("contrasena") ?? "");
  if (!correo || !contrasena) {
    return { ok: false, error: "Escribe tu correo y tu contraseña." };
  }

  const supabase = await crearClienteServidor();
  const { error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });
  if (error) {
    return { ok: false, error: "Correo o contraseña incorrectos." };
  }

  const perfil = await obtenerPerfilActual();
  if (!perfil) {
    await supabase.auth.signOut();
    return { ok: false, error: "Esta cuenta no tiene un perfil." };
  }

  const resultado: ResultadoAccion<{ destino: string }> = {
    ok: true,
    datos: { destino: destinoDe(perfil.rol) },
  };
  return resultado;
};

export async function cerrarSesion(): Promise<void> {
  const supabase = await crearClienteServidor();
  await supabase.auth.signOut();
  redirect("/login");
}
