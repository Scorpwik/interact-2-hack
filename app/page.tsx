import { redirect } from "next/navigation";

import { destinoDe, obtenerPerfilActual } from "@/lib/auth/sesion";

export const instant = false;

export default async function Page() {
  const perfil = await obtenerPerfilActual();
  if (!perfil) redirect("/login");
  redirect(destinoDe(perfil.rol));
}
