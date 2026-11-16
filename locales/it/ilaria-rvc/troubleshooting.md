---
label: "🛠️ Log e ripristino"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Log e ripristino

## Trova la prima fase non riuscita

Per problemi di avvio, utilizza `ILARIA_RVC_LOGS.bat` e annota il primo errore. In caso di errore nell'inferenza, testare un breve WAV locale con il recupero disattivato e confermare il modello e l’embedder. Per gli errori di training, identificare se la preelaborazione, l'estrazione delle funzionalità o la fase di training non sono riuscite prima di riprovare.

## Gestire la pressione della memoria

Chiudi le attività GPU concorrenti, scarica la voce di inferenza e riprova con un batch di training più piccolo o con la memorizzazione nella cache del set di dati disabilitata, se applicabile. Salva prima di riavviare. Registra la versione dell'app, la GPU, l'esatta azione in caso di errore e il primo errore prima di richiedere assistenza.
