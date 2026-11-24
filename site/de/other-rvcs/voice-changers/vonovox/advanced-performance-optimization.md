# Erweiterte Leistungsoptimierung: NVIDIA GPU Clock Locking

> **Optionale Optimierung:** Diese Anleitung ist **100% optional** und **niemals erforderlich**, um Vonovox zu installieren oder zu nutzen. Schließe immer zuerst [Vonovox installieren](installation.md) und [Vonovox routen und abstimmen](live-audio.md) ab, bevor du erweiterte GPU-Einstellungen testest.

**Grundprinzip:** GPU Clock Locking ist eine optionale erweiterte Optimierung, die die Echtzeit-Verarbeitungsstabilität von Vonovox auf unterstützten NVIDIA-GPUs verbessern kann. Verwende immer unterstützte Taktfrequenzen, teste die Ergebnisse auf deiner eigenen Hardware und stelle die Standardtakte wieder her, wenn kein messbarer Nutzen erkennbar ist.

> **Schnelles Zurücksetzen (jederzeit ausführen, um Standardwerte wiederherzustellen):** Öffne die Eingabeaufforderung als Administrator und führe `nvidia-smi -i 0 -rgc` aus (ersetze `0` durch deinen GPU-Index, falls du mehrere GPUs hast). Du kannst Windows auch neu starten, um zur dynamischen Taktverwaltung zurückzukehren.

## Inhaltsverzeichnis

