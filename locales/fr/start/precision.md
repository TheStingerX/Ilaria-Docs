---
label: "⚡ Précision"
order: 89
permalink: /precision/
description: "Guide simple sur la précision dans RVC (FP16, FP32 et BF16) : signification, compatibilité GPU, entraînement vs inférence et solutions aux erreurs NaN ou HalfTensor."
---
# Précision en Entraînement et Inférence (`FP16`, `FP32`, `BF16`)

Lors de l'entraînement ou de la conversion vocale dans RVC, vous verrez souvent un réglage nommé **Precision** (avec des options comme `FP32`, `FP16` et `BF16`).

Pour un débutant, ces sigles semblent techniques, mais l'idée est très simple. Ce guide explique chaque mode, lequel convient à votre carte graphique et comment éviter les erreurs fréquentes.

---

## 1. Qu'est-ce que la « Précision » en mots simples ?

Un modèle vocal IA est composé de millions de nombres décimaux (appelés **poids**). À chaque entraînement ou conversion, votre GPU multiplie des millions de ces nombres par seconde.

La **Précision** détermine simplement **le niveau de détail de chaque nombre** (combien de bits de mémoire il utilise) :

- **`FP32` (Pleine précision, 32 bits) :** Garde tout le détail décimal et une plage énorme de valeurs. C'est le mode le plus sûr et universel, **mais** il consomme plus de VRAM et tourne plus lentement.
- **`FP16` (Demi-précision, 16 bits) :** Utilise moitié moins de mémoire que `FP32` et va bien plus vite sur les GPU NVIDIA récents. Comme sa plage numérique est plus petite, des pics extrêmes peuvent parfois déborder (`NaN loss`). Il pose aussi problème sur anciennes GTX 10, DirectML (AMD/Intel) et CPU.
- **`BF16` (Brain Float 16, 16 bits) :** Utilise la **même faible mémoire que `FP16`**, **mais** garde la grande plage sûre du `FP32` (en sacrifiant quelques décimales infimes). En bref : `BF16` offre la vitesse et la faible VRAM du `FP16` avec presque la stabilité du `FP32`.

!!!tip
**Règle simple :**
Voyez **`FP32`** comme un camion robuste qui ne cale jamais, **`FP16`** comme une voiture de sport rapide qui exige une route lisse (audio propre), et **`BF16`** comme une sportive moderne avec suspension tout-terrain (rapide, légère en VRAM et très difficile à faire planter).
!!!

---

## 2. Comparatif `FP32` vs `FP16` vs `BF16`

| Caractéristique | `FP32` (Single / Full) | `FP16` (Half Precision) | `BF16` (Brain Float 16) |
| --- | --- | --- | --- |
| **Mémoire par nombre** | 32 bits (plus grand) | 16 bits (moitié) | 16 bits (moitié) |
| **Vitesse d'entraînement** | Plus lente | **Rapide** (sur Tensor Cores) | **Rapide** (sur Tensor Cores RTX 30+) |
| **Consommation VRAM** | Plus élevée | **Faible (~40-50 % en moins)** | **Faible (~40-50 % en moins)** |
| **Risque de crash `NaN loss`** | Minimal (quasi nul) | Modéré (si le dataset sature) | **Très faible** (même plage sûre que `FP32`) |
| **Compatibilité matérielle** | **Tout** (tous GPU, DirectML, CPU) | NVIDIA GTX 16 / RTX 20+ / T4 (instable/cassé sur GTX 10, DirectML, CPU) | **NVIDIA RTX 30 / 40 / 50**, A100, L4, H100 (pas sur RTX 20, GTX 16, T4, GTX 10) |
| **Qualité vocale finale** | Référence standard | Pratiquement identique | Pratiquement identique |

---

## 3. Quelle Précision choisir ? (Selon votre GPU)

Le bon choix dépend presque uniquement de **votre carte graphique** :

