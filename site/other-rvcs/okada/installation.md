# Install w-okada VCClient

[GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000)

VCClient converts live microphone audio. The interface is the **client** and the conversion process is the **server**. For your first test, run both on the same computer. The client version (v1 or v2) and the model version (RVC V1 or V2) identify different things. Check the package's model support before choosing a file.

## Before downloading

1. Check your operating system and processor architecture. On Windows, open **Task Manager → Performance** and read the GPU model. On Mac, open **About This Mac** and look for an Apple chip or Intel processor.
2. Plug in your microphone and headphones. Make a short recording in the operating system to check the microphone independently of VCClient.
3. Keep one known-working RVC inference model available. A `.pth` is a PyTorch model, while an `.onnx` uses an ONNX runtime. Use the optional matching `.index` only with the model it belongs to. See [Models and files](../../start/models.md) if you received a ZIP or a set of training checkpoints.

## Pick one package

Open [VCClient downloads on Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Choose a file from the w-okada releases that matches this table. The version number stands in for the variable part of the filename.

| Your computer | Package to look for | What to verify |
| --- | --- | --- |
| Windows with supported NVIDIA GPU | v2 Windows CUDA, `vcclient_win_cuda_….zip` | Select the actual NVIDIA card in the app. Use a CPU or standard build if the installed runtime cannot use your GPU. |
| Windows with AMD or a CPU-only setup | v2 Windows standard, `vcclient_win_std_….zip` | Test the DirectML device if supported. CPU conversion is an option, with speed determined by the model and processor. Verify available providers before importing a model. |
| Windows with Intel graphics | A compatible standard or legacy release | In the documented v1 Windows setup, AMD and Intel GPU acceleration is for ONNX models. Select CPU if your standard package does not detect a usable GPU provider for your model. |
| Apple Silicon Mac | v2 Mac, `vcclient_mac_….zip` | Check that the asset targets Apple Silicon. Test with the provider and RVC model formats listed by that release. |
| Linux | Source distribution and supported runtime | Dedicated source or container setup is separate from the Windows and Mac binaries. Match CUDA, supported AMD runtime, or CPU to your hardware. |

For Windows v2, the project lists both Torch and ONNX support. A given file can still use a different provider from another file on the same build. Preserve the original model when trying a different format. Renaming the filename extension does not convert it.

## Start on Windows

1. Extract the entire ZIP to an ordinary writable folder. Use a separate folder for each build you test. Running a launcher from inside the archive can prevent it finding its runtime.
2. Open the extracted folder and run `start_http.bat` for a same-computer setup. Keep its console open. If the package offers multiple launchers, choose the one for the downloaded runtime and local connection.
3. Wait for startup and any first-run asset downloads. Open the local address shown in the console if the interface does not open by itself.
4. Check that you see model slots and the controls for starting conversion. Leave the web page and console open for the [first microphone test](live-audio.md).

## Start on Mac

1. Expand the Apple Silicon archive and keep its bundled files together.
2. Open the bundle's local launcher (`startHttp.command` where supplied). Let setup finish and open the address reported by the console if needed.
3. When the system asks whether the browser or app may use the microphone, grant access for the test. If the permission was previously denied, change it in **System Settings → Privacy & Security → Microphone** and reopen the app.
4. Confirm that the server is running before opening a second copy. Closing the server stops conversion even when the browser is still open.

## If it fails before opening

| What you see | What to check |
| --- | --- |
| The launcher closes immediately | Run it from its fully extracted folder and read the first console error. Recheck architecture and runtime compatibility. |
| First-run download remains incomplete | Keep the process open and check its progress and network error. Retry with the same official package after connectivity returns. |
| The local page gives a connection error | Check that the server is still running and use the address it printed. The browser page cannot start a stopped local server. |
| NVIDIA hardware is installed, but CPU is active | Check the backend filename, installed driver and GPU selected in VCClient. Test the CPU path separately to distinguish a model problem from a GPU problem. |
| The model panel opens but the microphone list is empty | Check the OS input meter and browser site permission. For client mode, reload after granting permission. For server mode, refresh the server's own device list. |

Continue to [Live audio, routing and troubleshooting](live-audio.md).
