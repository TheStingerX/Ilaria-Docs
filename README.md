# Ilaria Docs

Community-editable source for [docs.ilariarvc.shop](https://docs.ilariarvc.shop/).

To suggest a change, open a Markdown file on GitHub, click the pencil icon, and submit a pull request. GitHub can create a fork for you. English pages live in `docs/`. Translations live in `locales/it`, `locales/es`, `locales/fr`, `locales/de`, and `locales/pt`. When adding a page, keep its path and permalink consistent across languages. Changes to the public website are reviewed and published separately.

To build locally, install Retype and Node.js, then run `node build-localized.mjs /path/to/retype` from the repository root. The generated site goes in `dist/`.
