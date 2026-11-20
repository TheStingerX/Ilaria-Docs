---
label: "Panoramica e requisiti"
icon: ":book:"
order: 99
permalink: /non-rvc/yunevoix/overview/
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Supporto e Premium)](https://ko-fi.com/yunevoix)

YuneVoix è un'applicazione di conversione vocale IA in tempo reale per Windows, basata sul motore **YUNE**. Proprio come RVC, trasforma la tua voce in quella di qualcun altro - sia per il parlato che per il canto, dal vivo o offline - ma **senza dover addestrare un modello vocale**. Tutto gira in locale sulla tua scheda grafica: niente cloud, nessun account e il tuo audio non lascia mai il PC.

## Come funziona

Invece di passare ore ad addestrare un modello su un dataset, YUNE ha bisogno solo di un breve campione audio di riferimento della voce target (circa **5–20 secondi**). Separa la tua voce in *cosa dici* e *come lo dici*:

1. **Speech encoder**: cattura parole, articolazione e ritmo.
2. **Pitch tracker**: segue la melodia e l'intonazione.
3. **Modello diffusion-transformer**: ricostruisce l'audio con il timbro della voce target partendo dal breve campione di riferimento.
4. **Vocoder neurale**: genera audio full-band a **44.1 kHz**.

In modalità **LIVE**, l'audio viene elaborato in piccoli blocchi da circa **160 ms**, con un ritardo complessivo di circa **0,7 secondi** con le impostazioni predefinite.

## BASIC vs. PREMIUM

| Funzionalità | BASIC (Gratuita) | PREMIUM |
| --- | --- | --- |
| **Voice changer LIVE** (parlato e canto) | Incluso | Incluso |
| **Voice Bank** (crea e condividi voci `.yvoice`) | Incluso | Incluso |
| **Strumenti di pitch** (shift, autotune, stabilizzatore, armonia) | Incluso | Incluso |
| **Carattere vocale ed effetti** | Incluso | Incluso |
| **Pulizia ingresso** (rimozione rumore/click, speech gate) | Incluso | Incluso |
| **Song Cover** (separa voce, converti e remixa) | - | Incluso |
| **Karaoke** (canta con testi a schermo) | - | Incluso |
| **Licenza offline** | Non richiesta | `license.yvl` per singolo PC |

> **YuneVoix PREMIUM** è disponibile per chi supporta il progetto su [Ko-fi](https://ko-fi.com/yunevoix). L'accesso viene gestito privatamente tramite Ko-fi o DM e la licenza funziona completamente offline.

## Funzionalità principali

- **Voice changer LIVE**: ingresso dal microfono, uscita della voce convertita verso qualsiasi dispositivo audio (Discord, OBS, giochi, VRChat). Funziona per parlato e canto, mantenendo respiri, sussurri e risate.
- **Voice Bank**: crea una nuova voce da 10–25 secondi di registrazioni pulite. YuneVoix può separare automaticamente la voce da musica/rumore di fondo e rimuovere il riverbero.
- **Strumenti di pitch**: cambio d'ottava manuale o automatico, autotune con rilevamento della tonalità, stabilizzatore del pitch, profondità del vibrato e armonie dal vivo (terze, quinte, ottave).
- **Carattere vocale**: controlli per intensità del timbro, formanti, calore e presenza con preset.
- **Pulizia ingresso**: rimozione di rumore e click (`DF3` / `Gentle`), speech gate e monitoraggio ingresso/uscita.
- **Effetti vocali**: de-esser, compressore, riverbero e peak limiter.
- **Opzioni qualità vs. velocità**: due content engine (incluso **WavLM+** su NVIDIA e AMD DirectML per preservare risate, sussurri e respiri) e diversi metodi di modello. Le modalità più veloci usano circa il 40% del tempo GPU e la modalità **FlowEdit 3+1** conserva meglio il respiro e l'articolazione naturali.
- **Song Cover e Karaoke (PREMIUM)**: ricanta interi brani con separazione vocale automatica oppure canta seguendo i testi sullo schermo.
- **Interfaccia in 6 lingue**: Inglese, Tedesco, Italiano, Spagnolo, Polacco e Portoghese.

## Requisiti di sistema

YuneVoix richiede una **GPU dedicata** e non può funzionare solo su CPU. Schede grafiche Intel, macOS e Linux non sono supportati.

| Componente | NVIDIA (Consigliata) | AMD (DirectML) |
| --- | --- | --- |
| **Sistema operativo** | Windows 10 / 11 64-bit | Windows 11 **24H2** o successivo (64-bit) |
| **GPU** | 8 GB+ VRAM (**12 GB consigliati**), GeForce RTX consigliata | Radeon **serie RX 7000** o superiore, 12 GB+ VRAM (**16 GB consigliati**) |
| **Driver** | Driver NVIDIA aggiornato | AMD Adrenalin **25.10.13.09** o successivo |
| **Audio** | Microfono + **cuffie** (obbligatorie per l'uso live) | Microfono + **cuffie** (obbligatorie per l'uso live) |

> **Nota NVIDIA vs. AMD**: dalla **v0.7.1**, il pacchetto AMD usa **DirectML** sulla scheda dedicata per impostazione predefinita, ed entrambi **`WavLM+`** e **`FlowEdit 3+1`** funzionano anche su AMD DirectML (in LIVE, cover e karaoke). Puoi eventualmente cambiare `Settings → General → "AMD graphics engine"` sul motore sperimentale **MIGraphX** (dopo il riavvio; con MIGraphX `WavLM+` e `FlowEdit 3+1` non sono disponibili e Windows può scaricare MIGraphX via Windows Update).
