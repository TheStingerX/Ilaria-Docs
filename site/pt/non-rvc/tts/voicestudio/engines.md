# VoiceStudio · Modelos e aceleração

[VoiceStudio v0.5.8 · Modelos e aceleração](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Preparação

Cada tarefa usa um motor e pesos adequados. Confirma idiomas, tamanho, dispositivo e licença antes de descarregar.

## Primeiro teste

Usa CPU como referência. CUDA é para NVIDIA. ROCm depende da placa AMD e do motor. Alguns motores GGUF usam Vulkan e Apple Silicon dispõe de Metal. Compara sempre a mesma frase.

## Verificação passo a passo

1. Decide entre TTS e ASR.
2. Confirma o idioma e dispositivo do motor antes de instalar.
3. Compara CPU e GPU com o mesmo texto após uma geração de teste.

[Primeira síntese](first-run.md) · [Resolução de problemas](troubleshooting.md)
