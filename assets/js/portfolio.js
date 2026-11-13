(() => {
  const menu = document.querySelector('.mobile-menu');
  if (!menu) return;

  const trigger = menu.querySelector('summary');

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.open = false;
      const target = link.hash && document.getElementById(link.hash.slice(1));
      if (target) {
        // Move keyboard focus to the destination after closing the menu.
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      } else {
        trigger.focus({ preventScroll: true });
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      trigger.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
    if (event.matches) menu.open = false;
  });
})();
