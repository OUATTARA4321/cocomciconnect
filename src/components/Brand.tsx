"use client";

import { createContext, useContext, type ReactNode } from "react";

export type BrandContextValue = {
  /** URL du logo déposé, ou null si la marque dessinée doit servir. */
  logoUrl: string | null;
};

const BrandContext = createContext<BrandContextValue>({ logoUrl: null });

export function BrandProvider({
  logoUrl,
  children,
}: {
  logoUrl: string | null;
  children: ReactNode;
}) {
  return <BrandContext.Provider value={{ logoUrl }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  return useContext(BrandContext);
}
