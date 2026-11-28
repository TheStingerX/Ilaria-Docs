# Restaurer la musique avec Apollo

[GitHub · Apollo](https://github.com/JusperLee/Apollo) · [Ilaria Audio Upscaler V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Quand l’utiliser

Apollo est disponible dans Ilaria Audio Upscaler V2. Il traite localement la musique à **44,1 kHz** sur CPU ou NVIDIA CUDA. Essayez un MP3 à faible débit et comparez les détails estimés avec l’original.

## Premier essai

Sélectionnez **Apollo** et téléchargez le modèle si nécessaire. Il occupe environ **63,5 Mio** et se trouve dans `App/checkpoints/Apollo`. Laissez le périphérique sur **Auto**, ajoutez un extrait court et cliquez sur **Enhance audio**.

## Comparer et enregistrer

Écoutez le même extrait à **1×** et à volume comparable. Vérifiez les cymbales et les attaques de percussion. Cliquez sur **Save result**. WAV utilise le **PCM 24 bits** par défaut et propose **WAV (PCM 16-bit)**.

## Dépannage

Si le modèle manque, sélectionnez Apollo avant de le télécharger. Si CUDA échoue, choisissez **CPU** et réessayez avec un WAV court. Si des artefacts apparaissent, conservez l’original.
