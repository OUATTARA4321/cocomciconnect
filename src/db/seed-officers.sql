-- Seed COCOMCI — Coordinateurs et Secrétaires généraux des régions, villes et communes
BEGIN;
TRUNCATE local_officers RESTART IDENTITY;

INSERT INTO local_officers (badge_number, full_name, role, level, scope, region, city, phone, status, validated_at, officer_since) VALUES
-- ——— Échelon régional ———
('COC-LAG-2018-1101', 'Ibrahim Coulibaly', 'Coordinateur régional', 'Région', 'Lagunes', 'Lagunes', 'Abidjan', '07 48 21 33 90', 'Badge validé', '2026-01-12T10:00:00+00:00', 2018),
('COC-LAG-2019-1102', 'Fatoumata Bamba', 'Secrétaire général régional', 'Région', 'Lagunes', 'Lagunes', 'Abidjan', '07 49 62 18 04', 'Badge validé', '2026-01-12T10:00:00+00:00', 2019),
('COC-YAM-2017-1111', 'Yao Kouassi', 'Coordinateur régional', 'Région', 'Yamoussoukro', 'Yamoussoukro', 'Yamoussoukro', '07 07 55 21 76', 'Badge validé', '2026-01-09T10:00:00+00:00', 2017),
('COC-YAM-2020-1112', 'Awa Sanogo', 'Secrétaire général régional', 'Région', 'Yamoussoukro', 'Yamoussoukro', 'Yamoussoukro', '07 08 12 47 33', 'Badge validé', '2026-01-09T10:00:00+00:00', 2020),
('COC-BSS-2016-1121', 'Souleymane Bakayoko', 'Coordinateur régional', 'Région', 'Bas-Sassandra', 'Bas-Sassandra', 'San-Pédro', '07 45 33 08 21', 'Badge validé', '2026-01-15T10:00:00+00:00', 2016),
('COC-BSS-2019-1122', 'Clarisse Yéo', 'Secrétaire général régional', 'Région', 'Bas-Sassandra', 'Bas-Sassandra', 'San-Pédro', '07 46 90 27 15', 'Badge validé', '2026-01-15T10:00:00+00:00', 2019),
('COC-SAV-2015-1131', 'Mamadou Ouattara', 'Coordinateur régional', 'Région', 'Savanes', 'Savanes', 'Korhogo', '07 51 74 62 08', 'Badge validé', '2026-01-20T10:00:00+00:00', 2015),
('COC-SAV-2018-1132', 'Mariam Coulibaly', 'Secrétaire général régional', 'Région', 'Savanes', 'Savanes', 'Korhogo', '07 52 19 84 26', 'Badge validé', '2026-01-20T10:00:00+00:00', 2018),
('COC-WOR-2017-1141', 'Abdoulaye Sylla', 'Coordinateur régional', 'Région', 'Worodougou', 'Worodougou', 'Séguéla', '07 58 40 11 72', 'Badge validé', '2026-01-22T10:00:00+00:00', 2017),
('COC-WOR-2020-1142', 'Salimata Diarra', 'Secrétaire général régional', 'Région', 'Worodougou', 'Worodougou', 'Séguéla', '07 59 63 29 40', 'Badge validé', '2026-01-22T10:00:00+00:00', 2020),
('COC-MOY-2018-1151', 'Jean-Baptiste Gnahoré', 'Coordinateur régional', 'Région', 'Moyen-Comoé', 'Moyen-Comoé', 'Abengourou', '07 12 88 45 19', 'Badge validé', '2026-01-26T10:00:00+00:00', 2018),
('COC-MOY-2021-1152', 'Estelle Kouamé', 'Secrétaire général régional', 'Région', 'Moyen-Comoé', 'Moyen-Comoé', 'Abengourou', '07 13 27 56 82', 'Badge validé', '2026-01-26T10:00:00+00:00', 2021),
('COC-HAM-2019-1161', 'Félix Tanoh', 'Coordinateur régional', 'Région', 'Hambol', 'Hambol', 'Katiola', '07 22 64 30 15', 'Badge validé', '2026-01-28T10:00:00+00:00', 2019),
('COC-HAM-2021-1162', 'Bintou Koné', 'Secrétaire général régional', 'Région', 'Hambol', 'Hambol', 'Katiola', '07 23 41 77 09', 'Badge validé', '2026-01-28T10:00:00+00:00', 2021),
('COC-LOH-2016-1171', 'Ange Kouadio', 'Coordinateur régional', 'Région', 'Lôh-Djiboua', 'Lôh-Djiboua', 'Divo', '07 30 52 18 64', 'Badge validé', '2026-01-30T10:00:00+00:00', 2016),
('COC-LOH-2019-1172', 'Nadège Aka', 'Secrétaire général régional', 'Région', 'Lôh-Djiboua', 'Lôh-Djiboua', 'Divo', '07 31 86 24 57', 'Badge validé', '2026-01-30T10:00:00+00:00', 2019),
('COC-DEN-2020-1181', 'Karim Touré', 'Coordinateur régional', 'Région', 'Denguélé', 'Denguélé', 'Odienné', '07 42 15 63 28', 'Badge validé', '2026-02-02T10:00:00+00:00', 2020),
('COC-DEN-2022-1182', 'Haoua Sangaré', 'Secrétaire général régional', 'Région', 'Denguélé', 'Denguélé', 'Odienné', '07 43 70 19 85', 'Badge validé', '2026-02-02T10:00:00+00:00', 2022),
('COC-NAW-2019-1191', 'Patrice Assamoi', 'Coordinateur régional', 'Région', 'Nawa', 'Nawa', 'Soubré', '07 55 32 71 46', 'Badge validé', '2026-02-04T10:00:00+00:00', 2019),
('COC-NAW-2021-1192', 'Georgette Assi', 'Secrétaire général régional', 'Région', 'Nawa', 'Nawa', 'Soubré', '07 56 08 25 93', 'Badge validé', '2026-02-04T10:00:00+00:00', 2021),
('COC-BAF-2020-1201', 'Denis Koffi', 'Coordinateur régional', 'Région', 'Bafing', 'Bafing', 'Touba', '07 61 44 90 37', 'Badge validé', '2026-02-05T10:00:00+00:00', 2020),
('COC-BAF-2022-1202', 'Djeneba Cissé', 'Secrétaire général régional', 'Région', 'Bafing', 'Bafing', 'Touba', '07 62 13 58 24', 'Badge validé', '2026-02-05T10:00:00+00:00', 2022),
('COC-GON-2018-1211', 'Éric Boti', 'Coordinateur régional', 'Région', 'Gontougo', 'Gontougo', 'Bondoukou', '07 68 27 41 60', 'Badge validé', '2026-02-06T10:00:00+00:00', 2018),
('COC-GON-2021-1212', 'Rokia Sidibé', 'Secrétaire général régional', 'Région', 'Gontougo', 'Gontougo', 'Bondoukou', '07 69 55 32 18', 'Badge validé', '2026-02-06T10:00:00+00:00', 2021),

