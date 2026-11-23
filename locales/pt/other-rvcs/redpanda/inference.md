---
label: "Inferência por ficheiros"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/redpanda/inference/
description: "Usa Inference para converter uma gravação ou uma pasta inteira. Uma voz RVC usa um modelo .pth de inferência; uma voz Causal Voice Changer usa .cvc."
---

# Inferência por ficheiros

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Usa Inference para converter uma gravação ou uma pasta inteira. Uma voz RVC usa um modelo .pth de inferência; uma voz Causal Voice Changer usa .cvc.

## Converter uma gravação

Abre **Inference**. Em **Voice model**, escolhe um `.pth` de inferência RVC ou uma voz `.cvc`. Para RVC, podes adicionar o `.index` correspondente, se disponível. Mantém **Index rate** a zero no primeiro teste sem índice. Os checkpoints `G_*.pth` e `D_*.pth` usam-se em Training.

## Testar e converter uma pasta

Começa com um WAV curto e limpo, zero semitons e exportação WAV. Usa **Save as** para escolher um destino separado e ouve o resultado antes de mudares o tom ou o modelo. Depois, ativa **Folder mode**, escolhe uma pasta pequena e um destino separado e verifica algumas conversões antes de processares tudo.

[Instalar o Redpanda VC](first-run.md) · [Conversão de voz em tempo real](live-audio.md) · [Treino com Causal Voice Changer](causal-training.md) · [RVC Training](training.md)

## Código-fonte e versão

[Inference UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Conversion](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/convert.py)
