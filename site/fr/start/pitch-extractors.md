# Pitch Extractors RVC (Méthodes F0)

Un **pitch extractor** (ou **méthode d'extraction F0**) est l'algorithme ou le réseau neuronal qui suit la fréquence fondamentale (hauteur, mélodie et intonation) de la voix source au fil du temps.

Tandis que l'[embedder](embedders.md) lit *quels mots et phonèmes* sont prononcés ou chantés, le **pitch extractor** mesure *à quel point la voix est grave ou aiguë* à chaque milliseconde.

!!!tip
**Bonne nouvelle côté compatibilité :**
Contrairement aux embedders, **les pitch extractors ne vous enferment pas dans un seul choix**. Même si un modèle a été entraîné avec `rmvpe` au prétraitement, vous pouvez passer librement entre `rmvpe`, `rmvpe_gpu`, `fcpe` ou `crepe` en inférence et en direct sans casser la compatibilité.
!!!

## Recommandation rapide

- **Meilleur choix global (Entraînement et Conversion) :** `rmvpe` ou `rmvpe_gpu` (si vous avez un GPU NVIDIA).
- **Meilleur pour Voice Changer en direct / Temps réel :** `fcpe` (latence minimale) ou `rmvpe` (qualité maximale si votre GPU suit).
- **À éviter en usage normal :** `pm`, `dio` et `harvest` sont d'anciennes méthodes CPU nettement moins bonnes ou bien plus lentes que `rmvpe` et `fcpe`.

---

## Comparatif de tous les Pitch Extractors connus

| Pitch Extractor | Type | Vitesse | Qualité et meilleur usage | Notes |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Réseau neuronal | Rapide | **Meilleur standard polyvalent** pour parole, chant et extraction F0 de dataset. | Gère consonnes, souffles et légère réverbération bien mieux que les anciennes méthodes. |
| **`rmvpe_gpu`** | Réseau neuronal (GPU CUDA) | **Très rapide** | Même haute précision que `rmvpe`, exécutée de force sur votre GPU NVIDIA plutôt que sur le CPU. | Idéal dans Ilaria RVC / RVC WebUI pour longs fichiers, lots et prétraitement rapide. Exige assez de VRAM libre. |
| **`fcpe`** | Réseau neuronal | **Ultra rapide** | **Meilleur pour le temps réel / direct** et l'inférence à faible latence. | Un peu plus léger que `rmvpe` ; parfait si `rmvpe` provoque des coupures en direct. |
| **`crepe` / `crepe-full`** | Réseau neuronal | Lent | Très précis sur le chant solo propre et le vibrato. | Beaucoup plus lourd sur GPU/CPU que `rmvpe`. Souvent trop lent pour le direct. |
| **`crepe-tiny`** | Réseau neuronal (petit) | Rapide | Version allégée de `crepe` pour anciens PC. | Moins précis que `rmvpe` et `fcpe` ; largement remplacé par `fcpe`. |
| **`harvest`** | DSP classique (WORLD) | Très lent (CPU) | Ancienne méthode pour parole propre. | Sujet aux sauts d'octave et artefacts métalliques sur chant ou audio bruité. Nécessite souvent `filter_radius`. |
| **`pm`** | DSP classique (Parselmouth) | Ultra rapide (CPU) | Aperçus rapides sur PC très faibles sans GPU. | Décroche facilement sur le chant, les chuchotements ou voix bruitées. |
| **`dio`** | DSP classique (WORLD) | Très rapide (CPU) | Ancienne solution CPU rapide. | Moins précis que `rmvpe` et `fcpe` ; déconseillé pour un rendu final. |
| **`hybrid[...]`** | Méthodes combinées | Lent | Combine deux extracteurs (ex. `hybrid[rmvpe+fcpe]` ou `hybrid[crepe+rmvpe]`). | Dispo dans Applio et certains forks pour lisser les sauts d'octave sur chant difficile, mais plus lent. |
| **Variantes `swift` / `onnx`** | Léger / ONNX | Très rapide | Extracteurs optimisés présents dans des forks récents (Applio, Deiteris). | Utiles sur CPU ou DirectML où PyTorch standard est plus lent. |

## `rmvpe` vs `rmvpe_gpu` : quelle différence ?

Dans des applis comme **Ilaria RVC** et **RVC Mainline**, on trouve souvent `rmvpe` et `rmvpe_gpu` :
- **`rmvpe`** peut tourner sur CPU ou selon l'ordonnancement par défaut de l'app, utilisant moins de VRAM mais étant plus lent sur longs fichiers ou gros datasets.
- **`rmvpe_gpu`** exécute explicitement RMVPE sur votre **GPU CUDA**, offrant exactement la même qualité de hauteur mais bien plus vite pour l'extraction F0 et la conversion hors ligne.
- Si `rmvpe_gpu` déclenche `CUDA out of memory` sur une carte à faible VRAM (4 Go ou moins), repassez à `rmvpe` ou `fcpe`.

## Lequel choisir selon votre besoin

1. **Préparer / Entraîner un nouveau modèle :** Utilisez **`rmvpe_gpu`** (si GPU NVIDIA avec 6+ Go de VRAM) ou **`rmvpe`**. Un suivi F0 propre évite les défauts de justesse dans la voix finale.
2. **Convertir des chansons ou voix off hors ligne :** Commencez avec **`rmvpe`** ou **`rmvpe_gpu`**. Testez `crepe-full` ou `hybrid` uniquement si une note aiguë précise fait un saut d'octave.
3. **Micro en direct / Discord :** Commencez avec **`fcpe`** pour la latence la plus basse, ou **`rmvpe`** si votre GPU gère votre chunk size sans grésillement.
