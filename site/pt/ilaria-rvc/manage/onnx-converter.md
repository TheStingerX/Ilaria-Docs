# Conversor ONNX ↔ PTH

Em **Other → Convert model weights**, escolhe um modelo instalado ou fornece um ficheiro. Exporta um modelo RVC HiFi-GAN com orientação de tom para ONNX para o usar num cliente externo compatível. O restauro exato para `.pth` está disponível para ONNX exportados pelo Ilaria RVC. Guarda o `.pth` original se usares outro exportador. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## Exportar um modelo para ONNX

Escolhe um modelo de inferência instalado ou indica o ficheiro `.pth` exportado. Seleciona a conversão para ONNX e guarda o resultado. Carrega-o no cliente externo e testa-o com uma gravação curta.

## Restaurar o PTH original

Indica o ficheiro `.onnx` exportado pelo Ilaria RVC. Seleciona a conversão para `.pth`, guarda o modelo restaurado e testa-o em **Inference**.

[Safetensors ↔ PTH](safetensors-converter.md)
