# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.0 è uno studio web indipendente per configurare flussi di lavoro basati su Applio. Il repository contiene l’interfaccia e il generatore di notebook. L’installazione locale avvia lo studio nel browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/CHANGELOG.md)

## Kaggle

Esporta il file `.ipynb` generato e importalo in un nuovo notebook privato su Kaggle. Prima di eseguire le celle, leggi cosa fanno e quale versione di Applio installano. Attiva l’acceleratore GPU e abilita internet se servono download di modelli o dipendenze. Esegui prima la configurazione e poi le celle del flusso nell’ordine previsto. Prima del training verifica che il runtime veda la GPU e la cartella del dataset.

Se il notebook apre un tunnel, tieni privati indirizzo e token e chiudilo quando hai finito. Usa la funzione per i segreti di Kaggle quando il notebook la supporta. Prima che termini la sessione, salva il modello e gli eventuali checkpoint per riprendere il lavoro, poi scaricane una copia. Se una cella fallisce, leggi il primo errore, controlla percorsi e quote e ripeti quel passaggio. Il generatore è documentato per Kaggle.

[Kaggle](https://www.kaggle.com/code)

[Installazione](installation.md) · [Uso](usage.md)
