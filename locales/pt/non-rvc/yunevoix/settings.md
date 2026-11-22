---
label: "Configurações e Qualidade de Áudio"
icon: ":gear:"
order: 96
permalink: /pt/non-rvc/yunevoix/settings/
description: "Guia completo e acessível para iniciantes sobre cada configuração do YuneVoix v0.7.1 em General, Voice & Timbre, Pitch & Autotune, EQ & Filters e Effects."
---
# Configurações do YuneVoix Explicadas - Guia Completo de Qualidade de Áudio

[Visão Geral e Requisitos](overview.md) · [Voice Bank e Uso ao Vivo](usage.md) · [Song Cover e Karaoke](song-cover-karaoke.md)

Esta referência explica cada configuração documentada no YuneVoix **v0.7.1** (NVIDIA e AMD). Na documentação do desenvolvedor:
- **"Works live"** significa que a mudança entra em vigor imediatamente enquanto o LIVE está rodando.
- **"At the next START"** significa que você deve parar o LIVE e clicar em **START** novamente para que a mudança tenha efeito.

---

## Settings → General

Estes controles gerenciam limpeza de entrada, monitoramento, nível de saída, buffer e seleção do backend gráfico AMD (aplica-se ao **LIVE**, enquanto `Models folder` e `AMD graphics engine` afetam o aplicativo globalmente):

| Controle | Padrão | Aplica-se | O que é e o que faz | Quando usar e o que pode dar errado |
| --- | --- | --- | --- | --- |
| **Input cleaning** (`DF3`, `Gentle`, `Sidon`, `Off`) | `DF3` | No próximo START | Limpa o áudio do microfone antes da conversão. `DF3` remove digitação, cliques e chiado enquanto reforça micros baixos (`+30 ms`). `Gentle` remove ruído constante/cliques preservando risadas e respirações. `Sidon` reconstrói a fala na GPU (`+~200 ms`). `Off` desativa a limpeza. | Use `DF3` em salas normais/barulhentas, `Gentle` em salas silenciosas, `Off` apenas para microfone de estúdio limpo. **Não use `Sidon` para cantar** (documentado como inadequado para canto). |
| **Speech gate** | `Off` | Ao vivo | Silencia a saída entre palavras. | Ative apenas em salas barulhentas durante fala comum; **risadas e suspiros são cortados**, então deixe desligado se você ri bastante. |
| **Microphone level** | Medidor (alvo `−6 dBFS`) | Apenas medidor | Exibe o nível do microfone em dB. | Aumente o ganho do microfone no Windows até que a fala forte atinja picos perto de **`−6 dBFS`**. Entrada baixa causa som robótico ou "debaixo d'água". |
| **Monitor device** | Saída padrão do Windows | Monitoramento LIVE | Escolhe onde **"Listen to input"** / **"Listen to output"** tocam. | Defina para seus **fones de ouvido**, nunca para o cabo virtual usado como saída LIVE (evita microfonia). |
| **Monitor volume** | `−6 dB` | Monitoramento LIVE | Ajusta o volume da saída de monitoramento integrada. | Abaixe se o monitoramento estiver alto; não afeta o que Discord/OBS recebem. |
| **Output volume** | `−6 dB` | Ao vivo | Controla o nível da saída convertida enviado ao dispositivo de saída LIVE. | O YUNE toca mais alto que a maioria das gravações; mantenha em torno de `−6 dB` salvo se o app receptor precisar de ajuste. |
| **Peak limiter (`−1 dBFS`)** | `On` | Ao vivo | Limita picos de saída em `−1 dBFS` para evitar clipping digital. | Mantenha **On** a menos que esteja testando dinâmica bruta intencionalmente. |
| **Output buffer** | `200 ms` | No próximo START | Tamanho do buffer de áudio antes da reprodução. | Valores maiores reduzem falhas/estalos ao custo de maior latência; baixar demais causa cortes no áudio. |
| **Models folder** | Vazio (`models` ao lado do `.exe`) | Global | Aponta para uma pasta personalizada de modelos/vozes. | Deixe vazio a menos que guarde `models` em outro local. |
| **Save diagnostic recordings** | `Off` | Diagnóstico | Salva arquivos WAV do que o motor ouviu e produziu (para automaticamente após 10 min; volta para Off ao reiniciar). | Ligue **apenas** ao reportar um bug; verifique se há fala privada antes de compartilhar. |
| **Restore default settings** | Botão de ação | Global | Restaura todas as configurações para o padrão. | Suas vozes salvas e dispositivos de áudio selecionados permanecem intactos. |
| **AMD graphics engine** *(apenas build AMD)* | `DirectML` | Após reiniciar | Alterna entre **DirectML** (padrão, GPU dedicada) e o experimental **MIGraphX**. | Deixe em **DirectML** para `WavLM+` e `FlowEdit 3+1`. **MIGraphX** requer Windows 11 24H2+, Adrenalin 25.10.13.09+, 10-30 min de compilação inicial e desativa `WavLM+`, `FlowEdit 3+1`, `Learned 4 steps` e as opções exclusivas de Classic (tudo roda como Classic, 10 × Euler). |

