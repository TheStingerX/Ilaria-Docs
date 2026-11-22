---
label: "Desempenho GPU e Resolução de Problemas"
icon: ":zap:"
order: 91
permalink: /gpu-performance/
description: "Guia transversal sobre utilização de GPU, VRAM, limites de energia, thermal throttling, gargalos CUDA/CPU e conflitos com jogos no RVC."
---
# Desempenho GPU e Resolução de Problemas

A conversão de voz e o treino RVC dependem do poder de cálculo da GPU, largura de banda da memória e escalonamento estável.

## 1. Métricas GPU que importam

- **Utilização da GPU:** No **treino**, 80–99% é normal. Em **tempo real**, a carga ocorre em rajadas; se um jogo saturar 95–100% da GPU, o áudio falha.
- **VRAM:** **Batch Size**, taxa de amostragem e **cache GPU do dataset** definem a VRAM usada (`CUDA out of memory` se encher).
- **Temperatura e Thermal Throttling:** Ao atingir o limite térmico, a GPU reduz os clocks, causando abrandamentos ou picos de **GPU Delay**.
- **Limites de energia e portáteis:** Liga sempre o carregador e escolhe um perfil de desempenho adequado.

## 2. Definições com maior impacto

| Definição | Impacto no treino | Impacto em tempo real |
| --- | --- | --- |
| **Batch Size** | Lotes maiores usam mais VRAM; reduz em caso de OOM | Não usado ao vivo |
| **Block / Chunk Size** | Não usado no treino | Blocos maiores dão mais margem (menos falhas, mais atraso) |
| **Precisão (`FP32` / `FP16` / `BF16`)** | `BF16` (RTX 30/40/50) e `FP16` poupam VRAM e tempo; `FP32` é o fallback seguro | `FP16` é mais rápido em NVIDIA compatíveis; DirectML costuma exigir `FP32` |
| **Extrator de pitch (`rmvpe` / `fcpe`)** | `rmvpe` é o padrão de precisão F0 | `fcpe` ou `rmvpe` são rápidos; evita `crepe` full ao vivo |

## 3. Resolver gargalos comuns

1. **Jogo + Voice Changer ao vivo:** Limita os FPS do jogo ou sobe o **Block Size** um nível.
2. **Windows HAGS:** Não é prejudicial por omissão; se notares falhas inexplicáveis, testa desativá-lo, reinicia e compara antes/depois.
3. **Gargalos de CPU:** Alinha todos os dispositivos a `48000 Hz` no Windows e ajusta **Workers**.
4. **Drivers e arrefecimento:** Usa drivers NVIDIA Studio/Game Ready atualizados e mantém a ventilação limpa.

## 4. Otimização avançada opcional (NVIDIA)

Em GPUs NVIDIA compatíveis, bloquear clocks gráficos com `nvidia-smi` é um teste **opcional**; consulta [Otimização avançada do Vonovox](../other-rvcs/vonovox/advanced-performance-optimization.md).

[Estimador de VRAM e treino](vram-estimator.md)
