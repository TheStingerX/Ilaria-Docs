# Echtzeit-Sprachkonvertierung

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

Bei einer Aufnahme oder einem Cover können Sie mit der Dateikonvertierung mehrere Takes rendern und vergleichen. In einem Live-Setup muss der Konverter jeden Audioblock schnell genug fertigstellen, um den Mikrofonstrom in Bewegung zu halten. Konfigurieren Sie zunächst ein zuverlässiges lokales Signal und verbinden Sie es dann mit einer Anruf-, Aufnahme- oder Streaming-Anwendung.

## Wählen Sie ein Tool für den Job.

Im [RVC-Tools-Verzeichnis](../reference/tools.md) finden Sie Downloads und Hardware-Hinweise, einschließlich Vonovox für NVIDIA-GPUs.

 | Tool | Wo soll ich anfangen |
| --- | --- |
 | Vonovox | Ein Echtzeitkonverter für RVC V2-Modelle unter Windows mit einer NVIDIA-GPU. Laden Sie einen Build für Ihre GPU herunter, laden Sie das Modell und testen Sie Ihr Mikrofon über Kopfhörer, bevor Sie das konvertierte Signal an eine andere App weiterleiten. [Vonovox-Downloads](https://huggingface.co/dr87/vonovox/tree/main) · [Projektdokumentation](https://github.com/dr87/Vonovox) |
 | RVC WebUI (Mainline - Original RVC) | Das Upstream-Projekt bietet eine Schulungs- und Inferenz-WebUI sowie eine dedizierte Echtzeit-GUI. Beachten Sie die Release- und Launcher-Anweisungen für die von Ihnen verwendete Plattform. |
 | Applio | Die Desktop- und Gradio-Schnittstellen verfügen über eigene Echtzeit-Workflows. Befolgen Sie die Setup-Anweisungen für die Schnittstelle und Version, die Sie installiert haben. |
 | w-okada VCClient | Ein Stimmverzerrer für den Live-Einsatz. Die RVC-Verfügbarkeit hängt von der Release-Edition und der Plattform ab. Überprüfen Sie die unterstützten Modelle, bevor Sie einen Build installieren. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
 | Deiteris und Tg-Develop | Unabhängige w-okada-Forks mit ihren eigenen Builds und Einstellungen. Überprüfen Sie die Versionshinweise des Forks, bevor Sie Anweisungen für eine andere Edition anwenden. [Deiteris-Repository](https://github.com/deiteris/voice-changer) · [Tg-Develop-Repository](https://github.com/tg-develop/voice-changer) |

## Hören Sie zuerst ein sauberes Signal.

1. Schließen Sie ein Mikrofon und Kopfhörer an. Wählen Sie im Konverter Ihr physisches Mikrofon als Eingang und Ihre Kopfhörer als Ausgang aus.
2. Laden Sie ein bekanntermaßen kompatibles Inferenzmodell und seinen passenden Index, wenn Sie Retrieval verwenden. Eine erfolgreiche kurze [Dateikonvertierung](../start/getting-started.md) ist eine nützliche Referenz, bevor Sie den Live-Pfad testen.
3. Starten Sie den Stream und sprechen Sie mit normaler Lautstärke. Überprüfen Sie den Eingangspegel oder machen Sie eine Trockenaufnahme. Reduzieren Sie die Eingangsverstärkung, wenn Spitzen vor der Konvertierung abgeschnitten werden.
4. Stellen Sie sicher, dass sich das Kopfhörersignal ändert, wenn die Konvertierung umgeschaltet wird. Wenn Sie gleichzeitig das Original hören, prüfen Sie, ob eine direkte Hardwareüberwachung oder eine zweite Route durch das Betriebssystem erfolgt.
5. Testen Sie länger als ein einzelnes Wort. Bauen Sie leises Sprechen, einen lauten Satz und eine kurze Pause ein. Achten Sie auf Unterbrechungen, Abweichungen oder Störungen bei derselben Arbeitslast, die Sie live nutzen möchten.

Vermeiden Sie es, über Lautsprecher in der Nähe eines aktiven Mikrofons zu hören. Kopfhörer helfen Ihnen, ein Routing-Problem zu erkennen, ohne den Ausgang wieder in den Eingang einzuspeisen.

## Konvertiertes Audio an eine andere App senden

Ein virtuelles Audiogerät stellt einen Wiedergabeendpunkt für den Konverter und einen entsprechenden Aufnahmeendpunkt für die empfangende App bereit. Endpunktnamen hängen vom Treiber ab. Beispielsweise kann ein virtuelles Kabel seinen Wiedergabeendpunkt „Eingabe“ und seinen Aufnahmeendpunkt „Ausgabe“ nennen, da die Anweisungen die Perspektive des Kabels verwenden.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Wählen Sie in der empfangenden App den passenden Aufnahmeendpunkt als Mikrofon aus und machen Sie dort eine kurze Testaufnahme. Wenn Ihr lokaler Monitor korrekt klingt, die Aufnahme jedoch nicht, überprüfen Sie den Zieleingang und entfernen Sie alle doppelten Mikrofonquellen. Wenn Sie den konvertierten Ton überwachen, verwenden Sie einen separaten Kopfhörerausgang. Vermeiden Sie es, Ihren gesamten Desktop-Mix oder das Audio der empfangenden App zurück in den Konverter zu leiten.

## Optimieren Sie die Latenz, ohne an Stabilität zu verlieren.

Die End-to-End-Verzögerung umfasst Gerätepuffer, Konvertierung, virtuelles Routing und jegliche Verarbeitung im Ziel. Eine Verarbeitungszeitzahl im Konverter misst nur einen Teil dieses Pfades. Erfassen Sie einen lokalen Test sowohl des Trockenmikrofons als auch der konvertierten Route, wenn Sie die Verzögerung zwischen ihnen messen müssen.

 | Steuerung | Praktische Einstellung |
| --- | --- |
 | Blockgröße oder Chunk-Größe | Erhöhen Sie diese, wenn die Sprache unter Last unterbrochen wird. Sobald die Einstellung stabil ist, versuchen Sie es mit einer kleineren Einstellung und behalten Sie diese nur bei, wenn die normale Sprache sauber bleibt. Bei kleineren Blöcken bleibt weniger Zeit, die Verarbeitung abzuschließen. |
 | Crossfade | Erhöhen Sie vorsichtig, wenn Sie raue Übergänge zwischen Blöcken hören. Es ändert die Art und Weise, wie benachbarte Blöcke überlappen. |
 | Zusätzlicher Kontext | Versuchen Sie weniger Kontext, wenn der Konverter ins Hintertreffen gerät. Dies kann dem Modell helfen, Übergängen zu folgen, allerdings auf Kosten einer höheren Verarbeitungsleistung. |
 | Tonhöhenprädiktor | Wenn eine Einstellung zu instabilem Timing führt, vergleichen Sie die verfügbaren Prädiktoren mit denselben Phrasen. Wählen Sie diejenige aus, die Ihren Tonhöhenbereich mit genügend Verarbeitungsspielraum abdeckt. |
 | Stilleerkennung oder Eingabeschwelle | Senken Sie einen Schwellenwert, der weiche Silben abschneidet. Bewerten Sie dies bei Pausen und leisem Sprechen, nicht nur bei einer anhaltenden lauten Eingabe. |
 | Geräterate | Überprüfen Sie die Abtastraten des Geräts und des virtuellen Kabels, wenn Sie ungewöhnliche Geschwindigkeit oder Knistern hören. Beginnen Sie mit kompatiblen Einstellungen in der gesamten Kette. |

Beginnen Sie mit den App-Standardeinstellungen und ändern Sie jeweils eine Einstellung. Wenn ein Spiel oder ein anderes GPU-lastiges Programm die Maschine gemeinsam nutzt, wiederholen Sie den Test, während es läuft. Behalten Sie eine funktionierende Voreinstellung bei, damit Sie sie wiederherstellen können, bevor Sie live gehen. [Haupt-Echtzeit-GUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Fehlerbehebung anhand der Stelle, an der der Fehler auftritt

 | Symptom | Zuerst prüfen |
| --- | --- |
 | Weder das Konvertermessgerät noch eine Trockenmikrofonaufnahme reagieren | Überprüfen Sie das Eingabegerät und die Mikrofonberechtigung des Betriebssystems. |
 | Das Trockenmikrofon funktioniert, aber die konvertierte Ausgabe ist stumm. | Bestätigen Sie, dass der Stream gestartet, das Modell geladen und der Konverter die richtige Ausgabe ausgewählt hat. Überprüfen Sie die Eingabeschwelle. |
 | Der lokale Monitor funktioniert, aber der Anruf empfängt die Originalstimme. | Wählen Sie den virtuellen Aufzeichnungsendpunkt als Anrufmikrofon und deaktivieren Sie alle separaten physischen Mikrofonquellen in dieser App. |
 | Sie hören zwei Versionen der Stimme | Schalten Sie doppelte Eingaberouten stumm und stellen Sie sicher, dass der Kopfhörermonitor von der virtuellen Route getrennt ist. |
 | Audio knistert nur unter Last. | Kehren Sie zur letzten stabilen Blockgröße zurück, reduzieren Sie konkurrierende Arbeitslasten und testen Sie erneut. |
 | Ein Modell funktioniert bei der Dateikonvertierung, schlägt jedoch live fehl | Überprüfen Sie die Edition, Architektur und Embedder-Unterstützung des Live-Clients. Testen Sie ein Modell, das in diesem Client als kompatibel aufgeführt ist, bevor Sie das Audiogerät wechseln. |

[RVC-Grundlagen](../start/rvc-fundamentals.md) · [Fehlerbehebung](../reference/troubleshooting.md)

## RVC Blue

Echtzeit-Stimmkonvertierung unter Windows. [Installation und Einrichtung](../other-rvcs/rvc-blue/installation.md).
## Geräte-Rollen und Audio-Backends

| Begriff | Bedeutung |
| --- | --- |
| **Input Device** | Dein physisches Mikrofon für den Eingang. |
| **Output Device** | Ziel der konvertierten Stimme (Wiedergabeseite des virtuellen Kabels für Discord/OBS/Spiele oder Kopfhörer). |
| **Monitor Device** | Optionaler zweiter Ausgang zum Mithören per Kopfhörer. |
| **Virtual Cable Input** *(Wiedergabe)* | Unter Windows-Wiedergabe (Line 1 / CABLE Input). Als **Output Device** wählen. |
| **Virtual Cable Output** *(Aufnahme)* | Unter Windows-Aufnahme (Line 1 / CABLE Output). In Discord/OBS/Spielen als **Mikrofon** wählen. |

- **USB-Mikrofone / XLR-Interfaces / WASAPI / ASIO:** Alles auf 48000 Hz stellen; **WASAPI Shared** für Kompatibilität, **WASAPI Exclusive** oder **ASIO** falls unterstützt.
- **Discord, OBS & Spiele:** Krisp/Echounterdrückung in Discord bei abgeschnittenen Silben deaktivieren; Spiel-FPS begrenzen für GPU-Reserve.
- **Rechenlatenz vs. Gesamtlatenz:** **GPU Delay** misst nur die GPU-Zeit pro Block; die **End-to-End-Latenz** umfasst Mikrofon, **Block Size**, virtuelles Kabel und Zielpuffer.
