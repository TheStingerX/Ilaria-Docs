---
label: "🩺 Troubleshooting"
order: 95
permalink: /troubleshooting/
---
# Troubleshooting RVC

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
New to RVC? **Start with a 10-second WAV and one model.** If the app fails, open the log and copy the first error. If it runs but sounds wrong, replay the same clip before changing one setting. The log is the app's record of what happened. A checkpoint is a saved model or training state.
!!!

A useful diagnosis starts at the first stage that fails. Keep the app version, the first error, and one reproducible test. Make one change at a time and compare against the same file or spoken phrase.

## Find your symptom

| Symptom | First test |
| --- | --- |
| Launcher exits or browser shows a connection error | Keep the console open and verify the local address printed by that instance. |
| Model is missing, refuses to load, or reports a missing key | Confirm that the file is an inference export and check its architecture and embedder. |
| Converter cannot read the file | Try a short PCM WAV from a simple local path. |
| Conversion works without an index | Verify the index belongs to the selected model and its feature representation. |
| Voice sounds metallic, indistinct, or too much like the input | Compare several clean clips and a known-good checkpoint with effects and retrieval off. |
| Training stops, stalls, or produces no usable export | Identify the failing stage and inspect the log and artifacts for that experiment. |
| CUDA fails or the machine runs out of memory | Distinguish unsupported hardware or runtime, GPU memory exhaustion, and system RAM / Pagefile pressure. |
| Microphone has delay, gaps, silence, or echo | Test the physical input, converted monitor, virtual cable, and destination separately. |

## Establish a baseline

1. Record 10-20 seconds of one speaker with clear vowels, an `s` or `f`, and a natural pause. Use a local WAV, at moderate level, without music or effects.
2. Select one trusted inference model compatible with the app. Record its name, embedder, and speaker slot. Start at zero transposition with the default pitch extractor, optional processing off, and retrieval at zero.
3. Convert and save to a writable local folder. Play the file in a second player if the browser preview is silent. Compare the same phrase at similar volume.
4. Repeat with a known-good model using its own compatible encoder. If both models fail on the same input, look at the shared decode, runtime, or settings. If only one consistently fails, inspect that model, its configuration, and the training data if available.
5. Re-enable one option per test. Save each result with the settings in its filename or notes so you can revert to a known working combination.

---

## Known errors & exact fixes

### 1. Windows, Paths, Python & Launcher errors

