---
label: "Gere fala a partir de texto"
icon: ":speech_balloon:"
order: 92
permalink: /ilaria-rvc/applio/tts/
description: "Applio usa uma voz Edge TTS online para ler seu texto e um modelo RVC para alterar a voz gerada. A voz de origem determina a pronúncia, o ritmo e o idioma que ela lê."
---
# Transforme um script curto em fala convertida

Applio usa uma voz Edge TTS online para ler seu texto e um modelo RVC para alterar a voz gerada. A voz de origem determina a pronúncia, o ritmo e o idioma que ela lê. Use um texto que você se sinta confortável em enviar para o serviço de síntese online.

1. Abra a área de trabalho de conversão de texto em fala depois que o mecanismo estiver pronto e o [modelo de voz funcionar](inference.md).
2. Insira uma frase curta com pontuação. Escolha uma voz TTS de origem para o idioma dessa frase. Comece com sua velocidade normal de fala.
3. Selecione sua voz de inferência RVC, o incorporador correspondente e seu índice, se você usar um. Comece com mudança de tom em 0 e efeitos desligados.
4. Gere fala e ouça a saída. Se sua interface disponibilizar a fonte sintetizada, reproduza-a também. Se a fonte interpretar mal um acrônimo ou fizer uma pausa estranha, altere a pontuação, soletre o acrônimo ou selecione outra voz de origem primeiro.
5. Quando a frase soar bem, salve o áudio e anote a voz de origem, velocidade de fala, modelo RVC, incorporador e tom. Para scripts mais longos, use seções pequenas com pontos de interrupção naturais e mantenha suas configurações consistentes.

Se a etapa de geração de fala falhar, teste uma voz de origem diferente e verifique a conexão do mecanismo com o serviço de fala. Se a geração de fala for bem-sucedida e apenas a conversão falhar, execute um arquivo curto gravado por meio do mesmo modelo RVC. Esse teste expõe problemas de modelo ou incorporador sem alterar o script.
