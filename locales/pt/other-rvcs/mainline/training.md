---
label: "Treine e exporte um modelo"
icon: ":test_tube:"
order: 20
permalink: /ilaria-rvc/mainline/training/
description: "Comece com um único alto-falante e um novo nome de experimento. O treinamento produz um modelo que você pode testar em novos desempenhos na interface de..."
---

# Treine e exporte um modelo RVC WebUI (Mainline - Original RVC)

Comece com um único alto-falante e um novo nome de experimento. O treinamento produz um modelo que você pode testar em novos desempenhos na [interface de inferência](inference.md). Mantenha o áudio bruto e o registro do experimento para poder reproduzir o resultado.

## Prepare os arquivos

1. Coloque gravações de voz limpas em uma pasta local como `C:\RVC\datasets\voice_a`. Mantenha backups em outro lugar. Use gravações com as quais você tem permissão para treinar. Verifique se você pode reproduzir vários arquivos e se eles contêm a voz pretendida sem música de fundo ou alto-falantes não relacionados.
2. Mantenha uma ou duas gravações curtas de frases diferentes fora do conjunto de dados. Use-os como entradas de teste para cada ponto de verificação. Para um conjunto de dados destinado ao canto, certifique-se de ter material com alcance vocal relevante e teste com um vocal isolado.
3. Se você instalou a partir da origem, abra o mesmo ambiente usado para executar o WebUI e obtenha os pesos pré-treinados correspondentes e os ativos de silêncio. As versões empacotadas já podem contê-los.

```text
hf download lj1995/VoiceConversionWebUI --include "pretrained/*" "pretrained_v2/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI mute.zip --local-dir .model-downloads
python -m zipfile -e .model-downloads/mute.zip logs
```

Consulte [preparação do conjunto de dados](../../model-training/dataset-preparation.md) para detalhes de gravação e limpeza.

## Configure o experimento e processe o áudio

1. Abra **Train**. Use um nome novo como `voice_a_v2_40k` para que RVC WebUI (Mainline - Original RVC) crie uma pasta separada em `logs/`.
2. Escolha uma taxa de amostragem alvo e uma versão de arquitetura compatível com seu lançamento. V2 é um ponto de partida razoável quando você planeja usar um cliente de inferência V2 compatível. A taxa, a arquitetura e a orientação de pitch devem estar de acordo com os pré-treinos do gerador e do discriminador. Use orientação de tom para um modelo de voz guiado por tom normal.
3. Selecione um conjunto de dados de alto-falante único, onde a construção oferece uma escolha. Use o ID do alto-falante `0` para a primeira execução. Cole o caminho completo da pasta do conjunto de dados e clique em **Process Data** ou no botão de pré-processamento equivalente.
4. Aguarde a conclusão do pré-processamento. Revise os avisos na saída e verifique se o experimento produziu áudio processado. Se a execução não produzir nada, verifique o caminho e teste se os arquivos de áudio incluídos são decodificados. Corrija isso antes de iniciar a extração.

Para um experimento com vários alto-falantes em uma versão com **Multi-speaker Dataset Helper**, mantenha os arquivos de cada alto-falante separados e atribua IDs de alto-falante estáveis. Verifique o manifesto gerado e use esses mesmos IDs posteriormente durante a conversão. Conclua primeiro uma passagem com um único alto-falante para ter uma linha de base funcional.

## Extraia argumentos de venda e recursos

1. Escolha o índice GPU mostrado pela interface. Para uma GPU, o ID geralmente é `0`. Os campos do dispositivo para diferentes operações podem ser separados. Copie os IDs disponíveis em vez de assumir um slot específico.
2. Selecione um extrator de pitch que a compilação possa executar. Se uma opção GPU RMVPE estiver disponível e funcionar em seu sistema, comece por aí. Uma opção de CPU pode ajudar a isolar um problema de back-end. A extração de recursos também requer os ativos HuBERT compartilhados instalados em [setup](installation.md).
3. Execute **Extração de recurso** e aguarde a conclusão do argumento de venda necessário e do recurso de conteúdo. Se um estágio não registrar nenhum arquivo utilizável, pare e corrija a causa. Alterar o conjunto de dados, a versão do modelo ou a taxa alvo altera o experimento. Use um novo nome de experimento ao comparar configurações incompatíveis.

