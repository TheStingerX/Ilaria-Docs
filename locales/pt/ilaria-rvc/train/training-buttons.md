---
label: "Controles de treinamento explicados"
icon: ":level_slider:"
order: 82
permalink: /ilaria-rvc/training-buttons/
---

# Todos os controles de treinamento explicados

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

O treinamento cria um novo modelo de voz a partir de gravações. Para um primeiro experimento, use um nome exclusivo, um pequeno conjunto de dados limpo e um par pré-treinado compatível. Mantenha uma gravação fora do conjunto de dados para poder ouvir o modelo em um clipe que ele nunca viu. Comece com o [fluxo de trabalho de treinamento](training-workflow.md) se quiser que as etapas estejam em ordem.

## Nome, áudio e design do modelo

| Controle | O que faz e quando usar |
| --- | --- |
| `Model Name` | Identifica seu experimento e seus arquivos salvos. Use um novo nome para um novo conjunto de dados ou configuração incompatível. Para continuar, use o nome original com suas configurações originais. Um espaço reservado na caixa vazia é um exemplo. |
| `Path to Dataset` | Pasta que o aplicativo lê para treinamento. Após o upload, verifique o caminho atualizado antes de pressionar Processar Dados. |
| `Drop dataset audio files or a ZIP` | Importa gravações para a biblioteca de conjuntos de dados do aplicativo. Aguarde a conclusão do log de importação do conjunto de dados antes do processamento. |
| `Manage datasets` | Atualizar conjuntos de dados recarrega a lista. Conjunto de dados a ser removido seleciona um item importado. Excluir o conjunto de dados selecionado remove o item importado. Verifique primeiro o nome e guarde uma cópia separada dos originais. O log de remoção do conjunto de dados relata o que aconteceu. |
| `Sample Rate` | Escolhe a taxa de treinamento do modelo, 32, 40 ou 48 kHz quando compatível. Combine a arquitetura e o par G/D. Aumentar a taxa não pode restaurar detalhes ausentes nas suas gravações. |
| `Pitch Guidance` | Fornece ao gerador uma estimativa de tom durante o treinamento. Use o padrão para um modelo típico e combine o par pré-treinado. Desligá-lo altera o que o modelo espera. |
| `CPU Threads` | Controla a quantidade de paralelismo de CPU que o estágio de preparação ou extração usa. Reduza-o se o pré-processamento esgotar a RAM do sistema ou tornar o PC inutilizável. |
| `Vocoder` | Seleciona o gerador de forma de onda. Comece com HiFi-GAN, a menos que você tenha um motivo compatível para escolher RefineGAN. Nesta versão, o treinamento RefineGAN precisa de RVC V2 a 32 kHz com orientação de pitch. |
| `Embedder Model` | Escolhe os recursos de conteúdo usados ​​pelo treinador. O treinamento expõe ContentVec e Spin-v2. Alterá-lo requer novos recursos extraídos e um experimento compatível. Use o codificador correspondente na inferência. |
| `Silent training files` | Define quantos exemplos silenciosos o experimento inclui. Compare as mesmas pausas naturais se for alterá-las. |
| `Index Algorithm` | Escolhe se deseja manter todos os vetores de recursos ou agrupá-los antes de construir o índice de recuperação. Veja [Auto, Faiss e KMeans](training-controls.md). |
| `Speaker ID` | Escolhe o número do alto-falante anexado aos dados. Deixe o padrão para um primeiro modelo de alto-falante único. |
| `Pitch extraction algorithm` | Estima a afinação das partes sonoras. Comece com RMVPE. Compare alternativas no mesmo material quando o problema real for o rastreamento de pitch. |

## Quanto tempo treinar e o que economizar

