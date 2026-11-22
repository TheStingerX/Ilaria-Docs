# Treinar um modelo de voz RVC

[Baixar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

O treinamento aprende uma voz de destino a partir de uma coleção preparada de áudio. Use este guia quando quiser criar um modelo a partir de gravações próprias ou autorizadas. Se você já tem um modelo de inferência, veja [Modelos e arquivos RVC](../start/models.md) para começar a usá-lo.

## Planeje sua primeira execução

Prepare o áudio com o [guia de dataset](dataset-preparation.md) e selecione-o em **Training**. Dê ao experimento um nome único e escolha uma gravação curta fora do conjunto de treino para testes de escuta. Comece com uma execução modesta capaz de concluir todas as etapas e gerar uma exportação utilizável. Isso oferece uma linha de base para mudanças de dados ou ajustes.

Anote versão do aplicativo, revisão do dataset, formato e taxa de amostragem do modelo, embedder, método de tom, par pré-treinado, batch size e intervalo de salvamento planejado. Adicione o nome do clipe de teste separado. Se uma execução posterior soar diferente, essas notas ajudam a identificar o que mudou.

## Escolha configurações compatíveis

| Configuração | O que verificar |
| --- | --- |
| Formato do modelo, vocoder e sample rate | Selecione uma combinação suportada pelo app e pelo cliente de reprodução pretendido. Uma arquitetura específica de um fork pode limitar onde o modelo carrega. |
| Orientação e extração de tom | A orientação de tom é útil para modelar material dependente de afinação, especialmente canto. Escolha um extrator disponível para treino na sua compilação. |
| Embedder | Define a representação extraída do áudio. Registre a escolha para usar a representação correspondente nos clientes de inferência suportados. |
| Gerador e discriminador pré-treinados | Use um par compatível com arquitetura, taxa e configuração de tom selecionadas. Arquivos de gerador e discriminador cumprem papéis distintos no treino. |
| Batch size | Controla quantos dados são processados por atualização. Comece com um valor que caiba na GPU e reduza se faltar memória. |
| Meta e intervalo de checkpoint | Uma época é aproximadamente uma passada completa pelo dataset preparado. Passos são atualizações individuais de treino. Salve periodicamente para comparar exportações e recuperar após interrupções. |

Use as opções de pré-treinamento mostradas como compatíveis pela sua compilação instalada. No Ilaria RVC 2.1.0, por exemplo, o projeto documenta treino RefineGAN a 32 kHz com RVC V2 e orientação de tom, além de um downloader para pares pré-treinados compatíveis.

### Dicas práticas de treinamento

- **Épocas:** Faça um primeiro teste comparativo visando cerca de 200 épocas e ouça vários salvamentos anteriores. É um ponto de partida para audição, pois o melhor checkpoint pode vir antes ou depois. Uma execução de 1,000 épocas não garante qualidade.
- **Batch e precisão:** Comece com batch moderado, por exemplo 8, e trate 16 como limite superior conservador inicial. Reduza se faltar memória. Precisão mista FP16 pode reduzir uso de VRAM e acelerar o treino em hardware compatível. Verifique se sua compilação já ativa e tente FP32 se precisão mista gerar perdas não finitas.
- **TensorBoard:** Use métricas para acompanhar o progresso e detectar execuções travadas ou instáveis. Curvas de perda sozinhas não dizem qual checkpoint soa melhor. Compare conversões dos mesmos clipes separados.
- **Normalização:** Em compilações do Applio com esses controles, Pre ajusta níveis antes do corte e Post ajusta depois. Use None se os níveis originais já forem adequados. No Ilaria RVC, Process Data aplica ajuste de nível automaticamente a cada trecho; a implementação pública não possui botão Post separado.
- **Filtro de ruído:** Comece com redução de ruído opcional desligada para gravações limpas. Se o frontend também expuser filtro passa-alta, use-o para roncos audíveis de baixa frequência e compare de ouvido. Filtro passa-alta e redução de ruído são operações distintas.
- **Cache de dataset na GPU:** Deixe desligado para a base inicial. Ele consome VRAM extra. Meça o tempo por época antes de ativar para uma execução longa.
- **Pesos pré-treinados:** Combine o par G/D com arquitetura, vocoder, sample rate e configuração de tom, e use o embedder especificado pelo autor do pré-treino. Para pré-treinos RVC padrão feitos com ContentVec, selecione ContentVec na extração e inferência.

### Escolha uma taxa usando a largura de banda da fonte

Confira o sample rate nos metadados do arquivo e inspecione vários clipes representativos em um visualizador de espectrograma como o [Spek](https://www.spek.cc/p/download). Procure detalhe vocal útil em vez de ruído isolado ou corte brusco de compressão. Metade da taxa de amostragem de treino é a frequência máxima representável: um modelo 32 kHz representa até 16 kHz, 40 kHz até 20 kHz e 48 kHz até 24 kHz. Para detalhe útil acima de 20 kHz, escolha 48 kHz se arquitetura e pré-treino suportarem. Use a taxa compatível menor quando ela já cobrir a largura de banda da fonte. O pré-processamento reamostra, mas não restaura detalhe ausente.

## Execute as etapas em ordem

| Etapa | O que produz | O que verificar |
| --- | --- | --- |
| Pré-processamento do dataset | Áudio preparado para a configuração de modelo do experimento. | O log cita a pasta pretendida e relata processamento bem-sucedido para arquivos úteis. Confira arquivos ignorados antes de seguir. |
| Extração de características | Recursos de conteúdo, além de dados de tom quando exigidos pela configuração escolhida. | A extração conclui para o experimento atual usando o embedder e método de tom selecionados. |
| Treinamento do modelo | Checkpoints e exportações de inferência conforme opções de salvamento configuradas. | Os passos de treino avançam e os arquivos esperados são salvos. Leia o primeiro erro se o progresso parar. |
| Índice de recuperação | Coleção pesquisável de características do dataset para uso opcional na conversão. | O índice pertence a este experimento e corresponde à voz exportada. Se pulou, teste o modelo de forma independente. |

Use o fluxo automático onde disponível, ou conclua e verifique cada etapa antes de iniciar a seguinte. Mudar dataset ou sample rate pode invalidar áudio preparado e recursos extraídos. Mudar embedder exige nova extração. Ao testar configuração incompatível, inicie um experimento separado para preservar caches e checkpoints existentes.

## Acompanhe o progresso no Ilaria RVC

- Use **Training Dashboard** para verificar contagem de passos, tempo por época e curvas de perda. Uma curva ajuda a explicar uma execução travada, enquanto testes de escuta mostram como a saída soa.
- Configure **prévias de treinamento** com um clipe de teste constante para o app gerar conversões comparáveis ao salvar checkpoints.
- Se usar **Training Queue**, defina nome de experimento e dataset distintos para cada tarefa. Antes de retomar ou tentar novamente, confirme quais etapas foram concluídas e onde a saída será salva.
- Quando sua versão expuser **Stop and save**, use-o quando precisar interromper e continuar depois. Aguarde o checkpoint terminar de gravar antes de fechar o app.

O Ilaria RVC 2.1.0 suporta metas por épocas e por passos totais, incluindo retomada no meio de uma época para metas por passos. Outros frontends podem expor controles e comportamentos diferentes.

### Compare orçamentos de treinamento em passos

Uma época é uma passada pelo dataset preparado. Um passo de treino é uma atualização de batch. Divida o número de clipes após pré-processamento pelo batch size efetivo para estimar passos por época. Por exemplo, 10,000 clipes com batch size 8 dão 1,250 batches por época em uma execução com um worker. Batches parciais descartados, múltiplas GPUs ou acumulação de gradiente podem alterar a contagem. Use a contagem informada pela sua execução ao comparar experimentos.

Escolha um intervalo de salvamento que gere vários checkpoints para audição. Salvar aproximadamente a cada 40 épocas é um ponto de partida possível para execuções medidas em centenas de épocas. Use os mesmos clipes separados e os mesmos ajustes de inferência em cada comparação. Ouça inteligibilidade, estabilidade de tom, pausas naturais e consoantes claras. Se exportações posteriores soarem mais ásperas ou funcionarem bem apenas em poucas frases, compare com um checkpoint anterior e inspecione o dataset por repetições ou artefatos. Escolha o checkpoint que melhor funciona nas entradas pretendidas.

## Compare exportações ouvindo

Abra a inferência com um `.pth` exportado. Use as mesmas gravações curtas separadas e os mesmos ajustes de conversão para comparar modelos de checkpoints diferentes. Se comparar o índice, mantenha o checkpoint fixo e compare o mesmo clipe com recuperação desligada e ligada.

Compare estas quatro qualidades entre exportações:

1. **Timbre.** A gravação convertida lembra o caráter vocal pretendido em toda a frase?
2. **Inteligibilidade.** Consoantes e finais de palavras continuam fáceis de entender?
3. **Estabilidade de tom.** Notas ou sílabas saltam, oscilam ou perdem a inflexão pretendida?
4. **Artefatos.** A saída adiciona zumbido, ruído de sala embutido, caudas ásperas ou transições estranhas?

Guarde a exportação que soar melhor e suas saídas de teste. Mais épocas podem valer a pena quando os resultados melhoram em vários exemplos. Se exportações posteriores melhorarem só um clipe ou começarem a reproduzir defeitos do dataset, volte à melhor base e revise as gravações.

## Exportar, retomar ou compartilhar

- **Usar na inferência.** Selecione o modelo `.pth` exportado. Mantenha o `.index` correspondente ao lado quando quiser recuperação. Registre embedder necessário, cliente suportado e sample rate.
- **Retomar treinamento.** Faça backup do experimento e mantenha os checkpoints correspondentes de gerador e discriminador, normalmente chamados `G_*.pth` e `D_*.pth`. Retome com o mesmo experimento e configuração compatível, depois confira no log o checkpoint e passo/época esperados. Uma exportação de inferência sozinha não possui o estado completo de treino.
- **Compartilhar um modelo.** Compartilhe apenas arquivos que você tem permissão para distribuir. Inclua exemplos de áudio, notas de compatibilidade, o índice correspondente se útil e termos de uso necessários.

No Ilaria RVC, versões recentes usam a biblioteca de modelos para exportações de inferência e índices associados. Caminhos e nomes podem variar entre frontends. Salve os logs do experimento separadamente se quiser recriar o modelo depois.

## Diagnosticar uma execução com falha

| Sintoma | Verificar primeiro |
| --- | --- |
| O pré-processamento não encontrou áudio | Verifique a pasta de dataset selecionada e reproduza um clipe de entrada. Confira se sua compilação lê subpastas aninhadas. |
| A extração falha ou relata modelo ausente | Verifique ativos de embedder e modelo de tom selecionados, e leia a primeira mensagem no log de extração. |
| A memória da GPU acaba | Reduza batch size, pare tarefas GPU concorrentes e desative cache de dataset na GPU se sua compilação oferecer esse controle. Tente novamente a etapa. |
| O treinamento reinicia do começo | Verifique se o experimento aponta para checkpoints de treino compatíveis e se qualquer opção de início limpo está desligada. |
| Um `.pth` não carrega para conversão | Confira se você selecionou um checkpoint de treino em vez de uma exportação de inferência, e verifique compatibilidade de arquitetura e embedder. |
| Um modelo utilizável não tem índice | Verifique se a geração do índice foi pulada ou falhou. Exporte e teste o checkpoint sozinho, depois gere seu índice a partir do experimento se preciso. |

Guarde a primeira mensagem de falha e a configuração associada à execução. Para mais verificações, veja [Solução de problemas](../reference/troubleshooting.md).

## Perfis indicativos de treinamento (adaptar a dados e hardware)

Estas três predefinições são **pontos de partida indicativos**, não regras universais. Sempre ajuste **Batch Size** à sua VRAM e avalie checkpoints ouvindo os mesmos clipes de teste separados.

### Treino Iniciante (Base Segura)

- **Ideal para:** Primeiro modelo de voz, 5-15 minutos de áudio limpo de um único locutor, GPUs de 6-8 GB VRAM.
- **Configurações:** RVC **v2** · **40 kHz** (ou `32 kHz` para RefineGAN) · Pitch Guidance **ON** (`rmvpe`) · Embedder `contentvec` · Pré-treino HiFi-GAN padrão/verificado · **Batch Size `4-8`** · **Epochs `200`** (salvar a cada `25-50` épocas) · Precisão **FP32** (ou **BF16** na RTX 30/40/50) · GPU Caching **OFF** · Workers `2` · Fused AdamW **OFF**.
- **Por quê:** Prioriza estabilidade e evita falta de memória ou overfitting precoce enquanto gera vários checkpoints para comparar.

### Treino Intermediário (Equilíbrio Qualidade e Velocidade)

- **Ideal para:** 15-30 minutos de fala/canto limpos, GPUs de 8-12 GB VRAM.
- **Configurações:** RVC **v2** · **40 kHz** ou **48 kHz** (se a largura de banda da fonte passar de 20 kHz) · `rmvpe` · `contentvec` ou `klm-vocal-contentvec` / `spin-v2` (combinado ao pré-treino) · **Batch Size `8-12`** · **Epochs `250-350`** (ou **Total Steps** equivalentes) · Salvar a cada `25-50` épocas · Precisão **BF16** (RTX 30/40/50) ou **FP16** (T4/RTX 20) · Workers `4`, Prefetch `4-8` · Criar **índice FAISS `Auto`** após escolher o melhor checkpoint.
- **Por quê:** Usa precisão mista mais rápida e batches maiores mantendo checkpoints regulares e prévias de escuta.

### Treino Avançado e Otimização

- **Ideal para:** Datasets grandes ou curados multi-emoção/canto, 12-24 GB+ VRAM, pré-treinos customizados.
- **Configurações:** RVC **v2** · Taxa combinada (`32/40/48 kHz`) e vocoder (`HiFi-GAN`, `MRF HiFi-GAN` ou `RefineGAN` a `32 kHz` no Ilaria RVC) · Pré-treino G/D e embedder customizados/combinados · **Batch Size `12-16+`** · Meta **Total Steps** (atualizações de gradiente consistentes independentemente do tamanho do dataset) · **GPU Caching ON** (apenas se o dataset couber folgado na VRAM; meça antes o tempo por época) · **Fused AdamW ON** (testar em execução limpa) · **Training Queue** para execuções A/B noturnas · Monitoramento **TensorBoard** + comparação no **Audio Analyzer**.
- **Learning rate:** A maioria das WebUIs RVC (incluindo Ilaria RVC) usa o cronograma padrão do otimizador RVC v2 (`1e-4` base); altere a taxa de aprendizado em frontends que a expõem apenas se entender como ela escala com o batch size.

## Como identificar Underfitting vs. Overfitting de ouvido

1. **Underfitting (cedo demais):** A saída ainda soa quase como o locutor de entrada, perde o timbre alvo em vogais sustentadas ou perde caráter em notas altas/baixas. *Solução:* Continue treinando a partir do último checkpoint `G_*.pth`/`D_*.pth`.
2. **Overfitting (tarde demais):** A voz soa robótica/metálica em palavras novas, reproduz ruído da sala ou artefatos de respiração do dataset, ou soa bem *apenas* em frases parecidas com o conjunto de treino. *Solução:* Volte a um checkpoint anterior (`50-100` épocas antes) e inspecione o dataset no [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md).

> Se você estiver treinando com o **Redpanda-vc** (que adiciona Generator EMA e salvamento de checkpoints baseado em passos), veja [Treinar modelos RVC no Redpanda-vc](../other-rvcs/redpanda/training.md).
