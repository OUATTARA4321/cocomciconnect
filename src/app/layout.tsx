import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import type { ReactNode } from "react";
import { BrandProvider } from "@/components/Brand";
import { MotionProvider } from "@/components/Motion";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import { getBrandLogo } from "@/lib/brand";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://cocomci.ci"),
  title: "COCOMCI — Coordination des Opérateurs de Commerce de Côte d'Ivoire",
  description:
    "Plateforme officielle de la COCOMCI : mot du Président du Bureau Exécutif National, annuaire des opérateurs badgeés, actualités du commerce intérieur, cours des matières premières, vivriers, céréales, maraîchers et cours des devises.",
  applicationName: "COCOMCI",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "COCOMCI — Coordination des Opérateurs de Commerce de Côte d'Ivoire",
    description:
      "Cours des marchés, filières professionnelles, badges officiels et actualités du commerce intérieur ivoirien.",
    locale: "fr_CI",
    type: "website",
    images: [{ url: "/logo-cocomci.svg", width: 520, height: 140, alt: "Logo de la COCOMCI" }],
  },
};

export const viewport = {
  themeColor: "#12301F",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const brandLogo = await getBrandLogo();

  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${archivo.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <BrandProvider logoUrl={brandLogo?.url ?? null}>
        <MotionProvider>
          <div className="flex min-h-screen flex-col">
            {/* Bandeau affiché par défaut. Pour le retirer en production,
                définissez PREVIEW_MODE=off dans les variables d'environnement. */}
            {process.env.PREVIEW_MODE !== "off" && <PreviewNotice />}
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </MotionProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
