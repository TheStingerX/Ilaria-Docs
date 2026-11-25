# GPT-SoVITS

## 1. Choose a workflow

GPT-SoVITS turns written text into speech using a voice reference. Start with **zero-shot inference**: provide a reference recording, its transcript and the words to synthesize. Once this works, try **fine-tuning** if you need a more consistent voice across scripts. Fine-tuning uses many labelled clips and produces GPT and SoVITS weights. Use recordings and voices you have permission to use.

The GPT component predicts a speech representation from text. SoVITS produces the waveform. Both components must suit the chosen model family. The WebUI may offer several families such as v2, v3, v4, v2Pro and newer builds. Use the base files intended for the family you selected.

## 2. Install and launch the WebUI

### Windows integrated package

1. Open the [official repository](https://github.com/bilibili/GPT-SoVITS) and find the integrated Windows package linked in **Installation**. Match the package to your system and the model family you plan to use.
2. Extract the entire archive to a writable folder such as `C:\AI\GPT-SoVITS`. Start from the extracted folder. Keep the bundled runtime and model directories together.
3. Start `go-webui.bat` if supplied. Some packages provide a version-specific launcher. Follow the README for your package and use the script actually present in the extracted folder.
4. Wait for a local address in the terminal and open it in the browser. Keep the terminal running with the WebUI. If the page fails to open, check whether the process is still running and whether the address matches this launch.

### Installation from source

Use an isolated environment. The upstream installer instructions use Conda with Python 3.10. On Windows the PowerShell installer documents CUDA or CPU choices. The Linux installer also documents ROCm, while macOS has separate MPS and CPU paths. Choose a backend supported by your OS, driver and build. CPU inference can take longer, so test a short line before committing to a long job.

In a source checkout, once the dependencies and base assets have been installed, launch with `python webui.py` from the project root. Check the upstream release instructions for FFmpeg and model assets. Manual installations place the base weights under `GPT_SoVITS/pretrained_models`, preserving family subdirectories. Add ASR, separation or Chinese text processing assets only when required for the workflow and release you use.

#### Example source setup on Linux with CUDA 12.8

Run the following in the directory of the chosen source release. This example is for a compatible NVIDIA driver and the upstream installer that offers `CU128`. For AMD or CPU, choose the backend documented for your build instead.

~~~bash
conda create -n GPTSoVits python=3.10
conda activate GPTSoVits
bash install.sh --device CU128 --source HF
python webui.py
~~~

## 3. Generate your first sentence

1. Open **1C-inference** in the main WebUI and launch the TTS inference interface. If you already trained custom weights, refresh the model list before opening the inference interface.
2. Start with the base GPT and SoVITS weights for the same family. For a first test, avoid mixing weights from different releases or voices.
3. Select a clean recording with one speaker, a complete phrase and no background music. The older interface described by AI Hub expects **3–10 seconds**. Use the duration shown by your installed interface if it differs.
4. Enter the exact words spoken in the reference and choose their language. The reference transcript and the text you want to synthesize are separate fields.
5. Enter a short target sentence, choose its language, and keep the remaining settings at their defaults. Check that the selected model supports that language. The upstream README lists Chinese, Cantonese, English, Japanese and Korean in its general feature overview.
6. Start inference, listen and save the audio. Check the first and last words, pauses and pronunciation. If it sounds wrong, verify the transcript and language before adjusting advanced controls.

### Keep long text from skipping or repeating

Divide the script at natural sentence or paragraph boundaries. Test one paragraph before generating the whole script. Keep the same reference, checkpoint pair and settings across sections. If the delivery is too flat or rushed, try a reference with the delivery you want and compare the same target sentence. When available, change controls such as speed or sampling one at a time.

## 4. Prepare a dataset for fine-tuning

### Select and slice the recordings

1. Start with clean speech from one speaker. Remove long silences, clipped sections, music, overlapping speakers and unusable takes. Keep a few separate sentences for testing.
2. Create separate folders for originals, sliced clips and transcripts. Keep the originals so you can repeat the preparation.
3. In the audio slicing tool, choose the source path and a different output directory. Slice a small sample first. Listen for words cut off at the beginning or end before processing the whole set.
4. Keep phrases that can be transcribed accurately. Consistent recordings are a better starting point than a larger collection with background noise or mixed speakers.

### Transcribe and proofread

1. Open batch ASR and select the sliced audio folder as input. Choose a recognizer for the spoken language. Upstream documents Faster-Whisper for English or Japanese and a separate Chinese ASR path.
2. Run recognition and locate the generated `.list` file in the configured output directory. Check that each row points to an accessible clip.
3. Open the labelling interface with that `.list`. Play clips and correct the words, language and punctuation. Save the edits and reopen a sample to verify they persisted.
4. If you create the list manually, use one line per clip with four fields separated by pipes. Use paths that exist on the machine running the WebUI.

~~~text
audio/clip01.wav|speaker01|en|This is the first recording.
~~~

## 5. Format the dataset and train

### Format the dataset

In **1A-Dataset formatting**, give the experiment a unique name and enter the corrected `.list` path. Supply the sliced audio directory if the interface requests it. Select the model family before formatting. Run the formatting stages, or the one-click action if available. Check the log for failed clips and make sure the experiment directory contains output before starting training.

### Train SoVITS, then GPT

1. Open **1B-Fine-tuned training** and confirm the experiment name, model family and base weights. Start SoVITS with the defaults for your build as a baseline.
2. On one GPU, run the stages sequentially. Check that SoVITS saved a checkpoint before starting GPT. Use the same formatted experiment for both.
3. Start GPT training and save intermediate checkpoints where the UI allows. The batch size governs how many examples are processed together and affects memory. The number of epochs governs how many passes the trainer makes through the data. If you run out of memory, try a smaller batch before changing several settings.
4. Leave optional DPO disabled for the first run. Compare checkpoints on held-out sentences using the same reference and text. Listen for missing words, repeats, speaker consistency and natural pauses. Choose the pair that sounds best on those tests.

### Load and back up the finished voice

Refresh model paths in inference and select your GPT checkpoint (usually `.ckpt`) and its corresponding SoVITS weights (usually `.pth`). Save both, along with the release name, experiment settings, corrected `.list` and a short reference you can reuse. If you move training folders to another machine, update paths in the annotation list before formatting again.

## 6. Troubleshooting

| Symptom | First check | What to do |
| --- | --- | --- |
| Browser cannot connect | Backend process and console URL | Restart the supplied launcher and open the address printed by the current run. |
| FFmpeg or base assets missing | First terminal error and chosen model family | Install the dependency documented for this release and keep the original folder structure. |
| ASR output is empty | Slicer output and ASR language | Try one playable clip, then check that the batch path points to the sliced files. |
| Formatting skips files | Paths and four fields in the `.list` | Correct missing paths and malformed annotations, then rerun formatting. |
| Fine-tuned weights are absent | Checkpoint files and model dropdowns | Verify training saved both outputs, then refresh model paths. |
| Words are missing or repeated | Reference transcript and target segmentation | Use a short target sentence, verify both languages and split long text. |
| Training runs out of VRAM | Which stage failed and its batch size | Close competing GPU workloads, lower the batch and run the stages sequentially. |

[GPT-SoVITS repository and releases](https://github.com/bilibili/GPT-SoVITS)
