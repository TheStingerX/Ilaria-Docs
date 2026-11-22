# Redpanda-vc vs Outras Versões RVC - Comparação Completa de Recursos

[Configurar Redpanda-vc](first-run.md) · [Treinar modelos RVC (EMA e Steps)](training.md) · [Testar áudio ao vivo](live-audio.md)

Este guia compara o **Redpanda-vc** diretamente com **RVC Mainline**, **Applio** e **Ilaria RVC** com base na inspeção estática do código-fonte do branch `main` de cada projeto (sem executar benchmarks de áudio ao vivo ou testes de hardware entre sistemas).

---

## O que torna o Redpanda-vc diferente?

Se você é iniciante na conversão de voz por IA, ajuda saber que esses programas **não** são versões sucessivas de um mesmo aplicativo, mas projetos relacionados com objetivos diferentes:

- **RVC:** Uma família de arquiteturas e modelos de conversão de voz (Retrieval-based Voice Conversion).
- **RVC Mainline:** A implementação de referência original (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Um aplicativo RVC amplamente usado que expande a WebUI, vocoders, TTS e ferramentas em torno do RVC.
- **Redpanda-vc:** Um fork do **Applio** (`redpanda343/Redpanda-vc`) que adiciona Generator EMA, salvamento de checkpoints RVC por passos, treino/inferência **Rectified Flow**, treino/tempo real **Beatrice 2** e **treino dedicado de vocoders**.
- **Ilaria RVC:** Uma implementação personalizada baseada no RVC Mainline (`TheStingerX/Ilaria-RVC`) com seu próprio pipeline de inferência, `Training Target: Steps`, suporte a RefineGAN/MRF HiFi-GAN na interface, Audio Analyzer, Voice Blender e ferramentas TTS.

Um fork **não** é automaticamente melhor do que o original em todos os aspectos: cada projeto equilibra de forma diferente simplicidade, estabilidade, compatibilidade de modelos e arquiteturas extras.

*(Termos rápidos para iniciantes: **Inference** significa converter áudio usando um modelo já treinado; **CLI** significa rodar comandos no terminal em vez de clicar em botões na **WebUI**; um **vocoder** transforma características acústicas em uma onda sonora audível; um **decoder** é a parte de um programa que sabe ler uma arquitetura de modelo específica.)*

---

## Visão geral comparativa de recursos

Os rótulos abaixo refletem a inspeção estática do código-fonte no branch `main` de cada repositório (commits listados em [Fontes e referências técnicas](#fontes-e-referencias-tecnicas)):

| Recurso | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Sim** | **Inferência V1 suportada; UI atual de treino foca em V2** | **Sim** | **Sim** |
| **RVC V2** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Treino RVC** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Treino por épocas** | **Sim** | **Sim** | **Implementação diferente** *(meta por steps)* | **Sim** |
| **Treino com meta em steps** | **Não - verificado** | **Não - verificado** | **Sim** (`Total Steps`) | **Sim** (`Training Target: Steps`) |
| **Checkpoints por intervalo de épocas** | **Sim** | **Sim** (`save_every_epoch`) | **Não - verificado** *(usa intervalos de steps)* | **Sim** (`save_every_epoch`) |
| **Checkpoints por intervalo de steps** | **Não - verificado** | **Não - verificado** | **Sim** (`Save Every X Steps`) | **Não - verificado** *(salva por épocas; época parcial ao parar/step final)* |
| **Generator EMA** | **Não - verificado** | **Não - verificado** | **Sim** (`GeneratorEMA`) | **Não - verificado** |
| **Retomar treino (`G`/`D`)** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Exportação `.pth` intermediária** | **Sim** | **Sim** (`save_every_weights`) | **Sim** (`Save Every Weights`) | **Sim** *(nos limites completos de `save_every_epoch`)* |
| **Treino Rectified Flow** | **Não - verificado** | **Não - verificado** | **Sim** | **Não - verificado** |
| **Treino Beatrice 2** | **Não - verificado** | **Não - verificado** | **Sim** | **Não - verificado** *(Beatrice é apenas extrator F0)* |
| **Treino dedicado de vocoders** | **Não - verificado** | **Não - verificado** | **Sim** (`tabs/train/nsf_hifigan.py`) | **Não - verificado** |
| **HiFi-GAN** | **Sim** | **Sim** | **Sim** | **Sim** |
| **RefineGAN** | **Não - verificado** | **Sim** | **Sim** | **Sim** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **Não - verificado** | **Suportado no código / CLI; não selecionável na WebUI padrão de treino** | **Suportado no código / CLI; não selecionável na WebUI padrão de treino** | **Sim** *(selecionável na WebUI de treino, v2 f0)* |
| **Pretraineds personalizados** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Warmup do learning rate** | **Não - verificado** | **Não - verificado** *(agenda fixa)* | **Sim** (`Warmup Steps`) | **Não - verificado** |
| **Agendamento de LR** | **Implementação diferente** *(exponencial por época)* | **Implementação diferente** *(exponencial por época)* | **Sim** (`Exponential` / `Cosine`) | **Implementação diferente** *(exponencial por época)* |
| **Controle de batch** | **Sim** (`batch_size`) | **Sim** (`batch_size`) | **Sim** (`Batch Size` + `Max Audio per Batch`) | **Sim** (`batch_size`) |
| **Otimização de VRAM** | **Implementação diferente** *(FP16, cache GPU)* | **Sim** (`Checkpointing`, cache GPU) | **Sim** (`Checkpointing`, cache GPU) | **Implementação diferente** *(FP16/BF16, cache GPU)* |
| **Extração de características e F0** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Inferência de voz (offline)** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Text-to-Speech (TTS)** | **Não - verificado** *(requer TTS externo + RVC)* | **Sim** *(`tabs/tts/` integrado + CLI `rvc/lib/tools/tts.py`)* | **Não - verificado** *(aba `tts` do Applio removida de `tabs/`)* | **Sim** *(Kokoro, ElevenLabs, Windows TTS integrados + RVC)* |
| **Conversão em tempo real** | **Sim** | **Sim** | **Sim** | **Não - verificado** *(apenas offline e lote)* |
| **GUI desktop em tempo real** | **Sim** (`realtime_gui.py`) | **Tempo real na WebUI; GUI desktop autônoma separada não verificada** | **Sim** (`run-realtime-gui.bat`, launcher Windows) | **Não - verificado** |
| **Tempo real no navegador** | **Não - verificado** | **Sim** (`tabs/realtime`) | **Sim** (WebSocket + fallback HTTP) | **Não - verificado** |
| **Treino multi-GPU** | **Sim** | **Sim** | **Sim** | **Sim** |
| **Fluxos simultâneos multi-GPU** | **Não - verificado** | **Não verificado** | **Sim** *(1 GPU por fluxo)* | **Não - verificado** |
| **Suporte multifamília** | **Não - verificado** *(apenas RVC)* | **Família RVC com opções adicionais de vocoder** *(seletor `Architecture` oculto; não famílias separadas como RF/Beatrice)* | **Sim** *(RVC + Rectified Flow + Beatrice)* | **Não - verificado** *(apenas RVC)* |
| **Ferramentas de monitoramento** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Suporte de Plataformas e Backends

Ter um script `.sh` **não** prova que todos os recursos foram testados no Linux ou macOS; a tabela abaixo separa launchers do código de backend:

| Plataforma / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Launchers Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Launchers Linux / macOS** | Execução manual em Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(sem `.sh` para `realtime_gui.py`)* | Execução manual em Python *(launchers `.bat` para Windows)* |
| **Backends de cálculo no código** | **CUDA / DirectML / CPU** *(DirectML para inferência via `--dml` / fallback; treino usa CUDA ou CPU)* | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice ao vivo na CPU)* | CUDA / DirectML (AMD e Intel) / CPU |
| **Status de testes multi-OS** | Não testado nesta auditoria | Não testado nesta auditoria | Não testado nesta auditoria | Não testado nesta auditoria |

---

## Generator EMA: Pesos Exportados Mais Suaves

Dentro de uma rede neural, **weights (pesos)** são os números internos ajustados após cada batch de treino. Como cada batch é apenas uma pequena fatia do seu dataset, os pesos ativos do gerador podem oscilar levemente de um step para o outro.

**EMA (Exponential Moving Average)** mantém na memória uma média móvel separada dos pesos do gerador (distinta dos momentos internos de otimizadores como o Adam). Em `rvc/train/train.py`, o Redpanda-vc implementa `GeneratorEMA`:

- Após cada passo do otimizador do gerador (no rank `0`), `GeneratorEMA.update()` mistura os pesos ativos do gerador na média contínua (excluindo `enc_q`, usado apenas no treino).
- **Generator EMA Decay** (`0` a `0.9999`, padrão `0.999`, incremento `0.0001`) controla quão devagar a média se atualiza. Definir **`0`** desativa o EMA e exporta os pesos ativos brutos.
- Nem **RVC Mainline**, nem **Applio**, nem **Ilaria RVC** incluem `GeneratorEMA` em seus scripts de treino verificados.

O EMA pode suavizar oscilações de pesos entre steps, mas **não** garante qualidade de áudio superior, **não** elimina overfitting nem aleatoriedade do treino e **não** acelera o treino. Para explicações completas e detalhes matemáticos, veja [Treinar modelos RVC no Redpanda-vc - EMA e Salvamento por Steps](training.md).

---

## Treino e Salvamento Baseados em Steps

No treino RVC, uma **epoch (época)** é uma passagem completa pelo dataset preparado, enquanto um **step (passo)** é uma atualização de pesos após processar um único batch. *(Exemplo hipotético: se um dataset produz 100 steps por época, 1.000 steps equivalem a cerca de 10 épocas, embora a proporção exata dependa da duração do dataset e do batch size.)*

Os quatro programas lidam de forma diferente com metas de steps e salvamentos:

- **Redpanda-vc:** Usa **Total Steps** (padrão `10000`) e **Save Every X Steps** (padrão `1000`). Salva checkpoints retomáveis `G`/`D` (e um `.pth` de inferência quando **Save Every Weights** está ligado) em intervalos exatos de steps, mesmo no meio de uma época, além de um **Final Save** obrigatório em `Total Steps`. **Save Only Latest** sobrescreve `G_2333333.pth` / `D_2333333.pth` para economizar espaço em disco.
- **Applio e RVC Mainline:** Ambos treinam por **épocas totais** e salvam checkpoints em intervalos de **épocas** (`save_every_epoch`).
- **Ilaria RVC:** Inclui **Training Target: Steps** (`ILARIA_RVC.py`, `train.py`), portanto também **pode** parar em um número exato de steps. Contudo, sua frequência de salvamento continua contando **épocas** (`save_every_epoch`), e exportações intermediárias `.pth` só acontecem em limites completos `epoch % save_every_epoch == 0` (não em uma `partial_epoch` no meio da época), enquanto o estado retomável é salvo em `save_every_epoch`, parada ou `final_epoch`.

---

## Rectified Flow: Outra Arquitetura de Conversão de Voz

Uma das maiores adições do Redpanda-vc é **Rectified Flow** (`tabs/train/rectified_flow.py`, `rectified_flow/`). **Não** é uma variante do RVC V2:

- **Modelo acústico:** Usa uma arquitetura inspirada no modelo acústico do **DiffSinger**, recebendo características de fala **ContentVec** no lugar de fonemas (`README.md`).
- **Saída e vocoder:** O modelo de fluxo prevê representações mel-spectrogram, que um **vocoder** separado (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN` ou `Vocos`) converte em onda sonora.
- **Presets de treino:** Inclui `standard`, `meanflow` (inspirado no MeanVC2) e `smaller` em `rectified_flow/presets/`.
- **Suporte em tempo real:** Suportado na GUI em tempo real e na aba realtime da WebUI do Redpanda-vc.
- **Aviso de compatibilidade:** Mesmo que o arquivo exportado use extensão `.pth`, um modelo Rectified Flow **não é um modelo RVC V2** e não carrega em carregadores RVC padrão a menos que um cliente implemente explicitamente esse decodificador Rectified Flow.

*(Não existem benchmarks verificados entre arquiteturas no repositório que comprovem que Rectified Flow seja universalmente mais rápido, natural ou superior ao RVC.)*

---

## Suporte ao Beatrice 2

**Beatrice** é uma arquitetura independente de conversão de voz amigável para CPU (integrada a partir de `beatrice-trainer` em `tabs/train/beatrice.py`, `beatrice/`, `beatrice/realtime.py`):

- **Separada do RVC:** O Beatrice usa seu próprio formato de modelo (exportado como pasta de modelo, não um `.pth` RVC) e executa sua inferência em tempo real na **CPU** (`README.md`).
- **Não confundir com extração F0:** Alguns apps (como o Ilaria RVC) incluem `beatrice` apenas como opção de **extrator de pitch F0** durante a inferência RVC. O Redpanda-vc vai além suportando **treino completo e conversão Beatrice 2** tanto na WebUI quanto em `run-realtime-gui.bat`.
- Modelos treinados na aba Beatrice do Redpanda-vc funcionam com carregadores compatíveis com Beatrice (como Beatrice VST / clientes Beatrice), não como arquivos `.pth` RVC V2.

---

## Treino Dedicado de Vocoders

O Redpanda-vc inclui uma aba dedicada ao treino de **Vocoder** (`tabs/train/nsf_hifigan.py`, `nsf_hifigan/`):

- **Vocoders suportados:** `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` e `Vocos` (24 kHz).
- **Modos:** Treinar do zero ou fazer ajuste fino (fine-tuning) a partir de um checkpoint pré-treinado compatível (por exemplo, `PC-NSF-HiFiGAN 2025.02` ou `Vocos 24 kHz`).
- **Modelo acústico vs. vocoder:** Um modelo acústico (como Rectified Flow) prevê características espectrais (mel-spectrograms); um vocoder transforma essas características em ondas sonoras audíveis.
- **Limitação importante:** Essa aba é estreitamente vinculada às configurações mel do **Rectified Flow** (`check_registry_vocoder` / `mel_mismatch` em `tabs/train/rectified_flow.py`). Selecionar `HiFi-GAN` ou `RefineGAN` na WebUI de treino **RVC** usa a arquitetura integrada gerador/vocoder do RVC; você **não** pode conectar arbitrariamente um vocoder treinado aqui a qualquer modelo RVC padrão.

---

## Diferenças na Conversão em Tempo Real

| Recurso em Tempo Real | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **GUI Desktop em Tempo Real** | **Sim** (`realtime_gui.py`) | **Tempo real na WebUI; GUI desktop autônoma separada não verificada** | **Sim** (`run-realtime-gui.bat`, RVC + Beatrice + RF) | **Não - verificado** |
| **Tempo Real no Navegador WebUI** | **Não - verificado** | **Sim** (`tabs/realtime`) | **Sim** (WebSocket binário + fallback HTTP streaming) | **Não - verificado** |
| **Atribuição Multi-GPU por Fluxo** | **Não - verificado** | **Não verificado** | **Sim** (`Inference Device: Automatic` ou GPU específica) | **Não - verificado** |

Na aba em tempo real da WebUI do Redpanda-vc (`README.md`, `tabs/inference/realtime.py`):
- **Concorrência multi-GPU:** Duas GPUs podem rodar **dois fluxos simultâneos separados** (um fluxo por GPU para preservar o estado do áudio). GPUs extras **não** se unem para acelerar um único fluxo.
- **Transporte:** Usa áudio WebSocket binário (inclusive com `--share`), com filas limitadas e fallback automático para streaming HTTP se WebSockets estiverem bloqueados.

---

## Controles Avançados de Treino

Além de **Generator EMA Decay** e **Total Steps**, o Redpanda-vc expõe vários controles extras em **Training** (`tabs/train/rvc.py`):

- **Dinâmica de treino:** `Learning Rate Schedule` (`Exponential` ou `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Reset Optimizer State` e `Max Audio per Batch (sec)`.
- **Otimização de memória:** `Checkpointing` (activation checkpointing, herdado do Applio, troca velocidade por menor uso de VRAM) e `Cache Dataset in GPU` (herdado).
- **Salvamentos e exportações:** `Save Every X Steps`, `Save Only Latest`, `Save Every Weights` e `Generator EMA Decay`.

Iniciantes **não** precisam ajustar agendamentos cosseno, passos de warmup ou decaimento personalizado no primeiro modelo RVC.

---

## Compatibilidade de Modelos: O que Funciona Onde?

Ter extensão `.pth` **não** torna dois modelos intercambiáveis. A compatibilidade depende de arquitetura, formato do checkpoint, embedder esperado, decodificador vocoder e índice FAISS correspondente:

| Tipo de modelo | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Outros Clientes Compatíveis |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inferência)** | **Sim** | **Sim** | **Inferência suportada; UI de treino foca em V2** | **Sim** | **Suportado por clientes que implementam esta arquitetura** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Sim** | **Sim** | **Sim** | **Sim** | **Suportado por clientes que implementam esta arquitetura** |
| **RVC V2 RefineGAN (`.pth`)** | **Sim** | **Não - verificado** | **Sim** | **Sim** *(32 kHz)* | **Requer decodificador compatível** (**Depende da versão**) |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Sim** *(inferência + CLI)* | **Não - verificado** | **Sim** *(inferência + CLI)* | **Sim** *(UI + inferência)* | **Requer decodificador compatível** (**Depende da versão**) |
| **Rectified Flow (`.pth`)** | **Sim** | **Não - verificado** | **Não - verificado** | **Não - verificado** | **Requer decodificador compatível** *(não é RVC V2 padrão)* |
| **Beatrice 2 (pasta de modelo)** | **Sim** | **Não - verificado** | **Não - verificado** | **Não - verificado** | **Depende da versão** *(apenas carregadores/VST Beatrice)* |
| **Vocoder personalizado (`nsf_hifigan`)** | **Sim** *(para Rectified Flow)* | **Não - verificado** | **Não - verificado** | **Não - verificado** | **Requer decodificador compatível** |
| **Checkpoints de treino (`G_*`/`D_*`)** | **Sim** *(RVC)* | **Sim** *(RVC)* | **Sim** *(RVC)* | **Sim** *(RVC)* | **Não - verificado** *(apenas retomada de treino)* |
| **Arquivos FAISS `.index`** | **Sim** *(embedder e dim. compatíveis)* | **Sim** *(embedder e dim. compatíveis)* | **Sim** *(embedder e dim. compatíveis)* | **Sim** *(embedder e dim. compatíveis)* | **Suportado por clientes RVC com retrieval** *(embedder e dim. compatíveis)* |

---

## Qual Versão RVC Você Deve Escolher?

- **Escolha RVC Mainline** se quiser a base de código de referência original e o fluxo clássico `realtime_gui.py`.
- **Escolha Applio** se quiser um ambiente RVC completo com treino por épocas e **TTS** integrado.
- **Escolha Redpanda-vc** se quiser especificamente **Generator EMA**, **salvamento de checkpoints por steps**, **Rectified Flow**, **treino/tempo real Beatrice 2**, **treino dedicado de vocoders** ou **tempo real WebSocket / multifluxo** (note que a aba `tts` do Applio não está no Redpanda-vc).
- **Escolha Ilaria RVC** se preferir um estúdio RVC focado em offline com `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` selecionáveis na WebUI, **TTS** integrado (Kokoro, ElevenLabs, Windows), `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` e `Proposed Pitch`.

---

## FAQ para Iniciantes

**O que é um fork do RVC?**
Um projeto separado que copia uma base de código RVC existente e modifica ou adiciona recursos sobre ela.

**O Redpanda-vc é igual ao Applio?**
Não. O Redpanda-vc é um fork do Applio, então compartilha sua interface base, mas adiciona Generator EMA, salvamento por steps, Rectified Flow, Beatrice 2 e treino de vocoders, omitindo a aba `tts` do Applio.

**O Redpanda-vc produz modelos RVC melhores?**
Não automaticamente. A qualidade da voz depende principalmente do dataset, pré-processamento e ajustes; EMA e agendamentos extras são ferramentas para testar, não garantias.

**O que é EMA?**
Exponential Moving Average: uma média contínua dos pesos do gerador mantida durante o treino e usada ao exportar modelos de inferência.

**Por que o Redpanda-vc salva por steps?**
Porque o salvamento por steps permite salvar em intervalos exatos de atualização (ex.: a cada `1000` steps), independentemente de o dataset ser pequeno ou grande.

**O Ilaria RVC também suporta treino por steps?**
Sim, via `Training Target: Steps`, embora sua `Save frequency` ainda conte épocas em vez de intervalos arbitrários de steps.

**O que é Rectified Flow?**
Uma arquitetura acústica de difusão/flow-matching inspirada no DiffSinger que usa características ContentVec e um vocoder separado.

**Rectified Flow é o mesmo que RVC V2?**
Não. São arquiteturas completamente diferentes e não são compatíveis entre si.

**O que é Beatrice?**
Uma arquitetura de conversão de voz separada e amigável à CPU (do `beatrice-trainer`), distinta do RVC e distinta de usar o Beatrice apenas como extrator F0.

**O que faz um vocoder?**
Ele converte características acústicas (como mel-spectrograms) em uma onda de áudio audível.

**Posso usar um modelo do Redpanda-vc em outro programa RVC?**
Modelos padrão **RVC V1 / V2 HiFi-GAN** exportados do Redpanda-vc funcionam em clientes que implementam esses decodificadores; **Rectified Flow**, **Beatrice**, **RefineGAN** e **MRF HiFi-GAN** exigem clientes que suportem explicitamente esses decodificadores.

**O Redpanda-vc consegue treinar modelos RVC normais?**
Sim, na aba **Train → RVC** (`HiFi-GAN` e `RefineGAN` na WebUI; `MRF HiFi-GAN` no código/CLI).

**O Redpanda-vc suporta conversão em tempo real?**
Sim, tanto pela aba **Realtime** da WebUI quanto pelo `run-realtime-gui.bat`.

**O tempo real multi-GPU torna uma conversão de voz mais rápida?**
Não. Cada fluxo permanece em uma GPU; GPUs extras permitem vários fluxos simultâneos.

**Iniciantes devem escolher RVC, Rectified Flow ou Beatrice?**
Comece com **RVC** se quiser a maior compatibilidade de modelos e clientes; explore **Rectified Flow** ou **Beatrice** apenas se quiser especificamente seus fluxos de trabalho.

**Quais recursos são genuinamente exclusivos do Redpanda-vc entre esses quatro?**
Combinar **Generator EMA**, **salvamento RVC por intervalo de steps (`Save Every X Steps`)**, **Rectified Flow**, **treino/tempo real Beatrice 2** e **treino dedicado de vocoder `nsf_hifigan`** em um único fork baseado no Applio.

---

## Fontes e referências técnicas

Comparação estática de código verificada nos branches `main` em **2026-11-22**:

- **Redpanda-vc** (commit [`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31): [Repositório](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/realtime_gui.py)
- **Applio** (commit [`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19): [Repositório](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/tabs/train/train.py) · [`rvc/infer/infer.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/infer/infer.py) · [`core.py`](https://github.com/IAHispano/Applio/blob/445b0f6/core.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/train/train.py) · [`tabs/tts/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/tts) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/realtime) · [`rvc/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/rvc/realtime)
- **RVC Mainline** (commit [`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04): [Repositório](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`configs/config.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/configs/config.py) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/realtime_gui.py)
- **Ilaria RVC** (commit [`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21): [Repositório](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/infer/modules/train/train.py) · [`app/ilaria/ilaria_tts.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ilaria/ilaria_tts.py)
