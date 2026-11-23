# MVSep nutzen: Zugang, Konto & Einrichtung

Da MVSep in der Cloud läuft, muss **nichts installiert** werden. Die richtige Einrichtung von Konto und Ausgabeformat macht jedoch einen großen Unterschied.

## 1. Kostenloses Konto erstellen (Empfohlen)

1. Öffne [mvsep.com](https://mvsep.com/) und erstelle ein kostenloses Konto.
2. **Warum registrieren?**
   - **Verlustfreies Audio**: ohne Konto gibt es nur komprimiertes **MP3**. Mit kostenlosem Konto erhältst du **WAV 16-Bit** und **FLAC 16-Bit**.
   - **Kein CAPTCHA** und **schnellere Warteschlange**.
   - **124-Band-Polar- & BS-Roformer-Modelle** stehen auch kostenlosen Nutzern offen (BS-Varianten bis zu 5 Trennungen/Tag je Modell).

## 2. Nützliche Einstellungen auf MVSep

- **Ausgabeformat**: wähle vor dem Start immer **WAV** (oder **FLAC**), wenn du ein RVC-Modell trainieren oder mehrere Bereinigungsschritte verketten willst.
- **Post-Processing / Verkettung**: logge dich ein, gehe zu **Advanced settings → Home Screen** und aktiviere **„Show post-processing algorithm“**, um direkt nach der Trennung ein Bereinigungsmodell anzuwenden.
- **Langsamer Upload/Download?** MVSep bietet regionale Spiegelserver (Mirrors) - wechsle bei langsamer Übertragung auf den Mirror.

## 3. Prepaid-Credits & volle API (Optional)

Für lange Dateien (bis 100 Min. / 1 GB), **WAV 32-Bit Float / FLAC 24-Bit** oder zum Umgehen von Stoßzeiten:
- Standardmodelle kosten **1 Credit pro Audiominute**; große Ensembles nutzen Multiplikatoren (`2×`–`6×`).
- **API-Zugriff**: eingeloggte Nutzer können im Konto einen API-Token erzeugen, um Stapelverarbeitungen per Python über `https://mvsep.com/api` zu automatisieren.

## Preise der Credit-Pakete

MVSEP bietet bis zu 50 kostenlose Trennungen pro Tag ohne Karte. Premium verwendet vorausbezahlte Credits.

| Preis (USD) | Credits | Geschätzte Songs (4 Min.) | USD pro Minute |
| ---: | ---: | ---: | ---: |
| 3 | 60 | ≈ 15 | 0,05 |
| 5 | 200 | ≈ 50 | 0,025 |
| 10 | 600 | ≈ 150 | 0,0167 |
| 30 | 2.000 | ≈ 500 | 0,015 |
| 50 | 4.000 | ≈ 1.000 | 0,0125 |
| 100 | 8.500 | ≈ 2.125 | 0,0118 |
| 200 | 18.000 | ≈ 4.500 | 0,0111 |
| 500 | 50.000 | ≈ 12.500 | 0,01 |
| 1.000 | 110.000 | ≈ 27.500 | 0,0091 |

Die Schätzung geht von einer Trennung pro Song mit einem Standardmodell für 1 Credit pro Minute aus. Ein Song von 4 Minuten kostet 4 Credits. Ein Ensemble-Modell mit Faktor 2 kostet für denselben Song 8 Credits. Ein Paket mit 60 Credits reicht dann für etwa 7 ganze Songs statt 15. Zusätzliche Optionen und Durchläufe können den Verbrauch erhöhen.

[MVSEP-Tarife](https://sg.mvsep.com/en/plans) · [Credit-Berechnung](https://mvsep.com/en/credits)
