import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** Opérateurs de commerce adhérents à la COCOMCI, avec leur badge officiel. */
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  badgeNumber: text("badge_number").notNull().unique(),
  fullName: text("full_name").notNull(),
  function: text("function").notNull(),
  region: text("region").notNull(),
  city: text("city").notNull(),
  sector: text("sector").notNull(),
  status: text("status").notNull().default("En règle"),
  memberSince: integer("member_since").notNull(),
  isBne: boolean("is_bne").notNull().default(false),
  photo: text("photo"),
});

/** Dépêches : commerce intérieur, économie & marché, activités COCOMCI. */
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  place: text("place").notNull(),
  source: text("source").notNull(),
  image: text("image"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
});

/** Cours des matières premières, céréales, vivriers et maraîchers. */
export const commodities = pgTable("commodities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  unit: text("unit").notNull(),
  market: text("market").notNull(),
  city: text("city").notNull(),
  price: doublePrecision("price").notNull(),
  previousPrice: doublePrecision("previous_price").notNull(),
  trend: text("trend").notNull().default("stable"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

/** Cours des devises exprimés en FCFA (XOF). */
export const currencies = pgTable("currencies", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  rate: doublePrecision("rate").notNull(),
  changePct: doublePrecision("change_pct").notNull().default(0),
  note: text("note").notNull().default(""),
});

/**
 * Coordinateurs et secrétaires généraux des régions, villes et communes.
 * Même formalisme que le Bureau Exécutif National, à l'échelon territorial.
 */
export const localOfficers = pgTable("local_officers", {
  id: serial("id").primaryKey(),
  badgeNumber: text("badge_number").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  level: text("level").notNull(),
  scope: text("scope").notNull(),
  region: text("region").notNull(),
  city: text("city").notNull(),
  phone: text("phone").notNull(),
  /** Numéro WhatsApp au format international, sans espaces (ex. 2250748213390). */
  whatsapp: text("whatsapp"),
  email: text("email"),
  status: text("status").notNull().default("Badge validé"),
  validatedAt: timestamp("validated_at", { withTimezone: true }).notNull(),
  officerSince: integer("officer_since").notNull(),
  photo: text("photo"),
});

/** Filières professionnelles de la Coordination. */
export const sectors = pgTable("sectors", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  emblem: text("emblem").notNull(),
  operators: integer("operators").notNull(),
  marketsLabel: text("markets_label").notNull(),
  citiesLabel: text("cities_label").notNull(),
  leadName: text("lead_name").notNull(),
  leadRole: text("lead_role").notNull(),
  leadBadge: text("lead_badge").notNull(),
  leadPhoto: text("lead_photo"),
  leadPhone: text("lead_phone"),
  leadWhatsapp: text("lead_whatsapp"),
  sgName: text("sg_name").notNull(),
  sgRole: text("sg_role").notNull(),
  sgBadge: text("sg_badge").notNull(),
  sgPhoto: text("sg_photo"),
  sgPhone: text("sg_phone"),
  sgWhatsapp: text("sg_whatsapp"),
  validatedAt: timestamp("validated_at", { withTimezone: true }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Mercuriale indicative propre à chaque filière (fourchettes de prix constatées). */
export const sectorArticles = pgTable("sector_articles", {
  id: serial("id").primaryKey(),
  sectorSlug: text("sector_slug").notNull(),
  label: text("label").notNull(),
  unit: text("unit").notNull(),
  priceLow: doublePrecision("price_low").notNull(),
  priceHigh: doublePrecision("price_high").notNull(),
  market: text("market").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

/**
 * Pièces de marque déposées par la Coordination (logo officiel).
 * Le contenu est stocké en base afin de survivre aux reconstructions.
 */
export const brandAssets = pgTable("brand_assets", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull().unique(),
  filename: text("filename").notNull(),
  mime: text("mime").notNull(),
  /** Source SVG, ou données base64 pour un bitmap. */
  data: text("data").notNull(),
  encoding: text("encoding").notNull().default("utf8"),
  sourceFormat: text("source_format").notNull(),
  width: integer("width"),
  height: integer("height"),
  bytes: integer("bytes").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

/**
 * Bibliothèque d'images téléversées depuis l'administration.
 * Les fichiers sont conservés en base afin de survivre aux redéploiements.
 */
export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  /** « portrait » (4:5) ou « image » (paysage libre). */
  usage: text("usage").notNull().default("image"),
  mime: text("mime").notNull(),
  /** Données base64 du fichier optimisé. */
  data: text("data").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  bytes: integer("bytes").notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull(),
});

/** Messages reçus par le formulaire de contact. */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  organisation: text("organisation"),
  subject: text("subject").notNull(),
  region: text("region"),
  body: text("body").notNull(),
  status: text("status").notNull().default("Nouveau"),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
});

/** Partenaires : institutionnels, publics et privés. */
export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  acronym: text("acronym").notNull(),
  category: text("category").notNull(),
  role: text("role").notNull(),
  /** Couleur d'accent de la pastille, en hexadécimal. */
  tint: text("tint").notNull().default("#2B7A3F"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Reportage photographique des activités de la Coordination. */
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  caption: text("caption").notNull(),
  place: text("place").notNull(),
  kind: text("kind").notNull(),
  image: text("image").notNull(),
  heldAt: timestamp("held_at", { withTimezone: true }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Member = typeof members.$inferSelect;
export type LocalOfficer = typeof localOfficers.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Sector = typeof sectors.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type SectorArticle = typeof sectorArticles.$inferSelect;
export type NewsItem = typeof news.$inferSelect;
export type Commodity = typeof commodities.$inferSelect;
export type Currency = typeof currencies.$inferSelect;
