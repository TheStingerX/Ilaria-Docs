# Primeiros passos

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Também podes usar o Ilaria RVC no Kaggle com a GPU remota, mesmo que o teu computador não tenha uma GPU NVIDIA. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Para os procedimentos completos de instalação, configuração e resolução de problemas, consulta os [guias passo a passo de cada aplicação](../other-rvcs/app-guides.md).

## Ilaria RVC

1. Obtenha o pacote do Windows no [repositório Ilaria's Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Verifique as instruções do seu lançamento antes de atualizar o driver NVIDIA ou alterar dependências.
2. Extraia o pacote completo para uma pasta gravável. Execute o inicializador a partir dessa pasta para que ele possa encontrar o tempo de execução e as ferramentas de áudio incluídas.
3. Aberto `RUN_ILARIA_RVC.bat`. Se a inicialização falhar, feche essa tentativa e use `RUN_ILARIA_RVC_LOGS.bat` para ver o console.
4. Se a interface não abrir automaticamente, use [http://127.0.0.1:6969](http://127.0.0.1:6969) no mesmo PC. Mantenha o iniciador funcionando enquanto você trabalha.

### Converta um primeiro clipe

1. Importe um modelo compatível de **Outros**. Mantenha seu índice correspondente opcional com o ponto de verificação.
2. Abra **Single Inference**, selecione seu modelo e adicione uma gravação de voz curta e seca.
3. Comece com o extrator de pitch padrão. Defina a mudança de tom e **Index Ratio** como zero para uma linha de base.
4. Converta o clipe e ouça o início, a frase mais alta e quaisquer consoantes que soem mais suaves do que no original.
5. Exporte uma referência WAV. Siga [Conversão de voz](../conversion/voice-conversion.md) para comparar configurações alternativas na mesma fonte.

### Atualização e backup

Para uma instalação existente, use **Outro → Atualizar Ilaria RVC** e leia as notas de lançamento antes de aplicar a atualização. Salve uma cópia de seus conjuntos de dados, modelos exportados, pontos de verificação de treinamento e áudio convertido antes de mudar de versão. Mantenha os pontos de verificação de treinamento separados dos modelos de inferência que você usa ou compartilha.

Use gravações e modelos de voz que você tem permissão para usar. Para demonstrações de modelos e disponibilidade, consulte o [catálogo](https://ilariarvc.shop/en/demos/).

[Fonte Ilaria RVC e notas de instalação](https://github.com/TheStingerX/Ilaria-RVC) · [Notas de versão](https://github.com/TheStingerX/Ilaria-RVC/blob/main/docs/CHANGELOG.md)

## Vonovox

> **Versão mais recente (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

1. No Windows com NVIDIA, baixe o arquivo para sua geração de GPU em [Vonovox no Hugging Face](https://huggingface.co/dr87/vonovox/tree/main). Extraia o pacote completo e inicie o aplicativo incluído.
2. Carregue um modelo RVC V2 e selecione seu microfone e fones de ouvido nas configurações do dispositivo de áudio.
3. Inicie a conversão com o buffer padrão e fale uma frase curta. Confirme se o monitor está claro antes de [encaminhá-lo para outro aplicativo](../conversion/real-time.md).

## w-okada VCClient

1. Obtenha um pacote para sua plataforma e back-end em [VCClient on Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Verifique se ele suporta RVC e o formato do seu modelo. O hardware suportado pode diferir entre os modelos PyTorch e ONNX.
2. Extraia a versão e inicie seu servidor ou inicializador integrado. Abra o cliente a partir do endereço local mostrado na inicialização, caso ele não abra automaticamente.
3. Importe a voz para um slot de modelo, selecione esse slot e defina os dispositivos de entrada e monitor. Inicie a conversão e ouça pelos fones de ouvido antes de conectar a saída a uma chamada.

## Okada TG Developed Fork

1. Escolha um pacote em [versões TGR](https://github.com/tg-develop/voice-changer/releases). No Windows, use CUDA para uma placa NVIDIA compatível ou a compilação DirectML para uma GPU AMD ou Intel compatível.
2. Inicie a compilação extraída, selecione o dispositivo de computação correspondente e importe a voz para um slot RVC.
3. Configure o monitor do microfone e do fone de ouvido e teste no buffer padrão. Escolha um extrator de pitch disponível em sua construção ao recriar uma predefinição de outro back-end.

## RVC GUI

1. Baixe o pacote desktop em [versões RVC GUI](https://github.com/Tiger14n/RVC-GUI/releases). Este aplicativo arquivado destina-se a configurações legadas compatíveis.
2. Extraia e inicie o aplicativo. Importe um ZIP contendo o ponto de verificação de inferência e seu índice correspondente, se fornecido, e selecione a voz importada.
3. Escolha uma gravação vocal curta, comece com zero semitons e converta. Ouça o resultado e salve uma cópia de referência.

## Applio

1. Obtenha o instalador ou pacote para sua plataforma em [Downloads do Applio](https://applio.org/). No Desktop, conclua a configuração do mecanismo e confirme seu dispositivo de computação. Para uma compilação empacotada do Gradio, extraia o arquivo completo, inicie o inicializador e abra seu endereço local.
2. Adicione uma voz à biblioteca de modelos e abra **Convert Audio**. Em versões mais antigas do Gradio, a guia pode ser chamada de **Inferência**.
3. Selecione o modelo, o incorporador correspondente e o índice opcional e, em seguida, converta um WAV curto e limpo com pitch zero. Continue com o [fluxo de trabalho de conversão do Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) para exemplos de lote e configuração.

## RVC WebUI (Mainline - Original RVC)

1. Escolha um pacote compatível em [RVC WebUI (Mainline - Original RVC) releases](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases). Para um pacote do Windows que o inclua, extraia o arquivo e execute `go-web.bat`. Mantenha o console aberto enquanto usa o WebUI.
2. Coloque o ponto de verificação de inferência em `assets/weights` e seu índice de recuperação correspondente em `logs`. Atualize as listas e selecione sua voz.
3. Insira o caminho completo para um arquivo de áudio curto, mantenha o tom em zero e clique em **Converter**. Use o controle de download do player de saída para salvá-lo. Consulte o [fluxo de trabalho de conversão principal](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) para verificações adicionais.

## Redpanda-vc

O Redpanda VC oferece treino, inferência por ficheiros e conversão em tempo real para RVC e Causal Voice Changer, na aplicação de desktop e na WebUI. Usa `.pth` com RVC e `.cvc` com CVC.

[Versão pré-compilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Instalar o Redpanda VC](../other-rvcs/training/redpanda/first-run.md) · [Inferência por ficheiros](../other-rvcs/training/redpanda/inference.md)

## RVC Blue

Conversão de voz em tempo real no Windows. [Instalação e configuração](../other-rvcs/voice-changers/rvc-blue/installation.md).
