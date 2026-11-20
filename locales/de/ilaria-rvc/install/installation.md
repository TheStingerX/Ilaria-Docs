---
label: "Installation und Updates"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/installation/
description: "Laden Sie den unterstützten NVIDIA-Build von Hugging Face] herunter. Extrahieren Sie das gesamte Archiv in einen beschreibbaren lokalen Ordner und führen..."
---
# Installation und Updates

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Installieren Sie das Windows-Paket

Laden Sie den unterstützten NVIDIA-Build von [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)] herunter. Extrahieren Sie das gesamte Archiv in einen beschreibbaren lokalen Ordner und führen Sie dort `RUN_ILARIA_RVC.bat` aus. Der Launcher und die gebündelte Laufzeit müssen zusammen bleiben. Wenn sich kein Browser-Tab öffnet, versuchen Sie es mit `http://127.0.0.1:6969` auf demselben PC.

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

## Update auf 2.4.0

Lade das vollständige ZIP herunter, entpacke es in einen neuen Ordner und starte `RUN_ILARIA_RVC.bat`.

Behalte die alte Installation als Sicherung. Kopiere Modelle nach models/, Datensätze nach app/datasets/ und vollständige Experimente nach app/logs/. Der Updater von 2.3.0 verwendet die alte Struktur.

[Kompatible GPUs](gpu-compatibility.md)

### Update von 2.4.0

Installiere und starte zuerst 2.4.0. Öffne **Other → Update Ilaria RVC** und installiere die schrittweisen Updates bis **2.4.3** (`2.4.1 → 2.4.2 → 2.4.3`).
