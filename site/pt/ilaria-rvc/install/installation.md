# Instalação e atualizações

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Instale o pacote do Windows

Baixe a versão NVIDIA suportada em [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Extraia todo o arquivo em uma pasta local gravável e execute `RUN_ILARIA_RVC.bat` lá. O inicializador e o tempo de execução incluído devem permanecer juntos. Se nenhuma aba do navegador abrir, tente `http://127.0.0.1:6969` no mesmo PC.

## Antes do primeiro lançamento

O ZIP completo do Windows tem cerca de 5,00 GB. Deixe espaço para o arquivo e para os arquivos extraídos. Extraia-o para uma nova pasta local onde você possa gravar arquivos. Mantenha o inicializador, o tempo de execução e os ativos juntos. ContentVec e RMVPE estão incluídos. Codificadores opcionais estão disponíveis em **Outros → Baixar incorporadores**.

## Qual tempo de execução CUDA Ilaria RVC usará?

Abra **Gerenciador de Tarefas → Desempenho → GPU** e leia o nome exato do modelo. Compare-o com a [tabela de compatibilidade de GPU](gpu-compatibility.md). A versão CUDA abaixo refere-se ao ambiente PyTorch que o aplicativo usa. O driver NVIDIA é um componente separado do sistema e deve oferecer suporte a esse ambiente.

| GPUs presentes no PC | Tempo de execução | O que esperar |
| --- | --- | --- |
| GeForce GTX 16 ou RTX 20, 30, 40 ou 50 | PyTorch 2.10.0 com CUDA 12.8 | O ZIP completo inclui este tempo de execução. Extraia-o e execute o inicializador. No RTX 50, o PyTorch já está incluído e pronto para uso com um driver NVIDIA compatível. |
| Somente NVIDIA Maxwell, Pascal ou Volta | PyTorch 2.10.0 com CUDA 12.6 | Na primeira inicialização, o inicializador baixa e verifica o tempo de execução mais antigo. Ele o mantém em `runtime-cu126` e o reutiliza em lançamentos posteriores. Deixe o inicializador aberto e permita acesso à Internet e espaço em disco. |
| Nenhuma GPU NVIDIA local adequada | GPU NVIDIA remota | [Ilaria RVC na cloud](../cloud/cloud.md) · [Kaggle](../cloud/kaggle.md) · [Google Colab](../cloud/colab.md) · [Lightning AI Studio](../cloud/lightning-ai.md) |

Se você tiver mais de uma GPU, leia o log do inicializador para ver qual tempo de execução realmente foi iniciado. O caminho CUDA 12.6 descrito acima se aplica quando todas as GPUs NVIDIA no PC são de famílias mais antigas.

## Verifique se o aplicativo foi iniciado corretamente

1. Execute `RUN_ILARIA_RVC.bat` da pasta extraída. Aguarde a interface abrir. Se o tempo de execução legado estiver sendo baixado, verifique `cu126-runtime-install.log` para ver o progresso.
2. Se a janela fechar ou a interface nunca abrir, execute `RUN_ILARIA_RVC_LOGS.bat` e inspecione o primeiro erro. Verifique se menciona GPU, driver, acesso ao download ou espaço livre em disco. Uma página do navegador em branco pode ser resultado de uma falha no inicializador.
3. Assim que a interface abrir, converta um WAV curto e limpo com um modelo de inferência compatível conhecido. Verifique o resultado antes de executar um lote grande ou iniciar o treinamento. Consulte [Inferência única e em lote](../convert/inference.md).

Os testes de computação e retropropagação e carregamento de ContentVec foram verificados em um RTX 4070. A compatibilidade com outras placas é esperada a partir de sua arquitetura e seleção de tempo de execução, e não foi garantida modelo por modelo.

## Atualizar para a 2.4.0

Descarrega o ZIP completo, extrai-o para uma pasta nova e executa `RUN_ILARIA_RVC.bat`.

Mantém a instalação anterior como cópia de segurança. Copia modelos para models/, dados para app/datasets/ e experiências completas para app/logs/. O atualizador da 2.3.0 usa a estrutura anterior.

[GPU compatíveis](gpu-compatibility.md)

### Atualizar a partir da 2.4.0

Instala e inicia primeiro a 2.4.0. Abre **Other → Update Ilaria RVC** e instala as atualizações incrementais até à **2.4.3** (`2.4.1 → 2.4.2 → 2.4.3`).
