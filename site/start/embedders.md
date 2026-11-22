# RVC Embedders

An **embedder** (also called a **content encoder**) is the neural network that reads your input audio and converts what is being said or sung into numerical content features before the RVC voice model reconstructs it in the target speaker's timbre.

## What an embedder does and how it works

In an RVC pipeline, the audio is split into separate streams of information:

1. **Content (what you say)**: extracted frame by frame by the **embedder** (phonemes, pronunciation, articulation, and timing).
2. **Pitch / F0 (the melody)**: extracted separately by a pitch tracker (such as RMVPE or FCPE).
3. **Speaker timbre (who is speaking)**: supplied by the trained RVC `.pth` voice model (and optionally reinforced by a matching `.index` file).

Because the RVC generator is trained to expect features from **one specific embedder**, two rules always apply:

- **Training and inference must match**: if a voice model was trained with `contentvec`, you must convert audio with `contentvec`. Using a different embedder during inference (or live conversion) causes distorted pronunciation, metallic artifacts, or a completely broken voice.
- **Speaker-identity leakage**: generic speech-recognition encoders (such as standard HuBERT models) were not trained to strip out the original speaker's identity. Using them can cause your own voice timbre to bleed into the converted output.

---

## Known RVC embedders

> [!WARNING]
> **Informational purpose only - strongly discouraged for normal use**
>
> Everything listed below regarding alternative embedders is provided **for informational purposes only**. **We strongly recommend NOT using alternative embedders**: the **stock RVC settings** (**`contentvec`**) are the best and safest choice. Alternative embedders increase the risk of training a poor voice model or getting worse offline and online (live) conversions, and they break compatibility with standard RVC setups and indexes.

| Embedder | Architecture / Notes | RVC Support | Recommendation |
| --- | --- | --- | --- |
| **`contentvec`** (`hubert_base.pt`) | Default RVC content encoder trained to preserve linguistic content while stripping speaker identity. | RVC v1 (256-d) & RVC v2 (768-d) | **Recommended (Stock RVC)** |
| **`spin`** | Alternative Fairseq/HuBERT-based speaker-invariant encoder. | RVC v2 | Not recommended for general use |
| **`spin-v2`** (`spin-v2.pt`) | Updated Spin v2 encoder (~361 MiB) used by certain experimental pretrains. | RVC v2 | Not recommended for general use |
| **`chinese-hubert-base`** | HuBERT Base pretrained on Chinese speech. Can leak source speaker timbre. | RVC v2 | Informational / specialized only |
| **`japanese-hubert-base`** | HuBERT Base pretrained on Japanese speech. Can leak source speaker timbre. | RVC v2 | Informational / specialized only |
| **`korean-hubert-base`** | HuBERT Base pretrained on Korean speech. Can leak source speaker timbre. | RVC v2 | Informational / specialized only |
| **`portuguese-hubert-base`** | Fairseq HuBERT Portuguese (`shiromiya/fairseq-hubert-portuguese`, ~1.13 GB). | RVC v2 | Informational / specialized only |
| **`klm-vocal-contentvec`** | KLM Vocal ContentVec (`SeoulStreamingStation/KLM-Vocal-Embedder_ContantVEC_For_RVC`, ~251 MiB). | RVC v2 | Informational / optional only |
| **`custom` HuBERT Base** | User-provided HuBERT Base pair (`pytorch_model.bin` + `config.json`, 768 hidden size). | RVC v2 (v1 only if 256-d projection exists) | Informational / advanced only |

## When you actually need to touch the embedder setting

- **Leave it on `Auto` or `contentvec`** for almost every voice model and training run.
- **Only change it** if you downloaded a pre-trained voice whose author explicitly states it was trained with a specific embedder (for example `spin-v2` or `japanese-hubert-base`). Even then, only change it for inference on that specific model, not as your default for new training.
- **Do not switch embedders mid-training**: changing the embedder requires re-extracting features (`3_feature768`) in a separate experiment.

[Interactive RVC Compatibility Matrix](../reference/compatibility-matrix.md)
