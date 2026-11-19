---
label: "Audioanalysator"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
---
# Audioanalysator

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Öffnen Sie **Andere → Audioanalysator**. Fügen Sie bis zu acht Audiodateien zum Vergleichen hinzu. Ein nützlicher Satz enthält die ursprüngliche Eingabe, eine Basiskonvertierung und eine oder zwei Varianten, die mit einer geänderten Einstellung erstellt wurden.

 | Ansicht | Frage zur Antwort |
| --- | --- |
 | Wellenform | Wo gibt es laute Spitzen, leise Passagen oder abrupte Übergänge? |
 | Spektrogramm | Welche Frequenzen sind zum Zeitpunkt des Beginns eines Artefakts vorhanden? |
 | Durchschnittliches Spektrum | Weist eine Version ein anhaltendes Frequenzungleichgewicht auf? |
 | Tonhöhenschätzung | Folgt das umgewandelte F0 der beabsichtigten Kontur in stimmhaften Passagen? |
 | Pegel- und Stilletabellen | Vergleichen Sie bei ähnlichen Lautstärken und verwenden Sie dieselbe Definition von Stille? |

Wählen Sie einen Zeitbereich und eine Kanalansicht. Verwenden Sie für Vergleiche dasselbe FFT-Fenster, dieselbe Frequenzskala und denselben Ruheschwellenwert. Ein größeres FFT-Fenster verbessert die Frequenzauflösung und glättet schnelle Ereignisse zeitlich. Hören Sie sich die ausgewählte Region im Player an, bevor Sie entscheiden, ob ein sichtbarer Unterschied ein Problem darstellt.

Exportieren Sie CSV oder JSON für Messungen oder eine ZIP-Datei mit Diagrammen zur späteren Überprüfung. Wenn Sie einen verrauschten Datensatzclip diagnostizieren möchten, überprüfen Sie zunächst die unverarbeitete Quelle und vergleichen Sie das gleiche Intervall im Export. Wenn die Tonhöhenergebnisse bei Atemzügen oder stimmlosen Konsonanten seltsam aussehen, hören Sie sich den Ton an, bevor Sie die Schätzung interpretieren.
