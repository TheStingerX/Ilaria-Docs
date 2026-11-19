import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

for (const entry of readdirSync('dist', { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
  const path = join(entry.parentPath, entry.name);
  const html = readFileSync(path, 'utf8');
  // Retype expands the title emoji to markup, which breaks the quoted metadata.
  const fixed = html.replace(/<title>[^<]*<\/title>/, "<title>Ilaria&apos;s Docs &#x1F496;</title>").replace(/<meta property="og:site_name"[^\r\n]*/g,
    '<meta property="og:site_name" content="Ilaria Docs &#x1F496;">');
  if (fixed !== html) writeFileSync(path, fixed);
}
