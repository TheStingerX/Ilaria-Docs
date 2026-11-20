---
label: "Genera parlato dal testo"
icon: ":speech_balloon:"
order: 92
permalink: /ilaria-rvc/applio/tts/
description: "Applio utilizza una voce Edge TTS online per leggere il tuo testo e un modello RVC per modificare la voce generata."
---
# Genera il parlato e convertilo con Applio

Applio utilizza una voce Edge TTS online per leggere il tuo testo e un modello RVC per modificare la voce generata. La voce sorgente determina la pronuncia, il ritmo e la lingua che legge. Usa un testo che puoi condividere con il servizio di sintesi online.

1. Apri l'area di lavoro di sintesi vocale dopo che il motore è pronto e il [modello vocale funziona](inference.md).
2. Inserisci una breve frase con punteggiatura. Scegli una voce TTS di origine per la lingua di quella frase. Inizia con la velocità di lettura predefinita.
3. Seleziona la tua voce di inferenza RVC, l'embedder corrispondente e il suo indice se ne usi uno. Inizia con il pitch shift a 0 e gli effetti disattivati.
4. Genera il parlato e ascolta l'output. Se la tua interfaccia rende disponibile la sorgente sintetizzata, ascolta anche quella. Se la fonte interpreta male un acronimo o fa una pausa strana, cambia la punteggiatura, scrivi l'acronimo per esteso o seleziona prima un'altra voce sorgente.
5. Quando la frase suona correttamente, salva l'audio e annota la voce sorgente, la velocità di lettura, il modello RVC, l'embedder e l'intonazione. Per un testo lungo, dividilo in sezioni dove ci sono pause naturali e usa le stesse impostazioni.

Se il passaggio di generazione della voce fallisce, prova una voce sorgente diversa e controlla la connessione del motore al servizio vocale. Se la generazione del parlato riesce e solo la conversione fallisce, converti una breve registrazione con lo stesso modello RVC. Questo test aiuta a individuare problemi nel modello o nell'embedder senza modificare lo script.
