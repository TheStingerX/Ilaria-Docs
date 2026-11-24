# rvc-cli · Installation

[GitHub](https://github.com/blaisewf/rvc-cli) · [Reviewed version](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

## Version and scope

This guide covers **blaisewf/rvc-cli 1.2.4**. The upstream repository identifies it as unmaintained and points to Applio for the maintained CLI. Use a separate folder and Python environment for old projects. This tool provides file inference, batch inference and training commands.

## Windows with install.bat

Extract the tagged source, open a terminal in its root and run `install.bat`. It uses Miniconda to create a Python 3.9 environment in `env/` and installs the CUDA 12.1 PyTorch wheels. Wait for setup to finish. Then invoke the script using the environment’s own interpreter. The actual file is `rvc_cli.py`.

~~~powershell
.\install.bat
.\env\python.exe rvc_cli.py -h
.\env\python.exe rvc_cli.py prerequisites -h
~~~

## Linux with a virtual environment

The tagged `install.sh` creates `venv/` using the available `python3`. Use Python 3.9 as recommended by the release README. After installation, activate the environment in your current shell. Inspect `prerequisites -h` and install the assets your workflow needs before your first conversion. A missing module usually means the wrong interpreter or an incomplete setup.

~~~bash
bash install.sh
source venv/bin/activate
python rvc_cli.py -h
python rvc_cli.py prerequisites -h
~~~

[Usage and troubleshooting](usage.md)
