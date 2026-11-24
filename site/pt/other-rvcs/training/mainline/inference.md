# Converter gravações no RVC WebUI (Mainline - Original RVC)

Comece com uma gravação curta que você possa ouvir claramente em um reprodutor de mídia normal, além de um modelo RVC exportado que você tem permissão para usar. A modelo muda a voz na gravação. A fonte fornece as palavras, o ritmo e a entrega. Para uma música, use uma faixa vocal gravada separadamente ou isolada para a primeira passagem.

## Coloque cada arquivo no lugar certo

| O que você recebeu | Para onde vai |
| --- | --- |
| Um ZIP ou 7z com um modelo dentro | Extraia os arquivos antes de adicioná-los ao RVC WebUI (Mainline - Original RVC). |
| Um arquivo `.pth` de inferência | Copie-o para `assets/weights/` dentro da pasta RVC WebUI (Mainline - Original RVC). Se você mesmo treinou, use o modelo pequeno exportado. |
| Um `.index` preenchido para esse modelo exato | Nas compilações atuais, copie-o para `assets/indices/`. Compilações mais antigas geralmente descobrem índices em `logs/`. Se a detecção automática falhar, selecione-o ou insira o caminho completo manualmente. |
| Um ponto de verificação de treinamento `G_*.pth` ou `D_*.pth` | Continue com o experimento em `logs/`. Use o [guia de treinamento](training.md) para identificar ou exportar um modelo para inferência. |

Use `added_*.index` quando o treinamento produziu arquivos `trained_` e `added_`. Este último contém os vetores de recursos pesquisáveis. Seu modelo pode funcionar sem índice. Defina **Index Rate** como zero quando você ignorar o índice ou não conseguir identificar seu arquivo correspondente.

## Converta seu primeiro clipe

1. Abra a WebUI e encontre a guia **Model Inference**. Atualize as listas de modelos e índices após copiar os arquivos e selecione a inferência `.pth` no menu suspenso de voz. Dê tempo à interface para ler o ponto de verificação.
2. Escolha um WAV curto com uma voz falando ou cantando sozinha. As compilações mais recentes expõem um controle de upload. Se sua compilação mostrar uma caixa de caminho, forneça um caminho completo como `C:\RVC\test\voice.wav`. Tente um caminho local curto ao diagnosticar o acesso a arquivos em um pacote mais antigo.
3. Defina a mudança de tom para `0` para a primeira passagem. Defina **Taxa de índice** ou **Proporção do recurso de pesquisa** como `0` e deixe as configurações extras como estão. Selecione `rmvpe` se disponível e seus pesos estiverem instalados. Com um ponto de verificação de alto-falante único, comece com ID de alto-falante `0`.
4. Clique em **Converter** uma vez e aguarde o painel de status e reprodução. Jogue o resultado desde o início. Se parecer utilizável, use o menu do reprodutor de áudio para baixá-lo. Se a conversão falhar, leia o status ou o terminal antes de alterar as configurações.
5. Reproduza a mesma fonte e produza consecutivamente. Verifique a primeira palavra, as notas mais altas e mais baixas e várias pausas. Altere um controle e renderize novamente a mesma entrada para saber qual alteração ajudou.

## Entenda os controles que você provavelmente tocará

| Controle | Como usá-lo |
| --- | --- |
| Mudança de tom | Transpõe a fonte em semitons. `+12` aumenta uma oitava, `-12` diminui uma oitava. Faça pequenos movimentos primeiro quando as palavras ou notas parecerem tensas. |
| Extração de pitch | Estima o contorno de pitch usado na conversão guiada por pitch. Tente outro método quando aparecerem quebras de voz em certas notas. Compare o mesmo clipe e mantenha todo o resto constante. |
| Taxa de índice | Mistura recursos próximos da voz alvo quando existe um índice correspondente. Aumente gradualmente se o resultado mantiver muito do timbre original. Recue se a dicção ficar turva. |
| Proteger | Controla o quanto a conversão preserva detalhes não sonoros, como respirações e consoantes. Valores mais baixos fortalecem a proteção no controle RVC WebUI (Mainline - Original RVC) `0–0.5` usual. Tente um pequeno ajuste depois que a recuperação do índice funcionar. |
| Envelope de volume | Altera o quão próximo o resultado segue os momentos altos e baixos na entrada. Mais perto de zero segue mais a fonte. |
| ID do alto-falante | Seleciona uma voz em um ponto de verificação de vários alto-falantes. Escolha um ID realmente presente nesse modelo. |
| Saída de nova amostragem | Define a taxa de amostragem de áudio exportado onde a compilação a expõe. Deixe-o no modelo padrão durante seu primeiro teste. |

### Um teste de ajuste repetível

Salve uma fonte não processada de 10 segundos como `test.wav`. Converta-o com mudança de tom zero e sem índice para obter `baseline.wav`. Carregue o índice correspondente e aumente sua taxa para `retrieval.wav`. Compare esses dois arquivos em volumes semelhantes. Depois de escolher uma configuração de recuperação, tente um ajuste de tom e salve um terceiro arquivo. Mantenha qualquer configuração que melhore a mesma linha problemática sem degradar o resto.

## Converter uma pasta

1. Conclua um teste de arquivo único bem-sucedido usando a mesma voz e configurações.
2. Crie pastas `input` e `output` separadas. Coloque apenas o áudio que deseja converter em `input`.
3. Em **Batch Inference**, escolha seus arquivos ou insira o caminho completo da pasta de entrada. Defina explicitamente o caminho da pasta de saída e escolha WAV se planeja editar o áudio posteriormente.
4. Comece com dois arquivos curtos. Confirme se cada resultado aparece na pasta de saída e é reproduzido até o fim. Em seguida, execute o conjunto completo. Verifique o status de falhas individuais para que você possa tentar novamente apenas os arquivos afetados.

## Diagnosticar falhas comuns de conversão de arquivos

| Sintoma | Próximo teste |
| --- | --- |
| A lista de modelos está vazia | Confirme se o `.pth` foi extraído, sob o `assets/weights/` da instalação ativa, e visível após a atualização. |
| O modelo aparece, mas não pode ser carregado. | Verifique se o arquivo é uma exportação de inferência compatível. Um ponto de verificação de treinamento ou um modelo de um mecanismo de voz diferente pode aparecer na lista sem ser utilizável. |
| O índice falha ou não há resultado audível | Defina a recuperação como zero, execute uma conversão e confirme se o ponto de verificação funciona. Em seguida, selecione o índice preenchido correspondente e tente novamente. |
| A saída é áspera ou as sílabas oscilam | Ouça a entrada primeiro. Teste novamente um vocal limpo com o índice desativado. Em seguida, compare os métodos de afinação e uma mudança modesta na transposição. |
| A saída está faltando no modo em lote | Verifique se os arquivos de entrada estão abertos, se a pasta de destino é gravável e se o terminal reporta sucesso para o nome do arquivo relevante. |

Para obter mais informações, consulte [modelos e arquivos RVC](../../../start/models.md) e [qualidade de áudio](../../../conversion/audio-quality.md).
