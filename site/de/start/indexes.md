# RVC Index-Dateien & Feature Retrieval (`.index`)

Wenn du ein RVC-Stimmenmodell herunterlädst oder trainierst, siehst du meist zwei Dateien: eine `.pth`-Datei und eine `.index`-Datei. Während die `.pth`-Datei zwingend nötig ist, wird die `.index`-Datei oft falsch verstanden.

Dieser Guide erklärt, was eine `.index`-Datei wirklich tut, den wichtigen Unterschied zwischen `added_*.index` und `trained_*.index`, wie du **Index Rate** einstellst, wann du sie senken solltest und was bei fehlender Datei zu tun ist.

---

## 1. Was ist eine `.index`-Datei (Feature Retrieval)?

Eine RVC-Stimmkonvertierung besteht aus zwei Hauptteilen:
1. **Die `.pth`-Datei (der Generator):** Das neuronale Netz, das gelernt hat, Sprachmerkmale in die Klangfarbe der Zielstimme zu verwandeln.
2. **Die `.index`-Datei (die Merkmals-Datenbank):** Ein **FAISS-Vektorindex**, der die echten akustischen Merkmalsvektoren speichert, die der [Embedder](embedders.md) (z. B. `contentvec`) aus jedem Clip des Trainings-Datasets extrahiert hat.

Während der Konvertierung vergleicht **Feature Retrieval** jedes kurze Stück deiner Eingabestimme mit der `.index`-Datenbank, sucht die ähnlichsten Stellen aus den Originalaufnahmen des Sprechers und mischt sie vor dem `.pth`-Generator hinzu.

**Einfach gesagt:**
- Die `.pth` ist der **Motor** (Pflicht).
- Die `.index` ist eine **Referenzbibliothek der echten Stimmgewohnheiten** (optional): Atemzüge, Vokalfarbe, leichtes Kratzen und Betonungsfeinheiten, die eine `.pth` allein manchmal glättet.

!!!tip
**Kompatibilität:**
Ein `.pth`-Modell funktioniert problemlos **ohne** `.index`-Datei (`Index Rate = 0`). Fehlt bei einem Download die `.index`-Datei, kannst du das Modell trotzdem ganz normal nutzen.
!!!

---

## 2. `added_*.index` vs `trained_*.index`

Beim Erstellen des Index in `logs/<Experimentname>/` legt RVC meist zwei `.index`-Dateien an:

| Dateiname | Inhalt | Solltest du sie nutzen? |
| --- | --- | --- |
| **`added_*.index`** | Der vollständige FAISS-Index **inklusive aller hinzugefügten Dataset-Vektoren** (z. B. `added_IVF256_Flat_nprobe_1_MeineStimme_v2.index`). | **JA. Immer diese nutzen** für Inferenz und zum Teilen. |
| **`trained_*.index`** | Nur die vorläufige Cluster-Struktur, bevor die eigentlichen Dataset-Vektoren eingefügt wurden. | **NEIN.** Weder auswählen noch weitergeben; liefert schwache oder leere Ergebnisse. |

Wenn du ein Modell teilst oder exportierst (z. B. mit **Export model ZIP** in Ilaria RVC), kombiniere die `.pth` immer mit **`added_*.index`**, niemals mit `trained_*.index`.

---

## 3. So stellst du `Index Rate` (`0` bis `1.0`) richtig ein

Der Regler **Index Rate** (manchmal *Search Feature Ratio* oder *Retrieval Ratio*) steuert, wie stark die `.index`-Datenbank das Ergebnis an die exakten Aufnahmen des Trainings-Datasets zieht:

| Index Rate | Wirkung auf die Stimme | Bester Einsatzbereich |
| --- | --- | --- |
| **`0.0` (Aus)** | 100 % `.pth`-Gewichte, 0 % `.index`. | Sauberste Aussprache, geringste CPU-Last, idealer Startwert für Tests, Live Voice Changer und gemischte Modelle. |
| **`0.25 - 0.50`** | Fügt dezente Stimmtextur hinzu, erhält aber deine Aussprache und dein Tempo. | **Sprache**, **Fremdsprachen-Konvertierung** (z. B. Deutsch auf einem englischen/japanischen Modell) oder leicht verrauschte Datasets. |
| **`0.60 - 0.75`** | Starke Ähnlichkeit und Natürlichkeit, ohne die Eingabe zu überdecken. | **Empfohlener Standard** für sauberen Gesang und Sprache in derselben Sprache. |
| **`0.85 - 1.00`** | Maximales Retrieval; zwingt Merkmale maximal nah an das Dataset. | Nur für makellose Studio-Datasets in derselben Sprache. Hohes Risiko für nuschelige Wörter oder Dataset-Rauschen. |

