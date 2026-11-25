---
label: "Safetensors ↔ PTH Konverter"
icon: ":repeat:"
order: 88
permalink: /ilaria-rvc/safetensors-converter/
description: "Einfacher, ausführlicher Guide zum Safetensors- und PTH-Konverter unter Other in Ilaria RVC, inklusive Erhalt der RVC-Metadaten und Move .pth to models."
---
# Safetensors ↔ PTH Konverter

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Ab **Ilaria RVC 2.4.5** bietet der Tab **Other** den Bereich **Convert model weights** einen eingebauten Konverter, um `.pth`-Stimmenmodelle in `.safetensors` umzuwandeln und `.safetensors` wieder zurück in `.pth`.

---

## ONNX-Export und Wiederherstellung (2.5.1)

Wähle unter **Other → Convert model weights** ein installiertes Modell oder eine Datei. Exportiere ein RVC-HiFi-GAN-Modell mit Pitch-Führung als ONNX für einen kompatiblen externen Client. Die exakte Wiederherstellung als `.pth` ist bei ONNX-Dateien verfügbar, die Ilaria RVC exportiert hat. Bewahre bei anderen Exportern die ursprüngliche `.pth`-Datei auf. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## 1. Was sind `.pth` und `.safetensors`? (Einfach erklärt)

Bei KI-Stimmenmodellen begegnen dir meistens `.pth`-Dateien und manchmal `.safetensors`:

- **`.pth` (PyTorch-Format):** Das klassische RVC-Format. Es speichert sowohl die Gewichte des neuronalen Netzes **als auch** die RVC-Stimmkonfiguration (Abtastrate, Pitch-Guidance, RVC-Version, Embedder). Da es auf Python `pickle` basiert, schränkt modernes PyTorch (`2.6+`) das Laden aus Sicherheitsgründen ein.
- **`.safetensors` (SafeTensors-Format):** Ein modernes Format von Hugging Face, das Gewichte **ohne ausführbaren Code** speichert. Dadurch ist es deutlich sicherer zum Teilen und Herunterladen.

**Wozu konvertieren?**
- **`.pth` → `.safetensors`**, wenn du dein Modell sicherer archivieren oder teilen willst, ohne RVC-Einstellungen zu verlieren.
- **`.safetensors` → `.pth`**, wenn du ein `.safetensors`-Modell geladen hast und eine `.pth`-Datei für die **Inferenz** in Ilaria RVC brauchst.

---

## 2. So funktioniert der Konverter in Ilaria RVC

Unter **Other → Convert model weights** läuft alles sicher auf der **CPU** (kein VRAM nötig):

- **Automatische Ersteinrichtung:** Fehlt `safetensors`, lädt Ilaria RVC beim ersten Aufruf automatisch `safetensors==0.8.0` nach `assets/weight_converter/dependencies` (Internet nur beim allerersten Mal nötig).
- **Erhalt der RVC-Metadaten:** Beim Export `.pth` → `.safetensors` werden die RVC-Einstellungen im Metadaten-Feld `ilaria_rvc_checkpoint` gesichert. Beim Zurückwandeln in `.pth` wird alles wiederhergestellt, sodass die Stimme sofort in der Inferenz läuft.
- **Reine Tensor-Dateien:** Stammt eine `.safetensors` aus einem Tool ohne RVC-Metadaten, entsteht eine reine Gewichts-`.pth` ohne Stimmkonfiguration (nicht direkt per **Move .pth to models** nutzbar).
- **Trainings-Checkpoints gesperrt:** Rohe Checkpoints (`G_*.pth` / `D_*.pth` aus `logs/`) lassen sich hier nicht konvertieren. Exportiere zuerst das fertige Modell.

---

## 3. Schritt-für-Schritt: `.pth` ↔ `.safetensors` konvertieren

1. Öffne **Other** und klappe **Convert model weights** auf.
2. Ziehe deine `.pth`- oder `.safetensors`-Datei in **Choose or drop a .pth or .safetensors file**.
3. Klicke auf **Convert weights**.
4. Verfolge **Conversion Log** (`5% | Preparing Safetensors...` → `10% | Reading weights on CPU...` → fertig).
5. Lade die neue Datei unter **Download converted weights** herunter.

### **Move .pth to models** nutzen (`.safetensors` → `.pth`)
Wenn du eine `.safetensors`-Stimme (mit RVC-Metadaten) in `.pth` umgewandelt hast:
1. Klicke einfach auf **Move .pth to models**.
2. Ilaria RVC prüft, ob `config`, `weight` und `emb_g.weight` vorhanden sind, und verschiebt die Datei direkt in `models/`.
3. Wechsle zu **Inference**, klicke **Refresh** und die Stimme ist einsatzbereit.

!!!tip
**Wird ein vorhandenes Modell überschrieben?**
Nein. Liegt in `models/` bereits eine `.pth` mit demselben Namen, bricht **Move .pth to models** sicherheitshalber ab und meldet dies.
!!!

---

## 4. Häufige Meldungen & Lösungen

| Meldung im Conversion Log | Bedeutung | Lösung |
| --- | --- | --- |
| `Could not download Safetensors. Check your internet connection and retry.` | Die erste Installation von `safetensors` schlug fehl (offline oder VPN/Firewall). | Internet verbinden (oder VPN/Firewall kurz pausieren) und einmal **Convert weights** klicken. Danach klappt es offline. |
| `This checkpoint contains training state or unsupported metadata. Export a voice model first.` | Du hast einen rohen `G_*.pth`- oder `D_*.pth`-Checkpoint statt eines fertigen Modells gewählt. | Nutze zuerst die **Export**-Funktion deines Experiments und konvertiere dann die exportierte `.pth`. |
| `This .pth contains only weights or is missing required RVC data.` | Du hast **Move .pth to models** für eine reine Gewichts-`.pth` ohne RVC-Metadaten geklickt. | Nur vollständige RVC-`.pth`-Dateien mit Stimmkonfiguration können direkt nach `models/` verschoben werden. |
| `A model named ... already exists.` | Eine `.pth` mit demselben Namen existiert bereits in `models/`. | Benenne die Datei um oder sichere bzw. entferne das alte Modell in `models/`. |