> **Limpeza vs. Volume vs. Limitador vs. Buffer:** *Input cleaning* remove ruído de fundo antes da IA ouvir você; *Output volume* muda o volume; *Peak limiter* evita distorção repentina; *Output buffer* troca latência por estabilidade contra estalos.

---

## Settings → Voice & Timbre (LIVE)

Controla o quanto a saída se aproxima da voz do Voice Bank vs. sua própria voz, e qual método de modelo é executado:

- **Timbre strength** (`100%` padrão): Abaixo de `100%` mistura seu próprio timbre vocal usando **`Sample of your voice…`** (5-20 s de fala normal, salvo como `my_voice.yvoice`). Funciona no LIVE.
- **Timbre change when you raise or lower your voice** (`50%` padrão): `100%` deixa a cor vocal variar naturalmente com o tom; `0%` mantém a mesma cor em toda a extensão.
- **Prompt length** (`20 s` padrão, recomendado): Duração do prompt de referência usado pelo modelo de difusão. `20 s` dá o timbre mais estável; valores menores economizam memória de GPU (**No próximo START**).
- **Model method** (`Classic` padrão, **No próximo START**):
  - **`Classic`:** Comportamento das versões anteriores; habilita os quatro controles exclusivos de Classic abaixo.
  - **`Learned 4 steps`:** Ajustado para soar como 10 passos enquanto o modelo precisa de cerca de **40%** do tempo de GPU e menos memória de GPU (segundo notas do desenvolvedor).
  - **`FlowEdit 3+1`:** Parte da sua própria voz (`Sample of your voice…`, 5-20 s) em vez de ruído e muda apenas a identidade vocal, mantendo melhor respirações, sussurros, risadas e articulação (cerca de **60%** do tempo de GPU do modelo). Volta para `Learned 4 steps` se não houver amostra (mostrado na linha de status LIVE). No **AMD MIGraphX** todos os métodos de modelo rodam como `Classic` (10 × Euler).
- **Controles exclusivos de Classic** *(ativos apenas quando `Model method = Classic`)*:
  - **Model steps** (`10` padrão): `8`, `6` (`≈ −0.75 GB` VRAM) ou `4` (`≈ −1.1 GB` VRAM) rodam mais rápido com menos VRAM.
  - **Solver** (`Euler` padrão): Mude para `DPM++ 2M` ao usar `4-6` passos.
  - **Guidance (CFG) only in the first half of the steps** (`Off` padrão): Economiza memória de GPU, útil principalmente com `4-6` passos.
  - **Timbre guidance** (`0 = off` padrão): `0.5-1` reforça a soprosidade em gravações de destino soprosas; custa tempo extra de GPU.
