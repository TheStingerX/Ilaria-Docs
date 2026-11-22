# Encaminhar e afinar Deiteris w-okada Fork

Usa sempre **auscultadores** durante a conversão ao vivo. Com colunas, a voz convertida volta a entrar no microfone e gera eco e microfonia.

## 1. Configura os dispositivos de áudio

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

1. Define **Audio Input** para o teu microfone físico.
2. Define **Audio Output** para os teus auscultadores num primeiro teste local, ou para **`CABLE Input`** (saída de reprodução do cabo virtual) ao encaminhar para outras apps.
3. No **Discord, OBS, VRChat ou no jogo**, seleciona **`CABLE Output`** como microfone.
   - No Discord, desativa a **Supressão de ruído (Krisp)** e a **sensibilidade de entrada automática** para não cortar respirações e finais suaves.

## 2. Carrega um modelo e ajusta definições

1. Carrega ou seleciona um modelo **RVC `.pth`** de inferência e o respetivo ficheiro **`.index`** opcional.
2. **Chunk / Block size**: começa por volta de `0.3s` - `0.5s` (ou `192` / `256`+ conforme o controlo) para equilibrar atraso e fluidez. Baixar demais o Chunk causa engasgos robóticos.
3. **Extra Data / Context**: mantém moderado (`0.5s` - `1.0s`) para um tom estável sem sobrecarregar a GPU.
4. **Detetor F0 / Pitch**: usa **RMVPE** (mais preciso) ou **FCPE** (mais leve/rápido ao vivo); evita Crepe Full em tempo real se a inferência exceder o tempo do chunk.
5. **Tune (Pitch)**: `+12` para homem -> mulher, `-12` para mulher -> homem, `0` para o mesmo registo.
6. **Index ratio**: começa em `0.0` para testar a conversão limpa e sobe aos poucos (`0.3` - `0.6`) se necessário.

## 3. Correções comuns

- **Latência alta ou cortes robóticos**: fecha jogos/separadores pesados na GPU, sobe Chunk um nível e, se persistir, testa desativar **HAGS** (reinicia, compara antes/depois e reativa se não melhorar).
- **Erro de PortAudio / dispositivo**: alinha todos os dispositivos de áudio para a mesma taxa de amostragem (`48000 Hz`) nas Definições de Som do Windows e fecha apps com controlo exclusivo do dispositivo.
