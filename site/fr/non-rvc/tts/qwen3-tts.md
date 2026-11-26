# Qwen3-TTS

CustomVoice utilise des voix prédéfinies. VoiceDesign reçoit une description. Base utilise un enregistrement autorisé.

## Première synthèse

Utilisez Python 3.12 dans un environnement isolé. Commencez par 0.6B. Le premier démarrage télécharge les poids.

~~~bash
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
python -m pip install -U qwen-tts
qwen-tts-demo --help
qwen-tts-demo Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --ip 127.0.0.1 --port 8000
~~~

## Modes vocaux

Ouvrez l’adresse locale, choisissez la voix et la langue puis générez une phrase. Pour Base, utilisez une référence propre et sa transcription exacte si demandée.

| Mode | Hugging Face model ID |
| --- | --- |
| CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` |
| VoiceDesign | `Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign` |
| Base | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |

## Dépannage

Si la VRAM manque, testez un modèle plus petit lorsqu’il existe et consultez l’aide du démo.

[GitHub · Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
