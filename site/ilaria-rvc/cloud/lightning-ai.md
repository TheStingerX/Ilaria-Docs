# Lightning AI Studio

[Open the notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Run Ilaria RVC in a browser with a GPU supplied by the cloud platform. Choose a notebook below. Enable an NVIDIA accelerator before running the first cell.

## Before you start

Prepare one short clean WAV and a compatible inference model. For training, keep the original dataset and a few separate test clips on your own computer. The notebook runs on a remote Linux machine.

### Credits, free tier, and GPU availability

Lightning AI uses a **credits-based billing model** (`1 credit = $1 USD`, billed per second of GPU compute; see [Lightning AI Pricing](https://lightning.ai/pricing)):

- **Free tier:** Includes **one free 4-CPU Studio** (up to 4 continuous hours before restart) and **10 GB of free storage** (storage above 10 GB is billed monthly).
- **Starter credits vs. paid plans:** New accounts typically receive initial starter credits after sign-up/verification (not renewing monthly free GPU hours). Paid **Pro** subscriptions provide a monthly credit allotment.
- **Check your balance and GPUs:** Open your Studio dashboard / billing panel to check your remaining credit balance before starting a GPU instance, and remember that specific GPU types (such as T4, L4, or L40) are subject to regional/account availability. Do dependency setup on the free CPU Studio first, then switch to GPU only when ready to run inference or training.

## Run on Lightning AI Studio

1. Create a GPU Studio, upload the notebook and open it in JupyterLab.
2. Run cells 1–4 in order. They check the GPU, install dependencies, download base weights and start the Web UI. Set `TRAINING_SAMPLE_RATES` to `[]` for inference only or select the sample rates you plan to train at.
3. Open **Port viewer** in your Studio and select the port printed by the launch cell (7865 by default). Keep the port private.

## Check each cell before continuing

The GPU check should identify an NVIDIA device. If it does not, change the accelerator first. Wait for dependency installation to finish before downloading weights. Set `TRAINING_SAMPLE_RATES = []` for inference only. For training, choose the rate that matches your model and pretrained pair. Leave `DOWNLOAD_FCPE` enabled if you plan to use FCPE.

## 4. Convert one recording

1. In the Ilaria RVC browser tab, open **Other → Import local models**. Upload the inference model file (`.pth`) and, optionally, its matching index file (`.index`). You can also upload a supported ZIP containing those files. Wait for the import to finish. Or open **Other → Download models from Hugging Face, Google Drive or MEGA**, paste a publicly downloadable link to a supported ZIP, `.pth`, or `.index`, and click **Download and install model**. If the model and its optional index are hosted separately, download them one at a time using the same panel.
2. Open **Inference**, refresh the voice list if needed, select the intended voice, and go to **Single Inference**.
3. Upload the short WAV. Start at **Pitch 0** and **Index Ratio 0**. Leave the optional effects off and use the embedder expected by the model.
4. Click the conversion control once and wait for the output. Play the result, then download it from the player if available. Keep your input WAV so you can compare the same phrase later.
5. If you want to test retrieval, select the matching index and try a small increase from zero. If the output fails or the voice becomes harder to understand, return to the baseline and verify the model–index pairing.

If the voice never appears, first check the import log. A training checkpoint saved as a G or D file belongs to an experiment and needs an inference export before it can be selected here.

## Prepare your dataset and plan a training run

### Clean the audio with MVSEP only where needed

Keep an untouched copy of your recordings. If they already contain a single clean, dry voice, skip separation. Use material you have permission to upload to [MVSEP](https://mvsep.com/en/home) and to train on. For confidential recordings, clean them locally.

1. **Isolate the voice.** Upload a short example and choose a vocal separation option. Download the vocal stem in WAV when available. Replay it against the original and listen through headphones for music, other voices, clipped syllables, and watery or metallic artifacts.
2. **Remove backing vocals only if present.** For songs with harmonies or a chorus underneath the target, use a lead-versus-backing separation option on the vocal stem. Keep the lead output. If the singers still overlap or the lead has holes, use a clean section or a different take.
3. **Reduce reverb only where audible.** If the voice has a wide stereo reverb tail, first test a stereo de-reverb option on a copy. For remaining room reflections, compare a room de-reverb pass. You can skip either stage. Listen for truncated consonants and breaths at each pass.
4. **Remove echo only if it repeats the voice.** An audible delayed repeat calls for a separate short test. Keep the original or replace that take if removal strips out words. Avoid stacking passes on otherwise clean audio.
5. **Prepare the final clips.** Trim unusable noise and long empty sections in an editor such as Audacity, while keeping useful breaths and natural phrasing. Export clean WAVs. Put the approved files together in a ZIP and keep a few clean clips outside it for evaluation.

Test the full cleanup chain on a few seconds before treating the entire dataset. A model can learn artifacts that are left in its training audio. Check several clips from different sessions before uploading.

### Clean a dataset locally with Ultimate Vocal Remover (UVR)

UVR separates an audio file into tracks called stems. Use it when the target voice is mixed with music, sound effects or other vocals. If you already have a clean voice recording, keep the original. UVR processes audio on your computer after the required models are downloaded. Cloud runs the later RVC training job separately.

#### Install UVR and prepare a test clip

1. Download the installer or package for your operating system from [UVR releases](https://github.com/Anjok07/ultimatevocalremovergui/releases). Launch the desktop app after installing it.
2. Make a 15–30 second copy of an example that contains a clear line and a section where the music overlaps it. Keep the original safe.
3. Click **Select Input** and choose that test clip. Use **Select Output** to choose a new writable folder, such as `uvr-test`. Choose **WAV** for the output format.
4. Select a **Process Method** and a model that separates **vocals** from **instrumental**, for example a vocals model under **MDX-Net**. If the list is empty, open the settings **Download Center**, select the corresponding model family and download a suitable model. Return to the main window and select it.
5. Enable **GPU Conversion** only if your installed build recognizes a supported device. If that option causes an error, turn it off and test on the CPU. CPU processing can be slower, so start with a short clip.

#### Separate the vocals and listen

Click **Start Processing**. When it finishes, find the vocals stem in the output folder. Some models also write an instrumental stem. Play the original and the vocals stem at similar volume. Check consonants, breaths, held notes, and sections where the accompaniment is loud. If you still hear instruments or the voice sounds watery or metallic, compare another model on the same test clip before processing the full dataset.

If you've selected the wrong stem, check the filenames or listen to each output. Keep the one that contains your target lead voice.

#### Clean the remaining problems one at a time

| What remains | What to try in UVR |
| --- | --- |
| Backing vocals or harmonies | Feed the isolated vocal stem into a model intended for lead and backing separation, if your installation offers one. Keep the lead output and verify that the target vocal is complete. |
| Reverb tails between phrases | Try a model intended for de-reverb if available. Compare before and after on the same passage. Keep the original stem if de-reverb damages consonants or held notes. |
| Audible delayed repeats | Test an echo-removal model if available. If it removes words or distorts breaths, use another take or exclude the affected section. |
| Room hum, clipped peaks or other voices | Check the original. If treatment keeps damaging the voice, replace or exclude the clip. Separation cannot reconstruct peaks lost to clipping. |

Process the full set only after a short comparison sounds right. Use Audacity or another editor to trim unusable material. Keep natural pauses and breaths, export the approved clips as WAV, and pack only those clips into the dataset ZIP. Keep the instrumental and rejected stems out of the ZIP. Next, upload it in **Training** on Ilaria RVC and confirm **Path to Dataset** points to the imported recordings.

## 5. Train a voice and save your work

1. In **Training**, choose a new **Model Name**. Import your audio or ZIP through the dataset upload controls. Wait for import completion and confirm **Path to Dataset** points to the imported recordings.
2. Run the **Dataset Checker** and listen to any suspect recordings. Confirm your RVC V2 architecture, sample rate, embedder and pitch settings match your selected G/D pretrains if you use them. Start with a batch size that fits the allocated GPU.
3. Run **Process Data**, then **Feature Extraction**. Read the status of each before continuing. If you change the dataset or encoder, prepare fresh files for that experiment before training.
4. Run **Train Pth** with a modest first target and save periodic checkpoints. Keep a short test clip out of the training data. Compare exported checkpoints on that same clip before starting a longer run.
5. Build the feature index if you need retrieval, then try the inference export at **Index Ratio 0** first. For a detailed explanation of each setting, see [Training controls and workflow](../train/training-controls.md).
6. If you want to stop mid-run, use **Stop and save** inside Ilaria RVC and wait until the log confirms the save. Download the results while the Cloud session is still active.

## Export and stop

Set `EXPORT = True` and run the export cell. Enable `INCLUDE_CHECKPOINTS` if you need to resume training. Save the ZIP locally before stopping the session, then run the stop cell with `STOP = True`.

## If startup fails

If the first cell cannot see the GPU, check your accelerator and rerun it. If the interface does not open, read the launch cell output, confirm the server is ready and reopen the view.

### Check the output ZIP

For inference, verify your exported WAV and model files. For training, enable `INCLUDE_CHECKPOINTS` to include the experiment logs, then verify the archive before closing the session. Keep the original dataset separately.

## Recover from common problems

If installation fails, read the first error and rerun the failed cell after fixing it. If the app opens but your model is missing, check the import log and refresh the list. For out-of-memory errors, start with a shorter clip or lower the training batch size. If the Web UI closes, reopen it from the same launch cell or port while the session is still active.

[Ilaria RVC in the cloud](cloud.md)
