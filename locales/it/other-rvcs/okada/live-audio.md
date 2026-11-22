---
label: "Audio live e routing"
icon: ":studio_microphone:"
order: 90
permalink: /ilaria-rvc/okada/live-audio/
description: "Inizia con le cuffie e un unico percorso audio locale. Quando senti una voce convertita senza disturbi nelle cuffie, collegala a una chiamata o a un registratore."
---
# Convertire l'audio del microfono con w-okada VCClient

Inizia con le cuffie e un unico percorso audio locale. Quando senti una voce convertita senza disturbi nelle cuffie, collegala a una chiamata o a un registratore. Questo ordine consente di individuare i problemi prima di aggiungere il cavo virtuale.

## Aggiungi un modello e ascolta il primo risultato

1. Collega il microfono e le cuffie prima di aprire VCClient. Nel sistema operativo, parla nel microfono e verifica che l'indicatore del livello in ingresso si muova. Metti in pausa Discord, OBS e altre app di acquisizione durante questo test.
2. In **Model Selection**, scegli un modello campione compatibile, se disponibile. Per il tuo modello, utilizza **Edit**, scegli uno slot libero e scegli **Upload**. Seleziona **RVC** quando la finestra di dialogo richiede un tipo di modello. Fornisci il file di inferenza accettato dalla tua versione e il relativo indice, se disponibile. Attendi il caricamento, quindi seleziona lo slot appena compilato nella schermata principale.
3. Nei controlli audio scegli **Client** per un primo test lato browser. Seleziona il nome esatto del microfono fisico e il nome esatto delle cuffie. Se il browser richiede l'autorizzazione, consenti l'accesso al microfono per la pagina locale.
4. Disattiva il passthrough, lascia **Pitch** e **Index** a zero e mantieni i valori predefiniti per **Chunk**, **Extra**, **Crossfade** e il rilevatore di F0. Se hai importato un indice, puoi valutarlo dopo aver ascoltato il primo risultato.
5. Premi **Start**, attendi l'inizializzazione del modello e parla per almeno 30 secondi. Includi una frase a voce bassa, una frase normale, una frase più forte e una breve pausa. Con la conversione abilitata dovresti sentire la voce selezionata. Premi **Stop** quando apporti modifiche che richiedono il riavvio della conversione.
6. Se senti silenzio, prova gli stessi dispositivi in un semplice registratore. Se senti la tua voce originale due volte o la senti insieme alla conversione, disabilita il monitoraggio diretto del microfono sulla tua interfaccia o rimuovi il percorso software duplicato.

## Comprendere la modalità dispositivo client e server

**Client** utilizza i dispositivi disponibili per il client/browser. Le autorizzazioni del microfono e la selezione dell'output del browser possono influire sull'elenco dei dispositivi. **Server** apre i dispositivi sul computer che esegue il motore di conversione. Questo è importante su due computer: un microfono USB collegato al client non appare automaticamente sul server.

Se usi un solo PC, prova prima la modalità Client. Passa a Server se la tua versione offre un'uscita separata per l'ascolto o il browser non riesce a selezionare l'endpoint di output desiderato. In modalità Server, scegli l'API host e i nomi dei dispositivi offerti dal server. Se più voci condividono un nome, prova a utilizzare la stessa API audio per input e output. Una volta che il segnale è stabile, puoi testare le alternative per la latenza.

## Invia la conversione a Discord, OBS o un'altra app

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

1. Installa un cavo virtuale per il tuo sistema operativo e riapri entrambe le applicazioni in modo che l'elenco dei dispositivi si aggiorni. Dovrebbe esporre un endpoint di riproduzione e un endpoint di registrazione corrispondente.
2. Imposta l'ingresso VCClient sul microfono fisico. Imposta l'uscita del convertitore sul terminale di **riproduzione** del cavo. Con VB-CABLE, questo è comunemente **CABLE Input**.
3. Se l'app espone un dispositivo **Monitor** separato, impostalo sulle cuffie. Seleziona le cuffie anche come uscita dell'app di destinazione.
4. Seleziona l'endpoint di **registrazione** del cavo come microfono di destinazione. Con VB-CABLE, questo è comunemente **CABLE Output**. In OBS, seleziona il dispositivo per l'acquisizione dell'ingresso audio e disattiva ogni acquisizione separata del microfono fisico.
5. Utilizza una chiamata di prova o effettua una breve registrazione locale nell'app di destinazione. Prova il parlato a voce bassa e ad alta voce. Verifica che l'indicatore del volume nell'app ricevente smetta di muoversi quando fermi VCClient o disattivi la sorgente convertita. Se continua a muoversi, controlla se c'è un altro ingresso attivo o un collegamento audio indesiderato.
6. Prova ad attivare e disattivare la soppressione del rumore o il guadagno automatico nell'app ricevente solo se il convertitore suona bene localmente e l'app ricevente taglia le sillabe o modifica il livello. Mantieni le opzioni adatte alla tua stanza e al tuo microfono.

```text
Physical microphone → VCClient → cable playback → cable recording → call or recorder
                           └── optional monitor → headphones
```

## Ottimizza una configurazione che già funziona

Parti dal valore predefinito di **Chunk** e ripeti la prova con le app che userai durante la diretta. Quando l'interfaccia utente mostra la durata del blocco e il tempo di conversione, confrontali in unità corrispondenti. Ogni blocco ha bisogno di tempo sufficiente per finire. Lascia un margine per i picchi durante l'esecuzione di un gioco o di uno streaming. Riduci **Chunk** di un livello alla volta e ascolta se il segnale si interrompe. Se le parole vengono tagliate, aumenta di nuovo **Chunk** o riduci **Extra**. **Crossfade** attenua gli stacchi tra i blocchi, ma richiede più elaborazione.

Scegli un rilevatore di F0 adatto al tuo registro di parlato. Confronta la stessa frase ad ogni impostazione. **Pitch** sposta il registro. **Index** regola quanto pesano le caratteristiche recuperate dall'indice associato al modello. Aumenta gradualmente uno dei due e registra il risultato. Mantieni stabile il guadagno del modello e del microfono durante il confronto.

| Sintomo | Prova da fare |
| --- | --- |
| La voce originale raggiunge la chiamata | Disattiva il passthrough e scegli il cavo come unico microfono nell'app ricevente. |
| La distorsione è già presente nella registrazione del microfono normale | Abbassa il guadagno dell'ingresso fisico prima di regolare il modello. |
| La prima sillaba scompare dopo una pausa | Confronta la soglia di ingresso e l'attivazione vocale di destinazione. Prova una registrazione con l'attivazione vocale disabilitata per capire in quale passaggio si perde la sillaba. |
| Il monitor locale va bene, ma l'audio del cavo gracchia | Abbina le frequenze di campionamento supportate nel pannello audio del sistema operativo e riapri entrambi i flussi. Verifica la presenza di una seconda applicazione che mantiene l'endpoint in modalità esclusiva. |
| La conversione su GPU non funziona e la CPU funziona | Controlla separatamente il pacchetto selezionato, il formato del modello e il provider di elaborazione. Esegui la prova con lo stesso modello funzionante su ciascun dispositivo. |
| La conversione rallenta all'apertura di un gioco | Aumenta la dimensione del blocco o riduci il carico di lavoro della GPU concorrente. Ripeti una registrazione più lunga prima di andare in diretta. |

Conserva in una nota il nome del pacchetto funzionante, il modello, la modalità audio, i nomi dei dispositivi, il rilevatore di F0 e i controlli del buffer. Ciò fornisce una configurazione di riferimento dopo un aggiornamento del dispositivo o del software.
