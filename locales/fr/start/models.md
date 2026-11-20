---
label: "📦 Modèles et fichiers RVC"
order: 93
permalink: /models/
description: "Un modèle RVC transforme le timbre d’une voix existante. Les mots, le rythme et les pauses viennent de l’enregistrement d’origine. Pour commencer..."
---
# Modèles et fichiers RVC

Un modèle RVC transforme le timbre d’une voix existante. Les mots, le rythme et les pauses viennent de l’enregistrement d’origine. Pour commencer, choisissez une seule voix, sans musique ni effets.

## Comprendre les fichiers

| Fichier | Utilisation |
| --- | --- |
| `.pth` d’inférence | Poids du modèle à sélectionner dans le convertisseur. |
| `.index` associé | Index de recherche facultatif. La conversion fonctionne sans lui. |
| `.zip` | Archive à importer si l’application le permet, ou à extraire. |
| `G_*.pth` et `D_*.pth` | Points de sauvegarde qui peuvent servir à reprendre l’entraînement. Choisissez l’export d’inférence pour convertir. |

## Quel index choisir ?

Dans RVC WebUI (Mainline - Original RVC), `trained_*.index` est l’index FAISS entraîné avant l’ajout des vecteurs. `added_*.index` contient les vecteurs consultables. Si les deux existent, utilisez le fichier `added_*.index` associé. Si seul `trained_*.index` est disponible, désactivez la recherche ou générez l’index complet. Les noms varient selon l’application.

Un fichier `.index` fourni avec le modèle exporté contient très probablement déjà les vecteurs, même sans le préfixe `added_`. Le nom seul ne le garantit pas.

## À quoi servent les dossiers d’entraînement ?

Ces dossiers se trouvent généralement dans `logs/<expérience>/`. Pour la conversion, préparez le `.pth` exporté et, si vous le souhaitez, l’index associé contenant les vecteurs.

| Dossier | Contenu |
| --- | --- |
| `0_gt_wavs` | Segments prétraités à la fréquence d’échantillonnage de l’expérience. |
| `1_16k_wavs` | Copies des segments à 16 kHz pour l’extraction des caractéristiques. |
| `2a_f0` | Hauteur fondamentale sous forme de valeurs discrètes. |
| `2b-f0nsf` | Fréquence fondamentale continue en hertz. |
| `3_feature768` | Vecteurs de 768 dimensions pour RVC v2, utilisés pour l’entraînement et l’index. |
| `eval` | Sorties d’évaluation, par exemple les événements TensorBoard selon le logiciel. |

## Choisir une voix

Écoutez des démonstrations proches de votre usage. Pour la parole, vérifiez les consonnes et les passages calmes. Pour le chant, écoutez les notes tenues et les extrêmes de la tessiture visée. Vérifiez le moteur compatible, la version et les conditions d’utilisation. Testez séparément chaque langue dont vous avez besoin.

## Importer et organiser

Téléchargez le modèle auprès d’une source de confiance. Gardez chaque version dans un dossier avec son index éventuel et sa documentation. Dans Ilaria RVC, ouvrez **Other → Import Local Models**, puis importez le `.pth` d’inférence ou un ZIP compatible. Ajoutez uniquement l’index associé.

## Faire un essai

1. Enregistrez dix secondes de voix claire et sans musique.
2. Convertissez à zéro demi-ton et sans recherche dans l’index. Gardez ce WAV comme référence.
3. Ajustez progressivement la hauteur si le registre sonne forcé, puis essayez une faible valeur de recherche avec l’index associé.
4. Réécoutez le même extrait au même volume. Contrôlez les consonnes et les respirations.

## Résoudre les problèmes

Si le chargement échoue, vérifiez le moteur et le type de checkpoint. Si le timbre source reste audible, comparez avec un autre modèle. Un modèle ou son encodeur, notamment certaines variantes de HuBERT, peut conserver trop de timbre source. Si les respirations restent métalliques sur plusieurs entrées propres, le modèle peut nécessiter un nouvel entraînement. Si les coupures surviennent seulement en direct, vérifiez le routage et le tampon audio.

## Conserver une référence

Notez la version du modèle et du logiciel, la transposition et la valeur de recherche. Gardez une courte prise de référence pour comparer le résultat après une mise à jour.

## Poursuivre avec les guides

- [Guides par application](../other-rvcs/app-guides.md)
- [Bibliothèque de modèles Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inférence](../ilaria-rvc/convert/inference.md)
- [Préparer les données](../model-training/dataset-preparation.md)
- [Dépannage](../reference/troubleshooting.md)
