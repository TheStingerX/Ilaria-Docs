# So-VITS-SVC · Installation

So‑VITS‑SVC 4.1 Stable konvertiert Gesang. Das Repository ist seit November 2023 archiviert. Diese Version eignet sich für bestehende Modelle und ältere Projekte.

[GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Umgebung einrichten

Nutze eine getrennte Umgebung. Das Projekt testete Python 3.8.9. Alte Abhängigkeiten können auf aktuellen Systemen scheitern.

~~~bash
git clone --branch 4.1-Stable https://github.com/svc-develop-team/so-vits-svc.git
cd so-vits-svc
python -m venv .venv
~~~

Aktiviere die Umgebung und installiere `requirements_win.txt` unter Windows oder `requirements.txt` unter Linux. Installiere unter Windows ein passendes PyTorch- und TorchAudio-Paar. Prüfe bei Bedarf FFmpeg.

| Windows (PowerShell) | Linux (Bash) |
| --- | --- |
| `.\.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| `python -m pip install -r requirements_win.txt` | `python -m pip install -r requirements.txt` |

## Modell vorbereiten

Nutze die SVC-`.pth`, das zugehörige JSON und den darin angegebenen Encoder. Lege den Encoder in `pretrain/` und prüfe `python inference_main.py --help`.

[Nutzung und Training](usage.md)
