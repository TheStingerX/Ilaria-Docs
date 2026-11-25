---
label: "Installation und Updates"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/installation/
description: "Laden Sie den unterstützten NVIDIA-Build von Hugging Face] herunter."
---
# Installation und Updates

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Das vollständige Windows-Paket ist Version 2.4.7. Aktualisiere von 2.4.2–2.5.0 über **Other → Update Ilaria RVC → Check for updates → Download and restart**. Das Update-ZIP enthält weder die Laufzeit noch die Modellgewichte. [Windows-Update als ZIP](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Installieren Sie das Windows-Paket

Laden Sie den unterstützten NVIDIA-Build von [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)] herunter. Extrahieren Sie das gesamte Archiv in einen beschreibbaren lokalen Ordner und führen Sie dort `RUN_ILARIA_RVC.bat` aus. Der Launcher und die gebündelte Laufzeit müssen zusammen bleiben. Wenn sich kein Browser-Tab öffnet, versuchen Sie es mit `http://127.0.0.1:6969` auf demselben PC.


### Warum du PyTorch nicht manuell aktualisieren solltest

Ilaria RVC enthält eine getestete Kombination aus **PyTorch (2.10.0)**, **CUDA (12.8 oder 12.6)**, `torchaudio`, `torchvision`, `faiss` und Audio-Paketen. Führe **kein** manuelles `pip install --upgrade torch` aus:

- Ein manuelles PyTorch-Upgrade kann `torchaudio`, `fairseq`, `onnxruntime` oder C++/CUDA-Erweiterungen beschädigen.
- Neuere Builds können ältere GPUs (Maxwell, Pascal, Volta) ausschließen oder UnpicklingError auslösen.
- Warte immer auf ein offizielles Ilaria-RVC-Update statt die portable Laufzeit manuell zu ändern.

## Vor dem ersten Start

Die vollständige Windows-ZIP-Datei ist etwa 5,00 GB groß. Lassen Sie Platz für das Archiv und die extrahierten Dateien. Extrahieren Sie es in einen neuen lokalen Ordner, in den Sie Dateien schreiben können. Halten Sie Launcher, Laufzeit und Assets zusammen. ContentVec und RMVPE sind enthalten. Optionale Encoder sind unter **Andere → Embedder herunterladen** verfügbar.

## Welche CUDA-Laufzeit wird Ilaria RVC verwenden?

Öffnen Sie **Task-Manager → Leistung → GPU** und lesen Sie den genauen Modellnamen. Vergleichen Sie es mit der [GPU-Kompatibilitätstabelle](gpu-compatibility.md). Die folgende CUDA-Version bezieht sich auf die PyTorch-Umgebung, die die App verwendet. Der NVIDIA-Treiber ist eine separate Systemkomponente und muss diese Umgebung unterstützen.

| Im PC vorhandene GPUs | Laufzeit | Was Sie erwartet |
| --- | --- | --- |
| GeForce GTX 16 oder RTX 20, 30, 40 oder 50 | PyTorch 2.10.0 mit CUDA 12.8 | Die vollständige ZIP-Datei enthält diese Laufzeit. Extrahieren Sie es und führen Sie den Launcher aus. Auf der RTX 50 ist PyTorch bereits enthalten und kann mit einem kompatiblen NVIDIA-Treiber verwendet werden. |
| Nur NVIDIA Maxwell, Pascal oder Volta | PyTorch 2.10.0 mit CUDA 12.6 | Beim ersten Start lädt der Launcher die ältere Laufzeit herunter und überprüft sie. Es behält es in `runtime-cu126` und verwendet es bei späteren Starts wieder. Lassen Sie den Launcher geöffnet und erlauben Sie Internetzugriff und Speicherplatz. |
| Keine geeignete lokale NVIDIA-GPU | Entfernte NVIDIA-GPU | [Ilaria RVC in der Cloud](../cloud/cloud.md) · [Kaggle](../cloud/kaggle.md) · [Google Colab](../cloud/colab.md) · [Lightning AI Studio](../cloud/lightning-ai.md) |

Wenn Sie mehr als eine GPU haben, lesen Sie das Launcher-Protokoll, um zu sehen, welche Laufzeit tatsächlich gestartet wurde. Der oben beschriebene CUDA 12.6-Pfad gilt, wenn alle NVIDIA-GPUs im PC aus den älteren Familien stammen.

## Überprüfen Sie, ob die App korrekt gestartet wurde

1. Führen Sie `RUN_ILARIA_RVC.bat` aus dem extrahierten Ordner aus. Warten Sie, bis sich die Schnittstelle öffnet. Wenn die Legacy-Runtime heruntergeladen wird, prüfen Sie `cu126-runtime-install.log` auf den Fortschritt.
2. Wenn das Fenster geschlossen oder die Schnittstelle nie geöffnet wird, führen Sie `RUN_ILARIA_RVC_LOGS.bat` aus und überprüfen Sie den ersten Fehler. Überprüfen Sie, ob die GPU, der Treiber, der Zugriff auf den Download oder der freie Speicherplatz erwähnt werden. Eine leere Browserseite kann auf einen Launcher-Fehler zurückzuführen sein.
3. Sobald sich die Schnittstelle öffnet, konvertieren Sie eine kurze, saubere WAV-Datei mit einem bekanntermaßen kompatiblen Inferenzmodell. Überprüfen Sie das Ergebnis, bevor Sie eine große Charge ausführen oder mit dem Training beginnen. Siehe [Einzel- und Batch-Inferenz](../convert/inference.md).

Die Rechen- und Backpropagation-Tests sowie das Laden von ContentVec wurden auf einer RTX 4070 überprüft. Die Kompatibilität mit anderen Karten wird von deren Architektur und Laufzeitauswahl erwartet und kann nicht von Modell zu Modell garantiert werden.

## Update auf 2.4.7

Lade das vollständige ZIP (`ILARIA_RVC-2.4.7.zip`) herunter, entpacke es in einen neuen Ordner und starte `RUN_ILARIA_RVC.bat`.

Behalte die alte Installation als Sicherung. Kopiere Modelle nach models/, Datensätze nach app/datasets/ und vollständige Experimente nach app/logs/. Der Updater von 2.3.0 verwendet die alte Struktur.

[Kompatible GPUs](gpu-compatibility.md)

### Update von 2.4.2 - 2.4.8

Wenn du bereits **2.4.2** bis **2.4.8** verwendest, öffne **Other → Update Ilaria RVC → Check for updates** und wähle **Download and restart**. Von **2.4.0** oder **2.4.1** aktualisiere zuerst auf **2.4.2** oder entpacke das vollständige **2.4.7**-ZIP.
