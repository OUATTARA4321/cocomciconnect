"use client";

import { useRef, useState } from "react";

type Result =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "ok"; note: string; url: string; bytes: number; mime: string }
  | { kind: "error"; message: string };

function weight(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}

export function LogoUploader({
  current,
}: {
  current: { url: string; filename: string; mime: string; bytes: number; sourceFormat: string } | null;
}) {
  const [state, setState] = useState<Result>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(current?.url ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send(file: File) {
    setState({ kind: "busy" });
    const body = new FormData();
    body.append("file", file);
    try {
      const res = await fetch("/api/marque/logo", { method: "POST", body });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setState({ kind: "error", message: json.error ?? "Dépôt impossible." });
        return;
      }
      setPreview(json.url);
      setState({ kind: "ok", note: json.note, url: json.url, bytes: json.bytes, mime: json.mime });
      // Rafraîchit l'en-tête et le pied de page du site.
      setTimeout(() => window.location.reload(), 1400);
    } catch {
      setState({ kind: "error", message: "Le serveur n’a pas répondu." });
    }
  }

  async function remove() {
    setState({ kind: "busy" });
    await fetch("/api/marque/logo", { method: "DELETE" });
    setPreview(null);
    window.location.reload();
  }

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
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
            const f = e.dataTransfer.files?.[0];
            if (f) void send(f);
          }}
          className={`flex flex-col items-center justify-center border-2 border-dashed px-6 py-14 text-center transition-colors ${
            dragging ? "border-stamp bg-stamp/10" : "border-ink/30 bg-paper-2"
          }`}
        >
          <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M24 32V10m0 0-8 8m8-8 8 8"
              stroke="#12301F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 32v4a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6v-4"
              stroke="#12301F"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mt-5 font-display text-[1.35rem] leading-tight font-semibold text-ink">
            Déposez le logo officiel ici
          </p>
          <p className="mt-2 max-w-sm text-[0.92rem] leading-relaxed text-mute">
            Glissez votre fichier <strong className="font-semibold text-ink">PDF</strong>, ou
            choisissez-le sur votre ordinateur. Le PDF est automatiquement vectorisé en SVG.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.svg,.png,.jpg,.jpeg,.webp,application/pdf,image/svg+xml,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void send(f);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={state.kind === "busy"}
            className="label mt-6 inline-flex items-center gap-2 bg-ink px-6 py-4 text-paper-2 transition-colors hover:bg-stamp disabled:opacity-50"
          >
            {state.kind === "busy" ? "Conversion en cours…" : "Choisir un fichier"}
            <span aria-hidden="true">→</span>
          </button>

          <p className="label mt-5 text-mute/70">
            PDF · SVG · PNG · JPG · WebP — 12 Mo maximum
          </p>
        </div>

        {/* Compte rendu */}
        {state.kind === "ok" && (
          <div className="mt-6 border-l-2 border-valid bg-valid/8 px-5 py-4">
            <p className="label text-valid">Logo déposé</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{state.note}</p>
            <p className="num mt-2 text-[0.84rem] text-mute">
              {state.mime} · {weight(state.bytes)} · actualisation de la page…
            </p>
          </div>
        )}
        {state.kind === "error" && (
          <div className="mt-6 border-l-2 border-stamp bg-stamp/8 px-5 py-4">
            <p className="label text-stamp-dark">Dépôt refusé</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{state.message}</p>
          </div>
        )}
      </div>

      {/* Aperçu */}
      <div className="lg:col-span-5">
        <div className="rule-heavy pt-4">
          <p className="label text-stamp-dark">Logo en vigueur</p>
        </div>

        <div className="mt-6 border border-ink/20">
          <div className="flex min-h-[190px] items-center justify-center bg-paper-2 p-8">
            {preview ? (
              <img
                src={preview}
                alt="Logo officiel de la COCOMCI"
                className="max-h-[150px] max-w-full object-contain"
              />
            ) : (
              <p className="max-w-[16rem] text-center text-[0.9rem] leading-relaxed text-mute">
                Aucun logo déposé. Le site utilise la marque dessinée par défaut.
              </p>
            )}
          </div>
          <div className="flex min-h-[120px] items-center justify-center bg-ink p-8">
            {preview ? (
              <img
                src={preview}
                alt="Logo de la COCOMCI sur fond sombre"
                className="max-h-[90px] max-w-full object-contain"
              />
            ) : (
              <p className="label text-paper-2/60">Rendu sur fond d’encre</p>
            )}
          </div>
        </div>

        {current && (
          <dl className="mt-5 space-y-2 text-[0.86rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-mute">Fichier</dt>
              <dd className="truncate text-ink">{current.filename}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">Origine</dt>
              <dd className="num text-ink uppercase">{current.sourceFormat}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">Diffusé en</dt>
              <dd className="num text-ink">{current.mime}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">Poids</dt>
              <dd className="num text-ink">{weight(current.bytes)}</dd>
            </div>
          </dl>
        )}

        {preview && (
          <button
            type="button"
            onClick={() => void remove()}
            className="label link-rule mt-6 inline-block text-stamp-dark"
          >
            Retirer et revenir à la marque dessinée
          </button>
        )}
      </div>
    </div>
  );
}
