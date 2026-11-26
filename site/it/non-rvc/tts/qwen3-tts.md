# Qwen3-TTS

Qwen3-TTS ha tre famiglie. **CustomVoice** usa voci preimpostate. **VoiceDesign** costruisce una voce a partire da una descrizione. **Base** usa una registrazione di riferimento di una persona che ha dato il consenso. Scegli la modalità prima di scaricare i pesi.

## Prima sintesi

Il progetto consiglia un ambiente Python 3.12 separato. Prova CustomVoice 0.6B se hai risorse limitate. Al primo avvio serve internet per scaricare i pesi. Consulta la guida integrata della demo per dispositivo, precisione e implementazione dell’attenzione. FlashAttention è facoltativo e dipende dall’hardware e dal runtime.

~~~bash
conda create -n qwen3-tts python=3.12 -y
conda activate qwen3-tts
python -m pip install -U qwen-tts
qwen-tts-demo --help
qwen-tts-demo Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice --ip 127.0.0.1 --port 8000
~~~

## Modalità vocali

Apri l’indirizzo locale mostrato dalla demo. Scegli parlante e lingua supportati e genera una frase. Per cambiare famiglia, ferma la demo e riavviala con uno degli identificativi qui sotto. Per VoiceDesign, descrivi ritmo, tono e modo di parlare. Per Base, usa una clip pulita con una sola voce e inserisci la trascrizione esatta se usi la modalità con testo di riferimento. Ascolta una prova breve prima di generare testi lunghi.

| Mode | Hugging Face model ID |
| --- | --- |
| CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` |
| VoiceDesign | `Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign` |
| Base | `Qwen/Qwen3-TTS-12Hz-0.6B-Base` |

## Risoluzione dei problemi

Se la VRAM finisce, chiudi gli altri programmi che usano la GPU e prova una variante più piccola, se esiste. Se FlashAttention dà errore, usa le opzioni della demo e avvia senza quella funzione. Verifica le lingue offerte dal modello e usa una frase breve mentre risolvi il problema.

[GitHub · Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
