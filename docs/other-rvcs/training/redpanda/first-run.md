---
label: "Set up Redpanda VC"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
description: "Start with the Windows x64 precompiled release. The desktop app uses Tauri and runs its Python voice engines locally. The source checkout also includes a browser WebUI with the same interface."
---

# Set up Redpanda VC

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Start with the Windows x64 precompiled release. The desktop app uses Tauri and runs its Python voice engines locally. The source checkout also includes a browser WebUI with the same interface.

## Windows x64

1. Download the Windows x64 ZIP from the release page. Extract the whole archive into a writable local folder and open `Redpanda.exe` from that folder.
2. Allow the first setup to finish. The desktop bootstrap uses portable Python 3.12 and PyTorch via `uv` when it cannot reuse an installed runtime. It detects NVIDIA CUDA or CPU. Keep `runtime/`, `assets/`, `datasets/`, `models/` and `logs/` together.
3. Open **Inference**, choose a compatible voice and test a short WAV. If the app fails before the UI loads, check the first startup error, the writable folder, network access for downloads and the NVIDIA driver if you expect CUDA.

## Browser WebUI and source builds

In a source checkout, run `run-install.bat` on Windows or `run-install.sh` on Linux/macOS. Start the browser interface with `run-web.bat`, `run-web.sh` or `python core.py web --host 127.0.0.1 --port 7860`, using the prepared Python environment. Compiling the desktop app is a separate process that requires Rust and the platform WebView development tools. The Windows portable-runtime improvements and Dark Frutiger Aero theme landed after the release tag. Check the source revision before looking for them.

[File inference](inference.md) · [Realtime voice conversion](live-audio.md) · [Causal Voice Changer training](causal-training.md) · [RVC Training](training.md)

## Source and release

[README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Runtime](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/src/runtime.rs)
