# Conversion vocale en temps réel

[Version précompilée pour Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Ouvrez Realtime dans l’application de bureau ou la WebUI. Testez une voix au casque avant de l’envoyer vers Discord, OBS, un jeu ou une autre application.

## Configurer le routage audio

Pour le premier essai, choisissez le micro physique dans **Microphone** et le casque dans **Output**. Pour envoyer le signal à une autre application, utilisez l’extrémité lecture du câble virtuel comme sortie de Redpanda et l’extrémité enregistrement comme micro dans l’application de destination. Utilisez **Monitor** pour le casque sans renvoyer le signal au micro.

## Voix RVC et CVC

RVC utilise un `.pth` d’inférence et un `.index` associé facultatif. CVC utilise une voix `.cvc` et un chemin audio à 48 kHz. Il charge les réglages de hauteur, de gain, de gate et d’index enregistrés avec la voix. Les anciens fichiers `.causalvc.json` et `.nextvc.json` exigent leurs poids. RNNoise peut filtrer le micro. En cas de coupures, essayez un bloc plus long et désactivez les effets un à un.

[Installer Redpanda VC](first-run.md) · [Inférence sur fichier](inference.md) · [Entraînement avec Causal Voice Changer](causal-training.md) · [RVC Training](training.md) · [VAC Lite / VB-CABLE](../../conversion/real-time.md)

## Code source et version

[Realtime UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Realtime engine](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/realtime.py)
