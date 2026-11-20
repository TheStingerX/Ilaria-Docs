---
label: "Instrada e regola Deiteris"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/deiteris/live-audio/
description: "Indossa sempre le cuffie durante la conversione live. Usare le casse fa rientrare la voce convertita nel microfono generando eco e fischi."
---
# Instrada e regola Deiteris w-okada Fork

Indossa sempre le **cuffie** durante la conversione live. Usare le casse fa rientrare la voce convertita nel microfono generando eco e fischi.

## 1. Configura i dispositivi audio

1. Imposta **Audio Input** sul tuo microfono fisico.
2. Imposta **Audio Output** sulle tue cuffie per un primo test locale, oppure su **`CABLE Input`** (il dispositivo di riproduzione del cavo virtuale) quando instradi verso altre app.
3. In **Discord, OBS, VRChat o nel gioco**, seleziona **`CABLE Output`** come microfono.
   - Su Discord disattiva la **Soppressione rumore (Krisp)** e la **sensibilità di ingresso automatica** per non tagliare respiri e finali di parola.

## 2. Carica un modello e regola i parametri

1. Carica o seleziona un modello **RVC `.pth`** di inferenza e il relativo file **`.index`** opzionale.
2. **Chunk / Block size**: parti da circa `0.3s` - `0.5s` (oppure `192` / `256`+ campioni/frame a seconda dello slider) per bilanciare ritardo e fluidità. Abbassare troppo il Chunk causa scatti o voce robotica.
3. **Extra Data / Context**: mantienilo moderato (`0.5s` - `1.0s`) per un tono stabile senza sovraccaricare la GPU.
4. **Rilevatore F0 / Pitch**: usa **RMVPE** (più preciso) o **FCPE** (più leggero/veloce in tempo reale); evita Crepe Full in modalità live se il tempo di inferenza supera la durata del chunk.
5. **Tune (Pitch)**: `+12` per uomo -> donna, `-12` per donna -> uomo, `0` per lo stesso registro.
6. **Index ratio**: parti da `0.0` per testare la conversione pulita, poi alza gradualmente (`0.3` - `0.6`) se necessario.

## 3. Soluzioni rapide

- **Latenza alta o scatti robotici**: disattiva **Pianificazione GPU con accelerazione hardware (HAGS)** nelle Impostazioni grafiche di Windows e riavvia, chiudi giochi/schede browser pesanti sulla GPU e aumenta il Chunk di uno step.
- **Errore PortAudio / dispositivo**: imposta tutti i dispositivi audio allo stesso sample rate (`48000 Hz`) nelle Impostazioni audio di Windows e chiudi le app che bloccano il dispositivo in modalità esclusiva.
