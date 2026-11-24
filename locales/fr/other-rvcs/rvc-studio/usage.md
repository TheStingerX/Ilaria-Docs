---
label: "Utilisation et dépannage"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Utilisation et dépannage

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Logiciels anciens · Déconseillés
La branche principale de **RVC Studio** est inactive depuis des années. Ce logiciel est ancien et déconseillé pour une nouvelle installation. [Guides par application](../app-guides.md)
!!!

## Première reprise

Démarrez le backend sous **RVC Server**. Dans **Inference**, cliquez sur **Refresh Data** après l’ajout des fichiers. Choisissez un extrait WAV, FLAC, OGG ou MP3 dans `songs/`. Placez le checkpoint RVC v2 dans `models/RVC/` et son index éventuel dans `models/RVC/.index/`. Choisissez la voix et un modèle de séparation vocale. Le prétraitement supplémentaire est facultatif. Cliquez sur **Save Options**, puis **1-Click VC**. Si la voix manque, vérifiez le dossier et actualisez la liste.

## Entraîner une voix

Dans **Train**, sélectionnez un dossier de données et nommez l’expérience. Prétraitez les fichiers, extrayez les caractéristiques et lancez l’entraînement. Vérifiez les préentraînements du générateur et du discriminateur. Générez l’index séparément au besoin. Si une étape est désactivée, vérifiez les fichiers produits par l’étape précédente. Comparez les checkpoints avec le même extrait.

## TTS et conversion en direct

Dans **Text to Speech**, choisissez le moteur et la voix RVC. Écoutez une phrase courte, cliquez sur **Convert Speech** et enregistrez le résultat. Le code inclut aussi **Realtime Conversion**. Choisissez les périphériques d’entrée et de sortie de l’ordinateur qui exécute l’application. Testez avec un casque avant une session en direct.

[← Configuration](installation.md)
