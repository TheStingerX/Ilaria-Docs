# Ilaria Docs

Community-editable source for [docs.ilariarvc.shop](https://docs.ilariarvc.shop/).

To suggest a change, open a Markdown file on GitHub, click the pencil icon, and submit a pull request. GitHub can create a fork for you. English pages live in `docs/`. Translations live in `locales/it`, `locales/es`, `locales/fr`, `locales/de`, and `locales/pt`. When translating a page, keep its path and permalink consistent across languages. The language selector only links to versions available in the published snapshot.

Merging into `main` starts the **Build Ilaria Docs snapshot** workflow when docs or build inputs change. It builds the original Retype site, validates the generated files, and publishes the snapshot to the generated `site-content` branch. ChatGPT Sites checks that branch for updates. If the build fails, the previous snapshot stays active. Review deployment progress in [Actions](https://github.com/TheStingerX/Ilaria-Docs/actions/workflows/site-snapshot.yml).

To build locally, install Retype and Node.js, then run `node build-localized.mjs /path/to/retype` from the repository root. The generated site goes in `dist/`.

## Interactive tools

The estimator and compatibility matrix live under `docs/reference/`, with corresponding pages under `locales/<language>/reference/`. The pages use Retype's raw HTML support to host a progressively enhanced component, with a static guide link available before JavaScript loads. `docs/_includes/head.html` loads the shared stylesheet and script. The localized build copies assets from `docs/static/interactive/`; visitors in all languages use the same root assets.

- **GPU catalog** — Add the manufacturer, exact model or memory variant, capacity, and manufacturer specification URL to `benchmarks.json`. Capacity alone is not proof of application compatibility.
- **Benchmarks** — Add observations under `measurements`. Include `configuration` with vendor, GPU, app ID, application version, architecture, vocoder, sample rate, dataset duration, batch, pitch, precision, cache and activation checkpointing. Provide `peakGiB`, `date`, `dataset`, `conditions`, and an HTTPS `source`. Supply `secondsPerStep` only if a repeatable training-speed measurement exists. Measure peak memory over the training run, record how it was measured, and identify the dataset and slicing. Use a comparable configuration before showing a result.
- **Compatibility** — In `compatibility.json`, add the application ID, version or branch, official source, and documented guide path to `apps`. Add one record per evidenced combination to `records`. Set unknown fields to null or an empty array. Record the date and link to the strongest release or code evidence. Verify the specific mode, architecture, vocoder, and container independently before assigning a support status.
- **Translations** — Update every language in `i18n.json` for new labels, statuses, and limitations. Keep model identifiers, measurements, and version strings in the shared data.
- **Build** — Run `node build-localized.mjs <path-to-retype.exe>`, then serve `dist` locally over HTTP. Run `python scripts/prepare-site-snapshot.py dist <40-character-source-commit>` to validate the output without publishing. Verify both tools in English and all five translated routes. The snapshot audit allows only the named local tool script in addition to the existing Retype scripts.
