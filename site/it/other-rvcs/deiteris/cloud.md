# Deiteris w-okada Fork nel Cloud

Se il tuo computer non ha una GPU locale supportata, puoi eseguire **Deiteris w-okada Fork** su una GPU cloud tramite **Google Colab**, **Kaggle** o **Lightning.AI** e controllarlo dal browser.

> **Perché compare "Server audio not available":** Le istanze cloud non hanno una scheda audio fisica. È normale. Usa sempre la modalità **Client** in modo che il browser catturi il microfono e riproduca la voce convertita in locale.

> **Latenza attesa:** I tunnel cloud aggiungono il ritardo di rete oltre all'inferenza su GPU. Scegli la regione **Ngrok** più vicina (o **Port Viewer** su Lightning.AI) e usa una connessione cablata o Wi-Fi a 5 GHz quando possibile.

## 1. Scegli il servizio cloud

| Piattaforma | GPU e quota | Archiviazione | Tunnel disponibili |
| --- | --- | --- | --- |
| **Google Colab** | Piano a pagamento richiesto per le Web UI | Temporanea (per sessione) | Ngrok |
| **Kaggle** | Quota GPU settimanale gratuita (**T4 x2**) | Sessione + persistenza opzionale | Ngrok |
| **Lightning.AI** | A crediti (`1 credito = $1 USD` al secondo; Studio 4-CPU gratuito + crediti iniziali; vedi [Prezzi](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB gratis) | Port Viewer (consigliato), selettore tunnel |

## 2. Configura un cavo audio virtuale (per Discord, OBS o giochi)

Installa un cavo audio virtuale per instradare l'uscita del browser verso Discord, OBS o un gioco:

- **Windows**: scarica [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (o **VB-CABLE**). Usa `setup64` su PC Intel/AMD, oppure `setup64a` su portatili Windows ARM (es. Snapdragon). Se Windows cambia i dispositivi predefiniti, premi `Win + R`, esegui `mmsys.cpl` e ripristina i dispositivi di **Riproduzione** e **Registrazione** (incluso **Dispositivo di comunicazione predefinito**).
- **macOS**: installa [BlackHole](https://existential.audio/blackhole) o [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: installa PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` su Debian/Ubuntu, `sudo yum install -y portaudio` su Fedora/RHEL, oppure `sudo pacman -Syu portaudio` su Arch).

Consulta la [guida al cavo virtuale](../vonovox/live-audio.md) per la configurazione completa su Discord e OBS.

## 3. Opzione A: Google Colab

> **Avviso sui Termini di Servizio:** Eseguire Web UI sul **piano gratuito di Google Colab** viola la [politica sulle attività non consentite](https://research.google.com/colaboratory/faq.html#disallowed-activities) di Google e può comportare limitazioni o sospensione dell'accesso a Colab. Usa un **piano a pagamento Colab**.

1. Apri il [notebook Colab di Deiteris](https://colab.research.google.com/github/deiteris/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Avvia la **prima cella** dall'alto e attendi `Done! Proceed with the next steps`.
3. Avvia la **seconda cella**.
4. Scorri fino all'**ultima cella** e incolla il tuo [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) in `TOKEN_HERE`.
5. *(Opzionale)* Scegli la **regione** più vicina sotto il campo del token per ridurre la latenza.
6. Avvia la cella e clicca sul **link Ngrok** generato per aprire la Web UI.

## 4. Opzione B: Kaggle (T4 x2 gratuito)

### Verifica account (una tantum)

1. Crea un [account Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifica il **numero di telefono** per poter attivare l'interruttore **Internet** nei notebook.

### Configurazione e avvio del notebook

1. Apri il [notebook Kaggle di Deiteris](https://www.kaggle.com/code/suneku/voice-changer-public) e clicca **Copy and Edit**.
2. Nella barra laterale destra:
   - Attiva **Internet** (**ON**).
   - Imposta Persistence su **Files and variables**.
   - Sotto Accelerator, seleziona **GPU T4 x2**.
3. *(Opzionale)* Evita di lasciare attivo **Save version** se non serve, perché la quota GPU continua a consumarsi anche a riposo.
4. Avvia la **prima cella di installazione** finché non stampa `Done! Proceed with the next steps`, poi avvia la **terza cella**.
5. Incolla il tuo [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) nell'**ultima cella**, avviala e clicca sull'URL pubblico generato.

## 5. Opzione C: Lightning.AI (Studio persistente)

1. Crea un [account Lightning.AI](https://lightning.ai) e verifica il **numero di telefono** (l'approvazione può richiedere **2-3 giorni lavorativi**).
2. Clona lo [Studio Wokada-Deiteris-Fork](https://lightning.ai/nick088/studios/wokada-deiteris-fork).
3. Passa a una GPU tramite **Studio Environment → Switch To GPU**.
4. Avvia la **prima cella** per installare le dipendenze e la **seconda cella** per configurare il server.
5. Nella **terza cella**, scegli il tunnel (**Port Viewer** consigliato) e avviala.
6. Usa **Teamspace Drive** sulla destra per caricare i modelli e clicca sull'icona **Jupyter** a destra quando vuoi tornare al codice del notebook.

## 6. Configura modelli vocali e audio

Una volta caricata la Web UI nel browser, segui [Configura e regola Deiteris w-okada Fork](live-audio.md) per impostare modalità Client, modelli e buffer.

## 7. Risoluzione problemi cloud e utilità

### Attivare i log in Debug Mode

Se il server cloud non si avvia o si disconnette subito, aggiungi `--log-level debug` al comando nell'ultima cella e rieseguila:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle e Lightning.AI**: `!./VoiceChanger --log-level debug`

Copia l'output completo quando chiedi supporto (evita `warning`, `error` o `critical` perché filtrano i dettagli di avvio).

### Convertire `.safetensors` in `.pth`

W-Okada salva i modelli importati in `model_dir` come `.safetensors`. Per riconvertirli in `.pth` in locale usa il [Convertitore Safetensors](../../ilaria-rvc/manage/safetensors-converter.md) di Ilaria RVC, oppure esegui uno script `torch` + `safetensors` nel notebook (`!pip install torch safetensors`).
