# RVC Studio · Utilisation et dépannage

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Version consultée](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Importer la voix

Importez un ZIP contenant un générateur RVC ONNX compatible ou un `.pth` d’inférence, avec l’`.index` FAISS associé s’il existe. L’application préfère ONNX si les deux sont présents. Le convertisseur exporte le `.pth` en ONNX et prépare les données de l’index. Les fichiers sont `Models/<voice>/model.onnx` et éventuellement `features.rvci`. Un ONNX générique ou un checkpoint d’entraînement ne convient pas.

## Microphone et latence

Sélectionnez la voix, le micro physique et le casque, puis lancez **Start voice conversion**. Commencez à zéro demi-ton et testez le retrieval séparément. PortAudio utilise un flux duplex mono à 48 kHz. ContentVec reçoit du 16 kHz, RMVPE estime F0 au besoin et le résultat revient à 48 kHz. En cas de coupures, vérifiez les niveaux, le temps d’inférence et les underruns. Vérifiez CUDA avant d’évaluer le GPU. Testez le casque avant le câble virtuel.

[Installation](installation.md)
