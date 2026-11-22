---
label: "📦 Modelos e arquivos RVC"
order: 93
permalink: /models/
description: "Um modelo RVC altera o timbre de uma performance existente. A gravação de origem continua fornecendo as palavras, o fraseado e o ritmo."
---
# Modelos e arquivos RVC

Um modelo RVC altera o timbre de uma performance existente. A gravação de origem continua fornecendo as palavras, o fraseado e o ritmo. Você precisa de um modelo de inferência compatível e de uma gravação ou sinal de microfone. Comece com uma única voz isolada para conseguir ouvir o que o modelo está fazendo.

## O que os arquivos fazem

| Arquivo | O que contém | O que fazer |
| --- | --- | --- |
| `.pth` de inferência | Os pesos do modelo usados na conversão. | Carregue-o no seletor de modelos. |
| `.index` correspondente | Recursos que o aplicativo pode recuperar durante a conversão. | Adicione se disponível. Você pode converter sem ele. |
| `.zip` | Um arquivo compactado que pode conter o modelo, o índice e um README. | Use a importação ZIP se o app suportar o arquivo, ou extraia e selecione os arquivos individualmente. |
| Checkpoints de treino, como `G_*.pth` e `D_*.pth` | Arquivos intermediários usados para retomar o treino, dependendo do aplicativo. | Use o modelo de inferência exportado no conversor. A extensão `.pth` sozinha não identifica o papel do arquivo. |

## Qual índice devo usar?

No treinamento do RVC WebUI (Mainline - RVC original), `trained_*.index` é o índice FAISS depois que ele aprendeu a organizar recursos, antes de os vetores de características serem adicionados. `added_*.index` é a versão populada. Para conversão, escolha o `added_*.index` correspondente se ambos existirem. Se você tiver apenas `trained_*.index`, mantenha a recuperação (retrieval) desligada ou gere o índice populado a partir do experimento. Outros aplicativos podem usar nomes diferentes.

Um `.index` enviado junto com um modelo exportado muito provavelmente já está populado, mesmo que o nome do arquivo não tenha o prefixo `added_`. O nome sozinho não confirma o conteúdo.

## O que são as pastas de treinamento?

Essas pastas costumam aparecer dentro de `logs/<experiment>/`. São arquivos de trabalho para treinamento e avaliação. Uma voz finalizada precisa apenas do `.pth` de inferência exportado e, opcionalmente, do índice populado correspondente.

| Pasta | O que contém |
| --- | --- |
| `0_gt_wavs` | Clipes de voz pré-processados na taxa de amostragem do experimento. São usados como alvos de áudio durante o treino. |
| `1_16k_wavs` | Cópias em 16 kHz dos clipes usadas para extração de características. |
| `2a_f0` | Tom extraído salvo como valores discretos para modelos condicionados por tom. |
| `2b-f0nsf` | Tom contínuo em hertz para modelos condicionados por tom. |
| `3_feature768` | Vetores de características por clipe com 768 dimensões no layout RVC v2. Esses recursos são usados no treino e também podem popular o índice de recuperação. |
| `eval` | Saída de avaliação, como arquivos de eventos do TensorBoard se a compilação gravar ali. O conteúdo depende do treinador. |

## Escolha um modelo para a tarefa

Ouça demos parecidas com a sua entrada pretendida. Para fala, observe consoantes, palavras baixas e pausas naturais. Para canto, confira notas sustentadas e os extremos agudo e grave da sua extensão. Se pretende usar ao vivo, teste falando livremente e variando o volume. Confira o motor e a versão do modelo documentados, limitações conhecidas de idioma e termos de uso. Um modelo que soa bem em um idioma pode soar irregular em outro, mesmo quando o dataset de treino inclui ambos.

## Importe e organize seus modelos

1. Baixe de uma fonte confiável e leia as notas incluídas. Arquivos de modelo podem ser inseguros quando carregados por softwares que desserializam objetos arbitrários.
2. Guarde cada voz e versão na própria pasta, com o `.pth` exportado, o `.index` opcional e quaisquer notas. Nomes de arquivos sozinhos não bastam para associar um índice a um modelo.
3. No Ilaria RVC, abra **Other → Import Local Models**. Escolha o `.pth` de inferência ou um ZIP compatível, depois adicione o `.index` correspondente se tiver. Outros apps podem pedir para atualizar a lista de modelos após importar.

## Faça uma primeira conversão

1. Grave cerca de dez segundos de uma única voz em sala silenciosa, sem música, reverberação pesada ou clipping.
2. Selecione o modelo desejado, deixe a recuperação de índice desligada e comece com deslocamento de tom zero. Salve o WAV convertido como referência.
3. Se o registro soar forçado, compare pequenas mudanças de tom em semitons usando a mesma entrada. O deslocamento de tom muda o registro, então avalie-o separadamente da identidade vocal.
4. Assim que o tom estiver ajustado, teste um pequeno aumento na recuperação com o índice correspondente. Ouça se o caráter da voz fica mais claro e depois confira se respirações ou consoantes ficam ásperas. Mantenha o ajuste que soar melhor, inclusive zero.

## Diagnosticar problemas comuns

| Sintoma | O que verificar |
| --- | --- |
| O aplicativo não consegue carregar o modelo | Confirme o motor, a versão e o tipo de arquivo. Extraia o ZIP se o importador rejeitar e depois selecione os pesos de inferência exportados. |
| O resultado ainda soa como a fonte | Compare com outro modelo sabidamente bom usando o mesmo clipe. Timbre de origem persistente pode vir do modelo ou do embedder de treino, incluindo variantes HuBERT. Mais recuperação pode não resolver. |
| Respirações ou consoantes soam metálicas | Compare com a recuperação desligada. Se o problema persistir com entradas limpas e vários ajustes, pode estar no modelo e exigir novo treinamento. |
| Apenas a saída ao vivo engasga | Teste o mesmo modelo com um arquivo. Se a conversão de arquivo funcionar, verifique microfone, roteamento de áudio e buffer no app ao vivo. |

## Mantenha um modelo pronto para reutilizar

Salve a versão funcional do aplicativo, versão do modelo, tom selecionado e ajustes de recuperação com um curto clipe de referência. Teste novamente após trocar de aplicativo ou atualizar o modelo. Se você treina suas próprias vozes, guarde a exportação para inferência e os arquivos necessários para retomar o treino em pastas separadas.

## Continue com os guias

- [Guias de aplicativos](../other-rvcs/app-guides.md)
- [Biblioteca de modelos do Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inferência](../ilaria-rvc/convert/inference.md)
- [Preparação de dataset](../model-training/dataset-preparation.md)
- [Solução de problemas](../reference/troubleshooting.md)
