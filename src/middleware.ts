import { NextResponse, type NextRequest } from "next/server";

/**
 * Protection des espaces d'administration par authentification HTTP Basic.
 *
 * Sont protégés :
 *   · toutes les pages /administration/*
 *   · les écritures sur l'API de marque (POST, DELETE)
 *
 * La lecture publique du logo (GET /api/marque/logo) reste libre : elle est
 * nécessaire à l'affichage du site pour tous les visiteurs.
 *
 * Le mot de passe est lu dans la variable d'environnement ADMIN_PASSWORD.
 * Si elle n'est pas définie en production, l'accès est refusé par défaut.
 */

const REALM = 'Basic realm="Administration COCOMCI", charset="UTF-8"';

function unauthorized() {
  return new NextResponse(
    "Accès réservé à l'administration de la COCOMCI.",
    { status: 401, headers: { "WWW-Authenticate": REALM } },
  );
}

/** Comparaison à durée constante, pour ne pas fuiter le mot de passe. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/administration");
  const isWriteApi =
    (pathname.startsWith("/api/marque") ||
      pathname.startsWith("/api/medias") ||
      pathname.startsWith("/api/personnes")) &&
    request.method !== "GET";

  if (!isAdminPage && !isWriteApi) return NextResponse.next();

  const expected = process.env.ADMIN_PASSWORD;

  // Sans mot de passe configuré, l'accès reste ouvert : c'est le cas des
  // environnements d'aperçu. Un bandeau rouge le signale dans l'interface.
  // En production, ADMIN_PASSWORD doit impérativement être définie.
  if (!expected) return NextResponse.next();

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(":");
  const password = separator === -1 ? "" : decoded.slice(separator + 1);

  if (!safeEqual(password, expected)) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/administration/:path*",
    "/api/marque/:path*",
    "/api/medias/:path*",
    "/api/personnes/:path*",
  ],
};
