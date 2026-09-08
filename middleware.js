import { NextResponse } from "next/server";

export function middleware(req) {
  const usuario = process.env.ADMIN_USER || "admin";
  const clave = process.env.ADMIN_PASSWORD;

  if (!clave) {
    return new NextResponse(
      "Panel no configurado: falta la variable de entorno ADMIN_PASSWORD en Vercel.",
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization");

  if (auth && auth.startsWith("Basic ")) {
    const decodificado = atob(auth.split(" ")[1]);
    const separador = decodificado.indexOf(":");
    const u = decodificado.slice(0, separador);
    const p = decodificado.slice(separador + 1);
    if (u === usuario && p === clave) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Panel Witshoppe"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
