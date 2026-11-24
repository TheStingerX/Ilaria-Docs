---
label: "🛠️ Stimmmodell trainieren"
order: 94
permalink: /training/
description: "Training erlernt eine Zielstimme aus einer vorbereiteten Audiosammlung. Nutze diese Anleitung, wenn du ein Modell aus eigenen oder autorisierten Aufnahmen erstellen möchtest."
---
# Ein RVC-Stimmmodell trainieren

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Training erlernt eine Zielstimme aus einer vorbereiteten Audiosammlung. Nutze diese Anleitung, wenn du ein Modell aus eigenen oder autorisierten Aufnahmen erstellen möchtest. Hast du bereits ein Inferenzmodell, lies [RVC-Modelle und Dateien](../start/models.md) für den Einstieg.

## Deinen ersten Trainingslauf planen

Bereite das Audio mit der [Dataset-Anleitung](dataset-preparation.md) vor und wähle es dann unter **Training** aus. Gib dem Experiment einen eindeutigen Namen und wähle eine kurze Aufnahme außerhalb des Trainingssets für Hörtests. Starte mit einem überschaubaren Lauf, der alle Phasen abschließt und einen nutzbaren Export liefert. Das ergibt eine Basislinie für Änderungen an Daten oder Einstellungen.

Notiere Programmversion, Dataset-Stand, Modellformat und Abtastrate, Embedder, Pitch-Methode, Pretrained-Paar, Batch-Größe und geplantes Speicherintervall. Ergänze den Namen des zurückgehaltenen Testclips. Klingt ein späterer Lauf anders, helfen diese Notizen beim Eingrenzen.

## Kompatible Einstellungen wählen

| Einstellung | Was prüfen |
| --- | --- |
| Modellformat, Vocoder und Abtastrate | Wähle eine Kombination, die von der App und dem geplanten Wiedergabe-Client unterstützt wird. Eine Fork-spezifische Architektur kann einschränken, wo das Modell lädt. |
| Pitch-Guidance und Extraktion | Pitch-Guidance ist hilfreich für tonhöhenabhängiges Material, besonders Gesang. Wähle einen in deinem Build verfügbaren Extraktor. |
| Embedder | Bestimmt die aus dem Audio extrahierte Repräsentation. Notiere die Wahl, um in unterstützten Inferenz-Clients dieselbe Repräsentation zu nutzen. |
| Pretrained Generator und Discriminator | Nutze ein passendes Paar für gewählte Architektur, Abtastrate und Pitch-Konfiguration. Generator- und Discriminator-Dateien erfüllen im Training unterschiedliche Rollen. |
| Batch-Größe | Steuert, wie viele Daten pro Update verarbeitet werden. Starte mit einem Wert, der in deine GPU passt, und senke ihn bei Speichermangel. |
| Ziel und Checkpoint-Intervall | Eine Epoche entspricht ungefähr einem vollständigen Durchlauf durch das vorbereitete Dataset. Schritte sind einzelne Trainings-Updates. Speichere regelmäßig zum Vergleichen und Fortsetzen nach Unterbrechungen. |

RefineGAN unterstützt Training und Inferenz mit 32, 40 und 44,1 kHz in RVC v2 mit Pitch Guidance.

### Praktische Trainingstipps

- **Epochen:** Starte einen ersten Vergleichslauf mit rund 200 Epochen und höre mehrere frühere Speicherstände probe. Das ist ein Ausgangspunkt fürs Probehören, da der beste Checkpoint früher oder später liegen kann. Ein 1,000-Epochen-Lauf garantiert keine Qualität.
- **Batch und Präzision:** Starte mit einem moderaten Batch wie 8 und betrachte 16 als konservative Obergrenze zum Einstieg. Senke ihn bei Speichermangel. Gemischte Präzision FP16 kann VRAM sparen und Training auf unterstützter Hardware beschleunigen. Prüfe, ob dein Build sie schon aktiviert, und teste FP32 bei nicht-finiten Loss-Werten.
- **TensorBoard:** Nutze Metriken, um Fortschritt zu verfolgen und hängende oder instabile Läufe zu erkennen. Loss-Kurven allein sagen nicht, welcher Checkpoint am besten klingt. Vergleiche Konvertierungen derselben Testclips.
- **Normalisierung:** In Applio-Builds mit diesen Reglern passt Pre Pegel vor dem Slicing an und Post danach. Nutze None, wenn die Originalpegel schon passen. In Ilaria RVC passt Process Data jedes Segment automatisch an; ein separater Post-Schalter existiert dort öffentlich nicht.
- **Rauschfilter:** Starte bei sauberen Aufnahmen mit deaktivierter optionaler Rauschunterdrückung. Bietet das Frontend einen Hochpassfilter, nutze ihn bei hörbarem Tiefton-Rumpeln und vergleiche per Gehör. Hochpassfilter und Rauschunterdrückung sind getrennte Vorgänge.
- **GPU-Dataset-Cache:** Für eine Basislinie ausgeschaltet lassen. Er verbraucht extra VRAM. Miss erst die Epochenzeit, bevor du ihn für längere Läufe aktivierst.
- **Pretrained-Gewichte:** Stimme das G/D-Paar auf Architektur, Vocoder, Abtastrate und Pitch-Konfiguration ab und nutze den vom Pretraining-Autor angegebenen Embedder. Für Standard-RVC-Pretrainings mit ContentVec wähle ContentVec für Extraktion und Inferenz.

