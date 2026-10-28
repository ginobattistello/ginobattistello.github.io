(() => {
  const nav = document.querySelector('.nav');
  const toggle = nav?.querySelector('.nav-toggle');
  const links = document.getElementById('site-navigation');
  if (!toggle || !links) return;

  const mobile = window.matchMedia('(max-width: 760px)');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    links.hidden = mobile.matches && !open;
  };
  const updateLayout = () => {
    toggle.hidden = !mobile.matches;
    setOpen(false);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  links.addEventListener('click', (event) => {
    if (mobile.matches && event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (mobile.matches && !nav.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener('change', updateLayout);
  updateLayout();
})();
