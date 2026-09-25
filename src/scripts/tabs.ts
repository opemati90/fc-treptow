// Einfache, barrierearme Reiter: Klick oder Pfeiltasten wechseln, Panels werden ein-/ausgeblendet.
document.querySelectorAll<HTMLElement>('[role="tablist"]').forEach((list) => {
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((other) => {
      const on = other === tab;
      other.setAttribute('aria-selected', String(on));
      other.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(other.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      select(tabs[(i + dir + tabs.length) % tabs.length], true);
    });
  });
});
