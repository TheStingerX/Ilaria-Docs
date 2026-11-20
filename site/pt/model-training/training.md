# Treinar um modelo de voz RVC

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

O treinamento aprende uma voz alvo a partir de uma coleção preparada de áudio. Use este guia quando quiser construir um modelo a partir de gravações próprias ou autorizadas. Se você já possui um modelo de inferência, consulte [Modelos e arquivos RVC](../start/models.md) para começar a usá-lo.

## Planeje sua primeira corrida

Prepare o áudio com o [guia do conjunto de dados](dataset-preparation.md) e selecione-o em **Treinamento**. Dê um nome exclusivo ao experimento e escolha uma gravação curta fora do conjunto de treinamento para testes de audição. Comece com uma execução modesta que possa completar todas as etapas e produzir uma exportação utilizável. Isso fornece uma linha de base para alterações em dados ou configurações.

Registre a versão do aplicativo, revisão do conjunto de dados, formato do modelo e taxa de amostragem, incorporador, método de pitch, par pré-treinado, tamanho do lote e intervalo de salvamento planejado. Adicione o nome do clipe de teste retido. Se uma execução posterior parecer diferente, essas notas ajudarão a identificar o que mudou.

## Escolha configurações compatíveis

 | Configuração | O que verificar |
| --- | --- |
 | Formato do modelo, vocoder e taxa de amostragem | Selecione uma combinação suportada pelo aplicativo e pelo cliente de reprodução pretendido. Uma arquitetura específica do fork pode limitar o local de carregamento do seu modelo. |
 | Orientação e extração de afinação | A orientação de afinação é útil para modelar materiais dependentes de afinação, especialmente canto. Escolha um extrator disponível para treinamento em sua construção. |
 | Incorporador | Isso define a representação extraída do áudio. Registre a escolha para poder usar a representação correspondente em clientes de inferência suportados. |
 | Gerador e discriminador pré-treinados | Use um par compatível com a arquitetura, taxa e configuração de pitch selecionadas. Os arquivos geradores e discriminadores desempenham funções diferentes no treinamento. |
 | Tamanho do lote | Controla a quantidade de dados processados ​​por atualização. Comece com uma configuração que sua GPU possa ajustar e diminua-a se o treinamento ficar sem memória. |
 | Intervalo de destino e ponto de verificação | Uma época é aproximadamente uma passagem pelo conjunto de dados preparado. As etapas são atualizações de treinamento individuais. Salve periodicamente para poder comparar exportações e recuperar após uma interrupção. |

Use as opções de pré-treinamento mostradas como compatíveis com sua versão instalada. No Ilaria RVC 2.1.0, por exemplo, o projeto documenta o treinamento RefineGAN em 32 kHz com RVC V2 e orientação de pitch. A mesma versão também documenta um downloader para pares pré-treinados compatíveis.

### Dicas práticas de treinamento

- **Épocas:** Experimente uma primeira comparação com uma meta em torno de 200 épocas e ouça vários salvamentos anteriores. Este é um ponto de partida para a audição, já que o ponto de verificação mais forte pode ocorrer mais cedo ou mais tarde. Uma corrida de 1.000 épocas não oferece garantia de qualidade.
- **Lote e precisão:** comece com um lote moderado, por exemplo 8, e trate 16 como um ponto de partida superior conservador. Reduza se a memória acabar. A precisão mista do FP16 pode reduzir o uso de VRAM e acelerar o treinamento em hardware compatível. Verifique se sua construção já permite isso e tente FP32 se a precisão mista produzir perdas não finitas.
- **TensorBoard:** Use métricas para monitorar o progresso e detectar execuções paralisadas ou instáveis. As curvas de perda por si só não podem dizer qual ponto de verificação soa melhor. Compare as conversões dos mesmos clipes retidos.
- **Normalização:** Nas versões do Applio com esses controles, o Pré ajusta os níveis antes de fatiar e o Pós os ajusta após o fatiamento. Use None se os níveis originais já forem adequados. No Ilaria RVC, o Process Data aplica o ajuste de nível automaticamente a cada fatia. A implementação pública não possui alternância de Post separada.
- **Filtragem de ruído:** Comece com a redução de ruído opcional desativada para gravações limpas. Se o frontend também expõe um filtro passa-alta, use-o para ruídos audíveis de baixa frequência e compare o resultado de ouvido. A filtragem passa-alta e a redução de ruído são operações separadas.
- **Cache do conjunto de dados da GPU:** Deixe-o desativado como linha de base. Consome VRAM extra. Meça o tempo por época antes de ativá-lo para uma execução mais longa.
- **Pesos pré-treinados:** Combine o par G/D com a arquitetura, vocoder, taxa de amostragem e configuração de pitch e use o incorporador especificado pelo autor do pré-treinamento. Para pré-treinamentos RVC padrão criados com ContentVec, selecione ContentVec para extração e inferência de recursos.

