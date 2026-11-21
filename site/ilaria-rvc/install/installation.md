# Installation and updates

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Install the Windows package

Download the supported NVIDIA build from [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Extract the whole archive into a writable local folder and run `RUN_ILARIA_RVC.bat` there. The launcher and bundled runtime must stay together. If no browser tab opens, try `http://127.0.0.1:6969` on the same PC.

## Before the first launch

The full Windows ZIP is about 5.00 GB. Allow room for both the archive and the extracted files. Extract it to a new local folder where you can write files. Keep the launcher, runtime and assets together. ContentVec and RMVPE are included. Optional encoders are available under **Other → Download embedders**.

## Which CUDA runtime will Ilaria RVC use?

Open **Task Manager → Performance → GPU** and read the exact model name. Compare it with the [GPU compatibility table](gpu-compatibility.md). The CUDA version below refers to the PyTorch environment the app uses. The NVIDIA driver is a separate system component and must support that environment.

| GPUs present in the PC | Runtime | What to expect |
| --- | --- | --- |
| GeForce GTX 16 or RTX 20, 30, 40 or 50 | PyTorch 2.10.0 with CUDA 12.8 | The full ZIP includes this runtime. Extract it and run the launcher. On RTX 50, PyTorch is already included and ready to use with a compatible NVIDIA driver. |
| Only NVIDIA Maxwell, Pascal or Volta | PyTorch 2.10.0 with CUDA 12.6 | On first launch the launcher downloads and verifies the older runtime. It keeps it in `runtime-cu126` and reuses it on later launches. Leave the launcher open and allow internet access and disk space. |
| No suitable local NVIDIA GPU | Remote NVIDIA GPU | [Ilaria RVC in the cloud](../cloud/cloud.md) · [Kaggle](../cloud/kaggle.md) · [Google Colab](../cloud/colab.md) · [Lightning AI Studio](../cloud/lightning-ai.md) |

If you have more than one GPU, read the launcher log to see which runtime actually started. The CUDA 12.6 path described above applies when all NVIDIA GPUs in the PC are from the older families.

## Check that the app started correctly

1. Run `RUN_ILARIA_RVC.bat` from the extracted folder. Wait for the interface to open. If the legacy runtime is downloading, check `cu126-runtime-install.log` for progress.
2. If the window closes or the interface never opens, run `RUN_ILARIA_RVC_LOGS.bat` and inspect the first error. Check whether it mentions the GPU, driver, access to the download, or free disk space. A blank browser page can be a result of a launcher failure.
3. Once the interface opens, convert one short clean WAV with a known compatible inference model. Check the result before running a large batch or starting training. See [Single and batch inference](../convert/inference.md).

The compute and backpropagation tests and ContentVec loading were verified on an RTX 4070. Compatibility on other cards is expected from their architecture and runtime selection, and has not been guaranteed model by model.

## Upgrade to 2.4.7

Download the full ZIP (`ILARIA_RVC-2.4.7.zip`), extract it into a new folder, and run `RUN_ILARIA_RVC.bat`.

Keep the old installation as a backup. Copy voice models to the new models/ folder, datasets to app/datasets/ and complete training experiments to app/logs/. The 2.3.0 updater uses the old layout, so install from the full archive.

[Compatible GPUs](gpu-compatibility.md)

### Update from 2.4.2 - 2.4.6

If you already run **2.4.2** through **2.4.6**, open **Other → Update Ilaria RVC → Check for updates** and choose **Download and restart**. From **2.4.0** or **2.4.1**, update to **2.4.2** first or extract the full **2.4.7** ZIP.
