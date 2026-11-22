---
label: "Prova l'audio dal vivo in Redpanda-vc"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/redpanda/live-audio/
description: "L'avvio in tempo reale del desktop di Windows utilizza i dispositivi esposti a quel processo locale."
---
# Prova l'audio dal vivo in Redpanda-vc

## Scegli desktop o browser

L'avvio in tempo reale del desktop di Windows utilizza i dispositivi esposti a quel processo locale. La scheda in tempo reale dell'interfaccia utente Web acquisisce l'input del microfono tramite il browser e trasmette l'audio al dispositivo di inferenza selezionato. Utilizza un percorso per il tuo primo test e lascia l'altro chiuso per facilitare la diagnosi del feedback e dei lavori concorrenti.

1. Carica un modello RVC compatibile, seleziona l'embedder previsto dove esposto e inizia con un intonazione neutra con il buffer predefinito.
2. Seleziona il microfono fisico. In modalità browser, concedi l'autorizzazione microfono alla pagina locale e controlla la fonte effettiva nelle autorizzazioni del browser.
3. Collega le cuffie e riproduci il monitor. Pronuncia una breve frase contenente sia parole a voce bassa che ad alta voce, seguita da una pausa. Controlla l'identità vocale, il volume e gli abbandoni.
4. Interrompi lo streaming prima di cambiare motore o scegliere un dispositivo di inferenza diverso. Eseguire un altro test dopo la riconnessione.

## Seleziona il dispositivo di elaborazione

Nelle build WebUI con **Dispositivo di inferenza**, **Automatico** assegna un nuovo flusso a un dispositivo disponibile. Scegli una GPU specifica quando confronti risultati ripetibili o lasci una GPU libera per un altro carico di lavoro. Uno streaming rimane sul dispositivo assegnato. Più GPU possono gestire flussi separati; cambiare il selettore non è un modo per combinare la loro capacità in un unico flusso. Beatrice utilizza un percorso CPU separato nell'implementazione documentata.

## Instradare il segnale dopo un test pulito

> **Correct Audio Routing**
>
> **1. Nel Voice Changer**
> - **Input Device:** Il tuo microfono fisico.
> - **Output Device:** `Line 1` (VAC, consigliato) o `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Giochi, OBS o altre applicazioni**
> - **Input Device:** `Line 1` (VAC, consigliato) o `CABLE Output` (VB-CABLE).
> - **Output Device:** Le tue cuffie (fortemente consigliate rispetto agli altoparlanti).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> L'audio in arrivo da Discord, dal gioco o da altre app deve andare direttamente alle **cuffie** (mai di nuovo nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) è sempre consigliato. Se hai anche (o solo) **VB-CABLE**, ricorda che il voice changer invia a **`CABLE Input`** mentre Discord / giochi ricevono da **`CABLE Output`**.
> - **Altoparlanti e rientro dalle cuffie:** Evita gli altoparlanti: il suono può rientrare nel microfono generando audio doppio, eco o facendo convertire anche le voci degli altri presenti in chiamata. Può succedere persino con le cuffie se il volume è troppo alto o se i padiglioni non sono abbastanza chiusi e isolati.
> - **Monitoraggio:** Ascoltare la propria voce convertita in cuffia è una funzione separata opzionale da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

Se il percorso di riproduzione può avere come target un cavo virtuale, scegli lì il punto finale di riproduzione del cavo. Nell'app ricevente, seleziona l'endpoint di registrazione complementare come microfono. Mantieni il microfono fisico come convertitore di ingresso e uscita dalla chiamata in cuffia. Nella modalità browser la destinazione della riproduzione può dipendere dalle impostazioni di output del browser e del sistema operativo. Verifica il ricevitore con una registrazione locale prima di giudicare lo streaming live in una chiamata.

| Cosa senti | Cosa testare |
| --- | --- |
| Il monitor funziona ma la chiamata ha audio non elaborato | Seleziona l'endpoint del cavo nella chiamata e disabilita le sorgenti microfoniche aggiuntive. |
| Il ritardo aumenta o l'audio si interrompe | Interrompi altri flussi, utilizza il buffer predefinito e prova localmente con una scheda. |
| Il misuratore del microfono del browser non si muove mai | Conferma l'autorizzazione del sito, il dispositivo fisico selezionato e se un'altra app ha accesso esclusivo. |
| Solo un gioco causa audio interrotto | Prova mentre il gioco è in esecuzione, dai un po' di margine alla GPU di conversione o scegli un'altra GPU disponibile. |

Il flusso del browser tenta il trasporto WebSocket e può ricorrere allo streaming HTTP quando necessario. Stabilire un risultato locale pulito prima di esaminare la qualità della connessione remota.
