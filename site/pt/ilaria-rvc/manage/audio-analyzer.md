# Analisador de Áudio

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Abra **Outro → Analisador de Áudio**. Adicione até oito arquivos de áudio para comparar. Um conjunto útil contém a entrada original, uma conversão de linha de base e uma ou duas variantes feitas com uma configuração alterada.

 | Visualizar | Pergunta para responder |
| --- | --- |
 | Forma de onda | Onde estão os picos altos, passagens silenciosas ou junções abruptas? |
 | Espectrograma | Quais frequências estão presentes no momento em que um artefato é iniciado? |
 | Espectro médio | Alguma versão apresenta desequilíbrio de frequência persistente? |
 | Estimativa de afinação | O F0 convertido segue o contorno pretendido em passagens sonoras? |
 | Tabelas de nível e silêncio | Você está comparando volumes semelhantes e usando a mesma definição de silêncio? |

Escolha um intervalo de tempo e visualização do canal. Use a mesma janela FFT, escala de frequência e limite de silêncio nas comparações. Uma janela FFT maior melhora a resolução de frequência e suaviza eventos rápidos no tempo. Ouça a região selecionada no player antes de decidir se uma diferença visível é um problema.

Exporte CSV ou JSON para medições, ou um ZIP com gráficos para revisão posterior. Se você quiser diagnosticar um clipe de conjunto de dados com ruído, verifique primeiro a origem não processada e compare o mesmo intervalo na exportação. Quando os resultados do tom parecerem estranhos em respirações ou consoantes surdas, ouça o áudio antes de interpretar a estimativa.
