---
label: "RVC-Modelle trainieren (EMA & Steps)"
icon: ":mortar_board:"
order: 97
permalink: /ilaria-rvc/redpanda/training/
description: "Einsteigerfreundliche, code-verifizierte Anleitung zum Trainieren von RVC-Modellen in Redpanda-vc: Generator EMA, schrittbasiertes Speichern, Fortsetzen, Exportieren und Fehlerbehebung."
---
# RVC-Modelle in Redpanda-vc trainieren - EMA & Step-basiertes Speichern

[Redpanda-vc auf GitHub](https://github.com/redpanda343/Redpanda-vc) · [Redpanda-vc einrichten](first-run.md) · [Allgemeine RVC-Trainingsanleitung](../../model-training/training.md)

Beim Stimmmodell-Training lernt ein Programm anhand sauberer Audioaufnahmen, eine Zielstimme nachzubilden. Die wichtigsten Begriffe einfach erklärt:

- **Weights (Gewichte):** Die internen Zahlen im Modell, die sich beim Lernen Schritt für Schritt anpassen.
- **Generator (`G`):** Der Teil des Modells, der das konvertierte Audio erzeugt.
- **Discriminator (`D`):** Ein Hilfsnetzwerk nur während des Trainings, das bewertet, wie echt das Generator-Audio im Vergleich zu echten Aufnahmen klingt.
- **Optimizer:** Die Recheneinheit, die nach jedem Trainingsschritt die Gewichte aktualisiert.
- **Step (Schritt):** Eine einzelne Gewichtsaktualisierung nach der Verarbeitung eines kleinen Pakets (**Batch**) aus Audioclips.
- **Epoch (Epoche):** Ein vollständiger Durchlauf durch das gesamte vorbereitete Dataset.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Ein gespeicherter Trainingsstand zum Pausieren und späteren Fortsetzen.
- **EMA (Exponential Moving Average):** Ein geglätteter laufender Durchschnitt der Generator-Gewichte während des Trainings.

> EMA helps smooth out changes in the generator's weights during training. Instead of exporting only the latest generator weights, Redpanda-vc can export a running average of them.

Das Training liefert nicht sofort eine perfekte Stimme; die Qualität hängt stark vom Dataset und den Einstellungen ab. Was EMA **nicht** tut:

- EMA ist **kein** Audiofilter oder Denoiser.
- EMA verändert oder bereinigt **keine** Dataset-Dateien.
- EMA repariert **keine** übersteuerten oder verrauschten Aufnahmen.
- EMA garantiert **keine** bessere Audioqualität bei jeder Stimme.
- EMA beseitigt **nicht** jeden Zufallsfaktor beim Training.

---

## Was ist EMA?

Stell dir einen Schüler vor, der die Aussprache eines schwierigen Wortes übt. Ein einzelner Versuch kann etwas besser oder schlechter gelingen als der vorherige. Der Trend über viele letzte Versuche ergibt ein stabileres Bild als nur der allerletzte Versuch.

*(Das ist nur eine Analogie: EMA hört kein Audio ab und bewertet keine Aufnahmen.)*

### Wie Redpanda-vc EMA tatsächlich ausführt

In `rvc/train/train.py`:

1. Der Generator trainiert normal auf jedem Batch.
2. Der Optimizer aktualisiert die aktuellen Generator-Gewichte.
3. Direkt nach jedem Generator-Schritt (auf Rank `0`) aktualisiert `GeneratorEMA.update()` eine separate gemittelte Kopie der Gewichte (ohne `enc_q`, das nur beim Training gebraucht wird).
4. Dieser laufende Durchschnitt bleibt im Speicher und wird im `G`-Checkpoint gesichert.
5. Ist `Generator EMA Decay > 0`, exportiert Redpanda-vc Inferenz-`.pth`-Dateien aus diesen EMA-Gewichten statt aus den rohen Live-Gewichten.

**EMA wird pro Step aktualisiert, nicht einmal pro Epoche.** Redpanda-vc mittelt **nicht** mehrere bereits gespeicherte `.pth`-Dateien auf der Festplatte.

<details>
<summary>Optionale Mathe-Details: Standard-EMA vs. korrigierte Formel in Redpanda-vc</summary>

Standardformel:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

In `rvc/train/train.py` (`GeneratorEMA.update()`, Zeilen 199-205) berechnet Redpanda-vc einen korrigierten Decay abhängig von der Anzahl der Updates (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

wobei `beta` deinem `ema_decay`-Wert entspricht. Das dämpft den Einfluss der Startgewichte bei den ersten Updates.

</details>

---

## Generator EMA Decay verstehen

Unter **Training → Advanced Settings** liegt **Generator EMA Decay** (`tabs/train/rvc.py`, Zeilen 809-819) zwischen `0` und `0.9999` (Standard **`0.999`**, Schrittweite `0.0001`):

- **`0`:** Deaktiviert `GeneratorEMA`; Inferenz-`.pth` nutzen die Live-Gewichte.
- **`0.999` (Standard):** Exponentieller laufender Durchschnitt, der aktuelle Updates deutlich gewichtet und Schritt-Schwankungen glättet.
- **`0.9999`:** Reagiert langsamer und mittelt über einen längeren Verlauf. `0.9999` ist **nicht** automatisch besser als `0.999`, und es gibt keinen universellen Idealwert. Einsteiger können mit **`0.999`** starten und echte Hörproben vergleichen.

---

## Warum nutzt Redpanda-vc EMA?

In der Forschung (PyTorch Weight Averaging und Morales-Brotons, Vogels & Hendrikx, 2024) wird Weight Averaging untersucht, weil einzelne SGD/Adam-Schritte um gute Lösungen schwanken.

- **Mögliche Vorteile (keine Garantien):** Weniger Schwankung zwischen Exporten, gleichmäßigere Übergänge, abgemilderte Update-Varianz.
- **Grenzen:** Ersetzt kein sauberes Dataset, verhindert weder Overfitting noch Trainingsabbrüche, verkürzt nicht automatisch die Trainingszeit, wählt nicht selbst den besten Checkpoint aus und kostet etwas zusätzlichen Speicher/Rechenzeit.

---

## EMA-Gewichte vs. Trainings-Checkpoints

| Datei / Zustand | Speicherort | Inhalt | Zweck |
| --- | --- | --- | --- |
| **Generator-Checkpoint (`G_*.pth`)** | `logs/<model_name>/` | Live-Gewichte, Optimizer, Scaler, `iteration`, `step`, `epoch_step`, RNG, `ema`-Zustand | Training fortsetzen (und manueller Export) |
| **Discriminator-Checkpoint (`D_*.pth`)** | `logs/<model_name>/` | Discriminator-Gewichte, Optimizer, Scaler, `step` | Training zusammen mit `G_*.pth` fortsetzen |
| **EMA-Gewichte** | Im RAM und in `G_*.pth` (`checkpoint["ema"]["weights"]`) | Laufender Durchschnitt des Generators (ohne `enc_q`) | Geglättete Inferenz-`.pth`-Exporte |
| **Inferenzmodell (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Kompakte Inferenz-Gewichte + Metadaten | Nur Stimmkonvertierung (**kein** Fortsetzen) |

EMA wird **nur auf den Generator (`net_g`)** angewendet, nicht auf den Discriminator (`net_d`).

---

## Steps vs. Epochs

- **Epoch:** Ein vollständiger Durchlauf des vorbereiteten Datasets.
- **Batch:** Eine kleine Gruppe von Audioclips pro Durchgang.
- **Step:** Eine Gewichtsaktualisierung nach einem Batch (weder 1 Audiodatei noch 1 Sekunde).

**Hypothetisches Beispiel:** Bei 100 Steps pro Epoche entsprechen `100` Steps ≈ `1` Epoche, `500` Steps ≈ `5` Epochen, `1.000` Steps ≈ `10` Epochen. Das reale Verhältnis hängt vom Dataset und `Batch Size` ab.

---

## Step-basiertes Speichern in Redpanda-vc

- **Total Steps (Standard `10000`):** Gesamtziel an Steps (addiert nicht automatisch 10.000 hinzu; bei Erreichen zum Weitertrainieren erhöhen).
- **Save Every X Steps (Standard `1000`):** Speichert `G` und `D` alle `X` Steps, auch mitten in einer Epoche.
- **Final Save:** Beim letzten Step (`global_step >= total_steps`) werden immer `G`/`D` und ein Inferenz-`.pth` gespeichert.
- **Save Every Weights (Standard `True`):** Exportiert bei jedem Speicherintervall ein Inferenz-`.pth` (sonst nur am Ende).
- **Save Only Latest (Standard `True`):** Überschreibt `G_2333333.pth` / `D_2333333.pth` (`LATEST_CHECKPOINT_SUFFIX`) zum Platzsparen (verhindert Rücksprung auf ältere `G`/`D`-Checkpoints, betrifft nicht die exportierten Inferenz-`.pth`).

---

## Dein erstes RVC-Training in Redpanda-vc

1. **Vorbereitung:** Redpanda-vc einrichten ([Redpanda-vc einrichten](first-run.md)), unter **Train → RVC** **Model Name**, **Sample Rate**, **Version** und **Vocoder** wählen und autorisierte, saubere Aufnahmen bereitlegen.
2. **Preprocess:** **Dataset Path** angeben und **Preprocess Dataset** klicken.
3. **Extract:** F0-Extraktor (`rmvpe`) und **Embedder Model** (`contentvec`) wählen und **Extract Features** klicken (trainiert noch keine `.pth`-Gewichte).
4. **Training:** **Batch Size** passend zur VRAM wählen; als illustrativen Start kannst du die Standards lassen (**Total Steps** `10000`, **Save Every X Steps** `1000`, unter **Advanced Settings**: **Save Only Latest** an, **Save Every Weights** an, **Generator EMA Decay** `0.999`). **Start Training** klicken, mit **Pause Training** / **Resume Training** / **Stop Training** steuern und am Ende **Generate Index** nutzen.
5. **Ausgabe (`logs/<model_name>/`):** `G_2333333.pth` / `D_2333333.pth` (oder `G_<step>.pth` / `D_<step>.pth`) sowie `<model_name>_<epoch>e_<step>s.pth` für Inferenz.

---

## Training sicher fortsetzen

`latest_checkpoint_pair()` paart das neueste `G_*.pth` mit dem passenden `D_*.pth` (beide nötig). `restore()` lädt Epoche, `epoch_step`, `global_step`, Scaler, RNG und Optimizer. `build_ema()` lädt `checkpoint["ema"]` oder startet EMA neu von den geladenen Gewichten. Steps nach dem letzten Speichern vor einem Abbruch gehen verloren.

- **Reset Optimizer State:** Löscht Optimizer-Momente bei Beibehaltung von Gewichten, `global_step` und LR-Schedule (normalerweise **OFF**).
- **Fresh Training (`--cleanup`):** **Löscht** frühere `G_*`/`D_*`-Checkpoints, `spec.pt` und Logs (zum Fortsetzen **OFF** lassen).
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** steuert Festplatten-Saves; **Checkpointing** ist *Activation Checkpointing* zum Sparen von VRAM.

---

## Export & Hörvergleich

Sowohl der automatische Export (`export_state_dict()`) als auch **Export Model** (`checkpoint_exporter.py`) nutzen automatisch `ema["weights"]`, sofern vorhanden (kein eigener Raw/EMA-Schalter in der WebUI). Für einen sauberen Vergleich zweier Läufe (`0.999` vs. `0`) nutze identisches Dataset, identische Settings, gleiche Step-Zahl und Testclips außerhalb des Datasets.

---

## Fehlerbehebung für Einsteiger

| Problem | Mögliche Ursache | Was prüfen | Lösung |
| --- | --- | --- | --- |
| **Training startet nicht** | Preprocess/Extract fehlt oder `training_state.json` aktiv | Erste Terminal-Meldung | **Preprocess Dataset** und **Extract Features** abschließen |
| **GPU out of memory** | `Batch Size` zu hoch oder `Cache Dataset in GPU` an | VRAM & Terminal | **Batch Size** senken, **Cache Dataset in GPU** aus, **Checkpointing** an |
| **EMA zeigt keinen Unterschied** | Wenige Steps oder Decay auf `0` | `Generator EMA Decay` & Startlog | `generator EMA` im Log prüfen und bei gleichem Step testen |
| **EMA Decay steht auf `0`** | Regler auf `0` | **Advanced Settings → Generator EMA Decay** | Für den nächsten Lauf `0.999` wählen |
| **Keine Zwischen-`.pth`-Modelle** | **Save Every Weights** deaktiviert | **Advanced Settings → Save Every Weights** | **Save Every Weights** aktivieren |
| **Nur letzte `G`/`D`-Checkpoints** | **Save Only Latest** aktiv | `logs/<model_name>/` | **Save Only Latest** vor dem Start deaktivieren |
| **`G`- oder `D`-Checkpoint fehlt** | Datei gelöscht/verschoben | Paar `G_*` / `D_*` | Beide Dateien mit gleichem Suffix sind nötig |
| **Startet ab früherem Step** | Stopp vor dem nächsten `Save Every X Steps` | Terminal | Normal: Steps nach dem letzten Save fehlen |
| **Fehler beim EMA-Laden** | Älterer Checkpoint ohne EMA | Konsolenhinweis | Redpanda-vc startet EMA automatisch ab den geladenen Gewichten |
| **Fresh Training hat alles gelöscht** | **Fresh Training** war aktiv | `logs/<model_name>/` | Beim Fortsetzen **Fresh Training** deaktivieren |
| **Total Steps erreicht** | `global_step >= Total Steps` | Terminal | **Total Steps** erhöhen und **Start Training** klicken |
| **Exportiertes `.pth` setzt nicht fort** | Inferenz-`.pth` statt `G_*.pth` + `D_*.pth` | Dateiname | Mit `G_*.pth` und `D_*.pth` aus `logs/<model_name>/` fortsetzen |
| **Ungewöhnlicher VRAM-Anstieg** | **Checkpointing** aus oder **Cache Dataset in GPU** an | **Advanced Settings** | **Checkpointing** an, **Cache Dataset in GPU** aus, **Batch Size** senken |

---

## FAQ

**Was bedeutet EMA?** Exponential Moving Average: laufender Durchschnitt der Generator-Gewichte während des Trainings.
**Verbessert EMA die Stimmqualität?** Es kann Schwankungen glätten, ist aber keine Garantie; Hörtests sind nötig.
**Sollten Einsteiger `0.999` lassen?** Ja, das ist der Standardwert in Redpanda-vc.
**Was passiert bei EMA Decay `0`?** EMA ist aus und es werden Live-Gewichte exportiert.
**Ist `0.9999` besser als `0.999`?** Nicht pauschal; es reagiert träger auf neue Updates.
**Macht EMA das Training schneller?** Nein.
**Verhindert EMA Overfitting?** Nein.
**Wird EMA auf den Discriminator angewendet?** Nein, nur auf den Generator (`net_g`).
**Unterschied zwischen Epoch und Step?** Eine Epoche ist ein ganzer Dataset-Durchlauf; ein Step ist ein Update nach einem Batch.
**Kann mitten in einer Epoche gespeichert werden?** Ja, über `Save Every X Steps`.
**Geht Fortschritt beim Stoppen verloren?** Alles nach dem letzten gespeicherten Checkpoint.
**Unterschied Save Only Latest vs. Save Every Weights?** `Save Only Latest` überschreibt `G_2333333.pth` / `D_2333333.pth`; `Save Every Weights` exportiert bei jedem Intervall ein Inferenz-`.pth`.
**Ist Checkpointing gleich Checkpoint-Speichern?** Nein, es ist *Activation Checkpointing* für weniger VRAM.
**Kann man mit einem Inferenz-`.pth` fortsetzen?** Nein, nötig sind `G_*.pth` und `D_*.pth`.

---

## Offizielle Quellen & weiterführende Links

- **Redpanda-vc Repository:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **`GeneratorEMA`-Implementierung:** [`rvc/train/train.py` (Zeilen 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Step-Speichern, Fortsetzen & Export:** [`rvc/train/train.py` (Zeilen 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Training-WebUI:** [`tabs/train/rvc.py` (Zeilen 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Manueller Exporter:** [`rvc/train/process/checkpoint_exporter.py` (Zeilen 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **Checkpoint-I/O & Steuerung:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **PyTorch:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Wissenschaftliche Arbeit:** Morales-Brotons, Vogels & Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
