# Conversor ONNX ↔ PTH

En **Other → Convert model weights**, selecciona un modelo instalado o proporciona un archivo. Exporta un modelo RVC HiFi-GAN con guía de tono a ONNX para un cliente externo compatible. La restauración exacta a `.pth` está disponible para los ONNX exportados por Ilaria RVC. Conserva el `.pth` original si usas otro exportador. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## Exportar un modelo a ONNX

Elige un modelo de inferencia instalado o proporciona el `.pth` exportado. Selecciona la conversión a ONNX y guarda el resultado. Cárgalo en el cliente externo y pruébalo con una grabación corta.

## Restaurar el PTH original

Proporciona el `.onnx` exportado por Ilaria RVC. Selecciona la conversión a `.pth`, guarda el modelo restaurado y pruébalo en **Inference**.

[Safetensors ↔ PTH](safetensors-converter.md)