### NVIDIA RTX série 30 / 40 / 50 (et A100 / L4 / H100)
- **Meilleur choix :** **`BF16`** (si votre application RVC le propose, comme **Ilaria RVC** ou **Applio**). Entraînement rapide, faible VRAM et bien moins de crashs `NaN` qu'en `FP16`.
- **Alternative :** **`FP16`** fonctionne aussi très bien si `BF16` n'est pas affiché.

### NVIDIA RTX série 20, GTX série 16 ou T4 Cloud (Colab / Kaggle)
- **Meilleur choix :** **`FP16`**. Ces cartes n'ont pas le support matériel `BF16`, donc `FP16` offre le meilleur gain en vitesse et VRAM.
- **Quand changer :** Si vous obtenez `NaN loss`, vérifiez l'absence de saturation dans le dataset ou passez en **`FP32`**.

### NVIDIA GTX série 10 (1060, 1070, 1080 Ti) ou plus anciennes
- **Meilleur choix :** **`FP32` uniquement**. Les GTX série 10 (Pascal) n'ont pas de Tensor Cores `FP16` rapides ; forcer `FP16` déclenche souvent des erreurs `HalfTensor` ou tourne même *plus lentement* que `FP32`.

### GPU AMD / Intel (DirectML) ou CPU seul
- **Meilleur choix :** **`FP32` uniquement**. DirectML et CPU plantent généralement en `FP16` ou `BF16` avec `expected scalar type Half but found Float`.

---

## 4. Précision d'Entraînement vs Export / Inférence

Les débutants confondent souvent la **précision d'entraînement** et la **précision d'export/inférence** :

### Pendant l'Entraînement (Mixed Precision / AMP)
- Les outils RVC modernes utilisent l'**Automatic Mixed Precision (AMP)** quand vous choisissez `FP16` ou `BF16` : les calculs lourds passent en 16 bits pour la vitesse tandis que les valeurs maîtresses restent protégées en 32 bits.
- Entraîner en `BF16` ou `FP16` **ne dégrade pas** la voix finale : un modèle bien entraîné en `BF16`, `FP16` ou `FP32` sonne quasiment à l'identique.

### Pendant l'Inférence, l'Export et Voice Blender
- **Inférence / sauvegarde `.pth` en `FP16` :** Divise environ par deux la taille du `.pth` (45-55 Mo au lieu de 95-110 Mo) et tourne plus vite sur GPU NVIDIA CUDA sans perte audible.
- **Inférence / sauvegarde `.pth` en `FP32` :** Crée un `.pth` plus lourd, **mais** fonctionne partout (y compris GTX 10, DirectML et CPU).
- Vous pouvez tout à fait utiliser un `.pth` exporté en `FP16` dans une app réglée sur `FP32` (conversion automatique au chargement), ou choisir `fp16`/`fp32` dans [Voice Blender](../ilaria-rvc/manage/voice-blender.md).

---

## 5. Erreurs de Précision courantes et solutions

| Erreur ou Symptôme | Cause | Comment corriger |
| --- | --- | --- |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | `FP16` était activé sur un GPU ou backend non compatible (GTX 10, DirectML ou CPU). | Désactivez **`FP16`** dans les réglages et passez en **`FP32`**. |
| `BF16 is not supported on this device` | Vous avez choisi `BF16` sur un GPU plus ancien (RTX 20, GTX 16, T4, GTX 10) ou CPU. | Passez en **`FP16`** (sur RTX 20 / GTX 16 / T4) ou **`FP32`** (sur GTX 10 / DirectML / CPU). |
| `NaN loss` ou modèle exporté muet pendant un entraînement `FP16` | Audio saturé ou gradients extrêmes ayant débordé la plage `FP16`. | Vérifiez votre dataset avec [Dataset Checker](../ilaria-rvc/train/datasets.md), puis passez en **`BF16`** (RTX 30+) ou **`FP32`** sur un nouvel essai. |
| `CUDA out of memory` en entraînant en `FP32` | `FP32` consomme environ deux fois plus de VRAM par batch que le 16 bits. | Réduisez **Batch Size** (ex. `4` -> `2` -> `1`) ou passez en **`BF16`** / **`FP16`** si votre GPU le permet. |
