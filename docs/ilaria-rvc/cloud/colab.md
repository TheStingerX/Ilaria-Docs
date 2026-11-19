---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
---
# Google Colab

[Open the notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Run Ilaria RVC in a browser with a GPU supplied by the cloud platform. Choose a notebook below. Enable an NVIDIA accelerator before running the first cell.

## Before you start

Prepare one short clean WAV and a compatible inference model. For training, keep the original dataset and a few separate test clips on your own computer. The notebook runs on a remote Linux machine.

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
