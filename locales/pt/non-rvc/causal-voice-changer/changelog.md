---
label: "Changelog"
icon: ":memo:"
order: 94
permalink: /non-rvc/causal-voice-changer/changelog/
description: "Histórico completo de versões e changelog do Causal Voice Changer (CVC) da v0.1.0 à v0.3.3.1, com suporte a GPUs NVIDIA antigas, base 100 Hz v4 e melhorias em tempo real."
---
# Changelog do Causal Voice Changer

[Lançamentos no GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

## v0.3.3.1 (21/11/2026)

- **Suporte a GPUs NVIDIA antigas:** Adicionado suporte para placas NVIDIA anteriores removidas pelo CUDA 13 (séries GeForce GTX 900/10, TITAN X/Xp/V, Quadro M/P) usando a build PyTorch CUDA 12.6 (`cuda-pascal` / `run-realtime-gtx10.bat` / `run-training-gtx10.bat`).

---

## v0.3.3 (21/11/2026)

- **Estabilidade em tempo real:** Melhorias de desempenho para que um período glotal não exceda o período causal (`10 ms`) causando degradação (não exige reconstruir modelos).
- **Correções no Windows e atualizador:** Corrigida a transparência no Windows e um bug em que, após atualizar, o app podia tentar usar o motor antigo.

---

## v0.3.2 (20/11/2026)

- Atualização menor que melhora a qualidade sonora geral tanto no treino quanto na inferência em tempo real.

---

## v0.3.1 (20/11/2026)

### Novidades
- Adicionado um **atualizador integrado** diretamente no aplicativo. A verificação automática fica ativa por padrão e pode ser desativada na página **About**.

### Correções e melhorias
- Corrigido um bug no Windows que podia impedir a detecção de GPUs.
- Melhorado o tratamento em tempo real para vozes graves, aprimorando a saída.

---

## v0.3.0 (19/11/2026)

Atualiza o modelo base padrão de 100 Hz para a **v4 (`causalvc-base-v4-100hz`)** mantendo 50 ms de latência de modelo e suporte completo a CUDA Graphs.

- **Risadas, suspiros e sussurros melhores:** Troca binária voz/sem voz substituída por confiança contínua de periodicidade (`0..1`), mesclando harmônicos e sopro suavemente.
- **Condicionamento espectral CUDA-Graph e âncora L2-SP:** Vozes treinadas com fala calma preservam risadas e sussurros naturais.
- **Faixa de pitch ampliada (`32 Hz - 1400 Hz`):** Rastreamento do vocal fry grave até notas de soprano com adaptação natural de registro para cima.
- **Rejeição de silêncio e cliques:** Nova loss dedicada ao piso de silêncio reduz cliques de microfone em ~33-40 dB mesmo com *Ignore background sounds* desligado.
- **Compatibilidade transparente:** Instalações existentes atualizam `weights/causalvc-base/` automaticamente e vozes `.cvc` anteriores (50 Hz e 100 Hz) seguem funcionando sem alterações.

---

## v0.2.0 (19/11/2026)

Muda o modelo base padrão e o front-end de streaming de **50 Hz (quadros de 20 ms)** para **100 Hz (quadros de 10 ms)**.

- **Menor latência (`50 ms`):** Baseado no `causalvc-base-v3-100hz`, reduz o atraso do modelo de `60 ms` para `50 ms` dobrando a resolução em consoantes rápidas e respirações.
- **Fim do aliasing harmônico:** Roll-off Nyquist suave (`exc="bandlimit"`) e interpolação fracionária contínua do pitch (`smooth_in="p"`).
- **Rastreamento em notas agudas (`350-1000+ Hz`):** Pitch tracker re-destilado (`-3` a `+14` semitons) e codificador ampliado (EARS + VCTK + LibriTTS-R) evitando falhas ou saltos de oitava.
- **Correções de treino e `.cvc`:** Corrigido bug de `--perturb` em arquivo único, detecção automática de largura de banda (`detect_fmax`) para áudios 16/24 kHz, opção **Random microphone colour** e empacotamento automático de codificadores personalizados (~46 MB).
- **Streaming CUDA Graph:** Suporte total a CUDA Graph em 100 Hz até blocos de `10 ms` / `20 ms`.

---

## v0.1.1 (17/11/2026)

- **Janelas pré-compiladas nos releases:** Os pacotes Windows (`.zip`) e Linux (`.tar.gz`) já trazem as janelas prontas sem exigir `.NET 10 SDK` nem `Rust`.
- **Correção AMD Radeon RX 6000 no Windows:** Corrigida a ordem de carregamento de bibliotecas antes do PyTorch para iniciar o ROCm (`"The engine is not available"` / erro Windows `1114`).
- **Correções no launcher:** Garante uso do ambiente Python instalado pelos launchers, exibe detalhes de Python/PyTorch em erros de inicialização e respeita `CAUSALVC_GPU`.

---

## v0.1.0 (17/11/2026)

Primeiro lançamento público do **Causal Voice Changer**:
- Trocador de voz em streaming 48 kHz com look-ahead de 60 ms.
- **App de treino** (`run-training.bat` / `run-training.sh`) em `bfloat16`, com fila de treinos e sem precisar cortar silêncios manualmente.
- **App em tempo real** (`run-realtime.bat` / `run-realtime.sh` - WinUI 3 no Windows, COSMIC no Linux) com pitch/Index por voz, Hushwire/RNNoise, **Soften sudden treble**, CUDA Graphs, gravação, entrada de arquivo e ASIO no Windows.
- Formato único `.cvc` e suporte a GPUs NVIDIA CUDA e AMD ROCm.
- **Nota de licença:** Modelo base treinado com EARS, VCTK e LibriTTS-R (uso não comercial devido ao EARS).