-- ——— Échelon ville / commune ———
('COC-YOP-2019-1301', 'Adama Konaté', 'Coordinateur de ville', 'Ville', 'Yopougon', 'Lagunes', 'Yopougon', '07 82 61 09 47', 'Badge validé', '2026-02-07T10:00:00+00:00', 2019),
('COC-YOP-2021-1302', 'Solange Aka', 'Secrétaire général de commune', 'Commune', 'Yopougon', 'Lagunes', 'Yopougon', '07 83 24 76 12', 'Badge validé', '2026-02-07T10:00:00+00:00', 2021),
('COC-ABO-2018-1311', 'Moussa Bamba', 'Coordinateur de ville', 'Ville', 'Abobo', 'Lagunes', 'Abobo', '07 84 50 33 28', 'Badge validé', '2026-02-08T10:00:00+00:00', 2018),
('COC-ABO-2020-1312', 'Sylvie N''Dri', 'Secrétaire général de commune', 'Commune', 'Abobo', 'Lagunes', 'Abobo', '07 85 17 62 90', 'Badge validé', '2026-02-08T10:00:00+00:00', 2020),
('COC-ADJ-2017-1321', 'Christophe Loukou', 'Coordinateur de ville', 'Ville', 'Adjamé', 'Lagunes', 'Adjamé', '07 86 39 25 74', 'Badge validé', '2026-02-09T10:00:00+00:00', 2017),
('COC-ADJ-2021-1322', 'Rachelle Gnahouri', 'Secrétaire général de commune', 'Commune', 'Adjamé', 'Lagunes', 'Adjamé', '07 87 92 40 16', 'Badge validé', '2026-02-09T10:00:00+00:00', 2021),
('COC-TRE-2016-1331', 'Idrissa Koné', 'Coordinateur de ville', 'Ville', 'Treichville', 'Lagunes', 'Treichville', '07 88 05 71 39', 'Badge validé', '2026-02-10T10:00:00+00:00', 2016),
('COC-TRE-2019-1332', 'Mireille Kouassi', 'Secrétaire général de commune', 'Commune', 'Treichville', 'Lagunes', 'Treichville', '07 89 63 28 54', 'Badge validé', '2026-02-10T10:00:00+00:00', 2019),
('COC-COC-2018-1341', 'Armand Kouamé', 'Coordinateur de ville', 'Ville', 'Cocody', 'Lagunes', 'Cocody', '07 90 41 86 22', 'Badge validé', '2026-02-11T10:00:00+00:00', 2018),
('COC-COC-2022-1342', 'Prisca Yao', 'Secrétaire général de commune', 'Commune', 'Cocody', 'Lagunes', 'Cocody', '07 91 28 54 07', 'Badge validé', '2026-02-11T10:00:00+00:00', 2022),
('COC-MAR-2019-1351', 'Bakary Touré', 'Coordinateur de ville', 'Ville', 'Marcory', 'Lagunes', 'Marcory', '07 92 76 13 45', 'Badge validé', '2026-02-11T10:00:00+00:00', 2019),
('COC-MAR-2021-1352', 'Julienne Assamoi', 'Secrétaire général de commune', 'Commune', 'Marcory', 'Lagunes', 'Marcory', '07 93 30 92 68', 'Badge validé', '2026-02-11T10:00:00+00:00', 2021),
('COC-BKE-2017-1361', 'Aboubacar Sidibé', 'Coordinateur de ville', 'Ville', 'Bouaké', 'Vallée du Bandama', 'Bouaké', '07 94 58 07 31', 'Badge validé', '2026-02-12T10:00:00+00:00', 2017),
('COC-BKE-2020-1362', 'Aminata Cissé', 'Secrétaire général de commune', 'Commune', 'Bouaké', 'Vallée du Bandama', 'Bouaké', '07 95 84 21 76', 'Badge validé', '2026-02-12T10:00:00+00:00', 2020),
('COC-KOR-2018-1371', 'Youssouf Diomandé', 'Coordinateur de ville', 'Ville', 'Korhogo', 'Savanes', 'Korhogo', '07 96 12 65 40', 'Badge validé', '2026-02-12T10:00:00+00:00', 2018),
('COC-KOR-2021-1372', 'Aïcha Traoré', 'Secrétaire général de commune', 'Commune', 'Korhogo', 'Savanes', 'Korhogo', '07 97 47 39 82', 'Badge validé', '2026-02-12T10:00:00+00:00', 2021);

COMMIT;
