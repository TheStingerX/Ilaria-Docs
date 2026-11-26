import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const languages = {
  en: ['🇬🇧', 'English', 'Language', 'Website'],
  it: ['🇮🇹', 'Italiano', 'Lingua', 'Sito web', 'Da dove iniziare', 'Conversione vocale', 'Modelli e addestramento', 'Strumenti e assistenza'],
  es: ['🇪🇸', 'Español', 'Idioma', 'Sitio web', 'Primeros pasos', 'Conversión de voz', 'Modelos y entrenamiento', 'Herramientas y soporte'],
  fr: ['🇫🇷', 'Français', 'Langue', 'Site web', 'Pour commencer', 'Conversion vocale', 'Modèles et entraînement', 'Outils et assistance'],
  de: ['🇩🇪', 'Deutsch', 'Sprache', 'Website', 'Erste Schritte', 'Stimmkonvertierung', 'Modelle und Training', 'Werkzeuge und Hilfe'],
  pt: ['🇵🇹', 'Português', 'Idioma', 'Site', 'Primeiros passos', 'Conversão de voz', 'Modelos e treinamento', 'Ferramentas e suporte'],
};
const flagArtwork = {
  en: '<path fill="#21468b" d="M0 0h24v16H0z"/><path stroke="#fff" stroke-width="4" d="m0 0 24 16m0-16L0 16"/><path stroke="#c8102e" stroke-width="1.5" d="m0 0 24 16m0-16L0 16"/><path stroke="#fff" stroke-width="6" d="M12 0v16M0 8h24"/><path stroke="#c8102e" stroke-width="3" d="M12 0v16M0 8h24"/>',
  it: '<path fill="#009246" d="M0 0h8v16H0z"/><path fill="#fff" d="M8 0h8v16H8z"/><path fill="#ce2b37" d="M16 0h8v16h-8z"/>',
  es: '<path fill="#aa151b" d="M0 0h24v16H0z"/><path fill="#f1bf00" d="M0 4h24v8H0z"/><path fill="#aa151b" d="M6 6h3v4H6z"/>',
  fr: '<path fill="#0055a4" d="M0 0h8v16H0z"/><path fill="#fff" d="M8 0h8v16H8z"/><path fill="#ef4135" d="M16 0h8v16h-8z"/>',
  de: '<path d="M0 0h24v16H0z"/><path fill="#dd0000" d="M0 5.33h24V16H0z"/><path fill="#ffce00" d="M0 10.67h24V16H0z"/>',
  pt: '<path fill="#da291c" d="M0 0h24v16H0z"/><path fill="#046a38" d="M0 0h9.6v16H0z"/><circle cx="9.6" cy="8" r="3.2" fill="none" stroke="#ffcc00" stroke-width=".8"/><path stroke="#ffcc00" stroke-width=".6" d="M6.4 8h6.4m-3.2-3.2v6.4M7 6l5.2 4"/><path fill="#fff" stroke="#da291c" stroke-width=".7" d="M7.9 6.1h3.4v2.5a1.7 1.7 0 0 1-3.4 0z"/><path stroke="#003399" stroke-width=".5" d="M9.6 6.9v2m-1-1h2"/>',
};
const flagIcon = code => '<svg aria-hidden="true" width="21" height="14" viewBox="0 0 24 16" style="display:inline-block;flex:none;vertical-align:middle;border-radius:2px;overflow:hidden">' + flagArtwork[code] + '</svg>';
const origin = 'https://docs.ilariarvc.shop';
const previewImage = 'https://ilariarvc.shop/share-preview.jpg?v=2';
const previewCopy = {
  en: ['en_US', 'A collection of information about the world of RVC, with guides to voice conversion, model training, and compatible apps.', 'Ilaria and Mario playing handheld games against a dark violet background'],
  it: ['it_IT', 'Una raccolta di informazioni sul mondo RVC, con guide alla conversione vocale, all’addestramento dei modelli e alle app compatibili.', 'Ilaria e Mario giocano con console portatili su uno sfondo viola scuro'],
  es: ['es_ES', 'Una recopilación de información sobre el mundo de RVC, con guías de conversión de voz, entrenamiento de modelos y aplicaciones compatibles.', 'Ilaria y Mario juegan con consolas portátiles sobre un fondo violeta oscuro'],
  fr: ['fr_FR', 'Une collection d’informations sur le monde de RVC, avec des guides sur la conversion vocale, l’entraînement des modèles et les applications compatibles.', 'Ilaria et Mario jouent sur des consoles portables sur un fond violet foncé'],
  de: ['de_DE', 'Eine Sammlung von Informationen rund um RVC mit Anleitungen zur Stimmkonvertierung, zum Modelltraining und zu kompatiblen Apps.', 'Ilaria und Mario spielen auf Handheld-Konsolen vor einem dunkelvioletten Hintergrund'],
  pt: ['pt_PT', 'Uma coleção de informações sobre o mundo do RVC, com guias sobre conversão de voz, treino de modelos e aplicações compatíveis.', 'Ilaria e Mario jogam em consolas portáteis sobre um fundo violeta escuro'],
};
const retype = resolve(process.argv[2] ?? '../retype-cli/package/bin/retype.exe');
const root = resolve('.');
const output = join(root, 'dist');
const entries = (folder, extension) => readdirSync(folder, { recursive: true, withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith(extension))
  .map(entry => join(entry.parentPath, entry.name));
const sourceDirectory = lang => join(root, lang === 'en' ? 'docs' : `locales/${lang}`);
const pagesByLanguage = new Map(Object.keys(languages).map(lang => {
  const directory = sourceDirectory(lang);
  return [lang, new Set(entries(directory, '.md').map(file => relative(directory, file)))];
}));
const groups = ['start', 'conversion', 'model-training', 'reference'];

const appGroupLabels = {
  en: ['Model Training and Inference', 'Voice Changers'],
  it: ['Addestramento e inferenza', 'Cambia voce'],
  es: ['Entrenamiento e inferencia', 'Cambiadores de voz'],
  fr: ['Entraînement et inférence', 'Changeurs de voix'],
  de: ['Modelltraining und Inferenz', 'Stimmwandler'],
  pt: ['Treino e inferência', 'Alteradores de voz'],
};
const gpuLabels = {
  en: ['GPU compatibility', 'GPU support unconfirmed', 'Legacy', 'Build and model dependent'],
  it: ['Compatibilità GPU', 'Supporto GPU non confermato', 'Storico', 'Dipende da build e modello'],
  es: ['Compatibilidad con GPU', 'Compatibilidad sin confirmar', 'Histórico', 'Depende de la versión y del modelo'],
  fr: ['Compatibilité GPU', 'Compatibilité non confirmée', 'Historique', 'Selon la version et le modèle'],
  de: ['GPU-Kompatibilität', 'GPU-Unterstützung unbestätigt', 'Historisch', 'Abhängig von Build und Modell'],
  pt: ['Compatibilidade com GPU', 'Compatibilidade por confirmar', 'Histórico', 'Depende da versão e do modelo'],
};
const gpuSupport = {
  ilaria: ['CUDA', 'ROCm 6.4.2 · Preview'],
  'ilaria-amd': [undefined, 'ROCm 6.4.2 · Preview'],
  applio: ['CUDA', 'ROCm'],
  mainline: ['CUDA', 'DirectML*', 'DirectML*'],
  redpanda: ['CUDA'],
  'rvc-cli': ['CUDA†'],
  'rvc-studio': ['CUDA†'],
  mangio: ['CUDA†'],
  replay: ['CUDA†'],
  'aicovergen': ['CUDA†'],
  vonovox: ['CUDA'],
  okada: ['CUDA', 'DirectML*', 'DirectML*'],
  tgr: ['CUDA', 'DirectML*', 'DirectML*'],
  deiteris: ['CUDA', 'DirectML*', 'DirectML*'],
  'rvc-gui': ['CUDA†'],
  'rvc-blue': ['CUDA'],
};
const gpuVendors = [['NVIDIA', '#a8cf68'], ['AMD', '#ff8793'], ['Intel', '#8ccaff']];

function addGpuCompatibility(html, lang, route) {
  const source = pageSources.get(lang).get(route)?.split(sep).join('/');
  const [app, page] = source?.match(/^other-rvcs\/(?:training|voice-changers)\/([^/]+)\/([^/]+)\.md$/)?.slice(1) ?? [];
  const isInstallation = page === 'installation'
    || (app === 'redpanda' && page === 'first-run')
    || (app === 'rvc-gui' && page === 'file-conversion');
  const gpuApp = route === '/ilaria-rvc/installation/' ? 'ilaria'
    : route === '/ilaria-rvc/amd-preview/' ? 'ilaria-amd'
      : isInstallation ? app : null;
  const support = gpuSupport[gpuApp];
  if (!support) return html;
  const [heading, unknown, legacy, conditional] = gpuLabels[lang];
  const badges = gpuVendors.map(([vendor, color], index) => {
    const backend = support[index];
    const note = backend?.endsWith('†') ? ' · ' + legacy : backend?.endsWith('*') ? ' · ' + conditional : '';
    const label = backend ? backend.replace(/[†*]$/, '') + note : unknown;
    return `<div style="flex:1 1 9rem;min-width:0;padding:.45rem .65rem;border:1px solid ${backend ? color : '#a999a680'};border-radius:.5rem"><strong><span aria-hidden="true">${backend ? '●' : '◌'}</span> ${vendor}</strong><br><small>${label}</small></div>`;
  }).join('');
  const markup = `<aside class="docs-gpu-compatibility" aria-label="${heading}" style="margin:1rem 0 1.4rem"><strong>${heading}</strong><div style="display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.4rem">${badges}</div></aside>`;
  return html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>)/, '$1\n' + markup);
}

