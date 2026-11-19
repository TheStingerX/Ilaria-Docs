---
label: "Changelog"
icon: ":memo:"
order: 95
permalink: /non-rvc/yunevoix/changelog/
---
# Changelog di YuneVoix

## v0.7.0 (19/11/2026)

*Novità rispetto alla v0.6.0.*

### Novità

- **Metodo di modello** (`Settings → Voice & Timbre`, e separatamente in `Settings → Song Cover` per cover e karaoke; si applica al successivo **START**):
  - **Classic**: come in precedenza (opzioni per steps, solver e guidance).
  - **Learned 4 steps**: calibrato per suonare come 10 step usando circa il **40%** del tempo GPU e meno VRAM — ideale per giochi e schede meno potenti.
  - **FlowEdit 3+1 (NVIDIA)**: parte dalla tua voce invece che dal rumore e cambia solo l'identità vocale, facendo passare molto meglio respiri, sussurri, risate e articolazione (circa il **60%** del tempo GPU del modello). In **LIVE** usa il campione della tua voce (`Voice & Timbre → "Sample of your voice…"`; se impostato in una versione precedente, riselezionalo una volta); in cover e karaoke usa la traccia vocale stessa. Funziona sia con **Whisper** che con **WavLM+**. Senza campione vocale o su AMD, FlowEdit ripiega su **Learned 4 steps** (indicato nella riga di stato LIVE).
- **Karaoke (PREMIUM)**: canta tu un brano con i testi sullo schermo — YUNE trasforma il tuo canto nella voce scelta e lo mixa con la musica. I testi vengono sincronizzati automaticamente (testo incollato o `.lrc`; giapponese anche in romaji).
  - Canta sulla base strumentale (separata con **PREPARE**) oppure sul brano originale (avvio in pochi secondi; separazione al primo render).
  - Scorrimento fluido con la riga corrente al centro; `Spazio` = pausa, `Esc` = stop (la cover termina 5 s dopo), `F11` = schermo intero, più misuratore del microfono nella finestra dei testi.
  - `Settings → Karaoke`: cuffie, microfono, volume voce originale e musica, dimensione testi, pulizia registrazione (`DF3`), content engine, ottava, allineamento alla melodia originale, livello voce, riverbero, cori, segui livello voce originale, fai spazio alla voce e attenua vocal fry.
  - **Corrispondenza tonalità**: cantare qualche semitono sopra o sotto l'originale non stona più la cover; **"Pull to the original melody"** corregge le note.
  - **"Follow the original vocal's level"**: applica alla voce convertita una dinamica simile all'originale e passa i picchi in un limiter invece di abbassare l'intera cover.
  - **"Make room for the vocal"** (attivo di default): attenua la musica principalmente nelle bande `1–4 kHz` mentre canti, lasciando intatte le parti solo strumentali.
  - **Ottava Karaoke `Auto`**: segue il registro del cantante originale restando nell'estensione della voce target.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre` e `Settings → Karaoke`): parlare o cantare molto basso o con voce gracchiante non rende più ruvida la voce target, mantenendo comunque il respiro.
- **Monitoraggio in LIVE** (`Settings → General`): livelli ingresso/uscita in dB con spia limiter, **"Listen to input"** (ciò che sente il motore dopo la pulizia) e **"Listen to output"** (voce convertita) su un dispositivo di monitoraggio separato.

### Miglioramenti

- **Giochi e LIVE**: mentre LIVE è attivo, YuneVoix alza la propria priorità (processo, GPU, thread audio) e disattiva il rallentamento in background di Windows (anche su Windows 10), così i giochi a schermo intero interferiscono meno con la voce.
- **Latenza d'ingresso più bassa e stabile**: il microfono viene letto appena Windows ha nuovo audio (circa ogni **10 ms** invece di 50 ms).
- **Registrazioni Karaoke**: compensa la deriva di clock tra microfono e cuffie, salva la registrazione in background e avvisa se non è stata rilevata voce o se il microfono distorce.
- I file di testo in codifiche datate (es. giapponese **Shift-JIS**) si aprono correttamente.
- La sincronizzazione dei testi gira su CPU sulle schede non-NVIDIA (pacchetto AMD).
- Iniziare a cantare in Karaoke libera il motore LIVE dalla GPU.
- **"Play sample"** in Voice Bank ora riproduce sull'uscita predefinita di Windows (le cuffie), non sull'uscita LIVE.
- **Microphone level** in `Settings → General` è mostrato in dB.
- Nuovi suggerimenti integrati (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, più suggerimenti su metodo di modello e vocal fry) e `FAQ.txt` ampliato incluso nel pacchetto.

### Correzioni

- Scollegare o cambiare dispositivo audio durante LIVE o Karaoke ora ferma il processo spiegando il motivo invece di restare "in esecuzione" senza audio.
- Un dispositivo scollegato all'avvio non viene più sostituito automaticamente nelle impostazioni.
- Messaggi chiari per gli errori audio comuni (modalità esclusiva, blocco privacy microfono Windows, formato non supportato, dispositivo scollegato, servizio Audio Windows fermo).
- Lettura corretta dei microfoni con audio 24-bit packed in LIVE.
- Salvataggio sicuro delle impostazioni (evita reset in caso di crash/mancanza di corrente) con copia di backup.
- Una sola finestra di YuneVoix eseguibile alla volta.
- Conservazione del log precedente (`live-diag.prev.log`) e di `crash.log` dopo un crash per il supporto.
- Le registrazioni diagnostiche si fermano automaticamente dopo 10 minuti e sono disattivate a ogni avvio.
- **Cancel** ora termina i processi bloccati.
- Messaggio chiaro se il pacchetto NVIDIA viene avviato senza GPU NVIDIA; il pacchetto AMD gira anche su altre schede compatibili DirectML.

### Compatibilità

- Le licenze **PREMIUM** emesse per `v0.6.0` continuano a funzionare: copia `license.yvl` accanto al nuovo `YuneVoix.exe`, insieme a `models\yune\voices`, `yune.json` e `settings.json`. Le nuove opzioni partono dai valori predefiniti (`Model method: Classic`).

---

## v0.6.0 (05/11/2026)

*Novità rispetto alla v0.4.0 (`v0.5.0` era una build interna mai pubblicata).*

### Novità

- **Due edizioni**: **BASIC** (conversione live, Voice Bank, tutti gli effetti) e **PREMIUM** (tutto ciò che è in BASIC + Song Cover).
- **Licenza PREMIUM per singolo PC**: `Song Cover → "Copy request code"` → `"Load license…"` (senza scadenza, offline, valida se cambia 1 solo componente tra scheda madre, disco di sistema o installazione Windows).
- **Content engine `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` per le cover — **solo NVIDIA**): parlato live più chiaro, conserva risate, sussurri e respiri e riduce il ronzio su risate e sospiri. `Whisper` resta predefinito per un timbro più fedele.
- **Opzione "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` e `Settings → Song Cover`; attiva di default).
- **Link Ko-fi** (`ko-fi.com/yunevoix`) e indicazione dell'edizione sotto il numero di versione.

### Modifiche e rimozioni

- Descrizioni e suggerimenti più brevi e precisi in tutte e sei le lingue, allineati ai nomi dei pulsanti.
- `YuneVoix.exe --check` ora riporta anche edizione, stato della licenza PREMIUM e file del modello `WavLM+`.
- **Rimosso** il vocoder `BigVGAN` — **PC-NSF** è ora l'unico vocoder (già predefinito, migliore per canto e respiro).
- Rimosso il riferimento obsoleto al filtro frame artifact (rimosso nella `v0.4.0`).
