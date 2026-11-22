---
label: "Alterador em tempo real"
icon: ":studio_microphone:"
order: 96
permalink: /non-rvc/causal-voice-changer/realtime/
description: "Depois de executares run-training pelo menos uma vez e teres uma voz .cvc pronta, inicia o alterador de voz ao vivo com:"
---
# Usar o CausalVC Realtime

Depois de executares `run-training` pelo menos uma vez e teres uma voz `.cvc` pronta, inicia o alterador de voz ao vivo com:
- **Windows**: `run-realtime.bat`
- **Linux**: `run-realtime.sh` *(podes adicioná-lo ao menu de aplicações com `realtime/scripts/install-desktop-entry.sh`)*

> **Usa sempre auscultadores** ao usar um alterador de voz ao vivo. Com colunas, a voz convertida volta a entrar no microfone e gera eco e microfonia.

## 1. Configurar o áudio (página `Audio`)

1. **Input → Source**:
   - Escolhe **Microphone / audio device** para falar ao vivo.
   - *(Ou **Audio file** para testar uma voz reproduzindo um ficheiro gravado através do modelo.)*
2. **Input device**: seleciona o teu microfone físico.
3. **Output device**: escolhe para onde vai a voz convertida.
   - Para usar o CVC no **Discord, OBS, VRChat ou jogos**, instala um cabo de áudio virtual (como o **VB-CABLE** no Windows), escolhe **`CABLE Input`** aqui e seleciona **`CABLE Output`** como microfone no Discord/OBS.
4. **Monitor device** *(opcional)*: escolhe os teus **auscultadores** se quiseres ouvir a tua voz convertida, ou deixa em **Disabled**.
5. *(Dica Linux)*: os dispositivos `[JACK]` oferecem a menor latência. Podes definir o período do PipeWire com `PIPEWIRE_QUANTUM`, ex. `128/48000`.

> **Correct Audio Routing**
>
> **1. Dentro do Voice Changer**
> - **Input Device:** Seu microfone físico.
> - **Output Device:** `Line 1` (VAC, recomendado) ou `CABLE Input` (VB-CABLE).
>
> **2. No Discord, Jogos, OBS ou outros aplicativos**
> - **Input Device:** `Line 1` (VAC, recomendado) ou `CABLE Output` (VB-CABLE).
> - **Output Device:** Seus fones de ouvido ou alto-falantes.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> O áudio recebido do Discord, do jogo ou de outros apps deve ir diretamente para os **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) é sempre recomendado. Se você também (ou só) usa **VB-CABLE**, lembre-se de que o voice changer envia para **`CABLE Input`** e o Discord / jogos recebem de **`CABLE Output`**.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado, para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

## 2. Escolher e afinar a voz (página `Model`)

1. Escolhe **Model** (e **Checkpoint** se houver vários passos guardados).
2. **Pitch (semitones)**: desloca o tom em semitons (`+12` = uma oitava acima, `-12` = uma oitava abaixo).
   - **Pitch match**: não adivinhes! Larga excertos da voz do modelo em Pitch match para medir os Hz medianos, depois fala enquanto convertes para o CVC medir a tua voz e sugerir o ajuste exato (**Apply**).
3. **Advanced pitch** *(recolhido por predefinição - a maioria das vozes não precisa)*:
   - **Pitch offset (Hz)**: soma um deslocamento fixo em Hz após o ajuste em semitons. Valores positivos estreitam o alcance; negativos alargam-no.
   - **Pitch ceiling (Hz)** e **Above the ceiling (%)**: contém picos agudos acima do teto mantendo as notas abaixo afinadas (ótimo para cantar; `0%` trava no teto).
4. **Formant**: altera a ressonância vocal sem mudar o tom (`0` = formante natural do modelo).
5. **Index (%)** *(desligado por predefinição)*: mistura cada 20 ms de fala com os momentos mais parecidos do áudio de treino. Valores altos demais podem borrar palavras.
   - **Consonant protection** *(só atua com Index > 0)*: mantém respirações e consoantes (`s`, `t`, `k`) mais próximas das tuas.

## 3. Ajustar níveis e volume (`Levels`)

- **Input gain**: ajusta o microfone antes da conversão.
- **Output gain**: volume enviado para o Discord/OBS/jogos.
- **Monitor gain**: volume que ouves apenas nos teus auscultadores.
- **Noise gate**: silencia o microfone abaixo deste limiar (`-60 dB` = desligado).
- **Output level (LUFS)**: fala enquanto convertes e clica em **Apply** para ajustar o Output gain para **Voice chat (`-21 LUFS`)** ou **Streaming (`-16 LUFS`)**.

## 4. Iniciar a conversão (barra inferior)

- Clica em **Start** para converter ao vivo, ou **Passthrough** para passar o microfone sem conversão.
- Observa os medidores **In / Out / Mon** e os dois tempos:
  - **Latency**: atraso total do microfone até à saída.
  - **Inference**: tempo que a GPU demora a converter um bloco. **Inference tem de ficar bem abaixo do tamanho de Chunk** (ex. `< 10 ms` para um chunk de `20 ms`), senão o áudio engasga.
