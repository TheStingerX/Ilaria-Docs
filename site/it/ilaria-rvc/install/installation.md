# Installazione e aggiornamenti

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · Il pacchetto completo per Windows è la 2.4.7. Lo ZIP di aggiornamento 2.5.0 esclude il runtime e i pesi dei modelli. Dalla 2.4.2 alla 2.4.8, usa **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Installa il pacchetto Windows

Scarica la build NVIDIA supportata da [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Estrai l'intero archivio in una cartella locale scrivibile ed esegui `RUN_ILARIA_RVC.bat` lì. Il programma di avvio e il runtime in bundle devono rimanere insieme. Se non si apre alcuna scheda del browser, prova `http://127.0.0.1:6969` sullo stesso PC.

### Perché non dovresti aggiornare manualmente PyTorch

Ilaria RVC include una combinazione testata e bloccata di **PyTorch (2.10.0)**, **CUDA (12.8 o 12.6)**, 	orchaudio, 	orchvision, aiss e dipendenze audio. **Non** eseguire manualmente pip install --upgrade torch:

- Aggiornare solo PyTorch può rompere la compatibilità binaria con 	orchaudio, airseq, onnxruntime o estensioni C++/CUDA.
- Versioni più recenti possono rimuovere il supporto a GPU meno recenti (Maxwell, Pascal, Volta) o introdurre errori UnpicklingError.
- Attendi sempre un aggiornamento ufficiale di Ilaria RVC invece di modificare manualmente il runtime portatile.

## Prima del primo avvio

Lo ZIP completo di Windows è di circa 5,00 GB. Lasciare spazio sia per l'archivio che per i file estratti. Estrailo in una nuova cartella locale in cui puoi scrivere file. Mantieni insieme il launcher, il runtime e le risorse. ContentVec e RMVPE sono inclusi. I codificatori opzionali sono disponibili in **Altro → Scarica incorporamenti**.

## Quale runtime CUDA utilizzerà Ilaria RVC?

Apri **Task Manager → Prestazioni → GPU** e leggi il nome esatto del modello. Confrontalo con la [tabella compatibilità GPU](gpu-compatibility.md). La versione CUDA riportata di seguito si riferisce all'ambiente PyTorch utilizzato dall'app. Il driver NVIDIA è un componente di sistema separato e deve supportare tale ambiente.

| GPU presenti nel PC | Runtime | Cosa aspettarsi |
| --- | --- | --- |
| GeForce GTX 16 o RTX 20, 30, 40 o 50 | PyTorch 2.10.0 con CUDA 12.8 | Lo ZIP completo include questo runtime. Estrailo ed esegui il launcher. Su RTX 50, PyTorch è già incluso e pronto per l'uso con un driver NVIDIA compatibile. |
| Solo NVIDIA Maxwell, Pascal o Volta | PyTorch 2.10.0 con CUDA 12.6 | Al primo avvio il launcher scarica e verifica il runtime precedente. Lo mantiene in `runtime-cu126` e lo riutilizza nei lanci successivi. Lascia aperto il programma di avvio e consenti l'accesso a Internet e lo spazio su disco. |
| Nessuna GPU NVIDIA locale adatta | GPU NVIDIA remota | [Ilaria RVC nel cloud](../cloud/cloud.md) · [Kaggle](../cloud/kaggle.md) · [Google Colab](../cloud/colab.md) · [Lightning AI Studio](../cloud/lightning-ai.md) |

Se hai più di una GPU, leggi il registro del launcher per vedere quale runtime è stato effettivamente avviato. Il percorso CUDA 12.6 sopra descritto si applica quando tutte le GPU NVIDIA nel PC appartengono alle famiglie più vecchie.

## Controlla che l'app sia stata avviata correttamente

1. Esegui `RUN_ILARIA_RVC.bat` dalla cartella estratta. Attendi l'apertura dell'interfaccia. Se è in corso il download del runtime legacy, controlla `cu126-runtime-install.log` per l'avanzamento.
2. Se la finestra si chiude o l'interfaccia non si apre mai, esegui `RUN_ILARIA_RVC_LOGS.bat` e controlla il primo errore. Controlla se menziona la GPU, il driver, l'accesso al download o lo spazio libero su disco. Una pagina del browser vuota può essere il risultato di un errore del programma di avvio.
3. Una volta aperta l'interfaccia, converti un WAV breve e pulito con un modello di inferenza compatibile noto. Controllare il risultato prima di eseguire un batch di grandi dimensioni o di iniziare l'addestramento. Vedi [Inferenza singola e batch](../convert/inference.md).

I test di calcolo e backpropagation e il caricamento di ContentVec sono stati verificati su un RTX 4070. La compatibilità su altre schede è prevista dalla loro architettura e dalla selezione del runtime e non è stata garantita modello per modello.

## Aggiorna alla 2.4.7

Scarica lo ZIP completo (`ILARIA_RVC-2.4.7.zip`), estrailo in una nuova cartella e avvia `RUN_ILARIA_RVC.bat`.

Conserva la vecchia installazione come copia di sicurezza. Copia i modelli in models/, i dataset in app/datasets/ e gli esperimenti completi in app/logs/. L’aggiornamento integrato della 2.3.0 usa la struttura precedente, quindi installa dallo ZIP completo.

[GPU compatibili](gpu-compatibility.md)

### Aggiornamento dalla 2.4.2 - 2.4.8

Se usi già una versione dalla **2.4.2** alla **2.4.8**, apri **Altro → Aggiorna Ilaria RVC → Controlla aggiornamenti** e scegli **Scarica e riavvia**. Dalla **2.4.0** o **2.4.1**, aggiorna prima alla **2.4.2** oppure estrai lo ZIP completo della **2.4.7**.
