// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-close').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── SCROLL ANIMATIONS ──
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once, don't reset
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
});

// ── SMOOTH NAVBAR BACKGROUND ON SCROLL ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(13,13,13,0.97)'
    : 'rgba(13,13,13,0.85)';
});

// Contact form — show success message (wire up to a backend/Formspree later)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.style.color = '#ff4444';
    status.textContent = 'Please fill in all fields.';
    return;
  }

  status.style.color = '#bf00ff';
  status.textContent = 'Sending...';

  try {
    const res = await fetch('https://formspree.io/f/xbdvgewv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      form.reset();
      status.style.color = '#4caf50';
      status.textContent = 'Message sent! I\'ll get back to you soon.';
      setTimeout(() => { status.textContent = ''; }, 5000);
    } else {
      throw new Error('Server error');
    }
  } catch {
    status.style.color = '#ff4444';
    status.textContent = 'Something went wrong. Try emailing directly.';
  }
});
