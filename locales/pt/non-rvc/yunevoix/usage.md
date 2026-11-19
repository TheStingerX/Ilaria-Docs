---
label: "Voice Bank e uso ao vivo"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
---
# Voice Bank e utilização ao vivo

Usa este guia para criar vozes no **Voice Bank**, encaminhar o YuneVoix para **Discord, OBS, jogos ou VRChat** e ajustar as definições de áudio para uma conversão ao vivo limpa.

## 1. Criar e partilhar vozes (Voice Bank)

O YuneVoix não requer **qualquer treino de modelo**.

1. Abre o separador **Voice Bank**.
2. Fornece **10–25 segundos** de gravações limpas da voz alvo:
   - Melhores resultados: apenas uma pessoa, áudio limpo sem música nem efeitos.
   - Incluir **risos, respirações, "mmm" e canto** ajuda o motor a captar a expressividade vocal.
3. Mantém a limpeza em **"Separate voice + remove reverb"** se a amostra tiver ruído de fundo ou reverberação.
4. A tua voz fica pronta em segundos e é guardada num pequeno ficheiro `.yvoice`.

Para partilhar ou fazer cópia de segurança de uma voz, usa **Voice Bank → Open folder** para encontrar o ficheiro `.yvoice`, ou carrega um através de **Import .yvoice…**.

> **Uso responsável**: usa apenas vozes que tens o direito de utilizar (a tua ou de alguém que concordou). Nunca uses o YuneVoix para te fazeres passar por pessoas reais, enganar, assediar ou cometer fraude.

## 2. Configurar o encaminhamento de áudio ao vivo

> **Usa sempre auscultadores** em modo ao vivo. Com colunas, a voz convertida volta a entrar no microfone e gera eco, zumbidos e microfonia.

### Encaminhar para Discord, OBS, jogos ou VRChat

1. Instala um cabo de áudio virtual (como o gratuito **VB-CABLE**).
2. No **YuneVoix**, seleciona o teu microfone físico como entrada e **`CABLE Input`** como dispositivo de saída.
3. No **Discord, OBS, VRChat ou no jogo**, seleciona **`CABLE Output`** como microfone.
4. *(Opcional)* Para te ouvires: abre **Definições de Som do Windows → Gravação → CABLE Output → Propriedades → Ouvir**, ativa **"Ouvir este dispositivo"** e escolhe os teus auscultadores.
5. **No Discord**, desativa a **Supressão de ruído (Krisp)** e a **sensibilidade de entrada automática** para este microfone — cortam respirações e palavras baixas, e o YuneVoix já limpa a entrada.

### Latência esperada

Com as definições predefinidas, o atraso total é de cerca de **0,7 segundos**. É ótimo para streaming, chat de voz e gravações, mas demasiado alto para cantar exatamente a tempo com uma faixa. Reduzir o **Output buffer** baixa ligeiramente a latência, com risco de falhas no áudio.

## 3. Afinações recomendadas

### Nível do microfone e limpeza de entrada

- Vai a **Settings → General** e observa **Microphone level**. Aumenta o ganho do microfone no Windows para que a fala forte atinja picos perto de **−6 dBFS**. Um microfone baixo é a causa mais comum de voz robótica ou "debaixo de água".
- Mantém **Input cleaning** em **`DF3`** em ambientes ruidosos. Numa divisão silenciosa, se risos, respirações ou sussurros forem cortados, desativa **Speech gate** e experimenta **`Gentle`**.

### Pitch e Autotune

Vai a **Settings → Pitch & Autotune**:
- **Pitch shift**:
  - **`+12`** para voz masculina → alvo feminino
  - **`0`** para uma voz no teu próprio registo
  - **`−12`** para voz feminina → alvo masculino
  - Ou ativa o **pitch automático**.
- Para cantar, podes ativar **autotune** (com deteção de tonalidade), **pitch stabilizer**, **vibrato depth** e **harmonia ao vivo** (terças, quintas, oitavas).

### Carácter vocal, efeitos e carga de GPU

- **Voice character**: ajusta intensidade do timbre, formante, calor e presença, ou começa a partir de uma predefinição.
- **Vocal effects**: de-esser, compressor, reverberação e limitador de picos.
- **Motores de conteúdo e FlowEdit** (**Settings → Voice & Timbre**):
  - Em NVIDIA, experimenta **WavLM+** para manter risos, sussurros e respirações da tua própria voz.
  - O modo **FlowEdit** preserva mais da tua respiração e articulação naturais.
  - Se estiveres a **jogar ao mesmo tempo** e notares engasgos, baixa os gráficos/FPS do jogo, reduz **Model steps**, usa um prompt mais curto ou desativa **Harmony**.
