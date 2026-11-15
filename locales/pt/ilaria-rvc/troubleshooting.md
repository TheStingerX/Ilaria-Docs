---
label: "🛠️ Logs e recuperação"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Logs e recuperação

## Encontre o primeiro estágio de falha

Para problemas de inicialização, use `ILARIA_RVC_LOGS.bat` e anote o primeiro erro. Para uma falha de inferência, teste um WAV local curto com a recuperação desativada e confirme o modelo e o incorporador. Para falhas de treinamento, identifique se o pré-processamento, a extração de recursos ou o estágio de treinamento falharam antes de tentar novamente.

## Lidar com a pressão da memória

Fechar tarefas concorrentes da GPU, descarregar a voz de inferência e tentar novamente com um lote de treinamento menor ou cache do conjunto de dados desativado, se aplicável. Salve antes de reiniciar. Registre a versão do aplicativo, a GPU, a ação exata da falha e o primeiro erro antes de solicitar ajuda.
