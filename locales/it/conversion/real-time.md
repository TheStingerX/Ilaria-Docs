---
label: "⚡ Conversione in tempo reale"
order: 92
permalink: /real-time/
description: "Per una registrazione o una cover, la conversione dei file ti consente di renderizzare e confrontare diverse riprese."
---
# Conversione vocale in tempo reale

Per una registrazione o una cover, la conversione dei file ti consente di renderizzare e confrontare diverse riprese. In una configurazione live, il convertitore deve completare ciascun blocco audio abbastanza velocemente da mantenere in movimento il flusso del microfono. Configura prima un segnale locale affidabile, quindi collegalo a un'applicazione di chiamata, registrazione o streaming.

## Scegli uno strumento per il lavoro

Consulta la [directory degli strumenti RVC](../reference/tools.md) per download e note hardware, incluso Vonovox per GPU NVIDIA.

 | Strumento | Da dove cominciare |
| --- | --- |
 | Vonovox | Un convertitore in tempo reale per i modelli RVC V2 su Windows con una GPU NVIDIA. Scarica una build per la tua GPU, carica il modello e testa il microfono tramite le cuffie prima di indirizzare il segnale convertito a un'altra app. [Download di Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentazione del progetto](https://github.com/dr87/Vonovox) |
 | RVC WebUI (Mainline - Original RVC) | Il progetto upstream fornisce una WebUI di formazione e inferenza insieme a una GUI in tempo reale dedicata. Fai riferimento alle istruzioni di rilascio e di avvio per la piattaforma che utilizzi. |
 | Applio | Le sue interfacce Desktop e Gradio hanno i propri flussi di lavoro in tempo reale. Utilizza le istruzioni di configurazione per l'interfaccia e la versione che hai installato. |
 | w-okada VCClient | Un cambia voce per l'uso dal vivo. La disponibilità di RVC dipende dall'edizione e dalla piattaforma di rilascio. Controlla i modelli supportati prima di installare una build. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
 | Deiteris e Tg-Develop | Fork w-okada indipendenti con le proprie build e impostazioni. Controllare le note di rilascio del fork prima di applicare le istruzioni per un'altra edizione. [Repository Deiteris](https://github.com/deiteris/voice-changer) · [Repository Tg-Develop](https://github.com/tg-develop/voice-changer) |


## Ascolta prima un segnale pulito

1. Collega un microfono e le cuffie. Nel convertitore, seleziona il microfono fisico come ingresso e le cuffie come uscita.
2. Carica un modello di inferenza compatibile noto e il relativo indice corrispondente se utilizzi il recupero. Una breve [conversione file](../start/getting-started.md) riuscita è un riferimento utile prima di testare il percorso live.
3. Avvia lo streaming e parla a un livello normale. Controllare il misuratore d'ingresso o effettuare una registrazione asciutta. Ridurre il guadagno in ingresso se i picchi vengono tagliati prima della conversione.
4. Verifica che il segnale delle cuffie cambi quando viene attivata la conversione. Se ascolti l'originale contemporaneamente, controlla il monitoraggio hardware diretto o un secondo percorso attraverso il sistema operativo.
5. Prova per più di una singola parola. Includere un discorso tranquillo, una frase ad alta voce e una breve pausa. Ascolta eventuali interruzioni, deviazioni o anomalie con lo stesso carico di lavoro che prevedi di utilizzare dal vivo.

Evitare l'ascolto attraverso gli altoparlanti vicino a un microfono attivo. Le cuffie ti aiutano a identificare un problema di routing senza reinserire l'uscita nell'ingresso.

## Invia l'audio convertito a un'altra app

