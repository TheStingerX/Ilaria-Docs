---
label: "🏠 Startseite"
order: 100
---
# Ilaria RVC-Dokumentation

<div class="docs-welcome" data-author-note="ilaria">

**Ein Hinweis von Ilaria zum Einstieg**

Hallo, ich bin Ilaria. In diesen Anleitungen teile ich, was ich bei der Entwicklung von Ilaria RVC, beim Training von Stimmmodellen und beim Ausprobieren anderer Programme gelernt habe. Die Empfehlungen beruhen auf meiner Erfahrung und meinem Wissensstand zum Zeitpunkt des Schreibens. Ich kann eine Einstellung falsch verstehen, einen Sonderfall übersehen oder einen Schritt beschreiben, der sich später ändert.

Dieselben Schritte können auf deinem Computer anders ausfallen. Ein Update kann eine Schaltfläche verschieben, eine Funktion kann von GPU und Treiber abhängen, und eine Einstellung kann bei einer anderen Stimme schlechter klingen. Verwende vorgeschlagene Werte als Ausgangspunkt. Teste mit einem kurzen Ausschnitt und ändere jeweils nur eine Einstellung. Erstelle eine Sicherung, bevor du Dateien ersetzt oder eine funktionierende Installation aktualisierst.

Wenn die Anleitung von deiner Ansicht abweicht, prüfe Programmname, Version und genaue Fehlermeldung. Vergleiche die Schritte mit den Hinweisen zur verwendeten Version. Wenn du einen Fehler entdeckst, nenne mir Seite, Schritt, Version und Ergebnis. So kann ich das Problem nachvollziehen und die Anleitung korrigieren.

<div style="border-left:4px solid #FFC0CB;padding:.75rem 1rem;margin:1rem 0;background:#ffc0cb12;border-radius:.3rem">

Bei Problemen, Vorschlägen oder Hinweisen zu Updates schreib mir auf Discord.

[**Discord · thestingerx**](https://discord.com/users/740255187234717838)

</div>

&#45; Ilaria

</div>

Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. [Ilaria RVC on Kaggle](ilaria-rvc/cloud/kaggle.md)

<div class="docs-welcome">

Ilaria RVC ist eine Windows-Anwendung zum Konvertieren von Aufnahmen und zum Trainieren von Sprachmodellen. Die Benutzeroberfläche wird in einem Browser geöffnet und die Konvertierungs-Engine wird auf Ihrem Computer ausgeführt. Das Windows-Paket wurde für NVIDIA-GPUs erstellt.

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [Sprachdemos durchsuchen](https://ilariarvc.shop/en/demos/) · [Änderungsprotokoll lesen](ilaria-rvc/install/version-history.md)

</div>

## Beginnen Sie mit Ihrem Setup

### Windows mit einer NVIDIA-GPU

Überprüfen Sie Ihr genaues Modell unter [GPU-Kompatibilität](ilaria-rvc/install/gpu-compatibility.md) und folgen Sie dann [Installation und Updates](ilaria-rvc/install/installation.md)]. Wenn die App geöffnet wird, verwenden Sie eine kurze saubere WAV-Datei und ein Inferenzmodell in [Einzelinferenz](ilaria-rvc/convert/inference.md). Der passende Index ist optional. Speichern Sie die erste Ausgabe, damit Sie eine Referenz haben, bevor Sie Effekte oder Tonhöhe ändern.

### Ein Computer ohne geeignete GPU

Verwenden Sie die [Kaggle-Komplettlösung](ilaria-rvc/cloud/kaggle.md), um Ilaria RVC auf einer Remote-GPU auszuführen. Es umfasst das Starten des Notebooks, den Zugriff auf die Benutzeroberfläche, die Durchführung eines Tests und das Herunterladen von Ergebnissen vor Ende der Sitzung.

## Wählen Sie den richtigen Workflow

- **Ich habe eine Aufnahme und möchte eine andere Stimme.** Verwenden Sie [Inferenzsteuerung](ilaria-rvc/convert/inference-buttons.md), um ein Modell auszuwählen, die Datei zu konvertieren und das exportierte Audio zu finden.
- **Ich habe Text und möchte gesprochenes Audio.** Beginnen Sie mit [Text zu Sprache](ilaria-rvc/convert/speech.md). Hören Sie sich die Quellstimme an, bevor Sie ein RVC-Modell anwenden, damit Sie die Aussprache frühzeitig korrigieren können.
- **Ich möchte mein eigenes Sprachmodell erstellen.** Bereiten Sie Aufnahmen vor, zu deren Verwendung Sie berechtigt sind, halten Sie einen kurzen Clip zum Testen beiseite und folgen Sie dann [Schritt für Schritt trainieren](ilaria-rvc/train/training-workflow.md). Verwenden Sie die [Referenz zu Trainingssteuerungen](ilaria-rvc/train/training-buttons.md), wenn Sie eine Einstellung verstehen müssen.
- **Ich möchte ein konvertiertes Mikrofon in einem Anruf oder Spiel verwenden.** Wählen Sie eine App unter [Andere RVCs](other-rvcs/app-guides.md) und folgen Sie dann [Live-Audio-Routing](conversion/real-time.md)], um das Mikrofon, den Konverter und das Ziel in dieser Reihenfolge zu testen.

