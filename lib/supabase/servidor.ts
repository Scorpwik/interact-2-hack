import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function clavesPublicas() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Faltan las variables públicas de Supabase.");
  }
  return { url, anon };
}

export async function crearClienteServidor() {
  const { url, anon } = clavesPublicas();
  const cookieStore = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // En un Server Component las cookies son de solo lectura.
        }
      },
    },
  });
}
