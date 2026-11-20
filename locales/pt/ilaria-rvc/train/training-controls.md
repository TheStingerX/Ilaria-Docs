---
label: "Controles e fluxo de trabalho de treinamento"
icon: ":gear:"
order: 87
permalink: /ilaria-rvc/training-controls/
description: "A versão 2.1.0 oferece configurações de 32, 40 e 48 kHz com combinações disponíveis determinadas pelo vocoder. HiFi-GAN e RefineGAN têm restrições diferentes."
---
# Controles e fluxo de trabalho de treinamento

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

[Controlos de treino](training-buttons.md)

> **Novidades da versão 2.3.0** · O MRF HiFi-GAN está disponível para treino e inferência. O catálogo acrescenta 15 pares de gerador e discriminador, incluindo KLM 4.4 X1 e X2 a 40 kHz. O Portuguese HuBERT Base é opcional na inferência. No treino RVC v2 podes carregar e guardar um HuBERT personalizado. A configuração é mantida no modelo exportado.

> **2.4.0** · No Windows, a aplicação e o runtime passam para app/ e os modelos ficam em models/ na raiz. Inclui notebooks Colab e Lightning AI Studio, indicações para descarregar embedders e Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Corrige pip e inclui pywin32.

> **2.4.3** · Adiciona treino nativo em precisão mista **BF16**, selecionado automaticamente em GPUs RTX séries 30, 40 e 50 compatíveis (Kaggle T4 usa FP16 por padrão). Memoriza escolhas manuais FP16/FP32, mantém a precisão de treinos existentes e atualiza a Training Queue e o PC training advisor. A extração de características segue em FP32.

## Quatro estágios

 | Estágio | Entradas | Verifique antes de continuar |
| --- | --- | --- |
 | Dados do processo | Caminho do conjunto de dados, taxa, nome do experimento e threads de CPU | Importação concluída, áudio utilizável foi lido e os logs pertencem ao experimento pretendido. |
 | Extração de recursos | Áudio preparado, guia de pitch, extrator e incorporador de treinamento | O estágio foi concluído usando as configurações esperadas. |
 | Train Pth | Recursos, par G/D, alvo, GPU, lote e precisão | Avanços de progresso e pontos de verificação periódicos são escritos. |
 | Índice de recursos de treinamento | Recursos extraídos e algoritmo de índice | O índice gerado pertence a esta execução e pode ser emparelhado com sua exportação de inferência. |

## Arquitetura e performance

A versão 2.1.0 oferece configurações de 32, 40 e 48 kHz com combinações disponíveis determinadas pelo vocoder. HiFi-GAN e RefineGAN têm restrições diferentes. Verifique o par compatível antes do pré-processamento. A orientação de pitch controla se os recursos F0 condicionam o modelo. Configure threads de CPU para a máquina e selecione uma GPU NVIDIA compatível para treinamento. FP32 é o padrão na UI verificada. O FP16 pode reduzir a pressão da memória no hardware compatível. O tamanho do lote controla quantas amostras são processadas juntas. Se a VRAM acabar, reduza o lote e desative o cache opcional.

**Arquivos de treinamento silenciosos** controla quantos exemplos silenciosos o aplicativo inclui. Compare as mesmas pausas prolongadas ao avaliar uma mudança.

## Como funciona o algoritmo de índice

Cada opção produz um **índice de recuperação FAISS**. As alterações do seletor cujos vetores de recursos extraídos vão para o índice, independentemente do treinamento do modelo de voz. Um vetor de recursos representa um quadro de áudio curto. Os limites abaixo contam vetores, não clipes, épocas ou minutos.

| Opção | O que Ilaria RVC faz | Quando experimentar |
| --- | --- | --- |
| **Auto** | Mantém todos os vetores até **200.000**. Acima disso, tenta reduzi-los a **10.000** centros de cluster. Se o cluster falhar, ele retém os vetores originais. | Comece aqui para um primeiro índice. Verifique o registro do Train Index para ver qual caminho o Auto tomou. |
| **Faiss** | Mantém todos os vetores extraídos e constrói o índice FAISS sem uma passagem de redução KMeans. | Experimente quando quiser preservar exemplos em que um índice menor pode atingir a média e ter RAM e espaço em disco suficientes. |
| **KMeans** | Usa MiniBatchKMeans para representar vetores semelhantes com centros compartilhados. Normalmente mantém cerca de um centro por dez vetores, dentro de um intervalo de **39 a 10.000** centros e sempre menos que a contagem de entrada. Ele mantém todos os vetores para entradas de **39 ou menos** e relata um erro de cluster em vez de retornar silenciosamente. | Compare quando quiser um índice menor. A passagem de cluster exige trabalho extra e o índice reduzido pode perder detalhes finos. |

Um índice menor geralmente é mais leve para armazenar. Não garante uma construção mais rápida ou uma melhor conversão. O clustering ainda requer o carregamento dos recursos extraídos. Se Auto recorrer a um grande conjunto de dados, a construção a partir de todos os vetores ainda poderá ficar sem memória.

### Compare os resultados antes de escolher

1. Conclua **Extração de recursos** e execute **Train Index**. Verifique o log para o vetor ou contagem central. Faça uma cópia do índice resultante antes de gerar um segundo com outra configuração.
2. Use a mesma inferência `.pth` e uma gravação retida limpa. Defina **Index Ratio** como zero primeiro para ouvir apenas o ponto de verificação. O índice é opcional para conversão.
3. Compare os dois índices correspondentes na mesma **Index Ratio** diferente de zero, com afinação e efeitos mantidos constantes. Ouça consoantes claras, vogais sustentadas, sons incomuns e quanto o caráter da voz alvo é retido. Mantenha aquele que soa melhor em vários clipes.
4. Mantenha o índice escolhido com o modelo e a configuração de recursos que o produziu. Se você alterar o algoritmo, reconstrua o índice a partir dos recursos compatíveis existentes. Se você alterar o incorporador de treinamento, extraia recursos correspondentes para esse experimento em vez de reutilizar o índice antigo.

## Metas de época e etapa

Uma época cobre uma iteração no conjunto de dados preparado. O modo Step tem como objetivo uma contagem total de atualizações em lote e oferece suporte à retomada dentro de uma época. O cache do conjunto de dados da GPU deve estar desativado no modo passo a passo nesta versão. A frequência de salvamento é medida em épocas, mesmo quando se utiliza uma meta de etapa. Use uma meta acima do progresso já concluído ao estender uma corrida. Vale a pena testar mais etapas quando o áudio retido comparável melhora.

## Mantenha um registro reproduzível

Registre a revisão do conjunto de dados, taxa de amostragem, codificador, extrator, vocoder, pré-treinamento, precisão, tamanho do lote e cadência de salvamento. Se você reutilizar o mesmo nome com uma taxa incompatível, a IU poderá relatar a incompatibilidade. Inicie um experimento separado para uma nova configuração e mantenha o experimento antigo disponível para comparação.
