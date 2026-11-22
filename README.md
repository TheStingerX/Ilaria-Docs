# Ilaria Docs

Community-editable source for [docs.ilariarvc.shop](https://docs.ilariarvc.shop/).

To suggest a change, open a Markdown file on GitHub, click the pencil icon, and submit a pull request. GitHub can create a fork for you. English pages live in `docs/`. Translations live in `locales/it`, `locales/es`, `locales/fr`, `locales/de`, and `locales/pt`. When translating a page, keep its path and permalink consistent across languages. The language selector only links to versions available in the published snapshot.

Merging into `main` starts the **Build Ilaria Docs snapshot** workflow when docs or build inputs change. It builds the original Retype site, validates the generated files, and publishes the snapshot to the generated `site-content` branch. ChatGPT Sites checks that branch for updates. If the build fails, the previous snapshot stays active. Review deployment progress in [Actions](https://github.com/TheStingerX/Ilaria-Docs/actions/workflows/site-snapshot.yml).

To build locally, install Retype and Node.js, then run `node build-localized.mjs /path/to/retype` from the repository root. The generated site goes in `dist/`.
