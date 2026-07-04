// Minimal JS for a purple-themed portfolio: nav toggle, smooth scroll, reveal animations, skills animation, simple form handling.

document.addEventListener('DOMContentLoaded', () => {
  // HERO SCROLL ANIMATION (split name and slide photo into the middle)
  const hero = document.querySelector('.hero');
  const heroMedia = document.querySelector('.hero-media');

  // NAV TOGGLE (mobile)
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setNavOpen(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      setNavOpen(!nav.classList.contains('is-open'));
    });
  }

  // Close nav when a link is clicked (good for mobile)
  if (navLinks && navLinks.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => setNavOpen(false));
    });
  }

  // Click outside to close nav
  document.addEventListener('click', (e) => {
    if (nav && !nav.contains(e.target) && nav.classList.contains('is-open')) setNavOpen(false);
  });

  // SMOOTH SCROLL for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // REVEAL ON SCROLL (projects, hero media, sections)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        // once revealed, stop observing
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.hero-media, .section').forEach(el => revealObserver.observe(el));

  // SCROLL-BASED REVEAL FOR SLABS AND CARDS
  const scrollRevealElements = document.querySelectorAll('.internship-slab, .timeline-item, .interest-slab, .skill-card, .project-card, .contact-card');
  if (scrollRevealElements.length) {
    const scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-hidden');
          scrollRevealObserver.unobserve(entry.target);
        } else {
          entry.target.classList.remove('is-visible');
          entry.target.classList.add('is-hidden');
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

    scrollRevealElements.forEach(el => {
      el.classList.add('scroll-reveal');
      el.classList.add('is-hidden');
      scrollRevealObserver.observe(el);
    });
  }

  // SKILLS PROGRESS ANIMATION
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-level').forEach(span => {
            const pct = parseInt(span.dataset.level || '0', 10);
            // create/animate a visual bar if not present
            if (!span.style.width || span.style.width === '0px') {
              span.style.transition = 'width 900ms cubic-bezier(.2,.9,.2,1)';
              span.style.display = 'inline-block';
              span.style.width = '0%';
              // trigger after small delay so transition runs
              requestAnimationFrame(() => {
                span.style.width = pct + '%';
              });
            }
          });
          skillsObserver.unobserve(skillsSection);
        }
      });
    }, { threshold: 0.25 });
    skillsObserver.observe(skillsSection);
  }

  // SIMPLE CONTACT FORM HANDLING (client-side demo)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // This demo prevents default mailto behaviour and shows a friendly message.
      // Replace with real endpoint or remove this handler to keep mailto.
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // basic validation already handled by required attributes; simulate send
      setTimeout(() => {
        submitBtn.textContent = 'Sent ✓';
        form.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }, 1500);
      }, 800);
    });
  }

  // Keyboard: close nav with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) setNavOpen(false);
  });

  // OPTIONAL: lazy-load images with data-src attribute (if you decide to use it)
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length) {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    lazyImgs.forEach(img => imgObs.observe(img));
  }
});