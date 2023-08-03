export default class ThemeSwitch {
  constructor(trigger) {
    this.themes = ['light-theme-override', 'dark-theme-override'];
    this.memoKey = 'ThemeSwitch';
    this._init(trigger);
  }

  _init(element) {
    element = document.getElementById(element);
    if (!element) throw ReferenceError('Element not found');
    element.addEventListener('click', () => this._override());
    this._enforce();
  }

  _override() {
    if (this._memory) {
      this._toggle(this._memory);
      this._forget();
      return;
    }

    const override = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? this._memorize(this.themes[0])
      : this._memorize(this.themes[1]);

    this._toggle(override);
  }

  _enforce() {
    if (this._memory) this._toggle(this._memory);
  }

  get _memory() {
    return sessionStorage.getItem(this.memoKey);
  }
  _toggle(targetClass) {
    document.body.classList.toggle(targetClass);
  }
  _memorize(theme) {
    sessionStorage.setItem(this.memoKey, theme);
    return theme;
  }
  _forget() {
    sessionStorage.removeItem(this.memoKey);
  }
}
