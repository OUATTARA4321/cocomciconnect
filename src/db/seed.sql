-- Seed COCOMCI — données de démonstration réalistes (FCFA, février 2026)
BEGIN;
TRUNCATE members, news, commodities, currencies RESTART IDENTITY;

INSERT INTO members (badge_number, full_name, function, region, city, sector, status, member_since, is_bne) VALUES
('COC-ABJ-2011-0001', 'KAMAGATÉ Lamine', 'Président du Bureau Exécutif National', 'Lagunes', 'Abidjan', 'Céréales & importation', 'En règle', 2011, true),
('COC-ABJ-2014-0087', 'Aïcha Traoré Kouassi', 'Secrétaire Générale', 'Lagunes', 'Yopougon', 'Produits vivriers', 'En règle', 2014, true),
('COC-ABJ-2013-0044', 'Souleymane Bakayoko', 'Trésorier National', 'Lagunes', 'Treichville', 'Poissons & produits de la mer', 'En règle', 2013, true),
('COC-YAM-2016-0212', 'Marie-Josée Gnaoré', 'Commissaire aux comptes', 'Yamoussoukro', 'Yamoussoukro', 'Maraîchers & horticulture', 'En règle', 2016, true),
('COC-ABJ-2017-0421', 'Solange Aka Assi', 'Chargée de la formalisation des marchés', 'Lagunes', 'Adjamé', 'Distribution générale', 'En règle', 2017, true),
('COC-SPD-2012-0078', 'Yao N''Guessan Bernard', 'Responsable régional — Bas-Sassandra', 'Bas-Sassandra', 'San-Pédro', 'Riz & produits d''entrepôt', 'En règle', 2012, false),
('COC-KOR-2015-0301', 'Ibrahim Coulibaly', 'Responsable régional — Savanes', 'Savanes', 'Korhogo', 'Céréales (maïs, sorgho)', 'En règle', 2015, false),
('COC-SEG-2017-0455', 'Fatoumata Bamba', 'Responsable régionale — Worodougou', 'Worodougou', 'Séguéla', 'Riz & céréales', 'En règle', 2017, false),
('COC-ABG-2018-0523', 'Estelle Kouamé Dago', 'Responsable régionale — Moyen-Comoé', 'Moyen-Comoé', 'Abengourou', 'Produits maraîchers', 'En règle', 2018, false),
('COC-KAT-2019-0610', 'Mamadou Ouattara', 'Responsable régional — Hambol', 'Hambol', 'Katiola', 'Bétail & viande', 'En règle', 2019, false),
('COC-DIV-2016-0388', 'Ange Kouadio Kouamé', 'Responsable régional — Lôh-Djiboua', 'Lôh-Djiboua', 'Divo', 'Manioc & attiéké', 'En règle', 2016, false),
('COC-ODN-2020-0702', 'Rokia Sidibé', 'Responsable régionale — Denguélé', 'Denguélé', 'Odienné', 'Céréales & arachide', 'En règle', 2020, false),
('COC-SBR-2019-0645', 'Patrice Assamoi', 'Responsable régional — Nawa', 'Nawa', 'Soubré', 'Vivriers & hévéa', 'En règle', 2019, false),
('COC-TBA-2021-0811', 'Djeneba Cissé', 'Trésorière adjointe — Bafing', 'Bafing', 'Touba', 'Produits vivriers', 'En règle', 2021, false),
('COC-BDK-2018-0534', 'Éric Boti Kouamé', 'Responsable régional — Gontougo', 'Gontougo', 'Bondoukou', 'Céréales & arachide', 'En règle', 2018, false),
('COC-ABJ-2022-0903', 'Christine Diabaté', 'Secrétaire adjointe — commissions', 'Lagunes', 'Abidjan', 'Sucre & denrées de base', 'Cotisation à jour', 2022, false);

-- (actualités chargées par src/db/seed-news.sql)

