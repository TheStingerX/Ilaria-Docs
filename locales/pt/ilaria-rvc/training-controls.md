---
label: "⚙️ Controles e fluxo de trabalho de treinamento"
order: 87
permalink: /ilaria-rvc/training-controls/
---
# Controles e fluxo de trabalho de treinamento

## Quatro estágios

 | Estágio | Entradas | Verifique antes de continuar |
| --- | --- | --- |
 | Dados do processo | Caminho do conjunto de dados, taxa, nome do experimento e threads de CPU | Importação concluída, áudio utilizável foi lido e os logs pertencem ao experimento pretendido. |
 | Extração de recursos | Áudio preparado, guia de pitch, extrator e incorporador de treinamento | O estágio foi concluído usando as configurações esperadas. |
 | Train Pth | Recursos, par G/D, alvo, GPU, lote e precisão | Avanços de progresso e pontos de verificação periódicos são escritos. |
 | Índice de recursos de treinamento | Recursos extraídos e algoritmo de índice | O índice gerado pertence a esta execução e pode ser emparelhado com sua exportação de inferência. |

## Arquitetura e performance

A versão 2.1.0 oferece configurações de 32, 40 e 48 kHz com combinações disponíveis determinadas pelo vocoder. HiFi-GAN e RefineGAN têm restrições diferentes. Verifique o par compatível antes do pré-processamento. A orientação de pitch controla se os recursos F0 condicionam o modelo. Configure threads de CPU para a máquina e selecione uma GPU NVIDIA compatível para treinamento. FP32 é o padrão na UI verificada. O FP16 pode reduzir a pressão da memória no hardware compatível. O tamanho do lote controla quantas amostras são processadas juntas. Se a VRAM acabar, reduza o lote e desative o cache opcional.

**Arquivos de treinamento silenciosos** controla quantos exemplos silenciosos o aplicativo inclui. Compare as mesmas pausas prolongadas ao avaliar uma mudança. **Algoritmo de Índice** oferece Auto, Faiss e KMeans. Preserve o índice gerado com seu modelo correspondente e mantenha a recuperação desativada ao avaliar apenas o ponto de verificação.

## Metas de época e etapa

Uma época cobre uma iteração no conjunto de dados preparado. O modo Step tem como objetivo uma contagem total de atualizações em lote e oferece suporte à retomada dentro de uma época. O cache do conjunto de dados da GPU deve estar desativado no modo passo a passo nesta versão. A frequência de salvamento é medida em épocas, mesmo quando se utiliza uma meta de etapa. Use uma meta acima do progresso já concluído ao estender uma corrida. Vale a pena testar mais etapas quando o áudio retido comparável melhora.

## Mantenha um registro reproduzível

Registre a revisão do conjunto de dados, taxa de amostragem, codificador, extrator, vocoder, pré-treinamento, precisão, tamanho do lote e cadência de salvamento. Se você reutilizar o mesmo nome com uma taxa incompatível, a IU poderá relatar a incompatibilidade. Inicie um experimento separado para uma nova configuração e mantenha o experimento antigo disponível para comparação.
