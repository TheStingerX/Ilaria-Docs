# NoRegretsRVC · Uso

NoRegretsRVC Beta 0.0 è uno studio web indipendente per configurare flussi di lavoro basati su Applio. Il repository contiene l’interfaccia e il generatore di notebook. L’installazione locale avvia lo studio nel browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/CHANGELOG.md)

## Uso

In **Training**, crea o seleziona un progetto e imposta frequenza di campionamento, vocoder, estrattore di pitch ed embedder. Se usi un pretrain, scegli impostazioni compatibili con la coppia di pesi. Parti da un batch contenuto, poi regola epoche e precisione per il runtime di destinazione. La stima VRAM è indicativa. Prima di esportare controlla le impostazioni del notebook, del tunnel e dei backup. I progetti salvati nel browser dipendono dal profilo e dall’indirizzo con cui apri lo studio.

**Samples** prepara le impostazioni di conversione. **Models** e gli strumenti di lavoro configurano download, fusione delle voci o TTS. **TensorBoard** mostra dati di training elaborati dall’interfaccia. Per eseguire davvero una conversione o un addestramento, usa un runtime Applio compatibile e controlla lì i file prodotti.

[Installazione](installation.md) · [Cloud](cloud.md)
