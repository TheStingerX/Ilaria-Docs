---
label: "Safety, Privacy & Licensing"
icon: ":shield:"
order: 92
permalink: /safety-and-licensing/
description: "Practical guide to downloaded model safety (.pth vs .safetensors), voice consent, licensing, cloud notebook security, and protecting credentials."
---
# Voice AI Safety, Privacy & Model Licensing

> **Practical guidance, not legal advice:** This page summarizes technical safety practices and common licensing rules for RVC models, datasets, and cloud notebooks. Always read the specific license attached to any model, pretrained weight, or dataset you use.

## 1. Downloaded model safety (`.pth` vs. `.safetensors`)

- **Why `.pth` files require trust:** Standard PyTorch `.pth` files use Python `pickle` serialization. Loading an untrusted `.pth` file on older or unpatched loaders can execute arbitrary code. Modern apps like **Ilaria RVC 2.4.0+** and **Applio** include safer loading protections (`weights_only`), but you should still only download `.pth` files from **trusted authors and official repositories** (such as Hugging Face or GitHub Releases).
- **Why `.safetensors` is safer:** `.safetensors` stores only raw tensor weights and metadata, so it cannot execute code when loaded. When sharing or archiving models, converting `.pth` to `.safetensors` with [Safetensors Converter](../ilaria-rvc/manage/safetensors-converter.md) is a good practice.
- **Verify downloads before loading:** Check file sizes (a real RVC inference `.pth` is typically ~40–110 MB, not a few KB HTML redirect), verify SHA-256 hashes or digital signatures when provided, and never load raw `G_*.pth` / `D_*.pth` training checkpoints from unknown sources.

## 2. Voice consent, privacy & licensing

- **Consent & third-party recordings:** Only train models on your own voice, authorized voice actors, or datasets whose license explicitly permits voice modeling. Avoid training on private calls, confidential meetings, or copyrighted/commercial recordings without permission.
- **Commercial vs. non-commercial use:** Even when RVC software itself is open-source (e.g. MIT), **individual pretrained weights and voice models carry their own licenses** (some allow commercial use, such as *Sakura* in RVC Blue, while others are strictly **non-commercial / CC-BY-NC** or research-only). Always check the model card and [Pretrained models](../start/pretrained.md) notes before publishing or monetizing output.
- **Sharing models responsibly:** When publishing a voice model, include the exact RVC version (`v2`), sample rate (`32k`/`40k`/`48k`), embedder (`contentvec`, `spin-v2`, etc.), matching `added_*.index`, and clear usage/attribution terms.

## 3. Cloud notebook & credential security

- **Keep Kaggle, Colab, and Lightning AI sessions private:** Launch cells in notebooks (such as `Ilaria-RVC-Kaggle.ipynb`) print live tunnel URLs and **WebUI / FileBrowser passwords**. Never share screenshots, terminal logs, or public notebook versions containing active passwords or URLs.
- **Protect API tokens & drives:** Never paste **Ngrok authtokens**, **Horizon IDs**, or **Hugging Face write tokens** into public notebooks. Use platform secrets when available, and stop cloud tunnels (`STOP = True`) when finished.
- **Data privacy on cloud VMs:** Cloud providers run on remote shared infrastructure. For confidential or sensitive voice recordings, clean and convert audio **locally** instead of uploading it to public web tools or third-party cloud VMs.
