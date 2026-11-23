# Usare MVSep: accesso, account e impostazioni

Poiché MVSep funziona interamente nel cloud, **non c'è nulla da scaricare o installare**. Tuttavia, impostare correttamente account e formato di output fa una grande differenza.

## 1. Crea un account gratuito (Consigliato)

1. Vai su [mvsep.com](https://mvsep.com/) e registra un account gratuito.
2. **Perché registrarsi?**
   - **Audio lossless**: senza account puoi scaricare solo file **MP3** compressi. Da registrato sblocchi l'uscita in **WAV 16-bit** e **FLAC 16-bit**.
   - **Zero CAPTCHA** e **priorità migliore in coda**.
   - **Modelli Polar e BS-Roformer a 124 bande** disponibili anche per utenti gratuiti (i modelli BS hanno un limite di 5 separazioni al giorno per modello).

## 2. Impostazioni utili su MVSep

- **Formato di uscita**: scegli sempre **WAV** (o **FLAC**) prima di avviare una separazione se vuoi usare l'audio per addestrare un modello RVC o concatenare più passaggi di pulizia.
- **Post-processing / concatenazione**: effettua l'accesso, vai su **Advanced settings → Home Screen** e attiva **"Show post-processing algorithm"** se vuoi applicare un modello di pulizia subito dopo la separazione.
- **Upload o download lenti?** MVSep mette a disposizione dei mirror regionali: se il sito principale è lento nel trasferimento file, prova il mirror.

## 3. Crediti prepagati e API complete (Opzionale)

Se elabori file molto lunghi (fino a 100 minuti / 1 GB), vuoi file **WAV 32-bit float / FLAC 24-bit** o vuoi evitare attese nelle ore di punta:
- I modelli standard consumano **1 credito al minuto** di audio; gli ensemble pesanti usano moltiplicatori (`2×`–`6×`).
- **Accesso API**: gli utenti registrati possono generare un token API dal proprio profilo per automatizzare batch da script Python tramite `https://mvsep.com/api`.

## Prezzi dei pacchetti

MVSEP offre fino a 50 separazioni gratuite al giorno senza carta. Premium usa crediti prepagati.

| Prezzo (USD) | Crediti | Brani stimati (4 min) | USD al minuto |
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

Le stime considerano una separazione per brano con un modello standard da 1 credito al minuto. Un brano di 4 minuti costa 4 crediti. Con un modello Ensemble a 2× lo stesso brano costa 8 crediti e un pacchetto da 60 copre circa 7 brani interi anziché 15. Opzioni aggiuntive e passaggi ripetuti possono aumentare il consumo.

[Piani MVSEP](https://sg.mvsep.com/en/plans) · [Come si calcolano i crediti](https://mvsep.com/en/credits)