| Error / Message | Cause | How to fix it |
| --- | --- | --- |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] The filename or extension is too long` | Windows 260-character path limit, or spaces/special symbols in folder or filenames. | Move the app and datasets to a short root path (e.g. `C:\RVC` or `D:\IlariaRVC`). Remove spaces, `()`, `[]`, and non-ASCII/Unicode characters from folder and audio filenames. |
| `[WinError 2] The system cannot find the file specified` (during audio load/export) | Missing `ffmpeg.exe` / `ffprobe.exe`, or FFmpeg is not on `PATH`. | Verify the bundled `ffmpeg` executable exists in the app folder. For source installs, install FFmpeg and add it to the system `PATH`, then restart the terminal. |
| `PermissionError: [Errno 13] Permission denied` / `[WinError 5]` | Writing to `Program Files`, `OneDrive`, a read-only folder, or a file currently open in another app/antivirus. | Extract the app to a writable folder you own (not `Program Files` or `OneDrive`), close players holding the file, and add the app folder as an antivirus exclusion. |
| `ModuleNotFoundError: No module named 'fairseq'` | `fairseq` fails to compile on Python 3.11+ or without C++ build tools. | Use the bundled portable package, or recreate your source environment with **Python 3.9 or 3.10** and install **Microsoft Visual Studio Build Tools** (*Desktop development with C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / missing DLL | Missing or mismatched Microsoft Visual C++ Redistributable, or corrupted runtime DLL. | Install or repair the official **Microsoft Visual C++ 2015-2022 Redistributable (x64)**. If the DLL is missing, re-extract the original package. |
| `Expecting value: line 1 column 1` / blank Gradio page | The server crashed before responding, the browser hit an HTML error page, or a proxy/VPN is intercepting `127.0.0.1`. | Keep the console window open and read the earliest Python traceback. Verify the exact port (`127.0.0.1:6969` in Ilaria RVC, `7865` in Gradio/Deiteris) and bypass proxies for `localhost` / `127.0.0.1`. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Network block, VPN, or Hugging Face/GitHub timeout while downloading `hubert_base.pt` or `rmvpe.pt`. | Temporarily disable strict firewall/VPN rules, or manually download `hubert_base.pt` and `rmvpe.pt` and place them in `assets/hubert/` and `assets/rmvpe/`. |

### 2. GPU, CUDA, DirectML & Memory errors

| Error / Message | Cause | How to fix it |
| --- | --- | --- |
| **VRAM spills to system RAM / sluggish training / robotic live audio (Windows 10/11)** | **Hardware-Accelerated GPU Scheduling (HAGS)** interferes with PyTorch VRAM allocation and starves background voice changers. | Go to **Windows Settings → System → Display → Graphics → Advanced Graphics Settings**, turn **OFF** **Hardware-accelerated GPU Scheduling**, and **restart your PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Inference) | Audio file is too long or competing apps (games, browser hardware acceleration) are using VRAM. | Enable **Split Audio** for long tracks, close competing GPU apps, unload unused models, and disable optional post-processing. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Training) | Batch size is too high for your VRAM, or dataset caching in VRAM is enabled. | Lower **Batch Size** (e.g., from `8` down to `4`, `2`, or `1`), turn **OFF** dataset caching in VRAM, and stop any live voice changer before training. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Driver/PyTorch mismatch, unstable GPU overclock/undervolt, or exhausted shared memory. | Update your NVIDIA drivers, remove any GPU overclock/undervolt, and ensure your PyTorch CUDA build matches your driver. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available for execution on the device` | Wrong package for your GPU generation (e.g. old CUDA build on RTX 50, or CPU-only PyTorch). | Match the runtime to your GPU: Ilaria RVC bundles **CUDA 12.8** for GTX 16 / RTX 20-50 and auto-downloads **CUDA 12.6** (`runtime-cu126`) for Maxwell/Pascal/Volta. Intel/AMD GPUs require a DirectML/ROCm build or cloud GPU. |
| `RuntimeError: expected scalar type Half but found Float` (or `HalfTensor` error) | `FP16` half-precision forced on a GPU/backend that does not support it (GTX 10-series, DirectML, CPU). | Disable **FP16** in settings and switch to **FP32** (full precision). |
| `OSError: [WinError 1455] The paging file is too small for this operation to complete` | Windows Virtual Memory (Pagefile) is exhausted during model loading, index building, or training. | Open **System Properties → Advanced → Performance Settings → Advanced → Virtual Memory**, set a larger custom Pagefile (e.g., `16384–32768 MB`), and restart. |

### 3. Model loading, Checkpoints, Embedders & Indexes

| Error / Message | Cause | How to fix it |
| --- | --- | --- |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ defaults `torch.load` to `weights_only=True`, blocking legacy fairseq objects in older builds. | Update to the latest version of the app (e.g., Ilaria RVC 2.4.0+ or latest Applio), which handles `safe_globals` for `Dictionary` automatically. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | The `.pth` download was interrupted, corrupted, or the browser saved an HTML login page instead of the binary file. | Check file size (a valid RVC `.pth` is typically 40-100+ MB, not a few KB). Delete the broken file and re-download cleanly. |
| `Missing key(s) in state_dict` / `RuntimeError: Sizes of tensors must match` | Loading a raw training checkpoint (`G_*.pth` or `D_*.pth` from `logs/`) instead of an inference export, or mixing `v1` (256-d) and `v2` (768-d). | Use the app's **Export** tool to create an inference `.pth` (do not copy raw `G_*.pth` files into `models/`), and verify `v1` vs `v2` and sample rate match. |
| Garbled pronunciation or source voice bleeds heavily into output | **Embedder mismatch** between training and inference, or using a generic HuBERT encoder instead of `contentvec`. | Match the exact embedder used during training (almost always **`contentvec`**). Leave Retrieval off first to isolate embedder issues. |
| Index error / dimension mismatch / RAM crash building index | Using `trained_*.index` instead of `added_*.index`, pairing an index from a different model/embedder, or too many features for system RAM. | Always pick `added_*.index` (or set retrieval to `0` to test without index). Never mix indexes across different models or RVC versions. |

