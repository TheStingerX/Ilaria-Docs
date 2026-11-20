---
label: "Logs e recuperação"
icon: ":hammer_and_wrench:"
order: 92
permalink: /ilaria-rvc/troubleshooting/
description: "Comece com Pitch 0, um WAV curto e seco e um modelo em bom estado. Altere uma configuração por teste. Consulte Controles de inferência para efeitos e..."
---
# Logs e recuperação

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

> **RMVPE · 2.4.2** · Corrige a inferência de RMVPE quando o cuDNN rejeita uma operação GRU. O RMVPE usa uma entrada contígua e volta a executar essa GRU na CPU se o cuDNN devolver `CUDNN_STATUS_NOT_SUPPORTED`. Requer a versão 2.4.0 ou posterior. Instala a 2.4.2 em **Other → Update Ilaria RVC**.

## O aplicativo fecha ou o navegador fica em branco

1. Execute `RUN_ILARIA_RVC_LOGS.bat` da pasta totalmente extraída. Deixe o console aberto e leia o primeiro erro, incluindo o arquivo ou dispositivo que ele nomeia.
2. Se o console mostrar que o servidor local está rodando, abra o endereço ali impresso. O padrão é `http://127.0.0.1:6969`. Se a porta estiver ocupada, verifique se há uma instância existente antes de iniciar uma segunda. Salve qualquer trabalho ativo antes de fechá-lo.
3. Verifique o modelo exato da GPU em **Gerenciador de Tarefas → Desempenho** e compare-o com [GPUs compatíveis](gpu-compatibility.md). O pacote do Windows inclui CUDA 12.8. Em um PC com apenas GPUs Maxwell, Pascal ou Volta NVIDIA, verifique `cu126-runtime-install.log` para ver o progresso enquanto o inicializador prepara o tempo de execução do CUDA 12.6. Uma falha no download exige a verificação do acesso à Internet e do espaço livre em disco.
4. Se faltar um arquivo após a extração, verifique se todo o arquivo foi extraído e se o atalho aponta para essa instalação. Faça backup de seus modelos, conjuntos de dados e pastas de experimentos antes de substituir os arquivos de instalação.

## O modelo está faltando ou o áudio soa errado

| Sintoma | Primeira verificação |
| --- | --- |
| Uma voz está faltando no **Modelo de voz** | Verifique o registro de importação e clique em **Atualizar**. Selecione uma exportação de inferência `.pth`. Um ponto de verificação de treinamento G ou D pertence ao experimento. |
| Um arquivo não consegue decodificar | Reproduza-o fora do aplicativo. Exporte um WAV PCM curto para uma pasta local gravável e teste essa cópia. |
| A conversão falha apenas com o índice | Defina **Index Ratio** como zero e tente sem um índice. Se funcionar, verifique se o opcional `.index` corresponde ao modelo e seu incorporador. |
| A voz ainda soa como a fonte | Confirme o modelo selecionado e seu incorporador esperado. Os codificadores HuBERT genéricos podem reter o timbre da fonte. Teste a mesma frase com a recuperação desativada antes de comparar as configurações. |
| As respirações ou consoantes são metálicas. | Teste vários clipes limpos com efeitos desativados. Se o mesmo modelo continuar distorcendo esses sons, inspecione os exemplos de respiração e consoantes nos dados de treinamento, corrija-os e treine novamente. |
| Um arquivo longo falha, mas um curto funciona. | Verifique a VRAM e tente **Split Audio** ou segmentos mais curtos. Ouça cada junção antes de exportar. |

Comece com **Pitch 0**, um WAV curto e seco e um modelo em bom estado. Altere uma configuração por teste. Consulte [Controles de inferência](../convert/inference-buttons.md) para efeitos e opções de exportação.

## O treinamento é interrompido ou não pode ser retomado

1. Verifique qual estágio falhou. Em **Dados do processo**, confirme se o caminho do conjunto de dados aponta para gravações legíveis e se a unidade de saída tem espaço. Em **Extração de recursos**, verifique se o pré-processamento foi concluído e se os recursos escolhidos de pitch e incorporador estão disponíveis.
2. Se **Train Pth** ficar sem VRAM, descarregue o modelo de inferência, feche trabalhos de GPU concorrentes, reduza o **Tamanho do lote** e desative o cache do conjunto de dados da GPU, se ativado. Verifique **Registro de treinamento** para obter as configurações efetivas antes de tentar novamente.
3. Se **Train Index** falhar, verifique se os recursos extraídos pertencem ao experimento selecionado. Um índice é opcional para conversão. Você pode testar uma exportação de inferência funcional em **Index Ratio 0** enquanto diagnostica o índice.
4. Para interromper o treinamento, clique em **Parar e salvar** e aguarde a confirmação. Para retomar, use o mesmo nome do experimento e configurações compatíveis. Mantenha os pontos de verificação G/D e o estado do experimento juntos. Uma exportação de inferência por si só não pode retomar o treinamento.
5. Se você alterou a taxa de amostragem, vocoder ou incorporador, crie um experimento separado e prepare recursos para essa configuração. Mantenha a execução original disponível para comparação.

## Recuperar uma sessão Kaggle

Se o link do navegador parar de funcionar, verifique se a sessão Kaggle ainda está em execução. Após reabrir os serviços, utilize os novos links e as credenciais atuais mostradas para cada serviço. WebUI e FileBrowser possuem logins separados. Exporte e baixe seus resultados antes de reiniciar a sessão. Siga o [guia Kaggle](../cloud/kaggle.md) para as etapas de backup.

## Colete detalhes para um relatório

Copie a versão do aplicativo, GPU exata e primeiro erro. Inclua o botão que você pressionou e uma pequena sequência que reproduz o problema. Para treinamento, inclua o estágio com falha, a taxa de amostragem, o incorporador e se você retomou uma execução. Para conversão, mencione se o mesmo clipe funcionou com outro modelo ou com a recuperação desativada. Se disponível, use **Painel de treinamento → Relatório de diagnóstico**. Revise o relatório antes de compartilhar e remova caminhos privados, senhas e links de sessão.
