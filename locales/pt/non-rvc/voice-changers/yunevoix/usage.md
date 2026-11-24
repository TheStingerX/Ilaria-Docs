---
label: "Voice Bank e Uso ao Vivo"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
description: "Tutorial completo para iniciantes para criar perfis .yvoice no Voice Bank, rotear o YuneVoix para Discord, OBS, jogos ou VRChat, usar o monitoramento integrado e escolher Classic, Learned 4 steps ou FlowEdit 3+1."
---
# Voice Bank e Uso ao Vivo

Use este guia para criar vozes no **Voice Bank**, rotear o YuneVoix para **Discord, OBS, jogos ou VRChat**, usar os controles integrados de monitoramento e escolher o **Model method** certo para conversão LIVE. Para um detalhamento completo de cada controle deslizante, consulte [Configurações e Qualidade de Áudio](settings.md).

## 1. Criar e compartilhar vozes (Voice Bank)

Diferente do RVC tradicional, criar um perfil no **Voice Bank** no YuneVoix **não treina uma rede neural do zero** - ele cria uma referência leve `.yvoice` do locutor em segundos.

1. Abra a aba **Voice Bank**.
2. Forneça **10-25 segundos** de gravações nítidas da voz de destino:
   - **O que usar:** Apenas um locutor, fala ou canto limpo e seco, sem música de fundo, reverberação pesada ou vozes sobrepostas.
   - **Variedade útil:** Incluir **risadas naturais, respirações, "mmm" e canto** ajuda o YUNE a capturar um timbre expressivo.
   - **O que evitar:** Clipes com menos de 10 segundos, áudio distorcido/clipado, várias pessoas falando ao mesmo tempo ou eco forte de sala (o que pode deixar a voz convertida ruidosa ou instável).
3. Mantenha a limpeza definida como **"Separate voice + remove reverb (recommended)"** se o clipe de origem tiver ruído de fundo ou eco de ambiente.
4. Salve a voz - ela é armazenada como um arquivo `.yvoice` dentro de `models\yune\voices`.
5. Clique em **Play sample** no Voice Bank para pré-ouvir (a partir da v0.7.0, **Play sample** toca pela sua saída padrão do Windows / fones de ouvido em vez da saída LIVE).

Para compartilhar ou fazer backup de uma voz, use **Voice Bank → Open folder** para localizar o arquivo `.yvoice`, ou carregue um via **Import .yvoice…**.

> **Uso responsável:** Use apenas vozes que você tem direito de usar (a sua própria ou a de alguém que concordou). Nunca use o YuneVoix para se passar por pessoas reais, enganar, assediar ou cometer fraude.

---

## 2. Configurar roteamento de áudio ao vivo e monitoramento

> **Sempre use fones de ouvido** no uso ao vivo. Com caixas de som (ou fones abertos muito altos e pouco isolados), a voz convertida pode vazar de volta para o microfone e causar áudio duplo, eco ou microfonia.

### Roteamento para Discord, OBS, jogos ou VRChat

Com um cabo de áudio virtual como **VB-CABLE** (ou **VAC** `Line 1`), lembre-se de que o cabo tem dois lados: o **YuneVoix** envia áudio *para dentro* do cabo, e o **Discord / OBS / jogos** recebem áudio *a partir* do cabo:

1. **Dentro do YuneVoix (aba LIVE):**
   - **Input (Microphone):** Seu microfone físico.
   - **Output:** **`CABLE Input`** (VB-CABLE) ou **`Line 1`** (VAC).
2. **Dentro do Discord, OBS, VRChat ou do seu jogo:**
   - **Dispositivo de Entrada (Microfone):** **`CABLE Output`** (VB-CABLE) ou **`Line 1`** (VAC).
   - **Dispositivo de Saída (Alto-falantes/Fones):** Seus **fones de ouvido** (nunca o cabo virtual).
3. **No Discord:** Desative a **Supressão de Ruído (Krisp)** e a **sensibilidade de entrada automática** para este microfone virtual - eles cortam respirações e palavras baixas, e o YuneVoix já cuida da limpeza de entrada.

### Ouvir a si mesmo (Monitoramento integrado)

**Não** use a opção *"Escutar o dispositivo"* do Windows no cabo virtual. O YuneVoix oferece controles integrados de monitoramento:

