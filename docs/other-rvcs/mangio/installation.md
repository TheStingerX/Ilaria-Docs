---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/mangio/installation/
---

# Mangio RVC Fork · Installation

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Reviewed version](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Legacy software · Not recommended
The main branch of **Mangio RVC Fork** has been inactive for years. This outdated app is not recommended for new installations. [Guides by app](../app-guides.md)
!!!

## Legacy version and environment

Mangio RVC Fork is an experimental fork of the original RVC WebUI. This guide refers to the historical tag **v23.7.0**. Keep its runtime and assets separate from modern RVC installs. On Windows, extract an official package containing `runtime/python.exe` for the bundled launcher. A source-only checkout still needs the dependencies and base assets documented upstream. The tagged README recommends Python 3.9.8 for its manual dependency path.

## Launch the WebUI or the text interface

In the Windows bundle run `go-web.bat`. It invokes `infer-web.py` with the bundled interpreter and port 7897. Open the local URL printed in the terminal. If the launcher fails, verify the bundled interpreter exists before changing packages. To use the interactive CLI in an already prepared environment, start `infer-web.py --is_cli`.

~~~bash
python infer-web.py --is_cli
~~~

[Usage and troubleshooting](usage.md)
