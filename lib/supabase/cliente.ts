import { createBrowserClient } from "@supabase/ssr";

function clavesPublicas() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Faltan las variables públicas de Supabase.");
  }
  return { url, anon };
}

export function crearClienteNavegador() {
  const { url, anon } = clavesPublicas();
  return createBrowserClient(url, anon);
}
