/* Scroll reveals and KPI counters — IntersectionObserver, no libraries */
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsIO = 'IntersectionObserver' in window;
  const revealEls = [...document.querySelectorAll('.reveal')];

  const showAll = () => revealEls.forEach(el => el.classList.add('is-visible'));

  if (reduceMotion || !supportsIO) {
    showAll();
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    /* Anything already on screen (or jumped to via #anchor) appears immediately */
    requestAnimationFrame(() => {
      revealEls.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
      });
    });
    /* Failsafe: never leave content hidden (e.g. print, unusual viewports) */
    window.addEventListener('beforeprint', showAll);
  }

  /* KPI counters: 0 → final value, formatted exactly like the static markup */
  const format = (value, el) => {
    const decimals = Number(el.dataset.decimals || 0);
    const num = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return `${el.dataset.prefix || ''}${num}${el.dataset.suffix || ''}`;
  };
  const counters = [...document.querySelectorAll('[data-count]')];
  const finalText = el => format(Number(el.dataset.count || 0), el);

  if (reduceMotion || !supportsIO) {
    counters.forEach(el => { el.textContent = finalText(el); });
    return;
  }

  const animateCounter = el => {
    const target = Number(el.dataset.count || 0);
    const duration = 1000;
    const start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = p < 1 ? format(target * eased, el) : finalText(el);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  counters.forEach(el => {
    if (Number(el.dataset.count) > 0) el.textContent = format(0, el);
  });
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
  window.addEventListener('beforeprint', () => counters.forEach(el => { el.textContent = finalText(el); }));
  root.classList.add('motion-ready');
})();
