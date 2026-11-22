# Benchmarks e Comparação de Desempenho

Não confies em palpites ao afinar o treino ou a voz ao vivo. Mede o teu hardware com **testes A/B repetíveis** alterando **apenas uma variável de cada vez**.

## 1. Métricas a medir

### Treino

- **Passos por segundo e duração da época** (no registo de treino / TensorBoard).
- **Uso de VRAM** (`nvidia-smi` ou Gestor de Tarefas) para o teu **Batch Size**, **Precisão** e **GPU Caching**.
- **Consumo e temperatura** (`nvidia-smi -i 0 -q -d PERFORMANCE`) para detetar **throttling**.

### Inferência e tempo real

- **Tempo de inferência e Real-Time Factor (RTF):** Tempo de conversão dividido pela duração do áudio (`RTF < 1.0` = mais rápido que tempo real).
- **GPU Delay vs. Latência ponta a ponta:** **GPU Delay** mede apenas o cálculo GPU por bloco; a **latência total** soma microfone, **Block Size**, crossfade, cabo virtual e buffers de Discord/OBS/jogo.

## 2. Protocolo A/B repetível

1. **Linha de base (Teste A):** Repõe ajustes opcionais, usa um modelo fixo e o mesmo áudio ou texto.
2. **Estabiliza e mede:** Executa tempo suficiente para aquecimento térmico (**10–15 minutos** ao vivo ou várias épocas completas).
3. **Altera apenas uma definição (Teste B)** com a mesma carga GPU de fundo.
4. **Compara objetivamente:**

| Métrica | Base (Teste A) | Variante (Teste B) |
| --- | --- | --- |
| Duração da época / Passos por seg. (Treino) | `____` | `____` |
| **GPU Delay** médio e pico máximo (Ao vivo) | `____ ms / ____ ms` | `____ ms / ____ ms` |
| Falhas / estalidos | `Sim / Não (contagem)` | `Sim / Não (contagem)` |
| Pico VRAM e temperatura GPU | `____ GB / ____ °C` | `____ GB / ____ °C` |
| Throttling observado | `Sim / Não` | `Sim / Não` |

5. **Mantém apenas ganhos comprovados:** Sem melhoria clara, regressa ao Teste A.
