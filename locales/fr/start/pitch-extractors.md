---
label: "🎵 Pitch extractors"
order: 92
permalink: /pitch-extractors/
description: "Un pitch extractor (ou méthode d'extraction F0) est l'algorithme ou le réseau neuronal qui suit la fréquence fondamentale (hauteur, mélodie et intonation) de la voix source au fil du temps."
---
# Pitch Extractors RVC (Méthodes F0)

Un **pitch extractor** (ou **méthode d'extraction F0**) est l'algorithme ou le réseau neuronal qui suit la fréquence fondamentale (hauteur, mélodie et intonation) de la voix source au fil du temps.

Tandis que l'[embedder](embedders.md) lit *quels mots et phonèmes* sont prononcés ou chantés, le **pitch extractor** mesure *à quel point la voix est grave ou aiguë* à chaque milliseconde.

!!!tip
**Compatibilité :**
Contrairement aux embedders, **les pitch extractors ne vous enferment pas dans un seul choix**. Même si un modèle a été entraîné avec `rmvpe` au prétraitement, vous pouvez passer librement entre `rmvpe`, `rmvpe_gpu`, `fcpe` ou `crepe` en inférence et en direct sans casser la compatibilité.
!!!

## Recommandation rapide (Spécifique à Ilaria RVC)

- **Inférence Simple et par Lots (CUDA) :** Ilaria RVC propose `rmvpe`, `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest` et `crepe`. **`rmvpe`** est le point de départ par défaut dans l'interface.
- **Inférence DirectML (AMD / Intel) :** Seuls `pm`, `harvest`, `rmvpe` et `fcpe` sont exposés.
- **Extraction des traits en Entraînement :** `rmvpe_gpu` (ainsi que `dio`) apparaît dans l'onglet **Training** pour le prétraitement du dataset, pas dans les menus d'Inférence.
- **Voice Changer en direct / Temps réel :** `fcpe` ou `swift` offrent un suivi plus léger pour limiter les coupures à faible latence ; aucune option unique n'est universellement meilleure pour chaque voix ou prise.

---

## Comparatif de tous les Pitch Extractors connus

| Pitch Extractor | Type | Vitesse | Qualité et meilleur usage | Notes |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Réseau neuronal | Rapide | **Valeur par défaut dans Ilaria RVC** pour parole, chant et extraction F0. | Gère consonnes, souffles et légère réverbération bien mieux que les méthodes classiques. |
| **`rmvpe_gpu`** | Réseau neuronal (GPU CUDA) | **Très rapide** | Même architecture RMVPE exécutée explicitement sur GPU NVIDIA pendant le prétraitement d'**Entraînement**. | Exige assez de VRAM libre ; absent du sélecteur d'Inférence Simple/Lots dans Ilaria RVC. |
| **`fcpe`** | Réseau neuronal | **Ultra rapide** | **Option rapide pour le temps réel** et l'inférence à faible latence. | Un peu plus léger que `rmvpe` ; utile si `rmvpe` provoque des coupures en direct. |
| **`crepe` / `crepe-full`** | Réseau neuronal | Lent | Très précis sur le chant solo propre et le vibrato. | Beaucoup plus lourd sur GPU/CPU que `rmvpe`. Souvent trop lent pour le direct. |
| **`crepe-tiny`** | Réseau neuronal (petit) | Rapide | Version allégée de `crepe` pour anciens PC. | Moins précis que `rmvpe` et `fcpe`. |
| **`harvest`** | DSP classique (WORLD) | Très lent (CPU) | Ancienne méthode pour parole propre. | Sujet aux sauts d'octave et artefacts métalliques sur chant ou audio bruité. Nécessite souvent `filter_radius`. |
| **Parselmouth (`pm`)** | DSP classique | Ultra rapide (CPU) | Aperçus rapides sur PC très faibles sans GPU. | Décroche facilement sur le chant, les chuchotements ou voix bruitées. |
| **`dio`** | DSP classique (WORLD) | Très rapide (CPU) | Ancienne solution CPU rapide (surtout utilisée en extraction d'entraînement). | Moins précis que `rmvpe` et `fcpe` ; déconseillé pour un rendu final. |
| **`hybrid[...]`** | Méthodes combinées | Lent | Combine deux extracteurs (ex. `hybrid[rmvpe+fcpe]` ou `hybrid[crepe+rmvpe]`). | Dispo dans Applio et certains forks pour lisser les sauts d'octave sur chant difficile, mais plus lent. |
| **`swift` / `beatrice` / ONNX** | Léger / ONNX | Très rapide | Extracteurs optimisés disponibles dans Ilaria RVC (CUDA) et forks récents. | Utiles comme alternative légère à `rmvpe` pour réduire la charge ou varier le suivi en parole/chant. |

## `rmvpe` vs `rmvpe_gpu` dans Ilaria RVC

Dans **Ilaria RVC**, ces deux noms correspondent à des étapes différentes :
- **`rmvpe`** est l'option disponible dans **Single Inference**, **Batch Inference** et **Training**.
- **`rmvpe_gpu`** est une option de l'onglet **Training** qui accélère l'extraction F0 du dataset sur GPU CUDA.
- Si `rmvpe_gpu` pendant l'entraînement déclenche `CUDA out of memory` sur une carte à faible VRAM (4 Go ou moins), passez à `rmvpe` ou `dio`.

## Lequel choisir selon votre besoin

1. **Préparer / Entraîner un nouveau modèle :** Utilisez **`rmvpe_gpu`** (si GPU NVIDIA avec 6+ Go de VRAM) ou **`rmvpe`**. Un suivi F0 propre évite les défauts de justesse dans la voix finale.
2. **Convertir des chansons ou voix off hors ligne :** Commencez avec **`rmvpe`** (par défaut dans Ilaria RVC). Testez `fcpe`, `swift`, `beatrice` ou `crepe` si vous entendez des sauts d'octave ou une instabilité sur certaines notes.
3. **Micro en direct / Discord :** Commencez avec **`fcpe`** ou **`rmvpe`** selon ce que votre GPU gère sans grésillement avec votre chunk size.
