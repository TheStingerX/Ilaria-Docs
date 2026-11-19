---
label: "Fila, dashboard e alertas"
icon: ":bar_chart:"
order: 86
permalink: /ilaria-rvc/queue-and-dashboard/
---
# Fila, dashboard e alertas

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Colocar vários experimentos na fila

Configure o experimento em Treinamento, confirme seu conjunto de dados e nome do modelo e adicione-o à **Fila de Treinamento**. Use nomes distintos para configurações distintas. Revise as entradas salvas antes de começar e verifique o trabalho atual e seu estágio. A fila persiste entre sessões. Pause ou retome seus controles e inspecione os trabalhos com falha antes de tentar novamente. Corrija caminhos de conjuntos de dados ausentes e configurações incompatíveis antes de reenviar.

## Siga um trabalho em execução

O **Painel de treinamento** mostra a duração do período, atualizações cumulativas, passos por segundo, gráficos e uma mensagem de status. Enquanto um modelo está em treinamento, o painel segue métricas em tempo real. Quando estiver ocioso, escolha um nome de modelo existente para revisar suas métricas salvas. Use o log de tarefas para identificar a primeira falha. Os contadores são úteis para cronometragem e progresso. Julgue o som de [visualizações de treinamento](training-workflow.md) do mesmo clipe estendido.

## TensorBoard e diagnósticos

Use os controles Iniciar e Parar do painel TensorBoard. O painel 2.1.0 aguarda eventos escalares utilizáveis ​​antes de mostrá-los. Verifique o experimento selecionado e o status do painel se os gráficos estiverem vazios. As curvas de perda podem ajudar a detectar uma corrida estagnada. Eles não conseguem avaliar o quão natural as vozes soam.

Abra **PC Training Advisor** em Outros, selecione a taxa, a precisão e a GPU pretendida e execute a verificação. Experimente as configurações sugeridas em um trabalho pequeno antes de um experimento longo. O **Relatório de diagnóstico** inclui SO, GPU, CUDA, disco e erros recentes de treinamento. Revise os relatórios para caminhos de arquivos pessoais antes de compartilhá-los.

## Notificações e paradas seguras

Use notificações opcionais na área de trabalho e sonoras para perceber a conclusão ou erros e, em seguida, confirme o estado final nos registros. Salve antes de reiniciar ou fechar a última aba. Com **Parar e salvar**, aguarde a confirmação e preserve o par G/D e o estado do experimento antes de mover ou reiniciar a execução.
