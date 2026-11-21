---
label: "🩺 Troubleshooting"
order: 95
permalink: /troubleshooting/
description: "Step-by-step RVC troubleshooting for beginners and advanced users: Windows/launcher errors, GPU/CUDA/DirectML, models, training, live mic, and cloud notebooks."
---
# Troubleshooting RVC

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

!!!tip
**New to RVC? Start with these 4 rules before anything else:**
1. **Use a short, simple folder path** like `C:\RVC` or `D:\IlariaRVC`. Never put the app inside `OneDrive`, `Program Files`, or folders with spaces, accents, or emojis.
2. **Always extract the ZIP completely** before opening anything. Never run `.bat` files from inside WinRAR, 7-Zip, or Windows ZIP preview.
3. **Never close the black console window.** That window runs the app and prints the real error if something breaks.
4. **Test with one clean 10-second `.wav` clip first.** If the app crashes, copy the **first** error in the console log. If it runs but sounds bad, change **one setting at a time** on the same test clip.
!!!

## Quick Symptom Finder

| What is happening? | Most likely cause | Where to look |
| --- | --- | --- |
| The black window opens and closes in 1 second | Running inside ZIP, antivirus blocked it, or missing runtime | [1. Launcher, Windows & Downloads](#1-launcher-windows-antivirus--downloads) |
| Browser says "This site can't be reached" or blank page | App crashed on startup, wrong port, or VPN/proxy blocking `127.0.0.1` | [1. Launcher, Windows & Downloads](#1-launcher-windows-antivirus--downloads) |
| App is super slow, or says `CUDA out of memory` | Using CPU instead of GPU, Windows HAGS is on, or batch/audio is too big | [2. GPU, CUDA, AMD/Intel & Memory](#2-gpu-cuda-amdintel--memory) |
| Model does not appear, or fails to load (`.pth` / `.index`) | Forgot to click Refresh, ZIP not extracted, broken download, or wrong file | [3. Models, Checkpoints & Indexes](#3-models-checkpoints--indexes) |
| Voice sounds like a chipmunk, monster, robot, or original voice | Wrong Pitch (Transpose), noisy input audio, or wrong Pitch Extractor | [4. Voice Quality, Pitch & Audio Files](#4-voice-quality-pitch--audio-files) |
| Training stops early, crashes, or exports a silent voice | Empty/silent dataset clip, too many CPU workers, or `Fresh Training` left on | [5. Dataset Preprocessing & Training](#5-dataset-preprocessing--training) |
| Mic has delay, crackles, echo, or Discord cannot hear you | Sample rate mismatch (`44100` vs `48000 Hz`), wrong virtual cable, or Krisp | [6. Live Voice Changer, Mic & Discord](#6-live-voice-changer-mic--discord) |
| Google Colab or Kaggle fails or disconnects | GPU accelerator turned off, quota reached, or session timed out | [7. Cloud Notebooks (Colab & Kaggle)](#7-cloud-notebooks-colab--kaggle) |

## Simple 5-Step Baseline Test

If everything sounds wrong or you do not know which setting broke your audio, reset to a simple test:

1. **Prepare one clean clip:** Record 10 to 20 seconds of a single voice speaking clearly in a quiet room (no music, no echo). Save it as a standard `.wav` file in a simple folder like `C:\RVC\test.wav`.
2. **Pick one trusted model:** Choose a `.pth` voice model you know works. Leave its `.index` off (`Index Rate = 0`) for the first test.
3. **Use safe default settings:**
   - **Pitch / Transpose:** `0` (same gender), `+12` (male to female), `-12` (female to male).
   - **Pitch Extractor:** `rmvpe` (best balance of speed and quality).
   - **Optional effects / cleanup:** All turned **OFF**.
4. **Convert and listen:** Save the output to a normal local folder (not `OneDrive`). If the browser audio player stays silent, download the file and open it in VLC or Windows Media Player.
5. **Change one thing at a time:** Once the clean test works, turn on the `.index` file (start around `0.5` to `0.75`) or adjust pitch by `1` or `2` semitones.

---

## Known Errors & Step-by-Step Fixes

### 1. Launcher, Windows, Antivirus & Downloads

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| **Black console window opens and closes immediately** | You ran the launcher inside a ZIP preview, or Python hit an error before starting. | 1. Right-click the `.zip` and extract the whole folder first.<br>2. In Ilaria RVC, run `RUN_ILARIA_RVC_LOGS.bat` instead of the normal launcher so the window stays open and shows the error. |
| **Antivirus / Windows Defender flags `.bat`, `.exe`, or `.dll` files** | Portable AI packages often ship unsigned launchers or bundled Python/PyTorch binaries that heuristic scanners may flag. | 1. **Never disable your antivirus globally** or blindly exclude entire folders.<br>2. Verify the file came from the **official GitHub Releases or Hugging Face** repository and check its SHA-256 hash or digital signature if provided.<br>3. Open **Windows Security → Virus & threat protection → Protection history** (Microsoft Defender keeps events for 14 days, color-coded by severity) to see the exact file and threat name.<br>4. If you suspect a false positive on an official download, prefer **re-downloading/re-extracting** from the official source or submitting the file to Microsoft Security Intelligence. If an unexpected executable or unknown third-party archive triggers an alert, **stop immediately**, keep it quarantined, and ask for help on the official project Discord/GitHub. |
| `WinError 10048` / `Address already in use` / port busy | Another copy of RVC or another app is already using that local port (`6969` or `7865`). | Close all open black console windows (or end `python.exe` in **Task Manager**), then launch the app once. |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] filename too long` | Windows breaks when folder paths are over 260 characters or contain spaces, accents, or symbols (`()`, `[]`). | Move the app and audio files to a short folder like `C:\RVC\`. Rename folders and `.wav` files using only letters, numbers, and underscores `_`. |
| `[WinError 2] The system cannot find the file specified` (when loading/saving audio) | `ffmpeg.exe` or `ffprobe.exe` (the tool that reads audio files) is missing. | Check that `ffmpeg.exe` is inside the app folder (re-extract the ZIP if Defender removed it). On manual Python installs, install FFmpeg and add it to Windows `PATH`, then restart your terminal. |
| `PermissionError: [Errno 13]` / `[WinError 5] Access denied` | Windows is blocking the app from writing to `Program Files`, `OneDrive`, or a file open in another program. | Move the app out of `Program Files` and `OneDrive` into `C:\RVC\`. Close any media player or editor currently holding the audio file open. |
| `Expecting value: line 1 column 1` or blank browser page | The app crashed before loading the interface, you opened the wrong port, or a VPN/proxy is blocking local connections. | Read the **first** error in the black console window. Check the exact address printed there (`127.0.0.1:6969` for Ilaria RVC, `127.0.0.1:7865` for Gradio/Deiteris). Turn off VPN/proxy interception for `localhost` and `127.0.0.1`. |
| Split archive fails to extract (`.zip.001`, `.zip.002`) | Windows built-in extractor cannot open multi-part archives, or one part is missing. | Put all parts (`.001`, `.002`, etc.) in the same folder, install **7-Zip**, right-click **only** the `.001` file, and choose **7-Zip → Extract Here**. |
| `ModuleNotFoundError: No module named 'fairseq'` | You installed manually on Python 3.11+ or without Windows C++ build tools. | Beginners should use the pre-built portable ZIP package. For manual installs, use **Python 3.9 or 3.10** and install **Microsoft Visual Studio Build Tools** (*Desktop development with C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / missing `.dll` | Windows is missing the Visual C++ runtime libraries required by Python AI packages. | Download and install the official **Microsoft Visual C++ 2015-2022 Redistributable (x64)** from Microsoft, then restart your PC. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Your internet, firewall, or VPN blocked the automatic download of `hubert_base.pt` or `rmvpe.pt`. | Temporarily disable strict VPN/firewall rules, or download `hubert_base.pt` and `rmvpe.pt` manually and place them in `assets/hubert/` and `assets/rmvpe/`. |

### 2. GPU, CUDA, AMD/Intel & Memory

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| **Everything runs super slow (using CPU instead of GPU)** | The app cannot see your graphics card, or you downloaded an NVIDIA-only app on an AMD/Intel GPU. | 1. NVIDIA users: check that your GPU drivers are installed and you are not forcing integrated graphics.<br>2. AMD/Intel GPU users: standard CUDA builds will not use your GPU. Use a **DirectML** build (such as YuneVoix, Deiteris DirectML, or Mainline DirectML) or a cloud notebook. |
| **PC lags, VRAM pressure rises, or live voice stutters (Windows 10/11)** | **HAGS** (Hardware-Accelerated GPU Scheduling) lets the GPU manage its own memory queue, which works well for most games/apps but can occasionally cause VRAM/latency contention on some AI + gaming setups. | HAGS is **not** inherently harmful and does not need to be turned off on every PC. If you hit unexplained live stuttering, test turning it **OFF** in **Windows Settings → System → Display → Graphics → Advanced Graphics Settings**, **restart your PC**, and compare before/after. If there is no clear improvement, turn HAGS back **ON** and restart. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (while converting audio) | Your graphics card ran out of video memory because the song/clip is too long or a game/browser is using VRAM. | Enable **Split Audio** for long tracks, close games and heavy browser tabs (or turn off browser hardware acceleration), and turn off extra audio effects. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (while training) | The training **Batch Size** is too large for your GPU memory. | Lower **Batch Size** step by step (from `8` down to `4`, `2`, or `1`). Turn **OFF** "Cache dataset in GPU/VRAM", and close any live voice changer before training. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available` | Your app's CUDA version does not match your NVIDIA card generation (e.g. brand-new RTX 50 vs older GTX 10). | Use the matching build: **Ilaria RVC** includes **CUDA 12.8** for GTX 16 / RTX 20-50 and auto-downloads **CUDA 12.6** (`runtime-cu126`) for older Maxwell/Pascal/Volta cards. |
| `CUDA driver version is insufficient for CUDA runtime version` | Your NVIDIA driver is too old for the app's AI engine. | Update your NVIDIA graphics driver via the **NVIDIA App / GeForce Experience** or the official NVIDIA website, then restart. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | GPU crashed due to an unstable overclock/undervolt, overheating, or driver mismatch. | Reset any GPU overclock or undervolt in MSI Afterburner back to stock, update your NVIDIA driver, and try again. |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` error | `FP16` (half-precision speed mode) is turned on, but your GPU (GTX 10-series, DirectML, or CPU) does not support it. | Go to Settings and turn **OFF** **FP16** (switch to **FP32**). |
| `OSError: [WinError 1455] The paging file is too small` | Windows ran out of Virtual Memory (swap space on your drive) while loading models or building an index. | Press Windows Key, search **View advanced system settings → Performance Settings → Advanced → Virtual Memory → Change**, uncheck automatic, set a custom size (e.g. Initial `16384` MB, Maximum `32768` MB), click **Set**, and **restart your PC**. |

### 3. Models, Checkpoints & Indexes

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| **I put the model in the folder, why does it not show up?** | You forgot to refresh the list, left it inside a `.zip`, or put it in the wrong folder. | 1. Extract the `.zip` so you see `.pth` and `.index` files directly.<br>2. Put `.pth` in `assets/weights/` (or `weights/`) and `.index` in `logs/` (check your app's exact folder).<br>3. Click the **Refresh** button next to the model dropdown. |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | Newer PyTorch (2.6+) blocks older RVC model formats by default for security. | Update to the latest version of your app (for example **Ilaria RVC 2.4.0+** or latest **Applio**), which already includes the safe loader fix. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | The model download failed, got cut off, or saved a webpage instead of the real file. | Check the file size: a real RVC `.pth` is usually **40 to 100+ MB**. If it is only a few KB or 0 KB, delete it and download it again. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | You loaded a raw training checkpoint (`G_*.pth` or `D_*.pth`) instead of a finished voice model, or mixed `v1` and `v2`. | Never copy raw `G_*.pth` files from `logs/` into `weights/`. Use the app's **Export** button to create the final `.pth`, and make sure `v1` / `v2` and sample rate match. |
| **Index error / wrong dimensions / RAM crash when building index** | You picked `trained_*.index` instead of `added_*.index`, paired an index from a different voice, or your dataset is huge. | Always choose **`added_*.index`** (never `trained_*.index`). If it still errors, set **Index Rate** to `0` to test without the index. Never mix `.index` files from different models. |

### 4. Voice Quality, Pitch & Audio Files

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| **Voice sounds like a chipmunk or a deep monster** | The **Pitch (Transpose)** setting does not match the original speaker and the target voice. | Use `0` for same gender, `+12` for male singing/speaking into a female voice, and `-12` for female into a male voice. Fine-tune by `+1` or `-1` from there. |
| **Voice sounds metallic, watery, robotic, or garbled** | The input audio has background music/reverb, the wrong Pitch Extractor is selected, or the Embedder does not match. | 1. Clean the input audio first with **UVR5** or **MVSep** so there is zero music or echo.<br>2. Set Pitch Extractor to **`rmvpe`**.<br>3. Make sure the Embedder matches how the model was trained (almost always **`contentvec`**).<br>4. Lower **Index Rate** from `1.0` down to `0.5` or `0.3`. |
| **Output still sounds too much like my own voice** | **Index Rate** is too low, or **Pitch** is still in your natural range instead of the target voice's range. | Adjust Pitch closer to the target voice (`+12` / `-12`), raise **Index Rate** slightly (`0.6` to `0.75`), or try a cleaner/stronger model. |
| **Converter refuses to open my audio file** | The file is an unsupported format (like `.m4a`, `.opus`, or broken `.mp3`) or has special characters in the name. | Convert the file to standard **PCM `.wav`** (44100 Hz or 48000 Hz) and rename it to something simple like `input.wav`. |

### 5. Dataset Preprocessing & Training

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / zero-size tensor | Your dataset folder is empty, contains completely silent clips, clips shorter than 1 second, or bad folder names. | Make sure your dataset folder has non-empty `.wav` files (each at least 2 to 10 seconds long), remove any silent or corrupted clips, use a simple folder path with no spaces, and start a fresh experiment. |
| `BrokenProcessPool` / PC freezes during Preprocessing | Too many CPU threads are trying to process audio at once and exhausting system RAM. | Lower the number of **CPU threads / workers** in Preprocessing (e.g. from `8` down to `2` or `4`) and check that you have plenty of free disk space. |
| `NaN loss` or exported model produces complete silence | A broken/clipped audio file in the dataset broke the math, `FP16` overflowed, or the `G/D` pretrain does not match. | Check your dataset clips for loud clipping/distortion or dead silence. Use the **stock RVC pretrain** matching your sample rate, turn **OFF** `FP16` (`FP32` instead), and start a new training run. |
| **Training will not resume / starts over from Epoch 0** | `Fresh Training` was left checked, or you renamed/moved files inside `logs/`. | Keep the entire `logs/<experiment_name>/` folder untouched, type the exact same **Experiment Name**, **Sample Rate**, and **Embedder**, set a higher total epoch count, and turn **OFF** `Fresh Training`. |
| **Model sounds muffled, noisy, or suffers from "overfitting"** | The model trained for too many epochs on a small/noisy dataset and memorized static instead of voice tone. | Stop earlier (test checkpoints every 50 to 100 epochs, e.g. 200 to 400 epochs for small datasets) and clean your dataset audio beforehand using **UVR5** or **MVSep**. |

### 6. Live Voice Changer, Mic & Discord

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| **Nobody in Discord / game can hear my converted voice** | Your target app is still listening to your real mic instead of the virtual cable, or the voice changer is not started. | 1. Install **VB-CABLE** (restart your PC afterward).<br>2. In the voice changer, set **Input** = your physical mic, and **Output** = `CABLE Input (VB-Audio Virtual Cable)`.<br>3. In **Discord / Game**, set **Input Device** = `CABLE Output (VB-Audio Virtual Cable)`. |
| `PortAudioError` / `Invalid sample rate` / audio device fails to start | Your Windows mic, headphones, and VB-CABLE are running at different speeds (`44100 Hz` vs `48000 Hz`), or another app locked the device. | Open **Windows Sound Control Panel (`mmsys.cpl`)**, open **Properties → Advanced** for your Mic, Headphones, `CABLE Input`, and `CABLE Output`, set **all of them to 48000 Hz**, uncheck **Allow applications to take exclusive control**, and restart the app. |
| **Stuttering, crackling, or huge voice delay** | Your GPU takes longer to process each audio chunk than the chunk length itself. | 1. Increase **Chunk Size** slightly (more stability, slightly more delay).<br>2. Use **RMVPE** or **FCPE** for pitch (never `crepe` full for live).<br>3. Cap game FPS or close heavy GPU apps so the voice changer always has GPU headroom.<br>4. Optionally test toggling Windows **HAGS** (before/after comparison) if stuttering persists. |
| **Echo or hearing yourself twice** | You are using speakers (the mic hears them), or two apps are playing your mic back at the same time. | Always wear **headphones**. Make sure Windows **"Listen to this device"** is **OFF** in Recording settings, and only enable Monitor inside the voice changer if you actually need to hear yourself. |
| **Discord cuts off breaths or the ends of words** | Discord's noise filter thinks your converted voice edges are background noise. | In Discord **Voice & Video** settings, turn **OFF** **Krisp Noise Suppression**, turn **OFF** **Echo Cancellation**, and turn **OFF** **Automatically determine input sensitivity** (set the slider manually). Also lower the VAD / Noise Gate threshold inside your voice changer. |

### 7. Cloud Notebooks (Colab & Kaggle)

| Problem or Error | What it means (in plain words) | How to fix it |
| --- | --- | --- |
| `CUDA not available` / `No GPU found` in Colab or Kaggle | You forgot to enable the GPU in the notebook settings, or hit your free GPU quota. | **Colab:** go to **Runtime → Change runtime type → T4 GPU**.<br>**Kaggle:** open the right sidebar **Settings → Accelerator → GPU T4 x2** (requires phone verification). |
| **Download fails inside notebook (`403` / Google Drive / Mega quota)** | A public link hit its daily download limit or was set to private. | Mirror the dataset or model to **Hugging Face** or your own Google Drive first, then download from there inside the notebook. |
| **Notebook disconnects in the middle of training** | Cloud notebooks shut down after inactivity or long sessions, wiping temporary storage. | Always save/sync your `logs/` and `weights/` folders to **Google Drive** (or Kaggle Output), and resume from your last saved `G_*.pth` / `D_*.pth` checkpoint instead of starting over. |

---

## App-Specific Quick Checks

- **Ilaria RVC:** Extract the full ZIP to a short path like `C:\IlariaRVC`. Use `RUN_ILARIA_RVC_LOGS.bat` if it closes on startup, check that `127.0.0.1:6969` is open, and look at the **first** error above the shutdown message.
- **Applio Desktop:** Open the **Setup** tab and check the engine status. Click **Install / Repair** if any check is red. For **Gradio**, keep the console window open and copy the exact `localhost` URL printed there.
- **RVC Mainline / w-okada / Deiteris / TGR:** Match **CUDA** (NVIDIA) vs **DirectML** (AMD/Intel) to your GPU before downloading. Extract split `.zip.001` archives with 7-Zip only after all parts are in the same folder.

## How to Ask for Help

When asking for help (for example on the [Ilaria RVC contact page](https://ilariarvc.shop/en/contact/)), include these 4 things so someone can solve it on the first reply:
1. **App name and version** (e.g. `Ilaria RVC 2.4.0`, `Applio Desktop`, `Deiteris`).
2. **Your PC specs:** Windows version, exact GPU model (e.g. `RTX 3060` or `RX 6700 XT`), and backend (`CUDA` / `DirectML` / `CPU`).
3. **The FIRST error line** from the console log (hide any private Windows username if needed).
4. **What you were doing:** Training (include sample rate, vocoder, embedder, and new vs resume) or Live Voice Changer (include your exact audio chain: `Mic -> App -> VB-CABLE -> Discord`).
