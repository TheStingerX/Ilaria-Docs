---
label: "Panoramica e requisiti"
icon: ":book:"
order: 99
permalink: /non-rvc/yunevoix/overview/
description: "YuneVoix è un'applicazione di conversione vocale AI in tempo reale per Windows, basata sul motore YUNE."
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Supporto e Premium)](https://ko-fi.com/yunevoix)

YuneVoix è un'applicazione di conversione vocale AI in tempo reale per Windows, basata sul motore **YUNE**. Proprio come RVC, trasforma la tua voce in quella di un'altra persona - sia per il parlato che per il canto, dal vivo o offline - ma **senza addestrare un modello vocale individuale**. Tutto viene elaborato localmente sulla tua scheda grafica: nessun cloud, nessun account e il tuo audio non lascia mai il PC.

> **Mappa delle guide:** [1. Panoramica e requisiti](overview.md) · [2. Installazione e aggiornamento](installation.md) · [3. Voice Bank e uso LIVE](usage.md) · [4. Impostazioni e qualità audio](settings.md) · [5. Song Cover e Karaoke](song-cover-karaoke.md) · [6. Premium, licenza e supporto](premium-and-troubleshooting.md) · [7. Changelog](changelog.md)

## Come funziona

Anziché impiegare ore ad addestrare un modello su un dataset, YUNE crea un profilo **Voice Bank** da una breve registrazione di riferimento della voce target (**10–25 secondi**). *(Separatamente, la modalità **FlowEdit 3+1** in LIVE utilizza anche un campione di **5–20 secondi** della tua voce naturale come punto di partenza - ad esempio 15 secondi della voce target in Voice Bank contro 10 secondi del tuo parlato normale in `Settings → Voice & Timbre → Sample of your voice…`.)*

Secondo la documentazione dello sviluppatore, la pipeline YUNE separa la voce in *cosa dici* e *come lo dici*:

1. **Voice Bank e identità del parlante:** Salva un profilo vocale (`.yvoice`) da una registrazione target di 10–25 secondi senza addestrare una rete neurale separata da zero.
2. **Content engine (`Whisper` o `WavLM+`):** Cattura parole, tempi e articolazione.
3. **Pitch tracking:** Segue melodia e intonazione.
4. **Conversione basata su diffusione:** Ricostruisce l'audio nel timbro del parlante target usando il riferimento del Voice Bank.
5. **Vocoder neurale (`PC-NSF`):** Produce audio a banda piena a **44.1 kHz**.
6. **Elaborazione audio:** Applica pulizia in ingresso, strumenti di pitch/autotune, EQ/filtri ed effetti.

In modalità **LIVE**, l'audio viene elaborato in piccoli blocchi di circa **160 ms**, con un ritardo totale end-to-end di circa **0,7 secondi** alle impostazioni predefinite (come riportato dallo sviluppatore).

## BASIC vs. PREMIUM

| Funzionalità | BASIC (Gratuita) | PREMIUM |
| --- | --- | --- |
| **Voice changer LIVE** (parlato e canto) | Incluso | Incluso |
| **Voice Bank** (crea e condividi voci `.yvoice`) | Incluso | Incluso |
| **Strumenti pitch** (shift, autotune, stabilizer, harmony) | Incluso | Incluso |
| **Carattere vocale ed effetti vocali** | Incluso | Incluso |
| **Pulizia ingresso** (rimozione rumore/click, speech gate) | Incluso | Incluso |
| **Song Cover** (separa voci, converti, remixa) | - | Incluso |
| **Karaoke** (canta sui testi a schermo) | - | Incluso |
| **Licenza offline** | Non richiesta | `license.yvl` per PC |

> **YuneVoix PREMIUM** è disponibile per i sostenitori su [Ko-fi](https://ko-fi.com/yunevoix). L'accesso viene gestito privatamente tramite Ko-fi o DM e la licenza funziona completamente offline. Vedi [Song Cover e Karaoke](song-cover-karaoke.md) e [Premium, licenza e supporto](premium-and-troubleshooting.md).

## Caratteristiche principali

- **Voice changer LIVE**: microfono in ingresso, voce convertita in uscita verso qualsiasi dispositivo audio (Discord, OBS, giochi, VRChat). Funziona per parlato e canto.
- **Voice Bank**: crea un nuovo profilo `.yvoice` da **10–25 secondi** di registrazioni chiare. YuneVoix può separare automaticamente la voce da musica/rumore e rimuovere il riverbero.
- **Tre modalità di modello** (secondo la documentazione dello sviluppatore):
  - **Classic:** Comportamento delle versioni precedenti con controlli configurabili per `Model steps`, `Solver` e guidance.
  - **Learned 4 steps:** Progettata per ottenere risultati simili a Classic 10 steps utilizzando circa il **40%** del tempo GPU del modello e meno memoria GPU.
  - **FlowEdit 3+1:** Parte dalla tua stessa voce (campione di 5–20 secondi in LIVE; la traccia vocale del brano in Song Cover) anziché dal rumore e mira a conservare meglio respiri, sussurri, risate e articolazione (riportata a circa il **60%** del tempo GPU del modello).
- **Content engine**: **Whisper** (predefinito) e **WavLM+** (su NVIDIA e AMD DirectML, orientato a parlato LIVE più chiaro e conservazione di risate, sussurri e respiri).
- **Strumenti pitch**: pitch shift manuale o automatico, autotune con rilevamento tonalità, stabilizzatore delicato, profondità vibrato e armonie dal vivo (terze, quinte).
- **Carattere vocale, EQ ed effetti**: timbre strength, formant, warmth, softness, presence, de-esser, dynamic EQ, compressor, saturation, bitcrush, reverb e peak limiter. Vedi [Impostazioni e qualità audio](settings.md).
- **Song Cover e Karaoke (PREMIUM)**: ricanta brani completi con separazione vocale automatica o canta leggendo i testi a schermo.
- **Selettore lingua interfaccia**: Inglese, Tedesco, Italiano, Spagnolo, Polacco e Portoghese.

## Requisiti di sistema

YuneVoix richiede una **GPU dedicata** e non può funzionare solo su CPU. Grafica integrata Intel/Arc, macOS e Linux non sono supportati.

| Componente | NVIDIA (Consigliata) | AMD |
| --- | --- | --- |
| **Sistema operativo** | Windows 10 / 11 64-bit | Windows 10 / 11 64-bit |
| **GPU** | 8 GB+ VRAM (**12 GB consigliati**), GeForce RTX consigliata | Radeon **serie RX 7000** o successiva, 12 GB+ VRAM (**16 GB consigliati**) |
| **Driver** | Driver NVIDIA attuale | Driver attuale AMD Software: Adrenalin Edition |
| **Audio** | Microfono + **cuffie** (obbligatorie dal vivo) | Microfono + **cuffie** (obbligatorie dal vivo) |

> **Nota (AMD):** Windows 11 24H2+ e Adrenalin 25.10.13.09+ sono necessari solo per il motore sperimentale **MIGraphX**, disponibile in `Settings → General → "AMD graphics engine"`.

### AMD DirectML vs. AMD MIGraphX

- **AMD DirectML (Predefinito nella v0.7.1):** Integrato e usato sulla GPU AMD dedicata per impostazione predefinita. Funziona subito senza download tramite Windows Update né compilazione iniziale dei modelli, e supporta sia **`WavLM+`** sia **`FlowEdit 3+1`** secondo la documentazione dello sviluppatore.
- **AMD MIGraphX (Sperimentale):** Va attivato esplicitamente in `Settings → General → "AMD graphics engine"` e richiede un riavvio. Può comportare un download tramite Windows Update, la prima preparazione può richiedere **10–30 minuti**, e **`WavLM+`** e **`FlowEdit 3+1`** **non** sono disponibili sotto MIGraphX.

Prossimo passo: [Installare e aggiornare YuneVoix](installation.md).
