---
label: "Modèles et accélération"
icon: ":package:"
order: 97
permalink: /non-rvc/tts/voicestudio/engines/
---

# VoiceStudio · Modèles et accélération

[VoiceStudio v0.5.8 · Modèles et accélération](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Préparation

Chaque tâche dépend d’un moteur et de poids. Vérifiez langue, taille, licence et matériel avant de télécharger. Installez d’abord le moteur requis par votre projet.

## Premier essai

Le CPU sert de référence. CUDA concerne NVIDIA, ROCm dépend du GPU AMD et du moteur. Certains moteurs GGUF proposent Vulkan. Apple Silicon dispose de Metal. Comparez la même phrase après un changement.

## Vérification pas à pas

1. Déterminez si vous avez besoin de TTS ou d’ASR.
2. Vérifiez langue et matériel avant l’installation.
3. Comparez le CPU et le GPU avec le même texte après un premier essai.

[Première synthèse](first-run.md) · [Dépannage](troubleshooting.md)
