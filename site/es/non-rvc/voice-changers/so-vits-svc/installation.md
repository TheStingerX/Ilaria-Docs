# So-VITS-SVC · Instalación

So‑VITS‑SVC 4.1 Stable convierte voces cantadas. El repositorio está archivado desde noviembre de 2023. Está pensado aquí para modelos existentes y flujos históricos.

[GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Configurar el entorno

Usa un entorno aislado. El proyecto probó Python 3.8.9. Las dependencias antiguas pueden fallar en sistemas actuales.

~~~bash
git clone --branch 4.1-Stable https://github.com/svc-develop-team/so-vits-svc.git
cd so-vits-svc
python -m venv .venv
~~~

Activa el entorno e instala `requirements_win.txt` en Windows o `requirements.txt` en Linux. En Windows, prepara versiones compatibles de PyTorch y TorchAudio. Comprueba FFmpeg si lo necesitas.

| Windows (PowerShell) | Linux (Bash) |
| --- | --- |
| `.\.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| `python -m pip install -r requirements_win.txt` | `python -m pip install -r requirements.txt` |

## Preparar los modelos

Usa el `.pth` de SVC, su JSON y el encoder indicado por la configuración. Guarda el encoder en `pretrain/` y ejecuta `python inference_main.py --help`.

[Uso y entrenamiento](usage.md)
