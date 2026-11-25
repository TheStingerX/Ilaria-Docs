# So-VITS-SVC · Installazione

So‑VITS‑SVC 4.1 Stable è un progetto di conversione vocale pensato per il canto. Il repository originale è stato archiviato a novembre 2023. È utile per recuperare modelli SVC o riprodurre vecchi flussi di lavoro. I modelli di RVC e GPT‑SoVITS appartengono a sistemi diversi.

[GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Configura l’ambiente

Usa un ambiente Python separato. Il progetto documenta prove con Python 3.8.9. Le dipendenze sono datate e la configurazione può fallire con versioni recenti di Python, PyTorch o degli strumenti per installare pacchetti. Installa FFmpeg a parte se necessario e controlla che risponda a `ffmpeg -version`.

~~~bash
git clone --branch 4.1-Stable https://github.com/svc-develop-team/so-vits-svc.git
cd so-vits-svc
python -m venv .venv
~~~

Clona il ramo storico, entra nella cartella del progetto e crea un ambiente con un interprete Python compatibile. Attivalo prima di installare i pacchetti. Su Windows usa `requirements_win.txt`, su Linux `requirements.txt`. Su Windows installa a parte una coppia compatibile di PyTorch e TorchAudio. Verifica che entrambi si importino prima di provare un modello.

| Windows (PowerShell) | Linux (Bash) |
| --- | --- |
| `.\.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| `python -m pip install -r requirements_win.txt` | `python -m pip install -r requirements.txt` |

## Prepara modello ed encoder

Procurati il `.pth` SVC e il `.json` di configurazione abbinato. Nella configurazione leggi quale encoder usa il modello. Metti i pesi di quell’encoder in `pretrain/`, con il nome atteso dal ramo. Per `vec768l12` e `vec256l9`, segui le istruzioni ufficiali sugli asset ContentVec. Tieni insieme modello e configurazione. Controlla che il comando `python inference_main.py --help` funzioni.

[Uso e addestramento](usage.md)
