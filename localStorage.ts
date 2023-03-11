export const getLocalStorage = (key: string) => {
  let ls;
  try {
    ls = window.localStorage.getItem(key);
    if (!ls) return null;
  } catch (e) {
    return null;
  }
  return JSON.parse(ls);
};
export const setLocalStorage = (key: string, value: any) => {
  try {
    return window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};
