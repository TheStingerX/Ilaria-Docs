# Changelog de Causal Voice Changer

[Releases sur GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

## v0.4.2.1 (24/11/2026)

Corrige la brève dégradation du son après un changement de voix en direct.

[GitHub: v0.4.2.1](https://github.com/mojowozo/Causal-Voice-Changer/releases/tag/v0.4.2.1)

---

## v0.4.2 (24/11/2026)

Prépare la nouvelle voix en arrière-plan et bascule au bloc suivant. Le noise gate commun intervient après Hushwire ou RNNoise. Le filtrage d’entrée et la gestion des crêtes évoluent aussi.

[GitHub: v0.4.2](https://github.com/mojowozo/Causal-Voice-Changer/releases/tag/v0.4.2)

---

## v0.4.1 (22/11/2026)

Déplace le noise gate vers **Audio**, permet une sortie ASIO mono et corrige le Markdown dans l’outil de mise à jour.

[GitHub: v0.4.1](https://github.com/mojowozo/Causal-Voice-Changer/releases/tag/v0.4.1)

---

## v0.4.0 (22/11/2026)

Ajoute les blocs de 10 ms, un seuil de hauteur facultatif, un noise gate plus progressif et un affichage de latence corrigé. Aucun réentraînement nécessaire.

[GitHub: v0.4.0](https://github.com/mojowozo/Causal-Voice-Changer/releases/tag/v0.4.0)

---

## v0.3.3.1 (21/11/2026)

- **Support d'anciens GPU NVIDIA :** Ajout de la prise en charge des cartes NVIDIA écartées par CUDA 13 (séries GeForce GTX 900/10, TITAN X/Xp/V, Quadro M/P) via la build PyTorch CUDA 12.6 (`cuda-pascal` / `run-realtime-gtx10.bat` / `run-training-gtx10.bat`).

---

## v0.3.3 (21/11/2026)

- **Stabilité temps réel :** Amélioration des performances afin qu'une période glottique ne dépasse pas la période causale (`10 ms`) ni ne dégrade l'audio (aucune reconstruction de modèle requise).
- **Correctifs Windows et mise à jour :** Correction de la transparence sous Windows et d'un bug pouvant relancer l'ancien moteur après une mise à jour.

---

## v0.3.2 (20/11/2026)

- Version mineure améliorant la qualité sonore globale en entraînement et en inférence temps réel.

---

## v0.3.1 (20/11/2026)

### Nouveautés
- Ajout d'un **outil de mise à jour intégré** directement dans l'application. La vérification automatique est activée par défaut et peut être coupée dans la page **About**.

### Correctifs et améliorations
- Correction d'un bug sous Windows pouvant empêcher la détection des GPU.
- Amélioration du traitement temps réel pour les voix graves afin d'améliorer le rendu.

---

## v0.3.0 (19/11/2026)

Fait passer le modèle de base 100 Hz par défaut en **v4 (`causalvc-base-v4-100hz`)** en conservant 50 ms de latence modèle et le support complet des CUDA Graphs.

- **Rires, soupirs et chuchotements améliorés :** Remplacement du basculement binaire voisé/non-voisé par une confiance continue de périodicité (`0..1`).
- **Conditionnement spectral CUDA-Graph et ancrage L2-SP :** Les voix entraînées sur parole calme gardent des rires et chuchotements naturels.
- **Plage de pitch élargie (`32 Hz - 1400 Hz`) :** Suivi du vocal fry profond jusqu'aux notes soprano avec adaptation naturelle du registre vers le haut.
- **Rejet des silences morts et clics micro :** Perte dédiée au plancher de silence réduisant les clics non voisés d'environ 33-40 dB même sans *Ignore background sounds*.
- **Compatibilité transparente :** Les installations existantes mettent automatiquement à jour `weights/causalvc-base/` et les anciennes voix `.cvc` (50 Hz et 100 Hz) continuent de fonctionner.

---

## v0.2.0 (19/11/2026)

Passe le modèle de base par défaut et le front-end streaming de **50 Hz (20 ms)** à **100 Hz (10 ms)**.

- **Latence réduite (`50 ms`) :** Basé sur `causalvc-base-v3-100hz`, réduisant le délai algorithmique de `60 ms` à `50 ms` tout en doublant la résolution sur consonnes rapides et respirations.
- **Suppression de l'aliasing harmonique :** Roll-off Nyquist lissé (`exc="bandlimit"`) et interpolation fractionnelle continue du pitch (`smooth_in="p"`).
- **Suivi des notes aiguës (`350-1000+ Hz`) :** Pitch tracker re-distillé (`-3` à `+14` demi-tons) et encodeur étendu (EARS + VCTK + LibriTTS-R) évitant décrochages et sauts d'octave.
- **Correctifs entraînement et `.cvc` :** Correction du bug `--perturb` sur fichier unique, détection automatique de bande passante (`detect_fmax`) pour sources 16/24 kHz, bascule **Random microphone colour** et inclusion auto des encodeurs personnalisés (~46 Mo).
- **Streaming CUDA Graph :** Support complet CUDA Graph 100 Hz jusqu'aux blocs de `10 ms` / `20 ms`.

---

## v0.1.1 (17/11/2026)

- **Fenêtres précompilées dans les releases :** Les archives Windows (`.zip`) et Linux (`.tar.gz`) incluent déjà les fenêtres prêtes à lancer sans nécessiter `.NET 10 SDK` ni `Rust`.
- **Correctif AMD Radeon RX 6000 sous Windows :** Correction de l'ordre de chargement des bibliothèques avant PyTorch pour démarrer ROCm (`"The engine is not available"` / erreur Windows `1114`).
- **Correctifs lanceur :** Utilise toujours l'environnement Python installé par les lanceurs, affiche les détails Python/PyTorch en cas d'erreur et respecte `CAUSALVC_GPU`.

---

## v0.1.0 (17/11/2026)

Première version publique de **Causal Voice Changer** :
- Changeur de voix streaming 48 kHz avec look-ahead de 60 ms.
- **Application d'entraînement** (`run-training.bat` / `run-training.sh`) en `bfloat16` avec file d'attente et sans découpage manuel des silences.
- **Application temps réel** (`run-realtime.bat` / `run-realtime.sh` - WinUI 3 sous Windows, COSMIC sous Linux) avec pitch/Index par voix, Hushwire/RNNoise, **Soften sudden treble**, CUDA Graphs, enregistrement, entrée fichier et ASIO sous Windows.
- Format unique `.cvc` et support GPU NVIDIA CUDA et AMD ROCm.
- **Note de licence :** Modèle de base entraîné sur EARS, VCTK et LibriTTS-R (usage non commercial à cause d'EARS).
