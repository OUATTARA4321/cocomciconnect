# Mettre le portail COCOMCI en ligne — depuis Android

Guide pas à pas, entièrement réalisable depuis **Chrome sur téléphone**.
Durée : environ 30 minutes. Coût : gratuit pour démarrer.

Le code se trouve déjà sur GitHub :
**https://github.com/OUATTARA4321/cocomciconnect**

---

## Étape 0 — Révoquer les anciens jetons *(2 min)*

Les jetons transmis pendant la mise au point sont compromis.

1. Chrome → `github.com/settings/tokens`
2. Pour chaque jeton : **Delete** → confirmer

---

## Étape 1 — Créer la base de données *(8 min)*

1. Chrome → **neon.tech** → *Sign up* → **Continue with GitHub**
2. *Create project* :
   - **Name** : `cocomci`
   - **Region** : **Europe (Frankfurt)** — la plus proche d'Abidjan
3. Après création, une **Connection string** s'affiche. Appuyez sur
   **Copy** et conservez-la (notes du téléphone).

Elle ressemble à :

```
postgresql://neondb_owner:xxxx@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

> ⚠️ Gardez bien `?sslmode=require` à la fin.

---

## Étape 2 — Déployer sur Vercel *(10 min)*

1. Chrome → **vercel.com** → *Sign up* → **Continue with GitHub**
2. **Add New…** → **Project**
3. Dans la liste, trouvez **`cocomciconnect`** → **Import**
   *(si le dépôt n'apparaît pas : « Adjust GitHub App Permissions » → autoriser)*
4. Ne modifiez **aucun** réglage de compilation.
5. Dépliez **Environment Variables** et ajoutez ces trois lignes :

| Name | Value |
|---|---|
| `DATABASE_URL` | la chaîne copiée chez Neon |
| `ADMIN_PASSWORD` | une phrase longue, à vous |
| `SITE_URL` | l'adresse Vercel *(à compléter après le 1er déploiement)* |

6. **Deploy**, puis patientez 2 à 3 minutes.

Vercel affiche alors une adresse définitive, par exemple
`cocomciconnect.vercel.app`.

> À ce stade, le site s'affiche mais **les pages de données sont en erreur** :
> la base est vide. C'est normal, voir l'étape 3.

---

## Étape 3 — Créer les tables *(5 min)*

Neon propose un éditeur SQL dans le navigateur — aucun outil à installer.

1. Sur **neon.tech**, projet `cocomci` → onglet **SQL Editor**
2. Ouvrez le fichier
   [`src/db/schema-production.sql`](./src/db/schema-production.sql)
   depuis GitHub, copiez tout son contenu
3. Collez dans l'éditeur Neon → **Run**

Les tables sont créées.

---

## Étape 4 — Charger les données *(5 min)*

Toujours dans le **SQL Editor** de Neon, copiez-collez puis exécutez
les fichiers suivants **dans cet ordre** :

1. `src/db/seed.sql` — membres, produits, devises
2. `src/db/seed-news.sql` — dépêches
3. `src/db/seed-officers.sql` — coordinateurs et secrétaires généraux
4. `src/db/seed-sectors.sql` — filières et mercuriales
5. `src/db/seed-activities.sql` — reportage photographique
6. `src/db/seed-partners.sql` — partenaires
7. `src/db/seed-photos.sql` — portraits

> Ces données sont **fictives**, à remplacer progressivement par les
> informations authentiques via l'espace d'administration.

---

## Étape 5 — Vérifier *(2 min)*

Ouvrez votre adresse Vercel. Contrôlez :

- [ ] la page d'accueil affiche la mercuriale
- [ ] `/membres` affiche les badges
- [ ] `/cotations` affiche les 28 produits
- [ ] `/api/health` répond `{"ok":true}`
- [ ] `/administration` demande un mot de passe

Puis retournez dans Vercel → *Settings* → *Environment Variables* →
corrigez `SITE_URL` avec votre adresse réelle → *Redeploy*.

---

## Étape 6 — Nom de domaine *(optionnel)*

1. Déposez `cocomci.ci` auprès du **NIC.CI** (~25 000 FCFA/an)
2. Vercel → *Settings* → *Domains* → **Add** → `cocomci.ci`
3. Créez chez votre registraire les enregistrements indiqués :

| Type | Nom | Valeur |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Le certificat HTTPS s'installe automatiquement sous 24 h.

---

## Étape 7 — Avant d'annoncer le site

- [ ] Déposer le logo officiel sur `/administration/logo`
- [ ] Déposer les portraits sur `/administration/photos`
- [ ] Remplacer les noms et contacts fictifs
- [ ] Vérifier les cours affichés
- [ ] Passer `PREVIEW_MODE` à `off` dans Vercel *(retire le bandeau orange)*

---

## En cas de difficulté

| Symptôme | Cause probable |
|---|---|
| Erreur 500 sur toutes les pages | `DATABASE_URL` absente ou mal copiée |
| Tableaux vides | Données de seed non chargées (étape 4) |
| `/administration` en 503 | `ADMIN_PASSWORD` non définie |
| Dépôt absent dans Vercel | Autorisations GitHub à ajuster |
