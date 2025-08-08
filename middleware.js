import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request) {
  // 1) Ejecutar updateSession primero (que pueda devolver redirect)
  let sessionResp;
  try {
    sessionResp = await updateSession(request);
  } catch (err) {
    console.error("[root-middleware] updateSession threw:", err);
    sessionResp = undefined;
  }

  // Si updateSession devolvió una respuesta con Location -> devolverla (prioridad)
  if (sessionResp instanceof NextResponse) {
    const loc = sessionResp.headers.get("location");
    if (loc) {
      console.log("[root-middleware] Returning session redirect ->", loc);
      return sessionResp;
    }
    // no es redirect, la guardamos por si hay cookies/headers que fusionar luego
  }

  // 2) Ejecutar next-intl
  let intlResp;
  try {
    intlResp = await intlMiddleware(request);
  } catch (err) {
    console.error("[root-middleware] next-intl threw:", err);
    // Si falla intl, devolver sessionResp si existe o continuar
    if (sessionResp instanceof NextResponse) return sessionResp;
    return NextResponse.next();
  }

  // Si next-intl devolvió una respuesta (p. ej. redirect por locale) -> devolverla.
  if (intlResp instanceof NextResponse) {
    // Si sessionResp tenía cookies que quieras mantener, podrías fusionarlas aquí.
    // mergeResponses(sessionResp, intlResp)  // opcional si necesitas copiar cookies
    console.log("[root-middleware] Returning intl response");
    return intlResp;
  }

  // 3) Si sessionResp existe (no redirect) devolverla. Sino continuar.
  if (sessionResp instanceof NextResponse) return sessionResp;

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};