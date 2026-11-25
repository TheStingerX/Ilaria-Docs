---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /non-rvc/so-vits-svc/installation/
---

# So-VITS-SVC · Installation

So‑VITS‑SVC 4.1 Stable is a singing voice conversion project. The upstream repository was archived in November 2023. Use it for an existing SVC model or to reproduce an older workflow. A model from RVC or GPT‑SoVITS belongs to a different system.

[GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Set up the environment

Use a separate Python environment. Upstream tested Python 3.8.9. The dependency files are historical, so a clean install can fail on current Python, PyTorch or package tooling. Install FFmpeg separately if your setup needs it and check it with `ffmpeg -version`.

~~~bash
git clone --branch 4.1-Stable https://github.com/svc-develop-team/so-vits-svc.git
cd so-vits-svc
python -m venv .venv
~~~

Clone the historical branch, enter the project directory, and create a dedicated environment using a Python interpreter compatible with the branch. Activate it before installing. Use `requirements_win.txt` on Windows or `requirements.txt` on Linux. On Windows, install a compatible PyTorch and TorchAudio pair separately. Check that both imports work before troubleshooting the voice model.

| Windows (PowerShell) | Linux (Bash) |
| --- | --- |
| `.\.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| `python -m pip install -r requirements_win.txt` | `python -m pip install -r requirements.txt` |

## Prepare the model and encoder

Get the SVC `.pth` and its matching `.json` configuration. In the configuration, look up the speech encoder. Place that encoder’s weights in `pretrain/` with the filename expected by the branch. For `vec768l12` and `vec256l9`, follow the upstream ContentVec asset instructions. Keep the original model and configuration together. Run `python inference_main.py --help` to verify the entry point.

[Use and training](usage.md)
