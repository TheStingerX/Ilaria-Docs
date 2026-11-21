---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
description: "Run Ilaria RVC in a browser with a GPU supplied by the cloud platform. Choose a notebook below. Enable an NVIDIA accelerator before running the first cell."
---
# Google Colab

[Open the notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Run Ilaria RVC in a browser with a GPU supplied by the cloud platform. Choose a notebook below. Enable an NVIDIA accelerator before running the first cell.

## Before you start

Prepare one short clean WAV and a compatible inference model. For training, keep the original dataset and a few separate test clips on your own computer. The notebook runs on a remote Linux machine.

### Google Colab limits, compute units, and policies

Before starting a long run, understand how [Google Colab](https://research.google.com/colaboratory/faq.html) manages resources:

- **Free tier vs. Paid plans (Compute Units):** Colab's free tier offers GPUs when available, but runtime length, idle timeouts, and GPU type (such as T4) are dynamic and never guaranteed. Paid tiers (**Colab Pro**, **Pro+**, and **Pay As You Go**) use **compute units** consumed dynamically based on the GPU/TPU you select; when your compute unit balance runs out, the account reverts to free-tier limits.
- **Disallowed activities & WebUI restrictions:** Google's [Disallowed Activities policy](https://research.google.com/colaboratory/faq.html#disallowed-activities) prohibits hosting files, serving public web applications unrelated to interactive computing, running remote proxies, bypassing safety/access limits, using multiple accounts to evade quotas, or creating deepfakes. While interactive Gradio notebooks are not blanket-banned in every scenario, running persistent public WebUI tunnels on the free tier frequently triggers runtime disconnections or policy warnings.
- **Disconnections, saving, and privacy:** Colab can disconnect idle or long-running sessions and wipe local VM storage. Export your results (`EXPORT = True`) or sync important checkpoints to Google Drive regularly, and never upload confidential audio or credentials to public/shared notebooks.
- **Alternatives:** If Colab disconnects or lacks GPU availability, use [Kaggle](kaggle.md) (free weekly GPU quota after phone verification) or [Lightning AI Studio](lightning-ai.md).

## Run on Google Colab

1. Open in Colab and select a GPU runtime.
2. Run cells 1–4 in order. They check the GPU, install dependencies, download base weights and start the Web UI. Set `TRAINING_SAMPLE_RATES` to `[]` for inference only or select the sample rates you plan to train at.
3. Open the embedded view produced by the launch cell. Keep the runtime connected.

## Check each cell before continuing

The GPU check should identify an NVIDIA device. If it does not, change the accelerator first. Wait for dependency installation to finish before downloading weights. Set `TRAINING_SAMPLE_RATES = []` for inference only. For training, choose the rate that matches your model and pretrained pair. Leave `DOWNLOAD_FCPE` enabled if you plan to use FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Export and stop

Set `EXPORT = True` and run the export cell. Enable `INCLUDE_CHECKPOINTS` if you need to resume training. Save the ZIP locally before stopping the session, then run the stop cell with `STOP = True`.

## If startup fails

If the first cell cannot see the GPU, check your accelerator and rerun it. If the interface does not open, read the launch cell output, confirm the server is ready and reopen the view.

### Check the output ZIP

For inference, verify your exported WAV and model files. For training, enable `INCLUDE_CHECKPOINTS` to include the experiment logs, then verify the archive before closing the session. Keep the original dataset separately.

## Recover from common problems

If installation fails, read the first error and rerun the failed cell after fixing it. If the app opens but your model is missing, check the import log and refresh the list. For out-of-memory errors, start with a shorter clip or lower the training batch size. If the Web UI closes, reopen it from the same launch cell or port while the session is still active.

[Ilaria RVC in the cloud](cloud.md)
