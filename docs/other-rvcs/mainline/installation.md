---
label: "Install and open"
icon: ":toolbox:"
order: 40
permalink: /ilaria-rvc/mainline/installation/
description: "RVC WebUI (Mainline - Original RVC) is the upstream Retrieval-based Voice Conversion WebUI. Use its browser interface for file conversion and training."
---

# Install RVC WebUI (Mainline - Original RVC)

[GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI)

RVC WebUI (Mainline - Original RVC) is the upstream Retrieval-based Voice Conversion WebUI. Use its browser interface for file conversion and training. For microphone conversion, use the separate desktop interface described in the [real-time guide](realtime.md).

## Pick one installation route

| Your setup | What to use |
| --- | --- |
| Windows and a supported GPU | Start with a matching prebuilt Windows archive. This is the shortest route. |
| Windows and an NVIDIA RTX 50-series GPU | Use a package explicitly marked for the 50 series or the source setup with the CUDA 12.8 Torch build. Older NVIDIA archives can start but fail when they try to run GPU operations. |
| Windows and an AMD or Intel GPU | Choose the matching AMD/Intel archive. DirectML support depends on the release and operation. Test file conversion first. |
| Ubuntu or a custom Windows setup | Install the current source branch into a separate Python environment. |

### Windows archive

1. Open the [RVC WebUI (Mainline - Original RVC) Windows package and asset downloads](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) and choose the archive matching your GPU. For the current package family, look for the `20260718` NVIDIA, NVIDIA 50-series, or AMD/Intel variant. If you already have an older release that works, leave it in its own directory.
2. Extract the entire archive to a writable local folder such as `C:\RVC\Mainline`. Allow space for both the download and the extracted files. In File Explorer, open the resulting folder and look for the launcher, `assets`, and the Python runtime. If you see one more enclosing directory, open it.
3. Run `go-webui.bat` if present. Older archives may call it `go-web.bat`. Keep the command window open and wait for the local address. If the browser does not start, open the address shown in the terminal. A common default is `http://127.0.0.1:7865`.
4. Confirm that the page opens and that the terminal remains running. Keep the archive intact until the [first conversion](inference.md) succeeds.

### Current source branch

> **Recommended on Windows:** download the [ready-to-use Windows archive](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) for your GPU. Installing from source is discouraged for most users because you have to configure Python and its dependencies yourself.

Download and extract the [RVC WebUI (Mainline - Original RVC) source ZIP](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/archive/refs/heads/main.zip). Open a terminal in the directory containing `webui.py` and the requirements files. The source setup below applies to the Python 3.12 branch. Run each snippet from that directory using a 64-bit Python 3.12 interpreter.

**Windows PowerShell**

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

If PowerShell blocks the activation script, open Command Prompt in the same directory and run `.venv\Scripts\activate.bat`. On Windows, put [ffmpeg.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffmpeg.exe?download=true) and [ffprobe.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffprobe.exe?download=true) beside `webui.py`.

**Ubuntu 24.04**

```bash
sudo apt update
sudo apt install python3.12-venv python3.12-dev ffmpeg unzip libsndfile1 libportaudio2
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

Choose **one** dependency set. The filenames contain `requirments` as spelled in the repository. Run the matching block from top to bottom.

**CPU, AMD, or Intel**

```text
python -m pip install -r requirments_cpu_py312.txt
```

**NVIDIA RTX 50 series**

```text
python -m pip install torch==2.7.1+cu128 torchaudio==2.7.1+cu128 --index-url https://download.pytorch.org/whl/cu128 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu128_py312.txt
```

**Supported older NVIDIA cards**

```text
python -m pip install torch==2.7.1+cu118 torchaudio==2.7.1+cu118 --index-url https://download.pytorch.org/whl/cu118 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu118_py312.txt
```

Check which interpreter and Torch build the terminal is using:

```text
python -c "import sys, torch; print(sys.executable); print(torch.__version__); print(torch.cuda.is_available())"
```

Expect the interpreter path to contain `.venv`. CUDA availability should be `True` for working NVIDIA CUDA inference. CPU and DirectML installations can show `False` in this CUDA check.

Install the shared feature and pitch models before your first conversion:

```text
python -m pip install huggingface_hub
hf download lj1995/VoiceConversionWebUI --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --local-dir assets/rmvpe
```

> Generic HuBERT checkpoints are not recommended as the default encoder for voice conversion. Their speech prediction training does not explicitly remove speaker identity, so the features can carry source timbre into the output. For RVC, use the encoder expected by the model, such as ContentVec when the voice was trained with it.

Windows DirectML setups that use the ONNX pitch model also need `hf download lj1995/VoiceConversionWebUI rmvpe.onnx --local-dir assets/rmvpe`. The [training guide](training.md) lists the additional training assets.

Run `python webui.py` from the same directory. The feature encoder should be a folder named `assets/hubert_base` containing the config, preprocessing config and weight file. If you installed a legacy archive, keep its bundled files and naming conventions together.

## If the WebUI will not open

| What you see | What to check first |
| --- | --- |
| No browser tab | Read the last lines in the terminal and copy the actual local URL. If the default port is busy, a build may choose another one. |
| The launcher opens and immediately closes | Run it from an existing Command Prompt inside the extracted folder so you can read the first error. Check that extraction finished before changing dependencies. |
| `ModuleNotFoundError` on a source install | Confirm that you launched from the virtual environment used for installation. Complete the matching requirements installation. |
| CUDA is unavailable on an NVIDIA setup | Check the GPU model, driver and Torch wheel together. An RTX 50-series system needs the matching build. |
| Missing HuBERT, RMVPE or FFmpeg | Check the asset folders and executable paths above. Retry with a simple local WAV after correcting the missing file. |

When the interface opens, continue with [your first file conversion](inference.md).

[Interactive RVC Compatibility Matrix](../../reference/compatibility-matrix.md)
