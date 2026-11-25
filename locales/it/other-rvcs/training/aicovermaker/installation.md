---
label: "AICoverMaker · Installazione"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/aicovermaker/installation/
---

# AICoverMaker · Installazione

AICoverMaker è il fork di Applio di Eddycrack864 dedicato alle cover con conversione vocale. La guida fa riferimento alla versione 1.0.5. Parti da una registrazione e da un modello vocale che hai il permesso di usare.

## Scegli e avvia il pacchetto

1. Apri **Assets** nella release ufficiale. Su Windows, scegli il pacchetto precompilato se compare. **Source code (zip)** è il sorgente e richiede che il launcher prepari le dipendenze.
2. Estrai tutto in una cartella in cui puoi scrivere. Mantieni intatta la struttura. Se l’installazione dal sorgente fallisce con il nome della cartella che include il numero di versione, usa `rvc-ai-cover-maker-ui`.
3. Su Windows avvia `run.bat`. Su Linux, dalla cartella del sorgente esegui `bash run.sh`. Al primo avvio attendi che finisca la preparazione prima di aprire una seconda istanza.
4. Apri l’indirizzo locale mostrato nella console. Tieni aperta la console mentre lavori e chiudi il programma quando hai finito.

## Controlla il primo avvio

Aspetta che si carichi l’interfaccia prima di importare file grandi. Se non si apre, leggi il primo errore in console. Verifica che l’archivio sia stato estratto per intero, che la cartella sia scrivibile e che i download vadano a buon fine. Se il browser non si collega, usa l’indirizzo e la porta dell’avvio corrente. La pagina nel browser dipende dal programma in esecuzione.

## Prepara una prova breve

Usa una clip WAV breve, un checkpoint RVC pronto per l’inferenza e, se lo hai, l’indice abbinato. Tieni fissi modello e impostazioni finché non hai una prima prova che funziona.

[Release ufficiale](https://github.com/Eddycrack864/RVC-AI-Cover-Maker-UI/releases/tag/v1.0.5) · [Crea la prima cover](usage.md)
