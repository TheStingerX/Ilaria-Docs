---
label: "🧩 Incorporadores e pré-treinamentos"
order: 88
permalink: /ilaria-rvc/embedders/
---
# Incorporadores e pré-treinamentos

## Incorporadores de inferência

Abra **Configurações do Embedder** abaixo de **Processamento de Áudio**. Lê automaticamente os metadados do modelo armazenado e usa ContentVec quando nenhum incorporador é gravado. Se o editor especificar um codificador, use-o. Um índice de recuperação precisa de recursos compatíveis do mesmo experimento. Deixe a recuperação desativada quando o emparelhamento for incerto.

Os codificadores de inferência disponíveis incluem ContentVec, Spin, Spin-v2 e HuBERT Base chinês, japonês e coreano. Abra **Outros → Baixar incorporadores** para instalar modelos opcionais, um de cada vez. Para ativos HuBERT personalizados, selecione **custom**, nomeie a pasta, forneça os pesos e arquivos de configuração correspondentes (.bin e .json) e instale-os juntos.

> Os checkpoints HuBERT genéricos são desaconselhados como codificador predefinido para conversão de voz. Foram treinados para representar a fala e podem preservar informação sobre o timbre da voz original no áudio convertido. Usa o codificador esperado pelo modelo RVC, como o ContentVec se o modelo tiver sido treinado com ele.

## Compatibilidade de treinamento

O treinamento expõe ContentVec e Spin-v2. A alteração do codificador requer novos recursos e um nome de experimento separado. Combine seu par de gerador e discriminador com o vocoder, taxa de amostragem de treinamento, geração de RVC e configuração de pitch e siga os requisitos do codificador do editor do par. Ilaria RVC 2.1.0 suporta treinamento RefineGAN especificamente em 32 kHz com RVC V2 e orientação de pitch. O downloader pode listar outras taxas para uso em outro lugar.

## Descarregar um par G/D

Em **Outro → Baixar modelos pré-treinados**, use um repositório ou arquivo pré-treinado ou insira um link para o ponto de verificação G e seu ponto de verificação D correspondente se a descoberta precisar de ajuda. O seletor **Pré-treinados recomendados** mostra as variantes de catálogo disponíveis e suas taxas de amostragem. Verifique a variante escolhida antes de instalar os dois arquivos. Retorne ao Treinamento, atualize a lista e selecione o par instalado. Se estiver usando a inicialização aleatória intencionalmente, escolha Nenhum. Mantenha os modelos de inferência e os pré-treinos de treinamento separados.

Se o treinamento for encerrado imediatamente após a seleção de um par, verifique os arquivos e a configuração do experimento salvo antes de alterar o tamanho do lote ou iniciar uma nova execução.
