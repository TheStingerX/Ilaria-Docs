---
label: "💿 Instale Vonovox"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Instale Vonovox

Vonovox é um conversor de voz ao vivo do Windows para GPUs NVIDIA compatíveis. Use este guia para fazer um teste de microfone local limpo antes de abrir o Discord, OBS ou um jogo.

> **Última versão beta disponível no repositório de downloads** · [Baixar Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Reúna os arquivos e dispositivos

- Abra o Windows **Gerenciador de Tarefas → Desempenho** e identifique a placa gráfica pelo nome. Use a [lista oficial de pacotes](https://huggingface.co/dr87/vonovox/tree/main) para resolver uma compilação ou patch específico de hardware, se necessário. Mantenha as compilações de trabalho mais antigas em suas próprias pastas.
- Prepare um ponto de verificação RVC V2 pronto para inferência e verifique qual incorporador o modelo espera. Um ponto de verificação de treinamento como `G_*.pth` serve para retomar o treinamento. Para a primeira execução, escolha um modelo com procedência conhecida e execute sem índice se a compilação oferecer.
- Conecte um microfone físico e fones de ouvido com fio. Feche outros programas que possam assumir o controle exclusivo dos dispositivos de áudio e confirme se o Windows pode gravar seu microfone bruto.

## 2. Inicie o aplicativo

1. Baixe o ZIP, use **Extrair tudo** e coloque o pacote inteiro em uma pasta local gravável, como `C:\VoiceTools\Vonovox`. Execute os lançadores da pasta extraída, com seus arquivos de suporte ao lado deles.
2. Na distribuição documentada pelo desenvolvedor, instale o [tempo de execução do Microsoft Visual C++ x64](https://aka.ms/vs/16/release/vc_redist.x64.exe), execute `setup.bat` e, em seguida, execute `start.bat`. Use o inicializador fornecido para o arquivo exato que você extraiu. A primeira inicialização pode demorar mais enquanto as dependências são inicializadas.
3. Aguarde a interface. Se a janela fechar imediatamente, execute o mesmo iniciador em um prompt de comando aberto para que o último erro permaneça visível. Verifique se você extraiu o arquivo inteiro e se selecionou uma construção de GPU compatível.
4. Selecione o modelo RVC V2 na área do modelo. Escolha o incorporador esperado quando a IU o expor. Comece com controles de afinação e formante neutros, dimensionamento de bloco padrão e efeitos opcionais desativados.

## 3. Verifique o primeiro sinal

Escolha seu microfone físico como **Dispositivo de entrada** e um monitor de fone de ouvido adequado ou a extremidade de reprodução do seu cabo virtual como **Dispositivo de saída**. Se a UI expor o backend de áudio, comece com WASAPI e modo compartilhado. Pressione **Iniciar**, espere um momento e diga uma frase seguida de uma pausa. Você deverá ouvir a voz convertida, seguida de silêncio. Pressione **Parar** antes de trocar os dispositivos de áudio ou iniciar o próximo teste.

Se o modelo não carregar, verifique o RVC V2 e o incorporador antes de alterar as configurações de áudio. Se nenhuma voz for ouvida, confirme o microfone e os dispositivos de saída separadamente. Continue com [roteamento e ajuste do microfone](live-audio.md) assim que o modelo for iniciado.
