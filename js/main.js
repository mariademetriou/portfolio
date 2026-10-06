/* Maria Demetriou portfolio — navigation, filters, media and card behaviour */
(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  /* Sticky header: compact + translucent once the page scrolls */
  let ticking = false;
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    ticking = false;
  };
  onScroll();
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* Mobile menu */
  if (menuToggle && navLinks) {
    if (!navLinks.id) navLinks.id = 'primary-menu';
    menuToggle.setAttribute('aria-controls', navLinks.id);

    const setMenu = open => {
      menuToggle.classList.toggle('is-open', open);
      navLinks.classList.toggle('is-open', open);
      if (header) header.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('is-open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (navLinks.classList.contains('is-open') && !event.target.closest('.nav')) setMenu(false);
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  }

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* Work / content filters (also hides groups left empty by a filter) */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.dataset.filterTarget;
    const targetRoot = targetSelector ? document.querySelector(targetSelector) : group.parentElement;
    if (!targetRoot) return;
    const items = targetRoot.querySelectorAll('[data-categories]');
    const groups = targetRoot.querySelectorAll('[data-work-group]');

    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach(b => {
          const active = b === button;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        items.forEach(item => {
          const categories = (item.dataset.categories || '').split(' ');
          const show = filter === 'all' || categories.includes(filter);
          item.hidden = !show;
          if (show) item.classList.add('is-visible');
        });
        groups.forEach(section => {
          const cards = [...section.querySelectorAll('[data-categories]')];
          section.hidden = cards.length > 0 && cards.every(card => card.hidden);
        });
      });
    });
  });

  /* Local videos: muted hover previews where requested, one playing at a time */
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover) {
    document.querySelectorAll('video[data-hover-preview]').forEach(video => {
      video.muted = true;
      video.addEventListener('mouseenter', () => video.play().catch(() => {}));
      video.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
    });
  }
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(other => { if (other !== video && !other.paused) other.pause(); });
    });
  });

  /* Content cards: clicking the card surface opens the project.
     The inner "View project" link remains the keyboard-accessible target. */
  document.querySelectorAll('[data-card-link]').forEach(card => {
    const href = card.dataset.cardLink;
    if (!href) return;
    card.addEventListener('click', event => {
      if (event.target.closest('a, button, iframe, video, input, textarea, blockquote')) return;
      if (window.getSelection && String(window.getSelection())) return;
      window.location.href = href;
    });
  });

  /* Mailto contact form hook (static hosting, no backend) */
  const form = document.querySelector('[data-mailto-form]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const company = data.get('company') || '';
      const message = data.get('message') || '';
      const subject = encodeURIComponent(`Portfolio enquiry${company ? `: ${company}` : ''}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`);
      window.location.href = `mailto:mariademetriou0318@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
