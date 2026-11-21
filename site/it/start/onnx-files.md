# File ONNX di RVC (`.onnx`)

Accanto ai file [`.pth`](pth-files.md) e [`.index`](indexes.md), usando i voice changer RVC ti capiterà talvolta di trovare anche **file `.onnx`**.

Nell'ecosistema RVC, **i modelli `.onnx` sono solitamente utilizzati per il cambio voce in tempo reale (realtime) su schede video AMD e Intel** (tramite **DirectML** / ONNX Runtime su Windows) e in alcuni client live multipiattaforma.

---

## 1. Cos'è un file `.onnx`?

**ONNX** (*Open Neural Network Exchange*) è un formato aperto e indipendente dal framework per eseguire reti neurali già allenate. Invece di dipendere da PyTorch e da NVIDIA CUDA, un file `.onnx` gira tramite **ONNX Runtime**, compatibile con diverse schede video e sistemi operativi.

Per chi usa RVC questo conta soprattutto nei **voice changer in tempo reale** (come **Deiteris w-okada Fork**, **w-okada VCClient** o **RVC Mainline DirectML**):
- Le GPU **AMD Radeon** e **Intel Arc / integrate** non possono usare NVIDIA CUDA.
- Eseguire un modello esportato in `.onnx` tramite **ONNX Runtime + DirectML** permette alle schede AMD e Intel su Windows di accelerare la conversione live in modo fluido.

---

## 2. `.onnx` vs `.pth`: differenze principali

| Caratteristica | `.pth` (PyTorch) | `.onnx` (ONNX Runtime) |
| --- | --- | --- |
| **Uso principale** | Training standard, conversione offline e live su NVIDIA CUDA | **Voice changer in tempo reale**, soprattutto su **schede AMD e Intel (DirectML)** |
| **Training / Ripresa** | I checkpoint grezzi `G`/`D` possono riprendere il training | **Solo inferenza** (non si può allenare né riprendere) |
| **Merge Models / Voice Blender** | Supportato (su `.pth` compatibili) | **Non supportato** (non si possono fondere `.onnx`) |
| **Conversione Safetensors** | Supportata in Ilaria RVC 2.4.5+ | **Non supportata** |
| **Metadati RVC nel file** | Configurazione vocale completa (`sr`, `f0`, `v1`/`v2`, vocoder, embedder) | Grafo dei tensori essenziale; il client live deve avere sample rate e versione corretti |

---

## 3. Come ottenere un `.onnx` da un `.pth`

Quasi tutte le voci RVC online vengono pubblicate come `.pth` e non come `.onnx`. Se ti serve un `.onnx`:

1. **Conversione automatica nei client live:** Alcuni programmi realtime (come **w-okada** e **Deiteris**) accettano direttamente il `.pth` oppure lo convertono in `.onnx` per DirectML.
2. **Esportazione manuale in ONNX:** App come **Ilaria RVC**, **Applio** e **RVC Mainline** includono un'opzione **Export ONNX** per trasformare un `.pth` da inferenza in `.onnx` per client esterni.
3. **Conserva sempre il `.pth` originale:** Non cancellare mai `.pth` e `added_*.index` dopo aver esportato in `.onnx`, perché gli `.onnx` non si possono fondere, convertire in `.safetensors` o usare nei tool PyTorch standard.

---

## 4. Consigli per l'uso realtime di `.onnx`

- **Usa `FP32` su DirectML se senti glitch:** Su schede AMD/Intel DirectML può dare errori o distorsioni in `FP16`; passa a `FP32` se l'audio si rompe.
- **Disattiva HAGS su Windows:** Disabilita la *Pianificazione GPU con accelerazione hardware* nelle impostazioni grafiche di Windows e riavvia il PC per evitare scatti robotici in live.
- **Imposta `48000 Hz` ovunque:** Configura microfono, cuffie e `VB-CABLE` su `48000 Hz` nel Pannello Audio di Windows (`mmsys.cpl`) per evitare errori `PortAudioError`.
