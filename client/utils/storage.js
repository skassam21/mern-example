const STORAGE_KEY_PREFIX = 'ExampleAppStorage';

class Storage {
  constructor(storage, namespace) {
    this.storage = storage;
    this.namespace = namespace;
  }

  get(key) {
    const storageKey = this.getStorageKey(key);
    try {
      return JSON.parse(this.storage.getItem(storageKey));
    } catch (err) {
      return undefined;
    }
  }
  set(key, value) {
    const storageKey = this.getStorageKey(key);
    try {
      const jsonValue = JSON.stringify(value);
      this.storage.setItem(storageKey, jsonValue);
    } catch (err) {
      throw err;
    }
    return this;
  }
  getStorageKey(key) {
    if (typeof key !== 'string' || !key) {
      throw TypeError('Storage: key must be a non-empty string');
    }
    return [this.namespace,
      encodeURIComponent(key),
    ].join('/');
  }
}

export default new Storage(window.localStorage, STORAGE_KEY_PREFIX);
