---
label: "Premium, Licenza e Aiuto"
icon: ":wrench:"
order: 94
permalink: /it/non-rvc/yunevoix/premium-and-troubleshooting/
description: "Licenza YuneVoix PREMIUM (Song Cover e Karaoke), attivazione offline, regole hardware, risoluzione problemi estesa NVIDIA e AMD e diagnostica."
---
# Premium, Licenza e Risoluzione dei Problemi

## YuneVoix PREMIUM: Song Cover e Karaoke

I sostenitori su [Ko-fi](https://ko-fi.com/yunevoix) ottengono l'accesso a **YuneVoix PREMIUM**, che sblocca funzioni musicali offline in aggiunta a tutto ciò che è incluso in BASIC:

- **Song Cover:** Scegli qualsiasi brano e voce di destinazione. YuneVoix separa la voce dalla base strumentale, converte la voce principale (e opzionalmente i cori) e mixa di nuovo tutto insieme.
- **Karaoke:** Canta seguendo il testo sullo schermo; la tua esecuzione viene convertita nella voce scelta e mixata con la musica, adattata alla tonalità e al livello dell'originale.

Per tutorial completi passo dopo passo e per tutte le impostazioni di Song Cover e Karaoke, consulta **[Song Cover e Karaoke - Guida Completa per Principianti](song-cover-karaoke.md)**.

---

## Licenza PREMIUM e Attivazione

1. Apri la scheda **Song Cover** e clicca su **"Copy request code"**.
2. Invia il codice di richiesta insieme al tuo acquisto su Ko-fi.
3. Riceverai un file `license.yvl`. Clicca su **"Load license…"** e selezionalo (viene copiato accanto a `YuneVoix.exe`).

### Come funziona la licenza

- **Non scade mai** e funziona **100% offline**.
- **Aggiornamenti:** Copia `license.yvl` accanto al nuovo `YuneVoix.exe` (oppure caricalo di nuovo).
- **Un PC per licenza:** Una cartella PREMIUM o una licenza copiata non sbloccherà Song Cover su un altro computer.
- **Modifiche hardware:** La licenza è legata a **scheda madre**, **disco di sistema** e **installazione di Windows**.
  - Cambiare **uno** di questi componenti non crea problemi (e aggiornare GPU, RAM o monitor non conta affatto).
  - Cambiare **due componenti contemporaneamente** (ad es. un nuovo disco di sistema con una nuova installazione di Windows) richiede una nuova licenza: copia il nuovo codice di richiesta e contatta il supporto con il tuo ordine.

---

## Risoluzione dei Problemi

| Sintomo | Cosa provare per prima cosa |
| --- | --- |
| **Voce robotica, bassa o "sott'acqua"** | Alza il guadagno del microfono in Windows in modo che i picchi di voce alta siano vicini a **−6 dBFS** (`Settings → General → Microphone level`) e mantieni Input cleaning su **`DF3`**. |
| **Tastiera o clic diventano toni** | Imposta Input cleaning (`Settings → General`) su **`DF3`**. |
| **Fruscio o "grana" sulle alte frequenze** | Mantieni **Smooth top** al `100%` e **Brightness** a `0 dB` (`Settings → EQ & Filters`). |
| **Ottava errata / suono da scoiattolo** | In `Settings → Pitch & Autotune`, regola **Pitch shift** oppure prova **Automatic pitch** (`Octave from the target voice` per il canto; `Match the target voice's pitch` per il parlato). |
| **Risate, respiri o sussurri spariscono** | Disattiva **Speech gate**, imposta Input cleaning su **`Gentle`** (in una stanza silenziosa), prova **WavLM+** (NVIDIA e AMD DirectML), oppure imposta **Model method** su **`FlowEdit 3+1`** (richiede un campione di 5-20 s della tua voce). |
| **FlowEdit mantiene rumore di fondo o eco della stanza** | Attiva la pulizia input **`DF3`**, registra in una stanza più silenziosa oppure riporta **Model method** su **`Classic`**. |
| **Scricchiolii o brevi interruzioni** | Imposta **Model method** su **`Learned 4 steps`**, riduci **Prompt length**, aumenta **Output buffer** (`Settings → General`) e chiudi le altre app che usano molto la GPU. |
| **Scatti mentre giochi** | Limita gli **FPS** del gioco e abbassa la grafica del gioco, imposta **Model method** su **`Learned 4 steps`**, riduci **Prompt length** e disattiva **Harmony**. |
| **LIVE interrotto: "the audio device stopped working"** | Il microfono o l'uscita è stato scollegato o cambiato. Ricollegalo, clicca **Refresh devices** e premi **START**. |
| **AMD: si chiude su START / `ShapeInferenceNotRegistered`** | Aggiorna alla **v0.7.1** (usa **DirectML** sulla GPU dedicata per impostazione predefinita, risolvendo sia i crash quando è presente una GPU integrata AMD sia `ShapeInferenceNotRegistered` quando la grafica integrata è disattivata). Controlla `check.txt` per la scheda/motore attivo e mantieni aggiornati i driver Adrenalin. |
| **AMD: FlowEdit torna al fallback o WavLM+ non disponibile** | Controlla `Settings → General → "AMD graphics engine"`. Se hai attivato **MIGraphX** sperimentale, torna a **DirectML** e riavvia (con MIGraphX, `WavLM+`, `FlowEdit 3+1` e `Learned 4 steps` non sono disponibili - tutto viene eseguito come Classic, 10 × Euler). Assicurati anche che `Sample of your voice…` sia impostato per FlowEdit in LIVE. |
| **Esplora File di Windows dice che lo ZIP non è valido** | Usa **7-Zip** o **WinRAR** (ZIP crittografato AES-256) con password `yunevoix`. |

---

## Diagnostica e Supporto

Se qualcosa continua a non funzionare:

1. Apri il Prompt dei comandi nella cartella di YuneVoix (scrivi `cmd` nella barra degli indirizzi di Esplora File e premi Invio).
2. Esegui:
   ```bat
   YuneVoix.exe --check
   ```
3. **File creati accanto a `YuneVoix.exe`:**
   - **`check.txt`**: report di hardware, edizione, licenza e rilevamento GPU/motore.
   - **`live-diag.log`**: log diagnostico della sessione corrente.
   - **`live-diag.prev.log`** e **`crash.log`**: log precedente e dettagli del crash conservati dopo un arresto anomalo.
4. Invia **`check.txt`** e **`live-diag.log`**; dopo un crash invia anche **`live-diag.prev.log`** e **`crash.log`** (tutti si trovano accanto a `YuneVoix.exe`).
5. **Test di velocità AMD (opzionale):** Puoi eseguire `YuneVoix.exe --bench` per generare `bench.txt`, `bench_ort.log` e `bench_output.wav` con la velocità diagnostica sulla tua scheda AMD specifica (i risultati variano in base alla scheda e al sistema).
6. *(Promemoria privacy)* Prima di condividere i log o i file WAV opzionali di **Save diagnostic recordings** in **`yune-support`**, via DM a **Kuroyuki** (`sxxyneko` su Discord) o su [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix), controlla che non contengano nomi utente personali, percorsi di file o parlato privato.
