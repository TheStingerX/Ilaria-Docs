# Conversione vocale in tempo reale

Per una registrazione o una cover, la conversione di file ti consente di eseguire il rendering e confrontare più riprese. In una configurazione dal vivo, il convertitore deve completare ogni blocco audio abbastanza rapidamente da mantenere fluido il flusso del microfono. Configura prima un segnale locale affidabile, poi collegalo a un'applicazione di chiamata, registrazione o streaming.

## Scegli uno strumento per il lavoro

Consulta l'[elenco degli strumenti RVC](../reference/tools.md) per download e note hardware, incluso Vonovox per GPU NVIDIA.

| Strumento | Da dove iniziare |
| --- | --- |
| Vonovox | Un convertitore in tempo reale per modelli RVC V2 su Windows con una GPU NVIDIA. Scarica una build per la tua GPU, carica il modello e testa il microfono in cuffia prima di instradare il segnale convertito verso un'altra app. [Download Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentazione progetto](https://github.com/dr87/Vonovox) |
| RVC WebUI (Mainline - Original RVC) | Il progetto originale offre una WebUI di training e inferenza insieme a una GUI dedicata per il tempo reale. Fai riferimento alle istruzioni di release e avvio per la piattaforma che usi. |
| Applio | Le sue interfacce Desktop e Gradio hanno flussi dedicati per il tempo reale. Segui le istruzioni di configurazione per l'interfaccia e la versione installata. |
| w-okada VCClient | Un voice changer per uso dal vivo. La disponibilità RVC dipende dall'edizione della release e dalla piattaforma. Controlla i modelli supportati prima di installare una build. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
| Deiteris e Tg-Develop | Fork indipendenti di w-okada con build e impostazioni proprie. Controlla le note di release del fork prima di applicare istruzioni pensate per un'altra edizione. [Repository Deiteris](https://github.com/deiteris/voice-changer) · [Repository Tg-Develop](https://github.com/tg-develop/voice-changer) |

## Ascolta prima un segnale pulito

1. Collega microfono e cuffie. Nel convertitore, seleziona il microfono fisico come ingresso e le cuffie come uscita.
2. Carica un modello di inferenza compatibile e il relativo indice se usi il retrieval. Una breve [conversione di file](../start/getting-started.md) riuscita è un riferimento utile prima di provare il percorso dal vivo.
3. Avvia il flusso e parla a volume normale. Controlla il misuratore in ingresso o registra una traccia pulita. Riduci il guadagno in ingresso se i picchi vanno in clipping prima della conversione.
4. Verifica che il segnale in cuffia cambi quando attivi/disattivi la conversione. Se senti contemporaneamente la voce originale, controlla eventuale monitoraggio hardware diretto o un secondo percorso nel sistema operativo.
5. Fai un test più lungo di una singola parola. Includi parlato a basso volume, una frase forte e una breve pausa. Ascolta eventuali tagli, derive o disturbi sotto lo stesso carico di lavoro che userai dal vivo.

Evita di ascoltare tramite altoparlanti vicino a un microfono attivo. Le cuffie ti aiutano a individuare problemi di instradamento senza rimandare l'uscita nell'ingresso.

## Comprendi i ruoli dei dispositivi e i backend audio

> **Instradamento Audio Corretto (Correct Audio Routing)**
>
> **1. Dentro il Voice Changer**
> - **Dispositivo di Input:** Il tuo microfono fisico.
> - **Dispositivo di Output:** `Line 1` (VAC, consigliato) oppure `CABLE Input` (VB-CABLE).
>
> **2. Dentro Discord, Giochi, OBS o Altre Applicazioni**
> - **Dispositivo di Input:** `Line 1` (VAC, consigliato) oppure `CABLE Output` (VB-CABLE).
> - **Dispositivo di Output:** Le tue cuffie (fortemente consigliate rispetto agli altoparlanti).
>
> ```text
> Il tuo Microfono → Voice Changer → Line 1 (VAC) oppure CABLE Input/Output (VB-CABLE) → Discord / Gioco / OBS
> ```
>
> L'audio proveniente da Discord, dal gioco o dalle altre app deve andare direttamente nelle tue **cuffie** (mai indietro nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) è sempre consigliato. Se hai installato anche (o solo) **VB-CABLE**, ricorda che il voice changer invia a **`CABLE Input`** mentre Discord / giochi ascoltano **`CABLE Output`**.
> - **Altoparlanti e Rientro dalle Cuffie:** Evita di usare gli altoparlanti; l'audio dagli altoparlanti può rientrare nel microfono e causare doppio audio, eco o far convertire anche la voce di altre persone. Questo può succedere anche con le cuffie se il volume è troppo alto o se i padiglioni non sono chiusi e isolati abbastanza.
> - **Monitoraggio:** Sentire la propria voce convertita in cuffia è una funzione opzionale separata da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

