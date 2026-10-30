-- Seed COCOMCI — Filières professionnelles et mercuriale par filière
-- (apostrophes typographiques ’ volontaires : évite tout échappement SQL)
BEGIN;
TRUNCATE sectors, sector_articles RESTART IDENTITY;

INSERT INTO sectors (slug, name, tagline, emblem, operators, markets_label, cities_label, lead_name, lead_role, lead_badge, sg_name, sg_role, sg_badge, validated_at, sort_order, description) VALUES
('quincaillerie', 'Quincaillerie', 'Matériaux de construction, outillage et ferronnerie', 'quincaillerie', 143,
 'Marché d’Adjamé Liberté · Dépôts de Gesco · Zone industrielle de Vridi',
 'Abidjan · Bouaké · San-Pédro · Daloa',
 'Ibrahima Sangaré', 'Président de filière', 'COC-FIL-QUI-2019-01',
 'Affoué Marie-Laure Kouadio', 'Secrétaire général de filière', 'COC-FIL-QUI-2021-02',
 '2026-01-16T10:00:00+00:00', 1,
 'La filière Quincaillerie regroupe les dépôts de matériaux, les grossistes en outillage et les ferronniers. Elle suit de près le prix du sac de ciment, du fer à béton et de la tôle, trois indicateurs qui commandent le coût de la construction dans tout le pays. La filière siège à la commission des prix du bâtiment et alerte le Bureau Exécutif National en cas de rupture d’approvisionnement sur les dépôts.'),

('textile', 'Textile et Habillement', 'Pagne, friperie, confection et accessoires', 'textile', 212,
 'Marché d’Adjamé Forum · Marché Gouro · Marché de Treichville',
 'Abidjan · Bouaké · Korhogo · Man',
 'Mariam Doumbia', 'Présidente de filière', 'COC-FIL-TEX-2017-01',
 'Ange-Désiré Brou', 'Secrétaire général de filière', 'COC-FIL-TEX-2020-02',
 '2026-01-18T10:00:00+00:00', 2,
 'Première filière de la Coordination par le nombre d’opératrices, le Textile et l’Habillement couvre le pagne wax et fancy, le bazin, la friperie, la confection et les accessoires. Elle défend la régularité des arrivages, lutte contre la contrefaçon des imprimés et accompagne les commerçantes dans la formalisation de leurs étals et la tenue de leurs comptes.'),

('electromenager', 'Appareils et Électroménagers', 'Froid, cuisson, confort et petit électroménager', 'electromenager', 67,
 'Rue du Commerce, Plateau · Marché de Marcory · Adjamé Roxy',
 'Abidjan · Yamoussoukro · Bouaké',
 'Serge Kouassi N’Goran', 'Président de filière', 'COC-FIL-ELM-2018-01',
 'Habiba Fofana', 'Secrétaire général de filière', 'COC-FIL-ELM-2022-02',
 '2026-01-21T10:00:00+00:00', 3,
 'La filière des Appareils et Électroménagers réunit les importateurs et revendeurs de réfrigérateurs, congélateurs, climatiseurs, cuisinières et petit électroménager. Ses priorités : la garantie commerciale effective, la disponibilité des pièces de rechange et la qualification des techniciens après-vente, condition de la confiance du consommateur ivoirien.'),

('telephone', 'Téléphones et Électronique', 'Terminaux, accessoires, audiovisuel et maintenance', 'telephone', 156,
 'Adjamé Roxy · Rue du Commerce, Plateau · Marché de Koumassi',
 'Abidjan · Bouaké · San-Pédro · Abengourou',
 'Cheick Oumar Touré', 'Président de filière', 'COC-FIL-TEL-2019-01',
 'Léontine Gbagbo Dibi', 'Secrétaire général de filière', 'COC-FIL-TEL-2021-02',
 '2026-01-23T10:00:00+00:00', 4,
 'Filière la plus jeune et la plus mobile de la Coordination, les Téléphones et l’Électronique rassemblent les revendeurs de terminaux, d’accessoires, de téléviseurs et les ateliers de réparation. La filière mène une action soutenue contre les terminaux volés et non homologués, et organise la traçabilité des appareils d’occasion sur les marchés.'),

