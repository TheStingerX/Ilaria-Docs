# Instalar o Redpanda VC

[Versão pré-compilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Começa pela versão pré-compilada para Windows x64. A aplicação de desktop usa Tauri e executa os motores vocais Python localmente. O código-fonte também inclui uma WebUI com a mesma interface.

## Windows x64

1. Descarrega o ZIP para Windows x64, extrai tudo para uma pasta local com permissões de escrita e abre `Redpanda.exe` a partir dessa pasta.
2. Aguarda pelo fim da configuração. Se não puder reutilizar um ambiente, a aplicação prepara Python 3.12 e PyTorch através de `uv` e deteta NVIDIA CUDA ou CPU. Mantém juntos `runtime/`, `assets/`, `datasets/`, `models/` e `logs/`.
3. Abre **Inference**, escolhe uma voz compatível e testa um WAV curto. Se a aplicação falhar ao arrancar, verifica o primeiro erro, as permissões, a ligação para descarregamentos e o controlador NVIDIA se usares CUDA.

## WebUI e compilação a partir do código-fonte

A partir do código-fonte, executa `run-install.bat` no Windows ou `run-install.sh` no Linux/macOS. Abre a WebUI com `run-web.bat`, `run-web.sh` ou `python core.py web --host 127.0.0.1 --port 7860` no ambiente Python preparado. A compilação requer Rust e as ferramentas WebView da plataforma. As melhorias do ambiente portátil e o tema Dark Frutiger Aero são posteriores à tag da versão.

[Inferência por ficheiros](inference.md) · [Conversão de voz em tempo real](live-audio.md) · [Treino com Causal Voice Changer](causal-training.md) · [RVC Training](training.md)

## Código-fonte e versão

[README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Runtime](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/src/runtime.rs)
