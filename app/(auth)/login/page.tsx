import { FormularioLogin } from "@/app/(auth)/login/formulario";
import { iniciarSesion } from "@/lib/auth/acciones";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col justify-center bg-fondo px-esp-4 py-esp-6 text-texto">
      <div className="mx-auto flex w-full max-w-md flex-col gap-esp-5">
        <h1 className="font-display text-h1 font-black uppercase">Entrar</h1>
        <p className="font-texto text-cuerpo text-texto-suave">
          Entras con la cuenta que te dio un administrador.
        </p>
        <FormularioLogin accion={iniciarSesion} />
      </div>
    </main>
  );
}
