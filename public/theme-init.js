/* global document, localStorage, matchMedia */
(function () {
  var root = document.documentElement;
  var theme;
  try {
    var stored = localStorage.getItem('CapacitorStorage.capacitor-ranger.settings.v1');
    theme = stored === null ? 'system' : JSON.parse(stored).state.theme;
  } catch {
    theme = 'light';
  }
  var dark =
    theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList[dark ? 'add' : 'remove']('ion-palette-dark');
  root.style.colorScheme = dark ? 'dark' : 'light';
})();
