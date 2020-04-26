export enum EResponseStatus {
  TemporaryRedirect = 307,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  NotAllowed = 405,
  Conflict = 409,
  PayloadTooLarge = 413,
  Validation = 422,
  FailedDependency = 424,
  TooManyRequests = 429,
  RetryWith = 449,
  InternalServerError = 500
}
interface IErrors {
  [key: string]: string[];
}
export function errorsApplicaionMapper(errors: IErrors) {
  const obj: any = {};
  let hasApplicationErrors = false;
  if (errors && typeof errors === 'object' && Object.entries(errors).length) {
    for (const [key, value] of Object.entries(errors)) {
      if (key.startsWith('application')) {
        const newKey = key.replace('application.', '');
        obj[newKey] = value;
        hasApplicationErrors = true;
      }
    }
    if (!hasApplicationErrors) {
      for (const [key, value] of Object.entries(errors)) {
        if (key.startsWith('workspace')) {
          let newKey = key.replace('workspace.', '');
          if (newKey === 'name') {
            newKey = 'workspaceName';
          }
          obj[newKey] = value;
        }
        if (key.startsWith('zelos')) {
          let newKey = key.replace('zelos.', '');
          if (newKey === 'email') {
            newKey = 'zelosEmail';
          }
          obj[newKey] = value;
        }
      }
    }
  }
  return obj;
}
