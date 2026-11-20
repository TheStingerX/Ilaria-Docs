---
label: "Texto para fala"
icon: ":speech_balloon:"
order: 96
permalink: /ilaria-rvc/tts/
description: "Use Inferência → TTS para transformar texto escrito em uma gravação. Você pode ouvir a fala gerada diretamente ou convertê-la com um modelo RVC."
---
# Texto para fala

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Use **Inferência → TTS** para transformar texto escrito em uma gravação. Você pode ouvir a fala gerada diretamente ou convertê-la com um modelo RVC. Os dois estágios realizam trabalhos diferentes: o mecanismo de fala decide como o roteiro é pronunciado e o ritmo, enquanto o RVC altera o caráter da voz da gravação. Se um nome for pronunciado incorretamente no primeiro resultado, corrija o script ou a voz de origem antes de ajustar o RVC.

> **Novidades da versão 2.3.0** · O ElevenLabs passa a estar disponível na síntese de fala. Introduz a chave da API do ElevenLabs, escolhe uma voz e testa uma frase curta.

> **Novidades da versão 2.4.1** · Kokoro v1.0. Instala o Kokoro separadamente em **Inference → TTS → Kokoro (local)**. Ocupa cerca de 528 MB depois de instalado. Escolhe uma voz e testa uma frase curta. O Edge usa Internet, o Windows usa vozes instaladas e o ElevenLabs requer uma chave API.

## Escolha uma voz de origem

| Mecanismo | Quando escolher | O que verificar |
| --- | --- | --- |
| Microsoft Edge | Você deseja navegar pelas vozes online por idioma. | O serviço necessita de conexão com a internet e envia o texto para a Microsoft para síntese. Escolha uma voz que fale o idioma do roteiro. |
| Windows | Você deseja síntese offline na instalação local do Windows. | A lista depende das vozes de desktop suportadas instaladas naquele PC. Se a voz estiver faltando, verifique as configurações de fala do Windows e atualize a lista. |
| ElevenLabs | Queres usar uma voz da tua conta ElevenLabs. | Precisas de Internet e de uma chave da API ElevenLabs. O texto é enviado para a ElevenLabs para síntese. |
| Kokoro (local) | Queres gerar fala localmente com o Kokoro v1.0. | Instala o Kokoro no separador TTS. Ocupa cerca de 528 MB e inclui 54 vozes, entre elas Sara e Nicola em italiano. |

A voz fonte fala as palavras. **Modelo de Voz** é o modelo RVC que altera o timbre posteriormente. Por exemplo, comece com uma voz de origem italiana para uma escrita italiana e, em seguida, selecione o modelo RVC de destino separadamente. Um modelo de voz forte não adiciona distinções fonéticas ausentes na fonte.

## Faça uma primeira gravação

1. Abra **Inferência → TTS**. Digite uma frase curta ou importe um arquivo UTF-8 `.txt`. O campo de texto suporta até **10.000 caracteres**. Comece com um parágrafo antes de importar um script longo.
2. Escolha o mecanismo de fala. Filtre a lista por idioma, escolha uma voz de origem e use **Atualizar vozes** se a lista estiver desatualizada.
3. Deixe a taxa e o volume próximos aos padrões e deixe a conversão RVC desativada para o primeiro teste. Gere o discurso e ouça o resultado original.
4. Verifique nomes, pontuação e pausas. Se uma linha parecer apressada, divida a frase ou ajuste a velocidade. Se uma abreviatura for lida incorretamente, tente escrevê-la. Gere o mesmo pequeno trecho novamente e compare.
5. Guarde esta primeira versão boa como referência antes de alterar os controles do RVC.

## Converta a fala gerada

