(() => {
  const base = '/static/interactive/';
  const languages = ['it', 'es', 'fr', 'de', 'pt'];
  const loaded = new Map();
  const json = file => {
    if (!loaded.has(file)) loaded.set(file, fetch(base + file).then(response => {
      if (!response.ok) throw new Error(file);
      return response.json();
    }).catch(error => {
      loaded.delete(file);
      throw error;
    }));
    return loaded.get(file);
  };
  function element(tag, text, attrs = {}) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
    if (text != null) node.textContent = text;
    return node;
  }
  const https = candidate => {
    try {
      const url = new URL(candidate);
      return url.protocol === 'https:' ? url.href : null;
    } catch {
      return null;
    }
  };
  const entries = values => values.map(value => [String(value), value]);
  function field(parent, key, label, type, attrs = {}) {
    const wrapper = element('label', null, {class: 'rvc-field'});
    const input = element(type === 'select' ? 'select' : 'input', null,
      {name: key, ...(type === 'select' ? {} : {type}), ...attrs});
    wrapper.append(element('span', label), input);
    parent.append(wrapper);
    return input;
  }
  function options(select, rows) {
    const previous = select.value;
    select.replaceChildren(...rows.map(([value, text]) => element('option', text, {value})));
    if (rows.some(([value]) => value === previous)) select.value = previous;
  }
  function visible(input, show) {
    input.parentElement.hidden = !show;
    input.disabled = !show;
  }
  function button(parent, label, handler) {
    const node = element('button', label, {type: 'button'});
    node.addEventListener('click', handler);
    parent.append(node);
  }
  const section = (parent, className) => {
    const node = element('div', null, {class: className});
    parent.append(node);
    return node;
  };
  const value = input => input.disabled || input.value === '' || !input.validity.valid ? null : Number(input.value);

  function estimator(root, t, data, apps, lang) {
    const form = section(root, 'rvc-grid');
    const controls = {};
    const select = key => controls[key] = field(form, key, t(key), 'select');
    const number = (key, initial, min, max, step = 1) => controls[key] =
      field(form, key, t(key), 'number', {value: initial, min, max, step});
    const vendor = select('vendor'), gpu = select('gpu'), manual = field(form, 'manual', t('manual'), 'text', {maxlength: 80});
    const memory = number('available', 12, 0.25, 1024, 0.25);
    const app = select('application'), arch = select('architecture'), vocoder = select('vocoder'), rate = select('rate');
    number('duration', 20, 0.1, 1440, 0.1);
    number('batch', 4, 1, 1024);
    const countMode = select('countMode');
    const epochs = number('epochs', 100, 1, 100000), steps = number('steps', '', 1, 10000000);
    const perEpoch = number('perEpoch', '', 1, 1000000);
    const pitch = select('pitch'), precision = select('precision'), cache = select('cache'), checkpoint = select('checkpoint');
    options(vendor, entries([...new Set(data.gpus.map(item => item.vendor))]));
    options(app, Object.keys(data.programs).map(id => [id, apps[id].name]));
    for (const select of [pitch, cache, checkpoint]) options(select, [['yes', t('yes')], ['no', t('no')]]);
    cache.value = checkpoint.value = 'no';
    const actions = section(root, 'rvc-actions');
    const feedback = element('p', '', {role: 'status'});
    const results = section(root, 'rvc-results');
    results.setAttribute('aria-live', 'polite');
    const cards = {};
    for (const key of ['usage','available','trainingTime','steps','epochTime','status']) {
      const card = section(results, 'rvc-card');
      card.append(element('small', t(key)));
      cards[key] = element('strong');
      card.append(cards[key]);
    }
    const meter = element('progress', null, {max: 1, value: 0, 'aria-label': t('usage')});
    cards.usage.after(meter);
    const note = element('p');
    const source = element('a', t('source'));
    const advice = element('p', t('advice'));
    const inputError = element('p', '', {role: 'status'});
    root.append(note, source, advice, inputError, feedback);
    const format = new Intl.NumberFormat(lang, {maximumFractionDigits: 2});
    const time = seconds => seconds == null ? t('unavailable') : format.format(seconds / 60) + ' min';
    let capacity = null, snapshot = {};
    function updateGpu() {
      const candidates = data.gpus.filter(item => item.vendor === vendor.value);
      options(gpu, [...entries(candidates.map(item => item.model)), ['custom', t('manual')]]);
      const selected = candidates.find(item => item.model === gpu.value);
      visible(manual, !selected);
      capacity = selected?.vram ?? null;
      if (selected) memory.value = capacity;
      source.hidden = !selected;
      if (selected) source.href = https(selected.source) || '#';
    }
    function update() {
      const spec = data.programs[app.value];
      options(arch, entries(Object.keys(spec.architectures)));
      options(vocoder, entries(Object.keys(spec.architectures[arch.value])));
      const rates = spec.architectures[arch.value][vocoder.value];
      options(rate, rates.length ? entries(rates) : [['', t('unknown')]]);
      options(precision, entries(spec.precision));
      visible(precision, spec.precision.length > 0);
      visible(cache, spec.cache);
      visible(checkpoint, spec.checkpoint);
      const required = spec.requiredPitch[arch.value]?.includes(vocoder.value);
      if (required) pitch.value = 'yes';
      pitch.disabled = Boolean(required);
      options(countMode, [['epochs', t('epochs')], ...(spec.directSteps ? [['steps', t('steps')]] : [])]);
      visible(countMode, spec.directSteps);
      visible(epochs, countMode.value === 'epochs');
      visible(steps, countMode.value === 'steps');

      const available = value(memory);
      const tooHigh = capacity != null && available > capacity;
      const invalid = [...form.querySelectorAll('input[type=number]')].some(input =>
        !input.disabled && !input.validity.valid) || tooHigh;
      inputError.textContent = invalid ? t('invalid') : '';
      snapshot = {
        vendor: vendor.value, gpu: gpu.value === 'custom' ? manual.value.trim() : gpu.value,
        available, application: app.value, version: apps[app.value].version,
        architecture: arch.value, vocoder: vocoder.value, rate: rate.value ? Number(rate.value) : null,
        duration: value(controls.duration), batch: value(controls.batch), pitch: pitch.value,
        precision: precision.disabled ? null : precision.value, cache: cache.disabled ? null : cache.value,
        checkpoint: checkpoint.disabled ? null : checkpoint.value
      };
      const measured = invalid ? null : data.measurements.find(record =>
        Object.keys(snapshot).filter(key => key !== 'available').every(key => (snapshot[key] !== '' && snapshot[key] === record.configuration?.[key]))
        && record.source && record.date && record.dataset && record.conditions
        && Number.isFinite(record.peakGiB) && record.peakGiB > 0);
      const batches = value(perEpoch);
      const total = invalid ? null : value(steps) ?? (batches && value(epochs) ? batches * value(epochs) : null);
      const rateSeconds = measured?.secondsPerStep > 0 ? measured.secondsPerStep : null;
      cards.usage.textContent = measured ? format.format(measured.peakGiB) + ' GiB · ' + t('measured') : t('unavailable');
      cards.available.textContent = available != null && !tooHigh ? format.format(available) + ' GiB' : t('unavailable');
      cards.steps.textContent = total == null ? t('unavailable') : format.format(total);
      cards.trainingTime.textContent = rateSeconds && total ? time(rateSeconds * total) + ' · ' + t('estimated') : t('unavailable');
      cards.epochTime.textContent = rateSeconds && batches && !invalid ? time(rateSeconds * batches) + ' · ' + t('estimated') : t('unavailable');
      cards.status.textContent = invalid ? t('invalid') : app.value === 'ilaria' && vendor.value !== 'NVIDIA' ?
        t('nvidiaOnly') : t('hardwareUnknown');
      meter.hidden = !measured || !available;
      if (!meter.hidden) meter.value = Math.min(1, measured.peakGiB / available);
      note.textContent = measured ? [t('measured'), measured.date, measured.dataset, measured.conditions].join(' · ') : t('insufficient');
      note.append(document.createTextNode(' ' + t('stepsHelp') + (required ? ' ' + t('refine') : '')));
      if (measured && /^https:\/\//i.test(measured.source)) {
        note.append(document.createTextNode(' '), element('a', t('source'), {href: measured.source}));
      }
      snapshot = {...snapshot, epochs: value(epochs), steps: total, perEpoch: batches};
    }
    form.addEventListener('input', event => {
      if ([vendor, gpu].includes(event.target)) updateGpu();
      update();
    });
    button(actions, t('copy'), async () => {
      try {
        await navigator.clipboard.writeText(Object.entries(snapshot).map(([key, val]) =>
          t(key) + ': ' + (key === 'application' ? apps[val].name : val == null ? t('unavailable') : t(String(val)))).join('\n'));
        feedback.textContent = t('copied');
      } catch {
        feedback.textContent = t('copyError');
      }
    });
    button(actions, t('reset'), () => {
      app.selectedIndex = vendor.selectedIndex = 0;
      updateGpu();
      gpu.selectedIndex = 0;
      updateGpu();
      for (const input of form.querySelectorAll('input')) if (input !== memory) input.value = input.defaultValue;
      arch.selectedIndex = vocoder.selectedIndex = rate.selectedIndex = precision.selectedIndex = countMode.selectedIndex = pitch.selectedIndex = 0;
      cache.value = checkpoint.value = 'no';
      feedback.textContent = '';
      update();
    });
    updateGpu();
    update();
  }

  function matrix(root, t, {apps, records}, lang) {
    const form = section(root, 'rvc-grid');
    const search = field(form, 'search', t('search'), 'search');
    const fields = ['application','version','kind','architecture','vocoder','format','embedder','rate','mode','interface','status'];
    const values = (record, key) => {
      if (key === 'version') return [apps[record.application].version];
      if (key === 'rate') return record.rates.map(String);
      if (key === 'mode') return record.modes;
      if (key === 'interface') return record.interfaces;
      return record[key] ? [record[key]] : [];
    };
    const display = (key, value) => key === 'application' ? apps[value].name : key === 'rate' ? value + ' kHz' : t(value);
    const selects = Object.fromEntries(fields.map(key => [key, field(form, key, t(key), 'select')]));
    for (const key of fields) {
      options(selects[key], [['', t('all')], ...[...new Set(records.flatMap(record => values(record, key)))]
        .sort((a,b) => a.localeCompare(b, lang, {numeric: true})).map(value => [value, display(key,value)])]);
      visible(selects[key], selects[key].length > 1);
    }
    const actions = section(root, 'rvc-actions');
    const count = element('p', '', {role: 'status'});
    root.append(count);
    const list = section(root, 'rvc-list');
    function update() {
      const query = search.value.trim().toLocaleLowerCase(lang);
      const filtered = records.filter(record => fields.every(key =>
        !selects[key].value || values(record, key).includes(selects[key].value)) &&
        fields.flatMap(key => values(record,key).map(value => display(key,value))).join(' ').toLocaleLowerCase(lang).includes(query));
      count.textContent = filtered.length ? t('matches').replace('{n}', filtered.length) : t('noMatches');
      list.replaceChildren(...filtered.map(record => {
        const app = apps[record.application];
        const details = element('details', null, {class: 'rvc-card'});
        const title = element('summary');
        title.append(element('strong', app.name), element('span', t(record.status), {class: 'rvc-status', 'data-status': record.status}),
          element('small', [record.architecture, record.vocoder, record.format].filter(Boolean).join(' · ')));
        const dl = element('dl');
        for (const key of fields.filter(key => !['application','status','mode'].includes(key))) {
          dl.append(element('dt',t(key)), element('dd',values(record,key).map(value => display(key,value)).join(', ') || t('unknown')));
        }
        for (const mode of ['training','inference','realtime']) {
          dl.append(element('dt',t(mode)), element('dd',record.modes.includes(mode) ? t('yes') : t('unknown')));
        }
        dl.append(element('dt',t('verified')), element('dd',record.verified || t('unknown')));
        const limit = element('p', t(record.limit || 'versionNote'));
        const prefix = lang === 'en' ? '/' : '/' + lang + '/';
        const links = element('p', null, {class:'rvc-actions'});
        links.append(element('a',t('guide'),{href:prefix + app.guide}));
        const sourceUrl = https(app.source + (record.source || ''));
        if (sourceUrl) links.append(element('a',t('source'),{href:sourceUrl}));
        details.append(title, dl, limit, links);
        return details;
      }));
    }
    form.addEventListener('input', update);
    button(actions, t('reset'), () => {
      search.value = '';
      Object.values(selects).forEach(select => {select.value = '';});
      update();
    });
    update();
  }

  const mounting = new WeakSet();
  const failed = new WeakSet();
  async function mount(root) {
    mounting.add(root);
    const code = location.pathname.split('/')[1];
    const lang = languages.includes(code) ? code : 'en';
    const fallback = root.firstElementChild;
    let t = key => key;
    try {
      const strings = await json('i18n.json');
      t = key => strings[lang]?.[key] ?? strings.en[key] ?? key;
      const compatibility = await json('compatibility.json');
      if (!compatibility.apps || !compatibility.records.length) throw new Error('compatibility');
      const ui = element('div', null, {'data-rvc-interface': ''});
      if (root.dataset.rvcTool === 'vram') {
        const data = await json('benchmarks.json');
        estimator(ui, t, data, compatibility.apps, lang);
      } else {
        matrix(ui, t, compatibility, lang);
      }
      root.replaceChildren(ui);
    } catch {
      failed.add(root);
      if (t('loadError') !== 'loadError') root.replaceChildren(element('p', t('loadError'), {role:'status'}), fallback);
    } finally {
      mounting.delete(root);
    }
  }
  function scan() {
    document.querySelectorAll('[data-rvc-tool]').forEach(root => {
      if (!mounting.has(root) && !failed.has(root) && !root.querySelector('[data-rvc-interface]')) mount(root);
    });
  }
  function start() {
    scan();
    new MutationObserver(scan).observe(document.body, {childList: true, subtree: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
