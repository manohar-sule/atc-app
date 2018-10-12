export class AppStore {
  static get(key) {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  }
  static set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
  static remove(key) {
    window.sessionStorage && window.sessionStorage.removeItem(key);
  }
  static removeAll() {
    window.sessionStorage && window.sessionStorage.clear();
  }
}
