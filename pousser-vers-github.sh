#!/usr/bin/env bash
#
# Envoi du portail COCOMCI vers GitHub.
#
# Prérequis : la variable d'environnement GITHUB_TOKEN doit contenir un
# jeton d'accès personnel GitHub, à portée limitée au dépôt de destination.
# Le jeton n'est jamais écrit sur le disque ni inscrit dans l'historique.
#
set -euo pipefail

PROPRIETAIRE="radiocampusci-sketch"
DEPOT="cocomci-portail"
BRANCHE="main"

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "✗ GITHUB_TOKEN absent."
  echo "  Ajoutez le jeton dans les variables d'environnement de la plateforme."
  exit 1
fi

echo "→ Vérification du dépôt distant…"
code=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/${PROPRIETAIRE}/${DEPOT}")

case "$code" in
  200) echo "  ✓ dépôt trouvé" ;;
  404) echo "  ✗ dépôt introuvable ou jeton sans accès à ${PROPRIETAIRE}/${DEPOT}"; exit 1 ;;
  401) echo "  ✗ jeton invalide ou expiré"; exit 1 ;;
  *)   echo "  ✗ réponse inattendue de GitHub : $code"; exit 1 ;;
esac

# Garde-fou : aucun fichier de secret ne doit partir.
if git ls-files --error-unmatch .env >/dev/null 2>&1; then
  echo "✗ Le fichier .env est suivi par git. Envoi interrompu."
  exit 1
fi
echo "  ✓ aucun secret dans les fichiers suivis"

echo "→ Envoi de $(git ls-files | wc -l) fichiers…"
git push --force "https://x-access-token:${GITHUB_TOKEN}@github.com/${PROPRIETAIRE}/${DEPOT}.git" \
  "HEAD:${BRANCHE}" 2>&1 | sed "s/${GITHUB_TOKEN}/•••/g"

echo
echo "✓ Terminé — https://github.com/${PROPRIETAIRE}/${DEPOT}"
