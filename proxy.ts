import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const RUTAS_PUBLICAS = ["/login", "/catalogo"];
const RUTAS_ADMIN = ["/tablero", "/tareas", "/estudiantes", "/usuarios"];

function empiezaCon(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

function copiarCookies(origen: NextResponse, destino: NextResponse) {
  origen.cookies.getAll().forEach((cookie) => {
    destino.cookies.set(cookie);
  });
  return destino;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let respuesta = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return respuesta;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookies) {
        cookies.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        respuesta = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) => {
          respuesta.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const usuarioId = data?.claims.sub;
  const publica = RUTAS_PUBLICAS.some((ruta) => empiezaCon(pathname, ruta));

  if (!usuarioId) {
    if (publica) return respuesta;
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.search = "";
    return copiarCookies(respuesta, NextResponse.redirect(login));
  }

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", usuarioId)
    .maybeSingle();

  if (!perfil) {
    if (publica) return respuesta;
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.search = "";
    return copiarCookies(respuesta, NextResponse.redirect(login));
  }

  const destino = perfil.rol === "admin" ? "/tablero" : "/mis-tareas";
  const estudianteEnAdmin =
    perfil.rol === "estudiante" &&
    RUTAS_ADMIN.some((ruta) => empiezaCon(pathname, ruta));

  if (pathname === "/" || pathname === "/login" || estudianteEnAdmin) {
    const siguiente = request.nextUrl.clone();
    siguiente.pathname = estudianteEnAdmin ? "/mis-tareas" : destino;
    siguiente.search = "";
    return copiarCookies(respuesta, NextResponse.redirect(siguiente));
  }

  return respuesta;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
