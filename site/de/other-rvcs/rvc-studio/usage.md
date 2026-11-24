# RVC Studio · Nutzung und Fehlerbehebung

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Geprüfte Version](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Stimme importieren

Importiere eine ZIP mit passendem RVC-ONNX-Generator oder exportiertem Inferenz-`.pth` und optional passendem FAISS-`.index`. Die App bevorzugt ONNX, wenn beides vorhanden ist. Der Konverter exportiert `.pth` als ONNX und bereitet vorhandene Indexmerkmale auf. Ergebnis sind `Models/<voice>/model.onnx` und optional `features.rvci`. Ein beliebiger ONNX-Graph oder Trainingscheckpoint eignet sich nicht.

## Mikrofon und Latenz

Wähle Stimme, physisches Mikrofon und Kopfhörer und starte **Start voice conversion**. Beginne ohne Tonhöhenverschiebung und teste den Index separat. PortAudio arbeitet mono und vollduplex mit 48 kHz. ContentVec nutzt 16 kHz, RMVPE liefert bei Bedarf F0 und das Ergebnis wird auf 48 kHz resampelt. Prüfe bei Aussetzern Pegel, Inferenzzeit und Underruns sowie den CUDA-Status. Teste Kopfhörer vor dem virtuellen Kabel.

[Installation](installation.md)
