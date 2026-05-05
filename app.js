/* ═══════════════════════════════════════════════════════
   APEX POST STUDIO v2 — app.js
   Full logic: State · History · Formats · Themes · Render · JSON Import/Export
═══════════════════════════════════════════════════════ */

// ════════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════════
let currentSlideIndex = 0;
let currentTemplate = 'dark-gold';
let currentAccent = '#c9a84c';
let mainFontSize = 38;
let currentFormat = 'post'; // 'post' | 'portrait' | 'story'

// History
let history = [];
let historyIndex = -1;
const MAX_HISTORY = 40;

// Image crop store: key → { src, scale, x, y, rotate }
const imgStore = {};
function imgKey(slideIdx, field) { return `s${slideIdx}_i${field}`; }

// ════════════════════════════════════════════════
//  FORMAT CONFIG
// ════════════════════════════════════════════════
const FORMAT_CONFIG = {
  post: { w: 1080, h: 1080, label: '1080 × 1080 · Square Post' },
  portrait: { w: 1080, h: 1350, label: '1080 × 1350 · Portrait 4:5' },
  story: { w: 1080, h: 1920, label: '1080 × 1920 · Story / Reel 9:16' }
};

// ════════════════════════════════════════════════
//  TEMPLATE ACCENTS
// ════════════════════════════════════════════════
const TEMPLATE_ACCENTS = {
  'dark-gold': '#c9a84c',
  'light-warm': '#a07830',
  'obsidian': '#a078dc',
  'ivory': '#b03030',
  'slate': '#50a0dc',
  'matte-rose': '#e080a0',
  'forest': '#60c878',
  'midnight': '#7090e8',
  'charcoal': '#e8e8e8',
  'deep-wine': '#c0305a',
  'sand': '#8b6340',
  'noir': '#ffffff'
};

const TEMPLATE_BG = {
  'dark-gold': '#0a0a0a',
  'light-warm': '#faf5ec',
  'obsidian': '#0d0d14',
  'ivory': '#f5f0e4',
  'slate': '#1a1f2e',
  'matte-rose': '#1a1015',
  'forest': '#0d140f',
  'midnight': '#080810',
  'charcoal': '#1c1c1c',
  'deep-wine': '#110008',
  'sand': '#e8ddc8',
  'noir': '#050505'
};

const LIGHT_TEMPLATES = ['light-warm', 'ivory', 'sand'];

// ════════════════════════════════════════════════
//  DEFAULT CARD DATA
// ════════════════════════════════════════════════
const defaultCardData = {
  hook: {
    label: 'Hook',
    category: 'Pro Tip',
    hook: 'Stop overpaying for standard tech.',
    accent: 'overpaying',
    sub: 'We source the best gear so you never have to compromise.',
    brand: 'YOUR BRAND'
  },
  quote: {
    label: 'Quote',
    quote: 'Quality is remembered long after the price is forgotten.',
    author: 'Aldo Gucci',
    brand: 'YOUR BRAND'
  },
  compare: {
    label: 'Compare',
    category: 'Standard vs Premium',
    avg: 'Buys unbranded tech. No warranty. Hidden repair costs.',
    elite: 'Invests in trusted brands. Extended warranty. Total peace of mind.',
    bottom: 'Value is what you get, not just what you pay.',
    brand: 'YOUR BRAND'
  },
  framework: {
    label: 'Steps',
    category: 'How To Choose A TV',
    steps: 'Measure your room viewing distance.\nChoose OLED for dark rooms or QLED for bright.\nCheck HDMI 2.1 for gaming.',
    closing: 'Visit our store for a live demo.',
    brand: 'YOUR BRAND'
  },
  list: {
    label: 'List',
    eyebrow: 'Top Picks',
    title: 'Top Tech Upgrades',
    items: '4K Smart LED Displays\nHigh-Efficiency Inverter ACs\nNext-Gen Gaming Laptops\nNoise-Cancelling Audio',
    brand: 'YOUR BRAND'
  },
  closing: {
    label: 'Closing',
    closing: '"Your trusted tech partner."',
    brand: 'YOUR BRAND',
    handle: '@yourbrand'
  },
  caption: {
    label: 'Caption',
    caption: 'Drop by today to check out our latest arrivals. Zero-cost EMI on all major cards.',
    tags: '#YourBrand #TechUpgrade #Gadgets #NewArrival',
    brand: 'YOUR BRAND'
  },
  stat: {
    label: 'Stat',
    eyebrow: 'Did You Know',
    number: '94%',
    unit: 'Customer Satisfaction Rate',
    desc: 'Based on 10,000+ verified reviews from customers across India.',
    source: 'Source: Internal Survey 2024',
    brand: 'YOUR BRAND'
  },
  timeline: {
    label: 'Timeline',
    eyebrow: 'Our Journey',
    title: 'Built Over Years of Trust',
    items: '2018: Founded with a single store in Mumbai.\n2020: Expanded to 5 cities across India.\n2022: Crossed 1 lakh happy customers.\n2024: Launched online delivery pan-India.',
    brand: 'YOUR BRAND'
  },
  manifesto: {
    label: 'Manifesto',
    tag: 'Our Philosophy',
    body: 'We don\'t just sell products. We build relationships that last a lifetime.',
    sub: 'Every product we carry is tested, trusted, and backed by our promise.',
    brand: 'YOUR BRAND'
  },
  media: {
    label: 'Media',
    badge: 'New Arrival',
    title: 'The Ultimate Setup.',
    text: 'Upgrade your workspace with our latest high-performance displays.',
    img1: '',
    brand: 'YOUR BRAND'
  },
  product: {
    label: 'Product',
    img1: '',
    title: 'Sony Alpha A7 IV',
    price: '₹2,50,000',
    specs: '• 33MP Full-Frame Sensor\n• 4K 60p Video\n• Real-time Eye AF\n• 10-bit 4:2:2 Color',
    cta: 'Tap to Buy',
    brand: 'YOUR BRAND'
  },
  split: {
    label: 'Split',
    img1: '',
    textTop: 'OLED TV',
    img2: '',
    textBottom: 'QLED TV',
    centerTag: 'VS',
    brand: 'YOUR BRAND'
  },
  review: {
    label: 'Review',
    img1: '',
    rating: '★★★★★',
    quote: 'Absolutely the best store! Fast delivery and perfect packaging.',
    author: 'Rahul D.',
    role: 'Verified Buyer',
    brand: 'YOUR BRAND'
  },
  expert: {
    label: 'Expert',
    img1: '',
    name: 'Store Manager',
    title: 'Your Brand Name',
    quote: 'We personally test every device before recommending it to our customers.',
    brand: 'YOUR BRAND'
  },
  promo: {
    label: 'Promo',
    eyebrow: 'Limited Time Offer',
    title: 'Summer Tech Sale',
    price: 'Up to 40% Off',
    detail: 'On all Smart TVs & Audio',
    cta: 'Tap To Shop Now',
    brand: 'YOUR BRAND'
  },
  carousel: {
    label: 'Carousel',
    img1: '',
    number: '01',
    title: 'Unbox the Future.',
    desc: 'Our latest arrivals redefine what premium technology feels like.',
    dots: '5',
    activeDot: '1',
    brand: 'YOUR BRAND'
  },
  announcement: {
    label: 'Announce',
    flash: '🔥 Just Announced',
    headline: 'Grand\nOpening',
    desc: 'We\'re launching our biggest store yet in Connaught Place, New Delhi.',
    cta: 'Save the Date →',
    brand: 'YOUR BRAND'
  }
};

// ════════════════════════════════════════════════
//  INITIAL SLIDES
// ════════════════════════════════════════════════
let slides = [
  { type: 'hook', ...defaultCardData.hook },
  { type: 'product', ...defaultCardData.product },
  { type: 'compare', ...defaultCardData.compare },
  { type: 'stat', ...defaultCardData.stat },
  { type: 'quote', ...defaultCardData.quote },
  { type: 'closing', ...defaultCardData.closing }
];

// ════════════════════════════════════════════════
//  JSON IMPORT / EXPORT
// ════════════════════════════════════════════════

