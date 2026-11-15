---
label: "💿 Instale o Applio"
order: 97
permalink: /ilaria-rvc/applio/installation/
---
# Instale o Applio e verifique o mecanismo

O Applio possui duas interfaces. **Desktop** abre uma janela de aplicativo instalado e gerencia um ambiente de mecanismo na primeira inicialização. **Gradio** abre uma página da Web local e precisa do processo de inicialização para continuar funcionando. Essas etapas abrangem o Desktop e o pacote compilado do Windows Gradio. Escolha a interface mostrada nas instruções que deseja seguir.

## Desktop

1. Abra o [downloads oficiais do Desktop](https://github.com/IAHispano/Applio-App/releases/latest). Encontre **Ativos** e expanda a lista se o instalador necessário estiver oculto. Escolha o ativo para seu sistema operacional. Os arquivos de código-fonte são para desenvolvedores.
2. No Windows, execute o executável de configuração e escolha uma pasta na qual sua conta possa gravar. O aplicativo empacotado usa um diretório `data` ao lado de seu executável. No macOS, use a imagem de disco do seu processador, ARM64 para Apple Silicon ou x64 para Intel. No Linux, instale o pacote Debian disponível ou torne o AppImage executável e abra-o.
3. Inicie o aplicativo e revise os termos da primeira execução. Mantenha o aplicativo aberto enquanto ele configura o Python, instala os requisitos do mecanismo, busca ativos e verifica a instalação. Use **Instalar/Reparar** se sua compilação oferecer isso quando uma verificação falhar.
4. Quando a verificação for concluída, verifique o dispositivo de computação detectado na configuração. Registre o back-end e o hardware relatados pelo aplicativo. Uma máquina com mais de uma GPU pode reportar um dispositivo diferente daquele que você esperava.
5. Abra **Modelos**. Se ele abrir e o mecanismo estiver pronto, continue para [instalar uma voz](models.md). Execute a [conversão curta](inference.md) antes de tentar o modo ao vivo ou treinamento.

Você pode instalar um pacote oficial do Desktop sem Node.js ou pnpm. Essas ferramentas servem para construir o aplicativo a partir do código-fonte.

## Gradio no Windows

1. Baixe um pacote do Windows em [downloads compilados do Gradio](https://huggingface.co/IAHispano/Applio/tree/main/Compiled/Windows).
2. Extraia o ZIP completo para um caminho simples de sua propriedade, por exemplo `C:\Applio-Gradio`. Abra essa pasta no Explorer. Se você vir uma segunda pasta contendo o inicializador, abra-a.
3. Execute `run-applio.bat` da pasta extraída. Se um console abrir, deixe-o em execução. Espere que ele imprima um endereço local e abra esse endereço exato em seu navegador.
4. Encontre **Modelos** ou **Download**, dependendo do lançamento. Em seguida, abra **Converter Áudio** ou **Inferência**. Se o navegador perder a conexão, verifique se o inicializador ainda está em execução antes de reabrir a página.

## Se a configuração parar

| O que você vê | Primeira coisa a verificar |
| --- | --- |
| Nada abre do ZIP | Extraia todos os arquivos antes de executar o inicializador. |
| Falha na etapa de download ou verificação. | Leia o erro mais antigo no log de configuração. Verifique a conectividade, o espaço em disco disponível e o acesso de gravação antes de tentar novamente a etapa com falha. |
| Gradio para antes de exibir um endereço | Leia o console acima da última linha para o primeiro erro relevante. O navegador não pode se conectar até que o serviço seja iniciado. |
| Arquivos de áudio não abrem ou exportam | Verifique a verificação do mecanismo e o status do FFmpeg. Teste com um WAV local que você pode reproduzir em outro aplicativo. |
| A conversão do arquivo é iniciada, mas fica sem memória | Feche os trabalhos concorrentes e teste alguns segundos de áudio com os efeitos desativados. Experimente um dispositivo compatível com sua versão. |

Antes de instalar uma nova versão ou mover pastas, salve seu áudio de trabalho e faça backup de modelos personalizados, índices, conjuntos de dados e experimentos de treinamento completos. Após a atualização, use a mesma gravação curta e voz para confirmar se o novo mecanismo produz um resultado utilizável.
