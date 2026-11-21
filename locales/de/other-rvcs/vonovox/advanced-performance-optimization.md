---
label: "Erweiterte Leistungsoptimierung"
icon: ":zap:"
order: 97
permalink: /ilaria-rvc/vonovox/advanced-performance-optimization/
description: "Optionale Anleitung zu NVIDIA GPU Clock Locking, um zu testen, ob das Fixieren unterstützter Grafiktakte die Latenzstabilität in Vonovox verbessert."
---
# Erweiterte Leistungsoptimierung: NVIDIA GPU Clock Locking

> **Optionale Optimierung:** Diese Anleitung ist **zu 100 % optional** und **niemals erforderlich**, um Vonovox zu installieren oder zu nutzen. Schließe zuerst [Vonovox installieren](installation.md) und [Vonovox einrichten und abstimmen](live-audio.md) ab.

**Kernprinzip:** GPU Clock Locking ist eine optionale fortgeschrittene Optimierung, die auf unterstützten NVIDIA-GPUs die Echtzeit-Stabilität von Vonovox verbessern kann. Verwende immer unterstützte Taktraten, teste die Ergebnisse auf deiner eigenen Hardware und stelle bei fehlendem Nutzen die Standardtakte wieder her.

> **Schnelles Zurücksetzen (jederzeit):** Öffne die Eingabeaufforderung als Administrator und führe `nvidia-smi -i 0 -rgc` aus (ersetze `0` bei mehreren GPUs durch den passenden Index), oder starte Windows neu.

## Inhaltsverzeichnis