Prima di collegare qualsiasi app, verifica cosa fa ciascun endpoint:

| Termine | Cos'è |
| --- | --- |
| **Input Device** | Il tuo microfono fisico (o canale dell'interfaccia audio) che invia la voce grezza al voice changer. |
| **Output Device** | Dove va la voce convertita (l'**endpoint di riproduzione del cavo virtuale** per Discord/OBS/giochi, oppure le cuffie per un test locale). |
| **Monitor Device** | Seconda uscita opzionale per ascoltare la tua voce convertita in cuffia mentre l'**Output Device** alimenta un cavo virtuale. |
| **Virtual Cable Input** *(lato Riproduzione)* | Compare in Riproduzione di Windows (es. `Line 1` in VAC Lite o `CABLE Input` in VB-CABLE). Impostalo come **Output Device** del voice changer. |
| **Virtual Cable Output** *(lato Registrazione)* | Compare in Registrazione di Windows (es. `Line 1` in VAC Lite o `CABLE Output` in VB-CABLE). Selezionalo come **Microfono** in Discord, OBS o nei giochi. |

### Microfoni USB, interfacce audio e backend

- **Microfoni USB:** Collegali direttamente a una porta USB posteriore della scheda madre (evita hub non alimentati), imposta il formato Windows su **48000 Hz** e disattiva la sospensione selettiva USB se il microfono si disconnette.
- **Interfacce audio (XLR):** Usa **ASIO** quando supportato dal voice changer (come RVC Blue o w-okada) per una latenza di buffer inferiore, oppure **WASAPI** per instradare verso i cavi virtuali standard di Windows.
- **WASAPI Shared vs. WASAPI Exclusive:** **WASAPI Shared** è il punto di partenza più sicuro perché Windows e i cavi virtuali possono condividere flussi a `48000 Hz` senza problemi. **WASAPI Exclusive** aggira il mixer di Windows per ridurre la latenza del driver quando supportato, ma blocca il dispositivo impedendo ad altre app di condividerlo.

## Configurazione specifica per app (Discord, OBS, giochi, chiamate, registrazione)

- **Discord / app di chiamata:** Imposta **Input Device** sull'endpoint di registrazione del cavo virtuale (`Line 1` / `CABLE Output`), imposta **Output Device** sulle cuffie e disattiva (**OFF**) Krisp, cancellazione dell'eco e sensibilità automatica se Discord taglia respiri o finali di parola.
- **OBS Studio e registrazione locale:** Aggiungi una sorgente **Cattura audio in entrata** collegata all'endpoint di registrazione del cavo virtuale, silenzia eventuali sorgenti separate del microfono grezzo e registra una breve clip di prova per verificare sincronia e livelli.
- **Giochi:** Seleziona l'endpoint di registrazione del cavo virtuale come microfono nel gioco (o impostalo come dispositivo di comunicazione predefinito in Windows). Limita sempre gli FPS nel gioco o lascia margine GPU affinché il gioco non saturi il voice changer.

## Invia l'audio convertito a un'altra app

Un dispositivo audio virtuale fornisce un endpoint di riproduzione per il convertitore e un corrispondente endpoint di registrazione per l'app ricevente. I nomi degli endpoint dipendono dal driver. Ad esempio, un cavo virtuale può chiamare il proprio endpoint di riproduzione "Input" e quello di registrazione "Output" perché le istruzioni adottano la prospettiva del cavo.

```text
Microfono fisico → Convertitore RVC → endpoint virtuale di riproduzione
                                               ↓
                                endpoint di registrazione corrispondente → chiamata o stream
```

Seleziona l'endpoint di registrazione corrispondente come microfono nell'app ricevente ed esegui lì una breve registrazione di prova. Se il monitor locale suona bene ma la registrazione no, verifica l'ingresso di destinazione e rimuovi eventuali sorgenti microfoniche duplicate. Se monitori l'audio convertito, usa un'uscita cuffie separata. Evita di instradare l'intero mix desktop o l'audio dell'app ricevente di nuovo dentro il convertitore.

## Ottimizza la latenza senza perdere stabilità

**Latenza di elaborazione vs. latenza totale end-to-end:** Il **GPU Delay** / tempo di inferenza mostrato nel voice changer indica **solo** quanto impiega la GPU a convertire un blocco. La **latenza totale end-to-end** somma buffer di ingresso del microfono, **Block Size / Chunk Size**, overhead di crossfade/contesto, buffer del cavo virtuale e buffer audio di Discord/OBS/gioco. Non confondere un GPU Delay basso (es. `15 ms`) con la latenza totale di andata e ritorno.

| Controllo | Regolazione pratica |
| --- | --- |
| Dimensione blocco o chunk (Block / Chunk Size) | Aumentala se la voce si spezza sotto carico. Una volta stabile, prova un valore inferiore e mantienilo solo se il parlato normale resta pulito. Blocchi più piccoli lasciano meno tempo per completare l'elaborazione. |
| Crossfade | Aumentalo con cautela se senti giunzioni ruvide tra i blocchi. Modifica il modo in cui i blocchi adiacenti si sovrappongono. |
| Contesto extra (Extra context) | Riduci il contesto se il convertitore resta indietro. Può aiutare il modello a seguire le transizioni, al costo di maggiore elaborazione. |
| Predittore di pitch | Se un'impostazione produce tempistiche instabili, confronta i predittori disponibili con le stesse frasi. Scegli quello che gestisce la tua estensione con sufficiente margine di elaborazione. |
| Rilevamento silenzio o soglia in ingresso | Abbassa la soglia se taglia sillabe deboli. Valuta durante le pause e il parlato leggero, non solo su un ingresso forte e costante. |
| Frequenza dispositivo (Device rate) | Controlla le frequenze di campionamento di dispositivo e cavo virtuale se senti velocità anomala o crepitii. Parti con impostazioni compatibili lungo tutta la catena. |

Parti dai valori predefiniti dell'app e modifica un'impostazione alla volta. Se un gioco o un altro programma pesante sulla GPU condivide il PC, ripeti il test mentre è in esecuzione. Conserva un preset funzionante così da poterlo ripristinare prima di andare in diretta. [GUI tempo reale RVC WebUI (Mainline - Original RVC)](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Risolvi il problema in base al punto in cui appare l'errore

| Sintomo | Cosa controllare per primo |
| --- | --- |
| Né il misuratore del convertitore né una registrazione grezza del microfono rispondono | Controlla i permessi microfono di Windows, l'interruttore fisico di mute e la selezione di Input Device. |
| Il microfono grezzo funziona, ma l'uscita convertita è muta | Conferma che il flusso sia avviato, il modello sia caricato e l'Output Device sia impostato correttamente. Abbassa la soglia VAD/silenzio. |
| Il monitor locale funziona, ma la chiamata riceve la voce originale | Seleziona l'endpoint di registrazione virtuale (`CABLE Output` / `Line 1`) come microfono della chiamata e disattiva eventuali sorgenti grezze separate. |
| Doppio monitoraggio / eco / loop di feedback | Non usare mai altoparlanti vicino a un microfono attivo. Disattiva **"Ascolta il dispositivo"** in Windows se l'app monitora già, e non instradare mai l'audio desktop/chiamata nel cavo virtuale. |
| Crepitii, scatti o buffer underrun | Allinea **tutti** gli endpoint (Mic, Cuffie, Cable Input/Output) a **48000 Hz** (`mmsys.cpl`), aumenta **Block/Chunk Size** di un livello e verifica eventuale sovraccarico CPU. |
| Voce robotica o sillabe spezzate | L'estrattore di pitch è troppo pesante (`crepe` full) -> passa a **RMVPE** o **FCPE**, oppure abbassa **Index Ratio**. |
| **GPU Delay** alto o crepitii solo mentre giochi | **Saturazione GPU**: limita gli FPS nel gioco, abbassa le impostazioni grafiche pesanti o aumenta **Block Size**. |
| Un modello funziona su file ma fallisce dal vivo | Controlla edizione del client dal vivo, architettura e supporto embedder. Prova un modello elencato come compatibile in quel client prima di cambiare dispositivi audio. |

[Fondamenti di RVC](../start/rvc-fundamentals.md) · [Risoluzione dei problemi](../reference/troubleshooting.md)

## RVC Blue

Conversione vocale desktop su Windows. [Installazione e configurazione](../other-rvcs/voice-changers/rvc-blue/installation.md).
