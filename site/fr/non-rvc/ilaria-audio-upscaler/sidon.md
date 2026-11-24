# Restaurer la parole avec Sidon

## Restaurer un enregistrement

Choisissez **Sidon**, téléchargez **Sidon INT8**, ajoutez un extrait bruité ou réverbéré, sélectionnez **WAV (PCM)** et cliquez sur **Enhance audio**. Écoutez les pauses et l’intelligibilité. Vérifiez également les respirations, les consonnes faibles et le timbre. Gardez l’original si le traitement efface des détails utiles.

## Comment Sidon fonctionne dans l’application

L’application rééchantillonne à 16 kHz pour l’extraction des caractéristiques. Le prédicteur Sidon ONNX estime les caractéristiques de la parole propre et le décodeur DAC synthétise à 48 kHz. L’application traite chaque canal séparément par segments d’environ six secondes avec du contexte, puis applique un filtre antibruit fixe dans FFmpeg. INT8 désigne les poids quantifiés du modèle. La profondeur de sortie dépend du format.

[Présentation](overview.md) · [Installation et modèles](installation.md) · [Élargir la bande de parole avec AP-BWE](ap-bwe.md) · [Écoute, export et dépannage](export.md)

## Sources

[Sidon](https://github.com/sarulab-speech/Sidon) · [Sidon-ONNX](https://huggingface.co/soniqo/Sidon-ONNX) · [Speech Core](https://github.com/soniqo/speech-core) · [studio_sidon.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_sidon.py)
