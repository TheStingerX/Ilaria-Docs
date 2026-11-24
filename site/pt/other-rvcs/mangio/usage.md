# Mangio RVC Fork · Utilização e resolução de problemas

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Versão consultada](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Software antigo · Desaconselhado
O ramo principal de **Mangio RVC Fork** está inativo há vários anos. O programa está desatualizado e é desaconselhado para novas instalações. [Guias por aplicação](../app-guides.md)
!!!

## Primeira conversão

Coloca o checkpoint de inferência em `weights` e atualiza a lista. Seleciona-o em Model Inference e indica o caminho de uma gravação curta apenas com voz. Começa com transposição 0. Se tiveres o índice correspondente, compara uma taxa de recuperação baixa com um teste a 0. Mantém o mesmo áudio e checkpoint.

## Extração de tom e modo híbrido

Começa por RMVPE quando disponível. Compara `mangio-crepe` e `mangio-crepe-tiny` no mesmo excerto. O passo aplica-se a estas variantes na inferência. Um passo menor aumenta a frequência da análise e pode alongar o processamento. Na CLI da tag, usa-se o sinal de mais, como em `hybrid[pm+crepe]`, e combina-se as estimativas por mediana. Compara com um único extrator. A documentação trata as opções CREPE ou híbridas no treino como experimentais.

[Instalação](installation.md)
