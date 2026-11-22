# YuneVoix Changelog

## v0.7.1 (2026-11-20)

*Modifiche dalla v0.7.0.*

### Risolto

- **AMD**: risolto un problema per cui YuneVoix si chiudeva premendo **START** sui computer il cui processore dispone anche di grafica integrata AMD, e con la grafica integrata disattivata si fermava con `ShapeInferenceNotRegistered`. Il pacchetto AMD ora usa **DirectML** sulla scheda dedicata per impostazione predefinita (nessun download da Windows Update, nessuna compilazione iniziale dei modelli). **MIGraphX** può ancora essere scelto in `Settings → General → "AMD graphics engine"` (sperimentale, si applica dopo il riavvio). Licenze, voci e impostazioni della `v0.7.0` continuano a funzionare.

### Novità

- **AMD**: Windows 10 e le versioni di Windows 11 precedenti alla 24H2 sono nuovamente supportate (`24H2` è necessaria solo per il motore sperimentale **MIGraphX**).
- **AMD**: il motore di contenuto **`WavLM+`** e il metodo del modello **`FlowEdit 3+1`** ora funzionano anche su schede AMD (**DirectML**), in **LIVE**, **cover** e **karaoke**. Quando è selezionato **AMD MIGraphX**, non sono disponibili (con MIGraphX tutti i metodi del modello vengono eseguiti come Classic, 10 × Euler).

---

## v0.7.0 (2026-11-19)

*Modifiche dalla v0.6.0.*

### Novità

- **Model method** (`Settings → Voice & Timbre`, e separatamente in `Settings → Song Cover` per cover e karaoke; si applica al prossimo **START**):
  - **Classic**: come in precedenza (opzioni di step, solver e guidance).
  - **Learned 4 steps**: calibrato per suonare come 10 step usando circa il **40%** del tempo GPU e meno VRAM, ideale per giocare e schede più lente.
  - **FlowEdit 3+1 (NVIDIA)** *(AMD: dalla v0.7.1)*: parte dalla tua voce invece che dal rumore e cambia solo l'identità vocale, così respiri, sussurri, risate e articolazione passano molto meglio (circa il **60%** del tempo GPU del modello). In **LIVE**, usa il tuo campione vocale (`Voice & Timbre → "Sample of your voice…"`; se impostato in una versione precedente, riselezionalo una volta). In cover e karaoke usa la voce del brano stesso. Funziona sia con **Whisper** sia con **WavLM+**. Senza un campione vocale, FlowEdit torna su **Learned 4 steps** (mostrato nella riga di stato LIVE); su AMD MIGraphX tutti i metodi del modello vengono eseguiti come **Classic**.
- **Karaoke (PREMIUM)**: canta un brano in prima persona con il testo su schermo: YUNE converte il tuo canto nella voce scelta e lo mixa con la musica. Il testo viene abbinato automaticamente (testo incollato o `.lrc`; giapponese anche in romaji).
  - Canta sulla base strumentale (separata in **PREPARE**) oppure sul brano originale (parte in pochi secondi; separato al primo render).
  - Scorrimento fluido con riga corrente centrata; `Space` = pausa, `Esc` = stop (termina 5 s dopo), `F11` = schermo intero, oltre a un misuratore microfono nella finestra del testo.
  - `Settings → Karaoke`: cuffie, microfono, volume voce originale e musica, dimensione testo, pulizia registrazione (`DF3`), motore di contenuto, ottava, trascinamento verso la melodia originale, livello voce, riverbero, cori, segui il livello della voce originale, fai spazio alla voce e attenua il vocal fry.
  - **Corrispondenza tonalità**: cantare qualche semitono più alto o più basso non rende più la cover stonata; **"Pull to the original melody"** corregge le note.
  - **"Follow the original vocal's level"**: segue la dinamica dell'originale e instrada i picchi attraverso un limiter invece di abbassare l'intera cover.
  - **"Make room for the vocal"** (attivo per impostazione predefinita): attenua la musica soprattutto nelle bande `1-4 kHz` mentre canti, lasciando intatte le parti strumentali.
  - **Karaoke octave `Auto`**: segue il registro del cantante originale restando entro l'estensione della voce di destinazione.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre`, e `Settings → Karaoke`): mantiene sonoro il parlato o canto molto grave o graffiato (vocal fry) e smussa i salti di pitch senza perdere la soffiosità.
- **Monitoraggio in LIVE** (`Settings → General`): livelli di ingresso e uscita in dB con spia del limiter, **"Listen to input"** (ciò che il motore sente dopo la pulizia) e **"Listen to output"** (voce convertita) su un dispositivo di monitoraggio separato.

