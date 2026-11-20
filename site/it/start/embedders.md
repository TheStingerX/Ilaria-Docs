# Embedder di RVC

Un **embedder** (chiamato anche **content encoder**) è la rete neurale che analizza l'audio in ingresso e trasforma ciò che viene detto o cantato in caratteristiche numeriche di contenuto prima che il modello vocale RVC lo ricostruisca con il timbro del parlante target.

## Cosa fa un embedder e come funziona

Nella pipeline di RVC, l'audio viene diviso in flussi di informazioni separati:

1. **Contenuto (cosa dici)**: estratto fotogramma per fotogramma dall'**embedder** (fonemi, pronuncia, articolazione e ritmo).
2. **Pitch / F0 (la melodia)**: estratto separatamente da un rilevatore di pitch (come RMVPE o FCPE).
3. **Timbro vocale (chi parla)**: fornito dal modello `.pth` addestrato (ed eventualmente supportato dal file `.index`).

Poiché il generatore RVC è addestrato per ricevere feature da **un embedder specifico**, valgono sempre due regole:

- **Addestramento e inferenza devono coincidere**: se un modello è stato addestrato con `contentvec`, devi convertire l'audio usando `contentvec`. Usare un embedder diverso in inferenza (o in tempo reale) causa pronuncia distorta, artefatti metallici o una voce completamente rovinata.
- **Perdita dell'identità del parlante**: gli encoder generici per il riconoscimento vocale (come i normali HuBERT) non sono addestrati per rimuovere l'identità di chi parla. Usarli può far filtrare il timbro della tua voce originale nell'output convertito.

---

## Embedder RVC conosciuti

> [!WARNING]
> **Solo a scopo informativo - uso fortemente sconsigliato**
>
> Tutto ciò che è elencato qui sotto riguardo agli embedder alternativi è **esclusivamente a scopo informativo**. **È fortemente consigliato il NON utilizzo di embedder alternativi**: i **settaggi stock di RVC** (**`contentvec`**) sono i migliori e i più affidabili. Usare embedder alternativi rischia di produrre un modello vocale scadente o una pessima conversione sia offline che online (in tempo reale), oltre a rompere la compatibilità con i setup e gli index standard.

| Embedder | Architettura / Note | Supporto RVC | Raccomandazione |
| --- | --- | --- | --- |
| **`contentvec`** (`hubert_base.pt`) | Content encoder predefinito di RVC, addestrato per mantenere il contenuto linguistico rimuovendo l'identità del parlante. | RVC v1 (256-d) e RVC v2 (768-d) | **Consigliato (Stock RVC)** |
| **`spin`** | Encoder alternativo basato su Fairseq/HuBERT invariante al parlante. | RVC v2 | Sconsigliato per uso generale |
| **`spin-v2`** (`spin-v2.pt`) | Versione aggiornata di Spin v2 (~361 MiB) usata da alcuni pretrain sperimentali. | RVC v2 | Sconsigliato per uso generale |
| **`chinese-hubert-base`** | HuBERT Base pre-addestrato su parlato cinese. Può far filtrare il timbro sorgente. | RVC v2 | Solo informativo / specialistico |
| **`japanese-hubert-base`** | HuBERT Base pre-addestrato su parlato giapponese. Può far filtrare il timbro sorgente. | RVC v2 | Solo informativo / specialistico |
| **`korean-hubert-base`** | HuBERT Base pre-addestrato su parlato coreano. Può far filtrare il timbro sorgente. | RVC v2 | Solo informativo / specialistico |
| **`portuguese-hubert-base`** | Fairseq HuBERT portoghese (`shiromiya/fairseq-hubert-portuguese`, ~1,13 GB). | RVC v2 | Solo informativo / specialistico |
| **`custom` HuBERT Base** | Coppia HuBERT Base fornita dall'utente (`pytorch_model.bin` + `config.json`, 768 feature). | RVC v2 (v1 solo se ha proiezione 256-d) | Solo informativo / utenti avanzati |

## Quando ha senso toccare l'impostazione dell'embedder

- **Lascialo su `Auto` o `contentvec`** per quasi tutti i modelli e gli addestramenti.
- **Cambialo solo** se hai scaricato un modello il cui autore indica esplicitamente un embedder diverso (ad esempio `spin-v2` o `japanese-hubert-base`), e usalo solo per convertire con quel modello specifico.
- **Non cambiare embedder a metà addestramento**: cambiare encoder richiede di ri-estrarre le feature (`3_feature768`) in un nuovo esperimento.
