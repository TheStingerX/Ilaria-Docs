# Encaminhar e afinar Deiteris w-okada Fork

> **Correct Audio Routing**
>
> **1. Dentro do Voice Changer**
> - **Input Device:** Seu microfone físico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. No Discord, Jogos, OBS ou outros aplicativos**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Seus fones de ouvido ou alto-falantes.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> O áudio recebido do Discord, do jogo ou de outros apps deve ir diretamente para os **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** `Line 1` é o nome usado pelo **VAC (Virtual Audio Cable)**, não um nome universal para todos os cabos virtuais. Com **VB-CABLE**, defina a saída do Voice Changer como **`CABLE Input`** e a entrada do Discord / jogo como **`CABLE Output`**.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado, para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

Usa sempre **auscultadores** durante a conversão ao vivo. Com colunas, a voz convertida volta a entrar no microfone e gera eco e microfonia.

## 1. Configura os dispositivos de áudio

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
