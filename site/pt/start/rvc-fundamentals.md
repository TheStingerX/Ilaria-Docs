# Fundamentos de RVC

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

A conversão de voz baseada em recuperação (RVC) pega uma gravação vocal e sintetiza uma versão com o caráter de uma voz treinada. A gravação fornece a performance, incluindo as palavras, o ritmo e grande parte do contorno do tom. O modelo determina como esse desempenho é renderizado. Para uma linha falada, registre a pronúncia e a entrega que deseja ouvir no resultado. Um ajuste de tom altera o registro sem traduzir ou reescrever a linha.

## Siga o sinal

 | Estágio | O que faz | O que ouvir |
| --- | --- | --- |
 | Decodifica a fonte | Lê o áudio e o prepara para análise. | Picos cortados, eco ambiente e outras vozes podem contaminar fases posteriores. |
 | Extrair recursos de conteúdo | Um incorporador representa o som de cada seção curta da entrada. Fluxos de trabalho RVC comuns usam ContentVec ou um extrator de recursos baseado em HuBERT. | Palavras pouco claras podem seguir a entrada até a saída, mesmo com um bom modelo. |
 | Estimar tom | Um preditor de tom estima a frequência fundamental, ou F0, em seções sonoras. Modelos guiados por pitch podem usar esse contorno durante a síntese. | Saltos inesperados de notas ou notas sustentadas instáveis ​​podem indicar rastreamento de afinação. |
 | Recuperar recursos de treinamento semelhantes | Quando um índice compatível estiver disponível, o conversor pode combinar recursos próximos dos dados de treinamento do modelo com os recursos de origem. | Compare a recuperação ativada e desativada se o resultado soar abafado ou o timbre da fonte for muito proeminente. |
 | Sintetize a saída | O modelo transforma os recursos condicionados em uma forma de onda na taxa de síntese suportada. | Ouça texturas metálicas, consoantes ausentes e mudanças de nível. |

> Os checkpoints HuBERT genéricos são desaconselhados como codificador predefinido para conversão de voz. Foram treinados para representar a fala e podem preservar informação sobre o timbre da voz original no áudio convertido. Usa o codificador esperado pelo modelo RVC, como o ContentVec se o modelo tiver sido treinado com ele.

### Mantenha os controles separados

- **Pitch shift** compensa o contorno detectado em semitons. Comece em zero e altere-o se a performance estiver fora do registro confortável da voz alvo.
- **Preditor de pitch** altera a forma como o contorno é medido. Compare os preditores em uma passagem que contém o problema, como uma nota sustentada ou a transição da fala para a respiração.
- **Taxa de índice** altera o equilíbrio entre recursos de origem e recuperados. Zero desativa a contribuição de recuperação em fluxos de trabalho RVC padrão. Uma configuração alta pode enfatizar características dos dados de treinamento, incluindo artefatos indesejados.
- **Taxa de amostragem** descreve quantas amostras de áudio representam um segundo. A taxa do arquivo de origem, a taxa de síntese do modelo e a taxa do arquivo exportado podem ser diferentes. A reamostragem de um arquivo altera sua representação sem tornar carregável um ponto de verificação incompatível.

Para controles de conversão específicos do aplicativo, consulte [Conversão de voz](../conversion/voice-conversion.md).

## Verifique a compatibilidade do modelo antes de importar

1. **Confirme a família e a arquitetura do modelo.** Use um tempo de execução que suporte explicitamente o modelo. O RVC clássico v1 e v2 usam dimensões de recursos diferentes, geralmente 256 e 768, respectivamente, no RVC WebUI (Mainline - Original RVC). Alguns forks também suportam arquiteturas que exigem seu próprio tempo de execução.
2. **Verifique o incorporador.** O tempo de execução deve fornecer a representação do recurso que o modelo foi treinado para esperar. Um modelo treinado com um incorporador personalizado pode precisar desse incorporador no momento da inferência. Uma extensão de arquivo semelhante ou uma taxa de amostragem correspondente por si só fornecem pouca evidência de suporte.
3. **Use a exportação de inferência.** Um `.pth` pronto para uso e um ponto de verificação de treinamento podem ter a mesma extensão. Selecione o arquivo identificado pelo editor como modelo de inferência. Um ZIP é um contêiner para os arquivos e só pode ser importado diretamente quando o aplicativo oferece suporte à importação de ZIP.
4. **Emparelhar dados de recuperação com seu ponto de verificação.** Um `.index` criado para outra voz ou incorporador pode falhar ou degradar o resultado. Mantenha o modelo e seu índice juntos e verifique se o aplicativo selecionou o par esperado. Se você tiver apenas um modelo compatível, use o fluxo de trabalho sem recuperação compatível com seu cliente.
5. **Teste um arquivo curto.** Experimente um clipe limpo com configurações padrão. Um modelo carregado ainda pode soar errado se o tempo de execução usar o extrator de recursos errado ou se a entrada estiver muito fora do alcance da voz.

!!!warning Arquivos de modelo confiáveis
Obtenha arquivos de modelo do editor original ou de outra fonte confiável. Carregar um ponto de verificação PyTorch pode envolver a desserialização de objetos Python. Mantenha as proteções do seu carregador habilitadas e solicite uma exportação compatível se ele recusar um arquivo. [Referência de carregamento do PyTorch](https://docs.pytorch.org/docs/stable/generated/torch.load.html)
!!!

## Julgue o resultado com um teste repetível.

Mantenha um clipe de referência seco e use o mesmo clipe para cada comparação. Inclua uma frase calma, uma frase com consoantes agudas e uma vogal sustentada. Mantenha os níveis de reprodução semelhantes para que o volume por si só não faça uma saída parecer melhor.

1. Renderize uma linha de base usando os padrões do aplicativo.
2. Verifique primeiro a clareza das palavras. Se os clipes secos e convertidos forem difíceis de entender, regrave a fonte.
3. Para oscilação de pitch, compare dois preditores de pitch suportados antes de alterar a recuperação.
4. Para um problema de timbre ou textura, compare com a recuperação desabilitada e ajuste a taxa do índice se o índice correspondente ajudar.
5. Salve as configurações de trabalho com o nome do modelo, versão e entrada. Quando uma atualização posterior altera o som, essas notas fornecem um ponto de partida.

[Comece com Ilaria RVC](getting-started.md) · [Modelos e arquivos RVC](models.md) · [Conversão de voz em tempo real](../conversion/real-time.md)
