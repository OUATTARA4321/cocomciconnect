-- Seed COCOMCI — actualités (ordre : slug, category, title, excerpt, place, source, image, published_at, body)
BEGIN;
TRUNCATE news RESTART IDENTITY;

INSERT INTO news (slug, category, title, excerpt, place, source, image, published_at, body) VALUES
('cours-riz-importe-treichville',
 'Commerce intérieur',
 'Le sac de riz brisure se stabilise à 16 500 FCFA sur le marché de Treichville',
 'Après trois semaines de hausse, le sac de 25 kg retrouve son niveau de décembre. Les opérateurs signalent une arrivée régulière depuis le port.',
 'Treichville',
 'Bulletin des cours COCOMCI',
 'images/cereales.jpg',
 '2026-02-10T09:20:00+00:00',
 'Le marché de Treichville a enregistré cette semaine un retour à la stabilité sur le riz brisure importé. Le sac de 25 kilogrammes s''échange à 16 500 FCFA, soit environ 700 FCFA le kilo, contre 17 250 FCFA la semaine précédente.

Les opérateurs de la COCOMCI expliquent ce repli par l''arrivée de trois navires-cargos au terminal à conteneurs du port d''Abidjan entre le 3 et le 7 février, ce qui a desserré la tension sur les stocks d''entrepôt. « Les camions repartent vers l''intérieur du pays depuis mardi, la demande de Bouaké et de Korhogo a été servie sans rupture », indique un grossiste de la section Riz et céréales.

La Coordination rappelle que les prix affichés dans son bulletin sont des relevés effectués sur les étals de gros et de demi-gros, hors négociation de volume, et qu''ils sont publiés à titre indicatif.'),

('inflation-alimentaire-janvier-2026',
 'Économie & marché',
 'Inflation alimentaire : +2,4 % sur un an, les vivriers tirent la hausse',
 'La COCOMCI publie sa note mensuelle sur le coût de la vie. Les produits maraîchers et les protéines animales restent les postes les plus dynamiques.',
 'Abidjan',
 'Commission économique de la COCOMCI',
 'images/port.jpg',
 '2026-02-08T11:05:00+00:00',
 'Dans sa note mensuelle de conjoncture, la COCOMCI observe une hausse modérée mais continue du panier alimentaire sur les marchés urbains. L''indice des vivriers progresse de 2,4 % sur douze mois, porté par la tomate (+11 %), l''oignon sec (+8 %) et la viande de bœuf (+6,5 %).

Deux facteurs sont avancés par la commission économique de la Coordination. Le premier est saisonnier : la campagne maraîchère du centre n''a commencé à alimenter les étals qu''à la mi-janvier, avec deux semaines de retard sur la moyenne décennale. Le second tient aux coûts de transport, encore élevés sur l''axe Abidjan-Korhogo.

À l''inverse, le riz local et le maïs grain s''inscrivent en repli, à 850 et 400 FCFA le kilo. La note recommande de poursuivre la mise à disposition de surfaces de vente aux producteurs périurbains afin de lisser les prix de gros.'),

('session-ordinaire-bne-2026',
 'Activités COCOMCI',
 'Le Bureau Exécutif National tient sa session ordinaire du 1er trimestre',
 'Formation des opérateurs, fonds de solidarité, cartographie des marchés communaux : le BNE a arrêté six décisions à Abidjan.',
 'Abidjan',
 'Bureau Exécutif National',
 'images/presidence.jpg',
 '2026-02-06T15:40:00+00:00',
 'Le Bureau Exécutif National de la COCOMCI s''est réuni en session ordinaire à Abidjan. La séance, présidée par KAMAGATÉ Lamine, a réuni les responsables des dix-neuf régions administratives et les chefs des commissions permanentes.

Six décisions ont été arrêtées. Premièrement, le lancement d''un recensement des opérateurs sur les marchés communaux, qui doit couvrir 38 marchés d''ici juin. Deuxièmement, la création d''un fonds de solidarité destiné aux sinistres d''étal et aux frais de scolarité des enfants d''adhérents. Troisièmement, un partenariat avec le réseau des écoles d''hygiène alimentaire pour former 300 vendeurs à la conservation des produits frais.

Les trois autres décisions portent sur l''harmonisation des numéros de badge officiel, la reprise des assises régionales à partir de mars, et la publication trimestrielle du Bulletin des cours dans une version imprimée diffusée dans les préfectures.'),

('campagne-maraichere-tomate-oignon',
 'Commerce intérieur',
 'Tomate, oignon, piment : la campagne maraîchère rééquilibre les étals du centre',
 'Les arrivages depuis Toumodi et Bouaflé font refluer les prix de la tomate de 12 % en dix jours sur les marchés de gros.',
 'Centre-Bandama',
 'Relevés terrain COCOMCI',
 'images/maraicher.jpg',
 '2026-02-05T08:15:00+00:00',
 'Les étals des marchés de gros retrouvent de la couleur. Les arrivages en provenance de Toumodi, Bouaflé et de la vallée du Bandama ont augmenté de près d''un tiers en dix jours, faisant passer le prix de la tomate de 1 250 à 1 100 FCFA le kilo à Adjamé.

L''oignon sec, importé, reste plus cher à 900 FCFA le kilo, tandis que l''oignon frais local s''échange à 750 FCFA sur le marché de Korhogo. Le piment vert, très demandé par les maquis urbains, se maintient à 1 400 FCFA.

Les responsables régionaux de la COCOMCI recommandent aux vendeurs de réserver les heures d''ouverture du matin aux arrivages frais et de privilégier la vente en cageot pour limiter les pertes, estimées à 18 % du volume transporté sur les axes non revêtus.'),

('recensement-operateurs-marches-communaux',
 'Activités COCOMCI',
 'Recensement des opérateurs : la campagne de badge officiel s''ouvre dans six régions',
 'Les adhérents peuvent faire renouveler leur carte d''opérateur auprès des secrétariats régionaux jusqu''au 31 mars.',
 'Abidjan',
 'Secrétariat Général',
 'images/marche.jpg',
 '2026-02-03T10:00:00+00:00',
 'La campagne annuelle de renouvellement du badge officiel COCOMCI est ouverte. Elle concerne les opérateurs des régions des Lagunes, du Bas-Sassandra, des Savanes, du Moyen-Comoé, de la Nawa et du Worodougou.

Le badge, qui porte un numéro d''agrément unique et un code régional, permet d''attester de l''appartenance à la Coordination lors des contrôles sur les marchés, de bénéficier des cours négociés auprès des fournisseurs partenaires et de participer aux assises régionales.

Les secrétariats régionaux reçoivent les demandes de renouvellement et les nouvelles adhésions. Un formulaire papier est disponible sur les marchés ; les dossiers complets sont traités sous quinze jours. Les opérateurs en règle au 31 décembre conservent leur ancienneté et leur numéro.'),

('parite-xof-euro-cours-devise',
 'Économie & marché',
 'Devise : le franc CFA toujours arrimé à 655,957 FCFA pour un euro',
 'Notre tableau de bord des devises fait le point sur l''euro, le dollar, le naira et le cédi face au franc CFA de la zone UEMOA.',
 'Abidjan',
 'Service des marchés financiers',
 'images/devises.jpg',
 '2026-02-02T12:30:00+00:00',
 'Le franc CFA de la zone UEMOA conserve son arrimage fixe à l''euro, au taux historique de 655,957 FCFA pour un euro. Ce lien de parité, garanti par le Trésor français, constitue la seule valeur fixe de notre tableau de bord des devises.

Les autres paires évoluent librement. Le dollar américain s''échange à 598,20 FCFA en relevé de mi-journée sur le marché de change d''Abidjan, en progression de 0,35 % sur la semaine. La livre sterling s''inscrit à 762,40 FCFA, tandis que le naira nigérian reste sous pression à 0,395 FCFA pour un naira.

Les taux publiés par la COCOMCI sont des cours indicatifs relevés auprès des cambistes et des banques partenaires ; ils ne constituent pas une offre de change. Les opérateurs importateurs sont invités à comparer les marges avant toute conversion.'),

('formation-hygiene-san-pedro',
 'Activités COCOMCI',
 'San-Pédro : 120 vendeurs formés à l''hygiène et à la conservation du poisson',
 'Trois jours de formation pratique pour les opérateurs des étals de poisson et de produits frais du port.',
 'San-Pédro',
 'Section régionale Bas-Sassandra',
 null,
 '2026-01-29T09:45:00+00:00',
 'La section régionale du Bas-Sassandra a accueilli la première session de formation de l''année, consacrée à l''hygiène des étals et à la chaîne du froid. 120 opérateurs, dont 74 femmes, ont suivi les modules pratiques animés par des inspecteurs sanitaires et par la commission technique de la COCOMCI.

Les thèmes abordés ont porté sur la manipulation de la glace, le tri des produits non conformes, l''aménagement des étals et la tenue des registres de température. Un kit de démarrage — glacières isothermes, gants, plateaux inox — a été remis à chaque participant.

La Coordination prévoit de déclencher la même session à Abengourou et à Divo au second trimestre.');

COMMIT;
