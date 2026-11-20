---
label: "Sintesi vocale"
icon: ":speech_balloon:"
order: 96
permalink: /ilaria-rvc/tts/
description: "Usa Inferenza → TTS per trasformare il testo scritto in una registrazione. Puoi ascoltare direttamente il discorso generato o convertirlo con un modello..."
---
# Sintesi vocale

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Usa **Inferenza → TTS** per trasformare il testo scritto in una registrazione. Puoi ascoltare direttamente il discorso generato o convertirlo con un modello RVC. Le due fasi svolgono compiti diversi: il motore vocale decide come pronunciare e ritmo la sceneggiatura, mentre RVC modifica il carattere vocale della registrazione. Se un nome viene pronunciato male nel primo risultato, correggi lo script o la voce di partenza prima di sintonizzare RVC.

> **Novità della 2.3.0** · ElevenLabs è disponibile tra i motori TTS. Inserisci la tua chiave API ElevenLabs e scegli una voce. Prova una frase breve prima di convertire l’audio generato.

> **Novità della 2.4.1** · Kokoro v1.0. Apri **Inference → TTS → Kokoro (local)** e installa Kokoro quando ti serve. Si scarica separatamente e occupa circa 528 MB una volta installato. Seleziona una voce e prova una frase breve. Microsoft Edge usa Internet, Windows usa le voci installate ed ElevenLabs richiede una chiave API.

## Scegli una voce di partenza

| Motore | Quando sceglierla | Cosa controllare |
| --- | --- | --- |
| Microsoft Edge | Vuoi sfogliare le voci online per lingua. | Il servizio necessita di una connessione internet e invia il testo a Microsoft per la sintesi. Scegli una voce che parli la lingua della sceneggiatura. |
| Windows | Desideri la sintesi offline sull'installazione locale di Windows. | L'elenco dipende dalle voci desktop supportate installate su quel PC. Se manca la voce, controlla le impostazioni vocali di Windows e aggiorna l'elenco. |
| ElevenLabs | Vuoi usare una voce del tuo account ElevenLabs. | Richiede Internet e una chiave API ElevenLabs. Il testo viene inviato a ElevenLabs per la sintesi. |
| Kokoro (local) | Vuoi generare il parlato in locale con Kokoro v1.0. | Installa Kokoro dalla scheda TTS. Occupa circa 528 MB una volta installato e include 54 voci, tra cui Sara e Nicola in italiano. |

La voce di partenza pronuncia le parole. **Voice Model** è il modello RVC che modifica il timbro in seguito. Ad esempio, inizia con una voce di partenza italiana per una sceneggiatura italiana, quindi seleziona separatamente il modello RVC di destinazione. Un modello vocale forte non aggiunge distinzioni fonetiche mancanti alla fonte.

## Effettua una prima registrazione

1. Apri **Inferenza → TTS**. Digita una breve frase o importa un file UTF-8 `.txt`. Il campo di testo supporta fino a **10.000 caratteri**. Inizia con un paragrafo prima di importare uno script lungo.
2. Scegli il motore vocale. Filtra l'elenco per lingua, scegli una voce di origine e utilizza **Aggiorna voci** se l'elenco è obsoleto.
3. Lascia velocità e volume vicini ai valori predefiniti e lascia disattivata la conversione RVC per il primo test. Genera il discorso e ascolta il risultato originale.
4. Controlla nomi, punteggiatura e pause. Se una riga sembra affrettata, dividi la frase o modifica la velocità. Se un'abbreviazione viene letta in modo errato, prova a scriverla. Genera nuovamente lo stesso breve estratto e confronta.
5. Conserva questa prima versione valida come riferimento prima di modificare i controlli RVC.

## Converti il ​​discorso generato

