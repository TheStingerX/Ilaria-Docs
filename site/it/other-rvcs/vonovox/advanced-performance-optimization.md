# Ottimizzazione prestazioni avanzata: NVIDIA GPU Clock Locking

> **Ottimizzazione facoltativa:** Questa guida è **facoltativa al 100%** e **non è mai obbligatoria** per installare o usare Vonovox. Completa prima [Installa Vonovox](installation.md) e [Configura e regola Vonovox](live-audio.md) prima di provare impostazioni GPU avanzate.

**Principio fondamentale:** Il GPU Clock Locking è un'ottimizzazione avanzata facoltativa che può migliorare la stabilità dell'elaborazione in tempo reale di Vonovox sulle GPU NVIDIA supportate. Usa sempre frequenze supportate, verifica i risultati sul tuo hardware e ripristina le frequenze predefinite se non osservi benefici misurabili.

> **Ripristino rapido (eseguibile in qualsiasi momento):** Apri il Prompt dei comandi come amministratore ed esegui `nvidia-smi -i 0 -rgc` (sostituisci `0` con l'indice della tua GPU se hai più schede). Puoi anche riavviare Windows per tornare alla gestione dinamica.

## Indice dei contenuti

- [Percorso rapido per utenti esperti](#percorso-rapido-per-utenti-esperti)
- [1. Cos'è il GPU Clock Locking (introduzione per principianti)](#1-cosè-il-gpu-clock-locking-introduzione-per-principianti)
- [2. Come le frequenze GPU influenzano Vonovox](#2-come-le-frequenze-gpu-influenzano-vonovox)
- [3. Compatibilità NVIDIA e messaggi di errore](#3-compatibilità-nvidia-e-messaggi-di-errore)
- [4. Preparazione per principianti: Windows 10 e Windows 11](#4-preparazione-per-principianti-windows-10-e-windows-11)
- [5. Individuare le frequenze supportate dalla tua GPU](#5-individuare-le-frequenze-supportate-dalla-tua-gpu)
- [6. Come scegliere una frequenza appropriata](#6-come-scegliere-una-frequenza-appropriata)
- [7. Applicazione del GPU Clock Lock](#7-applicazione-del-gpu-clock-lock)
- [8. Ripristino delle impostazioni originali](#8-ripristino-delle-impostazioni-originali)
- [9. Gestione con un clic (file BAT)](#9-gestione-con-un-clic-file-bat)
- [10. Come verificare se migliora davvero (Test A/B)](#10-come-verificare-se-migliora-davvero-test-ab)
- [11. Rischi, limitazioni e precauzioni](#11-rischi-limitazioni-e-precauzioni)
- [12. Nota avanzata: blocco della memoria GPU (-lmc)](#12-nota-avanzata-blocco-della-memoria-gpu--lmc)
- [13. Alternative quando il Clock Locking non aiuta](#13-alternative-quando-il-clock-locking-non-aiuta)
- [14. Risoluzione dei problemi](#14-risoluzione-dei-problemi)
- [15. Domande frequenti (FAQ)](#15-domande-frequenti-faq)
- [16. Fonti ufficiali](#16-fonti-ufficiali)

---

## Percorso rapido per utenti esperti

Se sai già usare il Prompt dei comandi come amministratore e `nvidia-smi`:

1. Elenca le GPU e conferma l'indice (`0` nei sistemi con una sola GPU):
   ```bat
   nvidia-smi -L
   ```
2. Consulta le frequenze grafiche supportate su quella GPU:
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Blocca su una frequenza grafica **verificata e supportata** dall'elenco (`1800` qui sotto è solo un valore dimostrativo):
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Verifica le frequenze reali mentre Vonovox è in esecuzione:
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Esegui un [confronto A/B in Vonovox](#10-come-verificare-se-migliora-davvero-test-ab). Al termine, o se non noti miglioramenti, ripristina subito le frequenze dinamiche:
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. Cos'è il GPU Clock Locking (introduzione per principianti)

1. **Cos'è la frequenza di una GPU:** Dentro la tua scheda grafica NVIDIA, il processore principale (il core GPU) esegue milioni di piccoli calcoli al secondo. La **frequenza di clock** indica quanti cicli di calcolo completa ogni secondo.
2. **Cosa significa MHz:** **MHz** significa **megahertz** (1 milione di cicli al secondo). Ad esempio, `1500 MHz` equivale a 1,5 miliardi di cicli al secondo, e `1800 MHz` a 1,8 miliardi di cicli al secondo.
3. **Come funzionano le frequenze dinamiche NVIDIA:** Le GPU moderne non vanno a una velocità fissa. Quando sei sul desktop senza fare nulla, la GPU scende a frequenze basse (ad es. `210 MHz` o `300 MHz`) per consumare meno, restare fresca e silenziosa. Quando parte un carico pesante, accelera.
4. **Cos'è NVIDIA GPU Boost:** **NVIDIA GPU Boost** è il sistema automatico integrato che alza e abbassa continuamente la frequenza della GPU in base a carico di lavoro, temperatura, limiti di potenza e tensione.
5. **Perché le frequenze oscillano con Vonovox:** La conversione vocale dal vivo elabora l'audio in blocchi discreti (la cui durata dipende da **Block Size** e dalle impostazioni audio) invece che con un carico 3D continuo. Tra un blocco e l'altro la GPU può vedere "basso carico", abbassare la frequenza e poi doverla rialzare al blocco successivo.
6. **Cosa significa bloccare una frequenza:** Il **GPU Clock Locking** (`nvidia-smi -lgc`) chiede al driver NVIDIA di mantenere il core GPU entro un intervallo supportato (o su un singolo valore supportato quando minimo e massimo coincidono). Pensa al **cruise control in autostrada**: l'auto mantiene una velocità costante invece di frenare e riaccelerare di continuo.
7. **Differenza tra GPU Clock Locking e overclocking:**
   - L'**overclocking** spinge la scheda *oltre* i limiti di fabbrica o modifica tensioni e curve di potenza.
   - Il **GPU Clock Locking** seleziona solo una frequenza già prevista da NVIDIA nella tabella ufficiale della scheda: **non** alza i voltaggi, **non** sblocca i limiti di potenza e **non** forza velocità non supportate.
8. **Perché una frequenza stabile può aiutare l'audio dal vivo:** Se la GPU impiega `8 ms` a frequenza alta e `18 ms` quando scende temporaneamente, quel salto improvviso crea variabilità nella latenza. Mantenere una frequenza stabile può rendere i tempi di elaborazione più regolari.
9. **Perché la frequenza massima non è sempre la scelta migliore:** Bloccare al massimo MHz supportato aumenta calore, rumore delle ventole e consumi. Se la GPU raggiunge il limite termico o di potenza, va in **throttling** (riduce la velocità da sola), causando più scatti rispetto a una frequenza media e costante.

---

## 2. Come le frequenze GPU influenzano Vonovox

Vonovox elabora l'audio del microfono in tempo reale tramite **CUDA** sulla GPU NVIDIA. Ogni blocco audio (definito da **Block Size**) deve essere convertito prima che arrivi il blocco successivo.

- **GPU Delay e variabilità:** In Vonovox, **GPU Delay** mostra quanto tempo impiega la GPU per convertire ciascun blocco. Se i clock oscillano tra stato idle e boost, possono comparire picchi improvvisi di GPU Delay.
- **Audio crackling, popping e stuttering:** Se anche un solo blocco arriva in ritardo perché la GPU stava ancora risalendo di frequenza, il buffer si svuota e senti clic, scoppiettii o audio robotico a scatti.
- **Buffer Size e Block Size:** Un **Block Size** più alto dà più margine alla GPU ma aumenta la latenza totale; un valore più basso riduce la latenza ma è più sensibile ai picchi di GPU Delay.
- **WASAPI e WASAPI Exclusive Mode:** **WASAPI** gestisce il percorso audio tra microfono, Vonovox e cavo virtuale. La modalità esclusiva (**Exclusive Mode**, se supportata) può ridurre l'overhead del mixer di Windows, mentre la modalità condivisa offre più compatibilità. Nessuna delle due risolve una GPU in ritardo, così come il Clock Locking non risolve driver audio errati o sample rate diversi da `48 kHz`.
- **Vonovox e videogiochi insieme:** Se giochi mentre usi Vonovox, entrambi condividono la GPU. Se il gioco satura il **95-100% della GPU**, Vonovox deve attendere il turno indipendentemente dal clock lock: in quel caso conviene limitare gli FPS del gioco o alzare il **Block Size**.
- **Problemi GPU vs CPU o driver audio:** Scoppiettii e tagli possono dipendere anche da CPU satura, formati audio non allineati a `48 kHz`, risparmio energetico USB o cavo virtuale configurato male.

| Benefici possibili (non garantiti) | Benefici NON garantiti |
| --- | --- |
| Frequenze GPU più prevedibili con carichi audio a raffiche | Aumento della velocità massima di conversione |
| Riduzione dei picchi improvvisi di GPU Delay in alcune configurazioni | Eliminazione di tutti i disturbi o tagli audio |
| Test A/B più puliti quando isoli la causa della latenza | Miglioramento della qualità vocale o dell'intonazione |

---

## 3. Compatibilità NVIDIA e messaggi di errore

Avere `nvidia-smi` funzionante **non garantisce** che il comando `--lgc` sia supportato dalla tua scheda o dal driver.

- **GPU NVIDIA Desktop (GeForce):** Molte schede desktop recenti supportano `--lgc` sui driver attuali, ma comportamento e granularità dipendono dall'architettura.
- **GPU NVIDIA Laptop:** Molti portatili bloccano `--lgc` a livello di firmware/BIOS o tramite gestione energetica/Optimus. Anche quando il comando viene accettato, i limiti termici o di potenza del portatile possono prevalere.
- **GPU professionali e datacenter (Quadro, RTX A-series, Tesla, L4/T4):** Supportano ampiamente i comandi clock di `nvidia-smi`.
- **Generazioni e driver meno recenti:** Architetture più vecchie o driver datati possono restituire `Not Supported`. Non dare per scontato che ogni GTX o RTX supporti `--lgc`.

### Messaggi comuni e soluzioni sicure

| Messaggio | Significato | Soluzione sicura |
| --- | --- | --- |
| `Not Supported` | La tua GPU, il firmware del laptop o il driver attuale non consente `--lgc` o `SUPPORTED_CLOCKS`. | Non forzare: lascia i clock dinamici e usa le [alternative](#13-alternative-quando-il-clock-locking-non-aiuta). |
| `Insufficient Permissions` | Hai aperto CMD normalmente invece che come amministratore. | Chiudi CMD, cerca `cmd` in Start, tasto destro → **Esegui come amministratore**. |
| `Invalid Argument` | I valori MHz inseriti non sono validi, non sono nel formato `min,max` o sono fuori lista. | Esegui `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` e copia un valore esatto sotto `Graphics :`. |
| `NVIDIA-SMI has failed` | Driver NVIDIA non risponde, nessuna GPU attiva o GPU spenta in modalità risparmio laptop. | Verifica la GPU in Gestione dispositivi e collega il portatile alla presa elettrica. |
| `nvidia-smi` non riconosciuto | `nvidia-smi.exe` non è nella variabile `PATH` di Windows. | Eseguilo dal percorso completo (vedi [Sezione 4](#4-preparazione-per-principianti-windows-10-e-windows-11)) senza reinstallare i driver. |

---

## 4. Preparazione per principianti: Windows 10 e Windows 11

Segui questi passaggi esatti se non hai mai usato il Prompt dei comandi (`cmd`):

1. **Verifica di avere una GPU NVIDIA:** Premi `Ctrl + Maiusc + Esc` per aprire **Gestione attività**, vai su **Prestazioni** e controlla se compare una GPU **NVIDIA**. (Se hai solo AMD o Intel, questa guida non è applicabile.)
2. **Apri il menu Start:** Premi il tasto **Windows** sulla tastiera o clicca sull'icona Start.
3. **Cerca `cmd`:** Scrivi `cmd` (senza premere subito Invio).
4. **Avvia come amministratore:** Fai tasto destro su **Prompt dei comandi** e scegli **Esegui come amministratore**. Conferma con **Sì**.
5. **Cos'è eseguire un comando:** Si apre una finestra nera con un cursore. Scrivere un comando e premere **Invio** chiede a Windows di eseguire quello strumento e mostrare il risultato sotto.
6. **Copiare e incollare un comando:** Copia un comando da questa guida, clicca dentro la finestra nera e premi **tasto destro** (oppure `Ctrl + V`).
7. **Premi Invio:** Attendi qualche istante che compaia l'output.
8. **Controlla lo stato base della GPU:** Esegui:
   ```bat
   nvidia-smi
   ```
   Vedrai una tabella con versione driver, nome della GPU, temperatura, memoria e consumo.
9. **Individua la GPU giusta (sistemi multi-GPU):** Se hai più GPU NVIDIA, esegui:
   ```bat
   nvidia-smi -L
   ```
   Vedrai `GPU 0: NVIDIA GeForce ...`, `GPU 1: ...`. Sostituisci `0` in `-i 0` con il numero della GPU usata da Vonovox.

### Se `nvidia-smi` non è riconosciuto

**Non serve reinstallare i driver NVIDIA.** Prova il percorso standard di Windows:

```bat
"C:\Windows\System32\nvidia-smi.exe"
```

Se non viene trovato, prova la cartella storica NVIDIA:

```bat
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

Usa il percorso che funziona al posto di `nvidia-smi` (oppure usa gli [script BAT della Sezione 9](#9-gestione-con-un-clic-file-bat) che lo cercano automaticamente).

---

## 5. Individuare le frequenze supportate dalla tua GPU

Non tirare mai a indovinare una frequenza. Chiedi sempre prima la lista ufficiale alla scheda:

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`**: Seleziona la GPU `0` (cambia `0` se `nvidia-smi -L` mostra un altro indice).
- **`-q -d SUPPORTED_CLOCKS`**: Mostra le frequenze ufficiali **Memory** e **Graphics** supportate da GPU e driver.

### Come interpretare l'output

L'elenco raggruppa le frequenze **Graphics** (core GPU) sotto le frequenze **Memory** (VRAM):

```text
Supported Clocks
    Memory                        : XXXX MHz
        Graphics                  : YYYY MHz
        Graphics                  : ZZZZ MHz
```

- **Memory**: frequenze della memoria video (VRAM). **Non** bloccarle nella procedura standard.
- **Graphics**: frequenze del **core grafico**. Sono i valori da usare con `--lgc`.
- **Verifica esatta:** Scegli solo un numero presente esattamente accanto a `Graphics :` nel tuo terminale.
- **Se mostra `N/A` o `Not Supported`:** La tua combinazione GPU/driver non espone i clock supportati. Non inserire valori casuali e passa alle [Alternative](#13-alternative-quando-il-clock-locking-non-aiuta).

> **Non inserire MAI valori arbitrari elevati (come `50000` MHz):** Secondo la documentazione NVIDIA, alcuni dispositivi e driver possono arrotondare una frequenza richiesta al valore supportato più vicino, mentre richieste fuori intervallo possono fallire con `Invalid Argument` o essere rifiutate. Non inserire mai numeri arbitrari per sfruttare l'arrotondamento del driver: usa sempre un valore `Graphics` esatto stampato da `SUPPORTED_CLOCKS`.

---

## 6. Come scegliere una frequenza appropriata

Non esiste una frequenza ideale uguale per tutti i modelli di GPU o per ogni PC. Segui questi passaggi:

1. **Osserva le frequenze normali:** Avvia Vonovox in tempo reale ed esegui `nvidia-smi -i 0 -q -d CLOCK` in CMD per vedere quali MHz usa di solito.
2. **Controlla `SUPPORTED_CLOCKS`:** Scegli un valore sotto `Graphics :` vicino o leggermente inferiore al tuo range tipico di boost.
3. **Non scegliere per forza il massimo:** Il valore più alto scalda e consuma di più e può far intervenire il thermal throttling.
4. **Controlla temperature e consumi:** Osserva `nvidia-smi` durante la prova; se la temperatura sale troppo o le ventole vanno al massimo, scendi a un valore supportato più basso.
5. **Controlla eventuale throttling:** Esegui `nvidia-smi -i 0 -q -d PERFORMANCE` sotto carico per vedere se `SW Thermal Slowdown` o `HW Thermal Slowdown` risulta `Active`.
6. **Prova 2-3 valori supportati** se necessario, usando il [Test A/B](#10-come-verificare-se-migliora-davvero-test-ab).
7. **Mantieni la modifica solo se porta benefici reali.**

---

## 7. Applicazione del GPU Clock Lock

Il comando usa la sintassi `-lgc min,max`.

> **Valore puramente dimostrativo:** Negli esempi seguenti `1800` MHz è **solo un esempio**. Sostituiscilo con un valore reale letto dal tuo output di `SUPPORTED_CLOCKS`.

**Bloccare su una singola frequenza supportata (minimo e massimo uguali):**

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

- **`-i 0`**: Indice della GPU.
- **`-lgc`**: Lock Graphics Clocks.
- **`1800,1800`**: Frequenza minima e massima in MHz separate da una virgola senza spazi.

**Esempio con intervallo minimo/massimo diverso:**

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

Consente a NVIDIA GPU Boost di muoversi tra due valori supportati (`1500` e `1800` MHz nell'esempio) impedendo alla GPU di scendere ai clock minimi di riposo tra un blocco audio e l'altro.

### Verifica: comando accettato vs. frequenza effettivamente osservata

Distingui sempre tra **frequenza richiesta**, **intervallo impostato (`min,max`)** e **frequenza effettivamente osservata** sotto carico. La conferma del comando `-lgc` significa solo che il driver ha accettato la richiesta, **non** che la GPU resterà fissa a quel valore in ogni situazione. Per vedere le **frequenze reali** mentre usi Vonovox, esegui:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

Oppure monitora ogni secondo (premi `Ctrl + C` per fermare):

```bat
nvidia-smi -i 0 -q -d CLOCK -l 1
```

Controlla **Clocks → Graphics**. **Limiti termici, limiti energetici e restrizioni di driver o firmware laptop** possono comunque impedire alla GPU di mantenere esattamente la frequenza richiesta.

---

## 8. Ripristino delle impostazioni originali

Torna sempre alla gestione dinamica quando chiudi Vonovox, finisci i test o non vedi miglioramenti (sostituisci `0` con l'indice della GPU configurata se hai più schede):

```bat
nvidia-smi -i 0 -rgc
```

- **Cosa fa:** `-rgc` (**Reset Graphics Clocks**) rimuove il blocco e restituisce il controllo a NVIDIA GPU Boost.
- **Perché farlo:** Le frequenze dinamiche mantengono il PC più fresco, silenzioso ed efficiente su desktop, video e giochi.
- **Come verificare:** Esegui `nvidia-smi -i 0 -q -d CLOCK` a riposo; dopo pochi secondi **Graphics** tornerà ai valori bassi di idle.
- **Riavvio o reset driver:** Il blocco **non è permanente**; riavviando Windows o il driver video, i clock tornano dinamici da soli.
- **Se il reset dà errore:** `-rgc` non è garantito in presenza di errori del driver stesso. Assicurati che CMD sia **amministratore**, verifica l'indice `-i` con `nvidia-smi -L`, oppure **riavvia Windows**.

---

## 9. Gestione con un clic (file BAT)

Questi due script Windows utilizzano PowerShell integrato in Windows (nessun software esterno richiesto) per automatizzare in sicurezza la procedura:

- Interfaccia CMD in inglese chiara e leggibile, controllo privilegi amministrativi indipendente da `net session`, verifica dell'indice GPU tramite `nvidia-smi -L` e percorso automatico di `nvidia-smi.exe`.
- Nessun overclock, nessuna modifica a voltaggi o limiti di potenza, nessuna modifica permanente al sistema.
- `Lock-GPU-Clocks.bat` estrae **solo** le frequenze `Graphics` da `SUPPORTED_CLOCKS` (ignorando `Memory`), rifiuta valori arbitrari (come `50000`) e **non sceglie mai automaticamente** il massimo.
- In caso di errore di `-lgc`, **non** esegue automaticamente `-rgc`, mostra il codice di errore NVIDIA e indica come verificare i clock attuali; inoltre usa `--query-gpu=clocks.gr` per distinguere tra comando accettato e frequenza realmente osservata.

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Clicca per espandere e rivelare il codice completo di Lock-GPU-Clocks.bat</strong></summary>

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
<summary><strong>Clicca per espandere e rivelare il codice completo di Reset-GPU-Clocks.bat</strong></summary>

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

### Come creare ed eseguire i file `.bat`

1. Apri **Blocco note** (cerca `notepad` in Start).
2. Incolla uno dei due codici qui sopra.
3. Clicca **File → Salva con nome...**.
4. In basso cambia **Salva come** da `Documenti di testo (*.txt)` a **Tutti i file (`*.*`)**.
5. Nomina il file `Lock-GPU-Clocks.bat` (o `Reset-GPU-Clocks.bat`) e salvalo sul Desktop. *(Impostare **Tutti i file** evita di salvarlo per errore come `.bat.txt`.)*
6. Fai tasto destro sul file `.bat` → **Esegui come amministratore**.
7. Leggi l'esito (`[SUCCESS]` conferma l'operazione; `[ERROR]` o `[STOPPED]` indica che non è stata fatta alcuna modifica).

---

## 10. Come verificare se migliora davvero (Test A/B)

Non considerare un MHz più alto come prova di miglioramento. Esegui una prova **A/B** strutturata identica su tutto il resto:

- **Verifica preliminare (opzionale, 3-5 minuti):** controllo rapido per verificare temperature e assenza di errori audio.
- **Test A/B completo (consigliato, almeno 10-15 minuti per fase):**
  1. Ripristina i clock predefiniti (`nvidia-smi -i 0 -rgc`).
  2. Avvia Vonovox e stabilizza il carico del sistema.
  3. Esegui il **Test A (Default GPU Clocks)** per almeno **10-15 minuti** e annota i valori.
  4. Applica un clock `Graphics` supportato (`Lock-GPU-Clocks.bat` o `-lgc`).
  5. Ripeti il **Test B (Locked GPU Clocks)** per almeno **10-15 minuti** mantenendo identici **modello RVC**, **F0 Method**, **Block Size**, **dispositivi audio**, **backend audio** e **carico GPU concorrente**.
  6. Confronta i risultati e ripeti la prova se incerta; se non ci sono benefici, ripristina subito con `-rgc`.

| Valore da annotare | Test A: Clock predefiniti (10-15 min) | Test B: Clock bloccati (10-15 min) |
| --- | --- | --- |
| **GPU Delay** medio (ms) | `____ ms` | `____ ms` |
| Picchi di **GPU Delay** (massimo visto) | `____ ms` | `____ ms` |
| Variabilità dei tempi di elaborazione | `____________` | `____________` |
| Scoppiettii / tagli audio | `Sì / No (conteggio)` | `Sì / No (conteggio)` |
| Temperatura GPU (°C) | `____ °C` | `____ °C` |
| Consumo GPU (W) | `____ W` | `____ W` |
| Frequenza Graphics reale (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Stato throttling (`-q -d PERFORMANCE`) | `Nessuno / Termico / Potenza` | `Nessuno / Termico / Potenza` |

**Come interpretare i risultati:** Mantieni il blocco solo se il Test B riduce chiaramente i picchi di GPU Delay o gli scatti *senza* surriscaldare. Se i risultati sono uguali o peggiori, ripristina subito con `nvidia-smi -i 0 -rgc`.

---

## 11. Rischi, limitazioni e precauzioni

Il GPU Clock Locking entro i limiti supportati non è overclocking, ma comporta comunque compromessi:

- Temperature più alte e ventole più rumorose a riposo o basso carico.
- Consumo elettrico maggiore e autonomia ridotta sui laptop.
- Rischio di thermal throttling o power throttling se il raffreddamento è al limite.
- Compatibilità limitata su alcuni portatili e possibili conflitti con MSI Afterburner, Armoury Crate o software OEM.
- **Non** modificare mai VBIOS, tensioni o protezioni termiche.

---

## 12. Nota avanzata: blocco della memoria GPU (`-lmc`)

`nvidia-smi` include anche `-lmc <min,max>` e `-rmc` per bloccare i clock della **VRAM (memoria)** invece del core grafico (`-lgc`). **Non** è incluso nella procedura standard: non ci sono prove sufficienti per consigliarlo con Vonovox e mantiene la memoria calda e ad alto consumo anche a riposo.

---

## 13. Alternative quando il Clock Locking non aiuta

1. **Pannello di controllo NVIDIA → Modalità di gestione dell'alimentazione:** Imposta **Preferisci le prestazioni massime** per Vonovox (`Gestisci le impostazioni 3D → Impostazioni programma`). Nota: non equivale a `-lgc` e non garantisce clock fissi per ogni carico CUDA.
2. **Verifica che Vonovox usi la GPU NVIDIA** nei portatili con grafica ibrida.
3. **Aumenta di un passo il Block Size** in Vonovox (è spesso la soluzione più efficace).
4. **Allinea i dispositivi a `48 kHz` e verifica WASAPI** in [Configura e regola Vonovox](live-audio.md).
5. **Riduci altri carichi GPU** (limita gli FPS nei giochi).
6. **Controlla driver e pulizia dissipatori** contro il thermal throttling.

---

## 14. Risoluzione dei problemi

| Sintomo | Possibile causa | Soluzione consigliata |
| --- | --- | --- |
| `nvidia-smi` non riconosciuto | `nvidia-smi.exe` assente dal `PATH`. | Usa `"C:\Windows\System32\nvidia-smi.exe"` o `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"`, oppure i file `.bat`. |
| Nessuna GPU NVIDIA / `NVIDIA-SMI has failed` | GPU assente, disabilitata o addormentata su laptop. | Controlla **Gestione attività → Prestazioni**, Gestione dispositivi e collega l'alimentatore. |
| `Insufficient Permissions` | CMD non aperto come amministratore. | Tasto destro su CMD o `.bat` → **Esegui come amministratore**. |
| `Not Supported` con `--lgc` | GPU, BIOS laptop o driver non supporta il blocco. | Lascia i clock dinamici e usa le [Alternative](#13-alternative-quando-il-clock-locking-non-aiuta). |
| `Invalid Argument` | Sintassi errata o valore non presente in lista. | Esegui `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` e copia un valore `Graphics` nel formato `min,max`. |
| La frequenza mostrata è diversa da quella richiesta | Limite di potenza, temperatura o driver. | Prova una frequenza supportata più bassa o controlla `nvidia-smi -i 0 -q -d PERFORMANCE`. |
| Il clock cala sotto carico | Thermal throttling o limite di potenza laptop. | Abbassa la frequenza bloccata, migliora il raffreddamento o ripristina con `-rgc`. |
| Temperature troppo alte | Clock alto bloccato di continuo senza raffreddamento adeguato. | Esegui subito `nvidia-smi -i 0 -rgc` e torna ai valori dinamici o a un clock inferiore. |
| Vonovox non migliora | Il collo di bottiglia è Block Size, CPU, WASAPI o GPU satura. | Esegui `-rgc` e regola Block Size/audio in [Configura e regola Vonovox](live-audio.md). |
| Vonovox peggiora dopo il blocco | Frequenza troppo bassa o troppo alta (throttling). | Ripristina con `nvidia-smi -i 0 -rgc` e prova un altro valore supportato o resta su default. |
| Con un gioco aperto si comporta diversamente | Il gioco assorbe quasi tutta la GPU. | Limita gli FPS del gioco o alza il **Block Size** in Vonovox. |
| Il comando di reset `-rgc` fallisce | Mancano privilegi admin, indice `-i` errato o blocco driver. | Verifica admin e indice con `-L`, oppure riavvia Windows. |
| Non sai quale frequenza scegliere | Non hai osservato i clock reali sotto carico. | Esegui `nvidia-smi -i 0 -q -d CLOCK` mentre usi Vonovox e scegli un valore vicino a quello. |
| Il laptop limita le frequenze da solo | Profilo energetico OEM o batteria. | Collega l'alimentatore, usa profilo Prestazioni OEM o regola solo il **Block Size**. |

---

## 15. Domande frequenti (FAQ)

1. **Il GPU Clock Locking è sicuro?** Sì, usando solo frequenze ufficiali di `SUPPORTED_CLOCKS` e controllando le temperature. Non modifica tensioni né disattiva protezioni.
2. **È overclocking?** No: seleziona solo frequenze già previste dal produttore nella tabella ufficiale.
3. **Aumenta gli FPS nei giochi?** Di norma no; se blocchi un clock più basso del boost massimo, gli FPS possono calare leggermente.
4. **Migliora la qualità della voce di Vonovox?** No: la qualità dipende da modello, microfono, F0 e routing audio.
5. **Riduce la latenza?** Non abbassa il minimo fisico della GPU, ma può ridurre i picchi improvvisi causati dai cambi di frequenza.
6. **Funziona sui laptop?** A volte sì, ma molti portatili lo bloccano o vanno subito in limite termico/potenza. Tieni sempre collegato l'alimentatore.
7. **Funziona su tutte le GPU NVIDIA?** No, dipende da generazione, firmware e driver.
8. **Conviene sempre scegliere la frequenza massima?** No: genera più calore e rumore e può attivare il thermal throttling.
9. **Posso mettere `50000` MHz?** No: mai inserire valori inventati; possono fallire o essere rifiutati senza garanzia di adattamento sicuro.
10. **Funziona con le GPU RTX?** Molte RTX desktop lo supportano sui driver recenti; alcuni laptop restituiscono `Not Supported`.
11. **Va applicato ogni volta?** Sì, se decidi di usarlo, perché si azzera al riavvio.
12. **Sopravvive a un riavvio?** No: il riavvio di Windows riporta automaticamente la GPU ai clock dinamici.
13. **Posso usare Vonovox mentre gioco?** Sì, se la GPU ha margine sufficiente; se il gioco satura la GPU, limita gli FPS o alza il Block Size.
14. **Cosa succede se la GPU si surriscalda?** Le protezioni NVIDIA riducono automaticamente la frequenza (throttling). Se la temperatura sale troppo, esegui subito `nvidia-smi -i 0 -rgc`.
15. **Come ripristino tutto come prima?** Esegui `nvidia-smi -i 0 -rgc` come amministratore, avvia `Reset-GPU-Clocks.bat` o riavvia Windows.
16. **Devo bloccare anche la VRAM (`-lmc`)?** No: non ci sono prove che aiuti Vonovox e aumenta calore e consumi a riposo.
17. **Cosa faccio se compare `Not Supported`?** Salta il Clock Locking e usa le [Alternative](#13-alternative-quando-il-clock-locking-non-aiuta).

---

## 16. Fonti ufficiali

- [Documentazione ufficiale NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [Riferimento API NVML NVIDIA: Device Commands](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking Best Practices](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Repository ufficiale Vonovox](https://github.com/dr87/Vonovox)