- **Content engine** (`Whisper` padrão, **No próximo START**):
  - **`Whisper`:** Maior fidelidade ao timbre de destino.
  - **`WavLM+`** *(apenas NVIDIA e AMD DirectML; indisponível no AMD MIGraphX)*: Fala ao vivo mais nítida, preserva risadas, sussurros e respirações com muito menos zumbido, embora o timbre possa ser ligeiramente menos exato. Como `WavLM+` usa seu próprio modelo, **`Fine-tuned model`** e **`Breathiness`** ficam desativados quando `WavLM+` está ativo.
- **Fine-tuned model** (`Off` padrão, **No próximo START**, apenas Whisper): Segue sua respiração e textura vocal mais de perto, com timbre de destino ligeiramente menos exato.
- **Breathiness** *(apenas Fine-tuned model)*: Padrão `as you sing`; `×1` / `×2` adiciona ar extra.
- **Roughness from your voice** (`Off` padrão): Restaura a aspereza vocal onde sua própria voz é rouca/rasgada.
- **Smooth out vocal fry** (`Off` padrão, **Funciona ao vivo**): Evita que fala/canto muito grave ou crepitante soe áspero, preservando a soprosidade.
- **Guidance (CFG)** (`0.7` padrão, recomendado conforme treinado): Controla a aderência ao prompt do timbre de destino.

---

## Settings → Pitch & Autotune (LIVE)

- **Pitch shift** (`+12 st` padrão na documentação do desenvolvedor como exemplo de voz masculina → destino feminino; `0` para mesma extensão; `−12` para feminina → masculina): Desloca o tom em semitons. Não existe um único deslocamento "correto" para toda voz - escolha o ajuste adequado à sua voz e ao personagem de destino.
- **Automatic pitch** (`Off` padrão): `Off` usa o controle deslizante Pitch shift. **`Octave from the target voice`** mantém o canto afinado; **`Match the target voice's pitch`** ajusta o tom da fala em direção ao destino.
- **Melody mode** (`Follow my pitch` padrão):
  - **`Follow my pitch`:** Rastreamento natural do tom.
  - **`Autotune`:** Encaixa as notas na tonalidade/escala (`Retune speed` `40 ms` padrão: `25-60 ms` natural, `0-10 ms` robótico; `Stability` `50%`; `Pull to the nearest note` `50%`; `Note change threshold` `20 cents`).
  - **`Stabilize`:** Estabiliza notas sustentadas mantendo o vibrato.
- **I sing without a backing track** (`On` padrão): Coloque em **Off** ao cantar junto com uma música.
- **Key / Scale** (`Auto` padrão): Detecta ou trava automaticamente a escala musical para Autotune/Harmony.
- **Vibrato** (`100%` padrão): Mantém seu vibrato natural em `100%`.
- **Fix pitch detector errors** (`On` padrão, recomendado): Suaviza saltos repentinos do detector de tom.
- **Harmony** (`Off` padrão): Adiciona terças/quintas ao vivo seguindo a tonalidade (`Harmony volume` `−6 dB`); consome tempo extra de GPU.

---

## Settings → EQ & Filters (LIVE)

Todos os controles aqui moldam o timbre e suavizam asperezas no **LIVE** (e são copiados para covers se você clicar em **Copy settings from LIVE**):

- **Voice character** (`Off (as before)` padrão): Predefinições integradas (**Soft**, **Warm**, **Bright**, **Calm**, **Expressive**) ou controles manuais de **Formants**, **Intonation range**, **Pitch smoothing**, **Warmth** (`≈250 Hz`), **Softness** (`0.5-3 kHz`) e **Presence** (`≈3.5 kHz`).
- **Breath smoothing** (`100%` padrão): Remove leves estalidos nas respirações.
- **Silence stays silent** (`On` padrão): Força pausas para silêncio real; com `WavLM+` você pode comparar em **Off**.
- **Smooth top** (`100%` padrão) e **Brightness** (`0 dB` padrão): **Smooth top** suaviza aspereza/granulação em altas frequências. Só aumente **Brightness** se a saída soar abafada (e defina **Smooth top** como `0` ao aumentar Brightness).
- **Filters, De-esser, Dynamic EQ** (`Off` padrão): Escolha uma predefinição primeiro e depois ajuste fino se sibilantes (`s`/`ch`) ou frequências específicas soarem estridentes.

