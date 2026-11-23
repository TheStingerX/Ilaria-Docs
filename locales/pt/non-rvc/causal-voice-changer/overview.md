---
label: "Visão geral e requisitos"
icon: ":book:"
order: 99
permalink: /non-rvc/causal-voice-changer/overview/
description: "Causal Voice Changer (CVC) é um alterador de voz por IA em tempo real a 48 kHz criado para preencher a lacuna entre opções de latência ultrabaixa (como Beatrice) e opções mais fiéis mas mais lentas (como RVC)."
---
# Causal Voice Changer (CVC)

[GitHub](https://github.com/mojowozo/Causal-Voice-Changer) · [Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases) · [Redpanda VC · Treino com Causal Voice Changer](../../other-rvcs/redpanda/causal-training.md)

**Causal Voice Changer (CVC)** é um alterador de voz por IA em tempo real a **48 kHz** criado para preencher a lacuna entre opções de latência ultrabaixa (como Beatrice) e opções mais fiéis mas mais lentas (como RVC). Em vez de sacrificar qualidade por velocidade - ou vice-versa - o CVC usa uma versão destilada do **ContentVec** e do **RMVPE** numa arquitetura causal para oferecer áudio limpo com baixo atraso.

## Diferenças face ao RVC (explicadas de forma simples)

O **RVC** tradicional foi originalmente criado para converter ficheiros de áudio completos, não transmissões ao vivo:

1. O RVC recolhe um bloco da tua voz, converte-o e cola-o ao bloco anterior através de um **crossfade**.
2. Quando baixas o tamanho do bloco para reduzir o atraso, o RVC tem menos contexto - e a qualidade e precisão do tom caem. Se segurares uma nota ou alongares uma palavra, ouvem-se frequentemente as costuras entre blocos como vibrações ou cortes.

O **Causal Voice Changer (CVC)** funciona de forma diferente:

- É **causal**: converte o áudio continuamente à medida que chega, olhando sobretudo para trás com apenas **50 ms de buffer de lookahead** na base 100 Hz v4 (`60 ms` em vozes antigas de 50 Hz).
- Como transmite em fluxo contínuo em vez de colar blocos separados, **os sons sustentados e as notas longas mantêm-se suaves**, sem quebrar nem tremer.
- Manténs quase toda a qualidade do RVC com uma latência muito menor (por exemplo, cerca de **130 ms totais ponta a ponta** no Linux com áudio JACK).

## Aviso importante de licença e uso comercial

Embora o código-fonte do CVC esteja sob licença **MIT**, o modelo base pré-treinado incluído foi treinado com **EARS (CC BY-NC)**, **VCTK** e **LibriTTS-R**.

> **Apenas uso não comercial**: devido ao conjunto de dados EARS, **não** podes usar o modelo base pré-treinado incluído - nem **qualquer voz ajustada a partir dele** - para fins comerciais.

## Plataformas e hardware suportados

| Plataforma | Interface | Suporte de GPU / Backend |
| --- | --- | --- |
| **Windows 10/11 (x64)** | WinUI 3 (acrylic) ou fallback Tk | **NVIDIA** (CUDA), **AMD Radeon RX 7000/9000 / PRO W7000 / Ryzen AI** (ROCm 7.2.1), **AMD RX 6000 / PRO W6000** (`rocm-rdna2` nightly); placas Radeon mais antigas correm na CPU (define Chunk ≥ `60 ms`) |
| **Linux (x86_64)** | COSMIC (Rust) ou fallback Tk | glibc 2.35+ (Ubuntu 22.04, Debian 12 ou mais recente); NVIDIA / AMD; **JACK / PipeWire** recomendado para menor latência |

## O que podes fazer com o CVC

- **Treinar as tuas próprias vozes** a partir de áudio bruto sem cortar ficheiros nem remover silêncios manualmente, em qualquer sample rate.
- **Partilhar vozes facilmente** como ficheiros `.cvc` únicos (basta arrastá-los para a janela ao vivo).
- **Converter o teu microfone ao vivo** com interfaces nativas Windows/Linux, redução de ruído integrada (**Hushwire** ou **RNNoise**), Pitch match, medição LUFS e gravação.
- **Converter ficheiros de áudio completos** offline via `causalvc.infer` ou selecionando um ficheiro como fonte na app ao vivo.
