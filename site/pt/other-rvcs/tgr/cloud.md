# Okada TG Developed Fork na Nuvem

Se o teu computador não tiver uma GPU NVIDIA, AMD ou Intel compatível, podes executar o **Okada TG Developed Fork** numa GPU na nuvem com **Google Colab**, **Kaggle** ou **Lightning.AI** e controlá-lo pelo navegador.

> **Porque aparece "Server audio not available":** As máquinas virtuais na nuvem não têm placa de som física. Essa mensagem é normal. Usa sempre o **modo Client** para que o navegador capture o teu microfone local e reproduza a voz convertida nos teus auscultadores ou cabo virtual.

> **Latência esperada:** A conversão na nuvem soma o atraso da rede à inferência na GPU. Escolhe a região **Ngrok** mais próxima (ou **Port Viewer** no Lightning.AI) e usa ligação por cabo ou Wi-Fi de 5 GHz para menor atraso.

## 1. Escolher um serviço na nuvem

| Plataforma | GPU e quota | Armazenamento | Túneis disponíveis |
| --- | --- | --- | --- |
| **Google Colab** | Plano pago necessário para Web UIs | Temporário (por sessão) | Ngrok |
| **Kaggle** | Quota semanal gratuita de GPU (**T4 x2**) | Sessão + persistência opcional | Ngrok |
| **Lightning.AI** | Por créditos (`1 crédito = $1 USD` por segundo; Studio 4-CPU grátis + créditos iniciais; ver [Preços](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB grátis) | Port Viewer (recomendado), seletor de túnel |

## 2. Configurar um cabo de áudio virtual (Discord, OBS, jogos)

Instala um cabo de áudio virtual para encaminhar o som do navegador para o Discord, OBS ou um jogo:

- **Windows**: descarrega o [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (ou **VB-CABLE**). Executa `setup64` em PCs Intel/AMD ou `setup64a` em portáteis Windows ARM (ex. Snapdragon). Se o Windows alterar os dispositivos de som predefinidos, prime `Win + R`, executa `mmsys.cpl` e repõe os dispositivos de **Reprodução** e **Gravação** (incluindo **Dispositivo de comunicação predefinido**).
- **macOS**: instala o [BlackHole](https://existential.audio/blackhole) ou [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: instala o PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` no Debian/Ubuntu, `sudo yum install -y portaudio` no Fedora/RHEL ou `sudo pacman -Syu portaudio` no Arch).

Consulta o [guia do cabo virtual](../vonovox/live-audio.md) para os passos completos no Discord e OBS.

## 3. Opção A: Google Colab

> **Aviso sobre os Termos de Serviço:** Executar Web UIs no **plano gratuito do Google Colab** viola a [política de atividades não permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) da Google e pode causar bloqueios ou limites de GPU. Usa um **plano pago do Colab**.

1. Abre o [notebook Colab do Tg-Develop](https://colab.research.google.com/github/tg-develop/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Executa a **primeira célula** de cima até mostrar `Done! Proceed with the next steps`.
3. Executa a **segunda célula**.
4. Desce até à **última célula** e cola o teu [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) em `TOKEN_HERE`.
5. *(Opcional)* Escolhe a **região** mais próxima abaixo do campo do token para reduzir a latência.
6. Executa a célula e clica no **link Ngrok** gerado quando os downloads terminarem.

## 4. Opção B: Kaggle (T4 x2 gratuito)

### Verificação de conta (uma vez)

1. Cria uma [conta Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifica o teu **número de telefone** nas definições da conta para poder ativar a opção **Internet** nos notebooks.

### Configuração e arranque

1. Vai ao [Kaggle](https://www.kaggle.com) e clica em **Create → New Notebook**.
2. Clica em **File → Import Notebook**, abre o separador **Link**, cola `https://github.com/tg-develop/voice-changer/blob/master-custom/Kaggle_RealtimeVoiceChanger.ipynb` e clica em **Import**.
3. Na barra lateral direita:
   - Liga **Internet** (**ON**).
   - Define Persistence como **Files and variables**.
   - Em Accelerator, escolhe **GPU T4 x2**.
4. *(Opcional)* Evita deixar **Save version** ativo sem necessidade, pois continua a gastar quota mesmo em repouso.
5. Executa a **primeira célula de instalação** até aparecer `Done! Proceed with the next steps` e depois executa a **terceira célula**.
6. Cola o teu [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) na **última célula**, executa-a e abre o URL público gerado.

## 5. Opção C: Lightning.AI (Studio persistente)

1. Cria uma [conta Lightning.AI](https://lightning.ai) e verifica o teu **número de telefone** (a validação demora **2-3 dias úteis**).
2. Clona o [Studio Wokada-TgDevelop-Fork](https://lightning.ai/nick088/studios/wokada-tg-develop-fork).
3. Muda para GPU em **Studio Environment → Switch To GPU**.
4. Executa a **primeira célula** para instalar dependências e a **segunda célula** para configurar o servidor.
5. Na **terceira célula**, escolhe o túnel (**Port Viewer** recomendado) e executa-a.
6. Usa **Teamspace Drive** à direita para carregar modelos `.pth` e `.index`.
7. **Reiniciar / limpar**: executa a última célula **"Delete everything"** se precisares de limpar o armazenamento persistente.

## 6. Configurar modelos e áudio

Com a Web UI aberta no navegador, o carregamento de modelos e o **modo Client** funcionam como na versão local. Continua em [Modelo, microfone e cabo](live-audio.md).

## 7. Resolução de problemas e utilitários

### Ativar registos em Debug Mode

Se o servidor na nuvem falhar ao iniciar, adiciona `--log-level debug` ao comando na última célula e volta a executá-la:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle e Lightning.AI**: `!./VoiceChanger --log-level debug`

Copia a saída completa ao pedir ajuda (evita `warning`, `error` ou `critical`, que ocultam detalhes do arranque).

### Converter `.safetensors` de volta para `.pth`

O W-Okada guarda os modelos importados em `model_dir` como `.safetensors`. Podes convertê-los localmente com o [Conversor Safetensors](../../ilaria-rvc/manage/safetensors-converter.md) do Ilaria RVC ou executar um script `torch` + `safetensors` (`!pip install torch safetensors`).
