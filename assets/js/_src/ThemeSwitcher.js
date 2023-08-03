export default class ThemeSwitcher {
  constructor(trigger) {
    this.themes = ['light-theme-override', 'dark-theme-override'];
    this._init(trigger);
  }

  _init(element) {
    element = document.getElementById(element);
    if (!element) throw ReferenceError('Element not found');
    element.addEventListener('click', () => this._overrideTheme());
    this._enforceTheme();
  }

  _overrideTheme() {
    const activeOverride = sessionStorage.getItem('themeOverride');

    if (activeOverride) {
      this._toggleClass(activeOverride);
      sessionStorage.removeItem('themeOverride');
      return;
    }

    const override = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? this._rememberThis(this.themes[0])
      : this._rememberThis(this.themes[1]);

    this._toggleClass(override);
  }

  _enforceTheme() {
    const themeOverride = sessionStorage.getItem('themeOverride');
    if (themeOverride) {
      this._toggleClass(themeOverride);
      return true;
    }
  }
  _toggleClass(targetClass) {
    document.body.classList.toggle(targetClass);
  }

  _rememberThis(theme) {
    sessionStorage.setItem('themeOverride', theme);
    return theme;
  }
}
