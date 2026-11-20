---
label: "Instrada e sintonizza Vonovox"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
description: "Utilizza tre endpoint: il microfono fisico per l'ingresso, un cavo virtuale per il segnale convertito e le cuffie per il monitoraggio. Un cavo virtuale ha..."
---
# Instrada e sintonizza Vonovox

## Imposta il percorso

Utilizza tre endpoint: il microfono fisico per l'ingresso, un cavo virtuale per il segnale convertito e le cuffie per il monitoraggio. Un cavo virtuale ha un lato di riproduzione per l'app che invia l'audio e un lato di registrazione per l'app che lo riceve. Alcuni driver mostrano lo stesso nome di linea su entrambi i lati.

1. In Vonovox, imposta **Dispositivo di input** sul microfono fisico. Imposta **Dispositivo di output** sulla linea virtuale elencata sotto Dispositivi di riproduzione Windows.
2. Nell'app ricevente, seleziona la riga corrispondente sotto le impostazioni del microfono. Evita di lasciare l'app su **Predefinita** se seleziona il microfono fisico. Mantieni l'uscita dell'altoparlante dell'app ricevente impostata sulle cuffie.
3. Per ascoltare localmente, apri **Impostazioni → Sistema → Suono → Altre impostazioni audio → Registrazione**. Apri le proprietà dell'endpoint di registrazione del cavo, seleziona **Ascolta questo dispositivo** e invia la riproduzione alle cuffie. Disattiva l'ascolto se esegui già il monitoraggio tramite un'altra app.
4. Prova nell'app ricevente con una registrazione privata o il relativo test del microfono. Pronuncia una frase normale, aspetta in silenzio, quindi pronuncia una frase più forte. Verifica che la registrazione contenga la voce convertita, le pause pulite e nessuna seconda copia del tuo microfono grezzo.

Lo sviluppatore utilizza un percorso audio a 48 kHz. Se il microfono e il driver virtuale espongono tale frequenza, imposta i formati del dispositivo su 48 kHz. Questo formato del dispositivo è separato dalla frequenza di addestramento del modello.

## Sintonizza in ordine ripetibile

| Sintomo | Cambia prima per testare |
| --- | --- |
| Sillabe crepitanti o mancanti | Aumenta **Block Size** di un passo e ripeti la stessa frase. |
| Audio pulito con troppo ritardo | Riduci le **dimensioni del blocco** di un passaggio. Ripristina l'ultimo valore pulito se perde l'audio. |
| I sussurri o i canti scompaiono | Disabilita **RNNoise** e **VAD Noise Reduction** se abilitati e controlla eventuali porte vocali a valle. |
| L'audio locale è chiaro ma l'audio inviato è silenzioso | Verifica che l'app ricevente stia ascoltando l'endpoint di registrazione del cavo. |
| La voce si ripete o fa eco | Disabilita il monitoraggio duplicato e assicurati che l'uscita della chiamata venga indirizzata direttamente alle cuffie. |
| L'audio si interrompe solo durante il gioco | Testalo con il normale carico di gioco. Concedere spazio alla GPU del convertitore o aumentare la dimensione del blocco. |

Continua a guardare avanti alla sua preimpostazione per il primo test. Cambialo solo dopo aver trovato una dimensione di blocco stabile. Accorda l'altezza e la formante in modo indipendente, facendo delle pause tra le modifiche in modo che gli artefatti risultanti siano più facili da isolare. Durante il test della riproduzione di file in tempo reale, controlla la sorgente attiva nell'interfaccia utente prima di riprendere a utilizzare il microfono. Un file in riproduzione può sostituire temporaneamente il microfono fisico.

## Guida virtuale ai cavi Windows

### Scegli VAC Lite o VB-CABLE