> Os checkpoints HuBERT genéricos são desaconselhados como codificador predefinido para conversão de voz. Foram treinados para representar a fala e podem preservar informação sobre o timbre da voz original no áudio convertido. Usa o codificador esperado pelo modelo RVC, como o ContentVec se o modelo tiver sido treinado com ele.

## Treine e salve pontos de verificação

1. Verifique os campos gerador e discriminador no painel de treinamento. Eles devem se referir a um par correspondente para a versão, taxa de amostragem e modo de pitch que você selecionou. Se um log indicar que os arquivos foram ignorados, certifique-se de estar treinando com a configuração pretendida antes de continuar.
2. Comece com um lote que caiba na memória e deixe o cache do conjunto de dados desativado para o primeiro teste. Se a GPU ficar sem memória, interrompa o trabalho com falha e reduza o tamanho do lote. Evite realizar uma conversão ao vivo junto com a primeira execução de treinamento.
3. Defina uma meta de teste finita e um intervalo que salve vários pontos de verificação que você pode comparar mais tarde. Se você quiser modelos intermediários prontos para inferência, habilite exportações de modelos pequenos no horário de economia, quando disponível. Manter apenas os pontos de verificação de treinamento mais recentes economiza espaço, mas limita a retomada de versões anteriores.
4. Clique em **Treinar modelo**. Observe o status do experimento e confirme os avanços do registro de treinamento entre as épocas. Use o controle de parada do aplicativo quando disponível e espere que ele termine de gravar os arquivos antes de fechar o processo.

As curvas de treinamento revelam se o trabalho está sendo executado ou produzindo erros. Escolha o modelo final convertendo as mesmas gravações de teste com várias exportações de inferência salvas. Compare palavras, consoantes, pausas e notas difíceis em volumes semelhantes. Mais épocas podem ajudar, estabilizar ou piorar os resultados, dependendo do conjunto de dados.

## Construir, testar e fazer backup

1. Clique em **Treinar índice de recursos** após a extração bem-sucedida se desejar um índice de recuperação. Procure o `added_*.index` preenchido na saída do experimento, com uma cópia ou link detectável, se fornecido pelo seu build. Ignore a recuperação se quiser avaliar apenas o próprio ponto de verificação.
2. Encontre o pequeno modelo exportado em `assets/weights/`. Se você tiver apenas um ponto de verificação do gerador, use **ckpt Processing** e a ferramenta de extração de modelo pequeno, fornecendo a taxa de correspondência, o sinalizador de pitch e a versão. Atualize a lista de modelos na inferência e selecione a exportação pequena.
3. Converta um clipe retido com taxa de índice zero. Quando isso funcionar, tente o índice preenchido correspondente. Salve ambas as saídas para comparação.
4. Faça backup do pequeno modelo de inferência e seu índice correspondente para usar ou compartilhar. Mantenha a pasta do experimento, incluindo correspondências `G_*.pth` e `D_*.pth`, configuração e registros, se você planeja retomar o treinamento.

| Sintoma | Onde procurar |
| --- | --- |
| O pré-processamento termina sem áudio | Verifique o caminho do conjunto de dados, permissões, formatos suportados e se os arquivos WAV abrem fora do RVC. |
| A extração de recursos é interrompida. | Identifique se a extração de conteúdo ou pitch falhou. Verifique os ativos do modelo e experimente um back-end compatível. |
| O treinamento começa e depois fica sem VRAM | Reduza o tamanho do lote, desative o cache e libere VRAM antes de tentar novamente. |
| A inferência falha com um ponto de verificação | Confirme que você selecionou um modelo de inferência exportado. Teste um ponto de verificação funcional conhecido com a mesma entrada e sem índice. |
| A geração de índice não encontra recursos | Revisite a extração de recursos bem-sucedida para o mesmo experimento. Verifique a versão e os nomes das pastas antes de tentar reutilizar arquivos. |
