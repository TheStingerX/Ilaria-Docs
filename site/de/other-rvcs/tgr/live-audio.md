# Richten Sie Live-Audio in Okada TG Developed Fork ein

> **Correct Audio Routing**
>
> **1. Im Voice Changer**
> - **Input Device:** Dein physisches Mikrofon.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. In Discord, Spielen, OBS oder anderen Anwendungen**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Deine Kopfhörer oder Lautsprecher.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> Audio aus Discord, dem Spiel oder anderen Apps muss direkt auf deine **Kopfhörer** gehen (niemals zurück in das virtuelle Kabel).
>
> - **VAC vs. VB-CABLE:** `Line 1` ist der Name von **VAC (Virtual Audio Cable)**, kein universeller Name für alle virtuellen Kabel. Bei **VB-CABLE** wähle als Voice-Changer-Output **`CABLE Input`** und als Discord-/Spiel-Input **`CABLE Output`**.
> - **Monitoring:** Das Mithören der eigenen konvertierten Stimme im Kopfhörer ist eine separate optionale Funktion, die nur bei Bedarf aktiviert werden sollte. Vermeide doppelte Audiowege, Echo und Loopback.

Verwenden Sie einen kompatiblen RVC-Inferenzkontrollpunkt und ein funktionierendes Mikrofon. Stellen Sie zunächst sicher, dass das umgewandelte Signal Ihren Kopfhörer erreicht. Senden Sie dieses Signal dann an eine andere Anwendung und machen Sie eine Aufzeichnung vom Empfängerende.

## Laden Sie eine RVC-Stimme.

1. Stoppen Sie die Konvertierung, wenn sie bereits läuft. Öffnen Sie **Bearbeiten** im Modellauswahlbereich und wählen Sie einen leeren Steckplatz aus.
2. Wählen Sie **Hochladen** und wählen Sie die RVC-Inferenzmodelldatei aus. Wenn das Dialogfeld ein separates Feld für den Index anzeigt, fügen Sie das entsprechende `.index` hinzu, falls angegeben. Verwenden Sie nur kompatible Inferenzdateien. Ein Index allein kann keine Stimme erzeugen.
3. Warten Sie den Upload ab und klicken Sie in der Hauptansicht auf den neu geladenen Slot. Überprüfen Sie den Modellnamen, bevor Sie Start drücken.
4. Pitch und Retrieval auf Null setzen. Stellen Sie sicher, dass **Passthrough** ausgeschaltet ist. Im aktivierten Zustand wird das trockene Mikrofon gesendet, sodass das Mikrofon einen Anruf auch dann erreichen kann, wenn die Konvertierung umgangen wird.

## Testen Sie das Mikrofon und das Computergerät.

1. Wählen Sie unter **Audio** den Modus für die Geräte aus, die Sie verwenden möchten. Verwenden Sie in einem lokalen Browsertest **Client** und gewähren Sie der Site Zugriff auf Ihr Mikrofon. Wählen Sie unter **Server** die Eingabe- und Ausgabegeräte aus, die für den Prozess sichtbar sind, der TGR ausführt.
2. Benennen Sie die Endpunkte, bevor Sie beginnen. **Eingang** ist das physische Mikrofon, **Ausgang** ist der Kopfhörer für den ersten Test und **Monitor** ist optional, wenn Ihr Build dies bietet.
3. Wählen Sie in der Geräteauswahl die gewünschte GPU oder CPU aus. Versuchen Sie für eine DirectML-Basislinie `rmvpe_onnx`, falls aufgeführt. Zu den vom Fork dokumentierten unterstützten DirectML-Tonhöhendetektoren gehören auch `fcpe_onnx`, `crepe_tiny_onnx` und `crepe_full_onnx`. Der CUDA-Build kann eine andere Liste verfügbar machen.
4. Drücken Sie **Start** bei der Standard-Chunk-Größe. Geben Sie dem Modell Zeit, sich zu initialisieren, und sagen Sie dann einen leisen und einen längeren, lauteren Satz. Pause zwischen beiden. Überprüfen Sie, ob sich die Ausgabe bei der Auswahl des Modells ändert und dass der Ton eine Minute lang stabil bleibt.
5. Wenn Sie auch eine trockene Kopie hören, schalten Sie den Hardware-Mithörton aus oder entfernen Sie die andere Mikrofonschleife im Betriebssystem. Halten Sie den Kopfhörerpegel während der Tests moderat.

## Schließen Sie ein Kabel an

Der Herausgeber von TGR verwendet Virtual Audio Cable von Muzychenko für seine Windows-Fehlerbehebungsbeispiele. Dadurch werden in der Regel übereinstimmende Wiedergabe- und Aufzeichnungsendpunkte mit dem Namen **Zeile 1** verfügbar gemacht. Andere Kabeltreiber verwenden andere Bezeichnungen. Das Signal muss am Wiedergabeendpunkt eintreten und über den passenden Aufnahmeendpunkt wieder verlassen.

