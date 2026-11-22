---
label: "Visão Geral e Requisitos"
icon: ":book:"
order: 99
permalink: /pt/non-rvc/yunevoix/overview/
description: "YuneVoix é um aplicativo de conversão de voz por IA em tempo real para Windows, impulsionado pelo motor YUNE."
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Suporte e Premium)](https://ko-fi.com/yunevoix)

YuneVoix é um aplicativo de conversão de voz por IA em tempo real para Windows, impulsionado pelo motor **YUNE**. Assim como o RVC, ele transforma sua voz na de outra pessoa - tanto para fala quanto para canto, ao vivo ou offline - mas **sem treinar um modelo de voz individual**. Tudo roda localmente na sua própria placa de vídeo: sem nuvem, sem conta, e seu áudio nunca sai do seu PC.

> **Mapa do guia:** [1. Visão Geral e Requisitos](overview.md) · [2. Instalar e Atualizar](installation.md) · [3. Voice Bank e Uso ao Vivo](usage.md) · [4. Configurações e Qualidade de Áudio](settings.md) · [5. Song Cover e Karaoke](song-cover-karaoke.md) · [6. Premium, Licença e Ajuda](premium-and-troubleshooting.md) · [7. Registro de Alterações](changelog.md)

## Como funciona

Em vez de passar horas treinando um modelo em um conjunto de dados, o YUNE cria um perfil **Voice Bank** a partir de uma breve gravação de referência da voz de destino (**10-25 segundos**). *(Separadamente disso, o método LIVE **FlowEdit 3+1** também usa uma amostra de **5-20 segundos** da sua própria voz natural como ponto de partida - por exemplo, 15 segundos da voz de destino no Voice Bank vs. 10 segundos da sua própria fala natural em `Settings → Voice & Timbre → Sample of your voice…`.)*

De acordo com a documentação do desenvolvedor, o pipeline do YUNE divide sua voz em *o que você diz* e *como você diz*:

1. **Voice Bank e identidade do locutor:** Armazena um perfil vocal (`.yvoice`) a partir de uma gravação de destino de 10-25 segundos sem treinar uma rede neural separada do zero.
2. **Motor de conteúdo (`Whisper` ou `WavLM+`):** Captura suas palavras, tempo e articulação.
3. **Rastreamento de tom (pitch):** Segue sua melodia e entonação.
4. **Conversão baseada em difusão:** Reconstrói o áudio no timbre do locutor de destino usando a referência do Voice Bank.
5. **Vocoder neural (`PC-NSF`):** Gera áudio de banda completa a **44.1 kHz**.
6. **Processamento de áudio:** Aplica limpeza de entrada, ferramentas de tom/autotune, EQ/filtros e efeitos.

No modo **LIVE**, o áudio é processado em pequenos blocos de cerca de **160 ms**, com aproximadamente **0.7 segundos** de atraso total ponta a ponta nas configurações padrão (conforme informado pelo desenvolvedor).

## BASIC vs. PREMIUM

| Recurso | BASIC (Gratuito) | PREMIUM |
| --- | --- | --- |
| **Modificador de voz LIVE** (fala e canto) | Incluído | Incluído |
| **Voice Bank** (criar e compartilhar vozes `.yvoice`) | Incluído | Incluído |
| **Ferramentas de tom** (deslocamento, autotune, estabilizador, harmonia) | Incluído | Incluído |
| **Caráter vocal e efeitos de voz** | Incluído | Incluído |
| **Limpeza de entrada** (remoção de ruído/cliques, speech gate) | Incluído | Incluído |
| **Song Cover** (separar vocais, converter, remixar) | - | Incluído |
| **Karaoke** (cantar junto com letras na tela) | - | Incluído |
| **Licença offline** | Não necessária | `license.yvl` por PC |

> **YuneVoix PREMIUM** está disponível para apoiadores no [Ko-fi](https://ko-fi.com/yunevoix). O acesso é tratado de forma privada via Ko-fi ou DMs, e a licença funciona totalmente offline. Veja [Song Cover e Karaoke](song-cover-karaoke.md) e [Premium, Licença e Ajuda](premium-and-troubleshooting.md) para detalhes.

## Recursos principais

- **Modificador de voz LIVE**: microfone na entrada, voz convertida na saída para qualquer dispositivo de áudio (Discord, OBS, jogos, VRChat). Funciona para falar e cantar.
- **Voice Bank**: crie um novo perfil `.yvoice` a partir de **10-25 segundos** de gravações limpas. O YuneVoix pode separar automaticamente a voz de música/ruído e remover reverberação.
- **Três métodos de modelo** (segundo a documentação do desenvolvedor):
  - **Classic:** Comportamento das versões anteriores com controles configuráveis de `Model steps`, `Solver` e guidance.
  - **Learned 4 steps:** Ajustado para soar como Classic de 10 passos usando cerca de **40%** do tempo de GPU do modelo e menos memória de GPU.
  - **FlowEdit 3+1:** Parte da sua própria voz de origem (amostra de 5-20 segundos da sua voz no LIVE; o vocal da música no Song Cover) em vez de ruído e busca preservar melhor respirações, sussurros, risadas e articulação (relatado em cerca de **60%** do tempo de GPU do modelo).
- **Motores de conteúdo**: **Whisper** (padrão) e **WavLM+** (em NVIDIA e AMD DirectML, voltado para fala ao vivo mais clara e preservação de risadas, sussurros e respirações).
- **Ferramentas de tom**: deslocamento de tom manual ou automático, autotune com detecção de tonalidade, estabilizador suave de tom, profundidade de vibrato e harmonia ao vivo (terças, quintas).
- **Caráter vocal, EQ e efeitos**: força de timbre, formantes, calor, suavidade, presença, de-esser, EQ dinâmico, compressor, saturação, bitcrush, reverb e limitador de pico. Veja [Configurações e Qualidade de Áudio](settings.md).
- **Song Cover e Karaoke (PREMIUM)**: regrave músicas completas com separação vocal automática ou cante junto com letras na tela.
- **Seletor de idioma da interface**: inglês, alemão, italiano, espanhol, polonês e português.

## Requisitos do sistema

O YuneVoix exige uma **GPU dedicada** e não pode rodar apenas na CPU. Gráficos integrados/Arc da Intel, macOS e Linux não são suportados.

| Componente | NVIDIA (Recomendado) | AMD |
| --- | --- | --- |
| **SO** | Windows 10 / 11 64-bit | Windows 10 / 11 64-bit |
| **GPU** | 8 GB+ VRAM (**12 GB recomendados**), GeForce RTX recomendada | Radeon **série RX 7000** ou mais recente, 12 GB+ VRAM (**16 GB recomendados**) |
| **Driver** | Driver NVIDIA atual | Driver AMD Software: Adrenalin Edition atual |
| **Áudio** | Microfone + **fones de ouvido** (obrigatório para uso ao vivo) | Microfone + **fones de ouvido** (obrigatório para uso ao vivo) |

> **Nota de rodapé (AMD):** Windows 11 24H2+ e Adrenalin 25.10.13.09+ são necessários apenas para o motor experimental **MIGraphX**, disponível em `Settings → General → "AMD graphics engine"`.

### AMD DirectML vs. AMD MIGraphX

- **AMD DirectML (Padrão na v0.7.1):** Integrado e usado por padrão na GPU AMD dedicada. Funciona imediatamente sem download do Windows Update nem compilação inicial de modelos, e oferece suporte tanto a **`WavLM+`** quanto a **`FlowEdit 3+1`** de acordo com a documentação do desenvolvedor.
- **AMD MIGraphX (Experimental):** Precisa ser ativado explicitamente em `Settings → General → "AMD graphics engine"` e exige reinicialização. O Windows Update pode baixar componentes do MIGraphX, a preparação inicial de modelos pode levar **10-30 minutos**, e **`WavLM+`** e **`FlowEdit 3+1`** **não** ficam disponíveis no MIGraphX.

Próximo passo: [Instalar e atualizar o YuneVoix](installation.md).
