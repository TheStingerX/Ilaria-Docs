---
label: "🎵 Pitch extractors"
order: 92
permalink: /pitch-extractors/
description: "Um pitch extractor (também chamado de método de extração F0) é o algoritmo ou rede neural que acompanha a frequência fundamental (afinação, melodia e entonação) da voz de entrada ao longo do tempo."
---
# Pitch Extractors do RVC (Métodos F0)

Um **pitch extractor** (também chamado de **método de extração F0**) é o algoritmo ou rede neural que acompanha a frequência fundamental (afinação, melodia e entonação) da voz de entrada ao longo do tempo.

Enquanto o [embedder](embedders.md) lê *quais palavras e fonemas* estão sendo falados ou cantados, o **pitch extractor** mede *o quão grave ou aguda* está a voz a cada milissegundo.

!!!tip
**Compatibilidade:**
Diferente dos embedders, **os pitch extractors não prendem você a uma única escolha**. Mesmo que um modelo tenha sido treinado usando `rmvpe` no pré-processamento do dataset, você pode alternar livremente entre `rmvpe`, `rmvpe_gpu`, `fcpe` ou `crepe` na inferência e no voice changer ao vivo sem quebrar a compatibilidade.
!!!

## Recomendação rápida (Específico do Ilaria RVC)

- **Inferência Individual e em Lote (CUDA):** O Ilaria RVC oferece `rmvpe`, `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest` e `crepe`. **`rmvpe`** é o ponto de partida padrão na interface.
- **Inferência DirectML (AMD / Intel):** Apenas `pm`, `harvest`, `rmvpe` e `fcpe` são exibidos.
- **Extração de características no Treino:** `rmvpe_gpu` (junto com `dio`) aparece na aba **Training** para o pré-processamento do dataset, não nos menus de Inferência.
- **Voice Changer ao vivo / Tempo real:** `fcpe` ou `swift` oferecem rastreamento mais leve para reduzir estalos em baixa latência; nenhuma opção única é universalmente melhor para toda voz ou gravação.

---

## Todos os Pitch Extractors conhecidos comparados

| Pitch Extractor | Tipo | Velocidade | Qualidade e melhor uso | Notas |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Rede neural | Rápido | **Padrão no Ilaria RVC** para fala, canto e extração F0. | Lida com consoantes, respirações e leve eco bem melhor que métodos clássicos. |
| **`rmvpe_gpu`** | Rede neural (GPU CUDA) | **Muito rápido** | Mesma arquitetura RMVPE executada explicitamente na GPU NVIDIA durante o pré-processamento de **Treino**. | Exige VRAM livre suficiente; não aparece no seletor de Inferência Individual/Lote do Ilaria RVC. |
| **`fcpe`** | Rede neural | **Ultra rápido** | **Opção rápida para tempo real** e inferência de baixa latência. | Um pouco mais leve que o `rmvpe`; ótimo se o `rmvpe` causar cortes ao vivo. |
| **`crepe` / `crepe-full`** | Rede neural | Lento | Alta precisão em canto solo limpo e vibrato. | Bem mais pesado na GPU/CPU que o `rmvpe`. Geralmente lento demais para uso ao vivo. |
| **`crepe-tiny`** | Rede neural (pequena) | Rápido | Versão leve do `crepe` para PCs antigos. | Menos preciso que `rmvpe` e `fcpe`. |
| **`harvest`** | DSP clássico (WORLD) | Muito lento (CPU) | Método antigo para fala limpa. | Tende a dar saltos de oitava e som metálico em canto ou áudio com ruído. Costuma exigir `filter_radius`. |
| **Parselmouth (`pm`)** | DSP clássico | Ultra rápido (CPU) | Prévias rápidas em PCs muito fracos sem GPU. | Perde fácil o rastreamento em canto, sussurros ou vozes sujas. |
| **`dio`** | DSP clássico (WORLD) | Muito rápido (CPU) | Alternativa antiga rápida em CPU (usada principalmente na extração de treino). | Menos preciso que `rmvpe` e `fcpe`; não recomendado para renderizações finais. |
| **`hybrid[...]`** | Métodos combinados | Lento | Mistura dois extratores (ex. `hybrid[rmvpe+fcpe]` ou `hybrid[crepe+rmvpe]`). | Disponível no Applio e alguns forks para suavizar saltos de oitava em canto difícil, mas roda mais devagar. |
| **`swift` / `beatrice` / ONNX** | Leve / ONNX | Muito rápido | Extratores otimizados disponíveis no Ilaria RVC (CUDA) e forks recentes. | Úteis como alternativa leve ao `rmvpe` quando se busca menor carga ou rastreamento diferente em fala/canto. |

## `rmvpe` vs `rmvpe_gpu` no Ilaria RVC

No **Ilaria RVC**, os dois nomes pertencem a etapas diferentes:
- **`rmvpe`** é a opção disponível em **Single Inference**, **Batch Inference** e **Training**.
- **`rmvpe_gpu`** é uma opção da aba **Training** que acelera a extração F0 do dataset na GPU CUDA.
- Se `rmvpe_gpu` durante o treino der erro `CUDA out of memory` em uma placa com pouca VRAM (4 GB ou menos), mude para `rmvpe` ou `dio`.

## Qual escolher para sua tarefa

1. **Preparar / Treinar um novo modelo:** Use **`rmvpe_gpu`** (se tiver GPU NVIDIA com 6+ GB de VRAM) ou **`rmvpe`**. Um rastreamento F0 limpo evita falhas de afinação na voz treinada.
2. **Converter músicas ou locuções offline:** Comece com **`rmvpe`** (padrão do Ilaria RVC). Teste `fcpe`, `swift`, `beatrice` ou `crepe` se notar saltos de oitava ou instabilidade em alguma nota.
3. **Microfone ao vivo / Discord:** Comece com **`fcpe`** ou **`rmvpe`**, conforme o que sua GPU segurar sem estalos no seu chunk size.
