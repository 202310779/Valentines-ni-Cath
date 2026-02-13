// Floating hearts background
(function heartsBackground() {
  const layer = document.querySelector('.hearts-layer');
  if (!layer) return;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    const size = rand(0.8, 1.9);
    const duration = rand(6, 12);
    const left = rand(-10, 110); // allow slight offscreen spawn

    h.style.setProperty('--scale', size.toFixed(2));
    h.style.setProperty('--dur', duration.toFixed(2) + 's');
    h.style.left = left + 'vw';
    h.style.bottom = '-24px';
    h.style.opacity = '0';

    // Slight color variety
    const hueShift = rand(-10, 10);
    h.style.background = `hsl(${340 + hueShift}deg, 85%, 67%)`;

    layer.appendChild(h);
    h.addEventListener('animationend', () => h.remove());
  }

  // Spawn a few initially for instant effect
  for (let i = 0; i < 12; i++) setTimeout(spawnHeart, i * 120);

  // Continuous spawn
  setInterval(() => {
    for (let i = 0; i < 2; i++) spawnHeart();
  }, 650);
})();

// Floating flowers background
(function flowersBackground() {
  const layer = document.querySelector('.flowers-layer');
  if (!layer) return;

  const NS = 'http://www.w3.org/2000/svg';
  const rand = (min, max) => Math.random() * (max - min) + min;

  function makeFlowerSVG(petalHue) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', '100');
    svg.setAttribute('height', '100');

    const center = document.createElementNS(NS, 'circle');
    center.setAttribute('cx', '50');
    center.setAttribute('cy', '50');
    center.setAttribute('r', '14');
    center.setAttribute('fill', `hsl(${petalHue}, 70%, 60%)`);

    // Petals: five circles around center
    const petals = [];
    const petalColor = `hsl(${petalHue}, 75%, 78%)`;
    for (let i = 0; i < 5; i++) {
      const angle = (i * 72) * (Math.PI / 180);
      const px = 50 + Math.cos(angle) * 26;
      const py = 50 + Math.sin(angle) * 26;
      const petal = document.createElementNS(NS, 'circle');
      petal.setAttribute('cx', String(px));
      petal.setAttribute('cy', String(py));
      petal.setAttribute('r', '18');
      petal.setAttribute('fill', petalColor);
      petal.setAttribute('fill-opacity', '0.95');
      petals.push(petal);
      svg.appendChild(petal);
    }

    svg.appendChild(center);
    return svg;
  }

  function spawnFlower() {
    const wrap = document.createElement('div');
    wrap.className = 'flower';
    const size = rand(0.6, 1.2);
    const duration = rand(8, 16);
    const left = rand(-8, 108);
    const hue = 300 + rand(-30, 30); // pinkish/lilac range

    wrap.style.setProperty('--scale', size.toFixed(2));
    wrap.style.setProperty('--dur', duration.toFixed(2) + 's');
    wrap.style.left = left + 'vw';
    wrap.style.bottom = '-28px';
    wrap.style.opacity = '0';

    const svg = makeFlowerSVG(hue.toFixed(0));
    wrap.appendChild(svg);

    layer.appendChild(wrap);
    wrap.addEventListener('animationend', () => wrap.remove());
  }

  // A few initial flowers, then gentle spawn
  for (let i = 0; i < 8; i++) setTimeout(spawnFlower, i * 180);
  setInterval(() => {
    // Staggered small batch
    for (let i = 0; i < 1; i++) spawnFlower();
  }, 900);
})();

// Dialog handling
(function loveLetterDialog() {
  const dialog = document.getElementById('loveLetterDialog');
  const openBtn = document.getElementById('openLetterBtn');
  if (!dialog || !openBtn) return;

  // Polyfill-ish: ensure dialog works even if <dialog> unsupported
  function open() {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function close() {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  openBtn.addEventListener('click', open);
  dialog.querySelector('.close')?.addEventListener('click', close);

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    const rect = dialog.querySelector('.letter')?.getBoundingClientRect();
    if (!rect) return;
    const within = e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!within) close();
  });
})();

// Soft background music toggle
(function musicToggle() {
  const btn = document.getElementById('toggleMusicBtn');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  let playing = false;
  btn.addEventListener('click', async () => {
    try {
      if (!playing) {
        await audio.play();
        playing = true;
        btn.textContent = 'Pause Soft Music ⏸';
      } else {
        audio.pause();
        playing = false;
        btn.textContent = 'Play Soft Music ♪';
      }
    } catch (err) {
      // Autoplay might be blocked — adjust button text
      btn.textContent = 'Play Soft Music ♪';
    }
  });
})();

// Photo gallery lightbox
(function galleryLightbox() {
  const grid = document.getElementById('galleryGrid');
  const dialog = document.getElementById('galleryLightbox');
  const img = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  const btnClose = dialog?.querySelector('.lightbox-close');
  const btnPrev = dialog?.querySelector('.lightbox-prev');
  const btnNext = dialog?.querySelector('.lightbox-next');
  if (!grid || !dialog || !img || !counter || !btnClose || !btnPrev || !btnNext) return;

  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  let current = 0;

  function updateLightbox(index) {
    const safeIndex = Math.max(0, Math.min(items.length - 1, index));
    current = safeIndex;
    const href = items[current]?.getAttribute('href');
    img.src = href || '';
    counter.textContent = `${current + 1} / ${items.length}`;
  }

  function open(index) {
    updateLightbox(index);
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function close() {
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  }
  function prev() { updateLightbox((current - 1 + items.length) % items.length); }
  function next() { updateLightbox((current + 1) % items.length); }

  // Open via click
  items.forEach((el, i) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  // Controls
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', (e) => { e.preventDefault(); prev(); });
  btnNext.addEventListener('click', (e) => { e.preventDefault(); next(); });

  // Keyboard nav
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Backdrop click closes
  dialog.addEventListener('click', (e) => {
    const rect = img.getBoundingClientRect();
    const within = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!within) close();
  });

  // Basic touch swipe
  let startX = 0;
  img.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
  img.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) prev();
    else if (dx < -40) next();
  });
})();


