---
label: "Embedders and pretrains"
icon: ":jigsaw:"
order: 88
permalink: /ilaria-rvc/embedders/
description: "Open Embedder Settings below Audio Processing. Auto reads stored model metadata and uses ContentVec when no embedder is recorded."
---
# Embedders and pretrains

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

> **What’s new in 2.3.0** · Portuguese HuBERT Base is an optional inference embedder. In RVC v2 Training you can upload and save a custom HuBERT embedder. The app selects it and carries its configuration into the exported model.

> **2.4.0** · The Windows package moves the app and runtime into app/ and voice models to the root models/ folder. Adds Colab and Lightning AI Studio notebooks, optional embedder download guidance in Training, and Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). The bundled runtime repairs pip and includes pywin32.

## Inference embedders

Open **Embedder Settings** below **Audio Processing**. Auto reads stored model metadata and uses ContentVec when no embedder is recorded. If the publisher specifies an encoder, use that encoder. A retrieval index needs compatible features from the same experiment. Leave retrieval disabled when the pairing is uncertain.

Available inference encoders include ContentVec, Spin, Spin-v2 and Chinese, Japanese and Korean HuBERT Base. Open **Other → Download embedders** to install optional models one at a time. For custom HuBERT assets, select **custom**, name the folder, provide the matching weights and configuration files (.bin and .json), and install them together.

> Generic HuBERT checkpoints are not recommended as the default encoder for voice conversion. Their speech prediction training does not explicitly remove speaker identity, so the features can carry source timbre into the output. For RVC, use the encoder expected by the model, such as ContentVec when the voice was trained with it.

## Training compatibility

Training exposes ContentVec and Spin-v2. Changing the encoder requires fresh features and a separate experiment name. Match your generator and discriminator pair to the vocoder, training sample rate, RVC generation and pitch configuration, and follow the pair publisher's encoder requirements. Ilaria RVC 2.1.0 supports RefineGAN training specifically at 32 kHz with RVC V2 and pitch guidance. The downloader may list other rates for use elsewhere.

## Get a G/D pair

Under **Other → Download pretrained models**, use a repository or pretrained archive, or enter a link to the G checkpoint and its matched D checkpoint if discovery needs help. The **Recommended pretraineds** picker shows available catalog variants and their sample rates. Check the chosen variant before installing both files. Return to Training, refresh the list, and select the installed pair. If using random initialization intentionally, choose None. Keep inference models and training pretrains separate.

If training exits immediately after selecting a pair, verify both files and the saved experiment configuration before changing batch size or starting a new run.
