# NoRegretsRVC · Uso

NoRegretsRVC Beta 0.1.0 è uno studio web indipendente per configurare flussi di lavoro basati su Applio. Il repository contiene l’interfaccia e il generatore di notebook. L’installazione locale avvia lo studio nel browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](version-history.md) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Uso

In **Training**, crea o seleziona un progetto e imposta frequenza di campionamento, vocoder, estrattore di pitch ed embedder. Se usi un pretrain, scegli impostazioni compatibili con la coppia di pesi. Parti da un batch contenuto, poi regola epoche e precisione per il runtime di destinazione. La stima VRAM è indicativa. Prima di esportare controlla le impostazioni del notebook, del tunnel e dei backup. I progetti salvati nel browser dipendono dal profilo e dall’indirizzo con cui apri lo studio.

**Samples** prepara le impostazioni di conversione. **Models** e gli strumenti di lavoro configurano download, fusione delle voci o TTS. **TensorBoard** mostra dati di training elaborati dall’interfaccia. Per eseguire davvero una conversione o un addestramento, usa un runtime Applio compatibile e controlla lì i file prodotti.

## Training guidato

In **Model Settings**, dai un nome all’esperimento e scegli frequenza (32, 40 o 48 kHz), vocoder e GPU. In **Prepare Dataset**, seleziona la cartella audio e avvia il pre-processing. In **Extract Features**, scegli estrattore del pitch ed embedder compatibili con il pretrain. In **Train Model**, controlla batch, epoche, frequenza di salvataggio e algoritmo dell’indice. Su Kaggle trovi anche **Export Model**, da cui scaricare il `.pth` per l’inferenza e l’eventuale `.index`. Per riprendere un training, usa checkpoint che corrispondono alla configurazione dell’esperimento.

## Samples e pulizia audio

Metti in coda clip WAV, MP3, FLAC, OGG o M4A. Ogni clip può seguire le impostazioni comuni dello Step 3 oppure avere valori propri. Parti da zero semitoni. Il controllo permette di andare da −32 a +32 e offre scorciatoie per −12, −5, 0, +5 e +12. Per una prova veloce puoi usare uno dei sei campioni di parlato asciutti a 32 kHz, con trascrizione. La pulizia nel browser può applicare un filtro passa-alto da 65 a 95 Hz e un espansore soft-knee fra 1 e 30 dB, con esportazione WAV PCM a 16 bit. Ascolta il file prima e dopo la pulizia. L’anteprima CLI mostra il comando `core.py`.

## Models, Voice Blender e TTS

In **Models** puoi accodare pretrain personalizzati nel Boot Manifest. Il gestore riconosce URL Hugging Face e Pixeldrain, può estrarre ZIP supportati e tentare di trovare il file del discriminatore abbinato. Verifica la coppia prima di attivare **Custom Pretrains**. È disponibile Legacy Core 1.5 V2 a 32 kHz. I pretrain originali di Applio restano selezionati finché non attivi quelli personalizzati. **Voice Blender** guida nella scelta dei modelli, nelle impostazioni di fusione e nell’esportazione. **TTS** usa le voci online di Microsoft Edge, poi converte il parlato con RVC e offre controlli per pitch, velocità, indice e protezione delle consonanti.

## Diagnostica e impostazioni

**Diagnostics** può leggere le metriche live di Kaggle o importare `.ipynb`, `.log` e `.txt`. Mostra l’andamento della Mel loss e analizza divergenza KL, feature matching, equilibrio del discriminatore, stabilità dei gradienti e variazioni verso fine training. Le percentuali di rischio e i checkpoint suggeriti sono stime. Ascolta la stessa clip con checkpoint diversi prima di scegliere. Nelle impostazioni trovi FP32 come valore iniziale, le modalità RMVPE High Register `true_pitch` e `fold` con limite F0 da 1000 a 2000 Hz e dieci lingue per l’interfaccia, tra cui l’arabo con layout da destra a sinistra.

## Training e diagnostica nella 0.1.0

La normalizzazione del dataset punta a −20 LUFS per impostazione predefinita. Il sample rate predefinito resta 32 kHz. La media mobile EMA stabilizza i pesi del generatore, la Mel loss multiscala usa finestre FFT di 512, 1024 e 2048 campioni e il clipping dei gradienti limita gli aggiornamenti troppo grandi. La release ritocca `nprobe` di FAISS e monitora le nuove metriche. Verifica all’ascolto i checkpoint suggeriti.

In Settings il comando si chiama **Restart NoRegretsRVC**. I campi numerici aggiornano i cursori mentre scrivi. I nomi dei vecchi esperimenti non sono più suggeriti automaticamente.

[Installazione](installation.md) · [Cloud](cloud.md)
