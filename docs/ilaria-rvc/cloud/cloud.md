---
label: "Cloud"
icon: ":cloud:"
order: 94
permalink: /ilaria-rvc/cloud/
description: "Compare Kaggle, Google Colab, and Lightning AI Studio to run Ilaria RVC in a browser when your PC lacks a supported local NVIDIA GPU."
---
# Ilaria RVC in the cloud

Run Ilaria RVC in a browser with a GPU supplied by a cloud platform. Choose a notebook below and enable an NVIDIA accelerator before running the first cell.

[Kaggle](kaggle.md) · [Google Colab](colab.md) · [Lightning AI Studio](lightning-ai.md)

## Compare cloud platforms

| Feature | Kaggle | Google Colab | Lightning AI Studio |
| --- | --- | --- | --- |
| **GPU availability** | Free weekly GPU quota (e.g. **T4 x2**, subject to Kaggle limits) | Free tier (dynamic, not guaranteed) or Paid (**Pro / Pro+ / Pay-As-You-Go** compute units) | Free 4-CPU Studio; GPUs billed per second via starter or paid credits |
| **Cost & credits** | Free within weekly quota (phone verification required) | Free tier or paid compute units (check [Colab FAQ](https://research.google.com/colaboratory/faq.html)) | `1 credit = $1 USD` billed per second; check [Lightning AI Pricing](https://lightning.ai/pricing) |
| **Restrictions** | Must enable **Internet** (phone verification); keep notebooks private | [Disallowed Activities](https://research.google.com/colaboratory/faq.html#disallowed-activities) restrict public web services & proxies; free tier may disconnect WebUIs | Account/phone verification may take 2–3 business days; GPU types depend on availability |
| **File persistence** | Session-based; auto-exports inference models to `ilaria-shared/models` | Temporary VM storage; save checkpoints/exports to **Google Drive** | Persistent **Teamspace Drive** (**10 GB free**; over 10 GB billed monthly) |
| **Session length** | Idle timeouts apply; background commits drain quota | Idle timeouts and max runtime caps apply | Free CPU Studio runs up to 4h continuous before restart; GPU Studios use credits while running |
| **Training & Inference** | Both supported (T4 defaults to FP16) | Both supported (depends on allocated GPU) | Both supported (choose GPU tier as needed) |
| **Export & Download** | `EXPORT = True` ZIP + **FileBrowser** | `EXPORT = True` ZIP + Google Drive sync | Direct download from Teamspace Drive or `EXPORT = True` ZIP |
| **Privacy** | Keep notebook **private** (launch cell prints WebUI & FileBrowser passwords) | Keep notebooks private; avoid sharing cells with tokens/passwords | Keep Studio and Port Viewer ports **private** |
| **Ease of setup** | Moderate (copy notebook, toggle GPU + Internet, run 4 cells) | Easy (open Colab link, select GPU, run 4 cells) | Moderate (create Studio, upload notebook, switch to GPU, open Port Viewer) |

## Which service should you choose?

- **You want a free GPU for training or testing:** Start with **[Kaggle](kaggle.md)** (verify your phone number, enable **Internet** and **T4 x2**, and keep your notebook private).
- **You already pay for Colab or want Google Drive integration:** Use **[Google Colab](colab.md)** with a paid compute-unit plan for reliable WebUI sessions.
- **You want persistent storage across sessions without re-downloading models:** Use **[Lightning AI Studio](lightning-ai.md)**, do setup on the free CPU Studio, and switch to GPU only while running jobs.