- [Schnellpfad für erfahrene Nutzer](#schnellpfad-für-erfahrene-nutzer)
- [1. Was GPU Clock Locking ist](#1-was-gpu-clock-locking-ist)
- [2. Auswirkungen auf Vonovox](#2-auswirkungen-auf-vonovox)
- [3. NVIDIA-Kompatibilität und Fehlermeldungen](#3-nvidia-kompatibilität-und-fehlermeldungen)
- [4. Einstieg für Anfänger: Windows 10 und Windows 11](#4-einstieg-für-anfänger-windows-10-und-windows-11)
- [5. Unterstützte Taktraten ermitteln](#5-unterstützte-taktraten-ermitteln)
- [6. Geeignete Frequenz wählen](#6-geeignete-frequenz-wählen)
- [7. GPU Clock Lock anwenden](#7-gpu-clock-lock-anwenden)
- [8. Standardwerte wiederherstellen](#8-standardwerte-wiederherstellen)
- [9. Ein-Klick-Verwaltung (BAT-Dateien)](#9-ein-klick-verwaltung-bat-dateien)
- [10. Wirkung prüfen (A/B-Test)](#10-wirkung-prüfen-ab-test)
- [11. Risiken, Grenzen und Vorsichtsmaßnahmen](#11-risiken-grenzen-und-vorsichtsmaßnahmen)
- [12. Hinweis: GPU-Speichertakt (-lmc)](#12-hinweis-gpu-speichertakt--lmc)
- [13. Alternativen](#13-alternativen)
- [14. Fehlerbehebung](#14-fehlerbehebung)
- [15. FAQ](#15-faq)
- [16. Offizielle Quellen](#16-offizielle-quellen)

---

## Schnellpfad für erfahrene Nutzer

1. GPUs auflisten: `nvidia-smi -L`
2. Unterstützte Takte abfragen: `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS`
3. Verifizierten **Graphics**-Takt fixieren (`1800` ist nur ein Beispielwert): `nvidia-smi -i 0 -lgc 1800,1800`
4. Live-Takt prüfen: `nvidia-smi -i 0 -q -d CLOCK`
5. Nach dem Test zurücksetzen: `nvidia-smi -i 0 -rgc`

---

## 1. Was GPU Clock Locking ist

- Die **GPU-Frequenz** (in **MHz**, Millionen Zyklen pro Sekunde) beschreibt das Arbeitstempo des Grafikkerns.
- **NVIDIA GPU Boost** regelt den Takt dynamisch zwischen Leerlauf (`210-300 MHz`) und Last.
- Bei Vonovox entstehen alle paar Millisekunden kurze CUDA-Schübe; dazwischen kann die GPU heruntertakten und muss beim nächsten Block wieder hochtakten.
- **GPU Clock Locking** (`-lgc`) hält den Kerntakt wie ein **Tempomat** in einem unterstützten Bereich. Es ist **kein Overclocking** (keine Spannungserhöhung, keine Überschreitung von Werkslimits). Der Maximalwert ist nicht automatisch der beste, da Hitze und Thermal Throttling drohen.

---

## 2. Auswirkungen auf Vonovox

- Kann **GPU Delay**-Spitzen verringern, garantiert aber **keine** schnellere Konvertierung, vollständige Störungsfreiheit oder bessere Stimmqualität.
- Läuft gleichzeitig ein Spiel bei 95-100 % GPU-Last, helfen FPS-Limit oder höhere **Block Size** deutlich mehr. WASAPI- oder `48 kHz`-Treiberprobleme lassen sich nicht durch Taktsperren lösen.

---

## 3. NVIDIA-Kompatibilität und Fehlermeldungen

`nvidia-smi` allein garantiert kein `--lgc` (viele Laptops, ältere Karten oder Treiber sperren es).

| Meldung | Bedeutung | Lösung |
| --- | --- | --- |
| `Not Supported` | GPU, Laptop-BIOS oder Treiber erlaubt `--lgc` nicht. | Standard lassen und [Alternativen](#13-alternativen) nutzen. |
| `Insufficient Permissions` | CMD nicht als Administrator gestartet. | Rechtsklick → **Als Administrator ausführen**. |
| `Invalid Argument` | Ungültiger Wert oder falsches `min,max`-Format. | Exakten `Graphics`-Wert aus `SUPPORTED_CLOCKS` wählen. |
| `NVIDIA-SMI has failed` | Treiber reagiert nicht oder Laptop-GPU schläft. | Geräte-Manager prüfen, Netzteil anschließen. |
| `nvidia-smi` nicht erkannt | Nicht im `PATH`. | Vollständigen Pfad (`System32` oder `NVSMI`) nutzen. |

---

## 4. Einstieg für Anfänger: Windows 10 und Windows 11

1. Prüfe im **Task-Manager → Leistung**, ob eine **NVIDIA**-GPU vorhanden ist.
2. Startmenü → `cmd` tippen → Rechtsklick auf **Eingabeaufforderung** → **Als Administrator ausführen**.
3. Befehle per Rechtsklick (oder `Strg + V`) einfügen und **Enter** drücken.
4. `nvidia-smi` und `nvidia-smi -L` testen. Falls nicht gefunden: `"C:\Windows\System32\nvidia-smi.exe"` oder `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"` verwenden.

---

## 5. Unterstützte Taktraten ermitteln

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

Nur Werte unter **`Graphics :`** nutzen (nicht **`Memory`**). **Niemals** Fantasiewerte wie `50000` MHz eingeben.

---

## 6. Geeignete Frequenz wählen

Beobachte zuerst deinen Normaltakt mit `nvidia-smi -i 0 -q -d CLOCK`, wähle einen moderaten unterstützten `Graphics`-Wert, prüfe Temperatur und `nvidia-smi -i 0 -q -d PERFORMANCE` auf Throttling und behalte die Sperre nur bei messbarem Vorteil.

---

## 7. GPU Clock Lock anwenden

*(Nur Beispielwert, ersetze `1800` durch deinen eigenen Wert aus `SUPPORTED_CLOCKS`:)*

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Bereichsbeispiel: `nvidia-smi -i 0 -lgc 1500,1800`. Kontrolle im Betrieb mit `nvidia-smi -i 0 -q -d CLOCK` (oder `-l 1`). Power- oder Temperaturlimits können die exakte Ziel-MHz begrenzen.

---

## 8. Standardwerte wiederherstellen

```bat
nvidia-smi -i 0 -rgc
```

Immer nach dem Test ausführen; ein Windows-Neustart setzt `-lgc` ebenfalls zurück.

---

## 9. Ein-Klick-Verwaltung (BAT-Dateien)

### Lock-GPU-Clocks.bat

```bat
@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Vonovox Helper - Lock NVIDIA GPU Clocks

echo ============================================================
echo   Vonovox Optional Helper: Lock NVIDIA GPU Core Clocks
echo   No overclocking, no voltage changes, temporary until reboot
echo ============================================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Administrator privileges are required.
    pause
    exit /b 1
)

set "NVSMI=nvidia-smi"
where nvidia-smi >nul 2>&1
if errorlevel 1 (
    if exist "C:\Windows\System32\nvidia-smi.exe" (
        set "NVSMI=C:\Windows\System32\nvidia-smi.exe"
    ) else if exist "C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" (
        set "NVSMI=C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
    ) else (
        echo [ERROR] nvidia-smi.exe was not found on this system.
        pause
        exit /b 1
    )
)

"%NVSMI%" -L
if errorlevel 1 (
    echo [ERROR] Could not query NVIDIA GPUs.
    pause
    exit /b 1
)

set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to configure [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -q -d SUPPORTED_CLOCKS
if errorlevel 1 (
    echo [STOPPED] Could not retrieve SUPPORTED_CLOCKS for GPU %GPU_ID%.
    pause
    exit /b 1
)

set "TARGET_MHZ="
set /p "TARGET_MHZ=Enter a supported Graphics clock in MHz (or press Enter to cancel): "
if "%TARGET_MHZ%"=="" exit /b 0

echo %TARGET_MHZ%| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo [ERROR] "%TARGET_MHZ%" is not a valid whole number in MHz.
    pause
    exit /b 1
)

"%NVSMI%" -i %GPU_ID% -lgc %TARGET_MHZ%,%TARGET_MHZ%
if errorlevel 1 (
    echo [ERROR] Failed to apply clock lock.
    "%NVSMI%" -i %GPU_ID% -rgc >nul 2>&1
    pause
    exit /b 1
)

echo [SUCCESS] Clock lock applied to GPU %GPU_ID% (%TARGET_MHZ% MHz).
pause
exit /b 0
```

### Reset-GPU-Clocks.bat

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Reset NVIDIA GPU Clocks

echo ============================================================
echo   Vonovox Optional Helper: Reset NVIDIA GPU Clocks to Default
echo ============================================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Administrator privileges are required.
    pause
    exit /b 1
)

set "NVSMI=nvidia-smi"
where nvidia-smi >nul 2>&1
if errorlevel 1 (
    if exist "C:\Windows\System32\nvidia-smi.exe" (
        set "NVSMI=C:\Windows\System32\nvidia-smi.exe"
    ) else if exist "C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" (
        set "NVSMI=C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
    ) else (
        echo [ERROR] nvidia-smi.exe was not found on this system.
        pause
        exit /b 1
    )
)

"%NVSMI%" -L
set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to reset [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -rgc
if errorlevel 1 (
    echo [ERROR] Failed to reset clocks. Reboot Windows to restore defaults.
    pause
    exit /b 1
)

echo [SUCCESS] GPU %GPU_ID% has returned to default dynamic clock management.
pause
exit /b 0
```

Im Editor unter **Datei → Speichern unter...** den Dateityp auf **Alle Dateien (`*.*`)** stellen (damit kein `.bat.txt` entsteht) und per Rechtsklick **Als Administrator ausführen**.

---

## 10. Wirkung prüfen (A/B-Test)

Vergleiche **Test A (Standardtakte mit `-rgc`)** und **Test B (fixierter Takt)** bei identischem Modell, F0, Block Size, Audiogeräten und GPU-Last:

| Messwert | Test A: Standard | Test B: Fixiert |
| --- | --- | --- |
| Durchschnittlicher **GPU Delay** (ms) | `____ ms` | `____ ms` |
| **GPU Delay**-Spitzen | `____ ms` | `____ ms` |
| Knacken / Aussetzer | `Ja / Nein` | `Ja / Nein` |
| GPU-Temperatur nach 5 Min (°C) | `____ °C` | `____ °C` |
| Reale Frequenz (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Stromverbrauch (W) | `____ W` | `____ W` |
| Stabilität nach 5+ Min | `Stabil / Throttling` | `Stabil / Throttling` |

Ohne klaren Vorteil sofort mit `nvidia-smi -i 0 -rgc` zurücksetzen.

---

## 11. Risiken, Grenzen und Vorsichtsmaßnahmen

Mehr Wärme, Lüftergeräusch, Stromverbrauch, kürzere Akkulaufzeit, mögliches Throttling und Konflikte mit MSI Afterburner/OEM-Tools. Niemals VBIOS, Spannungen oder Schutzfunktionen verändern.

---

## 12. Hinweis: GPU-Speichertakt (`-lmc`)

`-lmc` / `-rmc` sperrt den VRAM-Takt und wird mangels Nutzen nicht für Vonovox empfohlen.

---

## 13. Alternativen

**NVIDIA Systemsteuerung → Energieverwaltungsmodus → Maximale Leistung bevorzugen** (nicht identisch mit `--lgc`), **Block Size** erhöhen, `48 kHz` und WASAPI in [Vonovox einrichten](live-audio.md) prüfen, Spiel-FPS begrenzen und Kühlung prüfen.

---

## 14. Fehlerbehebung

| Symptom | Mögliche Ursache | Empfohlene Lösung |
| --- | --- | --- |
| `nvidia-smi` nicht erkannt | Nicht im `PATH`. | Vollständigen Pfad oder BAT-Dateien nutzen. |
| Keine GPU / `NVIDIA-SMI has failed` | GPU deaktiviert oder im Schlafmodus. | Geräte-Manager prüfen, Netzteil einstecken. |
| `Insufficient Permissions` | Keine Admin-Rechte. | Als Administrator ausführen. |
| `Not Supported` | Hardware/Treiber sperrt `--lgc`. | [Alternativen](#13-alternativen) nutzen. |
| `Invalid Argument` | Falsche Syntax oder MHz. | Exakten `Graphics`-Wert aus `SUPPORTED_CLOCKS` nutzen. |
| Takt weicht ab / fällt | Power- oder Temperaturlimit. | Niedrigeren Takt testen oder `-rgc`. |
| Hohe Temperaturen | Zu wenig Kühlung. | Sofort `nvidia-smi -i 0 -rgc` ausführen. |
| Keine Besserung / schlechter | Engpass bei Block Size, CPU, WASAPI. | `-rgc` ausführen und [Vonovox einrichten](live-audio.md) prüfen. |
| Anders mit offenem Spiel | Spiel lastet GPU voll aus. | Spiel-FPS begrenzen oder **Block Size** erhöhen. |
| `-rgc` schlägt fehl | Fehlende Rechte/Index. | Admin + `-L` prüfen oder neu starten. |

---

## 15. FAQ

1. **Ist es sicher?** Ja, mit `SUPPORTED_CLOCKS` und Temperaturkontrolle.
2. **Ist es Overclocking?** Nein.
3. **Mehr FPS?** Nein.
4. **Bessere Stimmqualität?** Nein.
5. **Weniger Latenz?** Kann Spitzen reduzieren, nicht das Hardware-Minimum.
6. **Auf Laptops?** Teilweise, oft durch Firmware/Hitze begrenzt.
7. **Auf jeder NVIDIA-GPU?** Nein.
8. **Immer Maximum wählen?** Nein.
9. **`50000` MHz nutzen?** Nein.
10. **Mit RTX-GPUs?** Auf Desktop-RTX meist ja, auf Laptops teils `Not Supported`.
11. **Jedes Mal neu setzen?** Ja, nach Neustart zurückgesetzt.
12. **Bleibt es nach Neustart?** Nein.
13. **Beim Gaming nutzbar?** Ja, solange GPU-Reserve bleibt.
14. **Bei Überhitzung?** Automatisches Throttling; sofort `-rgc` ausführen.
15. **Wie zurücksetzen?** `nvidia-smi -i 0 -rgc`, `Reset-GPU-Clocks.bat` oder Neustart.
16. **Auch VRAM sperren (`-lmc`)?** Nein.
17. **Bei `Not Supported`?** Alternativen in Abschnitt 13 nutzen.

---

## 16. Offizielle Quellen

- [NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [NVIDIA NVML API Reference](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Vonovox Repository](https://github.com/dr87/Vonovox)
