# Impostazioni di YuneVoix Spiegate - Guida Completa alla Qualità Audio

[Panoramica e requisiti](overview.md) · [Voice Bank e uso LIVE](usage.md) · [Song Cover e Karaoke](song-cover-karaoke.md)

Questo riferimento spiega ogni impostazione documentata in YuneVoix **v0.7.1** (NVIDIA e AMD). Nella documentazione dello sviluppatore:
- **"Works live"** significa che la modifica ha effetto immediato mentre LIVE è in esecuzione.
- **"At the next START"** significa che devi fermare LIVE e premere di nuovo **START**.

---

## Settings → General

Questi controlli gestiscono pulizia ingresso, monitoraggio, volume d'uscita, buffer e selezione del motore grafico AMD (si applica a **LIVE**, con `Models folder` e `AMD graphics engine` globali):

| Controllo | Predefinito | Quando si applica | Cos'è e cosa fa | Quando usarlo e cosa può andare storto |
| --- | --- | --- | --- | --- |
| **Input cleaning** (`DF3`, `Gentle`, `Sidon`, `Off`) | `DF3` | Al prossimo START | Pulisce il microfono prima della conversione. `DF3` rimuove tastiera, click e fruscio alzando microfoni bassi (`+30 ms`). `Gentle` rimuove rumore costante/click preservando risate e respiri. `Sidon` ricostruisce il parlato su GPU (`+~200 ms`). `Off` disattiva la pulizia. | Usa `DF3` in stanze normali/rumorose, `Gentle` in stanze silenziose, `Off` solo per microfoni da studio puliti. **Non usare `Sidon` per il canto** (documentato come non adatto al canto). |
| **Speech gate** | `Off` | Works live | Silenzia l'uscita tra una parola e l'altra. | Attiva solo in stanze rumorose per parlato semplice; **taglia risate e sospiri**, quindi lascialo spento se ridi spesso. |
| **Microphone level** | Misuratore (obiettivo `−6 dBFS`) | Solo misuratore | Mostra il livello del microfono in dB. | Alza il guadagno in Windows finché i picchi arrivano vicino a **`−6 dBFS`**. Ingresso basso causa voce robotica/sott'acqua. |
| **Monitor device** | Uscita predefinita Windows | Monitoraggio LIVE | Sceglie dove riprodurre **"Listen to input"** / **"Listen to output"**. | Impostalo sulle **cuffie**, mai sul cavo virtuale usato come Output LIVE (evita loop di feedback). |
| **Monitor volume** | `−6 dB` | Monitoraggio LIVE | Regola il volume del monitoraggio integrato. | Abbassalo se è troppo forte; non influisce su ciò che ricevono Discord o OBS. |
| **Output volume** | `−6 dB` | Works live | Controlla il livello inviato al dispositivo di uscita LIVE. | YUNE suona più forte di molte registrazioni; tienilo attorno a `−6 dB` salvo necessità dell'app ricevente. |
| **Peak limiter (`−1 dBFS`)** | `On` | Works live | Limita i picchi a `−1 dBFS` evitando clipping digitale. | Lascialo **On** salvo test mirati sulla dinamica grezza. |
| **Output buffer** | `200 ms` | Al prossimo START | Dimensione del buffer audio prima della riproduzione. | Valori più grandi riducono crepitii/dropouts ma aumentano la latenza; abbassarlo troppo causa scatti audio. |
| **Models folder** | Vuoto (`models` accanto a `.exe`) | Globale | Punta a una cartella personalizzata per modelli e voci. | Lascialo vuoto se non sposti `models` altrove. |
| **Save diagnostic recordings** | `Off` | Diagnostica | Salva WAV di ciò che il motore ha ricevuto e prodotto (si ferma dopo 10 min; torna off al riavvio). | Attivalo **solo** per segnalare un problema; controlla l'audio per eventuali dati personali prima di inviarlo. |
| **Restore default settings** | Pulsante azione | Globale | Ripristina tutte le impostazioni predefinite. | Le voci salvate e i dispositivi selezionati restano intatti. |
| **AMD graphics engine** *(solo build AMD)* | `DirectML` | Dopo riavvio | Alterna tra **DirectML** (predefinito, GPU dedicata) e **MIGraphX** sperimentale. | Lascia su **DirectML** per `WavLM+` e `FlowEdit 3+1`. **MIGraphX** richiede Windows 11 24H2+, Adrenalin 25.10.13.09+, 10–30 min di compilazione iniziale e disabilita `WavLM+`, `FlowEdit 3+1`, `Learned 4 steps` e le opzioni esclusive di Classic (tutto viene eseguito come Classic, 10 × Euler). |

> **Pulizia vs. Volume vs. Limiter vs. Buffer:** *Input cleaning* rimuove il rumore di fondo prima che l'AI ascolti; *Output volume* cambia il volume; *Peak limiter* evita distorsioni improvvise; *Output buffer* scambia latenza per stabilità contro i crepitii.

---

## Settings → Voice & Timbre (LIVE)

Controlla quanto l'uscita segue il Voice Bank target rispetto alla tua voce, e quale modalità/motore esegue:

