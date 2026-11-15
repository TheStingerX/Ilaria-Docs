---
label: "📦 Instale o TG Developed Fork"
order: 100
permalink: /ilaria-rvc/tgr/installation/
---
# Instale o Okada TG Developed Fork

O TG Developed Fork (TGR) vem do ramo Deiteris da família w-okada. O editor documenta esta bifurcação como somente RVC. Possui seus próprios arquivos de lançamento, iniciadores e restrições de dispositivo. Mantenha-o em sua própria pasta para que uma instalação funcional do VCClient ou do Deiteris permaneça disponível para comparação.

## Baixe a versão que corresponde ao seu computador

Verifique **Gerenciador de Tarefas → Desempenho** no Windows ou **Sobre este Mac** no macOS. Leia o nome real da GPU ou do chip. No nome do arquivo de lançamento, `amd64` refere-se à arquitetura do processador usada pelos PCs Intel e AMD padrão de 64 bits.

| Configuração | Arquivo a ser procurado em [versões TGR](https://github.com/tg-develop/voice-changer/releases) |
| --- | --- |
| Windows com NVIDIA CUDA compatível | O `voice-changer-windows-amd64-cuda.zip` divide partes da mesma versão. |
| Windows com AMD, gráficos Intel suportados ou operação somente CPU | `voice-changer-windows-amd64-dml.zip`. Selecione CPU no aplicativo ao testar sem uma GPU utilizável. |
| Apple Silicon Mac | `voice-changer-macos-arm64-cpu.tar.gz` se incluído. O editor marca o suporte ao macOS como experimental. |
| Intel Mac | `voice-changer-macos-amd64-cpu.tar.gz` se incluído. A aceleração depende dos gráficos instalados e da construção. |
| Linux | Use os ativos de lançamento explicitamente rotulados para Linux quando disponíveis, ou a configuração de origem do fork. |

## Windows passo a passo

1. Na página de lançamentos, expanda **Ativos** para um lançamento. Baixe o DirectML ZIP ou cada parte CUDA. Um exemplo de divisão inclui `.001` e `.002`. As partes devem ficar lado a lado com seus nomes baixados.
2. Para CUDA, use uma ferramenta de arquivamento que suporte arquivos divididos e extraídos de `.001`. Ele lê as partes posteriores durante a extração. Para DirectML, extraia o ZIP único. Escolha uma pasta na qual você possa gravar e mantenha as pastas extraídas intactas.
3. Abra o pacote extraído, depois `MMVCServerSIO` e, em seguida, inicie `MMVCServerSIO.exe`.
4. Deixe a janela de inicialização aberta enquanto os pesos necessários são baixados. Quando o navegador abrir, mantenha esse console disponível para diagnóstico. Se a página não abrir automaticamente, use o endereço local impresso pelo servidor.
5. A primeira conversão CUDA pode demorar alguns segundos para iniciar. Aguarde o aquecimento antes de pressionar Iniciar repetidamente ou trocar de dispositivo.

## macOS ou Linux

No macOS, descompacte o arquivo da arquitetura exata do seu chip e abra o executável `MMVCServerSIO` incluído. Se o macOS bloquear a inicialização, confirme se o arquivo veio do lançamento oficial e examine o bloco antes de fazer alterações no sistema. Conceda acesso ao microfone ao navegador para captura do navegador ou ao aplicativo local quando ele abrir o microfone diretamente.

Para uma instalação de origem Linux, use o arquivo de origem do próprio fork e o ambiente Python 3.10 documentado. Abra um terminal na pasta `server` do repositório. O instalador é `vc_install.sh`; escolha o back-end que corresponde ao seu sistema quando solicitado. Use o script de inicialização incluído nessa versão e abra o endereço local impresso no terminal. Os nomes dos scripts diferem entre os instantâneos. Para identificar os pontos de entrada fornecidos, liste os arquivos na pasta `server` antes de executar um. Para um binário de lançamento, descompacte o pacote para sua arquitetura e inicie o executável incluído. O arquivo Windows DirectML é um tempo de execução separado.

## Isolar erros de inicialização

| Sintoma | Primeira verificação |
| --- | --- |
| A extração para em um arquivo ausente | Confirme se todas as partes CUDA estão presentes e são da mesma versão. Inicie a extração novamente a partir de `.001`. |
| Um peso falha na verificação | Leia o nome do arquivo no log de inicialização. Feche o processo, renomeie apenas a dependência baixada citada como backup e reinicie para tentar baixar novamente. Mantenha sua biblioteca de modelos de voz e arquivos de índice intactos. |
| O navegador mostra uma falha de conexão. | Verifique se o console do servidor reporta um endereço pronto. Inicie uma instância e mantenha-a aberta enquanto usa a página. |
| O DirectML é iniciado, mas a GPU está lenta ou ausente. | Confirme o nome da GPU selecionada e teste a CPU ou outro dispositivo compatível com o mesmo modelo. O projeto relata baixo desempenho em algumas configurações integradas da Intel. |
| Falha ao abrir o microfone | Verifique as permissões de entrada no sistema operacional e no navegador e repita em um navegador baseado em Chromium se o Firefox ESR não mostrar a lista de dispositivos. |

Quando a página carregar, continue para [Primeiro modelo, microfone e cabo virtual](live-audio.md).
