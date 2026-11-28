---
label: "Cloud"
icon: ":cloud:"
order: 97
permalink: /ilaria-rvc/noregretsrvc/cloud/
---

# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.1.0 è uno studio web indipendente per configurare flussi di lavoro basati su Applio. Il repository contiene l’interfaccia e il generatore di notebook. L’installazione locale avvia lo studio nel browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](version-history.md) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Esporta il file `.ipynb` generato e importalo in un nuovo notebook privato su Kaggle. Prima di eseguire le celle, leggi cosa fanno e quale versione di Applio installano. Attiva l’acceleratore GPU e abilita internet se servono download di modelli o dipendenze. Esegui prima la configurazione e poi le celle del flusso nell’ordine previsto. Prima del training verifica che il runtime veda la GPU e la cartella del dataset.

Se il notebook apre un tunnel, tieni privati indirizzo e token e chiudilo quando hai finito. Usa la funzione per i segreti di Kaggle quando il notebook la supporta. Prima che termini la sessione, salva il modello e gli eventuali checkpoint per riprendere il lavoro, poi scaricane una copia. Se una cella fallisce, leggi il primo errore, controlla percorsi e quote e ripeti quel passaggio. Il generatore è documentato per Kaggle.

[Kaggle](https://www.kaggle.com/code)

## Dataset, Dual T4 e risorse

La WebUI di Kaggle cerca i dataset in `/kaggle/input` all’apertura o quando aggiorni l’elenco. Se ne hai collegati diversi, scegli quello giusto e controlla il percorso. Lo stimatore usa 16 GB di VRAM, 20 GB di disco e 12 ore come riferimenti. Controlla anche le risorse e i limiti effettivi della tua sessione.

## Turbo, controlli preliminari e recupero

**Lossless Turbo Training** è facoltativo e attivo di default. Il progetto descrive ottimizzazioni di AdamW, cuDNN, caricamento dei dati, DDP, cache, log e salvataggio dei checkpoint. La velocità effettiva dipende dalla sessione. Prima del training, il preflight controlla WAV tagliati, `.npy` generati e `filelist.txt`. Se a fine addestramento mancano i pesi per l’inferenza, il runtime tenta un recupero con `extract_model`. Verifica che il file esportato si apra e salva a parte i checkpoint per riprendere il training.

## Stima di fine e aggiornamenti

La stima usa tempi delle epoche mediati e mostra l’orario secondo il browser. La percentuale di accuratezza è indicativa. Salva i file prima di applicare l’aggiornamento della WebUI e riavviare. L’ambiente Kaggle usa `NR_BUILD_REV` per evitare il ritorno a revisioni precedenti.

## Dual T4 e batch effettivo

La Beta 0.1.0 rimuove l’opzione di parità con Applio su una GPU. Con due GPU, un batch di 2 per GPU diventa 4 effettivi, e 4 diventa 8. Controlla il batch effettivo prima di avviare o confrontare le prove.

Se Kaggle non rileva un dataset, il percorso resta vuoto e compare un avviso. Controlla il dataset collegato prima della preparazione. La stima di fine ora filtra il riscaldamento e le pause di salvataggio. Il monitor corregge il totale delle epoche e il doppio indicatore di salvataggio. I file interni `.nr_*` sono fuori da `logs/`.

[Installazione](installation.md) · [Uso](usage.md)
