---
label: "Configure Redpanda-vc"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
description: "Redpanda-vc estende o Applio e oferece várias famílias de modelos de voz. Este passo a passo usa a família RVC por toda parte. Escolha uma instalação e..."
---
# Configure Redpanda-vc

[GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda-vc estende o Applio e oferece várias famílias de modelos de voz. Este passo a passo usa a família **RVC** por toda parte. Escolha uma instalação e mantenha suas dependências separadas de outros programas RVC.

## 1. Escolha um caminho de inicialização

1. Baixe o código-fonte ou um pacote compatível do [projeto Redpanda-vc](https://github.com/redpanda343/Redpanda-vc). Para uma configuração de origem, extraia-a para uma pasta local gravável e verifique se o arquivo de dependência e o inicializador do projeto estão presentes. Instale as dependências exigidas pelo seu checkout em um ambiente Python dedicado. As instalações CUDA precisam de uma versão PyTorch que suporte a GPU NVIDIA e o driver em uso.
2. No Windows, comece com `run-install.bat` e deixe terminar de preparar o ambiente do projeto incluído. Em seguida, use `run-applio.bat` para o navegador WebUI ou `run-realtime-gui.bat` para a janela autônoma em tempo real. Ambos os lançadores esperam o ambiente criado na pasta do projeto. Abra um terminal na pasta do projeto quando precisar ler os logs de inicialização. Mantenha-o funcionando durante o uso.
3. Aguarde a UI ou abra o endereço de loopback impresso pelo processo. Se o inicializador terminar sem abrir uma página, verifique a saída do terminal em busca de um erro de importação, falha na inicialização do CUDA ou conflito de porta. Repare o problema mencionado nesta instalação antes de reabri-la.
4. Confirme o dispositivo de execução correto. Teste um trabalho de cada vez com a interface local antes de adicionar fluxos de navegador ou outros trabalhos pesados ​​de GPU.

## 2. Escolha o motor e modelo

Na visualização de conversão relevante, selecione o fluxo de trabalho **RVC**, escolha um ponto de verificação de inferência compatível e emparelhe-o com o índice correspondente somente quando você o tiver. O aplicativo também expõe Beatrice e Rectified Flow em visualizações suportadas. Cada um usa seu próprio formato de modelo. Um modelo pertencente a outra família precisa de motor próprio.

Se sua compilação expõe conversão offline, comece com um WAV seco e falado e zero transposição. Salve uma nova saída e verifique as mesmas palavras em ambos os arquivos. Se você precisar principalmente de conversão de microfone, vá diretamente para [teste em tempo real](live-audio.md) com um modelo compatível conhecido.

## 3. Diagnosticar a inicialização antes de alterar as configurações de áudio

- **Erro de importação**: confirme se o interpretador que está executando o inicializador é aquele no ambiente do seu projeto e possui as dependências da compilação.
- **Modelo ausente**: verifique novamente a pasta esperada pela sua compilação, o mecanismo atual e se o arquivo é uma exportação de inferência.
- **Erro CUDA**: confirme o dispositivo RVC escolhido e teste com outros trabalhos de GPU fechados. Registre o primeiro erro em vez de interpretar a mensagem final de desligamento.
- **Compatibilidade pouco clara**: observe a versão do checkout ou do pacote, GPU e família de modelos pretendida. Teste uma linha de base antes de tentar vocoders ou recursos personalizados.
