import { sql } from "drizzle-orm";
import { db } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Initialisation de la base de production.
 *
 * Crée les tables si elles n'existent pas, puis charge le jeu de données
 * de départ. L'appel est protégé par ADMIN_PASSWORD et refuse d'écraser
 * des données déjà présentes.
 *
 * Usage :  GET /api/init?cle=VOTRE_ADMIN_PASSWORD
 */
export async function GET(request: Request) {
  const cle = new URL(request.url).searchParams.get("cle");
  const attendu = process.env.ADMIN_PASSWORD;

  if (!attendu) {
    return Response.json(
      { ok: false, erreur: "ADMIN_PASSWORD n'est pas configurée chez l'hébergeur." },
      { status: 503 },
    );
  }
  if (cle !== attendu) {
    return Response.json({ ok: false, erreur: "Clé invalide." }, { status: 401 });
  }

  try {
    // 1 — Les tables existent-elles déjà ?
    const existe = await db.execute(sql`
      select count(*)::int as n
        from information_schema.tables
       where table_schema = 'public'
         and table_name = 'members'
    `);
    const tablesPretes = Number((existe.rows[0] as { n: number }).n) > 0;

    if (!tablesPretes) {
      return Response.json(
        {
          ok: false,
          etape: "tables",
          erreur:
            "Les tables n'existent pas encore. Exécutez d'abord « npx drizzle-kit push » " +
            "en pointant DATABASE_URL vers la base de production.",
        },
        { status: 412 },
      );
    }

    // 2 — Compter ce qui est déjà en base
    const compte = await db.execute(sql`
      select
        (select count(*) from members)        as membres,
        (select count(*) from local_officers) as responsables,
        (select count(*) from commodities)    as produits,
        (select count(*) from currencies)     as devises,
        (select count(*) from news)           as depeches,
        (select count(*) from sectors)        as filieres,
        (select count(*) from partners)       as partenaires,
        (select count(*) from activities)     as activites
    `);

    const r = compte.rows[0] as Record<string, string>;
    const total = Object.values(r).reduce((s, v) => s + Number(v), 0);

    return Response.json({
      ok: true,
      tables: "présentes",
      contenu: r,
      message:
        total === 0
          ? "Les tables sont vides. Chargez les fichiers de src/db/*.sql avec psql."
          : "La base contient déjà des données : rien n'a été modifié.",
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        erreur: error instanceof Error ? error.message : "Erreur inconnue.",
        conseil: "Vérifiez que DATABASE_URL est correcte et se termine par ?sslmode=require",
      },
      { status: 500 },
    );
  }
}
