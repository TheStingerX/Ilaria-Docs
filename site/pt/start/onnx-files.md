# Arquivos ONNX do RVC (`.onnx`)

Junto com arquivos [`.pth`](pth-files.md) e [`.index`](indexes.md), você às vezes encontrará **arquivos `.onnx`** ao usar trocadores de voz RVC.

No ecossistema RVC, **os modelos `.onnx` são normalmente usados para tempo real (realtime) em placas de vídeo AMD e Intel** (via **DirectML** / ONNX Runtime no Windows) e em alguns clientes ao vivo multiplataforma.

---

## 1. O que é um arquivo `.onnx`?

**ONNX** (*Open Neural Network Exchange*) é um formato aberto e independente para rodar redes neurais já treinadas. Em vez de depender do PyTorch e do NVIDIA CUDA, um `.onnx` roda pelo **ONNX Runtime**, compatível com diferentes GPUs e sistemas.

Para usuários de RVC, isso importa principalmente em **voice changers em tempo real** (como **Deiteris w-okada Fork**, **w-okada VCClient** ou **RVC Mainline DirectML**):
- Placas **AMD Radeon** e **Intel Arc / integradas** não rodam NVIDIA CUDA.
- Executar um modelo `.onnx` com **ONNX Runtime + DirectML** permite que GPUs AMD e Intel acelerem a conversão ao vivo no Windows com fluidez.

---

## 2. `.onnx` vs `.pth`: principais diferenças

| Característica | `.pth` (PyTorch) | `.onnx` (ONNX Runtime) |
| --- | --- | --- |
| **Uso principal** | Treino padrão, conversão offline e ao vivo em NVIDIA CUDA | **Troca de voz em tempo real**, principalmente em **GPUs AMD e Intel (DirectML)** |
| **Treino / Retomada** | Checkpoints brutos `G`/`D` permitem retomar treino | **Apenas inferência** (não treina nem retoma) |
| **Merge Models / Voice Blender** | Suportado (arquivos `.pth` compatíveis) | **Não suportado** (não mescla `.onnx`) |
| **Conversão Safetensors** | Suportada no Ilaria RVC 2.4.5+ | **Não suportada** |
| **Metadados RVC internos** | Configuração vocal completa (`sr`, `f0`, `v1`/`v2`, vocoder, embedder) | Grafo mínimo de tensores; o cliente ao vivo precisa bater sample rate e versão |

---

## 3. Como obter um `.onnx` a partir de um `.pth`

Quase todas as vozes RVC são compartilhadas em `.pth`, não em `.onnx`. Se você precisar de um `.onnx`:

1. **Conversão automática em clientes ao vivo:** Alguns apps em tempo real (**w-okada**, **Deiteris**) aceitam `.pth` direto ou convertem para `.onnx` no DirectML.
2. **Exportação manual em ONNX:** Apps como **Ilaria RVC**, **Applio** e **RVC Mainline** trazem a opção **Export ONNX** para converter um `.pth` de inferência em `.onnx`.
3. **Guarde sempre o `.pth` original:** Nunca apague seu `.pth` e `added_*.index` originais após exportar para `.onnx`, pois `.onnx` não pode ser mesclado, convertido para `.safetensors` nem usado em ferramentas PyTorch padrão.

---

## 4. Dicas para usar `.onnx` em tempo real

- **Use `FP32` no DirectML se houver falhas:** Em placas AMD/Intel, `FP16` costuma dar erro ou chiado no DirectML; mude para `FP32` se o áudio quebrar.
- **Desative o HAGS no Windows:** Desligue o *Agendamento de GPU acelerado por hardware* no Windows e reinicie o PC para evitar engasgos robóticos ao vivo.
- **Mantenha `48000 Hz` em tudo:** Configure microfone, fones e `VB-CABLE` em `48000 Hz` no Painel de Som (`mmsys.cpl`) para evitar `PortAudioError`.
