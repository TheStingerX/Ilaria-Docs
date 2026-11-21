---
label: "Convertitore Safetensors ↔ PTH"
icon: ":repeat:"
order: 88
permalink: /ilaria-rvc/safetensors-converter/
description: "Guida semplice e completa al convertitore Safetensors e PTH nella scheda Altro di Ilaria RVC, con salvataggio metadati RVC e pulsante Move .pth to models."
---
# Convertitore Safetensors ↔ PTH

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Dalla versione **Ilaria RVC 2.4.5**, nella scheda **Altro (Other)** è presente **Convert model weights**, un convertitore integrato che trasforma i modelli vocali `.pth` in file `.safetensors` e i file `.safetensors` di nuovo in `.pth`.

---

## 1. Cosa sono `.pth` e `.safetensors`? (In parole semplici)

Quando scarichi modelli vocali IA, trovi quasi sempre file `.pth` e talvolta file `.safetensors`:

- **`.pth` (formato PyTorch):** Il formato classico dei modelli RVC. Contiene i pesi della rete neurale **più** la configurazione della voce RVC (sample rate, pitch guidance, versione RVC, embedder). Tuttavia usa il formato Python `pickle`, motivo per cui PyTorch moderno (`2.6+`) ne limita il caricamento per sicurezza.
- **`.safetensors` (formato SafeTensors):** Un formato moderno creato da Hugging Face che salva i pesi del modello **senza codice eseguibile**. È molto più sicuro da scaricare o condividere e si carica in modo pulito.

**Perché convertire tra i due?**
- Converti **`.pth` → `.safetensors`** quando vuoi archiviare o condividere il tuo modello vocale in un formato più sicuro mantenendo intatte le impostazioni RVC.
- Converti **`.safetensors` → `.pth`** quando hai scaricato una voce in `.safetensors` e ti serve un file `.pth` da caricare in **Inferenza** su Ilaria RVC (o su un'altra app RVC).

---

## 2. Come funziona il convertitore di Ilaria RVC

Dentro **Altro → Convert model weights**, Ilaria RVC esegue la conversione in sicurezza sulla **CPU** (senza usare GPU o VRAM):

- **Installazione automatica al primo avvio:** Se `safetensors` non è ancora presente, Ilaria RVC scarica e installa automaticamente `safetensors==0.8.0` in `assets/weight_converter/dependencies` al primo utilizzo (serve internet solo la prima volta).
- **Conservazione dei metadati RVC:** Quando converti un `.pth` RVC esportato in `.safetensors`, Ilaria RVC salva la configurazione della voce in un metadato speciale (`ilaria_rvc_checkpoint`). Quando riconverti quel `.safetensors` in `.pth`, ripristina automaticamente tutta la configurazione vocale così il modello funziona subito in Inferenza.
- **File solo-tensori:** Se converti un `.safetensors` creato da un altro programma senza metadati RVC, Ilaria RVC lo trasforma comunque in un `.pth` di soli pesi, ma senza i parametri della voce necessari per l'Inferenza automatica o per **Move .pth to models**.
- **I checkpoint di training sono bloccati:** I checkpoint grezzi di allenamento (`G_*.pth` o `D_*.pth` in `logs/`) contengono lo stato dell'ottimizzatore e non possono essere convertiti qui. Esporta prima il modello finale.

---

## 3. Guida passo passo: convertire `.pth` ↔ `.safetensors`

1. Apri la scheda **Altro (Other)** ed espandi **Convert model weights**.
2. Trascina o seleziona il tuo file `.pth` o `.safetensors` in **Choose or drop a .pth or .safetensors file**.
3. Clicca **Convert weights**.
4. Segui l'avanzamento in **Conversion Log** (`5% | Preparing Safetensors...` → `10% | Reading weights on CPU...` → completamento).
5. Al termine, scarica il file convertito da **Download converted weights**.

### Usare **Move .pth to models** (da `.safetensors` → `.pth`)
Se hai appena convertito una voce `.safetensors` (con metadati RVC) in `.pth`:
1. Invece di scaricarlo e spostarlo a mano, clicca semplicemente **Move .pth to models**.
2. Ilaria RVC verifica che il `.pth` sia una voce RVC completa (con `config`, `weight` e `emb_g.weight`) e lo sposta direttamente nella cartella `models/`.
3. Vai su **Inferenza**, clicca **Refresh** e la voce convertita è subito pronta all'uso.

!!!tip
**Sovrascrive un modello già esistente?**
No. Se in `models/` esiste già un `.pth` con lo stesso identico nome, **Move .pth to models** si ferma per sicurezza e ti avvisa che esiste già un modello con quel nome.
!!!

---

## 4. Messaggi comuni e risoluzione problemi

| Messaggio in Conversion Log | Cosa significa | Come risolvere |
| --- | --- | --- |
| `Could not download Safetensors. Check your internet connection and retry.` | La prima installazione di `safetensors` è fallita perché sei offline o bloccato da VPN/firewall. | Collegati a internet (o disattiva momentaneamente VPN/firewall restrittivi) e clicca **Convert weights** una volta. Poi funzionerà anche offline. |
| `This checkpoint contains training state or unsupported metadata. Export a voice model first.` | Hai caricato un checkpoint grezzo `G_*.pth` o `D_*.pth` invece di un `.pth` vocale esportato. | Usa prima lo strumento **Export** sul tuo esperimento, poi converti il `.pth` esportato. |
| `This .pth contains only weights or is missing required RVC data.` | Hai cliccato **Move .pth to models** su un `.pth` di soli pesi (ottenuto da un `.safetensors` privo di metadati RVC). | Solo i `.pth` RVC completi con configurazione vocale possono essere spostati direttamente in `models/` per l'Inferenza. |
| `A model named ... already exists.` | Un file `.pth` con lo stesso nome è già presente in `models/`. | Rinomina il file o sposta/fai backup di quello vecchio in `models/` prima di procedere. |
