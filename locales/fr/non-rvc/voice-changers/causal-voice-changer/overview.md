---
label: "Aperçu et prérequis"
icon: ":book:"
order: 99
permalink: /non-rvc/causal-voice-changer/overview/
description: "Causal Voice Changer (CVC) est un changeur de voix IA en temps réel à 48 kHz conçu pour combler l'écart entre les solutions à latence ultra-faible (comme Beatrice) et les solutions plus fidèles mais plus lentes (comme RVC)."
---
# Causal Voice Changer (CVC)

**Dernière version stable** · [v0.4.2.1](https://github.com/mojowozo/Causal-Voice-Changer/releases/tag/v0.4.2.1)

[GitHub](https://github.com/mojowozo/Causal-Voice-Changer) · [Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases) · [Redpanda VC · Entraînement avec Causal Voice Changer](../../../other-rvcs/training/redpanda/causal-training.md)

**Causal Voice Changer (CVC)** est un changeur de voix IA en temps réel à **48 kHz** conçu pour combler l'écart entre les solutions à latence ultra-faible (comme Beatrice) et les solutions plus fidèles mais plus lentes (comme RVC). Au lieu de sacrifier la qualité pour la vitesse - ou inversement - CVC utilise une version distillée de **ContentVec** et **RMVPE** dans une architecture causale afin d'offrir un son propre avec un faible délai.

## Différences par rapport à RVC (expliquées simplement)

Le **RVC** classique a été conçu à l'origine pour convertir des fichiers audio complets, pas des flux en direct :

1. RVC capture un bloc de votre voix, le convertit et le raccorde au bloc précédent par un **fondu enchaîné (crossfade)**.
2. Quand vous réduisez la taille du bloc pour baisser la latence, RVC manque de contexte : la qualité et la justesse de hauteur chutent. Si vous tenez une note ou allongez un mot, on entend souvent les raccords entre blocs sous forme de tremblements.

**Causal Voice Changer (CVC)** fonctionne autrement :

- Il est **causal** : il convertit l'audio en continu à mesure qu'il arrive, en regardant surtout en arrière avec un tampon de lookahead de seulement **50 ms** sur la base 100 Hz v4 (`60 ms` sur les anciennes voix 50 Hz).
- Comme il diffuse en continu au lieu de coller des blocs séparés, **les sons tenus et les notes longues restent fluides**, sans coupures ni tremblements.
- Vous conservez presque toute la qualité de RVC avec une latence bien plus basse (souvent autour de **130 ms de bout en bout** sous Linux avec l'audio JACK).

## Avis important sur la licence et l'usage commercial

Bien que le code source de CVC soit sous licence **MIT**, le modèle de base pré-entraîné inclus a été entraîné sur **EARS (CC BY-NC)**, **VCTK** et **LibriTTS-R**.

> **Usage non commercial uniquement** : en raison du jeu de données EARS, vous **ne pouvez pas** utiliser le modèle de base pré-entraîné inclus - ni **aucune voix affinée à partir de celui-ci** - à des fins commerciales.

## Plateformes et matériel pris en charge

| Plateforme | Interface | Support GPU / Backend |
| --- | --- | --- |
| **Windows 10/11 (x64)** | WinUI 3 (acrylic) ou repli Tk | **NVIDIA** (CUDA), **AMD Radeon RX 7000/9000 / PRO W7000 / Ryzen AI** (ROCm 7.2.1), **AMD RX 6000 / PRO W6000** (`rocm-rdna2` nightly) ; les Radeon plus anciennes tournent sur CPU (réglez Chunk ≥ `60 ms`) |
| **Linux (x86_64)** | COSMIC (Rust) ou repli Tk | glibc 2.35+ (Ubuntu 22.04, Debian 12 ou plus récent) ; NVIDIA / AMD ; **JACK / PipeWire** recommandé pour la latence minimale |

## Ce que vous pouvez faire avec CVC

- **Entraîner vos propres voix** à partir d'audio brut sans découper manuellement les fichiers ni supprimer les silences, à n'importe quelle fréquence d'échantillonnage.
- **Partager facilement des voix** sous forme de fichiers `.cvc` autonomes (glisser-déposer dans la fenêtre live).
- **Convertir votre micro en direct** avec des interfaces natives Windows/Linux, réduction de bruit intégrée (**Hushwire** ou **RNNoise**), Pitch match, mesure LUFS et enregistrement.
- **Convertir des fichiers audio complets** hors ligne via `causalvc.infer` ou la source fichier de l'app live.
