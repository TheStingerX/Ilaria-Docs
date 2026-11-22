---
label: "Treinar modelos RVC (EMA e Steps)"
icon: ":mortar_board:"
order: 97
permalink: /ilaria-rvc/redpanda/training/
description: "Guia completo para iniciantes, verificado no código, sobre treinamento de modelos RVC no Redpanda-vc: Generator EMA, salvamento de checkpoints por passos, retomada, exportação e solução de problemas."
---
# Treinar Modelos RVC no Redpanda-vc - EMA e Salvamento por Passos

[Redpanda-vc no GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurar Redpanda-vc](first-run.md) · [Redpanda-vc vs outras versões de RVC](differences.md) · [Guia Geral de Treinamento RVC](../../model-training/training.md)

Treinar um modelo de voz ensina um programa a reproduzir uma voz de destino a partir de uma coleção de clipes de áudio limpos. Se você é novo no RVC, não precisa decorar jargões técnicos antes de começar. Aqui estão os termos principais em linguagem simples:

- **Weights (Pesos):** Os números internos do modelo que se ajustam aos poucos conforme ele aprende uma voz.
- **Generator (`G`):** A parte do modelo que realmente cria o áudio da voz convertida.
- **Discriminator (`D`):** Uma rede auxiliar usada apenas durante o treinamento para julgar quão realista o áudio do gerador soa em comparação com as gravações reais.
- **Optimizer (Otimizador):** O motor matemático que atualiza os pesos do modelo após cada passo de treinamento.
- **Step (Passo):** Uma única atualização de pesos após processar um pequeno grupo (**batch**) de clipes de áudio.
- **Epoch (Época):** Uma passada completa por todo o seu dataset preparado.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Um retrato salvo do treinamento usado para pausar e retomar o treino depois.
- **EMA (Exponential Moving Average):** Uma média móvel suavizada dos pesos do gerador mantida durante o treinamento.

> O EMA ajuda a suavizar mudanças nos pesos do gerador durante o treinamento. Em vez de exportar apenas os últimos pesos do gerador, o Redpanda-vc pode exportar uma média móvel deles.

O treinamento não gera uma voz pronta instantaneamente, e a qualidade final depende muito das suas gravações de origem, da preparação do dataset e das configurações de treino. Antes de começar, lembre-se do que o EMA **não** faz:

- O EMA **não** é um filtro de áudio nem um removedor de ruído.
- O EMA **não** edita nem limpa os arquivos do seu dataset.
- O EMA **não** repara gravações clipadas ou ruidosas.
- O EMA **não** garante melhor qualidade de áudio em todas as vozes.
- O EMA **não** remove toda a aleatoriedade do treinamento.

---

## O que é EMA?

Imagine um estudante praticando como pronunciar uma palavra difícil. Uma tentativa isolada pode soar um pouco mais clara ou um pouco mais áspera que a anterior. Olhar a tendência ao longo de muitas tentativas recentes dá uma visão mais estável do progresso do estudante do que julgar apenas pela última tentativa.

*(Lembre-se de que isso é apenas uma analogia: o EMA não ouve áudio, não julga pronúncia nem escolhe gravações "melhores" por conta própria.)*

### Como o Redpanda-vc realmente executa o EMA

Em `rvc/train/train.py`, o Redpanda-vc mantém o EMA na memória enquanto o treinamento roda:

1. O gerador treina normalmente em cada batch.
2. O otimizador atualiza os pesos ao vivo do gerador.
3. Imediatamente após cada passo do otimizador do gerador (no rank `0`), `GeneratorEMA.update()` atualiza uma cópia média separada dos pesos do gerador (excluindo `enc_q`, usado apenas durante o treinamento).
4. Essa média móvel permanece na memória e é salva dentro do checkpoint de treinamento `G`.
5. Quando o EMA está ativado (`Generator EMA Decay > 0`), o Redpanda-vc exporta modelos `.pth` de inferência a partir desses pesos EMA em vez dos pesos ao vivo brutos do gerador.

**O EMA atualiza a cada step de treinamento, não uma vez por epoch.** O Redpanda-vc **não** faz média de vários arquivos `.pth` já salvos em disco; ele mantém uma única média móvel contínua na memória durante o treinamento.

<details>
<summary>Detalhes matemáticos opcionais: EMA padrão vs. fórmula corrigida por viés do Redpanda-vc</summary>

A atualização intuitiva padrão de EMA é:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

