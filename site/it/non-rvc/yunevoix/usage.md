# Voice Bank e Uso LIVE

Usa questa guida per creare voci nel **Voice Bank**, instradare YuneVoix verso **Discord, OBS, giochi o VRChat**, usare i controlli di monitoraggio integrati e scegliere il giusto **Model method** per la conversione LIVE. Per il dettaglio di ogni slider, vedi [Impostazioni e qualità audio](settings.md).

## 1. Creare e condividere voci (Voice Bank)

A differenza di RVC tradizionale, creare un profilo **Voice Bank** in YuneVoix **non addestra una rete neurale da zero**, ma genera in pochi secondi un riferimento vocale leggero `.yvoice`.

1. Apri la scheda **Voice Bank**.
2. Fornisci **10–25 secondi** di registrazioni chiare della voce target:
   - **Cosa usare:** Un solo parlante, audio pulito e asciutto senza musica di sottofondo, riverbero pesante o voci sovrapposte.
   - **Varietà utile:** Includere **risate naturali, respiri, "mmm" e canto** aiuta YUNE a catturare l'espressività.
   - **Cosa evitare:** Clip sotto i 10 secondi, audio distorto/clippato, più persone che parlano insieme o forte eco della stanza (che rendono la voce convertita rumorosa o instabile).
3. Lascia la pulizia su **"Separate voice + remove reverb (recommended)"** se il campione ha rumore di fondo o riverbero.
4. Salva la voce: viene salvata come file `.yvoice` dentro `models\yune\voices`.
5. Clicca **Play sample** nel Voice Bank per ascoltarla (dalla v0.7.0 **Play sample** riproduce sull'uscita predefinita di Windows / cuffie, non sull'uscita LIVE).

Per condividere o fare backup di una voce, usa **Voice Bank → Open folder** per trovare il file `.yvoice`, oppure carica una voce tramite **Import .yvoice…**.

> **Uso responsabile:** Usa solo voci che hai il diritto di utilizzare (la tua, o di chi ha acconsentito). Non usare mai YuneVoix per impersonare persone reali, ingannare, molestare o commettere frodi.

---

## 2. Configurare il routing audio LIVE e il monitoraggio

> **Indossa sempre le cuffie** dal vivo. Con gli altoparlanti (o cuffie aperte a volume alto poco isolate), la voce convertita rientra nel microfono generando audio doppio, eco e loop di feedback.

### Instradamento verso Discord, OBS, giochi o VRChat

Con un cavo audio virtuale come **VB-CABLE** (o **VAC** `Line 1`), ricorda che il cavo ha due lati: **YuneVoix** invia l'audio *nel* cavo, mentre **Discord / OBS / giochi** ricevono *dal* cavo:

1. **Dentro YuneVoix (scheda LIVE):**
   - **Input (Microfono):** Il tuo microfono fisico.
   - **Output:** **`CABLE Input`** (VB-CABLE) oppure **`Line 1`** (VAC).
2. **Dentro Discord, OBS, VRChat o il gioco:**
   - **Dispositivo di input (Microfono):** **`CABLE Output`** (VB-CABLE) oppure **`Line 1`** (VAC).
   - **Dispositivo di output (Cuffie):** Le tue **cuffie** (mai il cavo virtuale).
3. **In Discord:** Disattiva **Soppressione rumore (Krisp)** e **sensibilità di input automatica** per questo microfono virtuale: tagliano respiri e parole basse, e YuneVoix pulisce già l'ingresso.

### Ascoltare la propria voce (Monitoraggio integrato)

**Non** usare l'opzione di Windows *"Ascolta il dispositivo"* sul cavo virtuale. YuneVoix integra i propri controlli di monitoraggio:

- **(Opzionale) Per ascoltarti:** Usa **"Listen to input"** (ciò che il motore sente dopo la pulizia) oppure **"Listen to output"** (la voce convertita) nella scheda **LIVE**.
- Scegli il **Monitor device** (le cuffie, mai il cavo virtuale usato come Output LIVE) e **Monitor volume** (predefinito `-6 dB`) in **`Settings → General`**.
- **Nota sul direct monitoring:** Il *direct monitoring* hardware di cuffie o interfacce audio non ha alcun ritardo, ma fa sentire la **voce originale non elaborata**, non quella convertita.