const staging = mkdtempSync(join(root, '.localized-build-'));
const title = "<title>Ilaria&apos;s Docs &#x1F496;</title>";
const headings = html => [...html.matchAll(/<h([1-6]) id="([^"]+)"/g)];
const localizedPath = (lang, route) => lang === 'en' ? route : `/${lang}${route}`;
const modifiedLabels = { en: 'Last updated', it: 'Ultima modifica', es: 'Última modificación', fr: 'Dernière modification', de: 'Zuletzt geändert', pt: 'Última atualização' };
const pageSources = new Map([...pagesByLanguage].map(([lang, pages]) => [
  lang, new Map([...pages].map(page => {
    const source = readFileSync(join(sourceDirectory(lang), page), 'utf8');
    const route = source.match(/^permalink:\s*(\/\S+)\s*$/m)?.[1] ?? (page === 'index.md' ? '/' : undefined);
    return [route, page];
  }).filter(([route]) => route)),
]));
const commitDates = new Map();
const pendingFiles = new Set();
try {
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  let timestamp;
  for (const line of git(['log', '--format=@%ct', '--name-only', '--', 'docs', 'locales']).split(/\r?\n/)) {
    if (line.startsWith('@')) timestamp = Number(line.slice(1)) * 1000;
    else if (line && timestamp && !commitDates.has(line)) commitDates.set(line, timestamp);
  }
  for (const file of git(['diff', '--name-only', '-z', 'HEAD', '--', 'docs', 'locales']).split('\0')) pendingFiles.add(file);
} catch {
  // Source archives without Git history use the Markdown file timestamp.
}

