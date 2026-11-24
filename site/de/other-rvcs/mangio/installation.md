# Mangio RVC Fork · Installation

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Geprüfte Version](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Veraltete Software · Nicht empfohlen
Der Hauptbranch von **Mangio RVC Fork** ist seit Jahren inaktiv. Die Software ist veraltet und für Neuinstallationen nicht empfohlen. [Anleitungen nach Anwendung](../app-guides.md)
!!!

## Historische Version und Umgebung

Mangio RVC Fork ist ein experimenteller Fork der ursprünglichen WebUI. Diese Anleitung bezieht sich auf **v23.7.0**. Halte Laufzeit und Ressourcen getrennt von modernen Installationen. Unter Windows braucht der mitgelieferte Launcher ein offizielles Paket mit `runtime/python.exe`. Der reine Quellcode benötigt Abhängigkeiten und Basismodelle. Das Tag-README empfiehlt Python 3.9.8 für die manuelle Einrichtung.

## WebUI oder Textoberfläche starten

Starte im Windows-Paket `go-web.bat`. Es ruft `infer-web.py` mit dem gebündelten Interpreter auf Port 7897 auf. Öffne die lokale URL aus dem Terminal. Prüfe bei Fehlern zuerst, ob der Interpreter existiert. Starte für die interaktive CLI in einer vorbereiteten Umgebung `infer-web.py --is_cli`.

~~~bash
python infer-web.py --is_cli
~~~

[Nutzung und Fehlerbehebung](usage.md)