### Latenza attesa

Alle impostazioni predefinite (`Output buffer` `200 ms`), il ritardo end-to-end totale è di circa **0,7 secondi** (secondo lo sviluppatore). È ottimo per chat vocali, streaming e registrazioni, ma troppo alto per cantare perfettamente a tempo su una base dal vivo (per cantare sulla musica vedi [Song Cover e Karaoke](song-cover-karaoke.md)).

---

## 3. Model Method: Classic vs. Learned 4 Steps vs. FlowEdit 3+1

Puoi scegliere **Model method** in **`Settings → Voice & Timbre`** (e separatamente in **`Settings → Song Cover`** per cover e karaoke). Le modifiche si applicano **al prossimo START**.

### Classic (Predefinito)

- Comportamento delle versioni precedenti.
- **Model steps** (`10` predefinito, oppure `8` / `6` / `4`), **Solver** (`Euler` / `DPM++ 2M`), **Guidance (CFG) only in the first half of the steps** e **Timbre guidance** si applicano **solo** in modalità Classic.

### Learned 4 steps

- Ottimizzata per suonare come Classic 10 steps richiedendo circa il **40%** del tempo GPU del modello e meno memoria GPU (secondo le note dello sviluppatore).
- Scelta consigliata da provare quando giochi in contemporanea o usi schede grafiche più lente.

### FlowEdit 3+1

- Parte dalla **tua stessa voce** anziché dal rumore e cambia solo l'identità vocale, mirando a preservare meglio **respiri, sussurri, risate e articolazione** (riportata a circa il **60%** del tempo GPU del modello).
- **Requisito LIVE:** Richiede un campione di **5–20 secondi** del tuo parlato normale selezionato in **`Settings → Voice & Timbre → "Sample of your voice…"`** (salvato come `my_voice.yvoice`).
- **Fallback automatico:** Senza quel campione, oppure su **AMD MIGraphX**, FlowEdit 3+1 passa automaticamente a **Learned 4 steps** e la riga di stato LIVE lo segnala.
- **Consiglio su stanza e microfono:** Poiché FlowEdit conserva più caratteristiche del tuo timbro e dell'ambiente, una stanza silenziosa o la pulizia **`DF3`** aiutano a mantenere pulito il risultato.

---

## 4. Regolazioni consigliate e Vocal Fry

- **Microphone level (`Settings → General`):** Osserva il misuratore e alza il guadagno del microfono in Windows finché i picchi arrivano intorno a **`−6 dBFS`**. Un microfono troppo basso è la causa più comune di voce robotica o "sott'acqua".
- **Input cleaning (`Settings → General`):** Lascia **`DF3`** attivo in stanze rumorose (rimuove tastiera, click e fruscio; `+30 ms`). In stanze silenziose, se risate o respiri vengono tagliati, tieni **Speech gate** spento e prova **`Gentle`**.
- **Smooth out vocal fry (`Settings → Voice & Timbre`, e `Settings → Karaoke`):** Se parli o canti molto basso o con voce creaky e la voce target suona eccessivamente rasposa, attiva **Smooth out vocal fry** (funziona dal vivo; la breathiness viene preservata).
- **Pitch e Content engine:** Imposta **Pitch shift** (`Settings → Pitch & Autotune`) o una modalità **Automatic pitch**, e confronta a orecchio **Whisper** (predefinito) vs. **WavLM+** (`Settings → Voice & Timbre`, supportato su NVIDIA e AMD DirectML).

### Giocare mentre si usa LIVE

Se noti stuttering durante i giochi:
1. Limita gli **FPS** del gioco.
2. Imposta **Model method** su **`Learned 4 steps`**.
3. Riduci **Prompt length** (es. sotto `20 s`).
4. Disattiva **Harmony** se non ti serve.
5. Controlla il carico GPU complessivo (ridurre **Model steps** funziona solo in modalità **Classic**).

Prossimo passo: [Impostazioni e qualità audio](settings.md).
