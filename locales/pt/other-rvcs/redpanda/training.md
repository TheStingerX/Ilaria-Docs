---
label: "Treinar modelos RVC (EMA e Steps)"
icon: ":mortar_board:"
order: 97
permalink: /ilaria-rvc/redpanda/training/
description: "Guia para iniciantes verificado no código para treinar modelos RVC no Redpanda-vc: Generator EMA, salvamento por passos, retomada, exportação e solução de problemas."
---
# Treinar Modelos RVC no Redpanda-vc - EMA e Salvamento por Steps

[Redpanda-vc no GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurar Redpanda-vc](first-run.md) · [Guia geral de treino RVC](../../model-training/training.md)

Treinar um modelo de voz ensina o programa a reproduzir uma voz alvo a partir de clipes de áudio limpos. Para iniciantes, aqui estão os conceitos principais em linguagem simples:

- **Weights (pesos):** Os números internos do modelo que mudam aos poucos enquanto ele aprende uma voz.
- **Generator (`G`):** A parte do modelo que gera o áudio da voz convertida.
- **Discriminator (`D`):** Uma rede auxiliar usada apenas durante o treino para julgar o quão real o áudio do gerador soa em relação às gravações reais.
- **Optimizer:** O motor matemático que atualiza os pesos após cada passo de treino.
- **Step (passo):** Uma atualização dos pesos após processar um pequeno grupo (**batch**) de clipes.
- **Epoch (época):** Uma passagem completa por todo o dataset preparado.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Um salvamento do estado do treino para pausar e retomar depois.
- **EMA (Exponential Moving Average):** Uma média móvel suavizada dos pesos do gerador mantida durante o treino.

> EMA helps smooth out changes in the generator's weights during training. Instead of exporting only the latest generator weights, Redpanda-vc can export a running average of them.

O treino não gera uma voz pronta instantaneamente e a qualidade depende muito das gravações, do dataset e dos ajustes. O que o EMA **não** faz:

- EMA **não** é um filtro de áudio nem redutor de ruído.
- EMA **não** altera nem limpa os arquivos do dataset.
- EMA **não** conserta gravações clipadas ou ruidosas.
- EMA **não** garante qualidade superior em todas as vozes.
- EMA **não** elimina toda a aleatoriedade do treino.

---

## O que é EMA?

Imagine um estudante praticando a pronúncia de uma palavra difícil. Uma tentativa isolada pode sair um pouco melhor ou pior que a anterior. Olhar a tendência de várias tentativas recentes dá uma referência mais estável do que julgar apenas a última.

*(É apenas uma analogia: o EMA não ouve áudio nem escolhe gravações por conta própria.)*

### Como o Redpanda-vc executa o EMA de verdade

Em `rvc/train/train.py`:

1. O gerador treina normalmente em cada batch.
2. O otimizador atualiza os pesos atuais do gerador.
3. Logo após cada passo do gerador (no rank `0`), `GeneratorEMA.update()` atualiza uma cópia média separada dos pesos (sem `enc_q`, usado apenas no treino).
4. Essa média contínua fica na memória e é salva dentro do checkpoint `G`.
5. Quando `Generator EMA Decay > 0`, o Redpanda-vc exporta modelos `.pth` de inferência usando esses pesos EMA em vez dos pesos atuais brutos.

**O EMA é atualizado a cada step, não por época.** O Redpanda-vc **não** faz média de vários arquivos `.pth` já salvos no disco.

<details>
<summary>Detalhes matemáticos opcionais: fórmula padrão vs. fórmula corrigida do Redpanda-vc</summary>

Fórmula intuitiva padrão:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