1. Scegli il **Modello vocale** di destinazione sopra il pannello TTS. Utilizza un'inferenza `.pth` compatibile con la tua app. La sua corrispondenza `.index` è facoltativa.
2. Abilita la **conversione RVC**. Inizia con il tono di conversione a **0 semitoni**, l'estrattore del tono predefinito, il **Rapporto indice 0** e gli effetti opzionali disabilitati. Utilizza il codificatore di contenuto previsto dal modello di destinazione.
3. Esegui la conversione, quindi ascolta separatamente i lettori originali e quelli convertiti. Confronta la stessa frase a un livello di riproduzione simile. Utilizza il controllo di download del lettore convertito per salvare il WAV.
4. Se disponi dell'indice corrispondente, prova ad aumentare leggermente il **Rapporto indice** e confronta di nuovo. Mantienilo a zero se non usi un indice. La modifica del recupero non può correggere una parola letta in modo errato dal motore TTS.

## Cosa cambia ogni impostazione

| Controllo | Cosa cambia | Prima regolazione da provare |
| --- | --- | --- |
| Velocità del parlato | La velocità della voce di partenza prima della conversione. | Rallenta un po' se le sillabe corrono insieme. Controllare i tempi prima di accordare l'intonazione. |
| Volume sorgente | Il livello del parlato generato prima della conversione. | Mantieni la fonte pulita e ad un livello utile. Confronta file con volume simile. |
| Intonazione della sorgente in Hz | Modifica l'intonazione durante la sintesi Edge, ove supportato. | Lascialo prima al valore predefinito. Modificarlo separatamente dal tono RVC. |
| Altezza RVC in semitoni | Traspone la voce generata durante la conversione. | Inizia da zero e prova piccoli spostamenti. Controlla le parole più basse e più alte nel campione. |
| Estrazione della tonalità | Stima il contorno del tono dall'audio generato. | Confronta gli estrattori solo se la tonalità convertita salta o traballa. |
| Rapporto indice | Controlla con quale intensità la conversione utilizza l'indice selezionato. | Inizia da zero. Utilizza un valore modesto solo con l'indice corrispondente esatto. |
| Volume del lettore | Controlla il volume di ascolto. | Usalo per confrontare i livelli di riproduzione. Utilizza le impostazioni di conversione o esportazione se devi modificare il file risultante. |

## Prepara un copione più lungo

Dividi un copione lungo ai limiti del paragrafo o della scena. Mantieni la stessa voce di origine, tariffa, modello target e impostazioni di conversione in tutte le sezioni. Salva gli output con nomi ordinati come `01-intro.wav` e `02-main.wav`. Unisciti a loro in un editor audio e ascolta oltre ogni confine. Abbina pause e volume prima di esportare il file finale.

Per gli script con più di una lingua, prova una breve frase in ciascuna lingua prima del rendering. Se necessario, utilizzare voci o sezioni sorgente separate. Alcuni contrasti fonetici potrebbero rimanere difficili dopo la conversione a causa del modello di destinazione o del codificatore del contenuto.

## Risoluzione dei problemi

| Cosa senti o vedi | Cosa controllare |
| --- | --- |
| Edge non produce parlato | Controlla l'accesso a Internet, aggiorna l'elenco delle voci e prova una breve frase di testo normale con un'altra voce compatibile. |
| L'elenco di Windows è vuoto | Controlla quali voci vocali sul desktop sono installate e disponibili per l'app. La sintesi offline dipende dall'ambiente Windows locale. |
| La sorgente e le clip convertite pronunciano male la stessa parola | Cambia la voce di partenza o riscrivi la parola nello script, quindi rigenera la sorgente. |
| L'originale è chiaro ma la conversione distorce le consonanti o salta l'altezza | Testare la stessa sorgente con recupero ed effetti disattivati. Controllare l'encoder e l'estrazione del tono. Se lo stesso modello distorce diversi input puliti, ispezionare i dati di addestramento e prendere in considerazione la riqualificazione. |
| La voce convertita suona ancora come la sorgente | Controlla il modello e l'encoder selezionati. Confronta un'altra clip pulita prima di aumentare il recupero. |
| Non viene visualizzato alcun risultato convertito | Verifica che la **conversione RVC** sia abilitata e che la voce selezionata sia un modello di inferenza. Leggi il primo errore nel registro. |

Per altre impostazioni di conversione, vedere [Controlli di inferenza](inference-buttons.md). Per la diagnostica, vedere [Risoluzione dei problemi](../../reference/troubleshooting.md).
