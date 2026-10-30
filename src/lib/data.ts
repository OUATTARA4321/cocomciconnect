import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  activities,
  commodities,
  currencies,
  localOfficers,
  members,
  news,
  partners,
  sectorArticles,
  sectors,
} from "@/db/schema";

export {
  formatDate,
  formatDateShort,
  formatFcfa,
  formatPercent,
  formatRate,
  variation,
} from "@/lib/format";

export const NEWS_CATEGORIES = [
  "Commerce intérieur",
  "Économie & marché",
  "Activités COCOMCI",
] as const;

export async function getMembers() {
  return db
    .select()
    .from(members)
    .orderBy(asc(members.region), asc(members.fullName));
}

export async function getBne() {
  return db
    .select()
    .from(members)
    .where(eq(members.isBne, true))
    .orderBy(asc(members.id));
}

export async function getNews(limit?: number) {
  const base = db.select().from(news).orderBy(desc(news.publishedAt));
  return limit ? base.limit(limit) : base;
}

export async function getNewsItem(slug: string) {
  const rows = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getCommodities() {
  return db
    .select()
    .from(commodities)
    .orderBy(asc(commodities.category), asc(commodities.name));
}

export async function getCurrencies() {
  return db.select().from(currencies).orderBy(asc(currencies.id));
}

export async function getPartners() {
  try {
    return await db.select().from(partners).orderBy(asc(partners.sortOrder));
  } catch {
    return [];
  }
}

export async function getActivities() {
  return db.select().from(activities).orderBy(asc(activities.sortOrder));
}

export async function getSectors() {
  return db.select().from(sectors).orderBy(asc(sectors.sortOrder));
}

export async function getSector(slug: string) {
  const rows = await db.select().from(sectors).where(eq(sectors.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getSectorArticles(slug: string) {
  return db
    .select()
    .from(sectorArticles)
    .where(eq(sectorArticles.sectorSlug, slug))
    .orderBy(asc(sectorArticles.sortOrder));
}

export async function getLocalOfficers() {
  return db
    .select()
    .from(localOfficers)
    .orderBy(asc(localOfficers.level), asc(localOfficers.scope), asc(localOfficers.role));
}
