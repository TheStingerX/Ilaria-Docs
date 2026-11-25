# Documentation Ilaria RVC

<div class="docs-welcome" data-author-note="ilaria">

**Un mot d’Ilaria avant de commencer**

Bonjour, je suis Ilaria. J’ai écrit ces guides pour partager ce que j’ai appris en développant Ilaria RVC, en entraînant des modèles vocaux et en essayant d’autres outils. Les conseils reflètent mon expérience et mes connaissances au moment de la rédaction. Je peux mal comprendre un réglage, oublier un cas particulier ou décrire une étape modifiée dans une version ultérieure.

Les mêmes étapes peuvent donner un résultat différent sur votre ordinateur. Une mise à jour peut déplacer un bouton, une fonction peut dépendre du GPU ou du pilote et un réglage adapté à une voix peut moins bien fonctionner sur une autre. Prenez les valeurs proposées comme point de départ. Testez un court extrait et changez un réglage à la fois. Gardez une copie de vos fichiers avant de remplacer une installation qui fonctionne.

Si les instructions ne correspondent pas à ce que vous voyez, vérifiez le nom de l’application, sa version et le message d’erreur. Consultez les notes de version correspondantes. Si vous repérez une erreur, indiquez-moi la page, l’étape, la version et le résultat obtenu afin que je puisse reproduire le problème et corriger le guide.

<div style="border-left:4px solid #FFC0CB;padding:.75rem 1rem;margin:1rem 0;background:#ffc0cb12;border-radius:.3rem">

Pour tout problème, suggestion ou mise à jour, contactez-moi sur Discord.

