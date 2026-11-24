---
label: "Usage and troubleshooting"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Usage and troubleshooting

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Reviewed version](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Import the voice

Import a ZIP containing a compatible RVC ONNX generator or an exported inference `.pth`, plus its matching FAISS `.index` if available. The app prefers ONNX when both formats are present. For `.pth`, the bundled converter exports ONNX. It also prepares retrieval features from the index when present. The app stores the result in `Models/<voice>/model.onnx` and optional `features.rvci`. A random ONNX graph or a training checkpoint is not a usable RVC generator.

## Microphone and latency

Select the imported voice, physical mic and headphones, then click **Start voice conversion**. Start at zero pitch shift and test retrieval separately. PortAudio runs a mono 48 kHz duplex stream. Inside the pipeline ContentVec uses 16 kHz audio, RMVPE supplies F0 when needed and the output is resampled to the stream rate. If you hear gaps, check input/output levels, inference time and underruns. Confirm CUDA actually initialized before diagnosing GPU performance. For Discord or OBS, route to a virtual cable only after the headphones test works.

[Installation](installation.md)
