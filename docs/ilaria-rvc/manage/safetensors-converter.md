---
label: "Safetensors ↔ PTH Converter"
icon: ":repeat:"
order: 88
permalink: /ilaria-rvc/safetensors-converter/
description: "Complete beginner-friendly guide to Ilaria RVC's Safetensors and PTH model converter in the Other tab, including metadata preservation and Move .pth to models."
---
# Safetensors ↔ PTH Converter

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Starting in **Ilaria RVC 2.4.5**, the **Other** tab includes **Convert model weights**, a built-in converter that turns `.pth` voice models into `.safetensors` files and `.safetensors` files back into `.pth` models.

---

[ONNX conversion guide](onnx-converter.md)

## 1. What are `.pth` and `.safetensors`? (In simple words)

When you download AI voice models, you usually see `.pth` files, and sometimes `.safetensors` files:

- **`.pth` (PyTorch format):** The classic RVC model format. It stores the neural network weights **plus** RVC's voice configuration (sample rate, pitch guidance, RVC version, embedder info). However, `.pth` uses Python's `pickle` format, which is why modern PyTorch (`2.6+`) restricts how `.pth` files are loaded for security.
- **`.safetensors` (SafeTensors format):** A modern format created by Hugging Face that stores model weights **without executable code**. It is much safer to share or download from strangers and loads very cleanly.

**Why convert between them?**
- Convert **`.pth` → `.safetensors`** when you want to archive or share your voice model in the safer `.safetensors` format while keeping its RVC settings intact.
- Convert **`.safetensors` → `.pth`** when you downloaded a `.safetensors` voice model and need a `.pth` file that Ilaria RVC (or another RVC app) can load in **Inference**.

---

## 2. How Ilaria RVC's converter works

Inside **Other → Convert model weights**, Ilaria RVC runs the conversion safely on your **CPU** (no GPU/VRAM needed):

- **First-time automatic setup:** If `safetensors` is not installed yet, Ilaria RVC automatically downloads and installs `safetensors==0.8.0` into `assets/weight_converter/dependencies` on first use (requires an internet connection the very first time).
- **RVC metadata preservation:** When converting an exported RVC `.pth` to `.safetensors`, Ilaria RVC saves the voice configuration inside a special metadata tag (`ilaria_rvc_checkpoint`). When you convert that `.safetensors` back to `.pth`, it restores the full RVC voice configuration automatically so it works right away in Inference.
- **Tensor-only files:** If you convert a `.safetensors` file that came from another tool without RVC metadata, Ilaria RVC still converts it into a tensor-only `.pth`, but it will not have the voice settings needed for automatic Inference or **Move .pth to models**.
- **Training checkpoints are blocked:** Raw training checkpoints (`G_*.pth` or `D_*.pth` from `logs/`) contain training optimizer state and cannot be converted here. Export your finished voice model first.

---

## 3. Step-by-step: Convert `.pth` ↔ `.safetensors`

1. Open **Other** and expand **Convert model weights**.
2. Drag and drop your `.pth` or `.safetensors` file into **Choose or drop a .pth or .safetensors file**.
3. Click **Convert weights**.
4. Watch **Conversion Log** (`5% | Preparing Safetensors...` → `10% | Reading weights on CPU...` → completion).
5. Once finished, download your converted file from **Download converted weights**.

### Using **Move .pth to models** (for `.safetensors` → `.pth`)
If you just converted a `.safetensors` voice (with RVC metadata) into a `.pth`:
1. Instead of downloading and moving it manually, simply click **Move .pth to models**.
2. Ilaria RVC checks that the `.pth` is a complete RVC voice (containing `config`, `weight`, and `emb_g.weight`) and moves it straight into your `models/` folder.
3. Switch to **Inference**, click **Refresh**, and your converted voice is ready to use.

!!!tip
**Will it overwrite an existing model?**
No. If a `.pth` with the exact same filename already exists in `models/`, **Move .pth to models** stops safely and tells you a model with that name already exists.
!!!

---

## 4. Common messages & troubleshooting

| Message in Conversion Log | What it means | How to fix it |
| --- | --- | --- |
| `Could not download Safetensors. Check your internet connection and retry.` | First-time `safetensors` install failed because you are offline or blocked by a firewall/VPN. | Connect to the internet (or temporarily disable strict VPN/firewall) and click **Convert weights** once. After that, it works offline. |
| `This checkpoint contains training state or unsupported metadata. Export a voice model first.` | You dropped a raw `G_*.pth` or `D_*.pth` training checkpoint instead of a finished voice `.pth`. | Use the **Export** tool on your experiment first, then convert the exported `.pth`. |
| `This .pth contains only weights or is missing required RVC data.` | You clicked **Move .pth to models** on a tensor-only `.pth` (from a `.safetensors` file that had no RVC metadata). | Only full RVC voice `.pth` exports with config metadata can be loaded directly into `models/` for Inference. |
| `A model named ... already exists.` | A `.pth` with that same name is already inside `models/`. | Rename the file or remove/backup the old one in `models/` before moving. |
