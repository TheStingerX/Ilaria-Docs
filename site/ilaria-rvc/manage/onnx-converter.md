# ONNX ↔ PTH Converter

In **Other → Convert model weights**, select an installed model or provide a file. Export a pitch-guided RVC HiFi-GAN model to ONNX for use in a compatible external client. Exact restoration to `.pth` is available for ONNX files exported by Ilaria RVC. Keep the original `.pth` for ONNX files from other exporters. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

[Windows update ZIP](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

## What each file does

A `.pth` is the inference checkpoint you use in Ilaria RVC. An `.onnx` contains a graph and weights for a compatible ONNX client. The conversion changes the format. The target client still needs to handle the model’s inputs, RVC version and feature encoder. Keep any matching `.index` separately and use it only if the client supports retrieval.

## Before you export

Use Ilaria RVC **2.5.1 or later** and **PyTorch 2.6 or later**. For export, use an inference-ready **HiFi-GAN** model with **Pitch Guidance** enabled and a `.pth` no larger than **512 MiB**. Raw training checkpoints are for resuming training. Export the voice from the training experiment first. Export runs on CPU. The external client determines which device runs the resulting model.

## Export a model to ONNX

Choose an installed inference model or provide the exported `.pth`. Select the conversion to ONNX, then save the result. Load it in your external client and test it with a short recording.

Set **Output format** to **ONNX** explicitly. For a `.pth` input, **Auto** selects Safetensors. Run **Convert weights**, wait for the conversion log to finish and save the downloadable result. Keep the original checkpoint and give the ONNX its own filename.

## How exact restoration works

Ilaria RVC embeds the original `.pth` bytes in its ONNX export. During restoration it extracts those bytes and checks that the recovered file contains the RVC configuration and weights. Re-exporting or optimizing the ONNX elsewhere can remove the embedded checkpoint. Keep an untouched export if you want to restore it later.

## Restore the original PTH

Provide the `.onnx` exported by Ilaria RVC and select the conversion to `.pth`. Save the restored model and test it in **Inference**.

Use **Auto** or select **PTH** explicitly for an ONNX input. Run **Convert weights**, download the result and import it as an inference voice. If you still have the original, compare their SHA-256 hashes. Identical hashes confirm that the files match byte for byte.

## Test the result

For ONNX, load the model into the target client and convert a short clean recording. For the restored PTH, use the same recording in Ilaria RVC with the original pitch and embedder settings. Test the index separately if you use one. Client settings and preprocessing can change how an ONNX conversion sounds.

## Troubleshooting

Check the vocoder, Pitch Guidance, input size and PyTorch version if export fails. If the log says the ONNX has no original checkpoint, use the untouched export made by this converter or recover the original PTH from your backup. If the ONNX exports but the client rejects it, check which RVC ONNX formats the client accepts.

[Safetensors ↔ PTH](safetensors-converter.md)