// Sample JSON schema showing all possible card types
const SAMPLE_JSON = {
  "_comment": "APEX Post Studio — JSON Import. Set theme, format, accent, then define your slides array.",
  "theme": "dark-gold",
  "format": "post",
  "accent": "#c9a84c",
  "fontSize": 38,
  "slides": [
    {
      "type": "hook",
      "category": "Pro Tip",
      "hook": "Stop overpaying for standard tech.",
      "accent": "overpaying",
      "sub": "We source the best gear so you never have to compromise.",
      "brand": "YOUR BRAND"
    },
    {
      "type": "stat",
      "eyebrow": "Did You Know",
      "number": "94%",
      "unit": "Customer Satisfaction Rate",
      "desc": "Based on 10,000+ verified reviews from customers across India.",
      "source": "Source: Internal Survey 2024",
      "brand": "YOUR BRAND"
    },
    {
      "type": "compare",
      "category": "Standard vs Premium",
      "avg": "Buys unbranded tech. No warranty. Hidden repair costs.",
      "elite": "Invests in trusted brands. Extended warranty. Total peace of mind.",
      "bottom": "Value is what you get, not just what you pay.",
      "brand": "YOUR BRAND"
    },
    {
      "type": "list",
      "eyebrow": "Top Picks",
      "title": "Top Tech Upgrades",
      "items": "4K Smart LED Displays\nHigh-Efficiency Inverter ACs\nNext-Gen Gaming Laptops\nNoise-Cancelling Audio",
      "brand": "YOUR BRAND"
    },
    {
      "type": "framework",
      "category": "How To Choose A TV",
      "steps": "Measure your room viewing distance.\nChoose OLED for dark rooms or QLED for bright.\nCheck HDMI 2.1 for gaming.",
      "closing": "Visit our store for a live demo.",
      "brand": "YOUR BRAND"
    },
    {
      "type": "quote",
      "quote": "Quality is remembered long after the price is forgotten.",
      "author": "Aldo Gucci",
      "brand": "YOUR BRAND"
    },
    {
      "type": "timeline",
      "eyebrow": "Our Journey",
      "title": "Built Over Years of Trust",
      "items": "2018: Founded with a single store in Mumbai.\n2020: Expanded to 5 cities across India.\n2022: Crossed 1 lakh happy customers.\n2024: Launched online delivery pan-India.",
      "brand": "YOUR BRAND"
    },
    {
      "type": "promo",
      "eyebrow": "Limited Time Offer",
      "title": "Summer Tech Sale",
      "price": "Up to 40% Off",
      "detail": "On all Smart TVs & Audio",
      "cta": "Tap To Shop Now",
      "brand": "YOUR BRAND"
    },
    {
      "type": "manifesto",
      "tag": "Our Philosophy",
      "body": "We don't just sell products. We build relationships that last a lifetime.",
      "sub": "Every product we carry is tested, trusted, and backed by our promise.",
      "brand": "YOUR BRAND"
    },
    {
      "type": "announcement",
      "flash": "🔥 Just Announced",
      "headline": "Grand\nOpening",
      "desc": "We're launching our biggest store yet in Connaught Place, New Delhi.",
      "cta": "Save the Date →",
      "brand": "YOUR BRAND"
    },
    {
      "type": "closing",
      "closing": "\"Your trusted tech partner.\"",
      "handle": "@yourbrand",
      "brand": "YOUR BRAND"
    }
  ]
};

function openJsonModal() {
  document.getElementById('json-modal-backdrop').classList.add('open');
  document.getElementById('json-paste-area').value = '';
  document.getElementById('json-error').textContent = '';
  document.getElementById('json-error').style.display = 'none';
  document.getElementById('json-file-name').textContent = '';
  switchJsonTab('import');
}

function closeJsonModal(e) {
  if (e && e.target !== document.getElementById('json-modal-backdrop')) return;
  document.getElementById('json-modal-backdrop').classList.remove('open');
}

function switchJsonTab(tab) {
  document.getElementById('json-panel-import').style.display = tab === 'import' ? '' : 'none';
  document.getElementById('json-panel-export').style.display = tab === 'export' ? '' : 'none';
  document.getElementById('tab-import').classList.toggle('active', tab === 'import');
  document.getElementById('tab-export').classList.toggle('active', tab === 'export');
}

function previewExportJson() {
  const exportData = buildExportData();
  document.getElementById('json-preview-area').value = JSON.stringify(exportData, null, 2);
}

function buildExportData() {
  return {
    "_comment": "APEX Post Studio — Exported project",
    "theme": currentTemplate,
    "format": currentFormat,
    "accent": currentAccent,
    "fontSize": mainFontSize,
    "slides": slides.map(s => {
      const clean = { ...s };
      // Keep URL images, strip base64
      ['img1', 'img2'].forEach(f => { if (clean[f] && clean[f].startsWith('data:')) clean[f] = ''; });
      return clean;
    })
  };
}

function handleJsonDrop(event) {
  event.preventDefault();
  document.getElementById('json-drop-zone').classList.remove('drag-over');
  const file = event.dataTransfer.files[0];
  if (!file || !file.name.endsWith('.json')) {
    showToast('Please drop a .json file', true); return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('json-paste-area').value = e.target.result;
    document.getElementById('json-file-name').textContent = '✓ ' + file.name;
  };
  reader.readAsText(file);
}

function downloadSampleJson() {
  const blob = new Blob([JSON.stringify(SAMPLE_JSON, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'apex-sample.json';
  a.click();
  showToast('Sample JSON downloaded!');
}

function copySampleJson() {
  navigator.clipboard.writeText(JSON.stringify(SAMPLE_JSON, null, 2))
    .then(() => showToast('Sample JSON copied to clipboard!'))
    .catch(() => {
      document.getElementById('json-paste-area').value = JSON.stringify(SAMPLE_JSON, null, 2);
      showToast('Pasted into editor — copy from there');
    });
}

function exportCurrentJson() {
  const exportData = buildExportData();
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `apex-project-${Date.now()}.json`;
  a.click();
  showToast('Project exported as JSON!');
}

function handleJsonFileUpload(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('json-paste-area').value = e.target.result;
    document.getElementById('json-file-name').textContent = '✓ ' + input.files[0].name;
  };
  reader.readAsText(input.files[0]);
}

function applyJsonImport() {
  const raw = document.getElementById('json-paste-area').value.trim();
  const errEl = document.getElementById('json-error');
  errEl.style.display = 'none';

  if (!raw) {
    errEl.textContent = 'Please paste or upload a JSON first.';
    errEl.style.display = 'block';
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    errEl.textContent = 'Invalid JSON: ' + e.message;
    errEl.style.display = 'block';
    return;
  }

  // Validate slides array
  if (!data.slides || !Array.isArray(data.slides) || data.slides.length === 0) {
    errEl.textContent = 'JSON must have a "slides" array with at least one slide.';
    errEl.style.display = 'block';
    return;
  }

  // Validate each slide has a valid type
  const validTypes = Object.keys(defaultCardData);
  const invalidSlides = data.slides.filter(s => !s.type || !validTypes.includes(s.type));
  if (invalidSlides.length > 0) {
    errEl.textContent = `Invalid slide type(s): ${invalidSlides.map(s => s.type || 'missing').join(', ')}. Valid types: ${validTypes.join(', ')}`;
    errEl.style.display = 'block';
    return;
  }

  saveHistory();

  // Apply global settings if present
  if (data.theme && TEMPLATE_ACCENTS[data.theme]) {
    currentTemplate = data.theme;
    currentAccent = data.accent || TEMPLATE_ACCENTS[data.theme];
    // Sync theme chips
    document.querySelectorAll('.chip').forEach(c => {
      const m = c.getAttribute('onclick')?.match(/'([^']+)'/);
      c.classList.toggle('active', m && m[1] === currentTemplate);
    });
  }
  if (data.accent) {
    currentAccent = data.accent;
    document.getElementById('custom-color-picker').value = data.accent;
  }
  if (data.format && FORMAT_CONFIG[data.format]) {
    currentFormat = data.format;
    document.querySelectorAll('.fmt-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.fmt === currentFormat));
    document.getElementById('ig-card').dataset.format = currentFormat;
    document.getElementById('canvas-size-label').textContent = FORMAT_CONFIG[currentFormat].label;
  }
  if (data.fontSize && data.fontSize >= 16 && data.fontSize <= 72) {
    mainFontSize = data.fontSize;
    document.getElementById('rng-hooksize').value = mainFontSize;
    document.getElementById('rng-val').textContent = mainFontSize;
  }

  // Build slides: merge defaults + user data
  slides = data.slides.map(slideData => {
    const type = slideData.type;
    const defaults = { ...defaultCardData[type] };
    // User data overrides defaults
    return { ...defaults, ...slideData };
  });

  currentSlideIndex = 0;
  closeJsonModal();
  refreshAll();
  saveHistory();
  showToast(`✓ Imported ${slides.length} card${slides.length > 1 ? 's' : ''} successfully!`);
}

// ════════════════════════════════════════════════
//  HISTORY / UNDO / REDO
// ════════════════════════════════════════════════
function saveHistory() {
  history = history.slice(0, historyIndex + 1);
  history.push({
    slides: JSON.parse(JSON.stringify(slides)),
    currentSlideIndex,
    currentTemplate,
    currentAccent,
    mainFontSize,
    currentFormat
  });
  if (history.length > MAX_HISTORY) history.shift();
  historyIndex = history.length - 1;
  updateHistoryButtons();
}

function undoAction() {
  if (historyIndex <= 0) return;
  historyIndex--;
  applyHistoryState(history[historyIndex]);
}

function redoAction() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  applyHistoryState(history[historyIndex]);
}

function applyHistoryState(state) {
  slides = JSON.parse(JSON.stringify(state.slides));
  currentSlideIndex = state.currentSlideIndex;
  currentTemplate = state.currentTemplate;
  currentAccent = state.currentAccent;
  mainFontSize = state.mainFontSize;
  currentFormat = state.currentFormat || 'post';

  document.getElementById('rng-hooksize').value = mainFontSize;
  document.getElementById('rng-val').textContent = mainFontSize;

  document.querySelectorAll('.chip').forEach(c => {
    const m = c.getAttribute('onclick')?.match(/'([^']+)'/);
    c.classList.toggle('active', m && m[1] === currentTemplate);
  });
  document.querySelectorAll('.swatch').forEach(s =>
    s.classList.toggle('active', s.dataset.color === currentAccent));
  document.querySelectorAll('.fmt-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.fmt === currentFormat));

  document.getElementById('ig-card').dataset.format = currentFormat;
  document.getElementById('canvas-size-label').textContent = FORMAT_CONFIG[currentFormat].label;

  refreshAll();
  updateHistoryButtons();
}

function updateHistoryButtons() {
  const u = document.getElementById('undo-btn');
  const r = document.getElementById('redo-btn');
  if (u) u.style.opacity = historyIndex <= 0 ? '0.32' : '1';
  if (r) r.style.opacity = historyIndex >= history.length - 1 ? '0.32' : '1';
}

// ════════════════════════════════════════════════
//  FORMAT SWITCHING
// ════════════════════════════════════════════════
function setFormat(fmt, btn) {
  saveHistory();
  currentFormat = fmt;
  document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const card = document.getElementById('ig-card');
  card.dataset.format = fmt;
  document.getElementById('canvas-size-label').textContent = FORMAT_CONFIG[fmt].label;
  showToast(`Format: ${FORMAT_CONFIG[fmt].label}`);
}

// ════════════════════════════════════════════════
//  MOBILE SIDEBAR
// ════════════════════════════════════════════════
function toggleSidebar() {
  const s = document.getElementById('sidebar');
  const b = document.getElementById('backdrop');
  const btn = document.getElementById('mobile-toggle-btn');
  const open = s.classList.toggle('open');
  b.classList.toggle('visible', open);
  btn.textContent = open ? '✕ Close' : '✦ Edit';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('backdrop').classList.remove('visible');
  document.getElementById('mobile-toggle-btn').textContent = '✦ Edit';
}

// ════════════════════════════════════════════════
//  IMAGE HANDLING
// ════════════════════════════════════════════════
function handleImageUpload(input, imgField, slideIdx) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    slides[slideIdx][imgField] = e.target.result;
    const k = imgKey(slideIdx, imgField);
    imgStore[k] = { src: e.target.result, scale: 1, x: 50, y: 50, rotate: 0 };
    saveHistory();
    updatePost();
    const zone = input.closest('.img-upload-zone');
    if (zone) {
      zone.classList.add('has-img');
      zone.querySelector('.upload-label').textContent = '✓ Image loaded — tap to change';
    }
    const controls = document.getElementById('crop-' + imgField + '-' + slideIdx);
    if (controls) controls.classList.add('visible');
  };
  reader.readAsDataURL(input.files[0]);
}

