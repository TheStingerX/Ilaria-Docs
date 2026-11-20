# Prestazioni, pulizia audio e strumenti extra

## 1. Prestazioni e latenza (pagina `Performance`)

### Buffering

- **Chunk** (fino a `10 ms` / `20 ms`): quanto audio viene convertito per volta. Il ritardo totale è dato dai **50 ms** fissi di lookahead sulla base 100 Hz v4 (`60 ms` sulle vecchie voci a 50 Hz) + **1 chunk** + i buffer di scheda audio/cavo virtuale.
  - Chunk più piccoli = latenza minore, ma richiedono una GPU più veloce.
  - Se l'audio gracchia o scatta (o se usi la CPU su vecchie schede AMD), aumenta **Chunk** a `40 ms` o `60 ms+`.
- **Extra inference buffer**: quanto parlato recente il modello osserva all'indietro per ogni blocco. Più contesto dà tono e pitch più stabili a un piccolo costo GPU, **senza aggiungere ritardo**.

### Inferenza e GPU

- **Pitch detector**:
  - **RMVPE (consigliato)**: il più preciso.
  - **FCPE**: più leggero sulla GPU.
  - **PM (fastest)**: il più veloce, ma più grezzo.
- **Pitch smoothing** *(solo RMVPE)*: segue l'intonazione come una linea continua evitando salti d'ottava o tremolii sulle note lunghe (nessun ritardo aggiuntivo).
- **Volume envelope**: `0` segue esattamente il volume del tuo microfono istante per istante; `1` mantiene il volume proprio del modello.
- **Fast GPU replay** *(attivo di default)*: registra il lavoro GPU una volta e lo riesegue per ogni blocco - circa **2× più veloce** e molto più stabile (es. una RTX 5050 converte un chunk da `20 ms` in `4.4 ms` invece di `9.7 ms`). Disattivalo solo se la tua GPU produce errori o non parte.
- **Aiuti per giunture e qualità**:
  - **Soften sudden treble**: attenua i brevi click sugli acuti a metà parola (aggiunge `5 ms` di ritardo).
  - **Match level across seams**: mantiene costante il livello delle alte frequenze tra un blocco e l'altro (nessun ritardo aggiuntivo).
  - **Hold context during silence**: ricorda le ultime parole durante le pause così la prima parola dopo il silenzio non risulta impastata.
  - **Silence detection**: **Loudness** (`-50 dBFS`) è ideale in stanze silenziose; **Voice detection (sperimentale)** usa RNNoise per non confondere ventole e ronzii con la voce.

## 2. Pulizia del suono (`Noise Reduction`)

- **Input noise reduction**: rimuove tastiera, ventole e rumori di fondo prima della conversione:
  - **Hushwire (Amazon Voice Focus)** *(predefinito)*: pulizia più efficace e voce più naturale; aggiunge circa **55 ms** di ritardo. Il modello viene scaricato una sola volta dai server Amazon solo dopo la tua conferma.
  - **RNNoise**: pulizia più leggera con meno ritardo (**20 ms**).
- **Output noise reduction**: pulisce il fruscio in uscita con spectral gating. Lascialo **disattivato** a meno che tu non senta fruscio, perché può rendere la voce leggermente più spenta.

## 3. Registrazione (pagina `Recording`)

Puoi registrare direttamente da CausalVC Realtime (avvia prima la conversione):
- **Separate files**: salva ingresso grezzo e uscita convertita in due file distinti.
- **Mix**: salva ingresso + uscita mixati insieme.
- **Split L/R**: ingresso grezzo sul canale sinistro, uscita convertita sul destro.

## 4. Libreria, conversione file offline e Log

- **Pagina Library**: cerca e ordina le voci, usa **Rename**, **Move to Trash**, **Open folder**, **Add/Replace `.index`**, oppure **Export** per esportare una voce in `.cvc` con le sue impostazioni.
- **Conversione di interi file offline**: per convertire file audio completi da riga di comando senza aprire la finestra live, usa il modulo `causalvc.infer`:
  ```bash
  uv run python -m causalvc.infer --help
  ```
- **Pagina Log**: in caso di problemi, apri la pagina **Log** e clicca **Save log** per esportare i log diagnostici.
