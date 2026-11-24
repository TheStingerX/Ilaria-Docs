# Installation et modèles

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1)

## Configuration sous Windows

**1.** Téléchargez le projet depuis GitHub et extrayez-le dans un dossier local accessible en écriture. Installez **Python 3.10 64 bits**. **2.** Lancez `Setup.cmd` et attendez l’installation des dépendances et de FFmpeg, la création de `Ilaria Audio Upscaler.exe` et l’ouverture de l’application. **3.** Ensuite, ouvrez directement l’EXE et gardez-le dans son dossier. Le paquet source exclut l’exécutable compilé, l’environnement Python et les poids.

## Périphérique et poids

Le programme d’installation essaie CUDA sur un GPU NVIDIA compatible et peut revenir au CPU. Commencez par **Auto**. Choisissez **CPU** pour isoler un problème CUDA ou **CUDA** et le GPU si l’environnement le prend en charge. Utilisez **Download Sidon INT8** (environ 286 Mio) ou **Download checkpoint** pour le profil AP-BWE choisi. Les poids se trouvent dans `App/checkpoints`. L’installation et les téléchargements nécessitent Internet.

[Présentation](overview.md) · [Restaurer la parole avec Sidon](sidon.md) · [Élargir la bande de parole avec AP-BWE](ap-bwe.md) · [Écoute, export et dépannage](export.md)

## Sources

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
