# Benchmarks et Comparaison des Performances

Ne vous fiez pas aux suppositions : mesurez votre matériel avec des **tests A/B reproductibles** en ne changeant **qu'une seule variable à la fois**.

## 1. Métriques à relever

### Entraînement

- **Pas par seconde et durée par époque** (journal d'entraînement / TensorBoard).
- **Utilisation VRAM** (`nvidia-smi` ou Gestionnaire des tâches) selon **Batch Size**, **Précision** et **GPU Caching**.
- **Consommation et température** (`nvidia-smi -i 0 -q -d PERFORMANCE`) pour repérer tout **throttling**.

### Inférence et temps réel

- **Temps d'inférence et Real-Time Factor (RTF) :** Durée de conversion divisée par la durée audio (`RTF < 1.0` = plus rapide que le temps réel).
- **GPU Delay vs Latence de bout en bout :** Le **GPU Delay** ne mesure que le calcul GPU par bloc ; la **latence totale** inclut micro, **Block Size**, crossfade, câble virtuel et tampons Discord/OBS/jeu.

## 2. Protocole A/B reproductible

1. **Référence (Test A) :** Rétablissez les réglages par défaut, gardez le même modèle et le même extrait/texte.
2. **Stabilisez et mesurez :** Testez assez longtemps pour inclure la chauffe (**10–15 minutes** en direct ou plusieurs époques complètes).
3. **Changez un seul paramètre (Test B)** à charge GPU identique.
4. **Comparez objectivement :**

| Métrique | Référence (Test A) | Variante (Test B) |
| --- | --- | --- |
| Durée d'époque / Pas par sec (Entraînement) | `____` | `____` |
| **GPU Delay** moyen et pic max (Direct) | `____ ms / ____ ms` | `____ ms / ____ ms` |
| Coupures / craquements | `Oui / Non (nombre)` | `Oui / Non (nombre)` |
| Pic VRAM et température GPU | `____ Go / ____ °C` | `____ Go / ____ °C` |
| Throttling observé | `Oui / Non` | `Oui / Non` |

5. **Ne conservez que les gains prouvés :** Sans amélioration mesurable, revenez au Test A.