- [Schnellpfad für erfahrene Nutzer](#schnellpfad-für-erfahrene-nutzer)
- [1. Was GPU Clock Locking ist (Einsteiger-Einführung)](#1-was-gpu-clock-locking-ist-einsteiger-einführung)
- [2. Wie GPU-Takte Vonovox beeinflussen](#2-wie-gpu-takte-vonovox-beeinflussen)
- [3. NVIDIA-Kompatibilität & Fehlermeldungen](#3-nvidia-kompatibilität--fehlermeldungen)
- [4. Einsteiger-Einrichtung: Windows 10 & Windows 11](#4-einsteiger-einrichtung-windows-10--windows-11)
- [5. Unterstützte Takte deiner GPU finden](#5-unterstützte-takte-deiner-gpu-finden)
- [6. Eine geeignete Frequenz wählen](#6-eine-geeignete-frequenz-wählen)
- [7. GPU Clock Lock anwenden](#7-gpu-clock-lock-anwenden)
- [8. Standardeinstellungen wiederherstellen](#8-standardeinstellungen-wiederherstellen)
- [9. Ein-Klick-GPU-Taktverwaltung (BAT-Skripte)](#9-ein-klick-gpu-taktverwaltung-bat-skripte)
- [10. Wie du testest, ob es wirklich hilft](#10-wie-du-testest-ob-es-wirklich-hilft)
- [11. Risiken, Einschränkungen und Vorsichtsmaßnahmen](#11-risiken-einschränkungen-und-vorsichtsmaßnahmen)
- [12. Erweiterter Hinweis: GPU-Speichertakt-Sperre (-lmc)](#12-erweiterter-hinweis-gpu-speichertakt-sperre--lmc)
- [13. Alternativen, wenn Clock Locking nicht hilft](#13-alternativen-wenn-clock-locking-nicht-hilft)
- [14. Fehlerbehebung](#14-fehlerbehebung)
- [15. Häufig gestellte Fragen (FAQ)](#15-häufig-gestellte-fragen-faq)
- [16. Offizielle Referenzen](#16-offizielle-referenzen)

---

## Schnellpfad für erfahrene Nutzer

Wenn du bereits weißt, wie man eine Eingabeaufforderung mit Administratorrechten und `nvidia-smi` nutzt:

1. GPUs auflisten und Zielindex bestätigen (`0` bei Systemen mit einer GPU):
   ```bat
   nvidia-smi -L
   ```
2. Unterstützte Grafiktakte auf dieser GPU abfragen:
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Auf einen **verifizierten unterstützten** Grafiktakt aus der Ausgabe sperren (`1800` unten ist nur ein Beispielwert):
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Live-Takte prüfen, während Vonovox läuft:
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Einen [A/B-Test in Vonovox](#10-wie-du-testest-ob-es-wirklich-hilft) durchführen. Nach Abschluss oder ohne Verbesserung sofort dynamische Takte wiederherstellen:
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. Was GPU Clock Locking ist (Einsteiger-Einführung)

1. **Was eine GPU-Frequenz (Taktgeschwindigkeit) ist:** In deiner NVIDIA-Grafikkarte führt der Hauptprozessor (der GPU-Kern) jede Sekunde Millionen kleiner Rechenoperationen aus. Seine **Taktfrequenz** gibt an, wie viele Rechenzyklen er pro Sekunde abschließt.
2. **Was MHz bedeutet:** **MHz** steht für **Megahertz** (1 Million Zyklen pro Sekunde). Zum Beispiel bedeuten `1500 MHz` 1,5 Milliarden Zyklen pro Sekunde und `1800 MHz` 1,8 Milliarden Zyklen pro Sekunde.
3. **Wie dynamische NVIDIA-Takte funktionieren:** Moderne NVIDIA-GPUs laufen nicht mit einer einzigen festen Geschwindigkeit. Wenn dein PC im Leerlauf auf dem Desktop ist, senkt die GPU den Takt auf eine niedrige Geschwindigkeit (z. B. `210 MHz` oder `300 MHz`), um Strom zu sparen, leise zu bleiben und kühl zu bleiben. Bei hoher Last steigt die Geschwindigkeit.
4. **Was NVIDIA GPU Boost ist:** **NVIDIA GPU Boost** ist das integrierte automatische System, das die Frequenz deiner GPU ständig nach oben und unten anpasst - je nach Auslastung, Temperatur, Leistungsgrenzen und Spannungsreserve.
5. **Warum Takte während Vonovox schwanken:** Echtzeit-Stimmenkonvertierung verarbeitet Audio in diskreten Blöcken (die genaue Blockdauer hängt von deiner **Block Size** und den Audioeinstellungen ab) statt als durchgehendes schweres 3D-Rendering. Zwischen den Blöcken sieht die GPU eventuell kurz geringe Last, senkt den Takt und fährt beim nächsten Block wieder hoch.
6. **Was das Sperren eines Takts bedeutet:** **GPU Clock Locking** (`nvidia-smi -lgc`) weist den NVIDIA-Treiber an, den GPU-Kern in einem bestimmten unterstützten Frequenzbereich (oder bei einer einzelnen unterstützten Frequenz, wenn min und max gleich sind) zu halten, statt ihn ständig abfallen und wieder hochlaufen zu lassen. Stell es dir wie einen **Tempomat auf der Autobahn** vor: Das Auto hält ein gleichmäßiges Tempo, statt immer wieder abzubremsen und zu beschleunigen.
7. **GPU Clock Locking vs. Overclocking:**
   - **Overclocking** treibt eine GPU *über* ihre Werksspezifikationen hinaus oder verändert Spannungen/Leistungskurven für höhere Spitzengeschwindigkeit.
   - **GPU Clock Locking** wählt nur eine Frequenz aus, die NVIDIA bereits in der offiziellen Tabelle unterstützter Takte deiner Karte hinterlegt hat. Es hebt **weder** Spannungen an, **noch** hebt es Leistungsgrenzen auf oder erzwingt nicht unterstützte Geschwindigkeiten.
8. **Warum ein stabiler Takt Echtzeit-Audio helfen kann:** Wenn deine GPU `8 ms` für einen Audioblock bei hohem Takt braucht und `18 ms`, wenn sie vorübergehend heruntertaktet, kann dieser plötzliche Sprung ungleichmäßige Verarbeitungszeiten verursachen. Ein gleichmäßiger unterstützter Takt kann die Verarbeitungszeiten pro Block konstanter halten.
9. **Warum der Maximaltakt nicht immer am besten ist:** Der absolut höchste unterstützte MHz-Wert erhöht Wärme, Lüfterlautstärke und Stromverbrauch. Erreicht deine GPU ihr Temperatur- oder Powerlimit, wird sie automatisch **throtteln** (sich selbst heruntertakten), was schlimmere Ruckler erzeugt als ein moderater, stabiler Takt.

---

## 2. Wie GPU-Takte Vonovox beeinflussen

Vonovox verarbeitet Live-Mikrofonaudio über **CUDA** auf deiner NVIDIA-GPU. Jeder Audioblock (bestimmt durch **Block Size**) muss fertig verarbeitet sein, bevor der nächste Block eintrifft.

- **GPU Delay & Schwankung der Verarbeitungszeit:** In Vonovox zeigt **GPU Delay**, wie lange die GPU zum Konvertieren jedes Blocks braucht. Wenn GPU-Takte zwischen Leerlauf und Boost springen, kann GPU Delay unerwartet ausschlagen.
- **Audio-Knackser, Knallen und Stottern:** Wenn auch nur ein Audioblock zu spät fertig wird, weil die GPU erst noch hochtaktete, läuft der Audiopuffer leer und du hörst ein Klicken, Knacken oder robotisches Stottern.
- **Buffer Size und Block Size:** Größere **Block Size**-Werte geben der GPU mehr Spielraum auf Kosten höherer Gesamtlatenz. Kleinere **Block Size**-Werte fühlen sich direkter an, reagieren aber deutlich empfindlicher auf plötzliche GPU-Delay-Spitzen.
- **WASAPI und WASAPI Exclusive Mode:** **WASAPI** (Windows Audio Session API) steuert das Audio-Routing zwischen Mikrofon, Vonovox und virtuellem Kabel. **WASAPI Exclusive Mode** (sofern von Gerät und App unterstützt) kann den Windows-Mixer-Overhead verringern, während der geteilte Modus breitere Kompatibilität bietet. Keiner von beiden behebt eine zu späte GPU, und GPU Clock Locking behebt keine Windows-Audiotreiber- oder Abtastraten-Konflikte.
- **Vonovox + Gaming gleichzeitig:** Wenn du gleichzeitig ein 3D-Spiel spielst und Vonovox nutzt, konkurrieren beide um dieselbe GPU. Sättigt das Spiel **95-100% der GPU-Rechenleistung**, wartet Vonovox unabhängig vom Taktsperren in der Warteschlange. Dann helfen niedrigere Spielgrafik/FPS-Limits oder eine höhere **Block Size** in Vonovox weit mehr als Clock Locking.
- **GPU vs. CPU oder Audiotreiber-Probleme:** Audiostörungen können auch durch CPU-Überlastung, abweichende `48 kHz`-Abtastraten, USB-Energiesparfunktionen des Mikrofons oder ein falsch konfiguriertes virtuelles Kabel entstehen. GPU Clock Locking wirkt ausschließlich auf GPU-Frequenzwechsel.

| Mögliche Vorteile (nicht garantiert) | Was GPU Clock Locking NICHT garantiert |
| --- | --- |
| Vorhersagbareres GPU-Taktverhalten bei stoßweiser Audiolast | Schnellere Stimmkonvertierung insgesamt |
| Weniger plötzliche GPU-Delay-Spitzen auf manchen Desktop-/Laptop-Setups | Beseitigung aller Knackser, Aussetzer oder Dropouts |
| Einfacheres A/B-Troubleshooting beim Eingrenzen von Latenz-Jitter | Bessere Stimmqualität, Klangfarbe oder Tonhöhengenauigkeit |

---

## 3. NVIDIA-Kompatibilität & Fehlermeldungen

Dass `nvidia-smi` installiert ist, garantiert **nicht**, dass `-lgc` (Lock Graphics Clocks) auf deiner Hardware- und Treiberkombination unterstützt wird.

- **Desktop-GeForce-GPUs:** Viele moderne Desktop-GeForce-Karten unterstützen `-lgc` mit aktuellen Treibern, wobei genaue Taktstufen und Verhalten von Architektur und Treiberversion abhängen.
- **Laptop-NVIDIA-GPUs:** Viele Laptops schränken Clock Locking in Firmware/BIOS, Energieverwaltung oder Hybrid-/Optimus-Grafikpfaden ein. Selbst wenn `-lgc` akzeptiert wird, überschreiben thermische und Powerlimits von Laptops den angeforderten Takt häufig.
- **Workstation- / Datacenter-GPUs (Quadro, RTX A-Serie, Tesla, L4/T4):** Unterstützen `nvidia-smi`-Taktsteuerungen mit regulären Enterprise-/Studio-Treibern weitgehend.
- **Ältere Hardware-Generationen & Treiber:** Ältere Architekturen (wie Maxwell/Pascal oder alte Treiber) können `Not Supported` für `-lgc` oder `SUPPORTED_CLOCKS` zurückgeben. Geh nicht davon aus, dass jede GTX- oder RTX-Karte Clock Locking unterstützt.

### Häufige Meldungen und ihre Bedeutung

| Meldung | Bedeutung | Sichere Lösung |
| --- | --- | --- |
| `Not Supported` | Dein GPU-Modell, Laptop-Firmware oder aktueller Treiber erlaubt `-lgc` oder `SUPPORTED_CLOCKS`-Abfragen nicht. | Nicht erzwingen. Clock Locking überspringen und die [Alternativen](#13-alternativen-wenn-clock-locking-nicht-hilft) nutzen. |
| `Insufficient Permissions` | Die Eingabeaufforderung wurde normal statt über **Als Administrator ausführen** geöffnet. | CMD schließen, `cmd` im Startmenü suchen, Rechtsklick auf **Eingabeaufforderung** und **Als Administrator ausführen** wählen. |
| `Invalid Argument` | Die eingegebenen MHz-Werte sind ungültig, nicht als `min,max` formatiert oder außerhalb unterstützter Takte. | `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` ausführen und einen exakten Wert unter **Graphics** wählen. |
| `NVIDIA-SMI has failed` | Der NVIDIA-Treiber antwortet nicht, keine NVIDIA-GPU ist aktiv oder die Karte schläft im Hybrid-Laptop-Modus. | Prüfen, ob die NVIDIA-GPU im Geräte-Manager aktiviert ist und nicht durch einen Eco-/Akku-Modus deaktiviert wurde. |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` liegt nicht in Windows' `PATH`-Variable (bei manchen Setups üblich). | Über den vollständigen Pfad ausführen (siehe [Abschnitt 4](#4-einsteiger-einrichtung-windows-10--windows-11)), ohne Treiber neu zu installieren. |

---

## 4. Einsteiger-Einrichtung: Windows 10 & Windows 11

Folge diesen genauen Schritten, wenn du die Eingabeaufforderung (`cmd`) noch nie benutzt hast:

1. **Prüfe, ob du eine NVIDIA-GPU hast:** Drücke `Strg + Umschalt + Esc` für den **Task-Manager**, klicke auf **Leistung** und suche links nach einer **NVIDIA**-GPU. (Siehst du nur AMD oder Intel, gilt diese Anleitung nicht für deinen PC.)
2. **Startmenü öffnen:** Drücke die **Windows-Taste** auf deiner Tastatur (oder klicke auf das Start-Symbol in der Taskleiste).
3. **Nach `cmd` suchen:** Tippe `cmd` ein (drücke noch nicht Enter).
4. **Als Administrator ausführen:** Klicke mit rechts auf **Eingabeaufforderung** in den Ergebnissen und wähle **Als Administrator ausführen**. Klicke bei der Windows-Abfrage auf **Ja**.
5. **Verstehen, was ein Befehl tut:** Ein schwarzes Fenster mit blinkendem Cursor öffnet sich. Eine Textzeile einzutippen und **Enter** zu drücken weist Windows an, dieses Tool auszuführen und das Ergebnis darunter anzuzeigen.
6. **Befehl kopieren und einfügen:** Kopiere einen Befehl aus dieser Anleitung, klicke in das schwarze Eingabeaufforderungs-Fenster und drücke **Rechtsklick** (oder `Strg + V`) zum Einfügen.
7. **Enter drücken:** Warte einen Moment, bis die Ausgabe erscheint.
8. **Basis-GPU-Status prüfen:** Führe aus:
   ```bat
   nvidia-smi
   ```
   Du solltest eine Tabelle mit Treiberversion, GPU-Name, Temperatur, Speichernutzung und Leistungsaufnahme sehen.
9. **Richtige GPU bei Multi-GPU-Systemen bestimmen:** Falls du mehr als eine NVIDIA-GPU hast, führe aus:
   ```bat
   nvidia-smi -L
   ```
   Dies gibt eine nummerierte Liste wie `GPU 0: NVIDIA GeForce ...` und `GPU 1: ...` aus. Ersetze `0` in `-i 0` durch die Nummer der GPU, die Vonovox nutzt.

### Falls `'nvidia-smi' is not recognized` erscheint

Du musst deinen NVIDIA-Treiber **nicht** neu installieren. Windows weiß lediglich nicht, in welchem Ordner `nvidia-smi.exe` liegt. Versuche es über die Standard-Windows-Ordner:

```bat
"C:\Windows\System32\nvidia-smi.exe"
```

Falls das als nicht gefunden gemeldet wird, versuche den älteren NVIDIA-Ordner:

```bat
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

Welcher Pfad auch funktioniert, nutze ihn anstelle von `nvidia-smi` (oder lass die [BAT-Skripte in Abschnitt 9](#9-ein-klick-gpu-taktverwaltung-bat-skripte) ihn automatisch finden).

---

## 5. Unterstützte Takte deiner GPU finden

Rate niemals eine Frequenz. Frage immer zuerst deine GPU nach ihrer offiziellen Liste:

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`**: Wählt GPU-Index `0` (ändere `0`, falls `nvidia-smi -L` einen anderen Index für deine Ziel-GPU zeigte).
- **`-q -d SUPPORTED_CLOCKS`**: Fragt die offizielle Tabelle der von GPU und Treiber unterstützten **Memory**- und **Graphics**-Taktraten ab.

### So liest du die Ausgabe

Die Ausgabe gruppiert unterstützte **Graphics**-(GPU-Kern-)Frequenzen unter **Memory**-Frequenzen, ähnlich diesem Schema:

```text
Supported Clocks
    Memory                        : XXXX MHz
        Graphics                  : YYYY MHz
        Graphics                  : ZZZZ MHz
```

- **Memory**-Takte gelten für den VRAM (Videospeicher). **Sperre im Standard-Vonovox-Ablauf keine Speichertakte.**
- **Graphics**-Takte sind deine **GPU-Kern**-Frequenzen. Diese Werte nutzt du mit `-lgc`.
- **Bestätige, dass dein Wert gelistet ist:** Wähle nur eine Zahl, die exakt so neben `Graphics :` in deiner Ausgabe steht.
- **Falls `N/A` oder `Not Supported` ausgegeben wird:** Deine GPU-/Treiber-Kombination legt unterstützte Takte nicht über NVML offen. Versuche nicht, zufällige Zahlen zu erzwingen; gehe weiter zu [Alternativen](#13-alternativen-wenn-clock-locking-nicht-hilft).

> **Gib KEINE willkürlichen hohen Werte (wie `50000` MHz) ein:** Laut NVIDIA-Dokumentation runden oder setzen manche Geräte und Treiber einen angeforderten Takt auf die nächstliegende unterstützte Frequenz, während Werte außerhalb des Bereichs mit `Invalid Argument` fehlschlagen oder komplett abgelehnt werden können. Gib niemals beliebige Zahlen ein, um dich auf Treiberrundung zu verlassen. Nutze immer einen exakten `Graphics`-Wert aus `SUPPORTED_CLOCKS`.

---

## 6. Eine geeignete Frequenz wählen

Es gibt **keinen einzelnen "besten MHz-Wert"** für jedes GPU-Modell, PC-Gehäuse oder jede Raumtemperatur. Folge diesem sicheren Auswahlprozess:

1. **Beobachte zuerst die normalen Takte deiner GPU:** Öffne Vonovox, starte die Live-Konvertierung und führe `nvidia-smi -i 0 -q -d CLOCK` in CMD aus, um zu sehen, welche Graphics-MHz deine Karte natürlich nutzt.
2. **Prüfe `SUPPORTED_CLOCKS`:** Wähle einen Wert aus deiner `Graphics`-Liste, der bequem um oder leicht unter deinem typischen Boost-Bereich liegt.
3. **Wähle nicht automatisch das Maximum:** Der höchste gelistete Takt zieht am meisten Strom und erzeugt am meisten Hitze. Ein etwas niedrigerer unterstützter Takt bleibt oft kühler und vermeidet Throttling.
4. **Beobachte Temperaturen und Stromverbrauch:** Behalte `nvidia-smi` beim Testen im Blick. Steigen Temperaturen schnell oder drehen Lüfter voll auf, wähle einen niedrigeren unterstützten Takt.
5. **Prüfe auf Thermal- oder Power-Throttling:** Führe unter Last `nvidia-smi -i 0 -q -d PERFORMANCE` aus, um zu sehen, ob `SW Thermal Slowdown` oder `HW Thermal Slowdown` auf `Active` springt.
6. **Teste bei Bedarf 2-3 unterstützte Werte:** Vergleiche sie mithilfe des [A/B-Tests](#10-wie-du-testest-ob-es-wirklich-hilft).
7. **Behalte es nur, wenn es hilft:** Wenn du keinen messbar ruhigeren **GPU Delay** oder saubereres Audio siehst, stelle Standardwerte wieder her.

---

## 7. GPU Clock Lock anwenden

Um den GPU-Kerntakt zu sperren, verwende `-lgc min,max`.

> **Nur anschauliches Beispiel:** In den Befehlen unten ist `1800` MHz **rein ein Demonstrationswert**. Ersetze `1800` durch eine exakte `Graphics`-Frequenz aus **deiner eigenen** `SUPPORTED_CLOCKS`-Ausgabe.

**Auf einen einzelnen unterstützten Takt sperren (min und max gleich):**

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

- **`-i 0`**: Ziel-GPU-Index `0`.
- **`-lgc`**: Lock Graphics Clocks.
- **`1800,1800`**: Minimaler und maximaler Grafiktakt in MHz (durch Komma getrennt, ohne Leerzeichen).

**Beispiel mit einem Bereich (unterschiedliches min und max):**

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

Dadurch darf NVIDIA GPU Boost zwischen zwei unterstützten Frequenzen wechseln (`1500` und `1800` MHz in diesem Beispiel), verhindert aber, dass die Karte zwischen Audioblöcken in tiefe Leerlauftakte fällt.

### Prüfen, ob die Taktsperre akzeptiert vs. tatsächlich beobachtet wurde

Es ist wichtig zu unterscheiden zwischen:
- **Angeforderter Frequenz:** Dem MHz-Wert, den du an `-lgc` übergeben hast.
- **Konfiguriertem Bereich (`min,max`):** Den vom Treiber akzeptierten Grenzen (beachte, dass manche Treiber/Geräte auf den nächstgelegenen unterstützten Takt springen können).
- **Tatsächlich beobachteter Frequenz:** Dem realen Takt, mit dem deine GPU unter Last läuft.

Nach Ausführung von `-lgc` bestätigt CMD nur, dass der Treiber die Anfrage akzeptiert hat. Akzeptanz garantiert **nicht**, dass die GPU exakt auf diesem MHz-Wert bleibt. Um den **tatsächlich beobachteten Live-Takt** zu prüfen, während Vonovox Audio konvertiert, führe aus:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

Oder beobachte die sekündliche Aktualisierung (`Strg + C` zum Beenden):

```bat
nvidia-smi -i 0 -q -d CLOCK -l 1
```

Achte auf **Clocks → Graphics** in der Ausgabe. **Thermische Limits, Powerlimits sowie Treiber- oder Laptop-Firmware-Einschränkungen** können die GPU weiterhin daran hindern, exakt das angeforderte MHz zu halten, und `-lgc` hält unter manchen Bedingungen nicht immer eine völlig starre Frequenz.

---

## 8. Standardeinstellungen wiederherstellen

Stelle immer wieder die dynamische Taktverwaltung her, wenn du mit dem Testen fertig bist, Vonovox schließt oder keinen Vorteil siehst (ersetze `0` durch den konfigurierten GPU-Index, falls du mehrere GPUs hast):

```bat
nvidia-smi -i 0 -rgc
```

- **Was es tut:** `-rgc` (**Reset Graphics Clocks**) entfernt die Taktsperre und gibt die Kontrolle an NVIDIA GPU Boost zurück.
- **Warum Standardwerte wiederherstellen:** Dynamische Takte halten deine GPU bei normaler Desktop-Nutzung, Videowiedergabe und Spielen kühler, leiser und sparsamer.
- **Wie man die Wiederherstellung prüft:** Führe im Desktop-Leerlauf `nvidia-smi -i 0 -q -d CLOCK` aus; nach wenigen Sekunden sollte der **Graphics**-Takt wieder auf niedrige Leerlaufwerte fallen.
- **Neustarts und Treiber-Resets:** `nvidia-smi -lgc` ist **nicht dauerhaft**. Ein Neustart von Windows oder des Grafiktreibers setzt die Takte normalerweise automatisch zurück.
- **Falls `-rgc` einen Fehler meldet:** `-rgc` gelingt nicht garantiert, wenn der NVIDIA-Treiber selbst in einem Fehlerzustand ist. Stelle sicher, dass CMD **als Administrator** läuft, prüfe ob der `-i`-Index zu `nvidia-smi -L` passt, oder **starte Windows neu**, um dynamische Takte wiederherzustellen.

---

## 9. Ein-Klick-GPU-Taktverwaltung (BAT-Skripte)

Diese beiden Windows-`.bat`-Skripte nutzen integriertes Windows PowerShell (keine Zusatzsoftware nötig), um den sicheren Ablauf oben zu automatisieren:

- **Was die Skripte tun:** `Lock-GPU-Clocks.bat` sperrt vorübergehend **nur** den **Graphics**-Kerntakt deiner NVIDIA-GPU, bis du ihn zurücksetzt oder neu startest. `Reset-GPU-Clocks.bat` entfernt diese Sperre und gibt die Kontrolle an NVIDIA GPU Boost zurück.
- **Keine riskanten Änderungen:** Keines der Skripte übertaktet, verändert Spannungen, ändert Powerlimits, deaktiviert Windows-Schutzfunktionen oder nimmt dauerhafte Systemänderungen vor.
- **Strenge Eingabe- & Frequenzprüfung:** `Lock-GPU-Clocks.bat` prüft Administratorrechte unabhängig vom Windows-Dienst `Server`, verifiziert, dass dein gewählter GPU-Index in `nvidia-smi -L` existiert, liest **nur** `Graphics`-Takte aus `SUPPORTED_CLOCKS` aus (ignoriert `Memory`-Takte), lehnt willkürliche oder ungeprüfte Zahlen (wie `50000`) ab und wählt **niemals** automatisch den Maximaltakt.
- **Sichere Fehlerbehandlung:** Falls `-lgc` fehlschlägt, führt das Skript **nicht** automatisch `-rgc` aus, zeigt den NVIDIA-Exitcode und erklärt, wie du deine aktuellen Takte prüfst. Zudem nutzt es strukturierte Telemetrie über `nvidia-smi --query-gpu=clocks.gr`, um zwischen Treiberakzeptanz und tatsächlich beobachtetem Takt zu unterscheiden.

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Klicken zum Aufklappen und Anzeigen des vollständigen Codes von Lock-GPU-Clocks.bat</strong></summary>

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Lock NVIDIA GPU Clocks
set "BAT_PATH=%~f0"
powershell.exe -NoProfile -Command "$code = (Get-Content -LiteralPath $env:BAT_PATH | Where-Object { $_ -match '^::PS ' } | ForEach-Object { $_.Substring(5) }) -join [Environment]::NewLine; & ([ScriptBlock]::Create($code)); exit $LASTEXITCODE"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXIT_CODE%

::PS Write-Host '============================================================'
::PS Write-Host '  Vonovox Optional Helper: Lock NVIDIA GPU Core Clocks'
::PS Write-Host '  No overclocking, no voltage changes, temporary until reboot'
::PS Write-Host '============================================================'
::PS Write-Host ''
::PS
::PS $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
::PS if (-not $isAdmin) {
::PS     Write-Host '[ERROR] Administrator privileges are required.'
::PS     Write-Host 'How to fix: Right-click Lock-GPU-Clocks.bat and choose "Run as administrator".'
::PS     exit 1
::PS }
::PS
::PS $nvsmi = $null
::PS $cmd = Get-Command nvidia-smi -ErrorAction SilentlyContinue
::PS if ($cmd) { $nvsmi = $cmd.Source }
::PS elseif (Test-Path -LiteralPath 'C:\Windows\System32\nvidia-smi.exe') { $nvsmi = 'C:\Windows\System32\nvidia-smi.exe' }
::PS elseif (Test-Path -LiteralPath 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe') { $nvsmi = 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe' }
::PS if (-not $nvsmi) {
::PS     Write-Host '[ERROR] nvidia-smi.exe was not found on this system.'
::PS     Write-Host 'Make sure you have an NVIDIA GPU with official drivers installed.'
::PS     exit 1
::PS }
::PS
::PS $gpuList = & $nvsmi -L 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host '[ERROR] Could not query NVIDIA GPUs:'
::PS     $gpuList | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $validGpus = [System.Collections.Generic.HashSet[string]]::new()
::PS Write-Host 'Detected NVIDIA GPUs:'
::PS foreach ($line in $gpuList) {
::PS     Write-Host "  $line"
::PS     if ($line -match '^GPU\s+(\d+)\s*:') { [void]$validGpus.Add($Matches[1]) }
::PS }
::PS if ($validGpus.Count -eq 0) {
::PS     Write-Host '[ERROR] No valid NVIDIA GPU indices were detected. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS $defaultGpu = if ($validGpus.Contains('0') -and $validGpus.Count -eq 1) { '0' } else { $null }
::PS $gpuPrompt = if ($defaultGpu) { 'Enter GPU index to configure [default: 0]' } else { 'Enter GPU index to configure (e.g. 0)' }
::PS $gpuId = (Read-Host $gpuPrompt).Trim()
::PS if ([string]::IsNullOrWhiteSpace($gpuId) -and $defaultGpu) { $gpuId = $defaultGpu }
::PS if (($gpuId -notmatch '^\d+$') -or (-not $validGpus.Contains($gpuId))) {
::PS     Write-Host '[ERROR] Invalid or non-existent GPU index. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Querying official supported Graphics clocks for GPU $gpuId..."
::PS $supOut = & $nvsmi -i $gpuId -q -d SUPPORTED_CLOCKS 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[STOPPED] Supported Graphics clocks could not be verified on this GPU (exit code $LASTEXITCODE). This does not necessarily mean GPU Clock Locking is unsupported. No changes were made."
::PS     $supOut | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $graphicsClocks = New-Object 'System.Collections.Generic.SortedSet[int]'
::PS foreach ($line in $supOut) {
::PS     if ($line -match '^\s*Graphics\s*:\s*(\d+)\s*MHz\s*$') {
::PS         [void]$graphicsClocks.Add([int]$Matches[1])
::PS     }
::PS }
::PS if ($graphicsClocks.Count -eq 0) {
::PS     Write-Host '[STOPPED] Supported Graphics clocks could not be verified on this GPU. This does not necessarily mean GPU Clock Locking is unsupported. No changes were made.'
::PS     Write-Host 'Possible reasons: driver does not expose the clock table, unrecognized output format, query unsupported, or GPU-specific limitations.'
::PS     exit 1
::PS }
::PS
::PS Write-Host '------------------------------------------------------------'
::PS Write-Host "Verified supported Graphics clocks (MHz) for GPU ${gpuId}:"
::PS Write-Host ('  ' + ($graphicsClocks -join ', '))
::PS Write-Host '------------------------------------------------------------'
::PS Write-Host 'IMPORTANT:'
::PS Write-Host ' - Enter ONLY one exact number from the Graphics list above.'
::PS Write-Host ' - Do NOT pick the highest value blindly; test moderate clocks first.'
::PS Write-Host ' - Arbitrary values (like 50000) will be rejected.'
::PS Write-Host ''
::PS
::PS $targetRaw = (Read-Host 'Enter a supported Graphics clock in MHz (or press Enter to cancel)').Trim()
::PS if ([string]::IsNullOrWhiteSpace($targetRaw)) {
::PS     Write-Host 'Cancelled. No changes were made.'
::PS     exit 0
::PS }
::PS
::PS [int]$targetMhz = 0
::PS if (($targetRaw -notmatch '^\d+$') -or (-not [int]::TryParse($targetRaw, [ref]$targetMhz)) -or ($targetMhz -le 0) -or (-not $graphicsClocks.Contains($targetMhz))) {
::PS     Write-Host '[ERROR] Invalid or unsupported Graphics clock value. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Applying temporary Graphics clock lock ($targetMhz,$targetMhz MHz) to GPU $gpuId..."
::PS $lgcOut = & $nvsmi -i $gpuId -lgc "$targetMhz,$targetMhz" 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[ERROR] nvidia-smi -lgc failed for GPU $gpuId (exit code $LASTEXITCODE):"
::PS     $lgcOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'No automatic reset was performed. Check your current GPU clock configuration before proceeding.'
::PS     Write-Host "Check current clock: nvidia-smi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits"
::PS     Write-Host "Manual reset command: nvidia-smi -i $gpuId -rgc"
::PS     exit 1
::PS }
::PS
::PS Write-Host "[ACCEPTED] Driver accepted -lgc $targetMhz,$targetMhz on GPU $gpuId."
::PS $obsOut = (& $nvsmi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits 2>&1 | Out-String).Trim()
::PS [int]$obsMhz = 0
::PS if (($LASTEXITCODE -eq 0) -and ($obsOut -match '^\d+$') -and ([int]::TryParse($obsOut, [ref]$obsMhz)) -and ($obsMhz -gt 0)) {
::PS     Write-Host "Actually observed Graphics clock right now: $obsMhz MHz"
::PS } else {
::PS     Write-Host "[INFO] Command was accepted, but live clock telemetry could not be verified (returned: '$obsOut')."
::PS }
::PS Write-Host 'Note: Thermal, power, or firmware limits can still affect live clocks under load.'
::PS Write-Host "When finished, run Reset-GPU-Clocks.bat or: nvidia-smi -i $gpuId -rgc"
::PS exit 0
```

</details>

### Reset-GPU-Clocks.bat

<details>
<summary><strong>Klicken zum Aufklappen und Anzeigen des vollständigen Codes von Reset-GPU-Clocks.bat</strong></summary>

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Reset NVIDIA GPU Clocks
set "BAT_PATH=%~f0"
powershell.exe -NoProfile -Command "$code = (Get-Content -LiteralPath $env:BAT_PATH | Where-Object { $_ -match '^::PS ' } | ForEach-Object { $_.Substring(5) }) -join [Environment]::NewLine; & ([ScriptBlock]::Create($code)); exit $LASTEXITCODE"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXIT_CODE%

::PS Write-Host '============================================================'
::PS Write-Host '  Vonovox Optional Helper: Reset NVIDIA GPU Clocks to Default'
::PS Write-Host '============================================================'
::PS Write-Host ''
::PS
::PS $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
::PS if (-not $isAdmin) {
::PS     Write-Host '[ERROR] Administrator privileges are required.'
::PS     Write-Host 'How to fix: Right-click Reset-GPU-Clocks.bat and choose "Run as administrator".'
::PS     exit 1
::PS }
::PS
::PS $nvsmi = $null
::PS $cmd = Get-Command nvidia-smi -ErrorAction SilentlyContinue
::PS if ($cmd) { $nvsmi = $cmd.Source }
::PS elseif (Test-Path -LiteralPath 'C:\Windows\System32\nvidia-smi.exe') { $nvsmi = 'C:\Windows\System32\nvidia-smi.exe' }
::PS elseif (Test-Path -LiteralPath 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe') { $nvsmi = 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe' }
::PS if (-not $nvsmi) {
::PS     Write-Host '[ERROR] nvidia-smi.exe was not found on this system.'
::PS     exit 1
::PS }
::PS
::PS $gpuList = & $nvsmi -L 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host '[ERROR] Could not query NVIDIA GPUs:'
::PS     $gpuList | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $validGpus = [System.Collections.Generic.HashSet[string]]::new()
::PS Write-Host 'Detected NVIDIA GPUs:'
::PS foreach ($line in $gpuList) {
::PS     Write-Host "  $line"
::PS     if ($line -match '^GPU\s+(\d+)\s*:') { [void]$validGpus.Add($Matches[1]) }
::PS }
::PS if ($validGpus.Count -eq 0) {
::PS     Write-Host '[ERROR] No valid NVIDIA GPU indices were detected.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS $defaultGpu = if ($validGpus.Contains('0') -and $validGpus.Count -eq 1) { '0' } else { $null }
::PS $gpuPrompt = if ($defaultGpu) { 'Enter GPU index to reset [default: 0]' } else { 'Enter GPU index to reset (e.g. 0)' }
::PS $gpuId = (Read-Host $gpuPrompt).Trim()
::PS if ([string]::IsNullOrWhiteSpace($gpuId) -and $defaultGpu) { $gpuId = $defaultGpu }
::PS if (($gpuId -notmatch '^\d+$') -or (-not $validGpus.Contains($gpuId))) {
::PS     Write-Host '[ERROR] Invalid or non-existent GPU index. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Restoring dynamic GPU clocks on GPU $gpuId..."
::PS $rgcOut = & $nvsmi -i $gpuId -rgc 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[ERROR] nvidia-smi -rgc failed for GPU $gpuId (exit code $LASTEXITCODE):"
::PS     $rgcOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'If the driver is unresponsive, reboot Windows to restore default dynamic clocks.'
::PS     exit 1
::PS }
::PS
::PS Write-Host "[DONE] Reset command accepted for GPU $gpuId."
::PS $obsOut = (& $nvsmi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits 2>&1 | Out-String).Trim()
::PS [int]$obsMhz = 0
::PS if (($LASTEXITCODE -eq 0) -and ($obsOut -match '^\d+$') -and ([int]::TryParse($obsOut, [ref]$obsMhz)) -and ($obsMhz -gt 0)) {
::PS     Write-Host "Actually observed Graphics clock right now: $obsMhz MHz"
::PS } else {
::PS     Write-Host "[INFO] Reset was accepted, but live clock telemetry could not be verified (returned: '$obsOut')."
::PS }
::PS Write-Host 'Dynamic clock management is active; clocks should drop to idle when unloaded.'
::PS exit 0
```

</details>

### So erstellst und startest du die `.bat`-Dateien sicher

1. Öffne **Editor / Notepad** (suche `notepad` im Startmenü).
2. Kopiere eines der vollständigen Skripte oben und füge es in Notepad ein.
3. Klicke auf **Datei → Speichern unter...**.
4. Ändere unten **Dateityp** von `Textdateien (*.txt)` auf **Alle Dateien (`*.*`)**.
5. Benenne die Datei `Lock-GPU-Clocks.bat` (oder `Reset-GPU-Clocks.bat`) und speichere sie in einem leicht auffindbaren Ordner wie dem Desktop. *(Die Umstellung auf **Alle Dateien** verhindert, dass Windows sie versehentlich `Lock-GPU-Clocks.bat.txt` nennt.)*
6. Klicke mit rechts auf die gespeicherte `.bat`-Datei und wähle **Als Administrator ausführen**.
7. Lies die Ausgabe aufmerksam:
   - `[ACCEPTED]` / `[DONE]` bedeutet, dass `nvidia-smi` den Befehl akzeptiert hat und direkt danach den **beobachteten** Graphics-Takt zeigt.
   - `[ERROR]` oder `[STOPPED]` erklärt, was fehlgeschlagen ist, und bestätigt, dass kein ungeprüfter Takt gesetzt wurde. Zeigt deine GPU `Not Supported` oder lässt sich nicht auslesen, überspringe diese Optimierung.

---

## 10. Wie du testest, ob es wirklich hilft

Nimm nicht an, dass Clock Locking geholfen hat, nur weil du eine höhere MHz-Zahl siehst. Eine höhere Frequenz bedeutet **nicht** automatisch bessere Audio-Performance. Führe einen strukturierten **A/B-Vergleich** auf deinem eigenen PC durch:

- **Vorab-Check (optional, 3-5 Minuten):** Schneller Funktionstest, ob der gesperrte Takt kühl läuft und keine Audiostörungen auslöst.
- **Vollständiger A/B-Benchmark (empfohlen, mindestens 10-15 Minuten pro Durchgang):**
  1. **Standardtakte wiederherstellen** (`nvidia-smi -i 0 -rgc`, ersetze `0` durch deinen GPU-Index).
  2. **Vonovox starten** und System sowie Hintergrundlast eine Minute stabilisieren lassen.
  3. **Test A (Standard-GPU-Takte)** mindestens **10-15 Minuten** laufen lassen und alle Werte unten notieren.
  4. **Einen verifizierten unterstützten Graphics-Takt anwenden** (`Lock-GPU-Clocks.bat` oder `-lgc`).
  5. **Test B (Gesperrte GPU-Takte)** mindestens **10-15 Minuten** unter exakt denselben Bedingungen laufen lassen.
  6. **Test A vs. Test B vergleichen** anhand der Tabelle unten.
  7. **Test wiederholen**, falls die Ergebnisse eng beieinander liegen oder unklar sind.
  8. **Standardtakte wiederherstellen** (`-rgc`), wenn du fertig bist oder kein klarer Nutzen erkennbar ist.

**Halte all diese Punkte zwischen Test A und Test B identisch:**

- RVC-Stimmmodell
- F0-Methode
- Block Size
- Eingabe-, Ausgabe- und Monitor-Audiogeräte
- Audio-Backend (z. B. WASAPI geteilt / exklusiv)
- Gleichzeitige GPU-Lasten (dasselbe geöffnete Spiel oder derselbe leere Desktop) und Betriebsbedingungen

### Ausfüllbare Vergleichstabelle

| Zu notierender Wert | Test A: Standardtakte (10-15 Min) | Test B: Gesperrte Takte (10-15 Min) |
| --- | --- | --- |
| Durchschnittlicher **GPU Delay** (ms) | `____ ms` | `____ ms` |
| **GPU Delay**-Spitzen (höchster Wert) | `____ ms` | `____ ms` |
| Schwankung der Verarbeitungszeit (ruhig vs. sprunghaft) | `____________` | `____________` |
| Audio-Knackser / Aussetzer | `Ja / Nein (Anzahl)` | `Ja / Nein (Anzahl)` |
| GPU-Temperatur (°C) | `____ °C` | `____ °C` |
| GPU-Leistungsaufnahme (W) | `____ W` | `____ W` |
| Tatsächlich beobachteter Graphics-Takt (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Throttling-Status (`-q -d PERFORMANCE`) | `Keines / Thermisch / Power` | `Keines / Thermisch / Power` |

### Ergebnisse auswerten

- **Nur behalten**, wenn Test B messbar ruhigeren **GPU Delay** und weniger Audiostörungen zeigt, *ohne* Überhitzung oder Throttling.
- **Standardwerte wiederherstellen (`nvidia-smi -i 0 -rgc`)**, wenn Test B sich gleich anfühlt, ohne echten Audiovorteil wärmer läuft oder schlechter abschneidet.

---

## 11. Risiken, Einschränkungen und Vorsichtsmaßnahmen

Das Sperren innerhalb der von NVIDIA unterstützten Takte ist **kein** Overclocking, hat aber dennoch Nachteile:

- **Höhere Temperaturen und Lüfterlautstärke:** Höhere Takte im Leerlauf oder bei geringer Last erzeugen zusätzliche Wärme und lassen Lüfter schneller drehen.
- **Höherer Stromverbrauch und kürzere Laptop-Akkulaufzeit:** Ein gesperrter Grafiktakt kann einschränken, wie oft die GPU in stromsparende Ruhezustände fällt, was den Leerlaufverbrauch erhöht und Laptop-Akkus schneller entleert.
- **Thermal- oder Power-Throttling:** Fordert ein gesperrter Takt deine Kühlung oder dein Powerbudget zu stark, drosselt sich die GPU trotzdem selbst und verursacht manchmal schlimmere Ruckler.
- **Begrenzte Kompatibilität und Konflikte mit Drittanbieter-Tools:** Tools wie MSI Afterburner, Armoury Crate oder OEM-Laptop-Kontrollzentren können `nvidia-smi`-Takteinstellungen überschreiben oder stören.
- **Keine Änderungen an BIOS, Spannungen oder Schutzmechanismen:** Flashe niemals angepasste VBIOS-Dateien, deaktiviere keine Temperaturlimits und erzwinge keine Überspannung für Stimmenkonvertierung.

---

## 12. Erweiterter Hinweis: GPU-Speichertakt-Sperre (`-lmc`)

`nvidia-smi` bietet auch Befehle für den Speichertakt:

```bat
nvidia-smi -i 0 -lmc <min,max>
nvidia-smi -i 0 -rmc
```

`-lmc` sperrt die **VRAM-(Speicher-)Frequenz**, während `-lgc` die **GPU-Kern-(Grafik-)Frequenz** sperrt. Das Sperren des Speichertakts ist **kein** Teil des regulären Vonovox-Workflows, da es keine ausreichenden Belege dafür gibt, dass feste VRAM-Takte Live-RVC-Audio verbessern, und dauerhaft hohe VRAM-Takte Wärme und Verbrauch im Leerlauf erhöhen.

---

## 13. Alternativen, wenn Clock Locking nicht hilft

Wenn `-lgc` `Not Supported` liefert oder dein Audio nicht verbessert, probiere diese sichereren, oft wirksameren Schritte:

1. **NVIDIA Systemsteuerung → Energieverwaltungsmodus:** Stelle **Energieverwaltungsmodus** für die Vonovox-EXE auf **Maximale Leistung bevorzugen** (`3D-Einstellungen verwalten → Programmeinstellungen`). Hinweis: Das ist **nicht** dasselbe wie `-lgc` und garantiert keine festen Takte bei jeder CUDA-Last, kann aber aggressives Heruntertakten auf manchen Systemen verringern.
2. **Prüfen, ob Vonovox deine NVIDIA-GPU nutzt:** Stelle auf Laptops mit Hybridgrafik sicher, dass Vonovox auf der NVIDIA-GPU statt der integrierten Grafik läuft.
3. **Block Size in Vonovox anpassen:** Das Erhöhen von **Block Size** um eine Stufe ist der zuverlässigste Weg, Knackser bei ausgelasteter GPU zu beseitigen.
4. **`48 kHz`-Audioformate & WASAPI abgleichen:** Folge [Vonovox routen und abstimmen](live-audio.md), um Abtastraten anzugleichen und doppeltes Monitoring zu vermeiden.
5. **Konkurrierende GPU-Last reduzieren:** Begrenze Spiel-FPS oder senke schwere GPU-Einstellungen, wenn Vonovox neben Spielen läuft.
6. **Treiber & Kühlung prüfen:** Aktualisiere auf einen sauberen Studio-/Game-Ready-Treiber und reinige Staub aus Laptop-/PC-Lüftungsschlitzen bei Thermal Throttling.

---

## 14. Fehlerbehebung

| Symptom | Mögliche Ursache | Empfohlene Lösung |
| --- | --- | --- |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` ist nicht im `PATH`. | Führe `"C:\Windows\System32\nvidia-smi.exe"` oder `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"` aus oder nutze die `.bat`-Skripte oben. |
| NVIDIA erkennt keine GPU / `NVIDIA-SMI has failed` | Keine NVIDIA-GPU vorhanden, GPU deaktiviert oder Hybrid-Laptop-GPU im Ruhezustand. | Prüfe **Task-Manager → Leistung**, aktiviere den NVIDIA-Adapter im Geräte-Manager und schließe das Laptop-Netzteil an. |
| `Insufficient Permissions` | CMD wurde nicht als Administrator geöffnet. | Rechtsklick auf **Eingabeaufforderung** (oder die `.bat`-Datei) → **Als Administrator ausführen**. |
| `Not Supported` bei `-lgc` | GPU-Architektur, Laptop-Firmware oder Treiber erlaubt kein Clock Locking. | Takte auf Standard lassen und die [Alternativen](#13-alternativen-wenn-clock-locking-nicht-hilft) nutzen. |
| `Invalid Argument` | Syntaxfehler oder Frequenz außerhalb unterstützter Takte. | `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` ausführen und einen exakten `Graphics`-Wert im Format `min,max` eingeben. |
| Angezeigter Takt stimmt nicht mit angefordertem MHz überein | Powerlimit, Temperaturlimit oder Treiberbegrenzung bremst die GPU. | Einen etwas niedrigeren unterstützten Takt testen oder `nvidia-smi -i 0 -q -d PERFORMANCE` prüfen. |
| Takt fällt unter Last ab | Thermal Throttling oder Laptop-Powerlimit erreicht. | Gesperrten Takt senken, Kühlung verbessern oder mit `-rgc` zurücksetzen. |
| Temperaturen steigen zu stark | Hoher Takt dauerhaft ohne ausreichende Kühlung gesperrt. | Sofort `nvidia-smi -i 0 -rgc` ausführen und einen niedrigeren Takt oder dynamische Standardwerte nutzen. |
| Vonovox zeigt keine Besserung | Engpass liegt bei Block Size, CPU, WASAPI oder allgemeiner GPU-Auslastung statt beim Taktskalieren. | `nvidia-smi -i 0 -rgc` ausführen und **Block Size** sowie Audio-Routing in [Vonovox routen und abstimmen](live-audio.md) abstimmen. |
| Vonovox wird nach Sperre schlechter | Gesperrter Takt ist zu niedrig für die Last oder zu hoch (führt zu Thermal Throttling). | `nvidia-smi -i 0 -rgc` für dynamische Takte ausführen, dann anderen unterstützten Wert testen oder bei Standard bleiben. |
| GPU verhält sich mit offenem Spiel anders | Spiel verbraucht Großteil des Rechen-/Powerbudgets der GPU. | Spiel-FPS begrenzen, GPU-lastige Einstellungen senken oder **Block Size** in Vonovox erhöhen. |
| Reset-Befehl (`-rgc`) schlägt fehl | Fehlende Adminrechte, falscher `-i`-Index oder Treiberhänger. | CMD als Administrator mit richtigem `-i`-Index ausführen oder Windows neu starten. |
| Unsicher, welcher MHz-Wert zu wählen ist | Basistakte unter Last noch nicht geprüft. | `nvidia-smi -i 0 -q -d CLOCK` bei normaler Vonovox-Nutzung ausführen und einen unterstützten Wert nahe diesem Bereich wählen. |
| Laptop begrenzt Takte automatisch | OEM-Energieprofil / Akku / Firmware-Limit des Laptops. | Netzteil anschließen, OEM-Modus Ausbalanciert/Leistung nutzen oder **Block Size** statt `-lgc` anpassen. |

---

## 15. Häufig gestellte Fragen (FAQ)

1. **Ist GPU Clock Locking sicher?**
   Ja, solange du nur offizielle Frequenzen aus `SUPPORTED_CLOCKS` nutzt und Temperaturen überwachst. Es verändert keine Spannungen und umgeht keine Hardware-Schutzmechanismen.
2. **Ist das Overclocking?**
   Nein. Overclocking betreibt Hardware über Werksspezifikationen hinaus. Clock Locking wählt nur Frequenzen aus, die NVIDIA bereits in der offiziellen Tabelle deiner Karte definiert hat.
3. **Erhöht das meine FPS in Spielen?**
   Meistens nein, und dafür ist es auch nicht gedacht. Ist ein gesperrter Takt niedriger als dein normaler Boost-Takt, können Spiel-FPS sogar leicht sinken.
4. **Verbessert es die Stimmqualität von Vonovox?**
   Nein. Die Stimmqualität hängt von Modell, Mikrofon, Pitch-/F0-Extraktor und Audio-Routing ab, nicht vom GPU-Clock-Locking.
5. **Verringert es die Latenz?**
   Es senkt nicht die minimale Latenz unter das, was deine GPU ohnehin berechnen kann, kann aber auf manchen Systemen plötzliche **Latenzspitzen** durch Taktwechsel reduzieren.
6. **Funktioniert es auf Laptops?**
   Manchmal, aber viele Laptops sperren `-lgc` in der Firmware oder erreichen schnell Temperatur-/Powerlimits. Teste Laptops immer am Netzteil.
7. **Funktioniert es auf jeder NVIDIA-GPU?**
   Nein. Unterstützung hängt von GPU-Generation, Board-/Laptop-Firmware und Treiberversion ab.
8. **Sollte man immer den Maximaltakt wählen?**
   Nein. Maximaltakte erzeugen maximale Hitze und Lautstärke und können Thermal Throttling auslösen. Moderate unterstützte Takte sind oft stabiler.
9. **Kann ich `50000` MHz eingeben?**
   Nein. Gib niemals willkürliche Zahlen ein. Werte außerhalb des Bereichs können mit `Invalid Argument` scheitern und werden nicht garantiert sicher begrenzt.
10. **Funktioniert es mit RTX-GPUs?**
    Viele Desktop-RTX-Karten unterstützen `-lgc` mit modernen Treibern, während manche Laptops oder bestimmte Konfigurationen `Not Supported` melden können. Teste zuerst mit `SUPPORTED_CLOCKS`.
11. **Muss ich es jedes Mal neu anwenden?**
    Ja, wenn du es dauerhaft nutzen willst, da `nvidia-smi`-Taktsperren bei Neustart oder Treiber-Reset zurückgesetzt werden.
12. **Bleiben die Einstellungen nach einem Neustart erhalten?**
    Nein. Ein Windows-Neustart löscht `-lgc` automatisch und versetzt deine GPU wieder in normale dynamische Takte.
13. **Kann ich Vonovox beim Spielen nutzen?**
    Ja, sofern deine GPU genug Reserve für beides hat. Erreicht das Spiel 95-100% GPU-Last, begrenze FPS oder erhöhe **Block Size** in Vonovox.
14. **Was passiert, wenn meine GPU überhitzt?**
    NVIDIAs Hardware-Überhitzungsschutz drosselt die Karte automatisch (oder schaltet im Extremfall ab). Steigen Temperaturen zu hoch, führe sofort `nvidia-smi -i 0 -rgc` aus.
15. **Wie stelle ich alles wieder auf normal?**
    Führe `nvidia-smi -i 0 -rgc` als Administrator aus, starte `Reset-GPU-Clocks.bat` oder starte Windows neu.
16. **Sollte ich auch den VRAM-Takt sperren (`-lmc`)?**
    Nein. Es gibt keine belastbaren Belege, dass Speichertakt-Sperren Vonovox helfen, und es erhöht Leerlaufwärme sowie Stromverbrauch.
17. **Was tun, wenn `Not Supported` angezeigt wird?**
    Überspringe GPU Clock Locking komplett und nutze die sichereren [Alternativen](#13-alternativen-wenn-clock-locking-nicht-hilft) wie **Block Size**-Abstimmung und Energieeinstellungen in der NVIDIA Systemsteuerung.

---

## 16. Offizielle Referenzen

- [NVIDIA System Management Interface (nvidia-smi) Dokumentation](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [NVIDIA NVML API-Referenz: Gerätebefehle](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking Best Practices](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Vonovox-Projekt-Repository](https://github.com/dr87/Vonovox)
