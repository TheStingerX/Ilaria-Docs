# Advanced Performance Optimization: NVIDIA GPU Clock Locking

> **Optional optimization:** This guide is **100% optional** and is **never required** to install or use Vonovox. Always complete [Install Vonovox](installation.md) and [Route and tune Vonovox](live-audio.md) before testing advanced GPU settings.

**Core principle:** GPU Clock Locking is an optional advanced optimization that may improve Vonovox's real-time processing stability on supported NVIDIA GPUs. Always use supported clock frequencies, test the results on your own hardware, and restore default clocks if no measurable benefit is observed.

> **Quick Reset (Run anytime to restore defaults):** Open Command Prompt as Administrator and run `nvidia-smi -i 0 -rgc` (replace `0` with your GPU index if you have multiple GPUs). You can also reboot Windows to return to dynamic clock management.

## Table of Contents

- [Quick Path for Experienced Users](#quick-path-for-experienced-users)
- [1. What GPU Clock Locking Is (Beginner Introduction)](#1-what-gpu-clock-locking-is-beginner-introduction)
- [2. How GPU Clocks Affect Vonovox](#2-how-gpu-clocks-affect-vonovox)
- [3. NVIDIA Compatibility & Error Messages](#3-nvidia-compatibility--error-messages)
- [4. Beginner Setup: Windows 10 & Windows 11](#4-beginner-setup-windows-10--windows-11)
- [5. Finding Your GPU's Supported Clocks](#5-finding-your-gpus-supported-clocks)
- [6. Choosing an Appropriate Frequency](#6-choosing-an-appropriate-frequency)
- [7. Applying GPU Clock Lock](#7-applying-gpu-clock-lock)
- [8. Restoring Default Settings](#8-restoring-default-settings)
- [9. One-Click GPU Clock Management (BAT Scripts)](#9-one-click-gpu-clock-management-bat-scripts)
- [10. How to Test Whether It Actually Helps](#10-how-to-test-whether-it-actually-helps)
- [11. Risks, Limitations, and Precautions](#11-risks-limitations-and-precautions)
- [12. Advanced Note: GPU Memory Clock Locking (-lmc)](#12-advanced-note-gpu-memory-clock-locking--lmc)
- [13. Alternatives When Clock Locking Does Not Help](#13-alternatives-when-clock-locking-does-not-help)
- [14. Troubleshooting](#14-troubleshooting)
- [15. Frequently Asked Questions (FAQ)](#15-frequently-asked-questions-faq)
- [16. Official References](#16-official-references)

---

## Quick Path for Experienced Users

If you already know how to use an elevated Command Prompt and `nvidia-smi`:

1. List GPUs and confirm your target index (`0` in single-GPU systems):
   ```bat
   nvidia-smi -L
   ```
2. Query supported graphics clocks on that GPU:
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Lock to a **verified supported** graphics clock from the output (`1800` below is only an illustrative placeholder):
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Verify live clocks while Vonovox is running:
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Run an [A/B test in Vonovox](#10-how-to-test-whether-it-actually-helps). When finished, or if there is no improvement, restore dynamic clocks immediately:
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. What GPU Clock Locking Is (Beginner Introduction)

1. **What a GPU frequency (clock speed) is:** Inside your NVIDIA graphics card, the main processor (the GPU core) performs millions of small math calculations every second. Its **clock frequency** is how many calculation cycles it completes per second.
2. **What MHz means:** **MHz** stands for **megahertz** (1 million cycles per second). For example, `1500 MHz` means 1.5 billion cycles per second, and `1800 MHz` means 1.8 billion cycles per second.
3. **How NVIDIA dynamic clocks work:** Modern NVIDIA GPUs do not run at one fixed speed. When your PC is idle on the desktop, the GPU drops to a low speed (for example `210 MHz` or `300 MHz`) to save electricity, stay quiet, and stay cool. When heavy work starts, it raises the speed.
4. **What NVIDIA GPU Boost is:** **NVIDIA GPU Boost** is the built-in automatic system that constantly adjusts your GPU's frequency up and down based on workload, temperature, power limits, and voltage headroom.
5. **Why clocks fluctuate during Vonovox:** Real-time voice conversion processes audio in discrete chunks (the exact chunk duration depends on your **Block Size** and audio settings) rather than a continuous heavy 3D render. Between chunks, the GPU may briefly see low load and drop its clock speed, then ramp back up on the next chunk.
6. **What locking a clock means:** **GPU Clock Locking** (`nvidia-smi -lgc`) tells the NVIDIA driver to keep the GPU core inside a specific supported frequency range (or at one supported frequency, when min and max are equal) instead of letting it drop down and ramp up constantly. Think of it like **cruise control on a highway**: the car holds a steady speed instead of slowing down and accelerating over and over.
7. **GPU Clock Locking vs. Overclocking:**
   - **Overclocking** pushes a GPU *beyond* its factory-rated limits or alters voltages/power curves to chase higher peak speed.
   - **GPU Clock Locking** only picks a frequency that NVIDIA already built into your card's official supported clock table. It does **not** raise voltage, unlock power limits, or force unsupported speeds.
8. **Why a stable clock can help real-time audio:** If your GPU takes `8 ms` to process an audio block at a higher clock, and `18 ms` when it temporarily downclocks, that sudden jump can cause uneven processing times. Holding a steady supported clock can make block processing times more consistent.
9. **Why the maximum clock is not always best:** Running at the absolute highest supported MHz increases heat, fan noise, and power draw. If your GPU hits its temperature or power limit, it will automatically **throttle** (force its own speed down), creating worse stutters than a moderate, steady clock.

---

## 2. How GPU Clocks Affect Vonovox

Vonovox processes live microphone audio through **CUDA** on your NVIDIA GPU. Every audio chunk (determined by **Block Size**) must finish processing before the next chunk arrives.

- **GPU Delay & processing time variance:** In Vonovox, **GPU Delay** shows how long the GPU takes to convert each chunk. If GPU clocks bounce between idle and boost states, GPU Delay can spike unexpectedly.
- **Audio crackling, popping, and stuttering:** If even one audio chunk finishes late because the GPU was still ramping up its clock, the audio buffer runs dry and you hear a click, pop, or robotic stutter.
- **Buffer Size and Block Size:** Larger **Block Size** values give the GPU more breathing room at the cost of higher overall latency. Smaller **Block Size** values feel more responsive but are much more sensitive to sudden GPU Delay spikes.
- **WASAPI and WASAPI Exclusive Mode:** **WASAPI** (Windows Audio Session API) handles audio routing between your mic, Vonovox, and your virtual cable. **WASAPI Exclusive Mode** (when supported by your device and app) can reduce Windows mixer overhead, while shared mode offers broader compatibility. Neither fixes a GPU that is late delivering converted audio, and GPU Clock Locking does not fix Windows audio driver/sample-rate mismatches.
- **Vonovox + gaming simultaneously:** When you play a 3D game and run Vonovox at the same time, both compete for the same GPU. If the game saturates **95-100% of GPU compute**, Vonovox waits in line regardless of clock locking. In that case, lowering in-game graphics/FPS caps or raising Vonovox's **Block Size** helps far more than locking clocks.
- **GPU vs. CPU or audio driver issues:** Audio glitches can also come from CPU overload, mismatched `48 kHz` sample rates, USB mic power saving, or virtual cable misconfiguration. GPU Clock Locking only targets GPU frequency transitions.

| Possible benefits (not guaranteed) | What GPU Clock Locking does NOT guarantee |
| --- | --- |
| More predictable GPU clock behavior during bursty audio loads | Faster overall voice conversion speed |
| Fewer sudden GPU Delay spikes on some desktop/laptop setups | Elimination of all crackling, popping, or dropouts |
| Easier A/B troubleshooting when isolating latency jitter | Better voice quality, timbre, or pitch accuracy |

---

## 3. NVIDIA Compatibility & Error Messages

Having `nvidia-smi` installed does **not** guarantee that `-lgc` (Lock Graphics Clocks) is supported on your hardware and driver combination.

- **Desktop GeForce GPUs:** Many modern desktop GeForce cards support `-lgc` on recent drivers, though exact clock granularity and behavior depend on architecture and driver version.
- **Laptop NVIDIA GPUs:** Many laptops restrict clock locking in firmware/BIOS, power management, or Optimus/hybrid graphics paths. Even when `-lgc` is accepted, laptop thermal and power limits frequently override the requested clock.
- **Workstation / Datacenter GPUs (Quadro, RTX A-series, Tesla, L4/T4):** Broadly support `nvidia-smi` clock controls on standard enterprise/studio drivers.
- **Older hardware generations & drivers:** Older architectures (such as Maxwell/Pascal or legacy drivers) may return `Not Supported` for `-lgc` or `SUPPORTED_CLOCKS`. Do not assume every GTX or RTX card supports clock locking.

### Common messages and what they mean

| Message | Meaning | Safe solution |
| --- | --- | --- |
| `Not Supported` | Your GPU model, laptop firmware, or current driver does not allow `-lgc` or `SUPPORTED_CLOCKS` queries. | Do not force it. Skip clock locking and use the [alternatives](#13-alternatives-when-clock-locking-does-not-help). |
| `Insufficient Permissions` | Command Prompt was opened normally instead of **Run as administrator**. | Close CMD, search `cmd` in Start, right-click **Command Prompt**, and choose **Run as administrator**. |
| `Invalid Argument` | The MHz values you entered are not valid, not formatted as `min,max`, or outside supported clocks. | Run `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` and pick an exact value listed under **Graphics**. |
| `NVIDIA-SMI has failed` | The NVIDIA driver is not responding, no NVIDIA GPU is active, or the card is asleep in hybrid laptop mode. | Make sure the NVIDIA GPU is enabled in Device Manager and not disabled by a laptop eco/battery mode. |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` is not in Windows' `PATH` variable (common on some setups). | Run it using its full path (see [Section 4](#4-beginner-setup-windows-10--windows-11)) without reinstalling drivers. |

---

## 4. Beginner Setup: Windows 10 & Windows 11

Follow these exact steps if you have never used Command Prompt (`cmd`) before:

1. **Verify you have an NVIDIA GPU:** Press `Ctrl + Shift + Esc` to open **Task Manager**, click **Performance**, and look for an **NVIDIA** GPU in the left list. (If you only see AMD or Intel, this guide does not apply to your PC.)
2. **Open the Start menu:** Press the **Windows key** on your keyboard (or click the Start icon on the taskbar).
3. **Search for `cmd`:** Type `cmd` (do not press Enter yet).
4. **Run as administrator:** Right-click **Command Prompt** in the search results and click **Run as administrator**. Click **Yes** if Windows asks for permission.
5. **Understand what running a command means:** A black window opens with a blinking cursor. Typing a line of text and pressing **Enter** asks Windows to run that tool and print the result below.
6. **Copy and paste a command:** Copy a command from this guide, click inside the black Command Prompt window, and **right-click** (or press `Ctrl + V`) to paste it.
7. **Press Enter:** Wait a moment for the output to appear.
8. **Check basic GPU status:** Run:
   ```bat
   nvidia-smi
   ```
   You should see a table showing your driver version, GPU name, temperature, memory usage, and power draw.
9. **Identify the right GPU in multi-GPU systems:** If you have more than one NVIDIA GPU, run:
   ```bat
   nvidia-smi -L
   ```
   This prints a numbered list such as `GPU 0: NVIDIA GeForce ...` and `GPU 1: ...`. Replace `0` in `-i 0` with the number of the GPU that Vonovox uses.

### If `'nvidia-smi' is not recognized`

You do **not** need to reinstall your NVIDIA driver. Windows simply does not know which folder holds `nvidia-smi.exe`. Try running it from the standard Windows folders:

```bat
"C:\Windows\System32\nvidia-smi.exe"
```

If that says not found, try the legacy NVIDIA folder:

```bat
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

Whichever path works, use that path in place of `nvidia-smi` (or let the [BAT scripts in Section 9](#9-one-click-gpu-clock-management-bat-scripts) find it automatically).

---

## 5. Finding Your GPU's Supported Clocks

Never guess a frequency. Always ask your GPU for its official list first:

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`**: Selects GPU index `0` (change `0` if `nvidia-smi -L` showed a different index for your target GPU).
- **`-q -d SUPPORTED_CLOCKS`**: Queries the official table of **Memory** and **Graphics** clock speeds supported by your GPU and driver.

### How to read the output

The output groups supported **Graphics** (GPU core) frequencies under **Memory** frequencies, similar to this layout:

```text
Supported Clocks
    Memory                        : XXXX MHz
        Graphics                  : YYYY MHz
        Graphics                  : ZZZZ MHz
```

- **Memory** clocks are for VRAM (video memory). **Do not lock memory clocks** in the standard Vonovox procedure.
- **Graphics** clocks are your **GPU core** frequencies. These are the values you use with `-lgc`.
- **Confirm your value is listed:** Only pick a number that appears verbatim next to `Graphics :` in your output.
- **If it prints `N/A` or `Not Supported`:** Your GPU/driver combination does not expose supported clocks via NVML. Do not try to force random numbers; proceed to [Alternatives](#13-alternatives-when-clock-locking-does-not-help).

> **Do NOT enter arbitrary high values (such as `50000` MHz):** According to NVIDIA documentation, some devices and drivers may snap or round a requested clock to the nearest supported frequency, while out-of-range requests can fail with `Invalid Argument` or be rejected altogether. Never enter arbitrary numbers to rely on driver rounding. Always use an exact `Graphics` value printed by `SUPPORTED_CLOCKS`.

---

## 6. Choosing an Appropriate Frequency

There is **no single "best MHz"** for every GPU model, PC case, or room temperature. Follow this safe selection process:

1. **Observe your GPU's normal clocks first:** Open Vonovox, start live conversion, and run `nvidia-smi -i 0 -q -d CLOCK` in CMD to see what Graphics MHz your card naturally uses.
2. **Check `SUPPORTED_CLOCKS`:** Pick a value from your `Graphics` list that sits comfortably around or slightly below your typical boost range.
3. **Do not automatically choose the maximum:** The highest listed clock draws the most power and generates the most heat. A slightly lower supported clock often stays cooler and avoids throttling.
4. **Watch temperatures and power draw:** Keep an eye on `nvidia-smi` while testing. If temperatures climb rapidly or fans run at full blast, pick a lower supported clock.
5. **Check for thermal or power throttling:** Run `nvidia-smi -i 0 -q -d PERFORMANCE` during load to see if `SW Thermal Slowdown` or `HW Thermal Slowdown` becomes `Active`.
6. **Test 2-3 supported values if needed:** Compare them using the [A/B test](#10-how-to-test-whether-it-actually-helps).
7. **Keep it only if it helps:** If you do not see measurably steadier **GPU Delay** or cleaner audio, reset to defaults.

---

## 7. Applying GPU Clock Lock

To lock the GPU core clock, use `-lgc min,max`.

> **Illustrative example only:** In the commands below, `1800` MHz is **purely a demonstration value**. Replace `1800` with an exact `Graphics` frequency from **your own** `SUPPORTED_CLOCKS` output.

**Lock to a single supported clock (min and max equal):**

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

- **`-i 0`**: Target GPU index `0`.
- **`-lgc`**: Lock Graphics Clocks.
- **`1800,1800`**: Minimum and maximum graphics clock in MHz (must be separated by a comma, with no spaces).

**Example with a range (different min and max):**

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

This allows NVIDIA GPU Boost to move between two supported frequencies (`1500` and `1800` MHz in this illustrative example) while preventing the card from dropping to deep idle clocks between audio chunks.

### Verify the clock lock was accepted vs. actually observed

It is important to distinguish between:
- **Requested frequency:** The MHz value you passed to `-lgc`.
- **Configured range (`min,max`):** The bounds accepted by the driver (note that some drivers/devices may snap to the nearest supported clock).
- **Actually observed frequency:** The real clock your GPU runs at under load.

After running `-lgc`, CMD only confirms that the driver accepted the request. Acceptance does **not** guarantee the GPU will stay locked at that exact MHz. To check the **actually observed live clock** while Vonovox is converting audio, run:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

Or watch it update every second (press `Ctrl + C` to stop watching):

```bat
nvidia-smi -i 0 -q -d CLOCK -l 1
```

Look at **Clocks → Graphics** in the output. **Thermal limits, power limits, and driver or laptop firmware restrictions** can still prevent the GPU from holding the exact requested MHz, and `-lgc` does not always keep a perfectly fixed frequency under all conditions.

---

## 8. Restoring Default Settings

Always restore dynamic clock management when you finish testing, when you close Vonovox, or if you see no benefit (replace `0` with the GPU index you configured if you have multiple GPUs):

```bat
nvidia-smi -i 0 -rgc
```

- **What it does:** `-rgc` (**Reset Graphics Clocks**) removes the clock lock and hands control back to NVIDIA GPU Boost.
- **Why restore defaults:** Dynamic clocks keep your GPU cooler, quieter, and more power-efficient during normal desktop use, video playback, and gaming.
- **How to verify restoration:** Run `nvidia-smi -i 0 -q -d CLOCK` while idle on the desktop; after a few seconds, the **Graphics** clock should drop back down to low idle speeds.
- **Reboots and driver resets:** `nvidia-smi -lgc` is **not permanent**. Rebooting Windows or restarting the graphics driver normally resets clocks to default automatically.
- **If `-rgc` returns an error:** `-rgc` is not guaranteed to succeed if the NVIDIA driver itself is in an error state. Ensure CMD is running **as administrator**, confirm the `-i` GPU index matches `nvidia-smi -L`, or **reboot Windows** to restore dynamic clocks.

---

## 9. One-Click GPU Clock Management (BAT Scripts)

These two Windows `.bat` scripts use built-in Windows PowerShell (no external software required) to automate the safe workflow above:

- **What the scripts do:** `Lock-GPU-Clocks.bat` temporarily locks **only** your NVIDIA GPU's core **Graphics** clock until you reset it or reboot. `Reset-GPU-Clocks.bat` removes that lock and returns control to NVIDIA GPU Boost.
- **No risky changes:** Neither script overclocks, touches voltages, modifies power limits, disables Windows security features, or makes permanent system changes.
- **Strict input & frequency validation:** `Lock-GPU-Clocks.bat` checks administrator privileges independently of the Windows `Server` service, verifies that your chosen GPU index exists in `nvidia-smi -L`, parses **only** `Graphics` clocks from `SUPPORTED_CLOCKS` (ignoring `Memory` clocks), rejects arbitrary or unverified numbers (like `50000`), and **never** auto-selects the maximum clock.
- **Safe error handling:** If `-lgc` fails, the script does **not** run `-rgc` automatically, displays the NVIDIA exit code, and tells you how to inspect your current clocks before proceeding. It also uses structured `nvidia-smi --query-gpu=clocks.gr` telemetry to distinguish between driver acceptance and the actually observed clock.

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Click to expand and reveal the full Lock-GPU-Clocks.bat code</strong></summary>

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
<summary><strong>Click to expand and reveal the full Reset-GPU-Clocks.bat code</strong></summary>

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

### How to create and run the `.bat` files safely

1. Open **Notepad** (search `notepad` in the Start menu).
2. Copy one of the complete scripts above and paste it into Notepad.
3. Click **File → Save As...**.
4. At the bottom, change **Save as type** from `Text Documents (*.txt)` to **All Files (`*.*`)**.
5. Name the file `Lock-GPU-Clocks.bat` (or `Reset-GPU-Clocks.bat`) and save it to an easy-to-find folder such as your Desktop. *(Changing **Save as type** to **All Files** prevents Windows from accidentally naming it `Lock-GPU-Clocks.bat.txt`.)*
6. Right-click the saved `.bat` file and select **Run as administrator**.
7. Read the output carefully:
   - `[ACCEPTED]` / `[DONE]` means `nvidia-smi` accepted the command and shows the **observed** Graphics clock right afterward.
   - `[ERROR]` or `[STOPPED]` explains what failed and confirms no unverified clock was applied. If your GPU shows `Not Supported` or cannot be parsed, skip this optimization.

---

## 10. How to Test Whether It Actually Helps

Do not assume clock locking helped just because you see a higher MHz number. A higher frequency does **not** automatically mean better audio performance. Run a structured **A/B comparison** on your own PC:

- **Preliminary check (optional, 3-5 minutes):** Quick sanity check to see if the locked clock runs cool and triggers no audio glitches.
- **Full A/B benchmark (recommended, at least 10-15 minutes per pass):**
  1. **Restore default clocks** (`nvidia-smi -i 0 -rgc`, replacing `0` with your GPU index).
  2. **Start Vonovox** and let your system and background load stabilize for a minute.
  3. **Run Test A (Default GPU Clocks)** for at least **10-15 minutes** and record all metrics below.
  4. **Apply one verified supported Graphics clock** (`Lock-GPU-Clocks.bat` or `-lgc`).
  5. **Run Test B (Locked GPU Clocks)** for at least **10-15 minutes** under the exact same conditions.
  6. **Compare Test A vs. Test B** using the table below.
  7. **Repeat the test** if the results are close or inconclusive.
  8. **Restore default clocks** (`-rgc`) when finished or whenever no clear benefit is shown.

**Keep all of these identical between Test A and Test B:**

- RVC voice model
- F0 Method
- Block Size
- Input, Output, and Monitor audio devices
- Audio backend (e.g., WASAPI shared / exclusive)
- Concurrent GPU workloads (same game open or same idle desktop) and operating conditions

### Fillable comparison table

| Metric to record | Test A: Default Clocks (10-15 min) | Test B: Locked Clocks (10-15 min) |
| --- | --- | --- |
| Average **GPU Delay** (ms) | `____ ms` | `____ ms` |
| **GPU Delay** spikes (highest seen) | `____ ms` | `____ ms` |
| Processing time variability (steady vs. jumpy) | `____________` | `____________` |
| Audio crackling / dropouts | `Yes / No (count)` | `Yes / No (count)` |
| GPU temperature (°C) | `____ °C` | `____ °C` |
| GPU power draw (W) | `____ W` | `____ W` |
| Actually observed Graphics clock (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Throttling status (`-q -d PERFORMANCE`) | `None / Thermal / Power` | `None / Thermal / Power` |

### Interpreting your results

- **Keep it** only if Test B shows measurably steadier **GPU Delay** and fewer audio glitches *without* overheating or throttling.
- **Restore defaults (`nvidia-smi -i 0 -rgc`)** if Test B feels identical, runs hotter for no real audio gain, or performs worse.

---

## 11. Risks, Limitations, and Precautions

Locking within NVIDIA's supported clocks is **not** overclocking, but it still has trade-offs:

- **Higher temperatures and fan noise:** Holding higher clocks at idle or light load generates extra heat and keeps fans spinning faster.
- **Higher power draw and shorter laptop battery life:** A locked graphics clock can limit or reduce how often your GPU drops into low-power idle states, which can increase idle power draw and drain laptop batteries faster.
- **Thermal throttling or power throttling:** If a locked clock pushes your cooling or power budget too hard, the GPU will throttle itself down anyway, sometimes causing worse stutters.
- **Limited compatibility and third-party tool conflicts:** Tools like MSI Afterburner, Armoury Crate, or OEM laptop control centers may override or conflict with `nvidia-smi` clock settings.
- **Do not modify BIOS, voltages, or thermal protections:** Never flash custom VBIOS files, disable thermal limits, or force overvolting for voice conversion.

---

## 12. Advanced Note: GPU Memory Clock Locking (`-lmc`)

`nvidia-smi` also provides memory clock commands:

```bat
nvidia-smi -i 0 -lmc <min,max>
nvidia-smi -i 0 -rmc
```

`-lmc` locks **VRAM (memory) frequency**, whereas `-lgc` locks **GPU core (graphics) frequency**. Memory clock locking is **not** part of the standard Vonovox workflow because there is insufficient evidence that locking VRAM clocks improves live RVC audio performance, and keeping VRAM at high clocks continuously increases idle heat and power draw.

---

## 13. Alternatives When Clock Locking Does Not Help

If `-lgc` returns `Not Supported` or does not improve your audio, try these safer, often more effective steps:

1. **NVIDIA Control Panel → Power Management Mode:** Set **Power management mode** to **Prefer maximum performance** for the Vonovox executable (`Manage 3D settings → Program Settings`). Note: this is **not** the same as `-lgc` and does not guarantee fixed clocks across all CUDA workloads, but it can reduce aggressive downclocking on some systems.
2. **Verify Vonovox uses your NVIDIA GPU:** On laptops with hybrid graphics, make sure Vonovox runs on the NVIDIA GPU rather than integrated graphics.
3. **Adjust Block Size in Vonovox:** Increasing **Block Size** by one step is the most reliable way to eliminate crackling when the GPU is busy.
4. **Match `48 kHz` audio formats & WASAPI setup:** Follow [Route and tune Vonovox](live-audio.md) to align sample rates and avoid duplicate monitoring.
5. **Reduce competing GPU workloads:** Cap in-game frame rates or lower heavy GPU settings when running Vonovox alongside games.
6. **Check drivers & cooling:** Update to a clean Studio/Game Ready driver and clear dust from laptop/PC vents if thermal throttling occurs.

---

## 14. Troubleshooting

| Symptom | Possible Cause | Recommended Solution |
| --- | --- | --- |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` is not in `PATH`. | Run `"C:\Windows\System32\nvidia-smi.exe"` or `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"`, or use the `.bat` scripts above. |
| NVIDIA detects no GPU / `NVIDIA-SMI has failed` | No NVIDIA GPU present, GPU disabled, or laptop hybrid GPU asleep. | Check **Task Manager → Performance**, enable the NVIDIA adapter in Device Manager, and plug in laptop AC power. |
| `Insufficient Permissions` | CMD was not opened as Administrator. | Right-click **Command Prompt** (or the `.bat` file) and select **Run as administrator**. |
| `Not Supported` when running `-lgc` | GPU architecture, laptop firmware, or driver does not allow clock locking. | Leave clocks on default and use the [Alternatives](#13-alternatives-when-clock-locking-does-not-help). |
| `Invalid Argument` | Syntax error or frequency outside supported clocks. | Run `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` and enter an exact `Graphics` value with `min,max` format. |
| Displayed clock does not match requested MHz | Power limit, thermal limit, or driver constraint is capping the GPU. | Test a slightly lower supported clock or check `nvidia-smi -i 0 -q -d PERFORMANCE`. |
| Clock drops under load | Thermal throttling or laptop power limit reached. | Lower the locked clock, improve cooling, or restore defaults with `-rgc`. |
| Temperatures rise too high | High clock locked continuously without adequate cooling. | Run `nvidia-smi -i 0 -rgc` immediately and use a lower clock or dynamic defaults. |
| Vonovox shows no improvement | Bottleneck is Block Size, CPU, WASAPI, or overall GPU saturation rather than clock ramping. | Run `nvidia-smi -i 0 -rgc` and tune **Block Size** and audio routing in [Route and tune Vonovox](live-audio.md). |
| Vonovox gets worse after locking | Locked clock is too low for the workload or too high (causing thermal throttling). | Run `nvidia-smi -i 0 -rgc` to restore dynamic clocks, then test a different supported value or stay on defaults. |
| GPU behaves differently with a game open | Game uses most of the GPU compute/power budget. | Cap game FPS, lower GPU-heavy settings, or raise Vonovox **Block Size**. |
| Reset command (`-rgc`) fails | Missing admin rights, wrong `-i` index, or driver glitch. | Run CMD as administrator with the right `-i` index, or reboot Windows. |
| Unsure which MHz value to pick | Haven't checked baseline clocks under load yet. | Run `nvidia-smi -i 0 -q -d CLOCK` while using Vonovox normally, then pick a supported value near that range. |
| Laptop limits clocks automatically | Laptop OEM power profile / battery / firmware cap. | Plug in the charger, use Balanced/Performance OEM mode, or rely on Block Size tuning instead of `-lgc`. |

---

## 15. Frequently Asked Questions (FAQ)

1. **Is GPU Clock Locking safe?**
   Yes, when you only use official frequencies from `SUPPORTED_CLOCKS` and monitor temperatures. It does not change voltages or bypass hardware thermal protections.
2. **Is this overclocking?**
   No. Overclocking pushes hardware beyond factory limits. Clock locking only selects frequencies already defined by NVIDIA in your card's supported table.
3. **Will this increase my FPS in games?**
   Usually no, and it is not meant for that. If a locked clock is lower than your normal boost clock, gaming FPS may even drop slightly.
4. **Will it improve Vonovox voice quality?**
   No. Voice quality depends on your model, microphone, pitch/F0 extractor, and audio routing, not GPU clock locking.
5. **Will it reduce latency?**
   It does not lower minimum latency below what your GPU can already compute, though it may reduce sudden **latency spikes** caused by clock ramping on some setups.
6. **Does it work on laptops?**
   Sometimes, but many laptops restrict `-lgc` in firmware or hit thermal/power limits quickly. Always keep laptops plugged into AC power when testing.
7. **Does it work on every NVIDIA GPU?**
   No. Support depends on the GPU generation, board/laptop firmware, and driver version.
8. **Should I always select the maximum clock?**
   No. Maximum clocks create maximum heat and noise and can trigger thermal throttling. Moderate supported clocks are often more stable.
9. **Can I use `50000` MHz?**
   No. Never enter arbitrary numbers. Out-of-range values can fail with `Invalid Argument` and are not guaranteed to clamp safely.
10. **Does it work with RTX GPUs?**
    Many desktop RTX cards support `-lgc` on modern drivers, while some laptops or specific configurations may return `Not Supported`. Test with `SUPPORTED_CLOCKS` first.
11. **Do I need to apply it every time?**
    Yes, if you decide to keep using it, because `nvidia-smi` clock locks reset on reboot or driver restart.
12. **Will the settings survive a reboot?**
    No. Rebooting Windows automatically clears `-lgc` and returns your GPU to normal dynamic clocks.
13. **Can I use Vonovox while gaming?**
    Yes, provided your GPU has enough headroom for both. If the game hits 95-100% GPU load, cap FPS or increase Vonovox **Block Size**.
14. **What happens if my GPU overheats?**
    NVIDIA's hardware thermal protection will automatically throttle the card down (or shut down in extreme cases). If temps climb too high, run `nvidia-smi -i 0 -rgc` immediately.
15. **How do I restore everything to normal?**
    Run `nvidia-smi -i 0 -rgc` as Administrator, run `Reset-GPU-Clocks.bat`, or reboot Windows.
16. **Should I lock the VRAM clock too (`-lmc`)?**
    No. There is no solid evidence that locking memory clocks helps Vonovox, and it increases idle heat and power draw.
17. **What should I do if I see `Not Supported`?**
    Skip GPU Clock Locking completely and use the safer [Alternatives](#13-alternatives-when-clock-locking-does-not-help) such as **Block Size** tuning and NVIDIA Control Panel power settings.

---

## 16. Official References

- [NVIDIA System Management Interface (nvidia-smi) Documentation](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [NVIDIA NVML API Reference: Device Commands](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking Best Practices](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Vonovox Project Repository](https://github.com/dr87/Vonovox)
