---
label: "📦 Installer TG Developed Fork"
order: 100
permalink: /ilaria-rvc/tgr/installation/
---
# Installer Okada TG Developed Fork

TG Developed Fork (TGR) vient de la branche Deiteris de la famille w-okada. L'éditeur documente ce fork comme RVC uniquement. Il possède ses propres fichiers de version, lanceurs et contraintes de périphérique. Conservez-le dans son propre dossier afin qu'une installation VCClient ou Deiteris fonctionnelle reste disponible à des fins de comparaison.

## Téléchargez la version qui correspond à votre ordinateur

Vérifiez **Gestionnaire des tâches → Performance** sous Windows ou **À propos de ce Mac** sur macOS. Lisez le nom réel du GPU ou de la puce. Dans le nom du fichier de la version, `amd64` fait référence à l'architecture du processeur utilisée par les PC Intel et AMD 64 bits standard.

| Configuration | Fichier à rechercher sur les [versions TGR](https://github.com/tg-develop/voice-changer/releases) |
| --- | --- |
| Windows avec NVIDIA CUDA pris en charge | Les `voice-changer-windows-amd64-cuda.zip` parties divisées de la même version. |
| Windows avec AMD, graphiques Intel pris en charge ou fonctionnement uniquement sur processeur | `voice-changer-windows-amd64-dml.zip`. Sélectionnez CPU dans l'application lors des tests sans GPU utilisable. |
| Apple Silicon Mac | `voice-changer-macos-arm64-cpu.tar.gz` si inclus. L'éditeur marque la prise en charge de macOS comme expérimentale. |
| Intel Mac | `voice-changer-macos-amd64-cpu.tar.gz` si inclus. L'accélération dépend des graphiques installés et de la version. |
| Linux | Utilisez les ressources de la version explicitement étiquetées pour Linux lorsqu'elles sont disponibles, ou la configuration source du fork. |

## Windows étape par étape

1. Sur la page des versions, développez **Actifs** pour une version. Téléchargez le ZIP DirectML ou chaque partie CUDA. Un exemple fractionné comprend `.001` et `.002`. Les pièces doivent rester les unes à côté des autres avec leurs noms téléchargés.
2. Pour CUDA, utilisez un outil d'archivage qui prend en charge les fichiers fractionnés et les extraits de `.001`. Il lit les dernières parties lors de l'extraction. Pour DirectML, extrayez le seul ZIP. Choisissez un dossier dans lequel vous pouvez écrire et conservez les dossiers extraits intacts.
3. Ouvrez le package extrait, puis `MMVCServerSIO`, puis lancez `MMVCServerSIO.exe`.
4. Laissez la fenêtre de démarrage ouverte pendant le téléchargement des poids requis. Lorsque le navigateur s'ouvre, gardez cette console disponible pour les diagnostics. Si la page ne s'ouvre pas automatiquement, utilisez l'adresse locale imprimée par le serveur.
5. La première conversion CUDA peut prendre quelques secondes pour démarrer. Attendez le préchauffage avant d'appuyer à plusieurs reprises sur Démarrer ou de changer d'appareil.

## macOS ou Linux

Sur macOS, décompressez l'archive correspondant à l'architecture exacte de votre puce et ouvrez l'exécutable `MMVCServerSIO` fourni. Si macOS bloque le lancement, confirmez que le fichier provient de la version officielle et examinez le blocage avant d'apporter des modifications au système. Accordez l'accès au microphone au navigateur pour la capture du navigateur ou à l'application locale lorsqu'elle ouvre directement le microphone.

Pour une installation source Linux, utilisez la propre archive source du fork et l'environnement Python 3.10 documenté. Ouvrez un terminal dans le dossier `server` du dépôt. Le programme d'installation est `vc_install.sh` ; choisissez le backend qui correspond à votre système lorsqu'il vous y invite. Utilisez le script de démarrage inclus par cette version et ouvrez l'adresse locale imprimée sur le terminal. Les noms de script diffèrent selon les instantanés. Pour identifier les points d'entrée fournis, répertoriez les fichiers dans le dossier `server` avant d'en exécuter un. Pour une version binaire, décompressez le package correspondant à votre architecture et démarrez son exécutable inclus. L'archive Windows DirectML est un moteur d'exécution distinct.

## Isoler les erreurs de démarrage

| Symptôme | Première vérification |
| --- | --- |
| L'extraction s'arrête sur un fichier manquant | Confirmez que toutes les pièces CUDA sont présentes et proviennent de la même version. Recommencez l'extraction à partir de `.001`. |
| Un poids échoue à la vérification | Lisez le nom du fichier dans le journal de démarrage. Fermez le processus, renommez uniquement la dépendance téléchargée citée en tant que sauvegarde, puis redémarrez pour réessayer son téléchargement. Gardez votre bibliothèque de modèles vocaux et vos fichiers d'index intacts. |
| Le navigateur affiche un échec de connexion | Vérifiez si la console du serveur signale une adresse prête. Lancez une instance et gardez-la ouverte tout en utilisant la page. |
| DirectML se lance mais le GPU est lent ou manquant | Confirmez le nom du GPU sélectionné et testez le CPU ou un autre appareil pris en charge avec le même modèle. Le projet signale de mauvaises performances sur certaines configurations Intel intégrées. |
| L'ouverture du microphone échoue | Vérifiez les autorisations d'entrée dans le système d'exploitation et le navigateur, puis répétez dans un navigateur basé sur Chromium si Firefox ESR n'affiche pas la liste des appareils. |

Une fois la page chargée, passez à [Premier modèle, microphone et câble virtuel](live-audio.md).
