# Conversor ONNX ↔ PTH

En **Other → Convert model weights**, selecciona un modelo instalado o proporciona un archivo. Exporta un modelo RVC HiFi-GAN con guía de tono a ONNX para un cliente externo compatible. La restauración exacta a `.pth` está disponible para los ONNX exportados por Ilaria RVC. Conserva el `.pth` original si usas otro exportador. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

[ZIP de actualización para Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

## Qué contiene cada archivo

El `.pth` es el modelo de inferencia para Ilaria RVC. El `.onnx` contiene un grafo y pesos para un cliente compatible. Conserva el `.index` por separado si el cliente admite recuperación de características.

## Antes de exportar

Usa **Ilaria RVC 2.5.1 o posterior** y **PyTorch 2.6 o posterior**. Necesitas un modelo de inferencia **HiFi-GAN** con guía de tono y un `.pth` de hasta **512 MiB**. Exporta primero la voz si solo tienes checkpoints de entrenamiento. La exportación se realiza en CPU.

## Exportar un modelo a ONNX

Elige un modelo de inferencia instalado o proporciona el `.pth` exportado. Selecciona la conversión a ONNX y guarda el resultado. Cárgalo en el cliente externo y pruébalo con una grabación corta.

Selecciona **ONNX** como formato de salida. Con un `.pth`, **Auto** selecciona Safetensors. Ejecuta la conversión, espera a que termine y descarga el resultado.

## Cómo funciona la restauración exacta

El exportador guarda los bytes originales del `.pth` dentro del ONNX. Al restaurarlos, comprueba la configuración RVC y los pesos. Optimizar o volver a exportar el ONNX puede eliminar el checkpoint incorporado.

## Restaurar el PTH original

Proporciona el `.onnx` exportado por Ilaria RVC. Selecciona la conversión a `.pth`, guarda el modelo restaurado y pruébalo en **Inference**.

Con un ONNX, elige **Auto** o **PTH**. Ejecuta la conversión y descarga el archivo. Si conservas el original, compara los hashes SHA-256 para comprobar que coinciden.

## Comprobar el resultado

Prueba el ONNX en el cliente de destino con una grabación corta. Prueba el PTH restaurado en Ilaria RVC con el mismo audio y la configuración original.

## Solución de problemas

Si falla la exportación, revisa vocoder, guía de tono, tamaño y PyTorch. Si falta el checkpoint incorporado, recupera el ONNX original o el PTH de una copia. Si el cliente rechaza el ONNX, comprueba los formatos RVC que admite.

[Safetensors ↔ PTH](safetensors-converter.md)
