# Pitch Extractors do RVC (Métodos F0)

Um **pitch extractor** (também chamado de **método de extração F0**) é o algoritmo ou rede neural que acompanha a frequência fundamental (afinação, melodia e entonação) da voz de entrada ao longo do tempo.

Enquanto o [embedder](embedders.md) lê *quais palavras e fonemas* estão sendo falados ou cantados, o **pitch extractor** mede *o quão grave ou aguda* está a voz a cada milissegundo.

!!!tip
**Boa notícia sobre compatibilidade:**
Diferente dos embedders, **os pitch extractors não prendem você a uma única escolha**. Mesmo que um modelo tenha sido treinado usando `rmvpe` no pré-processamento do dataset, você pode alternar livremente entre `rmvpe`, `rmvpe_gpu`, `fcpe` ou `crepe` na inferência e no voice changer ao vivo sem quebrar a compatibilidade.
!!!

## Recomendação rápida

- **Melhor opção geral (Treino e Conversão):** `rmvpe` ou `rmvpe_gpu` (se você tiver GPU NVIDIA).
- **Melhor para Voice Changer ao vivo / Tempo real:** `fcpe` (menor latência) ou `rmvpe` (melhor qualidade se sua GPU aguentar).
- **Evitar no uso normal:** `pm`, `dio` e `harvest` são métodos antigos em CPU que soam bem pior ou rodam muito mais devagar que `rmvpe` e `fcpe`.

---

## Todos os Pitch Extractors conhecidos comparados

| Pitch Extractor | Tipo | Velocidade | Qualidade e melhor uso | Notas |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Rede neural | Rápido | **Melhor padrão geral** para fala, canto e extração F0 de dataset. | Lida com consoantes, respirações e leve eco bem melhor que métodos antigos. |
| **`rmvpe_gpu`** | Rede neural (GPU CUDA) | **Muito rápido** | Mesma alta precisão do `rmvpe`, executado diretamente na sua GPU NVIDIA em vez da CPU. | Ideal no Ilaria RVC / RVC WebUI para faixas longas, lotes e pré-processamento rápido. Exige VRAM livre suficiente. |
| **`fcpe`** | Rede neural | **Ultra rápido** | **Melhor para tempo real / ao vivo** e inferência de baixa latência. | Um pouco mais leve que o `rmvpe`; ótimo se o `rmvpe` causar cortes ao vivo. |
| **`crepe` / `crepe-full`** | Rede neural | Lento | Alta precisão em canto solo limpo e vibrato. | Bem mais pesado na GPU/CPU que o `rmvpe`. Geralmente lento demais para uso ao vivo. |
| **`crepe-tiny`** | Rede neural (pequena) | Rápido | Versão leve do `crepe` para PCs antigos. | Menos preciso que `rmvpe` e `fcpe`; superado pelo `fcpe`. |
| **`harvest`** | DSP clássico (WORLD) | Muito lento (CPU) | Método antigo para fala limpa. | Tende a dar saltos de oitava e som metálico em canto ou áudio com ruído. Costuma exigir `filter_radius`. |
| **`pm`** | DSP clássico (Parselmouth) | Ultra rápido (CPU) | Prévias rápidas em PCs muito fracos sem GPU. | Perde fácil o rastreamento em canto, sussurros ou vozes sujas. |
| **`dio`** | DSP clássico (WORLD) | Muito rápido (CPU) | Alternativa antiga rápida em CPU. | Menos preciso que `rmvpe` e `fcpe`; não recomendado para renderizações finais. |
| **`hybrid[...]`** | Métodos combinados | Lento | Mistura dois extratores (ex. `hybrid[rmvpe+fcpe]` ou `hybrid[crepe+rmvpe]`). | Disponível no Applio e alguns forks para suavizar saltos de oitava em canto difícil, mas roda mais devagar. |
| **Variantes `swift` / `onnx`** | Leve / ONNX | Muito rápido | Extratores otimizados em forks recentes (como Applio ou Deiteris). | Úteis em CPU ou DirectML onde extratores PyTorch padrão são mais lentos. |

## `rmvpe` vs `rmvpe_gpu`: qual é a diferença?

Em apps como **Ilaria RVC** e **RVC Mainline**, você verá frequentemente `rmvpe` e `rmvpe_gpu`:
- **`rmvpe`** pode rodar na CPU ou seguir o agendamento padrão do app, usando menos VRAM, mas podendo ficar lento em arquivos longos ou datasets grandes.
- **`rmvpe_gpu`** roda explicitamente o RMVPE na sua **GPU CUDA**, entregando exatamente a mesma qualidade de afinação com velocidade muito maior na extração F0 e conversão offline.
- Se `rmvpe_gpu` der erro `CUDA out of memory` em uma placa com pouca VRAM (4 GB ou menos), volte para `rmvpe` ou `fcpe`.

## Qual escolher para sua tarefa

1. **Preparar / Treinar um novo modelo:** Use **`rmvpe_gpu`** (se tiver GPU NVIDIA com 6+ GB de VRAM) ou **`rmvpe`**. Um rastreamento F0 limpo evita falhas de afinação na voz treinada.
2. **Converter músicas ou locuções offline:** Comece com **`rmvpe`** ou **`rmvpe_gpu`**. Só teste `crepe-full` ou `hybrid` se uma nota aguda específica der salto de oitava.
3. **Microfone ao vivo / Discord:** Comece com **`fcpe`** para menor atraso, ou **`rmvpe`** se sua GPU segurar seu chunk size sem estalos.
