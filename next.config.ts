import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // mupdf est un module WASM/ESM : il doit rester externe au bundle serveur.
  serverExternalPackages: ["mupdf"],
};

export default nextConfig;
