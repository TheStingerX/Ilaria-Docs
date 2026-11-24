---
label: "Utilisation et dépannage"
icon: ":microphone:"
order: 98
permalink: /ilaria-rvc/mangio/usage/
---

# Mangio RVC Fork · Utilisation et dépannage

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Version consultée](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Logiciels anciens · Déconseillés
La branche principale de **Mangio RVC Fork** est inactive depuis des années. Ce logiciel est ancien et déconseillé pour une nouvelle installation. [Guides par application](../../app-guides.md)
!!!

## Première conversion

Placez le checkpoint d’inférence dans `weights` et actualisez la liste. Sélectionnez-le dans Model Inference et saisissez le chemin d’un court enregistrement de voix seule. Commencez avec une transposition de 0. Si vous avez l’index assorti, comparez un taux de récupération faible à un essai à 0. Gardez le même fichier et checkpoint.

## Extraction de hauteur et mode hybride

Commencez avec RMVPE si disponible. Comparez `mangio-crepe` et `mangio-crepe-tiny` sur le même extrait. Le pas s’applique à ces variantes en inférence. Un pas réduit augmente la fréquence d’analyse et peut ralentir le traitement. Dans la CLI du tag, la syntaxe hybride utilise le signe plus, par exemple `hybrid[pm+crepe]`, et combine les estimations par médiane. Comparez avec un seul extracteur. Les options CREPE ou hybrides à l’entraînement sont décrites comme expérimentales.

[Installation](installation.md)
