# Entraînement avec Causal Voice Changer

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

L’option Causal Voice Changer de Redpanda intègre Causal Voice Changer v0.4.0. L’affinage produit une voix .cvc pour le moteur CVC.

## Entraîner une voix et reprendre

Préparez des enregistrements propres d’une seule personne et gardez un extrait de test. Ouvrez **Training → Causal Voice Changer**, nommez la voix, choisissez le dossier et le périphérique, puis réglez **Training steps**. La base se télécharge au premier usage. La version sauvegarde par défaut tous les 1 000 pas. Pour reprendre, utilisez le même nom et le même dossier avec un objectif de pas supérieur. Conservez les fichiers d’entraînement et testez le `.cvc` dans Inference et Realtime.

## Exports et licence

Le projet d’origine réserve la base CVC par défaut et ses affinages à un usage non commercial. Utilisez des enregistrements autorisés pour l’entraînement. Cherchez l’export dans `logs/causalvc/` en version portable ou dans `runs/models/voice-<name>/voices/` depuis le code source.

[Installer Redpanda VC](first-run.md) · [Inférence sur fichier](inference.md) · [Conversion vocale en temps réel](live-audio.md) · [RVC Training](training.md) · [Causal Voice Changer](../../non-rvc/causal-voice-changer/overview.md)

## Code source et version

[CVC trainer](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/causalvc/trainer.py) · [CVC upstream](https://github.com/mojowozo/Causal-Voice-Changer/tree/50dce9236854fef17f550571413367217e235155)
