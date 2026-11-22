---
label: "Redpanda-vc vs outras versões RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Comparação verificada no código entre Redpanda-vc, RVC Mainline, Applio e Ilaria RVC: Generator EMA, checkpoints por passos, Rectified Flow, Beatrice 2, treino de vocoder, tempo real e compatibilidade."
---
# Redpanda-vc vs Outras Versões RVC - Comparação Completa de Recursos

[Configurar Redpanda-vc](first-run.md) · [Treinar modelos RVC (EMA e Steps)](training.md) · [Testar áudio ao vivo](live-audio.md)

Este guia compara o **Redpanda-vc** diretamente com **RVC Mainline**, **Applio** e **Ilaria RVC** com base no código-fonte dos respectivos branches `main`.

---

## O que torna o Redpanda-vc diferente?

- **RVC:** Uma família de técnicas e modelos para conversão de voz.
- **RVC Mainline:** A implementação de referência original (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Uma aplicação que expande a WebUI, vocoders e ferramentas em torno do RVC.
- **Redpanda-vc:** Um fork do **Applio** (`redpanda343/Redpanda-vc`) que adiciona Generator EMA, salvamento por passos no RVC, **Rectified Flow**, **Beatrice 2** e **treino dedicado de vocoders**.
- **Ilaria RVC:** Implementação personalizada baseada no RVC Mainline (`TheStingerX/Ilaria-RVC`) com `Training Target: Steps`, RefineGAN/MRF HiFi-GAN, Audio Analyzer, Voice Blender e TTS.

---

## Visão geral comparativa

| Recurso | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1 / V2** | **Yes** | **Yes** *(foco UI em `RVC (V2)` e `Applio`)* | **Yes** | **Yes** |
| **Treino por épocas** | **Yes** | **Yes** | **Different implementation** *(meta em steps)* | **Yes** |
| **Meta em steps** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Checkpoints por épocas** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** | **Yes** (`save_every_epoch`) |
| **Checkpoints por steps** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(salva por épocas; época parcial ao parar/fim)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Rectified Flow / Beatrice 2 / Vocoder** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice apenas como extrator F0)* |
| **HiFi-GAN / RefineGAN / MRF** | HiFi-GAN | **Yes** (todos 3) | **Yes** (todos 3) | **Yes** (RefineGAN 32 kHz) |
| **LR Warmup & Cosine** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | **No - verified** |
| **Tempo real** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Desktop + WebSocket/HTTP + multi-GPU paralelo) | **No - verified** *(apenas offline/lote)* |

---

## Diferenças principais e compatibilidade

- **Generator EMA (`rvc/train/train.py`):** Média móvel exponencial do gerador (`Generator EMA Decay` `0`–`0.9999`, padrão `0.999`), ausente nos outros três projetos. Veja [Treinar modelos RVC no Redpanda-vc](training.md).
- **Steps vs. Épocas:** O Redpanda-vc salva `G`/`D` e `.pth` a cada `Save Every X Steps` (`1000`). O **Ilaria RVC** oferece `Training Target: Steps`, mas a frequência de salvamento e exportação `.pth` intermediária segue épocas completas (`save_every_epoch`).
- **Rectified Flow, Beatrice 2 e Vocoder:** Rectified Flow usa modelo acústico estilo DiffSinger com ContentVec (`standard`, `meanflow`, `smaller`) e vocoder separado (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN`, `Vocos`) - **não** é RVC V2 apesar da extensão `.pth`. Beatrice 2 é um motor separado para CPU.
- **Tempo real multi-GPU:** Permite vários fluxos simultâneos em GPUs separadas, sem acelerar um único fluxo.

| Tipo de modelo | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Outros clientes |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RVC V2 RefineGAN / MRF** | **Yes** | **No - verified** | **Yes** | **Yes** | **No - verified** |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Beatrice 2 (pasta)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(clientes/VST Beatrice)* |

---

## Qual escolher? e Fontes

Escolha **RVC Mainline** pela referência original, **Applio** pelo fluxo padrão por épocas, **Redpanda-vc** por EMA, salvamento por passos, Rectified Flow, Beatrice 2, treino de vocoder ou WebSocket/multi-GPU ao vivo, e **Ilaria RVC** para estúdio offline com `Training Target: Steps`, `Audio Analyzer` e `Voice Blender`.

Verificado nos branches `main` em **2026-11-22**: [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) (`55a3a80`) · [Applio](https://github.com/IAHispano/Applio) (`445b0f6`) · [RVC Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) (`81eed5e`) · [Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC) (`a887ba5`).
