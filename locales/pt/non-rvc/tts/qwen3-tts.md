---
label: "Qwen3-TTS"
icon: ":microphone:"
order: 95
permalink: /non-rvc/tts/qwen3-tts/
---

# Qwen3-TTS

CustomVoice usa vozes predefinidas, VoiceDesign usa uma descrição e Base usa uma gravação autorizada.

## Primeira síntese

Usa Python 3.12 num ambiente isolado. Começa com 0.6B. O primeiro arranque descarrega os pesos.

~~~bash
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
python -m pip install -U qwen-tts
qwen-tts-demo --help
qwen-tts-demo Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --ip 127.0.0.1 --port 8000
~~~

## Modos de voz

Abre o endereço local, seleciona voz e idioma e gera uma frase. Para Base, usa áudio limpo e a transcrição exata quando necessária.

| Mode | Hugging Face model ID |
| --- | --- |
| CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` |
| VoiceDesign | `Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign` |
| Base | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |

## Resolução de problemas

Se faltar VRAM, experimenta um modelo menor quando existir e consulta a ajuda da demonstração.

[GitHub · Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
