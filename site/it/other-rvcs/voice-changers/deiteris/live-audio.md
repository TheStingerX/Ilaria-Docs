# Instrada e regola Deiteris w-okada Fork

Indossa sempre le **cuffie** durante la conversione live. Usare le casse fa rientrare la voce convertita nel microfono generando eco e fischi.

## 1. Configura i dispositivi audio

> **Correct Audio Routing**
>
> **1. Nel Voice Changer**
> - **Input Device:** Il tuo microfono fisico.
> - **Output Device:** `Line 1` (VAC, consigliato) o `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Giochi, OBS o altre applicazioni**
> - **Input Device:** `Line 1` (VAC, consigliato) o `CABLE Output` (VB-CABLE).
> - **Output Device:** Le tue cuffie (fortemente consigliate rispetto agli altoparlanti).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> L'audio in arrivo da Discord, dal gioco o da altre app deve andare direttamente alle **cuffie** (mai di nuovo nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) è sempre consigliato. Se hai anche (o solo) **VB-CABLE**, ricorda che il voice changer invia a **`CABLE Input`** mentre Discord / giochi ricevono da **`CABLE Output`**.
> - **Altoparlanti e rientro dalle cuffie:** Evita gli altoparlanti: il suono può rientrare nel microfono generando audio doppio, eco o facendo convertire anche le voci degli altri presenti in chiamata. Può succedere persino con le cuffie se il volume è troppo alto o se i padiglioni non sono abbastanza chiusi e isolati.
> - **Monitoraggio:** Ascoltare la propria voce convertita in cuffia è una funzione separata opzionale da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

1. Imposta **Audio Input** sul tuo microfono fisico.
2. Imposta **Audio Output** sulle tue cuffie per un primo test locale, oppure su **`CABLE Input`** (il dispositivo di riproduzione del cavo virtuale) quando instradi verso altre app.
3. In **Discord, OBS, VRChat o nel gioco**, seleziona **`CABLE Output`** come microfono.
   - Su Discord disattiva la **Soppressione rumore (Krisp)** e la **sensibilità di ingresso automatica** per non tagliare respiri e finali di parola.

## 2. Carica un modello e regola i parametri

1. Carica o seleziona un modello **RVC `.pth`** di inferenza e il relativo file **`.index`** opzionale.
2. **Chunk / Block size**: parti da circa `0.3s` - `0.5s` (oppure `192` / `256`+ campioni/frame a seconda dello slider) per bilanciare ritardo e fluidità. Abbassare troppo il Chunk causa scatti o voce robotica.
3. **Extra Data / Context**: mantienilo moderato (`0.5s` - `1.0s`) per un tono stabile senza sovraccaricare la GPU.
4. **Rilevatore F0 / Pitch**: usa **RMVPE** (più preciso) o **FCPE** (più leggero/veloce in tempo reale); evita Crepe Full in modalità live se il tempo di inferenza supera la durata del chunk.
5. **Tune (Pitch)**: `+12` per uomo -> donna, `-12` per donna -> uomo, `0` per lo stesso registro.
6. **Index ratio**: parti da `0.0` per testare la conversione pulita, poi alza gradualmente (`0.3` - `0.6`) se necessario.

## 3. Soluzioni rapide

- **Latenza alta o scatti robotici**: chiudi giochi o schede pesanti sulla GPU, alza Chunk di un passo e, se persiste, prova a disattivare **Hardware-accelerated GPU Scheduling (HAGS)** (riavvia, confronta prima/dopo e riattivalo se non migliora).
- **Errore PortAudio / dispositivo**: imposta tutti i dispositivi audio allo stesso sample rate (`48000 Hz`) nelle Impostazioni audio di Windows e chiudi le app che bloccano il dispositivo in modalità esclusiva.
