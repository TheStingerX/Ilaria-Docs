---
label: "Nutzung und Fehlerbehebung"
icon: ":microphone:"
order: 98
permalink: /ilaria-rvc/mangio/usage/
---

# Mangio RVC Fork · Nutzung und Fehlerbehebung

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Geprüfte Version](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Veraltete Software · Nicht empfohlen
Der Hauptbranch von **Mangio RVC Fork** ist seit Jahren inaktiv. Die Software ist veraltet und für Neuinstallationen nicht empfohlen. [Anleitungen nach Anwendung](../../app-guides.md)
!!!

## Erste Konvertierung

Lege den Inferenz-Checkpoint in `weights` und aktualisiere die Modellliste. Wähle ihn unter Model Inference aus und gib den Pfad einer kurzen reinen Sprachaufnahme ein. Beginne mit Transposition 0. Wenn du den passenden Index hast, vergleiche eine niedrige Retrieval-Rate mit einem Test bei 0. Halte Audiodatei und Checkpoint konstant.

## Tonhöhenerkennung und Hybridmodus

Beginne mit RMVPE, falls verfügbar. Vergleiche `mangio-crepe` und `mangio-crepe-tiny` mit demselben Ausschnitt. Die Schrittweite gilt bei der Inferenz für diese Varianten. Kleinere Schritte erhöhen die Analysefrequenz und können die Verarbeitung verlängern. Die CLI des Tags nutzt ein Pluszeichen, etwa `hybrid[pm+crepe]`, und kombiniert Schätzungen per Median. Vergleiche mit einem einzelnen Extraktor. CREPE- oder Hybridoptionen im Training gelten als experimentell.

[Installation](installation.md)