### 4. Dataset Preprocessing, Feature Extraction & Training

| Error / Message | Cause | How to fix it |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / zero-size tensor | Empty dataset folder, completely silent clip, clip shorter than 1 second, or spaces/Unicode in dataset path. | Use a simple path with no spaces, remove silent/corrupted clips, ensure all clips are non-empty WAV files, and re-run preprocessing in a fresh experiment. |
| `BrokenProcessPool` / preprocessing workers die | Too many parallel CPU workers exhausting system RAM. | Lower the CPU thread/worker count in preprocessing settings and ensure sufficient free disk space. |
| `NaN loss` or completely silent exported model | Corrupted/clipped audio in dataset, mismatched `G`/`D` pretrain pair, or `FP16` numerical overflow. | Inspect dataset clips for clipping/silence, verify your `G/D` pretrain matches sample rate and vocoder (or use stock RVC pretrain), and test `FP32` in a new run. |
| Resume training fails or starts from epoch 0 | `Fresh Training` was left enabled, or `G_*.pth` / `D_*.pth` / `config.json` were moved or renamed. | Keep the entire `logs/<experiment>/` folder intact, use the exact same experiment name, sample rate, and embedder, set a higher total epoch target, and keep `Fresh Training` **off**. |

### 5. Live Voice Changer, PortAudio & Routing

| Error / Message | Cause | How to fix it |
| --- | --- | --- |
| `PortAudioError` / `Invalid sample rate` / device fails to open | Windows audio devices are set to mismatched sample rates, or another app holds Exclusive Mode control. | In **Windows Sound Control Panel**, set both your physical mic, headphones, and `VB-CABLE` endpoints to **48000 Hz**, disable **Exclusive Mode**, and restart after installing any virtual cable. |
| Robotic stutter, crackling, or high delay | GPU inference time exceeds Chunk duration, HAGS is on, or competing GPU apps (games) are running. | Increase **Chunk Size**, switch pitch extractor to **RMVPE** or **FCPE**, disable **HAGS** in Windows, and close competing GPU workloads. |
| Echo or double voice in your headphones | Using speakers instead of headphones, or monitoring twice (Windows "Listen to this device" + app monitor). | Always wear **headphones**, and enable monitoring in **only one place**. |
| Breaths or word endings get cut off in Discord | Discord's **Krisp Noise Suppression** or **automatic input sensitivity** is filtering them out. | Disable Krisp and automatic sensitivity in Discord Voice Settings for the virtual mic input, and lower VAD / Noise Gate thresholds in your voice changer. |

---

## App-specific startup checks

- **Ilaria RVC:** Extract the complete package, open its folder, and run `RUN_ILARIA_RVC_LOGS.bat`. Look above the last shutdown message for the first exception. Check that Windows detects your NVIDIA GPU and that `127.0.0.1:6969` is not blocked or already in use.
- **Applio Desktop:** Open **Setup** and inspect the engine status. Run **Install / Repair** when a runtime or package check fails. For **Gradio**, keep the launch console open and open the exact `localhost` address printed there.
- **RVC WebUI (Mainline) / w-okada / Deiteris / TGR:** Match the CUDA vs. DirectML package to your GPU. Never extract split `.zip.001` archives without having all parts in the same folder first.

## Reporting a problem

When asking for help (such as on the [contact page](https://ilariarvc.shop/en/contact/) for Ilaria RVC), include:
1. App name, edition, and version (e.g. `Ilaria RVC 2.4.0`).
2. Operating system, exact GPU model, and backend (`CUDA` / `DirectML` / `CPU`).
3. The **first error line** and surrounding log lines (remove private paths/account info).
4. For training: failed stage, sample rate, vocoder, embedder, and whether it was a new run or resume. For live audio: exact signal chain (`Mic → App → Virtual Cable → Target App`).
