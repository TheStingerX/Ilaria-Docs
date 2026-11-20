---
label: "Install Applio"
icon: ":cd:"
order: 97
permalink: /ilaria-rvc/applio/installation/
---
# Install Applio and check the engine

[GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) · [Official Docs](https://docs.applio.org/)

Applio has **two download options** that run the **exact same engine** — only the **UI and installation method** differ:
1. **Desktop App** ([Official Desktop Guide](https://docs.applio.org/getting-started/desktop/)): opens a native installed application window and manages its Python engine environment on first launch.
2. **Gradio Web Interface** ([Official Gradio Guide](https://docs.applio.org/getting-started/installation/#python-application-with-gradio)): runs the Python application and opens a local web UI in your browser (available as a compiled Windows ZIP or Python source install).

## 1. Desktop App

See also: [Applio Desktop documentation](https://docs.applio.org/getting-started/desktop/)

1. Open the [official Desktop downloads](https://github.com/IAHispano/Applio-App/releases/latest). Find **Assets** and expand the list if the installer you need is hidden. Choose the asset for your operating system. The source-code archives are for developers.
2. On Windows, run the setup executable and choose a folder your account can write to. The packaged app uses a `data` directory beside its executable. On macOS, use the disk image for your processor, ARM64 for Apple Silicon or x64 for Intel. On Linux, install the available Debian package or make the AppImage executable and open it.
3. Start the app and review the first-run terms. Keep the app open while it sets up Python, installs the engine requirements, fetches assets and verifies the installation. Use **Install / Repair** if your build offers it when a check fails.
4. When verification completes, check the compute device detected in setup. Record the backend and hardware the app reports. A machine with more than one GPU can report a different device from the one you expected.
5. Open **Models**. If it opens and the engine is ready, continue to [install a voice](models.md). Run the [short conversion](inference.md) before trying live mode or training.

You can install an official Desktop package without Node.js or pnpm. Those tools are for building the app from source.

## 2. Gradio Web Interface

See also: [Official Python / Gradio installation guide](https://docs.applio.org/getting-started/installation/#python-application-with-gradio)

1. **Windows compiled package**: download a Windows ZIP from the [compiled Gradio downloads](https://huggingface.co/IAHispano/Applio/tree/main/Compiled/Windows), or follow the [Python application with Gradio](https://docs.applio.org/getting-started/installation/#python-application-with-gradio) steps for source/cross-platform installs.
2. Extract the complete ZIP to a simple path you own, for example `C:\Applio-Gradio`. Open that folder in Explorer. If you see a second folder containing the launcher, open it.
3. Run `run-applio.bat` (or `python app.py` on a manual Python install; `python app.py --help` lists server options). Leave the console running, wait for it to print a local address, and open that exact address in your browser.
4. Find **Models** or **Download**, depending on the release. Then open **Convert Audio** or **Inference**. If the browser loses its connection, check whether the launcher is still running before reopening the page.

## If setup stops

| What you see | First thing to check |
| --- | --- |
| Nothing opens from the ZIP | Extract every file before running the launcher. |
| Download or verification step fails | Read the earliest error in the setup log. Check connectivity, available disk space and write access before retrying the failed step. |
| Gradio stops before displaying an address | Read the console above the last line for the first relevant error. The browser cannot connect until the service starts. |
| Audio files fail to open or export | Check engine verification and FFmpeg status. Test with a local WAV you can play in another application. |
| File conversion starts but runs out of memory | Close competing jobs and test a few seconds of audio with effects off. Try a device supported by your build. |

Before installing a new version or moving folders, save your working audio and back up custom models, indexes, datasets and full training experiments. After updating, use the same short recording and voice to confirm that the new engine produces a usable result.
