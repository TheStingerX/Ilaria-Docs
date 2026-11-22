---
label: "Song Cover e Karaoke"
icon: ":musical_note:"
order: 95
permalink: /it/non-rvc/yunevoix/song-cover-karaoke/
description: "Guida completa per principianti alle funzioni offline Song Cover e Karaoke di YuneVoix PREMIUM, incluse le differenze di FlowEdit, controlli, scorciatoie e risoluzione problemi."
---
# YuneVoix Song Cover e Karaoke - Guida Completa per Principianti

[Panoramica e Requisiti](overview.md) · [Impostazioni e Qualità Audio](settings.md) · [Premium, Licenza e Aiuto](premium-and-troubleshooting.md)

**Song Cover** e **Karaoke** sono funzioni musicali offline sbloccate in **YuneVoix PREMIUM** (`license.yvl`). A differenza della modalità **LIVE**, Song Cover e Karaoke dispongono di schede di impostazioni dedicate, in modo che le modifiche in LIVE non alterino per errore i render delle tue cover.

---

## 1. Song Cover (Passo dopo Passo)

Song Cover separa un brano in voce e base strumentale, converte la voce nella voce selezionata dal tuo Voice Bank e mixa la traccia finale (richiedendo circa **1.3×** la durata del brano sulla GPU, ad esempio un brano di 5 minuti richiede circa 6-7 minuti secondo le note dello sviluppatore).

1. Apri la scheda **Song Cover** (richiede un file `license.yvl` attivo).
2. **Scegli il brano:** Carica un file audio (WAV, MP3, FLAC, M4A, AAC, OGG, WMA o AIFF, fino a **15 minuti**).
3. **Seleziona la voce di destinazione:** Scegli una voce `.yvoice` dal tuo Voice Bank.
4. **Configura la separazione vocale:**
   - **Vocal separator:** **`YUNE`** (predefinito, consigliato, ~2× più veloce).
   - **Vocals to convert:** **`Lead vocal only`** (predefinito, risultato più pulito).
5. **Apri `Settings → Song Cover`** *(oppure clicca **Copy settings from LIVE** due volte per importare modello, timbro, filtri ed effetti da LIVE)*.
6. **Imposta Octave:** Lascia **`Auto`** (predefinito); se il risultato suona troppo acuto o troppo grave, imposta `−12`, `0` o `+12`.
7. **Scegli Content engine:** **`Whisper`** (predefinito, timbro più fedele) oppure **`WavLM+`** (meno ronzio sulle note soffiate, parole leggermente meno precise; supportato su NVIDIA e AMD DirectML).
8. **Scegli Model e Model method:**
   - **Model:** **`base`** (predefinito, consigliato) oppure **`fine-tuned`**.
   - **Model method:** **`Classic`** (`10 × Euler` consigliato per le cover), **`Learned 4 steps`** oppure **`FlowEdit 3+1`**.
   - **Prompt length** (`20 s`), **Timbre change** (`50%`), **Roughness** (`off`), **CFG** (`0.7`) e **Fix pitch detector errors** (`on`) corrispondono alle rispettive opzioni in LIVE.
