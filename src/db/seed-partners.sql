-- Seed COCOMCI — partenaires institutionnels, publics et privés
BEGIN;
TRUNCATE partners RESTART IDENTITY;

INSERT INTO partners (name, acronym, category, role, tint, sort_order) VALUES
-- ─── Institutionnels ───
('Commission de la Concurrence', 'CC', 'Institutionnel',
 'Veille sur les pratiques commerciales et la loyauté de la concurrence', '#1B5E8A', 1),
('Commission de Lutte Contre la Cherté de la Vie', 'CLCV', 'Institutionnel',
 'Concertation sur les prix des produits de grande consommation', '#B23F14', 2),
('Ministère du Commerce et de l''Industrie', 'MCI', 'Institutionnel',
 'Tutelle administrative et homologation des mercuriales', '#2B7A3F', 3),
('Chambre de Commerce et d''Industrie de Côte d''Ivoire', 'CCI-CI', 'Institutionnel',
 'Appui à la formalisation et à la représentation des opérateurs', '#1B5E8A', 4),

-- ─── Publics ───
('Office d''Aide à la Commercialisation des Produits Vivriers', 'OCPV', 'Public',
 'Relevés de prix conjoints sur les marchés de gros', '#2B7A3F', 5),
('Institut National de la Statistique', 'INS', 'Public',
 'Méthodologie des indices de prix à la consommation', '#1B5E8A', 6),
('Port Autonome d''Abidjan', 'PAA', 'Public',
 'Suivi des arrivages de riz, d''huile et de denrées de base', '#1B5E8A', 7),
('Agence Nationale d''Appui au Développement Rural', 'ANADER', 'Public',
 'Liaison avec les coopératives de producteurs vivriers', '#2B7A3F', 8),

-- ─── Privés ───
('Mutuelle des Commerçants de Côte d''Ivoire', 'MUCCI', 'Privé',
 'Protection sociale et prévoyance des opérateurs adhérents', '#6B4423', 9),
('Groupement des Transporteurs de Marchandises', 'GTM', 'Privé',
 'Tarifs de référence sur les axes Abidjan–intérieur', '#B23F14', 10),
('Union des Grossistes et Importateurs', 'UGI', 'Privé',
 'Concertation sur les prix de gros des denrées importées', '#B23F14', 11),
('Réseau des Institutions de Microfinance', 'RIM', 'Privé',
 'Crédit de campagne aux opérateurs adhérents', '#6B4423', 12);

COMMIT;
