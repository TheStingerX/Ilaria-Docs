---
label: "Visão geral e requisitos"
icon: ":book:"
order: 99
permalink: /non-rvc/yunevoix/overview/
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Suporte e Premium)](https://ko-fi.com/yunevoix)

YuneVoix é uma aplicação de conversão de voz por IA em tempo real para Windows, alimentada pelo motor **YUNE**. Tal como o RVC, transforma a tua voz na voz de outra pessoa — tanto para fala como para canto, ao vivo ou offline — mas **sem precisar de treinar um modelo de voz**. Tudo corre localmente na tua placa gráfica: sem nuvem, sem conta e o teu áudio nunca sai do teu PC.

## Como funciona

Em vez de passar horas a treinar um modelo num conjunto de dados, o YUNE só precisa de uma pequena amostra de áudio de referência da voz alvo (cerca de **5–20 segundos**). Divide a tua voz entre *o que dizes* e *como o dizes*:

1. **Speech encoder**: capta as palavras, a articulação e o ritmo.
2. **Pitch tracker**: acompanha a tua melodia e entoação.
3. **Modelo diffusion-transformer**: reconstrói o áudio com o timbre da voz alvo a partir da gravação de referência.
4. **Vocoder neural**: gera áudio full-band a **44,1 kHz**.

No modo **LIVE**, o áudio é processado em pequenos blocos de cerca de **160 ms**, com um atraso total aproximado de **0,7 segundos** nas definições predefinidas.

## BASIC vs. PREMIUM

| Funcionalidade | BASIC (Gratuito) | PREMIUM |
| --- | --- | --- |
| **Alterador de voz LIVE** (fala e canto) | Incluído | Incluído |
| **Voice Bank** (criar e partilhar vozes `.yvoice`) | Incluído | Incluído |
| **Ferramentas de pitch** (shift, autotune, estabilizador, harmonia) | Incluído | Incluído |
| **Carácter vocal e efeitos** | Incluído | Incluído |
| **Limpeza de entrada** (remoção de ruído/cliques, speech gate) | Incluído | Incluído |
| **Song Cover** (separar voz, converter e misturar) | — | Incluído |
| **Karaoke** (cantar com letras no ecrã) | — | Incluído |
| **Licença offline** | Não necessária | `license.yvl` por PC |

> **YuneVoix PREMIUM** está disponível para apoiantes no [Ko-fi](https://ko-fi.com/yunevoix). O acesso é tratado em privado por Ko-fi ou DM, e a licença funciona totalmente offline.

## Funcionalidades principais

- **Alterador de voz LIVE**: entrada do microfone, voz convertida para qualquer dispositivo de áudio (Discord, OBS, jogos, VRChat). Funciona para falar e cantar, preservando respirações, sussurros e risos.
- **Voice Bank**: cria uma nova voz a partir de 10–25 segundos de gravações limpas. O YuneVoix pode separar automaticamente a voz da música/ruído de fundo e remover reverberação.
- **Ferramentas de pitch**: mudança de oitava manual ou automática, autotune com deteção de tonalidade, estabilizador suave de pitch, profundidade de vibrato e harmonia ao vivo (terças, quintas, oitavas).
- **Carácter vocal**: controlos de intensidade do timbre, formante, calor e presença com predefinições.
- **Limpeza de entrada**: remoção de ruído e cliques (`DF3` / `Gentle`), speech gate e monitorização de entrada/saída.
- **Efeitos vocais**: de-esser, compressor, reverberação e limitador de picos.
- **Opções de qualidade vs. velocidade**: dois motores de conteúdo (incluindo **WavLM+** em NVIDIA para preservar os teus risos, sussurros e respirações) e vários métodos de modelo. Os modos rápidos usam cerca de 40% do tempo de GPU, e o modo **FlowEdit** preserva melhor a tua respiração e articulação naturais.
- **Song Cover e Karaoke (PREMIUM)**: re-canta músicas completas com separação vocal automática ou canta acompanhando as letras no ecrã.
- **Interface em 6 idiomas**: Inglês, Alemão, Italiano, Espanhol, Polaco e Português.

## Requisitos do sistema

O YuneVoix requer uma **GPU dedicada** e não funciona apenas com CPU. Gráficos Intel, macOS e Linux não são suportados.

| Componente | NVIDIA (Recomendado) | AMD (DirectML) |
| --- | --- | --- |
| **SO** | Windows 10 / 11 64-bit | Windows 11 **24H2** ou mais recente (64-bit) |
| **GPU** | 8 GB+ VRAM (**12 GB recomendados**), GeForce RTX recomendada | Radeon **série RX 7000** ou superior, 12 GB+ VRAM (**16 GB recomendados**) |
| **Driver** | Driver NVIDIA atual | AMD Adrenalin **25.10.13.09** ou mais recente |
| **Áudio** | Microfone + **auscultadores** (obrigatórios ao vivo) | Microfone + **auscultadores** (obrigatórios ao vivo) |

> **Nota NVIDIA vs. AMD**: alguns modos (como o motor de conteúdo `WavLM+`) são exclusivos da NVIDIA. Em AMD, o Windows pode transferir automaticamente o **AMD MIGraphX** através do Windows Update na primeira configuração.
