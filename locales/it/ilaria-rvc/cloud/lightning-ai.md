---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /ilaria-rvc/lightning-ai/
description: "Esegui Ilaria RVC nel browser con una GPU fornita dalla piattaforma cloud. Scegli un notebook qui sotto. Attiva un acceleratore NVIDIA prima di eseguire la prima cella."
---
# Lightning AI Studio

[Apri il notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Esegui Ilaria RVC nel browser con una GPU fornita dalla piattaforma cloud. Scegli un notebook qui sotto. Attiva un acceleratore NVIDIA prima di eseguire la prima cella.

## Prima di iniziare

Prepara un breve WAV pulito e un modello di inferenza compatibile. Per l'addestramento, conserva il dataset originale e alcune clip di prova separate sul tuo computer. Il notebook viene eseguito su una macchina Linux remota.

### Crediti, piano gratuito e disponibilità GPU

Lightning AI utilizza un **modello di fatturazione a crediti** (`1 credito = $1 USD`, addebitato al secondo di calcolo GPU; vedi [Prezzi Lightning AI](https://lightning.ai/pricing)):

- **Piano gratuito:** Include **uno Studio gratuito a 4 CPU** (fino a 4 ore continue prima del riavvio) e **10 GB di archiviazione gratuita** (lo spazio oltre i 10 GB viene fatturato mensilmente).
- **Crediti iniziali vs. piani a pagamento:** I nuovi account ricevono in genere crediti iniziali dopo registrazione/verifica (non ore GPU gratuite che si rinnovano ogni mese). Gli abbonamenti **Pro** a pagamento forniscono una quota mensile di crediti.
- **Controlla saldo e GPU:** Apri la dashboard / pannello di fatturazione dello Studio per verificare i crediti residui prima di avviare un'istanza GPU, e ricorda che i singoli tipi di GPU (come T4, L4 o L40) sono soggetti alla disponibilità regionale e dell'account. Esegui prima la configurazione delle dipendenze sullo Studio CPU gratuito, poi passa alla GPU solo quando sei pronto a eseguire inferenza o training.

## Esecuzione su Lightning AI Studio

1. Crea uno Studio GPU, carica il notebook e aprilo in JupyterLab.
2. Esegui le celle 1-4 in ordine. Verificano la GPU, installano le dipendenze, scaricano i pesi base e avviano la Web UI. Imposta `TRAINING_SAMPLE_RATES` su `[]` per sola inferenza oppure seleziona i sample rate con cui vuoi addestrare.
3. Apri **Port viewer** nel tuo Studio e seleziona la porta stampata dalla cella di avvio (`7865` per impostazione predefinita). Mantieni la porta privata.

## Controlla ogni cella prima di proseguire

Il controllo GPU deve identificare un dispositivo NVIDIA. In caso contrario, cambia prima l'acceleratore. Attendi il completamento dell'installazione delle dipendenze prima di scaricare i pesi. Imposta `TRAINING_SAMPLE_RATES = []` per sola inferenza. Per il training, scegli il sample rate corrispondente al tuo modello e alla coppia di pre-addestrati. Lascia `DOWNLOAD_FCPE` attivo se prevedi di usare FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Esporta e arresta

Imposta `EXPORT = True` ed esegui la cella di esportazione. Attiva `INCLUDE_CHECKPOINTS` se devi riprendere il training in seguito. Salva lo ZIP in locale prima di chiudere la sessione, poi esegui la cella di arresto con `STOP = True`.

## Se l'avvio fallisce

Se la prima cella non rileva la GPU, controlla l'acceleratore e rieseguila. Se l'interfaccia non si apre, leggi l'output della cella di avvio, conferma che il server sia pronto e riapri la vista.

### Controlla lo ZIP di output

Per l'inferenza, verifica il WAV esportato e i file del modello. Per il training, attiva `INCLUDE_CHECKPOINTS` per includere i log dell'esperimento, poi controlla l'archivio prima di chiudere la sessione. Conserva il dataset originale separatamente.

## Risoluzione dei problemi comuni

Se l'installazione fallisce, leggi il primo errore e riesegui la cella fallita dopo averla corretta. Se l'app si apre ma manca il modello, controlla il log di importazione e aggiorna l'elenco. Per errori di memoria esaurita (OOM), inizia con una clip più corta o riduci il batch size di training. Se la Web UI si chiude, riaprila dalla stessa cella di avvio o porta finché la sessione è attiva.

[Ilaria RVC nel cloud](cloud.md)
