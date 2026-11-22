# Prepare um conjunto de dados de voz

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Cada clipe ensina ao modelo algo sobre sua voz alvo. Antes do treinamento, decida quais partes da voz você deseja que o modelo administre e, em seguida, mantenha gravações que demonstrem essas partes claramente. Comece com o material que você tem permissão para usar no treinamento e mantenha uma cópia separada dos arquivos originais.

## Escolha gravações para seu objetivo

 | Objetivo | O que coletar |
| --- | --- |
 | Discurso conversacional | Perguntas, afirmações, frases mais longas e respostas curtas com consoantes e vogais variadas. |
 | Discurso expressivo | Os estilos de entrega pretendidos em níveis calmo e enfático. Grave variações em diversas frases. |
 | Canto | Vogais sustentadas, mudanças de notas e exemplos próximos aos limites agudos e graves confortáveis ​​da extensão pretendida. |
 | Mais de um idioma | Exemplos claros de sons e frases que diferem entre idiomas, gravados pelo mesmo locutor. |

> O ContentVec pode limitar modelos multilingues. Mesmo com dados na língua desejada, o codificador pode perder distinções fonéticas. Reserva gravações de teste para cada língua e compara a pronúncia após um treino curto. Se os mesmos erros se repetirem em gravações limpas, documenta a limitação para essa língua. Alterar o codificador ou a configuração de treino não é uma solução fiável.

Um conjunto limpo e variado de gravações é um melhor ponto de partida do que uma coleção maior de frases repetidas ou áudio danificado. Não há duração que garanta um bom resultado. Audite o que as gravações cobrem antes de decidir se precisa de mais material.

## Planeje uma sessão de gravação expressiva

Uma gravação pode ser livre de ruído e ainda assim cobrir muito pouco da voz. Construa a sessão em torno do desempenho que você espera converter. Para narração, registre uma leitura clara com frases intencionais. Para conversas, inclua respostas espontâneas e mudanças de ritmo. Para cantar, colete a cappella seca no registro pretendido, com vogais sustentadas e transições entre notas. As falas por si só dão ao modelo pouca exposição aos sons do canto.

Grave você mesmo ou combine o modelo pretendido e seu uso com o artista antes de gravar. Para uma conversa remota, faça com que o palestrante capture seu próprio microfone localmente e use apenas essa faixa.

 | Bloco de sessão | Exemplo de alocação | O que capturar |
| --- | --- | --- |
 | Narração expressiva | 10 minutos | Leia uma passagem com mudanças de ênfase, emoção e ritmo. |
 | Conversa | 10 minutos | Colete discursos improvisados ​​com perguntas, reações curtas e respostas mais longas. |
 | Cobertura fonética | 10 minutos | Use materiais como Harvard Sentences, Rainbow Passage ou Comma Gets a Cure para exercitar vogais, ditongos, plosivas como P/B/T/K e sibilantes como S/Z/SH. |
 | Faixa de atuação | 20 minutos | Grave a entrega que o modelo precisa, desde a fala suave até a projeção. Experimente ritmos e emoções variados e risadas ou suspiros claros quando relevante. Para um modelo multilíngue, inclua a cobertura intencional dos idiomas-alvo. |

Esse plano de 50 minutos é um exemplo de discurso expressivo. Um conjunto focado de dez minutos pode ser mais útil do que um conjunto maior de gravações repetitivas ou danificadas. Adicione material para preencher uma lacuna audível na cobertura. A duração do conjunto de dados por si só não determina o sobreajuste.

### Configure o microfone

Capture um único microfone em uma trilha mono. Use um filtro pop ou windscreen, mantenha a distância do microfone consistente e defina o ganho enquanto testa a linha planejada mais alta. Uma sala silenciosa com móveis suaves reduz os reflexos na fonte. Prefira um original seco a uma gravação muito limpa com reverberação audível ou artefatos de separação. Se estiver convertendo gravações estéreo existentes para mono, ouça ambos os canais e o fold-down. Use um canal limpo se o sinal combinado soar vazio ou perder detalhes.

### Verifique o áudio preparado

- **Taxa de amostragem:** Mantenha os originais na taxa de gravação. Escolha uma taxa de treinamento suportada pela arquitetura e pelos pesos pré-treinados. O estágio de pré-processamento pode reamostrar quando necessário. O upsampling não adiciona detalhes à gravação original.
- **Níveis:** Compare os níveis de sessão e corrija grandes diferenças de ganho causadas pelo posicionamento do microfone ou configurações de gravação. Preservar mudanças intencionais na entrega. Verifique o que o frontend de treinamento já normaliza antes de aplicar uma passagem de volume separada.
- **Respirações e reações:** Mantenha respirações naturais e sinais expressivos limpos onde servirem ao uso pretendido. Corte risadas cortadas, suspiros ásperos e explosões plosivas. Ouça edições incertas em fones de ouvido.
- **Pausas:** Mantenha pausas naturais e remova longos períodos vazios. Se você quiser testar um clipe de silêncio independente, faça uma comparação com as mesmas configurações e ouça as pausas prolongadas. Alguns pipelines de pré-processamento já lidam com o silêncio.

## Grave ou selecione material limpo

