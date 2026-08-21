const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
btn?.addEventListener('click', () => {
  menu?.classList.toggle('hidden');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
});
menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu?.classList.add('hidden');
    btn?.setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu?.classList.contains('hidden')) {
    menu?.classList.add('hidden');
    btn?.setAttribute('aria-expanded', 'false');
    btn?.focus();
  }
});
