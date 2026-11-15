---
label: "📦 Instale o VCClient"
order: 100
permalink: /ilaria-rvc/okada/installation/
---
# Instale o w-okada VCClient

O VCClient converte o áudio do microfone ao vivo. A interface é o **cliente** e o processo de conversão é o **servidor**. Para seu primeiro teste, execute ambos no mesmo computador. A versão do cliente (v1 ou v2) e a versão do modelo (RVC V1 ou V2) identificam coisas diferentes. Verifique o suporte do modelo do pacote antes de escolher um arquivo.

## Antes de baixar

1. Verifique seu sistema operacional e arquitetura do processador. No Windows, abra **Gerenciador de Tarefas → Desempenho** e leia o modelo da GPU. No Mac, abra **Sobre este Mac** e procure um chip Apple ou processador Intel.
2. Conecte seu microfone e fones de ouvido. Faça uma breve gravação no sistema operacional para verificar o microfone independentemente do VCClient.
3. Mantenha disponível um modelo de inferência RVC com funcionamento conhecido. Um `.pth` é um modelo PyTorch, enquanto um `.onnx` usa um tempo de execução ONNX. Use a correspondência opcional `.index` apenas com o modelo ao qual pertence. Consulte [Modelos e arquivos](../../start/models.md) se você recebeu um ZIP ou um conjunto de pontos de verificação de treinamento.

## Escolha um pacote

Abra [downloads do VCClient no Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Escolha um arquivo das versões w-okada que corresponda a esta tabela. O número da versão representa a parte variável do nome do arquivo.

| Seu computador | Pacote a ser procurado | O que verificar |
| --- | --- | --- |
| Windows com GPU NVIDIA compatível | v2 Windows CUDA, `vcclient_win_cuda_….zip` | Selecione a placa NVIDIA real no aplicativo. Use uma CPU ou compilação padrão se o tempo de execução instalado não puder usar sua GPU. |
| Windows com AMD ou configuração somente CPU | Padrão Windows v2, `vcclient_win_std_….zip` | Teste o dispositivo DirectML, se houver suporte. A conversão de CPU é uma opção, com velocidade determinada pelo modelo e processador. Verifique os fornecedores disponíveis antes de importar um modelo. |
| Windows com gráficos Intel | Um padrão compatível ou versão legada | Na configuração documentada do Windows v1, a aceleração de GPU AMD e Intel é para modelos ONNX. Selecione CPU se o seu pacote padrão não detectar um provedor de GPU utilizável para o seu modelo. |
| Apple Silicon Mac | v2 Mac, `vcclient_mac_….zip` | Verifique se o ativo é direcionado ao Apple Silicon. Teste com os formatos de provedor e modelo RVC listados por essa versão. |
| Linux | Distribuição de código-fonte e tempo de execução compatível | Fonte dedicada ou configuração de contêiner é separada dos binários do Windows e Mac. Combine CUDA, tempo de execução AMD compatível ou CPU com seu hardware. |

Para Windows v2, o projeto lista suporte para Torch e ONNX. Um determinado arquivo ainda pode usar um provedor diferente de outro arquivo na mesma compilação. Preserve o modelo original ao tentar um formato diferente. Renomear a extensão do nome do arquivo não o converte.

## Inicie no Windows

1. Extraia todo o ZIP para uma pasta gravável comum. Use uma pasta separada para cada compilação testada. Executar um inicializador de dentro do arquivo pode impedir que ele encontre seu tempo de execução.
2. Abra a pasta extraída e execute `start_http.bat` para uma configuração no mesmo computador. Mantenha seu console aberto. Se o pacote oferecer vários inicializadores, escolha aquele para o tempo de execução baixado e a conexão local.
3. Aguarde a inicialização e qualquer download de ativos na primeira execução. Abra o endereço local mostrado no console se a interface não abrir sozinha.
4. Verifique se você vê os slots do modelo e os controles para iniciar a conversão. Deixe a página da web e o console abertos para o [primeiro teste de microfone](live-audio.md).

## Inicie no Mac

1. Expanda o arquivo Apple Silicon e mantenha os arquivos agrupados juntos.
2. Abra o inicializador local do pacote (`startHttp.command` quando fornecido). Deixe a configuração terminar e abra o endereço informado pelo console, se necessário.
3. Quando o sistema perguntar se o navegador ou aplicativo pode usar o microfone, conceda acesso para o teste. Se a permissão foi negada anteriormente, altere-a em **Configurações do sistema → Privacidade e segurança → Microfone** e reabra o aplicativo.
4. Confirme se o servidor está funcionando antes de abrir uma segunda cópia. Fechar o servidor interrompe a conversão mesmo quando o navegador ainda está aberto.

## Se falhar antes de abrir

| O que você vê | O que verificar |
| --- | --- |
| O iniciador fecha imediatamente | Execute-o a partir de sua pasta totalmente extraída e leia o primeiro erro do console. Verifique novamente a arquitetura e a compatibilidade do tempo de execução. |
| O download da primeira execução permanece incompleto | Mantenha o processo aberto e verifique seu progresso e erros de rede. Tente novamente com o mesmo pacote oficial após o retorno da conectividade. |
| A página local apresenta erro de conexão. | Verifique se o servidor ainda está rodando e use o endereço impresso. A página do navegador não pode iniciar um servidor local parado. |
| O hardware NVIDIA está instalado, mas a CPU está ativa. | Verifique o nome do arquivo backend, o driver instalado e a GPU selecionada no VCClient. Teste o caminho da CPU separadamente para distinguir um problema de modelo de um problema de GPU. |
| O painel do modelo abre, mas a lista de microfones está vazia. | Verifique o medidor de entrada do sistema operacional e a permissão do site do navegador. Para o modo cliente, recarregue após conceder permissão. Para o modo servidor, atualize a lista de dispositivos do próprio servidor. |

Continue para [Áudio ao vivo, roteamento e solução de problemas](live-audio.md).
