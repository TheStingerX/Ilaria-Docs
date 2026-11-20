# Voice Blender (Mesclar Modelos)

[Baixar Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

No **Ilaria RVC**, o recurso Voice Blender fica na aba **Other** em **Merge models**. Ele permite combinar os pesos de dois modelos de voz `.pth` compatíveis para criar uma nova voz híbrida sem precisar treinar do zero.

## Antes de mesclar: regras de compatibilidade

Duas vozes parecerem semelhantes **não** garante que possam ser mescladas. Os dois modelos precisam coincidir tecnicamente:

- **Apenas arquivos `.pth` de inferência:** Use modelos exportados em `weights/`. Nunca use checkpoints brutos de treino (`G_*.pth` / `D_*.pth`) nem arquivos `.onnx`.
- **Mesma versão do RVC:** Ambos precisam compartilhar a mesma arquitetura (`v1` 256-d ou `v2` 768-d).
- **Mesmo sample rate:** Ambos devem ter sido treinados na mesma taxa de amostragem (ex. ambos `40k` ou ambos `48k`).
- **Mesmo embedder / dimensões internas:** Ambos precisam ter formatos de tensores compatíveis.

!!!tip
Clique sempre em **Check model compatibility** no Ilaria RVC antes de mesclar. Se a verificação falhar, os dois arquivos `.pth` não podem ser combinados.
!!!

## Como mesclar duas vozes no Ilaria RVC

1. Abra a aba **Other** e role até **Merge models**.
2. Selecione **Model A** e **Model B** nos menus (clique em **Refresh** antes se acabou de adicionar um `.pth`).
3. Clique em **Check model compatibility** e confirme no log que ambos os modelos são compatíveis.
4. Ajuste **Model A contribution (%)**:
   - `50` gera uma mistura igual **50% / 50%** entre Modelo A e Modelo B.
   - `70` gera **70% Modelo A** e **30% Modelo B**.
   - `100` gera apenas Modelo A; `0` gera apenas Modelo B.
5. Escolha **Sample rate** (`Auto` se disponível, ou a taxa exata de ambos os modelos).
6. Escolha **Output precision**:
   - `fp16` gera um arquivo menor e mais rápido em GPUs NVIDIA CUDA modernas.
   - `fp32` é maior, mas funciona em qualquer configuração, incluindo GPUs antigas, DirectML e CPU.
7. Digite um **Output model name** claro (ex. `Alice70_Bob30`) e notas opcionais.
8. Clique em **Merge and save model** e confira o **Merge Log** para confirmar que o `.pth` foi salvo.

## Testes, ajuste fino e comportamento do `.index`

- **Nenhum `.index` é criado:** A mesclagem combina apenas os pesos `.pth` e **não** gera um novo arquivo `.index`.
- **Teste primeiro sem Index:** Vá para **Inference**, clique em **Refresh**, selecione seu novo `.pth` mesclado e teste em um clipe `.wav` limpo de 10-20 segundos com **Index Rate = 0**.
- **Compare lado a lado:** Ouça o mesmo clipe pelo Modelo A, Modelo B e pelo modelo mesclado no mesmo volume. Ajuste **Model A contribution (%)** em pequenos passos (`40%`, `50%`, `60%`) até achar o equilíbrio ideal.
- **Teste opcional com Index:** Quando a mistura `.pth` já soar bem, você pode testar o `.index` do Modelo A ou B com **Index Rate** baixo (`0.2` a `0.4`) para ver se melhora a clareza sem puxar demais para uma das fontes.
- **Guarde os originais:** Um `.pth` mesclado serve apenas para **inferência**. Ele não contém estado de treino e não pode ser usado para retomar um treinamento.
