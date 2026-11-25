---
label: "Anleitungen nach App"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Verwende Ilaria RVC für Training und Dateikonvertierung."
---
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

[Vonovox installieren](voice-changers/vonovox/installation.md) · [Vonovox einrichten](voice-changers/vonovox/live-audio.md) · [Okada TG Developed Fork installieren](voice-changers/tgr/installation.md) · [TGR einrichten](voice-changers/tgr/live-audio.md)

## Weitere Aufgaben mit Applio oder Redpanda-vc

Wähle Applio für Sprachsynthese und Modellverwaltung. Redpanda VC unterstützt Training, Datei-Inferenz und Echtzeit für RVC und Causal Voice Changer in der Desktop-App und WebUI. Verwende `.pth` für RVC und `.cvc` für CVC.

[Applio installieren](training/applio/installation.md) · [Sprachsynthese in Applio](training/applio/tts.md) · [Modelle in Applio](training/applio/models.md) · [Redpanda-vc einrichten](training/redpanda/first-run.md) · [Livebetrieb in Redpanda-vc](training/redpanda/live-audio.md)

## Eine Testaufnahme als Referenz sichern

Vergleiche Dateiausgaben mit derselben Quelle und Lautstärke. Zeichne für Livebetrieb einen Test in der Ziel-App auf. Tritt der Fehler nur dort auf, prüfe das virtuelle Kabel, das ausgewählte Mikrofon und das Monitoring.

## Training und Inferenz

| Anwendung | Funktionen | Hardware / Hinweise | Anleitungen |
| --- | --- | --- | --- |
| **Ilaria RVC** | Training, Einzel-/Stapelinferenz, TTS, Audio-Analyzer | NVIDIA CUDA (Windows) / Kaggle | [Installation](../ilaria-rvc/install/installation.md) · [Inferenz](../ilaria-rvc/convert/inference.md) · [Training](../ilaria-rvc/train/training-workflow.md) |
| **Applio** | Training, Datei-Inferenz, TTS, Modellbibliothek, Echtzeit | NVIDIA CUDA, AMD ROCm, Apple MPS | [Installation](training/applio/installation.md) · [Inferenz](training/applio/inference.md) · [Training](training/applio/training.md) |
| **RVC WebUI (Mainline - Original RVC)** | Offizielles Training & Datei-Inferenz (+ separater Live-Starter) | NVIDIA CUDA, CPU / DirectML | [Installation](training/mainline/installation.md) · [Inferenz](training/mainline/inference.md) · [Training](training/mainline/training.md) |
| **Redpanda-vc** | RVC + Causal Voice Changer Training, Datei-Inferenz & Echtzeit | NVIDIA CUDA / CPU (Desktop & WebUI) | [Erster Start](training/redpanda/first-run.md) · [Inferenz](training/redpanda/inference.md) · [Training](training/redpanda/training.md) |
| **RVC Model Merger** | Werkzeug zum Zusammenführen von `.pth`-Modellen | Offline-Werkzeug | [Nutzung](rvc-model-merger/usage.md) |

### Veraltet / Nicht empfohlen

!!!warning Veraltete Software · Nicht empfohlen
Diese Projekte sind veraltet, archiviert oder werden nicht mehr aktiv gepflegt. Die Anleitungen bleiben für bestehende Projekte verfügbar. Wähle für eine Neuinstallation oben eine aktiv gepflegte Anwendung.
!!!

| Anwendung | Funktionen | Status / Hinweise | Anleitungen |
| --- | --- | --- | --- |
| **rvc-cli** | Datei-/Stapelinferenz & Training (CLI) | Archiviert | [Installation](training/rvc-cli/installation.md) · [Nutzung](training/rvc-cli/usage.md) |
| **RVC Studio** | Training & Datei-Inferenz (WebUI) | Inaktiv | [Installation](training/rvc-studio/installation.md) · [Nutzung](training/rvc-studio/usage.md) |
| **Mangio RVC Fork** | Training & Datei-Inferenz | Inaktiv | [Installation](training/mangio/installation.md) · [Nutzung](training/mangio/usage.md) |
| **Replay** | Training & Dateikonvertierung | Eingestellt (Weights.gg geschlossen) | [Installation](training/replay/installation.md) · [Nutzung](training/replay/usage.md) |
| **AICoverGen** | RVC-v2-Pipeline für Song-Cover (nur Inferenz, WebUI / CLI / Colab) | Nicht mehr gepflegt | [Installation](training/aicovergen/installation.md) · [Nutzung](training/aicovergen/usage.md) |
| **RVC GUI** | Nur Desktop-Dateikonvertierung | Archiviert | [Dateikonvertierung](voice-changers/rvc-gui/file-conversion.md) |

## Stimmwandler (Echtzeit)

| Anwendung | Engine / Schwerpunkt | Hardware / Hinweise | Anleitungen |
| --- | --- | --- | --- |
| **Vonovox** | Echtzeit-RVC v2 (empfohlen unter Windows mit NVIDIA) | NVIDIA CUDA | [Installation](voice-changers/vonovox/installation.md) · [Live-Audio](voice-changers/vonovox/live-audio.md) · [Leistung](voice-changers/vonovox/advanced-performance-optimization.md) |
| **w-okada VCClient** | Plattformübergreifender Echtzeit-RVC-Client/Server | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installation](voice-changers/okada/installation.md) · [Live-Audio](voice-changers/okada/live-audio.md) |
| **Okada TG Developed Fork (TGR)** | Aktiver Community-Fork für Echtzeit-RVC | NVIDIA CUDA, DirectML (AMD/Intel), CPU, Linux, exp. macOS | [Installation](voice-changers/tgr/installation.md) · [Live-Audio](voice-changers/tgr/live-audio.md) · [Cloud](voice-changers/tgr/cloud.md) |
| **Deiteris w-okada Fork** | Echtzeit-Fork von w-okada | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installation](voice-changers/deiteris/installation.md) · [Live-Audio](voice-changers/deiteris/live-audio.md) · [Cloud](voice-changers/deiteris/cloud.md) |
| **RVC Blue** | Windows-Desktop-Echtzeit & Echtzeit-Dateieingabe | NVIDIA CUDA 12.8 / 11.8 | [Installation](voice-changers/rvc-blue/installation.md) |

RVC-Anwendungen mit integriertem Echtzeitmodus: **Applio** ([Echtzeit](training/applio/realtime.md)), **Redpanda-vc** ([Live-Modi](training/redpanda/live-audio.md)) und **RVC WebUI (Mainline)** ([Echtzeit](training/mainline/realtime.md)).

### Non-RVC Echtzeit-Stimmwandler

| Anwendung | Funktionen | Anleitungen |
| --- | --- | --- |
| **Causal Voice Changer** | Non-RVC-Echtzeit-Stimmwandler mit niedriger Latenz (`.cvc`-Modelle) | [Überblick](../non-rvc/voice-changers/causal-voice-changer/overview.md) · [Installation](../non-rvc/voice-changers/causal-voice-changer/installation.md) · [Echtzeit](../non-rvc/voice-changers/causal-voice-changer/realtime.md) |
| **YuneVoix** | Non-RVC-Echtzeit-Stimmwandler, Song-Cover & Karaoke | [Überblick](../non-rvc/voice-changers/yunevoix/overview.md) · [Installation](../non-rvc/voice-changers/yunevoix/installation.md) · [Nutzung](../non-rvc/voice-changers/yunevoix/usage.md) |

[Alle Apps vergleichen](../reference/tools.md)
