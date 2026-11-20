# Schritt-für-Schritt-Anleitungen nach App

<div role="group" aria-label="Was möchtest du tun?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">Was möchtest du tun?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Training oder Dateikonvertierung</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Mikrofon live</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Weitere Aufgaben</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Nach Aufgabe und Grafikkarte auswählen

Verwende **Ilaria RVC** für Training und Dateikonvertierung. Für das Mikrofon unter Windows empfiehlt sich **Vonovox** mit NVIDIA oder **Okada TG Developed Fork** mit einer kompatiblen AMD- oder Intel-GPU. Für andere Aufgaben bieten sich **Applio** und **Redpanda-vc** an.

[Ilaria RVC installieren](../ilaria-rvc/install/installation.md) · [GPU-Kompatibilität](../ilaria-rvc/install/gpu-compatibility.md) · [Kaggle verwenden](../ilaria-rvc/cloud/kaggle.md)

## Ein Modell mit Ilaria RVC trainieren

Bereite saubere Aufnahmen einer Person vor. Verarbeite die Dateien, extrahiere Merkmale und starte das Training. Vergleiche mehrere Checkpoints mit denselben separaten Testaufnahmen. Bewahre den optionalen Index beim zugehörigen Modell auf.

[Datensatz vorbereiten](../ilaria-rvc/train/datasets.md) · [Trainingsablauf](../ilaria-rvc/train/training-workflow.md) · [Trainingseinstellungen](../ilaria-rvc/train/training-controls.md)

## Dateien mit Ilaria RVC konvertieren

Importiere eine `.pth`-Datei für die Inferenz und bei Bedarf den passenden `.index`. Teste zuerst eine kurze WAV-Datei ohne Effekte und speichere das Ergebnis als Referenz. Ändere jeweils eine Einstellung und teste mehrere Ausschnitte vor der Stapelverarbeitung. Mit Kaggle kannst du ohne geeignete lokale GPU trainieren oder konvertieren.

[Einzel- und Stapelinferenz](../ilaria-rvc/convert/inference.md) · [Inferenzeinstellungen](../ilaria-rvc/convert/inference-buttons.md)

## Das Mikrofon live konvertieren

Wähle unter NVIDIA das passende Vonovox-Paket. Für kompatible AMD- oder Intel-GPUs bietet sich der DirectML-Build von TGR an. Teste die konvertierte Stimme per Kopfhörer, leite sie an ein virtuelles Audiokabel und wähle dessen Aufnahmeseite in Discord, OBS oder einem Spiel als Mikrofon. Erhöhe bei Aussetzern den Puffer.

[Vonovox installieren](vonovox/installation.md) · [Vonovox einrichten](vonovox/live-audio.md) · [Okada TG Developed Fork installieren](tgr/installation.md) · [TGR einrichten](tgr/live-audio.md)

## Weitere Aufgaben mit Applio oder Redpanda-vc

Applio eignet sich für Sprachsynthese und Modellverwaltung. Mit Redpanda-vc kannst du RVC, Beatrice und Rectified Flow sowie den Livebetrieb im Browser oder auf dem Desktop ausprobieren. Wähle für ein RVC-Modell die RVC-Engine.

[Applio installieren](applio/installation.md) · [Sprachsynthese in Applio](applio/tts.md) · [Modelle in Applio](applio/models.md) · [Redpanda-vc einrichten](redpanda/first-run.md) · [Livebetrieb in Redpanda-vc](redpanda/live-audio.md)

## Eine Testaufnahme als Referenz sichern

Vergleiche Dateiausgaben mit derselben Quelle und Lautstärke. Zeichne für Livebetrieb einen Test in der Ziel-App auf. Tritt der Fehler nur dort auf, prüfe das virtuelle Kabel, das ausgewählte Mikrofon und das Monitoring.

## Weitere Apps und Kompatibilität

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

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Alle Apps vergleichen](../reference/tools.md)
