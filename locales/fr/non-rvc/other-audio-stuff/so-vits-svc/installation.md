---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /non-rvc/so-vits-svc/installation/
---

# So-VITS-SVC · Installation

So‑VITS‑SVC 4.1 Stable convertit des voix chantées. Le dépôt est archivé depuis novembre 2023. Cette version sert aux modèles existants et aux projets historiques.

[GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Configurer l’environnement

Utilisez un environnement séparé. Le projet a testé Python 3.8.9. Les anciennes dépendances peuvent échouer sur des systèmes récents.

~~~bash
git clone --branch 4.1-Stable https://github.com/svc-develop-team/so-vits-svc.git
cd so-vits-svc
python -m venv .venv
~~~

Activez l’environnement et installez `requirements_win.txt` sous Windows ou `requirements.txt` sous Linux. Sous Windows, ajoutez une paire PyTorch et TorchAudio compatible. Vérifiez FFmpeg au besoin.

| Windows (PowerShell) | Linux (Bash) |
| --- | --- |
| `.\.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| `python -m pip install -r requirements_win.txt` | `python -m pip install -r requirements.txt` |

## Préparer le modèle

Récupérez le `.pth` SVC, son JSON et l’encodeur correspondant à la configuration. Placez l’encodeur dans `pretrain/` et lancez `python inference_main.py --help`.

[Utilisation et entraînement](usage.md)
