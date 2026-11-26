---
label: "Qwen3-TTS"
icon: ":microphone:"
order: 95
permalink: /non-rvc/tts/qwen3-tts/
---

# Qwen3-TTS

CustomVoice nutzt vorgegebene Stimmen, VoiceDesign eine Beschreibung, Base eine genehmigte Referenzaufnahme.

## Erste Synthese

Nutze Python 3.12 in einer eigenen Umgebung. Beginne mit 0.6B. Der erste Start lädt Modellgewichte.

~~~bash
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
python -m pip install -U qwen-tts
qwen-tts-demo --help
qwen-tts-demo Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --ip 127.0.0.1 --port 8000
~~~

## Stimmmodi

Öffne die lokale Adresse, wähle Stimme und Sprache und erzeuge einen Satz. Für Base nutze eine saubere Aufnahme samt exaktem Transkript, falls erforderlich.

| Mode | Hugging Face model ID |
| --- | --- |
| CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` |
| VoiceDesign | `Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign` |
| Base | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |

## Fehlerbehebung

Bei zu wenig VRAM probiere ein kleineres Modell, sofern verfügbar, und prüfe die Hilfe.

[GitHub · Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