---

## 4. Wann du `Index Rate` senken oder abschalten solltest

Ein höherer Wert Richtung `1.0` macht eine Stimme **nicht** automatisch besser. Senke **Index Rate** auf `0.2 - 0.4` (oder `0`), sobald du merkst:

1. **Hintergrundrauschen, Knistern oder Hall kehrt zurück:** Da `.index` direkt aus den Trainingsaufnahmen schöpft, wird jedes Rauschen oder jeder Raumhall des Datasets wieder beigemischt.
2. **Verschluckte Wörter oder fremder Akzent:** Sprichst du eine andere Sprache als im Dataset, drückt ein hoher Index Rate fremde Vokale und Konsonanten auf deine Stimme.
3. **Gemischte Modelle (Voice Blender):** Das Mischen zweier `.pth`-Modelle im [Voice Blender](../ilaria-rvc/manage/voice-blender.md) erzeugt **keine** neue `.index`. Teste gemischte Modelle immer zuerst mit `Index Rate = 0`.
4. **Ruckler im Live Voice Changer:** Das Durchsuchen eines großen FAISS-Index pro Audio-Chunk kostet CPU-Leistung. Niedrigeres oder deaktiviertes `Index Rate` senkt Latenz und Aussetzer.

---

## 5. Kompatibilitätsregeln (Warum `.index`-Dateien nicht gemischt werden dürfen)

Eine `.index`-Datei ist fest an das **exakte Modell** und den **Embedder** gebunden:

- **Gleiche Dimension / RVC-Version:** Ein `v1`-Modell nutzt **256 Dimensionen** (`3_feature256`), ein `v2`-Modell **768 Dimensionen** (`3_feature768`). Das Mischen von `v1` und `v2` führt zu Dimensionsfehlern.
- **Gleicher Embedder:** Ein mit `contentvec` erstellter Index passt nicht zu einem Modell mit anderem Encoder.
- **Gleicher Sprecher:** Die `.index` von Stimme A mit der `.pth` von Stimme B zu kombinieren ergibt **keinen** sauberen Voice-Mix, sondern füttert den Decoder mit falschen Merkmalen.

---

## 6. Fehlende `.index`-Datei neu erzeugen

### Fall A: Du hast nur eine heruntergeladene `.pth`-Datei
Aus einer reinen `.pth`-Datei lässt sich **kein** echter `.index` wiederherstellen. Der Index entsteht aus den extrahierten Merkmalsvektoren (`.npy`) der Trainingsaufnahmen, die in einer exportierten `.pth` nicht enthalten sind. Setze einfach **Index Rate = 0** und nutze die `.pth` allein.

### Fall B: Du hast selbst trainiert und besitzt noch `logs/<Experimentname>/`
Solange der Ordner noch die extrahierten Features (`3_feature256` oder `3_feature768`) enthält, kannst du den Index in Sekunden ohne Neutraining neu bauen:
1. Öffne den Tab **Train** in Ilaria RVC (oder Applio / RVC Mainline).
2. Gib exakt denselben **Experimentnamen**, **RVC-Version (`v1`/`v2`)**, **Sample Rate** und **Embedder** ein.
3. Klicke nur auf **Train Feature Index** (ohne Preprocessing oder Modell-Training neu zu starten).
4. Danach liegt die neue **`added_*.index`** in `logs/<Experimentname>/`.

### Fall C: Index-Erstellung stürzt wegen RAM / Pagefile ab
Sehr große Datasets (tausende Clips) brauchen beim FAISS-Clustering viel Arbeitsspeicher. Bricht der Vorgang mit `WinError 1455` ab oder friert Windows ein, schließe andere Programme, vergrößere den **Virtuellen Arbeitsspeicher (Pagefile)** (siehe [Fehlerbehebung](../reference/troubleshooting.md)) oder kürze redundante Clips.
