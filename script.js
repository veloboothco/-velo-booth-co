const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && closeMenu && mobileMenu) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

// Prefill event type when a visitor comes from an experience page.
const params = new URLSearchParams(window.location.search);
const requestedType = params.get('type');
if (requestedType && quoteForm) {
  const typeSelect = quoteForm.querySelector('#type');
  if (typeSelect) {
    const match = [...typeSelect.options].find(option => option.value === requestedType || option.text === requestedType);
    if (match) typeSelect.value = match.value;
  }
}

if (quoteForm && formStatus) {
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = 'Sending your request...';

    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        quoteForm.reset();
        formStatus.textContent = 'Thank you! Your event request has been received. VELO Booth Co. will review your details and get back to you shortly.';
      } else {
        formStatus.textContent = 'We couldn’t send your request. Please try again or contact VELO Booth Co. directly.';
      }
    } catch (error) {
      formStatus.textContent = 'We couldn’t send your request. Please check your connection and try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Request My Quote';
    }
  });
}
