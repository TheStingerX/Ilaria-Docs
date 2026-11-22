---
label: "Configurazione del microfono in tempo reale"
icon: ":headphones:"
order: 10
permalink: /ilaria-rvc/mainline/realtime/
description: "Usa la GUI separata inclusa nelle versioni supportate di RVC WebUI (Mainline - Original RVC) per convertire in tempo reale la voce del microfono."
---

# Converti la voce dal vivo con RVC WebUI (Mainline - Original RVC)

> **Correct Audio Routing**
>
> **1. Nel Voice Changer**
> - **Input Device:** Il tuo microfono fisico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. In Discord, Giochi, OBS o altre applicazioni**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Le tue cuffie o altoparlanti.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> L'audio in arrivo da Discord, dal gioco o da altre app deve andare direttamente alle **cuffie** (mai di nuovo nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** `Line 1` è il nome usato da **VAC (Virtual Audio Cable)**, non un nome universale per tutti i cavi virtuali. Con **VB-CABLE**, imposta Output del Voice Changer su **`CABLE Input`** e Input di Discord / gioco su **`CABLE Output`**.
> - **Monitoraggio:** Ascoltare la propria voce convertita in cuffia è una funzione separata opzionale da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

Usa la GUI separata inclusa nelle versioni supportate di RVC WebUI (Mainline - Original RVC) per convertire in tempo reale la voce del microfono. La WebUI serve per convertire file e addestrare modelli. Ascolta il risultato in cuffia prima di mandarlo all'app di destinazione.

## Apri l'interfaccia e seleziona i tuoi file

