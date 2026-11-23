---
label: "Redpanda VC e outras aplicações RVC"
icon: ":clipboard:"
order: 94
permalink: /ilaria-rvc/redpanda/comparison/
description: "O Redpanda VC reúne RVC e Causal Voice Changer numa interface comum ao desktop e ao browser. As versões antigas usavam Gradio e incluíam motores e ferramentas removidos da versão atual."
---

# Redpanda VC e outras aplicações RVC

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

O Redpanda VC reúne RVC e Causal Voice Changer numa interface comum ao desktop e ao browser. As versões antigas usavam Gradio e incluíam motores e ferramentas removidos da versão atual.

## Formatos e motores suportados

A versão atual inclui treino, inferência e tempo real para RVC e CVC. Beatrice, Rectified Flow e o treino autónomo de vocoders foram removidos. HiFi-GAN e RefineGAN continuam disponíveis no treino RVC. Uma voz `.cvc` exige um motor CVC. Verifica a arquitetura, o vocoder e o embedder antes de moveres um `.pth` para o Mainline, Applio ou Ilaria RVC.

| Aplicação | Interface | Diferença principal |
| --- | --- | --- |
| Redpanda VC | Desktop e browser | RVC e CVC numa interface |
| RVC WebUI (Mainline - Original RVC) | Browser e launcher separado para tempo real | Implementação original do RVC |
| Applio | WebUI | Fluxos RVC e síntese de fala |
| Ilaria RVC | Interface no browser | Pacote Windows para NVIDIA e notebooks na cloud |

[Instalar o Redpanda VC](first-run.md) · [Inferência por ficheiros](inference.md) · [Conversão de voz em tempo real](live-audio.md) · [Treino com Causal Voice Changer](causal-training.md) · [RVC Training](training.md)

## Código-fonte e versão

[Release README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Interface migration](https://github.com/redpanda343/Redpanda-vc/commit/2b1367c8c) · [Engine changes](https://github.com/redpanda343/Redpanda-vc/commit/577f02066)
