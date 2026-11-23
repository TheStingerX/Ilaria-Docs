# Installer Redpanda VC

[Version précompilée pour Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Commencez par la version précompilée pour Windows x64. L’application de bureau utilise Tauri et exécute les moteurs vocaux Python localement. Le code source inclut aussi une WebUI avec la même interface.

## Windows x64

1. Téléchargez le ZIP Windows x64, extrayez tout dans un dossier local accessible en écriture et ouvrez `Redpanda.exe` depuis ce dossier.
2. Attendez la fin de la configuration. Si aucun environnement ne peut être réutilisé, l’application prépare Python 3.12 et PyTorch via `uv` et détecte NVIDIA CUDA ou le CPU. Gardez ensemble `runtime/`, `assets/`, `datasets/`, `models/` et `logs/`.
3. Ouvrez **Inference**, choisissez une voix compatible et testez un WAV court. En cas d’échec au démarrage, vérifiez la première erreur, les droits d’écriture, la connexion pour les téléchargements et le pilote NVIDIA si vous utilisez CUDA.

## WebUI et compilation depuis le code

Depuis le code source, lancez `run-install.bat` sous Windows ou `run-install.sh` sous Linux/macOS. Ouvrez la WebUI avec `run-web.bat`, `run-web.sh` ou `python core.py web --host 127.0.0.1 --port 7860` dans l’environnement Python préparé. La compilation nécessite Rust et les outils WebView de la plateforme. Les améliorations du runtime portable et le thème Dark Frutiger Aero datent d’après le tag de la version.

[Inférence sur fichier](inference.md) · [Conversion vocale en temps réel](live-audio.md) · [Entraînement avec Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Code source et version

[README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Runtime](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/src/runtime.rs)
