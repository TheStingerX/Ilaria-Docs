---
label: "Biblioteca de modelos e fusão"
icon: ":card_index_dividers:"
order: 93
permalink: /ilaria-rvc/model-library/
description: "Importa, inspeciona e gere ficheiros RVC .pth, .index, .safetensors, embedders e misturas do Voice Blender no Ilaria RVC."
---
# Biblioteca de modelos e fusão

[Descarregar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Outros painéis](other-buttons.md)

## Matriz de compatibilidade de formatos

| Ficheiro / Recurso | Finalidade | Operações compatíveis no Ilaria RVC | Guia |
| --- | --- | --- | --- |
| **`.pth` de inferência** | Conversão vocal | Inferência simples/lote, Voice Blender, Safetensors | [Ficheiros `.pth`](../../start/pth-files.md) |
| **Checkpoints (`G_*.pth` / `D_*.pth`)** | Retomar treino | Apenas retoma de treino RVC v2 (não usar em Inferência) | [Procedimento de treino](../train/training-workflow.md) |
| **Índice (`added_*.index`)** | Recuperação opcional | Inferência (junto com o `.pth` correspondente) | [Ficheiros Index](../../start/indexes.md) |
| **Modelos `.onnx`** | Motores ONNX em tempo real | Para clientes externos DirectML (AMD/Intel) | [Ficheiros `.onnx`](../../start/onnx-files.md) |
| **`.safetensors`** | Armazenamento seguro | Converter com **Safetensors Converter** | [Conversor Safetensors](safetensors-converter.md) |
| **Embedders** | Extração de características | Inferência e Treino | [Embedders](../../start/embedders.md) |
| **Pretrained G/D** | Pesos base | Apenas Treino RVC | [Modelos pretrained](../../start/pretrained.md) |
| **Voice Blender** | Mistura de vozes | Funde dois `.pth` de inferência compatíveis | [Voice Blender](voice-blender.md) |

> **Porque um checkpoint de treino NÃO é um modelo de inferência:** `G_*.pth` e `D_*.pth` em `app/logs/` guardam o estado do otimizador; usa sempre o `.pth` exportado para inferência (~40–110 MB) em `models/`.

## Importar, inspecionar e segurança

1. Abre **Other → Import local models** (ou descarrega por URL).
2. Mantém `.pth` e `added_*.index` juntos, atualiza a lista e verifica **Model information**.
3. **Segurança:** Ficheiros `.pth` usam `pickle`; descarrega apenas de fontes fidedignas ou usa `.safetensors`.

## Fundir vozes compatíveis

Escolhe dois `.pth` de **inferência** compatíveis no [Voice Blender](voice-blender.md) e testa com `Index Ratio = 0`.

[Matriz interativa de compatibilidade RVC](../../reference/compatibility-matrix.md)
