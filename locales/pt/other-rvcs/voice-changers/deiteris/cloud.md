---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 98
permalink: /ilaria-rvc/deiteris/cloud/
description: "Executa o Deiteris w-okada Fork na nuvem com Google Colab, Kaggle ou Lightning.AI quando o teu PC não tiver uma GPU local compatível."
---
# Deiteris w-okada Fork na Nuvem

Se o teu computador não tiver uma GPU local compatível, podes executar o **Deiteris w-okada Fork** numa GPU na nuvem com **Google Colab**, **Kaggle** ou **Lightning.AI** e controlá-lo pelo navegador.

> **Porque aparece "Server audio not available":** As instâncias na nuvem não têm placa de som física. É esperado. Usa sempre o **modo Client** para que o navegador capture o microfone e reproduza a voz convertida localmente.

> **Latência esperada:** Os túneis na nuvem somam atraso de rede à inferência na GPU. Escolhe a região **Ngrok** mais próxima (ou **Port Viewer** no Lightning.AI) e usa ligação por cabo ou Wi-Fi de 5 GHz sempre que possível.

## 1. Escolher um serviço na nuvem

| Plataforma | GPU e quota | Armazenamento | Túneis disponíveis |
| --- | --- | --- | --- |
| **Google Colab** | Plano pago necessário para Web UIs | Temporário (por sessão) | Ngrok |
| **Kaggle** | Quota semanal gratuita de GPU (**T4 x2**) | Sessão + persistência opcional | Ngrok |
| **Lightning.AI** | Por créditos (`1 crédito = $1 USD` por segundo; Studio 4-CPU grátis + créditos iniciais; ver [Preços](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB grátis) | Port Viewer (recomendado), seletor de túnel |

## 2. Configurar um cabo de áudio virtual (Discord, OBS, jogos)

Instala um cabo de áudio virtual para encaminhar o som do navegador para o Discord, OBS ou um jogo:

- **Windows**: descarrega o [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (ou **VB-CABLE**). Usa `setup64` em PCs Intel/AMD ou `setup64a` em portáteis Windows ARM (ex. Snapdragon). Se o Windows alterar os dispositivos predefinidos, prime `Win + R`, executa `mmsys.cpl` e repõe **Reprodução** e **Gravação** (incluindo **Dispositivo de comunicação predefinido**).
- **macOS**: instala o [BlackHole](https://existential.audio/blackhole) ou [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: instala o PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` no Debian/Ubuntu, `sudo yum install -y portaudio` no Fedora/RHEL ou `sudo pacman -Syu portaudio` no Arch).

Consulta o [guia do cabo virtual](../vonovox/live-audio.md) para os passos completos no Discord e OBS.

## 3. Opção A: Google Colab

> **Aviso sobre os Termos de Serviço:** Executar Web UIs no **plano gratuito do Google Colab** viola a [política de atividades não permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) da Google e pode restringir ou suspender o acesso ao Colab. Usa um **plano pago do Colab**.

1. Abre o [notebook Colab do Deiteris](https://colab.research.google.com/github/deiteris/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Executa a **primeira célula** de cima e aguarda `Done! Proceed with the next steps`.
3. Executa a **segunda célula**.
4. Desce até à **última célula** e cola o teu [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) em `TOKEN_HERE`.
5. *(Opcional)* Escolhe a **região** mais próxima abaixo do campo do token para menor latência.
6. Executa a célula e clica no **URL Ngrok** gerado para abrir a Web UI.

## 4. Opção B: Kaggle (T4 x2 gratuito)

### Verificação de conta (uma vez)

1. Cria uma [conta Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifica o teu **número de telefone** para poder ativar o interruptor **Internet** nos notebooks.

### Configuração e arranque

1. Abre o [notebook Kaggle do Deiteris](https://www.kaggle.com/code/suneku/voice-changer-public) e clica em **Copy and Edit**.
2. Na barra lateral direita:
   - Liga **Internet** (**ON**).
   - Define Persistence como **Files and variables**.
   - Em Accelerator, escolhe **GPU T4 x2**.
3. *(Opcional)* Evita deixar **Save version** ativo sem necessidade, pois continua a gastar quota mesmo em repouso.
4. Executa a **primeira célula de instalação** até mostrar `Done! Proceed with the next steps` e depois executa a **terceira célula**.
5. Cola o teu [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) na **última célula**, executa-a e abre o URL público gerado.

## 5. Opção C: Lightning.AI (Studio persistente)

1. Cria uma [conta Lightning.AI](https://lightning.ai) e verifica o teu **número de telefone** (a aprovação demora **2-3 dias úteis**).
2. Clona o [Studio Wokada-Deiteris-Fork](https://lightning.ai/nick088/studios/wokada-deiteris-fork).
3. Muda para GPU em **Studio Environment → Switch To GPU**.
4. Executa a **primeira célula** para instalar dependências e a **segunda célula** para configurar o servidor.
5. Na **terceira célula**, escolhe o túnel (**Port Viewer** recomendado) e executa-a.
6. Usa **Teamspace Drive** à direita para carregar modelos e clica no ícone **Jupyter** à direita quando quiseres voltar ao código.

## 6. Configurar modelos e áudio

Quando a Web UI carregar no navegador, segue [Configurar e ajustar Deiteris w-okada Fork](live-audio.md) para configurar o modo Client, os modelos e o buffer.

## 7. Resolução de problemas e utilitários

### Ativar registos em Debug Mode

Se o servidor na nuvem falhar ao iniciar ou desligar-se logo, adiciona `--log-level debug` ao comando na última célula e volta a executá-la:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle e Lightning.AI**: `!./VoiceChanger --log-level debug`

Copia a saída completa ao pedir ajuda (evita `warning`, `error` ou `critical`, pois ocultam detalhes de arranque).

### Converter `.safetensors` de volta para `.pth`

O W-Okada guarda os modelos importados em `model_dir` como `.safetensors`. Para os converter localmente usa o [Conversor Safetensors](../../../ilaria-rvc/manage/safetensors-converter.md) do Ilaria RVC, ou executa um script `torch` + `safetensors` (`!pip install torch safetensors`).
