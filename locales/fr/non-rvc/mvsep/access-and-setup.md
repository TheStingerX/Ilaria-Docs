---
label: "Accès, compte et API"
icon: ":globe_with_meridians:"
order: 98
permalink: /non-rvc/mvsep/access-and-setup/
description: "MVSep fonctionnant dans le cloud, il n'y a rien à installer."
---
# Utiliser MVSep : accès, compte et configuration

MVSep fonctionnant dans le cloud, il n'y a **rien à installer**. Cependant, bien configurer votre compte et le format de sortie fait une grande différence en qualité et en confort.

## 1. Créer un compte gratuit (Recommandé)

1. Rendez-vous sur [mvsep.com](https://mvsep.com/) et créez un compte gratuit.
2. **Pourquoi s'inscrire ?**
   - **Audio sans perte** : sans compte, vous n'obtenez que du **MP3** compressé. Avec un compte gratuit, vous débloquez le **WAV 16-bit** et le **FLAC 16-bit**.
   - **Pas de CAPTCHA** et **file d'attente plus rapide**.
   - **Modèles Polar et BS-Roformer 124 bandes** accessibles gratuitement (les variantes BS permettent jusqu'à 5 séparations/jour par modèle).

## 2. Réglages utiles sur MVSep

- **Format de sortie** : choisissez toujours **WAV** (ou **FLAC**) avant de lancer une séparation si vous entraînez un modèle RVC ou enchaînez plusieurs étapes de nettoyage.
- **Post-traitement / enchaînement** : connectez-vous, allez dans **Advanced settings → Home Screen** et activez **« Show post-processing algorithm »** pour appliquer un modèle de nettoyage juste après la séparation.
- **Envoi ou téléchargement lent ?** MVSep propose des miroirs régionaux - basculez sur l'option miroir si le site principal est lent.

## 3. Crédits prépayés et API complète (Optionnel)

Si vous traitez de longs fichiers (jusqu'à 100 minutes / 1 Go), voulez du **WAV 32-bit float / FLAC 24-bit** ou voulez éviter les files d'attente aux heures de pointe :
- Les modèles standard coûtent **1 crédit par minute** d'audio ; les ensembles lourds utilisent des multiplicateurs (`2×`–`6×`).
- **Accès API** : les utilisateurs connectés peuvent générer un jeton API depuis leur compte pour automatiser des lots en Python via `https://mvsep.com/api`.

## Tarifs des packs

MVSEP propose jusqu’à 50 séparations gratuites par jour sans carte. Premium utilise des crédits prépayés.

| Prix (USD) | Crédits | Titres estimés (4 min) | USD par minute |
| ---: | ---: | ---: | ---: |
| 3 | 60 | ≈ 15 | 0,05 |
| 5 | 200 | ≈ 50 | 0,025 |
| 10 | 600 | ≈ 150 | 0,0167 |
| 30 | 2 000 | ≈ 500 | 0,015 |
| 50 | 4 000 | ≈ 1 000 | 0,0125 |
| 100 | 8 500 | ≈ 2 125 | 0,0118 |
| 200 | 18 000 | ≈ 4 500 | 0,0111 |
| 500 | 50 000 | ≈ 12 500 | 0,01 |
| 1 000 | 110 000 | ≈ 27 500 | 0,0091 |

Les estimations supposent une séparation par titre avec un modèle standard à 1 crédit par minute. Un titre de 4 minutes coûte 4 crédits. Un modèle Ensemble à 2× coûte 8 crédits pour le même titre et un pack de 60 couvre environ 7 titres complets au lieu de 15. Des options ou passages supplémentaires peuvent augmenter le coût.

[Offres MVSEP](https://sg.mvsep.com/en/plans) · [Calcul des crédits](https://mvsep.com/en/credits)
