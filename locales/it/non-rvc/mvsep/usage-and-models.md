---
label: "Modelli e preset consigliati"
icon: ":control_knobs:"
order: 97
permalink: /non-rvc/mvsep/usage-and-models/
---
# Guida MVSep: modelli e preset consigliati

Qui trovi i migliori preset di MVSep per ottenere tracce vocali pulitissime (per training RVC, cover o conversione vocale), con **link diretti** che preselezionano automaticamente l'algoritmo e le opzioni esatte.

## 1. Rimozione di musica ed effetti (Vocals & SFX Removal)

Usali per primi per eliminare musica di sottofondo, effetti sonori e rumori ambientali dalla traccia originale.

- **BS Polarformer** - [Apri preset su MVSep](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0)
  - Variante avanzata di Band-Split Roformer con **Polar Positional Embeddings (PoPE)** per un contesto lungo e pulito.
  - **Quando usarlo**: prima scelta per ottenere voce pulita con residui strumentali minimi.
- **MVSep DnR v3** - [Apri preset su MVSep](https://mvsep.com/home?sep_type=123&add_opt1=163)
  - Modello multi-stem cinematografico (*Divide and Remaster*) che separa l'audio in **parlato, musica ed effetti sonori (SFX)**.
  - **Quando usarlo**: dialoghi di videogiochi, film, video o clip con molti effetti sonori.

> **Consiglio**: **BS Polarformer** è in genere migliore da solo, ma usarli **entrambi** in sequenza elimina praticamente ogni possibilità di lasciare rumori di fondo o SFX.

## 2. Separazione Voce Principale e Cori (Lead & Back Vocals)

- **MVSep Karaoke** - [Apri preset su MVSep](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0)
  - Separa la **voce principale (lead)** dai **cori / seconde voci (backing vocals)**.
  - **Nota**: questo modello può risultare un po' capriccioso e a volte confondere cori e voce principale a seconda del mix della traccia; ascolta sempre entrambi gli stem prima di scartarne uno, ma resta comunque molto utile.

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

1. **Estrai voce / parlato**: passa l'audio in **BS Polarformer** (ed eventualmente in **MVSep DnR v3** se restano SFX).
2. **Isola la voce principale** *(solo su brani con cori)*: usa **MVSep Karaoke**.
3. **Togli il riverbero**: applica **DeReverb Stereo** e **DeReverb Room** (più **DeEffect** solo se restano effetti vocali o riverberi pesanti).
4. **Pulizia finale**: rifinisci con **DeNoise by aufr33 and gabox** e scarica il risultato in **WAV**.
