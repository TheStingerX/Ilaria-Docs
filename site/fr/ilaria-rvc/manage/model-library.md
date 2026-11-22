# Bibliothèque et fusion de modèles

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Autres panneaux](other-buttons.md)

## Matrice de compatibilité des formats

| Fichier / Ressource | Usage | Opérations compatibles dans Ilaria RVC | Guide |
| --- | --- | --- | --- |
| **`.pth` d'inférence** | Conversion vocale | Inférence simple/lot, Voice Blender, Safetensors | [Fichiers `.pth`](../../start/pth-files.md) |
| **Checkpoints (`G_*.pth` / `D_*.pth`)** | Reprise d'entraînement | Reprise RVC v2 uniquement (non utilisable en inférence) | [Procédure d'entraînement](../train/training-workflow.md) |
| **Index (`added_*.index`)** | Récupération de timbre | Inférence (avec son `.pth` associé) | [Fichiers Index](../../start/indexes.md) |
| **Modèles `.onnx`** | Moteurs temps réel ONNX | Pour clients externes DirectML (AMD/Intel) | [Fichiers `.onnx`](../../start/onnx-files.md) |
| **`.safetensors`** | Stockage sûr des poids | Conversion via **Safetensors Converter** | [Convertisseur Safetensors](safetensors-converter.md) |
| **Embedders** | Extraction de caractéristiques | Inférence et Entraînement | [Embedders](../../start/embedders.md) |
| **Pretrained G/D** | Poids de base | Entraînement RVC uniquement | [Modèles pré-entraînés](../../start/pretrained.md) |
| **Voice Blender** | Fusion de deux voix | Fusionne deux `.pth` d'inférence compatibles | [Voice Blender](voice-blender.md) |

> **Pourquoi un checkpoint n'est PAS un modèle d'inférence :** `G_*.pth` et `D_*.pth` dans `app/logs/` contiennent l'état d'entraînement ; utilisez toujours le `.pth` d'inférence exporté (~40–110 Mo) dans `models/`.

## Importer, inspecter et sécurité

1. Ouvrez **Other → Import local models** (ou téléchargez via URL).
2. Gardez `.pth` et `added_*.index` ensemble, actualisez et vérifiez **Model information**.
3. **Sécurité :** Les `.pth` utilisent `pickle` : téléchargez uniquement depuis des sources sûres ou utilisez `.safetensors`.

## Fusionner des voix compatibles

Choisissez deux `.pth` d'**inférence** compatibles dans [Voice Blender](voice-blender.md) et testez avec `Index Ratio = 0`.
