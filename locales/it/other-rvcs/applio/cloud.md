---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 91
permalink: /ilaria-rvc/applio/cloud/
description: "Esegui Applio e la scheda Realtime nel cloud con Google Colab, Kaggle o Lightning.AI quando il tuo PC non ha una GPU supportata."
---
# Applio Realtime nel Cloud

Quando il tuo computer non ha una GPU locale compatibile, puoi eseguire la **Web UI di Applio** (inclusa la scheda **Realtime** nelle build cloud supportate) su **Google Colab**, **Kaggle** o **Lightning.AI** e aprirla tramite un URL tunnel pubblico.

> **Prima di andare live:** Prova sempre il modello vocale con [una clip registrata](inference.md) per verificare che voce e pitch funzionino prima di aggiungere la latenza di rete e il cavo audio virtuale.

> **Discord ufficiale di Applio:** Il supporto ufficiale di Applio si è spostato dal vecchio server IA Hispano al Discord permanente (`https://discord.gg/wY7gmqTyEV`).

## 1. Scegli il servizio cloud

| Piattaforma | GPU e quota | Archiviazione | Tunnel disponibili |
| --- | --- | --- | --- |
| **Google Colab** | Piano a pagamento richiesto per le Web UI | Sincronizzazione Google Drive | Gradio, Ngrok, LocalTunnel |
| **Kaggle** | Quota GPU settimanale gratuita (**T4 x2**) | Sessione + persistenza opzionale | Ngrok, Gradio + LocalTunnel, LocalTunnel, Horizon |
| **Lightning.AI** | A crediti (`1 credito = $1 USD` al secondo; Studio 4-CPU gratuito + crediti iniziali; vedi [Prezzi](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB gratis) | Gradio, Port Viewer (`6969`), Ngrok, Cloudflare, LocalTunnel, Horizon |

## 2. Opzione A: Google Colab Web UI

> **Avviso sui Termini di Servizio:** Eseguire Web UI sul **piano gratuito di Google Colab** viola le [politiche sulle attività non consentite](https://research.google.com/colaboratory/faq.html#disallowed-activities) di Google e rischia limiti GPU o blocco dell'account. Usa un **piano a pagamento Colab**.

1. Apri il [notebook Colab di Applio](https://colab.research.google.com/github/iahispano/applio/blob/master/assets/Applio.ipynb) e accedi al tuo account Google.
2. Avvia le celle **Install Applio** (~2 minuti) e concedi l'accesso a Google Drive se vuoi salvare i modelli tra le sessioni.
3. Avvia la cella di sincronizzazione **Google Drive** se necessario.
4. Nella cella **Run Server**, scegli un `method` per il tunnel:
   - **Gradio (Predefinito)**: nessun account richiesto; stampa un link `.gradio.live`.
   - **Ngrok**: incolla il tuo [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) in `ngrok_token`, scegli eventualmente la `Region` più vicina per ridurre la latenza e apri l'URL `ngrok.io` (il piano gratuito Ngrok ha un limite di 1 GB/mese).
   - **LocalTunnel**: nessun account richiesto; stampa un URL `loca.lt` e una **Local Tunnel Password** da incollare all'apertura della pagina.

## 3. Opzione B: Kaggle (T4 x2 gratuito)

1. Crea un [account Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F) e verifica il **numero di telefono** (necessario per attivare **Internet**).
2. Clicca **Create → New Notebook**, poi **File → Import Notebook → Link**, incolla `https://github.com/IAHispano/Applio/blob/main/assets/Applio_Kaggle.ipynb` e clicca **Import**.
3. Nella barra laterale destra:
   - Attiva **Internet** (**ON**).
   - Imposta Persistence su **Files and variables**.
   - Sotto Accelerator, seleziona **GPU T4 x2**.
4. Avvia le celle di installazione.
5. Nella cella del tunnel, scegli un `Tunnel`:
   - **Ngrok** (incolla `ngrok_authtoken`)
   - **Gradio + LocalTunnel** (Gradio per Applio, LocalTunnel per TensorBoard)
   - **LocalTunnel** (copia la `LocalTunnels Password` stampata)
   - **Horizon** (incolla il tuo `horizon_id` da [hrzn.run/dashboard](https://hrzn.run/dashboard/))
6. Clicca sull'URL di Applio stampato quando il server si avvia.

## 4. Opzione C: Lightning.AI (Studio persistente)

1. Crea un [account Lightning.AI](https://lightning.ai) e verifica il **numero di telefono** (l'approvazione richiede **2-3 giorni lavorativi**).
2. Clona lo [Studio Applio Notebook](https://lightning.ai/nick088/studios/applio-ui?view=public&section=featured).
3. Clicca **Studio Environment → Switch To GPU** nella barra laterale destra e attendi il riavvio dell'istanza GPU.
4. *(Opzionale)* Nella prima cella imposta `branch` (`"latest-stable"` predefinito, `"main"` per gli ultimi aggiornamenti o un tag specifico), poi eseguila finché non stampa `Installed Applio`.
5. Scorri fino a **Run UI**, scegli un `Tunnel` (**Gradio**, **Port Viewer** sulla porta `6969`, **Ngrok**, **Cloudflare** `.trycloudflare.com`, **LocalTunnel** o **Horizon**) e avvia la cella.
   - Con **Port Viewer**, clicca `+ → Web Apps → Port Viewer` nella barra destra, aggiungi la porta `6969` e fai doppio clic per aprire l'interfaccia.
6. Usa **Teamspace Drive** (`Studio > this_studio > Applio`) per caricare o scaricare direttamente i modelli, oppure esegui l'ultima cella **"Delete everything"** per una reinstallazione pulita.

## 5. Configura cavo virtuale e scheda Realtime

Una volta aperta la Web UI di Applio nel browser, installa un cavo audio virtuale (**VAC Lite** o **VB-CABLE** su Windows, **BlackHole** su macOS) e segui [Usare Applio con il microfono](realtime.md) e la [guida al cavo virtuale](../vonovox/live-audio.md) per inviare l'audio a Discord, OBS o al gioco.
