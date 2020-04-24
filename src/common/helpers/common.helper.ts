let timeout: NodeJS.Timeout;
export const debounce = (callback: () => void, delay: number) => {
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
};

export const flatObjectHasUndefined = (object: {}): boolean => {
  for (const propName in object) {
    if (object[propName] === undefined) {
      return true;
    }
  }
  return false;
};
