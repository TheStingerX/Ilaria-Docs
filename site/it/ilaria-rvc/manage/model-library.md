# Libreria modelli e fusione

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Altri pannelli](other-buttons.md)

## Matrice di compatibilità dei formati

| File / Risorsa | Uso | Operazioni compatibili in Ilaria RVC | Guida |
| --- | --- | --- | --- |
| **`.pth` di inferenza** | Conversione vocale | Inferenza singola/serie, Voice Blender, conversione Safetensors | [File `.pth`](../../start/pth-files.md) |
| **Checkpoint di training (`G_*.pth` / `D_*.pth`)** | Ripresa training | Solo ripresa training RVC v2 (non usabili in Inferenza) | [Flusso di training](../train/training-workflow.md) |
| **Indice (`added_*.index`)** | Recupero timbro opzionale | Inferenza (abbinato al relativo `.pth`) | [File Index](../../start/indexes.md) |
| **Modelli `.onnx`** | Motori realtime ONNX | Usati da client esterni DirectML/realtime (AMD/Intel), non dall'inferenza `.pth` standard | [File `.onnx`](../../start/onnx-files.md) |
| **`.safetensors`** | Archiviazione sicura pesi | Conversione da/verso `.pth` tramite **Safetensors Converter** | [Convertitore Safetensors](safetensors-converter.md) |
| **Embedder** | Estrazione feature | Inferenza e Training (deve corrispondere al modello) | [Embedder](../../start/embedders.md) |
| **Pretrained G/D** | Pesi base per nuovo training | Solo Training RVC | [Modelli pretrained](../../start/pretrained.md) |
| **Voice Blender** | Fusione due voci | Unisce due `.pth` di inferenza compatibili in un nuovo `.pth` | [Voice Blender](voice-blender.md) |

> **Perché un checkpoint di training NON è un modello di inferenza:** I file `G_*.pth` e `D_*.pth` in `app/logs/<esperimento>/` contengono lo stato di training/ottimizzatore. Per convertire o condividere usa sempre il `.pth` esportato per inferenza (~40–110 MB) in `models/`.

## Importa, ispeziona e sicurezza

1. Apri **Altro → Importa modelli locali** (oppure scarica da Hugging Face, Google Drive o MEGA).
2. Tieni insieme il `.pth` di inferenza e il relativo `added_*.index`, poi aggiorna la lista e controlla sample rate/architettura in **Informazioni modello**.
3. **Sicurezza:** I `.pth` usano `pickle`: scarica solo da autori/repository fidati oppure usa `.safetensors` tramite [Convertitore Safetensors](safetensors-converter.md).

## Unisci voci compatibili

Scegli due `.pth` di **inferenza** compatibili in [Voice Blender](voice-blender.md), verifica la compatibilità, imposta il rapporto e prova il risultato con `Index Ratio = 0`.

[Matrice interattiva di compatibilità RVC](../../reference/compatibility-matrix.md)