function removeImage(imgField, slideIdx) {
  slides[slideIdx][imgField] = '';
  delete imgStore[imgKey(slideIdx, imgField)];
  saveHistory();
  updatePost();
  renderSidebar();
}

// Image tab switching (upload vs URL)
function switchImgTab(imgField, slideIdx, tab, btn) {
  const uploadPanel = document.getElementById(`imgpanel-upload-${imgField}-${slideIdx}`);
  const urlPanel = document.getElementById(`imgpanel-url-${imgField}-${slideIdx}`);
  const tabs = btn.closest('.img-source-tabs').querySelectorAll('.img-src-tab');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'upload') {
    uploadPanel.classList.remove('hidden');
    urlPanel.classList.add('hidden');
  } else {
    uploadPanel.classList.add('hidden');
    urlPanel.classList.remove('hidden');
  }
}

// Debounced URL input handler
function handleImageUrl(input, imgField, slideIdx) {
  clearTimeout(handleImageUrl._timers = handleImageUrl._timers || {});
  const key = `${imgField}_${slideIdx}`;
  clearTimeout(handleImageUrl._timers[key]);
  handleImageUrl._timers[key] = setTimeout(() => {
    const url = input.value.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) {
      applyImageUrl(url, imgField, slideIdx);
    }
  }, 600);
}

// Immediate URL load on button click
function loadImageUrl(imgField, slideIdx) {
  const input = document.getElementById(`urlinput-${imgField}-${slideIdx}`);
  if (!input) return;
  const url = input.value.trim();
  if (!url) { showToast('Enter an image URL first', true); return; }
  applyImageUrl(url, imgField, slideIdx);
}

function applyImageUrl(url, imgField, slideIdx) {
  slides[slideIdx][imgField] = url;
  const k = imgKey(slideIdx, imgField);
  imgStore[k] = { src: url, scale: 1, x: 50, y: 50, rotate: 0 };
  saveHistory();
  updatePost();
  renderSidebar();
  showToast('✓ Image URL applied');
}

function getCropImg(slideIdx, imgField) {
  const src = slides[slideIdx]?.[imgField];
  if (!src) return `<div class="img-placeholder">[ TAP SIDEBAR TO UPLOAD ]</div>`;
  const k = imgStore[imgKey(slideIdx, imgField)] || { scale: 1, x: 50, y: 50, rotate: 0 };
  return `<div style="width:100%;height:100%;overflow:hidden;transform:scale(${k.scale}) rotate(${k.rotate || 0}deg);transform-origin:${k.x}% ${k.y}%;transition:transform 0.1s;">
    <img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:${k.x}% ${k.y}%;display:block;">
  </div>`;
}

function updateCrop(slideIdx, imgField, prop, val) {
  const k = imgKey(slideIdx, imgField);
  if (!imgStore[k]) {
    imgStore[k] = { src: slides[slideIdx][imgField] || '', scale: 1, x: 50, y: 50, rotate: 0 };
  }
  imgStore[k][prop] = parseFloat(val);
  const valEl = document.getElementById(`cv-${prop}-${imgField}-${slideIdx}`);
  if (valEl) {
    if (prop === 'scale') valEl.textContent = parseFloat(val).toFixed(2) + '×';
    else if (prop === 'rotate') valEl.textContent = val + '°';
    else valEl.textContent = val + '%';
  }
  updatePost();
}

function resetCrop(slideIdx, imgField) {
  const k = imgKey(slideIdx, imgField);
  const src = imgStore[k]?.src || slides[slideIdx]?.[imgField] || '';
  imgStore[k] = { src, scale: 1, x: 50, y: 50, rotate: 0 };
  ['scale', 'x', 'y', 'rotate'].forEach(p => {
    const defaults = { scale: 1, x: 50, y: 50, rotate: 0 };
    const inp = document.querySelector(`input[oninput*="updateCrop(${slideIdx},'${imgField}','${p}'"]`);
    if (inp) inp.value = defaults[p];
    const valEl = document.getElementById(`cv-${p}-${imgField}-${slideIdx}`);
    if (valEl) {
      if (p === 'scale') valEl.textContent = '1.00×';
      else if (p === 'rotate') valEl.textContent = '0°';
      else valEl.textContent = '50%';
    }
  });
  updatePost();
}

