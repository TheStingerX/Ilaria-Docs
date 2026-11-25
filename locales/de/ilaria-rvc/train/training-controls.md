---
label: "Trainingskontrollen und Arbeitsablauf"
icon: ":gear:"
order: 87
permalink: /ilaria-rvc/training-controls/
description: "Ilaria RVC 2.5.0. RefineGAN unterstützt Training und Inferenz mit 32, 40 und 44,1 kHz in RVC v2 mit Pitch Guidance."
---
# Trainingskontrollen und Arbeitsablauf

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Neu sind der ONNX-Export für RVC-HiFi-GAN-Modelle mit Pitch-Führung, die exakte Wiederherstellung als `.pth` aus von Ilaria RVC erstellten ONNX-Dateien, eine Auswahl für installierte Modelle und 49 Pretrain-Einträge. Einige stehen nur als Download bereit und enthalten Kompatibilitätshinweise.

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN unterstützt Training und Inferenz mit 32, 40 und 44,1 kHz in RVC v2 mit Pitch Guidance. Die App erzeugt die stille Audiodatei für 44,1 kHz automatisch. Wähle **None** für Training von Grund auf, falls die vortrainierten Gewichte eine andere Architektur nutzen. Getestete Beispiele sind KLM 5 (40 kHz) und VCTK (44,1 kHz).

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Trainingseinstellungen](training-buttons.md)

> **Neuerungen in 2.3.0** · MRF HiFi-GAN unterstützt Training und Inferenz. Der Katalog ergänzt 15 Generator-Diskriminator-Paare, darunter KLM 4.4 X1 und X2 mit 40 kHz. Portuguese HuBERT Base ist optional für die Inferenz. Beim RVC-v2-Training kannst du einen eigenen HuBERT-Embedder hochladen und speichern. Seine Konfiguration bleibt im exportierten Modell erhalten.

> **2.4.0** · Unter Windows liegen App und Laufzeit in app/ und Stimmmodelle in models/ im Hauptordner. Neu sind Colab, Lightning AI Studio, Hinweise zu optionalen Embeddern und Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip wurde repariert und pywin32 ist enthalten.

> **2.4.3** · Fügt natives **BF16**-Mixed-Precision-Training hinzu, automatisch gewählt auf kompatiblen RTX 30, 40 und 50 GPUs (Kaggle T4 nutzt standardmäßig FP16). Manuelle FP16/FP32-Wahl wird gespeichert, bestehende Läufe behalten ihre Präzision und Training Queue sowie PC training advisor nutzen die neuen Optionen. Feature-Extraktion bleibt in FP32.

## Vier Phasen

 | Phase | Eingaben | Prüfen, bevor Sie fortfahren |
| --- | --- | --- |
 | Prozessdaten | Datensatzpfad, Rate, Experimentname und CPU-Threads | Import abgeschlossen, verwendbare Audiodaten wurden gelesen und Protokolle gehören zum beabsichtigten Experiment. |
 | Feature-Extraktion | Vorbereitetes Audio, Tonhöhenführung, Extraktor und Trainingseinbetter | Die Phase wurde mit den erwarteten Einstellungen abgeschlossen. |
 | Pth trainieren | Features, G/D-Paar, Ziel, GPU, Batch und Präzision | Fortschrittsfortschritte und die regelmäßigen Kontrollpunkte werden geschrieben. |
 | Train Feature Index | Extrahierte Features und Indexalgorithmus | Der generierte Index gehört zu diesem Lauf und kann mit seinem Inferenzexport gepaart werden. |

## Architektur und Leistung

Überprüfen Sie vor der Vorverarbeitung das kompatible Paar. Die Pitch-Führung steuert, ob F0-Features das Modell beeinflussen. Konfigurieren Sie CPU-Threads für die Maschine und wählen Sie eine unterstützte NVIDIA-GPU für das Training aus. FP32 ist die Standardeinstellung in der überprüften Benutzeroberfläche. FP16 kann den Speicherdruck auf unterstützter Hardware reduzieren. Die Chargengröße steuert, wie viele Proben zusammen verarbeitet werden. Wenn der VRAM knapp wird, reduzieren Sie den Stapel und deaktivieren Sie das optionale Caching.

**Stille Trainingsdateien** steuern, wie viele stille Beispiele die App enthält. Vergleichen Sie dieselben ausgehaltenen Pausen bei der Bewertung einer Änderung.

## So funktioniert der Indexalgorithmus

Jede Option erzeugt einen **FAISS-Abrufindex**. Die Selektoränderungen, welche extrahierten Merkmalsvektoren unabhängig vom Training des Sprachmodells in den Index aufgenommen werden. Ein Merkmalsvektor stellt einen kurzen Audiorahmen dar. Die folgenden Schwellenwerte zählen Vektoren, nicht Clips, Epochen oder Minuten.

