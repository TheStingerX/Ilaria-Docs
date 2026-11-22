# Instale Vonovox

[GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox)

Vonovox é um conversor de voz ao vivo do Windows para GPUs NVIDIA compatíveis. Use este guia para fazer um teste de microfone local limpo antes de abrir o Discord, OBS ou um jogo.

> **Última versão beta disponível no repositório de downloads** · [Baixar Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Reúna os arquivos e dispositivos

- Abra o Windows **Gerenciador de Tarefas → Desempenho** e identifique a placa gráfica pelo nome. Use a [lista oficial de pacotes](https://huggingface.co/dr87/vonovox/tree/main) para resolver uma compilação ou patch específico de hardware, se necessário. Mantenha as compilações de trabalho mais antigas em suas próprias pastas.
- Prepare um ponto de verificação RVC V2 pronto para inferência e verifique qual incorporador o modelo espera. Um ponto de verificação de treinamento como `G_*.pth` serve para retomar o treinamento. Para a primeira execução, escolha um modelo com procedência conhecida e execute sem índice se a compilação oferecer.
- Conecte um microfone físico e fones de ouvido com fio. Feche outros programas que possam assumir o controle exclusivo dos dispositivos de áudio e confirme se o Windows pode gravar seu microfone bruto.

## 2. Inicie o aplicativo

1. Baixe o ZIP, use **Extrair tudo** e coloque o pacote inteiro em uma pasta local gravável, como `C:\VoiceTools\Vonovox`. Execute os lançadores da pasta extraída, com seus arquivos de suporte ao lado deles.
2. O pacote já está pré-compilado. Abre a pasta extraída e executa `start.bat`. Podes ignorar `setup.bat`.
3. Aguarde a interface. Se a janela fechar imediatamente, execute o mesmo iniciador em um prompt de comando aberto para que o último erro permaneça visível. Verifique se você extraiu o arquivo inteiro e se selecionou uma construção de GPU compatível.
4. Selecione o modelo RVC V2 na área do modelo. Escolha o incorporador esperado quando a IU o expor. Comece com controles de afinação e formante neutros, dimensionamento de bloco padrão e efeitos opcionais desativados.

## 3. Verifique o primeiro sinal

Escolha seu microfone físico como **Dispositivo de entrada** e um monitor de fone de ouvido adequado ou a extremidade de reprodução do seu cabo virtual como **Dispositivo de saída**. Se a UI expor o backend de áudio, comece com WASAPI e modo compartilhado. Pressione **Iniciar**, espere um momento e diga uma frase seguida de uma pausa. Você deverá ouvir a voz convertida, seguida de silêncio. Pressione **Parar** antes de trocar os dispositivos de áudio ou iniciar o próximo teste.

Se o modelo não carregar, verifique o RVC V2 e o incorporador antes de alterar as configurações de áudio. Se nenhuma voz for ouvida, confirme o microfone e os dispositivos de saída separadamente. Continue com [roteamento e ajuste do microfone](live-audio.md) assim que o modelo for iniciado.

## Lista de verificação da primeira execução

### Verifique a GPU antes de fazer download

1. No Windows, pressione **Ctrl + Shift + Esc** e abra **Desempenho**. Selecione cada entrada de GPU e leia seu nome. Em um laptop, você poderá ver gráficos integrados e uma GPU NVIDIA dedicada.
2. Combine a GPU dedicada com o pacote disponível no desenvolvedor. Use o link Beta 3 acima para essa versão. Se a lista de pacotes incluir uma compilação ou patch específico de hardware, verifique se ele se aplica ao seu arquivo antes de instalá-lo.
3. Deixe espaço para o ZIP e para a pasta extraída. Use uma pasta local na qual você possa gravar. Evite iniciar diretamente do ZIP ou copiar um inicializador de sua pasta.
4. Conecte seu microfone e fones de ouvido. Abra **Configurações → Sistema → Som → Entrada** e fale. Se o Windows não detectar um sinal aqui, corrija a permissão de entrada ou microfone antes de abrir o Vonovox.

### Verifique se a configuração foi realmente concluída

1. O pacote já está pré-compilado. Abre a pasta extraída e executa `start.bat`. Podes ignorar `setup.bat`.
2. Se a janela fechar imediatamente, abre a Linha de Comandos nessa pasta, executa `start.bat` e lê o primeiro erro.
3. Se a instalação relatar a ausência do tempo de execução da Microsoft, instale ou repare o tempo de execução do Visual C++ vinculado e tente novamente. Se relatar que o CUDA não pode inicializar, verifique o driver NVIDIA e crie a compatibilidade. Mantenha o pacote completo junto.
4. Se você estiver atualizando uma instalação funcional, extraia para uma nova pasta e mantenha a versão anterior disponível. Teste a nova versão antes de substituir uma configuração funcional conhecida.

### Carregue uma voz e verifique antes de abrir uma chamada

1. Descompacte o arquivo de voz, se necessário. Encontre a inferência `.pth`. Arquivos nomeados como `G_*.pth` ou `D_*.pth` normalmente são pontos de verificação de treinamento.
2. Escolha a voz RVC V2 e use o incorporador especificado pelo seu editor. Mantenha o tom neutro, os efeitos desligados e o buffer no padrão para o primeiro teste.
3. Selecione o microfone físico. Envie a saída para fones de ouvido para um teste direto, se compatível, ou use o cabo virtual e o monitoramento do Windows descrito em [Rotear e ajustar o Vonovox](live-audio.md).
4. Inicie o conversor e fale uma frase curta e depois faça uma pausa. A saída deverá ter seu tempo e palavras com o timbre da voz selecionada. Se você ouvir seu microfone comum ou silêncio, siga as verificações de roteamento antes de alterar o tom ou os efeitos.

| Sintoma | Verifique primeiro |
| --- | --- |
| Nenhum erro de GPU ou CUDA | Verifique se o pacote suporta sua GPU NVIDIA dedicada e se o Windows o vê. |
| Uma voz não carrega | Verifique a versão e o codificador do RVC. Teste uma exportação de inferência compatível antes de alterar as configurações de áudio. |
| Sem sinal de microfone | Teste o microfone físico no Windows e selecione novamente o mesmo dispositivo no Vonovox. |
| Bom som local, mas silêncio em uma chamada. | Analise as extremidades do cabo e a seleção do microfone de destino no guia de roteamento. |
| O áudio é interrompido apenas durante o jogo. | Teste com o jogo aberto e aumente o tamanho do bloco em um passo, se necessário. |

[Matriz interativa de compatibilidade RVC](../../reference/compatibility-matrix.md)
