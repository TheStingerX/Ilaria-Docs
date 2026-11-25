"""Validate a build and publish immutable artifacts plus a channel pointer."""
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
from urllib.parse import urlsplit

THEME_DIGEST = '73c84e18ac4e67496c1e9dedac7ee3dad9703380a863ca71a2d8a604a8e3782d'
DOCUMENT_METADATA = re.compile(
    r'window\.__DOCS__ = (?:null|\{ "title": "(?:[^"\\]|\\.)*", (?:isRoot: true, )?level: [0-9]+, '
    r'icon: "[a-z0-9-]+", hasPrism: (?:true|false), hasInstagram: (?:true|false), '
    r'hasMermaid: (?:true|false), hasMath: (?:true|false), tocDepth: [0-9]+, '
    r'"md": "/[A-Za-z0-9_./-]+\.md" \})'
)
GENERATED_SCRIPT = re.compile(
    r'(?:/([a-z]{2}/)?|(?:\.\./)*)resources/js/(?:config|retype|lunr|prism)\.js(?:\?v=[0-9.]+)?'
)
TOC_SCRIPT = re.compile(r'/(?:[a-z]{2}/)?static/toc-active\.js(?:\?v=[0-9.]+)?')
SAFE_EXTENSIONS = {'.html', '.js', '.css', '.json', '.xml', '.txt', '.md', '.png', '.svg',
                   '.webp', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.mp4', '.wav', '.mp3'}


class Audit(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.script = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in {'base', 'iframe', 'object', 'embed', 'form', 'foreignobject'}:
            raise ValueError(f'{self.path}: disallowed element {tag}')
        for key, value in attrs:
            if key.startswith('on') or key in {'srcdoc', 'v-html', 'v-on', 'v-bind'} or key.startswith(('@', ':')) or (key.startswith('v-') and key not in {'v-cloak', 'v-pre'}):
                raise ValueError(f'{self.path}: disallowed attribute {key}')
            if key in {'href', 'src', 'xlink:href', 'action', 'formaction'} and value:
                normalized = re.sub(r'[\x00-\x20]+', '', value).casefold()
                if urlsplit(normalized).scheme not in ('', 'http', 'https', 'mailto', 'tel'):
                    raise ValueError(f'{self.path}: disallowed URL scheme')
        if tag == 'meta' and (attributes.get('http-equiv') or '').casefold() == 'refresh':
            if self.path not in {'ilaria-rvc/speech/index.html', *(f'{lang}/ilaria-rvc/speech/index.html' for lang in ('it','es','fr','de','pt'))}:
                raise ValueError(f'{self.path}: unexpected redirect')
        if tag == 'script':
            source = attributes.get('src')
            if source is not None and not TOC_SCRIPT.fullmatch(source) and not GENERATED_SCRIPT.fullmatch(source):
                raise ValueError(f'{self.path}: unexpected script source')
            self.script = (source, [])
        if self.path.endswith('.svg') and tag in {'script', 'style', 'use', 'image', 'animate', 'set'}:
            raise ValueError(f'{self.path}: unexpected SVG element {tag}')

    def handle_data(self, data):
        if self.script is not None:
            self.script[1].append(data)

    def handle_endtag(self, tag):
        if tag != 'script' or self.script is None:
            return
        source, chunks = self.script
        self.script = None
        code = ''.join(chunks)
        if source:
            if code.strip():
                raise ValueError(f'{self.path}: unexpected script body')
        elif sha256(code.encode()).hexdigest() != THEME_DIGEST and not DOCUMENT_METADATA.fullmatch(code):
            raise ValueError(f'{self.path}: unexpected inline script')


def make_manifest(dist, source):
    if not re.fullmatch(r'[a-f0-9]{40}', source):
        raise ValueError('Invalid source commit')
    files = {}
    for path in sorted(dist.rglob('*')):
        if not path.is_file() or path.suffix not in SAFE_EXTENSIONS:
            continue
        name = path.relative_to(dist).as_posix()
        if not re.fullmatch(r'[A-Za-z0-9_./-]+', name) or path.is_symlink():
            raise ValueError(f'Unexpected asset: {name}')
        if path.suffix == '.js' and not re.fullmatch(r'(?:[a-z]{2}/)?static/toc-active\.js', name) and not re.fullmatch(r'(?:[a-z]{2}/)?resources/js/(?:config|retype|lunr|prism|search|instagram)\.js', name):
            raise ValueError(f'Unexpected JavaScript asset: {name}')
        body = path.read_bytes()
        if path.suffix in {'.html', '.svg'}:
            audit = Audit(name)
            audit.feed(body.decode('utf-8'))
            audit.close()
        files[name] = sha256(body).hexdigest()
    for prefix in ('', 'it/', 'de/', 'es/', 'fr/', 'pt/'):
        for name in ('index.html', '404.html', 'resources/js/config.js', 'sitemap.xml'):
            if prefix + name not in files:
                raise ValueError(f'Missing generated artifact: {prefix}{name}')
    return {'source': source, 'files': files}


def publish(dist, source, location):
    manifest = make_manifest(dist, source)
    print(f'Validated {len(manifest["files"])} artifacts for {source}', flush=True)
    if location is None:
        return
    if location.exists():
        raise ValueError('Snapshot worktree path already exists')
    git = lambda *args: subprocess.check_output(['git', *args], text=True).strip()
    current = git('ls-remote', 'origin', 'refs/heads/main').split()
    if not current or current[0] != source:
        print(f'Skipping {source}: main has moved on.', flush=True)
        return
    channel = 'refs/heads/site-content'
    previous = git('ls-remote', 'origin', channel)
    if previous:
        git('fetch', 'origin', channel)
        git('worktree', 'add', '--detach', str(location), 'FETCH_HEAD')
    else:
        git('worktree', 'add', '--detach', str(location), 'HEAD')
    def run(*args):
        return git('-C', str(location), *args)
    if not previous:
        run('switch', '--orphan', 'site-content')
    else:
        run('rm', '-r', '--ignore-unmatch', '--', 'site')
    for name in manifest['files']:
        target = location / 'site' / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(dist / name, target)
    (location / 'manifest.json').write_text(json.dumps(manifest, separators=(',', ':')), encoding='utf-8')
    run('-c', 'core.autocrlf=false', 'add', '--force', '--', 'site', 'manifest.json')
    run('-c', 'core.autocrlf=false', 'commit', '--allow-empty', '-m', f'Build docs from {source}')
    revision = run('rev-parse', 'HEAD')
    (location / 'channel.json').write_text(json.dumps({'revision': revision}), encoding='utf-8')
    run('add', '--', 'channel.json')
    run('commit', '-m', f'Activate docs revision {source}')
    run('push', 'origin', f'HEAD:{channel}')
    print(f'Published artifact {revision}', flush=True)


if __name__ == '__main__':
    publish(Path(sys.argv[1]).resolve(), sys.argv[2], Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else None)
