---
label: "Stimmen trainieren (.cvc)"
icon: ":mortar_board:"
order: 97
permalink: /non-rvc/causal-voice-changer/training/
description: "Beim Erstellen einer Stimme in Causal Voice Changer wird der Basis-Decoder auf dein Ziel-Audio feinabgestimmt. Anders als bei älteren Tools musst du..."
---
# Eine Stimme in CVC trainieren

Beim Erstellen einer Stimme in Causal Voice Changer wird der Basis-Decoder auf dein Ziel-Audio feinabgestimmt. Anders als bei älteren Tools **musst du Audiodateien weder schneiden noch Stille manuell entfernen**, und die Aufnahmen dürfen eine **beliebige Sample-Rate** haben.

> **Lizenzhinweis**: Stimmen, die auf dem enthaltenen Basismodell trainiert wurden, dürfen nicht kommerziell genutzt werden.

## 1. Audio vorbereiten

- Sammle saubere Aufnahmen **eines einzelnen Sprechers** (ohne Hintergrundmusik, starken Hall oder überlappende Stimmen).
- Du kannst eine **einzelne Audiodatei** oder einen **Ordner** mit mehreren Dateien angeben.
- Kein manuelles Schneiden oder Resampling nötig - CVC erledigt das automatisch.

## 2. Mit dem Training-Fenster trainieren (Einsteiger-Methode)

1. Starte **`run-training.bat`** (Windows) oder **`run-training.sh`** (Linux).
2. Fülle das Formular aus:
   - **Dataset path**: Audiodatei oder Ordner auswählen.
   - **Model name**: kurzer Name ohne Sonderzeichen (z. B. `meinestimme`).
   - **Batch size**: Standard **`8`** (verringern, falls der GPU-Speicher knapp wird).
   - **Steps**: Standard **`10.000` Steps** (dauert auf einer RTX 4080 ca. **35 Minuten**).
   - **Save every**: Intervall für `.cvc`-Checkpoints (Standard `10.000`).
   - **Custom base** *(optional)*: aktivieren, um statt der Standard-EARS-Basis ein eigenes Basismodell aus `custom-base/` zu nutzen.
3. Klicke auf **Start**.
4. Du kannst jederzeit **Stop** klicken (oder das Fenster schließen) - CVC speichert einen Checkpoint, sodass du später mit demselben Modellnamen **fortsetzen** kannst.

## 3. Über die Kommandozeile trainieren (Optional)

```bash
uv run python -m causalvc.build --name NAME --audio /pfad/ordner-oder-datei
```

Nützliche Optionen:
- `--save-every N`: alle `N` Steps einen Checkpoint speichern.
- `--app-models DIR`: jede gespeicherte Stimme automatisch in den `models/`-Ordner einer Realtime-App kopieren.
- `--base WERT`: `default`, Ordnername in `custom-base/` oder Pfad zu einem Basismodell.

## 4. `.cvc`-Stimmdateien verstehen & teilen

Jeder gespeicherte Checkpoint ist eine einzelne, eigenständige **`.cvc`**-Datei unter:
```text
runs/models/voice-NAME/voices/NAME-STEPs.cvc
```

Eine `.cvc`-Datei enthält alles für diese Stimme (neue Stimmen bringen ihren **Index** direkt in der `.cvc` mit, ca. 12 MB größer). Nichts ist an den Trainings-PC gebunden.

### Eine `.cvc`-Stimme in Realtime laden

- Ziehe die `.cvc`-Datei per **Drag-and-Drop** direkt ins **CausalVC Realtime**-Fenster, **oder**
- Kopiere sie nach `realtime/models/` und klicke in der App auf **Reload**.

### Exportieren, alte Stimmen konvertieren & Index hinzufügen

- **Stimme exportieren**: Klicke auf der Seite **Library** auf **Export**, um eine installierte Stimme samt Pitch- und Gain-Einstellungen wieder als `.cvc` zu speichern.
- **Alte Ordner-Stimmen konvertieren**:
  ```bash
  python -m causalvc.voice cvc ORDNER
  ```
  oder mit dem eigenständigen Skript `scripts/convert_to_cvc.py`.
- **Index zu einer älteren `.cvc`-Datei hinzufügen**:
  ```bash
  python -m causalvc.index STIMME.cvc --audio /pfad/trainings-audio
  ```