### Migliorato

- **Giochi e LIVE**: mentre LIVE è in esecuzione, YuneVoix alza la propria priorità (processo, GPU, thread audio) ed esce dalla modalità di rallentamento in background di Windows (anche su Windows 10) così i giochi a schermo intero interferiscono meno con la voce.
- **Ritardo di ingresso più basso e stabile**: il microfono viene letto appena Windows ha nuovo audio (circa ogni **10 ms** invece di 50 ms).
- **Tracce Karaoke**: compensa il clock drift tra microfono e cuffie, salva le registrazioni in background e avvisa se non è stata registrata alcuna voce o se il microfono è distorto.
- I file di testo con codifiche legacy (come il giapponese **Shift-JIS**) si aprono correttamente.
- La sincronizzazione del testo gira su CPU sulle schede non NVIDIA (pacchetto AMD).
- Avviare il canto in Karaoke libera il motore LIVE dalla GPU.
- **"Play sample"** nel Voice Bank ora riproduce sull'uscita predefinita di Windows (le tue cuffie), non sull'uscita LIVE.
- **Microphone level** in `Settings → General` è mostrato in dB.
- Nuovi suggerimenti integrati (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, più i suggerimenti su model method e vocal fry) e un `FAQ.txt` ampliato incluso nel pacchetto.

### Risolto

- Scollegare o cambiare un dispositivo audio durante LIVE o Karaoke ora si ferma in modo pulito e spiega il motivo invece di restare silenziosamente "in esecuzione".
- Un dispositivo scollegato all'avvio non viene più sostituito silenziosamente da un altro dispositivo nelle impostazioni.
- Messaggi chiari e leggibili per i comuni errori audio (modalità esclusiva, blocco privacy microfono di Windows, formato non supportato, dispositivo scollegato, servizio Audio di Windows fermo).
- I microfoni a 24 bit packed vengono letti correttamente in LIVE.
- Salvataggio sicuro delle impostazioni (previene il reset in caso di crash o mancanza di corrente) con copia di backup.
- Controllo a istanza singola (solo una finestra di YuneVoix alla volta).
- Conserva il log precedente (`live-diag.prev.log`) e `crash.log` dopo un crash per il supporto.
- Le registrazioni diagnostiche si fermano automaticamente dopo 10 minuti e tornano su Off a ogni avvio.
- **Cancel** ora termina i processi che non rispondono.
- Messaggio di errore chiaro se il pacchetto NVIDIA viene avviato senza una GPU NVIDIA; il pacchetto AMD gira anche su altre schede compatibili con DirectML.

### Compatibilità

- Le licenze **PREMIUM** della `v0.6.0` continuano a funzionare: copia `license.yvl` accanto al nuovo `YuneVoix.exe`, insieme a `models\yune\voices`, `yune.json` e `settings.json`. Le nuove opzioni partono dai valori predefiniti (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Modifiche dalla v0.4.0 (`v0.5.0` era una build interna mai rilasciata).*

### Novità

- **Due edizioni**: **BASIC** (conversione vocale dal vivo, Voice Bank, tutti gli effetti) e **PREMIUM** (tutto ciò che è in BASIC + Song Cover).
- **Licenza PREMIUM per PC**: `Song Cover → "Copy request code"` → `"Load license…"` (senza scadenza, offline, valida se cambia 1 tra scheda madre / disco di sistema / installazione di Windows).
- **Motore di contenuto `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` per le cover - **solo NVIDIA**; *AMD: dalla v0.7.1*): parlato dal vivo più chiaro, conserva le tue risate, i sussurri e i respiri e riduce il ronzio su risate e sospiri. `Whisper` resta il predefinito per una maggiore fedeltà timbrica.
- **Opzione "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` e `Settings → Song Cover`; attiva per impostazione predefinita).
- **Link Ko-fi** (`ko-fi.com/yunevoix`) e badge dell'edizione mostrati sotto il numero di versione.

### Modifiche e Rimozioni

- Descrizioni e suggerimenti più brevi e accurati in tutte e sei le lingue, allineati ai nomi dei pulsanti.
- `YuneVoix.exe --check` segnala anche edizione, stato della licenza PREMIUM e file del modello `WavLM+`.
- **Rimosso** il vocoder `BigVGAN`: **PC-NSF** è ora l'unico vocoder (già predefinito, migliore per canto e respiri).
- Rimosse le vecchie menzioni al filtro dei frame artifact (rimosso nella `v0.4.0`).
