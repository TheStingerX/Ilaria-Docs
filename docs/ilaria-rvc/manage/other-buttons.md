---
label: "Other controls explained"
icon: ":toolbox:"
order: 80
permalink: /ilaria-rvc/other-buttons/
description: "Use Other to manage files, inspect or combine models, review audio and maintain the app."
---

# Every Other panel explained

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Use **Other** to manage files, inspect or combine models, review audio and maintain the app. Start by deciding whether you need an inference model, a content encoder or a G/D training pair. They belong to different parts of RVC.

## Get models and training assets

| Panel and controls | What to enter and what to expect |
| --- | --- |
| `Import local models` | Drop an inference .pth, its optional matching .index, or a supported ZIP. Some builds expose an Import model files button. Check Import Log before switching to Inference and refreshing the model list. |
| `Download models from Hugging Face, Google Drive or MEGA` | Paste a public model link, click Download and install model, and wait for Download Log. Separate model and index links can be imported in separate operations. |
| `Download embedders` | Pick the exact encoder required by a model, then click Download selected embedder. Read Embedder download status before trying to select it in Inference. |
| `Download pretrained models` | Provide a repository, compatible ZIP or generator link. Enter the matching discriminator link when automatic discovery cannot find it. Click Download pretrained pair and inspect the log. |
| `Recommended pretraineds` | Choose a named variant and sample rate, then click Download selected pretrained (G + D). Verify the architecture, vocoder, pitch and encoder requirements before selecting it in Training. |

## Inspect, merge and share voices

**Model information** lets you select a voice, **Refresh model list** and **Read model information**. Read Inspection Log to confirm which file was inspected. Expand **Saved metadata and architecture** for recorded properties and **Stored tensors** for weight details. Missing metadata should be treated as unknown.

**Merge models** blends compatible inference weights. Pick **Model A** and **Model B**, then click **Check model compatibility** before saving. **Model A contribution (%)** controls the weight balance, so 70 gives A a 70% contribution in the blend, with the rest from B. **Sample rate** should match the models; use Auto if available. **Output precision** sets how the generated weights are stored. Enter a new name and optional notes, click **Merge and save model**, and read Merge Log. Test the merged voice before deciding whether to keep it. Start with retrieval disabled.

**Export model ZIP** packages the chosen inference voice and an optional matching index. Use **Refresh model list** if the voice is missing, select **Voice Model** and optionally **Index**, and click **Create model ZIP**. Read Export Log and download the file shown by **Download model ZIP**. Open the ZIP locally and check both filenames. Keep the whole training experiment separately if you need resumable checkpoints.

## Audio and hardware tools

- **Audio Analyzer** compares recordings using waveform, spectrogram, pitch and level displays. Select the same region in input and output and listen to it. Match the FFT window, channel and silence threshold across comparisons. Use the available export controls to save analysis data or charts. See [Audio Analyzer](audio-analyzer.md).
- **PC training advisor** uses **Sample rate to plan for**, **Precision to evaluate**, and **GPU to evaluate**. Click **Scan PC and suggest settings** and review PC Advisor Log. Treat the suggestions as a starting point and verify memory use during a short run.

## Updates and restart

In **Update Ilaria RVC**, compare **Installed version** with the release shown after **Check for updates**. Read **Version changelog** and expand **All changes so far** for older notes. When **Download and restart** is offered, finish or save active work before using it. Follow **Update Log** until the app reopens. **Restart Ilaria RVC** restarts the current installation and **Reload status** reports that operation. On Kaggle, use the notebook’s [save, stop and restart workflow](../cloud/kaggle.md).