('pieces', 'Pièces Détachées', 'Automobile, deux-roues, poids lourds et engins', 'pieces', 101,
 'Marché de Gesco · Adjamé Bromakoté · Marché de Koumassi',
 'Abidjan · Bouaké · Daloa · Korhogo',
 'Adama Diomandé', 'Président de filière', 'COC-FIL-PDR-2016-01',
 'Véronique Tanoh', 'Secrétaire général de filière', 'COC-FIL-PDR-2020-02',
 '2026-01-27T10:00:00+00:00', 5,
 'La filière Pièces Détachées approvisionne le parc automobile, les deux-roues, les poids lourds et les engins de chantier. Elle travaille à la distinction claire entre pièces d’origine, pièces adaptables et pièces de réemploi, et milite pour un étiquetage lisible des références et des garanties sur l’ensemble des marchés spécialisés.'),

('services', 'Prestations de Services', 'Transport, manutention, transit, gardiennage et conseil', 'services', 48,
 'Gare de fret de Yopougon · Port d’Abidjan · Marchés communaux',
 'Abidjan · San-Pédro · Bouaké · Korhogo',
 'Pascal Yéboué Kouamé', 'Président de filière', 'COC-FIL-SER-2018-01',
 'Nadia Ouattara', 'Secrétaire général de filière', 'COC-FIL-SER-2022-02',
 '2026-01-31T10:00:00+00:00', 6,
 'Sans transport, sans manutention et sans transit, aucune marchandise ne circule. La filière Prestations de Services fédère les transporteurs de marchandises, les manutentionnaires, les transitaires, les sociétés de gardiennage et les prestataires de services aux commerçants. Elle publie des fourchettes tarifaires de référence afin de limiter les écarts abusifs entre opérateurs.'),

('cosmetiques', 'Cosmétiques', 'Karité, soins, parfumerie et produits capillaires', 'cosmetiques', 118,
 'Marché d’Adjamé 220 Logements · Marché de Treichville · Cocody Angré',
 'Abidjan · Korhogo · Bouaké · Odienné',
 'Fatim Koné Bamba', 'Présidente de filière', 'COC-FIL-COS-2019-01',
 'Olivier Assoumou', 'Secrétaire général de filière', 'COC-FIL-COS-2021-02',
 '2026-02-03T10:00:00+00:00', 7,
 'La filière Cosmétiques valorise la production locale de karité, de savon noir et d’huiles végétales, aux côtés de la parfumerie et des produits capillaires importés. Elle mène une campagne permanente de sensibilisation contre les produits dépigmentants prohibés et accompagne les coopératives de femmes productrices de karité du nord du pays.'),

('vivriers', 'Produits Alimentaires & Vivriers', 'Céréales, maraîchers, protéines et denrées de base', 'vivriers', 395,
 'Marché de Treichville · Adjamé 220 Logements · Korhogo · Bouaké',
 'Les dix-neuf régions',
 'KAMAGATÉ Lamine', 'Président de filière', 'COC-FIL-VIV-2011-01',
 'Aïcha Traoré Kouassi', 'Secrétaire général de filière', 'COC-FIL-VIV-2014-02',
 '2026-02-05T10:00:00+00:00', 8,
 'Filière historique et la plus nombreuse de la Coordination, les Produits Alimentaires et Vivriers couvrent les céréales, les tubercules, les produits maraîchers, les protéines animales et les denrées de base importées. C’est elle qui alimente chaque matin le Bulletin des cours publié par la COCOMCI.');