### Abtastrate anhand der Quellbandbreite wählen

Prüfe die Abtastrate in den Dateimetadaten und untersuche repräsentative Clips in einem Spektrogramm wie [Spek](https://www.spek.cc/p/download). Achte auf nutzbare Stimmdetails statt isoliertem Rauschen oder harter Kompressionsgrenze. Die Hälfte der Trainings-Abtastrate ist die höchste darstellbare Frequenz: 32 kHz bildet bis 16 kHz ab, 40 kHz bis 20 kHz und 48 kHz bis 24 kHz. Für nutzbare Details über 20 kHz wähle 48 kHz, sofern Architektur und Pretraining es unterstützen. Nutze die niedrigere kompatible Rate, wenn sie die Quellbandbreite bereits abdeckt. Preprocessing kann neu abtasten, aber fehlende Details nicht wiederherstellen.

## Phasen der Reihe nach ausführen

| Phase | Ergebnis | Was prüfen |
| --- | --- | --- |
| Dataset-Vorverarbeitung | Audio vorbereitet für die Modellkonfiguration des Experiments. | Das Log nennt den Zielordner und meldet erfolgreiche Verarbeitung nutzbarer Dateien. Prüfe übersprungene Dateien vor dem Fortfahren. |
| Merkmalsextraktion | Inhaltsmerkmale sowie Pitch-Daten, falls von der Konfiguration benötigt. | Die Extraktion endet für das aktuelle Experiment mit gewähltem Embedder und Pitch-Verfahren. |
| Modelltraining | Checkpoints und Inferenz-Exporte gemäß eingestellten Speicheroptionen. | Trainingsschritte schreiten voran und erwartete Dateien werden gespeichert. Lies den ersten Fehler bei Stillstand. |
| Retrieval-Index | Durchsuchbare Sammlung von Dataset-Merkmalen zur optionalen Nutzung bei der Konvertierung. | Der Index gehört zu diesem Experiment und passt zur exportierten Stimme. Falls übersprungen, teste das Modell unabhängig. |

Nutze den automatischen Ablauf, wo verfügbar, oder schließe jede Phase ab und prüfe sie vor der nächsten. Ein geändertes Dataset oder eine andere Abtastrate kann vorbereitetes Audio und extrahierte Merkmale ungültig machen. Ein geänderter Embedder erfordert neue Merkmalsextraktion. Starte für eine inkompatible Konfiguration ein separates Experiment, damit bestehende Caches und Checkpoints erhalten bleiben.

## Fortschritt in Ilaria RVC verfolgen

- Nutze **Training Dashboard**, um Schrittzahl, Zeit pro Epoche und Loss-Kurven zu prüfen. Kurven erklären hängende Läufe, während Hörtests zeigen, wie die Ausgabe klingt.
- Richte **Trainingsvorschauen** mit einem festen Testclip ein, damit die App beim Speichern von Checkpoints vergleichbare Konvertierungen erzeugt.
- Wenn du **Training Queue** nutzt, vergib für jeden Job einen eigenen Experimentnamen und eigenes Dataset. Prüfe vor Fortsetzen oder Wiederholen, welche Phasen abgeschlossen sind und wohin gespeichert wird.
- Bietet deine Version **Stop and save**, nutze es zum Unterbrechen und späteren Fortsetzen. Warte, bis der Checkpoint fertig geschrieben ist, bevor du die App schließt.

Ilaria RVC 2.1.0 unterstützt Epochen- und Gesamtschritt-Ziele einschließlich Fortsetzen mitten in einer Epoche bei Schrittzielen. Andere Frontends können abweichende Regler und Verhalten zeigen.

### Trainingsbudgets in Schritten vergleichen

Eine Epoche ist ein Durchlauf durch das vorbereitete Dataset. Ein Trainingsschritt ist ein Batch-Update. Teile die Clip-Anzahl nach dem Preprocessing durch die effektive Batch-Größe, um Schritte pro Epoche zu schätzen. Beispiel: 10,000 Clips bei Batch-Größe 8 ergeben 1,250 Batches pro Epoche im Single-Worker-Lauf. Verworfene Teilbatches, mehrere GPUs oder Gradient Accumulation können die Zählung ändern. Nutze zum Vergleichen den von deinem Lauf gemeldeten Stand.

Wähle ein Speicherintervall, das dir mehrere Checkpoints zum Probehören liefert. Etwa alle 40 Epochen zu speichern ist ein möglicher Startpunkt bei Läufen über hunderte Epochen. Nutze für jeden Vergleich dieselben Testclips und Inferenz-Einstellungen. Achte auf Verständlichkeit, Tonhöhenstabilität, natürliche Pausen und klare Konsonanten. Klingen spätere Exporte rauer oder nur bei wenigen Sätzen gut, vergleiche mit einem früheren Checkpoint und prüfe das Dataset auf Wiederholungen oder Artefakte. Wähle den Checkpoint, der über deine gewünschten Eingaben hinweg am besten funktioniert.

## Exporte per Gehör vergleichen

Öffne die Inferenz mit einer exportierten `.pth`. Nutze dieselben kurzen Testaufnahmen und Konvertierungseinstellungen zum Vergleich verschiedener Checkpoints. Für einen Index-Vergleich halte den Checkpoint konstant und vergleiche denselben Clip mit deaktiviertem und aktiviertem Retrieval.

Vergleiche diese vier Qualitäten zwischen Exporten:

1. **Timbre.** Ähnelt die konvertierte Aufnahme über den gesamten Satz dem gewünschten Stimmcharakter?
2. **Verständlichkeit.** Bleiben Konsonanten und Wortenden leicht verständlich?
3. **Tonhöhenstabilität.** Springen oder zittern Töne bzw. Silben oder verlieren sie ihre Intonation?
4. **Artefakte.** Fügt die Ausgabe Summen, eingebettetes Raumrauschen, raue Ausklänge oder seltsame Übergänge hinzu?

Behalte den am besten klingenden Export samt Testausgaben. Weitere Epochen lohnen sich, wenn Ergebnisse über mehrere Beispiele besser werden. Verbessern spätere Exporte nur einen Clip oder übernehmen Dataset-Fehler, kehre zur besten Basis zurück und prüfe die Aufnahmen.

## Exportieren, fortsetzen oder teilen

- **In der Inferenz nutzen.** Wähle das exportierte `.pth`-Modell. Halte die passende `.index` daneben bereit, wenn du Retrieval möchtest. Notiere benötigten Embedder, unterstützten Client und Abtastrate.
- **Training fortsetzen.** Sichere das Experiment und bewahre die passenden Generator- und Discriminator-Trainingscheckpoints auf, meist `G_*.pth` und `D_*.pth`. Setze mit demselben Experiment und kompatibler Konfiguration fort und prüfe im Log Checkpoint sowie erwarteten Schritt bzw. Epoche. Ein reiner Inferenz-Export enthält nicht den vollständigen Trainingszustand.
- **Modell teilen.** Teile nur Dateien, die du verbreiten darfst. Lege Hörbeispiele, Kompatibilitätshinweise, den passenden Index (falls sinnvoll) und notwendige Nutzungsbedingungen bei.

In Ilaria RVC nutzen neuere Versionen die Modellbibliothek für Inferenz-Exporte und zugehörige Indizes. Exportpfade und Namen können je nach Frontend variieren. Speichere Experiment-Logs getrennt, falls du das Modell später neu erstellen willst.

## Fehlgeschlagenen Lauf diagnostizieren

| Symptom | Zuerst prüfen |
| --- | --- |
| Preprocessing fand kein Audio | Prüfe den gewählten Dataset-Ordner und spiele einen Eingabeclip ab. Prüfe, ob dein Build verschachtelte Ordner liest. |
| Extraktion schlägt fehl oder meldet fehlendes Modell | Prüfe gewählte Embedder- und Pitch-Modell-Dateien und lies die erste Meldung im Extraktions-Log. |
| GPU-Speicher läuft voll | Verringere Batch-Größe, stoppe konkurrierende GPU-Jobs und deaktiviere GPU-Dataset-Caching, falls vorhanden. Wiederhole die fehlgeschlagene Phase. |
| Training startet wieder von vorn | Prüfe, ob das Experiment auf kompatible Trainingscheckpoints zeigt und jede Frischstart-Option deaktiviert ist. |
| Eine `.pth` lädt nicht zur Konvertierung | Prüfe, ob du statt eines Inferenz-Exports einen Trainingscheckpoint gewählt hast, und verifiziere Architektur-/Embedder-Kompatibilität. |
| Ein nutzbares Modell hat keinen Index | Prüfe, ob Index-Erstellung übersprungen wurde oder fehlschlug. Exportiere und teste den Checkpoint einzeln und baue den Index bei Bedarf aus dem Experiment. |

Bewahre die erste Fehlermeldung und die zugehörige Konfiguration auf. Weitere Prüfungen siehe [Fehlerbehebung](../reference/troubleshooting.md).

## Richtwerte für Trainingsprofile (an Daten & Hardware anpassen)

Diese drei Voreinstellungen sind **orientierende Startpunkte**, keine festen Regeln. Passe **Batch Size** immer an deinen VRAM an und bewerte Checkpoints per Hörtest mit denselben Testclips.

### Einsteiger-Training (Sichere Basis)

- **Ideal für:** Erstes Stimmmodell, 5-15 Minuten sauberes Einzelsprecher-Audio, GPUs mit 6-8 GB VRAM.
- **Einstellungen:** RVC **v2** · **40 kHz** · Pitch Guidance **ON** (`rmvpe`) · Embedder `contentvec` · Standard-/verifiziertes HiFi-GAN-Pretrain · **Batch Size `4-8`** · **Epochs `200`** (alle `25-50` Epochen speichern) · Präzision **FP32** (oder **BF16** auf RTX 30/40/50) · GPU Caching **OFF** · Workers `2` · Fused AdamW **OFF**.
- **Warum:** Priorisiert Stabilität und vermeidet Speichermangel oder frühes Overfitting, während mehrere Checkpoints zum Vergleich entstehen.

### Fortgeschrittenes Training (Balance aus Qualität & Tempo)

- **Ideal für:** 15-30 Minuten saubere Sprache/Gesang, GPUs mit 8-12 GB VRAM.
- **Einstellungen:** RVC **v2** · **40 kHz** oder **48 kHz** (wenn Quellbandbreite >20 kHz erreicht) · `rmvpe` · `contentvec` oder `klm-vocal-contentvec` / `spin-v2` (passend zum Pretrain) · **Batch Size `8-12`** · **Epochs `250-350`** (oder äquivalente **Total Steps**) · Alle `25-50` Epochen speichern · Präzision **BF16** (RTX 30/40/50) oder **FP16** (T4/RTX 20) · Workers `4`, Prefetch `4-8` · Nach Wahl des besten Checkpoints **FAISS `Auto`-Index** erstellen.
- **Warum:** Nutzt schnellere gemischte Präzision und größere Batches bei regelmäßigen Checkpoints und Hörvorschauen.

### Experten-Training & Optimierung

- **Ideal für:** Große oder kuratierte Multi-Emotions-/Gesangs-Datasets, 12-24 GB+ VRAM, eigene Pretrains.
- **Einstellungen:** RVC **v2** · Passende Rate (`32/40/44.1/48 kHz`) & Vocoder (`HiFi-GAN`, `MRF HiFi-GAN` oder `RefineGAN` bei `32/40/44.1 kHz` in Ilaria RVC) · Eigenes/passendes G/D-Pretrain & Embedder · **Batch Size `12-16+`** · **Total Steps**-Ziel (für konsistente Gradient-Updates unabhängig von der Dataset-Größe) · **GPU Caching ON** (nur wenn das Dataset bequem in den VRAM passt; vorher Epochenzeit messen) · **Fused AdamW ON** (in frischem Lauf testen) · **Training Queue** für nächtliche A/B-Läufe · **TensorBoard**-Überwachung + **Audio Analyzer**-Vergleich.
- **Learning Rate:** Die meisten RVC-WebUIs (inklusive Ilaria RVC) nutzen den Standard-RVC-v2-Optimizer-Schedule (`1e-4` Basis); ändere die Lernrate in Frontends, die sie anbieten, nur wenn du ihre Skalierung mit der Batch-Größe verstehst.

## Underfitting vs. Overfitting nach Gehör erkennen

1. **Underfitting (zu früh):** Die Ausgabe klingt noch überwiegend wie der Eingabesprecher, verfehlt das Ziel-Timbre bei gehaltenen Vokalen oder verliert Charakter auf hohen/tiefen Tönen. *Behebung:* Training vom letzten `G_*.pth`/`D_*.pth`-Checkpoint fortsetzen.
2. **Overfitting (zu spät):** Die Stimme klingt bei unbekannten Wörtern robotisch/metallisch, gibt Raumrauschen oder Atemartefakte des Datasets wieder oder klingt *nur* bei sätzen ähnlich dem Trainingsset gut. *Behebung:* Auf einen früheren Checkpoint zurückgehen (`50-100` Epochen früher) und das Dataset im [Audio-Analyzer](../ilaria-rvc/manage/audio-analyzer.md) prüfen.

> Wenn du mit **Redpanda-vc** trainierst (das Generator EMA und schrittbasiertes Speichern ergänzt), lies [RVC-Modelle in Redpanda-vc trainieren](../other-rvcs/training/redpanda/training.md).
