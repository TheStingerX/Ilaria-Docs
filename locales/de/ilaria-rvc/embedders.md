---
label: "🧩 Embedder und Pretrains"
order: 88
permalink: /ilaria-rvc/embedders/
---
# Embedder und Pretrains

## Inferenz-Embedder

Öffnen Sie **Embedder-Einstellungen** unter **Audioverarbeitung**. Liest gespeicherte Modellmetadaten automatisch und verwendet ContentVec, wenn kein Einbetter aufgezeichnet ist. Wenn der Herausgeber einen Encoder angibt, verwenden Sie diesen Encoder. Ein Abrufindex benötigt kompatible Funktionen aus demselben Experiment. Lassen Sie den Abruf deaktiviert, wenn die Kopplung unsicher ist.

Zu den verfügbaren Inferenz-Encodern gehören ContentVec, Spin, Spin-v2 und die chinesische, japanische und koreanische HuBERT Base. Öffnen Sie **Andere → Embedder herunterladen**, um optionale Modelle einzeln zu installieren. Wählen Sie für benutzerdefinierte HuBERT-Assets **Benutzerdefiniert** aus, benennen Sie den Ordner, stellen Sie die passenden Gewichtungen und Konfigurationsdateien (.bin und .json) bereit und installieren Sie sie zusammen.

> Generische HuBERT-Checkpoints sind als Standardencoder für Stimmkonvertierung nicht empfohlen. Sie wurden für Sprachrepräsentationen trainiert und können Merkmale der Klangfarbe der Ausgangsstimme in die Ausgabe übertragen. Verwende den Encoder, den das RVC-Modell erwartet, etwa ContentVec, wenn das Modell damit trainiert wurde.

## Trainingskompatibilität

Die Schulung stellt ContentVec und Spin-v2 vor. Das Ändern des Encoders erfordert neue Funktionen und einen separaten Experimentnamen. Passen Sie Ihr Generator- und Diskriminatorpaar an den Vocoder, die Trainingsabtastrate, die RVC-Generierung und die Tonhöhenkonfiguration an und befolgen Sie die Encoderanforderungen des Paarherausgebers. Ilaria RVC 2.1.0 unterstützt das RefineGAN-Training speziell bei 32 kHz mit RVC V2 und Pitch-Anleitung. Der Downloader kann andere Tarife zur Verwendung an anderer Stelle auflisten.

## Ein G/D-Paar herunterladen

Verwenden Sie unter **Andere → Vorab trainierte Modelle herunterladen** ein Repository oder ein vorab trainiertes Archiv oder geben Sie einen Link zum G-Checkpoint und dem zugehörigen D-Checkpoint ein, wenn die Erkennung Hilfe benötigt. Die Auswahl **Empfohlene vorab trainierte Objekte** zeigt verfügbare Katalogvarianten und deren Abtastraten an. Überprüfen Sie die gewählte Variante, bevor Sie beide Dateien installieren. Kehren Sie zu Training zurück, aktualisieren Sie die Liste und wählen Sie das installierte Paar aus. Wenn Sie absichtlich eine zufällige Initialisierung verwenden, wählen Sie „Keine“. Halten Sie Inferenzmodelle und Trainings-Pretrains getrennt.

Wenn das Training unmittelbar nach der Auswahl eines Paares beendet wird, überprüfen Sie beide Dateien und die gespeicherte Experimentkonfiguration, bevor Sie die Stapelgröße ändern oder einen neuen Lauf starten.