[**Discord · thestingerx**](https://discord.com/users/740255187234717838)

</div>

&#45; Ilaria

</div>

<div class="docs-welcome">

**Ilaria RVC** est une application Windows permettant de convertir des enregistrements et de former des modèles vocaux. Son interface s'ouvre dans un navigateur et le moteur de conversion s'exécute sur votre ordinateur. Le package Windows est conçu pour les GPU NVIDIA.

Si votre ordinateur ne dispose pas d’une carte NVIDIA adaptée, vous pouvez utiliser Ilaria RVC sur Kaggle. Dans les paramètres du notebook, activez l’accès à Internet et sélectionnez un accélérateur GPU. Choisissez GPU T4 ×2 si cette option est disponible. Le GPU NVIDIA de Kaggle prend en charge la conversion vocale et l’entraînement des modèles. Le [guide Ilaria RVC sur Kaggle](ilaria-rvc/cloud/kaggle.md) explique comment configurer le notebook et sauvegarder vos résultats avant la fin de la session.

> **Version actuelle** · **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Le paquet Windows complet est la version 2.4.7. Pour passer de 2.4.2–2.5.0 à la dernière version, utilisez **Other → Update Ilaria RVC → Check for updates → Download and restart**. Le ZIP de mise à jour exclut l’environnement d’exécution et les poids des modèles. [ZIP de mise à jour Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [Parcourir les démos vocales](https://ilariarvc.shop/en/demos/) · [Lire le journal des modifications](ilaria-rvc/install/version-history.md)

</div>

## Commencez par votre configuration

### Windows avec un GPU NVIDIA

Vérifiez votre modèle exact dans [Compatibilité GPU](ilaria-rvc/install/gpu-compatibility.md), puis suivez [Installation et mises à jour](ilaria-rvc/install/installation.md). Lorsque l'application s'ouvre, utilisez un court WAV propre et un modèle d'inférence dans [Single Inference](ilaria-rvc/convert/inference.md). L'index correspondant est facultatif. Enregistrez la première sortie afin d'avoir une référence avant de modifier les effets ou la hauteur.

### Un ordinateur sans GPU adapté

Utilisez la [procédure pas à pas de Kaggle](ilaria-rvc/cloud/kaggle.md) pour exécuter Ilaria RVC sur un GPU distant. Il couvre le démarrage du notebook, l'accès à l'interface, l'exécution d'un test et le téléchargement des résultats avant la fin de la session.

## Choisissez le bon flux de travail

- **J'ai un enregistrement et je veux une voix différente.** Utilisez [Contrôles d'inférence](ilaria-rvc/convert/inference-buttons.md) pour choisir un modèle, convertir le fichier et rechercher l'audio exporté.
- **J'ai du texte et je veux de l'audio parlé.** Commencez par [Text to Speech](ilaria-rvc/convert/speech.md). Écoutez la voix source avant d'appliquer un modèle RVC afin de pouvoir corriger la prononciation plus tôt.
- **Je souhaite créer mon propre modèle vocal.** Préparez les enregistrements que vous êtes autorisé à utiliser, gardez un court clip de côté pour les tests, puis suivez la [Formation étape par étape](ilaria-rvc/train/training-workflow.md). Utilisez la [Référence des contrôles de formation](ilaria-rvc/train/training-buttons.md) lorsque vous avez besoin de comprendre un paramètre.
- **Je souhaite utiliser un microphone converti dans un appel ou un jeu.** Choisissez une application dans [Autres RVC](other-rvcs/app-guides.md), puis suivez [routage audio en direct](conversion/real-time.md) pour tester le micro, le convertisseur et la destination dans cet ordre.

## Quand quelque chose ne va pas

Si l'application ne démarre pas, laissez le journal ouvert et recherchez la première erreur. Si l'application démarre mais que le son ne sonne pas correctement, comparez le même court clip avec le traitement facultatif désactivé. Le [guide de dépannage](reference/troubleshooting.md) regroupe les correctifs par symptôme. Le [glossaire](reference/glossary.md) explique des termes tels que point de contrôle, intégration et index, et [Autres contrôles](ilaria-rvc/manage/other-buttons.md) montre comment inspecter, importer et exporter des modèles.

 | Je veux… | Commencez ici |
| --- | --- |
 | Explorez l'application Ilaria RVC en détail | [Présentation de l'application](ilaria-rvc/overview.md), [installation](ilaria-rvc/install/installation.md), [inférence](ilaria-rvc/convert/inference.md) et [flux de travail de formation](ilaria-rvc/train/training-workflow.md) |
 | Installer l'application et convertir mon premier clip | [Mise en route](start/getting-started.md) |
 | Comprendre le fonctionnement de RVC | [Principes fondamentaux de RVC](start/rvc-fundamentals.md) et [modèles et fichiers](start/models.md) |
 | Convertir l'audio, comparer les paramètres ou traiter un dossier | [Conversion vocale](conversion/voice-conversion.md) et [qualité audio](conversion/audio-quality.md) |
 | Générer une source parlée à partir du texte | [Texte vers discours](conversion/text-to-speech.md) |
 | Convertir un signal de microphone en direct | [Conversion vocale en temps réel](conversion/real-time.md) |
 | Enregistrer un ensemble de données et entraîner mon propre modèle | [Préparation de l'ensemble de données](model-training/dataset-preparation.md) et [entraînement](model-training/training.md) |
 | Séparer une voix ou terminer un projet musical | [Tiges et mixage](conversion/stems-and-mixing.md) |
 | Comparez Ilaria RVC, Vonovox, Applio et plus | [Outils RVC](reference/tools.md) |
 | Corriger une erreur ou récupérer une installation | [Dépannage](reference/troubleshooting.md) |

Utilisez la navigation pour trouver des guides de configuration, de conversion, de formation et de dépannage pour Ilaria RVC et d'autres applications RVC.

---

## La documentation en chiffres

- **Pages au total :** **118** pages (`117` guides + Accueil)
- **Total de pages dans les 6 langues (`en`, `it`, `es`, `fr`, `de`, `pt`) :** **708** pages (`118 x 6`)

## Quelques anecdotes sur le site et sur Ilaria

- **Né de l'expérience pratique :** Ilaria (`TheStingerX` / `thestingerx` sur Discord) a rédigé et enrichi ces guides directement en développant **Ilaria RVC**, en entraînant des modèles vocaux (comme *Itaila*) et en testant des configurations réelles sous Windows, Kaggle, Google Colab et Lightning AI.
- **De la `1.1 Beta` à la `2.4.7` :** Parti d'une interface Windows personnalisée, Ilaria RVC prend désormais en charge les **NVIDIA RTX série 50 (Blackwell)** avec CUDA 12.8, l'**entraînement natif en BF16**, **Kokoro v1.0 TTS**, la conversion **Safetensors ↔ PTH** et des catalogues intégrés.
- **Bien plus qu'une seule appli :** Avec le temps, **Ilaria Docs** est devenu un portail complet couvrant **11 applications et forks RVC** (Ilaria RVC, Applio, Mainline, Okada, TGR, Deiteris, Vonovox, RedPanda, RVC Blue, RVC-GUI et RVC Model Merger) ainsi que des outils **Non-RVC** comme **YuneVoix**, **Causal Voice Changer**, **UVR5** et **MVSep**.
- **Synchronisé en 6 langues :** Chaque page du site est maintenue en parité 1:1 en anglais, italien, espagnol, français, allemand et portugais.
