---
label: "🎙️ Instrada e sintonizza Vonovox"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
---
# Instrada e sintonizza Vonovox

## Imposta il percorso

Utilizza tre endpoint: il microfono fisico per l'ingresso, un cavo virtuale per il segnale convertito e le cuffie per il monitoraggio. Un cavo virtuale ha un lato di riproduzione per l'app che invia l'audio e un lato di registrazione per l'app che lo riceve. Alcuni driver mostrano lo stesso nome di linea su entrambi i lati.

1. In Vonovox, imposta **Dispositivo di input** sul microfono fisico. Imposta **Dispositivo di output** sulla linea virtuale elencata sotto Dispositivi di riproduzione Windows.
2. Nell'app ricevente, seleziona la riga corrispondente sotto le impostazioni del microfono. Evita di lasciare l'app su **Predefinita** se seleziona il microfono fisico. Mantieni l'uscita dell'altoparlante dell'app ricevente impostata sulle cuffie.
3. Per ascoltare localmente, apri **Impostazioni → Sistema → Suono → Altre impostazioni audio → Registrazione**. Apri le proprietà dell'endpoint di registrazione del cavo, seleziona **Ascolta questo dispositivo** e invia la riproduzione alle cuffie. Disattiva l'ascolto se esegui già il monitoraggio tramite un'altra app.
4. Prova nell'app ricevente con una registrazione privata o il relativo test del microfono. Pronuncia una frase normale, aspetta in silenzio, quindi pronuncia una frase più forte. Verifica che la registrazione contenga la voce convertita, le pause pulite e nessuna seconda copia del tuo microfono grezzo.

Lo sviluppatore utilizza un percorso audio a 48 kHz. Se il microfono e il driver virtuale espongono tale frequenza, imposta i formati del dispositivo su 48 kHz. Questo formato del dispositivo è separato dalla frequenza di addestramento del modello.

## Sintonizza in ordine ripetibile

| Sintomo | Cambia prima per testare |
| --- | --- |
| Sillabe crepitanti o mancanti | Aumenta **Block Size** di un passo e ripeti la stessa frase. |
| Audio pulito con troppo ritardo | Riduci le **dimensioni del blocco** di un passaggio. Ripristina l'ultimo valore pulito se perde l'audio. |
| I sussurri o i canti scompaiono | Disabilita **RNNoise** e **VAD Noise Reduction** se abilitati e controlla eventuali porte vocali a valle. |
| L'audio locale è chiaro ma l'audio inviato è silenzioso | Verifica che l'app ricevente stia ascoltando l'endpoint di registrazione del cavo. |
| La voce si ripete o fa eco | Disabilita il monitoraggio duplicato e assicurati che l'uscita della chiamata venga indirizzata direttamente alle cuffie. |
| L'audio si interrompe solo durante il gioco | Testalo con il normale carico di gioco. Concedere spazio alla GPU del convertitore o aumentare la dimensione del blocco. |

Continua a guardare avanti alla sua preimpostazione per il primo test. Cambialo solo dopo aver trovato una dimensione di blocco stabile. Accorda l'altezza e la formante in modo indipendente, facendo delle pause tra le modifiche in modo che gli artefatti risultanti siano più facili da isolare. Durante il test della riproduzione di file in tempo reale, controlla la sorgente attiva nell'interfaccia utente prima di riprendere a utilizzare il microfono. Un file in riproduzione può sostituire temporaneamente il microfono fisico.
