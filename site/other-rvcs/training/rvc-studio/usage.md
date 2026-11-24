# RVC Studio · Usage and troubleshooting

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Legacy software · Not recommended
The main branch of **RVC Studio** has been inactive for years. This outdated app is not recommended for new installations. [Guides by app](../../app-guides.md)
!!!

## First cover

Start the backend in **RVC Server**, then open **Inference** and click **Refresh Data** after adding files. Pick a short WAV, FLAC, OGG or MP3 from `songs/`. Put the RVC v2 inference checkpoint in `models/RVC/` and its matching index, if available, in `models/RVC/.index/`. Select the voice and a vocal extraction model. The extra preprocessing model is optional. Click **Save Options**, then **1-Click VC**. If the model does not appear, check the folder and refresh before restarting the app.

## Train a voice

Open **Train**, choose a dataset folder and an experiment name. Preprocess the recordings, extract features, then train the model. Check that the generator and discriminator pretrains match the experiment settings before starting. Build the retrieval index separately if you want to use it. If a later step is disabled, check that the previous stage completed and wrote its files under the same experiment. Listen to exported checkpoints on the same test clip before choosing one.

## TTS and live conversion

In **Text to Speech**, choose a synthesis engine and RVC voice. Generate and listen to a short sentence first, then run **Convert Speech** and save the converted result. The reviewed source also has a **Realtime Conversion** page. Choose the input and output devices on the host and try headphones first to avoid feedback. Verify operation on your own setup before depending on it for a live session.

[← Setup](installation.md)
