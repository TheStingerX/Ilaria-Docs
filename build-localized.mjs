import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
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
const english = entries(join(root, 'docs'), '.md').map(file => relative(join(root, 'docs'), file));
const groups = ['start', 'conversion', 'model-training', 'reference'];

for (const lang of Object.keys(languages).slice(1)) {
  for (const page of english) {
    if (!existsSync(join(root, 'locales', lang, page))) throw new Error(`Missing ${lang}/${page}`);
  }
}

const staging = mkdtempSync(join(root, '.localized-build-'));
const title = "<title>Ilaria&apos;s Docs &#x1F496;</title>";
const headings = html => [...html.matchAll(/<h([1-6]) id="([^"]+)"/g)];
const localizedPath = (lang, route) => lang === 'en' ? route : `/${lang}${route}`;

function decorate(directory, lang) {
  for (const file of entries(directory, '.html')) {
    const path = relative(directory, file).split(sep).join('/');
    const route = '/' + path.replace(/index\.html$/, '');
    const current = languages[lang];
    const [locale, description, imageAlt] = previewCopy[lang];
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
    const alternate = Object.keys(languages).map(code =>
      `    <link rel="alternate" hreflang="${code}" href="${origin}${localizedPath(code, route)}">`).join('\n');
    const choices = Object.entries(languages).map(([code, [, name]]) =>
      `<a href="${localizedPath(code, route)}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="true"' : ''}>${flagIcon(code)} ${name}</a>`).join('');
    const selector = `<details class="docs-language"><summary aria-label="${current[2]}: ${current[1]}">${flagIcon(lang)}<span class="docs-language-name">${current[1]}</span></summary><div>${choices}</div></details>`;
    let html = readFileSync(file, 'utf8')
      .replace(/(<html lang=")[^"]+"/, `$1${lang}"`)
      .replace(/<title>[^<]*<\/title>/, title)
      .replace(/<meta property="og:site_name"[^\r\n]*/, '<meta property="og:site_name" content="Ilaria Docs &#x1F496;">')
      .replace(/^[ \t]*<meta (?:property="og:(?:locale|description|image(?::[\w-]+)?)"|name="(?:theme-color|twitter:(?:description|image(?::alt)?))")[^\r\n]*\r?\n/gm, '')
      .replace('</head>', `    ${preview}\n</head>`)
      .replace('</head>', `${alternate}\n    <link rel="alternate" hreflang="x-default" href="${origin}${route}">\n</head>`)
      .replace(/(\s*)<\/header>/, `\n        ${selector}$1</header>`);
    if (lang !== 'en') {
      const original = readFileSync(join(staging, 'en', path), 'utf8');
      const aliases = headings(original);
      let index = 0;
      html = html.replace(/<h([1-6]) id="([^"]+)"/g, (tag, level, id) => {
        const match = aliases[index++];
        return match?.[1] === level && match[2] !== id ? `<span id="${match[2]}" class="docs-anchor"></span>${tag}` : tag;
      });
    }
    writeFileSync(file, html);
  }
}

try {
  for (const [lang, names] of Object.entries(languages)) {
    const input = join(staging, `source-${lang}`);
    cpSync(join(root, 'docs'), input, { recursive: true });
    if (lang !== 'en') {
      for (const page of english) cpSync(join(root, 'locales', lang, page), join(input, page));
      for (const [index, group] of groups.entries()) {
        const file = join(input, group, 'index.yml');
        writeFileSync(file, readFileSync(file, 'utf8').replace(/^label:.*/m, `label: ${JSON.stringify(names[index + 4])}`));
      }
    }
    const config = join(staging, `${lang}.yml`);
    writeFileSync(config, readFileSync('retype.yml', 'utf8')
      .replace(/^input:.*$/m, `input: ./source-${lang}`)
      .replace(/^output:.*$/m, `output: ./${lang}`)
      .replace(/^url:.*$/m, `url: ${origin}${localizedPath(lang, '/')}`)
      .replace('text: Website', `text: ${JSON.stringify(names[3])}`)
      .replace('https://ilariarvc.shop/en/', `https://ilariarvc.shop/${lang}/`));
    execFileSync(retype, ['build', config], { stdio: 'inherit' });
    decorate(join(staging, lang), lang);
  }
  mkdirSync(output, { recursive: true });
  cpSync(join(staging, 'en'), output, { recursive: true });
  for (const lang of Object.keys(languages).slice(1)) {
    cpSync(join(staging, lang), join(output, lang), { recursive: true });
  }
} finally {
  rmSync(staging, { recursive: true, force: true });
}
