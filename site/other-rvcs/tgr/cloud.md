# Okada TG Developed Fork on Cloud

If your computer does not have a compatible NVIDIA, AMD, or Intel GPU, you can run **Okada TG Developed Fork** on a cloud GPU using **Google Colab**, **Kaggle**, or **Lightning.AI**, then connect from your browser.

> **Why "Server audio not available" appears:** Cloud virtual machines have no physical sound card. That message is completely normal. Always use **Client mode** so your browser captures your local microphone and plays the converted voice through your own headphones or virtual cable.

> **Latency expectation:** Cloud conversion adds network round-trip time on top of GPU inference. Choose the closest **Ngrok** region (or **Port Viewer** on Lightning.AI) and keep a stable wired or 5 GHz connection for the lowest delay.

## 1. Choose a cloud provider

| Platform | GPU & Quota | Storage | Tunnels available |
| --- | --- | --- | --- |
| **Google Colab** | Paid tier required for Web UIs | Temporary (per session) | Ngrok |
| **Kaggle** | Free weekly GPU quota (**T4 x2**) | Session + optional persistence | Ngrok |
| **Lightning.AI** | Free monthly credits (75h T4 16GB / 31h L4 24GB / 15h L40 48GB) | Persistent (**Teamspace Drive**) | Port Viewer (recommended), Tunnel selector |

## 2. Set up a Virtual Audio Cable (for Discord, OBS, or games)

To route the converted browser output into Discord, OBS, or a game, install a virtual audio cable on your computer:

- **Windows**: download [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (or **VB-CABLE**). Run `setup64` on standard Intel/AMD PCs, or `setup64a` on ARM Windows laptops (such as Snapdragon). If Windows switches your default sound device after install, press `Win + R`, run `mmsys.cpl`, and restore your normal **Playback** and **Recording** devices (including **Default Communication Device**).
- **macOS**: install [BlackHole](https://existential.audio/blackhole) or [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: install PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` on Debian/Ubuntu, `sudo yum install -y portaudio` on Fedora/RHEL, or `sudo pacman -Syu portaudio` on Arch).

For step-by-step Discord and OBS routing, see the [virtual cable walkthrough](../vonovox/live-audio.md).

## 3. Option A: Google Colab

> **Important Terms of Service warning:** Running Web UIs on the **Google Colab Free Tier** violates Google's [Disallowed Activities policy](https://research.google.com/colaboratory/faq.html#disallowed-activities). Google's detection runs mid-session as well as at startup, and repeated violations can lead to GPU restrictions or account bans. Use **Colab Paid Tier** for Web UI workflows.

1. Open the [Tg-Develop Colab notebook](https://colab.research.google.com/github/tg-develop/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Run the **first cell** from the top and wait until it prints `Done! Proceed with the next steps`.
3. Run the **second cell**.
4. Scroll to the **last cell** and paste your [Ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) into `TOKEN_HERE`.
5. *(Optional)* Select the **region** closest to you under the token field to reduce latency.
6. Run the cell and click the generated **Ngrok URL** once downloads finish.

## 4. Option B: Kaggle (Free T4 x2)

### Account verification (one-time)

1. Create a [Kaggle account](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verify your **phone number** in account settings. Phone verification is required to enable the **Internet** toggle in notebooks.

### Notebook setup and launch

1. Go to [Kaggle](https://www.kaggle.com) and click **Create → New Notebook**.
2. Click **File → Import Notebook**, open the **Link** tab, paste `https://github.com/tg-develop/voice-changer/blob/master-custom/Kaggle_RealtimeVoiceChanger.ipynb`, and click **Import**.
3. In the right sidebar:
   - Turn **Internet** **ON**.
   - Set Persistence to **Files and variables**.
   - Under Accelerator, select **GPU T4 x2**.
4. *(Optional)* Only use **Save version** if you intentionally want background persistence, as your runtime quota continues draining while idle.
5. Run the **first installation cell** until it prints `Done! Proceed with the next steps`, then run the **third cell**.
6. Paste your [Ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) into the **last cell**, run it, and open the generated public URL.

## 5. Option C: Lightning.AI (Persistent Studio)

1. Create a [Lightning.AI account](https://lightning.ai) and verify your **phone number** (account verification can take **2-3 business days**).
2. Clone the [Wokada-TgDevelop-Fork Studio](https://lightning.ai/nick088/studios/wokada-tg-develop-fork).
3. Switch to a GPU environment via **Studio Environment → Switch To GPU**.
4. Run the **first cell** to install dependencies and the **second cell** to configure the server.
5. In the **third cell**, pick your tunnel (**Port Viewer** is recommended for stability and low overhead) and run it.
6. Use **Teamspace Drive** on the right sidebar to upload your `.pth` and `.index` voice models.
7. **Reset / update**: if you need a clean reinstall later, run the final **"Delete everything"** maintenance cell to wipe downloaded files from persistent storage.

## 6. Configure voice models and audio

Once the Web UI opens in your browser, model loading, pitch settings, and **Client mode** audio setup are identical to a local install. Continue with [Model, microphone and cable](live-audio.md).

## 7. Cloud troubleshooting and utilities

### Enable Debug Mode logs

If the cloud server crashes or refuses to start, append `--log-level debug` to the launch command in the final cell and re-run it:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle & Lightning.AI**: `!./VoiceChanger --log-level debug`

Copy the printed error output (avoid `warning`, `error`, or `critical` log levels, as they hide the context needed for troubleshooting).

### Convert `.safetensors` back to `.pth`

W-Okada stores imported models inside `model_dir` as `.safetensors`. If you need to recover a `.pth` file from a cloud session, you can run a quick `torch` + `safetensors` conversion script (`!pip install torch safetensors`) or use Ilaria RVC's built-in [Safetensors Converter](../../ilaria-rvc/manage/safetensors-converter.md) locally.
