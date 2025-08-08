// lib/supabase/middleware.js
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { hasEnvVars as _hasEnvVars } from "../utils";

export async function updateSession(request) {
  // default response
  let supabaseResponse = NextResponse.next({ request });

  const hasEnvVars = typeof _hasEnvVars === "function" ? _hasEnvVars() : _hasEnvVars;
  if (!hasEnvVars) {
    console.log("[updateSession] skipping, env vars missing");
    return supabaseResponse;
  }

  // create server client (edge-friendly)
  let supabase;
  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          // return cookies from the incoming request
          getAll() {
            return request.cookies.getAll();
          },
          // set cookies on the response (NOT on the request)
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              // write on the response that we'll return
              supabaseResponse.cookies.set(name, value, options);
            });
            // ensure supabaseResponse is a NextResponse with the request context
            supabaseResponse = NextResponse.next({ request });
            // copy cookies again in case NextResponse.next() reset them
            cookiesToSet.forEach(({ name, value, options }) => {
              supabaseResponse.cookies.set(name, value, options);
            });
          },
        },
      }
    );
  } catch (err) {
    console.error("[updateSession] createServerClient failed:", err);
    return supabaseResponse;
  }

  // fetch user
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch (err) {
    console.error("[updateSession] supabase.auth.getUser failed:", err);
    return supabaseResponse;
  }

  // Normaliza rutas quitando posible prefijo de locale (/en, /es, etc.)
  const stripLocale = (path) => {
    const m = path.match(/^\/([a-z]{2})(\/|$)/i);
    return m ? path.replace(/^\/[a-z]{2}/i, "") || "/" : path;
  };

const path = request.nextUrl.pathname;
const normalized = stripLocale(path);

// Rutas públicas que NO deben ser protegidas
const publicPrefixes = [
  "/",          // permitimos explicitly la raíz sin auth (tratada como caso especial)
  "/login",
  "/auth",
  "/productDetail",
  "/category",
  "/gifts",
  "/api",
  "/search",
];

// Tratamiento especial para "/": sólo coincide si normalized === "/"
const isPublic = publicPrefixes.some((p) => {
  if (p === "/") return normalized === "/";
  // coincide exactamente o con el prefijo + slash (ej: /auth o /auth/whatever)
  return normalized === p || normalized.startsWith(p + "/");
});

console.log("[updateSession] path:", path, "normalized:", normalized, "hasUser:", !!user, "isPublic:", isPublic);
  // Si no hay user y la ruta NO es pública => redirect a login.
  if (!user && !isPublic) {
    // evita bucles: si ya estás en /auth/login o /{locale}/auth/login, isPublic será true
    const redirectUrl = new URL("/auth/login", request.url); // URL absoluta
    console.log("[updateSession] redirecting to", redirectUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  // devuelve la respuesta que puede contener cookies seteadas por supabase
  return supabaseResponse;
}