# Premium, licenza e risoluzione dei problemi

## YuneVoix PREMIUM: Song Cover e Karaoke

Chi supporta il progetto su [Ko-fi](https://ko-fi.com/yunevoix) ottiene l'accesso a **YuneVoix PREMIUM**, che sblocca le funzioni musicali offline oltre a tutto ciò che è incluso in BASIC:

- **Song Cover**: scegli un brano e una voce target. YuneVoix separa la voce dalla base, converte la voce principale (e facoltativamente i cori) e remixa tutto insieme.
  - **Formati supportati**: WAV, MP3, FLAC, M4A, AAC, OGG, WMA, AIFF (fino a **15 minuti**).
  - **Tempo di elaborazione**: circa **1,3×** la durata del brano (un brano di 5 minuti richiede circa 6–7 minuti).
  - **Formati di esportazione**: **WAV 24-bit** o **MP3 320 kbps**.
- **Karaoke**: canta seguendo i testi sullo schermo; la tua esecuzione viene convertita nella voce scelta e mixata con la musica, allineata alla tonalità e al volume dell'originale.

### Consigli per Song Cover

- **Tonalità errata**: imposta manualmente **Settings → Song Cover → Octave** su **`−12`**, **`0`** o **`+12`** invece di `Auto`.
- **Duetti e cori**: l'opzione **"Lead vocal only"** dà il risultato più pulito. Con due cantanti principali entrambi ricevono la voce scelta (non è possibile isolarne uno solo).
- **Copyright**: il brano resta di proprietà dei rispettivi autori - verifica le regole della piattaforma e i diritti prima di pubblicare le cover.

## Licenza PREMIUM e attivazione

1. Apri la scheda **Song Cover** e clicca **"Copy request code"**.
2. Invia il codice insieme al tuo acquisto su Ko-fi.
3. Riceverai un file `license.yvl`. Clicca **"Load license…"** e selezionalo.

### Come funziona la licenza

- **Non scade mai** e funziona **100% offline**.
- **Aggiornamenti**: copia `license.yvl` accanto al nuovo `YuneVoix.exe` (oppure ricaricalo).
- **Un PC per licenza**: copiare la cartella PREMIUM o la licenza su un altro computer non sblocca Song Cover.
- **Cambi hardware**: la licenza è legata a **scheda madre**, **disco di sistema** e **installazione di Windows**.
  - Cambiarne **uno** solo non dà problemi (e cambiare GPU, RAM o monitor non conta affatto).
  - Cambiarne **due insieme** (es. nuovo disco di sistema con Windows reinstallato) richiede una nuova licenza: copia il nuovo request code e contatta il supporto con il tuo ordine.

## Risoluzione dei problemi

| Sintomo | Cosa controllare prima |
| --- | --- |
| **Voce robotica, bassa o "sott'acqua"** | Alza il volume del microfono su Windows finché i picchi arrivano vicino a **−6 dBFS** (`Settings → General → Microphone level`) e lascia Input cleaning su **`DF3`**. |
| **Ottava sbagliata / effetto "chipmunk"** | In `Settings → Pitch & Autotune`, imposta **Pitch shift** (`+12` uomo→donna, `0` stesso registro, `−12` donna→uomo) o attiva il pitch automatico. |
| **Risate, respiri o sussurri spariscono** | Disattiva **Speech gate**, imposta Input cleaning su **`Gentle`** (in stanza silenziosa) e prova il content engine **WavLM+** (supportato su NVIDIA e AMD DirectML). |
| **AMD: si chiude su START / WavLM+ o FlowEdit non disponibili** | Aggiorna alla **v0.7.1** (risolve i crash su CPU con grafica AMD integrata usando DirectML sulla GPU dedicata). Se hai attivato il motore sperimentale MIGraphX in `Settings → General → "AMD graphics engine"`, torna su **DirectML** e riavvia per riattivare `WavLM+` e `FlowEdit 3+1`. |
| **Crepitii o brevi interruzioni** | Aumenta **Output buffer** (`Settings → General`), chiudi altre app che usano la GPU, riduci **Model steps** o la lunghezza del prompt e disattiva **Harmony**. |
| **Scatti mentre giochi** | Abbassa la grafica o il limite FPS del gioco, oppure riduci **Model steps** e lunghezza del prompt in `Settings → Voice & Timbre`. |
| **Esplora File dice che lo ZIP non è valido** | Usa **7-Zip** o **WinRAR** (l'archivio usa cifratura AES-256) con password `yunevoix`. |

## Diagnostica e supporto

Se qualcosa continua a non funzionare:

1. Apri il Prompt dei comandi nella cartella di YuneVoix (scrivi `cmd` nella barra degli indirizzi di Esplora File e premi Invio).
2. Esegui:
   ```bat
   YuneVoix.exe --check
   ```
3. Invia il file **`check.txt`** generato insieme a **`live-diag.log`** quando chiedi supporto in **`yune-support`**, via DM a **Kuroyuki** (`sxxyneko` su Discord), o su [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix).
