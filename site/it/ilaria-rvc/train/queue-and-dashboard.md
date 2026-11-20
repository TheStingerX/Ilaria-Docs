# Coda, dashboard e avvisi

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Accoda diversi esperimenti

Configura l'esperimento in Training, conferma il set di dati e il nome del modello e aggiungilo alla **Coda di training**. Utilizzare nomi distinti per configurazioni distinte. Rivedi le voci salvate prima di iniziare, quindi controlla il lavoro corrente e la sua fase. La coda persiste tra le sessioni. Metti in pausa o riprendi dai suoi controlli e controlla i lavori non riusciti prima di riprovare. Correggere i percorsi dei set di dati mancanti e le impostazioni incompatibili prima di inviare nuovamente.

## Segui un lavoro in corso

Il **Dashboard allenamento** mostra la durata dell'epoca, gli aggiornamenti cumulativi, i passi al secondo, i grafici e un messaggio di stato. Durante l'addestramento di un modello, la dashboard segue le metriche in tempo reale. Quando è inattivo, scegli un nome modello esistente per esaminarne le metriche salvate. Utilizzare il registro del lavoro per identificare il primo errore. I contatori sono utili per i tempi e i progressi. Giudica il suono da [anteprime dell'allenamento](training-workflow.md) della stessa clip tenuta fuori.

## TensorBoard e diagnostica

Utilizza i controlli Start e Stop del pannello TensorBoard. La dashboard 2.1.0 attende eventi scalari utilizzabili prima di mostrarli. Controlla l'esperimento selezionato e lo stato della dashboard se i grafici sono vuoti. Le curve di perdita possono aiutare a individuare una corsa in stallo. Non riescono a classificare quanto naturali suonino le voci.

Apri **Consulente formazione PC** in Altro, seleziona la velocità, la precisione e la GPU prevista ed esegui la scansione. Prova le impostazioni suggerite in un piccolo lavoro prima di un lungo esperimento. Il **Rapporto diagnostico** include sistema operativo, GPU, CUDA, disco ed errori di training recenti. Esamina i report relativi ai percorsi dei file personali prima di condividerli.

## Notifiche e soste sicure

Utilizza notifiche desktop e sonore opzionali per notare il completamento o gli errori, quindi conferma lo stato finale nei registri. Salva prima di riavviare o chiudere l'ultima scheda. Con **Interrompi e salva**, attendi la conferma e preserva la coppia G/D e lo stato dell'esperimento prima di spostare o riavviare la corsa.
