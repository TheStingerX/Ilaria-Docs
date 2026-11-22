# Usa Applio con un microfono

> **Correct Audio Routing**
>
> **1. Nel Voice Changer**
> - **Input Device:** Il tuo microfono fisico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. In Discord, Giochi, OBS o altre applicazioni**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Le tue cuffie o altoparlanti.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> L'audio in arrivo da Discord, dal gioco o da altre app deve andare direttamente alle **cuffie** (mai di nuovo nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** `Line 1` è il nome usato da **VAC (Virtual Audio Cable)**, non un nome universale per tutti i cavi virtuali. Con **VB-CABLE**, imposta Output del Voice Changer su **`CABLE Input`** e Input di Discord / gioco su **`CABLE Output`**.
> - **Monitoraggio:** Ascoltare la propria voce convertita in cuffia è una funzione separata opzionale da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

Verifica che il modello funzioni con [una clip registrata](inference.md) prima di configurare l'audio dal vivo. Usa le cuffie per l'ascolto, altrimenti il microfono può ricatturare il suono degli altoparlanti. Interrompi i processi di addestramento o di conversione di file che utilizzano la stessa GPU.

## Ascolta la voce convertita localmente

1. Apri **Realtime**. In Desktop, concedi l'autorizzazione al microfono quando richiesto, quindi seleziona **Input Device** e **Output Device**. Aggiorna l'elenco se hai collegato un dispositivo dopo aver aperto Applio.
2. Usa il tuo microfono fisico come ingresso e le tue cuffie come uscita o monitor per questo primo test. In Gradio, scegli i dispositivi in **Audio Devices**. I nomi dei dispositivi PortAudio potrebbero differire dai nomi di Windows o dalle etichette visualizzate sul Desktop.
3. Seleziona il modello testato, l'embedder con cui è stato addestrato e l'indice opzionale se lo usi. Avvia lo streaming e attendi che il motore sia pronto. In Desktop, attiva **Hear myself** per monitorare e impostare un volume adeguato.
4. Di' "uno, due, tre", fai una pausa, quindi ripeti al tuo livello normale. Ascolta la voce convertita, le sillabe mancanti o i clic. Se senti la tua voce invariata, verifica se **Passthrough** è attivo e controlla se il microfono è monitorato altrove.

## Invia la voce a un'app di chat o streaming

Una volta che il test delle cuffie funziona, interrompi lo streaming e scegli un cavo audio virtuale installato o un dispositivo equivalente del sistema operativo. Il cavo virtuale ha un endpoint che riceve la riproduzione e un altro che espone quel segnale come input di registrazione.

```text
Microfono fisico
  → Ingresso di Applio Realtime
  → Dispositivo di riproduzione del cavo virtuale
  → Dispositivo di registrazione del cavo virtuale
  → Discord, OBS o la tua app di registrazione
```

1. Mantieni l'ingresso di Applio sul microfono fisico e seleziona l'endpoint di riproduzione del cavo come uscita.
2. Nell'app ricevente, seleziona l'endpoint di registrazione del cavo come microfono. Se hai bisogno di monitoraggio, usa le cuffie. Disattiva i percorsi di ascolto che rimandano il segnale nel cavo.
3. Avvia Applio, quindi utilizza il test del microfono dell'applicazione ricevente o effettua una registrazione di prova privata. Verifica che l'app riceva il segnale convertito. Disattiva gli ingressi duplicati del microfono fisico se senti due voci.
4. Se il suono delle cuffie è corretto ma l'app ricevente è silenziosa, risolvi i problemi relativi ai nomi dei dispositivi, al livello di destinazione e alla selezione dell'ingresso prima di modificare la voce o l'indice.

## Bilancia ritardo e stabilità audio

Se disponibile, inizia con la dimensione automatica dei blocchi. Se l'audio si interrompe, aumenta **Chunk Size**, quindi ripeti esattamente la stessa frase. Blocchi più piccoli possono ridurre il ritardo lasciando al motore meno tempo per completare ogni blocco. **Crossfade Overlap Size** rende più graduali le giunzioni e **Extra Conversion Size** aggiunge contesto e richiede più risorse. Modifica un solo controllo per prova. Mantieni un'impostazione stabile a cui puoi tornare.

Se spariscono gli attacchi più deboli o la fine delle parole, controlla **VAD** o **Silence Threshold**. Se le vocali forti crepitano, controlla il segnale del microfono prima della conversione e abbassa il guadagno di ingresso. Se lo streaming fallisce solo con un particolare gioco o processo GPU in esecuzione, riprova con il processo chiuso. Interrompi la modalità live prima di tornare all'addestramento o alle altre attività in coda sulla GPU.
