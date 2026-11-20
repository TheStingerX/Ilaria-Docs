---
label: "Installa e utilizza RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue è un cambia voce desktop Windows basato sulla GUI in tempo reale di RVC WebUI (Mainline - Original RVC)."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

RVC Blue è un cambia voce desktop Windows basato sulla GUI in tempo reale di RVC WebUI (Mainline - Original RVC). Converte microfono, file audio e audio delle applicazioni Windows supportate in tempo reale. I modelli vengono addestrati in un'applicazione separata. L'input del file passa attraverso il motore live e può essere registrato in WAV.

## Installa il pacchetto Windows

1. Controlla il modello della tua GPU NVIDIA in **Task Manager → Prestazioni**. Apri [RVC Blue downloads](https://huggingface.co/niel-blue/RVC-Realtime-GUI) e scegli il pacchetto per il tuo hardware. Il progetto fornisce un pacchetto standard **CUDA 12.8**, incluso il supporto Blackwell, e un pacchetto di compatibilità **CUDA 11.8**. Utilizza un driver compatibile con la build selezionata.
2. Estrai l'intero archivio in una cartella locale scrivibile. Python, PyTorch, FFmpeg e le risorse di inferenza richieste vengono fornite con il pacchetto.
3. Per CUDA 12.8, esegui `RVC-Realtime-GUI-CUDA128.bat` da quella cartella. Per CUDA 11.8, utilizzare il launcher in bundle. Attendi il primo avvio per completare il caricamento del runtime della GPU.
4. Inizia con la voce inclusa o inserisci la tua inferenza `.pth` e il relativo indice corrispondente in una cartella per modello sotto `models/`. Ad esempio, posiziona `MyVoice.pth` e `added_MyVoice.index` all'interno di `models/MyVoice/`. Il nome della cartella viene visualizzato nell'elenco dei modelli. Aggiorna o riapri l'app dopo aver aggiunto un modello.

## Testa la voce localmente

Scegli il tuo microfono fisico come ingresso. Seleziona le cuffie per il monitoraggio, scegli una voce e fai clic su **Avvia**. Pronuncia una breve frase e fai una pausa. Mantieni le impostazioni predefinite di buffer e tono per il primo test. L'app consente dispositivi di input, output e monitoraggio indipendenti. Inizia con WASAPI se non usi hardware ASIO. Se utilizzi ASIO nativo, inizia con il buffer consigliato dal driver.

## Indirizza l'audio a un gioco o a una chiamata

Scegli l'endpoint di riproduzione del cavo virtuale come uscita del convertitore. Nell'app di destinazione, seleziona l'endpoint di registrazione come microfono. Mantieni la riproduzione del gioco o della chiamata sulle cuffie. **VAC Lite** e **VB-CABLE** sono opzioni. Controlla i nomi dei dispositivi nella [procedura dettagliata del cavo virtuale](../vonovox/live-audio.md). Effettua una breve registrazione locale nella destinazione prima di partecipare a una chiamata.

## Utilizza un file o un'altra applicazione come input

Per un file audio, seleziona la modalità di input file e prova un breve WAV. Scegli un dispositivo di output e monitor prima di iniziare. Utilizza i controlli di registrazione per salvare l'output WAV. L'app espone anche opzioni per registrare l'input e l'output in modo indipendente o in un layout combinato.

Nelle build che includono l'acquisizione dell'applicazione, cambia la sorgente di input in un'applicazione, aggiorna l'elenco e seleziona l'app che sta riproducendo l'audio. Utilizza l'acquisizione audio per processo di Windows. L'uscita ASIO diretta può ignorare il percorso di acquisizione. L'audio dell'applicazione originale rimane udibile a meno che non si regoli la riproduzione separatamente.

## Risolvi i problemi con il primo test

| Sintomo | Cosa controllare |
| --- | --- |
| Il programma si chiude all'avvio | Esegui il launcher in bundle dalla cartella estratta e leggi il primo errore. Controlla la build CUDA selezionata e il driver NVIDIA. |
| Non appare una nuova voce | Verifica la cartella per modello e aggiorna l'elenco dei modelli. Utilizza un'esportazione di inferenza anziché un checkpoint di formazione. |
| Le cuffie funzionano ma Discord o il gioco sono silenziosi | Seleziona l'endpoint di registrazione via cavo virtuale nella destinazione. Controllare separatamente l'uscita del convertitore. |
| Si sentono due voci | Controlla se l'app originale è ancora udibile o se sono attivi due percorsi di monitoraggio. |
| L'audio si interrompe sotto carico | Ripristina il buffer predefinito o aumentalo leggermente. Ripeti il ​​test mentre l'altra app è in esecuzione. |

[Sorgente del progetto e note di rilascio](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
