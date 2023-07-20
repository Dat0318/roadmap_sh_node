const KEYWORD = 'demo';

export default {
  get() {
    return localStorage.getItem(KEYWORD) ? JSON.parse(localStorage.getItem(KEYWORD)) : 0;
  },
  set(newValue) {
    return localStorage.setItem(KEYWORD, JSON.stringify(newValue));
  },
};
