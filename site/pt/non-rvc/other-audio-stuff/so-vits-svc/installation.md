# So-VITS-SVC · Instalação

O So‑VITS‑SVC 4.1 Stable converte vozes cantadas. O repositório está arquivado desde novembro de 2023. Esta versão serve para modelos existentes e projetos antigos.

[GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Configurar o ambiente

Usa um ambiente separado. O projeto testou Python 3.8.9. As dependências antigas podem falhar em sistemas atuais.

~~~bash
git clone --branch 4.1-Stable https://github.com/svc-develop-team/so-vits-svc.git
cd so-vits-svc
python -m venv .venv
~~~

Ativa o ambiente e instala `requirements_win.txt` no Windows ou `requirements.txt` no Linux. No Windows, prepara uma versão compatível de PyTorch e TorchAudio. Verifica o FFmpeg se necessário.

| Windows (PowerShell) | Linux (Bash) |
| --- | --- |
| `.\.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| `python -m pip install -r requirements_win.txt` | `python -m pip install -r requirements.txt` |

## Preparar o modelo

Usa o `.pth` SVC, o seu JSON e o encoder indicado na configuração. Coloca o encoder em `pretrain/` e executa `python inference_main.py --help`.

[Utilização e treino](usage.md)
