# Embedders do RVC

Um **embedder** (também chamado de **content encoder**) é a rede neural que lê o áudio de entrada e converte o que é falado ou cantado em características numéricas de conteúdo antes que o modelo de voz RVC o reconstrua com o timbre do locutor alvo.

## O que um embedder faz e como funciona

No pipeline do RVC, o áudio é dividido em fluxos de informação separados:

1. **Conteúdo (o que dizes)**: extraído quadro a quadro pelo **embedder** (fonemas, pronúncia, articulação e ritmo).
2. **Pitch / F0 (a melodia)**: extraído em separado por um rastreador de tom (como RMVPE ou FCPE).
3. **Timbre do locutor (quem fala)**: fornecido pelo modelo de voz `.pth` treinado (e opcionalmente reforçado por um ficheiro `.index`).

Como o gerador RVC é treinado para esperar características de **um embedder específico**, aplicam-se sempre duas regras:

- **Treino e inferência têm de coincidir**: se um modelo foi treinado com `contentvec`, tens de converter áudio com `contentvec`. Usar outro embedder na inferência (ou ao vivo) causa pronúncia distorcida, artefactos metálicos ou uma voz estragada.
- **Fuga da identidade do locutor**: encoders genéricos de reconhecimento de fala (como o HuBERT padrão) não removem a identidade do locutor original, podendo vazar o teu próprio timbre na saída.

---

## Embedders RVC conhecidos

> [!WARNING]
> **Apenas para fins informativos - utilização fortemente desaconselhada**
>
> Tudo o que está listado abaixo sobre embedders alternativos é **apenas para fins informativos**. **Recomendamos fortemente NÃO utilizar embedders alternativos**: as **definições stock do RVC** (**`contentvec`**) são a melhor e mais segura escolha. Embedders alternativos aumentam o risco de treinar um mau modelo de voz ou obter más conversões offline e online (ao vivo), além de quebrarem a compatibilidade com configurações e índices padrão.

| Embedder | Arquitetura / Notas | Suporte RVC | Recomendação |
| --- | --- | --- | --- |
| **`contentvec`** (`hubert_base.pt`) | Content encoder padrão do RVC, treinado para manter o conteúdo linguístico removendo a identidade do locutor. | RVC v1 (256-d) e RVC v2 (768-d) | **Recomendado (Stock RVC)** |
| **`spin`** | Encoder alternativo baseado em Fairseq/HuBERT invariante ao locutor. | RVC v2 | Desaconselhado para uso geral |
| **`spin-v2`** (`spin-v2.pt`) | Encoder Spin v2 atualizado (~361 MiB) usado por certos pretrains experimentais. | RVC v2 | Desaconselhado para uso geral |
| **`chinese-hubert-base`** | HuBERT Base pré-treinado em fala chinesa. Pode vazar timbre original. | RVC v2 | Apenas informativo / especializado |
| **`japanese-hubert-base`** | HuBERT Base pré-treinado em fala japonesa. Pode vazar timbre original. | RVC v2 | Apenas informativo / especializado |
| **`korean-hubert-base`** | HuBERT Base pré-treinado em fala coreana. Pode vazar timbre original. | RVC v2 | Apenas informativo / especializado |
| **`portuguese-hubert-base`** | Fairseq HuBERT português (`shiromiya/fairseq-hubert-portuguese`, ~1,13 GB). | RVC v2 | Apenas informativo / especializado |
| **`klm-vocal-contentvec`** | KLM Vocal ContentVec (`SeoulStreamingStation/KLM-Vocal-Embedder_ContantVEC_For_RVC`, ~251 MiB). | RVC v2 | Apenas informativo / opcional |
| **`custom` HuBERT Base** | Par HuBERT Base fornecido pelo utilizador (`pytorch_model.bin` + `config.json`, 768 dimensões). | RVC v2 (v1 só se tiver projeção 256-d) | Apenas informativo / avançado |

## Quando é que realmente precisas de mexer no embedder

- **Deixa em `Auto` ou `contentvec`** para quase todos os modelos e treinos.
- **Altera apenas** se transferiste uma voz cujo autor indica explicitamente outro embedder (por exemplo `spin-v2` ou `japanese-hubert-base`), e apenas para converter com esse modelo específico.
- **Não troques de embedder a meio de um treino**: mudar de encoder obriga a re-extrair características (`3_feature768`) numa experiência separada.
