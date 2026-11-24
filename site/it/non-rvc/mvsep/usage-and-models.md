# Guida MVSep: modelli e preset consigliati

Qui trovi i migliori preset di MVSep per ottenere tracce vocali pulitissime (per training RVC, cover o conversione vocale), con **link diretti** che preselezionano automaticamente l'algoritmo e le opzioni esatte.

## 1. Rimozione di musica ed effetti (Vocals & SFX Removal)

Parti da [MelBand Roformer · becruily deux](https://mvsep.com/home?sep_type=48&add_opt1=11) per separare le voci dalla base. Confronta il risultato con **BS Polarformer** se senti residui strumentali o sillabe tagliate. Per il parlato con effetti sonori, prova **MVSep DnR v3**.

[BS Polarformer](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0) · [MVSep DnR v3](https://mvsep.com/home?sep_type=123&add_opt1=163)

[BS Roformer 124 bands](https://mvsep.com/en/home?sep_type=40&add_opt1=171). Secondo una segnalazione della community, questo modello consente **5 separazioni gratuite al giorno**. Prima di avviare un’elaborazione, controlla la quota mostrata da MVSEP.

## 2. Separazione Voce Principale e Cori (Lead & Back Vocals)

Per la **voce principale**, prova [BS Roformer · anvuew](https://mvsep.com/home?sep_type=49&add_opt1=7&add_opt2=0). Per i **cori (BGV)**, parti da [BS Roformer · frazer & becruily](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0) e tieni la traccia dei cori che restituisce. Prova entrambi sullo stesso ritornello e controlla se nei cori si sente la voce principale o se nella traccia solista mancano parole.

## 3. Rimozione del riverbero (Reverb Removal)

Applicali sulla traccia vocale già isolata per rendere asciutte le registrazioni con eco o riverbero.

- **DeReverb Stereo** - [Apri preset su MVSep](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Rimuove il riverbero stereo da studio e le riflessioni.
- **DeReverb Room** - [Apri preset su MVSep](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Rimuove l'acustica ambientale e il riverbero della stanza.

> **Consiglio**: conviene usarli **entrambi** per eliminare ogni possibile traccia di riverbero; quale usare per primo dipende esclusivamente dal tuo audio specifico (fai una prova veloce se il riverbero è intenso).

## 4. Rimozione del rumore di fondo (Background Noise Removal)

- **DeNoise by aufr33 and gabox** - [Apri preset su MVSep](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - Modello Mel-Roformer dedicato a eliminare fruscio, rumore di fondo e artefatti senza spegnere le alte frequenze.
  - **Consiglio**: usalo come **passaggio finale** per rifinire l'audio e assicurarti che sia pulito. *(Può comunque lasciarsi sfuggire qualche tipo di rumore, quindi controlla sempre il WAV finale ad orecchio.)*

## 5. Sperimentale e Varie (Experimental & Miscellaneous)

- **DeEffect** - [Apri preset su MVSep](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - Dà il meglio nel rimuovere riverbero ed effetti applicati alla voce (in certi casi può persino essere usato al posto di un modello lead o togliere un po' di rumore di fondo).
  - **Avvertenza**: **NON fare affidamento su DeEffect per nulla che non sia rimuovere effetti vocali e riverbero** - per isolare la voce, gli SFX o fare il denoise finale usa sempre i modelli dedicati sopra.

## Ordine di lavoro consigliato

1. **Estrai voce / parlato**: Sui brani musicali confronta Deux e BS Polarformer. Per il parlato con effetti sonori usa DnR v3.
2. **Isola la voce principale** *(solo su brani con cori)*: Usa anvuew per la voce principale e frazer & becruily per i cori.
3. **Togli il riverbero**: applica **DeReverb Stereo** e **DeReverb Room** (più **DeEffect** solo se restano effetti vocali o riverberi pesanti).
4. **Pulizia finale**: rifinisci con **DeNoise by aufr33 and gabox** e scarica il risultato in **WAV**.