| Einstellung | Erster Routing-Test |
| --- | --- |
| TGR-Eingang | Ihr physisches Mikrofon, dasselbe, das im Kopfhörertest funktioniert hat. |
| TGR-Ausgang | Kabelwiedergabe-Endpunkt. |
| TGR-Monitor | Kopfhörer, sofern als separater Ausgang angezeigt. |
| Discord- oder OBS-Eingabe | Der Aufnahmeendpunkt des Kabels. |
| Discord-Ausgabe oder OS-Wiedergabe | Kopfhörer. |

1. Installieren Sie das Kabel und starten Sie die Anwendungen neu, um die Audiogeräte zu aktualisieren.
2. Stellen Sie die Geräte wie gezeigt ein und überprüfen Sie dann die Standardformate für Mikrofon und Kabel in den Soundeinstellungen des Betriebssystems. Wählen Sie eine allgemein unterstützte Abtastrate. Suchen Sie im Servermodus nach doppelten Gerätenamen, die unter verschiedenen Host-APIs aufgeführt sind, und verwenden Sie ein kompatibles Paar.
3. Starten Sie die Konvertierung und starten Sie dann den Mikrofontest der empfangenden Anwendung. Nehmen Sie einen kurzen Satz auf. Hören Sie zu, was der Empfänger empfängt, nicht nur den Monitor in TGR.
4. Deaktivieren Sie in OBS das separate physische Mikrofon, wenn es die Kabelquelle dupliziert. Überprüfen Sie bei einem Anruf, ob der ausgewählte Eingang explizit ist und nicht automatisch umschaltet, wenn Sie ein neues Headset anschließen.
5. Stoppen Sie den Konverter. Wenn das empfangende Messgerät weiterhin reagiert, überprüfen Sie den ausgewählten Aufnahmeendpunkt und alle in das Kabel eingespeisten Desktop-Audiosignale.

## Optimieren Sie DirectML und CUDA, ohne Ihre Grundlinie zu verlieren

**Chunk** steuert den Block eingehender Audiodaten. **Extra** liefert Kontext rund um den aktuellen Block. **Crossfade**-Steuerelemente überlappen sich dort, wo Blöcke zusammentreffen. Ändern Sie jeweils eine Steuerung und machen Sie eine Testaufnahme. Wenn sich die Verarbeitungszeit der Blockdauer nähert, erhöhen Sie zunächst den Block oder reduzieren Sie den zusätzlichen Kontext. Wenn sich ein geänderter Block seltsam verhält, stoppen Sie die Konvertierung und starten Sie sie erneut.

Beim dokumentierten DirectML-Build können Änderungen an Chunk, Extra und Crossfade die Auswahl der CPU und dann die erneute Auswahl der vorgesehenen GPU erfordern. Tun Sie dies nach dem Stoppen, starten Sie den Stream neu und wiederholen Sie denselben Test, bevor Sie die Latenz bewerten. Lassen Sie bei CUDA vor dem Messen eine erste Aufwärmphase zu. Einige Server-Audio- und Protokollkombinationen zeigen **perf** ohne andere Timings. Beurteilen Sie den gesamten Anrufpfad anhand einer Aufzeichnung in der empfangenden App.

| Störung | Nächste Aktion |
| --- | --- |
| Das Mikrofon geht unverändert durch | Schalten Sie **Passthrough** aus, überprüfen Sie den ausgewählten Steckplatz und wählen Sie das Kabel als einziges Mikrofon der empfangenden App aus. |
| Eine leise Silbe verschwindet | Testen Sie die Eingabeschwelle und die Spracherkennung der Ziel-App separat. Überprüfen Sie eine einfache Aufnahme auf tatsächliche Stille. |
| Klicks beginnen, nachdem das Kabel angeschlossen ist. | Vergleichen Sie die Mikrofon- und Kabel-Abtastraten und die Host-API-Auswahl. Führen Sie den Test erneut ohne Kabel durch, um zu bestätigen, in welcher Phase das Klicken ausgelöst wird. |
| Wörter stottern, wenn ein Spiel geöffnet wird. | Stellen Sie den letzten stabilen Block wieder her, reduzieren Sie den Kontext oder die Konkurrenzlast und testen Sie erneut. Behalten Sie die Einstellung bei, die funktioniert, wenn beide Apps geöffnet sind. |
| Nur eine Pitch-Methode stürzt ab oder bleibt stehen. | Kehren Sie zu einer von Ihrem Backend aufgelisteten Methode zurück. Vergleichen Sie in DirectML die ONNX-Tonhöhenoptionen mit derselben kurzen Phrase. |
| Eine zweite App verfügt über ein Messgerät, zeichnet aber Raumgeräusche auf | Stoppen Sie TGR und überprüfen Sie das Messgerät erneut. Ein Messgerät, das Ihrem Mikrofon immer noch folgt, weist auf eine zusätzliche Route oder den falschen Aufnahmeendpunkt hin. |

Wenn Sie Hilfe bei der weiteren Diagnose benötigen, bewahren Sie die Versionskennung, die Backend-, Mikrofon- und Kabelgerätenamen, den ausgewählten Detektor und den ersten Konsolenfehler auf. Bestätigen Sie, ob das Problem auch bei einem lokalen Kopfhörertest auftritt.
