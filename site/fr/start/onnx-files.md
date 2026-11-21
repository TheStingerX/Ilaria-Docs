# Fichiers ONNX RVC (`.onnx`)

À côté des fichiers [`.pth`](pth-files.md) et [`.index`](indexes.md), vous rencontrerez parfois des **fichiers `.onnx`** avec les voice changers RVC.

Dans l'écosystème RVC, **les modèles `.onnx` sont généralement utilisés pour le temps réel sur cartes graphiques AMD et Intel** (via **DirectML** / ONNX Runtime sous Windows) ainsi que dans certains clients live multiplateformes.

---

## 1. Qu'est-ce qu'un fichier `.onnx` ?

**ONNX** (*Open Neural Network Exchange*) est un format ouvert et indépendant pour exécuter des réseaux neuronaux entraînés. Au lieu de dépendre de PyTorch et de NVIDIA CUDA, un `.onnx` tourne via **ONNX Runtime**, compatible avec différents GPU et systèmes.

C'est surtout utile dans les **voice changers en temps réel** (**Deiteris w-okada Fork**, **w-okada VCClient**, **RVC Mainline DirectML**) :
- Les GPU **AMD Radeon** et **Intel Arc / intégrés** ne peuvent pas utiliser NVIDIA CUDA.
- Exécuter un modèle `.onnx` via **ONNX Runtime + DirectML** permet aux cartes AMD et Intel d'accélérer la conversion en direct sous Windows.

---

## 2. `.onnx` vs `.pth` : différences clés

| Caractéristique | `.pth` (PyTorch) | `.onnx` (ONNX Runtime) |
| --- | --- | --- |
| **Usage principal** | Entraînement standard, conversion hors ligne et direct NVIDIA CUDA | **Changement de voix en temps réel**, surtout sur **GPU AMD et Intel (DirectML)** |
| **Entraînement / Reprise** | Les checkpoints bruts `G`/`D` peuvent reprendre l'entraînement | **Inférence uniquement** (impossible d'entraîner ou reprendre) |
| **Merge Models / Voice Blender** | Pris en charge (`.pth` compatibles) | **Non pris en charge** (impossible de fusionner des `.onnx`) |
| **Conversion Safetensors** | Prise en charge dans Ilaria RVC 2.4.5+ | **Non prise en charge** |
| **Métadonnées RVC internes** | Configuration vocale complète (`sr`, `f0`, `v1`/`v2`, vocodeur, embedder) | Graphe minimal de tenseurs ; le client doit correspondre au sample rate et à la version |

---

## 3. Comment obtenir un `.onnx` depuis un `.pth`

La plupart des voix RVC sont partagées en `.pth` et non en `.onnx`. Si vous avez besoin d'un `.onnx` :

1. **Conversion automatique en client live :** Certains outils temps réel (**w-okada**, **Deiteris**) acceptent un `.pth` directement ou le convertissent en `.onnx` pour DirectML.
2. **Export manuel en ONNX :** Des applications comme **Ilaria RVC**, **Applio** et **RVC Mainline** proposent une option **Export ONNX** pour convertir un `.pth` d'inférence en `.onnx`.
3. **Gardez toujours votre `.pth` d'origine :** Ne supprimez jamais le `.pth` et le `added_*.index` d'origine après export en `.onnx`, car un `.onnx` ne peut ni être fusionné, ni converti en `.safetensors`, ni utilisé dans les outils PyTorch classiques.

---

## 4. Conseils pour le temps réel en `.onnx`

- **Utilisez `FP32` sous DirectML en cas de bugs :** Sur AMD/Intel, `FP16` provoque souvent erreurs ou grésillements ; passez en `FP32`.
- **Désactivez HAGS sous Windows :** Coupez la *Planification de processeur graphique à accélération matérielle* dans Windows et redémarrez le PC pour éviter les saccades robotiques.
- **Réglez tout sur `48000 Hz` :** Réglez micro, casque et `VB-CABLE` sur `48000 Hz` dans le Panneau Son (`mmsys.cpl`) pour éviter `PortAudioError`.