// ════════════════════════════════════════════════
//  SIDEBAR EDITOR
// ════════════════════════════════════════════════
function renderSidebar() {
  const el = document.getElementById('dynamic-editor');
  const d = slides[currentSlideIndex];
  const idx = currentSlideIndex;
  let html = `<div class="section-label">Edit: ${d.label || d.type}</div>`;

  const inp = (key, label) =>
    `<div class="field"><label>${label}</label>
     <input type="text" value="${esc(d[key] || '')}" oninput="updateSlideData('${key}', this.value)">
     </div>`;

  const ta = (key, label) =>
    `<div class="field"><label>${label}</label>
     <textarea oninput="updateSlideData('${key}', this.value)">${esc(d[key] || '')}</textarea>
     </div>`;

  const imgUpload = (imgField, label) => {
    const hasImg = !!d[imgField];
    const isUrl = hasImg && !d[imgField].startsWith('data:');
    const imgTabId = `imgtab-${imgField}-${idx}`;
    return `
    <div class="field">
      <label>${label}</label>
      <div class="img-source-tabs">
        <button class="img-src-tab ${!isUrl || !hasImg ? 'active' : ''}" onclick="switchImgTab('${imgField}',${idx},'upload',this)">⬆ Upload</button>
        <button class="img-src-tab ${isUrl && hasImg ? 'active' : ''}" onclick="switchImgTab('${imgField}',${idx},'url',this)">🔗 URL</button>
      </div>

      <div class="img-tab-panel img-tab-upload ${!isUrl || !hasImg ? '' : 'hidden'}" id="imgpanel-upload-${imgField}-${idx}">
        <div class="img-upload-zone ${hasImg && !isUrl ? 'has-img' : ''}" id="zone-${imgField}-${idx}">
          <input type="file" accept="image/*" onchange="handleImageUpload(this,'${imgField}',${idx})">
          <div class="upload-icon">🖼</div>
          <div class="upload-label">${hasImg && !isUrl ? '✓ Loaded — tap to change' : 'Tap to upload image'}</div>
        </div>
      </div>

      <div class="img-tab-panel img-tab-url ${isUrl && hasImg ? '' : 'hidden'}" id="imgpanel-url-${imgField}-${idx}">
        <div class="url-input-wrap">
          <input type="url" class="url-img-input" placeholder="https://example.com/image.jpg"
            value="${isUrl ? esc(d[imgField]) : ''}"
            oninput="handleImageUrl(this,'${imgField}',${idx})"
            id="urlinput-${imgField}-${idx}">
          <button class="url-load-btn" onclick="loadImageUrl('${imgField}',${idx})">Load</button>
        </div>
        ${isUrl && hasImg ? `<div class="url-preview-wrap"><img src="${esc(d[imgField])}" class="url-preview-thumb" onerror="this.style.display='none'" alt="preview"></div>` : ''}
      </div>

      ${hasImg ? `
        <button class="open-crop-btn" onclick="openCropModal(${idx},'${imgField}')">
          ✂ Drag &amp; Crop / Adjust
        </button>
        <button class="remove-img-btn" onclick="removeImage('${imgField}',${idx})">✕ Remove Image</button>
      ` : ''}
    </div>`;
  };

  switch (d.type) {
    case 'hook':
      html += inp('category', 'Top Tag') + ta('hook', 'Main Hook Text') + inp('accent', 'Word to Highlight') + ta('sub', 'Sub Text');
      break;
    case 'quote':
      html += ta('quote', 'Quote Text') + inp('author', 'Author / Source');
      break;
    case 'compare':
      html += inp('category', 'Title') + ta('avg', 'Standard Box') + ta('elite', 'Premium Box') + ta('bottom', 'Bottom Quote');
      break;
    case 'framework':
      html += inp('category', 'Heading') + ta('steps', 'Steps (one per line)') + inp('closing', 'Closing Note');
      break;
    case 'list':
      html += inp('eyebrow', 'Eyebrow') + inp('title', 'Title') + ta('items', 'Items (one per line)');
      break;
    case 'closing':
      html += ta('closing', 'Main Text') + inp('handle', 'Social Handle');
      break;
    case 'caption':
      html += ta('caption', 'Caption Text') + inp('tags', 'Hashtags (space-separated)');
      break;
    case 'stat':
      html += inp('eyebrow', 'Eyebrow') + inp('number', 'Big Number / Stat') + inp('unit', 'Unit Label') + ta('desc', 'Description') + inp('source', 'Source (small)');
      break;
    case 'timeline':
      html += inp('eyebrow', 'Eyebrow') + inp('title', 'Title') + ta('items', 'Items: YEAR: Text (one per line)');
      break;
    case 'manifesto':
      html += inp('tag', 'Top Tag') + ta('body', 'Main Body Text') + ta('sub', 'Sub Text');
      break;
    case 'media':
      html += imgUpload('img1', 'Background Image') + inp('badge', 'Top Badge') + ta('title', 'Headline') + ta('text', 'Description');
      break;
    case 'product':
      html += imgUpload('img1', 'Product Image') + inp('title', 'Product Name') + inp('price', 'Price') + ta('specs', 'Specs (one per line)') + inp('cta', 'Button Text');
      break;
    case 'split':
      html += imgUpload('img1', 'Top Image') + inp('textTop', 'Top Label');
      html += imgUpload('img2', 'Bottom Image') + inp('textBottom', 'Bottom Label') + inp('centerTag', 'Center Tag');
      break;
    case 'review':
      html += imgUpload('img1', 'Customer Photo') + inp('rating', 'Stars') + ta('quote', 'Review Text') + inp('author', 'Customer Name') + inp('role', 'Subtitle / Role');
      break;
    case 'expert':
      html += imgUpload('img1', 'Person Photo') + inp('name', 'Name') + inp('title', 'Subtitle') + ta('quote', 'Quote / Message');
      break;
    case 'promo':
      html += inp('eyebrow', 'Eyebrow') + ta('title', 'Main Title') + inp('price', 'Price / Offer') + inp('detail', 'Detail Text') + inp('cta', 'CTA Button');
      break;
    case 'carousel':
      html += imgUpload('img1', 'Background Image') + inp('number', 'Slide Number e.g. 01') + ta('title', 'Title') + ta('desc', 'Description') + inp('dots', 'Total Dots') + inp('activeDot', 'Active Dot #');
      break;
    case 'announcement':
      html += inp('flash', 'Flash Badge') + ta('headline', 'Big Headline (use \\n for break)') + ta('desc', 'Description') + inp('cta', 'CTA Text');
      break;
  }

  html += `<div style="margin-top:4px;">${inp('brand', 'Brand Watermark')}</div>`;
  el.innerHTML = html;
}

function updateSlideData(key, value) {
  slides[currentSlideIndex][key] = value;
  updatePost();
  clearTimeout(updateSlideData._timer);
  updateSlideData._timer = setTimeout(saveHistory, 800);
}

