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

[Vonovox installieren](vonovox/installation.md) · [Vonovox einrichten](vonovox/live-audio.md) · [Okada TG Developed Fork installieren](tgr/installation.md) · [TGR einrichten](tgr/live-audio.md)

## Weitere Aufgaben mit Applio oder Redpanda-vc

Wähle Applio für Sprachsynthese und Modellverwaltung. Redpanda VC unterstützt Training, Datei-Inferenz und Echtzeit für RVC und Causal Voice Changer in der Desktop-App und WebUI. Verwende `.pth` für RVC und `.cvc` für CVC.

[Applio installieren](applio/installation.md) · [Sprachsynthese in Applio](applio/tts.md) · [Modelle in Applio](applio/models.md) · [Redpanda-vc einrichten](redpanda/first-run.md) · [Livebetrieb in Redpanda-vc](redpanda/live-audio.md)

## Eine Testaufnahme als Referenz sichern

Vergleiche Dateiausgaben mit derselben Quelle und Lautstärke. Zeichne für Livebetrieb einen Test in der Ziel-App auf. Tritt der Fehler nur dort auf, prüfe das virtuelle Kabel, das ausgewählte Mikrofon und das Monitoring.

## Weitere Apps und Kompatibilität

{{ include "../reference/tools.md#app-comparison" }}

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Alle Apps vergleichen](../reference/tools.md)
