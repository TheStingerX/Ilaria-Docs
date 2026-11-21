# Okada TG Developed Fork nel Cloud

Se il tuo computer non ha una GPU NVIDIA, AMD o Intel compatibile, puoi eseguire **Okada TG Developed Fork** su una GPU cloud tramite **Google Colab**, **Kaggle** o **Lightning.AI** e controllarlo dal browser.

> **Perché compare "Server audio not available":** Le macchine virtuali nel cloud non hanno una scheda audio fisica. È un comportamento del tutto normale. Usa sempre la modalità **Client** in modo che il browser catturi il tuo microfono locale e riproduca la voce convertita sulle tue cuffie o sul cavo virtuale.

> **Latenza attesa:** La conversione nel cloud aggiunge il tempo di andata e ritorno della rete oltre all'inferenza su GPU. Scegli la regione **Ngrok** più vicina (oppure **Port Viewer** su Lightning.AI) e usa una connessione cablata o Wi-Fi a 5 GHz per ridurre il ritardo.

## 1. Scegli il servizio cloud

| Piattaforma | GPU e quota | Archiviazione | Tunnel disponibili |
| --- | --- | --- | --- |
| **Google Colab** | Piano a pagamento richiesto per le Web UI | Temporanea (per sessione) | Ngrok |
| **Kaggle** | Quota GPU settimanale gratuita (**T4 x2**) | Sessione + persistenza opzionale | Ngrok |
| **Lightning.AI** | A crediti (`1 credito = $1 USD` al secondo; Studio 4-CPU gratuito + crediti iniziali; vedi [Prezzi](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB gratis) | Port Viewer (consigliato), selettore tunnel |

## 2. Configura un cavo audio virtuale (per Discord, OBS o giochi)

Per inviare l'audio convertito dal browser a Discord, OBS o un gioco, installa un cavo audio virtuale sul tuo PC:

- **Windows**: scarica [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (o **VB-CABLE**). Avvia `setup64` su PC Intel/AMD standard, oppure `setup64a` su portatili Windows ARM (es. Snapdragon). Se Windows cambia i dispositivi audio predefiniti dopo l'installazione, premi `Win + R`, esegui `mmsys.cpl` e ripristina i tuoi dispositivi predefiniti di **Riproduzione** e **Registrazione** (incluso **Dispositivo di comunicazione predefinito**).
- **macOS**: installa [BlackHole](https://existential.audio/blackhole) o [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: installa PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` su Debian/Ubuntu, `sudo yum install -y portaudio` su Fedora/RHEL, oppure `sudo pacman -Syu portaudio` su Arch).

Per l'instradamento passo passo verso Discord e OBS, consulta la [guida al cavo virtuale](../vonovox/live-audio.md).

## 3. Opzione A: Google Colab

> **Avviso sui Termini di Servizio:** Eseguire Web UI sul **piano gratuito di Google Colab** viola le [politiche sulle attività non consentite](https://research.google.com/colaboratory/faq.html#disallowed-activities) di Google. I controlli avvengono anche durante la sessione e violazioni ripetute possono portare a limitazioni GPU o blocco dell'account. Usa un **piano a pagamento Colab** per le Web UI.

1. Apri il [notebook Colab di Tg-Develop](https://colab.research.google.com/github/tg-develop/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Avvia la **prima cella** dall'alto e attendi la scritta `Done! Proceed with the next steps`.
3. Avvia la **seconda cella**.
4. Scorri fino all'**ultima cella** e incolla il tuo [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) nel campo `TOKEN_HERE`.
5. *(Opzionale)* Seleziona la **regione** più vicina a te sotto il campo del token per ridurre la latenza.
6. Avvia la cella e clicca sul **link Ngrok** generato al termine dei download.

## 4. Opzione B: Kaggle (T4 x2 gratuito)

### Verifica account (una tantum)

1. Crea un [account Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifica il **numero di telefono** nelle impostazioni dell'account: è obbligatorio per attivare l'opzione **Internet** nei notebook.

### Configurazione e avvio del notebook

1. Vai su [Kaggle](https://www.kaggle.com) e clicca **Create → New Notebook**.
2. Clicca **File → Import Notebook**, apri la scheda **Link**, incolla `https://github.com/tg-develop/voice-changer/blob/master-custom/Kaggle_RealtimeVoiceChanger.ipynb` e clicca **Import**.
3. Nella barra laterale destra:
   - Attiva **Internet** (**ON**).
   - Imposta Persistence su **Files and variables**.
   - Sotto Accelerator, scegli **GPU T4 x2**.
4. *(Opzionale)* Usa **Save version** solo se vuoi davvero la persistenza in background, perché consuma quota GPU anche quando non esegui celle.
5. Avvia la **prima cella di installazione** finché non stampa `Done! Proceed with the next steps`, poi avvia la **terza cella**.
6. Incolla il tuo [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) nell'**ultima cella**, avviala e apri l'URL pubblico generato.

## 5. Opzione C: Lightning.AI (Studio persistente)

1. Crea un [account Lightning.AI](https://lightning.ai) e verifica il **numero di telefono** (la verifica può richiedere **2-3 giorni lavorativi**).
2. Clona lo [Studio Wokada-TgDevelop-Fork](https://lightning.ai/nick088/studios/wokada-tg-develop-fork).
3. Passa a un ambiente GPU tramite **Studio Environment → Switch To GPU**.
4. Avvia la **prima cella** per installare le dipendenze e la **seconda cella** per configurare il server.
5. Nella **terza cella**, scegli il tunnel (**Port Viewer** è consigliato per stabilità e bassa latenza) e avviala.
6. Usa **Teamspace Drive** nella barra laterale destra per caricare i tuoi modelli `.pth` e `.index`.
7. **Ripristino / aggiornamento**: se in seguito vuoi ripartire da zero, esegui l'ultima cella **"Delete everything"** per pulire i file dallo spazio persistente.

## 6. Configura modelli vocali e audio

Una volta aperta la Web UI nel browser, caricamento modelli, pitch e configurazione audio in modalità **Client** sono identici all'installazione locale. Prosegui con [Modello, microfono e cavo](live-audio.md).

## 7. Risoluzione problemi cloud e utilità

### Attivare i log in Debug Mode

Se il server cloud si blocca o non parte, aggiungi `--log-level debug` al comando di avvio nell'ultima cella e rieseguila:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle e Lightning.AI**: `!./VoiceChanger --log-level debug`

Copia l'output completo dalla cella quando chiedi supporto (evita i livelli `warning`, `error` o `critical`, perché nascondono i dettagli utili).

### Convertire `.safetensors` in `.pth`

W-Okada salva i modelli importati in `model_dir` come `.safetensors`. Per recuperare un `.pth` da una sessione cloud puoi usare il [Convertitore Safetensors](../../ilaria-rvc/manage/safetensors-converter.md) integrato in Ilaria RVC oppure eseguire uno script `torch` + `safetensors` (`!pip install torch safetensors`).