// ════════════════════════════════════════════════
//  HTML ESCAPE & HIGHLIGHT
// ════════════════════════════════════════════════
function esc(s) {
  return (s || '').toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlight(text, word) {
  if (!word || !word.trim()) return esc(text);
  const escaped = esc(text);
  const e = esc(word.trim());
  const re = new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return escaped.replace(re, `<span class="accent">$&</span>`);
}

// ════════════════════════════════════════════════
//  SLIDE HTML RENDERING
// ════════════════════════════════════════════════
function renderSlideHTML(d, idx) {
  const fs = mainFontSize;
  let html = '';

  switch (d.type) {

    case 'hook':
      html = `<div class="card-layout card-hook">
        <span class="badge">${esc(d.category)}</span>
        <div class="hook-text" style="font-size:${fs}px">${highlight(d.hook, d.accent)}</div>
        <div class="rule"></div>
        <div class="sub-text">${esc(d.sub)}</div>
      </div>`;
      break;

    case 'quote':
      html = `<div class="card-layout card-quote">
        <div class="quote-mark">"</div>
        <div class="quote-text" style="font-size:${fs - 12}px">${esc(d.quote)}</div>
        <div class="quote-author">— ${esc(d.author)}</div>
      </div>`;
      break;

    case 'compare':
      html = `<div class="card-layout card-compare">
        <div class="compare-label">Comparison</div>
        <div class="compare-title" style="font-size:${fs - 12}px">${esc(d.category)}</div>
        <div class="compare-cols">
          <div class="col-avg"><div class="col-label">Standard</div><div class="col-text">${esc(d.avg)}</div></div>
          <div class="col-elite"><div class="col-label">Premium ✦</div><div class="col-text">${esc(d.elite)}</div></div>
        </div>
        <div class="compare-bottom">${esc(d.bottom)}</div>
      </div>`;
      break;

    case 'framework': {
      const steps = (d.steps || '').split('\n').filter(Boolean).map((s, i) =>
        `<div class="fw-step">
          <span class="step-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="step-text">${esc(s)}</span>
        </div>`).join('');
      html = `<div class="card-layout card-framework">
        <div class="fw-title">↳ Process</div>
        <div class="fw-heading" style="font-size:${fs - 10}px">${esc(d.category)}</div>
        <div class="fw-steps">${steps}</div>
        <div class="fw-closing">${esc(d.closing)}</div>
      </div>`;
      break;
    }

    case 'list': {
      const items = (d.items || '').split('\n').filter(Boolean).map((s, i) =>
        `<div class="list-item">
          <div class="list-num">${String(i + 1).padStart(2, '0')}</div>
          <div class="list-text">${esc(s)}</div>
        </div>`).join('');
      html = `<div class="card-layout card-list">
        <div class="list-eyebrow">↳ ${esc(d.eyebrow)}</div>
        <div class="list-header" style="font-size:${fs - 12}px">${esc(d.title)}</div>
        <div class="list-items">${items}</div>
      </div>`;
      break;
    }

    case 'closing':
      html = `<div class="card-layout card-closing">
        <div class="closing-rule"></div>
        <div class="closing-main" style="font-size:${fs - 10}px">${esc(d.closing)}</div>
        <div class="closing-rule2"></div>
        <div class="closing-brand">${esc(d.brand)}</div>
        <div class="closing-handle">${esc(d.handle)}</div>
      </div>`;
      break;

    case 'caption': {
      const tags = (d.tags || '').split(' ').filter(Boolean).map(t =>
        `<span class="cap-tag">${esc(t)}</span>`).join('');
      html = `<div class="card-layout card-caption">
        <div class="cap-eyebrow">↳ Information</div>
        <div class="cap-text">${esc(d.caption)}</div>
        <div class="cap-tags">${tags}</div>
      </div>`;
      break;
    }

    case 'stat':
      html = `<div class="card-layout card-stat">
        <div class="stat-eyebrow">↳ ${esc(d.eyebrow)}</div>
        <div class="stat-number" style="font-size:${fs + 28}px">${esc(d.number)}</div>
        <div class="stat-unit">${esc(d.unit)}</div>
        <div class="stat-rule"></div>
        <div class="stat-desc">${esc(d.desc)}</div>
        <div class="stat-source">${esc(d.source)}</div>
      </div>`;
      break;

    case 'timeline': {
      const tlItems = (d.items || '').split('\n').filter(Boolean).map(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return `<div class="tl-item"><div class="tl-dot"></div><div class="tl-year">—</div><div class="tl-text">${esc(line)}</div></div>`;
        const year = line.substring(0, colonIdx).trim();
        const text = line.substring(colonIdx + 1).trim();
        return `<div class="tl-item"><div class="tl-dot"></div><div class="tl-year">${esc(year)}</div><div class="tl-text">${esc(text)}</div></div>`;
      }).join('');
      html = `<div class="card-layout card-timeline">
        <div class="tl-eyebrow">↳ ${esc(d.eyebrow)}</div>
        <div class="tl-title" style="font-size:${fs - 12}px">${esc(d.title)}</div>
        <div class="tl-items">
          <div class="tl-line"></div>
          ${tlItems}
        </div>
      </div>`;
      break;
    }

    case 'manifesto':
      html = `<div class="card-layout card-manifesto">
        <div class="mf-tag">${esc(d.tag)}</div>
        <div class="mf-body" style="font-size:${fs - 4}px">${esc(d.body)}</div>
        <div class="mf-rule"></div>
        <div class="mf-sub">${esc(d.sub)}</div>
      </div>`;
      break;

    case 'media':
      html = `<div class="card-media-bg">${getCropImg(idx, 'img1')}</div>
      <div class="card-media-overlay"></div>
      <div class="card-layout card-media">
        <div class="media-badge">${esc(d.badge)}</div>
        <div class="media-title" style="font-size:${fs - 6}px">${esc(d.title)}</div>
        <div class="media-desc">${esc(d.text)}</div>
      </div>`;
      break;

    case 'product':
      html = `<div class="card-product-wrap">
        <div class="card-product-img">${getCropImg(idx, 'img1')}</div>
        <div class="card-product-info">
          <div class="p-title" style="font-size:${fs - 10}px">${esc(d.title)}</div>
          <div class="p-price">${esc(d.price)}</div>
          <div class="p-specs">${(d.specs || '').split('\n').filter(Boolean).map(s => `<div>${esc(s)}</div>`).join('')}</div>
          <div class="p-cta">${esc(d.cta)}</div>
        </div>
      </div>`;
      break;

    case 'split':
      html = `<div class="card-split-wrap">
        <div class="split-half">
          ${getCropImg(idx, 'img1')}
          <div class="split-overlay"><div class="split-text">${esc(d.textTop)}</div></div>
        </div>
        <div class="split-center">${esc(d.centerTag)}</div>
        <div class="split-half">
          ${getCropImg(idx, 'img2')}
          <div class="split-overlay"><div class="split-text">${esc(d.textBottom)}</div></div>
        </div>
      </div>`;
      break;

    case 'review':
      html = `<div class="card-layout card-review">
        <div class="stars">${esc(d.rating)}</div>
        <div class="r-quote" style="font-size:${fs - 14}px">"${esc(d.quote)}"</div>
        <div class="r-avatar">${getCropImg(idx, 'img1')}</div>
        <div class="r-name">${esc(d.author)}</div>
        <div class="r-role">${esc(d.role)}</div>
      </div>`;
      break;

    case 'expert':
      html = `<div class="card-layout card-expert">
        <div class="e-img">${getCropImg(idx, 'img1')}</div>
        <div class="e-name">${esc(d.name)}</div>
        <div class="e-title">${esc(d.title)}</div>
        <div class="e-quote" style="font-size:${fs - 12}px">"${esc(d.quote)}"</div>
      </div>`;
      break;

    case 'promo':
      html = `<div class="card-layout card-promo">
        <div class="promo-eyebrow">${esc(d.eyebrow)}</div>
        <div class="promo-title" style="font-size:${fs + 10}px">${esc(d.title).replace(/\n/g, '<br>')}</div>
        <div class="promo-price-box">
          <div class="promo-price">${esc(d.price)}</div>
          <div class="promo-detail">${esc(d.detail)}</div>
        </div>
        <div class="promo-cta">${esc(d.cta)}</div>
      </div>`;
      break;

    case 'carousel': {
      const totalDots = Math.max(1, Math.min(parseInt(d.dots) || 5, 10));
      const activeDot = Math.max(1, Math.min(parseInt(d.activeDot) || 1, totalDots));
      const dotsHtml = Array.from({ length: totalDots }, (_, i) =>
        `<div class="cr-dot ${i + 1 === activeDot ? 'active' : ''}"></div>`).join('');
      html = `<div class="card-carousel">
        <div class="cr-bg">${getCropImg(idx, 'img1')}</div>
        <div class="cr-overlay"></div>
        <div class="card-layout cr-content">
          <div class="cr-number">${esc(d.number)}</div>
          <div class="cr-title" style="font-size:${fs - 10}px">${esc(d.title)}</div>
          <div class="cr-desc">${esc(d.desc)}</div>
          <div class="cr-dot-row">${dotsHtml}</div>
        </div>
      </div>`;
      break;
    }

    case 'announcement':
      html = `<div class="card-layout card-announcement">
        <div class="ann-flash">${esc(d.flash)}</div>
        <div class="ann-headline" style="font-size:${fs + 14}px">${esc(d.headline).replace(/\\n/g, '<br>').replace(/\n/g, '<br>')}</div>
        <div class="ann-desc">${esc(d.desc)}</div>
        <div class="ann-cta">${esc(d.cta)}</div>
      </div>`;
      break;

    default:
      html = `<div class="card-layout"><div style="opacity:0.4;font-family:'IBM Plex Mono',monospace;font-size:11px;">Unknown slide type</div></div>`;
  }

  html += `<div class="brand-watermark">${esc(d.brand)}</div>`;
  return html;
}

// ════════════════════════════════════════════════
//  CORE UPDATE
// ════════════════════════════════════════════════
function updatePost() {
  const card = document.getElementById('ig-card');
  const d = slides[currentSlideIndex];

  card.innerHTML = renderSlideHTML(d, currentSlideIndex);
  card.style.setProperty('--gold', currentAccent);
  card.setAttribute('data-template', currentTemplate);

  const total = slides.length;
  const cur = currentSlideIndex + 1;
  document.getElementById('slide-counter').textContent = `${cur} / ${total}`;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
  if (nextBtn) nextBtn.disabled = currentSlideIndex === slides.length - 1;

  updateStrip();
}

function updateStyle(val) {
  mainFontSize = parseInt(val);
  document.getElementById('rng-val').textContent = val;
  updatePost();
}

