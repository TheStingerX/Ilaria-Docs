---
label: "Uso e risoluzione dei problemi"
icon: ":microphone:"
order: 98
permalink: /ilaria-rvc/mangio/usage/
---

# Mangio RVC Fork · Uso e risoluzione dei problemi

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Versione consultata](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Software datato · Sconsigliato
Questi progetti sono datati e non risultano più mantenuti attivamente. rvc-cli è archiviato e i rami principali di RVC Studio e Mangio RVC Fork sono fermi da anni. Le guide restano disponibili per chi lavora su progetti esistenti. Per una nuova installazione, scegli un’app ancora mantenuta. [Guide per app](../app-guides.md)
!!!

## Prima conversione

Metti il checkpoint esportato per l’inferenza nella cartella `weights`, poi aggiorna l’elenco dei modelli nella WebUI. Selezionalo in Model Inference e indica il percorso di un breve audio con la sola voce. Parti da una trasposizione di 0. Se hai l’indice abbinato, prova un tasso di recupero basso dopo una prima conversione a 0. Usa sempre lo stesso audio e checkpoint per il confronto.

## Estrazione del pitch e modalità ibrida

Parti da RMVPE quando disponibile. Confronta `mangio-crepe` e `mangio-crepe-tiny` sullo stesso audio. Il controllo hop length si applica a queste due varianti Mangio CREPE in inferenza. Un valore minore aumenta la frequenza di analisi e può allungare i tempi. Nella CLI del tag la sintassi ibrida usa il segno più, ad esempio `hybrid[pm+crepe]`, e combina le stime con una mediana. Confrontala con un estrattore singolo. La documentazione del tag marca le opzioni CREPE o ibride nel training come sperimentali.

[Installazione](installation.md)
