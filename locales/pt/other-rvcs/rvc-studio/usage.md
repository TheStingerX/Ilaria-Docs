---
label: "Utilização e resolução de problemas"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Utilização e resolução de problemas

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Versão consultada](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Importar a voz

Importa um ZIP com um gerador RVC ONNX compatível ou um `.pth` de inferência, mais o `.index` FAISS correspondente, se existir. A aplicação prefere ONNX se houver ambos. O conversor exporta `.pth` para ONNX e prepara o índice quando disponível. Os resultados ficam em `Models/<voice>/model.onnx` e opcionalmente `features.rvci`. Um ONNX genérico ou checkpoint de treino não serve como gerador.

## Microfone e latência

Escolhe voz, microfone físico e auscultadores e carrega em **Start voice conversion**. Começa com o tom a zero e testa o índice separadamente. O PortAudio usa um fluxo duplex mono a 48 kHz. O ContentVec recebe áudio a 16 kHz, o RMVPE estima F0 quando necessário e a saída volta a 48 kHz. Se houver cortes, verifica níveis, tempo de inferência e underruns. Confirma o CUDA antes de avaliar a GPU. Testa os auscultadores antes do cabo virtual.

[Instalação](installation.md)
