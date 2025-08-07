import createIntlMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request) {
  // ⬇️ Primero ejecutamos updateSession
  const response = await updateSession(request);

  // ⬇️ Luego ejecutamos el middleware de next-intl sobre esa respuesta
  return intlMiddleware(request, response);
}

export const config = {
  matcher: [
    // Este patrón cubre la mayoría de rutas, excluyendo estáticos y APIs
    '/((?!_next|api|trpc|_vercel|.*\\..*).*)',
  ],
};