---
label: "Guides par application"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Ilaria RVC est le premier choix pour entraîner un modèle et convertir des fichiers."
---
# Guides étape par étape par application

<div role="group" aria-label="Que voulez-vous faire ?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">Que voulez-vous faire ?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Entraînement ou conversion de fichiers</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Microphone en direct</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Autres usages</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Choisir selon l’objectif et le GPU

**Ilaria RVC** est le premier choix pour entraîner un modèle et convertir des fichiers. Pour le microphone en direct sous Windows, utilisez **Vonovox** sur NVIDIA ou **Okada TG Developed Fork** sur AMD ou Intel compatible. Pour les autres usages, commencez par **Applio** ou **Redpanda-vc**.

[Installer Ilaria RVC](../ilaria-rvc/install/installation.md) · [GPU compatibles](../ilaria-rvc/install/gpu-compatibility.md) · [Utiliser Kaggle](../ilaria-rvc/cloud/kaggle.md)

## Entraîner un modèle avec Ilaria RVC

Préparez des prises propres d’une seule voix. Prétraitez les fichiers, extrayez les caractéristiques puis lancez l’entraînement. Comparez plusieurs points de sauvegarde sur des phrases réservées au test. Conservez l’index facultatif avec le modèle correspondant.

[Préparer les données](../ilaria-rvc/train/datasets.md) · [Procédure d’entraînement](../ilaria-rvc/train/training-workflow.md) · [Réglages d’entraînement](../ilaria-rvc/train/training-controls.md)

## Convertir des fichiers avec Ilaria RVC

Importez un `.pth` d’inférence et, si vous l’avez, son `.index`. Testez un WAV court sans effet. Conservez le résultat de référence, ajustez un seul réglage à la fois et vérifiez plusieurs extraits avant de convertir par lots. Kaggle permet d’entraîner ou de convertir sans GPU local adapté.

[Inférence simple et par lots](../ilaria-rvc/convert/inference.md) · [Réglages d’inférence](../ilaria-rvc/convert/inference-buttons.md)

## Convertir le microphone en direct

Avec NVIDIA, choisissez le paquet Vonovox adapté. Avec AMD ou Intel, commencez par la version DirectML de TGR si elle prend en charge votre carte. Écoutez le résultat au casque, puis envoyez-le vers un câble virtuel et sélectionnez l’entrée d’enregistrement du câble dans Discord, OBS ou votre jeu. Si le son coupe, augmentez la taille du tampon.

[Installer Vonovox](voice-changers/vonovox/installation.md) · [Configurer Vonovox](voice-changers/vonovox/live-audio.md) · [Installer Okada TG Developed Fork](voice-changers/tgr/installation.md) · [Configurer TGR](voice-changers/tgr/live-audio.md)

## Autres tâches avec Applio ou Redpanda-vc

Choisissez Applio pour la synthèse vocale et la gestion des modèles. Redpanda VC propose entraînement, inférence sur fichier et conversion en temps réel pour RVC et Causal Voice Changer, sur le bureau et dans la WebUI. Utilisez `.pth` avec RVC et `.cvc` avec CVC.

[Installer Applio](training/applio/installation.md) · [Synthèse vocale Applio](training/applio/tts.md) · [Modèles Applio](training/applio/models.md) · [Configurer Redpanda-vc](training/redpanda/first-run.md) · [Direct dans Redpanda-vc](training/redpanda/live-audio.md)

## Établir un résultat de référence

Comparez les fichiers avec la même source et au même volume. Pour le direct, enregistrez un essai dans l’application de destination. Si le problème apparaît seulement dans cette application, vérifiez le câble virtuel, le micro sélectionné et l’écoute.

## Entraînement et inférence

| Application | Fonctionnalités | Matériel / notes | Guides |
| --- | --- | --- | --- |
| **Ilaria RVC** | Entraînement, inférence simple/par lots, synthèse vocale, analyseur audio | NVIDIA CUDA (Windows) / Kaggle | [Installation](../ilaria-rvc/install/installation.md) · [Inférence](../ilaria-rvc/convert/inference.md) · [Entraînement](../ilaria-rvc/train/training-workflow.md) |
| **Applio** | Entraînement, inférence de fichiers, TTS, bibliothèque de modèles, temps réel | NVIDIA CUDA, AMD ROCm, Apple MPS | [Installation](training/applio/installation.md) · [Inférence](training/applio/inference.md) · [Entraînement](training/applio/training.md) |
| **RVC WebUI (Mainline - Original RVC)** | Entraînement et inférence de fichiers d’origine (+ lanceur temps réel séparé) | NVIDIA CUDA, CPU / DirectML | [Installation](training/mainline/installation.md) · [Inférence](training/mainline/inference.md) · [Entraînement](training/mainline/training.md) |
| **Redpanda-vc** | Entraînement, inférence sur fichiers et temps réel pour RVC + Causal Voice Changer | NVIDIA CUDA / CPU (Desktop et WebUI) | [Premier lancement](training/redpanda/first-run.md) · [Inférence](training/redpanda/inference.md) · [Entraînement](training/redpanda/training.md) |
| **RVC Model Merger** | Utilitaire de fusion pour modèles RVC `.pth` | Utilitaire hors ligne | [Utilisation](rvc-model-merger/usage.md) |