INSERT INTO sector_articles (sector_slug, label, unit, price_low, price_high, market, sort_order) VALUES
('quincaillerie', 'Ciment CPJ 42,5', 'sac de 50 kg', 4200, 4900, 'Dépôts de Gesco', 1),
('quincaillerie', 'Fer à béton Ø 8 mm', 'barre de 12 m', 3400, 4100, 'Adjamé Liberté', 2),
('quincaillerie', 'Tôle bac aluminium 0,30 mm', 'm²', 4800, 5600, 'Zone industrielle de Vridi', 3),
('quincaillerie', 'Peinture à eau', 'seau de 20 L', 13500, 19000, 'Adjamé Liberté', 4),
('quincaillerie', 'Pointes et clous', 'kg', 850, 1200, 'Marché de Treichville', 5),
('quincaillerie', 'Tube PVC Ø 100', 'barre de 4 m', 6200, 7800, 'Dépôts de Gesco', 6),

('textile', 'Pagne wax imprimé', 'complet 6 yards', 9000, 35000, 'Adjamé Forum', 1),
('textile', 'Pagne fancy', 'complet 6 yards', 4500, 7500, 'Marché Gouro', 2),
('textile', 'Bazin riche teint', 'coupon de 5 m', 24000, 62000, 'Adjamé Forum', 3),
('textile', 'Friperie chemises', 'ballot de 45 kg', 85000, 125000, 'Marché de Treichville', 4),
('textile', 'Tee-shirt coton', 'pièce', 2500, 5000, 'Marché Gouro', 5),
('textile', 'Chaussures de ville', 'paire', 8000, 28000, 'Adjamé Forum', 6),

('electromenager', 'Réfrigérateur 180 L', 'unité', 145000, 215000, 'Rue du Commerce, Plateau', 1),
('electromenager', 'Congélateur bahut 200 L', 'unité', 185000, 265000, 'Marché de Marcory', 2),
('electromenager', 'Climatiseur split 1,5 CV', 'unité', 210000, 325000, 'Rue du Commerce, Plateau', 3),
('electromenager', 'Cuisinière 4 feux', 'unité', 95000, 165000, 'Adjamé Roxy', 4),
('electromenager', 'Ventilateur sur pied', 'unité', 18000, 34000, 'Adjamé Roxy', 5),
('electromenager', 'Fer à repasser à vapeur', 'unité', 7500, 16000, 'Marché de Marcory', 6),

('telephone', 'Smartphone entrée de gamme', 'unité', 45000, 85000, 'Adjamé Roxy', 1),
('telephone', 'Smartphone milieu de gamme', 'unité', 120000, 265000, 'Rue du Commerce, Plateau', 2),
('telephone', 'Téléphone à touches', 'unité', 8500, 15000, 'Marché de Koumassi', 3),
('telephone', 'Téléviseur LED 32 pouces', 'unité', 85000, 138000, 'Rue du Commerce, Plateau', 4),
('telephone', 'Batterie externe 10 000 mAh', 'unité', 6000, 18000, 'Adjamé Roxy', 5),
('telephone', 'Carte mémoire 32 Go', 'unité', 4500, 8500, 'Marché de Koumassi', 6),

('pieces', 'Plaquettes de frein', 'jeu', 12000, 28000, 'Marché de Gesco', 1),
('pieces', 'Batterie 12 V 60 Ah', 'unité', 45000, 78000, 'Adjamé Bromakoté', 2),
('pieces', 'Pneu tourisme 175/65 R14', 'unité', 32000, 56000, 'Marché de Gesco', 3),
('pieces', 'Amortisseur avant', 'unité', 22000, 48000, 'Marché de Koumassi', 4),
('pieces', 'Filtre à huile', 'unité', 3500, 7500, 'Adjamé Bromakoté', 5),
('pieces', 'Kit chaîne moto', 'jeu', 14000, 26000, 'Marché de Koumassi', 6),

('services', 'Transport de marchandises Abidjan–Bouaké', 'tonne', 18000, 26000, 'Gare de fret de Yopougon', 1),
('services', 'Manutention et portage', 'sac de 50 kg', 150, 300, 'Adjamé 220 Logements', 2),
('services', 'Location d’étal couvert', 'mois', 15000, 45000, 'Marchés communaux', 3),
('services', 'Gardiennage de magasin', 'mois', 90000, 150000, 'Zone commerciale du Plateau', 4),
('services', 'Transit et dédouanement', 'dossier', 75000, 165000, 'Port d’Abidjan', 5),
('services', 'Impression et pose d’enseigne', 'm²', 9000, 18000, 'Zone commerciale du Plateau', 6),

