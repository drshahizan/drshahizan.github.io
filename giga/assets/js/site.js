const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !open);
  });
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    });
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const programmeTabs = [...document.querySelectorAll('[data-programme-tab]')];

if (programmeTabs.length) {
  const activateProgrammeTab = (tab, { focus = false, updateHash = false } = {}) => {
    programmeTabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });

    if (focus) tab.focus();
    if (updateHash) history.replaceState(null, '', `#${tab.getAttribute('aria-controls')}`);
  };

  programmeTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateProgrammeTab(tab, { updateHash: true }));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % programmeTabs.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + programmeTabs.length) % programmeTabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = programmeTabs.length - 1;
      else return;

      event.preventDefault();
      activateProgrammeTab(programmeTabs[nextIndex], { focus: true, updateHash: true });
    });
  });

  const requestedDay = window.location.hash.match(/^#day-([1-5])$/)?.[1];
  if (requestedDay) {
    const requestedTab = document.getElementById(`day-tab-${requestedDay}`);
    if (requestedTab) activateProgrammeTab(requestedTab);
  }
}


// Copy prompt examples from the participant exercise pages.
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-target]');
  if (!button) return;
  const target = document.getElementById(button.dataset.copyTarget);
  if (!target) return;
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    button.textContent = 'Copied';
  } catch {
    button.textContent = 'Select prompt to copy';
  }
  window.setTimeout(() => { button.textContent = original; }, 1800);
});
