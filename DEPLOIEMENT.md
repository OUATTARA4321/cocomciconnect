# Mettre la plateforme COCOMCI en ligne

Ce guide décrit la mise en production du portail : hébergement, base de
données, nom de domaine et sécurité. Comptez **une demi-journée** pour la
première mise en ligne, hors délai d'obtention du domaine `.ci`.

---

## 1. Ce dont vous avez besoin

| Élément | Fournisseur conseillé | Coût indicatif |
|---|---|---|
| Hébergement | **Vercel** (créateur de Next.js) | Gratuit, puis ~20 $/mois |
| Base de données | **Neon** ou **Supabase** | Gratuit, puis ~19 $/mois |
| Nom de domaine | **NIC.CI** pour un `.ci` | ~25 000 FCFA/an |

Un hébergeur ivoirien est possible, mais il doit savoir exécuter **Node.js 20+**
— un hébergement mutualisé PHP ne convient pas.

---

## 2. Créer la base de données

1. Ouvrez un compte sur [neon.tech](https://neon.tech) et créez un projet
   nommé `cocomci`.
2. Choisissez la région **Europe (Francfort)** : c'est la plus proche
   d'Abidjan parmi les offres courantes.
3. Copiez la chaîne de connexion fournie. Elle ressemble à :

   ```
   postgresql://user:motdepasse@ep-xxx.eu-central-1.aws.neon.tech/cocomci?sslmode=require
   ```

   Conservez bien le `?sslmode=require` à la fin.

---

## 3. Déposer le code

Créez un dépôt **GitHub** privé et poussez-y le projet :

```bash
git init
git add .
git commit -m "Portail COCOMCI"
git remote add origin https://github.com/VOTRE-COMPTE/cocomci.git
git push -u origin main
```

Le fichier `.env` n'est jamais versionné : les secrets se configurent
chez l'hébergeur.

---

## 4. Déployer sur Vercel

1. Sur [vercel.com](https://vercel.com), choisissez **Add New → Project** et
   sélectionnez le dépôt.
2. Vercel détecte Next.js automatiquement. Ne modifiez pas les réglages de
   compilation.
3. Dans **Environment Variables**, ajoutez les trois variables :

   | Nom | Valeur |
   |---|---|
   | `DATABASE_URL` | la chaîne de connexion de l'étape 2 |
   | `ADMIN_PASSWORD` | une phrase longue et unique |
   | `SITE_URL` | `https://cocomci.ci` |
   | `PREVIEW_MODE` | `off` — une fois les données réelles en place |

4. Cliquez **Deploy**.

> **`ADMIN_PASSWORD` est obligatoire.** Sans cette variable, l'espace
> d'administration se désactive de lui-même en production et répond `503`.

---

## 5. Créer les tables et charger les données

Depuis votre ordinateur, en pointant vers la base de production :

```bash
export DATABASE_URL="postgresql://…votre URL Neon…"

npx drizzle-kit push                      # crée les tables

psql "$DATABASE_URL" -f src/db/seed.sql
psql "$DATABASE_URL" -f src/db/seed-news.sql
psql "$DATABASE_URL" -f src/db/seed-officers.sql
psql "$DATABASE_URL" -f src/db/seed-sectors.sql
psql "$DATABASE_URL" -f src/db/seed-activities.sql
psql "$DATABASE_URL" -f src/db/seed-photos.sql
```

Ces fichiers contiennent les **données de démonstration**. Remplacez-les par
vos données réelles avant la mise en ligne publique (voir § 8).

---

## 6. Brancher le nom de domaine

1. Déposez `cocomci.ci` auprès du [NIC.CI](https://nic.ci) ou d'un
   registraire agréé.
2. Dans Vercel : **Settings → Domains → Add**, saisissez `cocomci.ci`.
3. Vercel affiche les enregistrements DNS à créer chez votre registraire :

   | Type | Nom | Valeur |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

4. La propagation prend de 1 à 24 heures. Le certificat HTTPS est installé
   automatiquement.

---

## 7. Après la mise en ligne

- Déposez le logo officiel sur `https://cocomci.ci/administration/logo`
  (le navigateur demandera le mot de passe).
- Vérifiez `https://cocomci.ci/api/health` : la réponse doit être `{"ok":true}`.
- Testez l'affichage sur téléphone : la majorité de vos visiteurs consulteront
  le portail depuis un mobile.

---

## 8. Avant d'annoncer le site — à remplacer

Les contenus actuels sont **vraisemblables mais fictifs**. À substituer :

- [ ] Composition réelle du Bureau Exécutif National
- [ ] Numéros d'agrément authentiques des badges
- [ ] Téléphones et WhatsApp réels des coordinateurs et secrétaires généraux
- [ ] Photographies officielles des responsables
- [ ] Relevés de prix authentiques et leur source
- [ ] Logo officiel au format PDF ou SVG
- [ ] Coordonnées du siège (adresse, téléphone, courriel)

> **Point juridique** : les photographies de personnes exigent leur
> autorisation écrite. Les cours publiés doivent porter une mention de
> responsabilité — elle figure déjà en pied des tableaux.

---

## 9. Faire vivre la plateforme

Les cours des marchés sont actuellement figés en base. Trois possibilités
pour les actualiser :

1. **Écran de saisie** — une page d'administration où les responsables
   régionaux entrent les relevés du matin. *(à développer)*
2. **Import de fichier** — dépôt hebdomadaire d'un tableur. *(à développer)*
3. **Mise à jour manuelle** en base, via `psql`.

Pour les devises, une connexion à une source automatique est envisageable ;
la parité fixe euro/franc CFA, elle, ne change pas.

---

## Dépannage

| Symptôme | Cause probable |
|---|---|
| Page blanche, erreur 500 | `DATABASE_URL` absente ou incorrecte |
| Administration en `503` | `ADMIN_PASSWORD` non configurée |
| Tableaux vides | Données de seed non chargées (§ 5) |
| Logo absent | Aucun fichier déposé : la marque dessinée prend le relais |