| Option | Was Ilaria RVC macht | Wann Sie es ausprobieren sollten |
| --- | --- | --- |
| **Auto** | Hält alle Vektoren bis zu **200.000**. Darüber hinaus wird versucht, sie auf **10.000** Clusterzentren zu reduzieren. Wenn das Clustering fehlschlägt, werden die ursprünglichen Vektoren beibehalten. | Beginnen Sie hier für einen ersten Index. Überprüfen Sie das Train Index-Protokoll, um zu sehen, welchen Weg Auto genommen hat. |
| **Faiss** | Behält alle extrahierten Vektoren und erstellt den FAISS-Index ohne einen KMeans-Reduktionsdurchlauf. | Probieren Sie es aus, wenn Sie Beispiele beibehalten möchten, bei denen ein kleinerer Index möglicherweise ausreicht und über genügend RAM und Speicherplatz verfügt. |
| **KMeans** | Verwendet MiniBatchKMeans, um ähnliche Vektoren mit gemeinsamen Zentren darzustellen. Normalerweise behält es etwa ein Zentrum pro zehn Vektoren bei, innerhalb eines Bereichs von **39 bis 10.000** Zentren und immer weniger als die Eingabeanzahl. Es behält alle Vektoren für Eingaben von **39 oder weniger** bei und meldet einen Clustering-Fehler, anstatt stillschweigend zurückzugreifen. | Vergleichen Sie es, wenn Sie einen kleineren Index wünschen. Der Clustering-Durchgang erfordert zusätzliche Arbeit und der reduzierte Index kann feine Details verlieren. |

Ein kleinerer Index ist normalerweise leichter zu speichern. Es garantiert keinen schnelleren Build oder eine bessere Konvertierung. Für das Clustering ist weiterhin das Laden der extrahierten Features erforderlich. Wenn Auto auf einen großen Datensatz zurückgreift, kann beim Erstellen aller Vektoren immer noch nicht genügend Arbeitsspeicher zur Verfügung stehen.

### Vergleichen Sie die Ergebnisse, bevor Sie eine Auswahl treffen

1. Beenden Sie die **Feature-Extraktion** und führen Sie dann **Train Index** aus. Überprüfen Sie das Protokoll auf die Vektor- oder Mittelpunktanzahl. Erstellen Sie eine Kopie des resultierenden Indexes, bevor Sie einen zweiten mit einer anderen Einstellung erstellen.
2. Verwenden Sie die gleiche Schlussfolgerung `.pth` und eine sauber gehaltene Aufnahme. Setzen Sie **Index Ratio** zuerst auf Null, um nur den Prüfpunkt zu hören. Der Index ist für die Konvertierung optional.
3. Vergleichen Sie die beiden übereinstimmenden Indizes mit demselben **Indexverhältnis** ungleich Null, wobei Tonhöhe und Effekte konstant gehalten werden. Hören Sie auf klare Konsonanten, anhaltende Vokale, ungewöhnliche Klänge und darauf, wie viel Charakter der Zielstimme erhalten bleibt. Behalten Sie den Ton bei, der in mehreren Clips besser klingt.
4. Behalten Sie den ausgewählten Index mit dem Modell und der Feature-Konfiguration bei, die ihn erstellt hat. Wenn Sie den Algorithmus ändern, erstellen Sie den Index anhand der vorhandenen kompatiblen Funktionen neu. Wenn Sie den Trainingseinbetter ändern, extrahieren Sie passende Features für dieses Experiment, anstatt den alten Index wiederzuverwenden.

## Epochen- und Schrittziele

Eine Epoche umfasst eine Iteration über den vorbereiteten Datensatz. Der Schrittmodus zielt auf die Gesamtzahl der Stapelaktualisierungen ab und unterstützt die Wiederaufnahme innerhalb einer Epoche. Das GPU-Dataset-Caching muss in dieser Version im Schrittmodus deaktiviert sein. Die Speicherhäufigkeit wird in Epochen gemessen, auch wenn ein Schrittziel verwendet wird. Verwenden Sie bei der Verlängerung eines Laufs ein Ziel oberhalb des bereits abgeschlossenen Fortschritts. Es lohnt sich, weitere Schritte auszuprobieren, wenn eine vergleichbare Audioqualität verbessert wird.

## Führen Sie eine reproduzierbare Aufzeichnung

Zeichnen Sie die Datensatzrevision, die Abtastrate, den Encoder, den Extraktor, den Vocoder, die Vorzüge, die Präzision, die Stapelgröße und die Speicherfrequenz auf. Wenn Sie denselben Namen mit einem inkompatiblen Tarif wiederverwenden, kann die Benutzeroberfläche die Nichtübereinstimmung melden. Starten Sie ein separates Experiment für eine neue Konfiguration und halten Sie das alte Experiment zum Vergleich bereit.
