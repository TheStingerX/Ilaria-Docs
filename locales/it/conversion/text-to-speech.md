---
label: "💬 Sintesi vocale"
order: 93
permalink: /text-to-speech/
description: "Sintesi vocale (TTS) genera una registrazione sorgente dalle parole digitate. RVC applica quindi un modello vocale separato a quella registrazione."
---
# Sintesi vocale e RVC

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Sintesi vocale (TTS) genera una registrazione sorgente dalle parole digitate. RVC applica quindi un modello vocale separato a quella registrazione. La voce TTS fornisce la pronuncia, l'accento, il tempismo e gran parte dell'espressione. Il modello target cambia il modo in cui suona quella performance.

## Fai un breve test

1. Apri l'area di lavoro TTS. Digita alcune frasi o fornisci un file di testo UTF-8.
2. Scegli una lingua e una voce sorgente. Ilaria RVC offre voci Microsoft Edge online e voci Windows installate per l'utilizzo offline. Ciascun motore vocale può esporre un diverso insieme di controlli di velocità, volume e tono sorgente.
3. Genera e ascolta la sorgente prima di convertirla. Se un nome o un acronimo viene pronunciato male, modifica la dicitura o seleziona una voce sorgente più adatta.
4. Seleziona un modello e converti. Inizia con una trasposizione neutra e valuta le registrazioni originali e quelle convertite fianco a fianco.
5. Genera script lunghi nei paragrafi dove possibile. Mantieni le modifiche e le esportazioni denominate in modo coerente in modo che una singola frase possa essere rigenerata in seguito.

## Diagnostica lo stadio giusto

 | Cosa senti | Cosa provare |
| --- | --- |
 | La fonte sottolinea la parola sbagliata | Aggiungi punteggiatura, riscrivi la frase o prova una voce TTS diversa. |
 | La fonte sembra affrettata | Rallenta la fonte o suddividi il testo in frasi più brevi. |
 | Il parlato è chiaro prima della conversione e noioso dopo | Prova un diverso estrattore di tono o un'influenza di recupero inferiore. |
 | L'elenco vocale online non è disponibile | Controlla la connettività o scegli una voce Windows installata. |
 | La voce cambia tono tra i paragrafi | Utilizza la stessa voce di origine, le stesse impostazioni e il modello di destinazione per ogni paragrafo. |

La conversione vocale preserva gran parte della consegna originale. Scegli la fonte in base alle prestazioni che desideri mantenere. Per ulteriori confronti, utilizza la [guida alla qualità audio](audio-quality.md).

[Progetto Ilaria RVC e motori TTS supportati](https://github.com/TheStingerX/Ilaria-RVC)
