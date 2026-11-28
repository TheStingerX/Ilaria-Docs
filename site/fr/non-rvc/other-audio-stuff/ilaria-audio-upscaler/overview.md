# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Choisir le moteur

Ilaria Audio Upscaler traite les enregistrements localement sous Windows. Choisissez **Sidon** pour une parole bruitée, réverbérée ou compressée. Choisissez **AP-BWE** pour une parole assez propre à bande limitée, par exemple un enregistrement téléphonique. Les deux moteurs ciblent la parole. Comparez le résultat à l’original avant de l’utiliser dans un jeu de données vocales.

## Apollo

**Apollo** restaure des morceaux dégradés par une compression avec perte, à **44,1 kHz** sur CPU ou NVIDIA CUDA. Choisissez un extrait court, sélectionnez **Apollo**, téléchargez le modèle si nécessaire, puis cliquez sur **Enhance audio**. Comparez l’original et le résultat à **1×** avant de cliquer sur **Save result**.

[Apollo](apollo.md)

## Premier essai

Gardez le fichier source. Traitez un court extrait avec un seul moteur et exportez en WAV. Comparez à volume comparable en écoutant les consonnes, les pauses et le timbre. Les hautes fréquences sont synthétisées à partir du signal disponible. Un fichier à 48 kHz ne restitue pas exactement la forme d’onde originale.

[Installation et modèles](installation.md) · [Restaurer la parole avec Sidon](sidon.md) · [Élargir la bande de parole avec AP-BWE](ap-bwe.md) · [Écoute, export et dépannage](export.md)

## Sources

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
