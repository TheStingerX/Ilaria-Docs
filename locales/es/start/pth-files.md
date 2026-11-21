---
label: "🧠 Archivos PTH (.pth)"
order: 88
permalink: /pth/
description: "Guía completa de archivos .pth en RVC: modelos exportados vs checkpoints G y D, tamaños FP16 vs FP32, reglas de compatibilidad y errores comunes."
---
# Archivos PTH de RVC (`.pth`)

Cuando descargas, entrenas o compartes una voz RVC, el **archivo `.pth`** es el archivo más importante de todos. Mientras que el [archivo `.index`](indexes.md) es opcional, el `.pth` es **obligatorio**: sin él, RVC no puede convertir ninguna voz.

Esta guía explica qué contiene un `.pth`, la diferencia clave entre un modelo exportado y los checkpoints crudos de entrenamiento (`G_*.pth` / `D_*.pth`), por qué cambia su tamaño y cómo arreglar los errores más comunes.

---

## 1. ¿Qué es un archivo `.pth`?

Un **archivo `.pth`** es un **checkpoint de PyTorch** que guarda la red neuronal entrenada (el **Generador**) capaz de sintetizar el timbre de la voz objetivo.

Dentro de un `.pth` de RVC exportado correctamente se guardan dos cosas:
1. **Pesos del modelo (`weight`):** Millones de números aprendidos en el entrenamiento que definen el timbre, resonancia y carácter vocal.
2. **Configuración de voz (`config` y metadatos):** Ajustes grabados al exportar, entre ellos:
   - **Sample rate:** `32 kHz`, `40 kHz` o `48 kHz` (`44.1 kHz` en ciertas variantes RefineGAN).
   - **Arquitectura RVC:** `v1` (256-d) o `v2` (768-d).
   - **Pitch guidance (`f0`):** Activado (`1`) o desactivado (`0`).
   - **Vocoder:** `HiFi-GAN`, `MRF HiFi-GAN` o `RefineGAN`.
   - **Embedder:** Por ejemplo `contentvec`, `spin-v2` o `klm-vocal-contentvec`.

---

## 2. `.pth` exportado vs Checkpoints crudos (`G_*.pth` / `D_*.pth`)

Uno de los fallos más habituales al empezar es coger el `.pth` equivocado de `logs/`:

| Tipo de archivo | Ubicación típica | Tamaño típico | Para qué sirve |
| --- | --- | --- | --- |
| **`.pth` de voz exportado** (ej. `MiVoz.pth`) | `models/` (Ilaria RVC 2.4.0+) o `weights/` | **45 - 110 MB** (`fp16` vs `fp32`) | **Inferencia y compartir.** Contiene solo los pesos ligeros del Generador + config vocal. |
| **Generador (`G_*.pth`) y Discriminador (`D_*.pth`) crudos** | `logs/<nombre_experimento>/` | **200+ MB cada uno** | **Solo reanudar entrenamiento y pretrains.** Guardan el estado del optimizador. **Nunca** los copies a `models/` para inferencia. |

Si copias un `G_*.pth` crudo dentro de `models/` e intentas convertir audio, RVC fallará con `Missing key(s) in state_dict` o avisará de que falta la configuración de voz. Usa siempre la herramienta **Export** de la aplicación.

---

## 3. Tamaño (`FP16` vs `FP32`) y formatos (`.pth` vs `.safetensors` / `.onnx`)

- **¿Por qué un `.pth` pesa ~50 MB y otro ~105 MB?**
  La diferencia es la **Precisión**: un `.pth` exportado en `FP16` ocupa cerca de la mitad que uno en `FP32` (ver [Precisión](precision.md)). En GPUs NVIDIA CUDA modernas suenan prácticamente igual, mientras que `FP32` asegura compatibilidad con tarjetas GTX 10, DirectML y CPU.
- **`.pth` vs `.safetensors`:**
  `.pth` usa el formato `pickle` de Python (por eso PyTorch `2.6+` aplica comprobaciones `weights_only=True`), mientras `.safetensors` guarda tensores sin código ejecutable. En **Ilaria RVC 2.4.5+** puedes convertir entre `.pth` y `.safetensors` en [Convertidor Safetensors ↔ PTH](../ilaria-rvc/manage/safetensors-converter.md).
- **`.pth` vs `.onnx`:**
  El entrenamiento e inferencia RVC estándar usan `.pth`. Algunos cambiadores de voz en vivo (como w-okada o Deiteris DirectML) también usan `.onnx` para GPUs AMD/Intel.

---

## 4. Reglas de compatibilidad

1. **Embedder coincidente:** Si un `.pth` se entrenó con `contentvec` (el estándar), convierte con `contentvec` (o deja Embedder en `Auto`). Mezclar embedders distorsiona la pronunciación o filtra tu voz original.
2. **Vocoder compatible:** Asegúrate de que tu app soporte el vocoder del `.pth`. Modelos con `MRF HiFi-GAN` o `RefineGAN` requieren una app actualizada (como **Ilaria RVC 2.3.0+** o **Applio**).
3. **`UnpicklingError` en PyTorch 2.6+:** Archivos `.pth` o builds antiguas pueden dar `Weights only load failed` (`fairseq.data.dictionary.Dictionary`). Actualizar a **Ilaria RVC 2.4.0+** o al último **Applio** lo resuelve.

---

## 5. Dónde poner los `.pth` y cómo inspeccionarlos

- **Dónde colocarlos:** En **Ilaria RVC 2.4.0+**, extrae cualquier `.zip` primero y coloca el `.pth` (junto a su `added_*.index`) en la carpeta **`models/`** en la raíz (otras apps usan `assets/weights/` o `weights/`). Pulsa **Refresh** en **Inferencia**.
- **Inspeccionar `.pth` desconocidos:** En Ilaria RVC abre **Other → Model information**, selecciona el `.pth` y pulsa **Read model information** para ver sample rate, versión RVC, vocoder, embedder y precisión.
- **Compartir una voz limpia:** Usa **Other → Export model ZIP** para empaquetar `.pth` y `added_*.index` sin registros de entrenamiento ni grabaciones privadas.

---

## 6. Errores comunes con `.pth` y soluciones rápidas

| Error o Síntoma | Qué ocurrió | Cómo solucionarlo |
| --- | --- | --- |
| **El modelo no aparece en la lista** | Faltó pulsar **Refresh**, dejaste el `.pth` dentro de un `.zip` o está en otra carpeta. | Extrae el `.zip`, pon el `.pth` directamente en `models/` (o `weights/`) y pulsa **Refresh**. |
| `EOFError` / `invalid load key` / `File is not a zip archive` | La descarga se cortó o guardó una página HTML en vez del binario. | Revisa el tamaño: un `.pth` válido pesa **40 - 110+ MB**, no pocos KB. Borra y vuelve a descargar. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Cargaste un checkpoint crudo `G_*.pth` en lugar de un `.pth` exportado. | Exporta el modelo final correctamente en vez de copiar `G_*.pth` de `logs/`. |
| `UnpicklingError` / `Weights only load failed` | PyTorch 2.6+ bloqueó objetos pickle antiguos en una app RVC vieja. | Actualiza a **Ilaria RVC 2.4.0+** o al último **Applio**. |
