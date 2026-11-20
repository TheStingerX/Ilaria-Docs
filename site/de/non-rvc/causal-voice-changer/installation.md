# Causal Voice Changer installieren

Diese Anleitung führt dich Schritt für Schritt durch die Installation auf **Windows** oder **Linux**, auch wenn du noch nie Python oder Git benutzt hast.

> **Wichtige Regel beim ersten Start**: Starte immer **zuerst** den Training-Launcher (`run-training.bat` unter Windows oder `run-training.sh` unter Linux), selbst wenn du nur den Live-Stimmenverzerrer nutzen möchtest. Er installiert Python, PyTorch für deine GPU und die ~900 MB vortrainierten Gewichte für beide Programme.

## 1. CVC herunterladen

Wähle eine der beiden Optionen:

### Option A: Vorkompilierte Release (Empfohlen für Einsteiger)

1. Öffne die [Causal Voice Changer Releases-Seite](https://github.com/mojowozo/Causal-Voice-Changer/releases).
2. Lade das Archiv für dein Betriebssystem herunter:
   - **Windows**: `Causal-Voice-Changer-<version>-windows-x64.zip`
   - **Linux**: `Causal-Voice-Changer-<version>-linux-x86_64.tar.gz` *(erfordert glibc 2.35+, z. B. Ubuntu 22.04, Debian 12 oder neuer)*
3. Entpacke das Archiv in einen beschreibbaren Ordner (z. B. `D:\CausalVC` unter Windows).
   - *Hinweis*: Die Release enthält bereits die kompilierten Fenster; du musst weder .NET SDK noch Rust manuell installieren.

### Option B: Aus dem Quellcode (`git clone`)

Wenn du das Repository mit `git clone https://github.com/mojowozo/Causal-Voice-Changer.git` klonst, werden die Oberflächen beim ersten Start automatisch kompiliert (und bei Quellcode-Änderungen neu gebaut):
- **Windows**: installiert automatisch das **.NET 10 SDK** in `.dotnet`, falls es fehlt, um die WinUI-3-App zu bauen.
- **Linux**: baut die COSMIC-Rust-UI mit `cargo`.
- Falls eine native UI nicht gebaut werden kann, öffnet sich automatisch ein einfaches **Tk**-Fenster mit den Grundfunktionen.

## 2. Ersteinrichtung ausführen (`run-training`)

1. Öffne den entpackten CVC-Ordner.
2. Starte:
   - **Windows**: Doppelklick auf **`run-training.bat`**
     - Da die App nicht digital signiert ist, zeigt Windows SmartScreen eventuell *„Der Computer wurde durch Windows geschützt“*. Klicke auf **Weitere Informationen → Trotzdem ausführen**.
   - **Linux**: Terminal im Ordner öffnen und **`./run-training.sh`** ausführen.
3. **Auf das automatische Setup warten**:
   - Richtet eine lokale Python-Umgebung (`.venv-win` unter Windows, `.venv` unter Linux) mit **`uv`** ein.
   - Installiert den passenden **PyTorch**-Build für deine Grafikkarte.
   - Lädt das **Basismodell und die RMVPE-Gewichte** (ca. **900 MB**) in `weights/` herunter.
4. Danach öffnet sich das **Training-Fenster**. Du kannst es jetzt schließen oder direkt eine Stimme erstellen!

## 3. GPU-Auswahl unter Windows (falls nötig)

Unter Windows erkennt `scripts/gpu-extra.ps1` deine GPU automatisch:
- **NVIDIA**: installiert **CUDA**-PyTorch.
- **AMD RX 7000 / 9000, PRO W7000, Ryzen AI**: installiert **ROCm**-PyTorch (`rocm`, erfordert AMD Software `26.2.2` oder neuer).
- **AMD RX 6000 / PRO W6000**: installiert AMDs neueren Nightly-Build (`rocm-rdna2`).
- **Ältere AMD Radeons**: laufen auf der **CPU** (stelle im Live-Betrieb **Chunk** auf `60 ms` oder höher).

Falls die automatische Erkennung das falsche Backend wählt, setze vor dem Start `CAUSALVC_GPU`:
- `CAUSALVC_GPU=cuda`
- `CAUSALVC_GPU=rocm`
- `CAUSALVC_GPU=rocm-rdna2`

*(Bei manuellen `uv`-Befehlen unter Windows `--extra cuda`, `--extra rocm` oder `--extra rocm-rdna2` anhängen.)*

## 4. CVC aktualisieren

Nach einem Update:
- Unter Windows (aus dem Quellcode) starte `run-realtime.bat` / `run-training.bat` mit `CAUSALVC_REBUILD=1`, falls sich die WinUI-3-Oberfläche geändert hat.
- Unter Linux baut sich die Rust-UI beim nächsten Start automatisch neu.