('cosmetiques', 'Beurre de karité brut', 'kg', 1800, 3200, 'Adjamé 220 Logements', 1),
('cosmetiques', 'Huile de coco pressée', 'litre', 2500, 4500, 'Marché de Treichville', 2),
('cosmetiques', 'Savon noir artisanal', 'kg', 1200, 2200, 'Adjamé 220 Logements', 3),
('cosmetiques', 'Crème hydratante corps', 'pot de 500 ml', 1500, 6500, 'Cocody Angré', 4),
('cosmetiques', 'Mèches et tissage', 'paquet', 3500, 12000, 'Adjamé Forum', 5),
('cosmetiques', 'Parfum importé', 'flacon de 100 ml', 12000, 48000, 'Rue du Commerce, Plateau', 6),

('vivriers', 'Riz brisure importé', 'kg', 680, 740, 'Marché de Treichville', 1),
('vivriers', 'Maïs grain', 'kg', 385, 430, 'Marché de Korhogo', 2),
('vivriers', 'Tomate fraîche', 'kg', 1000, 1300, 'Adjamé 220 Logements', 3),
('vivriers', 'Huile de palme rouge', 'litre', 1150, 1400, 'Marché de Treichville', 4),
('vivriers', 'Viande de bœuf', 'kg', 3900, 4500, 'Bouaké Air France 2', 5),
('vivriers', 'Sucre en poudre', 'kg', 850, 980, 'Adjamé 220 Logements', 6);

COMMIT;

-- Représentants de filière ajoutés à l'annuaire des adhérents
INSERT INTO members (badge_number, full_name, function, region, city, sector, status, member_since, is_bne) VALUES
('COC-ABJ-2015-0290', 'Ibrahima Sangaré', 'Président de filière Quincaillerie', 'Lagunes', 'Adjamé', 'Quincaillerie', 'En règle', 2015, false),
('COC-ABJ-2016-0333', 'Mariam Doumbia', 'Présidente de filière Textile et Habillement', 'Lagunes', 'Adjamé', 'Textile et Habillement', 'En règle', 2016, false),
('COC-ABJ-2018-0512', 'Serge Kouassi N’Goran', 'Président de filière Électroménagers', 'Lagunes', 'Plateau', 'Appareils et Électroménagers', 'En règle', 2018, false),
('COC-ABJ-2019-0598', 'Cheick Oumar Touré', 'Président de filière Téléphones et Électronique', 'Lagunes', 'Adjamé', 'Téléphones et Électronique', 'En règle', 2019, false),
('COC-ABJ-2014-0151', 'Adama Diomandé', 'Président de filière Pièces Détachées', 'Lagunes', 'Yopougon', 'Pièces Détachées', 'En règle', 2014, false),
('COC-ABJ-2017-0467', 'Pascal Yéboué Kouamé', 'Président de filière Prestations de Services', 'Lagunes', 'Treichville', 'Prestations de Services', 'En règle', 2017, false),
('COC-ABJ-2019-0633', 'Fatim Koné Bamba', 'Présidente de filière Cosmétiques', 'Lagunes', 'Cocody', 'Cosmétiques', 'En règle', 2019, false),
('COC-BKE-2018-0541', 'Aboubacar Sidibé', 'Délégué filière Textile — Bouaké', 'Vallée du Bandama', 'Bouaké', 'Textile et Habillement', 'En règle', 2018, false),
('COC-KOR-2020-0718', 'Haoua Sangaré', 'Déléguée filière Cosmétiques — Savanes', 'Savanes', 'Korhogo', 'Cosmétiques', 'En règle', 2020, false),
('COC-SPD-2019-0660', 'Clarisse Yéo', 'Déléguée filière Services — San-Pédro', 'Bas-Sassandra', 'San-Pédro', 'Prestations de Services', 'En règle', 2019, false)
ON CONFLICT (badge_number) DO NOTHING;
