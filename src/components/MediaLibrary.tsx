"use client";

import { useRef, useState } from "react";

export type MediaItem = {
  slug: string;
  title: string;
  usage: string;
  width: number;
  height: number;
  bytes: number;
};

function weight(b: number) {
  return b < 1024 * 1024 ? `${Math.round(b / 1024)} Ko` : `${(b / 1048576).toFixed(2)} Mo`;
}

export function MediaLibrary({ items }: { items: MediaItem[] }) {
  const [list, setList] = useState(items);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function send(files: FileList | File[]) {
    setBusy(true);
    setNote(null);
    let added = 0;

    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("file", file);
      body.append("usage", "image");
      body.append("title", file.name.replace(/\.[^.]+$/, ""));
      try {
        const res = await fetch("/api/medias", { method: "POST", body });
        const json = await res.json();
        if (res.ok && json.ok) {
          setList((prev) => [
            {
              slug: json.slug,
              title: json.title,
              usage: json.usage,
              width: json.width,
              height: json.height,
              bytes: json.bytes,
            },
            ...prev,
          ]);
          added++;
        } else {
          setNote({ ok: false, text: json.error ?? "Téléversement refusé." });
        }
      } catch {
        setNote({ ok: false, text: "Le serveur n’a pas répondu." });
      }
    }

    if (added) {
      setNote({
        ok: true,
        text: `${added} image${added > 1 ? "s" : ""} ajoutée${added > 1 ? "s" : ""} à la bibliothèque.`,
      });
    }
    setBusy(false);
  }

  async function remove(slug: string) {
    await fetch(`/api/medias/${slug}`, { method: "DELETE" });
    setList((prev) => prev.filter((m) => m.slug !== slug));
  }

  function copy(slug: string) {
    const url = `${window.location.origin}/api/medias/${slug}`;
    void navigator.clipboard.writeText(url);
    setCopied(slug);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div>
      {/* Zone de dépôt */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files?.length) void send(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center border-2 border-dashed px-6 py-12 text-center transition-colors ${
          dragging ? "border-stamp bg-stamp/10" : "border-ink/30 bg-paper-2"
        }`}
      >
        <p className="font-display text-[1.3rem] leading-tight font-semibold text-ink">
          Déposez vos images ici
        </p>
        <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-mute">
          Photographies d’assemblées, de formations, de marchés… Plusieurs fichiers à la fois.
          Les images sont redimensionnées à 1 600 px et optimisées automatiquement.
        </p>

        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) void send(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="label mt-5 inline-flex items-center gap-2 bg-ink px-5 py-3 text-paper-2 transition-colors hover:bg-stamp disabled:opacity-50"
        >
          {busy ? "Envoi en cours…" : "Choisir des fichiers"}
        </button>
        <p className="label mt-4 text-mute/70">JPG · PNG · WebP — 15 Mo par fichier</p>
      </div>

      {note && (
        <div
          className={`mt-5 border-l-2 px-5 py-3 ${
            note.ok ? "border-valid bg-valid/8" : "border-stamp bg-stamp/8"
          }`}
        >
          <p className="text-[0.92rem] text-ink">{note.text}</p>
        </div>
      )}

      {/* Bibliothèque */}
      <div className="rule-heavy mt-12 flex items-baseline justify-between pt-4">
        <h3 className="font-display text-[1.4rem] font-semibold text-ink">
          Bibliothèque d’images
        </h3>
        <span className="num label text-mute">{list.length} image(s)</span>
      </div>

      {list.length === 0 ? (
        <p className="mt-8 border border-dashed border-ink/25 px-6 py-12 text-center text-mute">
          Aucune image pour l’instant.
        </p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <li key={m.slug} className="border border-ink/20 bg-paper-2">
              <div className="aspect-[16/10] w-full overflow-hidden bg-paper-3">
                <img
                  src={`/api/medias/${m.slug}`}
                  alt={m.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-[0.92rem] font-medium text-ink">{m.title}</p>
                <p className="num mt-1 text-[0.72rem] text-mute">
                  {m.width} × {m.height} px · {weight(m.bytes)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => copy(m.slug)}
                    className="label border border-ink/30 px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper-2"
                  >
                    {copied === m.slug ? "Adresse copiée" : "Copier l’adresse"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(m.slug)}
                    className="label text-stamp-dark underline-offset-2 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
