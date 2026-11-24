# RVC Studio · Uso e risoluzione dei problemi

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Versione consultata](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Importare la voce

Importa uno ZIP che contenga un generatore RVC ONNX compatibile o un `.pth` esportato per inferenza, più il relativo `.index` FAISS se disponibile. Se sono presenti entrambi i formati, l’app preferisce ONNX. Il convertitore incluso esporta i `.pth` in ONNX e prepara le feature di retrieval quando trova l’indice. Il risultato va in `Models/<voice>/model.onnx` con l’eventuale `features.rvci`. Un ONNX generico o un checkpoint di training non è un generatore utilizzabile.

## Microfono e latenza

Seleziona voce, microfono fisico e cuffie, poi premi **Start voice conversion**. Parti con pitch a zero e prova il retrieval separatamente. PortAudio apre uno stream duplex mono a 48 kHz. ContentVec usa audio a 16 kHz, RMVPE calcola F0 quando serve e l’uscita viene ricampionata a 48 kHz. Se senti interruzioni, controlla livelli, tempo d’inferenza e underrun. Verifica che CUDA si sia inizializzata. Per Discord o OBS usa un cavo virtuale dopo la prova in cuffia.

[Installazione](installation.md)