function addModifiedDate(html, lang, route) {
  const page = pageSources.get(lang).get(route);
  if (!page) return html;
  const source = join(lang === 'en' ? 'docs' : `locales/${lang}`, page).split(sep).join('/');
  const timestamp = pendingFiles.has(source) ? undefined : commitDates.get(source);
  const date = new Date(timestamp ?? statSync(join(root, source)).mtimeMs);
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map(({ type, value }) => [type, value]));
  const display = `${parts.day}/${parts.month}/${parts.year} · ${parts.hour}:${parts.minute}`;
  const markup = `<p class="docs-last-modified text-footer-text text-sm">${modifiedLabels[lang]} <time datetime="${date.toISOString()}">${display}</time></p>`;
  return html.replace(/(<div id="retype-footer-links"[^>]*>)/, `$1\n                    ${markup}`);
}
function decorate(directory, lang) {
  for (const file of entries(directory, '.html')) {
    const path = relative(directory, file).split(sep).join('/');
    const route = '/' + path.replace(/index\.html$/, '');
    const current = languages[lang];
    const [locale, defaultDescription, imageAlt] = previewCopy[lang];
    const originalHtml = readFileSync(file, 'utf8');
    // Retype has already escaped the localized frontmatter value for an HTML attribute.
    const pageDescription = originalHtml.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const description = route !== '/' && pageDescription ? pageDescription : defaultDescription;
    const preview = [
      '<meta name="theme-color" content="#FFC0CB">',
      `<meta property="og:locale" content="${locale}">`,
      `<meta property="og:description" content="${description}">`,
      `<meta property="og:image" content="${previewImage}">`,
      '<meta property="og:image:type" content="image/jpeg">',
      '<meta property="og:image:width" content="1200">',
      '<meta property="og:image:height" content="630">',
      `<meta property="og:image:alt" content="${imageAlt}">`,
      `<meta name="twitter:description" content="${description}">`,
      `<meta name="twitter:image" content="${previewImage}">`,
      `<meta name="twitter:image:alt" content="${imageAlt}">`,
    ].join('\n    ');
    const available = Object.keys(languages).filter(code => existsSync(join(staging, code, path)));
    const alternate = available.map(code =>
      `    <link rel="alternate" hreflang="${code}" href="${origin}${localizedPath(code, route)}">`).join('\n');
    const choices = available.map(code =>
      `<a href="${localizedPath(code, route)}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="true"' : ''}>${flagIcon(code)} ${languages[code][1]}</a>`).join('');
    const selector = `<details class="docs-language"><summary aria-label="${current[2]}: ${current[1]}">${flagIcon(lang)}<span class="docs-language-name">${current[1]}</span></summary><div>${choices}</div></details>`;
    const defaultAlternate = available.includes('en') ? `\n    <link rel="alternate" hreflang="x-default" href="${origin}${route}">` : '';
    let html = addGpuCompatibility(originalHtml, lang, route)
      .replace(/(<html lang=")[^"]+"/, `$1${lang}"`)
      .replace(/<title>[^<]*<\/title>/, title)
      .replace(/<meta property="og:site_name"[^\r\n]*/, '<meta property="og:site_name" content="Ilaria Docs &#x1F496;">')
      .replace(/^[ \t]*<meta (?:property="og:(?:locale|description|image(?::[\w-]+)?)"|name="(?:theme-color|twitter:(?:description|image(?::alt)?))")[^\r\n]*\r?\n/gm, '')
      .replace('</head>', `    ${preview}\n</head>`)
      .replace('</head>', `${alternate}${defaultAlternate}\n</head>`)
      .replace(/(\s*)<\/header>/, `\n        ${selector}$1</header>`);
    if (lang !== 'en' && available.includes('en')) {
      const original = readFileSync(join(staging, 'en', path), 'utf8');
      const aliases = headings(original);
      let index = 0;
      html = html.replace(/<h([1-6]) id="([^"]+)"/g, (tag, level, id) => {
        const match = aliases[index++];
        return match?.[1] === level && match[2] !== id ? `<span id="${match[2]}" class="docs-anchor"></span>${tag}` : tag;
      });
    }
    writeFileSync(file, addModifiedDate(html, lang, route));
  }
}

try {
  for (const [lang, names] of Object.entries(languages)) {
    const input = join(staging, `source-${lang}`);
    cpSync(join(root, 'docs'), input, { recursive: true });
    if (lang !== 'en') {
      const pages = pagesByLanguage.get(lang);
      for (const page of pagesByLanguage.get('en')) {
        if (!pages.has(page)) unlinkSync(join(input, page));
      }
      for (const page of pages) {
        const target = join(input, page);
        mkdirSync(dirname(target), { recursive: true });
        cpSync(join(sourceDirectory(lang), page), target);
      }
      for (const [index, group] of groups.entries()) {
        const file = join(input, group, 'index.yml');
        writeFileSync(file, readFileSync(file, 'utf8').replace(/^label:.*/m, `label: ${JSON.stringify(names[index + 4])}`));
      }
    }
    if (lang !== 'en') {
      for (const [index, group] of ['training', 'voice-changers'].entries()) {
        const file = join(input, 'other-rvcs', group, 'index.yml');
        writeFileSync(file, readFileSync(file, 'utf8').replace(/^label:.*/m, `label: ${JSON.stringify(appGroupLabels[lang][index])}`));
      }
    }
    const config = join(staging, `${lang}.yml`);
    writeFileSync(config, readFileSync('retype.yml', 'utf8')
      .replace(/^input:.*$/m, `input: ./source-${lang}`)
      .replace(/^output:.*$/m, `output: ./${lang}`)
      .replace(/^url:.*$/m, `url: ${origin}${localizedPath(lang, '/')}`)
      .replace('text: Website', `text: ${JSON.stringify(names[3])}`)
      .replace('https://ilariarvc.shop/en/', `https://ilariarvc.shop/${lang}/`));
    for (let attempt = 1; ; attempt++) {
      try {
        execFileSync(retype, ['build', config], { stdio: 'inherit' });
        break;
      } catch (err) {
        if (attempt >= 3) throw err;
        rmSync(join(staging, lang), { recursive: true, force: true });
      }
    }
  }
  for (const lang of Object.keys(languages)) decorate(join(staging, lang), lang);
  mkdirSync(output, { recursive: true });
  for (const code of Object.keys(languages)) {
    if (!existsSync(join(staging, code, 'ilaria-rvc', 'tts', 'index.html'))) continue;
    const target = localizedPath(code, '/ilaria-rvc/tts/');
    const folder = join(staging, code, 'ilaria-rvc', 'speech');
    mkdirSync(folder, { recursive: true });
    writeFileSync(join(folder, 'index.html'), `<!doctype html><html lang="${code}"><head><meta charset="utf-8"><title>TTS</title><link rel="canonical" href="${origin}${target}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><a href="${target}">TTS</a></body></html>`);
  }
  cpSync(join(staging, 'en'), output, { recursive: true });
  for (const lang of Object.keys(languages).slice(1)) {
    cpSync(join(staging, lang), join(output, lang), { recursive: true });
  }
} finally {
  rmSync(staging, { recursive: true, force: true });
}
