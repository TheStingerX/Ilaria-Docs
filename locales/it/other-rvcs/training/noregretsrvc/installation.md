---
label: "Installazione"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/noregretsrvc/installation/
---

# NoRegretsRVC · Installazione

NoRegretsRVC Beta 0.1.0 è uno studio web indipendente per configurare flussi di lavoro basati su Applio. Il repository contiene l’interfaccia e il generatore di notebook. L’installazione locale avvia lo studio nel browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Installazione

Installa Node.js 22 o successivo con npm su Windows, macOS o Linux. Apri il terminale nella cartella del progetto ed esegui i comandi qui sotto. Apri l’indirizzo locale mostrato dal server e lascia aperto il terminale. `npm run build` crea la build del frontend. `npm run lint` controlla i tipi TypeScript. In caso di errore, verifica la versione di Node e leggi il primo messaggio nel terminale.

~~~bash
git clone https://github.com/HunterThatsMe/NoRegretsRVC.git
cd NoRegretsRVC
node --version
npm install
npm run dev
~~~

Il repository include anche un notebook Kaggle già pronto da importare e il flusso Streamlit associato. Per addestrare su Kaggle, segui la guida Cloud.

[Uso](usage.md) · [Cloud](cloud.md)