Em `rvc/train/train.py` (`GeneratorEMA.update()`, linhas 199-205), o Redpanda-vc calcula um decaimento efetivo corrigido pelo número de atualizações (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

onde `beta` é `ema_decay`. Isso reduz a influência da inicialização nos primeiros passos antes de se aproximar de `beta`.

</details>

---

## Entendendo o Generator EMA Decay

Em **Training → Advanced Settings**, **Generator EMA Decay** (`tabs/train/rvc.py`, linhas 809-819) vai de `0` a `0.9999` (padrão **`0.999`**, incremento `0.0001`):

- **`0`:** Desativa `GeneratorEMA` e exporta os pesos atuais do gerador.
- **`0.999` (Padrão):** Mantém uma média exponencial contínua que valoriza atualizações recentes suavizando oscilações entre passos.
- **`0.9999`:** Muda mais devagar e considera um histórico maior. `0.9999` **não** é automaticamente melhor que `0.999` e não há valor ideal universal. Iniciantes podem começar em **`0.999`** e comparar áudios reais.

---

## Por que o Redpanda-vc usa EMA?

Na literatura de deep learning (documentação do PyTorch e Morales-Brotons, Vogels e Hendrikx, 2024), a média de pesos é estudada porque atualizações individuais de SGD/Adam oscilam em torno de boas soluções.

- **Benefícios potenciais (não garantidos):** Menos oscilação entre exportações, maior continuidade e atenuação de parte da variabilidade do treino.
- **Limitações:** Não substitui um bom dataset, não evita overfitting nem falhas, não reduz necessariamente o número de passos, não escolhe o melhor checkpoint sozinho e consome um pouco mais de memória e processamento.

---

## Pesos EMA vs. Checkpoints de Treino

| Arquivo / Estado | Onde fica | O que contém | Para que serve |
| --- | --- | --- | --- |
| **Checkpoint Generator (`G_*.pth`)** | `logs/<model_name>/` | Pesos atuais, otimizador, scaler, `iteration`, `step`, `epoch_step`, RNG e estado `ema` | Retomar treino (e exportação manual) |
| **Checkpoint Discriminator (`D_*.pth`)** | `logs/<model_name>/` | Pesos do discriminador, otimizador, scaler, `step` | Retomar treino junto com `G_*.pth` |
| **Pesos EMA** | Na memória e dentro de `G_*.pth` (`checkpoint["ema"]["weights"]`) | Média contínua dos pesos do gerador (sem `enc_q`) | Gerar `.pth` de inferência suavizados |
| **Modelo de inferência (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Pesos compactos de inferência + metadados | Apenas conversão de voz (**não** retoma treino) |

O EMA é aplicado **somente ao gerador (`net_g`)**, nunca ao discriminador (`net_d`).

---

## Steps vs. Epochs

- **Epoch:** Uma passagem completa pelo dataset preparado.
- **Batch:** Um pequeno grupo de trechos processados juntos.
- **Step:** Uma atualização após um batch (não equivale a 1 arquivo nem a 1 segundo).

**Exemplo hipotético:** Se seu dataset e `Batch Size` geram 100 steps por época, então `100` steps ≈ `1` época, `500` steps ≈ `5` épocas, `1.000` steps ≈ `10` épocas.

---

## Salvamento por Steps no Redpanda-vc

- **Total Steps (padrão `10000`):** Meta total de steps (não soma automaticamente mais 10.000; aumente o valor se quiser continuar após atingir a meta).
- **Save Every X Steps (padrão `1000`):** Salva `G` e `D` a cada `X` steps, mesmo no meio de uma época.
- **Salvamento final:** Sempre salva `G`/`D` e um `.pth` de inferência no step final, mesmo não sendo múltiplo de `Save Every X Steps`.
- **Save Every Weights (padrão `True`):** Exporta `.pth` de inferência a cada salvamento e no final (se desligado, apenas no final).
- **Save Only Latest (padrão `True`):** Sobrescreve `G_2333333.pth` e `D_2333333.pth` (`LATEST_CHECKPOINT_SUFFIX`) para poupar espaço em disco (impede voltar a um checkpoint `G`/`D` anterior; não apaga os `.pth` de inferência).

---

## Seu Primeiro Treino RVC no Redpanda-vc

1. **Preparação:** Instale/abra o Redpanda-vc ([Configurar Redpanda-vc](first-run.md)), acesse **Train → RVC**, preencha **Model Name**, **Sample Rate**, **Version**, **Vocoder** e prepare gravações autorizadas limpas.
2. **Preprocess:** Informe **Dataset Path** e clique em **Preprocess Dataset**.
3. **Extract:** Escolha extrator F0 (`rmvpe`) e **Embedder Model** (`contentvec`), e clique em **Extract Features** (ainda não treina os pesos `.pth`).
4. **Training:** Ajuste **Batch Size**, mantenha como exemplo inicial os padrões (**Total Steps** `10000`, **Save Every X Steps** `1000`, e em **Advanced Settings**: **Save Only Latest** ligado, **Save Every Weights** ligado, **Generator EMA Decay** `0.999`). Clique em **Start Training**, acompanhe com **Pause Training** / **Resume Training** / **Stop Training** e use **Generate Index** ao final.
5. **Saída (`logs/<model_name>/`):** `G_2333333.pth` / `D_2333333.pth` (ou `G_<step>.pth` / `D_<step>.pth`) e `<model_name>_<epoch>e_<step>s.pth` para inferência.

---

## Retomar o Treino com Segurança

`latest_checkpoint_pair()` encontra o `G_*.pth` mais recente e seu `D_*.pth` correspondente (ambos obrigatórios). `restore()` recupera época, `epoch_step`, `global_step`, scaler, RNG e otimizadores. `build_ema()` restaura `checkpoint["ema"]` ou inicia o EMA dos pesos retomados se faltar. Passos após o último salvamento antes de uma parada são perdidos.

- **Reset Optimizer State:** Zera momentos do otimizador mantendo pesos, `global_step` e LR schedule (deixe **OFF** ao retomar normalmente).
- **Fresh Training (`--cleanup`):** **Apaga** checkpoints `G_*`/`D_*`, `spec.pt` e logs anteriores (deixe **OFF** para retomar).
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** controla salvamento em disco; **Checkpointing** é *activation checkpointing* para economizar VRAM.

---

## Exportação e Comparação de Resultados

Tanto a exportação automática (`export_state_dict()`) quanto **Export Model** (`checkpoint_exporter.py`) usam automaticamente `ema["weights"]` quando presente (sem botão separado Raw/EMA na WebUI). Para testar se o EMA melhora sua voz, compare dois experimentos (`0.999` vs `0`) no **mesmo número de steps** com clipes fora do dataset, sem julgar apenas pelas perdas do TensorBoard.

---

## Solução de Problemas para Iniciantes

| Problema | Causa possível | O que verificar | Solução |
| --- | --- | --- | --- |
| **O treino não inicia** | Falta preprocess/extract ou trava em `training_state.json` | Primeiro erro no terminal | Conclua **Preprocess Dataset** e **Extract Features** |
| **GPU out of memory** | `Batch Size` alto ou `Cache Dataset in GPU` ligado | VRAM e terminal | Baixe **Batch Size**, desligue **Cache Dataset in GPU** ou ligue **Checkpointing** |
| **EMA não parece mudar nada** | Poucos steps ou decay em `0` | `Generator EMA Decay` e log inicial | Confirme `generator EMA` no início e compare no mesmo step |
| **EMA Decay em `0`** | Controle em `0` | **Advanced Settings → Generator EMA Decay** | Ajuste para `0.999` no próximo treino |
| **Sem `.pth` intermediários** | **Save Every Weights** desligado | **Advanced Settings → Save Every Weights** | Ligue **Save Every Weights** |
| **Só existem os últimos `G`/`D`** | **Save Only Latest** ligado | `logs/<model_name>/` | Desligue **Save Only Latest** antes de treinar para manter histórico |
| **Checkpoint `G` ou `D` faltando** | Arquivo apagado ou movido | Par `G_*` / `D_*` | Ambos com o mesmo sufixo são necessários para retomar |
| **Retoma de um step anterior** | Parada antes do próximo `Save Every X Steps` | Terminal | Normal: passos após o último salvamento são perdidos |
| **Erro ao restaurar estado EMA** | Checkpoint antigo sem EMA | Aviso no terminal | O Redpanda-vc inicia o EMA a partir dos pesos retomados |
| **Fresh Training apagou tudo** | **Fresh Training** marcado | `logs/<model_name>/` | Desmarque **Fresh Training** ao retomar |
| **Total Steps atingido** | `global_step >= Total Steps` | Terminal | Aumente **Total Steps** e clique em **Start Training** |
| **`.pth` exportado não retoma** | Arquivo de inferência em vez de `G_*.pth` + `D_*.pth` | Nome do arquivo | Retome de `logs/<model_name>/` com `G_*.pth` e `D_*.pth` |
| **Uso anômalo de VRAM** | **Checkpointing** desligado ou **Cache Dataset in GPU** ligado | **Advanced Settings** | Ligue **Checkpointing**, desligue **Cache Dataset in GPU**, baixe **Batch Size** |

---

## FAQ

**O que significa EMA?** Exponential Moving Average: média contínua dos pesos do gerador durante o treino.
**O EMA melhora a qualidade da voz?** Pode suavizar oscilações, sem garantia; avalie ouvindo.
**Devo deixar o EMA em `0.999`?** Sim, é o padrão do Redpanda-vc para começar.
**O que acontece se EMA Decay for `0`?** O EMA é desativado e exportam-se os pesos atuais.
**`0.9999` é melhor que `0.999`?** Não automaticamente; reage mais devagar às atualizações recentes.
**O EMA deixa o treino mais rápido?** Não.
**O EMA evita overfitting?** Não.
**O EMA é aplicado ao discriminador?** Não, só ao gerador (`net_g`).
**Diferença entre epoch e step?** Epoch é uma passada pelo dataset inteiro; step é uma atualização após um batch.
**Pode salvar no meio de uma época?** Sim, com `Save Every X Steps`.
**Perco progresso ao parar o treino?** Apenas os steps após o último checkpoint salvo.
**Diferença entre Save Only Latest e Save Every Weights?** `Save Only Latest` sobrescreve `G_2333333.pth` / `D_2333333.pth`; `Save Every Weights` exporta `.pth` de inferência a cada salvamento.
**Checkpointing é o mesmo que salvar checkpoints?** Não, é *activation checkpointing* para economizar VRAM.
**Posso retomar a partir de um `.pth` de inferência?** Não, precisa de `G_*.pth` e `D_*.pth`.

---

## Fontes oficiais e leituras adicionais

- **Repositório Redpanda-vc:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implementação `GeneratorEMA`:** [`rvc/train/train.py` (linhas 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Salvamento por steps, retomada e exportação:** [`rvc/train/train.py` (linhas 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Controles WebUI:** [`tabs/train/rvc.py` (linhas 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Exportador manual:** [`rvc/train/process/checkpoint_exporter.py` (linhas 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **Utilitários e controle:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **PyTorch:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Artigo científico:** Morales-Brotons, Vogels e Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