## Wenn etwas schief geht

Wenn die App nicht startet, lassen Sie das Protokoll geöffnet und suchen Sie nach dem ersten Fehler. Wenn die App gestartet wird, der Ton jedoch falsch klingt, vergleichen Sie denselben kurzen Clip mit deaktivierter optionaler Verarbeitung. Der [Leitfaden zur Fehlerbehebung](reference/troubleshooting.md) gruppiert Fehlerbehebungen nach Symptom. Das [Glossar](reference/glossary.md) erklärt Begriffe wie Prüfpunkt, Einbetter und Index und [Andere Steuerelemente](ilaria-rvc/manage/other-buttons.md) zeigt, wie Modelle überprüft, importiert und exportiert werden.

 | Ich möchte… | Hier beginnen |
| --- | --- |
 | Entdecken Sie die Ilaria RVC-App im Detail | [App-Übersicht](ilaria-rvc/overview.md), [Installation](ilaria-rvc/install/installation.md), [Inferenz](ilaria-rvc/convert/inference.md) und [Trainingsworkflow](ilaria-rvc/train/training-workflow.md) |
 | Installiere die App und konvertiere meinen ersten Clip | [Erste Schritte](start/getting-started.md) |
 | Verstehen Sie, wie RVC funktioniert | [RVC-Grundlagen](start/rvc-fundamentals.md) und [Modelle und Dateien](start/models.md) |
 | Audio konvertieren, Einstellungen vergleichen oder einen Ordner verarbeiten | [Sprachkonvertierung](conversion/voice-conversion.md) und [Audioqualität](conversion/audio-quality.md) |
 | Erzeugen Sie eine gesprochene Quelle aus Text | [Text zu Sprache](conversion/text-to-speech.md) |
 | Konvertieren Sie ein Mikrofonsignal live | [Sprachkonvertierung in Echtzeit](conversion/real-time.md) |
 | Nehmen Sie einen Datensatz auf und trainieren Sie mein eigenes Modell | [Datensatzvorbereitung](model-training/dataset-preparation.md) und [Training](model-training/training.md) |
 | Trennen Sie eine Stimme oder beenden Sie ein Musikprojekt | [Stems und Mischen](conversion/stems-and-mixing.md) |
 | Vergleichen Sie Ilaria RVC, Vonovox, Applio und mehr | [RVC-Tools](reference/tools.md) |
 | Beheben Sie einen Fehler oder stellen Sie eine Installation wieder her | [Fehlerbehebung](reference/troubleshooting.md) |

Verwenden Sie die Navigation, um Anleitungen zur Einrichtung, Umrüstung, Schulung und Fehlerbehebung für Ilaria RVC und andere RVC-Anwendungen zu finden.


---

## Die Dokumentation in Zahlen

- **Seiten insgesamt:** **88** Seiten (`87` Anleitungen + Startseite)
- **Gesamtzahl über alle 6 Sprachen (`en`, `it`, `es`, `fr`, `de`, `pt`):** **528** Seiten (`88 x 6`)

## Kleine Fakten über die Website und Ilaria

- **Aus echter Praxis entstanden:** Ilaria (`TheStingerX` / `thestingerx` auf Discord) hat diese Guides direkt beim Entwickeln von **Ilaria RVC**, beim Trainieren eigener Stimmmodelle (wie *Itaila*) und beim Testen auf Windows, Kaggle, Google Colab und Lightning AI aufgebaut.
- **Von `1.1 Beta` bis `2.4.7`:** Ilaria RVC startete als gestaltete Windows-Oberfläche und unterstützt heute **NVIDIA RTX 50-Serie (Blackwell)** mit CUDA 12.8, **natives BF16-Training**, **Kokoro v1.0 TTS**, **Safetensors ↔ PTH**-Konvertierung sowie integrierte Modellkataloge.
- **Mehr als nur eine App:** Mit der Zeit wuchs **Ilaria Docs** zu einem umfassenden Hub für **11 RVC-Apps und Forks** (Ilaria RVC, Applio, Mainline, Okada, TGR, Deiteris, Vonovox, RedPanda, RVC Blue, RVC-GUI und RVC Model Merger) plus **Non-RVC**-Tools wie **YuneVoix**, **Causal Voice Changer**, **UVR5** und **MVSep**.
- **In 6 Sprachen synchronisiert:** Jede einzelne Seite wird 1:1 auf Englisch, Italienisch, Spanisch, Französisch, Deutsch und Portugiesisch gepflegt.
