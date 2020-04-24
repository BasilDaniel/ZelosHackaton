export function objectToQuery(obj: any) {
  let params = '';

  if (obj && typeof obj === 'object') {
    params = `?${Object.keys(obj)
      .filter(k => {
        if (obj[k] === '' || obj[k] === false) {
          return false;
        }
        return true;
      })
      .map(k => {
        if (Array.isArray(obj[k])) {
          return obj[k].map(i => {
            return `${encodeURIComponent(k)}=${encodeURIComponent(i)}`;
          });
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
      })
      .flat()
      .join('&')}`;
  } else if (obj !== undefined && obj !== null) {
    params = obj;
  }

  return params;
}
