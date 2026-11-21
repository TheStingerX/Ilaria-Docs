# Sicurezza, Privacy e Licenze nell'AI Vocale

> **Guida pratica, non consulenza legale:** Questa pagina riassume buone pratiche tecniche di sicurezza e regole comuni sulle licenze per modelli RVC, dataset e notebook cloud. Leggi sempre la licenza specifica del modello, pretrained o dataset che utilizzi.

## 1. Sicurezza dei modelli scaricati (`.pth` vs. `.safetensors`)

- **Perché i file `.pth` richiedono fiducia:** I file PyTorch `.pth` usano la serializzazione `pickle` di Python. Caricare un `.pth` non attendibile su loader datati può eseguire codice arbitrario. App moderne come **Ilaria RVC 2.4.0+** e **Applio** includono protezioni di caricamento sicuro (`weights_only`), ma conviene comunque scaricare `.pth` solo da **autori fidati e repository ufficiali** (Hugging Face o GitHub Releases).
- **Perché `.safetensors` è più sicuro:** `.safetensors` salva solo i pesi grezzi e i metadati, senza possibilità di eseguire codice al caricamento. Quando condividi o archivi modelli, puoi convertirli con il [Convertitore Safetensors](../ilaria-rvc/manage/safetensors-converter.md).
- **Verifica prima di caricare:** Controlla la dimensione del file (un `.pth` di inferenza RVC reale pesa di solito ~40–110 MB, non pochi KB), verifica hash SHA-256 o firme digitali se presenti e non caricare checkpoint grezzi `G_*.pth` / `D_*.pth` di provenienza sconosciuta.

## 2. Consenso vocale, privacy e licenze

- **Consenso e registrazioni di terzi:** Addestra modelli solo sulla tua voce, su voci autorizzate o su dataset con licenza esplicita. Evita chiamate private, riunioni riservate o materiale protetto da copyright senza permesso.
- **Uso commerciale vs. non commerciale:** Anche se il software RVC è open-source (es. MIT), **ogni modello vocale e pretrained ha la propria licenza** (alcuni consentono l'uso commerciale, altri sono solo **non commerciali / CC-BY-NC**). Controlla sempre la model card e le note in [Modelli pretrained](../start/pretrained.md).
- **Condivisione responsabile:** Quando pubblichi un modello, indica versione RVC (`v2`), sample rate (`32k`/`40k`/`48k`), embedder, relativo `added_*.index` e termini d'uso.

## 3. Sicurezza dei notebook cloud e credenziali

- **Tieni privati Kaggle, Colab e Lightning AI:** Le celle di avvio (come `Ilaria-RVC-Kaggle.ipynb`) stampano URL attivi e **password WebUI / FileBrowser**. Non condividere mai screenshot, log o versioni pubbliche con password o link attivi.
- **Proteggi token e Drive:** Non incollare mai **authtoken Ngrok**, **Horizon ID** o token Hugging Face di scrittura in notebook pubblici, e chiudi i tunnel (`STOP = True`) al termine.
- **Privacy dei dati:** I notebook cloud girano su VM remote condivise. Per audio riservati, pulisci e converti **in locale**.
