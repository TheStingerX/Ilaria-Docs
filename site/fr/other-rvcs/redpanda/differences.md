# Redpanda-vc vs Autres Versions RVC - Comparatif Complet

[Configurer Redpanda-vc](first-run.md) · [Entraîner des modèles RVC (EMA & Steps)](training.md) · [Tester l'audio en direct](live-audio.md)

Ce guide compare **Redpanda-vc** à **RVC Mainline**, **Applio** et **Ilaria RVC** d'après l'inspection directe des branches `main`.

---

## Qu'est-ce qui distingue Redpanda-vc ?

Ces logiciels ne sont **pas** des versions successives d'un même programme :

- **RVC :** Famille d'architectures de conversion vocale.
- **RVC Mainline :** L'implémentation de référence d'origine (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio :** Application enrichie autour de RVC (interface, vocoders, outils).
- **Redpanda-vc :** Fork d'**Applio** (`redpanda343/Redpanda-vc`) ajoutant Generator EMA, sauvegarde RVC par étapes, **Rectified Flow**, **Beatrice 2** et **entraînement dédié de vocoders**.
- **Ilaria RVC :** Implémentation personnalisée basée sur RVC Mainline (`TheStingerX/Ilaria-RVC`) avec `Training Target: Steps`, RefineGAN/MRF HiFi-GAN, Audio Analyzer, Voice Blender et TTS.

---

## Tableau comparatif général

| Fonctionnalité | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **Different implementation** *(UI axée `RVC (V2)` / `Applio`)* | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Entraînement RVC** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Entraînement par époques** | **Yes** | **Yes** | **Different implementation** *(cible en steps)* | **Yes** |
| **Cible en steps** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Checkpoints par époques** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** | **Yes** (`save_every_epoch`) |
| **Checkpoints par steps** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(sauvegarde par époques ; partiel à l'arrêt/fin)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Reprise (`G`/`D`)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Export `.pth` intermédiaires** | **Yes** | **Yes** (`save_every_weights`) | **Yes** (`Save Every Weights`) | **Yes** *(époques complètes `save_every_epoch`)* |
| **Rectified Flow** | **No - verified** | **No - verified** | **Yes** | **No - verified** |
| **Beatrice 2 (entraînement)** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(extracteur F0 uniquement)* |
| **Entraînement vocoder dédié** | **No - verified** | **No - verified** | **Yes** (`tabs/train/nsf_hifigan.py`) | **No - verified** |
| **HiFi-GAN / RefineGAN / MRF** | HiFi-GAN only | **Yes** (tous 3) | **Yes** (tous 3) | **Yes** (RefineGAN 32 kHz) |
| **Warmup & LR Schedule** | Exponentiel par époque | Exponentiel par époque | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | Exponentiel par époque |
| **Temps réel** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Desktop + WebSocket/HTTP + multi-GPU concurrent) | **No - verified** *(hors ligne uniquement)* |
| **Multi-famille** | **No - verified** | **Partial** *(RVC + Applio)* | **Yes** *(RVC + Rectified Flow + Beatrice)* | **No - verified** |
| **Systèmes** | Windows / Linux / macOS | Windows / Linux / macOS | Windows / Linux / macOS | Windows / Linux |

---

## Détails clés et compatibilité

- **Generator EMA (`rvc/train/train.py`) :** Moyenne mobile exponentielle du générateur (`Generator EMA Decay` `0`–`0.9999`, défaut `0.999`), absente des trois autres dépôts. Lisse les variations entre steps sans garantir une meilleure qualité ni empêcher l'overfitting. Voir [Entraîner des modèles RVC dans Redpanda-vc](training.md).
- **Steps vs Époques :** Redpanda-vc sauvegarde `G`/`D` et `.pth` selon `Save Every X Steps` (`1000`). **Ilaria RVC** possède `Training Target: Steps`, mais sa fréquence de sauvegarde et ses exports `.pth` intermédiaires restent basés sur des époques complètes (`save_every_epoch`).
- **Rectified Flow & Beatrice 2 & Vocoder :** Rectified Flow s'inspire de DiffSinger avec des traits ContentVec (`standard`, `meanflow`, `smaller`) et nécessite un vocoder (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN`, `Vocos`) entraînable dans l'onglet Vocoder ; ce n'est **pas** du RVC V2 même avec l'extension `.pth`. Beatrice 2 est un moteur CPU distinct.
- **Temps réel multi-GPU :** Permet de lancer un flux par GPU en parallèle dans la WebUI, sans accélérer un flux unique.

| Type de modèle | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Autres clients |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** *(focus V2)* | **Yes** | **Yes** |
| **RVC V2 RefineGAN / MRF** | **Yes** | **No - verified** | **Yes** | **Yes** | **No - verified** |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Beatrice 2 (dossier)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(clients Beatrice)* |

---

## Quel programme choisir ? & Sources

Choisissez **RVC Mainline** pour la référence d'origine, **Applio** pour son écosystème standard par époques, **Redpanda-vc** pour EMA / sauvegarde par steps / Rectified Flow / Beatrice 2 / vocoders / temps réel multi-flux, et **Ilaria RVC** pour un studio hors ligne avec `Training Target: Steps`, `Audio Analyzer` et `Voice Blender`.

Vérifié sur `main` le **2026-11-22** : [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) (`55a3a80`) · [Applio](https://github.com/IAHispano/Applio) (`445b0f6`) · [RVC Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) (`81eed5e`) · [Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC) (`a887ba5`).
