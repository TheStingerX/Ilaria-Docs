# Wählen Sie eine RVC-App

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Ausführliche Anleitungen zur Installation, Einrichtung und Fehlerbehebung findest du in den [Schritt-für-Schritt-Anleitungen für die einzelnen Apps](../other-rvcs/app-guides.md).

Beginnen Sie mit dem, was Sie tun möchten. Ein **Live-Sprachwechsler** verarbeitet einen Mikrofon-Stream, während Sie sprechen. Ein **Dateikonverter** verarbeitet eine Aufnahme und speichert die Ausgabe zur Bearbeitung oder zum Export. Ein **Trainer** wandelt einen Datensatz der Aufzeichnungen eines Sprechers in ein Modell um. Einige Apps bieten alle drei Workflows. Der von Ihnen installierte Build bestimmt, welche Grafikhardware und Modellformate Sie verwenden können.

///region app-comparison
| App | Training | Inferenz (Dateien) | Realtime | Projektlinks |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Ja | Ja | Ja · Von RVC WebUI (Mainline - Original RVC) übernommen, ohne künftige Updates | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Ja | Ja | Ja · Separater Launcher | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Ja | Ja | Ja | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Ja | Ja | Ja | [GitHub](https://github.com/redpanda343/Redpanda-vc) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Nein | Ja | Nein | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Nein | Nein | Ja | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Nein | Nein | Ja | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Nein | Nein | Ja | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Nein | Dateieingabe in Echtzeit | Ja | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Ja | Ja · ältere Version | Nein | [Offizielle Website](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | App | Verwendungszweck | Hardware- und Build-Hinweise |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Dateikonvertierung, TTS, Training und Audioanalyse | Die aktuelle Windows-Distribution ist nur NVIDIA. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Upstream-Training und Inferenz mit einem separaten Echtzeit-Launcher | NVIDIA CUDA unter Windows und Ubuntu. Das Upstream-CPU-Setup deckt AMD- und Intel-Systeme ab, mit möglicher DirectML-Nutzung unter Windows. |
| [Applio](../other-rvcs/applio/installation.md) | Dateikonvertierung, Schulung und Echtzeit in einer App | Desktop-Dokumentation listet NVIDIA CUDA, unterstützte AMD-Setups und Apple MPS auf. Die Verfügbarkeit hängt von der Edition und der Engine ab. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Ein Applio-Fork zum Experimentieren mit mehreren Sprachkonvertierungs-Engines | Das Repo enthält einen CUDA-Container und dokumentiert die GPU-Auswahl für WebUI-Streams. Überprüfen Sie die ausgewählte Engine und erstellen Sie sie für andere Backends. |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Einfache lokale Dateikonvertierung in der Legacy-Desktop-Oberfläche | Archiviert. Das Projekt dokumentiert Windows NVIDIA CUDA und einen historischen Workaround von Apple Silicon. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Empfohlen für Live-RVC v2 unter Windows mit NVIDIA | Nur NVIDIA CUDA. Passen Sie das Hugging Face-Paket an Ihre GPU-Generation an. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Live-Konvertierung über mehrere Betriebssysteme hinweg | Windows CUDA und Standardpakete, einschließlich DirectML oder CPU, sofern unterstützt. Separate Setup-Pfade für Apple Silicon und Linux. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Live RVC mit dokumentierten Optionen für AMD-, Intel- und CPU-Benutzer | Windows CUDA oder DirectML. Für Linux- und experimentelle macOS-Builds gibt es separate Anweisungen. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Echtzeit-Stimmkonvertierung unter Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Modelltraining und Dateikonvertierung · nicht empfohlen | [Archivierte Installationsdateien](https://archive.org/details/replay-8.7.0-installers) |
///endregion

## Vonovox (empfohlen für den Live-NVIDIA-Einsatz)

> **Neueste Version (Beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

Vonovox ist ein Echtzeit-Sprachwechsler für Windows, der RVC v2-Modelle lädt und NVIDIA CUDA verwendet. Wählen Sie diese Option, wenn Ihr Hauptziel die Mikrofonkonvertierung ist und Sie über eine unterstützte NVIDIA-Karte verfügen. Die Paketliste enthält Builds und Patches für bestimmte GPU-Generationen. Überprüfen Sie daher die Dateinamen und Versionsanweisungen, bevor Sie ein Archiv auswählen. Nutzen Sie für Downloads das Hugging Face-Repository des Herausgebers. [Offizielle Vonovox-Downloads](https://huggingface.co/dr87/vonovox/tree/main) · [Vonovox-Hardware- und Setup-Hinweise](https://github.com/dr87/Vonovox/blob/main/README.md)

Laden Sie zum ersten Mal Ihre RVC v2-Stimme und hören Sie sich einen kurzen Mikrofontest an, bevor Sie Audio an eine andere App weiterleiten. Verringern Sie dann die Blockgröße schrittweise, während Sie normal sprechen. Stellen Sie die vorherige Einstellung wieder her, wenn Sie Aussetzer oder abgehackte Silben hören. Testen Sie es noch einmal zusammen mit dem Spiel oder der Streaming-App, die Sie verwenden möchten, da beide die gleiche GPU verwenden. [Vonovox Audiokonfiguration](https://github.com/dr87/Vonovox/blob/main/README.md)

## w-okada VCClient

VCClient übernimmt die Live-Sprachkonvertierung mit einem Client und einem Server. Sie können sie zusammen auf einem Computer ausführen oder den Server auf einem zweiten Computer platzieren, um die Konvertierungsarbeitslast von Ihrem Hauptcomputer zu verlagern. Wählen Sie eine Version aus, die das RVC-Modell unterstützt, das Sie laden möchten. Die gepflegten Downloads sind live auf Hugging Face verfügbar, und in der englischen README-Datei des Projekts werden die Windows-Standard-, Windows CUDA-, Apple Silicon- und Linux-Optionen erläutert. [VCClient English README](https://github.com/w-okada/voice-changer/blob/master/README_en.md) · [Offizielle VCClient-Downloads](https://huggingface.co/wok000/vcclient000/tree/main)

Überprüfen Sie das Modellformat sowie den Beschleuniger. Beispielsweise beschränken die älteren Windows v1-Anweisungen des Projekts die AMD- und Intel-GPU-Beschleunigung auf ONNX-Modelle. Eine PyTorch-Datei `.pth` und eine exportierte Datei `.onnx` können in derselben App unterschiedliche Hardwarepfade haben. Windows Standard v2 dokumentiert DirectML- und CPU-Optionen. [VCClient-Build- und Modellformat-Hinweise](https://github.com/w-okada/voice-changer/blob/master/README_en.md)

## Okada TG Developed Fork (TGR)

Das `tg-develop/voice-changer`-Projekt ist über den Deiteris-Fork ein Community-Fork in der W-Okada-Familie. Es konzentriert sich auf Live-RVC und dokumentiert separate Windows-Builds für NVIDIA CUDA und für DirectML auf kompatibler AMD- oder Intel-Hardware. Die Dokumentation deckt auch die CPU-Nutzung, Linux und experimentelle macOS-Builds für Apple Silicon und Intel ab. [TGR-Setup und Systemanforderungen](https://github.com/tg-develop/voice-changer) · [TGR-Versionen](https://github.com/tg-develop/voice-changer/releases)

Befolgen Sie unter Windows die Anweisungen für den heruntergeladenen Build. Der DirectML-Build stellt eine andere Liste von Pitch-Extraktoren als der NVIDIA-Build bereit, sodass Voreinstellungen aus der CUDA-Edition möglicherweise angepasst werden müssen. Vergleichen Sie die Audiostabilität mit der Ihrer üblichen Apps, bevor Sie sich für eine Aufnahme oder einen Stream auf das Setup verlassen.

## Ilaria RVC

Das aktuelle Windows-Paket ist nur NVIDIA. Verwenden Sie es, wenn Sie zwischen der Konvertierung von Aufzeichnungen, der Sprachgenerierung, dem Training, der Überprüfung der Metadaten eines Modells und der Prüfung von Wellenformen oder Spektrogrammen im Audioanalysator wechseln möchten. Bestehende Installationen können unter **Andere → Ilaria RVC aktualisieren** nach Updates suchen. [Ilaria RVC-Downloads](https://huggingface.co/TheStinger/Ilaria_RVC) · [Projekt-README und Versionshinweise](https://github.com/TheStingerX/Ilaria-RVC)

## RVC-GUI

Die RVC-GUI von Tiger14n ist eine eigenständige Desktop-Oberfläche zum Konvertieren von Audiodateien. Es kann eine ZIP-Datei importieren, die die Inferenz `.pth` und die entsprechende `.index` enthält, sofern verfügbar. Das Repository ist archiviert. Verwenden Sie daher die Anweisungen für einen Workflow, der diese App speziell erfordert. Die gleichnamige **Echtzeit-GUI** des Upstream-RVC-Projekts ist ein separater Launcher. [RVC GUI-Repository und Setup](https://github.com/Tiger14n/RVC-GUI)

## Applio

Applio unterstützt RVC-Sprachmodellverwaltung, Dateikonvertierung, Schulung und Echtzeit. Die Desktop- und Python/Gradio-Editionen verfügen über unterschiedliche Einrichtungsabläufe. In den Desktop-Dokumenten werden NVIDIA CUDA, unterstützte AMD-Konfigurationen und Apple MPS identifiziert und erläutert, wie der Engine-Status nach der Installation überprüft wird. Verwenden Sie die [Applio-Konvertierungsschritte](../conversion/voice-conversion.md#convert-a-recording-in-applio) für Ihre Edition.

## RVC-WebUI

Retrieval-based-Voice-Conversion-WebUI ist das Upstream-RVC-Projekt. Seine WebUI übernimmt das Training und die Dateiinferenz. Die Echtzeit-GUI des Projekts verfügt über einen eigenen Launcher. Der Hauptzweig dokumentiert separate CUDA-Abhängigkeiten für neuere und ältere NVIDIA-Karten sowie einen CPU-Abhängigkeitssatz für AMD- und Intel-Systeme. Unter Windows ist DirectML möglicherweise für unterstützte Vorgänge verfügbar. Befolgen Sie die [Hauptkonvertierungsschritte](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) für das Windows-Paket.

## Redpanda-vc

Redpanda-vc ist ein Applio-Fork, dessen Echtzeitschnittstelle RVC, Beatrice und Rectified Flow unterstützt. Es bietet mehrere Modellfamilien. Wählen Sie daher den RVC-Workflow für eine RVC-Stimme. Im Browser-Echtzeitmodus dokumentiert das Projekt die Zuweisung von Streams zu bestimmten GPUs und stellt fest, dass Beatrice auf der CPU läuft. Diese Ressourcenauswahl gilt für Redpanda-vc und die ausgewählte Engine. [Redpanda-vc-Repository und unterstützte Engines](https://github.com/redpanda343/Redpanda-vc)

## Apps mit derselben Stimme vergleichen

1. Wählen Sie das Paket für Ihr Betriebssystem, Ihre GPU und Ihr Modellformat. Prüfen Sie, ob die App die RVC-Generierung und den Feature-Encoder Ihres Modells unterstützt.
2. Beginnen Sie mit derselben kurzen Aufnahme oder wiederholen Sie dieselben paar Sätze in Ihr Mikrofon. Laden Sie dasselbe Inferenzmodell und seinen passenden Index in beide Apps, sofern dies unterstützt wird.
3. Verwenden Sie für den ersten Vergleich die gleiche Tonhöhenverschiebung und deaktivieren Sie optionale Spracheffekte. Beurteilen Sie klare Worte, eine stabile Tonhöhe und natürliche Pausen, bevor Sie den Klang anpassen.
4. Für den Live-Einsatz führen Sie die Spiel-, Anruf- oder Streaming-App aus, die Sie normalerweise verwenden, und zeichnen Sie die geroutete Ausgabe mindestens eine Minute lang auf. Achten Sie auf Lücken, harte Schnitte und verzögertes Audio, bevor Sie den Puffer reduzieren.

## Replay

[Offizielle Website](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers)

Seit der Schließung von Weights.gg erhält Replay keinen Support und keine Updates mehr. Die [offizielle Replay-Seite](https://www.weights.com/replay) könnte jederzeit abgeschaltet werden. Das Internet Archive enthält die Installationsdateien von Replay 8.7.0. Für neue Installationen wird Replay nicht empfohlen. Seit der Schließung von Weights kann das archivierte Installationsprogramm die benötigten Dateien wahrscheinlich nicht mehr herunterladen, sodass die Installation möglicherweise fehlschlägt.

[Archivierte Installationsdateien · Replay 8.7.0](https://archive.org/details/replay-8.7.0-installers)