- Use um alto-falante para o primeiro modelo. Exclua vozes sobrepostas, respostas da multidão e diálogos em que o orador muda no meio do clipe.
- Ouça ruídos de ventiladores, ecos, música e distorção digital. Um clipe que soa aceitável em uma mixagem alta ainda pode conter problemas que são óbvios quando a voz está isolada.
- Se você estiver gravando uma nova sessão, use uma posição de microfone consistente e deixe o headroom máximo. Teste a frase mais alta antes de gravar a sessão completa.
- Ao combinar sessões, ouça-as lado a lado. Mantenha variações úteis na voz e descarte diferenças abruptas causadas por efeitos pesados, som ambiente ou microfone não confiável.
- Remova tomadas duplicadas se elas adicionarem pouca variedade. Reserve diferentes sessões ou passagens para avaliação antes de editar cortes adjacentes na pasta de treinamento.

## Limpe uma cópia de trabalho

1. **Isole a voz alvo.** Se a fonte incluir um acompanhamento, tente separar e ouvir a haste vocal resultante. Rejeite seções com sangramento de instrumento, backing vocals ou artefatos de separação óbvios.
2. **Faça cortes nos limites naturais.** Apare o ar morto longo e remova seções inutilizáveis. Ouça em cada corte consoantes perdidas, mudanças abruptas ou a entrada de um segundo locutor.
3. **Aplique apenas a limpeza necessária à gravação.** Compare qualquer passagem de remoção de ruído com a original. Se a versão limpa engolir consoantes, confundir as sílabas ou introduzir um som pulsante, reduza o processamento ou substitua a tomada.
4. **Verifique os níveis dos arquivos.** Mantenha espaço suficiente para passagens altas e equilibre as principais diferenças de nível de gravação. Diminuir o volume de um arquivo já cortado deixa os picos danificados na gravação.
5. **Exporte em um formato sem perdas que sua compilação possa ler.** WAV é um formato de trabalho prático. A recodificação de um arquivo compactado como WAV preserva o resultado dessa decodificação e não pode restaurar detalhes perdidos.

O mecanismo de treinamento pode dividir os arquivos em seus próprios segmentos e reamostrá-los para a configuração do modelo selecionado. Mantenha intactas as palavras e frases utilizáveis ​​durante a edição manual e deixe o estágio de pré-processamento do treinamento cuidar de sua própria segmentação.

## Organize o conjunto de dados e os testes de audição.

Mantenha entradas de comparação, gravações descartadas e resultados convertidos fora da pasta de treinamento. Este exemplo usa pastas separadas para originais, treinamento e avaliação.

```text
my-voice-project/
  originals/
  training-audio/
    session-a-01.wav
    session-a-02.wav
    session-b-01.wav
  evaluation/
    speech-test.wav
    expressive-test.wav
  notes.md
```

Pré-processamento de ponto em `training-audio/`. Mantenha `evaluation/` separado. Um conjunto de comparação útil pode incluir uma frase falada desconhecida com consoantes agudas, uma passagem tranquila e uma frase curta e expressiva. Para um modelo de canto, inclua uma nota sustentada e uma frase cruzando registros. Retenha passagens ou sessões inteiras quando puder, para que o áudio do teste não duplique clipes de treinamento próximos.

Se você treinar com uma interface que suporta mais de um alto-falante, siga a pasta do alto-falante e as regras de ID. Uma pasta de alto-falante único com arquivos de áudio diretamente dentro dela é mais fácil de auditar na primeira execução.

## Revise o conjunto de dados em Ilaria RVC

As compilações recentes do Ilaria RVC permitem arrastar áudio ou um ZIP de conjunto de dados para a interface de treinamento e gerenciar conjuntos de dados importados lá. Selecione o conjunto de dados pretendido e execute o **Dataset Checker**. Use suas breves visualizações para inspecionar arquivos sinalizados por silêncio, recorte, níveis inconsistentes ou problemas de decodificação. O **Analisador de Áudio** pode ajudar a comparar arquivos suspeitos usando formas de onda, pitch e medições de nível. Confirme o diagnóstico ouvindo antes de remover material que de outra forma seria útil. Os rótulos de disponibilidade e controle seguem a versão instalada.

 | O que você percebe | O que fazer antes do treino |
| --- | --- |
 | O arquivo não é decodificado | Verifique se ele é reproduzido em um editor. Exporte novamente do original, se possível, e verifique se a cópia é aberta. |
 | Seções de quase silêncio | Ouça o intervalo sinalizado e corte os vãos vazios. Mantenha pausas naturais que ajudem a preservar os limites das frases. |
 | Picos distorcidos ou achatados | Compare com a gravação original. Substitua uma tomada cortada de forma audível quando tiver uma alternativa limpa. |
 | Sons de fundo seguem o vocal | Ouça a haste isolada em fones de ouvido e exclua as partes afetadas quando a separação soar instável. |
 | Uma sessão é muito mais silenciosa. | Verifique se o desempenho do palestrante é intencionalmente silencioso. Ajuste as diferenças de ganho de gravação enquanto mantém a dinâmica natural útil. |

Antes de continuar, reproduza alguns clipes de cada sessão, confirme que selecionou a pasta preparada e grave a versão da pasta em suas anotações. Então [execute um experimento de treinamento](training.md).
