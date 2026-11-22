# Performances GPU et Dépannage

La conversion vocale et l'entraînement RVC dépendent du calcul GPU, de la bande passante mémoire et d'une planification stable.

## 1. Métriques GPU essentielles

- **Utilisation GPU :** À l'**entraînement**, 80–99 % est normal. En **temps réel**, la charge arrive par rafales ; si un jeu sature le GPU à 95–100 %, l'audio attend et craque.
- **VRAM :** **Batch Size**, fréquence et **cache GPU du dataset** dictent la VRAM utilisée (`CUDA out of memory` en cas de saturation).
- **Température et Thermal Throttling :** Au-delà du seuil thermique, le GPU baisse ses fréquences, causant ralentissements ou pics de **GPU Delay**.
- **Limites d'énergie et portables :** Branchez le secteur et activez un profil performant.

## 2. Réglages les plus influents

| Réglage | Impact entraînement | Impact temps réel |
| --- | --- | --- |
| **Batch Size** | Lots plus grands = plus de VRAM ; baissez en cas d'OOM | Non utilisé en direct |
| **Block / Chunk Size** | Non utilisé à l'entraînement | Blocs plus grands = moins de coupures, plus de latence |
| **Précision (`FP32` / `FP16` / `BF16`)** | `BF16` (RTX 30/40/50) et `FP16` réduisent VRAM et durée ; `FP32` reste la base sûre | `FP16` accélère sur NVIDIA compatibles ; DirectML requiert souvent `FP32` |
| **Extracteur de hauteur (`rmvpe` / `fcpe`)** | `rmvpe` est la référence F0 | `fcpe` ou `rmvpe` sont rapides ; évitez `crepe` full en direct |

## 3. Résoudre les goulets d'étranglement courants

1. **Jeu + Changeur de voix en direct :** Plafonnez les FPS du jeu ou montez **Block Size** d'un cran.
2. **Windows HAGS :** Non nocif par défaut ; testez la désactivation uniquement en cas de saccades inexpliquées et comparez avant/après.
3. **Goulets CPU :** Alignez tous les périphériques sur `48000 Hz` et ajustez **Workers**.
4. **Pilotes et refroidissement :** Gardez des pilotes NVIDIA à jour et des grilles propres.

## 4. Optimisation avancée facultative (NVIDIA)

Sur GPU NVIDIA compatibles, le verrouillage d'horloge via `nvidia-smi` est un test **facultatif** ; voir [Optimisation avancée Vonovox](../other-rvcs/vonovox/advanced-performance-optimization.md).

[Estimateur de VRAM et d’entraînement](vram-estimator.md)
