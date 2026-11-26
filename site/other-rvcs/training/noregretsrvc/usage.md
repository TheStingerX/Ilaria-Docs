# NoRegretsRVC · Usage

NoRegretsRVC Beta 0.0 is an independent web studio for configuring Applio workflows. This checkout provides the interface and notebook generator. The local setup runs the studio in your browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Usage

Choose or create a project in **Training** and enter the intended sample rate, vocoder, pitch extractor and embedder. Match these to any pretrained pair. Start with a conservative batch, then adjust epochs and precision for the target runtime. The VRAM estimate is advisory and does not measure memory on the remote GPU. Review notebook, tunnel and backup settings before exporting. Project settings saved in browser storage are tied to that browser and address.

**Samples** prepares conversion settings. **Models** and workbench views prepare options for downloading models, voice blending or TTS. **TensorBoard** displays parsed training information. Run the actual conversion or training in a compatible Applio runtime and verify the output there.

## Guided training

In **Model Settings**, name the experiment and select sample rate (32, 40 or 48 kHz), vocoder and GPU allocation. In **Prepare Dataset**, select the audio directory and preprocess. In **Extract Features**, choose pitch extraction and an embedder compatible with the pretrain. In **Train Model**, check batch size, total epochs, save interval and index algorithm. Kaggle adds **Export Model** to download the inference `.pth` and its optional `.index`. Resume only from checkpoints that match your experiment configuration.

## Samples and audio cleanup

Queue WAV, MP3, FLAC, OGG or M4A clips. A clip can follow the shared Step 3 settings or use its own override. Try pitch at zero first. The control spans −32 to +32 semitones and provides −12, −5, 0, +5 and +12 shortcuts. For a quick test, load one of the six dry 32 kHz speaking samples with transcripts. Browser cleanup can apply a 65–95 Hz high-pass and 1–30 dB soft-knee noise expansion, then export a PCM-16 WAV. Listen to the source and cleaned file before converting. The CLI preview shows the `core.py` command used for comparison.

## Models, Voice Blender and TTS

The Models workspace can queue custom pretrains through the Boot Manifest. It recognizes Hugging Face and Pixeldrain URLs and can unpack supported ZIPs or infer a matching discriminator URL. Verify the pair before enabling **Custom Pretrains**. Legacy Core 1.5 V2 is offered at 32 kHz. Default Applio pretrains remain selected until you enable the custom option. Voice Blender walks through source models, blend settings and export. TTS uses online Microsoft Edge voices before applying the selected RVC model, with pitch, speed, index ratio and consonant protection controls.

## Diagnostics and settings

Diagnostics can read live Kaggle metrics or imported `.ipynb`, `.log` and `.txt` files. It charts Mel loss and analyzes KL divergence, feature matching, discriminator balance, gradient stability and changes near the end of training. Risk meters and suggested checkpoints are heuristics. Listen to the same test audio across checkpoints before choosing one. Settings also provide FP32 by default, RMVPE high-register modes `true_pitch` and `fold` with a 1000–2000 Hz F0 ceiling, and ten UI languages including Arabic with right-to-left layout.

[Installation](installation.md) · [Cloud](cloud.md)
