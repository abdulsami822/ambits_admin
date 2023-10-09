export const StorageService = {
  getRowPerPageOption() {
    return _localstorage.getItem("row_per_page");
  },
  setRowPerPageOption(value) {
    return _localstorage.setItem("row_per_page", value);
  },

  get(key, fromSessionStorage = false) {
    return _localstorage.getItem(key, fromSessionStorage);
  },
  set(key, value, saveToSessionStorage = false) {
    return _localstorage.setItem(key, value, saveToSessionStorage);
  },
};

const _localstorage = {
  getItem(key, fromSessionStorage = false) {
    key = generateKey(key);
    const storage = selectStorage(fromSessionStorage);

    const val = storage?.getItem(key);

    if (val === null) return undefined;

    try {
      return JSON.parse(val);
    } catch (error) {
      return val; // if not, simply return the value.
    }
  },

  setItem(key, value, saveToSessionStorage = false) {
    key = generateKey(key);
    const storage = selectStorage(saveToSessionStorage);

    if (value === undefined || value === null) {
      return storage?.removeItem(key);
    }

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    storage.setItem(key, value);
  },
};

function selectStorage(useSessionStorage) {
  if (typeof window === "undefined") return null;
  return !useSessionStorage ? localStorage : sessionStorage;
}

function generateKey(key) {
  return "_ambients_boss__" + key;
}
