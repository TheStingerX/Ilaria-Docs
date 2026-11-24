# Extend speech bandwidth with AP-BWE

## Select a bandwidth profile

Choose **AP-BWE** and match the first number in the profile to the usable bandwidth of the speech. An 8 kHz signal carries frequencies up to about 4 kHz. A call saved as a 48 kHz WAV can still have that narrow bandwidth. If unsure, inspect a spectrogram or compare neighboring profiles on the same short passage. The app resamples to the profile’s input rate before inference, so a profile with too low an input rate can discard useful detail.

| Input (kHz) | Output (kHz) |
| ---: | ---: |
| 2 | 16 |
| 4 | 16 |
| 8 | 16 |
| 8 | 48 |
| 12 | 48 |
| 16 | 48 |
| 24 | 48 |

## Run a comparison

Download the checkpoint for the selected profile, add audio, choose an export format and run **Enhance audio**. AP-BWE predicts the amplitude and phase spectra in parallel and reconstructs the waveform at the target rate. The app runs the model per channel. If a result emphasizes hiss or sounds metallic, try a profile closer to the source bandwidth and compare with the original.

[Overview](overview.md) · [Installation and models](installation.md) · [Restore speech with Sidon](sidon.md) · [Preview, export and troubleshooting](export.md)

## Sources

[AP-BWE](https://github.com/yxlu-0102/AP-BWE) · [AP-BWE audio demos](https://yxlu-0102.github.io/AP-BWE/) · [studio_engine.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_engine.py) · [AP-BWE weight license](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/LICENSE-AP-BWE-WEIGHTS.txt)
