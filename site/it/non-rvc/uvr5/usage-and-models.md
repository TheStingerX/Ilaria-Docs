# Guida UVR5 e modelli consigliati

Usa questa guida per configurare correttamente UVR5 e scegliere i modelli migliori per separare voce, rimuovere cori/armonie, eliminare riverbero/eco e ripulire il rumore (inclusi i modelli mostrati nelle configurazioni consigliate).

## 1. Finestra principale e impostazioni chiave

- **Select Input / Output**: scegli i file audio in ingresso e la cartella di destinazione. Usa **`WAV`** per preparare dataset RVC (in `Additional Settings` puoi anche attivare l'output a 64-bit float).
- **GPU Conversion**: lascialo **spuntato** se hai una GPU NVIDIA, AMD, Intel o Apple Silicon supportata.
  - *Nota*: su GPU GTX 10XX, se ottieni output silenzioso lascia disattivato **Inference Mode** in `Settings → Advanced MDX-Net Options → Multi-Network`. Su RTX / GTX 16 puoi provarlo per velocizzare.
- **Vocals Only / Instrumental Only**: spuntane uno se vuoi esportare solo una traccia (es. **Instrumental Only** se ti serve solo la base o la traccia pulita prodotta da certi modelli).
- **Segment Size** (scheda `MDX-Net`, es. **`256`**): regola l'uso di memoria per i modelli MDX-Net standard.
  - *Nota per i Roformer*: quando **Segment Default** è attivo in Advanced MDX-Net Options, UVR5 legge `chunk_size` direttamente dal `.yaml` del modello anziché dal menu Segment Size della finestra principale.
- **Overlap** (per i Roformer): **`4`** è il miglior compromesso tra velocità e qualità SDR; **`8`** può dare una leggera costanza in più, mentre `16–32` rallenta molto con benefici minimi. Il valore nella GUI sovrascrive quello dello `.yaml`.
- **Impostazioni VR Architecture**:
  - **Window Size**: `512` (più preciso) o `320` (più veloce / molto usato per metal ed ensemble).
  - **Aggression Setting**: di solito `5`–`10` per voce/karaoke; **`3.0–5.0`** per `UVR-DeEcho-DeReverb`; valori negativi (**`-10` fino a `-25`**) per `UVR-DeNoise` sulla voce per non svuotarla.
  - **TTA** *(Test-Time Augmentation)*: migliora la qualità raddoppiando circa il tempo di elaborazione.

## 2. Modelli consigliati per ciascun utilizzo

### Modelli MDX-Net e BS-Roformer

| Modello | Scopo | Note |
| --- | --- | --- |
| **`BS-Roformer-Viperx-1297`** | **Separazione principale Voce / Strumentale** | Celebre modello BS-Roformer di altissima qualità. Ottimo per estrarre basi e voci pulite ed è una base classica per gli ensemble (es. `1296 + 1297 + MDX23C HQ`). |
| **`UVR-MDX-NET Inst HQ 4`** | **Separazione pulita Strumentale / Voce** | Modello MDX-Net v2 molto veloce e pulito. Spesso combinato in ensemble con `1_HP-UVR` o con i BS-Roformer. |
| **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** | **De-Reverb (Roformer)** | Modello BS-Roformer moderno di anvuew (addestrato su riverberi VST e preset Waves IR1). Molto pulito ed efficace sul riverbero vocale rispetto ai vecchi modelli mono. |

### Modelli VR Architecture

| Modello | Scopo | Note |
| --- | --- | --- |
| **`1_HP-UVR`** | **Separazione Voce / Strumentale** | Classico modello VR high-pass. Utile da solo o in ensemble (specie su brani densi/rock/metal) insieme ai modelli MDX-Net. |
| **`5_HP-Karaoke-UVR`** | **Voce principale vs. Cori** | Separa la voce principale da cori/armonie. Rende al meglio se eseguito su **voci già isolate** (o tramite *Settings → Vocal Splitter Options*). |
| **`UVR-De-Echo-Normal`** | **De-Echo delicato** | Rimuove delay ed eco leggero. Spesso preserva il timbro naturale meglio dei modelli aggressivi; usabile anche dopo DeReverb. |
| **`UVR-DeEcho-DeReverb`** | **De-Echo + De-Reverb forte** | Rimuove sia eco che riverbero mono/stereo quando i modelli MDX non bastano. Usa **Aggression** attorno a **`3.0–5.0`** (tetto in frequenza ~17.5 kHz). |
| **`UVR-DeNoise`** | **De-Noise intenso** | Denoiser di FoxJoy per fruscio, rumore bianco e artefatti. Su voci isolate prova **aggressività negativa (`-10` / `-25`)** per non assottigliare la voce. |
| **`UVR-DeNoise-Lite`** | **De-Noise leggero** | Meno aggressivo di `UVR-DeNoise` (taglio a `20 kHz`) e più sicuro su strumenti e armoniche; aggressività consigliata attorno a `4`. |

### Modelli Demucs

| Modello | Scopo | Note |
| --- | --- | --- |
| **`v4 \| htdemucs`** *(e `htdemucs_ft`)* | **Separazione in 4 stem** | Divide la traccia in **Vocals, Drums, Bass e Other**. Ottimo per isolare batteria/basso o ripulire residui negli ensemble multi-stem. |

## 3. Flusso consigliato per pulire un dataset RVC

1. **Passo 1 - Isola la voce**: passa la traccia con **`BS-Roformer-Viperx-1297`** (scheda MDX-Net, GPU Conversion attivo).
2. **Passo 2 - Rimuovi armonie/cori** *(se presenti)*: passa lo stem vocale ottenuto in **`5_HP-Karaoke-UVR`** (scheda VR Architecture).
3. **Passo 3 - Rimuovi riverbero ed eco**: usa **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** (oppure **`UVR-DeEcho-DeReverb`** con Aggression `3–5` / **`UVR-De-Echo-Normal`**).
4. **Passo 4 - Pulizia finale dal rumore** *(solo se restano fruscii o artefatti)*: passa **`UVR-DeNoise`** (con aggressività bassa o negativa sulla voce) o **`UVR-DeNoise-Lite`**. Ascolta sempre il risultato in cuffia confrontandolo col passo precedente per non rovinare le consonanti.

## 4. Risoluzione dei problemi comuni

- **Errore di memoria (`RuntimeError`) o blocco al 5% su DirectML (AMD/Intel)**:
  - Apri **Choose MDX-Net Model → Edit Model Config** (o modifica lo `.yaml` in `models\MDX_Net_Models\model_data\mdx_c_configs\`) e abbassa `chunk_size` (verifica che **Segment Default** sia attivo nelle opzioni MDX avanzate):
    - `352800` (8s) - predefinito per molti modelli; massimo consigliato su GPU AMD/Intel da 8 GB.
    - `220500` (5s) o `200655` (4.5s) - sicuro per schede da 4–6 GB VRAM.
    - `112455` (2.55s) - punto di partenza minimo sicuro se i crash continuano.
  - Su NVIDIA da 2–4 GB VRAM, imposta **CUDA Sysmem Fallback Policy** su **Prefer Sysmem Fallback** nel Pannello di controllo NVIDIA.
- **Un Roformer non appare in Ensemble / Vocal Splitter**: apri il suo `.yaml` e rinomina gli stem da `other` / `vocals` / `Karaoke` a **`Instrumental`** e **`Vocals`** (rispettando le maiuscole).
- **Il PC si blocca durante l'elaborazione**: imposta la priorità di UVR su **Idle (Bassa)** da Gestione attività di Windows.