**VAC Lite è la prima scelta consigliata per Vonovox.** Questa è anche la preferenza nella configurazione Windows del progetto Vonovox. Usa [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) se stai iniziando da zero. [VB-CABLE](https://vb-audio.com/Cable/) è un'alternativa utilizzabile se è già installato o funziona meglio con la tua particolare configurazione audio. Installa prima un driver in modo che l'elenco dei dispositivi sia facile da seguire.

Dopo aver installato il driver, riapri il convertitore e l'app di chiamata o di registrazione in modo che possano vedere i nuovi endpoint audio. Riavvia Windows se richiesto dal programma di installazione. I nomi di esempio riportati di seguito possono includere il nome di un driver o un suffisso di numerazione.

| Driver | Uscita convertitore (endpoint di riproduzione) | Discord, OBS, giochi o altre app (dispositivo di registrazione) |
| --- | --- | --- |
| VAC Lite | **Linea 1** in Riproduzione | **Linea 1** in Registrazione |
| VB-CABLE | **CABLE Input** | **CABLE Output** |

### Collega correttamente i quattro dispositivi

1. Nel cambia voce, imposta **ingresso** sul tuo microfono fisico. Parla per confermare i movimenti del misuratore di input.
2. Nel cambia voce, imposta **uscita** sul punto finale di riproduzione del cavo scelto. Mantieni il convertitore in funzione.
3. In Discord, seleziona l'endpoint di registrazione corrispondente in **Voce e video → Dispositivo di input**. In OBS, aggiungi un'origine **Audio Input Capture** per l'endpoint di registrazione. Disattiva qualsiasi sorgente microfonica duplicata durante il test.
4. Imposta la riproduzione Discord o Windows sulle cuffie. Tieni i suoni del sistema e la voce dell'altra persona fuori dal cavo. Registra o utilizza il test del microfono dell'app di destinazione per verificare cosa effettivamente lo raggiunge.

### Monitora brevemente e controlla il formato audio

Apri **Impostazioni → Sistema → Suono → Altre impostazioni audio → Registrazione**. Scegli il punto finale di registrazione del cavo, apri **Proprietà → Ascolta**, attiva **Ascolta questo dispositivo** e seleziona le cuffie per la riproduzione. Prova a basso volume. Se il convertitore o l'OBS fornisce già il monitoraggio, utilizzare un monitor alla volta per evitare l'eco. Puoi disattivare l'ascolto di Windows dopo il test e continuare a inviare il cavo a destinazione.

Per Vonovox, iniziare con la modalità condivisa WASAPI, ove disponibile. Utilizzare 48 kHz sul microfono e sulle terminazioni del cavo se lo supportano. Il formato del dispositivo Windows è separato dalla frequenza di addestramento del modello. Se il dispositivo può utilizzare solo un formato supportato diverso, testare il percorso effettivo prima di modificare altre impostazioni.

### Trova quale collegamento nella catena ha fallito

| Cosa succede | Primo controllo |
| --- | --- |
| Non si muove nulla in Vonovox | Verifica l'autorizzazione del microfono di Windows e l'ingresso del microfono fisico. |
| Vonovox riceve il microfono ma il cavo non ha segnale | Controlla che la conversione sia in esecuzione e che l'uscita del convertitore sia il punto finale di riproduzione del cavo. |
| Il cavo ha segnale ma Discord invia il microfono grezzo | Seleziona esplicitamente l'endpoint di registrazione via cavo nell'app di chiamata. |
| Senti la tua voce due volte | Disabilita il monitoraggio duplicato e controlla che il microfono fisico non venga catturato separatamente. |
| Le voci delle altre persone ritornano come un'eco | Indirizza l'uscita della chiamata alle cuffie e rimuovi l'audio del desktop o della chiamata dal cavo. |
| L'audio suona bene finché il PC non è sotto carico | Ripristina il buffer predefinito o aumentalo e prova con il gioco o l'app di streaming in esecuzione. |
| Le sillabe scompaiono quando sussurri o canti | Test con rilevamento dell'attività vocale e soppressione del rumore disabilitati uno alla volta. |

Ottimizza **Dimensione blocco** una volta completato il percorso completo. Abbassalo di un passo e ripeti la stessa frase. Se ricevi clic o parole mancanti, ripristina l'ultimo valore pulito. Lascia il lookahead e gli altri effetti sui valori predefiniti finché non avrai una prova di riferimento stabile.
