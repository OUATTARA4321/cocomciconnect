import { eq } from "drizzle-orm";
import { db } from "@/db";
import { localOfficers, members } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Attribue (ou retire) un portrait à une personne.
 * Corps attendu : { kind: "member" | "officer", id: number, photo: string | null }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      kind?: string;
      id?: number;
      photo?: string | null;
    };

    const { kind, id } = body;
    const photo = body.photo ?? null;

    if (!id || (kind !== "member" && kind !== "officer")) {
      return Response.json(
        { ok: false, error: "Personne non identifiée." },
        { status: 400 },
      );
    }

    if (kind === "member") {
      await db.update(members).set({ photo }).where(eq(members.id, id));
    } else {
      await db.update(localOfficers).set({ photo }).where(eq(localOfficers.id, id));
    }

    return Response.json({ ok: true, photo });
  } catch {
    return Response.json({ ok: false, error: "Enregistrement impossible." }, { status: 500 });
  }
}
