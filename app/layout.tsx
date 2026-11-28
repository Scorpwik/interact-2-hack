import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const fuenteDisplay = localFont({
  src: [
    {
      path: "./fuentes/BigShouldersDisplay-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fuentes/BigShouldersDisplay-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--fuente-display-local",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

const fuenteTexto = localFont({
  src: [
    { path: "./fuentes/Sora-400.woff2", weight: "400", style: "normal" },
    { path: "./fuentes/Sora-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--fuente-texto-local",
  display: "swap",
  fallback: ["Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Señal de Turno",
  description: "Organización de staff del Interact2Hack",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fuenteDisplay.variable} ${fuenteTexto.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-fondo font-texto text-texto">
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
