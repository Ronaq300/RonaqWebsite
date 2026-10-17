(() => {
  const phone = '918779211656';
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    }));
  }

  const search = document.getElementById('serviceSearch');
  const cards = [...document.querySelectorAll('.service-card')];
  const noResults = document.getElementById('noResults');
  if (search) {
    search.addEventListener('input', () => {
      const term = search.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const match = card.dataset.name.toLowerCase().includes(term) || card.textContent.toLowerCase().includes(term);
        card.hidden = !match;
        if (match) visible++;
      });
      if (noResults) noResults.hidden = visible !== 0;
    });
  }

  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const service = link.dataset.service;
      const select = document.getElementById('customerService');
      if (select) select.value = service;
      const form = document.getElementById('enquiryForm');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const name = document.getElementById('customerName');
      if (name) setTimeout(() => name.focus({ preventScroll: true }), 450);
    });
  });

  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('customerName').value.trim();
      const service = document.getElementById('customerService').value;
      const details = document.getElementById('customerDetails').value.trim();
      if (!name || !service) return;
      const message = `Hello Ronaq Printing & Advertising!\n\nMy name is ${name}.\nI'm interested in: ${service}.${details ? `\nProject details: ${details}` : ''}\n\nPlease share more information and a quote. Thank you!`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
})();
