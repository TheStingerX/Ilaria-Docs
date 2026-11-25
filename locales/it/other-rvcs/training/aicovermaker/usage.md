---
label: "AICoverMaker · Prima cover"
icon: ":musical_note:"
order: 98
permalink: /ilaria-rvc/aicovermaker/usage/
---

# AICoverMaker · Prima cover

## Prepara sorgente e modello

Il flusso parte da una registrazione. Il separatore estrae la traccia vocale, RVC cambia la voce e il risultato viene rimescolato con la base. Usa un brano per cui hai i permessi necessari. Per la prima prova prendi un estratto breve con una sola voce principale ben udibile.

Carica il file dove disponibile, oppure usa **Download Music** per un URL supportato che puoi usare. Aggiungi il modello trascinandolo nell’area dei file o tramite **Download Model**. Scegli il checkpoint di inferenza `.pth` e il suo `.index`, se presente. Fai la prima prova con il recupero delle feature disattivato.

## Separa, converti e ascolta

1. Seleziona l’audio e il modello di destinazione nell’interfaccia di conversione. Parti da **0** semitoni e modifica la trasposizione solo se la voce ha bisogno di un registro diverso.
2. Usa un modello di separazione se l’ingresso contiene strumenti. Ascolta la voce principale isolata. Se restano cori o strumenti, sistema lo stem prima di cambiare le impostazioni di RVC.
3. Avvia la conversione e ascolta la voce da sola. Controlla le note più forti e le code delle frasi, poi ascolta il mix con la base.
4. Salva il risultato e annota modello, separatore, trasposizione e uso dell’indice. Ripeti la prova cambiando un solo elemento alla volta.

## Risolvi gli errori più comuni

Se il modello non compare, controlla come l’hai importato e aggiorna l’elenco, dove disponibile. Se senti altre voci o strumenti, torna alla separazione. Se le note saltano su uno stem pulito, prova separatamente un altro estrattore del pitch. **TTA** è un’opzione della separazione che può allungare i tempi. Fai un confronto sullo stesso estratto prima di attivarla per un brano intero.

[Installazione](installation.md) · [Repository del progetto](https://github.com/Eddycrack864/RVC-AI-Cover-Maker-UI)
