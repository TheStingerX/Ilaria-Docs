---
label: "Installez et utilisez RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue est un changeur de voix de bureau Windows basé sur l'interface graphique en temps réel de RVC WebUI (Mainline - Original RVC). Il convertit le..."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

RVC Blue est un changeur de voix de bureau Windows basé sur l'interface graphique en temps réel de RVC WebUI (Mainline - Original RVC). Il convertit le microphone, le fichier audio et l'audio des applications Windows prises en charge en temps réel. Les modèles sont formés dans une application distincte. L'entrée de fichier passe par le moteur live et peut être enregistrée au format WAV.

## Installez le package Windows

1. Vérifiez le modèle de votre GPU NVIDIA dans **Task Manager → Performance**. Ouvrez [Téléchargements RVC Blue](https://huggingface.co/niel-blue/RVC-Realtime-GUI) et choisissez le package correspondant à votre matériel. Le projet fournit un package **CUDA 12.8** standard, incluant la prise en charge de Blackwell, et un package de compatibilité **CUDA 11.8**. Utilisez un pilote compatible avec la version sélectionnée.
2. Extrayez l'intégralité de l'archive dans un dossier local accessible en écriture. Python, PyTorch, FFmpeg et les ressources d'inférence requises sont fournis avec le package.
3. Pour CUDA 12.8, exécutez `RVC-Realtime-GUI-CUDA128.bat` à partir de ce dossier. Pour CUDA 11.8, utilisez son lanceur fourni. Attendez le premier démarrage pour terminer le chargement du runtime GPU.
4. Commencez par la voix incluse ou mettez votre propre inférence `.pth` et son index correspondant dans un dossier par modèle sous `models/`. Par exemple, placez `MyVoice.pth` et `added_MyVoice.index` à l'intérieur de `models/MyVoice/`. Le nom du dossier apparaît dans la liste des modèles. Actualisez ou rouvrez l'application après avoir ajouté un modèle.

## Testez la voix localement

Choisissez votre microphone physique comme entrée. Sélectionnez des écouteurs à surveiller, choisissez une voix et cliquez sur **Démarrer**. Dites une courte phrase et faites une pause. Conservez les paramètres de tampon et de pitch par défaut pour le premier test. L'application permet des périphériques d'entrée, de sortie et de surveillance indépendants. Commencez par WASAPI si vous n'utilisez pas de matériel ASIO. Si vous utilisez ASIO natif, commencez par le tampon recommandé par le pilote.

## Acheminer l'audio vers un jeu ou un appel

Choisissez le point final de lecture du câble virtuel comme sortie du convertisseur. Dans l'application de destination, sélectionnez le point de terminaison d'enregistrement comme microphone. Gardez la lecture du jeu ou des appels sur vos écouteurs. **VAC Lite** et **VB-CABLE** sont des options. Vérifiez les noms des appareils dans la [procédure pas à pas du câble virtuel](../vonovox/live-audio.md). Effectuez un court enregistrement local dans la destination avant de rejoindre un appel.

## Utiliser un fichier ou une autre application comme entrée

Pour un fichier audio, sélectionnez le mode d'entrée du fichier et testez un court WAV. Choisissez un périphérique de sortie et de surveillance avant de commencer. Utilisez les commandes d'enregistrement pour enregistrer la sortie WAV. L'application expose également des options pour enregistrer l'entrée et la sortie indépendamment ou dans une mise en page combinée.

Dans les versions qui incluent la capture d'application, basculez la source d'entrée sur une application, actualisez la liste et sélectionnez l'application qui lit l'audio. Cela utilise la capture audio par processus Windows. La sortie ASIO directe peut contourner le chemin de capture. L'audio de l'application d'origine reste audible sauf si vous ajustez sa lecture séparément.

## Dépanner le premier test

| Symptôme | Que vérifier |
| --- | --- |
| Le programme se ferme au démarrage | Exécutez le lanceur fourni à partir de son dossier extrait et lisez la première erreur. Vérifiez la version CUDA et le pilote NVIDIA sélectionnés. |
| Une nouvelle voix n'apparaît pas | Vérifiez le dossier par modèle et actualisez la liste des modèles. Utilisez une exportation d'inférence plutôt qu'un point de contrôle de formation. |
| Les écouteurs fonctionnent mais Discord ou le jeu est silencieux | Sélectionnez le point de terminaison d'enregistrement du câble virtuel dans la destination. Vérifiez la sortie du convertisseur séparément. |
| Vous entendez deux voix | Vérifiez si l'application d'origine est toujours audible ou si deux voies de surveillance sont actives. |
| L'audio se coupe sous charge | Restaurez le tampon par défaut ou augmentez-le légèrement. Répétez le test pendant que l'autre application est en cours d'exécution. |

[Source du projet et notes de version](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
