---
label: "🧪 Treine e teste um modelo"
order: 94
permalink: /ilaria-rvc/applio/training/
---
# Treine, avalie e exporte uma voz no Applio

Uma primeira execução prova que suas gravações, configuração e hardware podem produzir uma exportação com a qual você pode converter. Trabalhe em gravações copiadas que você tem permissão para usar. Mantenha duas ou três frases fora da pasta de treinamento para poder verificar o comportamento nas gravações que o modelo nunca viu.

## Preparar entradas

1. Crie um nome de experimento curto e reconhecível, como `speaking_trial_01`. Mantenha os testes iniciais com seus próprios nomes para que você possa encontrar pontos de verificação posteriores.
2. Confira de ouvido as gravações no início, meio e fim. Remova clipes de outro alto-falante, música, recortes ou longas seções silenciosas. Se o Desktop tiver ferramentas de revisão de conjunto de dados, inspecione os clipes sinalizados e prepare uma cópia de treinamento lá. Cortar o silêncio e ajustar o nível não pode reparar a distorção audível.
3. Selecione o conjunto de dados copiado em **Treinamento**. Se o Gradio solicitar um caminho de pasta, use um na máquina que executa o mecanismo. Para um fluxo de trabalho com vários alto-falantes compatível, preserve pastas numéricas como `0` e `1` e registre qual pessoa cada ID representa.
4. Escolha um vocoder e uma taxa de amostragem compatíveis juntos. Selecione um par gerador/discriminador compatível se estiver usando pré-treinamento. Taxa de correspondência, orientação de argumento de venda, arquitetura e requisitos de incorporação do editor. Registre o incorporador exato e quaisquer arquivos personalizados para inferência posterior.
5. Escolha um tamanho de lote que caiba na memória da GPU e salve algumas exportações intermediárias. Escolha um alvo de época inicial para um teste de pipeline. Estenda-o mais tarde se os testes retidos melhorarem.

## Execute as etapas

No Desktop, você pode escolher **Treinamento automático** depois de revisar o conjunto de dados, a configuração do modelo, as épocas e as configurações de salvamento. Inicie o trabalho uma vez e siga seu console. Para controle separado de cada estágio, use **Configuração manual de treinamento**. A Gradio expõe as etapas correspondentes em seu espaço de trabalho **Treinamento**.

| Etapa | O que acontece | O que confirmar antes de continuar |
| --- | --- | --- |
| Pré-processamento | O Applio lê o conjunto de dados, prepara clipes e reamostra para a taxa escolhida. | O log mostra o áudio utilizável da pasta pretendida. Se sua compilação oferecer normalização **Pós**, ela ajustará cada fatia após a divisão. Use-o apenas quando desejar esse tratamento. |
| Extrair | O Applio cria os recursos de conteúdo do modelo e quaisquer informações de pitch necessárias para a configuração. | O incorporador pretendido carregado e a extração concluída. Se você alterar os codificadores, execute a extração novamente para essa escolha. |
| Trem | O experimento aprende características de voz desses recursos. | O progresso das épocas e o ponto de verificação configurado ou os arquivos de exportação aparecem. Em caso de erros de falta de memória, interrompa outro trabalho da GPU, reduza o tamanho do lote e considere desabilitar o cache do conjunto de dados. |
| Gerar índice | O Applio cria dados de recuperação opcionais do experimento. | Mantenha o índice gerado com a exportação correspondente. Se você optar por pular esta etapa, deixe a recuperação desativada durante o teste. |

Quando um estágio falha, copie seu primeiro erro e confirme suas entradas antes de executá-lo novamente. Se as gravações, a taxa ou a arquitetura mudarem materialmente, um novo experimento ajudará a manter separados os arquivos incompatíveis. Pare o tempo real antes de iniciar o treinamento de GPU para desktop.

## Compare os pontos de verificação antes de escolher um vencedor

Abra **Modelos → Exportar** no Desktop ou encontre o controle de exportação de treinamento no Gradio. Salve uma inferência `.pth` de um ponto de verificação intermediário e de um posterior, além do índice, se gerado. Para cada exportação, converta as mesmas frases retidas com o mesmo ID de alto-falante, incorporador, configurações de tom e volume. Ouça a inteligibilidade, a consistência da voz em sílabas suaves e altas e os artefatos nas respirações. As métricas de treinamento podem revelar falhas no progresso. Ouvir ajuda a decidir qual exportação manter.

## Retomar sem reconstruir o experimento

Mantenha o diretório do experimento junto com seus arquivos de pré-processamento, recursos e pontos de verificação de treinamento `G_*.pth` e `D_*.pth`. Mantenha o mesmo nome, arquitetura, taxa e incorporador na continuação. Escolha uma nova meta de época **total** maior que a contagem de época concluída. No Desktop, deixe **Fresh Training** desativado. Verifique as primeiras linhas de log para ver qual ponto de verificação foi carregado e pare se a execução for reiniciada inesperadamente. A pequena exportação de inferência é o arquivo que você usa no conversor. O treinamento contínuo requer o estado de treinamento do experimento.
