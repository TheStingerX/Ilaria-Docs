# Usare CausalVC Realtime

Dopo aver eseguito almeno una volta `run-training` e aver preparato una voce `.cvc`, avvia il cambia-voce live con:
- **Windows**: `run-realtime.bat`
- **Linux**: `run-realtime.sh` *(puoi anche aggiungerlo al menu delle applicazioni con `realtime/scripts/install-desktop-entry.sh`)*

> **Indossa sempre le cuffie** quando usi un cambia-voce dal vivo. Con le casse, la voce convertita rientra nel microfono creando eco e fischi.

## 1. Configura l'audio (pagina `Audio`)

1. **Input → Source**:
   - Scegli **Microphone / audio device** per parlare dal vivo.
   - *(Oppure scegli **Audio file** per testare una voce facendo passare un file registrato attraverso il modello.)*
2. **Input device**: seleziona il tuo microfono fisico.
3. **Output device**: seleziona dove inviare la voce convertita.
   - Per usare CVC su **Discord, OBS, VRChat o nei giochi**, installa un cavo audio virtuale (come **VB-CABLE** su Windows), imposta qui **`CABLE Input`** e poi scegli **`CABLE Output`** come microfono in Discord/OBS.
4. **Monitor device** *(opzionale)*: seleziona le tue **cuffie** se vuoi ascoltare la tua voce convertita. Lascia **Disabled** se non vuoi sentirti.
5. *(Consiglio Linux)*: i dispositivi `[JACK]` offrono la latenza più bassa. Puoi impostare il periodo di PipeWire con `PIPEWIRE_QUANTUM`, es. `128/48000`.

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

## 2. Scegli e regola la voce (pagina `Model`)

1. Seleziona **Model** (e **Checkpoint** se la voce ha più step salvati).
2. **Pitch (semitones)**: sposta l'intonazione in alto o in basso per adattarla alla voce target (`+12` = un'ottava sopra, `-12` = un'ottava sotto).
   - **Pitch match**: non andare a tentativi! Trascina clip della voce del modello in Pitch match per misurarne i Hz mediani, poi parla mentre converti così CVC misura la tua voce e propone lo spostamento esatto (**Apply**).
3. **Advanced pitch** *(chiuso di default - la maggior parte delle voci non ne ha bisogno)*:
   - **Pitch offset (Hz)**: aggiunge un offset fisso in Hz dopo lo shift in semitoni. Valori positivi alzano le note basse più delle alte (restringendo l'estensione); valori negativi la ampliano.
   - **Pitch ceiling (Hz)** e **Above the ceiling (%)**: abbassa i picchi troppo acuti sopra la soglia mantenendo intonate le note sotto di essa (ottimo per il canto; `0%` blocca esattamente alla soglia).
4. **Formant**: sposta la risonanza vocale (quanto "grande" o "piccola" suona la voce) senza cambiare l'intonazione (`0` = formante naturale del modello).
5. **Index (%)** *(disattivato di default)*: fonde ogni 20 ms di parlato verso i momenti più simili dell'audio di addestramento. Valori alti avvicinano al timbro originale, ma troppo alti impastano le parole.
   - **Consonant protection** *(attivo solo con Index > 0)*: mantiene respiri e consonanti (`s`, `t`, `k`) più vicini ai tuoi per non impastare la dizione.

## 3. Regola i volumi (`Levels`)

- **Input gain**: alza o abbassa il microfono prima della conversione.
- **Output gain**: regola il volume inviato a Discord/OBS/giochi.
- **Monitor gain**: regola solo il volume che senti nelle tue cuffie.
- **Noise gate**: silenzia il microfono quando scendi sotto questa soglia (`-60 dB` = disattivato).
- **Output level (LUFS)**: parla durante la conversione per misurare il volume e clicca **Apply** per regolare automaticamente Output gain verso **Voice chat (`-21 LUFS`)** o **Streaming (`-16 LUFS`)**.

## 4. Avvia la conversione (barra in basso)

- Clicca **Start** per avviare la conversione dal vivo, oppure **Passthrough** per far passare il microfono grezzo e controllare i volumi.
- Controlla i misuratori **In / Out / Mon** e i due valori di tempo:
  - **Latency**: ritardo totale dal microfono all'uscita.
  - **Inference**: tempo impiegato dalla GPU per convertire un blocco. **Inference deve restare ben sotto la durata del Chunk** (es. `< 10 ms` per un chunk da `20 ms`), altrimenti l'audio scatterà.
