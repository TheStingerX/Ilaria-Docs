---
label: "Installation et configuration"
icon: ":cd:"
order: 98
permalink: /non-rvc/causal-voice-changer/installation/
description: "Ce guide vous accompagne pas à pas pour installer Causal Voice Changer sous Windows ou Linux, même si vous n'avez jamais utilisé Python ou Git."
---
# Installer Causal Voice Changer

**Dernière version stable** · [v0.4.2.1](https://github.com/mojowozo/Causal-Voice-Changer/releases/tag/v0.4.2.1) · [Windows x64 ZIP](https://github.com/mojowozo/Causal-Voice-Changer/releases/download/v0.4.2.1/Causal-Voice-Changer-v0.4.2.1-windows-x64.zip) · [Linux x86_64 TAR.GZ](https://github.com/mojowozo/Causal-Voice-Changer/releases/download/v0.4.2.1/Causal-Voice-Changer-v0.4.2.1-linux-x86_64.tar.gz)

Ce guide vous accompagne pas à pas pour installer Causal Voice Changer sous **Windows** ou **Linux**, même si vous n'avez jamais utilisé Python ou Git.

> **Règle essentielle au premier lancement** : exécutez toujours **d'abord** le lanceur d'entraînement (`run-training.bat` sous Windows ou `run-training.sh` sous Linux), même si vous ne comptez utiliser que le changeur de voix en direct. Il installe Python, PyTorch pour votre GPU et les ~900 Mo de poids pré-entraînés nécessaires aux deux applications.

## 1. Télécharger CVC

Choisissez l'une des deux options :

### Option A : Version précompilée (Recommandée pour débuter)

1. Rendez-vous sur la [page Releases de Causal Voice Changer](https://github.com/mojowozo/Causal-Voice-Changer/releases).
2. Téléchargez l'archive correspondant à votre système :
   - **Windows** : `Causal-Voice-Changer-<version>-windows-x64.zip`
   - **Linux** : `Causal-Voice-Changer-<version>-linux-x86_64.tar.gz` *(nécessite glibc 2.35+, ex. Ubuntu 22.04, Debian 12 ou plus récent)*
3. Extrayez l'archive dans un dossier accessible en écriture (par exemple `D:\CausalVC` sous Windows).
   - *Note* : la release contient déjà les fenêtres compilées ; vous n'avez **pas** besoin d'installer le SDK .NET ni Rust manuellement.

### Option B : Depuis les sources (`git clone`)

Si vous clonez le dépôt avec `git clone https://github.com/mojowozo/Causal-Voice-Changer.git`, les fenêtres sont compilées automatiquement au premier lancement (et recompilées lorsque les sources changent) :
- **Windows** : installe automatiquement le **SDK .NET 10** dans `.dotnet` s'il est absent pour compiler l'app WinUI 3.
- **Linux** : compile l'interface COSMIC Rust avec `cargo`.
- Si une interface native ne peut pas être compilée, une fenêtre **Tk** plus simple s'ouvre automatiquement avec les fonctions principales.

## 2. Lancer l'installation initiale (`run-training`)

1. Ouvrez le dossier CVC extrait.
2. Lancez :
   - **Windows** : double-cliquez sur **`run-training.bat`**
     - L'application n'étant pas signée, Windows SmartScreen peut afficher *« Windows a protégé votre ordinateur »*. Cliquez sur **Informations complémentaires → Exécuter quand même**.
   - **Linux** : ouvrez un terminal dans le dossier et exécutez **`./run-training.sh`**
3. **Attendez l'installateur automatique** :
   - Il crée un environnement Python local (`.venv-win` sous Windows, `.venv` sous Linux) via **`uv`**.
   - Il installe la version de **PyTorch** adaptée à votre carte graphique.
   - Il télécharge le **modèle de base et les poids RMVPE** (environ **900 Mo**) dans le dossier `weights/`.
4. Une fois terminé, la **fenêtre d'entraînement** s'ouvre. Vous pouvez la fermer ou commencer à créer une voix !

## 3. Choix du GPU sous Windows (si nécessaire)

Sous Windows, `scripts/gpu-extra.ps1` détecte automatiquement votre GPU :
- **NVIDIA** : installe PyTorch **CUDA**.
- **AMD RX 7000 / 9000, PRO W7000, Ryzen AI** : installe PyTorch **ROCm** (`rocm`, nécessite AMD Software `26.2.2` ou plus récent).
- **AMD RX 6000 / PRO W6000** : installe la build nightly d'AMD (`rocm-rdna2`).
- **Radeon plus anciennes** : tournent sur **CPU** (en temps réel, réglez **Chunk** sur `60 ms` ou plus).

Si la détection automatique choisit le mauvais backend, définissez `CAUSALVC_GPU` avant de lancer le script :
- `CAUSALVC_GPU=cuda` (NVIDIA GTX 16 / RTX 20-50, CUDA 13)
- `CAUSALVC_GPU=cuda-pascal` (NVIDIA GTX 900/10, TITAN X/Xp/V, Quadro M/P, CUDA 12.6; un-realtime-gtx10.bat / un-training-gtx10.bat)
- `CAUSALVC_GPU=rocm`
- `CAUSALVC_GPU=rocm-rdna2`

*(Si vous exécutez des commandes `uv` manuellement sous Windows, ajoutez `--extra cuda`, `--extra cuda-pascal`, `--extra rocm` ou `--extra rocm-rdna2`.)*

## 4. Mettre à jour CVC

À partir de la version **v0.3.1**, CVC intègre un **outil de mise à jour** directement dans l'application. La vérification automatique est activée par défaut et peut être désactivée dans la page **About**. Les installations existantes mettent aussi à jour `weights/causalvc-base/` automatiquement au prochain lancement.

Lors d'une mise à jour manuelle ou depuis les sources :
- Sous Windows, depuis les sources, lancez `run-realtime.bat` / `run-training.bat` avec `CAUSALVC_REBUILD=1` si l'interface a changé.
- Sous Linux, l'interface Rust se recompile automatiquement au lancement suivant après une mise à jour.
