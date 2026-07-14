(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  const updateScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 32);
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    reveals.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(el);
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    sections.forEach(section => navObserver.observe(section));
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('[data-slide]')];
    const dots = [...carousel.querySelectorAll('[data-go-to]')];
    const timer = carousel.querySelector('[data-carousel-timer]');
    let active = 0;
    let interval;
    let pointerStart = null;

    const resetTimerVisual = () => {
      if (!timer || reducedMotion) return;
      timer.classList.remove('is-running');
      void timer.offsetWidth;
      timer.classList.add('is-running');
    };
    const show = next => {
      active = (next + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const selected = index === active;
        slide.classList.toggle('is-active', selected);
        slide.setAttribute('aria-hidden', String(!selected));
      });
      dots.forEach((dot, index) => {
        const selected = index === active;
        dot.classList.toggle('is-active', selected);
        dot.setAttribute('aria-selected', String(selected));
      });
      resetTimerVisual();
    };
    const stop = () => window.clearInterval(interval);
    const start = () => {
      stop();
      if (!reducedMotion && slides.length > 1) interval = window.setInterval(() => show(active + 1), 7000);
      resetTimerVisual();
    };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => { show(active - 1); start(); });
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => { show(active + 1); start(); });
    dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.goTo)); start(); }));
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { show(active - 1); start(); }
      if (event.key === 'ArrowRight') { show(active + 1); start(); }
    });
    carousel.addEventListener('pointerdown', event => { pointerStart = event.clientX; });
    carousel.addEventListener('pointerup', event => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      if (Math.abs(distance) > 48) show(active + (distance < 0 ? 1 : -1));
      pointerStart = null;
      start();
    });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    show(0);
    start();
  }
})();
