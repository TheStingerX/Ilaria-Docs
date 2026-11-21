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
- Bei Vonovox wird Audio in einzelnen Blöcken verarbeitet (deren Dauer von **Block Size** und den Audioeinstellungen abhängt); dazwischen kann die GPU heruntertakten und muss beim nächsten Block wieder hochtakten.
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

Nur Werte unter **`Graphics :`** nutzen (nicht **`Memory`**). Laut NVIDIA-Dokumentation runden manche Treiber/Geräte einen angeforderten Takt auf den nächsten unterstützten Wert, während Werte außerhalb des Bereichs mit `Invalid Argument` fehlschlagen können. **Niemals** Fantasiewerte wie `50000` MHz eingeben.

---

## 6. Geeignete Frequenz wählen

Beobachte zuerst deinen Normaltakt mit `nvidia-smi -i 0 -q -d CLOCK`, wähle einen moderaten unterstützten `Graphics`-Wert, prüfe Temperatur und `nvidia-smi -i 0 -q -d PERFORMANCE` auf Throttling und behalte die Sperre nur bei messbarem Vorteil.

---

## 7. GPU Clock Lock anwenden

*(Nur Beispielwert, ersetze `1800` durch deinen eigenen Wert aus `SUPPORTED_CLOCKS`:)*

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Bereichsbeispiel: `nvidia-smi -i 0 -lgc 1500,1800`. Unterscheide zwischen angefordertem Takt und dem mit `nvidia-smi -i 0 -q -d CLOCK` (oder `-l 1`) **tatsächlich beobachteten Takt**. Dass `--lgc` akzeptiert wird, garantiert keinen dauerhaft fixierten Takt: Power-, Temperatur- oder Firmwarelimits können ihn begrenzen.

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

### Reset-GPU-Clocks.bat

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

Im Editor unter **Datei → Speichern unter...** den Dateityp auf **Alle Dateien (`*.*`)** stellen (damit kein `.bat.txt` entsteht) und per Rechtsklick **Als Administrator ausführen**.

---

## 10. Wirkung prüfen (A/B-Test)

Ein 3-5-Minuten-Test dient nur als Vorabcheck; für eine verlässliche Bewertung führe einen **A/B-Vergleich über mindestens 10-15 Minuten** pro Durchgang durch (1. `-rgc` ausführen, 2. Vonovox stabilisieren, 3. Test A 10-15 Min, 4. Verifizierten `Graphics`-Takt setzen, 5. Test B 10-15 Min bei identischem Modell, F0, Block Size, Audiogeräten und GPU-Last, 6. Bei Unklarheit wiederholen oder mit `-rgc` zurücksetzen):

| Messwert | Test A: Standard (10-15 Min) | Test B: Fixiert (10-15 Min) |
| --- | --- | --- |
| Durchschnittlicher **GPU Delay** (ms) | `____ ms` | `____ ms` |
| **GPU Delay**-Spitzen | `____ ms` | `____ ms` |
| Laufzeit-Variabilität | `____________` | `____________` |
| Knacken / Aussetzer | `Ja / Nein` | `Ja / Nein` |
| GPU-Temperatur (°C) | `____ °C` | `____ °C` |
| Stromverbrauch (W) | `____ W` | `____ W` |
| Beobachtete Frequenz (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Throttling (`-q -d PERFORMANCE`) | `Keins / Thermal / Power` | `Keins / Thermal / Power` |

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