function updateStrip() {
  const strip = document.getElementById('slide-strip');
  let html = slides.map((s, i) => {
    const typeLabel = (s.label || s.type).substring(0, 5).toUpperCase();
    const active = i === currentSlideIndex ? 'active' : '';
    return `<div class="strip-thumb ${active}" onclick="goToSlide(${i})" title="${s.label || s.type}">
      <span class="strip-num">${i + 1}</span>
      <span class="strip-type">${typeLabel}</span>
    </div>`;
  }).join('');
  html += `<div class="strip-add" onclick="addSlide()" title="Add slide"><span style="font-size:1.2rem">+</span><span>Add</span></div>`;
  strip.innerHTML = html;

  requestAnimationFrame(() => {
    const active = strip.querySelector('.strip-thumb.active');
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
}

// ════════════════════════════════════════════════
//  NAVIGATION & MANAGEMENT
// ════════════════════════════════════════════════
function prevSlide() {
  if (currentSlideIndex > 0) { currentSlideIndex--; refreshAll(); }
}
function nextSlide() {
  if (currentSlideIndex < slides.length - 1) { currentSlideIndex++; refreshAll(); }
}
function goToSlide(idx) {
  currentSlideIndex = idx;
  refreshAll();
}
function refreshAll() {
  renderSidebar();
  updatePost();
}

function addSlide() {
  const t = document.getElementById('new-slide-type').value;
  saveHistory();
  slides.splice(currentSlideIndex + 1, 0, { type: t, ...defaultCardData[t] });
  currentSlideIndex++;
  refreshAll();
  showToast(`Added ${defaultCardData[t]?.label || t} card`);
}

function duplicateSlide() {
  saveHistory();
  const copy = JSON.parse(JSON.stringify(slides[currentSlideIndex]));
  const oldIdx = currentSlideIndex;
  const newIdx = currentSlideIndex + 1;
  slides.splice(newIdx, 0, copy);
  ['img1', 'img2'].forEach(f => {
    const oldKey = imgKey(oldIdx, f);
    if (imgStore[oldKey]) imgStore[imgKey(newIdx, f)] = { ...imgStore[oldKey] };
  });
  currentSlideIndex++;
  refreshAll();
  showToast('Card duplicated');
}

function deleteSlide() {
  if (slides.length <= 1) { showToast('Need at least one card!', true); return; }
  saveHistory();
  slides.splice(currentSlideIndex, 1);
  if (currentSlideIndex >= slides.length) currentSlideIndex = slides.length - 1;
  refreshAll();
  showToast('Card removed');
}

// ════════════════════════════════════════════════
//  THEME & ACCENT
// ════════════════════════════════════════════════
function setTemplate(tpl, btn) {
  saveHistory();
  currentTemplate = tpl;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentAccent = TEMPLATE_ACCENTS[tpl] || '#c9a84c';
  document.querySelectorAll('.swatch').forEach(s =>
    s.classList.toggle('active', s.dataset.color === currentAccent));
  document.getElementById('custom-color-picker').value = currentAccent;
  updatePost();
}

function setAccent(swatch) {
  saveHistory();
  currentAccent = swatch.dataset.color;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  swatch.classList.add('active');
  document.getElementById('custom-color-picker').value = currentAccent;
  updatePost();
}

function setCustomAccent(color) {
  currentAccent = color;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  updatePost();
  clearTimeout(setCustomAccent._timer);
  setCustomAccent._timer = setTimeout(saveHistory, 600);
}

function toggleAppTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('theme-btn').textContent = next === 'dark' ? '☀' : '☾';
}

// ════════════════════════════════════════════════
//  LOADING / TOAST
// ════════════════════════════════════════════════
function showLoading(text) {
  document.getElementById('loading').classList.add('active');
  document.getElementById('loading-text').textContent = text || 'Preparing export...';
}
function hideLoading() {
  document.getElementById('loading').classList.remove('active');
}

function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (isError ? ' error' : '') + ' show';
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ════════════════════════════════════════════════
//  EXPORT — true off-screen render at exact px
// ════════════════════════════════════════════════
async function renderToCanvas(slideIdx) {
  const fmt = FORMAT_CONFIG[currentFormat];
  const W = fmt.w;
  const H = fmt.h;
  const bg = TEMPLATE_BG[currentTemplate] || '#0a0a0a';
  const fg = LIGHT_TEMPLATES.includes(currentTemplate) ? '#1a1510' : '#f0ebe0';
  const acc = currentAccent;

  const BASE = 400;
  const S = W / BASE;

  const savedFS = mainFontSize;
  mainFontSize = Math.round(savedFS * S);
  const slideHTML = renderSlideHTML(slides[slideIdx], slideIdx);
  mainFontSize = savedFS;

  const wrap = document.createElement('div');
  wrap.style.cssText = `
    position: fixed;
    left: -${W + 100}px;
    top: 0;
    width: ${W}px;
    height: ${H}px;
    overflow: hidden;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    background: ${bg};
    color: ${fg};
    font-family: 'Syne', sans-serif;
  `;

  const styleEl = document.createElement('style');
  const p = (v) => `${Math.round(v * S)}px`;

  styleEl.textContent = `
    #__exp * { box-sizing: border-box; }
    #__exp .card-layout {
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      padding: ${p(44)} ${p(28)} ${p(80)} ${p(28)};
      position: relative; z-index: 2;
    }
    #__exp .brand-watermark {
      position: absolute; bottom: ${p(13)};
      left: 0; right: 0; text-align: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: ${p(10)}; letter-spacing: ${p(3.5)};
      opacity: 0.22; z-index: 10; pointer-events: none;
    }
    #__exp .card-hook { justify-content: center; }
    #__exp .badge {
      font-family: 'IBM Plex Mono', monospace;
      font-size: ${p(7.5)}; letter-spacing: ${p(2.2)};
      text-transform: uppercase;
      border: ${p(1)} solid currentColor; padding: ${p(3)} ${p(8)};
      opacity: 0.45; align-self: flex-start;
      margin-bottom: ${p(18)}; border-radius: ${p(3)};
    }
    #__exp .rule { width: ${p(30)}; height: ${p(3)}; background: ${acc}; margin-bottom: ${p(16)}; border-radius: 99px; }
    #__exp .sub-text { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10.5)}; line-height: 1.7; opacity: 0.6; }
    #__exp .card-quote { justify-content: center; text-align: center; }
    #__exp .quote-mark { font-family: 'DM Serif Display', serif; font-size: ${p(62)}; color: ${acc}; line-height: 1; margin-bottom: ${p(8)}; }
    #__exp .quote-author { font-family: 'IBM Plex Mono', monospace; font-size: ${p(9.5)}; letter-spacing: ${p(2)}; color: ${acc}; text-transform: uppercase; }
    #__exp .card-compare { justify-content: center; }
    #__exp .compare-label { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(2.2)}; text-transform: uppercase; color: ${acc}; margin-bottom: ${p(4)}; }
    #__exp .compare-cols { display: flex; flex-direction: column; gap: ${p(10)}; }
    #__exp .col-avg { padding: ${p(12)}; border-radius: ${p(6)}; background: rgba(150,150,150,0.05); border: ${p(1)} solid rgba(255,255,255,0.07); }
    #__exp .col-elite { padding: ${p(12)}; border-radius: ${p(6)}; background: rgba(201,168,76,0.05); border-left: ${p(3)} solid ${acc}; border-top: ${p(1)} solid rgba(255,255,255,0.07); border-right: ${p(1)} solid rgba(255,255,255,0.07); border-bottom: ${p(1)} solid rgba(255,255,255,0.07); }
    #__exp .col-label { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7)}; letter-spacing: ${p(2.5)}; text-transform: uppercase; opacity: 0.45; margin-bottom: ${p(5)}; }
    #__exp .col-text { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10)}; line-height: 1.7; opacity: 0.78; }
    #__exp .compare-bottom { margin-top: ${p(18)}; font-family: 'DM Serif Display', serif; font-style: italic; font-size: ${p(12)}; opacity: 0.45; border-top: ${p(1)} solid currentColor; padding-top: ${p(14)}; line-height: 1.5; }
    #__exp .card-framework { justify-content: center; }
    #__exp .fw-title { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(2.8)}; text-transform: uppercase; color: ${acc}; margin-bottom: ${p(11)}; }
    #__exp .fw-steps { display: flex; flex-direction: column; gap: ${p(14)}; }
    #__exp .fw-step { display: flex; gap: ${p(11)}; align-items: flex-start; }
    #__exp .step-num { font-family: 'Bebas Neue', sans-serif; font-size: ${p(24)}; line-height: 1; color: ${acc}; opacity: 0.65; min-width: ${p(26)}; }
    #__exp .step-text { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10.5)}; line-height: 1.65; opacity: 0.72; padding-top: ${p(3)}; }
    #__exp .fw-closing { margin-top: ${p(20)}; border-top: ${p(1)} solid currentColor; padding-top: ${p(14)}; font-family: 'DM Serif Display', serif; font-style: italic; font-size: ${p(11.5)}; opacity: 0.4; }
    #__exp .card-list { justify-content: center; }
    #__exp .list-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(2.8)}; text-transform: uppercase; color: ${acc}; margin-bottom: ${p(9)}; }
    #__exp .list-items { display: flex; flex-direction: column; gap: ${p(11)}; }
    #__exp .list-item { display: flex; gap: ${p(11)}; align-items: flex-start; border-bottom: ${p(1)} dashed rgba(150,150,150,0.12); padding-bottom: ${p(11)}; }
    #__exp .list-item:last-child { border-bottom: none; padding-bottom: 0; }
    #__exp .list-num { font-family: 'Bebas Neue', sans-serif; font-size: ${p(19)}; color: ${acc}; opacity: 0.65; line-height: 1; margin-top: ${p(1)}; min-width: ${p(21)}; }
    #__exp .list-text { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10.5)}; line-height: 1.55; opacity: 0.78; }
    #__exp .card-closing { align-items: center; justify-content: center; text-align: center; }
    #__exp .closing-rule { width: ${p(1)}; height: ${p(50)}; background: currentColor; opacity: 0.16; margin-bottom: ${p(28)}; }
    #__exp .closing-rule2 { width: ${p(1)}; height: ${p(32)}; background: currentColor; opacity: 0.16; margin-bottom: ${p(20)}; }
    #__exp .closing-brand { font-family: 'Bebas Neue', sans-serif; font-size: ${p(19)}; letter-spacing: ${p(4)}; color: ${acc}; opacity: 0.72; }
    #__exp .closing-handle { font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; letter-spacing: ${p(2)}; opacity: 0.38; margin-top: ${p(5)}; }
    #__exp .card-caption { justify-content: center; }
    #__exp .cap-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; letter-spacing: ${p(2.8)}; color: ${acc}; text-transform: uppercase; margin-bottom: ${p(18)}; }
    #__exp .cap-text { font-family: 'IBM Plex Mono', monospace; font-size: ${p(12.5)}; line-height: 1.88; opacity: 0.72; }
    #__exp .cap-tags { display: flex; flex-wrap: wrap; gap: ${p(5)}; margin-top: ${p(22)}; }
    #__exp .cap-tag { font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; color: ${acc}; opacity: 0.72; letter-spacing: ${p(0.5)}; border: ${p(1)} solid currentColor; padding: ${p(3)} ${p(7)}; border-radius: ${p(3)}; }
    #__exp .card-stat { justify-content: center; align-items: flex-start; }
    #__exp .stat-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(3)}; text-transform: uppercase; color: ${acc}; margin-bottom: ${p(12)}; }
    #__exp .stat-unit { font-family: 'IBM Plex Mono', monospace; font-size: ${p(13)}; letter-spacing: ${p(1.2)}; opacity: 0.45; margin-bottom: ${p(18)}; text-transform: uppercase; }
    #__exp .stat-rule { width: ${p(40)}; height: ${p(3)}; background: ${acc}; margin-bottom: ${p(18)}; border-radius: 99px; }
    #__exp .stat-desc { font-family: 'IBM Plex Mono', monospace; font-size: ${p(11)}; line-height: 1.7; opacity: 0.6; }
    #__exp .stat-source { margin-top: auto; font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(1.5)}; opacity: 0.3; text-transform: uppercase; border-top: ${p(1)} solid currentColor; padding-top: ${p(12)}; }
    #__exp .card-timeline { justify-content: center; }
    #__exp .tl-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(3)}; text-transform: uppercase; color: ${acc}; margin-bottom: ${p(8)}; }
    #__exp .tl-items { display: flex; flex-direction: column; position: relative; }
    #__exp .tl-line { position: absolute; left: ${p(10)}; top: ${p(8)}; bottom: ${p(8)}; width: ${p(1)}; background: rgba(201,168,76,0.2); }
    #__exp .tl-item { display: flex; gap: ${p(16)}; align-items: flex-start; padding-left: ${p(28)}; position: relative; padding-bottom: ${p(16)}; }
    #__exp .tl-item:last-child { padding-bottom: 0; }
    #__exp .tl-dot { position: absolute; left: ${p(5)}; top: ${p(5)}; width: ${p(10)}; height: ${p(10)}; border-radius: 50%; background: ${acc}; }
    #__exp .tl-year { font-family: 'Bebas Neue', sans-serif; font-size: ${p(14)}; color: ${acc}; opacity: 0.7; min-width: ${p(34)}; line-height: 1; flex-shrink: 0; }
    #__exp .tl-text { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10)}; line-height: 1.55; opacity: 0.72; }
    #__exp .card-manifesto { justify-content: center; align-items: center; text-align: center; position: relative; }
    #__exp .card-manifesto::before { content: ''; position: absolute; inset: ${p(24)}; border: ${p(1)} solid rgba(201,168,76,0.12); border-radius: ${p(4)}; pointer-events: none; }
    #__exp .mf-tag { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7)}; letter-spacing: ${p(4)}; text-transform: uppercase; color: ${acc}; opacity: 0.6; margin-bottom: ${p(28)}; }
    #__exp .mf-rule { width: ${p(28)}; height: ${p(2)}; background: ${acc}; margin: 0 auto ${p(20)}; border-radius: 99px; }
    #__exp .mf-sub { font-family: 'IBM Plex Mono', monospace; font-size: ${p(9.5)}; line-height: 1.7; opacity: 0.5; letter-spacing: ${p(0.6)}; }
    #__exp .card-media-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
    #__exp .card-media-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.92) 100%); }
    #__exp .card-media { justify-content: flex-end; padding-bottom: ${p(86)}; color: #fff; }
    #__exp .media-badge { background: ${acc}; color: #000; font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(2)}; padding: ${p(3)} ${p(9)}; text-transform: uppercase; align-self: flex-start; margin-bottom: ${p(11)}; font-weight: 700; border-radius: ${p(3)}; }
    #__exp .media-desc { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10.5)}; line-height: 1.6; opacity: 0.88; }
    #__exp .card-product-wrap { width: 100%; height: 100%; display: flex; flex-direction: column; position: relative; }
    #__exp .card-product-img { height: 52%; width: 100%; position: relative; overflow: hidden; }
    #__exp .card-product-info { flex: 1; border-top: ${p(2)} solid ${acc}; padding: ${p(16)} ${p(22)} ${p(72)} ${p(22)}; display: flex; flex-direction: column; }
    #__exp .p-price { font-family: 'Bebas Neue', sans-serif; font-size: ${p(20)}; color: ${acc}; letter-spacing: ${p(0.5)}; margin-bottom: ${p(8)}; }
    #__exp .p-specs { font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; line-height: 1.9; opacity: 0.7; flex: 1; }
    #__exp .p-cta { background: ${acc}; color: #000; font-family: 'IBM Plex Mono', monospace; font-size: ${p(9.5)}; font-weight: 700; padding: ${p(8)} ${p(18)}; text-transform: uppercase; letter-spacing: ${p(1.2)}; text-align: center; border-radius: ${p(4)}; margin-top: ${p(8)}; }
    #__exp .card-split-wrap { width: 100%; height: 100%; display: flex; flex-direction: column; position: relative; }
    #__exp .split-half { flex: 1; position: relative; overflow: hidden; }
    #__exp .split-half img { width: 100%; height: 100%; object-fit: cover; opacity: 0.75; display: block; }
    #__exp .split-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.78), transparent); display: flex; align-items: flex-end; padding: ${p(14)} ${p(18)}; }
    #__exp .split-text { color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: ${p(24)}; letter-spacing: ${p(0.8)}; text-shadow: 0 ${p(2)} ${p(8)} rgba(0,0,0,0.8); }
    #__exp .split-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); background: ${bg}; border: ${p(2)} solid ${acc}; color: ${acc}; font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; font-weight: 700; letter-spacing: ${p(2)}; padding: ${p(7)} ${p(14)}; z-index: 10; text-transform: uppercase; white-space: nowrap; border-radius: ${p(4)}; }
    #__exp .card-review { justify-content: center; align-items: center; text-align: center; }
    #__exp .stars { color: ${acc}; font-size: ${p(18)}; letter-spacing: ${p(2)}; margin-bottom: ${p(14)}; }
    #__exp .r-avatar { width: ${p(60)}; height: ${p(60)}; border-radius: 50%; overflow: hidden; border: ${p(2)} solid ${acc}; margin-bottom: ${p(10)}; flex-shrink: 0; }
    #__exp .r-name { font-family: 'Bebas Neue', sans-serif; font-size: ${p(17)}; letter-spacing: ${p(1)}; }
    #__exp .r-role { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(2)}; text-transform: uppercase; color: ${acc}; opacity: 0.75; margin-top: ${p(3)}; }
    #__exp .card-expert { justify-content: center; align-items: center; text-align: center; }
    #__exp .e-img { width: ${p(86)}; height: ${p(86)}; border-radius: 50%; margin-bottom: ${p(16)}; overflow: hidden; border: ${p(3)} solid rgba(201,168,76,0.38); box-shadow: 0 ${p(8)} ${p(28)} rgba(0,0,0,0.4); flex-shrink: 0; }
    #__exp .e-name { font-family: 'Bebas Neue', sans-serif; font-size: ${p(19)}; letter-spacing: ${p(1)}; color: ${acc}; }
    #__exp .e-title { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7.5)}; letter-spacing: ${p(2)}; text-transform: uppercase; opacity: 0.5; margin-bottom: ${p(16)}; }
    #__exp .card-promo { justify-content: center; align-items: center; text-align: center; }
    #__exp .promo-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; letter-spacing: ${p(2.8)}; text-transform: uppercase; color: ${acc}; margin-bottom: ${p(10)}; }
    #__exp .promo-price-box { border: ${p(1.5)} solid ${acc}; padding: ${p(14)} ${p(22)}; margin-bottom: ${p(18)}; background: rgba(201,168,76,0.04); border-radius: ${p(6)}; }
    #__exp .promo-price { font-family: 'DM Serif Display', serif; font-size: ${p(36)}; color: ${acc}; line-height: 1; margin-bottom: ${p(4)}; }
    #__exp .promo-detail { font-family: 'IBM Plex Mono', monospace; font-size: ${p(8.5)}; opacity: 0.6; letter-spacing: ${p(1)}; }
    #__exp .promo-cta { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10.5)}; background: ${acc}; color: #000; padding: ${p(11)} ${p(26)}; font-weight: 700; text-transform: uppercase; letter-spacing: ${p(1.8)}; border-radius: ${p(4)}; }
    #__exp .card-carousel { justify-content: flex-end; position: relative; }
    #__exp .cr-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
    #__exp .cr-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.9) 100%); }
    #__exp .cr-content { position: relative; z-index: 2; padding: 0 0 ${p(72)} 0; }
    #__exp .cr-number { font-family: 'Bebas Neue', sans-serif; font-size: ${p(56)}; color: ${acc}; opacity: 0.18; line-height: 1; margin-bottom: ${p(-8)}; }
    #__exp .cr-desc { font-family: 'IBM Plex Mono', monospace; font-size: ${p(10)}; line-height: 1.6; color: rgba(255,255,255,0.72); }
    #__exp .cr-dot-row { display: flex; gap: ${p(5)}; margin-top: ${p(14)}; }
    #__exp .cr-dot { width: ${p(6)}; height: ${p(6)}; border-radius: 50%; background: rgba(255,255,255,0.3); }
    #__exp .cr-dot.active { background: ${acc}; width: ${p(18)}; border-radius: 99px; }
    #__exp .card-announcement { justify-content: center; align-items: center; text-align: center; }
    #__exp .ann-flash { font-family: 'IBM Plex Mono', monospace; font-size: ${p(7)}; letter-spacing: ${p(5)}; text-transform: uppercase; border: ${p(1)} solid ${acc}; color: ${acc}; padding: ${p(4)} ${p(12)}; border-radius: 100px; margin-bottom: ${p(22)}; }
    #__exp .ann-desc { font-family: 'IBM Plex Mono', monospace; font-size: ${p(11)}; line-height: 1.7; opacity: 0.58; margin-bottom: ${p(26)}; }
    #__exp .ann-cta { display: inline-flex; align-items: center; gap: ${p(8)}; background: ${acc}; color: #000; font-family: 'IBM Plex Mono', monospace; font-size: ${p(10)}; font-weight: 700; padding: ${p(10)} ${p(24)}; border-radius: ${p(4)}; letter-spacing: ${p(1.5)}; text-transform: uppercase; }
    #__exp .hook-text, #__exp .quote-text, #__exp .compare-title,
    #__exp .fw-heading, #__exp .list-header, #__exp .closing-main,
    #__exp .tl-title, #__exp .r-quote, #__exp .e-quote,
    #__exp .mf-body, #__exp .media-title, #__exp .p-title,
    #__exp .cr-title, #__exp .ann-headline {
      font-family: 'DM Serif Display', serif;
      line-height: 1.2;
    }
    #__exp .mf-body { font-family: 'Playfair Display', serif; font-weight: 700; }
    #__exp .ann-headline { font-family: 'Bebas Neue', sans-serif; line-height: 0.88; letter-spacing: ${p(0.3)}; text-transform: uppercase; }
    #__exp .promo-title { font-family: 'Bebas Neue', sans-serif; line-height: 0.92; letter-spacing: ${p(0.4)}; text-transform: uppercase; margin-bottom: ${p(20)}; }
    #__exp .crop-img-wrap, #__exp .card-media-bg div,
    #__exp .card-product-img div, #__exp .cr-bg div,
    #__exp .split-half div, #__exp .r-avatar div, #__exp .e-img div {
      width: 100% !important; height: 100% !important;
    }
    #__exp .img-placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: ${p(8.5)}; letter-spacing: ${p(1)};
      color: rgba(201,168,76,0.45);
      border: ${p(1)} dashed rgba(201,168,76,0.18);
    }
    #__exp .accent { color: ${acc}; }
  `;

  const card = document.createElement('div');
  card.id = '__exp';
  card.style.cssText = `
    width: ${W}px; height: ${H}px;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    background: ${bg}; color: ${fg};
    --gold: ${acc};
    font-family: 'Syne', sans-serif;
  `;
  card.innerHTML = slideHTML;

  wrap.appendChild(styleEl);
  wrap.appendChild(card);
  document.body.appendChild(wrap);

  await new Promise(r => setTimeout(r, 400));

  const canvas = await html2canvas(card, {
    scale: 1,
    useCORS: true,
    allowTaint: true,
    backgroundColor: bg,
    width: W,
    height: H,
    logging: false,
    windowWidth: W,
    windowHeight: H,
    x: 0,
    y: 0
  });

  document.body.removeChild(wrap);
  return canvas;
}

async function downloadCurrentSlide() {
  showLoading('Rendering card...');
  try {
    const canvas = await renderToCanvas(currentSlideIndex);
    const link = document.createElement('a');
    const fmt = FORMAT_CONFIG[currentFormat];
    link.download = `apex-card-${currentSlideIndex + 1}-${slides[currentSlideIndex].type}-${currentFormat}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(`✓ Exported at ${fmt.w}×${fmt.h}px!`);
  } catch (e) {
    showToast('Export failed: ' + e.message, true);
    console.error(e);
  }
  hideLoading();
}

async function downloadAllSlides() {
  if (typeof JSZip === 'undefined') {
    showToast('ZIP library loading, please retry...', true);
    return;
  }
  showLoading(`Preparing ${slides.length} cards...`);
  const zip = new JSZip();
  const folder = zip.folder('apex-cards');
  const fmt = FORMAT_CONFIG[currentFormat];
  try {
    for (let i = 0; i < slides.length; i++) {
      document.getElementById('loading-text').textContent = `Rendering ${i + 1} / ${slides.length}...`;
      const canvas = await renderToCanvas(i);
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      folder.file(`card-${i + 1}-${slides[i].type}-${currentFormat}.png`, blob);
      await new Promise(r => setTimeout(r, 80));
    }
    document.getElementById('loading-text').textContent = 'Creating ZIP...';
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `apex-${slides.length}cards-${currentFormat}-${fmt.w}x${fmt.h}.zip`;
    link.click();
    showToast(`✓ ${slides.length} cards saved as ZIP!`);
  } catch (e) {
    showToast('Export failed: ' + e.message, true);
    console.error(e);
  }
  hideLoading();
}

// ════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

  if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undoAction(); }
  else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redoAction(); }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'd') { e.preventDefault(); duplicateSlide(); }
  else if (e.key === '1' && !e.ctrlKey) setFormat('post', document.querySelector('[data-fmt="post"]'));
  else if (e.key === '2' && !e.ctrlKey) setFormat('portrait', document.querySelector('[data-fmt="portrait"]'));
  else if (e.key === '3' && !e.ctrlKey) setFormat('story', document.querySelector('[data-fmt="story"]'));
});

// ════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════
refreshAll();
saveHistory();
updateHistoryButtons();