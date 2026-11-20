---
label: "Outros controles explicados"
icon: ":toolbox:"
order: 80
permalink: /ilaria-rvc/other-buttons/
description: "Use Outros para gerenciar arquivos, inspecionar ou combinar modelos, revisar áudio e manter o aplicativo. Comece decidindo se você precisa de um modelo de..."
---

# Todos os outros painéis explicados

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Use **Outros** para gerenciar arquivos, inspecionar ou combinar modelos, revisar áudio e manter o aplicativo. Comece decidindo se você precisa de um modelo de inferência, um codificador de conteúdo ou um par de treinamento G/D. Eles pertencem a diferentes partes do RVC.

## Obtenha modelos e recursos de treinamento

| Painel e controles | O que inserir e o que esperar |
| --- | --- |
| `Import local models` | Solte um .pth de inferência, seu .index correspondente opcional ou um ZIP compatível. Algumas compilações expõem um botão Importar arquivos de modelo. Verifique o log de importação antes de mudar para inferência e atualizar a lista de modelos. |
| `Download models from Hugging Face, Google Drive or MEGA` | Cole um link de modelo público, clique em Baixar e instalar modelo e aguarde o registro de download. Links de modelo e índice separados podem ser importados em operações separadas. |
| `Download embedders` | Escolha o codificador exato exigido por um modelo e clique em Baixar incorporador selecionado. Leia o status de download do Embedder antes de tentar selecioná-lo no Inference. |
| `Download pretrained models` | Forneça um repositório, ZIP compatível ou link gerador. Insira o link discriminador correspondente quando a descoberta automática não puder encontrá-lo. Clique em Baixar par pré-treinado e inspecione o log. |
| `Recommended pretraineds` | Escolha uma variante nomeada e uma taxa de amostragem e clique em Baixar pré-treinado selecionado (G + D). Verifique os requisitos de arquitetura, vocoder, pitch e codificador antes de selecioná-los no Treinamento. |

## Inspecione, mescle e compartilhe vozes

**Informações do modelo** permite selecionar uma voz, **Atualizar lista de modelos** e **Ler informações do modelo**. Leia o Log de inspeção para confirmar qual arquivo foi inspecionado. Expanda **Metadados e arquitetura salvos** para propriedades registradas e **Tensores armazenados** para detalhes de peso. Os metadados ausentes devem ser tratados como desconhecidos.

**Mesclar modelos** combina pesos de inferência compatíveis. Escolha **Modelo A** e **Modelo B** e clique em **Verificar compatibilidade do modelo** antes de salvar. **Contribuição do modelo A (%)** controla o equilíbrio de peso, então 70 dá a A uma contribuição de 70% na mistura, com o restante de B. **Taxa de amostragem** deve corresponder aos modelos; use Auto, se disponível. **Precisão de saída** define como os pesos gerados são armazenados. Insira um novo nome e notas opcionais, clique em **Mesclar e salvar modelo** e leia Merge Log. Teste a voz mesclada antes de decidir mantê-la. Comece com a recuperação desabilitada.

**Modelo de exportação ZIP** empacota a voz de inferência escolhida e um índice correspondente opcional. Use **Atualizar lista de modelos** se a voz estiver faltando, selecione **Modelo de voz** e opcionalmente **Índice** e clique em **Criar modelo ZIP**. Leia o Log de Exportação e baixe o arquivo mostrado em **Baixar modelo ZIP**. Abra o ZIP localmente e verifique os dois nomes de arquivo. Mantenha todo o experimento de treinamento separadamente se precisar de pontos de verificação retomáveis.

## Ferramentas de áudio e hardware

- **Analisador de Áudio** compara gravações usando exibições de forma de onda, espectrograma, pitch e nível. Selecione a mesma região na entrada e na saída e ouça. Combine a janela FFT, o canal e o limite de silêncio nas comparações. Use os controles de exportação disponíveis para salvar dados de análise ou gráficos. Consulte [Analisador de Áudio](audio-analyzer.md).
- **O consultor de treinamento de PC** usa **Taxa de amostragem para planejar**, **Precisão para avaliar** e **GPU para avaliar**. Clique em **Verificar PC e sugerir configurações** e revisar o PC Advisor Log. Trate as sugestões como ponto de partida e verifique o uso da memória durante um curto período.

## Atualizações e reinicialização

Em **Atualizar Ilaria RVC**, compare **Versão instalada** com a versão mostrada após **Verificar atualizações**. Leia **Registro de alterações da versão** e expanda **Todas as alterações até agora** para notas mais antigas. Quando **Baixar e reiniciar** for oferecido, conclua ou salve o trabalho ativo antes de usá-lo. Siga o **Registro de atualizações** até que o aplicativo seja reaberto. **Reiniciar Ilaria RVC** reinicia a instalação atual e **Recarregar status** relata essa operação. No Kaggle, use o fluxo de trabalho [salvar, parar e reiniciar](../cloud/kaggle.md) do notebook.