- **Timbre strength** (`100%` predefinito): Sotto il `100%` miscela il tuo timbro usando **`Sample of your voice…`** (5–20 s di parlato normale, salvato come `my_voice.yvoice`). Funziona in LIVE.
- **Timbre change when you raise or lower your voice** (`50%` predefinito): `100%` lascia variare il colore vocale con il pitch; `0%` mantiene lo stesso colore su tutta l'estensione.
- **Prompt length** (`20 s` predefinito, consigliato): Lunghezza del riferimento usato dal modello di diffusione. `20 s` offre il timbro più stabile; valori più corti risparmiano VRAM (**Al prossimo START**).
- **Model method** (`Classic` predefinito, **Al prossimo START**):
  - **`Classic`:** Comportamento delle versioni precedenti; abilita i quattro controlli solo-Classic qui sotto.
  - **`Learned 4 steps`:** Tarata per suonare come 10 steps usando circa il **40%** del tempo GPU del modello e meno memoria GPU (secondo lo sviluppatore).
  - **`FlowEdit 3+1`:** Parte dalla tua voce (`Sample of your voice…`, 5–20 s) anziché dal rumore cambiando solo l'identità vocale, preservando meglio respiri, sussurri, risate e articolazione (circa **60%** del tempo GPU del modello). Ripiega su `Learned 4 steps` se manca il campione (mostrato nella riga di stato LIVE). Su **AMD MIGraphX** tutti i metodi del modello vengono eseguiti come `Classic` (10 × Euler).
- **Controlli solo Classic** *(attivi solo con `Model method = Classic`)*:
  - **Model steps** (`10` predefinito): `8`, `6` (`≈ −0.75 GB` VRAM) o `4` (`≈ −1.1 GB` VRAM) girano più veloci con meno VRAM.
  - **Solver** (`Euler` predefinito): Con `4–6` steps scegli `DPM++ 2M`.
  - **Guidance (CFG) only in the first half of the steps** (`Off` predefinito): Risparmia memoria GPU, utile soprattutto con `4–6` steps.
  - **Timbre guidance** (`0 = off` predefinito): `0.5–1` rafforza la breathiness su registrazioni target ariose; costa tempo GPU extra.
- **Content engine** (`Whisper` predefinito, **Al prossimo START**):
  - **`Whisper`:** Fedeltà timbrica più vicina al target.
  - **`WavLM+`** *(solo NVIDIA e AMD DirectML; non disponibile su AMD MIGraphX)*: Parlato LIVE più chiaro, preserva risate, sussurri e respiri con molto meno ronzio, ma timbro leggermente meno esatto. Poiché `WavLM+` usa un proprio modello, **`Fine-tuned model`** e **`Breathiness`** vengono disabilitati quando `WavLM+` è attivo.
- **Fine-tuned model** (`Off` predefinito, **Al prossimo START**, solo Whisper): Segue più fedelmente respiro e grinta, con timbro leggermente meno preciso.
- **Breathiness** *(solo Fine-tuned model)*: Predefinito `as you sing`; `×1` / `×2` aggiunge aria.
- **Roughness from your voice** (`Off` predefinito): Riporta il graffiato vocale dove la tua voce è ruvida.
- **Smooth out vocal fry** (`Off` predefinito, **Works live**): Evita che parlato o canto molto bassi/creaky suonino rasposi preservando la breathiness.
- **Guidance (CFG)** (`0.7` predefinito, consigliato come da addestramento): Regola l'aderenza al prompt timbrico target.

---

## Settings → Pitch & Autotune (LIVE)

- **Pitch shift** (`+12 st` predefinito nella guida dello sviluppatore come esempio per voce maschile → target femminile; `0` per stessa estensione; `−12` per femminile → maschile): Sposta il pitch in semitoni. Non esiste un valore universalmente "giusto" per ogni voce: scegli lo spostamento adatto alla tua voce e al personaggio target.
- **Automatic pitch** (`Off` predefinito): `Off` usa lo slider Pitch shift. **`Octave from the target voice`** mantiene il canto in tonalità; **`Match the target voice's pitch`** adatta il pitch del parlato verso il target.
- **Melody mode** (`Follow my pitch` predefinito):
  - **`Follow my pitch`:** Tracciamento naturale dell'intonazione.
  - **`Autotune`:** Aggancia le note alla scala (`Retune speed` `40 ms` predefinito: `25–60 ms` naturale, `0–10 ms` robotico; `Stability` `50%`; `Pull to the nearest note` `50%`; `Note change threshold` `20 cents`).
  - **`Stabilize`:** Stabilizza le note tenute mantenendo il vibrato.
- **I sing without a backing track** (`On` predefinito): Imposta **Off** quando canti su una base musicale.
- **Key / Scale** (`Auto` predefinito): Rileva o blocca la scala musicale per Autotune/Harmony.
- **Vibrato** (`100%` predefinito): Mantiene il tuo vibrato naturale al `100%`.
- **Fix pitch detector errors** (`On` predefinito, consigliato): Attenua salti improvvisi del rilevatore F0.
- **Harmony** (`Off` predefinito): Aggiunge terze/quinte dal vivo seguendo la tonalità (`Harmony volume` `−6 dB`); costa tempo GPU extra.