---

## Settings → Effects (LIVE)

- **Compressor, Saturation, Bitcrush, Reverb** (`Off` padrão): Cada efeito inclui predefinições e **funciona ao vivo** (muda suavemente mesmo enquanto canta). Use com moderação para não mascarar o timbre de destino nem adicionar distorção ou eco indesejados.

---

## Tabelas de Referência Rápida

### Ponto de Partida Recomendado (da Documentação do Desenvolvedor)

| Área | Valor Inicial | Notas |
| --- | --- | --- |
| **Input cleaning** | `DF3` (`Gentle` em salas silenciosas) | `Speech gate` `Off` |
| **Microphone level** | Picos perto de `−6 dBFS` | Ajustar nas configurações de Som do Windows |
| **Output / Monitor volume** | `−6 dB` / `−6 dB` | `Peak limiter (−1 dBFS)` `On` |
| **Output buffer** | `200 ms` | Aumentar se o áudio estalar |
| **Prompt length / CFG** | `20 s` / `0.7` | `Timbre strength` `100%` |
| **Model method / Content engine** | `Classic` (ou `Learned 4 steps` para jogos) / `Whisper` | Testar `WavLM+` / `FlowEdit 3+1` para respirações e risadas |
| **EQ & Effects** | `Smooth top` `100%`, `Brightness` `0 dB`, `Breath smoothing` `100%` | `Effects` `Off` |

### Quando as Mudanças Entram em Vigor (`Works live` vs. `At the next START`)

| Aplica-se Imediatamente (`Works live`) | Requer Stop → `START` (`At the next START`) |
| --- | --- |
| `Speech gate`, `Output volume`, `Peak limiter` | `Input cleaning`, `Output buffer` |
| `Smooth out vocal fry`, `Timbre strength`, `Guidance (CFG)` | `Prompt length`, `Model method` (`Classic` / `Learned 4 steps` / `FlowEdit 3+1`) |
| Controles de `Pitch & Autotune`, `EQ & Filters`, `Effects` | `Content engine` (`Whisper` / `WavLM+`), `Fine-tuned model` |

### Controles Exclusivos de Classic vs. Compatibilidade de Backends AMD

| Recurso | Apenas Classic? | NVIDIA | AMD DirectML | AMD MIGraphX (Experimental) |
| --- | --- | --- | --- | --- |
| `Model steps`, `Solver`, `1st-half CFG`, `Timbre guidance` | **Sim** | Sim | Sim | **Não** *(fixo 10 × Euler)* |
| `Learned 4 steps` | Não | Sim | Sim | **Não** *(volta para Classic)* |
| `WavLM+` | Não | Sim | Sim | **Não** *(indisponível)* |
| `FlowEdit 3+1` | Não | Sim | Sim | **Não** *(volta para Classic)* |

> No AMD MIGraphX, o YUNE sempre executa o método Classic com 10 passos Euler; `Learned 4 steps`, `FlowEdit 3+1` e as opções exclusivas de Classic não estão disponíveis lá.

### Diferenças Iniciais entre Fala e Canto

| Configuração | Fala (Discord / Streaming) | Canto |
| --- | --- | --- |
| **Input cleaning** | `DF3` (ou `Gentle` em sala silenciosa) | `DF3` ou `Gentle` (**nunca `Sidon`**) |
| **Automatic pitch** | `Match the target voice's pitch` (ou `Off` + controle) | `Octave from the target voice` (ou `Off` + `0`/`±12`) |
| **I sing without a backing track** | `On` | `Off` ao cantar com música |
| **Melody mode** | `Follow my pitch` | `Follow my pitch`, `Stabilize` ou `Autotune` |

Próximo passo: [Song Cover e Karaoke - Guia Completo para Iniciantes](song-cover-karaoke.md).
