# RVC-Modelle in Redpanda-vc trainieren - EMA & Schrittbasiertes Speichern

[Redpanda-vc auf GitHub](https://github.com/redpanda343/Redpanda-vc) · [Redpanda-vc einrichten](first-run.md) · [Redpanda-vc vs. andere RVC-Versionen](differences.md) · [Allgemeine RVC-Trainingsanleitung](../../model-training/training.md)

Beim Trainieren eines Stimmmodells lernt ein Programm, eine Zielstimme aus einer Sammlung sauberer Audioclips nachzubilden. Wenn du neu bei RVC bist, musst du vor dem Start keinen Fachjargon auswendig lernen. Hier sind die wichtigsten Begriffe verständlich erklärt:

- **Weights (Gewichte):** Die internen Zahlen im Modell, die sich Schritt für Schritt anpassen, während es eine Stimme lernt.
- **Generator (`G`):** Der Teil des Modells, der das konvertierte Stimmaudio tatsächlich erzeugt.
- **Discriminator (`D`):** Ein Hilfsnetz, das nur während des Trainings verwendet wird, um zu beurteilen, wie realistisch das Audio des Generators im Vergleich zu den echten Aufnahmen klingt.
- **Optimizer:** Die mathematische Komponente, die die Modellgewichte nach jedem Trainingsschritt aktualisiert.
- **Step (Schritt):** Eine einzelne Gewichtsaktualisierung nach der Verarbeitung einer kleinen Gruppe (**Batch**) von Audioclips.
- **Epoch (Epoche):** Ein vollständiger Durchlauf durch dein gesamtes vorbereitetes Dataset.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Ein gespeicherter Trainingsstand, um das Training zu pausieren und später fortzusetzen.
- **EMA (Exponential Moving Average):** Ein geglätteter, laufender Durchschnitt der Generatorgewichte, der während des Trainings geführt wird.

> EMA hilft dabei, Schwankungen der Generatorgewichte während des Trainings zu glätten. Statt nur die allerletzten Generatorgewichte zu exportieren, kann Redpanda-vc einen laufenden Durchschnitt davon exportieren.

Training erzeugt nicht sofort eine fertige Stimme, und die Endqualität hängt stark von deinen Quellaufnahmen, der Dataset-Vorbereitung und den Trainingseinstellungen ab. Bevor du beginnst, denke daran, was EMA **nicht** tut:

- EMA ist **kein** Audiofilter oder Entrauscher.
- EMA bearbeitet oder bereinigt **nicht** deine Dataset-Dateien.
- EMA repariert **keine** übersteuerten oder verrauschten Aufnahmen.
- EMA garantiert **nicht** bei jeder Stimme eine bessere Audioqualität.
- EMA entfernt **nicht** jede Zufälligkeit aus dem Training.

---

## Was ist EMA?

Stell dir einen Schüler vor, der übt, ein schwieriges Wort auszusprechen. Ein einzelner Versuch kann etwas klarer oder etwas rauer klingen als der direkt davor. Betrachtet man den Trend über viele jüngste Versuche hinweg, erhält man ein ruhigeres Bild vom Fortschritt des Schülers, als wenn man nur nach dem allerletzten Versuch urteilt.

*(Bedenke, dass dies nur eine Analogie ist: EMA hört kein Audio, bewertet keine Aussprache und wählt nicht selbstständig "bessere" Aufnahmen aus.)*

### Wie Redpanda-vc EMA tatsächlich ausführt

In `rvc/train/train.py` hält Redpanda-vc EMA während des Trainings im Arbeitsspeicher:

1. Der Generator trainiert normal auf jedem Batch.
2. Der Optimizer aktualisiert die Live-Gewichte des Generators.
3. Unmittelbar nach jedem Optimizer-Schritt des Generators (auf Rank `0`) aktualisiert `GeneratorEMA.update()` eine separate gemittelte Kopie der Generatorgewichte (ohne `enc_q`, das nur während des Trainings verwendet wird).
4. Dieser laufende Durchschnitt bleibt im Speicher und wird im `G`-Trainingscheckpoint gespeichert.
5. Wenn EMA aktiviert ist (`Generator EMA Decay > 0`), exportiert Redpanda-vc Inferenz-`.pth`-Modelle aus diesen EMA-Gewichten statt aus den rohen Live-Generatorgewichten.

**EMA aktualisiert sich bei jedem Trainingsschritt, nicht einmal pro Epoche.** Redpanda-vc mittelt **nicht** mehrere bereits auf der Festplatte gespeicherte `.pth`-Dateien; es führt einen einzigen fortlaufenden Durchschnitt im Speicher während des Trainings.

<details>
<summary>Optionale Mathe-Details: Standard-EMA vs. bias-korrigierte Formel von Redpanda-vc</summary>

Die intuitive Standard-EMA-Aktualisierung lautet:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

In `rvc/train/train.py` (`GeneratorEMA.update()`, Zeilen 199-205) wendet Redpanda-vc keinen konstanten Decay ab der allerersten Aktualisierung an. Stattdessen berechnet es einen bias-korrigierten effektiven Decay basierend auf der Anzahl der Aktualisierungen (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

wobei `beta` deine Einstellung `ema_decay` ist. Diese Aufwärmkorrektur verringert den Einfluss der Anfangsgewichte bei den frühesten Aktualisierungen und nähert sich `beta`, wenn `updates` wächst. Gleitkomma-Parameter werden über `torch._foreach_lerp_` gemischt, während Nicht-Gleitkomma-Puffer vom Live-Generator kopiert werden.

</details>

---

## Generator EMA Decay verstehen

Unter **Training → Advanced Settings** stellt Redpanda-vc **Generator EMA Decay** bereit (`tabs/train/rvc.py`, Zeilen 809-819):

- **Minimum:** `0`
- **Maximum:** `0.9999`
- **Standard:** `0.999`
- **Reglerschritt:** `0.0001`

### Was die Werte bedeuten

- **`Generator EMA Decay = 0`:** Deaktiviert `GeneratorEMA` vollständig. Inferenz-`.pth`-Modelle werden direkt aus den Live-Generatorgewichten exportiert.
- **`Generator EMA Decay = 0.999` (Standard):** Führt einen exponentiellen laufenden Durchschnitt, der jüngsten Generator-Updates deutliches Gewicht gibt und gleichzeitig Schritt-zu-Schritt-Schwankungen glättet.
- **`Generator EMA Decay = 0.9999`:** Verändert den laufenden Durchschnitt langsamer und mittelt über ein längeres Fenster von Updates. Das kann die Glätte des Durchschnitts erhöhen, lässt die EMA-Gewichte aber auch langsamer auf jüngste Verbesserungen im Live-Generator reagieren.

Niedrigere Werte passen sich schneller an aktuelle Gewichte an, während höhere Werte über mehr Schritte mitteln. `0.9999` ist **nicht** automatisch besser als `0.999`, und es gibt keinen universell "besten" Decay für Sprache, Gesang, kleine Datasets oder große Datasets. Wenn du Anfänger bist, ist der Start beim Standardwert **`0.999`** und das Vergleichen echter Audioausgaben vor dem Feintuning eine sinnvolle Basis.

---

## Warum nutzt Redpanda-vc EMA?

In der Deep-Learning-Literatur (etwa PyTorchs Dokumentation zur Gewichtsmittelung und Morales-Brotons, Vogels und Hendrikx, 2024) wird das Mitteln von Gewichten entlang einer Trainingstrajektorie untersucht, weil einzelne SGD/Adam-Updates um gute Lösungen herum oszillieren können.

### Mögliche Vorteile (keine Garantien)

- Geringere Schritt-zu-Schritt-Oszillation in exportierten Gewichten.
- Höhere Kontinuität zwischen aufeinanderfolgenden Exporten.
- Dämpfung eines Teils der Update-Variabilität während des Trainings.
- Möglicherweise stabileres Verhalten des exportierten Modells, wobei echte Audioverbesserungen auf deinem konkreten RVC-Dataset Hörtests erfordern.

### Wichtige Einschränkungen

- EMA ersetzt **kein** sauberes, gut vorbereitetes Dataset.
- EMA beseitigt **kein** Overfitting.
- EMA verhindert **nicht**, dass ein kaputtes oder instabiles Training fehlschlägt.
- EMA garantiert **keine** höhere Stimmähnlichkeit oder bessere Aussprache.
- EMA verspricht **keine** geringere Zahl an Trainingsschritten oder Epochen.
- EMA ist **kein** automatischer "Bester-Checkpoint"-Wähler.
- EMA hält eine zusätzliche Kopie der Generatorgewichte im Speicher und verursacht pro Schritt einen kleinen Update-Aufwand.

---

## EMA-Gewichte vs. Trainingscheckpoints

In Redpanda-vc existieren während eines Durchlaufs vier verschiedene Dinge. Verwechsle sie nicht:

| Datei / Zustand | Speicherort | Inhalt | Verwendungszweck |
| --- | --- | --- | --- |
| **Generator checkpoint (`G_*.pth`)** | `logs/<model_name>/` | Live-Generatorgewichte, Optimizer-Zustand, Scaler, `iteration` (Epoche), `step`, `epoch_step`, RNG und `ema`-Zustand (wenn aktiv) | Training fortsetzen (und manueller Export) |
| **Discriminator checkpoint (`D_*.pth`)** | `logs/<model_name>/` | Discriminator-Gewichte, Optimizer-Zustand, Scaler, `step` | Training zusammen mit `G_*.pth` fortsetzen |
| **EMA weights** | Im Speicher während des Trainings und in `G_*.pth` (`checkpoint["ema"]["weights"]`) | Laufender Durchschnitt der Generatorgewichte (ohne `enc_q`) | Geglättete Inferenz-`.pth`-Exporte erzeugen |
| **Inferenzmodell (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Kompakte reine Inferenz-Generatorgewichte + Metadaten | Nur Stimmenkonvertierung (**kann Training nicht** fortsetzen) |

**Hinweis:** Im verifizierten Redpanda-vc-Quellcode (`train.py`) wird EMA **nur auf den Generator (`net_g`)** angewendet, niemals auf den Discriminator (`net_d`).

---

## Training Steps vs. Epochs

- **Epoch (Epoche):** Ein vollständiger Durchlauf über das vorbereitete Trainings-Dataset.
- **Batch:** Eine kleine Gruppe von Audio-Schnipseln, die gemeinsam in einem Vorwärts-/Rückwärtsdurchlauf verarbeitet werden.
- **Step (Schritt):** Eine Optimizer-Aktualisierung nach Verarbeitung eines Batches. Ein Schritt ist **weder** eine Audiodatei **noch** eine Sekunde Audio.

### Hypothetisches Beispiel

Angenommen, dein vorbereitetes Dataset und deine `Batch Size` ergeben **100 Schritte pro Epoche**:

- `100` Schritte ≈ `1` Epoche
- `500` Schritte ≈ `5` Epochen
- `1,000` Schritte ≈ `10` Epochen

Das tatsächliche Verhältnis von Schritten pro Epoche hängt von deiner Dataset-Länge, dem Slicing, `Batch Size` und `Max Audio per Batch (sec)` ab. Nimm niemals an, dass 100 Schritte bei jedem Modell 1 Epoche entsprechen.

---

## Schrittbasiertes Speichern von Checkpoints

Statt zu warten, bis eine ganze Epoche endet, plant Redpanda-vc Speicherungen nach **Schrittzahl** (`tabs/train/rvc.py`, Zeilen 663-703; `rvc/train/train.py`, Zeilen 917-921 und 1146-1195):

### Total Steps

- **Standard:** `10000` (Reglerbereich `1` bis `1000000`, Schritt `1`).
- Legt die **gesamte Zielschrittzahl** für das Experiment fest, **nicht** "10,000 weitere Schritte hinzufügen". Steht dein fortgesetztes Modell bereits bei Schritt `10000`, musst du `Total Steps` erhöhen (z. B. auf `15000`), um weiterzutrainieren.

### Save Every X Steps

- **Standard:** `1000` (Reglerbereich `1` bis `100000`, Schritt `1`).
- Speichert `G`- und `D`-Checkpoints alle `X` Trainingsschritte (`self.global_step % save_every_steps == 0`).
- **Beispiel:** Bei `Total Steps = 10000` und `Save Every X Steps = 1000` speichert Redpanda-vc bei den Schritten `1000`, `2000`, `3000`, ..., `10000`, unabhängig davon, ob diese mitten in einer Epoche liegen.

### Final Save

Selbst wenn `Total Steps` kein Vielfaches von `Save Every X Steps` ist (z. B. `Total Steps = 2500` und `Save Every X Steps = 1000`), speichert Redpanda-vc beim Erreichen des letzten Schritts **immer** sowohl die `G`/`D`-Checkpoints als auch ein Inferenz-`.pth`-Modell (`final = self.global_step >= self.args.total_steps`).

### Save Every Weights

- **Standard:** **Aktiviert** (`True`).
- Wenn **aktiviert**, exportiert Redpanda-vc bei jedem Speicherintervall *und* beim letzten Schritt ein Inferenz-`.pth`-Modell.
- Wenn **deaktiviert**, werden `G`/`D`-Checkpoints weiterhin alle `Save Every X Steps` gespeichert, ein automatisches Inferenz-`.pth` wird jedoch nur beim letzten Schritt exportiert.

### Save Only Latest

- **Standard:** **Aktiviert** (`True`).
- Wenn **aktiviert**, überschreiben `G`- und `D`-Checkpoints feste Dateinamen (`G_2333333.pth` und `D_2333333.pth`, wobei `2333333` für `LATEST_CHECKPOINT_SUFFIX` steht), um Speicherplatz zu sparen.
- Wenn **deaktiviert**, enthalten Checkpoints die Schrittnummer (`G_1000.pth`, `D_1000.pth`, `G_2000.pth`, `D_2000.pth`).
- **Wichtig:** `Save Only Latest` betrifft nur `G`/`D`-Trainingscheckpoints, **nicht** exportierte Inferenz-`.pth`-Modelle (sofern du `Save Every Weights` nicht deaktivierst). Beachte, dass du bei aktiviertem `Save Only Latest` kein Training auf einen älteren Zwischenstand (`G`/`D`) zurückrollen kannst, falls ein Lauf später schlechter wird.

---

## Dein erstes RVC-Training in Redpanda-vc

### 1. Vorbereitung

1. Installiere und starte Redpanda-vc (siehe [Redpanda-vc einrichten](first-run.md)).
2. Öffne den Tab **Train** und wähle **RVC** (falls dein Build mehrere Modellfamilien anzeigt).
3. Gib unter **Model Settings** einen eindeutigen **Model Name** (deinen Experimentnamen) ein.
4. Wähle eine kompatible **Sample Rate** (`32k`, `40k` oder `48k`), **Version** (`v1` oder `v2`) und **Vocoder** (`HiFi-GAN`, `MRF HiFi-GAN` oder `RefineGAN`, abhängig von deinen Pretrained-Modellen und der Ziel-Inferenz-App).
5. Bereite ein sauberes, trockenes Dataset aus **autorisierten Aufnahmen** in einem eigenen Ordner vor.

### 2. Preprocess

1. Öffne das Akkordeon **Preprocess**.
2. Gib deinen Dataset-Ordnerpfad unter **Dataset Path** ein oder wähle ihn aus (klicke bei Bedarf auf **Refresh**).
3. Klicke auf **Preprocess Dataset** und warte, bis das Audio in `logs/<model_name>/` zugeschnitten und normalisiert wurde.

### 3. Extract

1. Öffne das Akkordeon **Extract**.
2. Wähle deinen **Pitch extraction algorithm** (etwa `rmvpe`) und **Embedder Model** (üblicherweise `contentvec`).
3. Klicke auf **Extract Features**. *(Das bereitet Pitch- und Inhaltsmerkmale fürs Training vor; es trainiert noch **nicht** die `.pth`-Gewichte.)*

### 4. Training

1. Öffne das Akkordeon **Training**.
2. Setze **Batch Size** auf einen Wert, den der VRAM deiner GPU problemlos verkraftet.
3. Für einen ersten anschaulichen Test kannst du die aktuellen Standardwerte belassen:
   - **Total Steps:** `10000`
   - **Save Every X Steps:** `1000`
4. Klappe **Advanced Settings** aus und prüfe:
   - **Save Only Latest:** Aktiviert (`True`)
   - **Save Every Weights:** Aktiviert (`True`)
   - **Generator EMA Decay:** `0.999`
   *(Diese Standardwerte sind anschauliche Startwerte, keine garantierten Optimalwerte für jedes Dataset.)*
5. Klicke auf **Start Training**.
6. Beobachte den Fortschritt über den Terminal-/UI-Status, **Pause Training** / **Resume Training** / **Stop Training** sowie TensorBoard-Logs (`logs/<model_name>/eval/`).
7. Klicke nach Abschluss auf **Generate Index**, wenn du eine passende `.index`-Datei möchtest.

### 5. Ausgabedateien

In `logs/<model_name>/` findest du:

- **Fortsetzbare Checkpoints:** `G_2333333.pth` und `D_2333333.pth` (bei aktiviertem **Save Only Latest**) oder `G_<step>.pth` / `D_<step>.pth` (wenn deaktiviert).
- **Inferenzmodelle:** `<model_name>_<epoch>e_<step>s.pth` (zum Beispiel `MyVoice_45e_1000s.pth`). Diese Dateien lädst du zur Stimmenkonvertierung.

---

## Training sicher fortsetzen

Wenn du das Training eines bestehenden Experiments neu startest (`rvc/train/train.py`, Zeilen 420-436, 528-538, 763-803, 844-853):

1. `latest_checkpoint_pair()` durchsucht `logs/<model_name>/` nach der neuesten `G_*.pth` anhand des Änderungsdatums und paart sie mit dem passenden `D_*.pth`-Suffix. **Sowohl `G`- als auch `D`-Dateien müssen vorhanden sein**, um fortzusetzen.
2. `restore()` lädt `epoch`, `start_batch` (`epoch_step`), `global_step` (`step`), AMP `scaler`, RNG-Zustand und beide Optimizer neu.
3. `build_ema()` stellt `GeneratorEMA` aus `checkpoint["ema"]` wieder her, wenn `ema_decay > 0`. Fehlt der `ema`-Zustand oder ist inkompatibel (z. B. beim Fortsetzen eines Checkpoints ohne EMA), protokolliert Redpanda-vc einen Hinweis und initialisiert EMA aus den fortgesetzten Generatorgewichten, statt abzustürzen.
4. Alle Schritte, die *nach* dem letzten gespeicherten Checkpoint vor einem Absturz oder manuellen Stopp abgeschlossen wurden, gehen verloren und werden ab diesem gespeicherten Schritt erneut ausgeführt.

### Regler, die nicht verwechselt werden sollten

- **Reset Optimizer State:** Behält deine Modellgewichte, `global_step` und den Lernraten-Zeitplan bei, löscht aber die Momentum-/Moment-Puffer des Optimizers (`state={}`). Nur verwenden, wenn du die Optimizer-Dynamik gezielt zurücksetzen willst; beim normalen Fortsetzen bleibt dies **OFF**.
- **Fresh Training (`--cleanup`):** **Löscht** alle zuvor erzeugten `G_*`- und `D_*`-Checkpoints, `spec.pt`-Dateien und TensorBoard-Logs dieses Experiments. Beim Fortsetzen immer **OFF** lassen.
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** steuert, wie oft Checkpoints auf die Festplatte geschrieben werden. **Checkpointing** (in **Advanced Settings**) ist **Activation Checkpointing**, das langsamere Trainingsgeschwindigkeit gegen geringeren VRAM-Verbrauch auf GPUs mit wenig Speicher eintauscht (es steuert nicht das Speichern auf Festplatte).

---

## Wie Redpanda-vc EMA-Modelle exportiert

1. **Automatische Exporte während des Trainings (`train.py`, Zeilen 1090-1091 & 1157-1163):** Immer wenn `save()` einen Inferenzexport auslöst (`Save Every Weights` oder letzter Schritt), liefert `export_state_dict()` `self.ema.weights`, wenn EMA aktiviert ist (`ema_decay > 0`), oder das `state_dict()` des Live-Generators, wenn EMA deaktiviert ist (`ema_decay = 0`).
2. **Manuelle Exporte (Akkordeon `Export Model` -> `rvc/train/process/checkpoint_exporter.py`, Zeilen 44-117):** Du kannst jeden fortsetzbaren `G_*.pth`-Checkpoint manuell in `fp16` oder `fp32` exportieren. `export_generator_checkpoint()` prüft, ob `checkpoint["ema"]["weights"]` existiert, und nutzt diese EMA-Gewichte automatisch, wenn vorhanden (mit der Statusmeldung `... and the generator EMA`).
3. Es gibt **keinen** separaten "Raw vs. EMA"-Schalter im WebUI-Exporter; die exportierte `.pth` ist nur für die Inferenz gedacht, während `G_*.pth` + `D_*.pth` weiterhin zum Fortsetzen des Trainings benötigt werden.

---

## Klingt EMA tatsächlich besser?

Darauf gibt es keine pauschale Ja-oder-Nein-Antwort für alle Stimmen und Datasets. Da die aktuelle WebUI nicht sowohl Raw- als auch EMA-Versionen nebeneinander aus einem einzigen Lauf exportiert, ist ein kontrollierter Vergleich der sauberste Weg, EMA zu testen:

1. Verwende exakt dasselbe vorbereitete Dataset und dieselbe Merkmalsextraktion.
2. Halte `Batch Size`, `Total Steps`, Lernraten-Zeitplan und Pretrained-Gewichte identisch.
3. Starte ein Experiment mit `Generator EMA Decay = 0.999` und eines mit `0`.
4. Vergleiche Inferenz-`.pth`-Exporte bei **derselben Schrittzahl** (z. B. `5000s` vs. `5000s`) anhand von Testclips außerhalb des Trainingssets.
5. Achte beim Hören auf Stimmähnlichkeit, Klarheit von Konsonanten, Tonhöhenstabilität und Artefakte, statt nur nach TensorBoard-Verlustkurven zu urteilen.

---

## Fehlerbehebung für Einsteiger

| Problem | Mögliche Ursache | Was prüfen | Lösung |
| --- | --- | --- | --- |
| **Training startet nicht** | Fehlende vorverarbeitete/extrahierte Dateien, falscher Pfad oder aktive Lauf-Sperre (`training_state.json`) | Terminalausgabe auf ersten Fehler prüfen | Schließe zuerst **Preprocess Dataset** und **Extract Features** ab und stelle sicher, dass kein Lauf aktiv ist |
| **GPU-Speicher voll (OOM)** | `Batch Size` zu hoch oder `Cache Dataset in GPU` bei begrenztem VRAM aktiviert | VRAM-Nutzung und Terminalfehler prüfen | Senke **Batch Size**, deaktiviere **Cache Dataset in GPU** oder aktiviere **Checkpointing** |
| **EMA scheint Ergebnisse nicht zu ändern** | Wenige Schritte, Decay nahe `0` oder Vergleich verschiedener Schritte | `Generator EMA Decay` und Konsolen-Startzusammenfassung prüfen | Bestätige, dass `generator EMA <value>` beim Start erscheint, und vergleiche Exporte desselben Schritts an externen Clips |
| **EMA Decay steht auf `0`** | Regler auf `0` gestellt | Prüfe **Training → Advanced Settings → Generator EMA Decay** | Setze auf `0.999` (Standard), wenn EMA beim nächsten Lauf aktiv sein soll |
| **Keine Zwischen-Inferenz-`.pth`-Modelle** | **Save Every Weights** ist deaktiviert | Prüfe **Training → Advanced Settings → Save Every Weights** | Aktiviere **Save Every Weights**, um bei jedem `Save Every X Steps` Inferenzmodelle zu exportieren |
| **Nur die neuesten `G`/`D`-Checkpoints vorhanden** | **Save Only Latest** ist aktiviert (Standard) | Prüfe `logs/<model_name>/` auf `G_2333333.pth` / `D_2333333.pth` | Deaktiviere **Save Only Latest** vor dem Training, wenn du nummerierte `G_<step>.pth`-Historie willst |
| **`G`- oder `D`-Checkpoint fehlt** | Eine Datei wurde manuell gelöscht oder verschoben | Prüfe `logs/<model_name>/` auf passendes `G_*`- und `D_*`-Paar | Sowohl `G` als auch `D` mit demselben Suffix sind zum Fortsetzen nötig (`latest_checkpoint_pair()`) |
| **Training startet von früherem Schritt neu** | Stopp oder Absturz vor dem nächsten `Save Every X Steps` | Letzten Konsolenschritt mit fortgesetztem Schritt vergleichen | Normales Verhalten: Fortschritt nach der letzten Festplattenspeicherung wird erst beim nächsten Intervall gesichert |
| **Hinweis/Fehler beim Wiederherstellen von EMA** | Fortsetzen eines Checkpoints ohne EMA oder abweichende Modellkonfig | Lies `"Could not restore the generator EMA..."` im Terminal | Redpanda-vc startet EMA automatisch ab den fortgesetzten Generatorgewichten |
| **Fresh Training hat alte Checkpoints gelöscht** | **Fresh Training** (`--cleanup`) blieb angehakt | Prüfe `logs/<model_name>/` | Hake **Fresh Training** beim Fortsetzen ab; gelöschte Checkpoints lassen sich ohne Backup nicht wiederherstellen |
| **Total Steps bereits erreicht** | `global_step >= Total Steps` | Lies `"already reached step X. Raise the total steps..."` im Terminal | Erhöhe **Total Steps** über den aktuellen Schritt und klicke auf **Start Training** |
| **Exportierte `.pth` kann Training nicht fortsetzen** | Inferenz-`.pth` statt `G_*.pth` + `D_*.pth` geladen | Dateiname prüfen (`<name>_Xe_Ys.pth` vs. `G_*.pth`) | Inferenz-`.pth`-Dateien entfernen den Trainingszustand; setze aus `logs/<model_name>/` mit `G_*.pth` und `D_*.pth` fort |
| **Unerwartet hohe VRAM-Nutzung** | **Checkpointing** deaktiviert, hohe **Batch Size** oder **Cache Dataset in GPU** an | **Advanced Settings** prüfen | Aktiviere **Checkpointing** (Activation Checkpointing), schalte **Cache Dataset in GPU** aus und reduziere **Batch Size** |

---

## FAQ

**Was bedeutet EMA?**
Exponential Moving Average: ein laufender Durchschnitt der Generatorgewichte, der während des Trainings geführt wird.

**Verbessert EMA die Stimmqualität?**
Es kann Gewichtsschwankungen glätten, ist aber keine Garantie. Ob eine bestimmte Stimme besser klingt, hängt von deinem Dataset ab und erfordert Hörtests.

**Sollten Einsteiger EMA auf `0.999` lassen?**
Ja, `0.999` ist der Standard in Redpanda-vc und ein sinnvoller Ausgangspunkt, bevor man mit anderen Werten experimentiert.

**Was passiert, wenn EMA Decay `0` ist?**
EMA ist deaktiviert (`self.ema` wird nicht erstellt) und Inferenzmodelle werden aus den Live-Generatorgewichten exportiert.

**Ist `0.9999` besser als `0.999`?**
Nicht automatisch. `0.9999` mittelt über eine längere Historie und reagiert langsamer auf aktuelle Updates.

**Macht EMA das Training schneller?**
Nein. EMA führt eine zusätzliche Gewichtskopie und erledigt nach jedem Generatorschritt einen Update-Schritt.

**Verhindert EMA Overfitting?**
Nein. Overfitting hängt weiterhin von Dataset-Größe, Vielfalt und den gesamten Trainingsschritten ab.

**Wird EMA auf den Discriminator angewendet?**
Nein. In Redpanda-vc (`train.py`) wird EMA nur auf den Generator (`net_g`) angewendet.

**Was ist der Unterschied zwischen einer Epoche und einem Schritt?**
Eine Epoche ist ein vollständiger Durchlauf über das Dataset; ein Schritt ist eine Gewichtsaktualisierung nach Verarbeitung eines Batches.

**Kann Redpanda-vc mitten in einer Epoche speichern?**
Ja. Speicherungen werden durch `Save Every X Steps` ausgelöst, unabhängig von Epochengrenzen.

**Verliere ich Fortschritt, wenn ich das Training stoppe?**
Du behältst den Fortschritt bis zum letzten gespeicherten `G`/`D`-Checkpoint; Schritte nach dieser Speicherung gehen verloren.

**Was ist der Unterschied zwischen Save Only Latest und Save Every Weights?**
`Save Only Latest` überschreibt die Trainingscheckpoints `G_2333333.pth` / `D_2333333.pth`; `Save Every Weights` exportiert bei jedem Speicherintervall ein Inferenz-`.pth`-Modell statt nur beim letzten Schritt.

**Ist Checkpointing dasselbe wie Checkpoints speichern?**
Nein. `Checkpointing` in den Advanced Settings ist Activation Checkpointing zum Sparen von VRAM, während `Save Every X Steps` das Schreiben von Checkpoints auf die Festplatte steuert.

**Kann ich ein Training aus einer Inferenz-`.pth` fortsetzen?**
Nein. Zum Fortsetzen ist ein passendes Paar aus `G_*.pth`- und `D_*.pth`-Checkpoints in `logs/<model_name>/` erforderlich.

---

## Offizielle Quellen & Weiterführende Literatur

- **Redpanda-vc-Repository:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **`GeneratorEMA`-Implementierung:** [`rvc/train/train.py` (Zeilen 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Schrittbasiertes Speichern, Fortsetzen & Exportstatus:** [`rvc/train/train.py` (Zeilen 420-436, 526-579, 763-853, 902-921, 1044-1097, 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **WebUI-Trainingsregler:** [`tabs/train/rvc.py` (Zeilen 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Manueller Checkpoint-Exporter:** [`rvc/train/process/checkpoint_exporter.py` (Zeilen 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **Checkpoint-I/O & Prozesssteuerung:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **Offizielle PyTorch-Dokumentation:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Wissenschaftliches Paper:** Morales-Brotons, Vogels und Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
