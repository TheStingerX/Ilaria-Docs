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

Applio regroupe la synthèse vocale et la gestion des modèles. Redpanda-vc permet de comparer RVC, Beatrice et Rectified Flow et de tester le direct sur ordinateur ou dans le navigateur. Pour un modèle RVC, choisissez le moteur RVC.

[Installer Applio](applio/installation.md) · [Synthèse vocale Applio](applio/tts.md) · [Modèles Applio](applio/models.md) · [Configurer Redpanda-vc](redpanda/first-run.md) · [Direct dans Redpanda-vc](redpanda/live-audio.md)

## Établir un résultat de référence

Comparez les fichiers avec la même source et au même volume. Pour le direct, enregistrez un essai dans l’application de destination. Si le problème apparaît seulement dans cette application, vérifiez le câble virtuel, le micro sélectionné et l’écoute.

## Autres applications et compatibilité

| Application | Training | Inférence (fichiers) | Realtime | Liens du projet |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Oui | Oui | Non | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Oui | Oui | Oui · Lanceur séparé | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Oui | Oui | Oui | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Oui | Oui | Oui | [GitHub](https://github.com/redpanda343/Redpanda-vc) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Non | Oui | Non | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Non | Non | Oui | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Non | Non | Oui | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Non | Non | Oui | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Non | Fichiers en temps réel | Oui | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Oui | Oui · ancienne version | Non | [Site officiel](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | Application | Quand l'utiliser | Matériel et notes de construction |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Conversion de fichiers, TTS, formation et analyse audio | La distribution Windows actuelle est NVIDIA uniquement. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Formation et inférence en amont, avec un lanceur en temps réel séparé | NVIDIA CUDA sur Windows et Ubuntu. La configuration du processeur en amont couvre les systèmes AMD et Intel, avec une utilisation possible de DirectML sous Windows. |
| [Applio](../other-rvcs/applio/installation.md) | Conversion de fichiers, formation et temps réel dans une seule application | La documentation du bureau répertorie NVIDIA CUDA, les configurations AMD prises en charge et Apple MPS. La disponibilité dépend de l'édition et du moteur. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Un fork Applio pour expérimenter plusieurs moteurs de conversion vocale | Le dépôt comprend un conteneur CUDA et documente la sélection de GPU pour les flux WebUI. Vérifiez le moteur sélectionné et créez pour d'autres backends. |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Conversion simple de fichiers locaux dans l'interface de bureau existante | Archivé. Le projet documente Windows NVIDIA CUDA et une solution de contournement historique d'Apple Silicon. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Recommandé pour live RVC v2 sur Windows avec NVIDIA | NVIDIA CUDA uniquement. Faites correspondre le package Hugging Face à votre génération de GPU. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Conversion en direct sur plusieurs systèmes d'exploitation | Windows CUDA et packages standard, y compris DirectML ou CPU, lorsqu'ils sont pris en charge. Chemins d’installation distincts d’Apple Silicon et de Linux. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Live RVC avec des options documentées pour les utilisateurs d'AMD, Intel et CPU | Windows CUDA ou DirectML. Les versions Linux et expérimentales de macOS ont des instructions distinctes. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Conversion de voix en temps réel sous Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Entraînement de modèles et conversion de fichiers · déconseillé | [Installateurs archivés](https://archive.org/details/replay-8.7.0-installers) |

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Comparer les applications](../reference/tools.md)
