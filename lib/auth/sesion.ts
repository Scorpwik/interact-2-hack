import { redirect } from "next/navigation";

import { crearClienteServidor } from "@/lib/supabase/servidor";
import type { Rol } from "@/lib/tipos";

export interface PerfilActual {
  id: string;
  nombre: string;
  correo: string;
  rol: Rol;
  esSuperAdmin: boolean;
}

function esRol(valor: string): valor is Rol {
  return valor === "admin" || valor === "estudiante";
}

export async function obtenerPerfilActual(): Promise<PerfilActual | null> {
  const supabase = await crearClienteServidor();
  const { data } = await supabase.auth.getClaims();
  const id = data?.claims.sub;
  if (!id) return null;

  const { data: fila } = await supabase
    .from("perfiles")
    .select("id, nombre, correo, rol, es_super_admin")
    .eq("id", id)
    .maybeSingle();

  if (!fila || !esRol(fila.rol)) return null;

  return {
    id: fila.id,
    nombre: fila.nombre,
    correo: fila.correo,
    rol: fila.rol,
    esSuperAdmin: fila.es_super_admin,
  };
}

export async function requiereSesion(): Promise<PerfilActual> {
  const perfil = await obtenerPerfilActual();
  if (!perfil) redirect("/login");
  return perfil;
}

export async function requiereAdmin(): Promise<PerfilActual> {
  const perfil = await requiereSesion();
  if (perfil.rol !== "admin") redirect("/mis-tareas");
  return perfil;
}

export function destinoDe(rol: Rol): "/tablero" | "/mis-tareas" {
  return rol === "admin" ? "/tablero" : "/mis-tareas";
}
