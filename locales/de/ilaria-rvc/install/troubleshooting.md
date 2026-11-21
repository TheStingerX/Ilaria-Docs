---
label: "Protokolle und Wiederherstellung"
icon: ":hammer_and_wrench:"
order: 92
permalink: /ilaria-rvc/troubleshooting/
description: "Beginnen Sie mit Pitch 0, einem kurzen trockenen WAV und einem bekanntermaßen guten Modell. Ändern Sie eine Einstellung pro Test."
---
# Protokolle und Wiederherstellung

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **RMVPE · 2.4.2** · Behebt einen RMVPE-Inferenzfehler, wenn cuDNN eine GRU-Operation ablehnt. RMVPE verwendet zusammenhängende Eingaben und wiederholt die GRU auf der CPU, falls cuDNN `CUDNN_STATUS_NOT_SUPPORTED` meldet. Erfordert Version 2.4.0 oder neuer. Installiere 2.4.2 über **Other → Update Ilaria RVC**.

## Die App wird geschlossen oder der Browser bleibt leer.

1. Führen Sie `RUN_ILARIA_RVC_LOGS.bat` aus dem vollständig extrahierten Ordner aus. Lassen Sie die Konsole geöffnet und lesen Sie den ersten Fehler, einschließlich der darin benannten Datei oder des Geräts.
2. Wenn die Konsole anzeigt, dass der lokale Server läuft, öffnen Sie die dort aufgedruckte Adresse. Der Standardwert ist `http://127.0.0.1:6969`. Wenn der Port belegt ist, prüfen Sie, ob eine Instanz vorhanden ist, bevor Sie eine zweite starten. Speichern Sie alle aktiven Arbeiten, bevor Sie sie schließen.
3. Überprüfen Sie das genaue GPU-Modell im **Task-Manager → Leistung** und vergleichen Sie es mit [Kompatible GPUs](gpu-compatibility.md). Das Windows-Paket enthält CUDA 12.8. Überprüfen Sie auf einem PC mit nur Maxwell-, Pascal- oder Volta-NVIDIA-GPUs `cu126-runtime-install.log` auf Fortschritt, während der Launcher die CUDA 12.6-Laufzeit vorbereitet. Ein fehlgeschlagener Download erfordert eine Überprüfung des Internetzugangs und des freien Speicherplatzes.
4. Wenn nach der Extraktion eine Datei fehlt, überprüfen Sie, ob das gesamte Archiv extrahiert wurde und ob die Verknüpfung auf diese Installation verweist. Sichern Sie Ihre Modelle, Datensätze und Experimentordner, bevor Sie Installationsdateien ersetzen.

## Das Modell fehlt oder der Ton klingt falsch

| Symptom | Erste Prüfung |
| --- | --- |
| Eine Stimme fehlt im **Sprachmodell** | Überprüfen Sie das Importprotokoll und klicken Sie dann auf **Aktualisieren**. Wählen Sie einen Inferenz-`.pth`-Export aus. Zum Experiment gehört ein G- oder D-Trainingskontrollpunkt. |
| Eine Datei kann nicht dekodiert werden. | Spielen Sie sie außerhalb der App ab. Exportieren Sie eine kurze PCM-WAV-Datei in einen beschreibbaren lokalen Ordner und testen Sie diese Kopie. |
| Die Konvertierung schlägt nur mit dem Index fehl. | Setzen Sie **Indexverhältnis** auf Null und versuchen Sie es ohne Index. Wenn das funktioniert, überprüfen Sie, ob das optionale `.index` mit dem Modell und seinem Einbetter übereinstimmt. |
| Die Stimme klingt immer noch wie die Quelle | Bestätigen Sie das ausgewählte Modell und seinen erwarteten Einbetter. Generische HuBERT-Encoder können die Klangfarbe der Quelle beibehalten. Testen Sie dieselbe Phrase mit deaktiviertem Abruf, bevor Sie die Einstellungen vergleichen. |
| Atemzüge oder Konsonanten sind metallisch | Testen Sie mehrere saubere Clips mit ausgeschalteten Effekten. Wenn dasselbe Modell diese Laute weiterhin verzerrt, überprüfen Sie Atem- und Konsonantenbeispiele in den Trainingsdaten, korrigieren Sie sie und trainieren Sie erneut. |
| Eine lange Datei schlägt fehl, aber eine kurze funktioniert. | Überprüfen Sie den VRAM und versuchen Sie **Split Audio** oder kürzere Segmente. Hören Sie sich jeden Join an, bevor Sie ihn exportieren. |