9. **Configura livello, riverbero e formato di esportazione:**
   - **Vocal level:** `+2 dB` (predefinito).
   - **Vocal reverb:** livello proprio `−17 dB` (predefinito), uguale all'originale o nessuno.
   - **Keep the separated tracks:** `Off` (predefinito); attiva **On** per saltare la separazione se vuoi ri-renderizzare lo stesso brano.
   - **File format:** **`WAV 24-bit`** (predefinito) oppure **`MP3 320 kbps`** (richiede l'encoder MP3 di Windows).
10. **Genera ed esporta** la cover.

### FlowEdit 3+1 in Song Cover

A differenza della modalità LIVE, **FlowEdit 3+1 in Song Cover usa come sorgente la voce originale separata del brano stesso**, non il tuo campione `my_voice.yvoice`. Ciò significa che FlowEdit in Song Cover mira a conservare i respiri e l'articolazione del cantante originale senza richiedere una registrazione della tua voce.

---

## 2. Karaoke (Passo dopo Passo: PREPARE → SING → RENDER COVER)

Karaoke ti permette di cantare un brano in prima persona con testo sincronizzato su schermo, quindi converte la tua voce registrata nella voce di destinazione e la mixa nella traccia.

### Passo 1: PREPARE

1. Apri la scheda **Karaoke** e carica **brano** e **testo** (testo semplice incollato o file `.lrc`; il giapponese funziona anche in romaji e sono supportate codifiche legacy come Shift-JIS).
2. In **`Settings → Karaoke`**, scegli **Sing along to**:
   - **`Backing track`** (predefinito): separa il brano durante **PREPARE** (2-3 minuti la prima volta) e offre la sincronizzazione più precisa del testo.
   - **`Original song`**: parte in pochi secondi ed esegue la separazione al primo render.
3. Clicca **PREPARE**. Se il testo slitta leggermente, la tua correzione di sincronizzazione viene memorizzata.

### Passo 2: SING

1. Controlla **Headphones** (uscita predefinita di Windows) e **Microphone** (uguale a LIVE) in `Settings → Karaoke`.
2. Clicca **SING** per aprire la finestra del testo (avviare il Karaoke libera il motore LIVE dalla GPU).
3. **Controlli della finestra del testo:**
   - **`Space`:** Pausa / riprendi.
   - **`Esc`:** Ferma il canto (la cover termina 5 secondi dopo lo stop).
   - **`F11`:** Attiva/disattiva schermo intero.
4. Controlla il misuratore del microfono integrato e canta tutto il brano (YuneVoix compensa il clock drift e avvisa se non è stata registrata alcuna voce o se il microfono è andato in clipping).

### Passo 3: RENDER COVER

1. Regola le opzioni di mix in **`Settings → Karaoke`** se necessario.
2. Clicca **RENDER COVER**. Modello, metodo del modello, timbro, filtri, effetti e formato di esportazione provengono da **`Settings → Song Cover`**.

### Impostazioni Karaoke: Monitoraggio vs. Render Finale

| Impostazione (`Settings → Karaoke`) | Predefinito | Influisce su ciò che senti mentre canti | Influisce sulla cover renderizzata finale |
| --- | --- | --- | --- |
| **Original vocal in headphones** | `20%` | Sì | No |
| **Backing vocals** | `On` | Sì | No (la cover mantiene i cori come in Song Cover) |
| **Music volume** | `0 dB` | Sì | No |
| **Lyrics size** | `Normal` | Sì (visualizzazione) | No |
| **Clean the recording** (`Off` / `DF3`) | `Off` | No | Sì |
| **Content engine** (`Whisper` / `WavLM+`) | `Whisper` | No | Sì |
| **Octave** | `Auto` (registro del cantante entro l'estensione target) | No | Sì |
| **Pull to the original melody** | `Off` (`50-70%` naturale) | No | Sì |
| **Follow the original vocal's level** | `70%` (dinamica + limiter) | No | Sì |
| **Make room for the vocal** | `Up to 60%` (attenua `1-4 kHz` mentre canti) | No | Sì |
| **Smooth out vocal fry** | `Off` | No | Sì |

---

## 3. Risoluzione Problemi Song Cover e Karaoke

| Sintomo | Cosa controllare e provare |
| --- | --- |
| **Testo fuori sincrono** | Usa **`Sing along to → Backing track`** in **PREPARE**, carica un file `.lrc` temporizzato se disponibile, oppure applica una correzione di sincronizzazione in Karaoke (salvata per brano). |
| **Microfono non rilevato / nulla registrato** | Verifica **Microphone** in `Settings → Karaoke`, i permessi di privacy del microfono in Windows e osserva il misuratore nella finestra del testo. |
| **Voce registrata troppo bassa** | Alza il guadagno del microfono in Windows verso `−6 dBFS`, attiva **Follow the original vocal's level** (`70%` predefinito) e mantieni attivo **Make room for the vocal**. |
| **Tonalità errata / stonato** | Controlla **Octave** (`Auto`, `−12`, `0` o `+12`) e prova **Pull to the original melody** (`50-70%`) in `Settings → Karaoke`. |
| **Scatti durante il Karaoke** | Chiudi le altre app che usano molto la GPU, usa **`Backing track`** (già separata in PREPARE) o controlla le impostazioni del buffer audio. |
| **Musica troppo alta / voce coperta** | Alza **Vocal level** (`+2 dB` predefinito; `Settings → Song Cover` per le cover, `Settings → Karaoke` per il karaoke), mantieni attivo **Make room for the vocal** oppure abbassa **Music volume** mentre canti. |
| **Respiri o sussurri persi nella cover** | Confronta **`WavLM+`** vs. **`Whisper`**, oppure imposta **Model method** su **`FlowEdit 3+1`** in `Settings → Song Cover`. |
| **Troppo riverbero sulla voce della cover** | Abbassa **Reverb on the vocal** (`−17 dB` predefinito) o impostalo su nessuno - in `Settings → Song Cover` per le cover, in `Settings → Karaoke` per il karaoke. |
| **Artefatti di separazione vocale / duetti** | Lascia **Vocal separator** su **`YUNE`** e **Vocals to convert** su **`Lead vocal only`** (nei duetti con due voci principali non è possibile isolare automaticamente un solo cantante). |

Prossimo passo: [Premium, Licenza e Aiuto](premium-and-troubleshooting.md).
