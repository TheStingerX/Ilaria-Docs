---
label: "Treinamento e pontos de verificação"
icon: ":test_tube:"
order: 94
permalink: /ilaria-rvc/training-workflow/
description: "Selecione um conjunto de dados e escolha arquitetura RVC compatível, taxa de amostragem, orientação de pitch, pré-treinamento de incorporador e gerador/discriminador."
---
# Treinamento e pontos de verificação

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Prepare um experimento

Selecione um conjunto de dados e escolha arquitetura RVC compatível, taxa de amostragem, orientação de pitch, pré-treinamento de incorporador e gerador/discriminador. Use um nome de experimento exclusivo e um tamanho de lote adequado à VRAM. Execute **Process Data** e extraia recursos de argumento de venda e conteúdo antes do treinamento.

## Compare visualizações e exportações

Faça um pequeno clipe de teste antes do treino. Ative **Visualizações de treinamento** se sua versão oferecer isso e use o mesmo clipe em todos os pontos de verificação. Compare dicção, tom e artefatos indesejados. Use o painel para cronometragem e contagens e use testes de escuta para selecionar uma exportação.

## Retomar e exportar

Use **Parar e salvar**, aguarde a confirmação e mantenha a pasta do experimento e os pontos de verificação G/D correspondentes juntos. Para inferência, exporte o ponto de verificação de voz compacto e mantenha seu índice correspondente. Consulte [Treinar um modelo de voz RVC](../../model-training/training.md) para ajuste e recuperação.

[Estimador de VRAM e treino](../../reference/vram-estimator.md)
