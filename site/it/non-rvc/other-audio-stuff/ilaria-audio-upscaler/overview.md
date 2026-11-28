# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Scegli il motore

Ilaria Audio Upscaler elabora registrazioni in locale su Windows. Scegli **Sidon** per parlato con rumore, riverbero o artefatti di compressione. Scegli **AP-BWE** per parlato abbastanza pulito ma ovattato per via della banda limitata, come una registrazione telefonica. Entrambi i motori sono pensati per il parlato. Confronta il risultato con l’originale prima di usarlo in un dataset vocale.

## Apollo

**Apollo** è pensato per la musica degradata dalla compressione con perdita. Lavora a **44,1 kHz** su CPU o NVIDIA CUDA. Parti da un estratto breve con piatti o altri suoni ricchi di alte frequenze. Seleziona **Apollo**, scarica i pesi se richiesto, aggiungi il file e premi **Enhance audio**. Confronta originale e risultato a **1×**, poi usa **Save result** se vuoi conservarlo. Tieni l’originale per valutare le differenze di timbro e degli attacchi.

[Apollo](https://github.com/JusperLee/Apollo)

## Prima prova

Conserva il file sorgente. Elabora un estratto breve con un solo motore ed esportalo in WAV. Ascolta le due versioni a volume simile e controlla consonanti, pause e timbro. Le frequenze alte vengono ricostruite a partire dal segnale disponibile. Un’uscita a 48 kHz non recupera esattamente la forma d’onda originale.

[Installazione e modelli](installation.md) · [Restaurare il parlato con Sidon](sidon.md) · [Estendere la banda vocale con AP-BWE](ap-bwe.md) · [Anteprima, esportazione e risoluzione dei problemi](export.md)

## Fonti

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