| Controle | O que muda |
| --- | --- |
| `Training Precision` | FP32 usa precisão total. FP16 pode economizar VRAM em hardware compatível. Mantenha a precisão original ao comparar ou retomar uma execução. |
| `GPU IDs` e `GPU Information` | Leia os dispositivos listados antes de inserir IDs. Uma lista como 0-2 significa GPUs 0 e 2. Controles de preparação separados podem usar uma lista de dispositivos diferente do treinamento. |
| `Batch Size` | Número de exemplos agrupados para atualização. Reduza-o se ficar sem memória da GPU. Verifique o registro de treinamento para o lote efetivo, especialmente em [Kaggle](../cloud/kaggle.md). |
| `Training Target`, `Total Epochs`, `Total Steps` | A contagem de épocas passa pelo conjunto de dados preparado. As etapas contam atualizações. A meta é o total que você deseja alcançar, incluindo qualquer parte já concluída. |
| `Save frequency` | Controla o intervalo entre salvamentos em épocas. Escolha um intervalo que permita comparar vários instantâneos sem preencher a unidade. |
| `Save last ckpt as final Model` | Seleciona o comportamento de retenção do último ponto de verificação. Mantenha os instantâneos anteriores se quiser compará-los ou retornar a eles e tiver espaço. |
| `Create model at save frequency` | Produz exportações de inferência na cadência de salvamento selecionada para que você possa ouvir modelos intermediários. Mantenha o par G/D e o estado do experimento separadamente se quiser continuar. |
| `Cache data to GPU` | Armazena dados preparados em VRAM. Deixe-o desligado para um primeiro teste se a memória estiver limitada e para uma execução de meta de etapa quando necessário. |
| `Pretrained model (G + D)` | Escolhe um par de gerador e discriminador compatível. Atualize a lista pré-treinada após baixar um par. O registro pré-treinado explica a seleção. A escolha de Nenhum começa sem pesos pré-treinados. |

## Os quatro botões numerados

1. **Process Data** lê o conjunto de dados, prepara fatias e reamostra para a configuração de treinamento selecionada. Leia o registro de pré-processamento antes de continuar.
2. **Extração de recursos** extrai a representação e, quando ativado, o pitch. Verifique o log de extração de recursos para falhas e nomes de ativos.
3. **Train Index** cria o índice de recuperação opcional a partir de recursos extraídos compatíveis. O modelo pode ser convertido sem ele. Preservar o índice com a sua voz correspondente.
4. **Train Pth** inicia o treinamento com pesos. Assista a Registro de treinamento. Para interromper com segurança, clique em **Parar e salvar**, aguarde **Parar/Retomar** para confirmar a gravação e, em seguida, baixe ou faça backup do experimento.

## Verificador de conjunto de dados, visualizações, alertas e fila

- **Verificador de conjunto de dados** lê as gravações selecionadas. O limite de silêncio define o que conta como silencioso, o sinalizador silencia por mais tempo do que define a duração do relatório e o aviso de diferença de volume define a diferença de nível para sinalizar. **Verificar conjunto de dados** executa a verificação. Escolha uma gravação, defina o horário de início ou ative Iniciar logo antes do silêncio mais longo e use **Carregar visualização de 12 segundos** para ouvir o ponto afetado. Revise o registro, o status e o áudio antes de editar a fonte.
- **Visualizações de treinamento** são opcionais. Ative **Gerar visualizações de treinamento**, escolha uma fonte de até 30 segundos, defina Visualizar a cada N épocas e use Visualizar pitch e Preview Pitch Extraction para corrigir as configurações de comparação. Selecione uma época de visualização salva e use **Atualizar visualizações** para atualizar a lista. O registro de visualização e o áudio de visualização do treinamento mostram o resultado.
- **Notificações de treinamento** permitem escolher alertas na área de trabalho e alertas sonoros para conclusão ou erro. **Alertas de teste** verifica as opções selecionadas. Leia o registro de teste de notificação se nada aparecer ou for reproduzido.
- **Fila de treinamento** salva as configurações atuais como um trabalho. A preparação automática executa dados de processo, extração de recursos e índice de treinamento para esse trabalho. Use **Iniciar fila** para começar e **Pausar após o modelo atual** para parar após o trabalho ativo. **Atualizar fila** atualiza a exibição. Escolha um trabalho antes de **Tentar novamente selecionado** ou **Remover trabalho selecionado**. Leia o Log de ações da fila e o Log da fila antes de tentar novamente.
