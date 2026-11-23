# Installare Redpanda VC

[Release precompilata per Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Parti dalla release precompilata per Windows x64. L’app desktop usa Tauri ed esegue i motori vocali Python in locale. Il sorgente include anche una WebUI con la stessa interfaccia.

## Windows x64

1. Scarica lo ZIP Windows x64 dalla pagina della release. Estrai tutto in una cartella locale in cui puoi scrivere e avvia `Redpanda.exe` da lì.
2. Attendi il completamento della configurazione. Se non riutilizza un runtime, l’app prepara Python 3.12 e PyTorch tramite `uv` e rileva NVIDIA CUDA o CPU. Tieni insieme `runtime/`, `assets/`, `datasets/`, `models/` e `logs/`.
3. Apri **Inference**, scegli una voce compatibile e prova un WAV breve. Se l’avvio fallisce, controlla il primo errore, i permessi della cartella, la connessione per i download e il driver NVIDIA se usi CUDA.

## WebUI e build da sorgente

Da un checkout del sorgente, esegui `run-install.bat` su Windows o `run-install.sh` su Linux/macOS. Avvia la WebUI con `run-web.bat`, `run-web.sh` o `python core.py web --host 127.0.0.1 --port 7860` nell’ambiente Python preparato. Per compilare l’app desktop servono Rust e gli strumenti WebView della piattaforma. I miglioramenti al runtime portabile e il tema Dark Frutiger Aero sono successivi al tag della release.

[Inferenza da file](inference.md) · [Conversione vocale in tempo reale](live-audio.md) · [Training con Causal Voice Changer](causal-training.md) · [RVC Training](training.md)

## Sorgente e release

[README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Runtime](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/src/runtime.rs)