Em `rvc/train/train.py` (`GeneratorEMA.update()`, linhas 199-205), o Redpanda-vc não aplica um decaimento constante desde a primeira atualização. Em vez disso, calcula um decaimento efetivo corrigido por viés com base no número de atualizações (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

onde `beta` é a sua configuração `ema_decay`. Essa correção de aquecimento reduz a influência dos pesos iniciais durante as primeiras atualizações e depois se aproxima de `beta` conforme `updates` cresce. Parâmetros de ponto flutuante são mesclados via `torch._foreach_lerp_`, enquanto buffers que não são de ponto flutuante são copiados do gerador ao vivo.

</details>

---

## Entendendo Generator EMA Decay

Em **Training → Advanced Settings**, o Redpanda-vc expõe **Generator EMA Decay** (`tabs/train/rvc.py`, linhas 809-819):

- **Mínimo:** `0`
- **Máximo:** `0.9999`
- **Padrão:** `0.999`
- **Passo do controle deslizante:** `0.0001`

### O que os valores significam

- **`Generator EMA Decay = 0`:** Desativa completamente o `GeneratorEMA`. Os modelos `.pth` de inferência são exportados diretamente dos pesos ao vivo do gerador.
- **`Generator EMA Decay = 0.999` (Padrão):** Mantém uma média móvel exponencial que dá peso significativo às atualizações recentes do gerador enquanto suaviza oscilações passo a passo.
- **`Generator EMA Decay = 0.9999`:** Altera a média móvel mais lentamente e faz média sobre uma janela maior de atualizações. Isso pode aumentar a suavidade da média, mas também faz os pesos EMA reagirem mais devagar a melhorias recentes no gerador ao vivo.

Valores mais baixos se adaptam mais rápido aos pesos recentes, enquanto valores mais altos fazem média sobre mais passos. `0.9999` **não** é automaticamente melhor que `0.999`, e não existe um decay "melhor" universal para fala, canto, datasets pequenos ou grandes. Se você é iniciante, começar no padrão **`0.999`** e comparar saídas reais de áudio antes de ajustar é uma base prática.

---

## Por que o Redpanda-vc usa EMA?

Na literatura de aprendizado profundo (como a documentação de média de pesos do PyTorch e Morales-Brotons, Vogels e Hendrikx, 2024), a média de pesos ao longo de uma trajetória de treinamento é estudada porque atualizações individuais de SGD/Adam podem oscilar em torno de boas soluções.

### Benefícios potenciais (não são garantias)

- Menor oscilação passo a passo nos pesos exportados.
- Maior continuidade entre exportações consecutivas.
- Atenuação de parte da variabilidade por atualização durante o treinamento.
- Comportamento potencialmente mais estável do modelo exportado, embora melhoria real de áudio no seu dataset RVC específico exija testes de escuta.

### Limitações importantes

- O EMA **não** substitui um dataset limpo e bem preparado.
- O EMA **não** elimina overfitting.
- O EMA **não** impede que um treinamento quebrado ou instável falhe.
- O EMA **não** garante maior similaridade vocal nem melhor pronúncia.
- O EMA **não** promete menos passos ou épocas de treinamento.
- O EMA **não** é um seletor automático de "melhor checkpoint".
- O EMA mantém uma cópia extra dos pesos do gerador na memória e adiciona um pequeno custo de atualização por passo.

---

## Pesos EMA vs. Checkpoints de Treinamento

No Redpanda-vc, quatro coisas diferentes existem durante uma execução. Não as confunda:

| Arquivo / Estado | Onde fica | O que contém | Para que serve |
| --- | --- | --- | --- |
| **Generator checkpoint (`G_*.pth`)** | `logs/<model_name>/` | Pesos ao vivo do gerador, estado do otimizador, scaler, `iteration` (época), `step`, `epoch_step`, RNG e estado `ema` (quando ativo) | Retomar treinamento (e exportação manual) |
| **Discriminator checkpoint (`D_*.pth`)** | `logs/<model_name>/` | Pesos do discriminador, estado do otimizador, scaler, `step` | Retomar treinamento junto com `G_*.pth` |
| **EMA weights** | Na memória durante o treino e dentro de `G_*.pth` (`checkpoint["ema"]["weights"]`) | Média móvel dos pesos do gerador (excluindo `enc_q`) | Gerar exportações `.pth` de inferência suavizadas |
| **Modelo de inferência (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Pesos compactos apenas de inferência do gerador + metadados | Apenas conversão de voz (**não** pode retomar treinamento) |

**Nota:** No código verificado do Redpanda-vc (`train.py`), o EMA é aplicado **apenas ao gerador (`net_g`)**, nunca ao discriminador (`net_d`).

---

## Training Steps vs. Epochs

- **Epoch (Época):** Uma passada completa pelo dataset de treinamento preparado.
- **Batch:** Um pequeno grupo de trechos de áudio processados juntos em uma passada de ida/volta.
- **Step (Passo):** Uma atualização do otimizador após processar um batch. Um passo **não** é um arquivo de áudio nem um segundo de áudio.

### Exemplo hipotético

Suponha que seu dataset preparado e `Batch Size` produzam **100 passos por época**:

- `100` passos ≈ `1` época
- `500` passos ≈ `5` épocas
- `1,000` passos ≈ `10` épocas

A proporção real de passos por época depende da duração do seu dataset, do corte, de `Batch Size` e de `Max Audio per Batch (sec)`. Nunca presuma que 100 passos equivalem a 1 época para todo modelo.

---

## Salvamento de Checkpoints por Passos

Em vez de esperar uma época inteira terminar antes de salvar, o Redpanda-vc agenda salvamentos por **contagem de passos** (`tabs/train/rvc.py`, linhas 663-703; `rvc/train/train.py`, linhas 917-921 e 1146-1195):

### Total Steps

- **Padrão:** `10000` (faixa do controle deslizante `1` a `1000000`, passo `1`).
- Define a **contagem alvo total de passos** do experimento, **não** "adicionar mais 10,000 passos". Se seu modelo retomado já estiver no passo `10000`, você deve aumentar `Total Steps` (por exemplo, para `15000`) para continuar treinando.

### Save Every X Steps

- **Padrão:** `1000` (faixa do controle deslizante `1` a `100000`, passo `1`).
- Salva checkpoints `G` e `D` a cada `X` passos de treinamento (`self.global_step % save_every_steps == 0`).
- **Exemplo:** Com `Total Steps = 10000` e `Save Every X Steps = 1000`, o Redpanda-vc salva nos passos `1000`, `2000`, `3000`, ..., `10000`, independentemente de caírem no meio de uma época.

### Final Save

Mesmo que `Total Steps` não seja múltiplo de `Save Every X Steps` (por exemplo, `Total Steps = 2500` e `Save Every X Steps = 1000`), o Redpanda-vc **sempre** salva tanto os checkpoints `G`/`D` quanto um modelo `.pth` de inferência ao atingir o passo final (`final = self.global_step >= self.args.total_steps`).

### Save Every Weights

- **Padrão:** **Ativado** (`True`).
- Quando **ativado**, o Redpanda-vc exporta um modelo `.pth` de inferência em cada intervalo de salvamento *e* no passo final.
- Quando **desativado**, checkpoints `G`/`D` ainda são salvos a cada `Save Every X Steps`, mas um `.pth` de inferência automático é exportado apenas no passo final.

### Save Only Latest

- **Padrão:** **Ativado** (`True`).
- Quando **ativado**, checkpoints `G` e `D` sobrescrevem nomes fixos (`G_2333333.pth` e `D_2333333.pth`, onde `2333333` é `LATEST_CHECKPOINT_SUFFIX`) para economizar espaço em disco.
- Quando **desativado**, os checkpoints incluem o número do passo (`G_1000.pth`, `D_1000.pth`, `G_2000.pth`, `D_2000.pth`).
- **Importante:** `Save Only Latest` afeta apenas checkpoints de treinamento `G`/`D`, **não** modelos `.pth` de inferência exportados (a menos que você desative `Save Every Weights`). Tenha em mente que, com `Save Only Latest` ativado, você não pode voltar o treinamento para um checkpoint `G`/`D` intermediário anterior se a execução degradar depois.

---

## Seu Primeiro Treinamento RVC no Redpanda-vc

### 1. Preparação

1. Instale e abra o Redpanda-vc (veja [Configurar Redpanda-vc](first-run.md)).
2. Abra a aba **Train** e selecione **RVC** (se sua compilação mostrar várias famílias de modelos).
3. Em **Model Settings**, digite um **Model Name** único (nome do seu experimento).
4. Escolha uma **Sample Rate** compatível (`32k`, `40k` ou `48k`), **Version** (`v1` ou `v2`) e **Vocoder** (`HiFi-GAN`, `MRF HiFi-GAN` ou `RefineGAN`, dependendo dos seus pré-treinados e do app de inferência alvo).
5. Prepare um dataset limpo e seco de **gravações autorizadas** em uma pasta dedicada.

### 2. Preprocess

1. Abra o acordeão **Preprocess**.
2. Digite ou selecione o caminho da sua pasta de dataset em **Dataset Path** (clique em **Refresh** se necessário).
3. Clique em **Preprocess Dataset** e aguarde terminar de cortar e normalizar o áudio em `logs/<model_name>/`.

### 3. Extract

1. Abra o acordeão **Extract**.
2. Selecione seu **Pitch extraction algorithm** (como `rmvpe`) e **Embedder Model** (normalmente `contentvec`).
3. Clique em **Extract Features**. *(Isso prepara recursos de tom e conteúdo para o treino; ainda **não** treina os pesos `.pth`.)*

### 4. Training

1. Abra o acordeão **Training**.
2. Defina **Batch Size** para um valor que a VRAM da sua GPU suporte com folga.
3. Para um primeiro teste ilustrativo, você pode deixar os padrões atuais:
   - **Total Steps:** `10000`
   - **Save Every X Steps:** `1000`
4. Expanda **Advanced Settings** para conferir:
   - **Save Only Latest:** Ativado (`True`)
   - **Save Every Weights:** Ativado (`True`)
   - **Generator EMA Decay:** `0.999`
   *(Esses padrões são valores iniciais ilustrativos, não ajustes ideais garantidos para qualquer dataset.)*
5. Clique em **Start Training**.
6. Acompanhe o progresso pelo status do terminal/UI, **Pause Training** / **Resume Training** / **Stop Training** e logs do TensorBoard (`logs/<model_name>/eval/`).
7. Ao terminar, clique em **Generate Index** se quiser um arquivo `.index` correspondente.

### 5. Arquivos de Saída

Dentro de `logs/<model_name>/`, você encontrará:

- **Checkpoints retomáveis:** `G_2333333.pth` e `D_2333333.pth` (quando **Save Only Latest** está ativado) ou `G_<step>.pth` / `D_<step>.pth` (quando desativado).
- **Modelos de inferência:** `<model_name>_<epoch>e_<step>s.pth` (por exemplo, `MyVoice_45e_1000s.pth`). Estes são os arquivos que você carrega para conversão de voz.

---

## Retomando o Treinamento com Segurança

Quando você reinicia o treinamento em um experimento existente (`rvc/train/train.py`, linhas 420-436, 528-538, 763-803, 844-853):

1. `latest_checkpoint_pair()` procura em `logs/<model_name>/` o `G_*.pth` mais recente por data de modificação e o emparelha com o sufixo `D_*.pth` correspondente. **Ambos os arquivos `G` e `D` devem existir** para retomar.
2. `restore()` recarrega `epoch`, `start_batch` (`epoch_step`), `global_step` (`step`), `scaler` AMP, estado RNG e ambos os otimizadores.
3. `build_ema()` restaura `GeneratorEMA` de `checkpoint["ema"]` quando `ema_decay > 0`. Se o estado `ema` estiver ausente ou incompatível (por exemplo, ao retomar de um checkpoint sem EMA), o Redpanda-vc registra um aviso e inicializa o EMA a partir dos pesos retomados do gerador em vez de travar.
4. Quaisquer passos concluídos *após* o último checkpoint salvo antes de uma falha ou parada manual são perdidos e serão executados novamente a partir daquele passo salvo.

### Controles para não confundir

- **Reset Optimizer State:** Mantém os pesos do modelo, `global_step` e cronograma de taxa de aprendizado, mas limpa os buffers de momentum/momentos do otimizador (`state={}`). Use apenas ao redefinir intencionalmente a dinâmica do otimizador; a retomada normal deixa isso em **OFF**.
- **Fresh Training (`--cleanup`):** **Exclui** todos os checkpoints `G_*` e `D_*` gerados anteriormente, arquivos `spec.pt` e logs do TensorBoard para aquele experimento. Deixe **OFF** sempre que estiver retomando.
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** controla com que frequência checkpoints são gravados em disco. **Checkpointing** (em **Advanced Settings**) é **activation checkpointing**, que troca velocidade de treinamento mais lenta por menor uso de VRAM em GPUs com memória limitada (não controla o salvamento em disco).

---

## Como o Redpanda-vc Exporta Modelos EMA

1. **Exportações automáticas durante o treino (`train.py`, linhas 1090-1091 e 1157-1163):** Sempre que `save()` dispara uma exportação de inferência (`Save Every Weights` ou passo final), `export_state_dict()` retorna `self.ema.weights` se o EMA estiver ativado (`ema_decay > 0`), ou o `state_dict()` do gerador ao vivo se o EMA estiver desativado (`ema_decay = 0`).
2. **Exportações manuais (acordeão `Export Model` -> `rvc/train/process/checkpoint_exporter.py`, linhas 44-117):** Você pode exportar manualmente qualquer checkpoint retomável `G_*.pth` em `fp16` ou `fp32`. `export_generator_checkpoint()` verifica se `checkpoint["ema"]["weights"]` existe e usa automaticamente esses pesos EMA quando presentes (informando `... and the generator EMA` na mensagem de status).
3. **Não** existe uma opção separada "Raw vs. EMA" no exportador da WebUI; o `.pth` exportado é apenas para inferência, enquanto `G_*.pth` + `D_*.pth` continuam sendo necessários para retomar o treinamento.

---

## O EMA Realmente Soa Melhor?

Não há uma resposta universal de sim ou não para todas as vozes e datasets. Como a WebUI atual não exporta versões Raw e EMA lado a lado de uma única execução, a forma mais limpa de testar o EMA é uma comparação controlada:

1. Use exatamente o mesmo dataset preparado e a mesma extração de características.
2. Mantenha `Batch Size`, `Total Steps`, cronograma de taxa de aprendizado e pesos pré-treinados idênticos.
3. Execute um experimento com `Generator EMA Decay = 0.999` e outro com `0`.
4. Compare exportações `.pth` de inferência na **mesma contagem de passos** (ex.: `5000s` vs. `5000s`) usando clipes de teste externos fora do conjunto de treino.
5. Ouça similaridade vocal, nitidez das consoantes, estabilidade de tom e artefatos em vez de julgar apenas pelas curvas de perda do TensorBoard.

---

## Solução de Problemas para Iniciantes

| Problema | Causa possível | O que verificar | Solução |
| --- | --- | --- | --- |
| **O treinamento não inicia** | Faltam arquivos pré-processados/extraídos, caminho errado ou trava de execução ativa (`training_state.json`) | Veja a saída do terminal para o primeiro erro | Conclua **Preprocess Dataset** e **Extract Features** primeiro, e confirme que não há execução ativa |
| **Falta de memória da GPU (OOM)** | `Batch Size` alto demais ou `Cache Dataset in GPU` ativado com pouca VRAM | Verifique uso de VRAM e erro no terminal | Abaixe **Batch Size**, desative **Cache Dataset in GPU** ou ative **Checkpointing** |
| **EMA não parece mudar os resultados** | Poucos passos, decay perto de `0` ou comparação de passos diferentes | Confira `Generator EMA Decay` e resumo inicial do console | Confirme que `generator EMA <value>` aparece no início e compare exportações do mesmo passo em clipes externos |
| **EMA Decay definido como `0`** | Controle deslizante em `0` | Veja **Training → Advanced Settings → Generator EMA Decay** | Defina como `0.999` (padrão) se quiser EMA ativo na próxima execução |
| **Sem modelos `.pth` intermediários de inferência** | **Save Every Weights** está desativado | Veja **Training → Advanced Settings → Save Every Weights** | Ative **Save Every Weights** para exportar modelos de inferência a cada `Save Every X Steps` |
| **Existem apenas os últimos checkpoints `G`/`D`** | **Save Only Latest** está ativado (padrão) | Confira `G_2333333.pth` / `D_2333333.pth` em `logs/<model_name>/` | Desative **Save Only Latest** antes do treino se quiser histórico numerado `G_<step>.pth` |
| **Checkpoint `G` ou `D` ausente** | Um arquivo foi apagado ou movido manualmente | Procure o par correspondente `G_*` e `D_*` em `logs/<model_name>/` | Tanto `G` quanto `D` com o mesmo sufixo são necessários para retomar (`latest_checkpoint_pair()`) |
| **O treino reinicia de um passo anterior** | Parou ou travou antes do próximo `Save Every X Steps` | Compare último passo do console vs. passo retomado | Comportamento normal: progresso após o último salvamento em disco não é salvo até o próximo intervalo |
| **Aviso/erro ao restaurar estado EMA** | Retomada de checkpoint sem EMA ou configuração de modelo diferente | Leia `"Could not restore the generator EMA..."` no terminal | O Redpanda-vc inicia automaticamente o EMA a partir dos pesos retomados do gerador |
| **Fresh Training apagou checkpoints anteriores** | **Fresh Training** (`--cleanup`) ficou marcado | Confira `logs/<model_name>/` | Desmarque **Fresh Training** ao retomar; checkpoints apagados não podem ser recuperados sem backup |
| **Total Steps já atingido** | `global_step >= Total Steps` | Leia `"already reached step X. Raise the total steps..."` no terminal | Aumente **Total Steps** acima do passo atual e clique em **Start Training** |
| **`.pth` exportado não consegue retomar treino** | Carregou um `.pth` de inferência em vez de `G_*.pth` + `D_*.pth` | Confira o nome (`<name>_Xe_Ys.pth` vs. `G_*.pth`) | Arquivos `.pth` de inferência removem estado de treino; retome de `logs/<model_name>/` com `G_*.pth` e `D_*.pth` |
| **Uso de VRAM inesperadamente alto** | **Checkpointing** desativado, **Batch Size** alto ou **Cache Dataset in GPU** ligado | Veja **Advanced Settings** | Ative **Checkpointing** (activation checkpointing), desligue **Cache Dataset in GPU** e reduza **Batch Size** |

---

## FAQ

**O que significa EMA?**
Exponential Moving Average: uma média móvel dos pesos do gerador mantida durante o treinamento.

**O EMA melhora a qualidade da voz?**
Ele pode suavizar oscilações de peso, mas não é uma garantia. Se uma voz específica soa melhor depende do seu dataset e exige testes de escuta.

**Iniciantes devem deixar o EMA em `0.999`?**
Sim, `0.999` é o padrão no Redpanda-vc e um ponto de partida razoável antes de testar outros valores.

**O que acontece se EMA Decay for `0`?**
O EMA é desativado (`self.ema` não é construído) e os modelos de inferência são exportados dos pesos ao vivo do gerador.

**`0.9999` é melhor que `0.999`?**
Não automaticamente. `0.9999` faz média sobre um histórico mais longo e reage mais devagar às atualizações recentes.

**O EMA deixa o treinamento mais rápido?**
Não. O EMA mantém uma cópia extra dos pesos e executa uma etapa de atualização após cada passo do gerador.

**O EMA evita overfitting?**
Não. Overfitting ainda depende do tamanho do dataset, variedade e total de passos de treinamento.

**O EMA é aplicado ao discriminador?**
Não. No Redpanda-vc (`train.py`), o EMA é aplicado apenas ao gerador (`net_g`).

**Qual a diferença entre uma época e um passo?**
Uma época é uma passada completa pelo dataset; um passo é uma atualização de pesos após processar um batch.

**O Redpanda-vc consegue salvar no meio de uma época?**
Sim. Salvamentos são disparados por `Save Every X Steps`, independentemente dos limites de época.

**Vou perder progresso se parar o treinamento?**
Você mantém o progresso até o último checkpoint `G`/`D` salvo; passos executados após esse salvamento são perdidos.

**Qual a diferença entre Save Only Latest e Save Every Weights?**
`Save Only Latest` sobrescreve os checkpoints de treinamento `G_2333333.pth` / `D_2333333.pth`; `Save Every Weights` exporta um modelo `.pth` de inferência a cada intervalo de salvamento em vez de apenas no passo final.

**Checkpointing é a mesma coisa que salvar checkpoints?**
Não. `Checkpointing` em Advanced Settings é activation checkpointing para economizar VRAM, enquanto `Save Every X Steps` controla o salvamento de checkpoints em disco.

**Posso retomar o treinamento a partir de um `.pth` de inferência?**
Não. Retomar exige um par correspondente de checkpoints `G_*.pth` e `D_*.pth` em `logs/<model_name>/`.

---

## Fontes Oficiais e Leitura Adicional

- **Repositório do Redpanda-vc:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implementação de `GeneratorEMA`:** [`rvc/train/train.py` (linhas 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Salvamento por passos, retomada e estado de exportação:** [`rvc/train/train.py` (linhas 420-436, 526-579, 763-853, 902-921, 1044-1097, 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Controles WebUI de treinamento:** [`tabs/train/rvc.py` (linhas 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Exportador manual de checkpoints:** [`rvc/train/process/checkpoint_exporter.py` (linhas 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **E/S de checkpoints e controle de processos:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **Documentação oficial do PyTorch:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Artigo científico:** Morales-Brotons, Vogels e Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
