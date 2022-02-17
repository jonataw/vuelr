/**
 * Creates an additional wrapping element in navbar.
 * Waits until app is mounted in #app.
 */

if (typeof document !== 'undefined') {
  const observer = new MutationObserver(() => {
    const wrap = (target: Element, wrapper = document.createElement('div')) => {
      [...target.childNodes].forEach((child) => wrapper.appendChild(child));
      target.appendChild(wrapper);
    };

    const wrapper = document.createElement('div');
    wrapper.className = 'navbar-wrapper';

    const navbar = document.getElementsByClassName('navbar')[0];
    if (navbar) {
      observer.disconnect();
      navbar.classList.add('contained');
      wrap(navbar, wrapper);
    }
  });

  const h = document.getElementById('app');
  if (h) {
    observer.observe(h, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }
}