### Escolha uma taxa usando a largura de banda de origem

Verifique a taxa de amostragem nos metadados do arquivo e inspecione vários clipes representativos em um visualizador de espectrograma como [Spek](https://www.spek.cc/p/download). Procure detalhes vocais úteis em vez de ruídos isolados ou cortes nítidos deixados pela compressão. Metade da taxa de amostragem de treinamento é a frequência mais alta que a taxa pode representar. Um modelo de 32 kHz pode representar frequências de até 16 kHz, um modelo de 40 kHz até 20 kHz e um modelo de 48 kHz até 24 kHz. Para detalhes utilizáveis ​​acima de 20 kHz, escolha 48 kHz se a arquitetura e o pré-treinamento suportarem. Use a taxa compatível mais baixa quando ela já cobrir a largura de banda de origem. O pré-processamento pode reamostrar as gravações, mas não pode restaurar detalhes ausentes.

## Execute os estágios em ordem

 | Estágio | O que ele produz | O que verificar |
| --- | --- | --- |
 | Pré-processamento do conjunto de dados | Áudio preparado para configuração do modelo do experimento. | O log nomeia a pasta pretendida e relata o processamento bem-sucedido de arquivos utilizáveis. Verifique os arquivos ignorados antes de continuar. |
 | Extração de recursos | Recursos de conteúdo, além de dados de pitch quando exigido pela configuração escolhida. | A extração termina para o experimento atual usando o método incorporador e pitch selecionado. |
 | Treinamento do modelo | Checkpoints e exportações de inferência de acordo com as opções de salvamento configuradas. | As etapas do treinamento avançam e os arquivos esperados são salvos. Leia o primeiro erro se o progresso parar. |
 | Índice de recuperação | Uma coleção pesquisável de recursos de conjunto de dados para uso opcional durante a conversão. | O índice pertence a este experimento e corresponde à voz exportada. Se você ignorou, teste o modelo de forma independente. |

Use o fluxo de trabalho automático quando disponível ou conclua e verifique cada etapa antes de iniciar a próxima. Um conjunto de dados ou taxa de amostragem alterados pode invalidar o áudio preparado e os recursos extraídos. Um incorporador alterado requer a extração de novos recursos. Ao testar uma configuração incompatível, inicie uma experiência separada para que os caches e pontos de verificação existentes permaneçam disponíveis.

## Acompanhe o progresso no Ilaria RVC

- Use o **Painel de treinamento** para verificar a contagem de passos, o tempo por época e as curvas de perda. Uma curva pode ajudar a explicar uma execução estagnada, enquanto os testes de audição informam como soa a saída.
- Configure **visualizações de treinamento** com um clipe de teste constante para que o aplicativo possa gerar conversões comparáveis ​​à medida que os pontos de verificação são salvos.
- Se você usar a **Fila de treinamento**, defina um nome de experimento e um conjunto de dados distintos para cada trabalho. Antes de continuar ou tentar novamente, confirme quais estágios o trabalho foi concluído e onde a saída será salva.
- Quando seu release expõe **Parar e salvar**, use-o quando precisar interromper e continuar mais tarde. Aguarde o ponto de verificação terminar de escrever antes de fechar o aplicativo.

Ilaria RVC 2.1.0 suporta metas de época e de etapas totais, incluindo a retomada no meio de uma época para metas de etapas. Outros frontends podem expor diferentes controles e retomar o comportamento.

### Compare orçamentos de treinamento em etapas

Uma época é uma passagem pelo conjunto de dados preparado. Uma etapa de treinamento é uma atualização em lote. Divida o número de clipes após o pré-processamento pelo tamanho efetivo do lote para estimar as etapas por época. Por exemplo, 10.000 clipes em um tamanho de lote de 8 resultam em 1.250 lotes por época em uma execução de trabalho único. Lotes parciais descartados, múltiplas GPUs ou acúmulo de gradiente podem alterar a forma como o treinador conta as atualizações. Use a contagem relatada pela sua execução ao comparar experimentos.

Escolha um intervalo de salvamento que ofereça vários pontos de verificação para audição. Salvar a cada 40 épocas é um ponto de partida possível para uma execução medida em centenas de épocas. Use os mesmos clipes retidos e configurações de inferência para cada comparação. Ouça a inteligibilidade, o tom estável, as pausas naturais e as consoantes que permanecem claras. Se as exportações posteriores soarem mais duras ou funcionarem bem em apenas algumas frases, compare com um ponto de verificação anterior e inspecione o conjunto de dados em busca de tomadas ou artefatos repetidos. Escolha o ponto de verificação que funciona melhor com as entradas pretendidas.

## Compare as exportações ouvindo

Abra a inferência com um `.pth` exportado. Use as mesmas gravações curtas e as mesmas configurações de conversão para comparar modelos de diferentes pontos de verificação. Se você fizer uma comparação de índice, mantenha o ponto de verificação estável e compare o mesmo clipe com a recuperação desabilitada e habilitada.

Compare essas quatro qualidades nas exportações.

1. **Timbre.** A gravação convertida se assemelha ao caráter vocal pretendido em toda a frase?
2. **Inteligibilidade.** As consoantes e terminações de palavras ainda são fáceis de entender?
3. **Estabilidade de afinação.** As notas ou sílabas saltam, gorjeiam ou perdem a inflexão pretendida?
4. **Artefatos.** A saída adiciona zumbido, ruído de ambiente incorporado, caudas ásperas ou transições estranhas?

Mantenha a exportação com melhor som e seus resultados de teste. Pode valer a pena tentar mais épocas quando os resultados melhorarem em vários exemplos. Se as exportações posteriores melhorarem apenas um clipe ou começarem a reproduzir falhas do conjunto de dados, retorne à melhor linha de base e revise as gravações.

## Exportar, retomar ou compartilhar

- **Usar em inferência.** Selecione o modelo exportado `.pth`. Mantenha o `.index` correspondente ao lado quando desejar a recuperação. Registre qualquer incorporador necessário, cliente compatível e informações de taxa de amostragem.
- **Retomar o treinamento.** Faça backup do experimento e mantenha os pontos de verificação de treinamento do gerador e do discriminador correspondentes, comumente chamados de `G_*.pth` e `D_*.pth`. Continue com a mesma experiência e configuração compatível e, em seguida, inspecione o registo para o ponto de verificação e o passo ou época que esperava. Somente uma exportação de inferência não possui o estado de treinamento completo.
- **Compartilhe um modelo.** Compartilhe apenas arquivos que você tem permissão para distribuir. Inclua exemplos de escuta, notas de compatibilidade, o índice correspondente, se útil, e quaisquer termos de uso que o destinatário precise.

No Ilaria RVC, versões recentes usam a biblioteca de modelos para exportações de inferência e índices associados. Os caminhos de exportação e os nomes podem diferir entre os front-ends. Salve os logs do experimento separadamente se quiser recriar o modelo posteriormente.

## Diagnosticar uma falha na execução

 | Sintoma | Verifique primeiro |
| --- | --- |
 | O pré-processamento não encontrou áudio | Verifique a pasta do conjunto de dados selecionado e reproduza um clipe de entrada. Verifique se sua compilação lê pastas aninhadas. |
 | A extração falha ou relata um modelo ausente | Verifique o incorporador selecionado e os ativos do modelo de argumento de venda e leia a primeira mensagem no log de extração. |
 | A memória da GPU acaba. | Reduza o tamanho do lote, pare os trabalhos concorrentes da GPU e desative o cache do conjunto de dados da GPU se sua compilação oferecer esse controle. Tente novamente o estágio com falha. |
 | O treinamento é reiniciado no início. | Verifique se o experimento aponta para pontos de verificação de treinamento compatíveis e se qualquer opção de recomeço está desativada. |
 | Um `.pth` não será carregado para conversão | Verifique se você selecionou um ponto de verificação de treinamento em vez de uma exportação de inferência e verifique a arquitetura e a compatibilidade do incorporador com o cliente. |
 | Um modelo utilizável não possui índice | Verifique se a geração do índice foi ignorada ou falhou. Exporte e teste o ponto de verificação de forma independente e, em seguida, crie o seu índice a partir da experiência correspondente, se necessário. |

Mantenha a primeira mensagem de falha e a configuração associada à execução. Para mais verificações, consulte [Solução de problemas](../reference/troubleshooting.md).
