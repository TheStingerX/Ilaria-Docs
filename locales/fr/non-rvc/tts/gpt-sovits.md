---
label: "GPT-SoVITS"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/tts/gpt-sovits/
---

# GPT-SoVITS

## Choisir un parcours

Commencez par la synthèse zero-shot avec un enregistrement, sa transcription et une phrase à lire. L’entraînement d’adaptation utilise des extraits annotés et produit deux fichiers de poids, GPT et SoVITS. Utilisez des voix autorisées et choisissez des poids de la même famille.

## Installer et ouvrir la WebUI

Sous Windows, téléchargez le paquet intégré indiqué par le dépôt officiel, extrayez-le entièrement et lancez `go-webui.bat` s’il est fourni. Ouvrez l’adresse locale de la console en laissant le processus tourner. Pour le code source, créez un environnement Conda Python 3.10 et utilisez l’installeur de votre version. Windows documente CUDA ou CPU, Linux également ROCm et macOS MPS ou CPU. Conservez les sous-dossiers de `GPT_SoVITS/pretrained_models` et vérifiez FFmpeg si nécessaire.

## Générer une première phrase

1. Ouvrez **1C-inference**, actualisez les chemins des modèles au besoin, puis ouvrez l’interface TTS.
2. Choisissez des poids GPT et SoVITS compatibles. Prenez un extrait court avec une seule voix et sans musique. L’ancienne interface demandait 3 à 10 secondes. Suivez l’intervalle affiché par votre version.
3. Saisissez la transcription exacte et sa langue. Renseignez le texte à synthétiser et sa langue dans les champs distincts.
4. Générez une phrase courte et écoutez ses extrémités et ses pauses. Découpez les textes longs et modifiez un seul réglage à la fois.

## Préparer les données

1. Conservez les originaux et des phrases de test à part. Avec **Audio Slicer**, testez quelques extraits avant de traiter le corpus entier.
2. Dans l’outil ASR, choisissez les extraits découpés et un moteur adapté à leur langue. Ouvrez le `.list` généré dans l’outil d’annotation et corrigez les transcriptions.
3. Vérifiez les chemins des fichiers et enregistrez vos corrections avant le formatage.

~~~text
audio/clip01.wav|speaker01|en|This is the first recording.
~~~

## Formater et entraîner

1. Dans **1A-Dataset formatting**, choisissez la famille, un nom d’expérience et le `.list` relu. Examinez le journal et confirmez que les fichiers attendus ont été produits.
2. Dans **1B-Fine-tuned training**, utilisez la même expérience pour SoVITS et GPT. Sur un seul GPU, exécutez les étapes en série. Gardez d’abord les réglages par défaut et laissez DPO désactivé.
3. Actualisez les modèles et comparez les résultats sur des phrases de test. Conservez ensemble le GPT `.ckpt`, le SoVITS `.pth`, la version et les annotations.

## Dépannage

Si la page ne s’ouvre pas, vérifiez la console. Si les poids manquent, contrôlez leur dossier et leur famille. Si des mots se répètent, vérifiez la transcription et segmentez le texte. Si la VRAM est épuisée, réduisez le lot et lancez les étapes séparément.

[GitHub · RVC-Boss](https://github.com/RVC-Boss/GPT-SoVITS)
