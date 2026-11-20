---
label: "Instalar e converter com RVC GUI"
icon: ":control_knobs:"
order: 99
permalink: /ilaria-rvc/rvc-gui/file-conversion/
description: "Este guia cobre o aplicativo de desktop arquivado do Tiger14n para conversão de arquivos de áudio."
---
# Instalar e converter com RVC GUI

[GitHub](https://github.com/Tiger14n/RVC-GUI)

Este guia cobre o aplicativo de desktop arquivado do Tiger14n para conversão de arquivos de áudio. Prepare um ponto de verificação de voz e uma gravação WAV curta e seca antes de começar.

## 1. Abra o aplicativo Windows

1. Abra o [pacote Windows](https://github.com/Tiger14n/RVC-GUI/releases/tag/Windows-pkg). Baixe o ativo empacotado da versão e extraia o conteúdo para uma pasta gravável. Mantenha o tempo de execução e os ativos do modelo no layout extraído.
2. Abra o iniciador incluído. Uma verificação de origem pode ser iniciada com `RVC-GUI.bat` no Windows ou `python rvcgui.py` assim que o tempo de execução estiver configurado. A fonte arquivada espera um ambiente Python e PyTorch compatível, além de `hubert_base.pt` na raiz do projeto. Use um ambiente separado se estiver testando a origem para que outras instalações RVC mantenham suas dependências.
3. Se o aplicativo empacotado fechar imediatamente, execute seu inicializador em um terminal aberto e leia o primeiro erro. Um arquivo que contém apenas arquivos de origem não terá o tempo de execução empacotado. Se o erro nomear HuBERT em uma instalação de origem, coloque os [pesos HuBERT](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt) do projeto na raiz do projeto.

> Os checkpoints HuBERT genéricos são desaconselhados como codificador predefinido para conversão de voz. Foram treinados para representar a fala e podem preservar informação sobre o timbre da voz original no áudio convertido. Usa o codificador esperado pelo modelo RVC, como o ContentVec se o modelo tiver sido treinado com ele.

## 2. Adicione uma voz

Clique em **Importar modelo de .zip** e selecione um ZIP contendo uma inferência `.pth` e sua correspondência `.index`, se fornecida. Para posicionamento manual, coloque os arquivos em uma subpasta por voz no diretório `models` do aplicativo. Por exemplo:

```text
models/
  MyVoice/
    MyVoice.pth
    MyVoice.index
```

Selecione a voz importada na GUI. Se estiver ausente, reabra a lista de modelos ou reinicie o aplicativo após verificar a pasta. Use um modelo de inferência compatível com a compilação arquivada. Um modelo criado com um codificador ou arquitetura que o build não pode carregar deve ser testado em um aplicativo compatível.

## 3. Converter um clipe de linha de base

1. Em **Arquivo de áudio de entrada**, clique em **Procurar** e selecione uma gravação vocal curta e seca com uma vogal claramente expressa e uma consoante. Use um arquivo WAV completo como linha de base; separe primeiro uma haste vocal se a fonte for uma música completa.
2. Selecione a voz nos controles do modelo. Se o seu modelo tiver vários slots de alto-falantes compatíveis, escolha o slot documentado; caso contrário, use o padrão.
3. Deixe **Pitch** em zero e defina **Taxa de recuperação de recursos** como zero para a linha de base. Deixe **Método F0** como padrão para este teste.
4. Clique em **Converter** uma vez e aguarde **Caminho de saída** para mostrar o arquivo gerado. Clique em **Abrir** para reproduzi-lo e compará-lo com o original em um volume semelhante. Copie o arquivo gerado para um nome distinto se quiser mantê-lo para comparação. Compare a mesma frase antes de fazer outro ajuste.
5. Se você quiser um caractere de destino mais forte e tiver o índice correspondente, tente uma pequena combinação de recuperação. Se as palavras ficarem menos claras, volte à linha de base.

## Problemas comuns

| O que acontece | O que verificar |
| --- | --- |
| Importe relatórios com pesos ausentes | Abra o arquivo e confirme se ele contém uma inferência `.pth` em vez de apenas áudio, documentação ou um ponto de verificação de treinamento. |
| Nenhum modelo aparece | Verifique o layout da pasta extraída e certifique-se de ter aberto o aplicativo na mesma instalação. |
| Voz errada ou saída metálica | Verifique o ponto de verificação selecionado, o codificador compatível, o índice opcional e a gravação da fonte. Use um clipe não processado com a recuperação desativada. |
| A conversão do arquivo parece parar. | Teste um WAV local curto e inspecione o console. Verifique o primeiro erro antes de tentar novamente uma renderização longa. |
| O desempenho é ruim | Verifique qual dispositivo a compilação PyTorch instalada usa. Para plataformas mais antigas ou recursos de modelos mais recentes, consulte [Comparação de ferramentas RVC](../../reference/tools.md). |