---

## Settings → EQ & Filters (LIVE)

Tutti i controlli qui modellano il tono e puliscono le asprezze in **LIVE** (e vengono copiati nelle cover se clicchi **Copy settings from LIVE**):

- **Voice character** (`Off (as before)` predefinito): Preset integrati (**Soft**, **Warm**, **Bright**, **Calm**, **Expressive**) o slider manuali per **Formants**, **Intonation range**, **Pitch smoothing**, **Warmth** (`≈250 Hz`), **Softness** (`0.5–3 kHz`) e **Presence** (`≈3.5 kHz`).
- **Breath smoothing** (`100%` predefinito): Rimuove leggeri crepitii nei respiri.
- **Silence stays silent** (`On` predefinito): Forza le pause a silenzio puro; con `WavLM+` puoi confrontarlo su **Off**.
- **Smooth top** (`100%` predefinito) e **Brightness** (`0 dB` predefinito): **Smooth top** ammorbidisce asprezze/grana sulle alte frequenze. Alza **Brightness** solo se l'audio suona ovattato (mettendo poi **Smooth top** a `0`).
- **Filters, De-esser, Dynamic EQ** (`Off` predefinito): Scegli prima un preset, poi rifinisci se sibilanti (`s`/`sc`) o certe frequenze risultano aspre.

---

## Settings → Effects (LIVE)

- **Compressor, Saturation, Bitcrush, Reverb** (`Off` predefinito): Ogni effetto include preset e **funziona dal vivo** (cambia fluidamente anche mentre canti). Usali con moderazione per non coprire il timbro target o aggiungere distorsione/eco indesiderati.

---

## Tabelle Riassuntive Rapide

### Punto di partenza consigliato (da documentazione sviluppatore)

| Area | Valore iniziale | Note |
| --- | --- | --- |
| **Input cleaning** | `DF3` (`Gentle` in stanze silenziose) | `Speech gate` `Off` |
| **Microphone level** | Picchi vicino a `−6 dBFS` | Regolato in Audio di Windows |
| **Output / Monitor volume** | `−6 dB` / `−6 dB` | `Peak limiter (−1 dBFS)` `On` |
| **Output buffer** | `200 ms` | Aumenta se ci sono crepitii |
| **Prompt length / CFG** | `20 s` / `0.7` | `Timbre strength` `100%` |
| **Model method / Content engine** | `Classic` (o `Learned 4 steps` in gioco) / `Whisper` | Prova `WavLM+` / `FlowEdit 3+1` per respiri e risate |
| **EQ & Effects** | `Smooth top` `100%`, `Brightness` `0 dB`, `Breath smoothing` `100%` | `Effects` `Off` |

### Quando si applicano le modifiche (`Works live` vs. `At the next START`)

| Effetto immediato (`Works live`) | Richiede Stop → `START` (`At the next START`) |
| --- | --- |
| `Speech gate`, `Output volume`, `Peak limiter` | `Input cleaning`, `Output buffer` |
| `Smooth out vocal fry`, `Timbre strength`, `Guidance (CFG)` | `Prompt length`, `Model method` (`Classic` / `Learned 4 steps` / `FlowEdit 3+1`) |
| Controlli `Pitch & Autotune`, `EQ & Filters`, `Effects` | `Content engine` (`Whisper` / `WavLM+`), `Fine-tuned model` |

### Controlli solo Classic vs. Compatibilità backend AMD

| Funzionalità | Solo Classic? | NVIDIA | AMD DirectML | AMD MIGraphX (Sperimentale) |
| --- | --- | --- | --- | --- |
| `Model steps`, `Solver`, `1st-half CFG`, `Timbre guidance` | **Sì** | Sì | Sì | **No** *(fisso 10 × Euler)* |
| `Learned 4 steps` | No | Sì | Sì | **No** *(torna a Classic)* |
| `WavLM+` | No | Sì | Sì | **No** *(non disponibile)* |
| `FlowEdit 3+1` | No | Sì | Sì | **No** *(torna a Classic)* |

> Su AMD MIGraphX, YUNE esegue sempre il metodo Classic con 10 step Euler; `Learned 4 steps`, `FlowEdit 3+1` e le opzioni esclusive di Classic non sono disponibili lì.

### Differenze iniziali tra Parlato e Canto

| Impostazione | Parlato (Discord / Streaming) | Canto |
| --- | --- | --- |
| **Input cleaning** | `DF3` (o `Gentle` in stanza silenziosa) | `DF3` o `Gentle` (**mai `Sidon`**) |
| **Automatic pitch** | `Match the target voice's pitch` (o `Off` + slider) | `Octave from the target voice` (o `Off` + `0`/`±12`) |
| **I sing without a backing track** | `On` | `Off` quando canti su una base |
| **Melody mode** | `Follow my pitch` | `Follow my pitch`, `Stabilize` o `Autotune` |

Prossimo passo: [Song Cover e Karaoke - Guida Completa per Principianti](song-cover-karaoke.md).