INSERT INTO commodities (name, category, unit, market, city, price, previous_price, trend, updated_at) VALUES
('Sucre en poudre', 'Matières premières', 'kg', 'Marché d''Adjamé 220 Logements', 'Abidjan', 900, 880, 'hausse', '2026-02-12T08:10:00+00:00'),
('Huile de palme rouge', 'Matières premières', 'litre', 'Marché de Treichville', 'Abidjan', 1250, 1250, 'stable', '2026-02-12T08:10:00+00:00'),
('Huile végétale (tournesol)', 'Matières premières', 'litre', 'Marché de Yopougon Siporex', 'Yopougon', 1800, 1760, 'hausse', '2026-02-12T08:10:00+00:00'),
('Farine de blé', 'Matières premières', 'kg', 'Marché d''Adjamé 220 Logements', 'Abidjan', 750, 765, 'baisse', '2026-02-12T08:10:00+00:00'),
('Lait concentré sucré (400 g)', 'Matières premières', 'boîte', 'Marché de Treichville', 'Abidjan', 1900, 1880, 'hausse', '2026-02-12T08:10:00+00:00'),
('Lait en poudre (900 g)', 'Matières premières', 'paquet', 'Marché de San-Pédro', 'San-Pédro', 6200, 6200, 'stable', '2026-02-12T08:10:00+00:00'),
('Riz brisure importé', 'Céréales', 'kg', 'Marché de Treichville', 'Abidjan', 700, 690, 'hausse', '2026-02-12T08:10:00+00:00'),
('Riz local usiné', 'Céréales', 'kg', 'Marché de Korhogo', 'Korhogo', 850, 870, 'baisse', '2026-02-12T08:10:00+00:00'),
('Maïs grain', 'Céréales', 'kg', 'Marché de Korhogo', 'Korhogo', 400, 415, 'baisse', '2026-02-12T08:10:00+00:00'),
('Mil décortiqué', 'Céréales', 'kg', 'Marché de Korhogo', 'Korhogo', 450, 450, 'stable', '2026-02-12T08:10:00+00:00'),
('Sorgho grain', 'Céréales', 'kg', 'Marché de Daloa', 'Daloa', 420, 405, 'hausse', '2026-02-12T08:10:00+00:00'),
('Arachide décortiquée', 'Céréales', 'kg', 'Marché de Bondoukou', 'Bondoukou', 1500, 1480, 'hausse', '2026-02-12T08:10:00+00:00'),
('Igname fraîche', 'Produits vivriers', 'kg', 'Marché d''Abengourou', 'Abengourou', 700, 720, 'baisse', '2026-02-12T08:10:00+00:00'),
('Manioc frais', 'Produits vivriers', 'kg', 'Marché de Divo', 'Divo', 350, 350, 'stable', '2026-02-12T08:10:00+00:00'),
('Attiéké', 'Produits vivriers', 'kg', 'Marché de Divo', 'Divo', 1000, 960, 'hausse', '2026-02-12T08:10:00+00:00'),
('Banane plantain', 'Produits vivriers', 'kg', 'Marché de Soubré', 'Soubré', 650, 665, 'baisse', '2026-02-12T08:10:00+00:00'),
('Patate douce', 'Produits vivriers', 'kg', 'Marché de Yamoussoukro', 'Yamoussoukro', 520, 520, 'stable', '2026-02-12T08:10:00+00:00'),
('Tomate fraîche', 'Maraîchers', 'kg', 'Marché d''Adjamé 220 Logements', 'Abidjan', 1100, 1250, 'baisse', '2026-02-12T08:10:00+00:00'),
('Oignon sec', 'Maraîchers', 'kg', 'Marché de Treichville', 'Abidjan', 900, 870, 'hausse', '2026-02-12T08:10:00+00:00'),
('Oignon frais local', 'Maraîchers', 'kg', 'Marché de Korhogo', 'Korhogo', 750, 750, 'stable', '2026-02-12T08:10:00+00:00'),
('Piment vert', 'Maraîchers', 'kg', 'Marché de Yopougon Siporex', 'Yopougon', 1400, 1350, 'hausse', '2026-02-12T08:10:00+00:00'),
('Chou cabus', 'Maraîchers', 'kg', 'Marché d''Abengourou', 'Abengourou', 700, 710, 'baisse', '2026-02-12T08:10:00+00:00'),
('Gombo frais', 'Maraîchers', 'kg', 'Marché de Bouaké Air France 2', 'Bouaké', 980, 980, 'stable', '2026-02-12T08:10:00+00:00'),
('Poisson congelé (thon)', 'Protéines', 'kg', 'Marché de Treichville', 'Abidjan', 2400, 2320, 'hausse', '2026-02-12T08:10:00+00:00'),
('Sardine fraîche', 'Protéines', 'kg', 'Marché de San-Pédro', 'San-Pédro', 1700, 1780, 'baisse', '2026-02-12T08:10:00+00:00'),
('Viande de bœuf', 'Protéines', 'kg', 'Marché de Bouaké Air France 2', 'Bouaké', 4200, 4100, 'hausse', '2026-02-12T08:10:00+00:00'),
('Poulet fermier (pièce)', 'Protéines', 'pièce', 'Marché de Yamoussoukro', 'Yamoussoukro', 3500, 3500, 'stable', '2026-02-12T08:10:00+00:00'),
('Poisson fumé (silure)', 'Protéines', 'kg', 'Marché de Korhogo', 'Korhogo', 3100, 2980, 'hausse', '2026-02-12T08:10:00+00:00');

INSERT INTO currencies (code, name, rate, change_pct, note) VALUES
('XOF', 'Franc CFA (UEMOA)', 1, 0, 'Monnaie de référence du bulletin'),
('EUR', 'Euro', 655.957, 0, 'Parité fixe garantie : 1 EUR = 655,957 XOF'),
('USD', 'Dollar américain', 598.2, 0.35, 'Cours indicatif — marché de change d''Abidjan'),
('GBP', 'Livre sterling', 762.4, -0.12, 'Cours indicatif'),
('CHF', 'Franc suisse', 672.3, 0.15, 'Cours indicatif'),
('CNY', 'Yuan renminbi', 82.95, -0.08, 'Cours indicatif — approvisionnements importés'),
('JPY', 'Yen japonais', 4.02, -0.22, 'Cours indicatif'),
('NGN', 'Naira nigérian', 0.395, 0.31, 'Marché frontalier — fort écart de change'),
('GHS', 'Cédi ghanéen', 48.6, 0.44, 'Marché frontalier est'),
('GNF', 'Franc guinéen', 0.0688, 0.2, 'Marché frontalier nord-ouest');

COMMIT;
