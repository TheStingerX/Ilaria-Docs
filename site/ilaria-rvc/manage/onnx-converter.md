# ONNX ↔ PTH Converter

In **Other → Convert model weights**, select an installed model or provide a file. Export a pitch-guided RVC HiFi-GAN model to ONNX for use in a compatible external client. Exact restoration to `.pth` is available for ONNX files exported by Ilaria RVC. Keep the original `.pth` for ONNX files from other exporters. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## Export a model to ONNX

Choose an installed inference model or provide the exported `.pth`. Select the conversion to ONNX, then save the result. Load it in your external client and test it with a short recording.

## Restore the original PTH

Provide the `.onnx` exported by Ilaria RVC and select the conversion to `.pth`. Save the restored model and test it in **Inference**.

[Safetensors ↔ PTH](safetensors-converter.md)
