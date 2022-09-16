(function () {
  let lightSwitch = document.getElementById('lightSwitch');
  if (!lightSwitch) {
    return;
  }

  function darkMode() {
    document.querySelectorAll('.text-bg-light,.bg-light').forEach((element) => {
      element.className = element.className.replace(/-light/g, '-dark');
    });

    document.querySelectorAll('.text-dark').forEach((element) => {
      element.className = element.className.replace(/-dark/g, '-light');
    });

    if (!lightSwitch.checked) {
      lightSwitch.checked = true;
    }
  }

  function lightMode() {
    document.querySelectorAll('.text-bg-dark,.bg-dark').forEach((element) => {
      element.className = element.className.replace(/-dark/g, '-light');
    });

    document.querySelectorAll('.text-light').forEach((element) => {
      element.className = element.className.replace(/-light/g, '-dark');
    });

    if (lightSwitch.checked) {
      lightSwitch.checked = false;
    }
  }

  function onToggleMode() {
    if (lightSwitch.checked) {
      darkMode();
      localStorage.setItem('lightSwitch', 'dark');
    } else {
      lightMode();
      localStorage.setItem('lightSwitch', 'light');
    }
  }

  function getSystemColor() {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) {
      return 'dark';
    }
    return 'light';
  }

  function init() {
    var color = localStorage.getItem('lightSwitch');
    if (color == null) {
      color = getSystemColor();
    }
    if (color === 'dark') {
      lightSwitch.checked = true;
      darkMode();
    } else {
      lightMode();
    }
    lightSwitch.addEventListener('change', onToggleMode);
  }

  init();
})();
