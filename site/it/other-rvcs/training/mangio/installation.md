# Mangio RVC Fork · Installazione

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Versione consultata](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Software datato · Sconsigliato
Il ramo principale di **Mangio RVC Fork** è fermo da anni. Il programma è datato e sconsigliato per nuove installazioni. [Guide per app](../../app-guides.md)
!!!

## Versione storica e ambiente

Mangio RVC Fork è un fork sperimentale di RVC WebUI originale. La guida si riferisce al tag storico **v23.7.0**. Tieni runtime e asset separati dalle installazioni moderne. Su Windows, per usare il launcher incluso serve un pacchetto ufficiale che contenga `runtime/python.exe`. Il solo sorgente richiede le dipendenze e i modelli di base descritti dall’upstream. Il README del tag indica Python 3.9.8 per l’installazione manuale.

## Avviare la WebUI o l’interfaccia testuale

Nel pacchetto Windows avvia `go-web.bat`. Esegue `infer-web.py` con l’interprete incluso e la porta 7897. Apri l’indirizzo locale mostrato nel terminale. Se il launcher fallisce, verifica che l’interprete incluso esista prima di modificare dipendenze. Per la CLI interattiva in un ambiente già configurato, avvia `infer-web.py --is_cli`.

~~~bash
python infer-web.py --is_cli
~~~

[Uso e risoluzione dei problemi](usage.md)
