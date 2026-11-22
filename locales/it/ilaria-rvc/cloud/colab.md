---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /it/ilaria-rvc/colab/
description: "Esegui Ilaria RVC nel browser con una GPU fornita dalla piattaforma cloud. Scegli un notebook qui sotto. Attiva un acceleratore NVIDIA prima di eseguire la prima cella."
---
# Google Colab

[Apri il notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Esegui Ilaria RVC nel browser con una GPU fornita dalla piattaforma cloud. Scegli un notebook qui sotto. Attiva un acceleratore NVIDIA prima di eseguire la prima cella.

## Prima di iniziare

Prepara un breve WAV pulito e un modello di inferenza compatibile. Per l'addestramento, conserva il dataset originale e alcune clip di prova separate sul tuo computer. Il notebook viene eseguito su una macchina Linux remota.

### Limiti, unità di calcolo e policy di Google Colab

Prima di avviare una sessione lunga, comprendi come [Google Colab](https://research.google.com/colaboratory/faq.html) gestisce le risorse:

- **Piano gratuito vs. piani a pagamento (Compute Units):** Il piano gratuito di Colab offre GPU quando disponibili, ma durata della sessione, timeout di inattività e tipo di GPU (come T4) sono dinamici e mai garantiti. I piani a pagamento (**Colab Pro**, **Pro+** e **Pay As You Go**) utilizzano **compute units** consumate dinamicamente in base alla GPU/TPU scelta; quando il saldo si esaurisce, l'account torna ai limiti del piano gratuito.
- **Attività non consentite e restrizioni WebUI:** La policy [Disallowed Activities](https://research.google.com/colaboratory/faq.html#disallowed-activities) di Google vieta di ospitare file, servire applicazioni web pubbliche non legate al calcolo interattivo, eseguire proxy remoti, aggirare limiti di sicurezza/accesso, usare più account per eludere le quote o creare deepfake. Sebbene i notebook Gradio interattivi non siano vietati in ogni scenario, eseguire tunnel WebUI pubblici persistenti sul piano gratuito provoca spesso disconnessioni del runtime o avvisi di policy.
- **Disconnessioni, salvataggio e privacy:** Colab può disconnettere sessioni inattive o lunghe e cancellare lo spazio locale della VM. Esporta regolarmente i risultati (`EXPORT = True`) o sincronizza i checkpoint importanti su Google Drive, e non caricare mai audio riservati o credenziali in notebook pubblici o condivisi.
- **Alternative:** Se Colab si disconnette o non ha GPU disponibili, usa [Kaggle](kaggle.md) (quota GPU settimanale gratuita dopo verifica telefonica) o [Lightning AI Studio](lightning-ai.md).

## Esecuzione su Google Colab

1. Apri su Colab e seleziona un runtime GPU.
2. Esegui le celle 1-4 in ordine. Verificano la GPU, installano le dipendenze, scaricano i pesi base e avviano la Web UI. Imposta `TRAINING_SAMPLE_RATES` su `[]` per sola inferenza oppure seleziona i sample rate con cui vuoi addestrare.
3. Apri la vista incorporata generata dalla cella di avvio. Mantieni il runtime connesso.

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
