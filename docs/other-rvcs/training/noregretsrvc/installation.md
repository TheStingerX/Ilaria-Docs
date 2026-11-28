---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/noregretsrvc/installation/
---

# NoRegretsRVC · Installation

NoRegretsRVC Beta 0.1.0 is an independent web studio for configuring Applio workflows. This checkout provides the interface and notebook generator. The local setup runs the studio in your browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Installation

Install Node.js 22 or later with npm on Windows, macOS or Linux. Open a terminal in the project folder and run the commands below. Open the local URL printed by the server and leave that terminal running. For a production frontend build use `npm run build`. Check types with `npm run lint`. If setup fails, check your Node version and read the first terminal error.

~~~bash
git clone https://github.com/HunterThatsMe/NoRegretsRVC.git
cd NoRegretsRVC
node --version
npm install
npm run dev
~~~

The public repository also ships a ready-to-import Kaggle notebook and the associated Streamlit workflow. For training on Kaggle, follow the Cloud guide.

[Usage](usage.md) · [Cloud](cloud.md)