### Anciennes applications / Déconseillées

!!!warning Logiciels anciens · Déconseillés
Ces projets sont anciens, archivés ou ne sont plus maintenus activement. Les guides restent disponibles pour les projets existants. Pour une nouvelle installation, choisissez une application maintenue ci-dessus.
!!!

| Application | Fonctionnalités | Statut / notes | Guides |
| --- | --- | --- | --- |
| **rvc-cli** | Inférence sur fichier/lots et entraînement (CLI) | Archivé | [Installation](training/rvc-cli/installation.md) · [Utilisation](training/rvc-cli/usage.md) |
| **RVC Studio** | Entraînement et inférence de fichiers (WebUI) | Inactif | [Installation](training/rvc-studio/installation.md) · [Utilisation](training/rvc-studio/usage.md) |
| **Mangio RVC Fork** | Entraînement et inférence de fichiers | Inactif | [Installation](training/mangio/installation.md) · [Utilisation](training/mangio/usage.md) |
| **Replay** | Entraînement et conversion de fichiers | Arrêté (Weights.gg fermé) | [Installation](training/replay/installation.md) · [Utilisation](training/replay/usage.md) |
| **AICoverGen** | Pipeline RVC v2 pour reprises musicales (inférence uniquement, WebUI / CLI / Colab) | Non maintenu | [Installation](training/aicovergen/installation.md) · [Utilisation](training/aicovergen/usage.md) |
| **RVC GUI** | Conversion de fichiers sur bureau uniquement | Archivé | [Conversion de fichiers](voice-changers/rvc-gui/file-conversion.md) |

## Changeurs de voix (temps réel)

| Application | Moteur / usage | Matériel / notes | Guides |
| --- | --- | --- | --- |
| **Vonovox** | RVC v2 temps réel (recommandé sur Windows NVIDIA) | NVIDIA CUDA | [Installation](voice-changers/vonovox/installation.md) · [Audio en direct](voice-changers/vonovox/live-audio.md) · [Performances](voice-changers/vonovox/advanced-performance-optimization.md) |
| **w-okada VCClient** | RVC temps réel multiplateforme (client/serveur) | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installation](voice-changers/okada/installation.md) · [Audio en direct](voice-changers/okada/live-audio.md) |
| **Okada TG Developed Fork (TGR)** | Fork communautaire actif pour RVC en temps réel | NVIDIA CUDA, DirectML (AMD/Intel), CPU, Linux, macOS exp. | [Installation](voice-changers/tgr/installation.md) · [Audio en direct](voice-changers/tgr/live-audio.md) · [Cloud](voice-changers/tgr/cloud.md) |
| **Deiteris w-okada Fork** | Fork w-okada en temps réel | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installation](voice-changers/deiteris/installation.md) · [Audio en direct](voice-changers/deiteris/live-audio.md) · [Cloud](voice-changers/deiteris/cloud.md) |
| **RVC Blue** | Application desktop Windows temps réel et fichiers en temps réel | NVIDIA CUDA 12.8 / 11.8 | [Installation](voice-changers/rvc-blue/installation.md) |

Applications RVC multimodes avec modes en direct intégrés : **Applio** ([Temps réel](training/applio/realtime.md)), **Redpanda-vc** ([Modes en direct](training/redpanda/live-audio.md)) et **RVC WebUI (Mainline)** ([Temps réel](training/mainline/realtime.md)).

### Changeurs de voix Non-RVC en temps réel

| Application | Fonctionnalités | Guides |
| --- | --- | --- |
| **Causal Voice Changer** | Changeur de voix Non-RVC temps réel à faible latence (modèles `.cvc`) | [Présentation](../non-rvc/voice-changers/causal-voice-changer/overview.md) · [Installation](../non-rvc/voice-changers/causal-voice-changer/installation.md) · [Temps réel](../non-rvc/voice-changers/causal-voice-changer/realtime.md) |
| **YuneVoix** | Changeur de voix Non-RVC temps réel, reprises et karaoké | [Présentation](../non-rvc/voice-changers/yunevoix/overview.md) · [Installation](../non-rvc/voice-changers/yunevoix/installation.md) · [Utilisation](../non-rvc/voice-changers/yunevoix/usage.md) |

[Comparer les applications](../reference/tools.md)
