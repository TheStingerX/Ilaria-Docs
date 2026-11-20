---
label: "Visão geral e planos"
icon: ":book:"
order: 99
permalink: /non-rvc/mvsep/overview/
description: "MVSep (Music & Voice Separation) é uma plataforma web gratuita na nuvem para separação e restauro de áudio por IA."
---
# MVSep

[Site oficial (mvsep.com)](https://mvsep.com/) · [Classificação de qualidade](https://mvsep.com/quality_checker/multisong_leaderboard)

**MVSep** (Music & Voice Separation) é uma plataforma web gratuita na nuvem para separação e restauro de áudio por IA. Como todos os modelos correm nos servidores remotos do MVSep, **não precisas de uma GPU potente nem de qualquer instalação local** - ideal se o teu PC não aguenta modelos Roformer pesados ou se queres aceder a algoritmos exclusivos como **BS Polarformer**, **MVSep DnR v3** e ensembles multi-modelo.

## O que o MVSep consegue fazer

- **Separação de Voz e Instrumental**: arquiteturas de ponta como **BS Polarformer**, BS-Roformer e Mel-Roformer.
- **Separação de Fala, Música e SFX**: modelos cinematográficos multipista como **MVSep DnR v3** (separa diálogos de música e efeitos sonoros).
- **Voz principal vs. Coros**: **MVSep Karaoke** e variantes Roformer Karaoke.
- **Restauro de áudio**: **DeReverb Stereo**, **DeReverb Room**, **DeNoise** (por aufr33 & gabox) e **DeEffect**.
- **Modelos multi-stem e especializados**: DrumSep de 4/6/10 stems, baixo, guitarras, piano, cordas, percussão synth e upscaling de áudio.

## Gratuito vs. Registado vs. Premium

O MVSep **não tem subscrição mensal**: os algoritmos principais continuam gratuitos e os créditos pré-pagos opcionais nunca expiram.

| Funcionalidade | Sem registo | Conta gratuita registada | Premium (Com saldo de créditos) |
| --- | --- | --- | --- |
| **Duração máx. de áudio** | 10 min | 10 min | **100 min** |
| **Tamanho máx. do ficheiro** | 100 MB | 100 MB | **1.000 MB (1 GB)** |
| **Separações por dia** | Até 50 | Até 50 *(BS 124-band: 5/dia por modelo)* | **Ilimitadas** |
| **Tarefas simultâneas** | 1 | 1 | **Ilimitadas** |
| **Prioridade na fila** | Baixa | Média | **Alta** |
| **CAPTCHA** | Obrigatório | **Nenhum** | **Nenhum** |
| **Formato de saída** | MP3 | **WAV 16-bit / FLAC 16-bit** | **WAV 32-bit float / FLAC 24-bit** |
| **Lote e API completa** | Não | Limitado | **Acesso completo** |

> **Dica**: criar uma simples **conta gratuita** em [mvsep.com](https://mvsep.com/) remove os CAPTCHAs, melhora a fila de espera e desbloqueia transferências sem perdas em **WAV / FLAC** - essencial ao preparar datasets RVC.
