---
label: "Datasets, Checker e Audio Analyzer"
icon: ":level_slider:"
order: 95
permalink: /ilaria-rvc/datasets/
description: "O seu dataset é o fator mais importante para definir o quão natural, limpa e expressiva será a voz do seu modelo RVC. Nem as melhores configurações de..."
---
# Datasets, Dataset Checker e Audio Analyzer

[Baixar Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

O seu dataset é o fator mais importante para definir o quão natural, limpa e expressiva será a voz do seu modelo RVC. Nem as melhores configurações de treino conseguem corrigir gravações com ruído, eco ou distorção.

!!!tip
**Regra de ouro: qualidade sempre vence quantidade.**
10 minutos de áudio seco, limpo e variado de um único locutor treinam um modelo muito melhor do que 60 minutos de clipes com eco, ruído ou repetições.
!!!

## 1. O que faz um ótimo dataset de RVC

### Duração e variedade vocal
- **Duração mínima útil:** Cerca de **5 a 10 minutos** de fala ou canto puro (sem contar silêncios) já geram uma voz funcional se o áudio estiver bem limpo.
- **Meta recomendada:** **15 a 30+ minutos** de áudio limpo e variado dão cobertura fonética suficiente para o modelo lidar naturalmente com palavras, alturas e emoções diferentes.
- **Variedade importa:** Inclua fala calma, fala energética, tons variados, trechos baixos e altos e consoantes nítidas (`s`, `f`, `t`, `k`). Treinar apenas com fala monótona dificulta cantar ou falar com expressividade.

### Limpeza de áudio e formato
- **Apenas um locutor:** Nunca deixe vozes sobrepostas, barulho de plateia ou coros de fundo no dataset.
- **Ambiente seco (mínimo de reverb):** O RVC aprende o eco da sala como parte do timbre da voz. Gravações de estúdio com microfone próximo funcionam melhor.
- **Formato sem perdas:** Prefira **`.wav` PCM** (ou `.flac`) em vez de `.mp3` muito comprimidos, evitando artefatos de compressão no modelo.
- **Sem música nem efeitos sonoros:** Remova toda música de fundo, áudio de jogos e SFX antes do pré-processamento.

## 2. Preparar e limpar seu áudio

1. **Separe a voz da música/SFX:** Se o áudio veio de músicas, vídeos ou jogos, extraia antes a voz seca usando [UVR5](../../non-rvc/uvr5/overview.md) ou [MVSep](../../non-rvc/mvsep/overview.md).
2. **Cuidado com denoise ou dereverb pesados:** Só aplique remoção de ruído ou eco quando realmente precisar. Filtros agressivos cortam agudos importantes e criam artefatos aguados ou metálicos. Sempre compare o clipe original com o processado.
3. **Corte silêncios longos e ruídos ruins:** Remova pausas longas vazias, batidas no microfone, tosses, cliques e clipping extremo. Mantenha pausas curtas e naturais entre palavras.
4. **Mantenha clipes com duração equilibrada:** Divida gravações muito longas em trechos limpos (cerca de **3 a 15 segundos** cada), ou deixe o divisor do pré-processamento do Ilaria RVC segmentar automaticamente.
5. **Use caminhos simples:** Salve o dataset em uma pasta curta sem espaços, acentos ou símbolos especiais (por exemplo `C:\RVC\datasets\minha_voz\`).

## 3. Usar o Dataset Checker do Ilaria RVC

Antes de gastar tempo de GPU treinando, rode o **Dataset Checker** integrado do Ilaria RVC para encontrar falhas escondidas cedo:

- **Detecção de clipping:** Encontra trechos onde os picos batem em `0 dBFS` e ficam achatados, causando distorção ou erro `NaN loss` no treino.
- **Silêncios longos:** Marca clipes compostos quase só de silêncio para que você possa cortar ou remover.
- **Arquivos ilegíveis ou corrompidos:** Detecta cabeçalhos quebrados, arquivos de 0 byte ou clipes menores que 1 segundo que travariam o pré-processamento (`zero-size array`).
- **Níveis inconsistentes:** Destaca clipes muito mais baixos ou mais altos que o restante do dataset.

**Fluxo recomendado:**
1. Aponte o **Dataset Checker** para a pasta do dataset e execute a verificação.
2. Ouça cada arquivo sinalizado antes de apagar ou editar.
3. Preserve entregas suaves naturais e pausas intencionais, e remova ou limpe apenas clipes realmente quebrados, estourados ou ruidosos.

## 4. Usar o Audio Analyzer do Ilaria RVC

Use o **Audio Analyzer** para descobrir *por que* uma gravação ou conversão soa estranha:

- **Picos da forma de onda:** Ondas achatadas no topo indicam clipping digital. Abaixe o ganho ou troque o clipe estourado.
- **Espectrograma:** Observe os intervalos de silêncio entre palavras. Uma linha horizontal fixa em 50/60 Hz indica zumbido elétrico; manchas difusas indicam resto de música ou eco da sala.
- **Pitch e níveis ativos:** Veja se a afinação pula de forma artificial ou se o volume cai demais.
- **Comparação Antes vs Depois:** Carregue exatamente o mesmo trecho da entrada original e da saída convertida para saber se o defeito veio do dataset, da separação ou da inferência.

## 5. Erros comuns de dataset para evitar

| Erro | O que acontece com o modelo | Como corrigir |
| --- | --- | --- |
| **Deixar reverb/eco no dataset** | A voz sempre soa como dentro de um banheiro ou caverna. | Use gravações mais secas ou limpe com cuidado usando UVR5/MVSep DeReverb. |
| **Vazamento de música de fundo** | Chiados musicais aleatórios ou artefatos metálicos na fala convertida. | Separe novamente com `BS-Roformer` / `BS Polarformer` e apague clipes sujos. |
| **Vários locutores no mesmo dataset** | O timbre da voz muda do nada no meio da frase. | Mantenha estritamente um único locutor por pasta de dataset. |
| **Dataset minúsculo e repetitivo (< 2 min)** | O modelo decora ruído ("overfitting") e falha em palavras novas. | Adicione frases variadas e pare o treino antes (menos épocas). |
| **Gravações estouradas / com clipping** | Estalos fortes, voz robótica ou erro `NaN loss`. | Remova clipes estourados e normalize o áudio limpo abaixo de `0 dBFS`. |

Leia também [Preparar um dataset de voz](../../model-training/dataset-preparation.md) para mais orientações gerais de gravação e avaliação.
