-- ═══════════════════════════════════════════════════════════
--  COCOMCI — création des tables de production
--  À coller dans le SQL Editor de Neon, puis exécuter (Run).
--  Sans danger : ne fait rien si les tables existent déjà.
-- ═══════════════════════════════════════════════════════════



CREATE TABLE IF NOT EXISTS public.activities (
    id integer NOT NULL,
    title text NOT NULL,
    caption text NOT NULL,
    place text NOT NULL,
    kind text NOT NULL,
    image text NOT NULL,
    held_at timestamp with time zone NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;

CREATE TABLE IF NOT EXISTS public.brand_assets (
    id integer NOT NULL,
    kind text NOT NULL,
    filename text NOT NULL,
    mime text NOT NULL,
    data text NOT NULL,
    encoding text DEFAULT 'utf8'::text NOT NULL,
    source_format text NOT NULL,
    width integer,
    height integer,
    bytes integer DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.brand_assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.brand_assets_id_seq OWNED BY public.brand_assets.id;

CREATE TABLE IF NOT EXISTS public.commodities (
    id integer NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    unit text NOT NULL,
    market text NOT NULL,
    city text NOT NULL,
    price double precision NOT NULL,
    previous_price double precision NOT NULL,
    trend text DEFAULT 'stable'::text NOT NULL,
    updated_at timestamp with time zone NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.commodities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.commodities_id_seq OWNED BY public.commodities.id;

CREATE TABLE IF NOT EXISTS public.currencies (
    id integer NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    rate double precision NOT NULL,
    change_pct double precision DEFAULT 0 NOT NULL,
    note text DEFAULT ''::text NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.currencies_id_seq OWNED BY public.currencies.id;

CREATE TABLE IF NOT EXISTS public.local_officers (
    id integer NOT NULL,
    badge_number text NOT NULL,
    full_name text NOT NULL,
    role text NOT NULL,
    level text NOT NULL,
    scope text NOT NULL,
    region text NOT NULL,
    city text NOT NULL,
    phone text NOT NULL,
    status text DEFAULT 'Badge validé'::text NOT NULL,
    validated_at timestamp with time zone NOT NULL,
    officer_since integer NOT NULL,
    photo text,
    whatsapp text,
    email text
);

CREATE SEQUENCE IF NOT EXISTS public.local_officers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.local_officers_id_seq OWNED BY public.local_officers.id;

CREATE TABLE IF NOT EXISTS public.media_assets (
    id integer NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    usage text DEFAULT 'image'::text NOT NULL,
    mime text NOT NULL,
    data text NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    bytes integer NOT NULL,
    uploaded_at timestamp with time zone NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.media_assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.media_assets_id_seq OWNED BY public.media_assets.id;

CREATE TABLE IF NOT EXISTS public.members (
    id integer NOT NULL,
    badge_number text NOT NULL,
    full_name text NOT NULL,
    function text NOT NULL,
    region text NOT NULL,
    city text NOT NULL,
    sector text NOT NULL,
    status text DEFAULT 'En règle'::text NOT NULL,
    member_since integer NOT NULL,
    is_bne boolean DEFAULT false NOT NULL,
    photo text
);

CREATE SEQUENCE IF NOT EXISTS public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;

CREATE TABLE IF NOT EXISTS public.messages (
    id integer NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    organisation text,
    subject text NOT NULL,
    region text,
    body text NOT NULL,
    status text DEFAULT 'Nouveau'::text NOT NULL,
    received_at timestamp with time zone NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;

CREATE TABLE IF NOT EXISTS public.news (
    id integer NOT NULL,
    slug text NOT NULL,
    category text NOT NULL,
    title text NOT NULL,
    excerpt text NOT NULL,
    body text NOT NULL,
    place text NOT NULL,
    source text NOT NULL,
    image text,
    published_at timestamp with time zone NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;

CREATE TABLE IF NOT EXISTS public.partners (
    id integer NOT NULL,
    name text NOT NULL,
    acronym text NOT NULL,
    category text NOT NULL,
    role text NOT NULL,
    tint text DEFAULT '#2B7A3F'::text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.partners_id_seq OWNED BY public.partners.id;

CREATE TABLE IF NOT EXISTS public.sector_articles (
    id integer NOT NULL,
    sector_slug text NOT NULL,
    label text NOT NULL,
    unit text NOT NULL,
    price_low double precision NOT NULL,
    price_high double precision NOT NULL,
    market text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.sector_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.sector_articles_id_seq OWNED BY public.sector_articles.id;

CREATE TABLE IF NOT EXISTS public.sectors (
    id integer NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    tagline text NOT NULL,
    description text NOT NULL,
    emblem text NOT NULL,
    operators integer NOT NULL,
    markets_label text NOT NULL,
    cities_label text NOT NULL,
    lead_name text NOT NULL,
    lead_role text NOT NULL,
    lead_badge text NOT NULL,
    sg_name text NOT NULL,
    sg_role text NOT NULL,
    sg_badge text NOT NULL,
    validated_at timestamp with time zone NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    lead_photo text,
    sg_photo text,
    lead_phone text,
    lead_whatsapp text,
    sg_phone text,
    sg_whatsapp text
);

CREATE SEQUENCE IF NOT EXISTS public.sectors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.sectors_id_seq OWNED BY public.sectors.id;

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);

ALTER TABLE ONLY public.brand_assets ALTER COLUMN id SET DEFAULT nextval('public.brand_assets_id_seq'::regclass);

ALTER TABLE ONLY public.commodities ALTER COLUMN id SET DEFAULT nextval('public.commodities_id_seq'::regclass);

ALTER TABLE ONLY public.currencies ALTER COLUMN id SET DEFAULT nextval('public.currencies_id_seq'::regclass);

ALTER TABLE ONLY public.local_officers ALTER COLUMN id SET DEFAULT nextval('public.local_officers_id_seq'::regclass);

ALTER TABLE ONLY public.media_assets ALTER COLUMN id SET DEFAULT nextval('public.media_assets_id_seq'::regclass);

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);

ALTER TABLE ONLY public.partners ALTER COLUMN id SET DEFAULT nextval('public.partners_id_seq'::regclass);

ALTER TABLE ONLY public.sector_articles ALTER COLUMN id SET DEFAULT nextval('public.sector_articles_id_seq'::regclass);

ALTER TABLE ONLY public.sectors ALTER COLUMN id SET DEFAULT nextval('public.sectors_id_seq'::regclass);

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.brand_assets
    ADD CONSTRAINT brand_assets_kind_unique UNIQUE (kind);

ALTER TABLE ONLY public.brand_assets
    ADD CONSTRAINT brand_assets_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.commodities
    ADD CONSTRAINT commodities_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_code_unique UNIQUE (code);

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.local_officers
    ADD CONSTRAINT local_officers_badge_number_unique UNIQUE (badge_number);

ALTER TABLE ONLY public.local_officers
    ADD CONSTRAINT local_officers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.media_assets
    ADD CONSTRAINT media_assets_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.media_assets
    ADD CONSTRAINT media_assets_slug_unique UNIQUE (slug);

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_badge_number_unique UNIQUE (badge_number);

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_slug_unique UNIQUE (slug);

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sector_articles
    ADD CONSTRAINT sector_articles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_slug_unique UNIQUE (slug);


