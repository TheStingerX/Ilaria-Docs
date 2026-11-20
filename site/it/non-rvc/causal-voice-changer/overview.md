# Causal Voice Changer (CVC)

[GitHub](https://github.com/mojowozo/Causal-Voice-Changer) · [Release](https://github.com/mojowozo/Causal-Voice-Changer/releases)

**Causal Voice Changer (CVC)** è un cambia-voce IA in tempo reale a **48 kHz** progettato per colmare il divario tra i sistemi a latenza bassissima (come Beatrice) e quelli più fedeli ma più lenti (come RVC). Invece di sacrificare la qualità audio per la velocità - o viceversa - CVC usa una versione distillata di **ContentVec** e **RMVPE** in un'architettura causale per offrire sia audio pulito che bassa latenza.

## Differenze rispetto a RVC (spiegate in modo semplice)

L'**RVC** tradizionale è nato per convertire file audio completi, non flussi dal vivo:

1. RVC prende un blocco della tua voce, lo converte e lo incolla al blocco precedente tramite **crossfade**.
2. Quando abbassi la dimensione del blocco per ridurre il ritardo, RVC ha meno contesto: qualità e precisione dell'intonazione calano. Se tieni una nota o allunghi una parola, spesso si sentono le giunture tra i blocchi come tremolii o scatti.

**Causal Voice Changer (CVC)** funziona in modo diverso:

- È **causale**: converte l'audio in modo continuo man mano che arriva, guardando soprattutto indietro con un buffer di lookahead di soli **60 ms**.
- Poiché trasmette in streaming continuo invece di incollare blocchi separati, **i suoni tenuti e le note lunghe restano fluidi**, senza spezzarsi né tremolare.
- Mantieni quasi tutta la qualità di RVC con una latenza molto più bassa (ad esempio circa **130 ms totali end-to-end** su Linux con audio JACK).

## Avviso importante su licenza e uso commerciale

Anche se il codice sorgente di CVC è sotto licenza **MIT**, il modello base pre-addestrato incluso è stato addestrato su **EARS (CC BY-NC)**, **VCTK** e **LibriTTS-R**.

> **Solo uso non commerciale**: a causa del dataset EARS, **non** puoi usare il modello pre-addestrato incluso - né **alcuna voce addestrata a partire da esso** - per scopi commerciali.

## Piattaforme e hardware supportati

| Piattaforma | Interfaccia | Supporto GPU / Backend |
| --- | --- | --- |
| **Windows 10/11 (x64)** | WinUI 3 (acrylic) o fallback Tk | **NVIDIA** (CUDA), **AMD Radeon RX 7000/9000 / PRO W7000 / Ryzen AI** (ROCm 7.2.1), **AMD RX 6000 / PRO W6000** (`rocm-rdna2` nightly); le Radeon più vecchie girano su CPU (imposta Chunk ≥ `60 ms`) |
| **Linux (x86_64)** | COSMIC (Rust) o fallback Tk | glibc 2.35+ (Ubuntu 22.04, Debian 12 o successivi); NVIDIA / AMD; consigliato **JACK / PipeWire** per la latenza minima |

## Cosa puoi fare con CVC

- **Addestrare le tue voci** da audio grezzo senza dover tagliare manualmente i file o rimuovere i silenzi, a qualsiasi sample rate.
- **Condividere facilmente le voci** come singoli file `.cvc` autonomi (basta trascinarli nella finestra live).
- **Convertire il microfono dal vivo** con interfacce native Windows/Linux, riduzione rumore integrata (**Hushwire** o **RNNoise**), Pitch match, misurazione LUFS e registrazione.
- **Convertire interi file audio** offline tramite `causalvc.infer` oppure selezionando un file come sorgente nell'app live.
