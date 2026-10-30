-- Seed COCOMCI — reportage photographique des activités
BEGIN;
TRUNCATE activities RESTART IDENTITY;

INSERT INTO activities (title, caption, place, kind, image, held_at, sort_order) VALUES
('Session ordinaire du Bureau Exécutif National',
 'Les responsables des dix-neuf régions réunis pour la première session de l’année. Six décisions ont été arrêtées, dont le recensement des opérateurs sur trente-huit marchés communaux.',
 'Siège de la COCOMCI, Plateau · Abidjan', 'Instance',
 'https://images.pexels.com/photos/15325468/pexels-photo-15325468.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-02-06T09:00:00+00:00', 1),

('Assises régionales des Savanes',
 'Plus de quatre cents opérateurs du nord réunis pour deux jours de travaux sur les prix du maïs, les coûts de transport et la formalisation des étals.',
 'Palais de la culture · Korhogo', 'Assises',
 'https://images.pexels.com/photos/15448072/pexels-photo-15448072.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-01-20T08:30:00+00:00', 2),

('Formation à l’hygiène et à la chaîne du froid',
 'Cent vingt vendeurs de poisson et de produits frais, dont soixante-quatorze femmes, formés pendant trois jours par les inspecteurs sanitaires et la commission technique.',
 'Maison des producteurs · San-Pédro', 'Formation',
 'https://images.pexels.com/photos/18999545/pexels-photo-18999545.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-01-29T09:00:00+00:00', 3),

('Atelier de la filière Textile et Habillement',
 'Les confectionneurs et revendeurs de pagne réunis autour de la lutte contre la contrefaçon des imprimés et de la régularité des arrivages.',
 'Marché Gouro · Adjamé, Abidjan', 'Filière',
 'https://images.pexels.com/photos/30487814/pexels-photo-30487814.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-01-18T10:00:00+00:00', 4),

('Remise des badges officiels aux coordinateurs',
 'Quarante mandats territoriaux validés par le Secrétariat Général : coordinateurs de région, de ville et secrétaires généraux de commune.',
 'Siège de la COCOMCI, Plateau · Abidjan', 'Cérémonie',
 'https://images.pexels.com/photos/16856088/pexels-photo-16856088.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-02-11T11:00:00+00:00', 5),

('Relevé des cours sur les marchés de gros',
 'Chaque matin entre 6h et 8h30, les responsables régionaux relèvent les prix sur les étals. Chaque cours est confirmé par trois opérateurs avant publication.',
 'Marché de Treichville · Abidjan', 'Terrain',
 'images/marche.jpg',
 '2026-02-12T06:30:00+00:00', 6),

('Recensement des entrepôts de céréales',
 'Mission de la commission économique sur les stocks de riz, de maïs et de mil, à la suite de la tension observée sur les arrivages de décembre.',
 'Zone d’entrepôts · San-Pédro', 'Terrain',
 'images/cereales.jpg',
 '2026-01-15T08:00:00+00:00', 7),

('Rencontre avec les coopératives de karité',
 'La filière Cosmétiques à la rencontre des productrices du nord, pour organiser la collecte et garantir un prix plancher au kilogramme de beurre brut.',
 'Coopérative féminine · Odienné', 'Filière',
 'https://images.pexels.com/photos/7849436/pexels-photo-7849436.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-02-02T10:00:00+00:00', 8),

('Commission des prix du bâtiment',
 'Travaux conjoints de la filière Quincaillerie et de la commission économique sur le sac de ciment, le fer à béton et la tôle.',
 'Siège de la COCOMCI, Plateau · Abidjan', 'Instance',
 'https://images.pexels.com/photos/9301152/pexels-photo-9301152.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=900',
 '2026-01-16T14:00:00+00:00', 9),

('Mission au terminal à conteneurs',
 'Suivi des arrivages de riz et d’huile au port d’Abidjan, en présence des opérateurs importateurs de la filière vivrière.',
 'Port autonome · Abidjan', 'Terrain',
 'images/port.jpg',
 '2026-02-08T07:30:00+00:00', 10);

COMMIT;
