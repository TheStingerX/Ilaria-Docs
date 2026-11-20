---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /ilaria-rvc/lightning-ai/
description: "Prepara un WAV breve e pulito e un modello compatibile per l’inferenza. Per il training conserva sul tuo computer il dataset originale e alcune clip di prova separate."
---
# Lightning AI Studio

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

## Prima di iniziare

Prepara un WAV breve e pulito e un modello compatibile per l’inferenza. Per il training conserva sul tuo computer il dataset originale e alcune clip di prova separate. Il notebook gira su una macchina Linux remota.

1. Crea uno Studio con GPU, carica il notebook e aprilo in JupyterLab.
2. Esegui le celle da 1 a 4 nell’ordine per verificare la GPU, installare le dipendenze, scaricare i pesi e avviare la Web UI.
3. Apri **Port viewer** e seleziona la porta indicata (7865 di default). Mantienila privata.

## Controlla ogni cella prima di proseguire

La prima cella deve rilevare una GPU NVIDIA. Se non la trova, cambia acceleratore. Aspetta che l’installazione delle dipendenze finisca prima di scaricare i pesi. Usa `TRAINING_SAMPLE_RATES = []` per la sola inferenza. Per il training scegli una frequenza compatibile con il modello e la coppia preaddestrata. Tieni `DOWNLOAD_FCPE` attivo se intendi usare FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Esporta e chiudi

Imposta `EXPORT = True`. Attiva `INCLUDE_CHECKPOINTS` se vuoi riprendere il training. Scarica lo ZIP prima di eseguire la cella con `STOP = True`.

### Controlla lo ZIP esportato

Per l’inferenza verifica che lo ZIP contenga il WAV e i file del modello che vuoi conservare. Per riprendere il training, attiva `INCLUDE_CHECKPOINTS` e controlla che l’archivio contenga i file dell’esperimento prima di chiudere. Conserva il dataset originale separatamente.

## Risolvi i problemi più comuni

Se una cella fallisce, leggi il primo errore e riprovala dopo averlo risolto. Se l’interfaccia si apre ma il modello non compare, controlla il log di importazione e aggiorna l’elenco. Se esaurisci la memoria della GPU, prova una clip più breve o un batch più piccolo. Se la Web UI si chiude, riaprila dalla cella di avvio o dalla porta finché la sessione è attiva.

[Ilaria RVC nel cloud](cloud.md)
