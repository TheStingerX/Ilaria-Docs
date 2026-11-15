---
label: "⚙️ Trainingskontrollen und Arbeitsablauf"
order: 87
permalink: /ilaria-rvc/training-controls/
---
# Trainingskontrollen und Arbeitsablauf

## Vier Phasen

 | Phase | Eingaben | Prüfen, bevor Sie fortfahren |
| --- | --- | --- |
 | Prozessdaten | Datensatzpfad, Rate, Experimentname und CPU-Threads | Import abgeschlossen, verwendbare Audiodaten wurden gelesen und Protokolle gehören zum beabsichtigten Experiment. |
 | Feature-Extraktion | Vorbereitetes Audio, Tonhöhenführung, Extraktor und Trainingseinbetter | Die Phase wurde mit den erwarteten Einstellungen abgeschlossen. |
 | Pth trainieren | Features, G/D-Paar, Ziel, GPU, Batch und Präzision | Fortschrittsfortschritte und die regelmäßigen Kontrollpunkte werden geschrieben. |
 | Train Feature Index | Extrahierte Features und Indexalgorithmus | Der generierte Index gehört zu diesem Lauf und kann mit seinem Inferenzexport gepaart werden. |

## Architektur und Leistung

Version 2.1.0 bietet 32-, 40- und 48-kHz-Einstellungen mit verfügbaren Kombinationen, die vom Vocoder bestimmt werden. Für HiFi-GAN und RefineGAN gelten unterschiedliche Einschränkungen. Überprüfen Sie vor der Vorverarbeitung das kompatible Paar. Die Pitch-Führung steuert, ob F0-Features das Modell beeinflussen. Konfigurieren Sie CPU-Threads für die Maschine und wählen Sie eine unterstützte NVIDIA-GPU für das Training aus. FP32 ist die Standardeinstellung in der überprüften Benutzeroberfläche. FP16 kann den Speicherdruck auf unterstützter Hardware reduzieren. Die Chargengröße steuert, wie viele Proben zusammen verarbeitet werden. Wenn der VRAM knapp wird, reduzieren Sie den Stapel und deaktivieren Sie das optionale Caching.

**Stille Trainingsdateien** steuern, wie viele stille Beispiele die App enthält. Vergleichen Sie dieselben ausgehaltenen Pausen bei der Bewertung einer Änderung. **Index-Algorithmus** bietet Auto, Faiss und KMeans. Behalten Sie den generierten Index mit seinem passenden Modell bei und deaktivieren Sie den Abruf, wenn Sie nur den Prüfpunkt auswerten.

## Epochen- und Schrittziele

Eine Epoche umfasst eine Iteration über den vorbereiteten Datensatz. Der Schrittmodus zielt auf die Gesamtzahl der Stapelaktualisierungen ab und unterstützt die Wiederaufnahme innerhalb einer Epoche. Das GPU-Dataset-Caching muss in dieser Version im Schrittmodus deaktiviert sein. Die Speicherhäufigkeit wird in Epochen gemessen, auch wenn ein Schrittziel verwendet wird. Verwenden Sie bei der Verlängerung eines Laufs ein Ziel oberhalb des bereits abgeschlossenen Fortschritts. Es lohnt sich, weitere Schritte auszuprobieren, wenn eine vergleichbare Audioqualität verbessert wird.

## Führen Sie eine reproduzierbare Aufzeichnung

Zeichnen Sie die Datensatzrevision, die Abtastrate, den Encoder, den Extraktor, den Vocoder, die Vorzüge, die Präzision, die Stapelgröße und die Speicherfrequenz auf. Wenn Sie denselben Namen mit einem inkompatiblen Tarif wiederverwenden, kann die Benutzeroberfläche die Nichtübereinstimmung melden. Starten Sie ein separates Experiment für eine neue Konfiguration und halten Sie das alte Experiment zum Vergleich bereit.
