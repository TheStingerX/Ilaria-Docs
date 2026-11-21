---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 91
permalink: /ilaria-rvc/applio/cloud/
description: "Executa o Applio e o separador Realtime na nuvem com Google Colab, Kaggle ou Lightning.AI quando o teu PC não tiver GPU compatível."
---
# Applio Realtime na Nuvem

Quando o teu computador não tem uma GPU local compatível, podes executar a **Web UI do Applio** (incluindo o separador **Realtime** nas versões na nuvem suportadas) no **Google Colab**, **Kaggle** ou **Lightning.AI** através de um URL público.

> **Antes de ir ao vivo:** Testa sempre o teu modelo vocal com [um clipe gravado](inference.md) para confirmar que a voz e o pitch funcionam antes de somar latência de rede e cabo virtual.

> **Discord oficial do Applio:** O suporte oficial do Applio mudou para o servidor permanente (`https://discord.gg/wY7gmqTyEV`).

## 1. Escolher um serviço na nuvem

| Plataforma | GPU e quota | Armazenamento | Túneis disponíveis |
| --- | --- | --- | --- |
| **Google Colab** | Plano pago necessário para Web UIs | Sincronização Google Drive | Gradio, Ngrok, LocalTunnel |
| **Kaggle** | Quota semanal gratuita de GPU (**T4 x2**) | Sessão + persistência opcional | Ngrok, Gradio + LocalTunnel, LocalTunnel, Horizon |
| **Lightning.AI** | Créditos mensais gratuitos (75h T4 16GB / 31h L4 24GB / 15h L40 48GB) | Persistente (**Teamspace Drive**) | Gradio, Port Viewer (`6969`), Ngrok, Cloudflare, LocalTunnel, Horizon |

## 2. Opção A: Google Colab Web UI

> **Aviso sobre os Termos de Serviço:** Executar Web UIs no **plano gratuito do Google Colab** viola a [política de atividades não permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) da Google e arrisca limites de GPU ou bloqueios de conta. Usa um **plano pago do Colab**.

1. Abre o [notebook Colab do Applio](https://colab.research.google.com/github/iahispano/applio/blob/master/assets/Applio.ipynb) e inicia sessão na tua conta Google.
2. Executa as células **Install Applio** (~2 minutos) e autoriza o Google Drive se quiseres guardar modelos entre sessões.
3. Executa a célula de sincronização **Google Drive** se necessário.
4. Na célula **Run Server**, escolhe um `method`:
   - **Gradio (Predefinido)**: sem conta; mostra um link `.gradio.live`.
   - **Ngrok**: cola o teu [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) em `ngrok_token`, escolhe opcionalmente a `Region` mais próxima e abre o URL `ngrok.io` (limite gratuito de 1 GB/mês).
   - **LocalTunnel**: sem conta; mostra um URL `loca.lt` e uma **Local Tunnel Password** para colar ao abrir a página.

## 3. Opção B: Kaggle (T4 x2 gratuito)

1. Cria uma [conta Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F) e verifica o teu **número de telefone** (obrigatório para ativar **Internet**).
2. Clica em **Create → New Notebook**, depois **File → Import Notebook → Link**, cola `https://github.com/IAHispano/Applio/blob/main/assets/Applio_Kaggle.ipynb` e clica em **Import**.
3. Na barra lateral direita:
   - Liga **Internet** (**ON**).
   - Define Persistence como **Files and variables**.
   - Em Accelerator, seleciona **GPU T4 x2**.
4. Executa as células de instalação.
5. Na célula de túnel, escolhe um `Tunnel`:
   - **Ngrok** (cola `ngrok_authtoken`)
   - **Gradio + LocalTunnel** (Gradio para Applio, LocalTunnel para TensorBoard)
   - **LocalTunnel** (copia a `LocalTunnels Password` impressa)
   - **Horizon** (cola o teu `horizon_id` de [hrzn.run/dashboard](https://hrzn.run/dashboard/))
6. Clica no URL do Applio quando o servidor iniciar.

## 4. Opção C: Lightning.AI (Studio persistente)

1. Cria uma [conta Lightning.AI](https://lightning.ai) e verifica o teu **número de telefone** (**2-3 dias úteis**).
2. Clona o [Studio Applio Notebook](https://lightning.ai/nick088/studios/applio-ui?view=public&section=featured).
3. Clica em **Studio Environment → Switch To GPU** à direita e aguarda o reinício.
4. *(Opcional)* Na primeira célula escolhe `branch` (`"latest-stable"` por defeito, `"main"` ou uma tag específica) e executa-a até `Installed Applio`.
5. Em **Run UI**, escolhe um `Tunnel` (**Gradio**, **Port Viewer** na porta `6969`, **Ngrok**, **Cloudflare** `.trycloudflare.com`, **LocalTunnel** ou **Horizon**) e executa a célula.
   - Com **Port Viewer**, clica em `+ → Web Apps → Port Viewer` à direita, adiciona a porta `6969` e faz duplo clique.
6. Usa **Teamspace Drive** (`Studio > this_studio > Applio`) para enviar/descarregar modelos, ou a última célula **"Delete everything"** para reiniciar de raiz.

## 5. Configurar cabo virtual e separador Realtime

Com a Web UI do Applio aberta no navegador, instala um cabo de áudio virtual (**VAC Lite** ou **VB-CABLE** no Windows, **BlackHole** no macOS) e segue [Usar o Applio com microfone](realtime.md) e o [guia do cabo virtual](../vonovox/live-audio.md) para encaminhar o som para o Discord, OBS ou jogo.
