export const numberValidate = (rule: any, value: any, callback: any, source?: any, options?: any, min?: number) => {
  if ((value === undefined || value === null || !isNaN(value)) && min !== undefined) {
    return !value || value >= min ? callback() : callback(`Value must be ${min === 0 ? 'zero' : min} or greater`);
  }
  if ((value === undefined || value === null || !isNaN(value)) && min === undefined) {
    return !value || value > 0 ? callback() : callback(`Value must be greater than zero`);
  }
  callback('Value must be a number');
};
export const zipcodeValidate = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback();
  }
  if (value && !isNaN(value)) {
    return value.toString().length === 5 ? callback() : callback(`Zip Code must be five-digit`);
  }
  callback('Zip Code must be a number');
};
export const urlValidate = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback();
  }
  const rgx = new RegExp('^(http|https)://.*$', 'i');
  if (!rgx.test(value)) {
    return callback(`Site address must begin with http:// or https://`);
  }
  callback();
};
export const IBANValidate = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback();
  }
  if (value.match(/[a-z]/)) {
    return callback('IBAN must contain only capital letters and numbers');
  }
  return callback();
};
