"use client";

import { useState } from "react";

import type { AccionFormulario } from "@/lib/tipos";

export function FormularioLogin({ accion }: { accion: AccionFormulario }) {
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function enviar(formData: FormData) {
    setCargando(true);
    setError(null);
    setAviso(null);
    const resultado = await accion(formData);
    if (!resultado.ok) {
      setError(resultado.error);
      setCargando(false);
      return;
    }
    const destino =
      resultado.datos &&
      typeof resultado.datos === "object" &&
      "destino" in resultado.datos &&
      typeof resultado.datos.destino === "string"
        ? resultado.datos.destino
        : "/";
    setAviso("Sesión iniciada.");
    window.location.assign(destino);
  }

  return (
    <form action={enviar} className="flex flex-col gap-esp-4" noValidate>
      <label className="flex flex-col gap-esp-2 font-texto text-cuerpo">
        Correo
        <input
          name="correo"
          type="email"
          autoComplete="username"
          required
          className="min-h-esp-7 border border-borde-control bg-fondo px-esp-3 text-texto outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco"
        />
      </label>
      <label className="flex flex-col gap-esp-2 font-texto text-cuerpo">
        Contraseña
        <input
          name="contrasena"
          type="password"
          autoComplete="current-password"
          required
          className="min-h-esp-7 border border-borde-control bg-fondo px-esp-3 text-texto outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco"
        />
      </label>
      {error ? (
        <p role="alert" className="font-texto text-cuerpo text-error">
          {error}
        </p>
      ) : null}
      {aviso ? (
        <p role="status" className="font-texto text-cuerpo text-exito">
          {aviso}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={cargando}
        className="min-h-esp-7 bg-accion px-esp-4 font-texto text-boton text-texto-sobre-accion focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco disabled:text-texto-deshabilitado"
      >
        {cargando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
