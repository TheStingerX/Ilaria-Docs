import assert from 'node:assert/strict';
const origin = process.env.DOCS_TEST_URL || 'http://127.0.0.1:8813';
const debuggerUrl = process.env.DOCS_DEBUG_URL || 'http://127.0.0.1:9253';
const targets = await (await fetch(debuggerUrl + '/json/list')).json();
const socket = new WebSocket(targets.find(tab => tab.type === 'page').webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, {once: true});
  socket.addEventListener('error', reject, {once: true});
});
const pending = new Map();
const errors = [];
let sequence = 0;
socket.addEventListener('message', ({data}) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(message.error);
  else request.resolve(message.result);
});
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, {resolve, reject});
  socket.send(JSON.stringify({id, method, params}));
});
async function evaluate(callback, args = []) {
  const result = await call('Runtime.evaluate', {
    expression: '(' + callback.toString() + ')(...' + JSON.stringify(args) + ')',
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description);
  return result.result.value;
}
async function open(path) {
  await call('Page.navigate', {url: origin + path});
  for (let retry = 0; retry < 50; retry++) {
    try {
      if (await evaluate(route => location.pathname === route && !!document.querySelector('[data-rvc-tool] select'), [path])) return;
    } catch {
      // The execution context changes during navigation.
    }
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error('Tool did not mount at ' + path + ': ' + JSON.stringify(await evaluate(() => ({url:location.href, text:document.querySelector('[data-rvc-tool]')?.outerHTML, title:document.title, body:document.body.innerText.slice(0,150), resources:performance.getEntriesByType('resource').filter(r => r.name.includes('interactive')).map(r => r.name)}))) + errors.join(','));
}
await call('Runtime.enable');
await call('Page.enable');
await call('Emulation.setScriptExecutionDisabled', {value:false});
await call('Network.enable');
await call('Network.setCacheDisabled', {cacheDisabled:true});
try {
  for (const [lang, manufacturer, search] of [
    ['', 'Manufacturer','Search models or apps'],
    ['it','Produttore','Cerca modelli o programmi'],
    ['es','Fabricante','Buscar modelos o aplicaciones'],
    ['fr','Fabricant','Rechercher un modèle ou une application'],
    ['de','Hersteller','Modelle oder Apps suchen'],
    ['pt','Fabricante','Pesquisar modelos ou aplicações']
  ]) {
    const prefix = lang ? '/' + lang : '';
    await open(prefix + '/tools/vram-estimator/');
    const estimator = await evaluate(() => {
      const root = document.querySelector('[data-rvc-tool]');
      const set = (name, value) => {
        const control = root.querySelector('[name=' + name + ']');
        control.value = value;
        control.dispatchEvent(new Event('input', {bubbles:true}));
      };
      const initial = root.querySelector('[name=vendor]').labels[0].textContent;
      const initialMemory = root.querySelector('[name=available]').value;
      set('vendor','AMD');
      const amd = root.querySelector('[name=available]').value;
      set('application','redpanda');
      set('batch','8');
      set('duration','40');
      set('rate','48');
      set('perEpoch','12');
      set('epochs','25');
      const total = [...root.querySelectorAll('.rvc-card strong')][3].textContent;
      set('architecture','RVC V1');
      const validVocoders = root.querySelector('[name=vocoder]').options.length;
      root.querySelector('.rvc-actions button:last-child').click();
      return {initial, initialMemory, amd, total, validVocoders, reset: root.querySelector('[name=batch]').value, css: getComputedStyle(root.querySelector('.rvc-grid')).display};
    });
    assert.ok(estimator.initial.includes(manufacturer));
    assert.deepEqual([estimator.initialMemory, estimator.amd, estimator.total, estimator.validVocoders, estimator.reset, estimator.css], ['12','24','300',1,'4','grid']);
    await open(prefix + '/tools/compatibility-matrix/');
    const matrix = await evaluate(() => {
      const root = document.querySelector('[data-rvc-tool]');
      const set = (name, value) => {
        const control = root.querySelector('[name=' + name + ']');
        control.value = value;
        control.dispatchEvent(new Event('input', {bubbles:true}));
      };
      const label = root.querySelector('[name=search]').labels[0].textContent;
      set('application','ilaria');
      set('vocoder','RefineGAN');
      set('mode','training');
      set('version','2.4.7');
      const results = root.querySelectorAll('details');
      const matched = results.length;
      results[0].querySelector('summary').click();
      const expanded = results[0].open && results[0].querySelectorAll('a').length === 2;
      set('search','zzzzzz');
      const empty = root.querySelectorAll('details').length === 0;
      root.querySelector('.rvc-actions button').click();
      return {label, matched, expanded, empty, reset: root.querySelectorAll('details').length};
    });
    assert.ok(matrix.label.includes(search));
    assert.deepEqual([matrix.matched,matrix.expanded,matrix.empty], [1,true,true]);
    assert.ok(matrix.reset > 10);
    console.log((lang || 'en') + ': estimator and matrix passed');
  }
  await open('/tools/vram-estimator/');
  await call('Browser.grantPermissions', {origin, permissions:['clipboardReadWrite','clipboardSanitizedWrite']});
  const secondary = await evaluate(async () => {
    const root = document.querySelector('[data-rvc-tool]');
    const set = (key, value) => {
      const control = root.querySelector('[name=' + key + ']');
      control.value = value;
      control.dispatchEvent(new Event('input', {bubbles:true}));
    };
    const insufficient = root.textContent.includes('Not enough verified benchmark data');
    set('available','100');
    const invalid = root.textContent.includes('Check the input ranges');
    set('available','10');
    set('application','redpanda');
    set('countMode','steps');
    set('steps','450');
    root.querySelector('.rvc-actions button').click();
    for (let i = 0; i < 20 && !root.textContent.includes('Configuration copied.'); i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return {insufficient, invalid, copy: await navigator.clipboard.readText()};
  });
  assert.ok(secondary.insufficient && secondary.invalid && secondary.copy.includes('450'));
  await call('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:2,mobile:true});
  await call('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await open('/it/tools/compatibility-matrix/');
  const mobile = await evaluate(() => {
    const root = document.querySelector('[data-rvc-tool]');
    document.documentElement.classList.add('dark');
    const pick = root.querySelector('select');
    pick.focus();
    return {width:root.getBoundingClientRect().width, viewport:innerWidth, focused:document.activeElement===pick,
      motion:getComputedStyle(root.querySelector('details')).animationName,
      theme:getComputedStyle(root).getPropertyValue('--rvc-surface').trim()};
  });
  assert.ok(mobile.width <= mobile.viewport);
  assert.deepEqual([mobile.focused,mobile.motion,mobile.theme], [true,'none','#291d28']);
  await call('Emulation.setScriptExecutionDisabled', {value:true});
  await call('Page.navigate', {url: origin + '/it/tools/vram-estimator/'});
  const raw = await (await fetch(origin + '/it/tools/vram-estimator/')).text();
  assert.ok(raw.includes('Lo strumento richiede JavaScript') && raw.includes('href="../../training/"'));
  assert.deepEqual(errors, []);
  console.log('Mobile width, keyboard focus, dark theme, reduced motion and runtime passed');
} finally {
  socket.close();
}