1. Escolha o **Modelo de voz** alvo acima do painel TTS. Use uma inferência `.pth` compatível com seu aplicativo. Sua correspondência `.index` é opcional.
2. Habilite **conversão RVC**. Comece com a afinação de conversão em **0 semitons**, o extrator de afinação padrão, **Index Ratio 0** e efeitos opcionais desativados. Use o codificador de conteúdo esperado pelo modelo de destino.
3. Execute a conversão e ouça os players originais e convertidos separadamente. Compare a mesma frase em um nível de reprodução semelhante. Use o controle de download do player convertido para salvar o WAV.
4. Se você tiver o índice correspondente, tente um pequeno aumento em **Index Ratio** e compare novamente. Mantenha-o em zero se você não usar um índice. Alterar a recuperação não pode corrigir uma palavra que o mecanismo TTS leu incorretamente.

## O que cada configuração muda

| Controle | O que muda | Primeiro ajuste para tentar |
| --- | --- | --- |
| Taxa de fala | A velocidade da voz de origem antes da conversão. | Diminua um pouco a velocidade se as sílabas estiverem juntas. Verifique o tempo antes de ajustar o tom. |
| Volume da fonte | O nível da fala gerada antes da conversão. | Mantenha a fonte limpa e em um nível útil. Compare arquivos com volume semelhante. |
| Afinação da fonte em Hz | Altera a afinação durante a síntese de borda quando suportada. | Deixe-o primeiro no padrão. Altere-o separadamente do tom RVC. |
| Pitch RVC em semitons | Transpõe a voz gerada durante a conversão. | Comece do zero e teste pequenos turnos. Verifique as palavras mais baixas e mais altas da amostra. |
| Extração de piche | Estima o contorno do tom do áudio gerado. | Compare os extratores somente se o tom convertido saltar ou oscilar. |
| Taxa de índice | Controla a intensidade com que a conversão usa o índice selecionado. | Comece do zero. Use um valor modesto apenas com o índice de correspondência exata. |
| Volume do player | Controla o volume de audição. | Use-o para comparar os níveis de reprodução. Use as configurações de conversão ou exportação se precisar alterar o arquivo resultante. |

## Prepare um roteiro mais longo.

Divida um roteiro longo nos limites do parágrafo ou da cena. Mantenha as mesmas configurações de voz, taxa, modelo de destino e conversão de origem em todas as seções. Salve as saídas com nomes ordenados como `01-intro.wav` e `02-main.wav`. Junte-se a eles em um editor de áudio e ouça cada limite. Combine pausas e volume antes de exportar o arquivo final.

Para scripts com mais de um idioma, teste uma frase curta em cada idioma antes de renderizar. Use vozes ou seções de origem separadas, se necessário. Alguns contrastes fonéticos podem permanecer difíceis após a conversão devido ao modelo de destino ou ao seu codificador de conteúdo.

## Solução de problemas

| O que você ouve ou vê | O que verificar |
| --- | --- |
| O Edge não produz fala | Verifique o acesso à Internet, atualize a lista de vozes e tente uma frase curta em texto simples com outra voz compatível. |
| A lista do Windows está vazia | Verifique quais vozes da área de trabalho estão instaladas e disponíveis para o aplicativo. A síntese offline depende do ambiente local do Windows. |
| A fonte e os clipes convertidos pronunciam incorretamente a mesma palavra. | Altere a voz de origem ou reescreva a palavra no script e, em seguida, gere novamente a fonte. |
| O original é claro, mas a conversão distorce consoantes ou salta o tom | Teste a mesma fonte com recuperação e efeitos desativados. Verifique o codificador e a extração de pitch. Se o mesmo modelo distorcer várias entradas limpas, inspecione os dados de treinamento e considere um novo treinamento. |
| A voz convertida ainda soa como a fonte. | Verifique o modelo e o codificador selecionados. Compare outro clipe limpo antes de aumentar a recuperação. |
| Nenhum resultado convertido aparece | Verifique se **Conversão RVC** está habilitada e se a voz selecionada é um modelo de inferência. Leia o primeiro erro no log. |

Para outras configurações de conversão, consulte [Controles de inferência](inference-buttons.md). Para diagnósticos, consulte [Solução de problemas](../../reference/troubleshooting.md).
