---
label: "Voice Bank e uso live"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
---
# Voice Bank e uso live

Usa questa guida per creare voci nel **Voice Bank**, instradare YuneVoix su **Discord, OBS, giochi o VRChat** e regolare i parametri per una conversione dal vivo pulita.

## 1. Creare e condividere voci (Voice Bank)

YuneVoix non richiede **alcun addestramento**.

1. Apri la scheda **Voice Bank**.
2. Seleziona **10–25 secondi** di registrazioni pulite della voce target:
   - Risultato migliore: una sola persona, audio pulito senza musica né effetti.
   - Includere **risate, respiri, "mmm" e canto** aiuta il motore a catturare l'espressività vocale.
3. Mantieni attiva la pulizia **"Separate voice + remove reverb"** se il campione ha rumore di fondo o riverbero.
4. La voce sarà pronta in pochi secondi e salvata come file `.yvoice`.

Per condividere o fare il backup di una voce, usa **Voice Bank → Open folder** per trovare il file `.yvoice`, oppure caricalo con **Import .yvoice…**.

> **Uso responsabile**: usa solo voci per cui hai il diritto d'uso (la tua, o di chi ha acconsentito). Non usare YuneVoix per impersonare persone reali, ingannare, molestare o commettere frodi.

## 2. Configurare il routing audio live

> **Usa sempre le cuffie** in modalità live. Con le casse, la voce convertita rientra nel microfono generando eco, ronzii e feedback.

### Instradamento verso Discord, OBS, giochi o VRChat

1. Installa un cavo audio virtuale (ad esempio **VB-CABLE**, gratuito).
2. In **YuneVoix**, imposta il tuo microfono fisico come ingresso e **`CABLE Input`** come dispositivo di uscita.
3. In **Discord, OBS, VRChat o nel gioco**, seleziona **`CABLE Output`** come microfono.
4. *(Opzionale)* Per ascoltare la tua voce convertita: apri le **Impostazioni audio di Windows → Registrazione → CABLE Output → Proprietà → Ascolto**, attiva **"Ascolta il dispositivo"** e scegli le tue cuffie.
5. **Su Discord**, disattiva la **Soppressione rumore (Krisp)** e la **sensibilità di ingresso automatica** per questo microfono — tagliano respiri e parole a basso volume, mentre YuneVoix pulisce già l'ingresso.

### Latenza prevista

Con le impostazioni predefinite, il ritardo totale è di circa **0,7 secondi**: ottimo per streaming, chat vocali e registrazioni, ma troppo alto per cantare perfettamente a tempo su una base. Ridurre l'**Output buffer** abbassa leggermente la latenza ma può causare interruzioni audio.

## 3. Regolazioni consigliate

### Livello microfono e pulizia ingresso

- Vai su **Settings → General** e osserva **Microphone level**. Alza il volume del microfono su Windows finché il parlato forte raggiunge picchi attorno a **−6 dBFS**. Un microfono troppo basso è la causa più comune di voce robotica o "sott'acqua".
- Lascia **Input cleaning** su **`DF3`** negli ambienti rumorosi. In una stanza silenziosa, se risate, respiri o sussurri vengono tagliati, disattiva **Speech gate** e prova **`Gentle`**.

### Pitch e Autotune

Vai su **Settings → Pitch & Autotune**:
- **Pitch shift**:
  - **`+12`** per voce maschile → voce target femminile
  - **`0`** per una voce nello stesso registro
  - **`−12`** per voce femminile → voce target maschile
  - Oppure attiva il **pitch automatico**.
- Per il canto puoi attivare **autotune** (con rilevamento tonalità), **pitch stabilizer**, **vibrato depth** e **armonia live** (terze, quinte, ottave).

### Carattere vocale, effetti e carico GPU

- **Voice character**: regola intensità del timbro, formanti, calore e presenza, oppure parti da un preset.
- **Vocal effects**: de-esser, compressore, riverbero e peak limiter.
- **Content engine e FlowEdit** (**Settings → Voice & Timbre**):
  - Su NVIDIA, prova **WavLM+** per mantenere risate, sussurri e respiri dalla tua voce.
  - La modalità **FlowEdit** preserva di più il respiro e l'articolazione naturali.
  - Se stai **giocando contemporaneamente** e senti scatti audio, abbassa grafica/FPS del gioco, riduci **Model steps**, usa un prompt più corto o disattiva **Harmony**.
