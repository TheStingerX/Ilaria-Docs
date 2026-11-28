---
label: "Restore music with Apollo"
icon: ":musical_note:"
order: 95
permalink: /non-rvc/ilaria-audio-upscaler/apollo/
---

# Restaurare la musica con Apollo

[GitHub · Apollo](https://github.com/JusperLee/Apollo) · [Ilaria Audio Upscaler V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Quando usarlo

Apollo è disponibile in Ilaria Audio Upscaler V2. Elabora la musica in locale a **44,1 kHz** su CPU o NVIDIA CUDA. Provalo su un MP3 a basso bitrate, per esempio se i piatti hanno un suono frusciante o gli attacchi della batteria sono impastati. Il modello stima i dettagli a partire dal segnale disponibile. Se hai una copia pulita del brano, usala come riferimento.

## Prima prova

Seleziona **Apollo** nel menu dei motori. Se mancano i pesi, premi il pulsante di download. Servono circa **63,5 MiB** e l’app li salva in `App/checkpoints/Apollo`. Lascia il dispositivo su **Auto**, aggiungi un breve estratto e premi **Enhance audio**.

## Confronto e salvataggio

Ascolta gli stessi secondi a **1×** e a un volume simile. Controlla se le code dei piatti, le consonanti e gli attacchi della batteria suonano più naturali o se compaiono asprezze. Se preferisci il risultato, usa **Save result**. Il WAV predefinito è **PCM a 24 bit**. Scegli **WAV (PCM 16-bit)** se il programma di destinazione lo richiede.

## Risoluzione dei problemi

Se l’app non trova il modello, controlla di aver selezionato Apollo prima di scaricarlo. Se CUDA restituisce un errore, seleziona **CPU** e riprova con un WAV breve. Se l’elaborazione peggiora il suono, tieni l’originale o prova una copia di partenza più pulita.
