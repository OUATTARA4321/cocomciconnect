# COCOMCI — Portail officiel

Plateforme de la **Coordination des Opérateurs de Commerce de Côte d'Ivoire** :
mercuriale des marchés, annuaire des opérateurs badgés, filières
professionnelles, actualités du commerce intérieur et cours des devises.

---

## Ce que contient le portail

| Rubrique | Adresse | Contenu |
|---|---|---|
| Accueil | `/` | Mercuriale du jour, filières, éditorial, activités, partenaires, contact |
| Cours & devises | `/cotations` | 28 produits sur 8 marchés, convertisseur FCFA |
| Filières | `/filieres` | 8 métiers, bureaux et mercuriales propres |
| Membres & badges | `/membres` | Annuaire, trombinoscope, réseau territorial, contacts |
| Actualités | `/actualites` | Dépêches et reportage photographique |
| Administration | `/administration` | Logo, portraits, bibliothèque d'images *(protégé)* |

---

## Pile technique

- **Next.js 16** (App Router, React 19, composants serveur)
- **PostgreSQL** via **Drizzle ORM**
- **Tailwind CSS 4**
- **sharp** pour le traitement d'images, **mupdf** pour la conversion PDF

---

## Installation locale

```bash
npm install
cp .env.example .env     # puis renseignez vos valeurs
npx drizzle-kit push     # crée les tables
npm run dev
```

### Charger les données de démonstration

```bash
for f in seed seed-news seed-officers seed-sectors seed-activities seed-partners seed-photos; do
  psql "$DATABASE_URL" -f "src/db/$f.sql"
done
```

---

## Variables d'environnement

| Variable | Rôle | Obligatoire |
|---|---|---|
| `DATABASE_URL` | Connexion PostgreSQL | **oui** |
| `ADMIN_PASSWORD` | Protège `/administration/*` | **oui en production** |
| `SITE_URL` | Adresse publique, pour les aperçus de partage | recommandée |
| `PREVIEW_MODE` | `off` masque le bandeau « Version préliminaire » | non |

> Sans `ADMIN_PASSWORD`, l'espace d'administration reste ouvert et un
> bandeau rouge le signale. **À définir impérativement avant la mise en ligne.**

---

## Mise en production

Voir **[DEPLOIEMENT.md](./DEPLOIEMENT.md)** : base Neon, hébergement Vercel,
nom de domaine `.ci` et liste de contrôle avant publication.

---

## Avant d'ouvrir le site au public

Les contenus actuels sont **vraisemblables mais fictifs**, à l'exception du
Président et des partenaires confirmés. À remplacer :

- [ ] Composition complète du Bureau Exécutif National
- [ ] Numéros d'agrément authentiques
- [ ] Téléphones et WhatsApp réels des responsables
- [ ] Photographies officielles *(avec autorisation écrite)*
- [ ] Relevés de prix authentiques et leur source
- [ ] Liste définitive des partenaires

---

© 2026 COCOMCI — Abidjan, Côte d'Ivoire
