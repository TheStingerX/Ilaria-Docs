# Melhorar a Qualidade de Áudio na Inferência RVC

[Baixar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Na conversão de voz RVC, a **qualidade de áudio** depende de duas metades trabalhando juntas: a **gravação fonte** enviada e o **modelo + ajustes de inferência** aplicados. Em modelos RVC guiados por F0, a conversão sintetiza o timbre da voz alvo usando o contorno F0 extraído da gravação fonte; a voz alvo não impõe automaticamente seu próprio alcance de pitch (os resultados ainda dependem dos dados de treino e limites do modelo). O RVC **não consegue** consertar clipping, música de fundo alta, eco de sala ou dicção embolada já presentes no arquivo de entrada.

## Comece com uma base diagnóstica concreta

Antes de mexer nos controles avançados, faça uma passada limpa no **Ilaria RVC** para saber como o gerador `.pth` se comporta sozinho no seu áudio fonte:

1. Abra a aba **Inference**.
2. Selecione sua voz alvo em **Voice Model** (clique em **Refresh** se acabou de adicioná-la).
3. Fique na sub-aba **Single Inference**.
4. Carregue sua gravação em **Audio to convert**. *(Um trecho curto ajuda a isolar um momento específico mais rápido, mas clipes curtos nunca são obrigatórios.)*
5. Deixe **Pitch** em `0`.
6. Em **Inference Settings**, selecione **RMVPE** em **Pitch Extraction**.
7. Deixe **Index Ratio** em `0` (desativa a busca de características FAISS para você ouvir o gerador `.pth` sem mistura de índice).
8. Deixe desmarcadas (**OFF**) todas as opções de **Audio Processing** (**Split Audio**, **Autotune**, **Proposed Pitch**, **Clean Audio**, **Formant Shifting**, **Post-Process**) e **RMVPE High Register**.
9. Clique em **Convert**.
10. Ouça **Output Audio** e leia **Output Log** para ver o status da conversão, tempos e detalhes disponíveis de índice ou embedder. Essas mensagens não confirmam necessariamente que a busca FAISS foi concluída com sucesso (um índice pode estar selecionado e indicado como ativado nos ajustes enquanto o carregamento FAISS falha ou é ignorado, e `Embedder` pode não aparecer explicitamente quando `Auto (model default)` está selecionado). Confira o diagnóstico no console se o carregamento do índice falhar ou o resultado for inesperado.

> **Apenas base diagnóstica:** Essa configuração inicial serve para isolar o que o gerador `.pth` faz sem busca FAISS ou pós-processamento; não garante qualidade final ideal. Mude um controle por vez a partir dessa base e compare no mesmo volume de escuta.

---

## A. Conseguindo uma conversão limpa

- **Áudio fonte e vocais isolados:** O RVC espera uma voz única, seca e limpa. Ferramentas como [UVR5](../non-rvc/audio-separation-tools/uvr5/overview.md) ou [MVSep](../non-rvc/audio-separation-tools/mvsep/overview.md) ajudam a separar vocais de bases instrumentais, e modelos especializados tratam remoção de ruído, reverberação, sibilância ou restauração conforme o modelo usado (nenhuma ferramenta remove todo tipo de ruído ou eco).
- **Fala vs. canto:** A fala costuma tolerar pequenos ajustes de **Pitch**, enquanto o canto sobre uma faixa instrumental normalmente mantém **Pitch** em `0` para permanecer no tom do acompanhamento (uma transposição diferente de oitava pode ser apropriada se o tom do acompanhamento também mudar).
- **Compatibilidade de modelo e embedder:** Deixe **Embedder Model** em `Auto (model default)`, a menos que tenha treinado ou baixado um modelo que exija um codificador específico (`contentvec`, `spin-v2`, `klm-vocal-contentvec`, etc.). Usar um embedder incompatível pode gerar erro ou degradar a conversão e quebrar a correspondência do índice.
- **Modelos sem guia de pitch (`if_f0 == 0`) vs. modelos guiados por pitch (`if_f0 == 1`):**
  - **Modelos sem guia de pitch (`if_f0 == 0`):** Pulam a extração F0 (`pitch` e `pitchf` não são passados ao gerador `.pth`). Sem condicionamento F0, **Pitch**, **Pitch Extraction**, **RMVPE High Register**, **Autotune**, **Proposed Pitch** e **Protect** (oculto na interface quando `if_f0 == 0`) não se aplicam. **Embedder**, **Index Ratio**, **Formant Shifting**, **Volume Envelope**, **Clean Audio** e **Post-Process** (incluindo **Post-Process → Pitch Shift**) continuam funcionando normalmente.
  - **Modelos guiados por pitch (`if_f0 == 1`):** Extraem um contorno F0 da entrada em `16 kHz` e o passam ao gerador `.pth` junto com as características de conteúdo. **Pitch Extraction**, **Pitch**, **RMVPE High Register**, **Autotune**, **Proposed Pitch** e **Protect** (quando `Index Ratio > 0` e `protect < 0.5`) ficam ativos, tornando esses modelos adequados para canto e fala com controle de afinação.
- **Índice opcional e exportação sem perdas:** Mantenha **Index Ratio** em `0` na base e depois teste seu `added_*.index` correspondente se desejar. Use `wav` ou `flac` para exportações sem perdas; `flac` reduz o tamanho do arquivo sem compressão com perdas. `mp3`, `ogg` e `m4a` usam codificação com perdas no exportador atual do Ilaria RVC, e o formato de exportação nunca adiciona detalhes que o modelo não produziu.

---

## B. Corrigindo problemas de pitch e canto

- **Pitch (Semitons):** Pitch altera o contorno F0 extraído em semitons (`-24` a `+24`; `12` semitons = 1 oitava). Em `0`, a conversão guiada por pitch segue o pitch da fonte sem transposição adicional. Escolha outro valor apenas quando necessário para a performance alvo ou arranjo musical (no canto, uma transposição diferente de oitava pode ser adequada se o tom do acompanhamento também for alterado). Não existe deslocamento de pitch universal para converter entre diferentes tipos de voz. Exige um modelo guiado por pitch (`if_f0 == 1`).
- **Pitch Extraction (F0) no Ilaria RVC:** Estima a frequência fundamental (F0) da entrada em `16 kHz` antes da síntese (diferente do deslocamento de pitch).
  - **Inferência Individual e em Lote (CUDA):** `rmvpe` (padrão), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. *(Em builds DirectML: `pm`, `harvest`, `rmvpe`, `fcpe`.)*
  - **Extração de características no Treino apenas:** Inclui `rmvpe_gpu` (e `dio`); `rmvpe_gpu` **não** é um botão separado na Inferência.
  - *Nota:* Se o `rmvpe` der um salto de oitava em uma nota específica, teste `fcpe`, `swift`, `beatrice` ou `crepe` no mesmo trecho em vez de assumir que um método é universalmente "melhor" ou mais rápido para toda voz.
- **RMVPE High Register** *(visível apenas quando `rmvpe` está selecionado)*:
  - **Enable high register:** Ativa a correção secundária de erros de oitava para notas cantadas muito agudas. **Não** deixe ativado por padrão para fala normal ou canto em região média.
  - **Mode (`true_pitch` / `fold`):** `true_pitch` mantém a F0 corrigida até **Maximum F0 (Hz)** (`1000–2000`, padrão `1250`); `fold` mantém as notas corrigidas uma oitava abaixo.
  - **Advanced (`Activation threshold` `800–1500` Hz padrão `1040`, `Sensitivity`, `Minimum note duration` `0–300` ms padrão `60`):** Ajusta quando a correção de registro agudo entra em ação.
  - **Preview original and corrected F0:** Plota os primeiros 30 segundos de F0 estimada vs. corrigida sem rodar a conversão completa. Um gráfico mais limpo ajuda a diagnosticar saltos de oitava, mas não garante automaticamente áudio melhor.
- **Autotune e Autotune Strength (`0–1`, padrão `1.0`):** Puxa quadros F0 sonoros para a nota cromática temperada mais próxima (`G1`–`C6`), escalado por **Autotune Strength**. Como puxa para *cada* semitom cromático (não há seletor de tonalidade ou escala no Ilaria RVC), força alta pode achatar vibrato natural ou deslizamentos expressivos.
- **Proposed Pitch e Target Pitch (Hz) (`50–1200`, padrão `155`):** Calcula a mediana dos quadros F0 sonoros interpolados no áudio fonte e soma um deslocamento automático em semitons (`-12` a `+12`) em direção a **Target Pitch (Hz)** sobre o controle **Pitch**. Útil como teste rápido de transposição, embora o pitch matematicamente centralizado nem sempre seja o melhor ajuste musical ou vocal. Tanto **Autotune** quanto **Proposed Pitch** exigem modelo guiado por pitch (`if_f0 == 1`).

---

## C. Corrigindo identidade vocal e timbre

- **Content Embedder vs. Voice Generator (`.pth`):** O gerador `.pth` treinado produz a voz alvo, enquanto o content embedder (padrão `Auto (model default)`, normalmente `contentvec`) extrai características da fala da gravação fonte. O embedder foi projetado para reduzir informações da identidade do falante fonte, embora não seja necessariamente totalmente independente do falante, e não define a identidade da voz alvo. Use o embedder esperado pelo modelo para preservar compatibilidade e evitar artefatos de conversão. Embedders HuBERT Base em chinês, japonês, coreano e português exigem um modelo **RVC v2**.
- **Como o `Index Ratio` (`0–1`, padrão `0`) realmente funciona:** O gerador `.pth` é **sempre** usado independentemente do Index Ratio. Quando um banco FAISS `added_*.index` está carregado e `Index Ratio > 0`, o RVC busca os 8 vetores de características mais próximos no índice e os mistura com as características extraídas da sua entrada *antes* do gerador `.pth`:
  `features = retrieved_features * index_rate + original_features * (1 - index_rate)`
  - **`Index Ratio = 0`** desativa a busca FAISS (`original_features` apenas) enquanto o gerador `.pth` segue ativo, fornecendo uma base diagnóstica útil sem recuperação de características FAISS.
  - **Índice selecionado vs. Busca aplicada:** Selecionar um `.index` e colocar `Index Ratio > 0` faz o **Output Log** exibir `Voice index setting: enabled`, mas se o arquivo faltar ou `faiss.read_index()` falhar, o backend continua sem busca.
  - **Aumentar Index Ratio** aproxima as características dos vetores guardados no índice. Um índice compatível pode melhorar algumas conversões, mas também pode piorar resultados (como dicção abafada ou artefatos do dataset) dependendo do áudio e do modelo. Nenhum valor garante pronúncia melhor.
- **Formant Shifting (`apply_formant_shift`, `0.7–1.4`, padrão `1.0`):** Usa Praat/Parselmouth (`Change gender`) **antes** da síntese RVC na entrada em `16 kHz` para deslocar ressonâncias do trato vocal. `1.0` é neutro; valores abaixo de `1.0` visam escurecer/aprofundar a ressonância vocálica, enquanto valores acima de `1.0` visam clareá-la. O algoritmo visa preservar pitch e duração, mas artefatos ainda podem aparecer, especialmente em extremos. **Formant Shifting** não equivale a mudar **Pitch** nem a **Post-Process → Pitch Shift** (que desloca o pitch de saída pós-RVC).

---

## D. Corrigindo consoantes e respirações

- **Como `Protect clear consonants and breathing sounds` (`0–0.5`, padrão `0.33`) funciona:**
  - No pipeline de inferência (`vc()`), quando `protect < 0.5` **e** o modelo usa guia de pitch (`if_f0 == 1`), o RVC guarda uma cópia das características originais sem mistura (`feats0`) *antes* da busca FAISS.
  - Após a busca, quadros surdos / de F0 baixa (`pitchf < 1`) são misturados de volta para `feats0`: valores menores aproximam esses quadros de `feats0`, enquanto **`0.5` desativa a proteção**.
  - **Limitação crítica:** Como o `Protect` mistura de volta para `feats0` (as características pré-busca), **quando `Index Ratio = 0`, `feats` e `feats0` são idênticos**, então mudar `Protect` faz pouca ou nenhuma diferença. Além disso, `Protect` não é um redutor de ruído nem filtro de restauração e não conserta consoantes já clipadas ou distorcidas na fonte ou no modelo.

---

## E. Corrigindo volume, ruído e distorção

- **Volume Envelope (`0=Input source volume, 1=Normalized Output`, padrão `0.25`):** Usa `change_rms()` para misturar o envelope de amplitude RMS do áudio fonte (`1 - rate`) com o envelope RMS da saída RVC (`rate`).
  - `0` faz o áudio convertido seguir de perto o **envelope RMS do áudio fonte**.
  - `1` mantém o **envelope RMS próprio do gerador RVC**.
  - Nota: Apesar do rótulo na interface, `1` **não** normaliza para um alvo fixo de LUFS e **não** é um compressor ou limiter. Ajustar `Volume Envelope` altera a adaptação dinâmica de nível, ajudando quando pausas ou saltos causam bombeamento.
- **Clean Audio e Clean Strength (`0–1`, padrão `0.5`):** Roda `noisereduce` **depois** da conversão RVC no áudio convertido, com **Clean Strength** controlando a intensidade. Dependendo da gravação e do ruído presente, redução agressiva demais pode alterar consoantes, respirações e detalhes vocais; não existe limite universalmente correto. `Clean Audio` é redução de ruído pós-processamento, não restauração de áudio: não repara clipping nem conserta modelo mal treinado.
- **Post-Process Effects** *(aplicados após a conversão via FFmpeg/librosa; deixe OFF para testes base)*:
  - `Pitch Shift (-12..+12)`: Deslocamento de pitch pós-RVC via librosa (altera o áudio pronto em vez do contorno F0 do RVC).
  - `Limiter (-24..0 dBFS, padrão -6)` e `Gain (-24..+24 dB)`: Na cadeia atual de filtros FFmpeg (`ilaria_inference_effects.py`), **Limiter** é inserido **antes** de **Gain** quando ambos estão ativos. Como `Gain` é aplicado depois de `Limiter`, um `Gain` positivo pode empurrar picos de volta ao clipping; `Limiter` não garante saída final sem clipping se um `Gain` positivo vier depois.
  - Efeitos criativos/utilitários: `Reverb`, `Distortion`, `Chorus`, `Bitcrush`, `Clipping`, `Compressor`, `Delay`.
- **Resampling (`0–48000`, `0=none`) e Export Format:** Deixe `0` para manter a taxa de amostragem nativa do modelo (`32k`/`40k`/`48k`). Defina `44100` ou `48000` apenas se sua DAW/projeto exigir uma taxa específica (o resampling muda a taxa de amostragem, não a qualidade intrínseca da síntese). Use `wav` ou `flac` para exportações sem perdas durante verificações de qualidade.

---

## F. Gravações longas e Batch Inference

- **Split Audio:** Chama `silence_split_points()` para inserir cortes alinhados a quadros em pausas silenciosas mantendo os cortes normais de áudio longo (`opt_ts`). Isso altera o tamanho dos segmentos enviados à síntese e pode mudar o comportamento nas junções. **Não** evita necessariamente carregar o áudio inteiro na memória, **não** elimina todas as causas de uso excessivo de memória e **não** corrige volume, distorção ou qualidade vocal.
- **Single vs. Batch Inference:** Ambas as abas expõem os mesmos controles principais (`Pitch`, `Pitch Extraction`, `Index Ratio`, `Resampling`, `Volume Envelope`, `Protect`, `Export Format`, `Audio Processing`, `Embedder Settings` e `RMVPE High Register`). Use **Single Inference** para ajustar parâmetros em um arquivo com reprodução imediata; use **Batch Inference** (`InferOutput/` ou pasta escolhida) após validar os ajustes para converter vários arquivos de uma vez.

---

## Matriz Diagnóstica de Solução de Problemas

| Sintoma | Causas possíveis | Verificar primeiro | Ajuste para testar | Resultado esperado | Se não funcionar |
| --- | --- | --- | --- | --- | --- |
| **Voz aguda / brilhante demais** | **Pitch** alto demais, deslocamento de **Proposed Pitch**, **Formant Ratio** alto ou modelo treinado em região mais aguda | Confira **Pitch**, **Proposed Pitch** e **Formant Shifting** | Deixe **Pitch** em `0` (ou abaixe se precisar) e desligue **Proposed Pitch** e **Formant Shifting** | F0 segue a fonte sem subida extra | Separe altura F0 de ressonância: teste leve redução de **Formant Ratio** abaixo de `1.0` (exemplo opcional: `0.9`) ou confira limites do modelo |
| **Voz grave / abafada demais** | **Pitch** baixo demais, **Formant Ratio < 1.0** ou incompatibilidade modelo/índice | Confira **Pitch**, **Formant Shifting** e **Index Ratio** | Deixe **Pitch** em `0` (ou suba se precisar) e desligue **Formant Shifting** | Presença média/aguda mais clara sem descida | Teste **Index Ratio = 0** para isolar a clareza do `.pth`, ou leve aumento de **Formant Ratio** acima de `1.0` (exemplo opcional: `1.1`) |
| **Timbre metálico / quebradiço** | **Index Ratio** excessivo ou incompatível, **Clean Audio** ou **Autotune** | Confira **Audio Processing** ativos e **Output Log** | Deixe **Index Ratio = 0**, desligue **Clean Audio** e **Autotune** | Isola o timbre puro do `.pth` | Teste outro extrator F0 (`fcpe`, `swift`, `beatrice` ou `crepe`) |
| **Identidade da voz alvo fraca** | Modelo `.pth` errado, incompatibilidade de embedder, índice ausente/incompatível, limites da fonte ou do treino | Verifique **Voice Model**, **Embedder Model**, qualidade da fonte e status do índice no console/log | Confirme o `.pth` correto e seu `added_*.index` (teste `Index Ratio > 0` se compatível) | Timbre alvo mais claro se modelo e índice combinarem | Confira `Model information` para compatibilidade de embedder e teste em uma gravação seca mais limpa |
| **Muito parecida com o falante fonte** | Incompatibilidade modelo/embedder, vazamento de identidade na fonte/embedder ou grande diferença de alcance | Compare a gravação fonte com o embedder esperado e alcance do modelo | Deixe **Embedder Model** em `Auto (model default)` e teste um `added_*.index` compatível se houver | Maior separação do falante fonte | Ajuste **Pitch** apenas se necessário para a performance alvo ou teste outro modelo |
| **Consoantes emboladas / estragadas** | **Index Ratio** excessivo ou incompatível, **Protect** desligado (`0.5`) ou dicção fonte pouco clara | Confira **Index Ratio** e **Protect** (`0.5` = desligado; padrão `0.33`) | Abaixe **Index Ratio** (ou teste `0`) e deixe **Protect** abaixo de `0.5` ao usar índice em modelo com F0 | Preserva melhor características surdas da fonte (`feats0`) na mistura | Confira a dicção do áudio fonte seco; `Protect` não conserta consoantes já emboladas ou clipadas |
| **Sibilantes ásperas (`s`/`ch`)** | Microfone fonte brilhante, **Formant Ratio** alto ou distorção em **Post-Process** | Ouça o áudio fonte seco no Audio Analyzer | Desligue **Formant Shifting** e **Post-Process**; teste **Index Ratio = 0** | Transientes `s`/`ch` mais suaves | Aplique de-essing na gravação fonte seca antes do RVC |
| **Respirações distorcidas ou ausentes** | Gate/ruído na fonte, limites do modelo, **Volume Envelope** ou **Clean Audio** pós-conversão | Compare respirações da fonte com o áudio convertido | Desligue **Clean Audio** e teste **Volume Envelope** (ex.: `0` vs `0.25` padrão) | Respirações seguem a dinâmica da fonte mais de perto | Abaixe **Index Ratio** (ou ponha `0`) se a busca puxar quadros ruidosos |
| **Saltos de oitava em notas longas** | Rastreador F0 confundindo harmônicos ou notas muito agudas | Confira forma de onda/F0 no **Audio Analyzer** | Alterne **RMVPE** / **FCPE** / **Swift** / **CREPE**, ou teste **RMVPE High Register** | Rastreamento F0 mais estável em notas longas | Confira a faixa fonte por vazamento de instrumentos ou harmonias |
| **Vibrato artificial / slides retos** | **Autotune** ativo em canto expressivo | Confira **Audio Processing → Autotune** | Desligue **Autotune** ou reduza **Autotune Strength** (exemplo opcional: `0.3`) | Vibrato natural e slides retornam | Compare a suavidade F0 do **RMVPE** vs **CREPE** |
| **Pitch instável / oscilante** | Fonte ruidosa/com eco ou rastreamento `parselmouth`/`harvest` | Ouça a faixa vocal fonte isolada | Separe/reduza ruído e eco antes do RVC e use **RMVPE** | Contorno F0 mais estável | Aumente `filter_radius` (`>= 3`) se estiver usando `harvest` |
| **Voz robótica / tipo vocoder** | **Embedder** errado, incompatibilidade `v1`/`v2` (que também pode causar erro e impedir a conversão) ou erros graves de F0 | Confira **Output Log** e console para avisos de embedder/F0 | Deixe **Embedder Model** em `Auto (model default)` e verifique **RMVPE** | Síntese vocal natural | Teste em uma gravação fonte seca mais limpa |
| **Chiado de fundo / artefatos de denoising** | **Clean Audio** forte demais ou gravação fonte ruidosa | Compare com **Clean Audio** OFF | Desligue **Clean Audio** ou reduza **Clean Strength** | Menos artefatos aquosos | Aplique denoising/dereverberation dedicado *antes* do RVC |
| **Clipping / distorção áspera** | Clipping já na fonte, na inferência, **Gain** positivo (mesmo após **Limiter**), FX **Distortion/Clipping** ou na exportação | Veja onde a distorção aparece primeiro (fonte vs. saída no **Audio Analyzer**) | Desligue **Post-Process** (especialmente **Gain** positivo após **Limiter**) | Para o clipping pós-RVC | Abaixar o volume de um áudio já clipado **não** reconstrói amostras perdidas; regrave ou use fonte sem clipping |
| **Volume irregular / bombeamento** | **Volume Envelope** incompatível com a dinâmica da fonte | Compare **Volume Envelope** `0` vs `0.25` (padrão) vs `1.0` | Ajuste **Volume Envelope** para `0` (RMS fonte) ou `1.0` (RMS modelo) | Volume das frases mais uniforme | Aplique **Compressor** / **Limiter** leves (sem **Gain** positivo depois) só se necessário |
| **Erros de resampling / exportação / lote** | Taxa `Resampling` inválida, falta FFmpeg (para `mp3`/`ogg`/`m4a`) ou caminho inválido | Leia a mensagem exata no **Output Log** e console | Deixe `Resampling = 0`, exporte `wav` ou `flac`, use caminhos ASCII simples | Exportação sem perdas limpa | Rode `RUN_ILARIA_RVC_LOGS.bat` para ver o traceback completo |

## Guias relacionados

- [Inferência individual e em lote](../ilaria-rvc/convert/inference.md) · [Controles de inferência](../ilaria-rvc/convert/inference-buttons.md) · [Inferência avançada](../ilaria-rvc/convert/advanced-inference.md)
- [Arquivos index (.index)](../start/indexes.md) · [Pitch extractors](../start/pitch-extractors.md) · [Embedders](../start/embedders.md) · [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md)
