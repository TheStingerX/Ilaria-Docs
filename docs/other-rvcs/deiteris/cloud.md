---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 98
permalink: /ilaria-rvc/deiteris/cloud/
description: "Run Deiteris w-okada Fork in the cloud using Google Colab, Kaggle, or Lightning.AI when your PC lacks a supported local GPU."
---
# Deiteris w-okada Fork on Cloud

If your computer does not have a supported local GPU, you can run **Deiteris w-okada Fork** on a cloud GPU via **Google Colab**, **Kaggle**, or **Lightning.AI** and control it from your browser.

> **Why "Server audio not available" appears:** Cloud instances have no physical sound card. This message is expected. Always use **Client mode** so your browser captures your microphone and plays the converted voice locally.

> **Latency expectation:** Cloud tunnels add network round-trip delay on top of GPU inference. Pick the closest **Ngrok** region (or **Port Viewer** on Lightning.AI) and use a wired or 5 GHz connection when possible.

## 1. Choose a cloud provider

| Platform | GPU & Quota | Storage | Best for |
| --- | --- | --- | --- |
| **Google Colab** | Paid tier required for Web UIs | Temporary (per session) | Fast setup for Colab Pro / Pay-As-You-Go users |
| **Kaggle** | Free weekly GPU quota (**T4 x2**) | Session + optional persistence | Best free option after phone verification |
| **Lightning.AI** | Free monthly GPU credits (T4 / L4 / L40) | Persistent (**Teamspace Drive**) | Keeping models and settings saved across sessions |

## 2. Set up a Virtual Audio Cable (for Discord, OBS, or games)

Install a virtual audio cable to route your browser's converted audio output into Discord, OBS, or a game:

- **Windows**: download [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (or **VB-CABLE**). Use `setup64` on Intel/AMD PCs, or `setup64a` on ARM Windows laptops (e.g. Snapdragon). If Windows changes your default audio devices, press `Win + R`, run `mmsys.cpl`, and restore your normal **Playback** and **Recording** defaults (including **Default Communication Device**).
- **macOS**: install [BlackHole](https://existential.audio/blackhole) or [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: install PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` on Debian/Ubuntu, `sudo yum install -y portaudio` on Fedora/RHEL, or `sudo pacman -Syu portaudio` on Arch).

See the [virtual cable walkthrough](../vonovox/live-audio.md) for full Discord and OBS routing steps.

## 3. Option A: Google Colab

> **Important Terms of Service warning:** Running Web UIs on the **Google Colab Free Tier** violates Google's [Disallowed Activities policy](https://research.google.com/colaboratory/faq.html#disallowed-activities). Detection runs mid-session as well as at startup, and repeated violations can restrict or ban Colab access. Use **Colab Paid Tier** for Web UIs.

1. Open the [Deiteris Colab notebook](https://colab.research.google.com/github/deiteris/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Run the **first cell** from the top and wait for `Done! Proceed with the next steps`.
3. Run the **second cell**.
4. Scroll to the **last cell** and paste your [Ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) into `TOKEN_HERE`.
5. *(Optional)* Choose the **region** closest to you below the token field for lower latency.
6. Run the cell and click the generated **Ngrok URL** to open the Web UI.

## 4. Option B: Kaggle (Free T4 x2)

### Account verification (one-time)

1. Create a [Kaggle account](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verify your **phone number** so you can enable the **Internet** switch in notebooks.

### Notebook setup and launch

1. Open the [Deiteris Kaggle notebook](https://www.kaggle.com/code/suneku/voice-changer-public) and click **Copy and Edit**.
2. In the right sidebar:
   - Turn **Internet** **ON**.
   - Set Persistence to **Files and variables**.
   - Under Accelerator, select **GPU T4 x2**.
3. *(Optional)* Avoid leaving **Save version** enabled unless needed, as your GPU quota continues draining while idle.
4. Run the **first installation cell** until it outputs `Done! Proceed with the next steps`, then run the **third cell**.
5. Paste your [Ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) into the **last cell**, run it, and click the generated public URL.

## 5. Option C: Lightning.AI (Persistent Studio)

1. Create a [Lightning.AI account](https://lightning.ai) and verify your **phone number** (approval can take **2-3 business days**).
2. Clone the [Wokada-Deiteris-Fork Studio](https://lightning.ai/nick088/studios/wokada-deiteris-fork).
3. Switch to a GPU via **Studio Environment → Switch To GPU**.
4. Run the **first cell** to install dependencies and the **second cell** to configure the server.
5. In the **third cell**, choose your tunnel (**Port Viewer** is recommended) and run it.
6. Use **Teamspace Drive** on the right sidebar to upload models, and click the **Jupyter** icon on the right whenever you need to return to the notebook code.

## 6. Configure voice models and audio

Once the Web UI loads in your browser, follow [Route and tune Deiteris w-okada Fork](live-audio.md) to set up Client mode, models, and buffers.

## 7. Cloud troubleshooting and utilities

### Enable Debug Mode logs

If the cloud server fails to start or disconnects immediately, add `--log-level debug` to the server command in the final cell and run it again:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle & Lightning.AI**: `!./VoiceChanger --log-level debug`

Copy the full console output when asking for help (avoid `warning`, `error`, or `critical` log levels because they filter out startup details).

### Convert `.safetensors` back to `.pth`

W-Okada saves imported models inside `model_dir` as `.safetensors`. To convert them back to `.pth` on a local PC, use Ilaria RVC's [Safetensors Converter](../../ilaria-rvc/manage/safetensors-converter.md), or run a `torch` + `safetensors` script in the notebook (`!pip install torch safetensors`).
