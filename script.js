// Smooth navbar background on scroll
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
