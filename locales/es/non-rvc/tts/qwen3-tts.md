---
label: "Qwen3-TTS"
icon: ":microphone:"
order: 95
permalink: /non-rvc/tts/qwen3-tts/
---

# Qwen3-TTS

CustomVoice usa voces predefinidas, VoiceDesign recibe una descripción y Base usa una grabación autorizada.

## Primera síntesis

Usa Python 3.12 en un entorno separado. 0.6B es una primera prueba. El primer inicio descarga los pesos.

~~~bash
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
python -m pip install -U qwen-tts
qwen-tts-demo --help
qwen-tts-demo Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --ip 127.0.0.1 --port 8000
~~~

## Modos de voz

Abre la URL local. Selecciona la voz y el idioma, escribe una frase y guarda el audio. Para Base, utiliza una grabación limpia y su transcripción exacta cuando corresponda.

| Mode | Hugging Face model ID |
| --- | --- |
| CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` |
| VoiceDesign | `Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign` |
| Base | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |

## Solución de problemas

Si falta VRAM, usa un modelo más pequeño cuando exista. Consulta las opciones de la demo.

[GitHub · Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
