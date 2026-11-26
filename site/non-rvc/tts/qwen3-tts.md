# Qwen3-TTS

Qwen3-TTS has three model families. **CustomVoice** uses named preset speakers. **VoiceDesign** builds a voice from a natural-language description. **Base** uses a reference recording from a speaker who granted permission. Match the model to the mode you want before downloading weights.

## First synthesis

The upstream guide recommends an isolated Python 3.12 environment. Start with 0.6B CustomVoice if resources are limited. First launch needs internet to download the weights. Check the demo help for device, dtype and attention flags. FlashAttention is optional and depends on your hardware and runtime.

~~~bash
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
python -m pip install -U qwen-tts
qwen-tts-demo --help
qwen-tts-demo Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --ip 127.0.0.1 --port 8000
~~~

## Voice modes

Open the local address printed by the demo. Choose a supported speaker and language and generate one sentence. Then try a different family by stopping the demo and launching it with the model ID below. VoiceDesign works best with a concrete description of pace, tone and delivery. For Base, use clean single-speaker audio and type the exact reference transcript when using the reference-text workflow. Listen to a short result before generating a long script.

| Mode | Hugging Face model ID |
| --- | --- |
| CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` |
| VoiceDesign | `Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign` |
| Base | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |

## Troubleshooting

If the process exhausts VRAM, stop competing GPU workloads and try the smaller family variant where available. If FlashAttention fails, use the attention options listed by your installed demo and omit FlashAttention. Use the model’s supported language list and keep the text short while debugging.

[GitHub · Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
