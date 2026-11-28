# Écoute, export et dépannage

## Écouter et enregistrer

Ajoutez un ou plusieurs fichiers, choisissez le format et lancez **Enhance audio**. Comparez l’original et le résultat à **1×**. **Speed** modifie uniquement la lecture. Sélectionnez le résultat et cliquez sur **Save result**. Les aperçus non enregistrés sont temporaires. Préférez WAV ou FLAC pour la suite. L’export WAV utilise le **PCM 24 bits** par défaut. Choisissez **WAV (PCM 16-bit)** si le logiciel destinataire l’exige. La profondeur de bits ne rétablit pas les informations perdues dans la source.

## Problèmes courants

**Poids manquants :** téléchargez ceux du moteur et du profil sélectionnés. **Erreur CUDA :** essayez **CPU** avec un WAV court. **Ouverture ou export impossible :** testez un WAV valide et vérifiez FFmpeg, l’espace libre et les droits d’écriture. **Traitement lent :** essayez un extrait plus court en Auto ou sur un GPU CUDA compatible. **Résultat dégradé :** comparez à l’original et adaptez le moteur ou le profil au défaut.

**WAV (PCM 24-bit)** · **WAV (PCM 16-bit)** · **FLAC** · **MP3** · **M4A (AAC)** · **M4A (ALAC)** · **AAC (ADTS)** · **OGG (Vorbis)** · **Opus** · **AIFF (PCM)** · **WavPack** · **WMA**

[Présentation](overview.md) · [Installation et modèles](installation.md) · [Restaurer la parole avec Sidon](sidon.md) · [Élargir la bande de parole avec AP-BWE](ap-bwe.md)

## Sources

[studio.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio.py) · [studio_formats.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_formats.py)
