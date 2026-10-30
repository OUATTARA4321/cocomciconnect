"use client";

import { useMemo, useRef, useState } from "react";

export type Person = {
  kind: "member" | "officer";
  id: number;
  name: string;
  role: string;
  place: string;
  photo: string | null;
};

type Status = { id: string; state: "busy" | "ok" | "error"; message?: string };

function key(p: Person) {
  return `${p.kind}-${p.id}`;
}

export function PhotoManager({ people }: { people: Person[] }) {
  const [rows, setRows] = useState(people);
  const [query, setQuery] = useState("");
  const [onlyMissing, setOnlyMissing] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (p) =>
        (!onlyMissing || !p.photo) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.place.toLowerCase().includes(q)),
    );
  }, [rows, query, onlyMissing]);

  const missing = rows.filter((p) => !p.photo).length;

  async function upload(person: Person, file: File) {
    const id = key(person);
    setStatus({ id, state: "busy" });

    const body = new FormData();
    body.append("file", file);
    body.append("usage", "portrait");
    body.append("title", `Portrait ${person.name}`);

    try {
      // 1. Téléversement dans la bibliothèque
      const up = await fetch("/api/medias", { method: "POST", body });
      const media = await up.json();
      if (!up.ok || !media.ok) {
        setStatus({ id, state: "error", message: media.error ?? "Échec du téléversement." });
        return;
      }

      // 2. Attribution à la personne
      const link = await fetch("/api/personnes/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: person.kind, id: person.id, photo: media.url }),
      });
      const res = await link.json();
      if (!link.ok || !res.ok) {
        setStatus({ id, state: "error", message: res.error ?? "Attribution impossible." });
        return;
      }

      setRows((prev) =>
        prev.map((p) => (key(p) === id ? { ...p, photo: `${media.url}?v=${Date.now()}` } : p)),
      );
      setStatus({ id, state: "ok", message: "Portrait enregistré." });
    } catch {
      setStatus({ id, state: "error", message: "Le serveur n’a pas répondu." });
    }
  }

  async function clear(person: Person) {
    const id = key(person);
    setStatus({ id, state: "busy" });
    await fetch("/api/personnes/photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: person.kind, id: person.id, photo: null }),
    });
    setRows((prev) => prev.map((p) => (key(p) === id ? { ...p, photo: null } : p)));
    setStatus({ id, state: "ok", message: "Portrait retiré." });
  }

  return (
    <div>
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4 border-y border-ink/15 py-4">
        <label className="min-w-[16rem] flex-1">
          <span className="label block text-mute">Chercher une personne</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nom, fonction, région…"
            className="mt-2 w-full border border-ink/25 bg-paper-2 px-3 py-2.5 text-[0.88rem] text-ink focus:border-stamp"
          />
        </label>

        <label className="flex cursor-pointer items-center gap-2 pb-3">
          <input
            type="checkbox"
            checked={onlyMissing}
            onChange={(e) => setOnlyMissing(e.target.checked)}
            className="h-4 w-4 accent-[#D9531E]"
          />
          <span className="label text-ink/75">Sans portrait seulement</span>
        </label>

        <p className="num label ml-auto pb-3 text-mute">
          {filtered.length} affichés · {missing} sans portrait
        </p>
      </div>

      {/* Grille des personnes */}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const id = key(p);
          const st = status?.id === id ? status : null;
          return (
            <li key={id} className="border border-ink/20 bg-paper-2">
              <div className="flex gap-3 p-3">
                {/* Vignette */}
                <div className="h-[86px] w-[69px] shrink-0 border border-ink/25 bg-paper-3">
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={`Portrait de ${p.name}`}
                      className="h-full w-full object-cover object-[50%_22%]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-center text-[0.55rem] leading-tight font-semibold tracking-wider text-ink/40 uppercase">
                        Sans
                        <br />
                        photo
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[1rem] leading-tight font-semibold text-ink">
                    {p.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[0.76rem] leading-snug text-mute">
                    {p.role}
                  </p>
                  <p className="label mt-1.5 truncate text-ink/55">{p.place}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-ink/12 px-3 py-2.5">
                <input
                  ref={(el) => {
                    inputs.current[id] = el;
                  }}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void upload(p, f);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => inputs.current[id]?.click()}
                  disabled={st?.state === "busy"}
                  className="label border border-ink/30 px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper-2 disabled:opacity-50"
                >
                  {st?.state === "busy"
                    ? "Envoi…"
                    : p.photo
                      ? "Remplacer"
                      : "Ajouter la photo"}
                </button>

                {p.photo && (
                  <button
                    type="button"
                    onClick={() => void clear(p)}
                    className="label text-stamp-dark underline-offset-2 hover:underline"
                  >
                    Retirer
                  </button>
                )}

                {st?.state === "ok" && (
                  <span className="label ml-auto text-valid">{st.message}</span>
                )}
                {st?.state === "error" && (
                  <span className="label ml-auto text-stamp-dark">{st.message}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-12 border border-dashed border-ink/25 px-6 py-14 text-center text-mute">
          Aucune personne ne correspond à cette recherche.
        </p>
      )}
    </div>
  );
}
