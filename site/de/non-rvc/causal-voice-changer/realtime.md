# CausalVC Realtime verwenden

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

Sobald du `run-training` mindestens einmal ausgeführt hast und eine `.cvc`-Stimme bereitliegt, startest du den Live-Stimmenverzerrer mit:
- **Windows**: `run-realtime.bat`
- **Linux**: `run-realtime.sh` *(per `realtime/scripts/install-desktop-entry.sh` auch im App-Menü eintragbar)*

> **Trage im Live-Betrieb immer Kopfhörer.** Über Lautsprecher gelangt die konvertierte Stimme zurück ins Mikrofon und verursacht Echo und Rückkopplung.

## 1. Audio einrichten (Seite `Audio`)

1. **Input → Source**:
   - Wähle **Microphone / audio device** für Live-Sprache.
   - *(Oder **Audio file**, um eine Stimme mit einer aufgenommenen Datei zu testen.)*
2. **Input device**: wähle dein physisches Mikrofon.
3. **Output device**: wähle das Ziel für die konvertierte Stimme.
   - Für **Discord, OBS, VRChat oder Spiele** installiere ein virtuelles Audiokabel (z. B. **VB-CABLE** unter Windows), wähle hier **`CABLE Input`** und in Discord/OBS **`CABLE Output`** als Mikrofon.
4. **Monitor device** *(optional)*: wähle deine **Kopfhörer**, um dich selbst zu hören, oder lasse **Disabled**.
5. *(Linux-Tipp)*: `[JACK]`-Geräte bieten die geringste Latenz. Setze die PipeWire-Periode mit `PIPEWIRE_QUANTUM`, z. B. `128/48000`.

## 2. Stimme wählen & abstimmen (Seite `Model`)

1. Wähle **Model** (und **Checkpoint**, falls mehrere Steps gespeichert sind).
2. **Pitch (semitones)**: verschiebt deine Tonhöhe in Halbtönen (`+12` = eine Oktave höher, `-12` = eine Oktave tiefer).
   - **Pitch match**: nicht raten! Ziehe Clips der Modellstimme in Pitch match, um deren Median-Hz zu messen, und sprich beim Konvertieren - CVC misst deine Stimme und schlägt den exakten Shift vor (**Apply**).
3. **Advanced pitch** *(standardmäßig eingeklappt - für die meisten Stimmen nicht nötig)*:
   - **Pitch offset (Hz)**: addiert nach dem Halbton-Shift einen festen Hz-Offset. Positiv engt den Tonumfang ein; negativ weitet ihn.
   - **Pitch ceiling (Hz)** & **Above the ceiling (%)**: zieht schrille Spitzen oberhalb der Grenze herunter, während Töne darunter sauber gestimmt bleiben (ideal für Gesang; `0%` stoppt exakt an der Grenze).
4. **Formant**: verschiebt die Stimmresonanz ohne Tonhöhenänderung (`0` = natürlicher Formant des Modells).
5. **Index (%)** *(standardmäßig aus)*: mischt alle 20 ms Sprache in Richtung ähnlicher Stellen aus dem Trainingsaudio. Zu hohe Werte können Wörter verwaschen.
   - **Consonant protection** *(nur aktiv bei Index > 0)*: erhält Atemgeräusche und Konsonanten (`s`, `t`, `k`).

## 3. Pegel & Lautheit einstellen (`Levels`)

- **Input gain**: verstärkt oder senkt dein Mikrofon vor der Konvertierung.
- **Output gain**: Lautstärke für Discord/OBS/Spiele.
- **Monitor gain**: Lautstärke nur auf deinen Kopfhörern.
- **Noise gate**: schaltet das Mikrofon unterhalb des Schwellwerts stumm (`-60 dB` = aus).
- **Output level (LUFS)**: sprich beim Konvertieren und klicke auf **Apply**, um automatisch auf **Voice chat (`-21 LUFS`)** oder **Streaming (`-16 LUFS`)** einzupegeln.

## 4. Konvertierung starten (untere Leiste)

- Klicke auf **Start** für Live-Konvertierung oder **Passthrough** für einen schnellen Mikrofon-Check.
- Behalte **In / Out / Mon** sowie die beiden Zeitwerte im Blick:
  - **Latency**: gesamte Verzögerung vom Mikrofon bis zum Ausgang.
  - **Inference**: Rechenzeit deiner GPU pro Chunk. **Inference muss deutlich unter der Chunk-Größe bleiben** (z. B. `< 10 ms` bei `20 ms` Chunk), sonst ruckelt der Ton.
