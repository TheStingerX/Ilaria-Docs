---
label: "🎛️ Processamento e exportação"
order: 89
permalink: /ilaria-rvc/advanced-inference/
---
# Processamento e exportação

## Estabeleça uma predefinição

Abra **Configurações de inferência** para Único ou Lote. Escolha o modelo e marque **Speaker ID** para um ponto de verificação de vários alto-falantes. Zero é o slot usual para uma única voz. Deixe o tom em zero, a recuperação em zero e o processamento desativado para uma primeira referência. Um índice carregado não tem efeito de recuperação em zero. Ative uma opção de cada vez e reproduza a mesma frase fonte.

 | Controle | Onde atua | O que ouvir |
| --- | --- | --- |
 | Áudio dividido | Encontra locais silenciosos para dividir uma gravação preservando o tempo. | Verifique junções, finais de palavras, respirações e lacunas. |
 | Autotune | Move F0 sonoro em direção às notas cromáticas próximas. Usa orientação de pitch. | Compare notas expostas e vibrato. |
 | Argumento proposto | Usa uma frequência alvo e o tom sonoro mediano da fonte para estimar uma mudança limitada. | Teste os limites máximos e mínimos do desempenho antes de uma corrida completa. |
 | Mudança de formante | Altera a ressonância vocal antes da conversão. Uma proporção de 1 mantém a linha de base. | Compare vogais no mesmo tom e nível de audição. |
 | Áudio Limpo | Aplica redução de ruído após a conversão. | Ouça caudas aquosas ou consoantes perdidas. |
 | Pós-processamento | Aplica efeitos selecionados à saída convertida. Controles de exposição Gain, Pitch Shift e Limiter. | Compare o nível correspondente com os efeitos desativados. Mantenha uma exportação seca para edição posterior. |

A seção de inferência **Pós-processamento** aplica efeitos ao áudio convertido. Os **Dados de Processo** do treinamento têm seu próprio ajuste de nível por fatia.

## Argumento e extração de conteúdo

RMVPE é o estimador de pitch de linha de base. FCPE, Swift, Beatrice e Ofidioglota estão disponíveis onde a operação selecionada os suporta. Compare métodos de pitch em um teste A/B restrito. O método pitch estima F0, enquanto o [embedder](embedders.md) extrai recursos que devem se ajustar ao modelo.

## Exportar e comparar

Selecione WAV ou FLAC para edição e arquivamento de cópias. MP3, OGG e M4A são opções de distribuição menores. O reprodutor de saída baixa o formato selecionado. O lote também grava arquivos no diretório de saída escolhido. Verifique a primeira saída e seu nome antes de processar muitas entradas.

O reprodutor de forma de onda suporta reprodução e busca, incluindo saltos de teclas de seta quando focado. Entradas muito longas, grandes ou sem suporte podem usar o player padrão do navegador. Para uma comparação A/B útil, combine volumes e ouça carimbos de data/hora idênticos.
