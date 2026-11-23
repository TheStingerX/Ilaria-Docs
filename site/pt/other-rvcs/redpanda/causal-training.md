# Treino com Causal Voice Changer

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

A opção Causal Voice Changer do Redpanda integra Causal Voice Changer v0.4.0. O ajuste fino cria uma voz .cvc para o motor CVC.

## Treinar e retomar uma voz

Prepara gravações limpas de uma pessoa e reserva uma amostra para teste. Abre **Training → Causal Voice Changer**, escolhe o nome da voz, a pasta e o dispositivo, e define **Training steps**. A base é descarregada quando for necessária. A versão guarda a cada 1.000 passos por predefinição. Para retomar, usa o mesmo nome e a mesma pasta com um objetivo de passos superior. Conserva os ficheiros de treino e testa o `.cvc` em Inference e Realtime.

## Exportações e licença

O projeto original indica uso não comercial para a base CVC predefinida e os ajustes finos derivados. Usa gravações para as quais tens autorização de treino. Procura a exportação em `logs/causalvc/` na versão portátil ou em `runs/models/voice-<name>/voices/` no checkout.

[Instalar o Redpanda VC](first-run.md) · [Inferência por ficheiros](inference.md) · [Conversão de voz em tempo real](live-audio.md) · [RVC Training](training.md) · [Causal Voice Changer](../../non-rvc/causal-voice-changer/overview.md)

## Código-fonte e versão

[CVC trainer](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/causalvc/trainer.py) · [CVC upstream](https://github.com/mojowozo/Causal-Voice-Changer/tree/50dce9236854fef17f550571413367217e235155)