1. Completa [l'installazione](installation.md) e controlla il modello con una [breve conversione di prova](inference.md). Questo ti dà un test indipendente se si verifica un problema con il microfono.
2. In un pacchetto Windows con `go-realtime_gui.bat`, avvialo dalla cartella del programma decompresso. Se hai installato RVC WebUI (Mainline - Original RVC) da sorgente, attiva l'ambiente Python usato per la configurazione ed esegui `python realtime_gui.py` dalla directory del repository. Il nome del launcher può variare tra i pacchetti.
3. Nella finestra in tempo reale, seleziona il modello di inferenza compatto `.pth`. Se hai il file `.index` corrispondente già popolato, selezionalo qui. Lascia **Index Rate** su `0` per il primo test di ascolto. Se la tua build richiede un indice nel selettore file, fornisci quello per il modello selezionato.
4. Scegli un'interfaccia host audio, quindi seleziona il microfono fisico come ingresso e le cuffie come uscita. Scegli i valori normali per l'intonazione e la frequenza di campionamento offerti dalla tua build. Inizia con le impostazioni di prestazione predefinite.

## Verifica il microfono prima di connettere un'app

1. Abbassa il volume delle cuffie prima di iniziare. Se la GUI offre **Input voice monitor**, utilizzalo per confermare il microfono selezionato. Pronuncia una breve frase e fai una pausa. Controlla di sentire una voce diretta e silenzio durante la pausa.
2. Passa a **Output converted voice** e avvia la conversione. Attendi l'inizializzazione. Ripeti la stessa frase a un livello parlato normale e ascolta le consonanti e le desinenze delle parole. Controlla il feedback prima di alzare il volume.
3. Se lo streaming si avvia ma le parole vengono tagliate, controlla la selezione del dispositivo e il livello di ingresso. Se l'audio si interrompe a scatti, torna alla lunghezza del blocco di elaborazione predefinita. Una voce pulita e leggermente ritardata è una prova di riferimento migliore rispetto a un segnale a bassa latenza che continua a interrompersi.
4. Interrompi lo streaming prima di cambiare dispositivi audio o caricare un checkpoint diverso. Riavvia e ripeti lo stesso test di ascolto.

## Invia l'audio di RVC WebUI (Mainline - Original RVC) a una chiamata o a un registratore

Configura un cavo virtuale o un'altra coppia di dispositivi di riproduzione e registrazione collegati. L'ingresso di riproduzione del cavo riceve l'audio da RVC WebUI (Mainline - Original RVC). L'estremità di registrazione fornisce l'audio alla chiamata o al registratore.

```text
Microfono fisico → GUI RVC WebUI (Mainline - Original RVC) → Ingresso di riproduzione del cavo virtuale
                                           ↓
                       App di chiamata o registrazione ← Uscita di registrazione del cavo virtuale
```

1. Interrompi la conversione e imposta il dispositivo di uscita RVC WebUI (Mainline - Original RVC) sull'estremità di riproduzione del cavo. Lascia il microfono fisico selezionato come ingresso di RVC WebUI (Mainline - Original RVC).
2. Nell'app di destinazione, scegli l'estremità di registrazione del cavo come microfono. Seleziona le cuffie per la riproduzione dell'app in modo che l'audio della chiamata non ritorni indietro attraverso il cavo.
3. Avvia la conversione ed effettua una registrazione privata o utilizza il test del microfono dell'app. Verifica che la registrazione contenga solo la voce convertita, senza duplicati. Se hai bisogno anche del monitoraggio locale, utilizza il monitoraggio dell'app di destinazione, ove disponibile, e mantienilo separato dall'ingresso del cavo.
4. Se l'app di destinazione taglia le sillabe più deboli, confronta un breve campione con l'elaborazione automatica del rumore disattivata per la diagnosi. Ripristina ogni elaborazione che migliori il risultato senza perdere parole.

## Riduci il ritardo senza creare interruzioni

Diminuisci la **Sample length** o il controllo del blocco equivalente un incremento alla volta. Un blocco più corto riduce l'attesa ma dà al motore meno tempo per finire. Ripeti una frase tranquilla e una frase più forte dopo ogni modifica. Se ci sono clic, interruzioni o sillabe ripetute, torna all'ultimo valore stabile. Una volta che la dimensione del blocco è stabile, regola un'altra impostazione alla volta se la tua build la espone:

- **Fade length** fonde i blocchi sovrapposti. Una modifica può aiutare con i clic ai limiti dei blocchi.
- **Extra inference time** fornisce al modello più contesto attorno al blocco corrente. Riducilo con cautela e ascolta l'instabilità.
- Il metodo di estrazione del pitch incide sia sulla qualità dell'intonazione che sul carico di lavoro. Confronta un'alternativa supportata quando le note difficili oscillano o l'elaborazione impiega troppo tempo.
- **Index Rate** e la riduzione del rumore aggiungono elaborazione. Prova una prova di riferimento stabile con le funzionalità opzionali disattivate prima di ottimizzarle ciascuna.

Utilizza lo stesso test con il carico di lavoro di chiamata, gioco o registrazione in esecuzione. Il ritardo di andata e ritorno che senti dipende anche dai driver audio, il cavo virtuale e l'app di destinazione. Una cifra temporale mostrata dal convertitore rappresenta solo una parte di quel percorso.

| Sintomo | Controlla prima |
| --- | --- |
| Dispositivo mancante | Interrompi lo streaming, ricarica l'elenco dei dispositivi e prova un'altra interfaccia host che esponga il microfono e l'uscita. Controlla l'autorizzazione del microfono del sistema. |
| L'app di destinazione riceve la voce originale | Imposta il microfono dell'app di destinazione sull'estremità di registrazione del cavo. Disabilita una seconda fonte di acquisizione se l'app le unisce entrambe. |
| Fischio o voce raddoppiata | Usa le cuffie, controlla che nessun ingresso punti sul ritorno del cavo e disattiva il monitoraggio duplicato. |
| L'ascolto locale funziona, l'app di destinazione è muta | Conferma di aver scelto le due estremità dello stesso cavo. Testa entrambi gli endpoint con un'app di registrazione locale. |
| Il modello non si avvia | Testa la stessa esportazione dell'inferenza nell'interfaccia utente Web e conferma le risorse corrispondenti. Leggi il primo errore della GUI prima di modificare insieme le impostazioni del dispositivo e del modello. |

Consulta [nozioni di base sulla conversione in tempo reale](../../conversion/real-time.md) per altre app supportate e la terminologia generale del routing.
