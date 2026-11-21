---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
description: "Prepara un WAV breve e pulito e un modello compatibile per l’inferenza. Per il training conserva sul tuo computer il dataset originale e alcune clip di prova separate."
---
# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Prima di iniziare

Prepara un WAV breve e pulito e un modello compatibile per l’inferenza. Per il training conserva sul tuo computer il dataset originale e alcune clip di prova separate. Il notebook gira su una macchina Linux remota.

1. Apri il notebook in Colab e seleziona un runtime con GPU.
2. Esegui le celle da 1 a 4 nell’ordine per verificare la GPU, installare le dipendenze, scaricare i pesi e avviare la Web UI.
### Limiti, compute unit e regole di Google Colab

Prima di avviare sessioni lunghe, verifica come [Google Colab](https://research.google.com/colaboratory/faq.html) gestisce le risorse:

- **Piano gratuito vs. piani a pagamento (Compute Units):** Il piano gratuito offre GPU quando disponibili, ma durata, timeout e modello di GPU (es. T4) sono dinamici e mai garantiti. I piani **Pro / Pro+ / Pay As You Go** usano **compute unit** consumate in base alla GPU; esaurite le unità, si torna ai limiti gratuiti.
- **Attività non consentite e WebUI:** Le [norme di Colab](https://research.google.com/colaboratory/faq.html#disallowed-activities) vietano web hosting pubblico, proxy remoti, aggiramento limiti e deepfake. L'uso interattivo di Gradio non è vietato in assoluto, ma tunnel WebUI persistenti sul piano gratuito provocano spesso disconnessioni o avvisi.
- **Disconnessioni, salvataggio e privacy:** Colab può disconnettere sessioni inattive e azzerare la VM: esporta (EXPORT = True) o salva su Google Drive e non caricare audio riservati su notebook condivisi.
- **Alternative:** [Kaggle](kaggle.md) o [Lightning AI Studio](lightning-ai.md).

3. Apri la vista incorporata nella cella di avvio e lascia collegato il runtime.

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