- **(Opcional) Para se ouvir:** Use **"Listen to input"** (o que o motor ouve após a limpeza de entrada) ou **"Listen to output"** (a voz convertida) na aba **LIVE**.
- Escolha seu **Monitor device** (seus fones de ouvido, nunca a saída de cabo virtual do LIVE) e **Monitor volume** (padrão `-6 dB`) em **`Settings → General`**.
- **Nota sobre monitoramento direto:** O *direct monitoring* por hardware do seu headset ou interface de áudio não tem atraso algum, mas reproduz sua **voz original sem processamento**, não a voz convertida.

### Expectativa de latência

Nas configurações padrão (`Output buffer` `200 ms`), o atraso total ponta a ponta é de cerca de **0.7 segundos** (conforme informado pelo desenvolvedor). Isso funciona muito bem para chat de voz, streaming e gravações, embora seja alto demais para cantar exatamente no tempo com uma faixa ao vivo (para cantar sobre música, veja [Song Cover e Karaoke](song-cover-karaoke.md)).

---

## 3. Model Method: Classic vs. Learned 4 Steps vs. FlowEdit 3+1

Você pode escolher **Model method** em **`Settings → Voice & Timbre`** (e separadamente em **`Settings → Song Cover`** para covers e karaoke). As alterações entram em vigor **no próximo START**.

### Classic (Padrão)

- Funciona como nas versões anteriores.
- **Model steps** (`10` padrão, ou `8` / `6` / `4`), **Solver** (`Euler` / `DPM++ 2M`), **Guidance (CFG) only in the first half of the steps** e **Timbre guidance** aplicam-se **apenas** ao modo Classic.

### Learned 4 steps

- Ajustado para soar como Classic de 10 passos enquanto o modelo precisa de cerca de **40%** do tempo de GPU e menos memória de GPU (segundo as notas do desenvolvedor).
- Melhor opção para testar quando estiver jogando ao mesmo tempo ou usando placas de vídeo mais modestas.

### FlowEdit 3+1

- Parte da **sua própria voz** em vez de ruído e muda apenas a identidade vocal, buscando preservar melhor **respirações, sussurros, risadas e articulação** (relatado em cerca de **60%** do tempo de GPU do modelo).
- **Requisito no LIVE:** Precisa de uma amostra de **5-20 segundos** da sua própria fala normal selecionada em **`Settings → Voice & Timbre → "Sample of your voice…"`** (armazenada como `my_voice.yvoice`).
- **Fallback automático:** Sem essa amostra, o FlowEdit 3+1 volta automaticamente para **Learned 4 steps** e a linha de status LIVE informa isso. Com o motor experimental **AMD MIGraphX**, todos os métodos de modelo rodam como **Classic** (10 × Euler).
- **Dica de ambiente e microfone:** Como o FlowEdit preserva mais do seu próprio timbre e da acústica da sala, um ambiente silencioso ou a limpeza de entrada **`DF3`** ajuda a manter a saída limpa.

---

## 4. Ajuste recomendado e Vocal Fry

- **Microphone level (`Settings → General`):** Observe o medidor e aumente o ganho do microfone no Windows para que falas altas tenham picos próximos de **`−6 dBFS`**. Microfone baixo é a causa mais comum de voz robótica ou "debaixo d'água".
- **Input cleaning (`Settings → General`):** Mantenha **`DF3`** ativado em ambientes barulhentos (remove digitação, cliques e chiado; `+30 ms`). Em salas silenciosas, se risadas ou respirações forem cortadas, deixe **Speech gate** desligado e teste **`Gentle`**.
- **Smooth out vocal fry (`Settings → Voice & Timbre`, e `Settings → Karaoke`):** Se você fala ou canta muito grave ou com voz crepitante (vocal fry) e a voz de destino soar áspera, ative **Smooth out vocal fry** (funciona ao vivo; mantém o ar/respiração).
- **Tom e motor de conteúdo:** Ajuste **Pitch shift** (`Settings → Pitch & Autotune`) ou um modo **Automatic pitch**, e compare de ouvido **Whisper** (padrão) vs. **WavLM+** (`Settings → Voice & Timbre`, suportado em NVIDIA e AMD DirectML).

### Jogando enquanto usa o LIVE

Se notar engasgos enquanto joga:
1. Limite os **FPS** do jogo.
2. Mude **Model method** para **`Learned 4 steps`**.
3. Encurte **Prompt length** (ex.: abaixo de `20 s`).
4. Desative **Harmony** se não precisar dela.
5. Verifique a carga geral da GPU (reduzir **Model steps** só se aplica ao modo **Classic**).

Próximo passo: [Configurações e Qualidade de Áudio](settings.md).
