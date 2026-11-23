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

[Installer Vonovox](vonovox/installation.md) · [Configurer Vonovox](vonovox/live-audio.md) · [Installer Okada TG Developed Fork](tgr/installation.md) · [Configurer TGR](tgr/live-audio.md)

## Autres tâches avec Applio ou Redpanda-vc

Choisissez Applio pour la synthèse vocale et la gestion des modèles. Redpanda VC propose entraînement, inférence sur fichier et conversion en temps réel pour RVC et Casual Voice Changer, sur le bureau et dans la WebUI. Utilisez `.pth` avec RVC et `.cvc` avec CVC.

[Installer Applio](applio/installation.md) · [Synthèse vocale Applio](applio/tts.md) · [Modèles Applio](applio/models.md) · [Configurer Redpanda-vc](redpanda/first-run.md) · [Direct dans Redpanda-vc](redpanda/live-audio.md)

## Établir un résultat de référence

Comparez les fichiers avec la même source et au même volume. Pour le direct, enregistrez un essai dans l’application de destination. Si le problème apparaît seulement dans cette application, vérifiez le câble virtuel, le micro sélectionné et l’écoute.

## Autres applications et compatibilité

{{ include "../reference/tools.md#app-comparison" }}

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Comparer les applications](../reference/tools.md)