> **Correct Audio Routing**
>
> **1. Nel Voice Changer**
> - **Input Device:** Il tuo microfono fisico.
> - **Output Device:** `Line 1` (VAC, consigliato) o `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Giochi, OBS o altre applicazioni**
> - **Input Device:** `Line 1` (VAC, consigliato) o `CABLE Output` (VB-CABLE).
> - **Output Device:** Le tue cuffie o altoparlanti.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> L'audio in arrivo da Discord, dal gioco o da altre app deve andare direttamente alle **cuffie** (mai di nuovo nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) è sempre consigliato. Se hai anche (o solo) **VB-CABLE**, ricorda che il voice changer invia a **`CABLE Input`** mentre Discord / giochi ricevono da **`CABLE Output`**.
> - **Monitoraggio:** Ascoltare la propria voce convertita in cuffia è una funzione separata opzionale da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

Un dispositivo audio virtuale fornisce un endpoint di riproduzione per il convertitore e un endpoint di registrazione corrispondente per l'app ricevente. I nomi degli endpoint dipendono dal driver. Ad esempio, un cavo virtuale può chiamare il suo endpoint di riproduzione "Input" e il suo endpoint di registrazione "Output" perché le istruzioni utilizzano la prospettiva del cavo.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Seleziona l'endpoint di registrazione corrispondente come microfono nell'app ricevente ed effettua lì una breve registrazione di prova. Se il monitor locale suona correttamente ma la registrazione no, verifica l'input di destinazione e rimuovi qualsiasi sorgente microfonica duplicata. Se monitori l'audio convertito, utilizza un'uscita per cuffie separata. Evita di reinstradare l'intero mix desktop o l'audio dell'app ricevente nel convertitore.

## Ottimizza la latenza senza perdere stabilità

Il ritardo end-to-end include buffer del dispositivo, conversione, routing virtuale e qualsiasi elaborazione nella destinazione. Una cifra del tempo di elaborazione nel convertitore misura solo una parte di quel percorso. Cattura un test locale sia del microfono asciutto che del percorso convertito se hai bisogno di misurare il ritardo tra di loro.

 | Controllo | Regolazione pratica |
| --- | --- |
 | Dimensione del blocco o dimensione del blocco | Aumentala se la voce si interrompe sotto carico. Una volta stabile, prova un'impostazione più piccola e mantienila solo se il parlato normale rimane pulito. I blocchi più piccoli lasciano meno tempo per completare l'elaborazione. |
 | Dissolvenza incrociata | Aumenta con cautela se senti giunzioni irregolari tra i blocchi. Cambia il modo in cui i blocchi vicini si sovrappongono. |
 | Contesto extra | Prova meno contesto se il convertitore resta indietro. Può aiutare il modello a seguire le transizioni, al costo di una maggiore elaborazione. |
 | Predittore del tono | Se un'impostazione produce tempi instabili, confronta i predittori disponibili utilizzando le stesse frasi. Seleziona quello che gestisce l'intervallo del tono con un margine di elaborazione sufficiente. |
 | Rilevamento del silenzio o soglia di ingresso | Abbassa una soglia che taglia le sillabe morbide. Valutalo durante le pause e i discorsi tranquilli, non solo durante un input forte e prolungato. |
 | Frequenza del dispositivo | Controlla le frequenze di campionamento del dispositivo e del cavo virtuale se senti una velocità o un crepitio insoliti. Inizia con impostazioni compatibili lungo tutta la catena. |

Inizia con le impostazioni predefinite dell'app e modifica un'impostazione alla volta. Se un gioco o un altro programma con uso intensivo della GPU condivide la macchina, ripeti il ​​test mentre è in esecuzione. Mantieni una preimpostazione funzionante in modo da poterla ripristinare prima di andare in diretta. [GUI principale in tempo reale](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Risolvi il problema in base al punto in cui appare l'errore

 | Sintomo | Controlla prima |
| --- | --- |
 | Né il misuratore del convertitore né una registrazione con microfono a secco rispondono | Controlla il dispositivo di input del sistema operativo e l'autorizzazione del microfono. |
 | Il microfono a secco funziona, ma l'uscita convertita è silenziosa | Conferma che lo streaming è iniziato, il modello caricato e il convertitore ha selezionato l'uscita corretta. Controllare la soglia di ingresso. |
 | Il monitor locale funziona, ma la chiamata riceve la voce originale | Seleziona l'endpoint di registrazione virtuale come microfono della chiamata e disabilita qualsiasi sorgente di microfono fisico separata nell'app. |
 | Si sentono due versioni della voce | Disattiva i percorsi di ingresso duplicati e verifica che il monitor delle cuffie sia separato dal percorso virtuale. |
 | L'audio gracchia solo sotto carico | Ritorna all'ultima dimensione stabile del blocco, riduci i carichi di lavoro concorrenti e ripeti il ​​test. |
 | Un modello funziona nella conversione dei file ma fallisce dal vivo | Controlla l'edizione, l'architettura e il supporto dell'embedder del client live. Testare un modello elencato come compatibile in quel client prima di cambiare dispositivi audio. |

[Fondamenti di RVC](../start/rvc-fundamentals.md) · [Risoluzione dei problemi](../reference/troubleshooting.md)

## RVC Blue

Conversione vocale in tempo reale su Windows. [Installazione e configurazione](../other-rvcs/rvc-blue/installation.md).
## Ruoli dei dispositivi e backend audio

| Termine | Cosa indica |
| --- | --- |
| **Input Device** | Il microfono fisico (o interfaccia audio) che invia la voce al convertitore. |
| **Output Device** | Dove va la voce convertita (endpoint di riproduzione del cavo virtuale per Discord/OBS/giochi, o cuffie per test locale). |
| **Monitor Device** | Seconda uscita opzionale per riascoltarti in cuffia mentre **Output Device** alimenta il cavo virtuale. |
| **Virtual Cable Input** *(Riproduzione)* | Voce sotto Riproduzione Windows (Line 1 su VAC Lite / CABLE Input su VB-CABLE). Usala come **Output Device**. |
| **Virtual Cable Output** *(Registrazione)* | Voce sotto Registrazione Windows (Line 1 / CABLE Output). Usala come **Microfono** in Discord, OBS o giochi. |

- **Microfoni USB / Interfacce XLR:** Imposta 48000 Hz su tutti i dispositivi; usa **WASAPI Shared** per compatibilità con i cavi virtuali, **WASAPI Exclusive** per minor overhead quando supportato, oppure **ASIO** su interfacce dedicate (es. RVC Blue / w-okada).
- **Discord, OBS e Giochi:** Su Discord disattiva Krisp, Cancellazione eco e sensibilità automatica se tagliano le parole; su OBS aggiungi una sola sorgente **Cattura audio in ingresso** sul cavo virtuale; nei giochi limita gli FPS per lasciare margine alla GPU.
- **Latenza di elaborazione vs. latenza end-to-end:** Il **GPU Delay** misura solo il tempo GPU per blocco; la **latenza totale** include microfono, **Block Size**, crossfade, cavo virtuale e buffer di Discord/OBS/gioco.
