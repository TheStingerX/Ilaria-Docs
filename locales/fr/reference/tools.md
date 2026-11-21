---
permalink: /tools/
label: "🧰 Outils RVC"
order: 95
description: "Comparez les applications compatibles pour la conversion vocale en direct, la conversion de fichiers et la formation."
---

# Choisissez une application RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Vous pouvez aussi utiliser Ilaria RVC sur Kaggle avec son GPU distant, même si votre ordinateur n’a pas de GPU NVIDIA. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Pour installer, configurer ou dépanner une application, consultez les [guides pas à pas par application](../other-rvcs/app-guides.md).

Commencez par ce que vous voulez faire. Un **changeur de voix en direct** traite le flux du microphone pendant que vous parlez. Un **convertisseur de fichiers** traite un enregistrement et enregistre la sortie pour l'éditer ou l'exporter. Un **entraîneur** transforme un ensemble de données d'enregistrements d'un locuteur en modèle. Certaines applications proposent les trois flux de travail. La version que vous installez détermine le matériel graphique et les formats de modèle que vous pouvez utiliser.

///region app-comparison
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
///endregion

## Vonovox (recommandé pour une utilisation NVIDIA en direct)

> **Dernière version (bêta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

Vonovox est un changeur de voix en temps réel Windows qui charge les modèles RVC v2 et utilise NVIDIA CUDA. Choisissez-le si votre objectif principal est la conversion du microphone et que vous disposez d'une carte NVIDIA prise en charge. La liste des packages comprend des versions et des correctifs pour des générations de GPU spécifiques, alors vérifiez les noms de fichiers et les instructions de publication avant de choisir une archive. Utilisez le référentiel Hugging Face de l'éditeur pour les téléchargements. [Téléchargements officiels Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Matériel Vonovox et notes de configuration](https://github.com/dr87/Vonovox/blob/main/README.md)

Pour une première exécution, chargez votre voix RVC v2 et écoutez un court test de microphone avant d'acheminer l'audio vers une autre application. Réduisez ensuite progressivement la taille du bloc tout en parlant normalement. Restaurez le réglage précédent si vous entendez des coupures ou des syllabes hachées. Testez à nouveau avec le jeu ou l'application de streaming que vous prévoyez d'utiliser, car les deux partagent le même GPU. [Configuration audio Vonovox](https://github.com/dr87/Vonovox/blob/main/README.md)

## w-okada VCClient

VCClient gère la conversion vocale en direct avec un client et un serveur. Vous pouvez les exécuter ensemble sur une machine ou placer le serveur sur une deuxième machine pour éloigner la charge de travail de conversion de votre ordinateur principal. Sélectionnez une version prenant en charge le modèle RVC que vous souhaitez charger. Les téléchargements maintenus sont en direct sur Hugging Face, et le README en anglais du projet explique les options Windows standard, Windows CUDA, Apple Silicon et Linux. [LISEZMOI anglais VCClient](https://github.com/w-okada/voice-changer/blob/master/README_en.md) · [Téléchargements officiels VCClient](https://huggingface.co/wok000/vcclient000/tree/main)

Vérifiez le format du modèle ainsi que l'accélérateur. Par exemple, les anciennes instructions Windows v1 du projet limitent l'accélération GPU AMD et Intel aux modèles ONNX. Un fichier PyTorch `.pth` et un fichier `.onnx` exporté peuvent avoir des chemins matériels différents dans la même application. La norme Windows v2 documente les options DirectML et CPU. [Notes sur la construction et le format du modèle de VCClient](https://github.com/w-okada/voice-changer/blob/master/README_en.md)

## Okada TG Developed Fork (TGR)

Le projet `tg-develop/voice-changer` est un fork communautaire dans la famille w-okada via le fork deiteris. Il se concentre sur RVC en direct et documente les versions Windows distinctes pour NVIDIA CUDA et DirectML sur du matériel AMD ou Intel compatible. Sa documentation couvre également l'utilisation du processeur, Linux et les versions expérimentales de macOS pour Apple Silicon et Intel. [Configuration de TGR et configuration système requise](https://github.com/tg-develop/voice-changer) · [Version de TGR](https://github.com/tg-develop/voice-changer/releases)

Sous Windows, utilisez les instructions correspondant à la version que vous avez téléchargée. La version DirectML expose une liste différente d'extracteurs de pitch de la version NVIDIA, donc les préréglages de l'édition CUDA peuvent nécessiter un ajustement. Comparez la stabilité audio avec vos applications habituelles en cours d'exécution avant de vous fier à la configuration pour un enregistrement ou un streaming.

## Ilaria RVC

Le package Windows actuel est NVIDIA uniquement. Utilisez-le lorsque vous souhaitez basculer entre la conversion d'enregistrements, la génération de paroles, la formation, la vérification des métadonnées d'un modèle et l'inspection des formes d'onde ou des spectrogrammes dans l'analyseur audio. Les installations existantes peuvent rechercher des mises à jour sous **Autre → Mettre à jour Ilaria RVC**. [Téléchargements d'Ilaria RVC](https://huggingface.co/TheStinger/Ilaria_RVC) · [Projet README et notes de version](https://github.com/TheStingerX/Ilaria-RVC)

## RVC GUI

L'interface graphique RVC de Tiger14n est une interface de bureau autonome pour convertir des fichiers audio. Il peut importer un ZIP contenant l'inférence `.pth` et sa correspondance `.index` lorsqu'elle est disponible. Son référentiel est archivé, utilisez donc ses instructions pour un flux de travail qui nécessite spécifiquement cette application. L'**interface graphique en temps réel** du projet RVC en amont, également nommé, est un lanceur distinct. [Dépôt et configuration de l'interface graphique RVC](https://github.com/Tiger14n/RVC-GUI)

## Applio

Applio prend en charge la gestion des modèles vocaux RVC, la conversion de fichiers, la formation et le temps réel. Ses éditions Desktop et Python/Gradio ont des flux de configuration différents. La documentation du bureau identifie NVIDIA CUDA, les configurations AMD prises en charge et Apple MPS et explique comment vérifier l'état du moteur après l'installation. Utilisez les [Étapes de conversion Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) pour votre édition.

## Interface utilisateur Web RVC

Retrieval-based-Voice-Conversion-WebUI est le projet RVC en amont. Son WebUI gère la formation et l'inférence de fichiers. L'interface graphique en temps réel du projet possède son propre lanceur. La branche principale documente les dépendances CUDA distinctes pour les cartes NVIDIA plus récentes et plus anciennes, ainsi qu'un ensemble de dépendances CPU pour les systèmes AMD et Intel. Sous Windows, DirectML peut être disponible pour les opérations prises en charge. Suivez les [Étapes de conversion principales](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) pour le package Windows.

## Redpanda-vc

Redpanda-vc est un fork d'Applio dont l'interface en temps réel prend en charge RVC, Beatrice et Rectified Flow. Il propose plusieurs familles de modèles, alors sélectionnez le flux de travail RVC pour une voix RVC. Dans son mode navigateur en temps réel, le projet documente l'attribution de flux à des GPU particuliers et note que Beatrice s'exécute sur le CPU. Ces choix de ressources s'appliquent à Redpanda-vc et à son moteur sélectionné. [Dépôt Redpanda-vc et moteurs pris en charge](https://github.com/redpanda343/Redpanda-vc)

## Comparez les applications avec la même voix

1. Choisissez le package adapté à votre système d'exploitation, GPU et format de modèle. Vérifiez si l'application prend en charge la génération RVC et l'encodeur de fonctionnalités de votre modèle.
2. Commencez par le même court enregistrement ou répétez les mêmes quelques phrases dans votre microphone. Chargez le même modèle d'inférence et son index correspondant dans les deux applications si pris en charge.
3. Utilisez le même pitch shift et désactivez les effets vocaux optionnels pour la première comparaison. Jugez des mots clairs, une hauteur stable et des pauses naturelles avant d'ajuster le son.
4. Pour une utilisation en direct, exécutez l'application de jeu, d'appel ou de streaming que vous utilisez normalement et enregistrez la sortie acheminée pendant au moins une minute. Écoutez les interruptions, les coupures brutales et les retards audio avant de réduire la mémoire tampon.

## Replay

[Site officiel](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers)

Depuis la fermeture de Weights.gg, Replay ne reçoit plus de support ni de mises à jour. La [page officielle de Replay](https://www.weights.com/replay) peut disparaître à tout moment. Internet Archive conserve les installateurs de Replay 8.7.0. Replay est déconseillé pour une nouvelle installation. Depuis la fermeture de Weights, le programme d'installation archivé risque de ne plus pouvoir télécharger les fichiers nécessaires et de ne pas terminer l'installation.

[Installateurs archivés · Replay 8.7.0](https://archive.org/details/replay-8.7.0-installers)
## Matrice étendue : Plateformes, Formats, Licences et Statut

> **Déclaré vs Testé :** Seul **Ilaria RVC** (vérifié sur RTX 4070) dispose d'une vérification directe ; les autres lignes reflètent la documentation officielle de chaque projet en novembre 2026.

| App | OS | GPU / CPU | Formats | TTS | Statut & Licence | Facilité |
| --- | --- | --- | --- | --- | --- | --- |
| **Ilaria RVC** | Windows, Linux (Cloud) | NVIDIA CUDA (12.8 / 12.6) | .pth, .index, .safetensors | Oui | **Actif** (MIT) | Facile |
| **Vonovox** | Windows | NVIDIA CUDA | RVC v2 .pth, .index | Non | **Bêta** (2.0.0 Beta 3) | Facile |
| **Applio** | Windows, Linux, macOS | NVIDIA, AMD, MPS, CPU | .pth, .index, .onnx | Oui | **Actif** (MIT) | Facile–Moyenne |
| **w-okada / TGR / Deiteris** | Windows, macOS, Linux | NVIDIA, DirectML, MPS, CPU | .pth, .onnx | Non | **Actifs** | Moyenne |
| **RVC WebUI / RVC Blue / Redpanda-vc** | Windows, Linux | NVIDIA CUDA (DirectML/CPU var.) | .pth, .index | Non | **Actifs / Upstream** | Facile–Moyenne |
| **RVC GUI / Replay** | Windows / Legacy | Legacy | .pth | Non | **Archivé / Arrêté** | Legacy |
