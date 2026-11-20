# Install a voice in Applio

Put model downloads in a known folder and extract any ZIP there. Keep the publisher’s notes alongside the files. Use models from sources you trust.

| You have | What to do with it |
| --- | --- |
| A voice export such as `ExampleVoice.pth` | Import it as the inference model. |
| An `.index` supplied for that voice | Keep it beside its model. Use it if you want to test retrieval. |
| Files such as `G_100.pth` and `D_100.pth` | Keep them for training or resuming. Ask for the inference export if you only want to convert audio. |
| Information about the embedder, vocoder or speaker ID | Write it down. You may need it when choosing the conversion controls. |

An embedder describes the audio content for the voice model. Match the embedder from training before changing any pitch or retrieval settings. If an export uses a custom embedder, obtain the matching files from the publisher.

## Desktop import

1. Open **Models → Download Models**. For a supported public link, enter it under **Download from Link** and use **Download**. Wait for a successful job status before refreshing the library.
2. For files you already extracted, choose **Upload Model Files** in the same workspace. Select the `.pth` and use **Save File**. Repeat for its index if one came with the voice.
3. Refresh **Model Library**. Use **Inspect** to check metadata such as rate, embedder, vocoder or available speaker slots, where those fields exist. Then choose **Use** to take the model into the conversion workspace.
4. Check that the selected model is your new voice before running conversion.

## Gradio import

1. Open **Models**, called **Download** in some releases. Enter the model link in the download panel or upload the extracted voice and index through **Drop Files**.
2. After installation, open **Convert Audio** or **Inference** and refresh the model list. Choose the new voice by name.
3. If copying files manually, look for the active logs/models directory of the installation you actually launched. A Gradio installation commonly uses a layout such as `logs/ExampleVoice/ExampleVoice.pth`, with the matching index in the same directory. The path shown by a Desktop installation can differ.

## Confirm that the engine can use it

1. Use an isolated clip of speech that lasts about ten seconds. Start with pitch at 0, effects off and a retrieval ratio of 0. If the model has several speakers, select the intended speaker ID.
2. Choose the documented embedder and run a single conversion. Confirm that the result is playable and you can recognize the words you supplied.
3. If you have a matching index, save the baseline first. Select the index, raise the retrieval ratio a little and run the same clip again. Keep whichever result works better for that voice.

If a model disappears after refresh, verify its file extension and check where the selected installation keeps models. If the voice is listed but produces an error at load time, read the first model-loading error. Verify that you supplied an inference export and that your build supports the architecture. If a file came from a browser download, check that the browser saved the actual model archive and did not save an HTML login page.
