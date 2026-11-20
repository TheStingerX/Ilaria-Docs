---
label: "📦 Modelos e arquivos RVC"
order: 93
permalink: /models/
description: "Um modelo RVC muda o timbre de uma voz existente. As palavras, o ritmo e as pausas vêm da gravação original. Começa com uma voz isolada, sem música nem efeitos."
---
# Modelos e arquivos RVC

Um modelo RVC muda o timbre de uma voz existente. As palavras, o ritmo e as pausas vêm da gravação original. Começa com uma voz isolada, sem música nem efeitos.

## Para que servem os ficheiros

| Ficheiro | Utilização |
| --- | --- |
| `.pth` de inferência | Pesos do modelo que deves selecionar no conversor. |
| `.index` correspondente | Índice de pesquisa opcional. Podes converter sem ele. |
| `.zip` | Arquivo que podes importar se a aplicação o suportar ou extrair primeiro. |
| `G_*.pth` e `D_*.pth` | Pontos de gravação que podem servir para retomar o treino. Para converter, usa a exportação de inferência. |

## Que ficheiro de índice devo usar?

No RVC WebUI (Mainline - Original RVC), `trained_*.index` é o índice FAISS treinado antes da adição dos vetores. `added_*.index` contém os vetores disponíveis para pesquisa. Se tiveres ambos, escolhe o `added_*.index` correspondente. Se só tiveres `trained_*.index`, desliga a pesquisa ou gera o índice completo. Os nomes podem variar entre aplicações.

Um `.index` distribuído com o modelo exportado muito provavelmente já contém os vetores, mesmo sem o prefixo `added_`. O nome por si só não o garante.

## Para que servem as pastas de treino?

Estas pastas costumam estar em `logs/<experiência>/`. Para converter, usa o `.pth` de inferência exportado e, se quiseres, o índice correspondente com os vetores.

| Pasta | Conteúdo |
| --- | --- |
| `0_gt_wavs` | Segmentos pré-processados à taxa de amostragem da experiência. |
| `1_16k_wavs` | Cópias dos segmentos a 16 kHz para extração de características. |
| `2a_f0` | Altura fundamental representada por valores discretos. |
| `2b-f0nsf` | Frequência fundamental contínua em hertz. |
| `3_feature768` | Vetores de 768 dimensões no RVC v2, usados no treino e no índice. |
| `eval` | Resultados da avaliação, como eventos do TensorBoard, consoante a aplicação. |

## Escolher um modelo

Ouve demonstrações semelhantes à tua gravação. Para fala, presta atenção às consoantes e às palavras mais baixas. Para canto, avalia notas longas e os extremos do registo. Confirma o motor compatível, a versão e as condições de utilização. Testa cada idioma de que precisas separadamente.

## Importar e organizar os modelos

Descarrega os ficheiros de uma fonte em que confias. Guarda cada versão numa pasta com o índice correspondente e as notas. No Ilaria RVC, abre **Other → Import Local Models** e importa o `.pth` de inferência ou um ZIP suportado. Junta o `.index` correspondente, se o tiveres.

## Fazer uma primeira conversão

1. Grava cerca de dez segundos de uma única voz sem música nem efeitos.
2. Converte com zero semitons e com a pesquisa no índice desligada. Guarda o WAV como referência.
3. Ajusta o tom em pequenos passos se o registo soar forçado. Depois experimenta um valor baixo de pesquisa com o índice correto.
4. Compara o mesmo excerto ao mesmo volume e ouve as consoantes e as respirações.

## Resolver problemas

Se o modelo não carregar, confirma o motor e o tipo de ficheiro. Se ainda reconheceres muito do timbre original, compara com outro modelo. O problema pode vir do treino ou do codificador, incluindo algumas variantes do HuBERT. Se as consoantes continuarem metálicas em várias gravações limpas, poderá ser necessário voltar a treinar. Se as falhas ocorrerem apenas em tempo real, verifica o encaminhamento do áudio e o buffer.

## Guardar uma configuração de referência

Anota a versão da aplicação e do modelo, a transposição e o valor de pesquisa. Guarda um excerto curto para comparares depois de uma atualização.

## Continuar com os guias

- [Guias por aplicação](../other-rvcs/app-guides.md)
- [Biblioteca de modelos do Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inferência](../ilaria-rvc/convert/inference.md)
- [Preparação dos dados](../model-training/dataset-preparation.md)
- [Resolução de problemas](../reference/troubleshooting.md)
