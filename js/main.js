(function passwordGate() {
  const PASSWORD = 'pibb';
  const UNLOCK_KEY = 'be-wedding-unlocked';

  const gate = document.getElementById('gate');
  const form = document.getElementById('gateForm');
  const input = document.getElementById('gateInput');
  const error = document.getElementById('gateError');
  if (!gate || !form || !input) return;

  function unlock() {
    document.querySelectorAll('.site-header, main, .site-footer').forEach((el) => {
      el.hidden = false;
    });
    gate.hidden = true;
  }

  if (localStorage.getItem(UNLOCK_KEY) === 'true') {
    unlock();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      localStorage.setItem(UNLOCK_KEY, 'true');
      unlock();
    } else {
      error.hidden = false;
      input.value = '';
      input.focus();
    }
  });
})();

// Countdown to the wedding date
(function countdown() {
  const el = document.getElementById('countdown-value');
  if (!el) return;
  const weddingDate = new Date('2027-05-31T16:00:00-07:00');

  function update() {
    const diffMs = weddingDate - new Date();
    const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    el.textContent = days;
  }

  update();
  setInterval(update, 1000 * 60 * 60);
})();

// Mobile nav toggle
(function navToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Reveal-on-scroll for timeline entries and cards
(function revealOnScroll() {
  const targets = document.querySelectorAll(
    '.timeline-entry, .abstract-card, .schedule-item, .photo-figure'
  );
  targets.forEach((t) => t.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((t) => observer.observe(t));
})();

// Randomly pick a handful of photos (engagement shoot + other couple photos) on each page load
(function randomFigures() {
  const grid = document.getElementById('figuresGrid');
  if (!grid) return;

  const POOLS = [
    { dir: 'images/engagement', total: 135 },
    { dir: 'images/couple', total: 85 },
  ];
  const PHOTOS_TO_SHOW = 3;

  const allPaths = POOLS.flatMap(({ dir, total }) =>
    Array.from({ length: total }, (_, i) => `${dir}/figure-${String(i + 1).padStart(2, '0')}.jpg`)
  );

  for (let i = allPaths.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPaths[i], allPaths[j]] = [allPaths[j], allPaths[i]];
  }

  allPaths.slice(0, PHOTOS_TO_SHOW).forEach((path, i) => {
    const figure = document.createElement('figure');
    figure.className = 'photo-figure';
    figure.innerHTML = `
      <a href="${path}" target="_blank" rel="noopener">
        <img src="${path}" alt="Breanna and Eric" loading="lazy">
      </a>
      <figcaption>Figure ${i + 1}</figcaption>
    `;
    grid.appendChild(figure);
  });
})();
