---
label: "Zugang, Konto & API"
icon: ":globe_with_meridians:"
order: 98
permalink: /non-rvc/mvsep/access-and-setup/
---
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
- **Credit-Pakete** verfallen nie (ab ca. 3 \$ für 60 Credits, 5 \$ für 200, 10 \$ für 600).
- Standardmodelle kosten **1 Credit pro Audiominute**; große Ensembles nutzen Multiplikatoren (`2×`–`6×`).
- **API-Zugriff**: eingeloggte Nutzer können im Konto einen API-Token erzeugen, um Stapelverarbeitungen per Python über `https://mvsep.com/api` zu automatisieren.