Beginnen Sie mit **Pitch 0**, einem kurzen trockenen WAV und einem bekanntermaßen guten Modell. Ändern Sie eine Einstellung pro Test. Informationen zu den Effekten und Exportoptionen finden Sie unter [Inferenzsteuerung](../convert/inference-buttons.md)].

## Das Training wird unterbrochen oder kann nicht fortgesetzt werden

1. Überprüfen Sie, welche Phase fehlgeschlagen ist. Bestätigen Sie unter **Daten verarbeiten**, dass der Datensatzpfad auf lesbare Aufzeichnungen verweist und dass auf dem Ausgabelaufwerk Speicherplatz vorhanden ist. Überprüfen Sie in der **Feature-Extraktion**, ob die Vorverarbeitung abgeschlossen ist und die ausgewählten Pitch- und Embedder-Assets verfügbar sind.
2. Wenn **Train Pth** nicht mehr über VRAM verfügt, entladen Sie das Inferenzmodell, schließen Sie konkurrierende GPU-Jobs, reduzieren Sie **Stapelgröße** und deaktivieren Sie das GPU-Dataset-Caching, falls aktiviert. Überprüfen Sie im **Trainingsprotokoll** die wirksamen Einstellungen, bevor Sie es erneut versuchen.
3. Wenn **Train Index** fehlschlägt, überprüfen Sie, ob die extrahierten Features zum ausgewählten Experiment gehören. Für die Konvertierung ist ein Index optional. Sie können einen funktionierenden Inferenzexport bei **Indexverhältnis 0** testen, während Sie den Index diagnostizieren.
4. Um das Training zu unterbrechen, klicken Sie auf **Stoppen und speichern** und warten Sie auf die Bestätigung. Um fortzufahren, verwenden Sie denselben Experimentnamen und dieselben kompatiblen Einstellungen. Halten Sie die G/D-Kontrollpunkte und den Experimentstatus zusammen. Ein Inferenzexport allein kann das Training nicht fortsetzen.
5. Wenn Sie die Sample-Rate, den Vocoder oder den Embedder geändert haben, erstellen Sie ein separates Experiment und bereiten Sie Funktionen für diese Konfiguration vor. Halten Sie den Originallauf zum Vergleich bereit.

## Eine Kaggle-Sitzung wiederherstellen

Wenn der Browser-Link nicht mehr funktioniert, prüfen Sie, ob die Kaggle-Sitzung noch läuft. Verwenden Sie nach dem erneuten Öffnen der Dienste die neuen Links und die aktuellen Anmeldeinformationen, die für jeden Dienst angezeigt werden. WebUI und FileBrowser verfügen über separate Anmeldungen. Exportieren und laden Sie Ihre Ergebnisse herunter, bevor Sie die Sitzung zurücksetzen. Befolgen Sie die [Kaggle-Anleitung](../cloud/kaggle.md) für die Sicherungsschritte.

## Sammeln Sie Details für einen Bericht

Kopieren Sie die App-Version, die genaue GPU und den ersten Fehler. Fügen Sie die von Ihnen gedrückte Taste und eine kurze Sequenz hinzu, die das Problem reproduziert. Geben Sie für das Training die fehlgeschlagene Phase, die Abtastrate, den Einbetter an und geben Sie an, ob Sie einen Lauf fortgesetzt haben. Geben Sie bei der Konvertierung an, ob derselbe Clip mit einem anderen Modell oder mit deaktiviertem Abruf funktioniert hat. Falls verfügbar, verwenden Sie **Trainings-Dashboard → Diagnosebericht**. Überprüfen Sie den Bericht, bevor Sie ihn freigeben, und entfernen Sie private Pfade, Passwörter und Sitzungslinks.
